#!/usr/bin/env python3
"""
참여자 목록 CSV 생성 스크립트

사용법:
  python scripts/build_participants_csv.py <run_folder>
  python scripts/build_participants_csv.py <run_folder> <output_path>

예시:
  python scripts/build_participants_csv.py data/runs/2026-03-17_00-17-07
  python scripts/build_participants_csv.py data/runs/2026-03-17_00-17-07 data/task-duration-analysis/all_participants_2026-03-17.csv

출력 형식 (all_participants_YYYY-MM-DD.csv):
  userid, email, fullName, class, condition, createdAt,
  totalSessions, completedSessions, firstCompletedSession_endtime,
  before_1_26_deadline, technical_issue
"""

import json
import csv
import sys
import os
import glob
from datetime import datetime, timezone, timedelta

# ── 제외할 테스트/연구자 계정 ────────────────────────────────────────────────
EXCLUDED_EMAILS = {
    # 연구자 계정
    'shyun.bae@gmail.com',
    'sh.bae@snu.ac.kr',
    'ellienbellie@snu.ac.kr',
    'ellienbellie@gmail.com',   # Eli
    'lee.7313@osu.edu',
    # 파일럿/비공식 참여자
    'kwonjoon@msu.edu',         # Joonwoo Kwon
    'flierl.1@osu.edu',         # Michael Flierl
    'renner.19@osu.edu',        # Dave Renner
}

# ── 마감일 설정 ──────────────────────────────────────────────────────────────
# mba6202_tue / mba6202_wed : 1월 26일 자정 EST (= 1월 27일 05:00 UTC)
DEADLINE_JAN26_UTC = datetime(2026, 1, 27, 5, 0, 0, tzinfo=timezone.utc)
DEADLINE_CLASSES = {'mba6202_tue', 'mba6202_wed'}

EST = timezone(timedelta(hours=-5))


def find_experiment_json(run_folder: str) -> str:
    """run 폴더에서 experiment-data-*.json 파일 경로 반환"""
    pattern = os.path.join(run_folder, 'experiment-data-*.json')
    matches = glob.glob(pattern)
    if not matches:
        raise FileNotFoundError(f"experiment-data-*.json 파일을 찾을 수 없습니다: {run_folder}")
    if len(matches) > 1:
        # 가장 최신 파일 선택
        matches.sort()
        print(f"[경고] JSON 파일이 여러 개입니다. 가장 최신 파일 사용: {matches[-1]}")
    return matches[-1]


def fmt_est(utc_dt: datetime) -> str:
    """UTC datetime → 'YYYY-MM-DD HH:MM:SS EST' 문자열"""
    return utc_dt.astimezone(EST).strftime('%Y-%m-%d %H:%M:%S EST')


def process_user(uid: str, u: dict) -> dict:
    """유저 1명의 데이터를 처리해 CSV 행 dict 반환"""
    cls = u.get('class', '')

    sessions = u.get('sessions', {})
    session_list = list(sessions.values()) if isinstance(sessions, dict) else sessions

    totalSessions = len(session_list)

    completed = [
        s for s in session_list
        if s.get('currentPhase') == 'complete' and s.get('completedAt')
    ]
    completedSessions = len(completed)

    # 첫 번째 완료 세션 (completedAt 기준 오름차순)
    firstCompletedSession_endtime = ''
    first_completed_utc = None
    if completed:
        first = min(completed, key=lambda s: s['completedAt'])
        first_completed_utc = datetime.fromisoformat(first['completedAt'].replace('Z', '+00:00'))
        firstCompletedSession_endtime = fmt_est(first_completed_utc)

    # 마감일 준수 여부 (mba6202_tue / mba6202_wed 만 적용)
    before_1_26_deadline = ''
    if cls in DEADLINE_CLASSES:
        if completedSessions == 0:
            before_1_26_deadline = 'not_submitted'
        elif first_completed_utc < DEADLINE_JAN26_UTC:
            before_1_26_deadline = 'on_time'
        else:
            before_1_26_deadline = 'late'

    return {
        'userid': uid,
        'email': u.get('email', ''),
        'fullName': u.get('fullName', ''),
        'class': cls,
        'condition': u.get('condition', ''),
        'createdAt': u.get('createdAt', ''),
        'totalSessions': totalSessions,
        'completedSessions': completedSessions,
        'firstCompletedSession_endtime': firstCompletedSession_endtime,
        'before_1_26_deadline': before_1_26_deadline,
        'technical_issue': '',
        'duplicate account': '',
    }


def build_csv(run_folder: str, output_path: str):
    json_path = find_experiment_json(run_folder)
    print(f"입력 파일: {json_path}")

    with open(json_path, encoding='utf-8') as f:
        data = json.load(f)

    users = data.get('users', {})
    rows = []
    excluded_count = 0

    for uid, u in users.items():
        email = u.get('email', '')
        if email in EXCLUDED_EMAILS:
            print(f"  [제외] {email} ({u.get('fullName', '')})")
            excluded_count += 1
            continue
        rows.append(process_user(uid, u))

    # createdAt 기준 정렬
    rows.sort(key=lambda r: r['createdAt'])

    fieldnames = [
        'userid', 'email', 'fullName', 'class', 'condition', 'createdAt',
        'totalSessions', 'completedSessions', 'firstCompletedSession_endtime',
        'before_1_26_deadline', 'technical_issue', 'duplicate account',
    ]

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"\n완료: {len(rows)}명 저장 (제외: {excluded_count}명)")
    print(f"출력 파일: {output_path}")


def default_output_path(run_folder: str) -> str:
    """run 폴더 이름에서 날짜를 추출해 출력 경로 생성"""
    run_name = os.path.basename(run_folder.rstrip('/'))
    # run_name 예: 2026-03-17_00-17-07 → date: 2026-03-17
    date_part = run_name.split('_')[0]
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)
    return os.path.join(repo_root, 'data', 'task-duration-analysis', f'all_participants_{date_part}.csv')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    run_folder = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) >= 3 else default_output_path(run_folder)

    build_csv(run_folder, output_path)
