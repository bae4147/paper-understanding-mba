# Analysis Results — min_chat_count_3_external_pdf_false

**Generated:** 2026-04-11 02:34  
**Data:** `data/final-dataset/sessions_preprocessed.csv`

---

## Filters Applied

- 전처리 전 세션 수: 143
- `exclude_external_ai (externalAi_used != no)`: 7명 제외
- `min_chat_count >= 3`: 103명 제외
- `min_attn_focus >= 3`: 1명 제외
- `require_attn_check_pass (stronglyDisagreeCheck == 1)`: 2명 제외
- **최종 분석 대상: 30명** (control: 11, ebm_cimo: 19)

---

## Descriptive Statistics

### Participants

| | control (n=11) | ebm_cimo (n=19) | total (n=30) |
|--|--|--|--|
| Class distribution | busoba7399: 1, honda: 1, mba6202_sat: 2, mba6202_tue: 2, mba6202_wed: 5 | busoba7399: 1, honda: 2, mba6202_sat: 4, mba6202_tue: 7, mba6202_wed: 5 | busoba7399: 2, honda: 3, mba6202_sat: 6, mba6202_tue: 9, mba6202_wed: 10 |

### Media Usage (complete sessions 기준)

| | control | ebm_cimo |
|--|--|--|
| Chat 사용 (≥1 turn) | 11/11 (100.0%) | 19/19 (100.0%) |
| Audio 사용 | 11/11 (100.0%) | 19/19 (100.0%) |
| Video 사용 | 11/11 (100.0%) | 18/19 (94.7%) |
| Infographics 사용 | 11/11 (100.0%) | 19/19 (100.0%) |

---

## ANOVA Results

`*` p<.05, `**` p<.01, `***` p<.001, `†` p<.10

### Self-Efficacy

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| **<u>　Self-Efficacy: Overall Comprehension (avg)</u>** | **<u>4.75 (0.84)</u>** | **<u>5.59 (0.73)</u>** | **<u>8.41</u>** | **<u>0.007**</u>** | **<u>0.231</u>** |
| **<u>　Self-Efficacy: Critical Engagement (avg)</u>** | **<u>4.56 (0.81)</u>** | **<u>5.49 (0.93)</u>** | **<u>7.57</u>** | **<u>0.010*</u>** | **<u>0.213</u>** |
| 　Self-Efficacy: Applicability (avg) | 4.86 (0.60) | 5.48 (1.10) | 2.93 | 0.098† | 0.095 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| **<u>Self-Efficacy: Total Composite (avg of all 20 items)</u>** | **<u>4.74 (0.63)</u>** | **<u>5.53 (0.77)</u>** | **<u>8.42</u>** | **<u>0.007**</u>** | **<u>0.231</u>** |

### NASA-TLX

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| NASA-TLX: Mental Demand | 3.91 (1.22) | 3.95 (1.08) | 0.01 | 0.929 | 0.000 |
| NASA-TLX: Physical Demand | 1.45 (0.52) | 1.68 (1.06) | 0.45 | 0.508 | 0.016 |
| NASA-TLX: Temporal Demand | 2.73 (0.90) | 3.00 (1.97) | 0.19 | 0.670 | 0.007 |
| **<u>NASA-TLX: Performance</u>** | **<u>4.91 (1.04)</u>** | **<u>5.89 (0.74)</u>** | **<u>9.16</u>** | **<u>0.005**</u>** | **<u>0.246</u>** |
| NASA-TLX: Effort | 4.09 (1.14) | 4.68 (1.38) | 1.46 | 0.237 | 0.050 |
| NASA-TLX: Frustration | 2.82 (1.08) | 2.32 (1.49) | 0.95 | 0.338 | 0.033 |

### LLM Usefulness

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| **<u>　LLM Usefulness: Overall</u>** | **<u>4.91 (0.94)</u>** | **<u>5.95 (1.47)</u>** | **<u>4.39</u>** | **<u>0.045*</u>** | **<u>0.136</u>** |
| 　LLM Usefulness: Concept Help | 4.91 (0.94) | 5.79 (1.55) | 2.90 | 0.099† | 0.094 |
| **<u>　LLM Usefulness: Findings Help</u>** | **<u>4.91 (0.94)</u>** | **<u>6.00 (1.41)</u>** | **<u>5.17</u>** | **<u>0.031*</u>** | **<u>0.156</u>** |
| **<u>　LLM Usefulness: Practical Help</u>** | **<u>4.64 (1.29)</u>** | **<u>5.84 (1.61)</u>** | **<u>4.50</u>** | **<u>0.043*</u>** | **<u>0.138</u>** |
| 　LLM Usefulness: Time Saving | 5.36 (1.69) | 5.89 (1.63) | 0.72 | 0.403 | 0.025 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| **<u>LLM Usefulness: Total Composite (avg of 5 items)</u>** | **<u>4.95 (0.84)</u>** | **<u>5.89 (1.34)</u>** | **<u>4.44</u>** | **<u>0.044*</u>** | **<u>0.137</u>** |

### LLM Trust

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| 　LLM Trust: Competence | 5.00 (1.00) | 5.63 (1.80) | 1.14 | 0.295 | 0.039 |
| 　LLM Trust: Accuracy | 5.27 (0.79) | 5.53 (1.65) | 0.23 | 0.636 | 0.008 |
| 　LLM Trust: Benevolence | 5.00 (1.10) | 5.26 (1.88) | 0.18 | 0.676 | 0.006 |
| 　LLM Trust: Reliability | 3.00 (1.10) | 4.26 (2.16) | 3.25 | 0.082† | 0.104 |
| 　LLM Trust: Comfort Acting | 3.45 (1.44) | 4.11 (2.00) | 0.89 | 0.353 | 0.031 |
| 　LLM Trust: Comfort Using | 3.09 (1.30) | 4.21 (1.75) | 3.39 | 0.076† | 0.108 |
| 　LLM Trust: Rely Without Reading | 3.64 (1.21) | 4.11 (1.76) | 0.61 | 0.441 | 0.021 |
| 　LLM Trust: Assume Clear Is Accurate | 3.45 (1.44) | 3.89 (1.85) | 0.46 | 0.504 | 0.016 |
| 　LLM Trust: Confident Without Details | 3.55 (1.29) | 3.79 (2.04) | 0.13 | 0.725 | 0.004 |
| 　LLM Trust: Rely For Importance | 2.73 (1.35) | 3.11 (1.76) | 0.38 | 0.544 | 0.013 |
| **──** | **──** | **──** | **──** | **──** | **──** |
| LLM Trust: Total Composite (avg of 10 items) | 3.82 (0.78) | 4.39 (1.60) | 1.21 | 0.280 | 0.042 |

### Post-Task

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| **<u>Post-Task: Implementation Likelihood</u>** | **<u>4.09 (1.38)</u>** | **<u>5.32 (1.45)</u>** | **<u>5.13</u>** | **<u>0.031*</u>** | **<u>0.155</u>** |
| Post-Task: New Strategy Confidence | 5.00 (1.18) | 5.26 (0.99) | 0.43 | 0.519 | 0.015 |

### Reading Behavior

| Dependent Variable | control M (SD) | ebm_cimo M (SD) | F | p | η² |
|--|--|--|--|--|--|
| Reading: Total Duration (ms) | 768814.91 (357942.75) | 1704559.00 (2704831.38) | 1.28 | 0.267 | 0.044 |
| Chat: Query Count | 3.91 (1.64) | 4.95 (3.52) | 0.84 | 0.367 | 0.029 |
