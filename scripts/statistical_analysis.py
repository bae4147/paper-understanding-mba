#!/usr/bin/env python3
"""
통계 분석 스크립트 (scipy 기반)

사용법:
    python scripts/statistical_analysis.py <csv-dir> <output-dir>

분석 내용:
    - One-way ANOVA (조건 간 비교)
    - 효과 크기 (Cohen's d)
"""

import sys
import os
import json
import pandas as pd
import numpy as np
from scipy import stats


def cohens_d(group1, group2):
    """Cohen's d 효과 크기 계산"""
    n1, n2 = len(group1), len(group2)
    var1, var2 = group1.var(), group2.var()

    # Pooled standard deviation
    pooled_std = np.sqrt(((n1 - 1) * var1 + (n2 - 1) * var2) / (n1 + n2 - 2))

    if pooled_std == 0:
        return 0

    return (group1.mean() - group2.mean()) / pooled_std


def interpret_cohens_d(d):
    """Cohen's d 해석"""
    d_abs = abs(d)
    if d_abs < 0.2:
        return "negligible"
    elif d_abs < 0.5:
        return "small"
    elif d_abs < 0.8:
        return "medium"
    else:
        return "large"


def format_p_value(p):
    """p-value 포맷팅"""
    if p < 0.001:
        return "<.001"
    else:
        return f"{p:.3f}"


def run_anova(control_vals, ebm_vals):
    """One-way ANOVA 실행"""
    control = np.array([v for v in control_vals if pd.notna(v)])
    ebm = np.array([v for v in ebm_vals if pd.notna(v)])

    if len(control) < 2 or len(ebm) < 2:
        return None

    # ANOVA
    f_stat, p_value = stats.f_oneway(control, ebm)

    # Cohen's d
    d = cohens_d(pd.Series(control), pd.Series(ebm))

    # Which is higher?
    higher = "Control" if control.mean() > ebm.mean() else "EBM-CIMO" if ebm.mean() > control.mean() else "Equal"

    return {
        "control_mean": round(control.mean(), 2),
        "control_sd": round(control.std(), 2),
        "control_n": len(control),
        "ebm_mean": round(ebm.mean(), 2),
        "ebm_sd": round(ebm.std(), 2),
        "ebm_n": len(ebm),
        "F": round(f_stat, 3),
        "p": p_value,
        "p_formatted": format_p_value(p_value),
        "significant": p_value < 0.05,
        "cohens_d": round(d, 3),
        "effect_size": interpret_cohens_d(d),
        "higher": higher,
    }


def analyze_sessions(sessions_df):
    """세션 데이터 분석"""
    results = {}

    control = sessions_df[sessions_df['condition'] == 'control']
    ebm = sessions_df[sessions_df['condition'] == 'ebm_cimo']

    # LLM 사용량
    results['chatMessageCount'] = run_anova(
        control['chatMessageCount'].values,
        ebm['chatMessageCount'].values
    )

    # 총 소요 시간 (분 단위)
    results['totalDuration'] = run_anova(
        control['totalDuration'].values / 60000,
        ebm['totalDuration'].values / 60000
    )

    return results


def analyze_survey(survey_df):
    """설문 데이터 분석"""
    results = {
        'nasaTLX': {},
        'selfEfficacy': {},
        'postTask': {},
    }

    control = survey_df[survey_df['condition'] == 'control']
    ebm = survey_df[survey_df['condition'] == 'ebm_cimo']

    # NASA-TLX
    nasa_items = ['mentalDemand', 'physicalDemand', 'temporalDemand', 'effort', 'frustration', 'performance']
    for item in nasa_items:
        col = f'nasaTLX_{item}'
        if col in survey_df.columns:
            results['nasaTLX'][item] = run_anova(
                control[col].values,
                ebm[col].values
            )

    # Self-Efficacy
    se_cols = [c for c in survey_df.columns if c.startswith('selfEfficacy_')]
    for col in se_cols:
        item_name = col.replace('selfEfficacy_', '')
        results['selfEfficacy'][item_name] = run_anova(
            control[col].values,
            ebm[col].values
        )

    # Post Task
    post_task_items = [
        ('postTask_strategiesCount', 'Q1_strategiesCount'),
        ('postTask_contextTranslationCount', 'Q2_contextTranslationCount'),
        ('postTask_newStrategyConfidence', 'newStrategyConfidence'),
        ('postTask_implementationLikelihood', 'implementationLikelihood'),
    ]
    for col, name in post_task_items:
        if col in survey_df.columns:
            results['postTask'][name] = run_anova(
                control[col].values,
                ebm[col].values
            )

    return results


def generate_markdown_report(session_results, survey_results, output_path):
    """Markdown 보고서 생성"""
    md = []
    md.append("# 통계 분석 결과 (Statistical Analysis Results)\n")
    md.append("> **분석 기법**: One-way ANOVA (scipy.stats.f_oneway)\n")
    md.append("> **효과 크기**: Cohen's d\n\n")

    def format_result_row(name, r):
        if r is None:
            return f"| {name} | - | - | - | - | - | - |\n"

        ctrl_str = f"{r['control_mean']} ({r['control_sd']})"
        ebm_str = f"{r['ebm_mean']} ({r['ebm_sd']})"
        p_str = r['p_formatted']
        if r['significant']:
            p_str += " ✓"
        d_str = f"{r['cohens_d']} ({r['effect_size']})"

        return f"| {name} | {ctrl_str} | {ebm_str} | {r['higher']} | {p_str} | {d_str} |\n"

    # LLM 사용
    md.append("## LLM 사용 통계\n\n")
    md.append("| 지표 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | Cohen's d |\n")
    md.append("|------|---------------|----------------|----------|---------|----------|\n")
    if 'chatMessageCount' in session_results:
        md.append(format_result_row("세션당 메시지 수", session_results['chatMessageCount']))
    if 'totalDuration' in session_results:
        md.append(format_result_row("총 소요 시간 (분)", session_results['totalDuration']))
    md.append("\n")

    # NASA-TLX
    if survey_results['nasaTLX']:
        md.append("## NASA-TLX (1-7점)\n\n")
        md.append("| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | Cohen's d |\n")
        md.append("|------|---------------|----------------|----------|---------|----------|\n")
        for item, r in survey_results['nasaTLX'].items():
            md.append(format_result_row(item, r))
        md.append("\n")

    # Self-Efficacy (카테고리별로 그룹화)
    if survey_results['selfEfficacy']:
        md.append("## Self-Efficacy (1-7점)\n\n")

        categories = {
            'overallComprehension': 'Reading Comprehension',
            'criticalEngagement': 'Critical Engagement',
            'applicability': 'Applicability',
        }

        for cat_key, cat_title in categories.items():
            cat_items = {k: v for k, v in survey_results['selfEfficacy'].items() if k.startswith(cat_key)}
            if cat_items:
                md.append(f"### {cat_title}\n\n")
                md.append("| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | Cohen's d |\n")
                md.append("|------|---------------|----------------|----------|---------|----------|\n")
                for item, r in cat_items.items():
                    short_name = item.replace(f"{cat_key}_", "")
                    md.append(format_result_row(short_name, r))
                md.append("\n")

    # Post Task
    if survey_results['postTask']:
        md.append("## Post Task\n\n")
        md.append("| 항목 | Control M(SD) | EBM-CIMO M(SD) | 높은 조건 | p-value | Cohen's d |\n")
        md.append("|------|---------------|----------------|----------|---------|----------|\n")
        for item, r in survey_results['postTask'].items():
            md.append(format_result_row(item, r))
        md.append("\n")

    # 범례
    md.append("---\n\n")
    md.append("**범례**:\n")
    md.append("- p < 0.05 인 경우 ✓ 표시\n")
    md.append("- Cohen's d 해석: negligible (<0.2), small (0.2-0.5), medium (0.5-0.8), large (>0.8)\n")

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(''.join(md))

    return ''.join(md)


def main():
    if len(sys.argv) < 3:
        print("사용법: python scripts/statistical_analysis.py <csv-dir> <output-dir>")
        sys.exit(1)

    csv_dir = sys.argv[1]
    output_dir = sys.argv[2]

    print("=" * 60)
    print("통계 분석 (scipy)")
    print("=" * 60)

    # CSV 파일 로드
    sessions_path = os.path.join(csv_dir, 'sessions.csv')
    survey_path = os.path.join(csv_dir, 'survey_responses.csv')

    if not os.path.exists(sessions_path):
        print(f"Error: {sessions_path} not found")
        sys.exit(1)

    sessions_df = pd.read_csv(sessions_path)
    print(f"세션 데이터 로드: {len(sessions_df)} rows")

    survey_df = None
    if os.path.exists(survey_path):
        survey_df = pd.read_csv(survey_path)
        print(f"설문 데이터 로드: {len(survey_df)} rows")

    # 분석 실행
    print("\n분석 중...")

    session_results = analyze_sessions(sessions_df)
    survey_results = {'nasaTLX': {}, 'selfEfficacy': {}, 'postTask': {}}

    if survey_df is not None:
        survey_results = analyze_survey(survey_df)

    # 결과 저장
    stats_dir = os.path.join(output_dir, 'stats')
    os.makedirs(stats_dir, exist_ok=True)

    # JSON 저장
    all_results = {
        'sessions': session_results,
        'survey': survey_results,
    }
    json_path = os.path.join(stats_dir, 'anova_results.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)
    print(f"  ✓ {json_path}")

    # Markdown 저장
    md_path = os.path.join(stats_dir, 'anova_results.md')
    report = generate_markdown_report(session_results, survey_results, md_path)
    print(f"  ✓ {md_path}")

    # 콘솔 출력
    print("\n" + report)

    print("\n완료!")


if __name__ == '__main__':
    main()
