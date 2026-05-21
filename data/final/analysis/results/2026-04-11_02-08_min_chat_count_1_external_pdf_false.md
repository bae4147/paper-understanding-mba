# Analysis Results — min_chat_count_1_external_pdf_false

**Generated:** 2026-04-11 02:08  
**Data:** `data/final-dataset/sessions_preprocessed.csv`

---

## Filters Applied

- 전처리 전 세션 수: 143
- `exclude_external_ai (externalAi_used != no)`: 7명 제외
- `min_chat_count >= 1`: 55명 제외
- `min_attn_focus >= 3`: 2명 제외
- `require_attn_check_pass (stronglyDisagreeCheck == 1)`: 9명 제외
- **최종 분석 대상: 70명** (control: 30, ebm_cimo: 40)

---

## Descriptive Statistics

### Participants

| | control (n=30) | ebm_cimo (n=40) | total (n=70) |
|--|--|--|--|
| Class distribution | busoba7399: 2, honda: 6, mba6202_sat: 3, mba6202_tue: 9, mba6202_wed: 10 | busoba7399: 1, honda: 6, mba6202_sat: 9, mba6202_tue: 14, mba6202_wed: 10 | busoba7399: 3, honda: 12, mba6202_sat: 12, mba6202_tue: 23, mba6202_wed: 20 |

### Media Usage (complete sessions 기준)

| | control | ebm_cimo |
|--|--|--|
| Chat 사용 (≥1 turn) | 30/30 (100.0%) | 40/40 (100.0%) |
| Audio 사용 | 30/30 (100.0%) | 40/40 (100.0%) |
| Video 사용 | 29/30 (96.7%) | 39/40 (97.5%) |
| Infographics 사용 | 30/30 (100.0%) | 40/40 (100.0%) |

---

## ANOVA Results

`*` p<.05, `**` p<.01, `***` p<.001, `†` p<.10

### Self-Efficacy

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Self-Efficacy: Overall Comprehension (avg) | 5.30 (0.80) | 5.53 (0.78) | 1.55 | 0.217 | 0.022 |
| Self-Efficacy: Critical Engagement (avg) | 4.75 (0.85) | 5.21 (1.09) | 3.52 | 0.065† | 0.049 |
| Self-Efficacy: Applicability (avg) | 5.27 (0.86) | 5.50 (1.15) | 0.86 | 0.357 | 0.013 |

### NASA-TLX

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| NASA-TLX: Mental Demand | 3.83 (1.05) | 3.98 (1.07) | 0.30 | 0.584 | 0.004 |
| NASA-TLX: Physical Demand | 1.60 (0.72) | 1.77 (1.05) | 0.61 | 0.436 | 0.009 |
| NASA-TLX: Temporal Demand | 2.23 (1.25) | 2.73 (1.62) | 1.91 | 0.171 | 0.027 |
| NASA-TLX: Performance | 5.23 (1.04) | 5.72 (0.88) | 4.59 | 0.036* | 0.063 |
| NASA-TLX: Effort | 4.60 (1.35) | 4.47 (1.32) | 0.15 | 0.699 | 0.002 |
| NASA-TLX: Frustration | 2.27 (1.14) | 2.40 (1.46) | 0.17 | 0.681 | 0.003 |

### LLM Usefulness

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| LLM Usefulness: Overall | 5.70 (1.42) | 5.83 (1.34) | 0.14 | 0.707 | 0.002 |
| LLM Usefulness: Concept Help | 5.53 (1.41) | 5.75 (1.41) | 0.41 | 0.526 | 0.006 |
| LLM Usefulness: Findings Help | 5.57 (1.41) | 5.85 (1.27) | 0.78 | 0.381 | 0.011 |
| LLM Usefulness: Practical Help | 5.27 (1.51) | 5.67 (1.40) | 1.36 | 0.247 | 0.020 |
| LLM Usefulness: Time Saving | 6.00 (1.60) | 5.92 (1.54) | 0.04 | 0.843 | 0.001 |

### LLM Trust

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| LLM Trust: Competence | 5.63 (1.38) | 5.60 (1.46) | 0.01 | 0.923 | 0.000 |
| LLM Trust: Accuracy | 5.70 (1.29) | 5.60 (1.32) | 0.10 | 0.752 | 0.001 |
| LLM Trust: Benevolence | 5.53 (1.46) | 5.33 (1.72) | 0.29 | 0.594 | 0.004 |
| LLM Trust: Reliability | 4.20 (1.85) | 4.30 (1.87) | 0.05 | 0.824 | 0.001 |
| LLM Trust: Comfort Acting | 4.43 (1.61) | 4.28 (1.83) | 0.14 | 0.707 | 0.002 |
| LLM Trust: Comfort Using | 4.30 (1.76) | 4.38 (1.63) | 0.03 | 0.855 | 0.000 |
| LLM Trust: Rely Without Reading | 4.47 (1.50) | 4.47 (1.62) | 0.00 | 0.983 | 0.000 |
| LLM Trust: Assume Clear Is Accurate | 4.07 (1.70) | 4.12 (1.77) | 0.02 | 0.890 | 0.000 |
| LLM Trust: Confident Without Details | 3.93 (1.70) | 4.00 (1.88) | 0.02 | 0.879 | 0.000 |
| LLM Trust: Rely For Importance | 3.00 (1.72) | 3.27 (1.78) | 0.42 | 0.519 | 0.006 |

### Post-Task

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Post-Task: Implementation Likelihood | 4.47 (1.53) | 5.12 (1.44) | 3.42 | 0.069† | 0.048 |
| Post-Task: New Strategy Confidence | 5.03 (1.16) | 5.30 (1.11) | 0.95 | 0.333 | 0.014 |

### Reading Behavior

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Reading: Total Duration (ms) | 1137077.20 (2850219.45) | 1220852.02 (1955374.94) | 0.02 | 0.884 | 0.000 |
| Chat: Query Count | 2.30 (1.62) | 3.08 (3.02) | 1.62 | 0.207 | 0.023 |
