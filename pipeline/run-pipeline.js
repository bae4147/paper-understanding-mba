#!/usr/bin/env node

/**
 * 실험 데이터 파이프라인 마스터 스크립트
 *
 * 전체 파이프라인:
 *   1. Firebase에서 raw 데이터 다운로드
 *   2. 기술통계 생성 및 저장
 *   3. CSV 형태로 변환 및 저장 (필터링 적용)
 *   4. 통계 분석 (ANOVA) - Python/scipy
 *
 * 사용법:
 *   node scripts/run-pipeline.js <서비스계정키.json>
 *   node scripts/run-pipeline.js --skip-download
 *   node scripts/run-pipeline.js --skip-download --input <raw-data.json>
 *
 * 출력:
 *   data/runs/YYYY-MM-DD_HH-MM-SS/
 *   ├─ experiment-data-*.json (raw 데이터)
 *   ├─ csv/
 *   │  ├─ participants.csv
 *   │  ├─ sessions.csv
 *   │  ├─ survey_responses.csv
 *   │  └─ chat_history.csv
 *   └─ stats/
 *      ├─ descriptive_stats.json
 *      ├─ descriptive_stats.txt
 *      ├─ filter_info.json
 *      ├─ anova_results.json
 *      └─ anova_results.md
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const SCRIPTS_DIR = __dirname;
const PROJECT_ROOT = path.dirname(SCRIPTS_DIR);
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const RUNS_DIR = path.join(DATA_DIR, 'runs');

function log(message, type = 'info') {
  const prefix = {
    info: '\x1b[36mℹ\x1b[0m',
    success: '\x1b[32m✓\x1b[0m',
    error: '\x1b[31m✗\x1b[0m',
    warn: '\x1b[33m⚠\x1b[0m',
  };
  console.log(`${prefix[type] || prefix.info} ${message}`);
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: 'inherit',
      cwd: PROJECT_ROOT,
      ...options,
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    proc.on('error', (err) => {
      reject(err);
    });
  });
}

function findLatestDataFile(dir = DATA_DIR) {
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir)
    .filter(f => f.startsWith('experiment-data-') && f.endsWith('.json'))
    .sort()
    .reverse();

  return files.length > 0 ? path.join(dir, files[0]) : null;
}

function generateRunId() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
}

function parseArgs(args) {
  const result = {
    serviceAccountPath: null,
    skipDownload: false,
    inputFile: null,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--skip-download') {
      result.skipDownload = true;
    } else if (arg === '--input' && args[i + 1]) {
      result.inputFile = args[++i];
    } else if (!arg.startsWith('--') && arg.endsWith('.json')) {
      result.serviceAccountPath = arg;
    }
  }

  return result;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  console.log('\n' + '═'.repeat(70));
  console.log('  실험 데이터 분석 파이프라인');
  console.log('═'.repeat(70) + '\n');

  // 실행 ID 및 디렉토리 생성
  const runId = generateRunId();
  const runDir = path.join(RUNS_DIR, runId);

  if (!fs.existsSync(runDir)) {
    fs.mkdirSync(runDir, { recursive: true });
  }

  log(`실행 ID: ${runId}`);
  log(`출력 디렉토리: ${runDir}`);

  // Step 1: 데이터 다운로드
  let dataFilePath;

  if (args.skipDownload) {
    log('데이터 다운로드 스킵 (--skip-download)');

    if (args.inputFile) {
      dataFilePath = path.resolve(args.inputFile);
      if (!fs.existsSync(dataFilePath)) {
        log(`지정된 파일을 찾을 수 없습니다: ${dataFilePath}`, 'error');
        process.exit(1);
      }
    } else {
      dataFilePath = findLatestDataFile();
      if (!dataFilePath) {
        log('기존 데이터 파일을 찾을 수 없습니다. --input 옵션으로 파일을 지정하세요.', 'error');
        process.exit(1);
      }
    }
    log(`기존 파일 사용: ${path.basename(dataFilePath)}`);
  } else {
    if (!args.serviceAccountPath) {
      console.log('사용법:');
      console.log('  node scripts/run-pipeline.js <서비스계정키.json>');
      console.log('  node scripts/run-pipeline.js --skip-download');
      console.log('  node scripts/run-pipeline.js --skip-download --input <raw-data.json>');
      console.log('');
      console.log('서비스 계정 키 다운로드:');
      console.log('  https://console.firebase.google.com/project/mba-paper-reading/settings/serviceaccounts/adminsdk');
      process.exit(1);
    }

    console.log('\n' + '─'.repeat(70));
    log('Step 1: Firebase에서 데이터 다운로드');
    console.log('─'.repeat(70));

    try {
      await runCommand('node', [
        path.join(SCRIPTS_DIR, 'export-experiment-data.js'),
        args.serviceAccountPath,
      ]);
      log('데이터 다운로드 완료', 'success');
    } catch (err) {
      log('데이터 다운로드 실패: ' + err.message, 'error');
      process.exit(1);
    }

    dataFilePath = findLatestDataFile();
  }

  if (!dataFilePath || !fs.existsSync(dataFilePath)) {
    log('데이터 파일을 찾을 수 없습니다.', 'error');
    process.exit(1);
  }

  // Step 2 & 3: 분석 및 CSV 변환 (별도 디렉토리에 저장)
  console.log('\n' + '─'.repeat(70));
  log('Step 2-3: 기술통계 생성 및 CSV 변환');
  console.log('─'.repeat(70));

  try {
    await runCommand('node', [
      path.join(SCRIPTS_DIR, 'analyze-experiment-data.js'),
      dataFilePath,
      runDir, // 출력 디렉토리 지정
    ]);
    log('분석 및 CSV 변환 완료', 'success');
  } catch (err) {
    log('분석 실패: ' + err.message, 'error');
    process.exit(1);
  }

  // Step 4: 통계 분석 (Python/scipy)
  console.log('\n' + '─'.repeat(70));
  log('Step 4: 통계 분석 (ANOVA)');
  console.log('─'.repeat(70));

  const csvDir = path.join(runDir, 'csv');
  try {
    await runCommand('python3', [
      path.join(SCRIPTS_DIR, 'statistical_analysis.py'),
      csvDir,
      runDir,
    ]);
    log('통계 분석 완료', 'success');
  } catch (err) {
    log('통계 분석 실패 (Python 필요): ' + err.message, 'warn');
    log('수동 실행: python3 scripts/statistical_analysis.py ' + csvDir + ' ' + runDir, 'info');
  }

  // 실행 메타데이터 저장
  const runMeta = {
    runId,
    createdAt: new Date().toISOString(),
    inputFile: path.basename(dataFilePath),
    skipDownload: args.skipDownload,
  };
  fs.writeFileSync(
    path.join(runDir, 'run_meta.json'),
    JSON.stringify(runMeta, null, 2),
    'utf8'
  );

  // latest 심볼릭 링크 업데이트 (또는 latest.txt 파일)
  const latestPath = path.join(RUNS_DIR, 'latest.txt');
  fs.writeFileSync(latestPath, runId, 'utf8');

  // 완료 요약
  console.log('\n' + '═'.repeat(70));
  console.log('  파이프라인 완료!');
  console.log('═'.repeat(70));

  console.log('\n생성된 파일:');
  console.log(`  📂 data/runs/${runId}/`);

  const rawFile = fs.readdirSync(runDir).find(f => f.startsWith('experiment-data-'));
  if (rawFile) {
    console.log(`     ├─ ${rawFile} (raw 데이터)`);
  }
  console.log('     ├─ run_meta.json');
  console.log('     ├─ csv/ (필터링된 데이터)');
  console.log('     │  ├─ participants.csv');
  console.log('     │  ├─ sessions.csv');
  console.log('     │  ├─ survey_responses.csv');
  console.log('     │  ├─ chat_history.csv');
  console.log('     │  └─ reading_events.csv');
  console.log('     └─ stats/');
  console.log('        ├─ raw_descriptive_stats.json (전체)');
  console.log('        ├─ raw_descriptive_stats.txt');
  console.log('        ├─ raw_descriptive_stats.md');
  console.log('        ├─ filtered_descriptive_stats.json (필터링)');
  console.log('        ├─ filtered_descriptive_stats.txt');
  console.log('        ├─ filtered_descriptive_stats.md');
  console.log('        ├─ filter_info.json');
  console.log('        ├─ anova_results.json (ANOVA)');
  console.log('        └─ anova_results.md');

  console.log('\n다음 단계:');
  console.log(`  1. data/runs/${runId}/stats/filtered_descriptive_stats.txt 에서 분석용 통계 확인`);
  console.log(`  2. data/runs/${runId}/csv/ 폴더의 CSV 파일로 추가 분석 수행`);
  console.log('');
}

main().catch(err => {
  log(err.message, 'error');
  process.exit(1);
});
