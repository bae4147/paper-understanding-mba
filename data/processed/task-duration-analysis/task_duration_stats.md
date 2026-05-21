# Statistics Report

## Overview

과제 수행 시간 분석

**두 가지 측정 방식:**
1. **Total Duration**: `session.startedAt` ~ `reading.completedAt` (세션 생성부터 완료까지, 자료 생성 대기 시간 포함)
2. **Reading Duration**: `reading.startedAt` ~ `reading.completedAt` (순수 읽기 시간)

**필터링 규칙:**
- complete 세션이 1개 이상 있는 사용자만 포함
- complete 세션이 2개 이상이면 첫 번째 complete 세션만 포함

## 1. Total Duration (session.startedAt ~ reading.completedAt)

### Summary (minutes)

| Metric | Value |
|--------|-------|
| N | 87 |
| Min | 3.53 |
| Max | 928.56 |
| Median | 14.08 |
| Mean | 39.58 |

### By Condition (minutes)

| Condition | N | Min | Max | Median | Mean |
|-----------|---|-----|-----|--------|------|
| control | 42 | 3.53 | 928.56 | 11.52 | 44.69 |
| ebm_cimo | 45 | 3.78 | 383.23 | 17.63 | 34.81 |

## 2. Reading Duration (reading.startedAt ~ reading.completedAt)

### Summary (minutes)

| Metric | Value |
|--------|-------|
| N | 87 |
| Min | 0.03 |
| Max | 373.61 |
| Median | 7.39 |
| Mean | 20.86 |

### By Condition (minutes)

| Condition | N | Min | Max | Median | Mean |
|-----------|---|-----|-----|--------|------|
| control | 42 | 0.03 | 268.34 | 5.73 | 14.89 |
| ebm_cimo | 45 | 0.35 | 373.61 | 10.5 | 26.43 |

## Individual Session Data

| Email | Condition | Total (min) | Reading (min) |
|-------|-----------|-------------|---------------|
| weaver.1081@buckeyemail.osu.edu | control | 6.57 | 0.03 |
| st-pierre.18@buckeyemail.osu.edu | control | 42.75 | 0.04 |
| oberhaus.11@buckeyemail.osu.edu | control | 3.61 | 0.09 |
| walsh.1042@osu.edu | control | 3.53 | 0.1 |
| rice.576@buckeyemail.osu.edu | control | 3.98 | 0.13 |
| mally.9@buckeyemail.osu.edu | control | 4.45 | 0.18 |
| perry.2589@buckeyemail.osu.edu | ebm_cimo | 3.78 | 0.35 |
| johnston.785@buckeyemail.osu.edu | ebm_cimo | 14.08 | 0.66 |
| fenstermacher.13@buckeyemail.osu.edu | ebm_cimo | 4.06 | 0.7 |
| garzony.3@osu.edu | ebm_cimo | 4.6 | 0.74 |
| dsa.7@buckeyemail.osu.edu | ebm_cimo | 18.22 | 0.93 |
| calhoun.318@buckeyemail.osu.edu | control | 5.65 | 0.97 |
| lomotey.1@buckeyemail.osu.edu | control | 4.65 | 1.2 |
| tao.612@osu.edu | control | 7.02 | 1.48 |
| heiser.61@buckeyemail.osu.edu | ebm_cimo | 6.47 | 1.61 |
| yannacci.1@buckeyemail.osu.edu | control | 8.74 | 1.65 |
| ernst.179@osu.edu | ebm_cimo | 24.51 | 1.74 |
| maggie.murray@osumc.edu | ebm_cimo | 5.37 | 1.74 |
| erin_rinto@yahoo.com | control | 5.87 | 1.89 |
| milks.5@osu.edu | ebm_cimo | 5.74 | 2.26 |
| rudolph.83@osu.edu | control | 88.38 | 2.44 |
| klue.2@buckeyemail.osu.edu | ebm_cimo | 6.11 | 2.65 |
| rees.164@osu.edu | control | 6.85 | 2.72 |
| turk.322@buckeyemail.osu.edu | ebm_cimo | 6.47 | 2.75 |
| zahler.15@buckeyemail.osu.edu | ebm_cimo | 6.91 | 3.15 |
| esler.20@osu.edu | control | 7.59 | 3.82 |
| wuebker.31@buckeyemail.osu.edu | control | 11.2 | 4.11 |
| stalnaker.63@buckeyemail.osu.edu | ebm_cimo | 8.56 | 4.13 |
| holzworth.19@buckeyemail.osu.edu | control | 15.65 | 4.5 |
| peters.844@osu.edu | ebm_cimo | 8.47 | 4.57 |
| li.8019@buckeyemail.osu.edu | control | 9.92 | 5.01 |
| loudenslager.17@osu.edu | control | 9.41 | 5.13 |
| mulukutla.7@buckeyemail.osu.edu | ebm_cimo | 8.96 | 5.17 |
| snider.157@osu.edu | control | 8.59 | 5.19 |
| ferris.129@osu.edu | control | 9.0 | 5.39 |
| shank.189@osu.edu | control | 9.42 | 5.4 |
| morgan.1946@osu.edu | ebm_cimo | 9.24 | 5.53 |
| jafri.30@buckeyemail.osu.edu | ebm_cimo | 11.23 | 5.77 |
| seitz.238@buckeyemail.osu.edu | control | 9.86 | 6.06 |
| ike.34@osu.edu | control | 10.25 | 6.24 |
| kylemartinod@gmail.com | ebm_cimo | 9.82 | 6.34 |
| blaine.83@buckeyemail.osu.edu | ebm_cimo | 12.02 | 6.48 |
| cutler.43@osu.edu | ebm_cimo | 10.85 | 7.19 |
| clark.2104@osu.edu | control | 10.72 | 7.39 |
| yoho.18@osu.edu | control | 11.99 | 7.88 |
| ste185@osumc.edu | control | 11.84 | 8.01 |
| kelly.470@osu.edu | ebm_cimo | 12.68 | 8.28 |
| fisher.1599@osu.edu | ebm_cimo | 12.4 | 8.73 |
| ijazi.1@buckeyemail.osu.edu | control | 928.56 | 9.38 |
| welkie.1@osu.edu | control | 13.82 | 10.1 |
| frump.6@buckeyemail.osu.edu | ebm_cimo | 14.63 | 10.5 |
| moore.4091@osu.edu | ebm_cimo | 14.33 | 10.58 |
| khoury.122@osu.edu | control | 14.85 | 10.71 |
| lang.650@osu.edu | control | 15.0 | 11.53 |
| ortizsanchez.1@buckeyemail.osu.edu | control | 15.83 | 11.86 |
| murphy.1603@osu.edu | control | 17.25 | 12.98 |
| bates.600@buckeyemail.osu.edu | control | 20.03 | 14.0 |
| mcalhaney.1@osu.edu | ebm_cimo | 17.63 | 14.27 |
| frank.827@osu.edu | control | 20.27 | 14.64 |
| minerd.11@osu.edu | control | 18.49 | 14.89 |
| sexton.358@osu.edu | control | 20.66 | 15.56 |
| westrick.48@osu.edu | ebm_cimo | 19.17 | 15.93 |
| manuel.92@buckeyemail.osu.edu | control | 20.41 | 16.86 |
| veer.3@osu.edu | ebm_cimo | 21.83 | 17.21 |
| stenger.62@osu.edu | control | 23.49 | 17.56 |
| patterson.1519@osu.edu | ebm_cimo | 25.29 | 18.0 |
| ashley.aldridge@osumc.edu | control | 32.98 | 18.23 |
| westrick.37@osu.edu | ebm_cimo | 26.25 | 18.6 |
| sifeldinragheb@gmail.com | ebm_cimo | 22.81 | 19.48 |
| cassius.hudson@osumc.edu | ebm_cimo | 23.04 | 19.55 |
| patel.6649@buckeyemail.osu.edu | ebm_cimo | 31.98 | 21.14 |
| montgomery.714@osu.edu | ebm_cimo | 31.22 | 23.39 |
| aiken.74@buckeyemail.osu.edu | ebm_cimo | 29.42 | 23.46 |
| weib03@osumc.edu | ebm_cimo | 28.9 | 25.42 |
| cuebel22@gmail.com | control | 29.42 | 26.03 |
| spatholt.4@osu.edu | ebm_cimo | 32.58 | 26.93 |
| malernee.8@buckeyemail.osu.edu | ebm_cimo | 31.42 | 27.78 |
| huang.2321@osu.edu | ebm_cimo | 43.42 | 30.46 |
| petite.9@osu.edu | ebm_cimo | 49.18 | 32.63 |
| kray.14@buckeyemail.osu.edu | ebm_cimo | 41.2 | 33.89 |
| hardy.431@buckeyemail.osu.edu | ebm_cimo | 40.03 | 36.16 |
| yarberry.4@osu.edu | ebm_cimo | 137.93 | 36.17 |
| rhill7389@gmail.com | control | 69.21 | 65.64 |
| martinez.554@buckeyemail.osu.edu | ebm_cimo | 89.03 | 74.66 |
| stoner.192@buckeyemail.osu.edu | ebm_cimo | 201.45 | 197.92 |
| davis.8182@osu.edu | control | 289.18 | 268.34 |
| enslen.4@osu.edu | ebm_cimo | 383.23 | 373.61 |