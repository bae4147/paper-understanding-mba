/**
 * 실험 데이터 분석 및 CSV 변환 스크립트
 *
 * 사용법:
 *   node scripts/analyze-experiment-data.js <raw-data.json> [output-dir]
 *
 * CSV 필터링 규칙:
 *   - complete 세션이 1개 이상 있는 사용자만 포함
 *   - complete 세션이 2개 이상이면 첫 번째 complete 세션만 포함
 *
 * 출력:
 *   - [output-dir]/csv/participants.csv
 *   - [output-dir]/csv/sessions.csv
 *   - [output-dir]/csv/survey_responses.csv
 *   - [output-dir]/csv/chat_history.csv
 *   - [output-dir]/stats/descriptive_stats.json
 *   - [output-dir]/stats/descriptive_stats.txt
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// Self-Efficacy 질문 매핑
// ============================================================

const SELF_EFFICACY_QUESTIONS = {
  overallComprehension: {
    _title: 'Reading Comprehension',
    overallGoal: 'I understood the overall goal and main takeaways of the article.',
    authorsReasoning: "I understood the authors' explanations and reasoning presented in the main text.",
    connectingIdeas: 'I was able to connect different sections or ideas across the article.',
    evidenceUnderstanding: 'I understood what evidence the authors used to support their claims.',
    keyResultsUnderstanding: 'I understood the key results/findings reported in the article.',
    keyTermsUnderstanding: 'I understood the key concepts/terms used in the article.',
    researchDesignUnderstanding: 'I understood the research design used in the article (e.g., survey, experiment, interviews).',
    sampleContextUnderstanding: 'I understood who or what was studied (sample/context) and why that matters.',
    limitationsUnderstanding: 'I understood the main limitations the authors described (if any).',
  },
  criticalEngagement: {
    _title: 'Critical Engagement',
    ownIdeas: 'I explored my own ideas and interpretations related to the article.',
    alternativePerspectives: "I generated alternative perspectives that challenged some of the article's ideas.",
    verifyCredibility: 'I thought about how to verify the credibility of the information sources cited in the article.',
    questionClaims: 'I questioned what I read to judge whether the claims were convincing.',
    broaderImplications: 'I reflected on the broader implications of the article (e.g., for my team, organization, or decisions).',
  },
  applicability: {
    _title: 'Applicability',
    contextDifferences: 'I can clearly identify the key differences between the research context and my own situation.',
    differencesImpact: 'I can tell which of these differences would matter for applying the findings to my situation.',
    mechanisms: "I can judge whether the underlying mechanisms behind the study's results would also apply in my situation.",
    outcomes: "I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation.",
    confidence: 'I feel confident in judging the applicability of this research to my specific situation.',
    decision: 'I can make an informed decision about whether to apply these findings in my context.',
  },
};

// ============================================================
// LLM Trust 질문 매핑
// ============================================================

const LLM_TRUST_QUESTIONS = {
  competence: 'Overall, the GenAI was competent and effective as a tool for assisting with reading.',
  accuracy: 'The information provided by the GenAI was accurate.',
  benevolence: 'I believe the GenAI is made with my best interests in mind.',
  reliability: 'I can always rely on the GenAI when understanding articles.',
  comfortActing: 'I have no reservations about acting on the information provided by the GenAI.',
  comfortUsing: 'I have no hesitation in using the information provided by the GenAI.',
};

// ============================================================
// LLM Usefulness 질문 매핑
// ============================================================

const LLM_USEFULNESS_QUESTIONS = {
  overall: 'How useful was the GenAI for reading and understanding the article?',
  conceptHelp: 'How helpful was the GenAI for understanding difficult concepts or terminology?',
  findingsHelp: 'How helpful was the GenAI for understanding the research findings?',
  practicalHelp: 'How helpful was the GenAI for understanding practical applications?',
  timeSaving: 'How helpful was the GenAI for saving your time?',
};

// ============================================================
// CSV 헬퍼 함수
// ============================================================

function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function arrayToCSV(data, columns) {
  const header = columns.join(',');
  const rows = data.map(row =>
    columns.map(col => escapeCSV(row[col])).join(',')
  );
  return [header, ...rows].join('\n');
}

// ============================================================
// 통계 헬퍼 함수
// ============================================================

function calcStats(arr) {
  if (!arr || arr.length === 0) return { n: 0, mean: null, sd: null, min: null, max: null, median: null };

  const n = arr.length;
  const sorted = [...arr].sort((a, b) => a - b);
  const sum = arr.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const variance = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
  const sd = Math.sqrt(variance);
  const min = sorted[0];
  const max = sorted[n - 1];
  const median = n % 2 === 0
    ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
    : sorted[Math.floor(n / 2)];

  return { n, mean: round(mean, 2), sd: round(sd, 2), min: round(min, 2), max: round(max, 2), median: round(median, 2) };
}

function round(num, decimals) {
  if (num === null || num === undefined) return null;
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * One-way ANOVA (두 그룹 비교)
 * F-statistic과 p-value 계산
 */
function oneWayAnova(group1, group2) {
  if (!group1 || !group2 || group1.length < 2 || group2.length < 2) {
    return { F: null, p: null, higherGroup: null };
  }

  const n1 = group1.length;
  const n2 = group2.length;
  const N = n1 + n2;

  const mean1 = group1.reduce((a, b) => a + b, 0) / n1;
  const mean2 = group2.reduce((a, b) => a + b, 0) / n2;
  const grandMean = (group1.reduce((a, b) => a + b, 0) + group2.reduce((a, b) => a + b, 0)) / N;

  // Between-group sum of squares (SSB)
  const SSB = n1 * Math.pow(mean1 - grandMean, 2) + n2 * Math.pow(mean2 - grandMean, 2);

  // Within-group sum of squares (SSW)
  const SSW1 = group1.reduce((acc, val) => acc + Math.pow(val - mean1, 2), 0);
  const SSW2 = group2.reduce((acc, val) => acc + Math.pow(val - mean2, 2), 0);
  const SSW = SSW1 + SSW2;

  // Degrees of freedom
  const dfB = 1; // k - 1 where k = 2 groups
  const dfW = N - 2; // N - k

  // Mean squares
  const MSB = SSB / dfB;
  const MSW = SSW / dfW;

  // F-statistic
  const F = MSW > 0 ? MSB / MSW : 0;

  // p-value calculation using F-distribution approximation
  const p = fDistributionPValue(F, dfB, dfW);

  // Which group is higher?
  const higherGroup = mean1 > mean2 ? 'control' : mean1 < mean2 ? 'ebm_cimo' : 'equal';

  return {
    F: round(F, 3),
    p: round(p, 4),
    higherGroup,
    mean1: round(mean1, 2),
    mean2: round(mean2, 2),
  };
}

/**
 * F-distribution p-value approximation
 * Using the regularized incomplete beta function
 */
function fDistributionPValue(F, df1, df2) {
  if (F <= 0) return 1;

  const x = df2 / (df2 + df1 * F);
  return betaIncomplete(df2 / 2, df1 / 2, x);
}

/**
 * Regularized incomplete beta function (approximation)
 */
function betaIncomplete(a, b, x) {
  if (x === 0) return 0;
  if (x === 1) return 1;

  // Use continued fraction expansion for better accuracy
  const bt = Math.exp(
    gammaLn(a + b) - gammaLn(a) - gammaLn(b) +
    a * Math.log(x) + b * Math.log(1 - x)
  );

  if (x < (a + 1) / (a + b + 2)) {
    return bt * betaCF(a, b, x) / a;
  } else {
    return 1 - bt * betaCF(b, a, 1 - x) / b;
  }
}

/**
 * Continued fraction for beta function
 */
function betaCF(a, b, x) {
  const maxIter = 100;
  const eps = 1e-10;

  let qab = a + b;
  let qap = a + 1;
  let qam = a - 1;
  let c = 1;
  let d = 1 - qab * x / qap;
  if (Math.abs(d) < eps) d = eps;
  d = 1 / d;
  let h = d;

  for (let m = 1; m <= maxIter; m++) {
    let m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < eps) d = eps;
    c = 1 + aa / c;
    if (Math.abs(c) < eps) c = eps;
    d = 1 / d;
    h *= d * c;

    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < eps) d = eps;
    c = 1 + aa / c;
    if (Math.abs(c) < eps) c = eps;
    d = 1 / d;
    let del = d * c;
    h *= del;

    if (Math.abs(del - 1) < eps) break;
  }

  return h;
}

/**
 * Log gamma function (Lanczos approximation)
 */
function gammaLn(x) {
  const coef = [
    76.18009172947146, -86.50532032941677, 24.01409824083091,
    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
  ];

  let y = x;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;

  for (let j = 0; j < 6; j++) {
    ser += coef[j] / ++y;
  }

  return -tmp + Math.log(2.5066282746310005 * ser / x);
}

/**
 * Format ANOVA result for display
 */
function formatAnovaResult(anova) {
  if (!anova || anova.p === null) return { higher: '-', pValue: '-' };

  const higher = anova.higherGroup === 'control' ? 'Control' :
                 anova.higherGroup === 'ebm_cimo' ? 'EBM-CIMO' : '동일';

  let pStr = anova.p < 0.001 ? '<.001' : anova.p.toFixed(3);
  if (anova.p < 0.05) {
    pStr += ' ✓';
  }

  return { higher, pValue: pStr };
}

function formatDuration(ms) {
  if (!ms) return '0분 0초';
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}분 ${seconds}초`;
}

// ============================================================
// 데이터 필터링 함수
// ============================================================

/**
 * CSV용 필터링된 데이터 생성
 * - complete 세션이 1개 이상 있는 사용자만 포함
 * - complete 세션이 2개 이상이면 첫 번째 complete 세션만 포함
 */
function filterDataForCSV(rawData) {
  const filteredUsers = {};

  for (const [userId, userData] of Object.entries(rawData.users)) {
    const sessions = Object.entries(userData.sessions || {});

    // complete 세션만 필터링하고 시작 시간순 정렬
    const completeSessions = sessions
      .filter(([, s]) => s.currentPhase === 'complete')
      .sort((a, b) => {
        const timeA = a[1].startedAt || '';
        const timeB = b[1].startedAt || '';
        return timeA.localeCompare(timeB);
      });

    // complete 세션이 없으면 제외
    if (completeSessions.length === 0) continue;

    // 첫 번째 complete 세션만 포함
    const [firstSessionId, firstSessionData] = completeSessions[0];

    filteredUsers[userId] = {
      ...userData,
      sessions: {
        [firstSessionId]: firstSessionData,
      },
      // 원본 세션 정보 보존 (통계용)
      _originalSessionCount: sessions.length,
      _originalCompleteCount: completeSessions.length,
    };
  }

  return {
    ...rawData,
    users: filteredUsers,
    _filterInfo: {
      originalUsers: Object.keys(rawData.users).length,
      filteredUsers: Object.keys(filteredUsers).length,
      filterRules: [
        'complete 세션이 1개 이상 있는 사용자만 포함',
        'complete 세션이 2개 이상이면 첫 번째 complete 세션만 포함',
      ],
    },
  };
}

// ============================================================
// 데이터 변환 함수
// ============================================================

function transformParticipants(rawData) {
  const participants = [];

  for (const [userId, userData] of Object.entries(rawData.users)) {
    const sessions = Object.values(userData.sessions || {});
    const completedSessions = sessions.filter(s => s.currentPhase === 'complete');

    participants.push({
      userId,
      email: userData.email || '',
      fullName: userData.fullName || '',
      class: userData.class || '',
      condition: userData.condition || '',
      createdAt: userData.createdAt || '',
      lastLoginAt: userData.lastLoginAt || '',
      totalSessions: sessions.length,
      completedSessions: completedSessions.length,
    });
  }

  return participants;
}

function transformSessions(rawData) {
  const sessions = [];

  for (const [userId, userData] of Object.entries(rawData.users)) {
    for (const [sessionId, sessionData] of Object.entries(userData.sessions || {})) {
      const reading = sessionData.reading || {};
      const focusTimes = reading.focusTimes || {};
      const resourcesUsed = reading.resourcesUsed || {};
      const paperMeta = sessionData.paperMetadata || {};

      sessions.push({
        sessionId,
        userId,
        userEmail: userData.email || '',
        condition: sessionData.condition || userData.condition || '',
        currentPhase: sessionData.currentPhase || '',
        isComplete: sessionData.currentPhase === 'complete' ? 1 : 0,

        // Paper metadata
        paperTitle: paperMeta.title || '',
        paperAuthor: paperMeta.firstAuthorLastName || '',
        paperYear: paperMeta.year || '',
        paperVenue: paperMeta.venue || '',
        paperPages: paperMeta.numPages || '',

        // Timing
        startedAt: sessionData.startedAt || '',
        completedAt: sessionData.completedAt || '',
        totalDuration: reading.totalDuration || '',
        readingStartedAt: reading.startedAt || '',
        readingCompletedAt: reading.completedAt || '',

        // Focus times (ms)
        focusTime_reading: focusTimes.reading || 0,
        focusTime_chat: focusTimes.chat || 0,
        focusTime_audio: focusTimes.audio || 0,
        focusTime_infographics: focusTimes.infographics || 0,
        focusTime_simplified: focusTimes.simplified || 0,
        focusTime_video: focusTimes.video || 0,

        // Resources used (1 if focusTime >= 5 seconds)
        usedInfographics: (focusTimes.infographics || 0) >= 5000 ? 1 : 0,
        usedVideo: (focusTimes.video || 0) >= 5000 ? 1 : 0,
        usedAudio: (focusTimes.audio || 0) >= 5000 ? 1 : 0,
        audioInteractions: resourcesUsed.audioInteractions || 0,
        videoInteractions: resourcesUsed.videoInteractions || 0,
        tabSwitchCount: resourcesUsed.tabSwitchCount || 0,

        // Chat
        chatMessageCount: (reading.chatHistory || []).length,

        // Post task
        postTask_strategies: JSON.stringify(sessionData.postTask?.strategies || []),
        postTask_contextTranslation: JSON.stringify(sessionData.postTask?.contextTranslation || []),
        postTask_newStrategyConfidence: sessionData.postTask?.newStrategyConfidence || '',
        postTask_implementationLikelihood: sessionData.postTask?.implementationLikelihood || '',
      });
    }
  }

  return sessions;
}

function transformSurveyResponses(rawData) {
  const surveys = [];

  for (const [userId, userData] of Object.entries(rawData.users)) {
    for (const [sessionId, sessionData] of Object.entries(userData.sessions || {})) {
      const survey = sessionData.postStudySurvey;
      if (!survey) continue;

      const row = {
        sessionId,
        userId,
        userEmail: userData.email || '',
        condition: sessionData.condition || userData.condition || '',
        surveyCompletedAt: survey.surveyCompletedAt || '',
      };

      // NASA-TLX (6 items)
      const nasaTLX = survey.nasaTLX || {};
      row.nasaTLX_mentalDemand = nasaTLX.mentalDemand ?? '';
      row.nasaTLX_physicalDemand = nasaTLX.physicalDemand ?? '';
      row.nasaTLX_temporalDemand = nasaTLX.temporalDemand ?? '';
      row.nasaTLX_effort = nasaTLX.effort ?? '';
      row.nasaTLX_frustration = nasaTLX.frustration ?? '';
      row.nasaTLX_performance = nasaTLX.performance ?? '';

      // Self-efficacy (nested structure: overallComprehension, criticalEngagement, applicability)
      const selfEfficacy = survey.selfEfficacy || {};
      for (const [category, items] of Object.entries(selfEfficacy)) {
        if (typeof items === 'object' && items !== null) {
          for (const [key, value] of Object.entries(items)) {
            row[`selfEfficacy_${category}_${key}`] = value ?? '';
          }
        } else {
          row[`selfEfficacy_${category}`] = items ?? '';
        }
      }

      // LLM Trust (ebm_cimo only)
      const llmTrust = survey.llmTrust || {};
      for (const [key, value] of Object.entries(llmTrust)) {
        row[`llmTrust_${key}`] = value ?? '';
      }

      // LLM Usefulness (ebm_cimo only)
      const llmUsefulness = survey.llmUsefulness || {};
      for (const [key, value] of Object.entries(llmUsefulness)) {
        row[`llmUsefulness_${key}`] = value ?? '';
      }

      // Resource helpfulness (ebm_cimo only)
      const resourceHelp = survey.resourceHelpfulness || {};
      for (const [key, value] of Object.entries(resourceHelp)) {
        row[`resourceHelpfulness_${key}`] = value ?? '';
      }

      // External tool usage
      const extTool = survey.externalToolUsage || {};
      row.externalToolUsage_usedExternalAi = extTool.usedExternalAi ?? '';
      row.externalToolUsage_usedExternalPdfViewer = extTool.usedExternalPdfViewer ?? '';
      row.externalToolUsage_externalAiTools = JSON.stringify(extTool.externalAiTools || []);
      row.externalToolUsage_externalPdfViewers = JSON.stringify(extTool.externalPdfViewers || []);

      // Attention check
      row.attentionCheck = survey.attentionCheck ?? '';

      // Study feedback
      row.studyFeedback = survey.studyFeedback || '';

      surveys.push(row);
    }
  }

  return surveys;
}

function transformChatHistory(rawData) {
  const chats = [];

  for (const [userId, userData] of Object.entries(rawData.users)) {
    for (const [sessionId, sessionData] of Object.entries(userData.sessions || {})) {
      const chatHistory = sessionData.reading?.chatHistory || [];

      chatHistory.forEach((chat, index) => {
        chats.push({
          sessionId,
          userId,
          userEmail: userData.email || '',
          condition: sessionData.condition || userData.condition || '',
          messageIndex: index,
          questionTime: chat.questionTime || '',
          question: chat.question || '',
          answerTime: chat.answerTime || '',
          answer: chat.answer || '',
          responseTime: chat.responseTime || '',
        });
      });
    }
  }

  return chats;
}

function transformReadingEvents(rawData) {
  const events = [];

  for (const [userId, userData] of Object.entries(rawData.users)) {
    for (const [sessionId, sessionData] of Object.entries(userData.sessions || {})) {
      const readingEvents = sessionData.reading?.events || [];

      readingEvents.forEach((event, index) => {
        const row = {
          sessionId,
          userId,
          userEmail: userData.email || '',
          condition: sessionData.condition || userData.condition || '',
          eventIndex: index,
          eventId: event.eventId || '',
          timestamp: event.timestamp || '',
          eventType: event.eventType || '',
          phase: event.phase || '',
          timeSinceLast: event.timeSinceLast ?? '',
        };

        // Event type-specific fields
        switch (event.eventType) {
          case 'focus_switch':
            row.focusFrom = event.from || '';
            row.focusTo = event.to || '';
            row.timeOnPreviousFocus = event.timeOnPreviousFocus ?? '';
            break;

          case 'resource_tab_switch':
            row.tabFrom = event.from || '';
            row.tabTo = event.to || '';
            break;

          case 'scroll_action':
            row.scrollY = event.scrollY ?? '';
            row.sectionBeforeScroll = event.sectionBeforeScroll || '';
            row.sectionAfterScroll = event.sectionAfterScroll || '';
            row.scrollClassification = event.classification || '';
            row.pauseDuration = event.pauseDuration ?? '';
            row.scrollDuration = event.scrollDuration ?? '';
            break;

          case 'pdf_activity':
            row.pdfAction = event.action || '';
            row.pdfState = event.state || '';
            row.previousState = event.previousState || '';
            row.timeInState = event.timeInState ?? '';
            break;

          case 'llm_question_asked':
            row.llmQuestion = event.question || '';
            row.llmQuestionLength = event.questionLength ?? '';
            break;

          case 'llm_answer_received':
            row.llmAnswerLength = event.answerLength ?? '';
            row.llmResponseTime = event.responseTime ?? '';
            break;

          case 'llm_activity':
            row.llmAction = event.action || '';
            row.llmState = event.state || '';
            row.llmPreviousState = event.previousState || '';
            row.llmTimeInState = event.timeInState ?? '';
            break;

          case 'window_focus_change':
            row.windowIsActive = event.isActive ?? '';
            row.windowPreviousState = event.previousState || '';
            row.windowPreviousDuration = event.previousDuration ?? '';
            break;

          case 'audio_play':
          case 'audio_pause':
          case 'audio_seeked':
          case 'audio_ended':
            row.audioCurrentTime = event.currentTime ?? '';
            break;

          case 'panel_resized':
            row.panelSize = event.size ?? '';
            break;
        }

        events.push(row);
      });
    }
  }

  return events;
}

// ============================================================
// 기술통계 함수
// ============================================================

function generateDescriptiveStats(rawData) {
  const stats = {
    generatedAt: new Date().toISOString(),
    experimentStartDate: rawData.experimentStartDate,
    summary: {},
    participants: {},
    sessions: {},
    readingBehavior: {},
    llmUsage: {},
    survey: {},
    byClass: {},
  };

  const users = Object.entries(rawData.users);
  const allSessions = users.flatMap(([userId, u]) =>
    Object.entries(u.sessions || {}).map(([sid, s]) => ({ ...s, sessionId: sid, userId, userCondition: u.condition }))
  );
  const completedSessions = allSessions.filter(s => s.currentPhase === 'complete');

  // ========== 1. 요약 ==========
  stats.summary = {
    totalUsers: users.length,
    totalSessions: allSessions.length,
    completedSessions: completedSessions.length,
    completionRate: round((completedSessions.length / allSessions.length) * 100, 1),
  };

  // ========== 2. 참가자 통계 ==========
  const conditionCounts = { control: 0, ebm_cimo: 0 };
  const usersWithComplete = { control: 0, ebm_cimo: 0 };
  const classCounts = {};

  users.forEach(([, u]) => {
    const cond = u.condition || 'unknown';
    if (conditionCounts[cond] !== undefined) conditionCounts[cond]++;

    const cls = u.class || 'unknown';
    classCounts[cls] = (classCounts[cls] || 0) + 1;

    const sessions = Object.values(u.sessions || {});
    if (sessions.some(s => s.currentPhase === 'complete')) {
      if (usersWithComplete[cond] !== undefined) usersWithComplete[cond]++;
    }
  });

  stats.participants = {
    byCondition: conditionCounts,
    byClass: classCounts,
    completedByCondition: usersWithComplete,
    completionRateByCondition: {
      control: round((usersWithComplete.control / conditionCounts.control) * 100, 1),
      ebm_cimo: round((usersWithComplete.ebm_cimo / conditionCounts.ebm_cimo) * 100, 1),
    },
  };

  // 다중 세션 사용자
  const multiSessionUsers = users
    .filter(([, u]) => Object.keys(u.sessions || {}).length > 1)
    .map(([, u]) => ({
      email: u.email,
      condition: u.condition,
      totalSessions: Object.keys(u.sessions || {}).length,
      completedSessions: Object.values(u.sessions || {}).filter(s => s.currentPhase === 'complete').length,
    }));
  stats.participants.multiSessionUsers = multiSessionUsers;

  // ========== 3. 세션 통계 ==========
  const sessionsByCondition = {
    control: allSessions.filter(s => s.condition === 'control' || s.userCondition === 'control'),
    ebm_cimo: allSessions.filter(s => s.condition === 'ebm_cimo' || s.userCondition === 'ebm_cimo'),
  };

  const phaseDistribution = {};
  allSessions.forEach(s => {
    const phase = s.currentPhase || 'unknown';
    phaseDistribution[phase] = (phaseDistribution[phase] || 0) + 1;
  });

  stats.sessions = {
    phaseDistribution,
    byCondition: {
      control: {
        total: sessionsByCondition.control.length,
        completed: sessionsByCondition.control.filter(s => s.currentPhase === 'complete').length,
      },
      ebm_cimo: {
        total: sessionsByCondition.ebm_cimo.length,
        completed: sessionsByCondition.ebm_cimo.filter(s => s.currentPhase === 'complete').length,
      },
    },
  };

  // ========== 4. 읽기 행동 통계 ==========
  const getReadingStats = (sessions) => {
    const completed = sessions.filter(s => s.currentPhase === 'complete' && s.reading);

    const totalDurations = completed.map(s => s.reading?.totalDuration).filter(d => d != null);
    const readingTimes = completed.map(s => s.reading?.focusTimes?.reading).filter(d => d != null);
    const chatTimes = completed.map(s => s.reading?.focusTimes?.chat).filter(d => d != null);

    return {
      n: completed.length,
      totalDuration: calcStats(totalDurations.map(d => d / 60000)), // minutes
      readingTime: calcStats(readingTimes.map(d => d / 60000)),
      chatTime: calcStats(chatTimes.map(d => d / 60000)),
    };
  };

  stats.readingBehavior = {
    overall: getReadingStats(allSessions),
    byCondition: {
      control: getReadingStats(sessionsByCondition.control),
      ebm_cimo: getReadingStats(sessionsByCondition.ebm_cimo),
    },
  };

  // 리소스 사용률 (조건별, focusTime >= 5초 기준)
  const ebmCompleted = sessionsByCondition.ebm_cimo.filter(s => s.currentPhase === 'complete');
  const controlCompletedForResource = sessionsByCondition.control.filter(s => s.currentPhase === 'complete');

  stats.readingBehavior.resourceUsage = {
    control: {
      infographics: controlCompletedForResource.filter(s => (s.reading?.focusTimes?.infographics || 0) >= 5000).length,
      video: controlCompletedForResource.filter(s => (s.reading?.focusTimes?.video || 0) >= 5000).length,
      audio: controlCompletedForResource.filter(s => (s.reading?.focusTimes?.audio || 0) >= 5000).length,
      chat: controlCompletedForResource.filter(s => (s.reading?.chatHistory || []).length >= 1).length,
      total: controlCompletedForResource.length,
    },
    ebm_cimo: {
      infographics: ebmCompleted.filter(s => (s.reading?.focusTimes?.infographics || 0) >= 5000).length,
      video: ebmCompleted.filter(s => (s.reading?.focusTimes?.video || 0) >= 5000).length,
      audio: ebmCompleted.filter(s => (s.reading?.focusTimes?.audio || 0) >= 5000).length,
      chat: ebmCompleted.filter(s => (s.reading?.chatHistory || []).length >= 1).length,
      total: ebmCompleted.length,
    },
  };

  // ========== 5. LLM 사용 통계 ==========
  const chatCounts = completedSessions.map(s => (s.reading?.chatHistory || []).length);
  const controlCompleted = sessionsByCondition.control.filter(s => s.currentPhase === 'complete');
  const controlChatCounts = controlCompleted.map(s => (s.reading?.chatHistory || []).length);
  const ebmChatCounts = ebmCompleted.map(s => (s.reading?.chatHistory || []).length);

  stats.llmUsage = {
    overall: calcStats(chatCounts),
    control: calcStats(controlChatCounts),
    ebm_cimo: calcStats(ebmChatCounts),
    totalMessages: chatCounts.reduce((a, b) => a + b, 0),
    anova: oneWayAnova(controlChatCounts, ebmChatCounts),
  };

  // 질문 길이, 응답 시간 통계
  const allChats = completedSessions.flatMap(s => s.reading?.chatHistory || []);
  const questionLengths = allChats.map(c => (c.question || '').length);
  const responseTimes = allChats.map(c => c.responseTime).filter(t => t != null);

  stats.llmUsage.questionLength = calcStats(questionLengths);
  stats.llmUsage.responseTime = calcStats(responseTimes.map(t => t / 1000)); // seconds

  // ========== 6. 설문 통계 ==========
  const surveySessions = completedSessions.filter(s => s.postStudySurvey);

  // NASA-TLX
  const nasaItems = ['mentalDemand', 'physicalDemand', 'temporalDemand', 'effort', 'frustration', 'performance'];
  const nasaStats = { overall: {}, byCondition: { control: {}, ebm_cimo: {} }, anova: {} };

  nasaItems.forEach(item => {
    const values = surveySessions.map(s => s.postStudySurvey?.nasaTLX?.[item]).filter(v => v != null);
    nasaStats.overall[item] = calcStats(values);

    const controlValues = surveySessions
      .filter(s => (s.condition || s.userCondition) === 'control')
      .map(s => s.postStudySurvey?.nasaTLX?.[item])
      .filter(v => v != null);
    const ebmValues = surveySessions
      .filter(s => (s.condition || s.userCondition) === 'ebm_cimo')
      .map(s => s.postStudySurvey?.nasaTLX?.[item])
      .filter(v => v != null);

    nasaStats.byCondition.control[item] = calcStats(controlValues);
    nasaStats.byCondition.ebm_cimo[item] = calcStats(ebmValues);
    nasaStats.anova[item] = oneWayAnova(controlValues, ebmValues);
  });

  stats.survey.nasaTLX = nasaStats;

  // Self-Efficacy (nested structure: overallComprehension, criticalEngagement, applicability)
  const selfEfficacySessions = surveySessions.filter(s => s.postStudySurvey?.selfEfficacy);
  if (selfEfficacySessions.length > 0) {
    const seStats = { overall: {}, byCondition: { control: {}, ebm_cimo: {} }, anova: {} };

    // Flatten nested structure: selfEfficacy.category.item
    const sampleSE = selfEfficacySessions[0].postStudySurvey.selfEfficacy;
    for (const [category, items] of Object.entries(sampleSE)) {
      if (typeof items === 'object' && items !== null) {
        if (!seStats.anova[category]) {
          seStats.anova[category] = {};
        }
        for (const itemKey of Object.keys(items)) {
          const flatKey = `${category}_${itemKey}`;

          const values = selfEfficacySessions
            .map(s => s.postStudySurvey?.selfEfficacy?.[category]?.[itemKey])
            .filter(v => typeof v === 'number');
          seStats.overall[flatKey] = calcStats(values);

          const controlValues = selfEfficacySessions
            .filter(s => (s.condition || s.userCondition) === 'control')
            .map(s => s.postStudySurvey?.selfEfficacy?.[category]?.[itemKey])
            .filter(v => typeof v === 'number');
          const ebmValues = selfEfficacySessions
            .filter(s => (s.condition || s.userCondition) === 'ebm_cimo')
            .map(s => s.postStudySurvey?.selfEfficacy?.[category]?.[itemKey])
            .filter(v => typeof v === 'number');

          if (!seStats.byCondition.control[category]) {
            seStats.byCondition.control[category] = {};
          }
          if (!seStats.byCondition.ebm_cimo[category]) {
            seStats.byCondition.ebm_cimo[category] = {};
          }
          seStats.byCondition.control[category][itemKey] = calcStats(controlValues);
          seStats.byCondition.ebm_cimo[category][itemKey] = calcStats(ebmValues);
          seStats.anova[category][itemKey] = oneWayAnova(controlValues, ebmValues);
        }
      }
    }

    stats.survey.selfEfficacy = seStats;
  }

  // LLM Trust (both conditions)
  const trustSessions = surveySessions.filter(s => s.postStudySurvey?.llmTrust);
  if (trustSessions.length > 0) {
    const trustItems = Object.keys(trustSessions[0].postStudySurvey.llmTrust);
    const trustStats = { byCondition: { control: {}, ebm_cimo: {} }, anova: {} };

    trustItems.forEach(item => {
      const controlValues = trustSessions
        .filter(s => (s.condition || s.userCondition) === 'control')
        .map(s => s.postStudySurvey?.llmTrust?.[item])
        .filter(v => v != null);
      const ebmValues = trustSessions
        .filter(s => (s.condition || s.userCondition) === 'ebm_cimo')
        .map(s => s.postStudySurvey?.llmTrust?.[item])
        .filter(v => v != null);

      trustStats.byCondition.control[item] = calcStats(controlValues);
      trustStats.byCondition.ebm_cimo[item] = calcStats(ebmValues);
      trustStats.anova[item] = oneWayAnova(controlValues, ebmValues);
    });

    stats.survey.llmTrust = trustStats;
  }

  // LLM Usefulness (both conditions)
  const usefulnessSessions = surveySessions.filter(s => s.postStudySurvey?.llmUsefulness);
  if (usefulnessSessions.length > 0) {
    const useItems = Object.keys(usefulnessSessions[0].postStudySurvey.llmUsefulness);
    const useStats = { byCondition: { control: {}, ebm_cimo: {} }, anova: {} };

    useItems.forEach(item => {
      const controlValues = usefulnessSessions
        .filter(s => (s.condition || s.userCondition) === 'control')
        .map(s => s.postStudySurvey?.llmUsefulness?.[item])
        .filter(v => v != null);
      const ebmValues = usefulnessSessions
        .filter(s => (s.condition || s.userCondition) === 'ebm_cimo')
        .map(s => s.postStudySurvey?.llmUsefulness?.[item])
        .filter(v => v != null);

      useStats.byCondition.control[item] = calcStats(controlValues);
      useStats.byCondition.ebm_cimo[item] = calcStats(ebmValues);
      useStats.anova[item] = oneWayAnova(controlValues, ebmValues);
    });

    stats.survey.llmUsefulness = useStats;
  }

  // Resource Helpfulness (both conditions)
  const resourceHelpSessions = surveySessions.filter(s => s.postStudySurvey?.resourceHelpfulness);
  if (resourceHelpSessions.length > 0) {
    const resItems = Object.keys(resourceHelpSessions[0].postStudySurvey.resourceHelpfulness);
    const resStats = { byCondition: { control: {}, ebm_cimo: {} }, anova: {} };

    resItems.forEach(item => {
      const controlValues = resourceHelpSessions
        .filter(s => (s.condition || s.userCondition) === 'control')
        .map(s => s.postStudySurvey?.resourceHelpfulness?.[item])
        .filter(v => v != null);
      const ebmValues = resourceHelpSessions
        .filter(s => (s.condition || s.userCondition) === 'ebm_cimo')
        .map(s => s.postStudySurvey?.resourceHelpfulness?.[item])
        .filter(v => v != null);

      resStats.byCondition.control[item] = calcStats(controlValues);
      resStats.byCondition.ebm_cimo[item] = calcStats(ebmValues);
      resStats.anova[item] = oneWayAnova(controlValues, ebmValues);
    });

    stats.survey.resourceHelpfulness = resStats;
  }

  // External Tool Usage (values are 'yes' or 'no' strings)
  const usedExternalAi = surveySessions.filter(s =>
    s.postStudySurvey?.externalToolUsage?.usedExternalAi === 'yes'
  ).length;
  const usedExternalPdf = surveySessions.filter(s =>
    s.postStudySurvey?.externalToolUsage?.usedExternalPdfViewer === 'yes'
  ).length;
  stats.survey.externalToolUsage = {
    usedExternalAi,
    usedExternalPdfViewer: usedExternalPdf,
    total: surveySessions.length,
    rateAi: round((usedExternalAi / surveySessions.length) * 100, 1),
    ratePdf: round((usedExternalPdf / surveySessions.length) * 100, 1),
  };

  // Post Task 통계
  const postTaskSessions = completedSessions.filter(s => s.postTask);
  if (postTaskSessions.length > 0) {
    const controlPostTask = postTaskSessions.filter(s => (s.condition || s.userCondition) === 'control');
    const ebmPostTask = postTaskSessions.filter(s => (s.condition || s.userCondition) === 'ebm_cimo');

    // Q1: strategies 답변 개수
    const strategiesCountsControl = controlPostTask.map(s => (s.postTask?.strategies || []).length);
    const strategiesCountsEbm = ebmPostTask.map(s => (s.postTask?.strategies || []).length);

    // Q2: contextTranslation 답변 개수
    const contextCountsControl = controlPostTask.map(s => (s.postTask?.contextTranslation || []).length);
    const contextCountsEbm = ebmPostTask.map(s => (s.postTask?.contextTranslation || []).length);

    // 설문 문항: newStrategyConfidence, implementationLikelihood
    const confidenceControl = controlPostTask.map(s => s.postTask?.newStrategyConfidence).filter(v => v != null);
    const confidenceEbm = ebmPostTask.map(s => s.postTask?.newStrategyConfidence).filter(v => v != null);
    const likelihoodControl = controlPostTask.map(s => s.postTask?.implementationLikelihood).filter(v => v != null);
    const likelihoodEbm = ebmPostTask.map(s => s.postTask?.implementationLikelihood).filter(v => v != null);

    stats.survey.postTask = {
      strategiesCount: {
        control: calcStats(strategiesCountsControl),
        ebm_cimo: calcStats(strategiesCountsEbm),
        anova: oneWayAnova(strategiesCountsControl, strategiesCountsEbm),
      },
      contextTranslationCount: {
        control: calcStats(contextCountsControl),
        ebm_cimo: calcStats(contextCountsEbm),
        anova: oneWayAnova(contextCountsControl, contextCountsEbm),
      },
      newStrategyConfidence: {
        control: calcStats(confidenceControl),
        ebm_cimo: calcStats(confidenceEbm),
        anova: oneWayAnova(confidenceControl, confidenceEbm),
      },
      implementationLikelihood: {
        control: calcStats(likelihoodControl),
        ebm_cimo: calcStats(likelihoodEbm),
        anova: oneWayAnova(likelihoodControl, likelihoodEbm),
      },
    };
  }

  // ========== Chat 사용자만 대상으로 한 분석 (chatUsersOnly) ==========
  const chatUsersSessions = completedSessions.filter(s => (s.reading?.chatHistory || []).length >= 1);
  const chatUsersSurvey = chatUsersSessions.filter(s => s.postStudySurvey);

  stats.chatUsersOnly = {
    sampleSize: {
      total: chatUsersSessions.length,
      control: chatUsersSessions.filter(s => (s.condition || s.userCondition) === 'control').length,
      ebm_cimo: chatUsersSessions.filter(s => (s.condition || s.userCondition) === 'ebm_cimo').length,
    },
    llmUsage: {},
    nasaTLX: { overall: {}, byCondition: { control: {}, ebm_cimo: {} }, anova: {} },
    selfEfficacy: { overall: {}, byCondition: { control: {}, ebm_cimo: {} }, anova: {} },
    postTask: {},
  };

  // LLM Usage (chat users only)
  const chatUsersControlCompleted = chatUsersSessions.filter(s => (s.condition || s.userCondition) === 'control');
  const chatUsersEbmCompleted = chatUsersSessions.filter(s => (s.condition || s.userCondition) === 'ebm_cimo');
  const chatUsersControlChatCounts = chatUsersControlCompleted.map(s => (s.reading?.chatHistory || []).length);
  const chatUsersEbmChatCounts = chatUsersEbmCompleted.map(s => (s.reading?.chatHistory || []).length);

  stats.chatUsersOnly.llmUsage = {
    control: calcStats(chatUsersControlChatCounts),
    ebm_cimo: calcStats(chatUsersEbmChatCounts),
    anova: oneWayAnova(chatUsersControlChatCounts, chatUsersEbmChatCounts),
  };

  // NASA-TLX (chat users only)
  nasaItems.forEach(item => {
    const controlValues = chatUsersSurvey
      .filter(s => (s.condition || s.userCondition) === 'control')
      .map(s => s.postStudySurvey?.nasaTLX?.[item])
      .filter(v => v != null);
    const ebmValues = chatUsersSurvey
      .filter(s => (s.condition || s.userCondition) === 'ebm_cimo')
      .map(s => s.postStudySurvey?.nasaTLX?.[item])
      .filter(v => v != null);

    stats.chatUsersOnly.nasaTLX.byCondition.control[item] = calcStats(controlValues);
    stats.chatUsersOnly.nasaTLX.byCondition.ebm_cimo[item] = calcStats(ebmValues);
    stats.chatUsersOnly.nasaTLX.anova[item] = oneWayAnova(controlValues, ebmValues);
  });

  // Self-Efficacy (chat users only)
  const chatUsersSE = chatUsersSurvey.filter(s => s.postStudySurvey?.selfEfficacy);
  if (chatUsersSE.length > 0) {
    const sampleSE = chatUsersSE[0].postStudySurvey.selfEfficacy;
    for (const [category, items] of Object.entries(sampleSE)) {
      if (typeof items === 'object' && items !== null) {
        if (!stats.chatUsersOnly.selfEfficacy.anova[category]) {
          stats.chatUsersOnly.selfEfficacy.anova[category] = {};
        }
        if (!stats.chatUsersOnly.selfEfficacy.byCondition.control[category]) {
          stats.chatUsersOnly.selfEfficacy.byCondition.control[category] = {};
        }
        if (!stats.chatUsersOnly.selfEfficacy.byCondition.ebm_cimo[category]) {
          stats.chatUsersOnly.selfEfficacy.byCondition.ebm_cimo[category] = {};
        }
        for (const itemKey of Object.keys(items)) {
          const controlValues = chatUsersSE
            .filter(s => (s.condition || s.userCondition) === 'control')
            .map(s => s.postStudySurvey?.selfEfficacy?.[category]?.[itemKey])
            .filter(v => typeof v === 'number');
          const ebmValues = chatUsersSE
            .filter(s => (s.condition || s.userCondition) === 'ebm_cimo')
            .map(s => s.postStudySurvey?.selfEfficacy?.[category]?.[itemKey])
            .filter(v => typeof v === 'number');

          stats.chatUsersOnly.selfEfficacy.byCondition.control[category][itemKey] = calcStats(controlValues);
          stats.chatUsersOnly.selfEfficacy.byCondition.ebm_cimo[category][itemKey] = calcStats(ebmValues);
          stats.chatUsersOnly.selfEfficacy.anova[category][itemKey] = oneWayAnova(controlValues, ebmValues);
        }
      }
    }
  }

  // Post Task (chat users only)
  const chatUsersPostTask = chatUsersSessions.filter(s => s.postTask);
  if (chatUsersPostTask.length > 0) {
    const chatUsersControlPT = chatUsersPostTask.filter(s => (s.condition || s.userCondition) === 'control');
    const chatUsersEbmPT = chatUsersPostTask.filter(s => (s.condition || s.userCondition) === 'ebm_cimo');

    const strategiesCountsCtrl = chatUsersControlPT.map(s => (s.postTask?.strategies || []).length);
    const strategiesCountsEbm = chatUsersEbmPT.map(s => (s.postTask?.strategies || []).length);
    const contextCountsCtrl = chatUsersControlPT.map(s => (s.postTask?.contextTranslation || []).length);
    const contextCountsEbm = chatUsersEbmPT.map(s => (s.postTask?.contextTranslation || []).length);
    const confidenceCtrl = chatUsersControlPT.map(s => s.postTask?.newStrategyConfidence).filter(v => v != null);
    const confidenceEbm = chatUsersEbmPT.map(s => s.postTask?.newStrategyConfidence).filter(v => v != null);
    const likelihoodCtrl = chatUsersControlPT.map(s => s.postTask?.implementationLikelihood).filter(v => v != null);
    const likelihoodEbm = chatUsersEbmPT.map(s => s.postTask?.implementationLikelihood).filter(v => v != null);

    stats.chatUsersOnly.postTask = {
      strategiesCount: {
        control: calcStats(strategiesCountsCtrl),
        ebm_cimo: calcStats(strategiesCountsEbm),
        anova: oneWayAnova(strategiesCountsCtrl, strategiesCountsEbm),
      },
      contextTranslationCount: {
        control: calcStats(contextCountsCtrl),
        ebm_cimo: calcStats(contextCountsEbm),
        anova: oneWayAnova(contextCountsCtrl, contextCountsEbm),
      },
      newStrategyConfidence: {
        control: calcStats(confidenceCtrl),
        ebm_cimo: calcStats(confidenceEbm),
        anova: oneWayAnova(confidenceCtrl, confidenceEbm),
      },
      implementationLikelihood: {
        control: calcStats(likelihoodCtrl),
        ebm_cimo: calcStats(likelihoodEbm),
        anova: oneWayAnova(likelihoodCtrl, likelihoodEbm),
      },
    };
  }

  // LLM Trust (chat users only)
  const chatUsersTrust = chatUsersSurvey.filter(s => s.postStudySurvey?.llmTrust);
  if (chatUsersTrust.length > 0) {
    const trustItems = Object.keys(chatUsersTrust[0].postStudySurvey.llmTrust);
    stats.chatUsersOnly.llmTrust = { byCondition: { control: {}, ebm_cimo: {} }, anova: {} };

    trustItems.forEach(item => {
      const controlValues = chatUsersTrust
        .filter(s => (s.condition || s.userCondition) === 'control')
        .map(s => s.postStudySurvey?.llmTrust?.[item])
        .filter(v => v != null);
      const ebmValues = chatUsersTrust
        .filter(s => (s.condition || s.userCondition) === 'ebm_cimo')
        .map(s => s.postStudySurvey?.llmTrust?.[item])
        .filter(v => v != null);

      stats.chatUsersOnly.llmTrust.byCondition.control[item] = calcStats(controlValues);
      stats.chatUsersOnly.llmTrust.byCondition.ebm_cimo[item] = calcStats(ebmValues);
      stats.chatUsersOnly.llmTrust.anova[item] = oneWayAnova(controlValues, ebmValues);
    });
  }

  // LLM Usefulness (chat users only)
  const chatUsersUsefulness = chatUsersSurvey.filter(s => s.postStudySurvey?.llmUsefulness);
  if (chatUsersUsefulness.length > 0) {
    const useItems = Object.keys(chatUsersUsefulness[0].postStudySurvey.llmUsefulness);
    stats.chatUsersOnly.llmUsefulness = { byCondition: { control: {}, ebm_cimo: {} }, anova: {} };

    useItems.forEach(item => {
      const controlValues = chatUsersUsefulness
        .filter(s => (s.condition || s.userCondition) === 'control')
        .map(s => s.postStudySurvey?.llmUsefulness?.[item])
        .filter(v => v != null);
      const ebmValues = chatUsersUsefulness
        .filter(s => (s.condition || s.userCondition) === 'ebm_cimo')
        .map(s => s.postStudySurvey?.llmUsefulness?.[item])
        .filter(v => v != null);

      stats.chatUsersOnly.llmUsefulness.byCondition.control[item] = calcStats(controlValues);
      stats.chatUsersOnly.llmUsefulness.byCondition.ebm_cimo[item] = calcStats(ebmValues);
      stats.chatUsersOnly.llmUsefulness.anova[item] = oneWayAnova(controlValues, ebmValues);
    });
  }

  // Resource Helpfulness (chat users only)
  const chatUsersResHelp = chatUsersSurvey.filter(s => s.postStudySurvey?.resourceHelpfulness);
  if (chatUsersResHelp.length > 0) {
    const resItems = Object.keys(chatUsersResHelp[0].postStudySurvey.resourceHelpfulness);
    stats.chatUsersOnly.resourceHelpfulness = { byCondition: { control: {}, ebm_cimo: {} }, anova: {} };

    resItems.forEach(item => {
      const controlValues = chatUsersResHelp
        .filter(s => (s.condition || s.userCondition) === 'control')
        .map(s => s.postStudySurvey?.resourceHelpfulness?.[item])
        .filter(v => v != null);
      const ebmValues = chatUsersResHelp
        .filter(s => (s.condition || s.userCondition) === 'ebm_cimo')
        .map(s => s.postStudySurvey?.resourceHelpfulness?.[item])
        .filter(v => v != null);

      stats.chatUsersOnly.resourceHelpfulness.byCondition.control[item] = calcStats(controlValues);
      stats.chatUsersOnly.resourceHelpfulness.byCondition.ebm_cimo[item] = calcStats(ebmValues);
      stats.chatUsersOnly.resourceHelpfulness.anova[item] = oneWayAnova(controlValues, ebmValues);
    });
  }

  // ========== 7. 클래스별 통계 ==========
  const classes = [...new Set(users.map(([, u]) => u.class))].filter(c => c);
  classes.forEach(cls => {
    const classUsers = users.filter(([, u]) => u.class === cls);
    const classSessions = classUsers.flatMap(([, u]) => Object.values(u.sessions || {}));
    const classCompleted = classSessions.filter(s => s.currentPhase === 'complete');

    stats.byClass[cls] = {
      users: classUsers.length,
      sessions: classSessions.length,
      completed: classCompleted.length,
      completionRate: round((classCompleted.length / classSessions.length) * 100, 1),
      conditionDistribution: {
        control: classUsers.filter(([, u]) => u.condition === 'control').length,
        ebm_cimo: classUsers.filter(([, u]) => u.condition === 'ebm_cimo').length,
      },
    };
  });

  // ========== 8. 참가자 피드백 ==========
  const feedbackList = [];
  users.forEach(([userId, u]) => {
    const sessions = Object.values(u.sessions || {});
    sessions.forEach(s => {
      const feedback = s.postStudySurvey?.studyFeedback;
      if (feedback && feedback.trim()) {
        feedbackList.push({
          email: u.email || userId,
          condition: s.condition || u.condition || 'unknown',
          class: u.class || 'unknown',
          feedback: feedback.trim(),
        });
      }
    });
  });
  stats.participantFeedback = feedbackList;

  return stats;
}

function formatStatsToText(stats) {
  let text = '';
  const line = '='.repeat(70);
  const subline = '-'.repeat(50);

  text += `${line}\n`;
  text += `기술통계 보고서 (Descriptive Statistics Report)\n`;
  text += `생성일시: ${stats.generatedAt}\n`;
  text += `실험 시작: ${stats.experimentStartDate}\n`;
  text += `${line}\n\n`;

  // 요약
  text += `[ 요약 ]\n`;
  text += `총 참가자: ${stats.summary.totalUsers}명\n`;
  text += `총 세션: ${stats.summary.totalSessions}개\n`;
  text += `완료 세션: ${stats.summary.completedSessions}개 (${stats.summary.completionRate}%)\n\n`;

  // 참가자 통계
  text += `[ 참가자 통계 ]\n`;
  text += `${subline}\n`;
  text += `조건별 배정:\n`;
  text += `  - control: ${stats.participants.byCondition.control}명\n`;
  text += `  - ebm_cimo: ${stats.participants.byCondition.ebm_cimo}명\n\n`;
  text += `완료율 (최소 1개 세션 완료):\n`;
  text += `  - control: ${stats.participants.completedByCondition.control}/${stats.participants.byCondition.control}명 (${stats.participants.completionRateByCondition.control}%)\n`;
  text += `  - ebm_cimo: ${stats.participants.completedByCondition.ebm_cimo}/${stats.participants.byCondition.ebm_cimo}명 (${stats.participants.completionRateByCondition.ebm_cimo}%)\n\n`;

  text += `클래스별 분포:\n`;
  for (const [cls, count] of Object.entries(stats.participants.byClass)) {
    text += `  - ${cls}: ${count}명\n`;
  }
  text += `\n`;

  if (stats.participants.multiSessionUsers.length > 0) {
    text += `다중 세션 사용자 (${stats.participants.multiSessionUsers.length}명):\n`;
    stats.participants.multiSessionUsers.forEach(u => {
      text += `  - ${u.email}: ${u.totalSessions}개 세션 (완료: ${u.completedSessions}개) [${u.condition}]\n`;
    });
    text += `\n`;
  }

  // 세션 통계
  text += `[ 세션 통계 ]\n`;
  text += `${subline}\n`;
  text += `상태별 분포:\n`;
  for (const [phase, count] of Object.entries(stats.sessions.phaseDistribution)) {
    text += `  - ${phase}: ${count}개\n`;
  }
  text += `\n`;

  // 읽기 행동
  text += `[ 읽기 행동 통계 ]\n`;
  text += `${subline}\n`;

  const formatStatLine = (label, stat) => {
    if (!stat || stat.n === 0) return `  ${label}: 데이터 없음\n`;
    return `  ${label}: M=${stat.mean}, SD=${stat.sd}, Min=${stat.min}, Max=${stat.max}, Median=${stat.median} (n=${stat.n})\n`;
  };

  text += `\n전체:\n`;
  text += formatStatLine('총 소요 시간 (분)', stats.readingBehavior.overall.totalDuration);
  text += formatStatLine('읽기 시간 (분)', stats.readingBehavior.overall.readingTime);
  text += formatStatLine('채팅 시간 (분)', stats.readingBehavior.overall.chatTime);

  text += `\nControl 그룹:\n`;
  text += formatStatLine('총 소요 시간 (분)', stats.readingBehavior.byCondition.control.totalDuration);
  text += formatStatLine('읽기 시간 (분)', stats.readingBehavior.byCondition.control.readingTime);

  text += `\nEBM-CIMO 그룹:\n`;
  text += formatStatLine('총 소요 시간 (분)', stats.readingBehavior.byCondition.ebm_cimo.totalDuration);
  text += formatStatLine('읽기 시간 (분)', stats.readingBehavior.byCondition.ebm_cimo.readingTime);
  text += formatStatLine('채팅 시간 (분)', stats.readingBehavior.byCondition.ebm_cimo.chatTime);

  if (stats.readingBehavior.resourceUsage) {
    const ruCtrl = stats.readingBehavior.resourceUsage.control;
    const ruEbm = stats.readingBehavior.resourceUsage.ebm_cimo;
    text += `\n리소스 사용 (focusTime >= 5초):\n`;
    text += `                        Control (n=${ruCtrl.total})     EBM-CIMO (n=${ruEbm.total})\n`;
    text += `  - Infographics:       ${ruCtrl.infographics}명 (${round((ruCtrl.infographics/ruCtrl.total)*100, 1)}%)            ${ruEbm.infographics}명 (${round((ruEbm.infographics/ruEbm.total)*100, 1)}%)\n`;
    text += `  - Video:              ${ruCtrl.video}명 (${round((ruCtrl.video/ruCtrl.total)*100, 1)}%)            ${ruEbm.video}명 (${round((ruEbm.video/ruEbm.total)*100, 1)}%)\n`;
    text += `  - Audio/Podcast:      ${ruCtrl.audio}명 (${round((ruCtrl.audio/ruCtrl.total)*100, 1)}%)            ${ruEbm.audio}명 (${round((ruEbm.audio/ruEbm.total)*100, 1)}%)\n`;
    text += `  - Chat (1회 이상):    ${ruCtrl.chat}명 (${round((ruCtrl.chat/ruCtrl.total)*100, 1)}%)            ${ruEbm.chat}명 (${round((ruEbm.chat/ruEbm.total)*100, 1)}%)\n`;
  }
  text += `\n`;

  // LLM 사용
  text += `[ LLM 사용 통계 ]\n`;
  text += `${subline}\n`;
  text += `총 메시지 수: ${stats.llmUsage.totalMessages}개\n`;
  text += formatStatLine('세션당 메시지 수 (전체)', stats.llmUsage.overall);
  text += formatStatLine('세션당 메시지 수 (Control)', stats.llmUsage.control);
  text += formatStatLine('세션당 메시지 수 (EBM-CIMO)', stats.llmUsage.ebm_cimo);
  text += formatStatLine('질문 길이 (문자)', stats.llmUsage.questionLength);
  text += formatStatLine('응답 시간 (초)', stats.llmUsage.responseTime);
  text += `\n`;

  // 설문 통계
  text += `[ 설문 통계 ]\n`;
  text += `${subline}\n`;

  if (stats.survey.nasaTLX) {
    text += `\nNASA-TLX (1-7점):\n`;
    text += `                        Control                    EBM-CIMO\n`;
    text += `  항목              M(SD)                      M(SD)\n`;
    for (const item of Object.keys(stats.survey.nasaTLX.overall)) {
      const ctrl = stats.survey.nasaTLX.byCondition.control[item];
      const ebm = stats.survey.nasaTLX.byCondition.ebm_cimo[item];
      const ctrlStr = ctrl?.n > 0 ? `${ctrl.mean}(${ctrl.sd})` : 'N/A';
      const ebmStr = ebm?.n > 0 ? `${ebm.mean}(${ebm.sd})` : 'N/A';
      text += `  ${item.padEnd(18)} ${ctrlStr.padEnd(25)} ${ebmStr}\n`;
    }
  }

  if (stats.survey.selfEfficacy) {
    text += `\nSelf-Efficacy (1-7점):\n`;
    const seByCondition = stats.survey.selfEfficacy.byCondition;
    const categories = ['overallComprehension', 'criticalEngagement', 'applicability'];

    for (const category of categories) {
      const ctrlCat = seByCondition.control[category] || {};
      const ebmCat = seByCondition.ebm_cimo[category] || {};
      const items = Object.keys(ctrlCat).slice(0, 2); // 카테고리당 2개만 표시

      if (items.length > 0) {
        text += `  [${category}]\n`;
        text += `                          Control                    EBM-CIMO\n`;
        for (const item of items) {
          const ctrl = ctrlCat[item];
          const ebm = ebmCat[item];
          const ctrlStr = ctrl?.n > 0 ? `${ctrl.mean}(${ctrl.sd})` : 'N/A';
          const ebmStr = ebm?.n > 0 ? `${ebm.mean}(${ebm.sd})` : 'N/A';
          text += `    ${item.padEnd(24)} ${ctrlStr.padEnd(25)} ${ebmStr}\n`;
        }
      }
    }
    text += `  ... (추가 항목은 JSON 파일 참조)\n`;
  }

  if (stats.survey.externalToolUsage) {
    const ext = stats.survey.externalToolUsage;
    text += `\n외부 도구 사용:\n`;
    text += `  - 외부 AI 도구: ${ext.usedExternalAi}/${ext.total}명 (${ext.rateAi}%)\n`;
    text += `  - 외부 PDF 뷰어: ${ext.usedExternalPdfViewer}/${ext.total}명 (${ext.ratePdf}%)\n`;
  }

  if (stats.survey.postTask) {
    const pt = stats.survey.postTask;
    text += `\nPost Task:\n`;
    text += `                          Control                    EBM-CIMO\n`;
    const ctrlStrat = pt.strategiesCount.control;
    const ebmStrat = pt.strategiesCount.ebm_cimo;
    text += `  Q1 답변 개수            ${ctrlStrat?.n > 0 ? `${ctrlStrat.mean}(${ctrlStrat.sd})` : 'N/A'.padEnd(25)} ${ebmStrat?.n > 0 ? `${ebmStrat.mean}(${ebmStrat.sd})` : 'N/A'}\n`;
    const ctrlCtx = pt.contextTranslationCount.control;
    const ebmCtx = pt.contextTranslationCount.ebm_cimo;
    text += `  Q2 답변 개수            ${ctrlCtx?.n > 0 ? `${ctrlCtx.mean}(${ctrlCtx.sd})` : 'N/A'.padEnd(25)} ${ebmCtx?.n > 0 ? `${ebmCtx.mean}(${ebmCtx.sd})` : 'N/A'}\n`;
    const ctrlConf = pt.newStrategyConfidence.control;
    const ebmConf = pt.newStrategyConfidence.ebm_cimo;
    text += `  새 전략 자신감 (1-7)    ${ctrlConf?.n > 0 ? `${ctrlConf.mean}(${ctrlConf.sd})` : 'N/A'.padEnd(25)} ${ebmConf?.n > 0 ? `${ebmConf.mean}(${ebmConf.sd})` : 'N/A'}\n`;
    const ctrlLike = pt.implementationLikelihood.control;
    const ebmLike = pt.implementationLikelihood.ebm_cimo;
    text += `  실행 가능성 (1-7)       ${ctrlLike?.n > 0 ? `${ctrlLike.mean}(${ctrlLike.sd})` : 'N/A'.padEnd(25)} ${ebmLike?.n > 0 ? `${ebmLike.mean}(${ebmLike.sd})` : 'N/A'}\n`;
  }

  text += `\n`;

  // ========== Chat 사용자만 대상 분석 ==========
  if (stats.chatUsersOnly) {
    const cu = stats.chatUsersOnly;
    text += `${'='.repeat(70)}\n`;
    text += `[ Chat 사용자 대상 분석 (Chat 1회 이상 사용) ]\n`;
    text += `${subline}\n`;
    text += `\n표본 크기: 전체 ${cu.sampleSize.total}명 (Control: ${cu.sampleSize.control}명, EBM-CIMO: ${cu.sampleSize.ebm_cimo}명)\n`;

    if (cu.llmUsage) {
      text += `\nLLM 사용 통계:\n`;
      text += `                        Control                    EBM-CIMO\n`;
      const ctrl = cu.llmUsage.control;
      const ebm = cu.llmUsage.ebm_cimo;
      text += `  메시지 수             ${ctrl?.n > 0 ? `${ctrl.mean}(${ctrl.sd})` : 'N/A'.padEnd(25)} ${ebm?.n > 0 ? `${ebm.mean}(${ebm.sd})` : 'N/A'}\n`;
    }

    if (cu.nasaTLX && cu.nasaTLX.byCondition) {
      text += `\nNASA-TLX (1-7점):\n`;
      text += `                        Control                    EBM-CIMO\n`;
      text += `  항목              M(SD)                      M(SD)\n`;
      const nasaItems = ['mentalDemand', 'physicalDemand', 'temporalDemand', 'effort', 'frustration', 'performance'];
      for (const item of nasaItems) {
        const ctrl = cu.nasaTLX.byCondition.control?.[item];
        const ebm = cu.nasaTLX.byCondition.ebm_cimo?.[item];
        if (ctrl || ebm) {
          const ctrlStr = ctrl?.n > 0 ? `${ctrl.mean}(${ctrl.sd})` : 'N/A';
          const ebmStr = ebm?.n > 0 ? `${ebm.mean}(${ebm.sd})` : 'N/A';
          text += `  ${item.padEnd(18)} ${ctrlStr.padEnd(25)} ${ebmStr}\n`;
        }
      }
    }

    if (cu.selfEfficacy && cu.selfEfficacy.byCondition) {
      text += `\nSelf-Efficacy (1-7점):\n`;
      const seByCondition = cu.selfEfficacy.byCondition;
      const categories = ['overallComprehension', 'criticalEngagement', 'applicability'];
      for (const category of categories) {
        const ctrlCat = seByCondition.control?.[category] || {};
        const ebmCat = seByCondition.ebm_cimo?.[category] || {};
        const items = Object.keys(ctrlCat).slice(0, 2);
        if (items.length > 0) {
          text += `  [${category}]\n`;
          text += `                          Control                    EBM-CIMO\n`;
          for (const item of items) {
            const ctrl = ctrlCat[item];
            const ebm = ebmCat[item];
            const ctrlStr = ctrl?.n > 0 ? `${ctrl.mean}(${ctrl.sd})` : 'N/A';
            const ebmStr = ebm?.n > 0 ? `${ebm.mean}(${ebm.sd})` : 'N/A';
            text += `    ${item.padEnd(24)} ${ctrlStr.padEnd(25)} ${ebmStr}\n`;
          }
        }
      }
      text += `  ... (추가 항목은 JSON 파일 참조)\n`;
    }

    if (cu.postTask) {
      const pt = cu.postTask;
      text += `\nPost Task:\n`;
      text += `                          Control                    EBM-CIMO\n`;
      const ctrlStrat = pt.strategiesCount?.control;
      const ebmStrat = pt.strategiesCount?.ebm_cimo;
      text += `  Q1 답변 개수            ${ctrlStrat?.n > 0 ? `${ctrlStrat.mean}(${ctrlStrat.sd})` : 'N/A'.padEnd(25)} ${ebmStrat?.n > 0 ? `${ebmStrat.mean}(${ebmStrat.sd})` : 'N/A'}\n`;
      const ctrlCtx = pt.contextTranslationCount?.control;
      const ebmCtx = pt.contextTranslationCount?.ebm_cimo;
      text += `  Q2 답변 개수            ${ctrlCtx?.n > 0 ? `${ctrlCtx.mean}(${ctrlCtx.sd})` : 'N/A'.padEnd(25)} ${ebmCtx?.n > 0 ? `${ebmCtx.mean}(${ebmCtx.sd})` : 'N/A'}\n`;
      const ctrlConf = pt.newStrategyConfidence?.control;
      const ebmConf = pt.newStrategyConfidence?.ebm_cimo;
      text += `  새 전략 자신감 (1-7)    ${ctrlConf?.n > 0 ? `${ctrlConf.mean}(${ctrlConf.sd})` : 'N/A'.padEnd(25)} ${ebmConf?.n > 0 ? `${ebmConf.mean}(${ebmConf.sd})` : 'N/A'}\n`;
      const ctrlLike = pt.implementationLikelihood?.control;
      const ebmLike = pt.implementationLikelihood?.ebm_cimo;
      text += `  실행 가능성 (1-7)       ${ctrlLike?.n > 0 ? `${ctrlLike.mean}(${ctrlLike.sd})` : 'N/A'.padEnd(25)} ${ebmLike?.n > 0 ? `${ebmLike.mean}(${ebmLike.sd})` : 'N/A'}\n`;
    }

    text += `\n`;
  }

  // 클래스별
  text += `[ 클래스별 통계 ]\n`;
  text += `${subline}\n`;
  for (const [cls, data] of Object.entries(stats.byClass)) {
    text += `\n${cls}:\n`;
    text += `  참가자: ${data.users}명 (control: ${data.conditionDistribution.control}, ebm_cimo: ${data.conditionDistribution.ebm_cimo})\n`;
    text += `  세션: ${data.sessions}개 (완료: ${data.completed}개, ${data.completionRate}%)\n`;
  }

  // 참가자 피드백
  if (stats.participantFeedback && stats.participantFeedback.length > 0) {
    text += `\n[ 참가자 피드백 (${stats.participantFeedback.length}명) ]\n`;
    text += `${subline}\n`;
    stats.participantFeedback.forEach((fb, idx) => {
      text += `\n[${idx + 1}] ${fb.email} (${fb.condition}, ${fb.class})\n`;
      text += `${fb.feedback}\n`;
    });
  }

  text += `\n${line}\n`;
  text += `상세 데이터는 descriptive_stats.json 파일을 참조하세요.\n`;

  return text;
}

function formatStatsToMarkdown(stats) {
  let md = '';

  md += `# 기술통계 보고서 (Descriptive Statistics Report)\n\n`;
  md += `- **생성일시**: ${stats.generatedAt}\n`;
  md += `- **실험 시작**: ${stats.experimentStartDate}\n\n`;

  // Table of Contents
  md += `## 목차\n\n`;
  md += `1. [요약](#요약)\n`;
  md += `2. [참가자 통계](#참가자-통계)\n`;
  md += `3. [세션 통계](#세션-통계)\n`;
  md += `4. [읽기 행동 통계](#읽기-행동-통계)\n`;
  md += `5. [LLM 사용 통계](#llm-사용-통계)\n`;
  md += `6. [설문 통계](#설문-통계)\n`;
  md += `   - [Post Task](#post-task)\n`;
  md += `   - [NASA-TLX](#nasa-tlx-1-7점)\n`;
  md += `   - [Self-Efficacy](#self-efficacy-1-7점)\n`;
  md += `   - [LLM Trust](#llm-trust)\n`;
  md += `   - [LLM Usefulness](#llm-usefulness)\n`;
  md += `   - [Resource Helpfulness](#resource-helpfulness)\n`;
  md += `7. [Chat 사용자 대상 분석](#chat-사용자-대상-분석-chat-1회-이상-사용)\n`;
  md += `   - [Post Task](#post-task-1)\n`;
  md += `   - [NASA-TLX](#nasa-tlx-1-7점-1)\n`;
  md += `   - [Self-Efficacy](#self-efficacy-1-7점-1)\n`;
  md += `   - [LLM Trust](#llm-trust-1)\n`;
  md += `   - [LLM Usefulness](#llm-usefulness-1)\n`;
  md += `   - [Resource Helpfulness](#resource-helpfulness-1)\n`;
  md += `8. [클래스별 통계](#클래스별-통계)\n`;
  md += `9. [참가자 피드백](#참가자-피드백)\n\n`;

  // 요약
  md += `## 요약\n\n`;
  md += `| 항목 | 값 |\n|------|----|\n`;
  md += `| 총 참가자 | ${stats.summary.totalUsers}명 |\n`;
  md += `| 총 세션 | ${stats.summary.totalSessions}개 |\n`;
  md += `| 완료 세션 | ${stats.summary.completedSessions}개 (${stats.summary.completionRate}%) |\n\n`;

  // 참가자 통계
  md += `## 참가자 통계\n\n`;
  md += `### 조건별 배정\n\n`;
  md += `| 조건 | 참가자 수 | 완료 | 완료율 |\n|------|----------|------|-------|\n`;
  md += `| Control | ${stats.participants.byCondition.control}명 | ${stats.participants.completedByCondition.control}명 | ${stats.participants.completionRateByCondition.control}% |\n`;
  md += `| EBM-CIMO | ${stats.participants.byCondition.ebm_cimo}명 | ${stats.participants.completedByCondition.ebm_cimo}명 | ${stats.participants.completionRateByCondition.ebm_cimo}% |\n\n`;

  md += `### 클래스별 분포\n\n`;
  md += `| 클래스 | 참가자 수 |\n|--------|----------|\n`;
  for (const [cls, count] of Object.entries(stats.participants.byClass)) {
    md += `| ${cls} | ${count}명 |\n`;
  }
  md += `\n`;

  if (stats.participants.multiSessionUsers.length > 0) {
    md += `### 다중 세션 사용자 (${stats.participants.multiSessionUsers.length}명)\n\n`;
    md += `| 이메일 | 총 세션 | 완료 | 조건 |\n|--------|---------|------|------|\n`;
    stats.participants.multiSessionUsers.forEach(u => {
      md += `| ${u.email} | ${u.totalSessions}개 | ${u.completedSessions}개 | ${u.condition} |\n`;
    });
    md += `\n`;
  }

  // 세션 통계
  md += `## 세션 통계\n\n`;
  md += `### 상태별 분포\n\n`;
  md += `| 상태 | 개수 |\n|------|------|\n`;
  for (const [phase, count] of Object.entries(stats.sessions.phaseDistribution)) {
    md += `| ${phase} | ${count}개 |\n`;
  }
  md += `\n`;

  // 읽기 행동
  md += `## 읽기 행동 통계\n\n`;

  const formatStatRow = (stat) => {
    if (!stat || stat.n === 0) return '- | - | - | - | -';
    return `${stat.mean} | ${stat.sd} | ${stat.min} | ${stat.max} | ${stat.median}`;
  };

  md += `### 전체\n\n`;
  md += `| 지표 | M | SD | Min | Max | Median | n |\n|------|---|----|----|-----|--------|---|\n`;
  md += `| 총 소요 시간 (분) | ${formatStatRow(stats.readingBehavior.overall.totalDuration)} | ${stats.readingBehavior.overall.totalDuration?.n || 0} |\n`;
  md += `| 읽기 시간 (분) | ${formatStatRow(stats.readingBehavior.overall.readingTime)} | ${stats.readingBehavior.overall.readingTime?.n || 0} |\n`;
  md += `| 채팅 시간 (분) | ${formatStatRow(stats.readingBehavior.overall.chatTime)} | ${stats.readingBehavior.overall.chatTime?.n || 0} |\n\n`;

  md += `### 조건별 비교\n\n`;
  md += `| 지표 | Control M(SD) | EBM-CIMO M(SD) |\n|------|---------------|----------------|\n`;

  const fmtMS = (stat) => stat?.n > 0 ? `${stat.mean} (${stat.sd})` : 'N/A';
  md += `| 총 소요 시간 (분) | ${fmtMS(stats.readingBehavior.byCondition.control.totalDuration)} | ${fmtMS(stats.readingBehavior.byCondition.ebm_cimo.totalDuration)} |\n`;
  md += `| 읽기 시간 (분) | ${fmtMS(stats.readingBehavior.byCondition.control.readingTime)} | ${fmtMS(stats.readingBehavior.byCondition.ebm_cimo.readingTime)} |\n`;
  md += `| 채팅 시간 (분) | ${fmtMS(stats.readingBehavior.byCondition.control.chatTime)} | ${fmtMS(stats.readingBehavior.byCondition.ebm_cimo.chatTime)} |\n\n`;

  if (stats.readingBehavior.resourceUsage) {
    const ruCtrl = stats.readingBehavior.resourceUsage.control;
    const ruEbm = stats.readingBehavior.resourceUsage.ebm_cimo;
    md += `### 리소스 사용 (focusTime >= 5초)\n\n`;
    md += `| 리소스 | Control (n=${ruCtrl.total}) | EBM-CIMO (n=${ruEbm.total}) |\n|--------|----------|----------|\n`;
    md += `| Infographics | ${ruCtrl.infographics}명 (${round((ruCtrl.infographics/ruCtrl.total)*100, 1)}%) | ${ruEbm.infographics}명 (${round((ruEbm.infographics/ruEbm.total)*100, 1)}%) |\n`;
    md += `| Video | ${ruCtrl.video}명 (${round((ruCtrl.video/ruCtrl.total)*100, 1)}%) | ${ruEbm.video}명 (${round((ruEbm.video/ruEbm.total)*100, 1)}%) |\n`;
    md += `| Audio/Podcast | ${ruCtrl.audio}명 (${round((ruCtrl.audio/ruCtrl.total)*100, 1)}%) | ${ruEbm.audio}명 (${round((ruEbm.audio/ruEbm.total)*100, 1)}%) |\n`;
    md += `| Chat (1회 이상) | ${ruCtrl.chat}명 (${round((ruCtrl.chat/ruCtrl.total)*100, 1)}%) | ${ruEbm.chat}명 (${round((ruEbm.chat/ruEbm.total)*100, 1)}%) |\n\n`;
  }

  // LLM 사용
  md += `## LLM 사용 통계\n\n`;
  md += `- **총 메시지 수**: ${stats.llmUsage.totalMessages}개\n\n`;
  md += `| 지표 | M | SD | Min | Max | Median | n |\n|------|---|----|----|-----|--------|---|\n`;
  md += `| 세션당 메시지 수 (전체) | ${formatStatRow(stats.llmUsage.overall)} | ${stats.llmUsage.overall?.n || 0} |\n`;
  md += `| ㄴ Control | ${formatStatRow(stats.llmUsage.control)} | ${stats.llmUsage.control?.n || 0} |\n`;
  md += `| ㄴ EBM-CIMO | ${formatStatRow(stats.llmUsage.ebm_cimo)} | ${stats.llmUsage.ebm_cimo?.n || 0} |\n`;
  md += `| 질문 길이 (문자) | ${formatStatRow(stats.llmUsage.questionLength)} | ${stats.llmUsage.questionLength?.n || 0} |\n`;
  md += `| 응답 시간 (초) | ${formatStatRow(stats.llmUsage.responseTime)} | ${stats.llmUsage.responseTime?.n || 0} |\n\n`;

  // LLM ANOVA 결과
  if (stats.llmUsage.anova) {
    const anova = formatAnovaResult(stats.llmUsage.anova);
    md += `**조건 비교 (One-way ANOVA)**\n\n`;
    md += `| 지표 | 높은 조건 | p-value |\n|------|----------|--------|\n`;
    md += `| 세션당 메시지 수 | ${anova.higher} | ${anova.pValue} |\n\n`;
  }

  // Chat Viewer 링크
  if (stats.llmUsage.totalMessages > 0) {
    md += `**Chat 대화 내역 보기**\n\n`;
    md += `> [Chat Viewer](https://bae4147.github.io/paper-understanding-mba/chat-viewer.html) - 참가자별 LLM 대화 내역을 확인할 수 있습니다.\n\n`;
  }

  // 설문 통계
  md += `## 설문 통계\n\n`;
  md += `> **분석 기법**: One-way ANOVA (두 조건 간 평균 비교)\n\n`;

  if (stats.survey.postTask) {
    const pt = stats.survey.postTask;
    const anovaQ1 = pt.strategiesCount.anova ? formatAnovaResult(pt.strategiesCount.anova) : { higher: '-', pValue: '-' };
    const anovaQ2 = pt.contextTranslationCount.anova ? formatAnovaResult(pt.contextTranslationCount.anova) : { higher: '-', pValue: '-' };
    const anovaConf = pt.newStrategyConfidence.anova ? formatAnovaResult(pt.newStrategyConfidence.anova) : { higher: '-', pValue: '-' };
    const anovaLike = pt.implementationLikelihood.anova ? formatAnovaResult(pt.implementationLikelihood.anova) : { higher: '-', pValue: '-' };

    md += `### Post Task\n\n`;
    md += `| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |\n|------|---------------|----------------|----------|--------|------|\n`;
    md += `| Q1 답변 개수 | ${fmtMS(pt.strategiesCount.control)} | ${fmtMS(pt.strategiesCount.ebm_cimo)} | ${anovaQ1.higher} | ${anovaQ1.pValue} | 실천 전략 (Strategies) |\n`;
    md += `| Q2 답변 개수 | ${fmtMS(pt.contextTranslationCount.control)} | ${fmtMS(pt.contextTranslationCount.ebm_cimo)} | ${anovaQ2.higher} | ${anovaQ2.pValue} | 맥락 전환 (Context Translation) |\n`;
    md += `| 새 전략 자신감 | ${fmtMS(pt.newStrategyConfidence.control)} | ${fmtMS(pt.newStrategyConfidence.ebm_cimo)} | ${anovaConf.higher} | ${anovaConf.pValue} | 1-7점 |\n`;
    md += `| 실행 가능성 | ${fmtMS(pt.implementationLikelihood.control)} | ${fmtMS(pt.implementationLikelihood.ebm_cimo)} | ${anovaLike.higher} | ${anovaLike.pValue} | 1-7점 |\n\n`;
  }

  if (stats.survey.nasaTLX) {
    md += `### NASA-TLX (1-7점)\n\n`;
    md += `| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |\n|------|---------------|----------------|----------|--------|\n`;
    for (const item of Object.keys(stats.survey.nasaTLX.overall)) {
      const ctrl = stats.survey.nasaTLX.byCondition.control[item];
      const ebm = stats.survey.nasaTLX.byCondition.ebm_cimo[item];
      const anova = stats.survey.nasaTLX.anova?.[item] ? formatAnovaResult(stats.survey.nasaTLX.anova[item]) : { higher: '-', pValue: '-' };
      md += `| ${item} | ${fmtMS(ctrl)} | ${fmtMS(ebm)} | ${anova.higher} | ${anova.pValue} |\n`;
    }
    md += `\n`;
  }

  if (stats.survey.selfEfficacy) {
    md += `### Self-Efficacy (1-7점)\n\n`;
    const seByCondition = stats.survey.selfEfficacy.byCondition;
    const seAnova = stats.survey.selfEfficacy.anova || {};
    const categories = ['overallComprehension', 'criticalEngagement', 'applicability'];

    for (const category of categories) {
      const ctrlCat = seByCondition.control[category] || {};
      const ebmCat = seByCondition.ebm_cimo[category] || {};
      const anovaCat = seAnova[category] || {};
      const items = Object.keys(ctrlCat);
      const questionMap = SELF_EFFICACY_QUESTIONS[category] || {};
      const categoryTitle = questionMap._title || category;

      if (items.length > 0) {
        md += `#### ${categoryTitle}\n\n`;
        md += `| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |\n|------|---------------|----------------|----------|--------|------|\n`;
        for (const item of items) {
          const ctrl = ctrlCat[item];
          const ebm = ebmCat[item];
          const anova = anovaCat[item] ? formatAnovaResult(anovaCat[item]) : { higher: '-', pValue: '-' };
          const question = questionMap[item] || item;
          md += `| ${item} | ${fmtMS(ctrl)} | ${fmtMS(ebm)} | ${anova.higher} | ${anova.pValue} | ${question} |\n`;
        }
        md += `\n`;
      }
    }
  }

  if (stats.survey.externalToolUsage) {
    const ext = stats.survey.externalToolUsage;
    md += `### 외부 도구 사용\n\n`;
    md += `| 도구 | 사용자 수 | 비율 |\n|------|----------|------|\n`;
    md += `| 외부 AI 도구 | ${ext.usedExternalAi}/${ext.total}명 | ${ext.rateAi}% |\n`;
    md += `| 외부 PDF 뷰어 | ${ext.usedExternalPdfViewer}/${ext.total}명 | ${ext.ratePdf}% |\n\n`;
  }

  // ========== LLM 관련 설문 (설문 통계에 포함) ==========
  const hasLlmSurveys = stats.survey.llmTrust || stats.survey.llmUsefulness || stats.survey.resourceHelpfulness;
  if (hasLlmSurveys) {
    // LLM Trust
    if (stats.survey.llmTrust?.byCondition) {
      const trust = stats.survey.llmTrust;
      md += `### LLM Trust\n\n`;
      md += `| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |\n|------|---------------|----------------|----------|--------|------|\n`;
      for (const item of Object.keys(trust.byCondition.control)) {
        const ctrl = trust.byCondition.control[item];
        const ebm = trust.byCondition.ebm_cimo[item];
        const anova = trust.anova?.[item] ? formatAnovaResult(trust.anova[item]) : { higher: '-', pValue: '-' };
        const question = LLM_TRUST_QUESTIONS[item] || '';
        md += `| ${item} | ${fmtMS(ctrl)} | ${fmtMS(ebm)} | ${anova.higher} | ${anova.pValue} | ${question} |\n`;
      }
      md += `\n`;
    }

    // LLM Usefulness
    if (stats.survey.llmUsefulness?.byCondition) {
      const useful = stats.survey.llmUsefulness;
      md += `### LLM Usefulness\n\n`;
      md += `| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |\n|------|---------------|----------------|----------|--------|------|\n`;
      for (const item of Object.keys(useful.byCondition.control)) {
        const ctrl = useful.byCondition.control[item];
        const ebm = useful.byCondition.ebm_cimo[item];
        const anova = useful.anova?.[item] ? formatAnovaResult(useful.anova[item]) : { higher: '-', pValue: '-' };
        const question = LLM_USEFULNESS_QUESTIONS[item] || '';
        md += `| ${item} | ${fmtMS(ctrl)} | ${fmtMS(ebm)} | ${anova.higher} | ${anova.pValue} | ${question} |\n`;
      }
      md += `\n`;
    }

    // Resource Helpfulness
    if (stats.survey.resourceHelpfulness?.byCondition) {
      const resHelp = stats.survey.resourceHelpfulness;
      md += `### Resource Helpfulness\n\n`;
      md += `| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |\n|--------|---------------|----------------|----------|--------|\n`;
      for (const item of Object.keys(resHelp.byCondition.control)) {
        const ctrl = resHelp.byCondition.control[item];
        const ebm = resHelp.byCondition.ebm_cimo[item];
        const anova = resHelp.anova?.[item] ? formatAnovaResult(resHelp.anova[item]) : { higher: '-', pValue: '-' };
        md += `| ${item} | ${fmtMS(ctrl)} | ${fmtMS(ebm)} | ${anova.higher} | ${anova.pValue} |\n`;
      }
      md += `\n`;
    }
  }

  // ========== Chat 사용자만 대상 분석 ==========
  if (stats.chatUsersOnly) {
    const cu = stats.chatUsersOnly;
    md += `---\n\n`;
    md += `## Chat 사용자 대상 분석 (Chat 1회 이상 사용)\n\n`;
    md += `> 아래 분석은 Chat을 1회 이상 사용한 참가자만을 대상으로 합니다.\n\n`;
    md += `### 표본 크기\n\n`;
    md += `| 구분 | 인원 |\n|------|------|\n`;
    md += `| 전체 | ${cu.sampleSize.total}명 |\n`;
    md += `| Control | ${cu.sampleSize.control}명 |\n`;
    md += `| EBM-CIMO | ${cu.sampleSize.ebm_cimo}명 |\n\n`;

    // LLM 사용 통계
    if (cu.llmUsage) {
      const llmAnova = cu.llmUsage.anova ? formatAnovaResult(cu.llmUsage.anova) : { higher: '-', pValue: '-' };
      md += `### LLM 사용 통계\n\n`;
      md += `| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |\n|------|---------------|----------------|----------|--------|\n`;
      md += `| 메시지 수 | ${fmtMS(cu.llmUsage.control)} | ${fmtMS(cu.llmUsage.ebm_cimo)} | ${llmAnova.higher} | ${llmAnova.pValue} |\n\n`;
    }

    // Post Task
    if (cu.postTask) {
      const pt = cu.postTask;
      const anovaQ1 = pt.strategiesCount?.anova ? formatAnovaResult(pt.strategiesCount.anova) : { higher: '-', pValue: '-' };
      const anovaQ2 = pt.contextTranslationCount?.anova ? formatAnovaResult(pt.contextTranslationCount.anova) : { higher: '-', pValue: '-' };
      const anovaConf = pt.newStrategyConfidence?.anova ? formatAnovaResult(pt.newStrategyConfidence.anova) : { higher: '-', pValue: '-' };
      const anovaLike = pt.implementationLikelihood?.anova ? formatAnovaResult(pt.implementationLikelihood.anova) : { higher: '-', pValue: '-' };

      md += `### Post Task\n\n`;
      md += `| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |\n|------|---------------|----------------|----------|--------|------|\n`;
      md += `| Q1 답변 개수 | ${fmtMS(pt.strategiesCount?.control)} | ${fmtMS(pt.strategiesCount?.ebm_cimo)} | ${anovaQ1.higher} | ${anovaQ1.pValue} | 실천 전략 (Strategies) |\n`;
      md += `| Q2 답변 개수 | ${fmtMS(pt.contextTranslationCount?.control)} | ${fmtMS(pt.contextTranslationCount?.ebm_cimo)} | ${anovaQ2.higher} | ${anovaQ2.pValue} | 맥락 전환 (Context Translation) |\n`;
      md += `| 새 전략 자신감 | ${fmtMS(pt.newStrategyConfidence?.control)} | ${fmtMS(pt.newStrategyConfidence?.ebm_cimo)} | ${anovaConf.higher} | ${anovaConf.pValue} | 1-7점 |\n`;
      md += `| 실행 가능성 | ${fmtMS(pt.implementationLikelihood?.control)} | ${fmtMS(pt.implementationLikelihood?.ebm_cimo)} | ${anovaLike.higher} | ${anovaLike.pValue} | 1-7점 |\n\n`;
    }

    // NASA-TLX
    if (cu.nasaTLX && cu.nasaTLX.byCondition) {
      md += `### NASA-TLX (1-7점)\n\n`;
      md += `| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |\n|------|---------------|----------------|----------|--------|\n`;
      const nasaItems = ['mentalDemand', 'physicalDemand', 'temporalDemand', 'effort', 'frustration', 'performance'];
      for (const item of nasaItems) {
        const ctrl = cu.nasaTLX.byCondition.control?.[item];
        const ebm = cu.nasaTLX.byCondition.ebm_cimo?.[item];
        const anova = cu.nasaTLX.anova?.[item] ? formatAnovaResult(cu.nasaTLX.anova[item]) : { higher: '-', pValue: '-' };
        if (ctrl || ebm) {
          md += `| ${item} | ${fmtMS(ctrl)} | ${fmtMS(ebm)} | ${anova.higher} | ${anova.pValue} |\n`;
        }
      }
      md += `\n`;
    }

    // Self-Efficacy
    if (cu.selfEfficacy && cu.selfEfficacy.byCondition) {
      md += `### Self-Efficacy (1-7점)\n\n`;
      const seByCondition = cu.selfEfficacy.byCondition;
      const seAnova = cu.selfEfficacy.anova || {};
      const categories = ['overallComprehension', 'criticalEngagement', 'applicability'];

      for (const category of categories) {
        const ctrlCat = seByCondition.control?.[category] || {};
        const ebmCat = seByCondition.ebm_cimo?.[category] || {};
        const anovaCat = seAnova[category] || {};
        const items = Object.keys(ctrlCat);
        const questionMap = SELF_EFFICACY_QUESTIONS[category] || {};
        const categoryTitle = questionMap._title || category;

        if (items.length > 0) {
          md += `#### ${categoryTitle}\n\n`;
          md += `| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |\n|------|---------------|----------------|----------|--------|------|\n`;
          for (const item of items) {
            const ctrl = ctrlCat[item];
            const ebm = ebmCat[item];
            const anova = anovaCat[item] ? formatAnovaResult(anovaCat[item]) : { higher: '-', pValue: '-' };
            const question = questionMap[item] || item;
            md += `| ${item} | ${fmtMS(ctrl)} | ${fmtMS(ebm)} | ${anova.higher} | ${anova.pValue} | ${question} |\n`;
          }
          md += `\n`;
        }
      }
    }

    // LLM Trust (chat users only)
    if (cu.llmTrust?.byCondition) {
      const trust = cu.llmTrust;
      md += `### LLM Trust\n\n`;
      md += `| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |\n|------|---------------|----------------|----------|--------|------|\n`;
      for (const item of Object.keys(trust.byCondition.control || {})) {
        const ctrl = trust.byCondition.control[item];
        const ebm = trust.byCondition.ebm_cimo?.[item];
        const anova = trust.anova?.[item] ? formatAnovaResult(trust.anova[item]) : { higher: '-', pValue: '-' };
        const question = LLM_TRUST_QUESTIONS[item] || '';
        md += `| ${item} | ${fmtMS(ctrl)} | ${fmtMS(ebm)} | ${anova.higher} | ${anova.pValue} | ${question} |\n`;
      }
      md += `\n`;
    }

    // LLM Usefulness (chat users only)
    if (cu.llmUsefulness?.byCondition) {
      const useful = cu.llmUsefulness;
      md += `### LLM Usefulness\n\n`;
      md += `| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |\n|------|---------------|----------------|----------|--------|------|\n`;
      for (const item of Object.keys(useful.byCondition.control || {})) {
        const ctrl = useful.byCondition.control[item];
        const ebm = useful.byCondition.ebm_cimo?.[item];
        const anova = useful.anova?.[item] ? formatAnovaResult(useful.anova[item]) : { higher: '-', pValue: '-' };
        const question = LLM_USEFULNESS_QUESTIONS[item] || '';
        md += `| ${item} | ${fmtMS(ctrl)} | ${fmtMS(ebm)} | ${anova.higher} | ${anova.pValue} | ${question} |\n`;
      }
      md += `\n`;
    }

    // Resource Helpfulness (chat users only)
    if (cu.resourceHelpfulness?.byCondition) {
      const resHelp = cu.resourceHelpfulness;
      md += `### Resource Helpfulness\n\n`;
      md += `| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |\n|--------|---------------|----------------|----------|--------|\n`;
      for (const item of Object.keys(resHelp.byCondition.control || {})) {
        const ctrl = resHelp.byCondition.control[item];
        const ebm = resHelp.byCondition.ebm_cimo?.[item];
        const anova = resHelp.anova?.[item] ? formatAnovaResult(resHelp.anova[item]) : { higher: '-', pValue: '-' };
        md += `| ${item} | ${fmtMS(ctrl)} | ${fmtMS(ebm)} | ${anova.higher} | ${anova.pValue} |\n`;
      }
      md += `\n`;
    }
  }

  // 클래스별
  md += `## 클래스별 통계\n\n`;
  md += `| 클래스 | 참가자 | Control | EBM-CIMO | 세션 | 완료 | 완료율 |\n|--------|--------|---------|----------|------|------|--------|\n`;
  for (const [cls, data] of Object.entries(stats.byClass)) {
    md += `| ${cls} | ${data.users}명 | ${data.conditionDistribution.control}명 | ${data.conditionDistribution.ebm_cimo}명 | ${data.sessions}개 | ${data.completed}개 | ${data.completionRate}% |\n`;
  }
  md += `\n`;

  // 참가자 피드백
  if (stats.participantFeedback && stats.participantFeedback.length > 0) {
    md += `## 참가자 피드백 (${stats.participantFeedback.length}명)\n\n`;
    stats.participantFeedback.forEach((fb, idx) => {
      md += `### ${idx + 1}. ${fb.email}\n\n`;
      md += `ㄴ **조건**: ${fb.condition === 'control' ? 'Control' : 'EBM-CIMO'}\n`;
      md += `ㄴ **클래스**: ${fb.class}\n\n`;
      md += `> ${fb.feedback.replace(/\n/g, '\n> ')}\n\n`;
    });
  }

  md += `---\n\n`;
  md += `> 상세 데이터는 \`descriptive_stats.json\` 파일을 참조하세요.\n`;

  return md;
}

// ============================================================
// 메인 함수
// ============================================================

function main() {
  const inputPath = process.argv[2];
  const outputDir = process.argv[3]; // 선택적 출력 디렉토리

  if (!inputPath) {
    console.error('사용법: node scripts/analyze-experiment-data.js <raw-data.json> [output-dir]');
    process.exit(1);
  }

  const absolutePath = path.resolve(inputPath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`파일을 찾을 수 없습니다: ${absolutePath}`);
    process.exit(1);
  }

  console.log('='.repeat(70));
  console.log('실험 데이터 분석 및 CSV 변환');
  console.log('='.repeat(70));
  console.log(`입력 파일: ${absolutePath}\n`);

  // 데이터 로드
  const rawData = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));

  // 출력 디렉토리 설정 (인자로 받거나 입력 파일 디렉토리 사용)
  const baseDir = outputDir ? path.resolve(outputDir) : path.dirname(absolutePath);
  const csvDir = path.join(baseDir, 'csv');
  const statsDir = path.join(baseDir, 'stats');

  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });
  if (!fs.existsSync(csvDir)) fs.mkdirSync(csvDir, { recursive: true });
  if (!fs.existsSync(statsDir)) fs.mkdirSync(statsDir, { recursive: true });

  // Raw 데이터 복사 (출력 디렉토리가 별도인 경우)
  if (outputDir) {
    const rawFileName = path.basename(absolutePath);
    fs.copyFileSync(absolutePath, path.join(baseDir, rawFileName));
    console.log(`Raw 데이터 복사: ${rawFileName}`);
  }

  // ========== Step 1: 전체 데이터 기술통계 ==========
  console.log('\n[Step 1] 전체 데이터 기술통계 생성 중...');
  const rawStats = generateDescriptiveStats(rawData);

  fs.writeFileSync(
    path.join(statsDir, 'raw_descriptive_stats.json'),
    JSON.stringify(rawStats, null, 2),
    'utf8'
  );
  console.log(`  ✓ raw_descriptive_stats.json`);

  const rawStatsText = formatStatsToText(rawStats);
  fs.writeFileSync(
    path.join(statsDir, 'raw_descriptive_stats.txt'),
    rawStatsText,
    'utf8'
  );
  console.log(`  ✓ raw_descriptive_stats.txt`);

  const rawStatsMd = formatStatsToMarkdown(rawStats);
  fs.writeFileSync(
    path.join(statsDir, 'raw_descriptive_stats.md'),
    rawStatsMd,
    'utf8'
  );
  console.log(`  ✓ raw_descriptive_stats.md`);

  // 콘솔에 전체 통계 출력
  console.log('\n' + rawStatsText);

  // ========== Step 2: 데이터 필터링 ==========
  console.log('[Step 2] 데이터 필터링 중...');
  const filteredData = filterDataForCSV(rawData);
  const filterInfo = filteredData._filterInfo;

  console.log(`  필터링 규칙:`);
  filterInfo.filterRules.forEach(rule => console.log(`    - ${rule}`));
  console.log(`  원본 사용자: ${filterInfo.originalUsers}명 → 필터링 후: ${filterInfo.filteredUsers}명`);

  // 필터 정보 저장
  fs.writeFileSync(
    path.join(statsDir, 'filter_info.json'),
    JSON.stringify(filterInfo, null, 2),
    'utf8'
  );
  console.log(`  ✓ filter_info.json`);

  // ========== Step 3: 필터링된 데이터 기술통계 ==========
  console.log('\n[Step 3] 필터링된 데이터 기술통계 생성 중...');
  const filteredStats = generateDescriptiveStats(filteredData);
  filteredStats._filterInfo = filterInfo; // 필터 정보 추가

  fs.writeFileSync(
    path.join(statsDir, 'filtered_descriptive_stats.json'),
    JSON.stringify(filteredStats, null, 2),
    'utf8'
  );
  console.log(`  ✓ filtered_descriptive_stats.json`);

  const filteredStatsText = formatStatsToText(filteredStats);
  fs.writeFileSync(
    path.join(statsDir, 'filtered_descriptive_stats.txt'),
    filteredStatsText,
    'utf8'
  );
  console.log(`  ✓ filtered_descriptive_stats.txt`);

  const filteredStatsMd = formatStatsToMarkdown(filteredStats);
  fs.writeFileSync(
    path.join(statsDir, 'filtered_descriptive_stats.md'),
    filteredStatsMd,
    'utf8'
  );
  console.log(`  ✓ filtered_descriptive_stats.md`);

  // 콘솔에 필터링된 통계 출력
  console.log('\n[필터링된 데이터 기술통계]');
  console.log(filteredStatsText);

  // ========== Step 4: CSV 파일 생성 (필터링된 데이터) ==========
  console.log('[Step 4] CSV 파일 생성 중... (필터링된 데이터)');

  // 1. participants.csv
  const participants = transformParticipants(filteredData);
  const participantsCols = [
    'userId', 'email', 'fullName', 'class', 'condition',
    'createdAt', 'lastLoginAt', 'totalSessions', 'completedSessions'
  ];
  fs.writeFileSync(
    path.join(csvDir, 'participants.csv'),
    arrayToCSV(participants, participantsCols),
    'utf8'
  );
  console.log(`  ✓ participants.csv (${participants.length} rows)`);

  // 2. sessions.csv
  const sessions = transformSessions(filteredData);
  const sessionsCols = [
    'sessionId', 'userId', 'userEmail', 'condition', 'currentPhase', 'isComplete',
    'paperTitle', 'paperAuthor', 'paperYear', 'paperVenue', 'paperPages',
    'startedAt', 'completedAt', 'totalDuration', 'readingStartedAt', 'readingCompletedAt',
    'focusTime_reading', 'focusTime_chat', 'focusTime_audio',
    'focusTime_infographics', 'focusTime_simplified', 'focusTime_video',
    'usedInfographics', 'usedVideo', 'usedAudio',
    'audioInteractions', 'videoInteractions', 'tabSwitchCount', 'chatMessageCount',
    'postTask_strategies', 'postTask_contextTranslation',
    'postTask_newStrategyConfidence', 'postTask_implementationLikelihood'
  ];
  fs.writeFileSync(
    path.join(csvDir, 'sessions.csv'),
    arrayToCSV(sessions, sessionsCols),
    'utf8'
  );
  console.log(`  ✓ sessions.csv (${sessions.length} rows)`);

  // 3. survey_responses.csv
  const surveys = transformSurveyResponses(filteredData);
  if (surveys.length > 0) {
    const surveyCols = Object.keys(surveys[0]);
    fs.writeFileSync(
      path.join(csvDir, 'survey_responses.csv'),
      arrayToCSV(surveys, surveyCols),
      'utf8'
    );
    console.log(`  ✓ survey_responses.csv (${surveys.length} rows)`);
  } else {
    console.log('  ⚠ survey_responses.csv - 데이터 없음');
  }

  // 4. chat_history.csv
  const chats = transformChatHistory(filteredData);
  if (chats.length > 0) {
    const chatCols = [
      'sessionId', 'userId', 'userEmail', 'condition', 'messageIndex',
      'questionTime', 'question', 'answerTime', 'answer', 'responseTime'
    ];
    fs.writeFileSync(
      path.join(csvDir, 'chat_history.csv'),
      arrayToCSV(chats, chatCols),
      'utf8'
    );
    console.log(`  ✓ chat_history.csv (${chats.length} rows)`);

    // 4-1. chat-viewer-data.json (for HTML viewer)
    const chatViewerData = {
      generatedAt: new Date().toISOString(),
      totalMessages: chats.length,
      chats: chats
    };
    fs.writeFileSync(
      path.join(csvDir, 'chat-viewer-data.json'),
      JSON.stringify(chatViewerData, null, 2),
      'utf8'
    );
    console.log(`  ✓ chat-viewer-data.json (${chats.length} messages)`);

    // Also copy to project root data folder for GitHub Pages
    // outputDir is typically: PROJECT_ROOT/data/runs/YYYY-MM-DD_HH-MM-SS
    // We want: PROJECT_ROOT/data/chat-viewer-data.json
    const runsDir = path.dirname(outputDir); // PROJECT_ROOT/data/runs
    const dataDir = path.dirname(runsDir);    // PROJECT_ROOT/data
    fs.writeFileSync(
      path.join(dataDir, 'chat-viewer-data.json'),
      JSON.stringify(chatViewerData, null, 2),
      'utf8'
    );
    console.log(`  ✓ data/chat-viewer-data.json (GitHub Pages용)`);
  } else {
    console.log('  ⚠ chat_history.csv - 데이터 없음');
  }

  // 5. reading_events.csv
  const readingEvents = transformReadingEvents(filteredData);
  if (readingEvents.length > 0) {
    const eventCols = [
      'sessionId', 'userId', 'userEmail', 'condition', 'eventIndex',
      'eventId', 'timestamp', 'eventType', 'phase', 'timeSinceLast',
      // focus_switch
      'focusFrom', 'focusTo', 'timeOnPreviousFocus',
      // resource_tab_switch
      'tabFrom', 'tabTo',
      // scroll_action
      'scrollY', 'sectionBeforeScroll', 'sectionAfterScroll', 'scrollClassification', 'pauseDuration', 'scrollDuration',
      // pdf_activity
      'pdfAction', 'pdfState', 'previousState', 'timeInState',
      // llm_question_asked
      'llmQuestion', 'llmQuestionLength',
      // llm_answer_received
      'llmAnswerLength', 'llmResponseTime',
      // llm_activity
      'llmAction', 'llmState', 'llmPreviousState', 'llmTimeInState',
      // window_focus_change
      'windowIsActive', 'windowPreviousState', 'windowPreviousDuration',
      // audio events
      'audioCurrentTime',
      // panel_resized
      'panelSize'
    ];
    fs.writeFileSync(
      path.join(csvDir, 'reading_events.csv'),
      arrayToCSV(readingEvents, eventCols),
      'utf8'
    );
    console.log(`  ✓ reading_events.csv (${readingEvents.length} rows)`);
  } else {
    console.log('  ⚠ reading_events.csv - 데이터 없음');
  }

  console.log(`\n출력 디렉토리: ${baseDir}`);
  console.log(`  ├─ csv/`);
  console.log(`  └─ stats/`);
  console.log('\n완료!');
}

main();
