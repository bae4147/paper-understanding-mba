# All Participants Codebook

## Fields

| Field | Type | Description |
|-------|------|-------------|
| userid | string | Firebase Authentication UID (사용자 고유 식별자) |
| email | string | 참가자 이메일 주소 |
| fullName | string | 참가자 성명 |
| class | string | 수강 섹션: mba6202_tue (화요일반), mba6202_wed (수요일반) |
| condition | string | 실험 조건: control (통제집단), ebm_cimo (처치집단) |
| createdAt | datetime | 계정 생성 시각 (UTC, ISO 8601 형식) |
| totalSessions | integer | 해당 사용자의 전체 세션 수 |
| completedSessions | integer | 완료된 세션 수 |
| firstCompletedSession_endtime | datetime | 첫 번째 완료 세션의 종료 시각 (EST) |
| before_1_26_deadline | string | 제출 상태: on_time (정시), late (지각), not_submitted (미제출) |
| technical_issue | string | 기술적 문제 발생 여부 (수동 기입) |

## Values

| Field | Value | Description |
|-------|-------|-------------|
| condition | control | 통제집단 - 일반 논문 자료 제공 |
| condition | ebm_cimo | 처치집단 - EBM CIMO 포맷 자료 제공 |
| class | mba6202_tue | 화요일 섹션 |
| class | mba6202_wed | 수요일 섹션 |
| before_1_26_deadline | on_time | 마감일(1/26 11:59pm EST) 이전 제출 |
| before_1_26_deadline | late | 마감일 이후 제출 |
| before_1_26_deadline | not_submitted | 미제출 (completedSessions = 0) |

## Notes
- 제외된 테스트 계정: shyun.bae@gmail.com, sh.bae@snu.ac.kr, ellienbellie@snu.ac.kr, ellienbellie@gmail.com, lee.7313@osu.edu
- firstCompletedSession_endtime 시간대: Eastern Standard Time (EST, UTC-5)
