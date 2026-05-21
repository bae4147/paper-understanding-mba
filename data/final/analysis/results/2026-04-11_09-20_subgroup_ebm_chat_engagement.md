# Analysis Results — subgroup_ebm_chat_engagement

**Generated:** 2026-04-11 09:20  
**Data:** `data/final-dataset/sessions_preprocessed.csv`

> **Exploratory subgroup analysis** — ebm_cimo 조건 내 `chat_count` 기준 분리 (threshold: 3)  
> 그룹 크기가 작아 통계적 검정력이 제한적임. 결과는 탐색적으로 해석할 것.

---

## Filters Applied

- 전처리 전 세션 수: 143
- `exclude_external_ai (externalAi_used != no)`: 7명 제외
- `exclude_external_pdf (externalPdf_used != no)`: 21명 제외
- `min_attn_focus >= 3`: 4명 제외
- `require_attn_check_pass (stronglyDisagreeCheck == 1)`: 14명 제외
- `condition == ebm_cimo` 로 제한: 45명 제외
- **최종 분석 대상: 52명** (low_chat (≤2턴): 37, high_chat (≥3턴): 15)

---

## Descriptive Statistics

### Participants

| | low_chat (≤2턴) (n=37) | high_chat (≥3턴) (n=15) | total (n=52) |
|--|--|--|--|
| Class distribution | honda: 6, mba6202_sat: 8, mba6202_tue: 13, mba6202_wed: 10 | honda: 2, mba6202_sat: 3, mba6202_tue: 6, mba6202_wed: 4 | honda: 8, mba6202_sat: 11, mba6202_tue: 19, mba6202_wed: 14 |

### Media Usage (complete sessions 기준)

| | low_chat (≤2턴) | high_chat (≥3턴) |
|--|--|--|
| Chat 사용 (≥1 turn) | 18/37 (48.6%) | 15/15 (100.0%) |
| Audio 사용 | 37/37 (100.0%) | 15/15 (100.0%) |
| Video 사용 | 37/37 (100.0%) | 14/15 (93.3%) |
| Infographics 사용 | 37/37 (100.0%) | 15/15 (100.0%) |

---

## ANOVA Results

`*` p<.05, `**` p<.01, `***` p<.001, `†` p<.10

### Self-Efficacy

| Dependent Variable | low_chat (≤2턴) M (SD) | high_chat (≥3턴) M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　Self-Efficacy: Overall Comprehension (avg) | 5.55 (0.78) | 5.40 (0.66) | 0.43 | 0.516 | 0.008 |
| 　Self-Efficacy: Critical Engagement (avg) | 5.00 (1.12) | 5.41 (0.91) | 1.60 | 0.212 | 0.031 |
| 　Self-Efficacy: Applicability (avg) | 5.43 (1.05) | 5.28 (1.12) | 0.22 | 0.638 | 0.004 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| Total Composite (avg of all 20 items) | 5.38 (0.83) | 5.37 (0.74) | 0.00 | 0.966 | 0.000 |

### NASA-TLX

| Dependent Variable | low_chat (≤2턴) M (SD) | high_chat (≥3턴) M (SD) | F | p | η² |
|--|--|--|--|--|--|
| NASA-TLX: Mental Demand | 3.97 (1.14) | 4.20 (1.01) | 0.45 | 0.506 | 0.009 |
| NASA-TLX: Physical Demand | 2.00 (1.25) | 1.73 (1.10) | 0.52 | 0.474 | 0.010 |
| NASA-TLX: Temporal Demand | 2.54 (1.48) | 3.40 (1.99) | 2.92 | 0.093† | 0.055 |
| NASA-TLX: Performance | 5.62 (1.04) | 5.80 (0.68) | 0.38 | 0.542 | 0.007 |
| NASA-TLX: Effort | 4.32 (1.27) | 4.67 (1.45) | 0.72 | 0.402 | 0.014 |
| NASA-TLX: Frustration | 2.62 (1.44) | 2.53 (1.60) | 0.04 | 0.847 | 0.001 |

### LLM Usefulness

| Dependent Variable | low_chat (≤2턴) M (SD) | high_chat (≥3턴) M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　LLM Usefulness: Overall | 5.76 (1.44) | 6.00 (1.41) | 0.31 | 0.582 | 0.006 |
| 　LLM Usefulness: Concept Help | 5.70 (1.41) | 5.80 (1.52) | 0.05 | 0.827 | 0.001 |
| 　LLM Usefulness: Findings Help | 5.70 (1.43) | 6.07 (1.10) | 0.78 | 0.381 | 0.015 |
| 　LLM Usefulness: Practical Help | 5.43 (1.42) | 5.53 (1.68) | 0.05 | 0.827 | 0.001 |
| 　LLM Usefulness: Time Saving | 6.05 (1.49) | 6.00 (1.65) | 0.01 | 0.909 | 0.000 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| Total Composite (avg of 5 items) | 5.73 (1.33) | 5.88 (1.35) | 0.14 | 0.715 | 0.003 |

### LLM Trust

| Dependent Variable | low_chat (≤2턴) M (SD) | high_chat (≥3턴) M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　LLM Trust: Competence | 5.65 (1.25) | 5.67 (1.72) | 0.00 | 0.967 | 0.000 |
| 　LLM Trust: Accuracy | 5.73 (1.19) | 5.40 (1.72) | 0.62 | 0.433 | 0.012 |
| 　LLM Trust: Benevolence | 5.54 (1.52) | 5.53 (1.81) | 0.00 | 0.988 | 0.000 |
| 　LLM Trust: Reliability | 4.54 (1.57) | 4.33 (2.16) | 0.15 | 0.702 | 0.003 |
| 　LLM Trust: Comfort Acting | 4.57 (1.54) | 4.07 (2.05) | 0.93 | 0.340 | 0.018 |
| 　LLM Trust: Comfort Using | 4.65 (1.53) | 4.13 (1.92) | 1.04 | 0.313 | 0.020 |
| 　LLM Trust: Rely Without Reading | 4.70 (1.43) | 4.13 (1.73) | 1.50 | 0.227 | 0.029 |
| 　LLM Trust: Assume Clear Is Accurate | 4.49 (1.64) | 4.07 (1.79) | 0.66 | 0.420 | 0.013 |
| 　LLM Trust: Confident Without Details | 4.54 (1.59) | 4.00 (2.00) | 1.06 | 0.308 | 0.021 |
| 　LLM Trust: Rely For Importance | 3.49 (1.69) | 3.40 (1.80) | 0.03 | 0.871 | 0.001 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| Total Composite (avg of 10 items) | 4.79 (1.15) | 4.47 (1.64) | 0.63 | 0.432 | 0.012 |

### Post-Task

| Dependent Variable | low_chat (≤2턴) M (SD) | high_chat (≥3턴) M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Post-Task: Implementation Likelihood | 4.89 (1.51) | 5.60 (1.50) | 2.36 | 0.130 | 0.045 |
| Post-Task: New Strategy Confidence | 5.35 (1.32) | 5.40 (0.99) | 0.02 | 0.898 | 0.000 |

### Reading Behavior

| Dependent Variable | low_chat (≤2턴) M (SD) | high_chat (≥3턴) M (SD) | F | p | η² |
|--|--|--|--|--|--|
| **<u>Reading: Total Duration (ms)</u>** | **<u>605065.84 (552547.13)</u>** | **<u>1889222.27 (3009460.08)</u>** | **<u>6.39</u>** | **<u>0.015*</u>** | **<u>0.113</u>** |
| **<u>Chat: Query Count</u>** | **<u>0.68 (0.78)</u>** | **<u>4.27 (2.05)</u>** | **<u>84.91</u>** | **<u>0.000***</u>** | **<u>0.629</u>** |
