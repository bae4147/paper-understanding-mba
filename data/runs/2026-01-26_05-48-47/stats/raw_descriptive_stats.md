# 기술통계 보고서 (Descriptive Statistics Report)

- **생성일시**: 2026-01-25T20:48:47.153Z
- **실험 시작**: 2026-01-20T19:00:00.000Z

## 요약

| 항목 | 값 |
|------|----|
| 총 참가자 | 48명 |
| 총 세션 | 51개 |
| 완료 세션 | 37개 (72.5%) |

## 참가자 통계

### 조건별 배정

| 조건 | 참가자 수 | 완료 | 완료율 |
|------|----------|------|-------|
| Control | 24명 | 18명 | 75% |
| EBM-CIMO | 24명 | 18명 | 75% |

### 클래스별 분포

| 클래스 | 참가자 수 |
|--------|----------|
| mba6202_tue | 18명 |
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
| complete | 37개 |
| generating | 4개 |
| reading | 7개 |
| survey | 1개 |
| post_task | 2개 |

## 읽기 행동 통계

### 전체

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 총 소요 시간 (분) | 13.15 | 16.2 | 0.1 | 74.66 | 8.28 | 37 |
| 읽기 시간 (분) | 2.3 | 4.98 | 0 | 26.95 | 0.33 | 37 |
| 채팅 시간 (분) | 5.37 | 10.32 | 0.01 | 42.74 | 0.52 | 37 |

### 조건별 비교

| 지표 | Control M(SD) | EBM-CIMO M(SD) |
|------|---------------|----------------|
| 총 소요 시간 (분) | 10.69 (13.97) | 15.75 (17.9) |
| 읽기 시간 (분) | 1.74 (2.89) | 2.88 (6.45) |
| 채팅 시간 (분) | 1.82 (3.53) | 9.11 (13.36) |

### 리소스 사용 (focusTime >= 5초)

| 리소스 | Control (n=19) | EBM-CIMO (n=18) |
|--------|----------|----------|
| Infographics | 12명 (63.2%) | 8명 (44.4%) |
| Video | 12명 (63.2%) | 8명 (44.4%) |
| Audio/Podcast | 11명 (57.9%) | 7명 (38.9%) |
| Chat (1회 이상) | 8명 (42.1%) | 9명 (50%) |

## LLM 사용 통계

- **총 메시지 수**: 67개

| 지표 | M | SD | Min | Max | Median | n |
|------|---|----|----|-----|--------|---|
| 세션당 메시지 수 (전체) | 1.81 | 3.41 | 0 | 17 | 0 | 37 |
| ㄴ Control | 1.11 | 1.68 | 0 | 6 | 0 | 19 |
| ㄴ EBM-CIMO | 2.56 | 4.45 | 0 | 17 | 0.5 | 18 |
| 질문 길이 (문자) | 84.04 | 88.43 | 3 | 545 | 49 | 67 |
| 응답 시간 (초) | 10.96 | 7.08 | 2.69 | 35.37 | 8.94 | 67 |

**조건 비교 (One-way ANOVA)**

| 지표 | 높은 조건 | p-value |
|------|----------|--------|
| 세션당 메시지 수 | EBM-CIMO | 0.206 |

## 설문 통계

> **분석 기법**: One-way ANOVA (두 조건 간 평균 비교)

### NASA-TLX (1-7점)

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value |
|------|---------------|----------------|----------|--------|
| mentalDemand | 3.47 (1.04) | 4.06 (1.13) | EBM-CIMO | 0.122 |
| physicalDemand | 1.42 (0.67) | 2.22 (1.36) | EBM-CIMO | 0.032 ✓ |
| temporalDemand | 1.68 (0.73) | 2.22 (1.4) | EBM-CIMO | 0.159 |
| effort | 4.37 (1.35) | 4.5 (1.46) | EBM-CIMO | 0.783 |
| frustration | 1.84 (0.93) | 2.83 (1.42) | EBM-CIMO | 0.019 ✓ |
| performance | 5.63 (0.93) | 5.56 (0.83) | Control | 0.801 |

### Self-Efficacy (1-7점)

#### Reading Comprehension

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| researchDesignUnderstanding | 5.42 (1.09) | 5.06 (1.43) | Control | 0.400 | I understood the research design used in the article (e.g., survey, experiment, interviews). |
| evidenceUnderstanding | 5.47 (0.94) | 5.17 (1.26) | Control | 0.417 | I understood what evidence the authors used to support their claims. |
| overallGoal | 5.95 (0.76) | 5.72 (0.73) | Control | 0.378 | I understood the overall goal and main takeaways of the article. |
| limitationsUnderstanding | 5.11 (1.33) | 5 (1.15) | Control | 0.805 | I understood the main limitations the authors described (if any). |
| authorsReasoning | 5.79 (0.83) | 5.56 (0.76) | Control | 0.392 | I understood the authors' explanations and reasoning presented in the main text. |
| keyResultsUnderstanding | 5.95 (1) | 5.83 (0.6) | Control | 0.687 | I understood the key results/findings reported in the article. |
| sampleContextUnderstanding | 5.68 (0.92) | 5.17 (1.46) | Control | 0.216 | I understood who or what was studied (sample/context) and why that matters. |
| connectingIdeas | 5.68 (0.98) | 5.67 (0.67) | Control | 0.951 | I was able to connect different sections or ideas across the article. |
| keyTermsUnderstanding | 5.74 (0.78) | 5.56 (0.83) | Control | 0.511 | I understood the key concepts/terms used in the article. |

#### Critical Engagement

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| verifyCredibility | 4.89 (1.33) | 5.06 (1.54) | EBM-CIMO | 0.743 | I thought about how to verify the credibility of the information sources cited in the article. |
| broaderImplications | 5.84 (0.74) | 5.72 (0.99) | Control | 0.687 | I reflected on the broader implications of the article (e.g., for my team, organization, or decisions). |
| ownIdeas | 5.79 (0.83) | 5.33 (1) | Control | 0.150 | I explored my own ideas and interpretations related to the article. |
| questionClaims | 5.37 (0.98) | 5.22 (1.08) | Control | 0.678 | I questioned what I read to judge whether the claims were convincing. |
| alternativePerspectives | 4.68 (1.34) | 4.72 (1.52) | EBM-CIMO | 0.938 | I generated alternative perspectives that challenged some of the article's ideas. |

#### Applicability

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 질문 |
|------|---------------|----------------|----------|--------|------|
| decision | 5.53 (0.99) | 5.44 (1.26) | Control | 0.832 | I can make an informed decision about whether to apply these findings in my context. |
| outcomes | 4.89 (1.17) | 5.17 (1.38) | EBM-CIMO | 0.533 | I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation. |
| contextDifferences | 5.16 (0.87) | 5.56 (1.07) | EBM-CIMO | 0.235 | I can clearly identify the key differences between the research context and my own situation. |
| confidence | 5.16 (1.04) | 5.44 (1.01) | EBM-CIMO | 0.415 | I feel confident in judging the applicability of this research to my specific situation. |
| differencesImpact | 5.11 (1.02) | 5.56 (1.07) | EBM-CIMO | 0.210 | I can tell which of these differences would matter for applying the findings to my situation. |
| mechanisms | 5.32 (1.08) | 5.56 (1.21) | EBM-CIMO | 0.540 | I can judge whether the underlying mechanisms behind the study's results would also apply in my situation. |

### 외부 도구 사용

| 도구 | 사용자 수 | 비율 |
|------|----------|------|
| 외부 AI 도구 | 1/37명 | 2.7% |
| 외부 PDF 뷰어 | 6/37명 | 16.2% |

### Post Task

| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | 설명 |
|------|---------------|----------------|----------|--------|------|
| Q1 답변 개수 | 1.16 (0.49) | 1.06 (0.23) | Control | 0.437 | 실천 전략 (Strategies) |
| Q2 답변 개수 | 1 (0) | 1.06 (0.23) | EBM-CIMO | 0.311 | 맥락 전환 (Context Translation) |
| 새 전략 자신감 | 5.37 (1.13) | 5.06 (1.27) | Control | 0.446 | 1-7점 |
| 실행 가능성 | 5.16 (1.46) | 4.67 (1.56) | Control | 0.343 | 1-7점 |

## 클래스별 통계

| 클래스 | 참가자 | Control | EBM-CIMO | 세션 | 완료 | 완료율 |
|--------|--------|---------|----------|------|------|--------|
| mba6202_tue | 18명 | 10명 | 8명 | 22개 | 14개 | 63.6% |
| mba6202_wed | 30명 | 14명 | 16명 | 29개 | 23개 | 79.3% |

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
