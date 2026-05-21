#!/usr/bin/env node

/**
 * Post Task 응답 뷰어 HTML 생성 스크립트
 *
 * 사용법:
 *   node scripts/generate-post-task-viewer.js <raw-data.json> [output-dir]
 */

const fs = require('fs');
const path = require('path');

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br>');
}

function generateHtml(data) {
  const users = Object.entries(data.users);
  const sessions = users.flatMap(([uid, u]) =>
    Object.entries(u.sessions || {}).map(([sid, s]) => ({
      ...s,
      sessionId: sid,
      userId: uid,
      email: u.email,
      userName: u.fullName,
      userCondition: u.condition,
      userClass: u.class,
    }))
  );

  // 필터링: complete & postTask 있는 세션만, 시작 시간순 정렬
  const completed = sessions
    .filter(s => s.currentPhase === 'complete' && s.postTask)
    .sort((a, b) => (a.startedAt || '').localeCompare(b.startedAt || ''));

  // 조건별 분류
  const byCondition = {
    control: completed.filter(s => s.condition === 'control' || s.userCondition === 'control'),
    ebm_cimo: completed.filter(s => s.condition === 'ebm_cimo' || s.userCondition === 'ebm_cimo'),
  };

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Post Task 응답 뷰어</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
    h2 { color: #555; margin-top: 40px; }
    .stats {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat-box {
      background: white;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .stat-box .number { font-size: 2em; font-weight: bold; color: #2196F3; }
    .stat-box .label { color: #666; }
    .filters {
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .filter-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      background: #e0e0e0;
      transition: all 0.2s;
    }
    .filter-btn:hover { background: #ccc; }
    .filter-btn.active { background: #2196F3; color: white; }
    .filter-btn.control.active { background: #4CAF50; }
    .filter-btn.ebm.active { background: #FF9800; }
    .card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .card.control { border-left: 4px solid #4CAF50; }
    .card.ebm_cimo { border-left: 4px solid #FF9800; }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15px;
      flex-wrap: wrap;
      gap: 10px;
    }
    .user-info { flex: 1; min-width: 200px; }
    .user-name { font-weight: bold; font-size: 1.1em; }
    .user-email { color: #666; font-size: 0.9em; }
    .user-meta { color: #888; font-size: 0.85em; margin-top: 5px; }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 0.8em;
      font-weight: bold;
    }
    .badge.control { background: #E8F5E9; color: #2E7D32; }
    .badge.ebm_cimo { background: #FFF3E0; color: #E65100; }
    .paper-info {
      background: #f8f9fa;
      padding: 10px 15px;
      border-radius: 6px;
      margin-bottom: 15px;
      font-size: 0.9em;
    }
    .paper-title { font-weight: bold; color: #333; }
    .section { margin-top: 15px; }
    .section-title {
      font-weight: bold;
      color: #555;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title .icon { font-size: 1.2em; }
    .response-text {
      background: #fafafa;
      padding: 15px;
      border-radius: 6px;
      white-space: pre-wrap;
      font-size: 0.95em;
      line-height: 1.7;
    }
    .rating {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .rating-value {
      font-size: 1.5em;
      font-weight: bold;
      color: #2196F3;
    }
    .rating-label { color: #666; }
    .rating-bar {
      flex: 1;
      max-width: 200px;
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }
    .rating-fill {
      height: 100%;
      background: #2196F3;
      border-radius: 4px;
    }
    .hidden { display: none !important; }
    .search-box {
      padding: 10px 15px;
      border: 1px solid #ddd;
      border-radius: 20px;
      width: 300px;
      font-size: 14px;
    }
    .no-results {
      text-align: center;
      padding: 40px;
      color: #666;
    }
    @media (max-width: 768px) {
      .card-header { flex-direction: column; }
      .search-box { width: 100%; }
    }
  </style>
</head>
<body>
  <h1>📝 Post Task 응답 뷰어</h1>

  <div class="stats">
    <div class="stat-box">
      <div class="number">${completed.length}</div>
      <div class="label">총 응답</div>
    </div>
    <div class="stat-box">
      <div class="number">${byCondition.control.length}</div>
      <div class="label">Control</div>
    </div>
    <div class="stat-box">
      <div class="number">${byCondition.ebm_cimo.length}</div>
      <div class="label">EBM-CIMO</div>
    </div>
  </div>

  <div class="filters">
    <button class="filter-btn active" data-filter="all">전체</button>
    <button class="filter-btn control" data-filter="control">Control</button>
    <button class="filter-btn ebm" data-filter="ebm_cimo">EBM-CIMO</button>
    <input type="text" class="search-box" placeholder="이름, 이메일, 내용 검색..." id="searchBox">
  </div>

  <div id="cards">
    ${completed.map((s, idx) => {
      const condition = s.condition || s.userCondition;
      const postTask = s.postTask || {};
      const paper = s.paperMetadata || {};

      return `
    <div class="card ${condition}" data-condition="${condition}" data-search="${escapeHtml((s.userName + ' ' + s.email + ' ' + JSON.stringify(postTask)).toLowerCase())}">
      <div class="card-header">
        <div class="user-info">
          <div class="user-name">${escapeHtml(s.userName) || '(이름 없음)'}</div>
          <div class="user-email">${escapeHtml(s.email)}</div>
          <div class="user-meta">
            ${escapeHtml(s.userClass)} · ${new Date(s.startedAt).toLocaleDateString('ko-KR')}
          </div>
        </div>
        <span class="badge ${condition}">${condition === 'control' ? 'Control' : 'EBM-CIMO'}</span>
      </div>

      <div class="paper-info">
        <div class="paper-title">📄 ${escapeHtml(paper.title) || '(논문 정보 없음)'}</div>
        <div>${escapeHtml(paper.firstAuthorLastName || '')} ${paper.year ? `(${paper.year})` : ''}</div>
      </div>

      <div class="section">
        <div class="section-title"><span class="icon">💡</span> 실천 전략 (Strategies)</div>
        <div class="response-text">${escapeHtml((postTask.strategies || []).join('\n\n')) || '(응답 없음)'}</div>
      </div>

      <div class="section">
        <div class="section-title"><span class="icon">🔄</span> 맥락 전환 (Context Translation)</div>
        <div class="response-text">${escapeHtml((postTask.contextTranslation || []).join('\n\n')) || '(응답 없음)'}</div>
      </div>

      <div class="section" style="display: flex; gap: 40px; flex-wrap: wrap;">
        <div>
          <div class="section-title"><span class="icon">📊</span> 새 전략 자신감</div>
          <div class="rating">
            <span class="rating-value">${postTask.newStrategyConfidence ?? '-'}</span>
            <span class="rating-label">/ 7</span>
            <div class="rating-bar">
              <div class="rating-fill" style="width: ${((postTask.newStrategyConfidence || 0) / 7) * 100}%"></div>
            </div>
          </div>
        </div>
        <div>
          <div class="section-title"><span class="icon">🎯</span> 실행 가능성</div>
          <div class="rating">
            <span class="rating-value">${postTask.implementationLikelihood ?? '-'}</span>
            <span class="rating-label">/ 7</span>
            <div class="rating-bar">
              <div class="rating-fill" style="width: ${((postTask.implementationLikelihood || 0) / 7) * 100}%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    }).join('')}
  </div>

  <div class="no-results hidden" id="noResults">검색 결과가 없습니다.</div>

  <script>
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');
    const searchBox = document.getElementById('searchBox');
    const noResults = document.getElementById('noResults');

    let currentFilter = 'all';
    let currentSearch = '';

    function updateVisibility() {
      let visibleCount = 0;
      cards.forEach(card => {
        const matchesFilter = currentFilter === 'all' || card.dataset.condition === currentFilter;
        const matchesSearch = !currentSearch || card.dataset.search.includes(currentSearch);

        if (matchesFilter && matchesSearch) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });
      noResults.classList.toggle('hidden', visibleCount > 0);
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        updateVisibility();
      });
    });

    searchBox.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase();
      updateVisibility();
    });
  </script>
</body>
</html>`;

  return html;
}

function main() {
  const inputPath = process.argv[2];
  const outputDir = process.argv[3];

  if (!inputPath) {
    console.error('사용법: node scripts/generate-post-task-viewer.js <raw-data.json> [output-dir]');
    process.exit(1);
  }

  const absolutePath = path.resolve(inputPath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`파일을 찾을 수 없습니다: ${absolutePath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  const html = generateHtml(data);

  const outputPath = outputDir
    ? path.join(path.resolve(outputDir), 'post_task_viewer.html')
    : path.join(path.dirname(absolutePath), 'post_task_viewer.html');

  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`✓ Post Task 뷰어 생성: ${outputPath}`);
}

main();
