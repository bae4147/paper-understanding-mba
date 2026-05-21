# Dataset Codebook

## 파일 구조

| 파일 | 단위 | 설명 |
|------|------|------|
| `users.csv` | 1 row = 1 account | 모든 유저 계정 (세션 없는 계정 포함) |
| `sessions.csv` | 1 row = 1 session | 모든 세션. `userid`로 `users.csv`와 join |
| `chat_history.csv` | 1 row = 1 turn | 챗봇 대화. `userid` + `sessionid`로 `sessions.csv`와 join |

---

## users.csv

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `userid` | string | Firebase 유저 고유 ID (join 키) |
| `email` | string | 가입 이메일 |
| `fullName` | string | 가입 시 입력한 이름 |
| `class` | string | 수강 섹션 (예: `mba6202_tue`, `honda`) |
| `condition` | string | 실험 조건. `control` 또는 `ebm_cimo` |
| `userCreatedAt` | datetime (ISO) | 유저 계정 생성 시각 (UTC) |
| `duplicate_account` | int | 동일 fullName 기준 중복 계정 인덱스. 계정 생성 순으로 0부터 부여. 0이면 단일 계정 또는 첫 번째 계정 |
| `totalSessions` | int | 전체 세션 수 (완료 여부 무관) |
| `completedSessions` | int | `currentPhase == complete`인 세션 수 |

---

## sessions.csv

1 row = 1 session. `userid` 컬럼으로 `users.csv`와 join 가능.

### 유저 참조

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `userid` | string | Firebase 유저 고유 ID |
| `email` | string | 가입 이메일 |
| `fullName` | string | 가입 시 입력한 이름 |
| `class` | string | 수강 섹션 (예: `mba6202_tue`, `honda`) |
| `condition` | string | 실험 조건. `control` 또는 `ebm_cimo` |
| `userCreatedAt` | datetime (ISO) | 유저 계정 생성 시각 (UTC) |
| `duplicate_account` | int | 동일 fullName 기준 중복 계정 인덱스. 0이면 단일 계정 또는 첫 번째 계정 |

---

## 2. 세션 기본 정보

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `sessionid` | string | 세션 고유 ID |
| `currentPhase` | string | 세션 종료 시점의 단계. `complete` / `reading` / `post_task` / `generating` 등 |
| `startedAt` | datetime (ISO) | 세션 시작 시각 (UTC) |
| `completedAt` | datetime (ISO) | 세션 최종 완료 시각 (UTC). `currentPhase == complete`인 경우에만 존재 |
| `paperId` | string | 배정된 논문 ID |
| `paper_title` | string | 논문 제목 |
| `paper_firstAuthorLastName` | string | 제1저자 성 |
| `paper_year` | int | 논문 출판 연도 |
| `paper_venue` | string | 게재 저널/학회명 |
| `paper_numPages` | int | 논문 페이지 수 |

---

## 3. Reading 행동

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `reading_startedAt` | timestamp (ms) | 읽기 단계 시작 시각 (Unix ms) |
| `reading_completedAt` | timestamp (ms) | 읽기 단계 완료 시각 (Unix ms) |
| `reading_totalDuration_ms` | int | 읽기 단계 총 소요 시간 (ms). `reading_completedAt - reading_startedAt` |
| `focusTime_reading_ms` | int | PDF 읽기 패널에 포커스한 누적 시간 (ms) |
| `focusTime_chat_ms` | int | 챗봇 패널에 포커스한 누적 시간 (ms) |
| `focusTime_audio_ms` | int | 팟캐스트(오디오) 패널에 포커스한 누적 시간 (ms) |
| `focusTime_infographics_ms` | int | 인포그래픽 패널에 포커스한 누적 시간 (ms) |
| `focusTime_video_ms` | int | 비디오 패널에 포커스한 누적 시간 (ms) |

### 리소스 사용

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `resourcesUsed_infographics` | bool | 인포그래픽 탭을 열었는지 여부 |
| `resourcesUsed_video` | bool | 비디오 탭을 열었는지 여부 |
| `resourcesUsed_audio` | bool | 오디오(팟캐스트) 탭을 열었는지 여부 |
| `resourcesUsed_audioInteractions` | int | 오디오 조작 이벤트 수. `audio_play` + `audio_pause` + `audio_seeked` + `audio_ended` 합산 |
| `resourcesUsed_videoInteractions` | int | 비디오 조작 이벤트 수. `video_play` + `video_pause` + `video_seeked` + `video_ended` 합산 |
| `resourcesUsed_tabSwitchCount` | int | 리소스 탭 전환 횟수 (`resource_tab_switch` 이벤트 수) |
| `audio_playback_duration_sec` | float | 오디오 실제 재생 시간 (초). play/pause 쌍의 `currentTime` 차이를 합산하여 계산 |
| `video_playback_duration_sec` | float | 비디오 실제 재생 시간 (초). play/pause 쌍의 `currentTime` 차이를 합산하여 계산 |

### 챗봇 사용

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `chat_count` | int | 챗봇 질문 횟수 |
| `chat_history_json` | string (JSON) | 챗봇 대화 전체. `[{"question": ..., "answer": ..., "responseTime": ...}, ...]` 형태의 JSON 문자열. 상세 분석은 `chat_history.csv` 참고 |

---

## 4. Post-Task

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `postTask_completedAt` | datetime (ISO) | post-task 완료 시각 (UTC) |
| `postTask_implementationLikelihood` | int (1–5) | 논문 내용을 실제로 적용할 가능성 |
| `postTask_newStrategyConfidence` | int (1–5) | 새로운 전략에 대한 자신감 |
| `postTask_strategies_json` | string (JSON) | 참여자가 작성한 전략 목록 (JSON 배열) |
| `postTask_contextTranslation_json` | string (JSON) | 참여자가 작성한 맥락 적용 내용 (JSON 배열) |

---

## 5. Post-Study Survey

### NASA-TLX (인지 부하, 1–7)

| 필드명 | 설명 |
|--------|------|
| `nasa_mentalDemand` | 정신적 요구도 |
| `nasa_physicalDemand` | 신체적 요구도 |
| `nasa_temporalDemand` | 시간적 압박감 |
| `nasa_performance` | 과제 수행 만족도 (역채점 아님) |
| `nasa_effort` | 투입한 노력 |
| `nasa_frustration` | 좌절감 |

### Self-Efficacy — Overall Comprehension (1–5, 9문항)

| 필드명 | 설명 |
|--------|------|
| `se_oc_overallGoal` | 논문의 전반적 목적 이해 |
| `se_oc_authorsReasoning` | 저자의 논거 이해 |
| `se_oc_connectingIdeas` | 개념 간 연결 이해 |
| `se_oc_evidenceUnderstanding` | 근거 이해 |
| `se_oc_keyResultsUnderstanding` | 핵심 결과 이해 |
| `se_oc_keyTermsUnderstanding` | 핵심 용어 이해 |
| `se_oc_researchDesignUnderstanding` | 연구 설계 이해 |
| `se_oc_sampleContextUnderstanding` | 표본/맥락 이해 |
| `se_oc_limitationsUnderstanding` | 한계점 이해 |

### Self-Efficacy — Critical Engagement (1–5, 5문항)

| 필드명 | 설명 |
|--------|------|
| `se_ce_ownIdeas` | 자신의 아이디어 생성 |
| `se_ce_alternativePerspectives` | 대안적 관점 고려 |
| `se_ce_verifyCredibility` | 신뢰성 검증 |
| `se_ce_questionClaims` | 주장에 의문 제기 |
| `se_ce_broaderImplications` | 광범위한 함의 고려 |

### Self-Efficacy — Applicability (1–5, 6문항)

| 필드명 | 설명 |
|--------|------|
| `se_ap_contextDifferences` | 맥락 차이 인식 |
| `se_ap_differencesImpact` | 차이가 적용에 미치는 영향 판단 |
| `se_ap_mechanisms` | 작동 메커니즘 이해 |
| `se_ap_outcomes` | 예상 결과 판단 |
| `se_ap_confidence` | 적용 자신감 |
| `se_ap_decision` | 적용 여부 결정 |

### Attention Check

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `attn_focus` | int (1–5) | "I was focused during the study" 자기 보고 |
| `attn_stronglyDisagreeCheck` | int (1–5) | "Click strongly disagree if you are still paying attention" — 주의 확인용 함정 문항. 정답은 1 (strongly disagree) |

### LLM Usefulness (1–5, 5문항) — 전체 조건 공통

| 필드명 | 설명 |
|--------|------|
| `llmUsefulness_overall` | 챗봇의 전반적 유용성 |
| `llmUsefulness_conceptHelp` | 개념 이해에 도움 |
| `llmUsefulness_findingsHelp` | 결과 해석에 도움 |
| `llmUsefulness_practicalHelp` | 실용적 적용에 도움 |
| `llmUsefulness_timeSaving` | 시간 절약에 도움 |

### LLM Trust (1–5, 10문항) — 전체 조건 공통

| 필드명 | 설명 |
|--------|------|
| `llmTrust_competence` | 챗봇의 역량 신뢰 |
| `llmTrust_accuracy` | 답변 정확성 신뢰 |
| `llmTrust_benevolence` | 챗봇의 선의 신뢰 |
| `llmTrust_reliability` | 일관성/신뢰성 |
| `llmTrust_comfortActing` | 챗봇 기반 행동에 대한 편안함 |
| `llmTrust_comfortUsing` | 챗봇 사용 자체에 대한 편안함 |
| `llmTrust_relyWithoutReading` | 논문 읽지 않고 챗봇만 믿을 의향 |
| `llmTrust_assumeClearIsAccurate` | 명확한 답변을 정확하다고 가정하는 경향 |
| `llmTrust_confidentWithoutDetails` | 세부 정보 없어도 자신 있게 신뢰 |
| `llmTrust_relyForImportance` | 중요한 결정에 챗봇 활용 의향 |

### Resource Helpfulness (1–5, 4문항)

| 필드명 | 설명 |
|--------|------|
| `resourceHelp_chatbot` | 챗봇이 논문 이해에 도움이 된 정도 |
| `resourceHelp_infographic` | 인포그래픽이 논문 이해에 도움이 된 정도 |
| `resourceHelp_video` | 비디오가 논문 이해에 도움이 된 정도 |
| `resourceHelp_podcast` | 팟캐스트가 논문 이해에 도움이 된 정도 |

### External Tool Usage

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `externalAi_used` | string (`yes`/`no`) | 과제 중 외부 AI 도구 사용 여부 |
| `externalAi_details` | string | 사용한 경우 어떤 AI를 어디에 사용했는지 서술. 미사용 시 null |
| `externalPdf_used` | string (`yes`/`no`) | 외부 PDF 뷰어/앱 사용 여부 |
| `externalPdf_details` | string | 사용한 경우 어떤 앱을 어디에 사용했는지 서술. 미사용 시 null |

### 기타

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `studyFeedback` | string | 실험에 대한 자유 형식 피드백. 미입력 시 null |
| `surveyCompletedAt` | datetime (ISO) | 설문 완료 시각 (UTC) |

---

## 6. chat_history.csv

챗봇 대화를 턴 단위로 정규화한 별도 파일.

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `userid` | string | 유저 ID (메인 CSV와 join 키) |
| `sessionid` | string | 세션 ID (메인 CSV와 join 키) |
| `turn_index` | int | 대화 순서 (0부터 시작) |
| `question` | string | 참여자가 입력한 질문 |
| `answer` | string | 챗봇 응답 |
| `responseTime_ms` | int | 챗봇 응답 시간 (ms) |
