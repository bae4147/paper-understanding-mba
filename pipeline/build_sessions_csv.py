#!/usr/bin/env python3
"""
유저/세션 데이터셋 생성 스크립트

사용법:
  python scripts/build_sessions_csv.py <run_folder>
  python scripts/build_sessions_csv.py <run_folder> <output_dir>

예시:
  python scripts/build_sessions_csv.py data/runs/2026-04-10_23-40-46
  python scripts/build_sessions_csv.py data/runs/2026-04-10_23-40-46 data/final-dataset

출력:
  <output_dir>/sessions.csv      — 세션 단위 데이터 (1 row = 1 session)
  <output_dir>/users.csv         — 유저 단위 데이터
  <output_dir>/chat_history.csv  — 챗봇 대화 턴 단위 데이터

컬럼 prefix 규칙:
  S1_ : 유저/세션 메타데이터
  S2_ : 리딩 행동 (reading behavior)
  S3_ : post-task / post-study survey 응답
  S4_ : 외부 도구 사용, 스터디 피드백
  (no prefix) : fullName, duplicate_account, currentPhase, surveyCompletedAt
                — preprocess/merge_classcode 단계에서 사용 후 최종 merge에서 제외됨
"""

import json
import csv
import sys
import os
import glob
from collections import defaultdict

# ── 제외할 테스트/연구자 계정 ────────────────────────────────────────────────
EXCLUDED_EMAILS = {
    'shyun.bae@gmail.com',
    'sh.bae@snu.ac.kr',
    'ellienbellie@snu.ac.kr',
    'ellienbellie@gmail.com',
    'lee.7313@osu.edu',
    'kwonjoon@msu.edu',
    'flierl.1@osu.edu',
    'renner.19@osu.edu',
}

# ── 컬럼 순서 ─────────────────────────────────────────────────────────────────
SESSION_FIELDS = [
    # no-prefix — 전처리/매칭용 (최종 merged_final.xlsx에서 제외됨)
    'fullName', 'duplicate_account', 'currentPhase', 'surveyCompletedAt',
    # S1 — 유저 & 세션 메타데이터
    'S1_userid', 'S1_email', 'S1_class', 'S1_condition', 'S1_userCreatedAt',
    'S1_sessionid', 'S1_startedAt', 'S1_completedAt',
    'S1_paperId', 'S1_paper_title', 'S1_paper_firstAuthorLastName',
    'S1_paper_year', 'S1_paper_venue', 'S1_paper_numPages',
    # S2 — 리딩 행동
    'S2_reading_totalDuration_ms',
    'S2_window_active_ms', 'S2_window_inactive_ms',
    'S2_focusTime_reading_ms', 'S2_focusTime_chat_ms', 'S2_focusTime_audio_ms',
    'S2_focusTime_infographics_ms', 'S2_focusTime_video_ms',
    'S2_resourcesUsed_infographics', 'S2_resourcesUsed_video', 'S2_resourcesUsed_audio',
    'S2_resourcesUsed_audioInteractions', 'S2_resourcesUsed_videoInteractions',
    'S2_resourcesUsed_tabSwitchCount',
    'S2_window_active_reading_ms', 'S2_window_active_chat_ms', 'S2_window_active_audio_ms',
    'S2_window_active_video_ms', 'S2_window_active_infographics_ms',
    'S2_audio_playback_duration_sec', 'S2_video_playback_duration_sec',
    'S2_chat_count', 'S2_chat_history_json',
    # S3 — post-task & post-study survey
    'S3_postTask_completedAt',  # merge에서 제외됨 (EXCLUDE에 포함)
    'S3_postTask_implementationLikelihood', 'S3_postTask_newStrategyConfidence',
    'S3_postTask_strategies_json', 'S3_postTask_contextTranslation_json',
    'S3_nasa_mentalDemand', 'S3_nasa_physicalDemand', 'S3_nasa_temporalDemand',
    'S3_nasa_performance', 'S3_nasa_effort', 'S3_nasa_frustration',
    'S3_se_oc_overallGoal', 'S3_se_oc_authorsReasoning', 'S3_se_oc_connectingIdeas',
    'S3_se_oc_evidenceUnderstanding', 'S3_se_oc_keyResultsUnderstanding',
    'S3_se_oc_keyTermsUnderstanding', 'S3_se_oc_researchDesignUnderstanding',
    'S3_se_oc_sampleContextUnderstanding', 'S3_se_oc_limitationsUnderstanding',
    'S3_se_ce_ownIdeas', 'S3_se_ce_alternativePerspectives', 'S3_se_ce_verifyCredibility',
    'S3_se_ce_questionClaims', 'S3_se_ce_broaderImplications',
    'S3_se_ap_contextDifferences', 'S3_se_ap_differencesImpact', 'S3_se_ap_mechanisms',
    'S3_se_ap_outcomes', 'S3_se_ap_confidence', 'S3_se_ap_decision',
    'S3_attn_focus', 'S3_attn_stronglyDisagreeCheck',
    'S3_llmUsefulness_overall', 'S3_llmUsefulness_conceptHelp', 'S3_llmUsefulness_findingsHelp',
    'S3_llmUsefulness_practicalHelp', 'S3_llmUsefulness_timeSaving',
    'S3_llmTrust_competence', 'S3_llmTrust_accuracy', 'S3_llmTrust_benevolence',
    'S3_llmTrust_reliability', 'S3_llmTrust_comfortActing', 'S3_llmTrust_comfortUsing',
    'S3_llmTrust_relyWithoutReading', 'S3_llmTrust_assumeClearIsAccurate',
    'S3_llmTrust_confidentWithoutDetails', 'S3_llmTrust_relyForImportance',
    'S3_resourceHelp_chatbot', 'S3_resourceHelp_infographic',
    'S3_resourceHelp_video', 'S3_resourceHelp_podcast',
    # S4 — 외부 도구 & 피드백
    'S4_externalAi_used', 'S4_externalAi_details',
    'S4_externalPdf_used', 'S4_externalPdf_details',
    'S4_studyFeedback',
]

USER_FIELDS = [
    'userid', 'email', 'fullName', 'class', 'condition', 'userCreatedAt',
    'duplicate_account', 'totalSessions', 'completedSessions',
]

CHAT_FIELDS = ['userid', 'sessionid', 'turn_index', 'question', 'answer', 'responseTime_ms']


def find_experiment_json(run_folder):
    pattern = os.path.join(run_folder, 'experiment-data-*.json')
    matches = sorted(glob.glob(pattern))
    if not matches:
        raise FileNotFoundError(f"experiment-data-*.json 없음: {run_folder}")
    if len(matches) > 1:
        print(f"[경고] JSON 파일 여러 개, 최신 사용: {matches[-1]}")
    return matches[-1]


def calc_playback_duration(events, prefix):
    """audio_ 또는 video_ 이벤트로부터 실제 재생 시간(초) 계산."""
    total = 0.0
    is_playing = False
    last_ct = 0.0
    for e in sorted(events, key=lambda x: x.get('timestamp', 0)):
        etype = e.get('eventType', '')
        if not etype.startswith(prefix):
            continue
        ct = e.get('currentTime', 0) or 0
        if etype == f'{prefix}play':
            is_playing = True
            last_ct = ct
        elif etype in (f'{prefix}pause', f'{prefix}ended'):
            if is_playing:
                diff = ct - last_ct
                if diff > 0:
                    total += diff
            is_playing = False
        elif etype == f'{prefix}seeked':
            if is_playing:
                diff = ct - last_ct
                if diff > 0:
                    total += diff
                last_ct = ct
    return round(total, 3)


def calc_window_metrics(events, reading_start, reading_end):
    """
    window_focus_change × focus_switch 이벤트로부터 window active 시간 계산.

    반환: {
        window_active_ms, window_inactive_ms,
        window_active_reading_ms, window_active_chat_ms,
        window_active_audio_ms, window_active_video_ms, window_active_infographics_ms
    }
    """
    PANELS = ('reading', 'chat', 'audio', 'video', 'infographics', 'simplified')
    empty = {
        'window_active_ms': '', 'window_inactive_ms': '',
        'window_active_reading_ms': '', 'window_active_chat_ms': '',
        'window_active_audio_ms': '', 'window_active_video_ms': '',
        'window_active_infographics_ms': '',
    }

    total_dur = reading_end - reading_start
    if total_dur <= 0:
        return empty

    def clamp(ts):
        return max(reading_start, min(reading_end, ts))

    # ── focus intervals: focus_switch + resource_tab_switch 합산 ────────────
    # resource_tab_switch는 오른쪽 패널 내 탭 전환을 기록하며 focus_switch 이벤트가
    # 발생하지 않아 누락됐던 intra-panel 이동을 보완함
    all_sw = sorted(
        [e for e in events
         if e.get('eventType') in ('focus_switch', 'resource_tab_switch')
         and e.get('to') in PANELS],
        key=lambda x: x.get('timestamp', 0)
    )
    # reading 구간 안의 이벤트만 interval 구성에 사용
    sw_events = [e for e in all_sw if reading_start <= e.get('timestamp', 0) <= reading_end]

    # reading_start 직전 이벤트로 초기 패널 결정
    # (이벤트가 1ms 차이로 필터에서 제외되는 엣지케이스 처리)
    events_before = [e for e in all_sw if e.get('timestamp', 0) < reading_start]
    initial_panel = events_before[-1].get('to', 'reading') if events_before else 'reading'

    focus_intervals = []
    if sw_events:
        first = sw_events[0]
        s = reading_start
        e = clamp(first['timestamp'])
        if e > s:
            # first 이벤트의 'from'이 아닌 직전 상태(initial_panel)로 첫 구간 패널 결정
            focus_intervals.append((s, e, first.get('from', initial_panel)))
        for i, ev in enumerate(sw_events):
            s = clamp(ev['timestamp'])
            e = clamp(sw_events[i + 1]['timestamp']) if i + 1 < len(sw_events) else reading_end
            if e > s:
                focus_intervals.append((s, e, ev.get('to', 'reading')))
    else:
        # 구간 내 이벤트 없음 → initial_panel 상태로 전체 구간
        focus_intervals = [(reading_start, reading_end, initial_panel)]

    # ── window state intervals: [(start_ms, end_ms, is_active), ...] ─────────
    wfc_events = sorted(
        [e for e in events if e.get('eventType') == 'window_focus_change'],
        key=lambda x: x.get('timestamp', 0)
    )
    wfc_events = [e for e in wfc_events
                  if reading_start <= e.get('timestamp', 0) <= reading_end]

    window_intervals = []
    if wfc_events:
        first = wfc_events[0]
        # State before first event (from previousState)
        prev_active = (first.get('previousState', 'active') == 'active')
        s = reading_start
        e = clamp(first['timestamp'])
        if e > s:
            window_intervals.append((s, e, prev_active))
        for i, ev in enumerate(wfc_events):
            s = clamp(ev['timestamp'])
            e = clamp(wfc_events[i + 1]['timestamp']) if i + 1 < len(wfc_events) else reading_end
            if e > s:
                window_intervals.append((s, e, bool(ev.get('isActive', True))))
    else:
        # No window changes → window always active
        window_intervals = [(reading_start, reading_end, True)]

    # ── intersect focus × window intervals ───────────────────────────────────
    window_active_ms = 0
    window_inactive_ms = 0
    panel_active = {p: 0 for p in PANELS}

    for (fs, fe, fp) in focus_intervals:
        for (ws, we, wa) in window_intervals:
            s = max(fs, ws)
            e = min(fe, we)
            if e <= s:
                continue
            d = e - s
            if wa:
                window_active_ms += d
                if fp in panel_active:
                    panel_active[fp] += d
            else:
                window_inactive_ms += d

    return {
        'window_active_ms':             round(window_active_ms),
        'window_inactive_ms':           round(window_inactive_ms),
        'window_active_reading_ms':     round(panel_active['reading']),
        'window_active_chat_ms':        round(panel_active['chat']),
        'window_active_audio_ms':       round(panel_active['audio']),
        'window_active_video_ms':       round(panel_active['video']),
        'window_active_infographics_ms': round(panel_active['infographics']),
    }


def build_duplicate_account_map(users):
    groups = defaultdict(list)
    for uid, u in users.items():
        full = (u.get('fullName', '') or '').strip().lower()
        key = full if full else uid
        groups[key].append((u.get('createdAt', ''), uid))
    result = {}
    for _, entries in groups.items():
        entries.sort(key=lambda x: x[0])
        for idx, (_, uid) in enumerate(entries):
            result[uid] = idx
    return result


def extract_session_row(uid, u, sid, s, dup_index):
    row = {f: '' for f in SESSION_FIELDS}

    # no-prefix cols
    row['fullName']         = u.get('fullName', '')
    row['duplicate_account'] = dup_index
    row['currentPhase']     = s.get('currentPhase', '')

    # S1
    row['S1_userid']       = uid
    row['S1_email']        = u.get('email', '')
    row['S1_class']        = u.get('class', '')
    row['S1_condition']    = u.get('condition', '')
    row['S1_userCreatedAt'] = u.get('createdAt', '')
    row['S1_sessionid']    = sid
    row['S1_startedAt']    = s.get('startedAt', '')
    row['S1_completedAt']  = s.get('completedAt', '')

    pm = s.get('paperMetadata', {}) or {}
    row['S1_paperId']                    = s.get('paperId', '')
    row['S1_paper_title']                = pm.get('title', '')
    row['S1_paper_firstAuthorLastName']  = pm.get('firstAuthorLastName', '')
    row['S1_paper_year']                 = pm.get('year', '')
    row['S1_paper_venue']                = pm.get('venue', '')
    row['S1_paper_numPages']             = pm.get('numPages', '')

    # S2 — reading
    rd = s.get('reading', {}) or {}
    row['S2_reading_totalDuration_ms'] = rd.get('totalDuration', '')

    ft = rd.get('focusTimes', {}) or {}
    row['S2_focusTime_reading_ms']      = ft.get('reading', '')
    row['S2_focusTime_chat_ms']         = ft.get('chat', '')
    row['S2_focusTime_audio_ms']        = ft.get('audio', '')
    row['S2_focusTime_infographics_ms'] = ft.get('infographics', '')
    row['S2_focusTime_video_ms']        = ft.get('video', '')

    ru = rd.get('resourcesUsed', {}) or {}
    row['S2_resourcesUsed_infographics']      = ru.get('infographics', '')
    row['S2_resourcesUsed_video']             = ru.get('video', '')
    row['S2_resourcesUsed_audio']             = ru.get('audio', '')
    row['S2_resourcesUsed_audioInteractions'] = ru.get('audioInteractions', '')
    row['S2_resourcesUsed_videoInteractions'] = ru.get('videoInteractions', '')
    row['S2_resourcesUsed_tabSwitchCount']    = ru.get('tabSwitchCount', '')

    events = rd.get('events', []) or []

    # window active metrics (from focus_switch × window_focus_change events)
    reading_start = rd.get('startedAt')
    reading_end   = rd.get('completedAt')
    if reading_start and reading_end:
        try:
            wm = calc_window_metrics(events, int(reading_start), int(reading_end))
            row['S2_window_active_ms']             = wm['window_active_ms']
            row['S2_window_inactive_ms']           = wm['window_inactive_ms']
            row['S2_window_active_reading_ms']     = wm['window_active_reading_ms']
            row['S2_window_active_chat_ms']        = wm['window_active_chat_ms']
            row['S2_window_active_audio_ms']       = wm['window_active_audio_ms']
            row['S2_window_active_video_ms']       = wm['window_active_video_ms']
            row['S2_window_active_infographics_ms'] = wm['window_active_infographics_ms']
        except Exception:
            pass  # leave as ''

    row['S2_audio_playback_duration_sec'] = calc_playback_duration(events, 'audio_')
    row['S2_video_playback_duration_sec'] = calc_playback_duration(events, 'video_')

    chat = rd.get('chatHistory', []) or []
    row['S2_chat_count']       = len(chat)
    row['S2_chat_history_json'] = json.dumps(chat, ensure_ascii=False) if chat else ''

    # S3 — post-task
    pt = s.get('postTask', {}) or {}
    row['S3_postTask_completedAt']            = pt.get('completedAt', '')
    row['S3_postTask_implementationLikelihood'] = pt.get('implementationLikelihood', '')
    row['S3_postTask_newStrategyConfidence']  = pt.get('newStrategyConfidence', '')
    strategies = pt.get('strategies', [])
    row['S3_postTask_strategies_json'] = json.dumps(strategies, ensure_ascii=False) if strategies else ''
    ctx = pt.get('contextTranslation', [])
    row['S3_postTask_contextTranslation_json'] = json.dumps(ctx, ensure_ascii=False) if ctx else ''

    # S3 — post-study survey
    sv = s.get('postStudySurvey', {}) or {}

    nasa = sv.get('nasaTLX', {}) or {}
    row['S3_nasa_mentalDemand']  = nasa.get('mentalDemand', '')
    row['S3_nasa_physicalDemand'] = nasa.get('physicalDemand', '')
    row['S3_nasa_temporalDemand'] = nasa.get('temporalDemand', '')
    row['S3_nasa_performance']   = nasa.get('performance', '')
    row['S3_nasa_effort']        = nasa.get('effort', '')
    row['S3_nasa_frustration']   = nasa.get('frustration', '')

    se = sv.get('selfEfficacy', {}) or {}
    oc = se.get('overallComprehension', {}) or {}
    row['S3_se_oc_overallGoal']                 = oc.get('overallGoal', '')
    row['S3_se_oc_authorsReasoning']            = oc.get('authorsReasoning', '')
    row['S3_se_oc_connectingIdeas']             = oc.get('connectingIdeas', '')
    row['S3_se_oc_evidenceUnderstanding']       = oc.get('evidenceUnderstanding', '')
    row['S3_se_oc_keyResultsUnderstanding']     = oc.get('keyResultsUnderstanding', '')
    row['S3_se_oc_keyTermsUnderstanding']       = oc.get('keyTermsUnderstanding', '')
    row['S3_se_oc_researchDesignUnderstanding'] = oc.get('researchDesignUnderstanding', '')
    row['S3_se_oc_sampleContextUnderstanding']  = oc.get('sampleContextUnderstanding', '')
    row['S3_se_oc_limitationsUnderstanding']    = oc.get('limitationsUnderstanding', '')

    ce = se.get('criticalEngagement', {}) or {}
    row['S3_se_ce_ownIdeas']              = ce.get('ownIdeas', '')
    row['S3_se_ce_alternativePerspectives'] = ce.get('alternativePerspectives', '')
    row['S3_se_ce_verifyCredibility']     = ce.get('verifyCredibility', '')
    row['S3_se_ce_questionClaims']        = ce.get('questionClaims', '')
    row['S3_se_ce_broaderImplications']   = ce.get('broaderImplications', '')

    ap = se.get('applicability', {}) or {}
    row['S3_se_ap_contextDifferences'] = ap.get('contextDifferences', '')
    row['S3_se_ap_differencesImpact']  = ap.get('differencesImpact', '')
    row['S3_se_ap_mechanisms']         = ap.get('mechanisms', '')
    row['S3_se_ap_outcomes']           = ap.get('outcomes', '')
    row['S3_se_ap_confidence']         = ap.get('confidence', '')
    row['S3_se_ap_decision']           = ap.get('decision', '')

    attn = sv.get('attentionCheck', {}) or {}
    row['S3_attn_focus']                = attn.get('focus', '')
    row['S3_attn_stronglyDisagreeCheck'] = attn.get('stronglyDisagreeCheck', '')

    lmu = sv.get('llmUsefulness', {}) or {}
    row['S3_llmUsefulness_overall']      = lmu.get('overall', '')
    row['S3_llmUsefulness_conceptHelp']  = lmu.get('conceptHelp', '')
    row['S3_llmUsefulness_findingsHelp'] = lmu.get('findingsHelp', '')
    row['S3_llmUsefulness_practicalHelp'] = lmu.get('practicalHelp', '')
    row['S3_llmUsefulness_timeSaving']   = lmu.get('timeSaving', '')

    lmt = sv.get('llmTrust', {}) or {}
    row['S3_llmTrust_competence']            = lmt.get('competence', '')
    row['S3_llmTrust_accuracy']              = lmt.get('accuracy', '')
    row['S3_llmTrust_benevolence']           = lmt.get('benevolence', '')
    row['S3_llmTrust_reliability']           = lmt.get('reliability', '')
    row['S3_llmTrust_comfortActing']         = lmt.get('comfortActing', '')
    row['S3_llmTrust_comfortUsing']          = lmt.get('comfortUsing', '')
    row['S3_llmTrust_relyWithoutReading']    = lmt.get('relyWithoutReading', '')
    row['S3_llmTrust_assumeClearIsAccurate'] = lmt.get('assumeClearIsAccurate', '')
    row['S3_llmTrust_confidentWithoutDetails'] = lmt.get('confidentWithoutDetails', '')
    row['S3_llmTrust_relyForImportance']     = lmt.get('relyForImportance', '')

    rh = sv.get('resourceHelpfulness', {}) or {}
    row['S3_resourceHelp_chatbot']    = rh.get('chatbot', '')
    row['S3_resourceHelp_infographic'] = rh.get('infographic', '')
    row['S3_resourceHelp_video']      = rh.get('video', '')
    row['S3_resourceHelp_podcast']    = rh.get('podcast', '')

    ext = sv.get('externalToolUsage', {}) or {}
    row['S4_externalAi_used']    = ext.get('usedExternalAi', '')
    row['S4_externalAi_details'] = ext.get('externalAiDetails', '')
    row['S4_externalPdf_used']   = ext.get('usedExternalPdfViewer', '')
    row['S4_externalPdf_details'] = ext.get('externalPdfDetails', '')

    row['S4_studyFeedback']  = sv.get('studyFeedback', '')
    row['surveyCompletedAt'] = sv.get('surveyCompletedAt', '')

    return row


def extract_chat_rows(uid, sid, s):
    chat = (s.get('reading', {}) or {}).get('chatHistory', []) or []
    rows = []
    for i, turn in enumerate(chat):
        rows.append({
            'userid': uid, 'sessionid': sid, 'turn_index': i,
            'question': turn.get('question', ''),
            'answer': turn.get('answer', ''),
            'responseTime_ms': turn.get('responseTime', ''),
        })
    return rows


def build(run_folder, output_dir):
    json_path = find_experiment_json(run_folder)
    print(f"입력: {json_path}")

    with open(json_path, encoding='utf-8') as f:
        data = json.load(f)

    users = data.get('users', {})
    filtered_users = {uid: u for uid, u in users.items()
                      if u.get('email', '') not in EXCLUDED_EMAILS}
    excluded = len(users) - len(filtered_users)
    print(f"전체 유저: {len(users)}명 / 제외: {excluded}명 / 처리 대상: {len(filtered_users)}명")

    dup_map = build_duplicate_account_map(filtered_users)

    user_rows, session_rows, chat_rows = [], [], []

    for uid, u in filtered_users.items():
        sessions = u.get('sessions', {})
        sdict = sessions if isinstance(sessions, dict) else {i: s for i, s in enumerate(sessions)}

        total     = len(sdict)
        completed = sum(1 for s in sdict.values() if s.get('currentPhase') == 'complete')

        user_rows.append({
            'userid': uid, 'email': u.get('email', ''), 'fullName': u.get('fullName', ''),
            'class': u.get('class', ''), 'condition': u.get('condition', ''),
            'userCreatedAt': u.get('createdAt', ''), 'duplicate_account': dup_map[uid],
            'totalSessions': total, 'completedSessions': completed,
        })

        for sid, s in sdict.items():
            session_rows.append(extract_session_row(uid, u, sid, s, dup_map[uid]))
            chat_rows.extend(extract_chat_rows(uid, sid, s))

    user_rows.sort(key=lambda r: r['userCreatedAt'])
    session_rows.sort(key=lambda r: (r['S1_userCreatedAt'], r['S1_sessionid']))

    os.makedirs(output_dir, exist_ok=True)

    with open(os.path.join(output_dir, 'users.csv'), 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=USER_FIELDS)
        writer.writeheader()
        writer.writerows(user_rows)

    with open(os.path.join(output_dir, 'sessions.csv'), 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=SESSION_FIELDS)
        writer.writeheader()
        writer.writerows(session_rows)

    with open(os.path.join(output_dir, 'chat_history.csv'), 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=CHAT_FIELDS)
        writer.writeheader()
        writer.writerows(chat_rows)

    print(f"\n완료!")
    print(f"  users.csv       : {len(user_rows)}행")
    print(f"  sessions.csv    : {len(session_rows)}행")
    print(f"  chat_history.csv: {len(chat_rows)}턴")
    print(f"  출력 디렉토리   : {output_dir}")


def default_output_dir():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(os.path.dirname(script_dir), 'data', 'final-dataset')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    run_folder = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) >= 3 else default_output_dir()
    build(run_folder, output_dir)
