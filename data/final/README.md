# Final Dataset

## Raw 데이터 위치

```
data/runs/2026-04-10_23-40-46/
└── experiment-data-2026-04-10T14-42-08.json
```

## 파일 목록

### `users.csv`
유저 계정 단위 데이터. 세션이 없는 계정도 포함.  
연구자/파일럿 계정 제외. 1 row = 1 account.

| 컬럼 | 설명 |
|------|------|
| userid, email, fullName, class, condition, userCreatedAt | 기본 계정 정보 |
| duplicate_account | 동일 fullName 기준 중복 계정 인덱스 (0부터) |
| totalSessions, completedSessions | 세션 수 요약 |

### `sessions.csv`
세션 단위 전체 데이터. 완료되지 않은 세션 포함. `userid`로 `users.csv`와 join 가능.  
1 row = 1 session.

### `sessions_preprocessed.csv`
`sessions.csv`에서 아래 두 가지 전처리 규칙을 적용한 분석용 파일.  
1 row = 1 participant (유저당 1개 세션).

- `currentPhase == complete`인 세션만 포함
- 유저당 최초 complete 세션 1개만 남김 (`completedAt` 기준)

### `chat_history.csv`
챗봇 대화를 턴 단위로 정규화한 파일. `userid` + `sessionid`로 `sessions.csv`와 join 가능.  
1 row = 1 turn.

| 컬럼 | 설명 |
|------|------|
| userid, sessionid | join 키 |
| turn_index | 대화 순서 (0부터) |
| question, answer | 참여자 질문 및 챗봇 응답 |
| responseTime_ms | 챗봇 응답 시간 (ms) |

### `sessions_codebook.md`
`sessions.csv` 및 `chat_history.csv`의 모든 필드에 대한 상세 설명.
