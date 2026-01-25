#!/usr/bin/env node

/**
 * Notion 업로드 스크립트
 *
 * Markdown 통계 보고서를 Notion 페이지에 업로드합니다.
 *
 * 사전 준비:
 *   1. https://www.notion.so/my-integrations 에서 Integration 생성
 *   2. 업로드할 Notion 페이지에서 Integration 연결 (Share → Integration 선택)
 *   3. 환경변수 설정:
 *      - NOTION_API_KEY: Integration Token
 *      - NOTION_PAGE_ID: 업로드할 페이지 ID (URL에서 추출)
 *
 * 사용법:
 *   node scripts/upload-to-notion.js <markdown-file>
 *   node scripts/upload-to-notion.js data/runs/latest/stats/raw_descriptive_stats.md
 *
 * 환경변수 설정 예시:
 *   export NOTION_API_KEY="secret_xxxxx"
 *   export NOTION_PAGE_ID="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
 */

const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// 환경변수 또는 .env 파일에서 설정 로드
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;

function log(message, type = 'info') {
  const prefix = {
    info: '\x1b[36mℹ\x1b[0m',
    success: '\x1b[32m✓\x1b[0m',
    error: '\x1b[31m✗\x1b[0m',
    warn: '\x1b[33m⚠\x1b[0m',
  };
  console.log(`${prefix[type] || prefix.info} ${message}`);
}

/**
 * Markdown을 Notion 블록으로 변환
 */
function markdownToNotionBlocks(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 빈 줄 스킵
    if (line.trim() === '') {
      i++;
      continue;
    }

    // 헤딩
    if (line.startsWith('# ')) {
      blocks.push({
        object: 'block',
        type: 'heading_1',
        heading_1: {
          rich_text: [{ type: 'text', text: { content: line.slice(2).trim() } }],
        },
      });
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push({
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ type: 'text', text: { content: line.slice(3).trim() } }],
        },
      });
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push({
        object: 'block',
        type: 'heading_3',
        heading_3: {
          rich_text: [{ type: 'text', text: { content: line.slice(4).trim() } }],
        },
      });
      i++;
      continue;
    }

    if (line.startsWith('#### ')) {
      blocks.push({
        object: 'block',
        type: 'heading_3',
        heading_3: {
          rich_text: [{ type: 'text', text: { content: line.slice(5).trim() } }],
        },
      });
      i++;
      continue;
    }

    // 구분선
    if (line.trim() === '---' || line.trim() === '═'.repeat(line.trim().length)) {
      blocks.push({
        object: 'block',
        type: 'divider',
        divider: {},
      });
      i++;
      continue;
    }

    // 테이블 감지
    if (line.includes('|') && lines[i + 1]?.includes('|') && lines[i + 1]?.includes('-')) {
      const tableRows = [];
      let j = i;

      // 테이블 행 수집
      while (j < lines.length && lines[j].includes('|')) {
        const row = lines[j]
          .split('|')
          .map(cell => cell.trim())
          .filter(cell => cell !== '' && !cell.match(/^[-:]+$/));

        if (row.length > 0 && !lines[j].match(/^\|[-:|]+\|$/)) {
          tableRows.push(row);
        }
        j++;
      }

      if (tableRows.length > 0) {
        // Notion 테이블 생성
        const tableWidth = Math.max(...tableRows.map(r => r.length));

        blocks.push({
          object: 'block',
          type: 'table',
          table: {
            table_width: tableWidth,
            has_column_header: true,
            has_row_header: false,
            children: tableRows.map((row, rowIndex) => ({
              object: 'block',
              type: 'table_row',
              table_row: {
                cells: Array.from({ length: tableWidth }, (_, colIndex) => [
                  {
                    type: 'text',
                    text: { content: row[colIndex] || '' },
                    annotations: rowIndex === 0 ? { bold: true } : {},
                  },
                ]),
              },
            })),
          },
        });
      }

      i = j;
      continue;
    }

    // 인용문 (> 또는 blockquote)
    if (line.startsWith('> ')) {
      let quoteText = line.slice(2).trim();
      let j = i + 1;

      // 여러 줄 인용문 처리
      while (j < lines.length && (lines[j].startsWith('> ') || lines[j].trim() !== '')) {
        if (lines[j].startsWith('> ')) {
          quoteText += '\n' + lines[j].slice(2).trim();
        } else if (lines[j].trim() === '') {
          break;
        }
        j++;
      }

      blocks.push({
        object: 'block',
        type: 'quote',
        quote: {
          rich_text: [{ type: 'text', text: { content: quoteText } }],
        },
      });
      i = j;
      continue;
    }

    // 불릿 리스트
    if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: parseRichText(line.slice(2).trim()),
        },
      });
      i++;
      continue;
    }

    // 일반 텍스트 (굵게, 기울임 처리)
    blocks.push({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: parseRichText(line),
      },
    });
    i++;
  }

  return blocks;
}

/**
 * Markdown 텍스트를 Notion rich_text로 변환 (굵게, 기울임 처리)
 */
function parseRichText(text) {
  const richText = [];
  let remaining = text;

  // 간단한 파싱: **bold**, *italic*, `code`
  const pattern = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    // 매치 전 일반 텍스트
    if (match.index > lastIndex) {
      richText.push({
        type: 'text',
        text: { content: text.slice(lastIndex, match.index) },
      });
    }

    if (match[2]) {
      // **bold**
      richText.push({
        type: 'text',
        text: { content: match[2] },
        annotations: { bold: true },
      });
    } else if (match[3]) {
      // *italic*
      richText.push({
        type: 'text',
        text: { content: match[3] },
        annotations: { italic: true },
      });
    } else if (match[4]) {
      // `code`
      richText.push({
        type: 'text',
        text: { content: match[4] },
        annotations: { code: true },
      });
    }

    lastIndex = pattern.lastIndex;
  }

  // 남은 텍스트
  if (lastIndex < text.length) {
    richText.push({
      type: 'text',
      text: { content: text.slice(lastIndex) },
    });
  }

  // 빈 배열이면 원본 텍스트 반환
  if (richText.length === 0) {
    return [{ type: 'text', text: { content: text } }];
  }

  return richText;
}

/**
 * 기존 페이지 내용 삭제
 */
async function clearPageContent(notion, pageId) {
  const { results } = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  for (const block of results) {
    await notion.blocks.delete({ block_id: block.id });
  }
}

/**
 * Notion에 블록 업로드 (100개 제한으로 분할)
 */
async function uploadBlocks(notion, pageId, blocks) {
  const BATCH_SIZE = 100;

  for (let i = 0; i < blocks.length; i += BATCH_SIZE) {
    const batch = blocks.slice(i, i + BATCH_SIZE);
    await notion.blocks.children.append({
      block_id: pageId,
      children: batch,
    });
    log(`업로드 진행: ${Math.min(i + BATCH_SIZE, blocks.length)}/${blocks.length} 블록`);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (!NOTION_API_KEY) {
    log('NOTION_API_KEY 환경변수가 설정되지 않았습니다.', 'error');
    console.log('\n설정 방법:');
    console.log('  export NOTION_API_KEY="secret_xxxxx"');
    console.log('\nIntegration 생성:');
    console.log('  https://www.notion.so/my-integrations');
    process.exit(1);
  }

  if (!NOTION_PAGE_ID) {
    log('NOTION_PAGE_ID 환경변수가 설정되지 않았습니다.', 'error');
    console.log('\n설정 방법:');
    console.log('  export NOTION_PAGE_ID="페이지-ID"');
    console.log('\n페이지 ID 찾기:');
    console.log('  Notion 페이지 URL에서 마지막 32자 (하이픈 제외)');
    console.log('  예: https://notion.so/My-Page-abc123... → abc123...');
    process.exit(1);
  }

  if (args.length === 0) {
    console.log('사용법:');
    console.log('  node scripts/upload-to-notion.js <markdown-file>');
    console.log('');
    console.log('예시:');
    console.log('  node scripts/upload-to-notion.js data/runs/2026-01-26_05-52-54/stats/raw_descriptive_stats.md');
    process.exit(1);
  }

  const mdFilePath = path.resolve(args[0]);

  if (!fs.existsSync(mdFilePath)) {
    log(`파일을 찾을 수 없습니다: ${mdFilePath}`, 'error');
    process.exit(1);
  }

  console.log('\n' + '═'.repeat(60));
  console.log('  Notion 업로드');
  console.log('═'.repeat(60) + '\n');

  log(`입력 파일: ${mdFilePath}`);
  log(`대상 페이지: ${NOTION_PAGE_ID}`);

  // Notion 클라이언트 초기화
  const notion = new Client({ auth: NOTION_API_KEY });

  // Markdown 읽기
  const markdown = fs.readFileSync(mdFilePath, 'utf8');
  log(`Markdown 파일 로드 (${markdown.length.toLocaleString()} 문자)`);

  // Notion 블록으로 변환
  const blocks = markdownToNotionBlocks(markdown);
  log(`${blocks.length}개 블록으로 변환 완료`);

  try {
    // 기존 내용 삭제 (선택적)
    log('기존 페이지 내용 삭제 중...');
    await clearPageContent(notion, NOTION_PAGE_ID);

    // 새 내용 업로드
    log('새 내용 업로드 중...');
    await uploadBlocks(notion, NOTION_PAGE_ID, blocks);

    log('Notion 업로드 완료!', 'success');
    console.log(`\n페이지 확인: https://notion.so/${NOTION_PAGE_ID.replace(/-/g, '')}`);
  } catch (err) {
    log(`업로드 실패: ${err.message}`, 'error');

    if (err.code === 'unauthorized') {
      console.log('\n해결 방법:');
      console.log('  1. NOTION_API_KEY가 올바른지 확인');
      console.log('  2. Notion 페이지에서 Integration이 연결되어 있는지 확인');
      console.log('     (페이지 우상단 ... → Connections → Integration 추가)');
    }

    if (err.code === 'object_not_found') {
      console.log('\n해결 방법:');
      console.log('  1. NOTION_PAGE_ID가 올바른지 확인');
      console.log('  2. 해당 페이지에 Integration 접근 권한이 있는지 확인');
    }

    process.exit(1);
  }
}

main().catch(err => {
  log(err.message, 'error');
  process.exit(1);
});
