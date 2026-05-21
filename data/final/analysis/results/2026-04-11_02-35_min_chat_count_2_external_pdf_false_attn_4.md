# Analysis Results — min_chat_count_2_external_pdf_false_attn_4

**Generated:** 2026-04-11 02:35  
**Data:** `data/final-dataset/sessions_preprocessed.csv`

---

## Filters Applied

- 전처리 전 세션 수: 143
- `exclude_external_ai (externalAi_used != no)`: 7명 제외
- `min_chat_count >= 2`: 86명 제외
- `min_attn_focus >= 4`: 6명 제외
- `require_attn_check_pass (stronglyDisagreeCheck == 1)`: 3명 제외
- **최종 분석 대상: 41명** (control: 17, ebm_cimo: 24)

---

## Descriptive Statistics

### Participants

| | control (n=17) | ebm_cimo (n=24) | total (n=41) |
|--|--|--|--|
| Class distribution | busoba7399: 1, honda: 3, mba6202_sat: 2, mba6202_tue: 3, mba6202_wed: 8 | busoba7399: 1, honda: 2, mba6202_sat: 5, mba6202_tue: 11, mba6202_wed: 5 | busoba7399: 2, honda: 5, mba6202_sat: 7, mba6202_tue: 14, mba6202_wed: 13 |

### Media Usage (complete sessions 기준)

| | control | ebm_cimo |
|--|--|--|
| Chat 사용 (≥1 turn) | 17/17 (100.0%) | 24/24 (100.0%) |
| Audio 사용 | 17/17 (100.0%) | 24/24 (100.0%) |
| Video 사용 | 17/17 (100.0%) | 23/24 (95.8%) |
| Infographics 사용 | 17/17 (100.0%) | 24/24 (100.0%) |

---

## ANOVA Results

`*` p<.05, `**` p<.01, `***` p<.001, `†` p<.10

### Self-Efficacy

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　Self-Efficacy: Overall Comprehension (avg) | 5.09 (0.78) | 5.57 (0.79) | 3.72 | 0.061† | 0.087 |
| **<u>　Self-Efficacy: Critical Engagement (avg)</u>** | **<u>4.72 (0.90)</u>** | **<u>5.42 (0.88)</u>** | **<u>6.30</u>** | **<u>0.016*</u>** | **<u>0.139</u>** |
| 　Self-Efficacy: Applicability (avg) | 5.22 (0.78) | 5.41 (1.18) | 0.35 | 0.558 | 0.009 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| Self-Efficacy: Total Composite (avg of all 20 items) | 5.04 (0.69) | 5.49 (0.83) | 3.39 | 0.073† | 0.080 |

### NASA-TLX

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| NASA-TLX: Mental Demand | 3.65 (1.27) | 3.88 (1.12) | 0.37 | 0.547 | 0.009 |
| NASA-TLX: Physical Demand | 1.29 (0.47) | 1.79 (1.02) | 3.50 | 0.069† | 0.082 |
| NASA-TLX: Temporal Demand | 2.18 (0.95) | 2.96 (1.81) | 2.65 | 0.111 | 0.064 |
| **<u>NASA-TLX: Performance</u>** | **<u>5.06 (0.90)</u>** | **<u>5.83 (0.82)</u>** | **<u>8.23</u>** | **<u>0.007**</u>** | **<u>0.174</u>** |
| NASA-TLX: Effort | 4.18 (1.33) | 4.62 (1.38) | 1.08 | 0.304 | 0.027 |
| NASA-TLX: Frustration | 2.35 (1.06) | 2.54 (1.64) | 0.17 | 0.680 | 0.004 |

### LLM Usefulness

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　LLM Usefulness: Overall | 5.65 (1.22) | 5.79 (1.38) | 0.12 | 0.731 | 0.003 |
| 　LLM Usefulness: Concept Help | 5.35 (1.17) | 5.75 (1.51) | 0.82 | 0.370 | 0.021 |
| 　LLM Usefulness: Findings Help | 5.59 (1.18) | 5.88 (1.33) | 0.51 | 0.480 | 0.013 |
| 　LLM Usefulness: Practical Help | 5.06 (1.34) | 5.67 (1.52) | 1.74 | 0.194 | 0.043 |
| 　LLM Usefulness: Time Saving | 5.94 (1.56) | 5.83 (1.58) | 0.05 | 0.830 | 0.001 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| LLM Usefulness: Total Composite (avg of 5 items) | 5.52 (1.03) | 5.78 (1.28) | 0.50 | 0.484 | 0.013 |

### LLM Trust

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　LLM Trust: Competence | 5.59 (1.06) | 5.58 (1.64) | 0.00 | 0.991 | 0.000 |
| 　LLM Trust: Accuracy | 5.76 (0.75) | 5.50 (1.50) | 0.45 | 0.508 | 0.011 |
| 　LLM Trust: Benevolence | 5.53 (1.23) | 5.33 (1.71) | 0.16 | 0.689 | 0.004 |
| 　LLM Trust: Reliability | 3.59 (1.46) | 4.29 (2.18) | 1.34 | 0.254 | 0.033 |
| 　LLM Trust: Comfort Acting | 3.94 (1.52) | 4.33 (1.95) | 0.48 | 0.492 | 0.012 |
| 　LLM Trust: Comfort Using | 3.71 (1.65) | 4.46 (1.79) | 1.87 | 0.179 | 0.046 |
| 　LLM Trust: Rely Without Reading | 3.94 (1.20) | 4.21 (1.77) | 0.29 | 0.592 | 0.007 |
| 　LLM Trust: Assume Clear Is Accurate | 3.88 (1.50) | 4.00 (1.84) | 0.05 | 0.829 | 0.001 |
| 　LLM Trust: Confident Without Details | 3.76 (1.39) | 4.00 (2.00) | 0.17 | 0.678 | 0.004 |
| 　LLM Trust: Rely For Importance | 3.00 (1.54) | 3.12 (1.70) | 0.06 | 0.811 | 0.001 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| LLM Trust: Total Composite (avg of 10 items) | 4.27 (0.99) | 4.48 (1.55) | 0.25 | 0.621 | 0.006 |

### Post-Task

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Post-Task: Implementation Likelihood | 4.29 (1.49) | 5.12 (1.45) | 3.18 | 0.082† | 0.075 |
| Post-Task: New Strategy Confidence | 5.12 (1.22) | 5.25 (1.19) | 0.12 | 0.730 | 0.003 |

### Reading Behavior

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Reading: Total Duration (ms) | 1628690.41 (3745641.34) | 1562090.08 (2433925.23) | 0.00 | 0.945 | 0.000 |
| Chat: Query Count | 3.12 (1.62) | 4.29 (3.37) | 1.77 | 0.191 | 0.043 |
