# 기술통계 보고서 (Descriptive Statistics Report)

- **생성일시**: 2026-02-20T10:48:38.243Z
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
| 총 참가자 | 108명 |
| 총 세션 | 108개 |
| 완료 세션 | 108개 (100%) |

## 참가자 통계

### 조건별 배정

| 조건 | 참가자 수 | 완료 | 완료율 |
|------|----------|------|-------|
| Control | 52명 | 52명 | 100% |
| EBM-CIMO | 56명 | 56명 | 100% |

### 클래스별 분포

| 클래스 | 참가자 수 |
|--------|----------|
| mba6202_tue | 45명 |
| mba6202_wed | 44명 |
| honda | 19명 |

## 세션 통계

### 상태별 분포

| 상태 | 개수 |
|------|------|
| complete | 108개 |

## 읽기 행동 통계

### 전체

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 총 소요 시간 (분) | 19.07 | 47.38 | 0.03 | 373.61 | 8.05 | 108 |
| 읽기 시간 (분) | 4.48 | 19.03 | 0 | 194.8 | 0.87 | 108 |
| 채팅 시간 (분) | 4.39 | 11.43 | 0 | 98.58 | 1.2 | 108 |

### 조건별 비교

| 지표 | Control M(SD) | EBM-CIMO M(SD) |
|------|---------------|----------------|
| 총 소요 시간 (분) | 14.11 (37.08) | 23.68 (54.85) |
| 읽기 시간 (분) | 1.92 (2.91) | 6.86 (26.05) |
| 채팅 시간 (분) | 1.92 (2.88) | 6.69 (15.27) |

### 리소스 사용 (focusTime >= 5초)

| 리소스 | Control (n=52) | EBM-CIMO (n=56) |
|--------|----------|----------|
| Infographics | 27명 (51.9%) | 36명 (64.3%) |
| Video | 27명 (51.9%) | 36명 (64.3%) |
| Audio/Podcast | 26명 (50%) | 27명 (48.2%) |
| Chat (1회 이상) | 28명 (53.8%) | 34명 (60.7%) |

## LLM 사용 통계

- **총 메시지 수**: 164개

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 세션당 메시지 수 (전체) | 1.52 | 2.41 | 0 | 17 | 1 | 108 |
| ㄴ Control | 1.19 | 1.65 | 0 | 8 | 1 | 52 |
| ㄴ EBM-CIMO | 1.82 | 2.91 | 0 | 17 | 1 | 56 |
| 질문 길이 (문자) | 76.25 | 74.49 | 3 | 545 | 52 | 164 |
| 응답 시간 (초) | 9.91 | 5.63 | 2.46 | 35.37 | 8.82 | 164 |

**조건 비교 (One-way ANOVA)**

| 지표 | 높은 조건 | p-value |
|------|----------|--------|
| 세션당 메시지 수 | EBM-CIMO | 0.178 |

**Chat 대화 내역 보기**

> [Chat Viewer](https://bae4147.github.io/paper-understanding-mba/chat-viewer.html) - 참가자별 LLM 대화 내역을 확인할 수 있습니다.

## 설문 통계

> **분석 기법**: One-way ANOVA (두 조건 간 평균 비교)

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.1 (0.35) | 1.05 (0.23) | Control | 0.458 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1.04 (0.27) | 1.02 (0.13) | Control | 0.620 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 5.1 (1.21) | 5.2 (1.2) | EBM-CIMO | 0.670 | 1-7점 |
| 실행 가능성 | 4.81 (1.54) | 5.02 (1.48) | EBM-CIMO | 0.476 | 1-7점 |

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.62 (1.29) | 3.89 (1.19) | EBM-CIMO | 0.252 |
| physicalDemand | 1.62 (0.9) | 1.91 (1.15) | EBM-CIMO | 0.147 |
| temporalDemand | 2.1 (1.36) | 2.57 (1.6) | EBM-CIMO | 0.104 |
| effort | 4.08 (1.64) | 4.27 (1.42) | EBM-CIMO | 0.522 |
| frustration | 2.21 (1.42) | 2.57 (1.53) | EBM-CIMO | 0.213 |
| performance | 5.46 (0.97) | 5.61 (0.92) | EBM-CIMO | 0.429 |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.48 (1.17) | 4.96 (1.44) | Control | 0.046 ✓ | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 5.27 (1.18) | 5.21 (1.21) | Control | 0.813 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.75 (1) | 5.84 (0.86) | EBM-CIMO | 0.622 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 5.02 (1.37) | 4.88 (1.36) | Control | 0.588 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.58 (1.01) | 5.82 (0.83) | EBM-CIMO | 0.173 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 5.79 (1.15) | 5.82 (0.8) | EBM-CIMO | 0.864 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.62 (0.96) | 5.27 (1.29) | Control | 0.121 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.38 (1.13) | 5.7 (0.92) | EBM-CIMO | 0.122 | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.77 (0.93) | 5.71 (0.9) | Control | 0.758 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 4.65 (1.45) | 4.75 (1.65) | EBM-CIMO | 0.752 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 5.62 (1.13) | 5.77 (1.05) | EBM-CIMO | 0.473 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 5.38 (1.16) | 5.34 (1.21) | Control | 0.845 | I explored my own ideas and interpretations related to the article. |
| questionClaims | 4.87 (1.54) | 4.79 (1.31) | Control | 0.774 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 4.37 (1.49) | 4.46 (1.59) | EBM-CIMO | 0.743 | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.6 (1.15) | 5.54 (1.03) | Control | 0.776 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 5.1 (1.33) | 5 (1.31) | Control | 0.709 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 5.44 (1.18) | 5.54 (1.15) | EBM-CIMO | 0.681 | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.31 (1.34) | 5.41 (1.07) | EBM-CIMO | 0.661 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 5.31 (1.26) | 5.41 (1.21) | EBM-CIMO | 0.669 | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5.29 (1.23) | 5.23 (1.3) | Control | 0.819 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### 외부 도구 사용

| 도구 | 사용자 수 | 비율 |
|------|----------|------|
| 외부 AI 도구 | 4/108명 | 3.7% |
| 외부 PDF 뷰어 | 17/108명 | 15.7% |

### LLM Trust

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| assumeClearIsAccurate | 4 (1.92) | 4 (1.64) | 동일 | 1.000 |  |
| relyForImportance | 3.04 (1.76) | 3.29 (1.53) | EBM-CIMO | 0.442 |  |
| relyWithoutReading | 4.19 (1.78) | 4.34 (1.5) | EBM-CIMO | 0.646 |  |
| competence | 5.19 (1.59) | 5.48 (1.31) | EBM-CIMO | 0.307 | Overall, the GenAI was competent and effective as a tool for assisting with reading. |
| comfortActing | 4.21 (1.69) | 3.96 (1.57) | Control | 0.437 | I have no reservations about acting on the information provided by the GenAI. |
| reliability | 4.15 (1.81) | 4.11 (1.6) | Control | 0.888 | I can always rely on the GenAI when understanding articles. |
| accuracy | 5.42 (1.51) | 5.54 (1.18) | EBM-CIMO | 0.668 | The information provided by the GenAI was accurate. |
| benevolence | 5.15 (1.69) | 5.02 (1.67) | Control | 0.678 | I believe the GenAI is made with my best interests in mind. |
| comfortUsing | 4.15 (1.75) | 4.16 (1.52) | EBM-CIMO | 0.983 | I have no hesitation in using the information provided by the GenAI. |
| confidentWithoutDetails | 3.85 (1.74) | 4.16 (1.76) | EBM-CIMO | 0.357 |  |

### LLM Usefulness

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| conceptHelp | 5.21 (1.68) | 5.63 (1.3) | EBM-CIMO | 0.158 | How helpful was the GenAI for understanding difficult concepts or terminology? |
| findingsHelp | 5.35 (1.7) | 5.73 (1.3) | EBM-CIMO | 0.190 | How helpful was the GenAI for understanding the research findings? |
| overall | 5.5 (1.78) | 5.73 (1.26) | EBM-CIMO | 0.438 | How useful was the GenAI for reading and understanding the article? |
| timeSaving | 5.71 (1.78) | 5.82 (1.56) | EBM-CIMO | 0.736 | How helpful was the GenAI for saving your time? |
| practicalHelp | 5.04 (1.7) | 5.43 (1.29) | EBM-CIMO | 0.184 | How helpful was the GenAI for understanding practical applications? |

### Resource Helpfulness

| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|--------|---------------|----------------|----------|--------|
| chatbot | 4.27 (2.44) | 4.3 (2.46) | EBM-CIMO | 0.943 |
| infographic | 4.62 (2.4) | 4.73 (2.28) | EBM-CIMO | 0.798 |
| podcast | 3.79 (2.8) | 3.54 (2.62) | Control | 0.632 |
| video | 4.17 (2.67) | 4.55 (2.29) | EBM-CIMO | 0.431 |

---

## Chat 사용자 대상 분석 (Chat 1회 이상 사용)

> 아래 분석은 Chat을 1회 이상 사용한 참가자만을 대상으로 합니다.

### 표본 크기

| 구분 | 인원 |
|------|------|
| 전체 | 62명 |
| Control | 28명 |
| EBM-CIMO | 34명 |

### LLM 사용 통계

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| 메시지 수 | 2.21 (1.68) | 3 (3.23) | EBM-CIMO | 0.256 |

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.07 (0.37) | 1.03 (0.17) | Control | 0.564 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1 (0) | 1 (0) | 동일 | 1.000 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 4.86 (1.27) | 5.12 (1.11) | EBM-CIMO | 0.400 | 1-7점 |
| 실행 가능성 | 4.43 (1.55) | 5.03 (1.48) | EBM-CIMO | 0.131 | 1-7점 |

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.71 (1.33) | 3.94 (1.14) | EBM-CIMO | 0.479 |
| physicalDemand | 1.68 (0.85) | 1.88 (1.13) | EBM-CIMO | 0.441 |
| temporalDemand | 2.04 (1.24) | 2.56 (1.61) | EBM-CIMO | 0.171 |
| effort | 4.75 (1.45) | 4.26 (1.46) | Control | 0.204 |
| frustration | 2.46 (1.32) | 2.35 (1.39) | Control | 0.753 |
| performance | 5.36 (1.04) | 5.62 (0.97) | EBM-CIMO | 0.321 |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.5 (0.94) | 5 (1.51) | Control | 0.140 | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 5 (1.31) | 5.29 (1.32) | EBM-CIMO | 0.392 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.64 (1.08) | 5.94 (0.8) | EBM-CIMO | 0.224 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 4.75 (1.45) | 4.94 (1.37) | EBM-CIMO | 0.603 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.54 (1.02) | 5.74 (0.88) | EBM-CIMO | 0.420 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 5.71 (1.22) | 5.88 (0.87) | EBM-CIMO | 0.536 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.5 (1.02) | 5.32 (1.23) | Control | 0.553 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.14 (1.19) | 5.65 (1) | EBM-CIMO | 0.079 | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.61 (0.9) | 5.79 (0.87) | EBM-CIMO | 0.417 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 4.32 (1.42) | 4.65 (1.75) | EBM-CIMO | 0.438 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 5.46 (1.24) | 5.68 (1.1) | EBM-CIMO | 0.486 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 5.11 (1.26) | 5.41 (1.17) | EBM-CIMO | 0.336 | I explored my own ideas and interpretations related to the article. |
| questionClaims | 4.64 (1.61) | 4.82 (1.22) | EBM-CIMO | 0.623 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 3.86 (1.51) | 4.5 (1.65) | EBM-CIMO | 0.123 | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.36 (1.32) | 5.74 (1.01) | EBM-CIMO | 0.213 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 5 (1.28) | 5.09 (1.4) | EBM-CIMO | 0.802 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 5.25 (1.21) | 5.41 (1.24) | EBM-CIMO | 0.613 | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.11 (1.37) | 5.5 (1.12) | EBM-CIMO | 0.226 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 5.14 (1.3) | 5.47 (1.24) | EBM-CIMO | 0.324 | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5.07 (1.36) | 5.26 (1.36) | EBM-CIMO | 0.586 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### LLM Trust

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| assumeClearIsAccurate | 4.04 (1.8) | 3.74 (1.58) | Control | 0.494 |  |
| relyForImportance | 2.96 (1.61) | 3.18 (1.6) | EBM-CIMO | 0.612 |  |
| relyWithoutReading | 4.36 (1.54) | 4.38 (1.59) | EBM-CIMO | 0.951 |  |
| competence | 5.46 (1.38) | 5.47 (1.27) | EBM-CIMO | 0.985 | Overall, the GenAI was competent and effective as a tool for assisting with reading. |
| comfortActing | 4.25 (1.53) | 3.94 (1.68) | Control | 0.463 | I have no reservations about acting on the information provided by the GenAI. |
| reliability | 4.14 (1.71) | 3.94 (1.73) | Control | 0.653 | I can always rely on the GenAI when understanding articles. |
| accuracy | 5.54 (1.38) | 5.47 (1.06) | Control | 0.837 | The information provided by the GenAI was accurate. |
| benevolence | 5.32 (1.44) | 4.97 (1.65) | Control | 0.390 | I believe the GenAI is made with my best interests in mind. |
| comfortUsing | 4.14 (1.68) | 4.12 (1.59) | Control | 0.953 | I have no hesitation in using the information provided by the GenAI. |
| confidentWithoutDetails | 3.79 (1.57) | 3.88 (1.76) | EBM-CIMO | 0.825 |  |

### LLM Usefulness

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| conceptHelp | 5.36 (1.39) | 5.68 (1.16) | EBM-CIMO | 0.336 | How helpful was the GenAI for understanding difficult concepts or terminology? |
| findingsHelp | 5.46 (1.4) | 5.79 (1.08) | EBM-CIMO | 0.307 | How helpful was the GenAI for understanding the research findings? |
| overall | 5.64 (1.47) | 5.76 (1.03) | EBM-CIMO | 0.708 | How useful was the GenAI for reading and understanding the article? |
| timeSaving | 5.96 (1.4) | 5.79 (1.47) | Control | 0.650 | How helpful was the GenAI for saving your time? |
| practicalHelp | 5.18 (1.36) | 5.56 (1.03) | EBM-CIMO | 0.225 | How helpful was the GenAI for understanding practical applications? |

### Resource Helpfulness

| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|--------|---------------|----------------|----------|--------|
| chatbot | 5.18 (1.83) | 5.32 (1.68) | EBM-CIMO | 0.750 |
| infographic | 4.5 (2.49) | 4.18 (2.37) | Control | 0.609 |
| podcast | 3.39 (2.85) | 3.15 (2.45) | Control | 0.721 |
| video | 3.71 (2.66) | 4.21 (2.23) | EBM-CIMO | 0.439 |

## 클래스별 통계

| 클래스 | 참가자 | Control | EBM-CIMO | 세션 | 완료 | 완료율 |
|--------|--------|---------|----------|------|------|--------|
| mba6202_tue | 45명 | 20명 | 25명 | 45개 | 45개 | 100% |
| mba6202_wed | 44명 | 23명 | 21명 | 44개 | 44개 | 100% |
| honda | 19명 | 9명 | 10명 | 19개 | 19개 | 100% |

## 참가자 피드백 (40명)

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

---

> 상세 데이터는 `descriptive_stats.json` 파일을 참조하세요.
