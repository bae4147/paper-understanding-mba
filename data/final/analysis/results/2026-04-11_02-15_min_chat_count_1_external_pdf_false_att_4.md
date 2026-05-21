# Analysis Results — min_chat_count_1_external_pdf_false_att_4

**Generated:** 2026-04-11 02:15  
**Data:** `data/final-dataset/sessions_preprocessed.csv`

---

## Filters Applied

- 전처리 전 세션 수: 143
- `exclude_external_ai (externalAi_used != no)`: 7명 제외
- `min_chat_count >= 1`: 55명 제외
- `min_attn_focus >= 4`: 7명 제외
- `require_attn_check_pass (stronglyDisagreeCheck == 1)`: 8명 제외
- **최종 분석 대상: 66명** (control: 29, ebm_cimo: 37)

---

## Descriptive Statistics

### Participants

| | control (n=29) | ebm_cimo (n=37) | total (n=66) |
|--|--|--|--|
| Class distribution | busoba7399: 2, honda: 6, mba6202_sat: 3, mba6202_tue: 9, mba6202_wed: 9 | busoba7399: 1, honda: 5, mba6202_sat: 9, mba6202_tue: 13, mba6202_wed: 9 | busoba7399: 3, honda: 11, mba6202_sat: 12, mba6202_tue: 22, mba6202_wed: 18 |

### Media Usage (complete sessions 기준)

| | control | ebm_cimo |
|--|--|--|
| Chat 사용 (≥1 turn) | 29/29 (100.0%) | 37/37 (100.0%) |
| Audio 사용 | 29/29 (100.0%) | 37/37 (100.0%) |
| Video 사용 | 28/29 (96.6%) | 36/37 (97.3%) |
| Infographics 사용 | 29/29 (100.0%) | 37/37 (100.0%) |

---

## ANOVA Results

`*` p<.05, `**` p<.01, `***` p<.001, `†` p<.10

### Self-Efficacy

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Self-Efficacy: Overall Comprehension (avg) | 5.35 (0.76) | 5.55 (0.75) | 1.11 | 0.296 | 0.017 |
| **<u>Self-Efficacy: Critical Engagement (avg)</u>** | **<u>4.77 (0.87)</u>** | **<u>5.26 (1.05)</u>** | **<u>4.27</u>** | **<u>0.043*</u>** | **<u>0.062</u>** |
| Self-Efficacy: Applicability (avg) | 5.31 (0.85) | 5.50 (1.14) | 0.58 | 0.447 | 0.009 |

### NASA-TLX

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| NASA-TLX: Mental Demand | 3.79 (1.05) | 3.92 (1.09) | 0.22 | 0.638 | 0.003 |
| NASA-TLX: Physical Demand | 1.59 (0.73) | 1.84 (1.07) | 1.18 | 0.282 | 0.018 |
| NASA-TLX: Temporal Demand | 2.17 (1.23) | 2.84 (1.62) | 3.36 | 0.071† | 0.050 |
| NASA-TLX: Performance | 5.31 (0.97) | 5.70 (0.88) | 2.97 | 0.090† | 0.044 |
| NASA-TLX: Effort | 4.62 (1.37) | 4.54 (1.30) | 0.06 | 0.809 | 0.001 |
| NASA-TLX: Frustration | 2.21 (1.11) | 2.49 (1.48) | 0.71 | 0.401 | 0.011 |

### LLM Usefulness

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| LLM Usefulness: Overall | 5.72 (1.44) | 5.76 (1.36) | 0.01 | 0.925 | 0.000 |
| LLM Usefulness: Concept Help | 5.55 (1.43) | 5.68 (1.43) | 0.12 | 0.728 | 0.002 |
| LLM Usefulness: Findings Help | 5.59 (1.43) | 5.78 (1.29) | 0.35 | 0.558 | 0.005 |
| LLM Usefulness: Practical Help | 5.28 (1.53) | 5.59 (1.42) | 0.76 | 0.386 | 0.012 |
| LLM Usefulness: Time Saving | 6.00 (1.63) | 5.84 (1.57) | 0.17 | 0.683 | 0.003 |

### LLM Trust

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| LLM Trust: Competence | 5.69 (1.37) | 5.59 (1.50) | 0.07 | 0.791 | 0.001 |
| LLM Trust: Accuracy | 5.76 (1.27) | 5.59 (1.34) | 0.25 | 0.616 | 0.004 |
| LLM Trust: Benevolence | 5.59 (1.45) | 5.27 (1.76) | 0.61 | 0.438 | 0.009 |
| LLM Trust: Reliability | 4.28 (1.83) | 4.32 (1.90) | 0.01 | 0.917 | 0.000 |
| LLM Trust: Comfort Acting | 4.48 (1.62) | 4.30 (1.85) | 0.18 | 0.671 | 0.003 |
| LLM Trust: Comfort Using | 4.34 (1.78) | 4.35 (1.69) | 0.00 | 0.988 | 0.000 |
| LLM Trust: Rely Without Reading | 4.45 (1.53) | 4.49 (1.68) | 0.01 | 0.924 | 0.000 |
| LLM Trust: Assume Clear Is Accurate | 4.14 (1.68) | 4.05 (1.81) | 0.04 | 0.848 | 0.001 |
| LLM Trust: Confident Without Details | 3.97 (1.72) | 3.89 (1.91) | 0.03 | 0.872 | 0.000 |
| LLM Trust: Rely For Importance | 3.00 (1.75) | 3.27 (1.79) | 0.38 | 0.541 | 0.006 |

### Post-Task

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Post-Task: Implementation Likelihood | 4.45 (1.55) | 5.08 (1.44) | 2.94 | 0.091† | 0.044 |
| Post-Task: New Strategy Confidence | 5.07 (1.16) | 5.24 (1.12) | 0.38 | 0.539 | 0.006 |

### Reading Behavior

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Reading: Total Duration (ms) | 1168393.52 (2895412.37) | 1253203.41 (2029043.10) | 0.02 | 0.889 | 0.000 |
| Chat: Query Count | 2.24 (1.62) | 3.14 (3.13) | 1.95 | 0.167 | 0.030 |
