# 기술통계 보고서 (Descriptive Statistics Report)

- **생성일시**: 2026-03-31T06:23:21.507Z
- **실험 시작**: 2026-01-20T19:00:00.000Z

## 목차

1. [요약](#요약)
2. [참가자 통계](#참가자-통계)
3. [세션 통계](#세션-통계)
4. [읽기 행동 통계](#읽기-행동-통계)
5. [LLM 사용 통계](#llm-사용-통계)
6. [설문 통계](#설문-통계)
   - [Post Task](#post-task)
   - [NASA-TLX](#nasa-tlx-1-7점)
   - [Self-Efficacy](#self-efficacy-1-7점)
   - [LLM Trust](#llm-trust)
   - [LLM Usefulness](#llm-usefulness)
   - [Resource Helpfulness](#resource-helpfulness)
7. [Chat 사용자 대상 분석](#chat-사용자-대상-분석-chat-1회-이상-사용)
   - [Post Task](#post-task-1)
   - [NASA-TLX](#nasa-tlx-1-7점-1)
   - [Self-Efficacy](#self-efficacy-1-7점-1)
   - [LLM Trust](#llm-trust-1)
   - [LLM Usefulness](#llm-usefulness-1)
   - [Resource Helpfulness](#resource-helpfulness-1)
8. [클래스별 통계](#클래스별-통계)
9. [참가자 피드백](#참가자-피드백)

## 요약

| 항목 | 값 |
|------|----|
| 총 참가자 | 143명 |
| 총 세션 | 143개 |
| 완료 세션 | 143개 (100%) |

## 참가자 통계

### 조건별 배정

| 조건 | 참가자 수 | 완료 | 완료율 |
|------|----------|------|-------|
| Control | 68명 | 68명 | 100% |
| EBM-CIMO | 75명 | 75명 | 100% |

### 클래스별 분포

| 클래스 | 참가자 수 |
|--------|----------|
| mba6202_tue | 45명 |
| mba6202_wed | 44명 |
| honda | 25명 |
| mba6202_sat | 23명 |
| busoba7399 | 6명 |

## 세션 통계

### 상태별 분포

| 상태 | 개수 |
|------|------|
| complete | 143개 |

## 읽기 행동 통계

### 전체

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 총 소요 시간 (분) | 16.14 | 41.6 | 0.03 | 373.61 | 7.39 | 143 |
| 읽기 시간 (분) | 4.1 | 16.8 | 0 | 194.8 | 0.93 | 143 |
| 채팅 시간 (분) | 3.87 | 10.07 | 0 | 98.58 | 1.24 | 143 |

### 조건별 비교

| 지표 | Control M(SD) | EBM-CIMO M(SD) |
|------|---------------|----------------|
| 총 소요 시간 (분) | 12.71 (32.66) | 19.26 (48.08) |
| 읽기 시간 (분) | 1.88 (2.73) | 6.1 (22.87) |
| 채팅 시간 (분) | 2.08 (3.08) | 5.49 (13.39) |

### 리소스 사용 (focusTime >= 5초)

| 리소스 | Control (n=68) | EBM-CIMO (n=75) |
|--------|----------|----------|
| Infographics | 37명 (54.4%) | 48명 (64%) |
| Video | 36명 (52.9%) | 46명 (61.3%) |
| Audio/Podcast | 36명 (52.9%) | 35명 (46.7%) |
| Chat (1회 이상) | 37명 (54.4%) | 49명 (65.3%) |

## LLM 사용 통계

- **총 메시지 수**: 218개

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 세션당 메시지 수 (전체) | 1.52 | 2.2 | 0 | 17 | 1 | 143 |
| ㄴ Control | 1.19 | 1.56 | 0 | 8 | 1 | 68 |
| ㄴ EBM-CIMO | 1.83 | 2.61 | 0 | 17 | 1 | 75 |
| 질문 길이 (문자) | 71.54 | 69.46 | 3 | 545 | 49 | 218 |
| 응답 시간 (초) | 10.9 | 6.25 | 2.46 | 35.37 | 9.31 | 218 |

**조건 비교 (One-way ANOVA)**

| 지표 | 높은 조건 | p-value |
|------|----------|--------|
| 세션당 메시지 수 | EBM-CIMO | 0.086 |

**Chat 대화 내역 보기**

> [Chat Viewer](https://bae4147.github.io/paper-understanding-mba/chat-viewer.html) - 참가자별 LLM 대화 내역을 확인할 수 있습니다.

## 설문 통계

> **분석 기법**: One-way ANOVA (두 조건 간 평균 비교)

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.07 (0.31) | 1.07 (0.25) | Control | 0.885 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1.03 (0.24) | 1.03 (0.16) | Control | 0.936 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 5.07 (1.28) | 5.31 (1.13) | EBM-CIMO | 0.252 | 1-7점 |
| 실행 가능성 | 4.71 (1.56) | 5.03 (1.39) | EBM-CIMO | 0.200 | 1-7점 |

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.69 (1.29) | 3.87 (1.18) | EBM-CIMO | 0.400 |
| physicalDemand | 1.6 (1) | 1.95 (1.21) | EBM-CIMO | 0.070 |
| temporalDemand | 2.29 (1.47) | 2.67 (1.59) | EBM-CIMO | 0.151 |
| effort | 4.1 (1.64) | 4.37 (1.4) | EBM-CIMO | 0.293 |
| frustration | 2.26 (1.41) | 2.67 (1.6) | EBM-CIMO | 0.118 |
| performance | 5.37 (1.04) | 5.6 (0.95) | EBM-CIMO | 0.169 |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.25 (1.33) | 5.11 (1.42) | Control | 0.539 | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 5.24 (1.32) | 5.24 (1.18) | EBM-CIMO | 0.982 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.72 (1.04) | 5.83 (0.87) | EBM-CIMO | 0.511 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 4.76 (1.49) | 4.93 (1.33) | EBM-CIMO | 0.478 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.54 (1.05) | 5.81 (0.81) | EBM-CIMO | 0.089 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 5.76 (1.2) | 5.8 (0.89) | EBM-CIMO | 0.843 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.47 (1.17) | 5.44 (1.24) | Control | 0.880 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.35 (1.17) | 5.68 (0.9) | EBM-CIMO | 0.064 | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.74 (1.02) | 5.71 (0.84) | Control | 0.856 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 4.57 (1.54) | 4.76 (1.63) | EBM-CIMO | 0.487 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 5.6 (1.28) | 5.76 (1.07) | EBM-CIMO | 0.430 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 5.26 (1.24) | 5.47 (1.15) | EBM-CIMO | 0.318 | I explored my own ideas and interpretations related to the article. |
| questionClaims | 4.78 (1.62) | 4.76 (1.33) | Control | 0.938 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 4.31 (1.53) | 4.55 (1.58) | EBM-CIMO | 0.365 | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.57 (1.19) | 5.6 (1.11) | EBM-CIMO | 0.891 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 5.1 (1.34) | 5.09 (1.29) | Control | 0.966 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 5.49 (1.22) | 5.64 (1.16) | EBM-CIMO | 0.442 | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.34 (1.37) | 5.45 (1.12) | EBM-CIMO | 0.585 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 5.34 (1.32) | 5.49 (1.15) | EBM-CIMO | 0.458 | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5.19 (1.34) | 5.35 (1.31) | EBM-CIMO | 0.488 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### 외부 도구 사용

| 도구 | 사용자 수 | 비율 |
|------|----------|------|
| 외부 AI 도구 | 7/143명 | 4.9% |
| 외부 PDF 뷰어 | 22/143명 | 15.4% |

### LLM Trust

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| assumeClearIsAccurate | 4.06 (1.88) | 4.24 (1.7) | EBM-CIMO | 0.549 |  |
| relyForImportance | 3.13 (1.81) | 3.47 (1.71) | EBM-CIMO | 0.262 |  |
| relyWithoutReading | 4.37 (1.76) | 4.47 (1.49) | EBM-CIMO | 0.719 |  |
| competence | 5.29 (1.65) | 5.64 (1.37) | EBM-CIMO | 0.176 | Overall, the GenAI was competent and effective as a tool for assisting with reading. |
| comfortActing | 4.26 (1.73) | 4.24 (1.67) | Control | 0.931 | I have no reservations about acting on the information provided by the GenAI. |
| reliability | 4.28 (1.85) | 4.41 (1.67) | EBM-CIMO | 0.651 | I can always rely on the GenAI when understanding articles. |
| accuracy | 5.5 (1.54) | 5.64 (1.25) | EBM-CIMO | 0.553 | The information provided by the GenAI was accurate. |
| benevolence | 5.26 (1.6) | 5.23 (1.67) | Control | 0.890 | I believe the GenAI is made with my best interests in mind. |
| comfortUsing | 4.24 (1.79) | 4.4 (1.6) | EBM-CIMO | 0.565 | I have no hesitation in using the information provided by the GenAI. |
| confidentWithoutDetails | 4.04 (1.74) | 4.29 (1.75) | EBM-CIMO | 0.399 |  |

### LLM Usefulness

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| conceptHelp | 5.24 (1.72) | 5.69 (1.34) | EBM-CIMO | 0.078 | How helpful was the GenAI for understanding difficult concepts or terminology? |
| findingsHelp | 5.38 (1.69) | 5.77 (1.3) | EBM-CIMO | 0.124 | How helpful was the GenAI for understanding the research findings? |
| overall | 5.53 (1.75) | 5.84 (1.32) | EBM-CIMO | 0.234 | How useful was the GenAI for reading and understanding the article? |
| timeSaving | 5.69 (1.84) | 5.97 (1.5) | EBM-CIMO | 0.318 | How helpful was the GenAI for saving your time? |
| practicalHelp | 5.07 (1.77) | 5.53 (1.37) | EBM-CIMO | 0.085 | How helpful was the GenAI for understanding practical applications? |

### Resource Helpfulness

| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|--------|---------------|----------------|----------|--------|
| chatbot | 4.38 (2.51) | 4.52 (2.39) | EBM-CIMO | 0.739 |
| infographic | 4.5 (2.46) | 4.75 (2.31) | EBM-CIMO | 0.541 |
| podcast | 3.87 (2.78) | 3.53 (2.61) | Control | 0.463 |
| video | 4.13 (2.63) | 4.6 (2.33) | EBM-CIMO | 0.265 |

---

## Chat 사용자 대상 분석 (Chat 1회 이상 사용)

> 아래 분석은 Chat을 1회 이상 사용한 참가자만을 대상으로 합니다.

### 표본 크기

| 구분 | 인원 |
|------|------|
| 전체 | 86명 |
| Control | 37명 |
| EBM-CIMO | 49명 |

### LLM 사용 통계

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| 메시지 수 | 2.19 (1.52) | 2.8 (2.78) | EBM-CIMO | 0.239 |

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.05 (0.32) | 1.04 (0.2) | Control | 0.818 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1 (0) | 1.02 (0.14) | EBM-CIMO | 0.388 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 4.81 (1.39) | 5.29 (1.07) | EBM-CIMO | 0.081 | 1-7점 |
| 실행 가능성 | 4.32 (1.51) | 5.06 (1.39) | EBM-CIMO | 0.023 ✓ | 1-7점 |

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.7 (1.23) | 3.82 (1.14) | EBM-CIMO | 0.662 |
| physicalDemand | 1.57 (0.79) | 1.82 (1.06) | EBM-CIMO | 0.240 |
| temporalDemand | 2.3 (1.35) | 2.69 (1.63) | EBM-CIMO | 0.239 |
| effort | 4.57 (1.48) | 4.39 (1.41) | Control | 0.573 |
| frustration | 2.38 (1.22) | 2.47 (1.46) | EBM-CIMO | 0.762 |
| performance | 5.16 (1.1) | 5.63 (0.94) | EBM-CIMO | 0.038 ✓ |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.16 (1.33) | 5.12 (1.45) | Control | 0.898 | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 4.89 (1.47) | 5.27 (1.26) | EBM-CIMO | 0.213 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.54 (1.15) | 5.88 (0.85) | EBM-CIMO | 0.127 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 4.49 (1.48) | 4.96 (1.32) | EBM-CIMO | 0.128 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.43 (1.1) | 5.73 (0.85) | EBM-CIMO | 0.160 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 5.68 (1.32) | 5.82 (0.96) | EBM-CIMO | 0.573 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.24 (1.26) | 5.49 (1.18) | EBM-CIMO | 0.360 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.11 (1.25) | 5.61 (0.92) | EBM-CIMO | 0.036 ✓ | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.62 (1.07) | 5.76 (0.8) | EBM-CIMO | 0.515 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 4.32 (1.43) | 4.78 (1.69) | EBM-CIMO | 0.201 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 5.54 (1.31) | 5.71 (1.07) | EBM-CIMO | 0.505 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 4.95 (1.33) | 5.55 (1.07) | EBM-CIMO | 0.024 ✓ | I explored my own ideas and interpretations related to the article. |
| questionClaims | 4.41 (1.65) | 4.84 (1.27) | EBM-CIMO | 0.179 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 3.78 (1.45) | 4.69 (1.62) | EBM-CIMO | 0.009 ✓ | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.32 (1.36) | 5.73 (1.1) | EBM-CIMO | 0.130 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 4.89 (1.33) | 5.18 (1.37) | EBM-CIMO | 0.330 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 5.27 (1.29) | 5.67 (1.18) | EBM-CIMO | 0.141 | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.08 (1.44) | 5.53 (1.18) | EBM-CIMO | 0.120 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 5.08 (1.38) | 5.59 (1.12) | EBM-CIMO | 0.066 | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5 (1.39) | 5.41 (1.34) | EBM-CIMO | 0.178 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### LLM Trust

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| assumeClearIsAccurate | 4.11 (1.77) | 4.14 (1.73) | EBM-CIMO | 0.928 |  |
| relyForImportance | 3.14 (1.71) | 3.45 (1.82) | EBM-CIMO | 0.424 |  |
| relyWithoutReading | 4.49 (1.6) | 4.51 (1.58) | EBM-CIMO | 0.946 |  |
| competence | 5.65 (1.3) | 5.63 (1.38) | Control | 0.957 | Overall, the GenAI was competent and effective as a tool for assisting with reading. |
| comfortActing | 4.35 (1.61) | 4.31 (1.76) | Control | 0.904 | I have no reservations about acting on the information provided by the GenAI. |
| reliability | 4.22 (1.86) | 4.35 (1.78) | EBM-CIMO | 0.745 | I can always rely on the GenAI when understanding articles. |
| accuracy | 5.7 (1.27) | 5.63 (1.24) | Control | 0.800 | The information provided by the GenAI was accurate. |
| benevolence | 5.49 (1.39) | 5.22 (1.67) | Control | 0.447 | I believe the GenAI is made with my best interests in mind. |
| comfortUsing | 4.24 (1.76) | 4.43 (1.64) | EBM-CIMO | 0.621 | I have no hesitation in using the information provided by the GenAI. |
| confidentWithoutDetails | 4 (1.61) | 4.1 (1.8) | EBM-CIMO | 0.788 |  |

### LLM Usefulness

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| conceptHelp | 5.38 (1.44) | 5.71 (1.28) | EBM-CIMO | 0.262 | How helpful was the GenAI for understanding difficult concepts or terminology? |
| findingsHelp | 5.46 (1.46) | 5.8 (1.18) | EBM-CIMO | 0.246 | How helpful was the GenAI for understanding the research findings? |
| overall | 5.65 (1.47) | 5.84 (1.22) | EBM-CIMO | 0.524 | How useful was the GenAI for reading and understanding the article? |
| timeSaving | 5.86 (1.58) | 5.96 (1.44) | EBM-CIMO | 0.776 | How helpful was the GenAI for saving your time? |
| practicalHelp | 5.14 (1.55) | 5.61 (1.27) | EBM-CIMO | 0.125 | How helpful was the GenAI for understanding practical applications? |

### Resource Helpfulness

| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|--------|---------------|----------------|----------|--------|
| chatbot | 5.24 (1.81) | 5.35 (1.68) | EBM-CIMO | 0.787 |
| infographic | 4.57 (2.47) | 4.29 (2.42) | Control | 0.601 |
| podcast | 3.54 (2.74) | 3.33 (2.46) | Control | 0.708 |
| video | 3.84 (2.56) | 4.31 (2.36) | EBM-CIMO | 0.388 |

## 클래스별 통계

| 클래스 | 참가자 | Control | EBM-CIMO | 세션 | 완료 | 완료율 |
|--------|--------|---------|----------|------|------|--------|
| mba6202_tue | 45명 | 20명 | 25명 | 45개 | 45개 | 100% |
| mba6202_wed | 44명 | 23명 | 21명 | 44개 | 44개 | 100% |
| honda | 25명 | 12명 | 13명 | 25개 | 25개 | 100% |
| mba6202_sat | 23명 | 9명 | 14명 | 23개 | 23개 | 100% |
| busoba7399 | 6명 | 4명 | 2명 | 6개 | 6개 | 100% |

## 참가자 피드백 (51명)

### 1. ike.34@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_tue

> I like seeing the questions before starting an assignment so I can know what to look for and what to think about as I am reading the article. I wish I had picked a better article if what you wanted me to do was relate it to myself directly and not to a problem I want to resolve in my work place. I also am not sure what you mean when you want me to apply this to my work place. Realistically, no one at my job would pay e any attention. I am not high enough in leadership to effect real change. Do you mean to ask how I would effect these changes at work if I had the power to do so? I guess I am a little unclear if you want me to imagine what I can actually do or what I could potentially do. What I can actually do is quite small in the position I am in now, but what I could potentially do is as big as my imagination.

### 2. stalnaker.63@buckeyemail.osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_tue

> NA

### 3. petite.9@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> The AI chatbot gave some interesting and practical information that sounded reasonable, but the questions it was asking seemed to go beyond the scope of the paper.

### 4. murphy.1603@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> Good, what do we submit to carmen?

### 5. yoho.18@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_tue

> I enjoyed utilizing the AI capabilities to relay the information of the article.

### 6. perry.2589@buckeyemail.osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> This was actually kind of cool.

### 7. kelly.470@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> Other than the platform itself being a little clunky at times, I think this is an amazing resource, especially for myself being in the healthcare field. I would have loved to have access to this in the past and would look forward to having access to it in the future!

### 8. mally.9@buckeyemail.osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> N/A

### 9. erin_rinto@yahoo.com

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_tue

> I thought the article was relevant.  The journal has an IF of 10.55, which I thought indicated it was used to support the arguments contained and to support its conclusions. I think it is hard to generalize the two studies within the article, as they were surveys sent to the corporations, and the return rate was only 54%. I don't know if there is a better way to assess this, but I found the conclusions relevant and consistent with my professional experiences. The article states that the results were statistically significant, but I think to be used, the N needs to be much larger.

### 10. spatholt.4@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_tue

> Interesting assignment. I wonder if the chat bot was backed by a gemini api key? The infographic seemed reminiscent of NotebookLM and I noticed output structures that looked Gemini-familiar in the chat.

### 11. loudenslager.17@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_tue

> This tool was very cool to use, and made doing this assignment more interesting.

### 12. martinez.554@buckeyemail.osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> The chatbot was very conversational and seemed well built.

### 13. shank.189@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> I was a little unclear on the first few questions about the key differences between the article and my current situation.

### 14. blaine.83@buckeyemail.osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_tue

> This is a great resource to get high level information about a topic.

### 15. walsh.1042@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> I didn't use the GenAI tools, I clicked finished prematurely thinking it meant that I was finished uploading the article, hence all of the answers are 3's.

### 16. frank.827@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> I really liked the tool that disseminated the article into all those options. Is this something you built or is this readily available at all times? I went to bookmark it but it appeared specific to this assignment. It would be a really useful tool -- especially for efficiency.

### 17. westrick.37@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> I did not like that if you had to pause the video it would then restart and there was no ability to go back to where you left off.

### 18. westrick.48@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> Not being able to pause the video was frustrating.

### 19. moore.4091@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_tue

> Very useful tool!

### 20. fenstermacher.13@buckeyemail.osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> There is no feedback at this time.

### 21. calhoun.318@buckeyemail.osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_tue

> These instructions on using this platform should have been better explained upfront. I did not use any AI tools because I did not understand their purpose going into this assignment. The teacher's video should have explained that we are to evaluate the AI tool using our article.

### 22. montgomery.714@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_tue

> Some of the steps in the AI tool were a little unclear, the chatbot didn't seem very helpful but it might have also been related to the content of the article.

### 23. mcalhaney.1@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> I try to enter assignments and tasks with an open mind but I do struggle with the use of AI in these types of setting still. Specifically I'm considering the environmental and ethical implications of having the platform create content (a podcast, infographic, and video) all at once that I didn't necessarily want when I believe I could have gathered and analyzed the same information by reading the paper personally.

### 24. ijazi.1@buckeyemail.osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> If I knew in advance that I would be answering questions pertaining to the article, I would have paid more attention to the contents of the article and asked the chatbot more questions to clarify my understanding of the article

### 25. minerd.11@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> The podcast was the most effective tool in understanding this research study, and it made the information presented much more digestible.

### 26. enslen.4@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_tue

> I experienced significant technical challenges completing this task. I was unable to get my video to load for ~4 hours. I spent this time refreshing, trying different browsers, and eventually reaching out to the tech support referenced in the survey.

### 27. welkie.1@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> I was a little confused on what I was supposed to be using the AI chat for. I read the article and understood the content of the article, and I used the chat to ask general questions and applications to verify what I read myself.

### 28. maggie.murray@osumc.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> N/A, I loved it !

### 29. holzworth.19@buckeyemail.osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> The reason I put this was frustrating is each time I would go back or go forward within the github website it would delete my answers.  I had to retype my questions 3 times due to this and the restriction of using other applications whilst completing this.  This was very frustrating and for future uses it would be extremely helpful if this website would save my answers to avoid redoing them.  I do feel that each time the quality of my work decreased a bit as I was frustrated then immediately tried to remember what I had just typed.  I do like the fact we are using GenAI for the assignments, and I found the podcast and video extremely helpful.  Just frustrating having to retype my answers multiple times.

### 30. huang.2321@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_tue

> Very interesting assignment. I ended up selecting an article that was a review rather than primary literature which I hope is okay. It seemed to provide a good overview of the topic. 
> 
> I do wish that the video and podcast could be paused and sped up.

### 31. mulukutla.7@buckeyemail.osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> I was under the impression that the assignment needs to be completed by Wed whereas it was supposed to be finished this Monday EOD. I'll ensure I pay more attention to the submission dates going forward. One other thing, I did was reading thru the article first to understand (without using AI) before submitting the assignment and it took a considerable amount of time and effort to go back and forth between the pages.

### 32. esler.20@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> I was not sure exactly how detailed we needed to be in our responses on page 1. Based on the intro video, it did not seem we were tasked with reading the entire article in depth. So, I skimmed over sections and asked the AI tool random questions to see what it would show. The AI tool was generic and did not point to where it gathered the details or what section it got the answer from, so I was a bit wary of how accurate the information was. I also felt the answers from AI kept repeating and reworded it differently, not providing new details based on what it said earlier.

### 33. aiken.74@buckeyemail.osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_tue

> This was a fun assignment that taught practical skills

### 34. manuel.92@buckeyemail.osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> None.

### 35. klue.2@buckeyemail.osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> Honestly, pretty cool.

### 36. batman.10@buckeyemail.osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: honda

> My infographic and video were riddled with spelling errors. Chatbot made a number of mistakes answering my questions, then used poor evidence from the text to support itself when I challenged it.

### 37. lowery.274@buckeyemail.osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: honda

> I think this is a very useful tool and appreciate those who developed it!

### 38. alvin_nash@na.honda.com

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: honda

> AI has tendency to spell words incorrectly.

### 39. lucy_berg@na.honda.com

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: honda

> Love this tool!

### 40. dddagreat@yahoo.com

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: honda

> I found this fascinating and would love to see if there are other tools to help me make presentations

### 41. karthy.md@gmail.com

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: honda

> I really like this AI, and wondering if i am able to use this AI through IOS App store.

### 42. tjgalyon@gmail.com

ㄴ **조건**: Control
ㄴ **클래스**: honda

> The chatbot was useful though sometimes too vague.  The podcast generated by tool was only 16 seconds, and the infographic was about another subject entirely.  It also did not generate a video / the video was unavailable.  I responded to the above questions based on the usefulness of the chatbot, which I felt was a valuable tool.

### 43. whikehart.4@buckeyemail.osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_sat

> I thought this was really interesting! "Transformational Leadership" gets tossed around a lot at work and I didn't realize it was more of a formal idea. The article was really interesting and heavily referenced things I see failing at my place of work.

### 44. kusy.4@buckeyemail.osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_sat

> This was a very interesting tool. It was helpful seeing the information in various forms. I believe it would be beneficial to help different types of learning styles better understand the written article.

### 45. jolotozo@gmail.com

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_sat

> Interesting to see what this did. Although from understanding the assignment instructions, I thought sort of the point was just to see that it can create some AI content and be helpful, but I already know this is possible through notebook LM. I just picked authoritarian leadership because I thought that might be interesting and then I picked the first article I saw and it ended up being 37 pages so I didn't read the entire thing. I think I could've done better using other AI tools like notebook LM. So sorry! I think I just kind of missed the point of this thanks for sharing the AI tools.

### 46. karen.meyers@osumc.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_sat

> Very cool! It would have been helpful to know the post-reading questions prior to reading the article to answer them more accurately. I wasn't really sure what the intention of the exercise was at first.

### 47. harlan.96@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_sat

> Put a duration bar on the video - I want to know how long the video will be.

### 48. lucas.steele@osumc.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_sat

> Super cool resource. I found the infographic and video highly effective at reinforcing the overview of the article. The chatbot was nice for asking specific questions, but I relied on the video/infographic to summarize and felt they did a fantastic job.

### 49. ault.186@buckeyemail.osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: busoba7399

> It enlightened me as to the capabilities of AI to summarize content.

### 50. beattie.38@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: busoba7399

> The podcast, infographic and video had absolutely nothing to do with the article at all. It's like it referenced something else entirely. In general, I have more trust in GenAI than in this particular instance. I understood the article enough that I did use the chatbot

### 51. frost.379@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: busoba7399

> No

---

> 상세 데이터는 `descriptive_stats.json` 파일을 참조하세요.
