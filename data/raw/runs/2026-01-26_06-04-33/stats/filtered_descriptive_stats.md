# 기술통계 보고서 (Descriptive Statistics Report)

- **생성일시**: 2026-01-25T21:04:33.447Z
- **실험 시작**: 2026-01-20T19:00:00.000Z

## 목차

1. [요약](#요약)
2. [참가자 통계](#참가자-통계)
3. [세션 통계](#세션-통계)
4. [읽기 행동 통계](#읽기-행동-통계)
5. [LLM 사용 통계](#llm-사용-통계)
6. [설문 통계](#설문-통계)
   - [NASA-TLX](#nasa-tlx-1-7점)
   - [Self-Efficacy](#self-efficacy-1-7점)
   - [Post Task](#post-task)
7. [Chat 사용자 대상 분석](#chat-사용자-대상-분석-chat-1회-이상-사용)
8. [클래스별 통계](#클래스별-통계)
9. [참가자 피드백](#참가자-피드백)

## 요약

| 항목 | 값 |
|------|----|
| 총 참가자 | 39명 |
| 총 세션 | 39개 |
| 완료 세션 | 39개 (100%) |

## 참가자 통계

### 조건별 배정

| 조건 | 참가자 수 | 완료 | 완료율 |
|------|----------|------|-------|
| Control | 20명 | 20명 | 100% |
| EBM-CIMO | 19명 | 19명 | 100% |

### 클래스별 분포

| 클래스 | 참가자 수 |
|--------|----------|
| mba6202_tue | 15명 |
| mba6202_wed | 24명 |

## 세션 통계

### 상태별 분포

| 상태 | 개수 |
|------|------|
| complete | 39개 |

## 읽기 행동 통계

### 전체

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 총 소요 시간 (분) | 13.45 | 16.04 | 0.1 | 74.66 | 8.28 | 39 |
| 읽기 시간 (분) | 2.33 | 4.9 | 0 | 26.95 | 0.33 | 39 |
| 채팅 시간 (분) | 5.45 | 10.1 | 0.01 | 42.74 | 0.57 | 39 |

### 조건별 비교

| 지표 | Control M(SD) | EBM-CIMO M(SD) |
|------|---------------|----------------|
| 총 소요 시간 (분) | 11.08 (14.17) | 15.95 (17.44) |
| 읽기 시간 (분) | 1.95 (2.96) | 2.74 (6.31) |
| 채팅 시간 (분) | 2.36 (3.95) | 8.7 (13.13) |

### 리소스 사용 (focusTime >= 5초)

| 리소스 | Control (n=20) | EBM-CIMO (n=19) |
|--------|----------|----------|
| Infographics | 12명 (60%) | 9명 (47.4%) |
| Video | 12명 (60%) | 9명 (47.4%) |
| Audio/Podcast | 11명 (55%) | 8명 (42.1%) |
| Chat (1회 이상) | 10명 (50%) | 10명 (52.6%) |

## LLM 사용 통계

- **총 메시지 수**: 78개

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 세션당 메시지 수 (전체) | 2 | 3.45 | 0 | 17 | 1 | 39 |
| ㄴ Control | 1.55 | 2.2 | 0 | 8 | 0.5 | 20 |
| ㄴ EBM-CIMO | 2.47 | 4.35 | 0 | 17 | 1 | 19 |
| 질문 길이 (문자) | 80.59 | 82.75 | 3 | 545 | 51 | 78 |
| 응답 시간 (초) | 10.37 | 6.74 | 2.69 | 35.37 | 8.42 | 78 |

**조건 비교 (One-way ANOVA)**

| 지표 | 높은 조건 | p-value |
|------|----------|--------|
| 세션당 메시지 수 | EBM-CIMO | 0.417 |

## 설문 통계

> **분석 기법**: One-way ANOVA (두 조건 간 평균 비교)

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.55 (1.07) | 4.11 (1.12) | EBM-CIMO | 0.132 |
| physicalDemand | 1.45 (0.67) | 2.26 (1.33) | EBM-CIMO | 0.023 ✓ |
| temporalDemand | 1.75 (0.89) | 2.26 (1.37) | EBM-CIMO | 0.182 |
| effort | 4.4 (1.32) | 4.47 (1.43) | EBM-CIMO | 0.871 |
| frustration | 2.05 (1.12) | 2.84 (1.39) | EBM-CIMO | 0.063 |
| performance | 5.65 (0.91) | 5.63 (0.87) | Control | 0.950 |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.5 (1.07) | 5.16 (1.46) | Control | 0.420 | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 5.5 (0.92) | 5.26 (1.29) | Control | 0.523 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.95 (0.74) | 5.79 (0.77) | Control | 0.521 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 5.05 (1.32) | 5.11 (1.21) | EBM-CIMO | 0.895 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.85 (0.85) | 5.63 (0.81) | Control | 0.430 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 6 (1) | 5.89 (0.64) | Control | 0.707 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.7 (0.9) | 5.26 (1.48) | Control | 0.283 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.65 (0.96) | 5.74 (0.71) | EBM-CIMO | 0.758 | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.7 (0.78) | 5.63 (0.87) | Control | 0.803 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 5 (1.34) | 5.16 (1.56) | EBM-CIMO | 0.743 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 5.9 (0.77) | 5.79 (1) | Control | 0.708 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 5.75 (0.83) | 5.42 (1.04) | Control | 0.294 | I explored my own ideas and interpretations related to the article. |
| questionClaims | 5.4 (0.97) | 5.32 (1.13) | Control | 0.808 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 4.7 (1.45) | 4.84 (1.56) | EBM-CIMO | 0.776 | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.55 (0.97) | 5.53 (1.27) | Control | 0.950 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 4.9 (1.18) | 5.26 (1.41) | EBM-CIMO | 0.400 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 5.2 (0.87) | 5.63 (1.09) | EBM-CIMO | 0.190 | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.15 (1.01) | 5.53 (1.04) | EBM-CIMO | 0.273 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 5.15 (1.01) | 5.63 (1.09) | EBM-CIMO | 0.171 | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5.4 (1.07) | 5.63 (1.22) | EBM-CIMO | 0.543 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### 외부 도구 사용

| 도구 | 사용자 수 | 비율 |
|------|----------|------|
| 외부 AI 도구 | 1/39명 | 2.6% |
| 외부 PDF 뷰어 | 7/39명 | 17.9% |

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.15 (0.48) | 1.11 (0.31) | Control | 0.738 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1 (0) | 1.05 (0.22) | EBM-CIMO | 0.311 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 5.35 (1.11) | 5.16 (1.31) | Control | 0.632 | 1-7점 |
| 실행 가능성 | 5.1 (1.45) | 4.79 (1.61) | Control | 0.540 | 1-7점 |

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

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.2 (0.6) | 1.1 (0.3) | Control | 0.660 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1 (0) | 1 (0) | 동일 | 1.000 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 5.1 (1.14) | 4.9 (1.04) | Control | 0.702 | 1-7점 |
| 실행 가능성 | 4.4 (1.5) | 4.7 (1.35) | EBM-CIMO | 0.660 | 1-7점 |

## 클래스별 통계

| 클래스 | 참가자 | Control | EBM-CIMO | 세션 | 완료 | 완료율 |
|--------|--------|---------|----------|------|------|--------|
| mba6202_tue | 15명 | 8명 | 7명 | 15개 | 15개 | 100% |
| mba6202_wed | 24명 | 12명 | 12명 | 24개 | 24개 | 100% |

## 참가자 피드백 (18명)

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

---

> 상세 데이터는 `descriptive_stats.json` 파일을 참조하세요.
