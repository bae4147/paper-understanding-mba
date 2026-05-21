# Analysis Results — reading_5min_min_chat_count_3

**Generated:** 2026-04-24 14:03  
**Data:** `data/final-dataset/sessions_preprocessed.csv`

---

## Filters Applied

- 전처리 전 세션 수: 143
- `exclude_external_ai (externalAi_used != no)`: 7명 제외
- `exclude_external_pdf (externalPdf_used != no)`: 21명 제외
- `min_reading_time_ms >= 300000`: 40명 제외
- `min_chat_count >= 3`: 53명 제외
- `min_attn_focus >= 3`: 0명 제외
- `require_attn_check_pass (stronglyDisagreeCheck == 1)`: 1명 제외
- **최종 분석 대상: 21명** (control: 8, ebm_cimo: 13)

---

## Descriptive Statistics

### Participants

| | control (n=8) | ebm_cimo (n=13) | total (n=21) |
|--|--|--|--|
| Class distribution | busoba7399: 1, honda: 1, mba6202_sat: 1, mba6202_tue: 1, mba6202_wed: 4 | honda: 2, mba6202_sat: 2, mba6202_tue: 5, mba6202_wed: 4 | busoba7399: 1, honda: 3, mba6202_sat: 3, mba6202_tue: 6, mba6202_wed: 8 |

### Media Usage (complete sessions 기준)

| | control | ebm_cimo |
|--|--|--|
| Chat 사용 (≥1 turn) | 8/8 (100.0%) | 13/13 (100.0%) |
| Audio 사용 | 8/8 (100.0%) | 13/13 (100.0%) |
| Video 사용 | 8/8 (100.0%) | 12/13 (92.3%) |
| Infographics 사용 | 8/8 (100.0%) | 13/13 (100.0%) |

---

## ANOVA Results

`*` p<.05, `**` p<.01, `***` p<.001, `†` p<.10

### Self-Efficacy

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| **<u>　Self-Efficacy: Overall Comprehension (avg)</u>** | **<u>4.67 (0.78)</u>** | **<u>5.41 (0.70)</u>** | **<u>5.10</u>** | **<u>0.036*</u>** | **<u>0.212</u>** |
| **<u>　Self-Efficacy: Critical Engagement (avg)</u>** | **<u>4.40 (0.64)</u>** | **<u>5.35 (0.97)</u>** | **<u>6.07</u>** | **<u>0.023*</u>** | **<u>0.242</u>** |
| 　Self-Efficacy: Applicability (avg) | 4.77 (0.49) | 5.14 (1.14) | 0.74 | 0.399 | 0.038 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| **<u>Total Composite (avg of all 20 items)</u>** | **<u>4.63 (0.47)</u>** | **<u>5.32 (0.78)</u>** | **<u>4.98</u>** | **<u>0.038*</u>** | **<u>0.208</u>** |

### NASA-TLX

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| NASA-TLX: Mental Demand | 3.62 (1.30) | 4.38 (0.87) | 2.59 | 0.124 | 0.120 |
| NASA-TLX: Physical Demand | 1.25 (0.46) | 1.77 (1.17) | 1.42 | 0.247 | 0.070 |
| NASA-TLX: Temporal Demand | 2.50 (0.76) | 3.69 (1.97) | 2.63 | 0.121 | 0.122 |
| NASA-TLX: Performance | 5.12 (0.83) | 5.77 (0.73) | 3.49 | 0.077† | 0.155 |
| NASA-TLX: Effort | 3.88 (1.25) | 4.69 (1.55) | 1.59 | 0.223 | 0.077 |
| NASA-TLX: Frustration | 2.38 (0.74) | 2.54 (1.71) | 0.06 | 0.803 | 0.003 |

### LLM Usefulness

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　LLM Usefulness: Overall | 4.88 (1.13) | 5.92 (1.50) | 2.89 | 0.106 | 0.132 |
| 　LLM Usefulness: Concept Help | 4.75 (1.04) | 5.69 (1.60) | 2.18 | 0.156 | 0.103 |
| 　LLM Usefulness: Findings Help | 5.00 (1.07) | 6.00 (1.15) | 3.92 | 0.062† | 0.171 |
| 　LLM Usefulness: Practical Help | 4.62 (1.51) | 5.38 (1.76) | 1.03 | 0.324 | 0.051 |
| 　LLM Usefulness: Time Saving | 5.75 (1.49) | 5.92 (1.75) | 0.05 | 0.819 | 0.003 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| Total Composite (avg of 5 items) | 5.00 (0.96) | 5.78 (1.42) | 1.89 | 0.185 | 0.090 |

### LLM Trust

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　LLM Trust: Competence | 5.12 (1.13) | 5.62 (1.80) | 0.47 | 0.500 | 0.024 |
| 　LLM Trust: Accuracy | 5.50 (0.53) | 5.38 (1.76) | 0.03 | 0.860 | 0.002 |
| 　LLM Trust: Benevolence | 4.88 (1.13) | 5.62 (1.76) | 1.12 | 0.303 | 0.056 |
| 　LLM Trust: Reliability | 3.25 (1.16) | 4.31 (2.10) | 1.69 | 0.209 | 0.082 |
| 　LLM Trust: Comfort Acting | 3.50 (1.69) | 4.00 (1.96) | 0.36 | 0.558 | 0.018 |
| 　LLM Trust: Comfort Using | 3.00 (1.51) | 4.08 (1.80) | 1.99 | 0.175 | 0.095 |
| 　LLM Trust: Rely Without Reading | 3.38 (1.19) | 4.00 (1.63) | 0.88 | 0.361 | 0.044 |
| 　LLM Trust: Assume Clear Is Accurate | 3.75 (1.58) | 4.00 (1.63) | 0.12 | 0.734 | 0.006 |
| 　LLM Trust: Confident Without Details | 3.62 (1.51) | 3.92 (1.89) | 0.14 | 0.710 | 0.007 |
| 　LLM Trust: Rely For Importance | 2.75 (1.58) | 3.23 (1.59) | 0.45 | 0.508 | 0.023 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| Total Composite (avg of 10 items) | 3.88 (0.90) | 4.42 (1.53) | 0.81 | 0.379 | 0.041 |

### Post-Task

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| **<u>Post-Task: Implementation Likelihood</u>** | **<u>4.00 (1.20)</u>** | **<u>5.46 (1.56)</u>** | **<u>5.12</u>** | **<u>0.036*</u>** | **<u>0.212</u>** |
| Post-Task: New Strategy Confidence | 4.75 (1.04) | 5.31 (0.95) | 1.60 | 0.221 | 0.078 |

### Reading Behavior

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Reading: Total Duration (ms) | 725629.62 (219487.51) | 2143803.77 (3168548.71) | 1.57 | 0.226 | 0.076 |
| Chat: Query Count | 3.50 (1.07) | 4.38 (2.18) | 1.13 | 0.301 | 0.056 |
