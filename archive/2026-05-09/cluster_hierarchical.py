#!/usr/bin/env python3
"""
Hierarchical clustering (Hamming distance) on binary media use patterns.

Steps:
  1. Pattern frequency table (2^4 = 16 combinations)
  2. Dendrogram — pick k visually
  3. Cluster assignment at k=2,3,4 for inspection
"""

import os
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from scipy.spatial.distance import pdist, squareform
from scipy.cluster.hierarchy import linkage, dendrogram, fcluster

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SAMPLE_PATH = os.path.join(SCRIPT_DIR, 'analysis_sample.csv')

MEDIA_COLS = ['used_chat', 'used_audio', 'used_video', 'used_infog']
MEDIA_LABELS = ['Chat', 'Audio', 'Video', 'Infog']

def main():
    df = pd.read_csv(SAMPLE_PATH)
    X = df[MEDIA_COLS].values  # (94, 4) binary matrix

    # ── 1. 패턴 빈도표 ─────────────────────────────────────────────────────────
    pattern_df = (
        df[MEDIA_COLS]
        .astype(int)
        .astype(str)
        .apply(lambda r: ''.join(r), axis=1)
        .value_counts()
        .reset_index()
    )
    pattern_df.columns = ['pattern', 'n']
    pattern_df['chat'] = pattern_df['pattern'].str[0]
    pattern_df['audio'] = pattern_df['pattern'].str[1]
    pattern_df['video'] = pattern_df['pattern'].str[2]
    pattern_df['infog'] = pattern_df['pattern'].str[3]

    print("=" * 55)
    print("패턴 빈도표 (chat·audio·video·infog, 1=사용)")
    print("=" * 55)
    print(f"{'패턴':>8}  {'chat':>5}{'audio':>6}{'video':>6}{'infog':>6}  {'n':>4}")
    print("-" * 55)
    for _, row in pattern_df.iterrows():
        print(f"  {row['pattern']:>6}    {row['chat']:>4}  {row['audio']:>4}  "
              f"{row['video']:>4}  {row['infog']:>4}  {int(row['n']):>4}")
    print(f"\n총 패턴 종류: {len(pattern_df)}가지 / 94명\n")

    # ── 2. Hierarchical clustering (Hamming distance, complete linkage) ────────
    dist_condensed = pdist(X, metric='hamming')   # 정규화된 Hamming (÷4)
    Z = linkage(dist_condensed, method='complete')

    fig, ax = plt.subplots(figsize=(14, 5))
    dendrogram(
        Z,
        ax=ax,
        leaf_rotation=90,
        leaf_font_size=7,
        color_threshold=0.5,   # 기본 색상 구분선
    )
    ax.set_title('Hierarchical Clustering Dendrogram\n(Hamming distance, complete linkage)', fontsize=13)
    ax.set_xlabel('Participant index')
    ax.set_ylabel('Hamming distance (normalized)')
    ax.axhline(y=0.75, color='red',    linestyle='--', linewidth=1, label='k=2 cut')
    ax.axhline(y=0.50, color='orange', linestyle='--', linewidth=1, label='k=3 cut')
    ax.axhline(y=0.25, color='green',  linestyle='--', linewidth=1, label='k=4 cut')
    ax.legend(fontsize=9)
    plt.tight_layout()
    out_path = os.path.join(SCRIPT_DIR, 'dendrogram.png')
    plt.savefig(out_path, dpi=150)
    print(f"덴드로그램 저장: {out_path}\n")

    # ── 3. k=2,3,4 클러스터 프로파일 ──────────────────────────────────────────
    for k in [2, 3, 4]:
        labels = fcluster(Z, k, criterion='maxclust')
        df_k = df.copy()
        df_k['cluster'] = labels

        print("=" * 55)
        print(f"k={k} 클러스터 프로파일")
        print("=" * 55)
        profile = (
            df_k.groupby('cluster')[MEDIA_COLS]
            .mean()
            .round(2)
        )
        sizes = df_k['cluster'].value_counts().sort_index().rename('n')
        profile = profile.join(sizes)
        profile.columns = MEDIA_LABELS + ['n']
        print(profile.to_string())
        print()

if __name__ == '__main__':
    main()
