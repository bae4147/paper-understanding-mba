#!/usr/bin/env python3
"""
K-modes clustering on binary media use patterns (k=2, 3, 4).

- 100번 random init 후 cost 최소인 결과 채택 (초기값 민감성 완화)
- Hierarchical 결과(k=2,4)도 초기값으로 추가 시도
- 각 k에 대해 클러스터 프로파일 + cost 출력
"""

import os
import numpy as np
import pandas as pd
from kmodes.kmodes import KModes

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SAMPLE_PATH = os.path.join(SCRIPT_DIR, 'analysis_sample.csv')

MEDIA_COLS   = ['used_chat', 'used_audio', 'used_video', 'used_infog']
MEDIA_LABELS = ['Chat', 'Audio', 'Video', 'Infog']

# Hierarchical k=2,4 결과를 초기 centroid로 사용
HIER_CENTROIDS = {
    2: np.array([[1, 0, 0, 0],   # cluster 1: chat-only (video=0)
                 [1, 1, 1, 1]]), # cluster 2: multi-media (video=1)
    4: np.array([[1, 0, 0, 0],   # cluster 1: chat-only
                 [0, 1, 0, 1],   # cluster 2: audio+infog
                 [1, 1, 1, 1],   # cluster 3: all media
                 [0, 0, 1, 1]]), # cluster 4: video-centered no chat
}

def run_kmodes(X, k, n_init=100):
    best_km, best_cost = None, np.inf

    # random init 100회
    for _ in range(n_init):
        km = KModes(n_clusters=k, init='random', n_init=1, verbose=0)
        km.fit(X)
        if km.cost_ < best_cost:
            best_cost, best_km = km.cost_, km

    # hierarchical centroid init (k=2,4만)
    if k in HIER_CENTROIDS:
        km = KModes(n_clusters=k, init=HIER_CENTROIDS[k], n_init=1, verbose=0)
        km.fit(X)
        if km.cost_ < best_cost:
            best_cost, best_km = km.cost_, km

    return best_km, best_cost


def print_profile(km, df, k):
    labels = km.labels_
    df_k = df.copy()
    df_k['cluster'] = labels + 1  # 1-indexed

    print(f"\n{'='*58}")
    print(f"  K-modes k={k}   (cost={km.cost_:.0f})")
    print(f"{'='*58}")
    print(f"  {'클러스터':>5}  {'Chat':>5}  {'Audio':>5}  {'Video':>5}  {'Infog':>5}  {'n':>4}")
    print(f"  {'-'*50}")

    for c in sorted(df_k['cluster'].unique()):
        sub = df_k[df_k['cluster'] == c]
        means = sub[MEDIA_COLS].mean()
        n = len(sub)
        bar = ''.join('■' if means[col] >= 0.5 else '□' for col in MEDIA_COLS)
        print(f"  클러스터{c}  {means['used_chat']:>5.2f}  {means['used_audio']:>5.2f}  "
              f"{means['used_video']:>5.2f}  {means['used_infog']:>5.2f}  {n:>4}   {bar}")

    return df_k


def main():
    df = pd.read_csv(SAMPLE_PATH)
    X  = df[MEDIA_COLS].values.astype(int)

    results = {}
    for k in [2, 3, 4]:
        print(f"k={k} 실행 중...", end=' ', flush=True)
        km, cost = run_kmodes(X, k)
        print(f"완료 (cost={cost:.0f})")
        df_k = print_profile(km, df, k)
        results[k] = (km, df_k)

    # ── cost 비교 (k 선택 참고용) ──────────────────────────────────────────────
    print(f"\n{'='*58}")
    print("  Cost 비교  (낮을수록 클러스터 내 응집도 높음)")
    print(f"  {'k':>4}  {'cost':>8}  {'cost 감소':>10}")
    print(f"  {'-'*35}")
    prev_cost = None
    for k in [2, 3, 4]:
        km, _ = results[k]
        drop = f"-{prev_cost - km.cost_:.0f}" if prev_cost else "—"
        print(f"  k={k}   {km.cost_:>8.0f}  {drop:>10}")
        prev_cost = km.cost_

    print(f"\n■=사용(≥0.5), □=미사용(<0.5)")


if __name__ == '__main__':
    main()
