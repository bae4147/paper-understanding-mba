#!/usr/bin/env python3
"""
분석용 샘플 생성 스크립트

merged_final.xlsx → included/exclusion_reason + 매체 사용 레이블 → analysis_sample.csv

필터 기준을 바꾸려면 FILTERS, 매체 기준을 바꾸려면 MEDIA_THRESHOLDS를 수정 후 재실행:
  python build_analysis_sample.py

출력:
  merged_final_labeled.xlsx  — 전체 168명 + included/exclusion_reason + media 레이블 (used_chat/audio/video/infog)
  analysis_sample.csv        — 최종 분석 대상만 (included=True)
  excluded_participants.csv  — 제외자 목록
"""

import os
import pandas as pd

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

INPUT_PATH   = os.path.join(SCRIPT_DIR, 'merged_final.xlsx')
LABELED_PATH = os.path.join(SCRIPT_DIR, 'merged_final_labeled.xlsx')
SAMPLE_PATH  = os.path.join(SCRIPT_DIR, 'analysis_sample.csv')
EXCLUDE_PATH = os.path.join(SCRIPT_DIR, 'excluded_participants.csv')

# ── 필터 기준 ─────────────────────────────────────────────────────────────────
FILTERS = {
    'mba_classcodes':      [1, 2, 3],       # 포함할 ClassCode (1=wed/tue, 2=tue, 3=sat)
    'min_active_min':      1.0,             # active_min 최솟값 (초과)
    'video_outliers':      {                # video window_active 비정상 outlier
        'rhill7389@gmail.com': 'video_outlier (window_active_video=3880s)',
        'enslen.4@osu.edu':    'video_outlier (window_active_video=4553s)',
    },
}

# ── 매체 유의미한 사용 기준 ────────────────────────────────────────────────────
# used_chat  : S2_chat_count >= 1          (쿼리 전송 이벤트가 가장 명확한 신호)
# used_audio : S2_audio_playback_duration_sec >= 30  (30초 전후로 intro→본론 전환 확인)
# used_video : S2_window_active_video_ms / 1000 >= 72  (Scene 8 Main Content 시작 = 72s 누적)
# used_infog : S2_window_active_infographics_ms / 1000 >= 30  (자연 단절점: 10–30s 구간 희소)
MEDIA_THRESHOLDS = {
    'chat':  ('S2_chat_count',                       '>=', 1),
    'audio': ('S2_audio_playback_duration_sec',      '>=', 30),
    'video': ('S2_window_active_video_ms',           '>=', 72_000),
    'infog': ('S2_window_active_infographics_ms',    '>=', 30_000),
}
# ─────────────────────────────────────────────────────────────────────────────


def main():
    df = pd.read_excel(INPUT_PATH)

    # active_min 계산
    df['active_min'] = (
        df['S2_reading_totalDuration_ms'].fillna(0)
        - df['S2_window_inactive_ms'].fillna(0)
    ) / 60000

    # exclusion_reason 결정 (순서 = 우선순위)
    def get_reason(row):
        if pd.isna(row.get('S1_email')):
            return 'no_session_match'
        if row.get('S1_ClassCode') not in FILTERS['mba_classcodes']:
            return f"non_mba (ClassCode={row.get('S1_ClassCode')})"
        if row['active_min'] <= FILTERS['min_active_min']:
            return f"active_min<={FILTERS['min_active_min']} ({row['active_min']:.3f}min)"
        if row.get('S1_email') in FILTERS['video_outliers']:
            return FILTERS['video_outliers'][row['S1_email']]
        return None

    df['exclusion_reason'] = df.apply(get_reason, axis=1)
    df['included'] = df['exclusion_reason'].isna()

    # ── 매체 사용 레이블 (0/1) ────────────────────────────────────────────────
    for medium, (col, op, thresh) in MEDIA_THRESHOLDS.items():
        label_col = f'used_{medium}'
        if col in df.columns:
            df[label_col] = (df[col].fillna(0) >= thresh).astype(int)
        else:
            df[label_col] = 0
            print(f"[경고] 컬럼 없음: {col} → used_{medium}=0 처리")

    # ── 요약 출력 ──────────────────────────────────────────────────────────────
    print(f"전체: {len(df)}명")
    excl = df[~df['included']]
    reasons = excl['exclusion_reason'].str.split(' ').str[0].value_counts()
    for reason, cnt in reasons.items():
        print(f"  제외 ({reason}): {cnt}명")
    print(f"최종 분석 샘플: {df['included'].sum()}명\n")

    sample_df = df[df['included']]
    print("매체별 유의미한 사용 (n=분석 샘플):")
    for medium in MEDIA_THRESHOLDS:
        label_col = f'used_{medium}'
        n_used = sample_df[label_col].sum()
        n_total = len(sample_df)
        print(f"  used_{medium}: {n_used}/{n_total}명 ({n_used/n_total*100:.1f}%)")

    # ── merged_final_labeled.xlsx 저장 ────────────────────────────────────────
    # included / exclusion_reason / used_* 컬럼을 앞쪽에 배치
    media_cols = [f'used_{m}' for m in MEDIA_THRESHOLDS]
    front_cols = ['included', 'exclusion_reason'] + media_cols
    rest_cols  = [c for c in df.columns if c not in front_cols and c != 'active_min']
    cols = front_cols + rest_cols
    df[cols].to_excel(LABELED_PATH, index=False)
    print(f"저장: {LABELED_PATH}")

    # ── analysis_sample.csv 저장 ──────────────────────────────────────────────
    sample = df[df['included']].drop(columns=['included', 'exclusion_reason'])
    sample.to_csv(SAMPLE_PATH, index=False)
    print(f"저장: {SAMPLE_PATH}  ({len(sample)}명)")

    # ── excluded_participants.csv 저장 ────────────────────────────────────────
    excl_out = excl[['S1_email', 'S1_class', 'S1_condition', 'active_min',
                      'exclusion_reason']].copy()
    excl_out.insert(0, 'name_key', df.loc[excl.index, 'name_key']
                    if 'name_key' in df.columns else '')
    excl_out.to_csv(EXCLUDE_PATH, index=False)
    print(f"저장: {EXCLUDE_PATH}  ({len(excl_out)}명)")


if __name__ == '__main__':
    main()
