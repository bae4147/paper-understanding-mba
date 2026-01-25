# 실험 데이터 분석 스크립트

MBA 논문 읽기 실험의 데이터를 Firebase에서 내보내고 분석하는 스크립트입니다.

## 파이프라인 구조

```
┌─────────────────────────────────────────────────────────────────┐
│                         데이터 파이프라인                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   Firebase   │───▶│  Raw JSON    │───▶│   분석 &     │      │
│  │  Firestore   │    │  다운로드     │    │  CSV 변환    │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                              │                   │              │
│                              ▼                   ▼              │
│                                                                 │
│              data/runs/YYYY-MM-DD_HH-MM-SS/                    │
│              ├─ experiment-data-*.json (raw)                   │
│              ├─ run_meta.json                                  │
│              ├─ csv/                                           │
│              │  ├─ participants.csv (필터링됨)                  │
│              │  ├─ sessions.csv (필터링됨)                      │
│              │  ├─ survey_responses.csv (필터링됨)              │
│              │  └─ chat_history.csv (필터링됨)                  │
│              └─ stats/                                         │
│                 ├─ descriptive_stats.json (전체)               │
│                 ├─ descriptive_stats.txt (전체)                │
│                 ├─ filter_info.json                            │
│                 ├─ anova_results.json (ANOVA)                  │
│                 └─ anova_results.md                            │
│                                                                │
└─────────────────────────────────────────────────────────────────┘
```

## 설치

```bash
cd scripts
npm install

# Python 의존성 (통계 분석용)
pip install -r requirements.txt
```

## 사전 준비: 서비스 계정 키

Firebase에서 데이터를 내보내려면 서비스 계정 키가 필요합니다.

1. [Firebase 콘솔](https://console.firebase.google.com/project/mba-paper-reading/settings/serviceaccounts/adminsdk) 접속
2. "새 비공개 키 생성" 버튼 클릭
3. 다운로드된 JSON 파일을 안전한 위치에 저장
4. **주의**: 이 키 파일은 절대 git에 커밋하지 마세요!

## 사용법

### 전체 파이프라인 실행 (권장)

```bash
# 전체 파이프라인: 다운로드 → 분석 → CSV 변환
node scripts/run-pipeline.js ~/Downloads/서비스계정키.json
```

### 기존 데이터로 분석만 실행

```bash
# 다운로드 스킵하고 가장 최근 데이터 사용
node scripts/run-pipeline.js --skip-download

# 특정 파일 지정
node scripts/run-pipeline.js --skip-download --input data/experiment-data-*.json
```

### 개별 스크립트 실행

```bash
# 1. Firebase에서 raw 데이터만 다운로드
node scripts/export-experiment-data.js ~/Downloads/서비스계정키.json

# 2. 분석 및 CSV 변환만 실행
node scripts/analyze-experiment-data.js data/experiment-data-*.json [output-dir]

# 3. 통계 분석만 실행 (ANOVA)
python3 scripts/statistical_analysis.py data/runs/YYYY-MM-DD_HH-MM-SS/csv data/runs/YYYY-MM-DD_HH-MM-SS
```

## 출력 디렉토리 구조

파이프라인 실행 시마다 타임스탬프 기반 디렉토리가 생성됩니다:

```
data/runs/
├─ 2026-01-26_04-33-57/          # 첫 번째 실행
│  ├─ experiment-data-*.json     # Raw 데이터 복사본
│  ├─ run_meta.json              # 실행 메타데이터
│  ├─ csv/
│  │  ├─ participants.csv
│  │  ├─ sessions.csv
│  │  ├─ survey_responses.csv
│  │  └─ chat_history.csv
│  └─ stats/
│     ├─ descriptive_stats.json
│     ├─ descriptive_stats.txt
│     └─ filter_info.json
├─ 2026-01-27_10-15-30/          # 두 번째 실행
│  └─ ...
└─ latest.txt                    # 가장 최근 실행 ID
```

## CSV 필터링 규칙

CSV 파일은 분석용으로 필터링된 데이터를 포함합니다:

1. **complete 세션이 1개 이상 있는 사용자만 포함**
   - 미완료 사용자는 제외

2. **complete 세션이 2개 이상이면 첫 번째 complete 세션만 포함**
   - 같은 사용자의 중복 데이터 방지
   - 시작 시간 기준으로 첫 번째 세션 선택

### 필터링 결과 예시

```
원본 데이터:
  - 46명 사용자
  - 49개 세션 (37개 complete)

필터링 후 CSV:
  - 36명 사용자 (complete 세션이 있는 사용자만)
  - 36개 세션 (사용자당 1개)
```

> **참고**: 기술통계(`descriptive_stats.*`)는 전체 데이터를 기준으로 생성됩니다.

## 출력 파일

### 기술통계 (data/runs/*/stats/)

| 파일 | 설명 |
|------|------|
| `descriptive_stats.json` | 전체 기술통계 (JSON 형식, 프로그래밍용) |
| `descriptive_stats.txt` | 기술통계 보고서 (텍스트 형식, 읽기용) |
| `filter_info.json` | CSV 필터링 정보 |
| `anova_results.json` | ANOVA 통계 분석 결과 (JSON) |
| `anova_results.md` | ANOVA 분석 보고서 (Markdown) |

#### 기술통계 내용

- **요약**: 총 참가자, 세션, 완료율
- **참가자 통계**: 조건별 배정, 클래스별 분포, 다중 세션 사용자
- **세션 통계**: 상태별 분포 (complete, reading, generating 등)
- **읽기 행동**: 소요 시간 (M, SD, Min, Max, Median), 조건별 비교
- **LLM 사용**: 메시지 수, 질문 길이, 응답 시간
- **설문 통계**: NASA-TLX, Self-Efficacy, LLM Trust/Usefulness (조건별)
- **클래스별 통계**: 참가자 수, 완료율, 조건 배정

#### ANOVA 분석 내용

- **분석 기법**: One-way ANOVA (scipy.stats.f_oneway)
- **효과 크기**: Cohen's d
- **분석 대상**:
  - LLM 사용: 세션당 메시지 수, 총 소요 시간
  - NASA-TLX: 6개 항목 (mentalDemand, physicalDemand, temporalDemand, effort, frustration, performance)
  - Self-Efficacy: 각 하위 항목
  - Post Task: 전략 수, 맥락 전환 수, 새 전략 자신감, 실행 가능성
- **결과 해석**:
  - p < 0.05 인 경우 ✓ 표시
  - Cohen's d: negligible (<0.2), small (0.2-0.5), medium (0.5-0.8), large (>0.8)

### CSV 파일 (data/runs/*/csv/)

| 파일 | 설명 | 주요 컬럼 |
|------|------|----------|
| `participants.csv` | 참가자 기본 정보 | userId, email, condition, class, completedSessions |
| `sessions.csv` | 세션별 상세 데이터 | sessionId, condition, totalDuration, focusTimes, chatMessageCount |
| `survey_responses.csv` | 설문 응답 | nasaTLX_*, selfEfficacy_*, llmTrust_*, llmUsefulness_* |
| `chat_history.csv` | LLM 대화 기록 | question, answer, responseTime |

## 데이터 필터링 기준

### 실험 시작 시간

스크립트는 **2026년 1월 21일 AM 4:00 UTC+9** 이후에 생성된 사용자만 내보냅니다.

이 날짜를 변경하려면 `export-experiment-data.js`의 `EXPERIMENT_START_DATE` 상수를 수정하세요:

```javascript
// 실험 시작 시간 변경
const EXPERIMENT_START_DATE = new Date('2026-01-20T19:00:00.000Z'); // UTC
```

## 추가 분석

CSV 파일을 사용하여 추가 통계 분석을 수행할 수 있습니다:

### Python 예시

```python
import pandas as pd
from scipy import stats

# 최신 실행 디렉토리에서 데이터 로드
sessions = pd.read_csv('data/runs/2026-01-26_04-33-57/csv/sessions.csv')

# 조건별 읽기 시간 비교 (t-test)
control = sessions[sessions['condition'] == 'control']['totalDuration'] / 60000
ebm = sessions[sessions['condition'] == 'ebm_cimo']['totalDuration'] / 60000

t_stat, p_value = stats.ttest_ind(control, ebm)
print(f't={t_stat:.3f}, p={p_value:.3f}')
```

### 최신 실행 찾기

```bash
# 가장 최근 실행 ID 확인
cat data/runs/latest.txt
# 출력: 2026-01-26_04-33-57
```

## 문제 해결

### "서비스 계정 키가 필요합니다" 오류

Firebase 서비스 계정 키를 다운로드하고 경로를 인자로 전달하세요.

### "데이터 파일을 찾을 수 없습니다" 오류

`--skip-download` 옵션 사용 시, `data/` 폴더에 `experiment-data-*.json` 파일이 있어야 합니다.
`--input` 옵션으로 직접 파일 경로를 지정할 수도 있습니다.

### 권한 오류

서비스 계정 키에 Firestore 읽기 권한이 있는지 확인하세요.
