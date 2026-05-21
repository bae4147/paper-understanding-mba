#!/usr/bin/env python3
"""
Chat 사용 여부(chat_count=0 vs >0) 그룹 비교 분석

대상 데이터: merged_0506.xlsx
그룹 A: chat_count = 0
그룹 B: chat_count > 0
종속변수: run_analysis.py의 모든 DV (SE, NASA-TLX, LLM Usefulness, LLM Trust, Post-Task, Reading Behavior)

사용법:
  python analyze_chat_usage.py
  python analyze_chat_usage.py --min-attn 3 --exclude-external-ai --attn-pass
"""

import math
import os
import sys
import argparse
from datetime import datetime

import pandas as pd
from scipy import stats

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH  = os.path.join(SCRIPT_DIR, 'merged_0506.xlsx')
RESULTS_DIR = SCRIPT_DIR  # 결과를 같은 폴더에 저장

# ── SE 하위 문항 정의 ─────────────────────────────────────────────────────────
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
    'chat_count':                          'Chat: Query Count',
}

ALL_DVS = [
    # SE-OC 개별
    'se_oc_overallGoal', 'se_oc_authorsReasoning', 'se_oc_connectingIdeas',
    'se_oc_evidenceUnderstanding', 'se_oc_keyResultsUnderstanding',
    'se_oc_keyTermsUnderstanding', 'se_oc_researchDesignUnderstanding',
    'se_oc_sampleContextUnderstanding', 'se_oc_limitationsUnderstanding',
    'se_oc',
    # SE-CE 개별
    'se_ce_ownIdeas', 'se_ce_alternativePerspectives', 'se_ce_verifyCredibility',
    'se_ce_questionClaims', 'se_ce_broaderImplications',
    'se_ce',
    # SE-AP 개별
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
    'reading_totalDuration_ms', 'chat_count',
]

CATEGORIES = [
    ('Self-Efficacy', lambda dv: dv.startswith('se_')),
    ('NASA-TLX',      lambda dv: dv.startswith('nasa_')),
    ('LLM Usefulness', lambda dv: dv.startswith('llmUsefulness_')),
    ('LLM Trust',      lambda dv: dv.startswith('llmTrust_')),
    ('Post-Task',      lambda dv: dv.startswith('postTask_')),
    ('Reading Behavior', lambda dv: dv in ('reading_totalDuration_ms', 'chat_count')),
]


def safe_float(val):
    try:
        v = float(val)
        return None if math.isnan(v) else v
    except (ValueError, TypeError):
        return None


def get_col(df, name):
    """S2_/S3_ 접두어를 자동으로 붙여 DataFrame에서 Series 반환."""
    if name in df.columns:
        return df[name]
    for prefix in ('S3_', 'S2_', 'S1_', 'S4_'):
        if prefix + name in df.columns:
            return df[prefix + name]
    return None


def get_values(df_group, dv):
    """DV에 대한 float 값 리스트 반환 (subcategory/composite는 평균)."""
    if dv in SE_SUBCATEGORIES:
        cols = SE_SUBCATEGORIES[dv]
    elif dv in COMPOSITE_FIELDS:
        cols = COMPOSITE_FIELDS[dv]
    else:
        series = get_col(df_group, dv)
        if series is None:
            return []
        return [v for v in (safe_float(x) for x in series) if v is not None]

    # 여러 컬럼의 행별 평균
    arrays = []
    for col in cols:
        series = get_col(df_group, col)
        if series is not None:
            arrays.append(series.values)
    if not arrays:
        return []
    result = []
    for i in range(len(df_group)):
        row_vals = [safe_float(a[i]) for a in arrays]
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


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--exclude-external-ai', action='store_true', default=True)
    parser.add_argument('--no-exclude-external-ai', dest='exclude_external_ai', action='store_false')
    parser.add_argument('--min-attn', type=int, default=0,
                        help='최소 attn_focus 값 (0=필터 없음)')
    parser.add_argument('--attn-pass', action='store_true', default=False,
                        help='attention check pass 필터 적용')
    args = parser.parse_args()

    df = pd.read_excel(DATA_PATH)
    original_n = len(df)
    filter_log = []

    # ── 필터 ──────────────────────────────────────────────────────────────────
    if args.exclude_external_ai:
        ext_ai = get_col(df, 'externalAi_used')
        if ext_ai is not None:
            before = len(df)
            df = df[ext_ai.str.strip().str.lower() == 'no']
            filter_log.append(('exclude_external_ai', before - len(df)))

    if args.min_attn > 0:
        attn = get_col(df, 'attn_focus')
        if attn is not None:
            before = len(df)
            df = df[attn.apply(lambda x: (safe_float(x) or 0) >= args.min_attn)]
            filter_log.append((f'min_attn_focus >= {args.min_attn}', before - len(df)))

    if args.attn_pass:
        attn_check = get_col(df, 'attn_stronglyDisagreeCheck')
        if attn_check is not None:
            before = len(df)
            df = df[attn_check.apply(lambda x: safe_float(x) == 1)]
            filter_log.append(('require_attn_check_pass', before - len(df)))

    # ── chat_count 그룹 분리 ──────────────────────────────────────────────────
    chat_series = get_col(df, 'chat_count')
    df = df.copy()
    df['_chat_count_num'] = chat_series.apply(safe_float)
    df_valid = df[df['_chat_count_num'].notna()]

    group_a = df_valid[df_valid['_chat_count_num'] == 0].reset_index(drop=True)
    group_b = df_valid[df_valid['_chat_count_num'] > 0].reset_index(drop=True)
    label_a, label_b = 'chat=0 (no chat)', 'chat>0 (used chat)'

    # ── 마크다운 작성 ─────────────────────────────────────────────────────────
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    lines = []
    lines.append('# Analysis Results — Chat Usage Comparison (chat=0 vs chat>0)')
    lines.append(f'\n**Generated:** {now}  ')
    lines.append(f'**Data:** `data/26-05-06/merged_0506.xlsx`\n')
    lines.append('> 전체 참여자를 chat 사용 여부(chat_count=0 vs >0)로 나눈 비교 분석.\n')

    lines.append('---\n')
    lines.append('## Filters Applied\n')
    lines.append(f'- 전처리 전 세션 수: {original_n}')
    for label, removed in filter_log:
        lines.append(f'- `{label}`: {removed}명 제외')
    lines.append(f'- **최종 분석 대상: {len(df_valid)}명** ({label_a}: {len(group_a)}, {label_b}: {len(group_b)})\n')

    # 기술통계 - 참여자
    lines.append('---\n')
    lines.append('## Descriptive Statistics\n')
    lines.append('### Participants\n')

    def class_dist(g):
        d = {}
        s = get_col(g, 'class')
        if s is None: return 'N/A'
        for v in s:
            d[str(v)] = d.get(str(v), 0) + 1
        return ', '.join(f'{k}: {v}' for k, v in sorted(d.items()))

    def cond_dist(g):
        d = {}
        s = get_col(g, 'condition')
        if s is None: return 'N/A'
        for v in s:
            d[str(v)] = d.get(str(v), 0) + 1
        return ', '.join(f'{k}: {v}' for k, v in sorted(d.items()))

    lines.append(f'| | {label_a} (n={len(group_a)}) | {label_b} (n={len(group_b)}) |')
    lines.append('|--|--|--|')
    lines.append(f'| Condition distribution | {cond_dist(group_a)} | {cond_dist(group_b)} |')
    lines.append(f'| Class distribution | {class_dist(group_a)} | {class_dist(group_b)} |')

    # chat_count 기술통계
    lines.append('\n### Chat Count Distribution\n')
    lines.append(f'| | {label_a} | {label_b} |')
    lines.append('|--|--|--|')
    for g, lbl in [(group_a, label_a), (group_b, label_b)]:
        pass
    b_chat = [v for v in group_b['_chat_count_num'] if v is not None]
    b_s = calc_stats(b_chat)
    lines.append(f'| chat_count M (SD) | 0.00 (0.00) | {fmt(b_s["mean"], 2)} ({fmt(b_s["sd"], 2)}) |')
    lines.append(f'| chat_count range | 0 – 0 | {int(min(b_chat))} – {int(max(b_chat))} |')

    # ANOVA
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
            is_item = not is_composite and not is_subcat_avg

            if is_composite:
                lines.append('| **──** | **──** | **──** | **──** | **──** | **──** |')

            a_vals = get_values(group_a, dv)
            b_vals = get_values(group_b, dv)

            a_s = calc_stats(a_vals)
            b_s = calc_stats(b_vals)

            label = DV_LABELS.get(dv, dv)
            # 들여쓰기: 개별 문항은 안쪽
            if is_item and not is_subcat_avg:
                label = '　' + label

            if len(a_vals) >= 2 and len(b_vals) >= 2:
                f_stat, p_val = stats.f_oneway(a_vals, b_vals)
                eta2 = calc_eta_squared(a_vals, b_vals)
                stars = sig_stars(p_val)
                sig = p_val < 0.05
                def cell(s, _sig=sig):
                    return f'**<u>{s}</u>**' if _sig else s
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

    # 저장
    os.makedirs(RESULTS_DIR, exist_ok=True)
    ts = datetime.now().strftime('%Y-%m-%d_%H-%M')
    filter_tag = 'no_extai' if args.exclude_external_ai else 'all'
    if args.min_attn:
        filter_tag += f'_attn{args.min_attn}'
    if args.attn_pass:
        filter_tag += '_attnpass'
    out_path = os.path.join(RESULTS_DIR, f'{ts}_chat_usage_{filter_tag}.md')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    print(f'완료: {out_path}')
    print(f'chat=0: {len(group_a)}명 / chat>0: {len(group_b)}명 (전체 {len(df_valid)}명)')


if __name__ == '__main__':
    main()
