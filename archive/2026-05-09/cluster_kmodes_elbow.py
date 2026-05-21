#!/usr/bin/env python3
"""
K-modes: elbow plot (k=1~5) + 초기값 안정성 확인
"""

import os
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from kmodes.kmodes import KModes

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SAMPLE_PATH = os.path.join(SCRIPT_DIR, 'analysis_sample.csv')
MEDIA_COLS  = ['used_chat', 'used_audio', 'used_video', 'used_infog']

N_RUNS  = 20   # 독립 실행 횟수 (안정성 확인용)
N_INIT  = 100  # 각 실행당 random init 횟수

def best_cost(X, k, n_init=N_INIT):
    km = KModes(n_clusters=k, init='random', n_init=n_init, verbose=0)
    km.fit(X)
    return km.cost_

def main():
    df = pd.read_csv(SAMPLE_PATH)
    X  = df[MEDIA_COLS].values.astype(int)

    K_RANGE = range(1, 6)

    # ── 1. 안정성: k별로 N_RUNS번 독립 실행 → cost 분포 ──────────────────────
    print(f"{'='*58}")
    print(f"  초기값 안정성 확인 (k=1~5, {N_RUNS}회 독립 실행 × {N_INIT} init)")
    print(f"{'='*58}")
    print(f"  {'k':>3}  {'min':>6}  {'mean':>6}  {'max':>6}  {'std':>6}  {'안정?':>6}")
    print(f"  {'-'*45}")

    stability = {}
    for k in K_RANGE:
        costs = [best_cost(X, k) for _ in range(N_RUNS)]
        stability[k] = costs
        is_stable = '✓' if np.std(costs) == 0 else f'±{np.std(costs):.1f}'
        print(f"  k={k}  {min(costs):>6.0f}  {np.mean(costs):>6.1f}  "
              f"{max(costs):>6.0f}  {np.std(costs):>6.2f}  {is_stable:>6}")

    # ── 2. Elbow plot ──────────────────────────────────────────────────────────
    best_costs = [min(stability[k]) for k in K_RANGE]

    fig, axes = plt.subplots(1, 2, figsize=(12, 4))

    # (a) elbow
    ax = axes[0]
    ax.plot(list(K_RANGE), best_costs, 'o-', color='steelblue', linewidth=2, markersize=8)
    for k, c in zip(K_RANGE, best_costs):
        ax.annotate(f'{c:.0f}', (k, c), textcoords='offset points',
                    xytext=(0, 10), ha='center', fontsize=10)
    ax.set_xlabel('k (클러스터 수)')
    ax.set_ylabel('Cost (낮을수록 좋음)')
    ax.set_title('Elbow Plot — K-modes Cost')
    ax.set_xticks(list(K_RANGE))
    ax.grid(axis='y', alpha=0.3)

    # cost 감소량 표시
    drops = [best_costs[i-1] - best_costs[i] for i in range(1, len(best_costs))]
    for i, drop in enumerate(drops):
        k = list(K_RANGE)[i+1]
        ax.annotate(f'Δ{drop:.0f}', xy=(k - 0.5, (best_costs[i] + best_costs[i+1])/2),
                    fontsize=8, color='gray', ha='center')

    # (b) 안정성: 실행마다 cost 분포 (boxplot)
    ax2 = axes[1]
    ax2.boxplot([stability[k] for k in K_RANGE],
                labels=[f'k={k}' for k in K_RANGE],
                patch_artist=True,
                boxprops=dict(facecolor='lightsteelblue'))
    ax2.set_xlabel('k')
    ax2.set_ylabel('Cost')
    ax2.set_title(f'초기값 안정성 ({N_RUNS}회 독립 실행)')
    ax2.grid(axis='y', alpha=0.3)

    plt.tight_layout()
    out = os.path.join(SCRIPT_DIR, 'elbow_stability.png')
    plt.savefig(out, dpi=150)
    print(f"\n그래프 저장: {out}")

    # ── 3. cost 감소율 요약 ────────────────────────────────────────────────────
    print(f"\n  {'k':>3}  {'cost':>8}  {'감소':>8}  {'감소율':>8}")
    print(f"  {'-'*35}")
    for i, k in enumerate(K_RANGE):
        c = best_costs[i]
        if i == 0:
            print(f"  k={k}  {c:>8.0f}  {'—':>8}  {'—':>8}")
        else:
            drop = best_costs[i-1] - c
            pct  = drop / best_costs[i-1] * 100
            print(f"  k={k}  {c:>8.0f}  {drop:>8.0f}  {pct:>7.1f}%")

if __name__ == '__main__':
    main()
