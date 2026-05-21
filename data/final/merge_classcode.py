"""
Merge ClassCode from class_coded_roster.csv into sessions_preprocessed.csv
using fullName matching (with manual fixes for mismatches).
Output: sessions_with_classcode.csv
"""

import pandas as pd
import re

# ── 1. Load ───────────────────────────────────────────────────────────────────
roster = pd.read_csv("class_coded_roster.csv")
sessions = pd.read_csv("sessions_preprocessed.csv")

# ── 2. Manual name fixes (session fullName → roster Name) ────────────────────
NAME_FIXES = {
    "Janette Elizabeth Stalnaker": "Janette Stalnaker",
    "Joseph Sexton":               "Joe Sexton",
    "Joe Lotozo":                  "Joseph Lotozo",
    "S Faiz Jafri":                "Faiz Jafri",
    "Daniel Rice":                 "Dan Rice",
    "Kelset Gable":                "Kelsey Gable",
    "Zachary Stephens":            "Zach Stephens",
    # email-as-name → real name
    "esler.20@osu.edu":            "Abbey Esler",
    "deffenbaugh.10@osu.edu":      "Chelsea Deffenbaugh",
    "laxmi.mehta@osumc.edu":       "Laxmi Mehta",
    "karynfrost@gmail.com":        "Karyn Frost",
    "Rudolph.83@osu.edu":          "Tommy Rudolph",
}

sessions["fullName_fixed"] = sessions["fullName"].replace(NAME_FIXES)

# ── 3. Normalize for matching (lowercase, strip non-alpha) ───────────────────
def normalize(name):
    if pd.isna(name):
        return ""
    return re.sub(r"\s+", " ", re.sub(r"[^a-z ]", "", str(name).lower())).strip()

roster["name_norm"]          = roster["Name"].apply(normalize)
sessions["fullName_norm"]    = sessions["fullName_fixed"].apply(normalize)

# ── 4. Merge ──────────────────────────────────────────────────────────────────
merged = sessions.merge(
    roster[["name_norm", "ClassCode"]],
    left_on="fullName_norm",
    right_on="name_norm",
    how="left",
)

# ── 5. QA ─────────────────────────────────────────────────────────────────────
matched   = merged["ClassCode"].notna().sum()
unmatched = merged["ClassCode"].isna().sum()
print(f"Matched : {matched}/{len(merged)}")
if unmatched:
    print("Still unmatched:")
    print(merged[merged["ClassCode"].isna()][["fullName", "email", "class"]].to_string())

# ── 6. Show ClassCode ↔ class mapping ────────────────────────────────────────
class_col = next(c for c in merged.columns if "class" in c.lower() and c != "ClassCode")
print("\nClassCode ↔ class distribution:")
print(
    merged.dropna(subset=["ClassCode"])
    .groupby(["ClassCode", class_col])
    .size()
    .reset_index(name="n")
    .sort_values(["ClassCode", class_col])
    .to_string(index=False)
)

# ── 7. Clean up temp columns & save ──────────────────────────────────────────
merged = merged.drop(columns=["fullName_fixed", "fullName_norm", "name_norm"])
merged = merged.rename(columns={"ClassCode": "S1_ClassCode"})
merged["S1_ClassCode"] = merged["S1_ClassCode"].astype("Int64")

out_path = "sessions_with_classcode.csv"
merged.to_csv(out_path, index=False)
print(f"\nSaved → {out_path}")
