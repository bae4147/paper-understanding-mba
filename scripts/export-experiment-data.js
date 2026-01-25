/**
 * 실험 데이터 내보내기 스크립트
 *
 * 2026년 1월 21일 AM 4:00 UTC+9 이후에 생성된 사용자들의 raw 데이터를 JSON으로 내보냅니다.
 *
 * 사용법:
 *   node scripts/export-experiment-data.js [서비스계정키.json]
 *
 * 환경 설정:
 *   - 인자로 서비스 계정 키 파일 경로 전달
 *   - 또는 GOOGLE_APPLICATION_CREDENTIALS 환경변수로 서비스 계정 키 경로 설정
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Firebase 프로젝트 ID
const PROJECT_ID = 'mba-paper-reading';

// 실험 시작 시간: 2026년 1월 21일 AM 4:00 UTC+9 = 2026년 1월 20일 19:00 UTC
const EXPERIMENT_START_DATE = new Date('2026-01-20T19:00:00.000Z');

// Firebase Admin SDK 초기화
function initializeFirebase() {
  if (admin.apps.length === 0) {
    // 커맨드라인 인자로 서비스 계정 키 경로 받기
    const serviceAccountPath = process.argv[2];

    if (serviceAccountPath) {
      const absolutePath = path.resolve(serviceAccountPath);
      if (!fs.existsSync(absolutePath)) {
        console.error(`서비스 계정 키 파일을 찾을 수 없습니다: ${absolutePath}`);
        process.exit(1);
      }
      const serviceAccount = require(absolutePath);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: PROJECT_ID,
      });
      console.log(`서비스 계정 키 사용: ${absolutePath}\n`);
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      admin.initializeApp({
        projectId: PROJECT_ID,
      });
      console.log(`환경변수 GOOGLE_APPLICATION_CREDENTIALS 사용\n`);
    } else {
      console.error('오류: 서비스 계정 키가 필요합니다.\n');
      console.error('사용법:');
      console.error('  node scripts/export-experiment-data.js <서비스계정키.json>');
      console.error('');
      console.error('서비스 계정 키 다운로드:');
      console.error('  1. Firebase 콘솔 접속: https://console.firebase.google.com/project/mba-paper-reading/settings/serviceaccounts/adminsdk');
      console.error('  2. "새 비공개 키 생성" 버튼 클릭');
      console.error('  3. 다운로드된 JSON 파일 경로를 인자로 전달');
      process.exit(1);
    }
  }
  return admin.firestore();
}

// Firestore Timestamp를 ISO 문자열로 변환
function convertTimestamps(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (obj instanceof admin.firestore.Timestamp) {
    return obj.toDate().toISOString();
  }

  if (Array.isArray(obj)) {
    return obj.map(convertTimestamps);
  }

  if (typeof obj === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = convertTimestamps(value);
    }
    return result;
  }

  return obj;
}

// 사용자의 세션 데이터 가져오기
async function getUserSessions(db, userId) {
  const sessionsRef = db.collection('users').doc(userId).collection('sessions');
  const sessionsSnapshot = await sessionsRef.get();

  const sessions = {};
  for (const doc of sessionsSnapshot.docs) {
    sessions[doc.id] = convertTimestamps(doc.data());
  }

  return sessions;
}

// 실험 시작 이후 생성된 사용자 데이터 가져오기
async function getExperimentUsers(db) {
  console.log(`실험 시작 시간: ${EXPERIMENT_START_DATE.toISOString()}`);
  console.log(`(UTC+9: 2026년 1월 21일 AM 4:00)\n`);

  const usersRef = db.collection('users');
  const query = usersRef.where('createdAt', '>=', admin.firestore.Timestamp.fromDate(EXPERIMENT_START_DATE));

  const snapshot = await query.get();

  console.log(`발견된 사용자 수: ${snapshot.size}명\n`);

  const users = {};

  for (const doc of snapshot.docs) {
    const userData = doc.data();
    const userId = doc.id;

    console.log(`처리 중: ${userData.email || userId}`);

    // 세션 데이터 가져오기
    const sessions = await getUserSessions(db, userId);

    users[userId] = {
      ...convertTimestamps(userData),
      sessions: sessions,
    };

    console.log(`  - 세션 수: ${Object.keys(sessions).length}개`);
  }

  return users;
}

// 메인 함수
async function main() {
  console.log('='.repeat(60));
  console.log('실험 데이터 내보내기');
  console.log('='.repeat(60) + '\n');

  try {
    const db = initializeFirebase();

    // 사용자 데이터 가져오기
    const users = await getExperimentUsers(db);

    // 출력 파일 경로
    const outputDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const outputPath = path.join(outputDir, `experiment-data-${timestamp}.json`);

    // JSON 파일로 저장
    const exportData = {
      exportedAt: new Date().toISOString(),
      experimentStartDate: EXPERIMENT_START_DATE.toISOString(),
      totalUsers: Object.keys(users).length,
      users: users,
    };

    fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2), 'utf8');

    console.log('\n' + '='.repeat(60));
    console.log('내보내기 완료!');
    console.log('='.repeat(60));
    console.log(`총 사용자 수: ${Object.keys(users).length}명`);
    console.log(`출력 파일: ${outputPath}`);

  } catch (error) {
    console.error('오류 발생:', error);
    process.exit(1);
  }
}

main();
