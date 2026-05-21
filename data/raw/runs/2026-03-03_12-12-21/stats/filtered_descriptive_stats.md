# 기술통계 보고서 (Descriptive Statistics Report)

- **생성일시**: 2026-03-03T17:14:05.604Z
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
| 총 참가자 | 113명 |
| 총 세션 | 113개 |
| 완료 세션 | 113개 (100%) |

## 참가자 통계

### 조건별 배정

| 조건 | 참가자 수 | 완료 | 완료율 |
|------|----------|------|-------|
| Control | 55명 | 55명 | 100% |
| EBM-CIMO | 58명 | 58명 | 100% |

### 클래스별 분포

| 클래스 | 참가자 수 |
|--------|----------|
| mba6202_tue | 45명 |
| mba6202_wed | 44명 |
| honda | 24명 |

## 세션 통계

### 상태별 분포

| 상태 | 개수 |
|------|------|
| complete | 113개 |

## 읽기 행동 통계

### 전체

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 총 소요 시간 (분) | 18.51 | 46.4 | 0.03 | 373.61 | 8.01 | 113 |
| 읽기 시간 (분) | 4.37 | 18.61 | 0 | 194.8 | 0.85 | 113 |
| 채팅 시간 (분) | 4.23 | 11.2 | 0 | 98.58 | 1.01 | 113 |

### 조건별 비교

| 지표 | Control M(SD) | EBM-CIMO M(SD) |
|------|---------------|----------------|
| 총 소요 시간 (분) | 13.77 (36.1) | 23.01 (54.01) |
| 읽기 시간 (분) | 1.92 (2.88) | 6.69 (25.61) |
| 채팅 시간 (분) | 1.83 (2.83) | 6.5 (15.04) |

### 리소스 사용 (focusTime >= 5초)

| 리소스 | Control (n=55) | EBM-CIMO (n=58) |
|--------|----------|----------|
| Infographics | 30명 (54.5%) | 38명 (65.5%) |
| Video | 29명 (52.7%) | 38명 (65.5%) |
| Audio/Podcast | 29명 (52.7%) | 29명 (50%) |
| Chat (1회 이상) | 29명 (52.7%) | 36명 (62.1%) |

## LLM 사용 통계

- **총 메시지 수**: 170개

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 세션당 메시지 수 (전체) | 1.5 | 2.37 | 0 | 17 | 1 | 113 |
| ㄴ Control | 1.18 | 1.64 | 0 | 8 | 1 | 55 |
| ㄴ EBM-CIMO | 1.81 | 2.86 | 0 | 17 | 1 | 58 |
| 질문 길이 (문자) | 76.14 | 75.37 | 3 | 545 | 50 | 170 |
| 응답 시간 (초) | 10.12 | 5.87 | 2.46 | 35.37 | 8.84 | 170 |

**조건 비교 (One-way ANOVA)**

| 지표 | 높은 조건 | p-value |
|------|----------|--------|
| 세션당 메시지 수 | EBM-CIMO | 0.162 |

**Chat 대화 내역 보기**

> [Chat Viewer](https://bae4147.github.io/paper-understanding-mba/chat-viewer.html) - 참가자별 LLM 대화 내역을 확인할 수 있습니다.

## 설문 통계

> **분석 기법**: One-way ANOVA (두 조건 간 평균 비교)

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.09 (0.34) | 1.05 (0.22) | Control | 0.476 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1.04 (0.27) | 1.02 (0.13) | Control | 0.630 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 5.11 (1.19) | 5.19 (1.18) | EBM-CIMO | 0.721 | 1-7점 |
| 실행 가능성 | 4.82 (1.55) | 5.03 (1.46) | EBM-CIMO | 0.451 | 1-7점 |

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.62 (1.27) | 3.91 (1.18) | EBM-CIMO | 0.206 |
| physicalDemand | 1.58 (0.89) | 1.95 (1.17) | EBM-CIMO | 0.066 |
| temporalDemand | 2.16 (1.39) | 2.67 (1.66) | EBM-CIMO | 0.084 |
| effort | 4.07 (1.61) | 4.31 (1.42) | EBM-CIMO | 0.409 |
| frustration | 2.22 (1.41) | 2.59 (1.52) | EBM-CIMO | 0.189 |
| performance | 5.47 (0.97) | 5.57 (0.93) | EBM-CIMO | 0.595 |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.47 (1.17) | 4.97 (1.43) | Control | 0.044 ✓ | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 5.29 (1.19) | 5.21 (1.19) | Control | 0.710 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.75 (0.99) | 5.81 (0.86) | EBM-CIMO | 0.714 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 5.02 (1.37) | 4.9 (1.35) | Control | 0.638 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.58 (1) | 5.79 (0.85) | EBM-CIMO | 0.232 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 5.8 (1.13) | 5.79 (0.8) | Control | 0.971 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.64 (0.96) | 5.29 (1.29) | Control | 0.116 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.38 (1.14) | 5.69 (0.91) | EBM-CIMO | 0.118 | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.78 (0.93) | 5.69 (0.89) | Control | 0.595 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 4.65 (1.49) | 4.78 (1.63) | EBM-CIMO | 0.684 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 5.69 (1.14) | 5.72 (1.06) | EBM-CIMO | 0.874 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 5.33 (1.19) | 5.34 (1.2) | EBM-CIMO | 0.938 | I explored my own ideas and interpretations related to the article. |
| questionClaims | 4.89 (1.56) | 4.74 (1.31) | Control | 0.584 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 4.38 (1.51) | 4.52 (1.6) | EBM-CIMO | 0.647 | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.6 (1.14) | 5.53 (1.02) | Control | 0.750 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 5.13 (1.32) | 5 (1.3) | Control | 0.610 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 5.47 (1.17) | 5.53 (1.13) | EBM-CIMO | 0.778 | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.33 (1.32) | 5.41 (1.05) | EBM-CIMO | 0.703 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 5.36 (1.27) | 5.4 (1.19) | EBM-CIMO | 0.888 | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5.31 (1.22) | 5.26 (1.28) | Control | 0.832 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### 외부 도구 사용

| 도구 | 사용자 수 | 비율 |
|------|----------|------|
| 외부 AI 도구 | 6/113명 | 5.3% |
| 외부 PDF 뷰어 | 18/113명 | 15.9% |

### LLM Trust

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| assumeClearIsAccurate | 4 (1.9) | 4.07 (1.65) | EBM-CIMO | 0.838 |  |
| relyForImportance | 3.05 (1.74) | 3.38 (1.58) | EBM-CIMO | 0.306 |  |
| relyWithoutReading | 4.18 (1.74) | 4.4 (1.51) | EBM-CIMO | 0.488 |  |
| competence | 5.15 (1.61) | 5.47 (1.29) | EBM-CIMO | 0.249 | Overall, the GenAI was competent and effective as a tool for assisting with reading. |
| comfortActing | 4.2 (1.68) | 4.02 (1.57) | Control | 0.554 | I have no reservations about acting on the information provided by the GenAI. |
| reliability | 4.18 (1.78) | 4.16 (1.6) | Control | 0.934 | I can always rely on the GenAI when understanding articles. |
| accuracy | 5.4 (1.51) | 5.53 (1.16) | EBM-CIMO | 0.599 | The information provided by the GenAI was accurate. |
| benevolence | 5.13 (1.66) | 5.03 (1.65) | Control | 0.769 | I believe the GenAI is made with my best interests in mind. |
| comfortUsing | 4.18 (1.71) | 4.22 (1.53) | EBM-CIMO | 0.891 | I have no hesitation in using the information provided by the GenAI. |
| confidentWithoutDetails | 3.85 (1.72) | 4.19 (1.74) | EBM-CIMO | 0.310 |  |

### LLM Usefulness

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| conceptHelp | 5.16 (1.71) | 5.6 (1.29) | EBM-CIMO | 0.128 | How helpful was the GenAI for understanding difficult concepts or terminology? |
| findingsHelp | 5.35 (1.65) | 5.72 (1.28) | EBM-CIMO | 0.179 | How helpful was the GenAI for understanding the research findings? |
| overall | 5.51 (1.76) | 5.74 (1.24) | EBM-CIMO | 0.421 | How useful was the GenAI for reading and understanding the article? |
| timeSaving | 5.73 (1.74) | 5.83 (1.53) | EBM-CIMO | 0.748 | How helpful was the GenAI for saving your time? |
| practicalHelp | 5.04 (1.69) | 5.43 (1.27) | EBM-CIMO | 0.167 | How helpful was the GenAI for understanding practical applications? |

### Resource Helpfulness

| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|--------|---------------|----------------|----------|--------|
| chatbot | 4.38 (2.42) | 4.34 (2.43) | Control | 0.936 |
| infographic | 4.62 (2.42) | 4.76 (2.26) | EBM-CIMO | 0.752 |
| podcast | 3.8 (2.78) | 3.57 (2.58) | Control | 0.651 |
| video | 4.18 (2.66) | 4.64 (2.29) | EBM-CIMO | 0.334 |

---

## Chat 사용자 대상 분석 (Chat 1회 이상 사용)

> 아래 분석은 Chat을 1회 이상 사용한 참가자만을 대상으로 합니다.

### 표본 크기

| 구분 | 인원 |
|------|------|
| 전체 | 65명 |
| Control | 29명 |
| EBM-CIMO | 36명 |

### LLM 사용 통계

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| 메시지 수 | 2.24 (1.65) | 2.92 (3.16) | EBM-CIMO | 0.309 |

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.07 (0.36) | 1.03 (0.16) | Control | 0.553 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1 (0) | 1 (0) | 동일 | 1.000 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 4.86 (1.25) | 5.11 (1.07) | EBM-CIMO | 0.399 | 1-7점 |
| 실행 가능성 | 4.38 (1.54) | 5.06 (1.45) | EBM-CIMO | 0.079 | 1-7점 |

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.69 (1.32) | 3.97 (1.12) | EBM-CIMO | 0.360 |
| physicalDemand | 1.66 (0.84) | 1.94 (1.15) | EBM-CIMO | 0.270 |
| temporalDemand | 2.07 (1.23) | 2.72 (1.71) | EBM-CIMO | 0.094 |
| effort | 4.72 (1.44) | 4.33 (1.45) | Control | 0.290 |
| frustration | 2.45 (1.3) | 2.39 (1.38) | Control | 0.862 |
| performance | 5.34 (1.03) | 5.56 (0.98) | EBM-CIMO | 0.410 |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.45 (0.97) | 5 (1.49) | Control | 0.173 | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 4.97 (1.3) | 5.28 (1.28) | EBM-CIMO | 0.343 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.62 (1.06) | 5.89 (0.81) | EBM-CIMO | 0.260 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 4.72 (1.44) | 4.97 (1.34) | EBM-CIMO | 0.482 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.52 (1) | 5.69 (0.91) | EBM-CIMO | 0.465 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 5.69 (1.21) | 5.83 (0.87) | EBM-CIMO | 0.585 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.52 (1) | 5.36 (1.23) | Control | 0.589 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.1 (1.18) | 5.64 (0.98) | EBM-CIMO | 0.054 | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.59 (0.89) | 5.75 (0.86) | EBM-CIMO | 0.463 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 4.34 (1.4) | 4.69 (1.71) | EBM-CIMO | 0.386 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 5.52 (1.25) | 5.61 (1.11) | EBM-CIMO | 0.754 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 5.07 (1.26) | 5.42 (1.14) | EBM-CIMO | 0.255 | I explored my own ideas and interpretations related to the article. |
| questionClaims | 4.59 (1.61) | 4.75 (1.23) | EBM-CIMO | 0.649 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 3.86 (1.48) | 4.58 (1.66) | EBM-CIMO | 0.076 | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.34 (1.29) | 5.72 (0.99) | EBM-CIMO | 0.194 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 5 (1.26) | 5.08 (1.38) | EBM-CIMO | 0.805 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 5.24 (1.19) | 5.42 (1.21) | EBM-CIMO | 0.567 | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.1 (1.35) | 5.5 (1.09) | EBM-CIMO | 0.202 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 5.14 (1.28) | 5.44 (1.21) | EBM-CIMO | 0.334 | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5.07 (1.34) | 5.31 (1.33) | EBM-CIMO | 0.486 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### LLM Trust

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| assumeClearIsAccurate | 4.07 (1.78) | 3.86 (1.62) | Control | 0.630 |  |
| relyForImportance | 2.97 (1.59) | 3.33 (1.68) | EBM-CIMO | 0.380 |  |
| relyWithoutReading | 4.31 (1.53) | 4.47 (1.59) | EBM-CIMO | 0.685 |  |
| competence | 5.48 (1.35) | 5.44 (1.23) | Control | 0.907 | Overall, the GenAI was competent and effective as a tool for assisting with reading. |
| comfortActing | 4.28 (1.51) | 4.03 (1.67) | Control | 0.543 | I have no reservations about acting on the information provided by the GenAI. |
| reliability | 4.14 (1.68) | 4.03 (1.72) | Control | 0.799 | I can always rely on the GenAI when understanding articles. |
| accuracy | 5.55 (1.35) | 5.47 (1.04) | Control | 0.793 | The information provided by the GenAI was accurate. |
| benevolence | 5.28 (1.44) | 5 (1.62) | Control | 0.482 | I believe the GenAI is made with my best interests in mind. |
| comfortUsing | 4.17 (1.66) | 4.22 (1.6) | EBM-CIMO | 0.904 | I have no hesitation in using the information provided by the GenAI. |
| confidentWithoutDetails | 3.83 (1.56) | 3.94 (1.73) | EBM-CIMO | 0.781 |  |

### LLM Usefulness

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| conceptHelp | 5.31 (1.39) | 5.64 (1.13) | EBM-CIMO | 0.306 | How helpful was the GenAI for understanding difficult concepts or terminology? |
| findingsHelp | 5.45 (1.38) | 5.78 (1.06) | EBM-CIMO | 0.287 | How helpful was the GenAI for understanding the research findings? |
| overall | 5.66 (1.44) | 5.78 (1) | EBM-CIMO | 0.693 | How useful was the GenAI for reading and understanding the article? |
| timeSaving | 5.93 (1.39) | 5.81 (1.43) | Control | 0.727 | How helpful was the GenAI for saving your time? |
| practicalHelp | 5.17 (1.34) | 5.56 (1.01) | EBM-CIMO | 0.201 | How helpful was the GenAI for understanding practical applications? |

### Resource Helpfulness

| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|--------|---------------|----------------|----------|--------|
| chatbot | 5.21 (1.81) | 5.33 (1.63) | EBM-CIMO | 0.772 |
| infographic | 4.55 (2.46) | 4.25 (2.35) | Control | 0.621 |
| podcast | 3.41 (2.8) | 3.22 (2.4) | Control | 0.771 |
| video | 3.76 (2.62) | 4.36 (2.26) | EBM-CIMO | 0.332 |

## 클래스별 통계

| 클래스 | 참가자 | Control | EBM-CIMO | 세션 | 완료 | 완료율 |
|--------|--------|---------|----------|------|------|--------|
| mba6202_tue | 45명 | 20명 | 25명 | 45개 | 45개 | 100% |
| mba6202_wed | 44명 | 23명 | 21명 | 44개 | 44개 | 100% |
| honda | 24명 | 12명 | 12명 | 24개 | 24개 | 100% |

## 참가자 피드백 (41명)

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

### 36. lowery.274@buckeyemail.osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: honda

> I think this is a very useful tool and appreciate those who developed it!

### 37. alvin_nash@na.honda.com

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: honda

> AI has tendency to spell words incorrectly.

### 38. lucy_berg@na.honda.com

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: honda

> Love this tool!

### 39. dddagreat@yahoo.com

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: honda

> I found this fascinating and would love to see if there are other tools to help me make presentations

### 40. karthy.md@gmail.com

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: honda

> I really like this AI, and wondering if i am able to use this AI through IOS App store.

### 41. tjgalyon@gmail.com

ㄴ **조건**: Control
ㄴ **클래스**: honda

> The chatbot was useful though sometimes too vague.  The podcast generated by tool was only 16 seconds, and the infographic was about another subject entirely.  It also did not generate a video / the video was unavailable.  I responded to the above questions based on the usefulness of the chatbot, which I felt was a valuable tool.

---

> 상세 데이터는 `descriptive_stats.json` 파일을 참조하세요.
