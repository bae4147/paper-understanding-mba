#!/usr/bin/env python3
"""
Chat usage group comparison — MBA cohort (ClassCode 1-3, active_min > 1)
Data: merged_final.xlsx (168 rows, S1_/S2_/S3_/S4_ prefixes)

Comparisons:
  A) chat=0 vs chat>0
  B) chat<=1 vs chat>1
  C) chat<=2 vs chat>2

All individual DV items (no averages-only), following run_analysis.py format.

Usage:
  python analyze_chat_mba.py
"""

import math
import os
from datetime import datetime

import pandas as pd
from scipy import stats

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(SCRIPT_DIR, 'merged_final.xlsx')
RESULTS_DIR = SCRIPT_DIR

SE_SUBCATEGORIES = {
    'se_oc': ['se_oc_overallGoal', 'se_oc_authorsReasoning', 'se_oc_connectingIdeas',
              'se_oc_evidenceUnderstanding', 'se_oc_keyResultsUnderstanding',
              'se_oc_keyTermsUnderstanding', 'se_oc_researchDesignUnderstanding',
              'se_oc_sampleContextUnderstanding', 'se_oc_limitationsUnderstanding'],
    'se_ce': ['se_ce_ownIdeas', 'se_ce_alternativePerspectives', 'se_ce_verifyCredibility',
              'se_ce_questionClaims', 'se_ce_broaderImplications'],
    'se_ap': ['se_ap_contextDifferences', 'se_ap_differencesImpact', 'se_ap_mechanisms',
              'se_ap_outcomes', 'se_ap_confidence', 'se_ap_decision'],
}

COMPOSITE_FIELDS = {
    'se_overall': (SE_SUBCATEGORIES['se_oc'] + SE_SUBCATEGORIES['se_ce'] + SE_SUBCATEGORIES['se_ap']),
    'llmUsefulness_composite': ['llmUsefulness_overall', 'llmUsefulness_conceptHelp',
                                'llmUsefulness_findingsHelp', 'llmUsefulness_practicalHelp',
                                'llmUsefulness_timeSaving'],
    'llmTrust_composite': ['llmTrust_competence', 'llmTrust_accuracy', 'llmTrust_benevolence',
                           'llmTrust_reliability', 'llmTrust_comfortActing', 'llmTrust_comfortUsing',
                           'llmTrust_relyWithoutReading', 'llmTrust_assumeClearIsAccurate',
                           'llmTrust_confidentWithoutDetails', 'llmTrust_relyForImportance'],
}

COMPOSITE_DVS = {'se_overall', 'llmUsefulness_composite', 'llmTrust_composite'}

DV_LABELS = {
    'se_overall':                          'Total Composite (avg of all 20 items)',
    'se_oc':                               'Self-Efficacy: Overall Comprehension (avg)',
    'se_ce':                               'Self-Efficacy: Critical Engagement (avg)',
    'se_ap':                               'Self-Efficacy: Applicability (avg)',
    'se_oc_overallGoal':                   'OC: Overall Goal',
    'se_oc_authorsReasoning':              "OC: Author's Reasoning",
    'se_oc_connectingIdeas':               'OC: Connecting Ideas',
    'se_oc_evidenceUnderstanding':         'OC: Evidence Understanding',
    'se_oc_keyResultsUnderstanding':       'OC: Key Results Understanding',
    'se_oc_keyTermsUnderstanding':         'OC: Key Terms Understanding',
    'se_oc_researchDesignUnderstanding':   'OC: Research Design Understanding',
    'se_oc_sampleContextUnderstanding':    'OC: Sample/Context Understanding',
    'se_oc_limitationsUnderstanding':      'OC: Limitations Understanding',
    'se_ce_ownIdeas':                      'CE: Own Ideas',
    'se_ce_alternativePerspectives':       'CE: Alternative Perspectives',
    'se_ce_verifyCredibility':             'CE: Verify Credibility',
    'se_ce_questionClaims':                'CE: Question Claims',
    'se_ce_broaderImplications':           'CE: Broader Implications',
    'se_ap_contextDifferences':            'AP: Context Differences',
    'se_ap_differencesImpact':             'AP: Differences Impact',
    'se_ap_mechanisms':                    'AP: Mechanisms',
    'se_ap_outcomes':                      'AP: Outcomes',
    'se_ap_confidence':                    'AP: Confidence',
    'se_ap_decision':                      'AP: Decision',
    'llmUsefulness_composite':             'Total Composite (avg of 5 items)',
    'llmUsefulness_overall':               'LLM Usefulness: Overall',
    'llmUsefulness_conceptHelp':           'LLM Usefulness: Concept Help',
    'llmUsefulness_findingsHelp':          'LLM Usefulness: Findings Help',
    'llmUsefulness_practicalHelp':         'LLM Usefulness: Practical Help',
    'llmUsefulness_timeSaving':            'LLM Usefulness: Time Saving',
    'llmTrust_composite':                  'Total Composite (avg of 10 items)',
    'llmTrust_competence':                 'LLM Trust: Competence',
    'llmTrust_accuracy':                   'LLM Trust: Accuracy',
    'llmTrust_benevolence':                'LLM Trust: Benevolence',
    'llmTrust_reliability':                'LLM Trust: Reliability',
    'llmTrust_comfortActing':              'LLM Trust: Comfort Acting',
    'llmTrust_comfortUsing':               'LLM Trust: Comfort Using',
    'llmTrust_relyWithoutReading':         'LLM Trust: Rely Without Reading',
    'llmTrust_assumeClearIsAccurate':      'LLM Trust: Assume Clear Is Accurate',
    'llmTrust_confidentWithoutDetails':    'LLM Trust: Confident Without Details',
    'llmTrust_relyForImportance':          'LLM Trust: Rely For Importance',
    'nasa_mentalDemand':                   'NASA-TLX: Mental Demand',
    'nasa_physicalDemand':                 'NASA-TLX: Physical Demand',
    'nasa_temporalDemand':                 'NASA-TLX: Temporal Demand',
    'nasa_performance':                    'NASA-TLX: Performance',
    'nasa_effort':                         'NASA-TLX: Effort',
    'nasa_frustration':                    'NASA-TLX: Frustration',
    'postTask_implementationLikelihood':   'Post-Task: Implementation Likelihood',
    'postTask_newStrategyConfidence':      'Post-Task: New Strategy Confidence',
    'reading_totalDuration_ms':            'Reading: Total Duration (ms)',
    'active_min':                          'Active Duration (min)',
    'chat_count':                          'Chat: Query Count',
}

# DV list in display order
ALL_DVS = [
    # SE-OC individual items
    'se_oc_overallGoal', 'se_oc_authorsReasoning', 'se_oc_connectingIdeas',
    'se_oc_evidenceUnderstanding', 'se_oc_keyResultsUnderstanding',
    'se_oc_keyTermsUnderstanding', 'se_oc_researchDesignUnderstanding',
    'se_oc_sampleContextUnderstanding', 'se_oc_limitationsUnderstanding',
    'se_oc',
    # SE-CE individual items
    'se_ce_ownIdeas', 'se_ce_alternativePerspectives', 'se_ce_verifyCredibility',
    'se_ce_questionClaims', 'se_ce_broaderImplications',
    'se_ce',
    # SE-AP individual items
    'se_ap_contextDifferences', 'se_ap_differencesImpact', 'se_ap_mechanisms',
    'se_ap_outcomes', 'se_ap_confidence', 'se_ap_decision',
    'se_ap',
    # NASA-TLX
    'nasa_mentalDemand', 'nasa_physicalDemand', 'nasa_temporalDemand',
    'nasa_performance', 'nasa_effort', 'nasa_frustration',
    # LLM Usefulness
    'llmUsefulness_overall', 'llmUsefulness_conceptHelp', 'llmUsefulness_findingsHelp',
    'llmUsefulness_practicalHelp', 'llmUsefulness_timeSaving',
    # LLM Trust
    'llmTrust_competence', 'llmTrust_accuracy', 'llmTrust_benevolence',
    'llmTrust_reliability', 'llmTrust_comfortActing', 'llmTrust_comfortUsing',
    'llmTrust_relyWithoutReading', 'llmTrust_assumeClearIsAccurate',
    'llmTrust_confidentWithoutDetails', 'llmTrust_relyForImportance',
    # Post-Task
    'postTask_implementationLikelihood', 'postTask_newStrategyConfidence',
    # Reading behavior
    'reading_totalDuration_ms', 'active_min', 'chat_count',
]

CATEGORIES = [
    ('Self-Efficacy',    lambda dv: dv.startswith('se_')),
    ('NASA-TLX',         lambda dv: dv.startswith('nasa_')),
    ('LLM Usefulness',   lambda dv: dv.startswith('llmUsefulness_')),
    ('LLM Trust',        lambda dv: dv.startswith('llmTrust_')),
    ('Post-Task',        lambda dv: dv.startswith('postTask_')),
    ('Reading Behavior', lambda dv: dv in ('reading_totalDuration_ms', 'active_min', 'chat_count')),
]


def safe_float(val):
    try:
        v = float(val)
        return None if math.isnan(v) else v
    except (ValueError, TypeError):
        return None


def get_col(df, name):
    if name in df.columns:
        return df[name]
    for prefix in ('S3_', 'S2_', 'S1_', 'S4_'):
        if prefix + name in df.columns:
            return df[prefix + name]
    return None


def get_values(df_group, dv):
    if dv == 'active_min':
        series = df_group['active_min']
        return [v for v in (safe_float(x) for x in series) if v is not None]
    if dv in SE_SUBCATEGORIES:
        cols = SE_SUBCATEGORIES[dv]
    elif dv in COMPOSITE_FIELDS:
        cols = COMPOSITE_FIELDS[dv]
    else:
        series = get_col(df_group, dv)
        if series is None:
            return []
        return [v for v in (safe_float(x) for x in series) if v is not None]

    arrays = []
    for col in cols:
        series = get_col(df_group, col)
        if series is not None:
            arrays.append(series.reset_index(drop=True))
    if not arrays:
        return []
    result = []
    for i in range(len(df_group)):
        row_vals = [safe_float(a.iloc[i]) for a in arrays]
        row_vals = [v for v in row_vals if v is not None]
        if row_vals:
            result.append(sum(row_vals) / len(row_vals))
    return result


def calc_stats(values):
    n = len(values)
    if n == 0:
        return {'n': 0, 'mean': None, 'sd': None}
    mean = sum(values) / n
    sd = math.sqrt(sum((v - mean) ** 2 for v in values) / (n - 1)) if n > 1 else 0.0
    return {'n': n, 'mean': mean, 'sd': sd}


def calc_eta_squared(g1, g2):
    all_v = g1 + g2
    gm = sum(all_v) / len(all_v)
    ss_total = sum((v - gm) ** 2 for v in all_v)
    m1, m2 = sum(g1) / len(g1), sum(g2) / len(g2)
    ss_between = len(g1) * (m1 - gm) ** 2 + len(g2) * (m2 - gm) ** 2
    return ss_between / ss_total if ss_total > 0 else 0.0


def fmt(val, d=3):
    return 'N/A' if val is None else f'{val:.{d}f}'


def sig_stars(p):
    if p is None: return ''
    if p < 0.001: return '***'
    if p < 0.01:  return '**'
    if p < 0.05:  return '*'
    if p < 0.1:   return '†'
    return ''


def class_dist(g):
    d = {}
    s = get_col(g, 'class')
    if s is None:
        return 'N/A'
    for v in s:
        k = str(v)
        d[k] = d.get(k, 0) + 1
    return ', '.join(f'{k}: {v}' for k, v in sorted(d.items()))


def cond_dist(g):
    d = {}
    s = get_col(g, 'condition')
    if s is None:
        return 'N/A'
    for v in s:
        k = str(v)
        d[k] = d.get(k, 0) + 1
    return ', '.join(f'{k}: {v}' for k, v in sorted(d.items()))


def run_comparison(df_sample, label_a, label_b, group_a, group_b,
                   title, split_desc, out_tag):
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    lines = []
    lines.append(f'# Analysis Results — {title}')
    lines.append(f'\n**Generated:** {now}  ')
    lines.append(f'**Data:** `data/26-05-06/merged_final.xlsx`\n')
    lines.append(f'> {split_desc}\n')

    lines.append('---\n')
    lines.append('## Sample\n')
    lines.append(f'- MBA only (ClassCode 1–3): {len(df_sample)}명')
    lines.append(f'- Excluded: honda (ClassCode 4), busoba7399 (ClassCode 5), active_min ≤ 1')
    lines.append(f'- **최종 분석 대상: {len(group_a) + len(group_b)}명** '
                 f'({label_a}: {len(group_a)}, {label_b}: {len(group_b)})\n')

    lines.append('---\n')
    lines.append('## Descriptive Statistics\n')
    lines.append('### Participants\n')
    lines.append(f'| | {label_a} (n={len(group_a)}) | {label_b} (n={len(group_b)}) |')
    lines.append('|--|--|--|')
    lines.append(f'| Condition distribution | {cond_dist(group_a)} | {cond_dist(group_b)} |')
    lines.append(f'| Class distribution | {class_dist(group_a)} | {class_dist(group_b)} |')

    # Chat count stats
    lines.append('\n### Chat Count Distribution\n')
    lines.append(f'| | {label_a} | {label_b} |')
    lines.append('|--|--|--|')
    a_chat = [v for v in (safe_float(x) for x in get_col(group_a, 'chat_count')) if v is not None]
    b_chat = [v for v in (safe_float(x) for x in get_col(group_b, 'chat_count')) if v is not None]
    a_cs, b_cs = calc_stats(a_chat), calc_stats(b_chat)
    a_range = f'{int(min(a_chat))} – {int(max(a_chat))}' if a_chat else 'N/A'
    b_range = f'{int(min(b_chat))} – {int(max(b_chat))}' if b_chat else 'N/A'
    lines.append(f'| chat_count M (SD) | {fmt(a_cs["mean"], 2)} ({fmt(a_cs["sd"], 2)}) | {fmt(b_cs["mean"], 2)} ({fmt(b_cs["sd"], 2)}) |')
    lines.append(f'| chat_count range | {a_range} | {b_range} |')

    lines.append('\n---\n')
    lines.append('## ANOVA Results\n')
    lines.append('`*` p<.05, `**` p<.01, `***` p<.001, `†` p<.10\n')

    for cat_name, cat_filter in CATEGORIES:
        cat_dvs = [dv for dv in ALL_DVS if cat_filter(dv)]
        if not cat_dvs:
            continue

        lines.append(f'### {cat_name}\n')
        lines.append(f'| Dependent Variable | {label_a} M (SD) | {label_b} M (SD) | F | p | η² |')
        lines.append('|--|--|--|--|--|--|')

        for dv in cat_dvs:
            is_composite = dv in COMPOSITE_DVS
            is_subcat_avg = dv in SE_SUBCATEGORIES

            if is_composite:
                lines.append('| **──** | **──** | **──** | **──** | **──** | **──** |')

            a_vals = get_values(group_a, dv)
            b_vals = get_values(group_b, dv)
            a_s = calc_stats(a_vals)
            b_s = calc_stats(b_vals)

            label = DV_LABELS.get(dv, dv)
            # Individual items get indented
            if not is_composite and not is_subcat_avg:
                label = '　' + label

            if len(a_vals) >= 2 and len(b_vals) >= 2:
                f_stat, p_val = stats.f_oneway(a_vals, b_vals)
                eta2 = calc_eta_squared(a_vals, b_vals)
                stars = sig_stars(p_val)
                sig = p_val < 0.05
                marginal = 0.05 <= p_val < 0.10

                def cell(s, _sig=sig, _marginal=marginal):
                    if _sig:
                        return f'**<u>{s}</u>**'
                    if _marginal:
                        return f'**{s}**'
                    return s

                row = (f'| {cell(label)} '
                       f'| {cell(fmt(a_s["mean"], 2) + " (" + fmt(a_s["sd"], 2) + ")")} '
                       f'| {cell(fmt(b_s["mean"], 2) + " (" + fmt(b_s["sd"], 2) + ")")} '
                       f'| {cell(fmt(f_stat, 2))} '
                       f'| {cell(fmt(p_val, 3) + stars)} '
                       f'| {cell(fmt(eta2, 3))} |')
            else:
                row = (f'| {label} '
                       f'| {fmt(a_s["mean"], 2)} ({fmt(a_s["sd"], 2)}) '
                       f'| {fmt(b_s["mean"], 2)} ({fmt(b_s["sd"], 2)}) '
                       f'| — | — | — |')
            lines.append(row)

        lines.append('')

    ts = datetime.now().strftime('%Y-%m-%d_%H-%M')
    out_path = os.path.join(RESULTS_DIR, f'{ts}_{out_tag}.md')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f'완료: {out_path}  ({label_a}: {len(group_a)}, {label_b}: {len(group_b)})')
    return out_path


def main():
    df = pd.read_excel(DATA_PATH)

    # Compute active_min
    df['active_min'] = (df['S2_reading_totalDuration_ms'] - df['S2_window_inactive_ms']) / 60000

    # Filter: MBA only (ClassCode 1-3) + active_min > 1
    df_mba = df[df['S1_ClassCode'].isin([1, 2, 3])].copy()
    df_sample = df_mba[df_mba['active_min'] > 1].reset_index(drop=True)

    chat_col = get_col(df_sample, 'chat_count')
    df_sample = df_sample.copy()
    df_sample['_chat'] = chat_col.apply(safe_float)
    df_valid = df_sample[df_sample['_chat'].notna()].reset_index(drop=True)

    n_total = len(df_valid)

    splits = [
        (0,  'chat=0',   'chat>0',   'chat_eq0_vs_gt0'),
        (1,  'chat≤1',   'chat>1',   'chat_le1_vs_gt1'),
        (2,  'chat≤2',   'chat>2',   'chat_le2_vs_gt2'),
    ]

    for threshold, label_a, label_b, tag in splits:
        group_a = df_valid[df_valid['_chat'] <= threshold].reset_index(drop=True)
        group_b = df_valid[df_valid['_chat'] > threshold].reset_index(drop=True)

        if threshold == 0:
            split_desc = 'MBA 96명 (active_min>1, ClassCode 1-3): chat 미사용(=0) vs 사용(>0) 비교'
        else:
            split_desc = f'MBA 96명 (active_min>1, ClassCode 1-3): chat ≤{threshold} vs >{threshold} 비교'

        run_comparison(
            df_sample=df_valid,
            label_a=label_a,
            label_b=label_b,
            group_a=group_a,
            group_b=group_b,
            title=f'Chat Usage Comparison ({label_a} vs {label_b}) — MBA Cohort',
            split_desc=split_desc,
            out_tag=f'mba_chat_{tag}',
        )


if __name__ == '__main__':
    main()
