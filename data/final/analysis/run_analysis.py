#!/usr/bin/env python3
"""
CIMO vs Control ANOVA 분석 스크립트

사용법:
  python analysis/run_analysis.py
  python analysis/run_analysis.py analysis/config.yaml

출력:
  analysis/results/<YYYY-MM-DD_HH-MM>_<config_name>.md
"""

import csv
import sys
import os
import yaml
import math
from datetime import datetime
from scipy import stats

# ── 경로 설정 ─────────────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_DIR = os.path.dirname(SCRIPT_DIR)
DATA_PATH = os.path.join(DATASET_DIR, 'sessions_preprocessed.csv')
RESULTS_DIR = os.path.join(SCRIPT_DIR, 'results')

# ── Self-efficacy subcategory 문항 정의 ───────────────────────────────────────
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

# ── 종합 점수 문항 정의 (모든 하위 문항 평균) ─────────────────────────────────
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
    'se_overall': 'Total Composite (avg of all 20 items)',
    'se_oc': 'Self-Efficacy: Overall Comprehension (avg)',
    'se_ce': 'Self-Efficacy: Critical Engagement (avg)',
    'se_ap': 'Self-Efficacy: Applicability (avg)',
    # SE-OC individual items
    'se_oc_overallGoal': 'OC: Overall Goal',
    'se_oc_authorsReasoning': "OC: Author's Reasoning",
    'se_oc_connectingIdeas': 'OC: Connecting Ideas',
    'se_oc_evidenceUnderstanding': 'OC: Evidence Understanding',
    'se_oc_keyResultsUnderstanding': 'OC: Key Results Understanding',
    'se_oc_keyTermsUnderstanding': 'OC: Key Terms Understanding',
    'se_oc_researchDesignUnderstanding': 'OC: Research Design Understanding',
    'se_oc_sampleContextUnderstanding': 'OC: Sample/Context Understanding',
    'se_oc_limitationsUnderstanding': 'OC: Limitations Understanding',
    # SE-CE individual items
    'se_ce_ownIdeas': 'CE: Own Ideas',
    'se_ce_alternativePerspectives': 'CE: Alternative Perspectives',
    'se_ce_verifyCredibility': 'CE: Verify Credibility',
    'se_ce_questionClaims': 'CE: Question Claims',
    'se_ce_broaderImplications': 'CE: Broader Implications',
    # SE-AP individual items
    'se_ap_contextDifferences': 'AP: Context Differences',
    'se_ap_differencesImpact': 'AP: Differences Impact',
    'se_ap_mechanisms': 'AP: Mechanisms',
    'se_ap_outcomes': 'AP: Outcomes',
    'se_ap_confidence': 'AP: Confidence',
    'se_ap_decision': 'AP: Decision',
    'llmUsefulness_composite': 'Total Composite (avg of 5 items)',
    'llmTrust_composite': 'Total Composite (avg of 10 items)',
    'nasa_mentalDemand': 'NASA-TLX: Mental Demand',
    'nasa_physicalDemand': 'NASA-TLX: Physical Demand',
    'nasa_temporalDemand': 'NASA-TLX: Temporal Demand',
    'nasa_performance': 'NASA-TLX: Performance',
    'nasa_effort': 'NASA-TLX: Effort',
    'nasa_frustration': 'NASA-TLX: Frustration',
    'llmUsefulness_overall': 'LLM Usefulness: Overall',
    'llmUsefulness_conceptHelp': 'LLM Usefulness: Concept Help',
    'llmUsefulness_findingsHelp': 'LLM Usefulness: Findings Help',
    'llmUsefulness_practicalHelp': 'LLM Usefulness: Practical Help',
    'llmUsefulness_timeSaving': 'LLM Usefulness: Time Saving',
    'llmTrust_competence': 'LLM Trust: Competence',
    'llmTrust_accuracy': 'LLM Trust: Accuracy',
    'llmTrust_benevolence': 'LLM Trust: Benevolence',
    'llmTrust_reliability': 'LLM Trust: Reliability',
    'llmTrust_comfortActing': 'LLM Trust: Comfort Acting',
    'llmTrust_comfortUsing': 'LLM Trust: Comfort Using',
    'llmTrust_relyWithoutReading': 'LLM Trust: Rely Without Reading',
    'llmTrust_assumeClearIsAccurate': 'LLM Trust: Assume Clear Is Accurate',
    'llmTrust_confidentWithoutDetails': 'LLM Trust: Confident Without Details',
    'llmTrust_relyForImportance': 'LLM Trust: Rely For Importance',
    'postTask_implementationLikelihood': 'Post-Task: Implementation Likelihood',
    'postTask_newStrategyConfidence': 'Post-Task: New Strategy Confidence',
    'reading_totalDuration_ms': 'Reading: Total Duration (ms)',
    'chat_count': 'Chat: Query Count',
}


DV_QUESTIONS = {
    # SE-OC
    'se_oc_overallGoal':                  'I understood the overall goal and main takeaways of the article.',
    'se_oc_authorsReasoning':             "I understood the authors' explanations and reasoning presented in the main text.",
    'se_oc_connectingIdeas':              'I was able to connect different sections or ideas across the article.',
    'se_oc_evidenceUnderstanding':        'I understood what evidence the authors used to support their claims.',
    'se_oc_keyResultsUnderstanding':      'I understood the key results/findings reported in the article.',
    'se_oc_keyTermsUnderstanding':        'I understood the key concepts/terms used in the article.',
    'se_oc_researchDesignUnderstanding':  'I understood the research design used in the article (e.g., survey, experiment, interviews).',
    'se_oc_sampleContextUnderstanding':   'I understood who or what was studied (sample/context) and why that matters.',
    'se_oc_limitationsUnderstanding':     'I understood the main limitations the authors described (if any).',
    # SE-CE
    'se_ce_ownIdeas':                     'I explored my own ideas and interpretations related to the article.',
    'se_ce_alternativePerspectives':      "I generated alternative perspectives that challenged some of the article's ideas.",
    'se_ce_verifyCredibility':            'I thought about how to verify the credibility of the information sources cited in the article.',
    'se_ce_questionClaims':               'I questioned what I read to judge whether the claims were convincing.',
    'se_ce_broaderImplications':          'I reflected on the broader implications of the article (e.g., for my team, organization, or decisions).',
    # SE-AP
    'se_ap_contextDifferences':           'I can clearly identify the key differences between the research context and my own situation.',
    'se_ap_differencesImpact':            'I can tell which of these differences would matter for applying the findings to my situation.',
    'se_ap_mechanisms':                   "I can judge whether the underlying mechanisms behind the study's results would also apply in my situation.",
    'se_ap_outcomes':                     "I can assess whether I would achieve similar outcomes if I applied the article's conclusions in my situation.",
    'se_ap_confidence':                   'I feel confident in judging the applicability of this research to my specific situation.',
    'se_ap_decision':                     'I can make an informed decision about whether to apply these findings in my context.',
    # LLM Usefulness
    'llmUsefulness_overall':              'How useful was the GenAI for reading and understanding the article?',
    'llmUsefulness_conceptHelp':          'How helpful was the GenAI for understanding difficult concepts or terminology?',
    'llmUsefulness_findingsHelp':         'How helpful was the GenAI for understanding the research findings?',
    'llmUsefulness_practicalHelp':        'How helpful was the GenAI for understanding practical applications?',
    'llmUsefulness_timeSaving':           'How helpful was the GenAI for saving your time?',
    # LLM Trust
    'llmTrust_competence':                'Overall, the GenAI was competent and effective as a tool for assisting with reading.',
    'llmTrust_accuracy':                  'The information provided by the GenAI was accurate.',
    'llmTrust_benevolence':               'I believe the GenAI is made with my best interests in mind.',
    'llmTrust_reliability':               'I can always rely on the GenAI when understanding articles.',
    'llmTrust_comfortActing':             'I have no reservations about acting on the information provided by the GenAI.',
    'llmTrust_comfortUsing':              'I have no hesitation in using the information provided by the GenAI.',
    'llmTrust_relyWithoutReading':        "I can rely on the GenAI to understand an article even when I don't fully read it myself.",
    'llmTrust_assumeClearIsAccurate':     "If the GenAI's summary seems clear, I assume it is accurate.",
    'llmTrust_confidentWithoutDetails':   "The GenAI's explanation makes me feel confident about an article even when I can't identify supporting details in the text.",
    'llmTrust_relyForImportance':         'I rely on the GenAI to tell me what matters instead of deciding for myself what is important in the article.',
    # Post-Task
    'postTask_implementationLikelihood':  'How likely are you to actually implement these takeaways?',
    'postTask_newStrategyConfidence':     'How confident are you that your takeaways will be effective in your workplace?',
}


def load_config(path):
    with open(path, encoding='utf-8') as f:
        return yaml.safe_load(f)


def build_output_name(config_path, config):
    """yaml 파일명 base + 실제 필터값으로 출력 파일명 자동 생성."""
    # yaml 파일명에서 'config_' 접두어 제거
    base = os.path.splitext(os.path.basename(config_path))[0]
    if base.startswith('config_'):
        base = base[len('config_'):]

    # 필터 요약
    f = config.get('filters', {})
    parts = []
    if f.get('exclude_external_ai'):
        parts.append('no_extai')
    if f.get('exclude_external_pdf'):
        parts.append('no_extpdf')
    min_read = f.get('min_reading_time_ms', 0)
    if min_read:
        parts.append(f'read{min_read // 60000}min')
    min_chat = f.get('min_chat_count', 0)
    if min_chat:
        parts.append(f'chat{min_chat}')
    min_attn = f.get('min_attn_focus', 0)
    if min_attn:
        parts.append(f'attn{min_attn}')
    if f.get('require_attn_check_pass'):
        parts.append('attnpass')

    # subgroup 분석이면 추가 표시
    sg = config.get('subgroup')
    if sg:
        parts.append(f'sub_{sg["condition"]}_{sg["split_col"]}{sg["threshold"]}')

    filter_str = '_'.join(parts) if parts else 'no_filters'
    return f'{base}__{filter_str}'


def load_data(path):
    import re
    with open(path, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    # S1_/S2_/S3_/S4_ 접두어를 자동으로 제거해 컬럼명 정규화
    prefix_pat = re.compile(r'^S\d+_')
    normalized = []
    for row in rows:
        new_row = {}
        for k, v in row.items():
            new_key = prefix_pat.sub('', k)
            # 충돌 시 접두어 없는 버전 우선 (이미 존재하면 유지)
            if new_key not in new_row:
                new_row[new_key] = v
        normalized.append(new_row)
    return normalized


def safe_float(val):
    try:
        return float(val)
    except (ValueError, TypeError):
        return None


def get_value(row, dv):
    """DV 이름에 따라 값 반환. subcategory/composite는 평균 계산."""
    if dv in SE_SUBCATEGORIES:
        cols = SE_SUBCATEGORIES[dv]
    elif dv in COMPOSITE_FIELDS:
        cols = COMPOSITE_FIELDS[dv]
    else:
        return safe_float(row.get(dv))
    vals = [safe_float(row.get(col)) for col in cols]
    vals = [v for v in vals if v is not None]
    return sum(vals) / len(vals) if vals else None


def apply_filters(rows, filters):
    original = len(rows)
    log = []

    def filt(condition_fn, label):
        nonlocal rows
        before = len(rows)
        rows = [r for r in rows if condition_fn(r)]
        after = len(rows)
        log.append((label, before - after))

    if filters.get('exclude_external_ai'):
        filt(lambda r: r.get('externalAi_used', '').strip().lower() == 'no',
             'exclude_external_ai (externalAi_used != no)')

    if filters.get('exclude_external_pdf'):
        filt(lambda r: r.get('externalPdf_used', '').strip().lower() == 'no',
             'exclude_external_pdf (externalPdf_used != no)')

    min_reading = filters.get('min_reading_time_ms', 0)
    if min_reading and min_reading > 0:
        filt(lambda r: (safe_float(r.get('reading_totalDuration_ms')) or 0) >= min_reading,
             f'min_reading_time_ms >= {min_reading}')

    min_chat = filters.get('min_chat_count', 0)
    if min_chat and min_chat > 0:
        filt(lambda r: (safe_float(r.get('chat_count')) or 0) >= min_chat,
             f'min_chat_count >= {min_chat}')

    min_focus = filters.get('min_attn_focus', 0)
    if min_focus and min_focus > 0:
        filt(lambda r: (safe_float(r.get('attn_focus')) or 0) >= min_focus,
             f'min_attn_focus >= {min_focus}')

    if filters.get('require_attn_check_pass'):
        filt(lambda r: safe_float(r.get('attn_stronglyDisagreeCheck')) == 1,
             'require_attn_check_pass (stronglyDisagreeCheck == 1)')

    return rows, original, log


def calc_stats(values):
    values = [v for v in values if v is not None]
    n = len(values)
    if n == 0:
        return {'n': 0, 'mean': None, 'sd': None, 'min': None, 'max': None}
    mean = sum(values) / n
    sd = math.sqrt(sum((v - mean) ** 2 for v in values) / (n - 1)) if n > 1 else 0.0
    return {'n': n, 'mean': mean, 'sd': sd, 'min': min(values), 'max': max(values)}


def calc_eta_squared(group1, group2):
    all_vals = group1 + group2
    grand_mean = sum(all_vals) / len(all_vals)
    ss_total = sum((v - grand_mean) ** 2 for v in all_vals)
    mean1 = sum(group1) / len(group1)
    mean2 = sum(group2) / len(group2)
    ss_between = len(group1) * (mean1 - grand_mean) ** 2 + len(group2) * (mean2 - grand_mean) ** 2
    return ss_between / ss_total if ss_total > 0 else 0.0


def fmt(val, decimals=3):
    if val is None:
        return 'N/A'
    return f'{val:.{decimals}f}'


def sig_stars(p):
    if p is None:
        return ''
    if p < 0.001:
        return '***'
    if p < 0.01:
        return '**'
    if p < 0.05:
        return '*'
    if p < 0.1:
        return '†'
    return ''


def run_analysis(config_path):
    config = load_config(config_path)
    rows = load_data(DATA_PATH)

    # 필터 적용
    filtered, original_n, filter_log = apply_filters(rows, config.get('filters', {}))

    # ── 그룹 분리 ─────────────────────────────────────────────────────────────
    subgroup_cfg = config.get('subgroup')
    if subgroup_cfg:
        # subgroup 모드: 특정 condition 내에서 col 기준으로 두 그룹 분리
        cond = subgroup_cfg['condition']
        col = subgroup_cfg['split_col']
        threshold = subgroup_cfg['threshold']
        label_low = subgroup_cfg.get('label_low', f'{col} < {threshold}')
        label_high = subgroup_cfg.get('label_high', f'{col} >= {threshold}')

        pool = [r for r in filtered if r.get('condition') == cond]
        group_a = [r for r in pool if (safe_float(r.get(col)) or 0) < threshold]
        group_b = [r for r in pool if (safe_float(r.get(col)) or 0) >= threshold]
        group_a_label, group_b_label = label_low, label_high
        is_subgroup = True
    else:
        group_a = [r for r in filtered if r.get('condition') == 'control']
        group_b = [r for r in filtered if r.get('condition') == 'ebm_cimo']
        group_a_label, group_b_label = 'control', 'ebm_cimo'
        is_subgroup = False

    # ── 결과 마크다운 작성 ────────────────────────────────────────────────────
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    lines = []

    lines.append(f'# Analysis Results — {config["name"]}')
    lines.append(f'\n**Generated:** {now}  ')
    lines.append(f'**Data:** `data/final-dataset/sessions_preprocessed.csv`\n')

    if is_subgroup:
        lines.append(f'> **Exploratory subgroup analysis** — {subgroup_cfg["condition"]} 조건 내 `{col}` 기준 분리 (threshold: {threshold})  \n'
                     f'> 그룹 크기가 작아 통계적 검정력이 제한적임. 결과는 탐색적으로 해석할 것.\n')

    # 필터 조건
    lines.append('---\n')
    lines.append('## Filters Applied\n')
    lines.append(f'- 전처리 전 세션 수: {original_n}')
    for label, removed in filter_log:
        lines.append(f'- `{label}`: {removed}명 제외')
    if is_subgroup:
        lines.append(f'- `condition == {subgroup_cfg["condition"]}` 로 제한: {len(filtered) - len(pool)}명 제외')
        lines.append(f'- **최종 분석 대상: {len(pool)}명** ({group_a_label}: {len(group_a)}, {group_b_label}: {len(group_b)})\n')
    else:
        lines.append(f'- **최종 분석 대상: {len(filtered)}명** (control: {len(group_a)}, ebm_cimo: {len(group_b)})\n')

    # 기술 통계 - 참여자
    lines.append('---\n')
    lines.append('## Descriptive Statistics\n')
    lines.append('### Participants\n')

    def class_dist(rows):
        d = {}
        for r in rows:
            c = r.get('class', '')
            d[c] = d.get(c, 0) + 1
        return ', '.join(f'{k}: {v}' for k, v in sorted(d.items()))

    lines.append(f'| | {group_a_label} (n={len(group_a)}) | {group_b_label} (n={len(group_b)}) | total (n={len(group_a)+len(group_b)}) |')
    lines.append('|--|--|--|--|')
    lines.append(f'| Class distribution | {class_dist(group_a)} | {class_dist(group_b)} | {class_dist(group_a + group_b)} |')

    # 매체 사용 현황
    lines.append('\n### Media Usage (complete sessions 기준)\n')
    lines.append(f'| | {group_a_label} | {group_b_label} |')
    lines.append('|--|--|--|')

    def pct(rows, col, threshold=1):
        vals = [safe_float(r.get(col)) or 0 for r in rows]
        used = sum(1 for v in vals if v >= threshold)
        return f'{used}/{len(rows)} ({100*used/len(rows):.1f}%)' if rows else 'N/A'

    def bool_pct(rows, col):
        used = sum(1 for r in rows if str(r.get(col, '')).strip().lower() in ('true', '1'))
        return f'{used}/{len(rows)} ({100*used/len(rows):.1f}%)' if rows else 'N/A'

    lines.append(f'| Chat 사용 (≥1 turn) | {pct(group_a, "chat_count", 1)} | {pct(group_b, "chat_count", 1)} |')
    lines.append(f'| Audio 사용 | {bool_pct(group_a, "resourcesUsed_audio")} | {bool_pct(group_b, "resourcesUsed_audio")} |')
    lines.append(f'| Video 사용 | {bool_pct(group_a, "resourcesUsed_video")} | {bool_pct(group_b, "resourcesUsed_video")} |')
    lines.append(f'| Infographics 사용 | {bool_pct(group_a, "resourcesUsed_infographics")} | {bool_pct(group_b, "resourcesUsed_infographics")} |')

    # DV별 기술통계 + ANOVA
    lines.append('\n---\n')
    lines.append('## ANOVA Results\n')
    lines.append('`*` p<.05, `**` p<.01, `***` p<.001, `†` p<.10\n')

    dvs = config.get('dependent_vars', [])

    # Build Self-Efficacy DV list: individual items grouped by subcategory, then subcategory avgs, then overall
    _dvs_set = set(dvs)
    _se_dvs = []
    for _subcat, _items in SE_SUBCATEGORIES.items():
        _se_dvs.extend([d for d in _items if d in _dvs_set])
        if _subcat in _dvs_set:
            _se_dvs.append(_subcat)
    _se_dvs.append('se_overall')

    categories = [
        ('Self-Efficacy', _se_dvs),
        ('NASA-TLX', [d for d in dvs if d.startswith('nasa_')]),
        ('LLM Usefulness', [d for d in dvs if d.startswith('llmUsefulness_')] + ['llmUsefulness_composite']),
        ('LLM Trust', [d for d in dvs if d.startswith('llmTrust_')] + ['llmTrust_composite']),
        ('Post-Task', [d for d in dvs if d.startswith('postTask_')]),
        ('Reading Behavior', [d for d in dvs if d in ('reading_totalDuration_ms', 'chat_count')]),
    ]

    for cat_name, cat_dvs in categories:
        cat_dvs = [d for d in cat_dvs if d in dvs or d in COMPOSITE_FIELDS or d in SE_SUBCATEGORIES or d == 'se_overall']
        if not cat_dvs:
            continue

        has_composite = any(d in COMPOSITE_DVS for d in cat_dvs)

        lines.append(f'### {cat_name}\n')
        lines.append(f'| Dependent Variable | {group_a_label} M (SD) | {group_b_label} M (SD) | F | p | η² |')
        lines.append('|--|--|--|--|--|--|')

        for dv in cat_dvs:
            is_composite = dv in COMPOSITE_DVS

            if is_composite:
                lines.append('| **──** | **──** | **──** | **──** | **──** | **──** |')

            a_vals = [get_value(r, dv) for r in group_a]
            b_vals = [get_value(r, dv) for r in group_b]
            a_vals = [v for v in a_vals if v is not None]
            b_vals = [v for v in b_vals if v is not None]

            a_s = calc_stats(a_vals)
            b_s = calc_stats(b_vals)

            label = DV_LABELS.get(dv, dv)
            if dv in DV_QUESTIONS:
                label = f'{label}<br><sub><i>{DV_QUESTIONS[dv]}</i></sub>'
            if has_composite and not is_composite:
                label = '　' + label

            if len(a_vals) >= 2 and len(b_vals) >= 2:
                f_stat, p_val = stats.f_oneway(a_vals, b_vals)
                eta2 = calc_eta_squared(a_vals, b_vals)
                stars = sig_stars(p_val)
                sig = p_val < 0.05
                def cell(s, sig=sig):
                    return f'**<u>{s}</u>**' if sig else s
                a_mean_sd = f'{fmt(a_s["mean"], 2)} ({fmt(a_s["sd"], 2)})'
                b_mean_sd = f'{fmt(b_s["mean"], 2)} ({fmt(b_s["sd"], 2)})'
                p_str = f'{fmt(p_val, 3)}{stars}'
                row = (f'| {cell(label)} '
                       f'| {cell(a_mean_sd)} '
                       f'| {cell(b_mean_sd)} '
                       f'| {cell(fmt(f_stat, 2))} '
                       f'| {cell(p_str)} '
                       f'| {cell(fmt(eta2, 3))} |')
            else:
                row = f'| {label} | {fmt(a_s["mean"], 2)} ({fmt(a_s["sd"], 2)}) | {fmt(b_s["mean"], 2)} ({fmt(b_s["sd"], 2)}) | — | — | — |'

            lines.append(row)

        lines.append('')

    # 저장
    os.makedirs(RESULTS_DIR, exist_ok=True)
    timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M')
    output_name = build_output_name(config_path, config)
    out_path = os.path.join(RESULTS_DIR, f'{timestamp}_{output_name}.md')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    print(f'완료: {out_path}')
    print(f'분석 대상: {len(group_a) + len(group_b)}명 ({group_a_label}: {len(group_a)}, {group_b_label}: {len(group_b)})')


if __name__ == '__main__':
    config_path = sys.argv[1] if len(sys.argv) >= 2 else os.path.join(SCRIPT_DIR, 'config_se_individual.yaml')
    run_analysis(config_path)
