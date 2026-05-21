#!/usr/bin/env python3
"""
클러스터 분석 HTML 시각화
- 탭별 k=2/3/4
- 각 탭: 매체 프로파일 bar + 주요 DV별 box plot
- ANOVA 결과 테이블
"""

import os
import json
import numpy as np
import pandas as pd
from scipy import stats
from kmodes.kmodes import KModes

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SAMPLE_PATH = os.path.join(SCRIPT_DIR, 'analysis_sample.csv')
OUT_PATH    = os.path.join(SCRIPT_DIR, 'cluster_viz.html')

MEDIA_COLS = ['used_chat', 'used_audio', 'used_video', 'used_infog']
MEDIA_LABELS = ['Chat', 'Audio', 'Video', 'Infog']

DV_GROUPS = {
    'Self-Efficacy OC': [
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
    'Self-Efficacy CE': [
        ('S3_se_ce_ownIdeas',              'CE: Own Ideas'),
        ('S3_se_ce_alternativePerspectives','CE: Alt. Perspectives'),
        ('S3_se_ce_verifyCredibility',     'CE: Verify Credibility'),
        ('S3_se_ce_questionClaims',        'CE: Question Claims'),
        ('S3_se_ce_broaderImplications',   'CE: Broader Implications'),
    ],
    'Self-Efficacy AP': [
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
        ('S3_llmTrust_competence',             'Competence'),
        ('S3_llmTrust_accuracy',               'Accuracy'),
        ('S3_llmTrust_benevolence',            'Benevolence'),
        ('S3_llmTrust_reliability',            'Reliability'),
        ('S3_llmTrust_comfortActing',          'Comfort Acting'),
        ('S3_llmTrust_comfortUsing',           'Comfort Using'),
        ('S3_llmTrust_relyWithoutReading',     'Rely w/o Reading'),
        ('S3_llmTrust_assumeClearIsAccurate',  'Assume Clear=Accurate'),
        ('S3_llmTrust_confidentWithoutDetails','Confident w/o Details'),
        ('S3_llmTrust_relyForImportance',      'Rely for Importance'),
    ],
    'Post-Task': [
        ('S3_postTask_implementationLikelihood', 'Implementation Likelihood'),
        ('S3_postTask_newStrategyConfidence',    'New Strategy Confidence'),
    ],
}

COLORS = ['#4C72B0', '#DD8452', '#55A868', '#C44E52']

def eta_squared(groups):
    all_vals = np.concatenate(groups)
    grand_mean = all_vals.mean()
    ss_between = sum(len(g) * (g.mean() - grand_mean)**2 for g in groups)
    ss_total   = sum((v - grand_mean)**2 for v in all_vals)
    return ss_between / ss_total if ss_total > 0 else 0

def sig_label(p):
    if p < .001: return '***'
    if p < .01:  return '**'
    if p < .05:  return '*'
    if p < .10:  return '†'
    return ''

def fit_kmodes(X, k, n_init=100):
    km = KModes(n_clusters=k, init='random', n_init=n_init, verbose=0)
    km.fit(X)
    return km

def box_stats(vals):
    vals = sorted(vals)
    q1, med, q3 = np.percentile(vals, [25, 50, 75])
    iqr = q3 - q1
    lo = max(min(vals), q1 - 1.5*iqr)
    hi = min(max(vals), q3 + 1.5*iqr)
    outliers = [v for v in vals if v < lo or v > hi]
    return {'min': lo, 'q1': q1, 'med': med, 'q3': q3, 'max': hi,
            'mean': np.mean(vals), 'outliers': outliers}

def build_tab_data(df, k):
    cluster_col = f'cluster_k{k}'
    clusters = sorted(df[cluster_col].unique())

    # 매체 프로파일
    profile = []
    for c in clusters:
        sub = df[df[cluster_col] == c]
        profile.append({
            'label': f'C{c} (n={len(sub)})',
            'color': COLORS[c-1],
            'values': [round(sub[col].mean(), 3) for col in MEDIA_COLS],
            'n': len(sub),
        })

    # DV box plots + ANOVA
    dv_data = []
    for group_name, dvs in DV_GROUPS.items():
        for col, label in dvs:
            if col not in df.columns:
                continue
            groups = [df[df[cluster_col] == c][col].dropna().values for c in clusters]
            if any(len(g) < 2 for g in groups):
                continue
            F, p = stats.f_oneway(*groups)
            eta2 = eta_squared(groups)
            sig = sig_label(p)
            boxes = []
            for ci, (c, g) in enumerate(zip(clusters, groups)):
                bs = box_stats(g.tolist())
                bs['cluster'] = f'C{c}'
                bs['color'] = COLORS[ci]
                bs['n'] = len(g)
                boxes.append(bs)
            dv_data.append({
                'group': group_name,
                'label': label,
                'col': col,
                'F': round(F, 2),
                'p': round(p, 3),
                'eta2': round(eta2, 3),
                'sig': sig,
                'boxes': boxes,
            })

    return {'profile': profile, 'dvs': dv_data, 'clusters': [f'C{c}' for c in clusters]}

def main():
    df = pd.read_csv(SAMPLE_PATH)
    X  = df[MEDIA_COLS].values.astype(int)

    tabs = {}
    for k in [2, 3, 4]:
        km = fit_kmodes(X, k)
        df[f'cluster_k{k}'] = km.labels_ + 1
        tabs[k] = build_tab_data(df, k)

    data_json = json.dumps(tabs)

    html = f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>Cluster Analysis — Media Use Patterns</title>
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
         background: #f5f6fa; color: #2d3436; }}
  h1 {{ padding: 24px 32px 8px; font-size: 1.4rem; color: #2d3436; }}
  .subtitle {{ padding: 0 32px 20px; color: #636e72; font-size: 0.9rem; }}

  /* tabs */
  .tab-bar {{ display: flex; gap: 6px; padding: 0 32px 0;
              border-bottom: 2px solid #dfe6e9; }}
  .tab-btn {{ padding: 10px 24px; border: none; background: none; cursor: pointer;
              font-size: 1rem; color: #636e72; border-bottom: 3px solid transparent;
              margin-bottom: -2px; font-weight: 500; transition: all .2s; }}
  .tab-btn.active {{ color: #0984e3; border-bottom-color: #0984e3; }}
  .tab-btn:hover {{ color: #0984e3; }}

  .tab-content {{ display: none; padding: 28px 32px; }}
  .tab-content.active {{ display: block; }}

  /* section cards */
  .card {{ background: white; border-radius: 12px; padding: 24px;
           box-shadow: 0 2px 8px rgba(0,0,0,.07); margin-bottom: 24px; }}
  .card h2 {{ font-size: 1.05rem; margin-bottom: 18px; color: #2d3436;
              display: flex; align-items: center; gap: 8px; }}

  /* profile bar chart */
  .profile-chart {{ display: flex; flex-direction: column; gap: 14px; }}
  .media-row {{ display: flex; align-items: center; gap: 10px; }}
  .media-name {{ width: 48px; font-size: 0.82rem; color: #636e72;
                 text-align: right; flex-shrink: 0; }}
  .bar-group {{ display: flex; flex-direction: column; gap: 4px; flex: 1; }}
  .bar-wrap {{ display: flex; align-items: center; gap: 8px; }}
  .bar-label {{ font-size: 0.75rem; width: 90px; flex-shrink: 0; color: #636e72; }}
  .bar-track {{ flex: 1; background: #f0f0f0; border-radius: 4px; height: 22px;
                position: relative; }}
  .bar-fill {{ height: 100%; border-radius: 4px; transition: width .4s;
               display: flex; align-items: center; padding-left: 8px;
               font-size: 0.78rem; color: white; font-weight: 600;
               min-width: 30px; }}
  .half-line {{ position: absolute; left: 50%; top: 0; bottom: 0;
                width: 2px; background: #b2bec3; opacity: .5; }}

  /* DV section */
  .dv-filter {{ display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }}
  .filter-btn {{ padding: 5px 14px; border-radius: 20px; border: 1.5px solid #dfe6e9;
                 background: white; cursor: pointer; font-size: 0.82rem;
                 color: #636e72; transition: all .15s; }}
  .filter-btn.active {{ background: #0984e3; border-color: #0984e3; color: white; }}

  .dv-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
              gap: 16px; }}
  .dv-card {{ background: #fafbfc; border: 1px solid #eee; border-radius: 10px;
              padding: 16px; }}
  .dv-header {{ display: flex; justify-content: space-between; align-items: flex-start;
                margin-bottom: 12px; }}
  .dv-name {{ font-size: 0.88rem; font-weight: 600; color: #2d3436; }}
  .dv-group {{ font-size: 0.72rem; color: #b2bec3; margin-top: 2px; }}
  .anova-badge {{ font-size: 0.75rem; padding: 2px 8px; border-radius: 10px;
                  background: #f0f0f0; color: #636e72; white-space: nowrap; }}
  .anova-badge.sig {{ background: #fff3cd; color: #856404; }}
  .anova-badge.sig-strong {{ background: #d1ecf1; color: #0c5460; }}
  .anova-badge.sig-vstrong {{ background: #cce5ff; color: #004085; }}

  /* box plot svg */
  .box-svg-wrap {{ overflow: visible; }}

  /* ANOVA summary table */
  table {{ width: 100%; border-collapse: collapse; font-size: 0.84rem; }}
  th {{ background: #f8f9fa; padding: 8px 12px; text-align: left;
        border-bottom: 2px solid #dee2e6; color: #495057; font-weight: 600; }}
  td {{ padding: 7px 12px; border-bottom: 1px solid #f0f0f0; }}
  tr:hover td {{ background: #f8f9fa; }}
  .sig-star {{ color: #e17055; font-weight: 700; }}
  .sig-dagger {{ color: #fdcb6e; font-weight: 700; }}
  .highlight-row td {{ background: #fff9e6 !important; }}
</style>
</head>
<body>
<h1>Cluster Analysis — Media Use Behavioral Patterns</h1>
<p class="subtitle">K-modes clustering on binary media use (n=94 MBA) · used_chat / used_audio / used_video / used_infog</p>

<div class="tab-bar">
  <button class="tab-btn active" onclick="showTab(2, this)">k = 2</button>
  <button class="tab-btn" onclick="showTab(3, this)">k = 3</button>
  <button class="tab-btn" onclick="showTab(4, this)">k = 4</button>
</div>

<div id="tab-2" class="tab-content active"></div>
<div id="tab-3" class="tab-content"></div>
<div id="tab-4" class="tab-content"></div>

<script>
const DATA = {data_json};

function showTab(k, btn) {{
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + k).classList.add('active');
}}

function badgeClass(p) {{
  if (p < .05)  return 'anova-badge sig-strong';
  if (p < .10)  return 'anova-badge sig';
  return 'anova-badge';
}}

function renderBoxPlot(boxes, width=280, height=70) {{
  const pad = {{l:36, r:8, t:8, b:24}};
  const W = width - pad.l - pad.r;
  const H = height - pad.t - pad.b;
  const allVals = boxes.flatMap(b => [b.min, b.max, ...b.outliers]);
  const lo = Math.min(...allVals, 1);
  const hi = Math.max(...allVals, 7);
  const sc = v => pad.l + (v - lo) / (hi - lo) * W;

  const bh = Math.min(18, H / boxes.length - 4);
  const step = H / boxes.length;

  let svgH = height + (boxes.length - 1) * 4;
  let svg = `<svg width="${{width}}" height="${{svgH}}" style="overflow:visible">`;

  // grid lines at 1,3,5,7
  for (let v of [1,2,3,4,5,6,7]) {{
    const x = sc(v);
    svg += `<line x1="${{x}}" y1="${{pad.t}}" x2="${{x}}"
      y2="${{pad.t + H + (boxes.length-1)*4}}"
      stroke="#e0e0e0" stroke-width="1"/>`;
    svg += `<text x="${{x}}" y="${{svgH-2}}" text-anchor="middle"
      font-size="9" fill="#aaa">${{v}}</text>`;
  }}

  boxes.forEach((b, i) => {{
    const cy = pad.t + i * (step + 2) + bh/2;
    const x1 = sc(b.q1), x3 = sc(b.q3), xm = sc(b.med), xmn = sc(b.min), xmx = sc(b.max);
    const xmean = sc(b.mean);
    // whiskers
    svg += `<line x1="${{xmn}}" y1="${{cy}}" x2="${{x1}}" y2="${{cy}}"
      stroke="${{b.color}}" stroke-width="1.5" opacity=".7"/>`;
    svg += `<line x1="${{x3}}" y1="${{cy}}" x2="${{xmx}}" y2="${{cy}}"
      stroke="${{b.color}}" stroke-width="1.5" opacity=".7"/>`;
    // caps
    svg += `<line x1="${{xmn}}" y1="${{cy-5}}" x2="${{xmn}}" y2="${{cy+5}}"
      stroke="${{b.color}}" stroke-width="1.5" opacity=".7"/>`;
    svg += `<line x1="${{xmx}}" y1="${{cy-5}}" x2="${{xmx}}" y2="${{cy+5}}"
      stroke="${{b.color}}" stroke-width="1.5" opacity=".7"/>`;
    // box
    svg += `<rect x="${{x1}}" y="${{cy - bh/2}}" width="${{x3-x1}}" height="${{bh}}"
      fill="${{b.color}}" opacity=".25" rx="2"/>`;
    svg += `<rect x="${{x1}}" y="${{cy - bh/2}}" width="${{x3-x1}}" height="${{bh}}"
      fill="none" stroke="${{b.color}}" stroke-width="1.5" rx="2"/>`;
    // median
    svg += `<line x1="${{xm}}" y1="${{cy - bh/2}}" x2="${{xm}}" y2="${{cy + bh/2}}"
      stroke="${{b.color}}" stroke-width="2.5"/>`;
    // mean diamond
    svg += `<polygon points="${{xmean}},${{cy-5}} ${{xmean+4}},${{cy}} ${{xmean}},${{cy+5}} ${{xmean-4}},${{cy}}"
      fill="${{b.color}}" opacity=".8"/>`;
    // cluster label
    svg += `<text x="${{pad.l - 4}}" y="${{cy + 4}}" text-anchor="end"
      font-size="9" fill="${{b.color}}" font-weight="600">${{b.cluster}}</text>`;
    // outliers
    b.outliers.forEach(ov => {{
      svg += `<circle cx="${{sc(ov)}}" cy="${{cy}}" r="3"
        fill="none" stroke="${{b.color}}" stroke-width="1.2" opacity=".6"/>`;
    }});
  }});
  svg += '</svg>';
  return svg;
}}

function renderTab(k) {{
  const d = DATA[k];
  const el = document.getElementById('tab-' + k);

  // ── 1. 매체 프로파일 ──────────────────────────────────────────────────
  let profileHTML = `<div class="card">
    <h2>📊 Media Use Profile</h2>
    <div class="profile-chart">`;

  const mediaNames = ['Chat', 'Audio', 'Video', 'Infog'];
  mediaNames.forEach((m, mi) => {{
    profileHTML += `<div class="media-row">
      <div class="media-name">${{m}}</div>
      <div class="bar-group">`;
    d.profile.forEach(cl => {{
      const pct = (cl.values[mi] * 100).toFixed(0);
      profileHTML += `<div class="bar-wrap">
        <div class="bar-label">${{cl.label}}</div>
        <div class="bar-track">
          <div class="half-line"></div>
          <div class="bar-fill" style="width:${{cl.values[mi]*100}}%;background:${{cl.color}}">
            ${{pct}}%
          </div>
        </div>
      </div>`;
    }});
    profileHTML += `</div></div>`;
  }});
  profileHTML += `</div></div>`;

  // ── 2. DV 박스플롯 ────────────────────────────────────────────────────
  const groups = [...new Set(d.dvs.map(dv => dv.group))];
  let filterHTML = `<div class="dv-filter" id="filter-k${{k}}">`;
  groups.forEach((g, gi) => {{
    filterHTML += `<button class="filter-btn${{gi===0?' active':''}}"
      onclick="filterGroup(${{k}},'${{g}}',this)">${{g}}</button>`;
  }});
  filterHTML += '</div>';

  let dvHTML = `<div class="card">
    <h2>📈 DV Distribution by Cluster</h2>
    ${{filterHTML}}
    <div class="dv-grid" id="dvgrid-k${{k}}">`;

  d.dvs.forEach(dv => {{
    const sigClass = dv.p < .05 ? 'sig-strong' : dv.p < .10 ? 'sig' : '';
    const highlight = dv.p < .10 ? ' style="border:1.5px solid #fdcb6e"' : '';
    dvHTML += `<div class="dv-card" data-group="${{dv.group}}"${{highlight}}>
      <div class="dv-header">
        <div>
          <div class="dv-name">${{dv.label}}</div>
          <div class="dv-group">${{dv.group}}</div>
        </div>
        <div class="anova-badge ${{sigClass}}">
          F=${{dv.F}} p=${{dv.p}}${{dv.sig}} η²=${{dv.eta2}}
        </div>
      </div>
      ${{renderBoxPlot(dv.boxes)}}
    </div>`;
  }});
  dvHTML += '</div></div>';

  // ── 3. ANOVA 요약 테이블 ──────────────────────────────────────────────
  const sigDvs = d.dvs.filter(dv => dv.p < .10).sort((a,b) => a.p - b.p);
  let tableHTML = `<div class="card">
    <h2>📋 ANOVA Summary (p &lt; .10)</h2>`;

  if (sigDvs.length === 0) {{
    tableHTML += '<p style="color:#b2bec3;font-size:.9rem">유의한 결과 없음</p>';
  }} else {{
    const meanCols = d.clusters.map(c => `<th>${{c}} M (SD)</th>`).join('');
    tableHTML += `<table><thead><tr>
      <th>DV</th><th>Group</th>${{meanCols}}
      <th>F</th><th>p</th><th>η²</th>
    </tr></thead><tbody>`;

    sigDvs.forEach(dv => {{
      const rowClass = dv.p < .05 ? 'highlight-row' : '';
      const meanCells = dv.boxes.map(b =>
        `<td>${{b.mean.toFixed(2)}} (${{(b.q3-b.q1 > 0 ? b.q3-b.q1 : 0).toFixed(2)}})</td>`
      ).join('');
      const sigSpan = dv.sig ?
        `<span class="${{dv.p<.05?'sig-star':'sig-dagger'}}">${{dv.sig}}</span>` : '';
      tableHTML += `<tr class="${{rowClass}}">
        <td><strong>${{dv.label}}</strong></td>
        <td style="color:#b2bec3;font-size:.8rem">${{dv.group}}</td>
        ${{meanCells}}
        <td>${{dv.F}}</td>
        <td>${{dv.p}}${{sigSpan}}</td>
        <td>${{dv.eta2}}</td>
      </tr>`;
    }});
    tableHTML += '</tbody></table>';
  }}
  tableHTML += '</div>';

  el.innerHTML = profileHTML + dvHTML + tableHTML;

  // 첫 그룹 필터 적용
  filterGroup(k, groups[0], document.querySelector(`#filter-k${{k}} .filter-btn`));
}}

function filterGroup(k, groupName, btn) {{
  document.querySelectorAll(`#filter-k${{k}} .filter-btn`).forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll(`#dvgrid-k${{k}} .dv-card`).forEach(card => {{
    card.style.display = card.dataset.group === groupName ? '' : 'none';
  }});
}}

// 초기 렌더링
[2, 3, 4].forEach(k => renderTab(k));
</script>
</body>
</html>"""

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"저장: {OUT_PATH}")

if __name__ == '__main__':
    main()
