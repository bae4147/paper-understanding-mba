# Analysis Results — min_chat_count_2_external_pdf_false

**Generated:** 2026-04-11 02:08  
**Data:** `data/final-dataset/sessions_preprocessed.csv`

---

## Filters Applied

- 전처리 전 세션 수: 143
- `exclude_external_ai (externalAi_used != no)`: 7명 제외
- `min_chat_count >= 2`: 86명 제외
- `min_attn_focus >= 3`: 2명 제외
- `require_attn_check_pass (stronglyDisagreeCheck == 1)`: 3명 제외
- **최종 분석 대상: 45명** (control: 18, ebm_cimo: 27)

---

## Descriptive Statistics

### Participants

| | control (n=18) | ebm_cimo (n=27) | total (n=45) |
|--|--|--|--|
| Class distribution | busoba7399: 1, honda: 3, mba6202_sat: 2, mba6202_tue: 3, mba6202_wed: 9 | busoba7399: 1, honda: 3, mba6202_sat: 5, mba6202_tue: 12, mba6202_wed: 6 | busoba7399: 2, honda: 6, mba6202_sat: 7, mba6202_tue: 15, mba6202_wed: 15 |

### Media Usage (complete sessions 기준)

| | control | ebm_cimo |
|--|--|--|
| Chat 사용 (≥1 turn) | 18/18 (100.0%) | 27/27 (100.0%) |
| Audio 사용 | 18/18 (100.0%) | 27/27 (100.0%) |
| Video 사용 | 18/18 (100.0%) | 26/27 (96.3%) |
| Infographics 사용 | 18/18 (100.0%) | 27/27 (100.0%) |

---

## ANOVA Results

`*` p<.05, `**` p<.01, `***` p<.001, `†` p<.10

### Self-Efficacy

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Self-Efficacy: Overall Comprehension (avg) | 5.02 (0.82) | 5.55 (0.82) | 4.54 | 0.039* | 0.095 |
| Self-Efficacy: Critical Engagement (avg) | 4.70 (0.88) | 5.32 (0.98) | 4.65 | 0.037* | 0.098 |
| Self-Efficacy: Applicability (avg) | 5.16 (0.80) | 5.42 (1.19) | 0.67 | 0.417 | 0.015 |

### NASA-TLX

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| NASA-TLX: Mental Demand | 3.72 (1.27) | 3.96 (1.09) | 0.46 | 0.501 | 0.011 |
| NASA-TLX: Physical Demand | 1.33 (0.49) | 1.70 (0.99) | 2.15 | 0.150 | 0.048 |
| NASA-TLX: Temporal Demand | 2.28 (1.02) | 2.78 (1.78) | 1.16 | 0.288 | 0.026 |
| NASA-TLX: Performance | 4.94 (1.00) | 5.85 (0.82) | 11.13 | 0.002** | 0.206 |
| NASA-TLX: Effort | 4.17 (1.29) | 4.52 (1.40) | 0.73 | 0.399 | 0.017 |
| NASA-TLX: Frustration | 2.44 (1.10) | 2.41 (1.60) | 0.01 | 0.932 | 0.000 |

### LLM Usefulness

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| LLM Usefulness: Overall | 5.61 (1.20) | 5.89 (1.34) | 0.51 | 0.481 | 0.012 |
| LLM Usefulness: Concept Help | 5.33 (1.14) | 5.85 (1.46) | 1.61 | 0.211 | 0.036 |
| LLM Usefulness: Findings Help | 5.56 (1.15) | 5.96 (1.29) | 1.18 | 0.284 | 0.027 |
| LLM Usefulness: Practical Help | 5.06 (1.30) | 5.78 (1.48) | 2.83 | 0.100† | 0.062 |
| LLM Usefulness: Time Saving | 5.94 (1.51) | 5.96 (1.53) | 0.00 | 0.968 | 0.000 |

### LLM Trust

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| LLM Trust: Competence | 5.50 (1.10) | 5.59 (1.58) | 0.05 | 0.830 | 0.001 |
| LLM Trust: Accuracy | 5.67 (0.84) | 5.52 (1.45) | 0.15 | 0.698 | 0.004 |
| LLM Trust: Benevolence | 5.44 (1.25) | 5.41 (1.65) | 0.01 | 0.936 | 0.000 |
| LLM Trust: Reliability | 3.50 (1.47) | 4.26 (2.10) | 1.76 | 0.191 | 0.039 |
| LLM Trust: Comfort Acting | 3.89 (1.49) | 4.30 (1.90) | 0.59 | 0.448 | 0.013 |
| LLM Trust: Comfort Using | 3.67 (1.61) | 4.48 (1.70) | 2.60 | 0.114 | 0.057 |
| LLM Trust: Rely Without Reading | 4.00 (1.19) | 4.22 (1.67) | 0.24 | 0.629 | 0.005 |
| LLM Trust: Assume Clear Is Accurate | 3.78 (1.52) | 4.11 (1.78) | 0.42 | 0.519 | 0.010 |
| LLM Trust: Confident Without Details | 3.72 (1.36) | 4.15 (1.94) | 0.65 | 0.423 | 0.015 |
| LLM Trust: Rely For Importance | 3.00 (1.50) | 3.15 (1.70) | 0.09 | 0.766 | 0.002 |

### Post-Task

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Post-Task: Implementation Likelihood | 4.33 (1.46) | 5.19 (1.44) | 3.74 | 0.060† | 0.080 |
| Post-Task: New Strategy Confidence | 5.06 (1.21) | 5.33 (1.18) | 0.59 | 0.447 | 0.013 |

### Reading Behavior

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Reading: Total Duration (ms) | 1550924.50 (3648753.30) | 1479841.37 (2304679.84) | 0.01 | 0.936 | 0.000 |
| Chat: Query Count | 3.17 (1.58) | 4.07 (3.23) | 1.22 | 0.276 | 0.028 |
