# 26-05-09 데이터 디렉토리

**생성일**: 2026-05-09  
**목적**: build_sessions_csv.py 버그 수정 후 파이프라인 재실행 결과물

---

## 파이프라인

```
data/runs/2026-04-10_23-40-46/          ← 원본 실험 데이터 (최신 run)
  ↓ scripts/build_sessions_csv.py
data/26-05-09/sessions.csv              (164명 처리, 341 세션)
  ↓ scripts/preprocess_sessions.py
data/26-05-09/sessions_preprocessed.csv (complete 세션 143명)
  ↓ data/final-dataset/merge_classcode.py (class_coded_roster.csv 참조)
data/26-05-09/sessions_with_classcode.csv (143명, 전원 매칭)
  ↓ scripts/merge_sessions_to_survey.py (data/26-05-06/merged_clean.xlsx 참조)
data/26-05-09/merged_final.xlsx         (168행 — 세션 142명 매칭, 26명 미매칭)
  ↓ build_analysis_sample.py
data/26-05-09/merged_final_labeled.xlsx ← 168명 전체 + included/exclusion_reason
data/26-05-09/analysis_sample.csv       ← 최종 분석 샘플 94명
data/26-05-09/excluded_participants.csv ← 제외자 74명 + 사유
```

> **이전 버전(data/26-05-06/)과의 차이**: build_sessions_csv.py의 window_active 계산 버그 수정.  
> 이전에는 `focus_switch` 이벤트만으로 패널 포커스 구간을 산출해 `window_active_*_ms`가 `focusTime_*_ms`보다 크게 나오는 불가능한 케이스가 존재했음. 수정 후 전 패널에서 window_active ≤ focusTime 보장.

---

## 파일 목록

| 파일 | 설명 |
|---|---|
| `merged_final.xlsx` | 원본 마스터 (168행, 수정 금지) |
| `merged_final_labeled.xlsx` | merged_final + `included` / `exclusion_reason` 컬럼 |
| `analysis_sample.csv` | 최종 분석 대상 94명 |
| `excluded_participants.csv` | 제외자 74명 + 사유 |
| `build_analysis_sample.py` | 샘플 생성 스크립트 (필터 변경 시 재실행) |
| `sessions.csv` | build_sessions_csv.py 출력 |
| `sessions_preprocessed.csv` | preprocess_sessions.py 출력 |
| `sessions_with_classcode.csv` | merge_classcode.py 출력 |

---

## 분석 샘플 구성 (n=94)

`build_analysis_sample.py`의 `FILTERS` 딕셔너리로 관리. 기준 변경 시 재실행하면 세 파일 자동 재생성.

### 제외 기준 및 현황

| 제외 사유 | 명 | 세부 |
|---|---|---|
| `no_session_match` | 26명 | 설문만 완료, 실험 세션 없음 |
| `non_mba` | 31명 | honda(ClassCode 4, 25명) + busoba7399(ClassCode 5, 6명) |
| `active_min <= 1.0` | 15명 | 접속만 하고 실질 참여 없음 (최대 0.97분) |
| `video_outlier` | 2명 | video window_active 비정상 (rhill7389: 3880s, enslen.4: 4553s) |
| **최종 포함** | **94명** | |

### 단계별 흐름

```
전체 merged_final   168명
세션 매칭 성공      142명  (-26명: no_session_match)
MBA only            111명  (-31명: non_mba)
active_min > 1      96명   (-15명: active_min<=1)
video outlier 제외  94명   (-2명:  video_outlier)
```

---

## 매체별 "유의미한 사용" 기준 (n=94 기준)

| 매체 | 측정 변수 | 기준 | 사용 | 미사용 | 근거 |
|---|---|---|---|---|---|
| **Chat** | `S2_chat_count` | ≥ 1 | 63명 | 31명 | 쿼리 전송 이벤트 — 가장 명확한 신호 |
| **Audio** | `S2_audio_playback_duration_sec` | ≥ 30s | 30명 | 64명 | 실제 청취 후 30초 전후에 intro→본론 전환 확인. 30s 미만 4명은 재생 시도로 보기 어려움 |
| **Video** | `S2_window_active_video_ms` | ≥ 72s | 42명 | 52명 | 슬라이드쇼 구조: Scene 8(Main Content 시작)까지 누적 72s. 재생 이벤트 미수집으로 window_active proxy 사용 |
| **Infog** | `S2_window_active_infographics_ms` | ≥ 30s | 35명 | 59명 | 분포상 0–10s(2명), 10–30s(4명), 30s+(35명)으로 자연 단절. 정적 이미지 최소 열람 시간 |

> **Video 한계**: `video_play`/`video_pause` 이벤트가 전원 0으로 기록되어 실제 재생 여부 확인 불가.  
> `window_active_video_ms`는 해당 패널에 포커스된 시간(브라우저 활성 상태)만 반영하므로 실제 시청과 다를 수 있음. Limitation에 명시 필요.
