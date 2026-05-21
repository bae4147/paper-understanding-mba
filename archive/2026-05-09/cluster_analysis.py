#!/usr/bin/env python3
"""
K-modes (k=2,3,4): 클러스터 프로파일 시각화 + ANOVA
"""

import os
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from scipy import stats
from kmodes.kmodes import KModes

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SAMPLE_PATH = os.path.join(SCRIPT_DIR, 'analysis_sample.csv')

MEDIA_COLS = ['used_chat', 'used_audio', 'used_video', 'used_infog']

# ── DV 정의 ───────────────────────────────────────────────────────────────────
DV_GROUPS = {
    'Self-Efficacy: OC': [
        ('S3_se_oc_overallGoal',               'OC: Overall Goal'),
        ('S3_se_oc_authorsReasoning',           'OC: Authors Reasoning'),
        ('S3_se_oc_connectingIdeas',            'OC: Connecting Ideas'),
        ('S3_se_oc_evidenceUnderstanding',      'OC: Evidence Understanding'),
        ('S3_se_oc_keyResultsUnderstanding',    'OC: Key Results'),
        ('S3_se_oc_keyTermsUnderstanding',      'OC: Key Terms'),
        ('S3_se_oc_researchDesignUnderstanding','OC: Research Design'),
        ('S3_se_oc_sampleContextUnderstanding', 'OC: Sample/Context'),
        ('S3_se_oc_limitationsUnderstanding',   'OC: Limitations'),
    ],
    'Self-Efficacy: CE': [
        ('S3_se_ce_ownIdeas',              'CE: Own Ideas'),
        ('S3_se_ce_alternativePerspectives','CE: Alternative Perspectives'),
        ('S3_se_ce_verifyCredibility',     'CE: Verify Credibility'),
        ('S3_se_ce_questionClaims',        'CE: Question Claims'),
        ('S3_se_ce_broaderImplications',   'CE: Broader Implications'),
    ],
    'Self-Efficacy: AP': [
        ('S3_se_ap_contextDifferences', 'AP: Context Differences'),
        ('S3_se_ap_differencesImpact',  'AP: Differences Impact'),
        ('S3_se_ap_mechanisms',         'AP: Mechanisms'),
        ('S3_se_ap_outcomes',           'AP: Outcomes'),
        ('S3_se_ap_confidence',         'AP: Confidence'),
        ('S3_se_ap_decision',           'AP: Decision'),
    ],
    'NASA-TLX': [
        ('S3_nasa_mentalDemand',   'Mental Demand'),
        ('S3_nasa_physicalDemand', 'Physical Demand'),
        ('S3_nasa_temporalDemand', 'Temporal Demand'),
        ('S3_nasa_performance',    'Performance'),
        ('S3_nasa_effort',         'Effort'),
        ('S3_nasa_frustration',    'Frustration'),
    ],
    'LLM Usefulness': [
        ('S3_llmUsefulness_overall',       'Overall'),
        ('S3_llmUsefulness_conceptHelp',   'Concept Help'),
        ('S3_llmUsefulness_findingsHelp',  'Findings Help'),
        ('S3_llmUsefulness_practicalHelp', 'Practical Help'),
        ('S3_llmUsefulness_timeSaving',    'Time Saving'),
    ],
    'LLM Trust': [
        ('S3_llmTrust_competence',           'Competence'),
        ('S3_llmTrust_accuracy',             'Accuracy'),
        ('S3_llmTrust_benevolence',          'Benevolence'),
        ('S3_llmTrust_reliability',          'Reliability'),
        ('S3_llmTrust_comfortActing',        'Comfort Acting'),
        ('S3_llmTrust_comfortUsing',         'Comfort Using'),
        ('S3_llmTrust_relyWithoutReading',   'Rely w/o Reading'),
        ('S3_llmTrust_assumeClearIsAccurate','Assume Clear=Accurate'),
        ('S3_llmTrust_confidentWithoutDetails','Confident w/o Details'),
        ('S3_llmTrust_relyForImportance',    'Rely for Importance'),
    ],
    'Post-Task': [
        ('S3_postTask_implementationLikelihood', 'Implementation Likelihood'),
        ('S3_postTask_newStrategyConfidence',    'New Strategy Confidence'),
    ],
}

CLUSTER_COLORS = {
    2: ['#4C72B0', '#DD8452'],
    3: ['#4C72B0', '#DD8452', '#55A868'],
    4: ['#4C72B0', '#DD8452', '#55A868', '#C44E52'],
}

def eta_squared(groups):
    all_vals = np.concatenate(groups)
    grand_mean = all_vals.mean()
    ss_between = sum(len(g) * (g.mean() - grand_mean)**2 for g in groups)
    ss_total   = sum((v - grand_mean)**2 for v in all_vals)
    return ss_between / ss_total if ss_total > 0 else 0

def fit_kmodes(X, k, n_init=100):
    km = KModes(n_clusters=k, init='random', n_init=n_init, verbose=0)
    km.fit(X)
    return km

def sig_label(p):
    if p < .001: return '***'
    if p < .01:  return '**'
    if p < .05:  return '*'
    if p < .10:  return '†'
    return ''

# ── 클러스터 이름 (해석) ───────────────────────────────────────────────────────
CLUSTER_NAMES = {
    2: {1: 'Multi-media', 2: 'Chat-only'},
    3: {1: 'Video-centered\n(no chat)', 2: 'Chat-only', 3: 'Full\nMulti-media'},
    4: {1: 'Chat-only', 2: 'No-chat\nMulti-media', 3: 'Full\nMulti-media', 4: 'Minimal\nuse'},
}

def get_cluster_name(k, label, profile):
    """프로파일 기반으로 클러스터 이름 자동 할당"""
    return CLUSTER_NAMES.get(k, {}).get(label, f'C{label}')


def main():
    df = pd.read_csv(SAMPLE_PATH)
    X  = df[MEDIA_COLS].values.astype(int)

    results = {}
    for k in [2, 3, 4]:
        km = fit_kmodes(X, k)
        df[f'cluster_k{k}'] = km.labels_ + 1
        results[k] = km

    # ── 1. 클러스터 프로파일 시각화 ───────────────────────────────────────────
    fig, axes = plt.subplots(1, 3, figsize=(15, 4.5))
    media_names = ['Chat', 'Audio', 'Video', 'Infog']
    x = np.arange(len(media_names))
    width_base = 0.6

    for ax_i, k in enumerate([2, 3, 4]):
        ax = axes[ax_i]
        colors = CLUSTER_COLORS[k]
        cluster_col = f'cluster_k{k}'
        clusters = sorted(df[cluster_col].unique())
        n_c = len(clusters)
        width = width_base / n_c

        for i, c in enumerate(clusters):
            sub = df[df[cluster_col] == c]
            means = sub[MEDIA_COLS].mean().values
            n = len(sub)
            offset = (i - (n_c - 1) / 2) * width
            bars = ax.bar(x + offset, means, width * 0.9,
                          color=colors[i], alpha=0.85,
                          label=f'C{c} (n={n})')
            # 값 표시
            for bar, val in zip(bars, means):
                if val >= 0.05:
                    ax.text(bar.get_x() + bar.get_width()/2,
                            bar.get_height() + 0.02,
                            f'{val:.2f}', ha='center', va='bottom',
                            fontsize=7.5, color='#333333')

        ax.set_title(f'k={k}', fontsize=13, fontweight='bold')
        ax.set_xticks(x)
        ax.set_xticklabels(media_names, fontsize=11)
        ax.set_ylim(0, 1.18)
        ax.set_ylabel('Proportion using medium' if ax_i == 0 else '')
        ax.axhline(0.5, color='gray', linestyle='--', linewidth=0.8, alpha=0.5)
        ax.legend(fontsize=8.5, loc='upper right')
        ax.grid(axis='y', alpha=0.25)
        ax.spines[['top','right']].set_visible(False)

    fig.suptitle('K-modes Cluster Profiles: Media Use Patterns (n=94)',
                 fontsize=14, fontweight='bold', y=1.01)
    plt.tight_layout()
    profile_path = os.path.join(SCRIPT_DIR, 'cluster_profiles.png')
    plt.savefig(profile_path, dpi=150, bbox_inches='tight')
    plt.close()
    print(f"프로파일 그림 저장: {profile_path}")

    # ── 2. ANOVA ──────────────────────────────────────────────────────────────
    md_lines = []
    md_lines.append('# Cluster ANOVA Results — K-modes (k=2, 3, 4)\n')
    md_lines.append(f'**Data:** `analysis_sample.csv` (n=94)  \n')
    md_lines.append('`*` p<.05, `**` p<.01, `***` p<.001, `†` p<.10\n')

    for k in [2, 3, 4]:
        cluster_col = f'cluster_k{k}'
        clusters = sorted(df[cluster_col].unique())
        sizes = df[cluster_col].value_counts().sort_index()

        md_lines.append(f'\n---\n\n## k={k}\n')
        # 클러스터 크기 헤더
        size_str = ', '.join(f'C{c}: n={sizes[c]}' for c in clusters)
        md_lines.append(f'**클러스터 구성:** {size_str}\n')

        # 클러스터별 media 프로파일
        md_lines.append('\n### Media Use Profile\n')
        md_lines.append('| 클러스터 | Chat | Audio | Video | Infog |\n')
        md_lines.append('|---|---|---|---|---|\n')
        for c in clusters:
            sub = df[df[cluster_col] == c]
            m = sub[MEDIA_COLS].mean()
            md_lines.append(
                f'| C{c} (n={len(sub)}) '
                f'| {m["used_chat"]:.2f} | {m["used_audio"]:.2f} '
                f'| {m["used_video"]:.2f} | {m["used_infog"]:.2f} |\n'
            )

        for group_name, dvs in DV_GROUPS.items():
            md_lines.append(f'\n### {group_name}\n')
            # 헤더
            header_means = ' | '.join(f'C{c} M (SD)' for c in clusters)
            md_lines.append(f'| DV | {header_means} | F | p | η² |\n')
            md_lines.append('|' + '---|' * (len(clusters) + 4) + '\n')

            for col, label in dvs:
                if col not in df.columns:
                    continue
                groups = [df[df[cluster_col] == c][col].dropna().values
                          for c in clusters]
                if any(len(g) < 2 for g in groups):
                    continue

                F, p = stats.f_oneway(*groups)
                eta2 = eta_squared(groups)
                sig  = sig_label(p)

                means_str = ' | '.join(
                    f'{g.mean():.2f} ({g.std():.2f})' for g in groups
                )
                bold = '**' if sig else ''
                md_lines.append(
                    f'| {bold}{label}{bold} | {means_str} '
                    f'| {bold}{F:.2f}{bold} | {bold}{p:.3f}{sig}{bold} '
                    f'| {eta2:.3f} |\n'
                )

    md_path = os.path.join(SCRIPT_DIR, 'cluster_anova.md')
    with open(md_path, 'w') as f:
        f.writelines(md_lines)
    print(f"ANOVA 결과 저장: {md_path}")

    # ── 3. 유의한 결과 요약 출력 ──────────────────────────────────────────────
    print('\n' + '='*60)
    print('유의한 결과 요약 (p<.05 또는 p<.10†)')
    print('='*60)
    for k in [2, 3, 4]:
        cluster_col = f'cluster_k{k}'
        clusters = sorted(df[cluster_col].unique())
        sig_found = []
        for group_name, dvs in DV_GROUPS.items():
            for col, label in dvs:
                if col not in df.columns: continue
                groups = [df[df[cluster_col] == c][col].dropna().values for c in clusters]
                if any(len(g) < 2 for g in groups): continue
                F, p = stats.f_oneway(*groups)
                eta2 = eta_squared(groups)
                if p < .10:
                    sig_found.append((label, F, p, eta2, sig_label(p)))
        print(f'\n[k={k}] 유의 결과 {len(sig_found)}개:')
        for label, F, p, eta2, sig in sorted(sig_found, key=lambda x: x[2]):
            print(f'  {sig:>3}  {label:<35}  F={F:.2f}  p={p:.3f}  η²={eta2:.3f}')


if __name__ == '__main__':
    main()
