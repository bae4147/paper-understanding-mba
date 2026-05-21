# 기술통계 보고서 (Descriptive Statistics Report)

- **생성일시**: 2026-01-25T23:04:53.768Z
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
| 총 참가자 | 42명 |
| 총 세션 | 42개 |
| 완료 세션 | 42개 (100%) |

## 참가자 통계

### 조건별 배정

| 조건 | 참가자 수 | 완료 | 완료율 |
|------|----------|------|-------|
| Control | 20명 | 20명 | 100% |
| EBM-CIMO | 22명 | 22명 | 100% |

### 클래스별 분포

| 클래스 | 참가자 수 |
|--------|----------|
| mba6202_tue | 18명 |
| mba6202_wed | 24명 |

## 세션 통계

### 상태별 분포

| 상태 | 개수 |
|------|------|
| complete | 42개 |

## 읽기 행동 통계

### 전체

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 총 소요 시간 (분) | 13.22 | 15.68 | 0.1 | 74.66 | 8.08 | 42 |
| 읽기 시간 (분) | 2.3 | 4.73 | 0 | 26.95 | 0.5 | 42 |
| 채팅 시간 (분) | 5.2 | 9.8 | 0.01 | 42.74 | 0.56 | 42 |

### 조건별 비교

| 지표 | Control M(SD) | EBM-CIMO M(SD) |
|------|---------------|----------------|
| 총 소요 시간 (분) | 11.08 (14.17) | 15.17 (16.69) |
| 읽기 시간 (분) | 1.95 (2.96) | 2.62 (5.88) |
| 채팅 시간 (분) | 2.36 (3.95) | 7.78 (12.45) |

### 리소스 사용 (focusTime >= 5초)

| 리소스 | Control (n=20) | EBM-CIMO (n=22) |
|--------|----------|----------|
| Infographics | 12명 (60%) | 12명 (54.5%) |
| Video | 12명 (60%) | 12명 (54.5%) |
| Audio/Podcast | 11명 (55%) | 10명 (45.5%) |
| Chat (1회 이상) | 10명 (50%) | 11명 (50%) |

## LLM 사용 통계

- **총 메시지 수**: 80개

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 세션당 메시지 수 (전체) | 1.9 | 3.35 | 0 | 17 | 0.5 | 42 |
| ㄴ Control | 1.55 | 2.2 | 0 | 8 | 0.5 | 20 |
| ㄴ EBM-CIMO | 2.23 | 4.1 | 0 | 17 | 0.5 | 22 |
| 질문 길이 (문자) | 81.46 | 82.95 | 3 | 545 | 51 | 80 |
| 응답 시간 (초) | 10.34 | 6.66 | 2.69 | 35.37 | 8.59 | 80 |

**조건 비교 (One-way ANOVA)**

| 지표 | 높은 조건 | p-value |
|------|----------|--------|
| 세션당 메시지 수 | EBM-CIMO | 0.525 |

**Chat 대화 내역 보기**

> [Chat Viewer](https://bae4147.github.io/paper-understanding-mba/chat-viewer.html) - 참가자별 LLM 대화 내역을 확인할 수 있습니다.

## 설문 통계

> **분석 기법**: One-way ANOVA (두 조건 간 평균 비교)

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.15 (0.48) | 1.14 (0.34) | Control | 0.917 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1 (0) | 1.05 (0.21) | EBM-CIMO | 0.347 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 5.35 (1.11) | 5.23 (1.24) | Control | 0.744 | 1-7점 |
| 실행 가능성 | 5.1 (1.45) | 4.77 (1.54) | Control | 0.493 | 1-7점 |

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.55 (1.07) | 4.27 (1.17) | EBM-CIMO | 0.049 ✓ |
| physicalDemand | 1.45 (0.67) | 2.23 (1.28) | EBM-CIMO | 0.022 ✓ |
| temporalDemand | 1.75 (0.89) | 2.32 (1.29) | EBM-CIMO | 0.116 |
| effort | 4.4 (1.32) | 4.59 (1.37) | EBM-CIMO | 0.657 |
| frustration | 2.05 (1.12) | 3.23 (1.62) | EBM-CIMO | 0.011 ✓ |
| performance | 5.65 (0.91) | 5.55 (0.84) | Control | 0.707 |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.5 (1.07) | 5.05 (1.4) | Control | 0.259 | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 5.5 (0.92) | 5.18 (1.23) | Control | 0.364 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.95 (0.74) | 5.68 (0.76) | Control | 0.266 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 5.05 (1.32) | 5.14 (1.14) | EBM-CIMO | 0.826 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.85 (0.85) | 5.55 (0.84) | Control | 0.262 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 6 (1) | 5.77 (0.73) | Control | 0.415 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.7 (0.9) | 5.27 (1.39) | Control | 0.260 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.65 (0.96) | 5.64 (0.77) | Control | 0.961 | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.7 (0.78) | 5.55 (0.89) | Control | 0.565 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 5 (1.34) | 5.05 (1.52) | EBM-CIMO | 0.921 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 5.9 (0.77) | 5.68 (1.02) | Control | 0.452 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 5.75 (0.83) | 5.32 (1.06) | Control | 0.162 | I explored my own ideas and interpretations related to the article. |
| questionClaims | 5.4 (0.97) | 5.18 (1.11) | Control | 0.514 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 4.7 (1.45) | 4.64 (1.61) | Control | 0.897 | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.55 (0.97) | 5.45 (1.2) | Control | 0.785 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 4.9 (1.18) | 5.18 (1.34) | EBM-CIMO | 0.485 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 5.2 (0.87) | 5.64 (1.02) | EBM-CIMO | 0.157 | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.15 (1.01) | 5.41 (1.03) | EBM-CIMO | 0.428 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 5.15 (1.01) | 5.55 (1.16) | EBM-CIMO | 0.259 | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5.4 (1.07) | 5.59 (1.15) | EBM-CIMO | 0.591 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### 외부 도구 사용

| 도구 | 사용자 수 | 비율 |
|------|----------|------|
| 외부 AI 도구 | 2/42명 | 4.8% |
| 외부 PDF 뷰어 | 8/42명 | 19% |

### LLM Trust

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| assumeClearIsAccurate | 3.65 (1.8) | 3.41 (1.5) | Control | 0.646 |  |
| relyForImportance | 2.65 (1.59) | 3.27 (1.45) | EBM-CIMO | 0.203 |  |
| relyWithoutReading | 3.75 (1.48) | 3.86 (1.69) | EBM-CIMO | 0.823 |  |
| competence | 5.6 (1.16) | 5.09 (1.47) | Control | 0.235 | Overall, the GenAI was competent and effective as a tool for assisting with reading. |
| comfortActing | 3.9 (1.51) | 3.59 (1.7) | Control | 0.548 | I have no reservations about acting on the information provided by the GenAI. |
| reliability | 4.05 (1.6) | 3.73 (1.57) | Control | 0.523 | I can always rely on the GenAI when understanding articles. |
| accuracy | 5.6 (1.24) | 5.18 (1.34) | Control | 0.313 | The information provided by the GenAI was accurate. |
| benevolence | 5.1 (1.55) | 4.41 (1.87) | Control | 0.213 | I believe the GenAI is made with my best interests in mind. |
| comfortUsing | 3.85 (1.68) | 3.77 (1.68) | Control | 0.885 | I have no hesitation in using the information provided by the GenAI. |
| confidentWithoutDetails | 3.55 (1.36) | 3.36 (1.72) | Control | 0.708 |  |

### LLM Usefulness

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| conceptHelp | 5.3 (1.35) | 5.27 (1.25) | Control | 0.947 | How helpful was the GenAI for understanding difficult concepts or terminology? |
| findingsHelp | 5.55 (1.32) | 5.27 (1.35) | Control | 0.517 | How helpful was the GenAI for understanding the research findings? |
| overall | 5.65 (1.39) | 5.41 (1.19) | Control | 0.558 | How useful was the GenAI for reading and understanding the article? |
| timeSaving | 5.9 (1.45) | 5.32 (1.55) | Control | 0.228 | How helpful was the GenAI for saving your time? |
| practicalHelp | 5.45 (1.32) | 5.36 (1.37) | Control | 0.840 | How helpful was the GenAI for understanding practical applications? |

### Resource Helpfulness

| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|--------|---------------|----------------|----------|--------|
| chatbot | 4.5 (2.25) | 3.45 (2.46) | Control | 0.170 |
| infographic | 4.55 (2.31) | 4 (2.35) | Control | 0.461 |
| podcast | 3.6 (2.58) | 2.73 (2.8) | Control | 0.313 |
| video | 4.4 (2.56) | 4.36 (2.42) | Control | 0.963 |

---

## Chat 사용자 대상 분석 (Chat 1회 이상 사용)

> 아래 분석은 Chat을 1회 이상 사용한 참가자만을 대상으로 합니다.

### 표본 크기

| 구분 | 인원 |
|------|------|
| 전체 | 21명 |
| Control | 10명 |
| EBM-CIMO | 11명 |

### LLM 사용 통계

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| 메시지 수 | 3.1 (2.21) | 4.45 (4.87) | EBM-CIMO | 0.452 |

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.2 (0.6) | 1.09 (0.29) | Control | 0.614 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1 (0) | 1 (0) | 동일 | 1.000 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 5.1 (1.14) | 5 (1.04) | Control | 0.844 | 1-7점 |
| 실행 가능성 | 4.4 (1.5) | 4.82 (1.34) | EBM-CIMO | 0.528 | 1-7점 |

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.2 (1.25) | 4.09 (1.16) | EBM-CIMO | 0.124 |
| physicalDemand | 1.5 (0.5) | 2 (1.04) | EBM-CIMO | 0.206 |
| temporalDemand | 1.7 (0.9) | 2.18 (1.11) | EBM-CIMO | 0.316 |
| effort | 4.8 (1.33) | 4.27 (1.48) | Control | 0.426 |
| frustration | 2 (1.1) | 2.36 (1.37) | EBM-CIMO | 0.532 |
| performance | 5.8 (0.75) | 5.64 (0.88) | Control | 0.669 |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.7 (0.78) | 5.18 (1.53) | Control | 0.370 | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 5.5 (0.81) | 5 (1.6) | Control | 0.406 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.8 (0.6) | 5.82 (0.83) | EBM-CIMO | 0.957 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 5 (1.34) | 5.09 (1.24) | EBM-CIMO | 0.880 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.9 (0.7) | 5.45 (0.89) | Control | 0.243 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 6.1 (1.04) | 5.82 (0.94) | Control | 0.542 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.7 (0.78) | 5.36 (1.43) | Control | 0.538 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.4 (0.8) | 5.64 (0.77) | EBM-CIMO | 0.520 | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.7 (0.64) | 5.64 (0.88) | Control | 0.860 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 4.6 (1.2) | 5 (1.71) | EBM-CIMO | 0.565 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 6 (0.77) | 5.73 (1.05) | Control | 0.531 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 5.6 (0.8) | 5.64 (0.98) | EBM-CIMO | 0.931 | I explored my own ideas and interpretations related to the article. |
| questionClaims | 5.6 (0.8) | 5.45 (0.99) | Control | 0.730 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 4.1 (1.37) | 4.55 (1.83) | EBM-CIMO | 0.558 | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.4 (1.02) | 5.91 (1.16) | EBM-CIMO | 0.325 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 4.9 (0.94) | 5.55 (1.44) | EBM-CIMO | 0.266 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 4.9 (0.94) | 5.91 (1) | EBM-CIMO | 0.036 ✓ | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.3 (0.64) | 5.73 (0.96) | EBM-CIMO | 0.273 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 4.8 (0.87) | 6.09 (0.9) | EBM-CIMO | 0.005 ✓ | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5.4 (0.92) | 5.91 (1.31) | EBM-CIMO | 0.343 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### LLM Trust

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| assumeClearIsAccurate | 3.1 (1.64) | 3.27 (1.54) | EBM-CIMO | 0.816 |  |
| relyForImportance | 2.3 (1.19) | 3.27 (1.54) | EBM-CIMO | 0.143 |  |
| relyWithoutReading | 3.4 (1.28) | 4.18 (1.9) | EBM-CIMO | 0.310 |  |
| competence | 5.8 (0.75) | 5.18 (1.34) | Control | 0.235 | Overall, the GenAI was competent and effective as a tool for assisting with reading. |
| comfortActing | 3.7 (1.68) | 3.64 (1.92) | Control | 0.940 | I have no reservations about acting on the information provided by the GenAI. |
| reliability | 3.6 (1.56) | 3.55 (1.83) | Control | 0.945 | I can always rely on the GenAI when understanding articles. |
| accuracy | 5.7 (1) | 5.09 (1.08) | Control | 0.221 | The information provided by the GenAI was accurate. |
| benevolence | 4.9 (1.22) | 4.27 (1.76) | Control | 0.383 | I believe the GenAI is made with my best interests in mind. |
| comfortUsing | 3.3 (1.73) | 3.73 (1.76) | EBM-CIMO | 0.601 | I have no hesitation in using the information provided by the GenAI. |
| confidentWithoutDetails | 3.4 (0.92) | 2.91 (1.68) | Control | 0.444 |  |

### LLM Usefulness

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| conceptHelp | 5.1 (0.83) | 5.27 (1.21) | EBM-CIMO | 0.724 | How helpful was the GenAI for understanding difficult concepts or terminology? |
| findingsHelp | 5.4 (0.92) | 5.36 (1.37) | Control | 0.947 | How helpful was the GenAI for understanding the research findings? |
| overall | 5.7 (0.9) | 5.45 (1.08) | Control | 0.598 | How useful was the GenAI for reading and understanding the article? |
| timeSaving | 6 (0.89) | 5.09 (1.44) | Control | 0.119 | How helpful was the GenAI for saving your time? |
| practicalHelp | 5.3 (0.9) | 5.73 (1.14) | EBM-CIMO | 0.378 | How helpful was the GenAI for understanding practical applications? |

### Resource Helpfulness

| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|--------|---------------|----------------|----------|--------|
| chatbot | 5.2 (0.98) | 5 (1.71) | Control | 0.760 |
| infographic | 4 (2.28) | 2.64 (2.14) | Control | 0.195 |
| podcast | 2.9 (2.34) | 1.55 (2.43) | Control | 0.232 |
| video | 3.5 (2.58) | 3.64 (2.64) | EBM-CIMO | 0.911 |

## 클래스별 통계

| 클래스 | 참가자 | Control | EBM-CIMO | 세션 | 완료 | 완료율 |
|--------|--------|---------|----------|------|------|--------|
| mba6202_tue | 18명 | 8명 | 10명 | 18개 | 18개 | 100% |
| mba6202_wed | 24명 | 12명 | 12명 | 24개 | 24개 | 100% |

## 참가자 피드백 (19명)

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

### 14. walsh.1042@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> I didn't use the GenAI tools, I clicked finished prematurely thinking it meant that I was finished uploading the article, hence all of the answers are 3's.

### 15. frank.827@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> I really liked the tool that disseminated the article into all those options. Is this something you built or is this readily available at all times? I went to bookmark it but it appeared specific to this assignment. It would be a really useful tool -- especially for efficiency.

### 16. westrick.37@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> I did not like that if you had to pause the video it would then restart and there was no ability to go back to where you left off.

### 17. westrick.48@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> Not being able to pause the video was frustrating.

### 18. moore.4091@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_tue

> Very useful tool!

### 19. montgomery.714@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_tue

> Some of the steps in the AI tool were a little unclear, the chatbot didn't seem very helpful but it might have also been related to the content of the article.

---

> 상세 데이터는 `descriptive_stats.json` 파일을 참조하세요.
