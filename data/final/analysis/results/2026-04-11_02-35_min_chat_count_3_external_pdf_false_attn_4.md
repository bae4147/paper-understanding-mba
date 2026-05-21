# Analysis Results — min_chat_count_3_external_pdf_false_attn_4

**Generated:** 2026-04-11 02:35  
**Data:** `data/final-dataset/sessions_preprocessed.csv`

---

## Filters Applied

- 전처리 전 세션 수: 143
- `exclude_external_ai (externalAi_used != no)`: 7명 제외
- `min_chat_count >= 3`: 103명 제외
- `min_attn_focus >= 4`: 3명 제외
- `require_attn_check_pass (stronglyDisagreeCheck == 1)`: 2명 제외
- **최종 분석 대상: 28명** (control: 10, ebm_cimo: 18)

---

## Descriptive Statistics

### Participants

| | control (n=10) | ebm_cimo (n=18) | total (n=28) |
|--|--|--|--|
| Class distribution | busoba7399: 1, honda: 1, mba6202_sat: 2, mba6202_tue: 2, mba6202_wed: 4 | busoba7399: 1, honda: 2, mba6202_sat: 4, mba6202_tue: 7, mba6202_wed: 4 | busoba7399: 2, honda: 3, mba6202_sat: 6, mba6202_tue: 9, mba6202_wed: 8 |

### Media Usage (complete sessions 기준)

| | control | ebm_cimo |
|--|--|--|
| Chat 사용 (≥1 turn) | 10/10 (100.0%) | 18/18 (100.0%) |
| Audio 사용 | 10/10 (100.0%) | 18/18 (100.0%) |
| Video 사용 | 10/10 (100.0%) | 17/18 (94.4%) |
| Infographics 사용 | 10/10 (100.0%) | 18/18 (100.0%) |

---

## ANOVA Results

`*` p<.05, `**` p<.01, `***` p<.001, `†` p<.10

### Self-Efficacy

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| **<u>　Self-Efficacy: Overall Comprehension (avg)</u>** | **<u>4.84 (0.81)</u>** | **<u>5.60 (0.75)</u>** | **<u>6.16</u>** | **<u>0.020*</u>** | **<u>0.192</u>** |
| **<u>　Self-Efficacy: Critical Engagement (avg)</u>** | **<u>4.58 (0.86)</u>** | **<u>5.62 (0.77)</u>** | **<u>10.84</u>** | **<u>0.003**</u>** | **<u>0.294</u>** |
| 　Self-Efficacy: Applicability (avg) | 4.93 (0.58) | 5.48 (1.13) | 2.01 | 0.168 | 0.072 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| **<u>Self-Efficacy: Total Composite (avg of all 20 items)</u>** | **<u>4.80 (0.62)</u>** | **<u>5.57 (0.78)</u>** | **<u>7.07</u>** | **<u>0.013*</u>** | **<u>0.214</u>** |

### NASA-TLX

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| NASA-TLX: Mental Demand | 3.80 (1.23) | 3.89 (1.08) | 0.04 | 0.844 | 0.002 |
| NASA-TLX: Physical Demand | 1.40 (0.52) | 1.72 (1.07) | 0.79 | 0.383 | 0.029 |
| NASA-TLX: Temporal Demand | 2.60 (0.84) | 3.06 (2.01) | 0.46 | 0.503 | 0.017 |
| **<u>NASA-TLX: Performance</u>** | **<u>5.10 (0.88)</u>** | **<u>5.89 (0.76)</u>** | **<u>6.24</u>** | **<u>0.019*</u>** | **<u>0.193</u>** |
| NASA-TLX: Effort | 4.10 (1.20) | 4.72 (1.41) | 1.39 | 0.249 | 0.051 |
| NASA-TLX: Frustration | 2.70 (1.06) | 2.33 (1.53) | 0.45 | 0.509 | 0.017 |

### LLM Usefulness

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　LLM Usefulness: Overall | 4.90 (0.99) | 5.89 (1.49) | 3.50 | 0.073† | 0.119 |
| 　LLM Usefulness: Concept Help | 4.90 (0.99) | 5.72 (1.56) | 2.24 | 0.147 | 0.079 |
| 　LLM Usefulness: Findings Help | 4.90 (0.99) | 5.94 (1.43) | 4.16 | 0.052† | 0.138 |
| 　LLM Usefulness: Practical Help | 4.60 (1.35) | 5.78 (1.63) | 3.77 | 0.063† | 0.127 |
| 　LLM Usefulness: Time Saving | 5.30 (1.77) | 5.83 (1.65) | 0.64 | 0.432 | 0.024 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| LLM Usefulness: Total Composite (avg of 5 items) | 4.92 (0.89) | 5.83 (1.35) | 3.65 | 0.067† | 0.123 |

### LLM Trust

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　LLM Trust: Competence | 5.10 (0.99) | 5.56 (1.82) | 0.53 | 0.473 | 0.020 |
| 　LLM Trust: Accuracy | 5.40 (0.70) | 5.44 (1.65) | 0.01 | 0.936 | 0.000 |
| 　LLM Trust: Benevolence | 5.10 (1.10) | 5.17 (1.89) | 0.01 | 0.920 | 0.000 |
| 　LLM Trust: Reliability | 3.10 (1.10) | 4.22 (2.21) | 2.24 | 0.147 | 0.079 |
| 　LLM Trust: Comfort Acting | 3.50 (1.51) | 4.22 (1.99) | 1.00 | 0.328 | 0.037 |
| 　LLM Trust: Comfort Using | 3.10 (1.37) | 4.22 (1.80) | 2.92 | 0.099† | 0.101 |
| 　LLM Trust: Rely Without Reading | 3.50 (1.18) | 4.11 (1.81) | 0.91 | 0.348 | 0.034 |
| 　LLM Trust: Assume Clear Is Accurate | 3.60 (1.43) | 3.78 (1.83) | 0.07 | 0.793 | 0.003 |
| 　LLM Trust: Confident Without Details | 3.60 (1.35) | 3.67 (2.03) | 0.01 | 0.927 | 0.000 |
| 　LLM Trust: Rely For Importance | 2.70 (1.42) | 3.06 (1.80) | 0.29 | 0.595 | 0.011 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| LLM Trust: Total Composite (avg of 10 items) | 3.87 (0.81) | 4.34 (1.64) | 0.73 | 0.400 | 0.027 |

### Post-Task

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| **<u>Post-Task: Implementation Likelihood</u>** | **<u>4.00 (1.41)</u>** | **<u>5.28 (1.49)</u>** | **<u>4.91</u>** | **<u>0.036*</u>** | **<u>0.159</u>** |
| Post-Task: New Strategy Confidence | 5.10 (1.20) | 5.22 (1.00) | 0.08 | 0.775 | 0.003 |

### Reading Behavior

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Reading: Total Duration (ms) | 822806.00 (326696.59) | 1728776.94 (2781128.04) | 1.04 | 0.318 | 0.038 |
| Chat: Query Count | 3.90 (1.73) | 5.06 (3.59) | 0.91 | 0.349 | 0.034 |
