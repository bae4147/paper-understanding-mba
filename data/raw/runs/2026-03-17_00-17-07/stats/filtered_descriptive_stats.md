# 기술통계 보고서 (Descriptive Statistics Report)

- **생성일시**: 2026-03-17T04:18:35.933Z
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
| 총 참가자 | 138명 |
| 총 세션 | 138개 |
| 완료 세션 | 138개 (100%) |

## 참가자 통계

### 조건별 배정

| 조건 | 참가자 수 | 완료 | 완료율 |
|------|----------|------|-------|
| Control | 65명 | 65명 | 100% |
| EBM-CIMO | 73명 | 73명 | 100% |

### 클래스별 분포

| 클래스 | 참가자 수 |
|--------|----------|
| mba6202_tue | 45명 |
| mba6202_wed | 44명 |
| honda | 25명 |
| mba6202_sat | 23명 |
| busoba7399 | 1명 |

## 세션 통계

### 상태별 분포

| 상태 | 개수 |
|------|------|
| complete | 138개 |

## 읽기 행동 통계

### 전체

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 총 소요 시간 (분) | 16.54 | 42.28 | 0.03 | 373.61 | 7.64 | 138 |
| 읽기 시간 (분) | 3.96 | 16.91 | 0 | 194.8 | 0.9 | 138 |
| 채팅 시간 (분) | 3.91 | 10.24 | 0 | 98.58 | 1.23 | 138 |

### 조건별 비교

| 지표 | Control M(SD) | EBM-CIMO M(SD) |
|------|---------------|----------------|
| 총 소요 시간 (분) | 12.96 (33.37) | 19.74 (48.65) |
| 읽기 시간 (분) | 1.9 (2.78) | 5.8 (22.95) |
| 채팅 시간 (분) | 1.99 (3.04) | 5.62 (13.55) |

### 리소스 사용 (focusTime >= 5초)

| 리소스 | Control (n=65) | EBM-CIMO (n=73) |
|--------|----------|----------|
| Infographics | 35명 (53.8%) | 47명 (64.4%) |
| Video | 34명 (52.3%) | 45명 (61.6%) |
| Audio/Podcast | 35명 (53.8%) | 35명 (47.9%) |
| Chat (1회 이상) | 36명 (55.4%) | 48명 (65.8%) |

## LLM 사용 통계

- **총 메시지 수**: 214개

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 세션당 메시지 수 (전체) | 1.55 | 2.22 | 0 | 17 | 1 | 138 |
| ㄴ Control | 1.23 | 1.59 | 0 | 8 | 1 | 65 |
| ㄴ EBM-CIMO | 1.84 | 2.63 | 0 | 17 | 1 | 73 |
| 질문 길이 (문자) | 72.02 | 69.98 | 3 | 545 | 49.5 | 214 |
| 응답 시간 (초) | 10.76 | 6.19 | 2.46 | 35.37 | 9.24 | 214 |

**조건 비교 (One-way ANOVA)**

| 지표 | 높은 조건 | p-value |
|------|----------|--------|
| 세션당 메시지 수 | EBM-CIMO | 0.112 |

**Chat 대화 내역 보기**

> [Chat Viewer](https://bae4147.github.io/paper-understanding-mba/chat-viewer.html) - 참가자별 LLM 대화 내역을 확인할 수 있습니다.

## 설문 통계

> **분석 기법**: One-way ANOVA (두 조건 간 평균 비교)

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.08 (0.32) | 1.05 (0.23) | Control | 0.640 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1.03 (0.25) | 1.01 (0.12) | Control | 0.600 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 5.03 (1.28) | 5.29 (1.14) | EBM-CIMO | 0.217 | 1-7점 |
| 실행 가능성 | 4.65 (1.56) | 5.05 (1.4) | EBM-CIMO | 0.111 | 1-7점 |

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.71 (1.26) | 3.85 (1.17) | EBM-CIMO | 0.498 |
| physicalDemand | 1.63 (1.02) | 1.9 (1.12) | EBM-CIMO | 0.141 |
| temporalDemand | 2.32 (1.49) | 2.67 (1.61) | EBM-CIMO | 0.194 |
| effort | 4.11 (1.61) | 4.33 (1.39) | EBM-CIMO | 0.391 |
| frustration | 2.26 (1.42) | 2.62 (1.54) | EBM-CIMO | 0.166 |
| performance | 5.35 (1.04) | 5.62 (0.96) | EBM-CIMO | 0.129 |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.26 (1.35) | 5.11 (1.43) | Control | 0.526 | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 5.18 (1.31) | 5.23 (1.19) | EBM-CIMO | 0.822 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.68 (1.04) | 5.82 (0.88) | EBM-CIMO | 0.380 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 4.86 (1.42) | 4.93 (1.35) | EBM-CIMO | 0.769 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.49 (1.04) | 5.82 (0.82) | EBM-CIMO | 0.041 ✓ | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 5.74 (1.22) | 5.81 (0.9) | EBM-CIMO | 0.703 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.46 (1.16) | 5.42 (1.25) | Control | 0.859 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.31 (1.16) | 5.71 (0.88) | EBM-CIMO | 0.023 ✓ | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.72 (1.03) | 5.71 (0.85) | Control | 0.947 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 4.57 (1.51) | 4.79 (1.62) | EBM-CIMO | 0.405 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 5.66 (1.17) | 5.81 (1.03) | EBM-CIMO | 0.437 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 5.22 (1.23) | 5.47 (1.16) | EBM-CIMO | 0.225 | I explored my own ideas and interpretations related to the article. |
| questionClaims | 4.78 (1.6) | 4.79 (1.32) | EBM-CIMO | 0.969 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 4.32 (1.52) | 4.59 (1.57) | EBM-CIMO | 0.318 | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.54 (1.2) | 5.63 (1.1) | EBM-CIMO | 0.644 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 5.06 (1.35) | 5.11 (1.3) | EBM-CIMO | 0.833 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 5.48 (1.22) | 5.67 (1.14) | EBM-CIMO | 0.337 | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.29 (1.37) | 5.48 (1.12) | EBM-CIMO | 0.383 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 5.32 (1.33) | 5.53 (1.12) | EBM-CIMO | 0.317 | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5.2 (1.29) | 5.37 (1.3) | EBM-CIMO | 0.446 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### 외부 도구 사용

| 도구 | 사용자 수 | 비율 |
|------|----------|------|
| 외부 AI 도구 | 7/138명 | 5.1% |
| 외부 PDF 뷰어 | 20/138명 | 14.5% |

### LLM Trust

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| assumeClearIsAccurate | 4.02 (1.89) | 4.26 (1.72) | EBM-CIMO | 0.430 |  |
| relyForImportance | 3.11 (1.78) | 3.51 (1.71) | EBM-CIMO | 0.184 |  |
| relyWithoutReading | 4.31 (1.74) | 4.44 (1.5) | EBM-CIMO | 0.638 |  |
| competence | 5.31 (1.57) | 5.6 (1.37) | EBM-CIMO | 0.244 | Overall, the GenAI was competent and effective as a tool for assisting with reading. |
| comfortActing | 4.2 (1.72) | 4.26 (1.69) | EBM-CIMO | 0.837 | I have no reservations about acting on the information provided by the GenAI. |
| reliability | 4.25 (1.86) | 4.37 (1.67) | EBM-CIMO | 0.683 | I can always rely on the GenAI when understanding articles. |
| accuracy | 5.52 (1.45) | 5.63 (1.26) | EBM-CIMO | 0.645 | The information provided by the GenAI was accurate. |
| benevolence | 5.25 (1.61) | 5.23 (1.68) | Control | 0.963 | I believe the GenAI is made with my best interests in mind. |
| comfortUsing | 4.17 (1.76) | 4.4 (1.62) | EBM-CIMO | 0.433 | I have no hesitation in using the information provided by the GenAI. |
| confidentWithoutDetails | 3.95 (1.7) | 4.26 (1.76) | EBM-CIMO | 0.305 |  |

### LLM Usefulness

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| conceptHelp | 5.23 (1.68) | 5.66 (1.34) | EBM-CIMO | 0.102 | How helpful was the GenAI for understanding difficult concepts or terminology? |
| findingsHelp | 5.38 (1.65) | 5.75 (1.31) | EBM-CIMO | 0.150 | How helpful was the GenAI for understanding the research findings? |
| overall | 5.54 (1.72) | 5.81 (1.32) | EBM-CIMO | 0.304 | How useful was the GenAI for reading and understanding the article? |
| timeSaving | 5.72 (1.78) | 5.95 (1.51) | EBM-CIMO | 0.432 | How helpful was the GenAI for saving your time? |
| practicalHelp | 5.08 (1.75) | 5.51 (1.38) | EBM-CIMO | 0.112 | How helpful was the GenAI for understanding practical applications? |

### Resource Helpfulness

| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|--------|---------------|----------------|----------|--------|
| chatbot | 4.37 (2.47) | 4.55 (2.34) | EBM-CIMO | 0.665 |
| infographic | 4.48 (2.44) | 4.71 (2.33) | EBM-CIMO | 0.567 |
| podcast | 3.86 (2.79) | 3.55 (2.6) | Control | 0.499 |
| video | 4.14 (2.64) | 4.56 (2.35) | EBM-CIMO | 0.324 |

---

## Chat 사용자 대상 분석 (Chat 1회 이상 사용)

> 아래 분석은 Chat을 1회 이상 사용한 참가자만을 대상으로 합니다.

### 표본 크기

| 구분 | 인원 |
|------|------|
| 전체 | 84명 |
| Control | 36명 |
| EBM-CIMO | 48명 |

### LLM 사용 통계

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| 메시지 수 | 2.22 (1.53) | 2.79 (2.81) | EBM-CIMO | 0.280 |

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.06 (0.33) | 1.02 (0.14) | Control | 0.520 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1 (0) | 1 (0) | 동일 | 1.000 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 4.78 (1.4) | 5.27 (1.08) | EBM-CIMO | 0.075 | 1-7점 |
| 실행 가능성 | 4.28 (1.5) | 5.08 (1.4) | EBM-CIMO | 0.014 ✓ | 1-7점 |

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.69 (1.24) | 3.83 (1.14) | EBM-CIMO | 0.601 |
| physicalDemand | 1.58 (0.79) | 1.83 (1.07) | EBM-CIMO | 0.247 |
| temporalDemand | 2.31 (1.37) | 2.69 (1.65) | EBM-CIMO | 0.268 |
| effort | 4.53 (1.48) | 4.38 (1.42) | Control | 0.638 |
| frustration | 2.39 (1.23) | 2.48 (1.47) | EBM-CIMO | 0.769 |
| performance | 5.17 (1.12) | 5.65 (0.95) | EBM-CIMO | 0.039 ✓ |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.14 (1.34) | 5.1 (1.46) | Control | 0.912 | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 4.83 (1.44) | 5.25 (1.27) | EBM-CIMO | 0.169 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.5 (1.14) | 5.88 (0.86) | EBM-CIMO | 0.093 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 4.53 (1.48) | 4.96 (1.34) | EBM-CIMO | 0.172 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.39 (1.09) | 5.75 (0.85) | EBM-CIMO | 0.096 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 5.64 (1.32) | 5.81 (0.97) | EBM-CIMO | 0.494 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.22 (1.27) | 5.48 (1.19) | EBM-CIMO | 0.350 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.06 (1.22) | 5.65 (0.9) | EBM-CIMO | 0.014 ✓ | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.58 (1.06) | 5.75 (0.8) | EBM-CIMO | 0.421 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 4.25 (1.38) | 4.77 (1.71) | EBM-CIMO | 0.143 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 5.5 (1.3) | 5.73 (1.08) | EBM-CIMO | 0.386 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 4.89 (1.31) | 5.56 (1.08) | EBM-CIMO | 0.013 ✓ | I explored my own ideas and interpretations related to the article. |
| questionClaims | 4.36 (1.65) | 4.85 (1.27) | EBM-CIMO | 0.131 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 3.78 (1.47) | 4.71 (1.63) | EBM-CIMO | 0.009 ✓ | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.28 (1.35) | 5.75 (1.11) | EBM-CIMO | 0.086 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 4.83 (1.3) | 5.19 (1.38) | EBM-CIMO | 0.242 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 5.22 (1.27) | 5.67 (1.2) | EBM-CIMO | 0.109 | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.03 (1.42) | 5.54 (1.19) | EBM-CIMO | 0.079 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 5.03 (1.36) | 5.6 (1.13) | EBM-CIMO | 0.040 ✓ | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 4.94 (1.37) | 5.4 (1.35) | EBM-CIMO | 0.141 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### LLM Trust

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| assumeClearIsAccurate | 4.06 (1.76) | 4.15 (1.74) | EBM-CIMO | 0.818 |  |
| relyForImportance | 3.03 (1.61) | 3.46 (1.84) | EBM-CIMO | 0.271 |  |
| relyWithoutReading | 4.42 (1.57) | 4.48 (1.58) | EBM-CIMO | 0.859 |  |
| competence | 5.61 (1.3) | 5.6 (1.38) | Control | 0.982 | Overall, the GenAI was competent and effective as a tool for assisting with reading. |
| comfortActing | 4.28 (1.57) | 4.31 (1.78) | EBM-CIMO | 0.927 | I have no reservations about acting on the information provided by the GenAI. |
| reliability | 4.14 (1.83) | 4.31 (1.78) | EBM-CIMO | 0.667 | I can always rely on the GenAI when understanding articles. |
| accuracy | 5.67 (1.27) | 5.6 (1.24) | Control | 0.823 | The information provided by the GenAI was accurate. |
| benevolence | 5.44 (1.38) | 5.25 (1.68) | Control | 0.578 | I believe the GenAI is made with my best interests in mind. |
| comfortUsing | 4.17 (1.72) | 4.44 (1.66) | EBM-CIMO | 0.474 | I have no hesitation in using the information provided by the GenAI. |
| confidentWithoutDetails | 3.92 (1.55) | 4.08 (1.81) | EBM-CIMO | 0.663 |  |

### LLM Usefulness

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| conceptHelp | 5.33 (1.43) | 5.69 (1.28) | EBM-CIMO | 0.242 | How helpful was the GenAI for understanding difficult concepts or terminology? |
| findingsHelp | 5.42 (1.46) | 5.77 (1.18) | EBM-CIMO | 0.228 | How helpful was the GenAI for understanding the research findings? |
| overall | 5.61 (1.48) | 5.81 (1.22) | EBM-CIMO | 0.501 | How useful was the GenAI for reading and understanding the article? |
| timeSaving | 5.83 (1.59) | 5.94 (1.45) | EBM-CIMO | 0.758 | How helpful was the GenAI for saving your time? |
| practicalHelp | 5.08 (1.53) | 5.58 (1.27) | EBM-CIMO | 0.111 | How helpful was the GenAI for understanding practical applications? |

### Resource Helpfulness

| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|--------|---------------|----------------|----------|--------|
| chatbot | 5.19 (1.81) | 5.31 (1.69) | EBM-CIMO | 0.762 |
| infographic | 4.5 (2.47) | 4.25 (2.43) | Control | 0.648 |
| podcast | 3.53 (2.77) | 3.27 (2.46) | Control | 0.659 |
| video | 3.83 (2.6) | 4.27 (2.37) | EBM-CIMO | 0.430 |

## 클래스별 통계

| 클래스 | 참가자 | Control | EBM-CIMO | 세션 | 완료 | 완료율 |
|--------|--------|---------|----------|------|------|--------|
| mba6202_tue | 45명 | 20명 | 25명 | 45개 | 45개 | 100% |
| mba6202_wed | 44명 | 23명 | 21명 | 44개 | 44개 | 100% |
| honda | 25명 | 12명 | 13명 | 25개 | 25개 | 100% |
| mba6202_sat | 23명 | 9명 | 14명 | 23개 | 23개 | 100% |
| busoba7399 | 1명 | 1명 | 0명 | 1개 | 1개 | 100% |

## 참가자 피드백 (49명)

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

---

> 상세 데이터는 `descriptive_stats.json` 파일을 참조하세요.
