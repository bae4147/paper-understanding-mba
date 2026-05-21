# 기술통계 보고서 (Descriptive Statistics Report)

- **생성일시**: 2026-01-30T14:24:30.436Z
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
| 총 참가자 | 88명 |
| 총 세션 | 88개 |
| 완료 세션 | 88개 (100%) |

## 참가자 통계

### 조건별 배정

| 조건 | 참가자 수 | 완료 | 완료율 |
|------|----------|------|-------|
| Control | 42명 | 42명 | 100% |
| EBM-CIMO | 46명 | 46명 | 100% |

### 클래스별 분포

| 클래스 | 참가자 수 |
|--------|----------|
| mba6202_tue | 45명 |
| mba6202_wed | 43명 |

## 세션 통계

### 상태별 분포

| 상태 | 개수 |
|------|------|
| complete | 88개 |

## 읽기 행동 통계

### 전체

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 총 소요 시간 (분) | 21.16 | 52.17 | 0.03 | 373.61 | 7.64 | 88 |
| 읽기 시간 (분) | 5.2 | 21 | 0 | 194.8 | 0.83 | 88 |
| 채팅 시간 (분) | 5.14 | 12.53 | 0 | 98.58 | 1.35 | 88 |

### 조건별 비교

| 지표 | Control M(SD) | EBM-CIMO M(SD) |
|------|---------------|----------------|
| 총 소요 시간 (분) | 14.89 (41.03) | 26.88 (60) |
| 읽기 시간 (분) | 2.07 (3.09) | 8.07 (28.59) |
| 채팅 시간 (분) | 2.16 (3.14) | 7.86 (16.61) |

### 리소스 사용 (focusTime >= 5초)

| 리소스 | Control (n=42) | EBM-CIMO (n=46) |
|--------|----------|----------|
| Infographics | 20명 (47.6%) | 29명 (63%) |
| Video | 20명 (47.6%) | 28명 (60.9%) |
| Audio/Podcast | 18명 (42.9%) | 21명 (45.7%) |
| Chat (1회 이상) | 22명 (52.4%) | 28명 (60.9%) |

## LLM 사용 통계

- **총 메시지 수**: 147개

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 세션당 메시지 수 (전체) | 1.67 | 2.61 | 0 | 17 | 1 | 88 |
| ㄴ Control | 1.29 | 1.79 | 0 | 8 | 1 | 42 |
| ㄴ EBM-CIMO | 2.02 | 3.14 | 0 | 17 | 1 | 46 |
| 질문 길이 (문자) | 77.86 | 77.89 | 3 | 545 | 50 | 147 |
| 응답 시간 (초) | 9.7 | 5.62 | 2.46 | 35.37 | 8.65 | 147 |

**조건 비교 (One-way ANOVA)**

| 지표 | 높은 조건 | p-value |
|------|----------|--------|
| 세션당 메시지 수 | EBM-CIMO | 0.191 |

**Chat 대화 내역 보기**

> [Chat Viewer](https://bae4147.github.io/paper-understanding-mba/chat-viewer.html) - 참가자별 LLM 대화 내역을 확인할 수 있습니다.

## 설문 통계

> **분석 기법**: One-way ANOVA (두 조건 간 평균 비교)

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.1 (0.37) | 1.07 (0.25) | Control | 0.654 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1.05 (0.3) | 1.02 (0.15) | Control | 0.612 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 5.17 (1.09) | 5.13 (1.26) | Control | 0.887 | 1-7점 |
| 실행 가능성 | 4.98 (1.37) | 4.93 (1.47) | Control | 0.893 | 1-7점 |

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.81 (1.26) | 4.04 (1.06) | EBM-CIMO | 0.353 |
| physicalDemand | 1.67 (0.94) | 1.96 (1.14) | EBM-CIMO | 0.205 |
| temporalDemand | 2.07 (1.24) | 2.41 (1.41) | EBM-CIMO | 0.238 |
| effort | 4.36 (1.6) | 4.39 (1.33) | EBM-CIMO | 0.914 |
| frustration | 2.29 (1.45) | 2.7 (1.56) | EBM-CIMO | 0.212 |
| performance | 5.43 (1) | 5.59 (0.85) | EBM-CIMO | 0.430 |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.57 (1.09) | 5.13 (1.26) | Control | 0.088 | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 5.38 (1.02) | 5.3 (1.04) | Control | 0.732 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.64 (0.97) | 5.76 (0.84) | EBM-CIMO | 0.547 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 5.07 (1.32) | 5.11 (1.22) | EBM-CIMO | 0.892 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.52 (1.03) | 5.76 (0.79) | EBM-CIMO | 0.231 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 5.81 (1.18) | 5.76 (0.81) | Control | 0.823 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.67 (0.92) | 5.39 (1.15) | Control | 0.226 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.43 (1.16) | 5.74 (0.85) | EBM-CIMO | 0.157 | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.71 (0.91) | 5.59 (0.87) | Control | 0.509 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 4.71 (1.39) | 4.87 (1.57) | EBM-CIMO | 0.629 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 5.74 (0.93) | 5.76 (0.98) | EBM-CIMO | 0.912 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 5.5 (0.98) | 5.41 (1.17) | Control | 0.712 | I explored my own ideas and interpretations related to the article. |
| questionClaims | 5.1 (1.23) | 4.89 (1.2) | Control | 0.439 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 4.55 (1.29) | 4.65 (1.6) | EBM-CIMO | 0.742 | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.62 (0.95) | 5.61 (1.05) | Control | 0.962 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 5.05 (1.19) | 5.09 (1.25) | EBM-CIMO | 0.882 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 5.5 (0.96) | 5.61 (1.15) | EBM-CIMO | 0.637 | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.36 (1.11) | 5.43 (1.08) | EBM-CIMO | 0.743 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 5.4 (1.02) | 5.52 (1.23) | EBM-CIMO | 0.635 | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5.33 (1.11) | 5.41 (1.11) | EBM-CIMO | 0.740 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### 외부 도구 사용

| 도구 | 사용자 수 | 비율 |
|------|----------|------|
| 외부 AI 도구 | 4/88명 | 4.5% |
| 외부 PDF 뷰어 | 17/88명 | 19.3% |

### LLM Trust

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| assumeClearIsAccurate | 3.57 (1.84) | 3.76 (1.55) | EBM-CIMO | 0.606 |  |
| relyForImportance | 2.76 (1.66) | 3.09 (1.5) | EBM-CIMO | 0.343 |  |
| relyWithoutReading | 3.74 (1.62) | 4.13 (1.55) | EBM-CIMO | 0.255 |  |
| competence | 5 (1.63) | 5.37 (1.34) | EBM-CIMO | 0.253 | Overall, the GenAI was competent and effective as a tool for assisting with reading. |
| comfortActing | 3.9 (1.62) | 3.87 (1.64) | Control | 0.920 | I have no reservations about acting on the information provided by the GenAI. |
| reliability | 3.79 (1.68) | 4 (1.69) | EBM-CIMO | 0.558 | I can always rely on the GenAI when understanding articles. |
| accuracy | 5.21 (1.57) | 5.46 (1.17) | EBM-CIMO | 0.417 | The information provided by the GenAI was accurate. |
| benevolence | 4.83 (1.69) | 4.91 (1.73) | EBM-CIMO | 0.830 | I believe the GenAI is made with my best interests in mind. |
| comfortUsing | 3.86 (1.7) | 4.09 (1.57) | EBM-CIMO | 0.516 | I have no hesitation in using the information provided by the GenAI. |
| confidentWithoutDetails | 3.48 (1.58) | 3.96 (1.79) | EBM-CIMO | 0.192 |  |

### LLM Usefulness

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| conceptHelp | 4.93 (1.7) | 5.52 (1.36) | EBM-CIMO | 0.076 | How helpful was the GenAI for understanding difficult concepts or terminology? |
| findingsHelp | 5.1 (1.74) | 5.63 (1.36) | EBM-CIMO | 0.114 | How helpful was the GenAI for understanding the research findings? |
| overall | 5.24 (1.84) | 5.59 (1.31) | EBM-CIMO | 0.310 | How useful was the GenAI for reading and understanding the article? |
| timeSaving | 5.48 (1.88) | 5.63 (1.63) | EBM-CIMO | 0.685 | How helpful was the GenAI for saving your time? |
| practicalHelp | 4.83 (1.74) | 5.39 (1.37) | EBM-CIMO | 0.102 | How helpful was the GenAI for understanding practical applications? |

### Resource Helpfulness

| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|--------|---------------|----------------|----------|--------|
| chatbot | 4.05 (2.48) | 3.98 (2.56) | Control | 0.899 |
| infographic | 4.21 (2.48) | 4.54 (2.41) | EBM-CIMO | 0.535 |
| podcast | 3.29 (2.8) | 3.26 (2.66) | Control | 0.966 |
| video | 3.76 (2.76) | 4.43 (2.34) | EBM-CIMO | 0.224 |

---

## Chat 사용자 대상 분석 (Chat 1회 이상 사용)

> 아래 분석은 Chat을 1회 이상 사용한 참가자만을 대상으로 합니다.

### 표본 크기

| 구분 | 인원 |
|------|------|
| 전체 | 50명 |
| Control | 22명 |
| EBM-CIMO | 28명 |

### LLM 사용 통계

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| 메시지 수 | 2.45 (1.8) | 3.32 (3.45) | EBM-CIMO | 0.300 |

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.09 (0.42) | 1.04 (0.19) | Control | 0.542 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1 (0) | 1 (0) | 동일 | 1.000 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 5 (1.17) | 5.07 (1.16) | EBM-CIMO | 0.834 | 1-7점 |
| 실행 가능성 | 4.64 (1.37) | 5.04 (1.45) | EBM-CIMO | 0.337 | 1-7점 |

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.91 (1.31) | 4 (1) | EBM-CIMO | 0.786 |
| physicalDemand | 1.73 (0.86) | 1.89 (1.05) | EBM-CIMO | 0.560 |
| temporalDemand | 2 (1.17) | 2.36 (1.34) | EBM-CIMO | 0.338 |
| effort | 5.14 (1.32) | 4.25 (1.45) | Control | 0.034 ✓ |
| frustration | 2.5 (1.31) | 2.39 (1.37) | Control | 0.785 |
| performance | 5.41 (1.11) | 5.68 (0.89) | EBM-CIMO | 0.356 |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.64 (0.93) | 5.21 (1.37) | Control | 0.232 | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 5.27 (1.09) | 5.39 (1.21) | EBM-CIMO | 0.723 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.5 (1.03) | 5.89 (0.77) | EBM-CIMO | 0.138 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 4.86 (1.46) | 5.18 (1.2) | EBM-CIMO | 0.415 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.5 (1.03) | 5.71 (0.84) | EBM-CIMO | 0.432 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 5.77 (1.24) | 5.86 (0.87) | EBM-CIMO | 0.784 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.59 (0.98) | 5.46 (1.09) | Control | 0.678 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.27 (1.25) | 5.79 (0.86) | EBM-CIMO | 0.099 | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.59 (0.89) | 5.71 (0.84) | EBM-CIMO | 0.624 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 4.5 (1.31) | 4.82 (1.65) | EBM-CIMO | 0.467 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 5.73 (0.86) | 5.75 (1.02) | EBM-CIMO | 0.935 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 5.36 (1.02) | 5.57 (1.05) | EBM-CIMO | 0.495 | I explored my own ideas and interpretations related to the article. |
| questionClaims | 5 (1.35) | 4.86 (1.19) | Control | 0.698 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 4.14 (1.29) | 4.68 (1.67) | EBM-CIMO | 0.224 | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.5 (1.03) | 5.82 (0.97) | EBM-CIMO | 0.273 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 5.14 (1.01) | 5.25 (1.3) | EBM-CIMO | 0.742 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 5.32 (1.06) | 5.57 (1.27) | EBM-CIMO | 0.464 | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.41 (0.98) | 5.57 (1.15) | EBM-CIMO | 0.607 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 5.27 (1.05) | 5.64 (1.26) | EBM-CIMO | 0.283 | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5.23 (1.17) | 5.46 (1.21) | EBM-CIMO | 0.497 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### LLM Trust

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| assumeClearIsAccurate | 3.68 (1.82) | 3.61 (1.57) | Control | 0.879 |  |
| relyForImportance | 2.82 (1.59) | 2.96 (1.52) | EBM-CIMO | 0.747 |  |
| relyWithoutReading | 3.95 (1.4) | 4.14 (1.64) | EBM-CIMO | 0.676 |  |
| competence | 5.36 (1.4) | 5.43 (1.29) | EBM-CIMO | 0.869 | Overall, the GenAI was competent and effective as a tool for assisting with reading. |
| comfortActing | 4.14 (1.6) | 3.82 (1.75) | Control | 0.524 | I have no reservations about acting on the information provided by the GenAI. |
| reliability | 3.91 (1.68) | 3.82 (1.87) | Control | 0.867 | I can always rely on the GenAI when understanding articles. |
| accuracy | 5.41 (1.47) | 5.39 (1.01) | Control | 0.964 | The information provided by the GenAI was accurate. |
| benevolence | 5.09 (1.47) | 4.86 (1.73) | Control | 0.622 | I believe the GenAI is made with my best interests in mind. |
| comfortUsing | 4 (1.76) | 4.11 (1.63) | EBM-CIMO | 0.828 | I have no hesitation in using the information provided by the GenAI. |
| confidentWithoutDetails | 3.55 (1.5) | 3.79 (1.9) | EBM-CIMO | 0.636 |  |

### LLM Usefulness

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| conceptHelp | 5.14 (1.39) | 5.61 (1.21) | EBM-CIMO | 0.216 | How helpful was the GenAI for understanding difficult concepts or terminology? |
| findingsHelp | 5.23 (1.38) | 5.79 (1.11) | EBM-CIMO | 0.127 | How helpful was the GenAI for understanding the research findings? |
| overall | 5.45 (1.5) | 5.68 (1.07) | EBM-CIMO | 0.549 | How useful was the GenAI for reading and understanding the article? |
| timeSaving | 5.77 (1.47) | 5.61 (1.52) | Control | 0.706 | How helpful was the GenAI for saving your time? |
| practicalHelp | 5.09 (1.38) | 5.64 (1.11) | EBM-CIMO | 0.131 | How helpful was the GenAI for understanding practical applications? |

### Resource Helpfulness

| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|--------|---------------|----------------|----------|--------|
| chatbot | 4.91 (1.95) | 5.21 (1.78) | EBM-CIMO | 0.575 |
| infographic | 4 (2.56) | 4 (2.52) | 동일 | 1.000 |
| podcast | 2.82 (2.81) | 2.93 (2.46) | EBM-CIMO | 0.885 |
| video | 3.27 (2.78) | 4.18 (2.25) | EBM-CIMO | 0.219 |

## 클래스별 통계

| 클래스 | 참가자 | Control | EBM-CIMO | 세션 | 완료 | 완료율 |
|--------|--------|---------|----------|------|------|--------|
| mba6202_tue | 45명 | 20명 | 25명 | 45개 | 45개 | 100% |
| mba6202_wed | 43명 | 22명 | 21명 | 43개 | 43개 | 100% |

## 참가자 피드백 (35명)

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

---

> 상세 데이터는 `descriptive_stats.json` 파일을 참조하세요.
