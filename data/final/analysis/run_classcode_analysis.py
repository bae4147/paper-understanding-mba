"""
ClassCode sensitivity analysis
  Part 1: Media usage patterns by ClassCode
  Part 2: Leave-one-out CIMO vs. Control (ANOVA) — what changes when each class is excluded
"""

import os
import sys
import pandas as pd
import numpy as np
from scipy import stats
from datetime import datetime

# ── Paths ────────────────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR   = os.path.join(SCRIPT_DIR, "..")
DATA_PATH  = os.path.join(DATA_DIR, "sessions_with_classcode.csv")
OUT_DIR    = os.path.join(SCRIPT_DIR, "results")
os.makedirs(OUT_DIR, exist_ok=True)

# ── Filters (same as config_se_individual.yaml) ───────────────────────────────
FILTERS = dict(
    exclude_external_ai   = True,
    min_chat_count        = 3,
    min_attn_focus        = 3,
    require_attn_check    = True,
)

# ── Computed composites ───────────────────────────────────────────────────────
SE_OC_ITEMS = ["se_oc_overallGoal","se_oc_authorsReasoning","se_oc_connectingIdeas",
               "se_oc_evidenceUnderstanding","se_oc_keyResultsUnderstanding",
               "se_oc_keyTermsUnderstanding","se_oc_researchDesignUnderstanding",
               "se_oc_sampleContextUnderstanding","se_oc_limitationsUnderstanding"]
SE_CE_ITEMS = ["se_ce_ownIdeas","se_ce_alternativePerspectives","se_ce_verifyCredibility",
               "se_ce_questionClaims","se_ce_broaderImplications"]
SE_AP_ITEMS = ["se_ap_contextDifferences","se_ap_differencesImpact","se_ap_mechanisms",
               "se_ap_outcomes","se_ap_confidence","se_ap_decision"]

# Key DVs for leave-one-out comparison
KEY_DVS = ["se_oc","se_ce","se_ap","nasa_performance","postTask_implementationLikelihood","chat_count"]
KEY_DV_LABELS = {
    "se_oc":  "SE: Overall Comprehension",
    "se_ce":  "SE: Critical Engagement",
    "se_ap":  "SE: Applicability",
    "nasa_performance": "NASA-TLX: Performance",
    "postTask_implementationLikelihood": "Post-Task: Implementation Likelihood",
    "chat_count": "Chat Query Count",
}

MEDIA_VARS = {
    "chat_count":               "Chat: Query Count",
    "focusTime_chat_ms":        "Focus Time: Chat (min)",
    "focusTime_audio_ms":       "Focus Time: Audio (min)",
    "focusTime_video_ms":       "Focus Time: Video (min)",
    "focusTime_infographics_ms":"Focus Time: Infographics (min)",
    "audio_playback_duration_sec": "Audio Playback (min)",
    "video_playback_duration_sec": "Video Playback (min)",
}

CLASSCODE_NAMES = {1:"Wed (CC1)", 2:"Tue (CC2)", 3:"Sat (CC3)", 4:"Honda (CC4)", 5:"BusOBA (CC5)"}

# ── Load & preprocess ─────────────────────────────────────────────────────────
def load_data():
    df = pd.read_csv(DATA_PATH)

    # Compute composites
    df["se_oc"] = df[SE_OC_ITEMS].mean(axis=1)
    df["se_ce"] = df[SE_CE_ITEMS].mean(axis=1)
    df["se_ap"] = df[SE_AP_ITEMS].mean(axis=1)

    # ms → minutes for focus times
    for col in ["focusTime_chat_ms","focusTime_audio_ms","focusTime_video_ms","focusTime_infographics_ms"]:
        df[col.replace("_ms","_min")] = df[col] / 60000

    # seconds → minutes for playback
    df["audio_playback_duration_min"] = df["audio_playback_duration_sec"] / 60
    df["video_playback_duration_min"]  = df["video_playback_duration_sec"] / 60

    return df

def apply_filters(df):
    n0 = len(df)
    log = [f"전체 세션 수: {n0}"]

    if FILTERS["exclude_external_ai"]:
        df = df[df["externalAi_used"] == "no"]
        log.append(f"exclude_external_ai: {n0 - len(df)}명 제외 → {len(df)}명")
        n0 = len(df)

    mc = FILTERS["min_chat_count"]
    if mc:
        df = df[df["chat_count"] >= mc]
        log.append(f"min_chat_count >= {mc}: {n0 - len(df)}명 제외 → {len(df)}명")
        n0 = len(df)

    af = FILTERS["min_attn_focus"]
    if af:
        df = df[df["attn_focus"] >= af]
        log.append(f"min_attn_focus >= {af}: {n0 - len(df)}명 제외 → {len(df)}명")
        n0 = len(df)

    if FILTERS["require_attn_check"]:
        df = df[df["attn_stronglyDisagreeCheck"] == 1]
        log.append(f"require_attn_check_pass: {n0 - len(df)}명 제외 → {len(df)}명")

    log.append(f"**최종 분석 대상: {len(df)}명**")
    return df, log

# ── ANOVA helper ──────────────────────────────────────────────────────────────
def anova_row(df, dv):
    ctrl = df[df["condition"]=="control"][dv].dropna()
    cimo = df[df["condition"]=="ebm_cimo"][dv].dropna()
    if len(ctrl) < 2 or len(cimo) < 2:
        return None
    f, p = stats.f_oneway(ctrl, cimo)
    n = len(ctrl) + len(cimo)
    eta2 = (f * 1) / (f * 1 + (n - 2)) if (f * 1 + (n - 2)) > 0 else 0
    sig = "***" if p < .001 else "**" if p < .01 else "*" if p < .05 else "†" if p < .10 else ""
    return dict(
        ctrl_m=ctrl.mean(), ctrl_sd=ctrl.std(), ctrl_n=len(ctrl),
        cimo_m=cimo.mean(), cimo_sd=cimo.std(), cimo_n=len(cimo),
        F=f, p=p, eta2=eta2, sig=sig
    )

def sig_marker(p):
    if p < .001: return "***"
    if p < .01:  return "**"
    if p < .05:  return "*"
    if p < .10:  return "†"
    return ""

# ── Part 1: Media usage by ClassCode ─────────────────────────────────────────
def part1_media_by_class(df_filtered):
    lines = ["## Part 1: ClassCode별 미디어 사용 패턴\n"]
    lines.append("단위: 분(min) / chat_count는 횟수\n")

    # Convert ms→min columns for display
    display_vars = {
        "chat_count":                   "Chat: Query Count",
        "focusTime_chat_min":           "Focus Time: Chat",
        "focusTime_audio_min":          "Focus Time: Audio",
        "focusTime_video_min":          "Focus Time: Video",
        "focusTime_infographics_min":   "Focus Time: Infographics",
        "audio_playback_duration_min":  "Audio Playback",
        "video_playback_duration_min":  "Video Playback",
    }

    # Usage rate (% who used ≥1)
    lines.append("### 미디어 사용률 (%)\n")
    usage_cols = {"resourcesUsed_audio":"Audio","resourcesUsed_video":"Video","resourcesUsed_infographics":"Infographics"}
    hdr = "| ClassCode | n | " + " | ".join(usage_cols.values()) + " |"
    lines.append(hdr)
    lines.append("|--|--|" + "|--|"*len(usage_cols))
    for cc, name in CLASSCODE_NAMES.items():
        sub = df_filtered[df_filtered["ClassCode"]==cc]
        if len(sub) == 0: continue
        row = f"| {name} | {len(sub)} |"
        for col in usage_cols:
            pct = sub[col].astype(str).str.lower().isin(["true","1"]).mean()*100
            row += f" {pct:.0f}% |"
        lines.append(row)
    # Total
    row = f"| **Total** | **{len(df_filtered)}** |"
    for col in usage_cols:
        pct = df_filtered[col].astype(str).str.lower().isin(["true","1"]).mean()*100
        row += f" **{pct:.0f}%** |"
    lines.append(row)
    lines.append("")

    # Mean usage time
    lines.append("### 미디어 사용량 (M ± SD)\n")
    col_names = list(display_vars.keys())
    hdr = "| ClassCode | n | " + " | ".join(display_vars.values()) + " |"
    lines.append(hdr)
    lines.append("|--|--|" + "|--|"*len(display_vars))
    for cc, name in CLASSCODE_NAMES.items():
        sub = df_filtered[df_filtered["ClassCode"]==cc]
        if len(sub) == 0: continue
        row = f"| {name} | {len(sub)} |"
        for col in col_names:
            if col in sub.columns:
                m, s = sub[col].mean(), sub[col].std()
                row += f" {m:.1f} ({s:.1f}) |"
            else:
                row += " — |"
        lines.append(row)
    row = f"| **Total** | **{len(df_filtered)}** |"
    for col in col_names:
        if col in df_filtered.columns:
            m, s = df_filtered[col].mean(), df_filtered[col].std()
            row += f" **{m:.1f} ({s:.1f})** |"
        else:
            row += " — |"
    lines.append(row)
    lines.append("")

    # ANOVA across ClassCodes for each media var
    lines.append("### ClassCode 간 미디어 사용량 차이 (One-way ANOVA)\n")
    lines.append("| Variable | F | p | η² |")
    lines.append("|--|--|--|--|")
    groups_list = [df_filtered[df_filtered["ClassCode"]==cc][col].dropna()
                   for cc in CLASSCODE_NAMES for col in []]  # placeholder
    for col, label in display_vars.items():
        if col not in df_filtered.columns: continue
        groups = [df_filtered[df_filtered["ClassCode"]==cc][col].dropna()
                  for cc in CLASSCODE_NAMES.keys()
                  if len(df_filtered[df_filtered["ClassCode"]==cc]) > 1]
        groups = [g for g in groups if len(g) >= 2]
        if len(groups) < 2: continue
        f, p = stats.f_oneway(*groups)
        n_total = sum(len(g) for g in groups)
        k = len(groups)
        ss_between = f * (k-1) * (sum((g.mean()-df_filtered[col].mean())**2 * len(g) for g in groups) /
                                   max(f * (k-1), 1e-9)) if f > 0 else 0
        # simpler eta2 formula
        all_vals = pd.concat(groups)
        grand_mean = all_vals.mean()
        ss_total = ((all_vals - grand_mean)**2).sum()
        ss_between = sum(len(g) * (g.mean() - grand_mean)**2 for g in groups)
        eta2 = ss_between / ss_total if ss_total > 0 else 0
        sig = sig_marker(p)
        bold = "**" if p < .05 else ""
        lines.append(f"| {bold}{label}{bold} | {bold}{f:.2f}{bold} | {bold}{p:.3f}{sig}{bold} | {eta2:.3f} |")
    lines.append("")

    return "\n".join(lines)

# ── Part 2: Leave-one-out CIMO vs. Control ────────────────────────────────────
def part2_leave_one_out(df_filtered):
    lines = ["## Part 2: ClassCode 제외 시 CIMO vs. Control 결과 변화\n"]
    lines.append("`*` p<.05, `**` p<.01, `***` p<.001, `†` p<.10\n")

    for dv in KEY_DVS:
        label = KEY_DV_LABELS.get(dv, dv)
        lines.append(f"### {label}\n")

        # Header
        cols = ["Sample", "n (ctrl/cimo)", "ctrl M (SD)", "cimo M (SD)", "F", "p", "η²"]
        lines.append("| " + " | ".join(cols) + " |")
        lines.append("|--|--|--|--|--|--|--|")

        # Full sample
        r = anova_row(df_filtered, dv)
        if r:
            sig = r["sig"]
            bold = "**" if r["p"] < .05 else ""
            lines.append(
                f"| {bold}전체{bold} | {r['ctrl_n']}/{r['cimo_n']} | "
                f"{r['ctrl_m']:.2f} ({r['ctrl_sd']:.2f}) | "
                f"{r['cimo_m']:.2f} ({r['cimo_sd']:.2f}) | "
                f"{bold}{r['F']:.2f}{bold} | {bold}{r['p']:.3f}{sig}{bold} | {r['eta2']:.3f} |"
            )

        # Leave-one-out
        for cc, name in CLASSCODE_NAMES.items():
            sub = df_filtered[df_filtered["ClassCode"] != cc]
            r = anova_row(sub, dv)
            if not r: continue
            sig = r["sig"]
            bold = "**" if r["p"] < .05 else ""
            lines.append(
                f"| {bold}CC{cc} 제외 ({name}){bold} | {r['ctrl_n']}/{r['cimo_n']} | "
                f"{r['ctrl_m']:.2f} ({r['ctrl_sd']:.2f}) | "
                f"{r['cimo_m']:.2f} ({r['cimo_sd']:.2f}) | "
                f"{bold}{r['F']:.2f}{bold} | {bold}{r['p']:.3f}{sig}{bold} | {r['eta2']:.3f} |"
            )

        # ClassCode-only
        lines.append("")
        lines.append(f"*ClassCode별 단독 분석:*\n")
        lines.append("| ClassCode | n (ctrl/cimo) | ctrl M (SD) | cimo M (SD) | F | p | η² |")
        lines.append("|--|--|--|--|--|--|--|")
        for cc, name in CLASSCODE_NAMES.items():
            sub = df_filtered[df_filtered["ClassCode"] == cc]
            r = anova_row(sub, dv)
            if not r: continue
            sig = r["sig"]
            bold = "**" if r["p"] < .05 else ""
            lines.append(
                f"| {bold}{name}{bold} | {r['ctrl_n']}/{r['cimo_n']} | "
                f"{r['ctrl_m']:.2f} ({r['ctrl_sd']:.2f}) | "
                f"{r['cimo_m']:.2f} ({r['cimo_sd']:.2f}) | "
                f"{bold}{r['F']:.2f}{bold} | {bold}{r['p']:.3f}{sig}{bold} | {r['eta2']:.3f} |"
            )
        lines.append("")

    return "\n".join(lines)

# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    df_raw = load_data()
    df, filter_log = apply_filters(df_raw)

    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M")
    out_name  = f"{timestamp}_classcode_analysis.md"
    out_path  = os.path.join(OUT_DIR, out_name)

    lines = [
        f"# ClassCode Sensitivity Analysis",
        f"",
        f"**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M')}  ",
        f"**Data:** `sessions_with_classcode.csv`",
        f"",
        f"---",
        f"",
        f"## 필터 적용",
        f"",
    ]
    for l in filter_log:
        lines.append(f"- {l}")
    lines.append("")
    lines.append("---\n")

    # ClassCode distribution after filters
    lines.append("## 필터 후 ClassCode 분포\n")
    lines.append("| ClassCode | 수업 | control | ebm_cimo | total |")
    lines.append("|--|--|--|--|--|")
    for cc, name in CLASSCODE_NAMES.items():
        sub = df[df["ClassCode"]==cc]
        ctrl = (sub["condition"]=="control").sum()
        cimo = (sub["condition"]=="ebm_cimo").sum()
        lines.append(f"| CC{cc} | {name} | {ctrl} | {cimo} | {len(sub)} |")
    ctrl_t = (df["condition"]=="control").sum()
    cimo_t = (df["condition"]=="ebm_cimo").sum()
    lines.append(f"| **전체** | — | **{ctrl_t}** | **{cimo_t}** | **{len(df)}** |")
    lines.append("")
    lines.append("---\n")

    lines.append(part1_media_by_class(df))
    lines.append("---\n")
    lines.append(part2_leave_one_out(df))

    output = "\n".join(lines)
    with open(out_path, "w") as f:
        f.write(output)

    print(f"Saved → results/{out_name}")
    print(f"필터 후 n={len(df)} (control={ctrl_t}, ebm_cimo={cimo_t})")

if __name__ == "__main__":
    main()
