# 기술통계 보고서 (Descriptive Statistics Report)

- **생성일시**: 2026-01-25T22:03:39.194Z
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
| 총 참가자 | 50명 |
| 총 세션 | 52개 |
| 완료 세션 | 40개 (76.9%) |

## 참가자 통계

### 조건별 배정

| 조건 | 참가자 수 | 완료 | 완료율 |
|------|----------|------|-------|
| Control | 24명 | 20명 | 83.3% |
| EBM-CIMO | 26명 | 19명 | 73.1% |

### 클래스별 분포

| 클래스 | 참가자 수 |
|--------|----------|
| mba6202_tue | 20명 |
| mba6202_wed | 30명 |

### 다중 세션 사용자 (5명)

| 이메일 | 총 세션 | 완료 | 조건 |
|--------|---------|------|------|
| ike.34@osu.edu | 2개 | 2개 | control |
| tao.612@osu.edu | 5개 | 0개 | control |
| li.8019@buckeyemail.osu.edu | 2개 | 1개 | control |
| perry.2589@buckeyemail.osu.edu | 2개 | 1개 | ebm_cimo |
| frank.827@osu.edu | 2개 | 1개 | control |

## 세션 통계

### 상태별 분포

| 상태 | 개수 |
|------|------|
| complete | 40개 |
| generating | 4개 |
| reading | 6개 |
| survey | 1개 |
| post_task | 1개 |

## 읽기 행동 통계

### 전체

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 총 소요 시간 (분) | 13.35 | 15.85 | 0.1 | 74.66 | 8.76 | 40 |
| 읽기 시간 (분) | 2.28 | 4.85 | 0 | 26.95 | 0.31 | 40 |
| 채팅 시간 (분) | 5.31 | 10.01 | 0.01 | 42.74 | 0.56 | 40 |

### 조건별 비교

| 지표 | Control M(SD) | EBM-CIMO M(SD) |
|------|---------------|----------------|
| 총 소요 시간 (분) | 10.99 (13.84) | 15.95 (17.44) |
| 읽기 시간 (분) | 1.86 (2.91) | 2.74 (6.31) |
| 채팅 시간 (분) | 2.25 (3.88) | 8.7 (13.13) |

### 리소스 사용 (focusTime >= 5초)

| 리소스 | Control (n=21) | EBM-CIMO (n=19) |
|--------|----------|----------|
| Infographics | 13명 (61.9%) | 9명 (47.4%) |
| Video | 13명 (61.9%) | 9명 (47.4%) |
| Audio/Podcast | 12명 (57.1%) | 8명 (42.1%) |
| Chat (1회 이상) | 10명 (47.6%) | 10명 (52.6%) |

## LLM 사용 통계

- **총 메시지 수**: 78개

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 세션당 메시지 수 (전체) | 1.95 | 3.42 | 0 | 17 | 0.5 | 40 |
| ㄴ Control | 1.48 | 2.17 | 0 | 8 | 0 | 21 |
| ㄴ EBM-CIMO | 2.47 | 4.35 | 0 | 17 | 1 | 19 |
| 질문 길이 (문자) | 80.59 | 82.75 | 3 | 545 | 51 | 78 |
| 응답 시간 (초) | 10.37 | 6.74 | 2.69 | 35.37 | 8.42 | 78 |

**조건 비교 (One-way ANOVA)**

| 지표 | 높은 조건 | p-value |
|------|----------|--------|
| 세션당 메시지 수 | EBM-CIMO | 0.370 |

**Chat 대화 내역 보기**

> [Chat Viewer](https://bae4147.github.io/paper-understanding-mba/chat-viewer.html) - 참가자별 LLM 대화 내역을 확인할 수 있습니다.

## 설문 통계

> **분석 기법**: One-way ANOVA (두 조건 간 평균 비교)

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.14 (0.47) | 1.11 (0.31) | Control | 0.773 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1 (0) | 1.05 (0.22) | EBM-CIMO | 0.299 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 5.38 (1.09) | 5.16 (1.31) | Control | 0.570 | 1-7점 |
| 실행 가능성 | 5.14 (1.42) | 4.79 (1.61) | Control | 0.477 | 1-7점 |

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.48 (1.1) | 4.11 (1.12) | EBM-CIMO | 0.088 |
| physicalDemand | 1.43 (0.66) | 2.26 (1.33) | EBM-CIMO | 0.018 ✓ |
| temporalDemand | 1.76 (0.87) | 2.26 (1.37) | EBM-CIMO | 0.182 |
| effort | 4.38 (1.29) | 4.47 (1.43) | EBM-CIMO | 0.835 |
| frustration | 2 (1.11) | 2.84 (1.39) | EBM-CIMO | 0.045 ✓ |
| performance | 5.67 (0.89) | 5.63 (0.87) | Control | 0.903 |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.48 (1.05) | 5.16 (1.46) | Control | 0.443 | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 5.48 (0.91) | 5.26 (1.29) | Control | 0.557 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.95 (0.72) | 5.79 (0.77) | Control | 0.504 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 5.1 (1.31) | 5.11 (1.21) | EBM-CIMO | 0.981 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.86 (0.83) | 5.63 (0.81) | Control | 0.403 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 6 (0.98) | 5.89 (0.64) | Control | 0.700 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.71 (0.88) | 5.26 (1.48) | Control | 0.256 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.67 (0.94) | 5.74 (0.71) | EBM-CIMO | 0.799 | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.71 (0.76) | 5.63 (0.87) | Control | 0.757 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 5 (1.31) | 5.16 (1.56) | EBM-CIMO | 0.737 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 5.9 (0.75) | 5.79 (1) | Control | 0.689 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 5.81 (0.85) | 5.42 (1.04) | Control | 0.214 | I explored my own ideas and interpretations related to the article. |
| questionClaims | 5.43 (0.95) | 5.32 (1.13) | Control | 0.740 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 4.71 (1.42) | 4.84 (1.56) | EBM-CIMO | 0.793 | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.57 (0.95) | 5.53 (1.27) | Control | 0.902 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 4.9 (1.15) | 5.26 (1.41) | EBM-CIMO | 0.394 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 5.19 (0.85) | 5.63 (1.09) | EBM-CIMO | 0.170 | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.19 (1.01) | 5.53 (1.04) | EBM-CIMO | 0.319 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 5.14 (0.99) | 5.63 (1.09) | EBM-CIMO | 0.155 | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5.38 (1.05) | 5.63 (1.22) | EBM-CIMO | 0.500 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### 외부 도구 사용

| 도구 | 사용자 수 | 비율 |
|------|----------|------|
| 외부 AI 도구 | 1/40명 | 2.5% |
| 외부 PDF 뷰어 | 7/40명 | 17.5% |

### LLM Trust

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| assumeClearIsAccurate | 3.71 (1.78) | 3.58 (1.46) | Control | 0.800 |  |
| relyForImportance | 2.67 (1.55) | 3.42 (1.46) | EBM-CIMO | 0.133 |  |
| relyWithoutReading | 3.81 (1.47) | 4.11 (1.62) | EBM-CIMO | 0.558 |  |
| competence | 5.57 (1.14) | 5.42 (1.18) | Control | 0.692 | Overall, the GenAI was competent and effective as a tool for assisting with reading. |
| comfortActing | 3.86 (1.49) | 3.84 (1.66) | Control | 0.977 | I have no reservations about acting on the information provided by the GenAI. |
| reliability | 4.1 (1.57) | 3.95 (1.54) | Control | 0.771 | I can always rely on the GenAI when understanding articles. |
| accuracy | 5.62 (1.21) | 5.53 (0.94) | Control | 0.795 | The information provided by the GenAI was accurate. |
| benevolence | 5.1 (1.51) | 4.58 (1.84) | Control | 0.349 | I believe the GenAI is made with my best interests in mind. |
| comfortUsing | 3.81 (1.65) | 4.05 (1.61) | EBM-CIMO | 0.649 | I have no hesitation in using the information provided by the GenAI. |
| confidentWithoutDetails | 3.62 (1.36) | 3.53 (1.73) | Control | 0.855 |  |

### LLM Usefulness

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| conceptHelp | 5.29 (1.31) | 5.58 (0.94) | EBM-CIMO | 0.437 | How helpful was the GenAI for understanding difficult concepts or terminology? |
| findingsHelp | 5.52 (1.3) | 5.58 (1.14) | EBM-CIMO | 0.890 | How helpful was the GenAI for understanding the research findings? |
| overall | 5.62 (1.36) | 5.68 (0.92) | EBM-CIMO | 0.865 | How useful was the GenAI for reading and understanding the article? |
| timeSaving | 5.9 (1.41) | 5.63 (1.35) | Control | 0.546 | How helpful was the GenAI for saving your time? |
| practicalHelp | 5.43 (1.29) | 5.74 (1.02) | EBM-CIMO | 0.423 | How helpful was the GenAI for understanding practical applications? |

### Resource Helpfulness

| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|--------|---------------|----------------|----------|--------|
| chatbot | 4.52 (2.2) | 3.84 (2.41) | Control | 0.367 |
| infographic | 4.52 (2.26) | 4.16 (2.43) | Control | 0.634 |
| podcast | 3.67 (2.53) | 3.11 (2.83) | Control | 0.522 |
| video | 4.48 (2.52) | 4.63 (2.37) | EBM-CIMO | 0.846 |

---

## Chat 사용자 대상 분석 (Chat 1회 이상 사용)

> 아래 분석은 Chat을 1회 이상 사용한 참가자만을 대상으로 합니다.

### 표본 크기

| 구분 | 인원 |
|------|------|
| 전체 | 20명 |
| Control | 10명 |
| EBM-CIMO | 10명 |

### LLM 사용 통계

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| 메시지 수 | 3.1 (2.21) | 4.7 (5.04) | EBM-CIMO | 0.395 |

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.2 (0.6) | 1.1 (0.3) | Control | 0.660 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1 (0) | 1 (0) | 동일 | 1.000 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 5.1 (1.14) | 4.9 (1.04) | Control | 0.702 | 1-7점 |
| 실행 가능성 | 4.4 (1.5) | 4.7 (1.35) | EBM-CIMO | 0.660 | 1-7점 |

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.2 (1.25) | 3.9 (1.04) | EBM-CIMO | 0.213 |
| physicalDemand | 1.5 (0.5) | 1.9 (1.04) | EBM-CIMO | 0.314 |
| temporalDemand | 1.7 (0.9) | 2.1 (1.14) | EBM-CIMO | 0.418 |
| effort | 4.8 (1.33) | 4.1 (1.45) | Control | 0.299 |
| frustration | 2 (1.1) | 2 (0.77) | 동일 | 1.000 |
| performance | 5.8 (0.75) | 5.7 (0.9) | Control | 0.801 |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.7 (0.78) | 5.3 (1.55) | Control | 0.499 | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 5.5 (0.81) | 5.1 (1.64) | Control | 0.520 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.8 (0.6) | 5.9 (0.83) | EBM-CIMO | 0.773 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 5 (1.34) | 5.1 (1.3) | EBM-CIMO | 0.874 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.9 (0.7) | 5.5 (0.92) | Control | 0.314 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 6.1 (1.04) | 6 (0.77) | Control | 0.820 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.7 (0.78) | 5.4 (1.5) | Control | 0.601 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.4 (0.8) | 5.7 (0.78) | EBM-CIMO | 0.431 | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.7 (0.64) | 5.7 (0.9) | 동일 | 1.000 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 4.6 (1.2) | 5 (1.79) | EBM-CIMO | 0.584 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 6 (0.77) | 5.7 (1.1) | Control | 0.512 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 5.6 (0.8) | 5.6 (1.02) | 동일 | 1.000 | I explored my own ideas and interpretations related to the article. |
| questionClaims | 5.6 (0.8) | 5.5 (1.02) | Control | 0.820 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 4.1 (1.37) | 4.5 (1.91) | EBM-CIMO | 0.616 | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.4 (1.02) | 6 (1.18) | EBM-CIMO | 0.264 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 4.9 (0.94) | 5.6 (1.5) | EBM-CIMO | 0.251 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 4.9 (0.94) | 5.9 (1.04) | EBM-CIMO | 0.047 ✓ | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.3 (0.64) | 5.8 (0.98) | EBM-CIMO | 0.216 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 4.8 (0.87) | 6.1 (0.94) | EBM-CIMO | 0.007 ✓ | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5.4 (0.92) | 5.9 (1.37) | EBM-CIMO | 0.376 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### LLM Trust

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| assumeClearIsAccurate | 3.1 (1.64) | 3.4 (1.56) | EBM-CIMO | 0.696 |  |
| relyForImportance | 2.3 (1.19) | 3.3 (1.62) | EBM-CIMO | 0.152 |  |
| relyWithoutReading | 3.4 (1.28) | 4.4 (1.85) | EBM-CIMO | 0.200 |  |
| competence | 5.8 (0.75) | 5.3 (1.35) | Control | 0.343 | Overall, the GenAI was competent and effective as a tool for assisting with reading. |
| comfortActing | 3.7 (1.68) | 3.8 (1.94) | EBM-CIMO | 0.908 | I have no reservations about acting on the information provided by the GenAI. |
| reliability | 3.6 (1.56) | 3.6 (1.91) | 동일 | 1.000 | I can always rely on the GenAI when understanding articles. |
| accuracy | 5.7 (1) | 5.2 (1.08) | Control | 0.322 | The information provided by the GenAI was accurate. |
| benevolence | 4.9 (1.22) | 4.3 (1.85) | Control | 0.427 | I believe the GenAI is made with my best interests in mind. |
| comfortUsing | 3.3 (1.73) | 3.9 (1.76) | EBM-CIMO | 0.475 | I have no hesitation in using the information provided by the GenAI. |
| confidentWithoutDetails | 3.4 (0.92) | 3 (1.73) | Control | 0.548 |  |

### LLM Usefulness

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| conceptHelp | 5.1 (0.83) | 5.5 (1.02) | EBM-CIMO | 0.375 | How helpful was the GenAI for understanding difficult concepts or terminology? |
| findingsHelp | 5.4 (0.92) | 5.5 (1.36) | EBM-CIMO | 0.857 | How helpful was the GenAI for understanding the research findings? |
| overall | 5.7 (0.9) | 5.6 (1.02) | Control | 0.828 | How useful was the GenAI for reading and understanding the article? |
| timeSaving | 6 (0.89) | 5.3 (1.35) | Control | 0.210 | How helpful was the GenAI for saving your time? |
| practicalHelp | 5.3 (0.9) | 6 (0.77) | EBM-CIMO | 0.094 | How helpful was the GenAI for understanding practical applications? |

### Resource Helpfulness

| 리소스 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|--------|---------------|----------------|----------|--------|
| chatbot | 5.2 (0.98) | 5.4 (1.2) | EBM-CIMO | 0.703 |
| infographic | 4 (2.28) | 2.7 (2.24) | Control | 0.238 |
| podcast | 2.9 (2.34) | 1.6 (2.54) | Control | 0.274 |
| video | 3.5 (2.58) | 3.7 (2.76) | EBM-CIMO | 0.875 |

## 클래스별 통계

| 클래스 | 참가자 | Control | EBM-CIMO | 세션 | 완료 | 완료율 |
|--------|--------|---------|----------|------|------|--------|
| mba6202_tue | 20명 | 10명 | 10명 | 23개 | 16개 | 69.6% |
| mba6202_wed | 30명 | 14명 | 16명 | 29개 | 24개 | 82.8% |

## 참가자 피드백 (19명)

### 1. ike.34@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_tue

> I like seeing the questions before starting an assignment so I can know what to look for and what to think about as I am reading the article. I wish I had picked a better article if what you wanted me to do was relate it to myself directly and not to a problem I want to resolve in my work place. I also am not sure what you mean when you want me to apply this to my work place. Realistically, no one at my job would pay e any attention. I am not high enough in leadership to effect real change. Do you mean to ask how I would effect these changes at work if I had the power to do so? I guess I am a little unclear if you want me to imagine what I can actually do or what I could potentially do. What I can actually do is quite small in the position I am in now, but what I could potentially do is as big as my imagination.

### 2. ike.34@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_tue

> I enjoyed the assignment!

### 3. stalnaker.63@buckeyemail.osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_tue

> NA

### 4. petite.9@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> The AI chatbot gave some interesting and practical information that sounded reasonable, but the questions it was asking seemed to go beyond the scope of the paper.

### 5. murphy.1603@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> Good, what do we submit to carmen?

### 6. yoho.18@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_tue

> I enjoyed utilizing the AI capabilities to relay the information of the article.

### 7. perry.2589@buckeyemail.osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> This was actually kind of cool.

### 8. kelly.470@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> Other than the platform itself being a little clunky at times, I think this is an amazing resource, especially for myself being in the healthcare field. I would have loved to have access to this in the past and would look forward to having access to it in the future!

### 9. mally.9@buckeyemail.osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> N/A

### 10. erin_rinto@yahoo.com

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_tue

> I thought the article was relevant.  The journal has an IF of 10.55, which I thought indicated it was used to support the arguments contained and to support its conclusions. I think it is hard to generalize the two studies within the article, as they were surveys sent to the corporations, and the return rate was only 54%. I don't know if there is a better way to assess this, but I found the conclusions relevant and consistent with my professional experiences. The article states that the results were statistically significant, but I think to be used, the N needs to be much larger.

### 11. spatholt.4@osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_tue

> Interesting assignment. I wonder if the chat bot was backed by a gemini api key? The infographic seemed reminiscent of NotebookLM and I noticed output structures that looked Gemini-familiar in the chat.

### 12. loudenslager.17@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_tue

> This tool was very cool to use, and made doing this assignment more interesting.

### 13. martinez.554@buckeyemail.osu.edu

ㄴ **조건**: EBM-CIMO
ㄴ **클래스**: mba6202_wed

> The chatbot was very conversational and seemed well built.

### 14. shank.189@osu.edu

ㄴ **조건**: Control
ㄴ **클래스**: mba6202_wed

> I was a little unclear on the first few questions about the key differences between the article and my current situation.

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

---

> 상세 데이터는 `descriptive_stats.json` 파일을 참조하세요.
