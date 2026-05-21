# 26-05-06 데이터 작업 메모

## 원본 파일

| 파일 | 설명 |
|------|------|
| `codebook.xlsx` | T1/T2/T3 서베이 변수 코드북 (392개 변수) |
| `merged_clean.xlsx` | T1/T2/T3 서베이 응답 데이터 (168명 × 393 cols) |
| `merged_clean.sav` | 위와 동일한 SPSS 포맷 |

## 병합에 사용한 외부 파일

| 경로 | 설명 |
|------|------|
| `data/final-dataset/sessions_with_classcode.csv` | 실험 세션 데이터 (143 rows, 1 row = 1 session) |
| `data/final-dataset/class_coded_roster.csv` | 이름–ID–ClassCode 매핑 테이블 |

## 결과 파일

| 파일 | 설명 |
|------|------|
| `merged_final.xlsx` | 메인 분석 파일. merged_clean에 세션 데이터를 left join한 결과 (168명 × 490 cols) |
| `codebook_final.xlsx` | 위에 대응하는 코드북 (490개 변수) |

## 병합 방식

- **단위**: person-level (1 row = 1 participant)
- **키**: `merged_clean.name_key` (소문자) ↔ `sessions_with_classcode.fullName` (소문자)
- **매칭**: 142명 성공 / 26명 세션 없음 (NaN)
- **이름 불일치 13건**: 수동 매핑으로 처리 (이메일로 등록된 계정, 이름 오타/약칭 등)
- **Cassius Hudson**: 동일인 계정 2개 → 먼저 완료된 세션(`20260126_002430_ouus`) 사용

## 스크립트

- `scripts/merge_sessions_to_survey.py` — 위 병합 및 코드북 생성 스크립트
