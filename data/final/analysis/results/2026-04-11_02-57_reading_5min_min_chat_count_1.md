# Analysis Results — reading_5min_min_chat_count_1

**Generated:** 2026-04-11 02:57  
**Data:** `data/final-dataset/sessions_preprocessed.csv`

---

## Filters Applied

- 전처리 전 세션 수: 143
- `exclude_external_ai (externalAi_used != no)`: 7명 제외
- `exclude_external_pdf (externalPdf_used != no)`: 21명 제외
- `min_reading_time_ms >= 300000`: 40명 제외
- `min_chat_count >= 1`: 31명 제외
- `min_attn_focus >= 3`: 1명 제외
- `require_attn_check_pass (stronglyDisagreeCheck == 1)`: 1명 제외
- **최종 분석 대상: 42명** (control: 19, ebm_cimo: 23)

---

## Descriptive Statistics

### Participants

| | control (n=19) | ebm_cimo (n=23) | total (n=42) |
|--|--|--|--|
| Class distribution | busoba7399: 1, honda: 5, mba6202_sat: 2, mba6202_tue: 4, mba6202_wed: 7 | honda: 5, mba6202_sat: 3, mba6202_tue: 9, mba6202_wed: 6 | busoba7399: 1, honda: 10, mba6202_sat: 5, mba6202_tue: 13, mba6202_wed: 13 |

### Media Usage (complete sessions 기준)

| | control | ebm_cimo |
|--|--|--|
| Chat 사용 (≥1 turn) | 19/19 (100.0%) | 23/23 (100.0%) |
| Audio 사용 | 19/19 (100.0%) | 23/23 (100.0%) |
| Video 사용 | 18/19 (94.7%) | 22/23 (95.7%) |
| Infographics 사용 | 19/19 (100.0%) | 23/23 (100.0%) |

---

## ANOVA Results

`*` p<.05, `**` p<.01, `***` p<.001, `†` p<.10

### Self-Efficacy

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　Self-Efficacy: Overall Comprehension (avg) | 5.22 (0.77) | 5.44 (0.87) | 0.76 | 0.388 | 0.019 |
| 　Self-Efficacy: Critical Engagement (avg) | 4.66 (0.85) | 5.10 (1.06) | 2.16 | 0.150 | 0.051 |
| 　Self-Efficacy: Applicability (avg) | 5.26 (0.87) | 5.20 (1.19) | 0.04 | 0.838 | 0.001 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| Self-Efficacy: Total Composite (avg of all 20 items) | 5.09 (0.62) | 5.28 (0.90) | 0.61 | 0.438 | 0.015 |

### NASA-TLX

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| NASA-TLX: Mental Demand | 3.74 (1.05) | 4.22 (0.80) | 2.86 | 0.099† | 0.067 |
| NASA-TLX: Physical Demand | 1.53 (0.61) | 1.70 (1.02) | 0.40 | 0.529 | 0.010 |
| NASA-TLX: Temporal Demand | 2.26 (1.28) | 3.04 (1.77) | 2.57 | 0.117 | 0.060 |
| NASA-TLX: Performance | 5.21 (0.79) | 5.70 (0.97) | 3.06 | 0.088† | 0.071 |
| NASA-TLX: Effort | 4.26 (1.33) | 4.48 (1.47) | 0.24 | 0.625 | 0.006 |
| NASA-TLX: Frustration | 1.95 (0.85) | 2.39 (1.53) | 1.27 | 0.266 | 0.031 |

### LLM Usefulness

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　LLM Usefulness: Overall | 5.79 (1.23) | 6.00 (1.28) | 0.29 | 0.592 | 0.007 |
| 　LLM Usefulness: Concept Help | 5.68 (1.25) | 5.87 (1.39) | 0.20 | 0.655 | 0.005 |
| 　LLM Usefulness: Findings Help | 5.74 (1.10) | 6.00 (1.09) | 0.60 | 0.441 | 0.015 |
| 　LLM Usefulness: Practical Help | 5.42 (1.35) | 5.57 (1.47) | 0.11 | 0.744 | 0.003 |
| 　LLM Usefulness: Time Saving | 6.21 (1.18) | 6.09 (1.47) | 0.09 | 0.769 | 0.002 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| LLM Usefulness: Total Composite (avg of 5 items) | 5.77 (1.07) | 5.90 (1.23) | 0.14 | 0.708 | 0.004 |

### LLM Trust

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　LLM Trust: Competence | 5.84 (1.12) | 5.48 (1.47) | 0.78 | 0.381 | 0.019 |
| 　LLM Trust: Accuracy | 5.89 (0.88) | 5.39 (1.44) | 1.78 | 0.190 | 0.043 |
| 　LLM Trust: Benevolence | 5.58 (1.30) | 5.57 (1.44) | 0.00 | 0.975 | 0.000 |
| 　LLM Trust: Reliability | 4.21 (1.69) | 4.26 (1.91) | 0.01 | 0.929 | 0.000 |
| 　LLM Trust: Comfort Acting | 4.32 (1.63) | 4.48 (1.70) | 0.10 | 0.756 | 0.002 |
| 　LLM Trust: Comfort Using | 4.05 (1.84) | 4.57 (1.53) | 0.97 | 0.330 | 0.024 |
| 　LLM Trust: Rely Without Reading | 4.37 (1.57) | 4.48 (1.53) | 0.05 | 0.820 | 0.001 |
| 　LLM Trust: Assume Clear Is Accurate | 4.11 (1.73) | 4.35 (1.47) | 0.24 | 0.625 | 0.006 |
| 　LLM Trust: Confident Without Details | 4.11 (1.66) | 4.22 (1.62) | 0.05 | 0.827 | 0.001 |
| 　LLM Trust: Rely For Importance | 2.84 (1.61) | 3.13 (1.63) | 0.33 | 0.569 | 0.008 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| LLM Trust: Total Composite (avg of 10 items) | 4.53 (1.18) | 4.59 (1.22) | 0.03 | 0.874 | 0.001 |

### Post-Task

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Post-Task: Implementation Likelihood | 4.42 (1.54) | 5.30 (1.49) | 3.55 | 0.067† | 0.081 |
| Post-Task: New Strategy Confidence | 5.05 (1.18) | 5.26 (1.14) | 0.34 | 0.564 | 0.008 |

### Reading Behavior

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Reading: Total Duration (ms) | 1536347.42 (3535149.69) | 1688445.61 (2420742.33) | 0.03 | 0.870 | 0.001 |
| Chat: Query Count | 2.26 (1.33) | 3.13 (2.20) | 2.26 | 0.140 | 0.054 |
