# Analysis Results — reading_5min_min_chat_count_2

**Generated:** 2026-04-11 02:58  
**Data:** `data/final-dataset/sessions_preprocessed.csv`

---

## Filters Applied

- 전처리 전 세션 수: 143
- `exclude_external_ai (externalAi_used != no)`: 7명 제외
- `exclude_external_pdf (externalPdf_used != no)`: 21명 제외
- `min_reading_time_ms >= 300000`: 40명 제외
- `min_chat_count >= 2`: 43명 제외
- `min_attn_focus >= 3`: 1명 제외
- `require_attn_check_pass (stronglyDisagreeCheck == 1)`: 1명 제외
- **최종 분석 대상: 30명** (control: 12, ebm_cimo: 18)

---

## Descriptive Statistics

### Participants

| | control (n=12) | ebm_cimo (n=18) | total (n=30) |
|--|--|--|--|
| Class distribution | busoba7399: 1, honda: 2, mba6202_sat: 1, mba6202_tue: 2, mba6202_wed: 6 | honda: 3, mba6202_sat: 2, mba6202_tue: 8, mba6202_wed: 5 | busoba7399: 1, honda: 5, mba6202_sat: 3, mba6202_tue: 10, mba6202_wed: 11 |

### Media Usage (complete sessions 기준)

| | control | ebm_cimo |
|--|--|--|
| Chat 사용 (≥1 turn) | 12/12 (100.0%) | 18/18 (100.0%) |
| Audio 사용 | 12/12 (100.0%) | 18/18 (100.0%) |
| Video 사용 | 12/12 (100.0%) | 17/18 (94.4%) |
| Infographics 사용 | 12/12 (100.0%) | 18/18 (100.0%) |

---

## ANOVA Results

`*` p<.05, `**` p<.01, `***` p<.001, `†` p<.10

### Self-Efficacy

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　Self-Efficacy: Overall Comprehension (avg) | 5.01 (0.88) | 5.41 (0.86) | 1.52 | 0.228 | 0.051 |
| 　Self-Efficacy: Critical Engagement (avg) | 4.62 (0.90) | 5.11 (1.04) | 1.79 | 0.191 | 0.060 |
| 　Self-Efficacy: Applicability (avg) | 5.25 (0.88) | 5.07 (1.25) | 0.18 | 0.677 | 0.006 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| Self-Efficacy: Total Composite (avg of all 20 items) | 4.98 (0.74) | 5.23 (0.91) | 0.63 | 0.435 | 0.022 |

### NASA-TLX

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| NASA-TLX: Mental Demand | 3.67 (1.23) | 4.33 (0.77) | 3.36 | 0.077† | 0.107 |
| NASA-TLX: Physical Demand | 1.25 (0.45) | 1.61 (1.04) | 1.28 | 0.267 | 0.044 |
| NASA-TLX: Temporal Demand | 2.25 (0.87) | 3.17 (1.95) | 2.33 | 0.138 | 0.077 |
| **<u>NASA-TLX: Performance</u>** | **<u>5.08 (0.90)</u>** | **<u>5.78 (0.81)</u>** | **<u>4.85</u>** | **<u>0.036*</u>** | **<u>0.148</u>** |
| NASA-TLX: Effort | 4.08 (1.51) | 4.33 (1.57) | 0.19 | 0.668 | 0.007 |
| NASA-TLX: Frustration | 2.33 (0.78) | 2.39 (1.69) | 0.01 | 0.916 | 0.000 |

### LLM Usefulness

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　LLM Usefulness: Overall | 5.50 (1.31) | 6.06 (1.30) | 1.30 | 0.264 | 0.044 |
| 　LLM Usefulness: Concept Help | 5.33 (1.30) | 5.94 (1.43) | 1.40 | 0.246 | 0.048 |
| 　LLM Usefulness: Findings Help | 5.50 (1.17) | 6.11 (1.02) | 2.30 | 0.141 | 0.076 |
| 　LLM Usefulness: Practical Help | 5.00 (1.41) | 5.56 (1.54) | 1.00 | 0.327 | 0.034 |
| 　LLM Usefulness: Time Saving | 6.08 (1.31) | 6.11 (1.53) | 0.00 | 0.959 | 0.000 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| LLM Usefulness: Total Composite (avg of 5 items) | 5.48 (1.09) | 5.96 (1.24) | 1.14 | 0.294 | 0.039 |

### LLM Trust

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　LLM Trust: Competence | 5.58 (1.16) | 5.56 (1.54) | 0.00 | 0.958 | 0.000 |
| 　LLM Trust: Accuracy | 5.83 (0.72) | 5.44 (1.50) | 0.69 | 0.413 | 0.024 |
| 　LLM Trust: Benevolence | 5.33 (1.37) | 5.67 (1.50) | 0.38 | 0.542 | 0.013 |
| 　LLM Trust: Reliability | 3.50 (1.31) | 4.11 (2.05) | 0.83 | 0.370 | 0.029 |
| 　LLM Trust: Comfort Acting | 3.75 (1.54) | 4.28 (1.81) | 0.69 | 0.415 | 0.024 |
| 　LLM Trust: Comfort Using | 3.50 (1.68) | 4.44 (1.65) | 2.32 | 0.139 | 0.077 |
| 　LLM Trust: Rely Without Reading | 3.67 (1.23) | 4.22 (1.56) | 1.08 | 0.308 | 0.037 |
| 　LLM Trust: Assume Clear Is Accurate | 3.83 (1.70) | 4.17 (1.50) | 0.32 | 0.577 | 0.011 |
| 　LLM Trust: Confident Without Details | 3.83 (1.64) | 4.28 (1.74) | 0.49 | 0.490 | 0.017 |
| 　LLM Trust: Rely For Importance | 2.67 (1.56) | 3.06 (1.59) | 0.44 | 0.514 | 0.015 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| LLM Trust: Total Composite (avg of 10 items) | 4.15 (1.03) | 4.52 (1.33) | 0.67 | 0.420 | 0.023 |

### Post-Task

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Post-Task: Implementation Likelihood | 4.25 (1.54) | 5.22 (1.63) | 2.67 | 0.113 | 0.087 |
| Post-Task: New Strategy Confidence | 5.00 (1.28) | 5.22 (1.22) | 0.23 | 0.635 | 0.008 |

### Reading Behavior

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Reading: Total Duration (ms) | 2012795.92 (4441051.76) | 1871148.22 (2717033.37) | 0.01 | 0.914 | 0.000 |
| Chat: Query Count | 3.00 (1.13) | 3.72 (2.14) | 1.15 | 0.293 | 0.039 |
