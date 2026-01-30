#!/usr/bin/env python3
"""
과제 수행 시간 분석 스크립트

사용법:
  python scripts/analyze-task-duration.py <raw-data.json> [output-dir]

필터링 규칙:
  - complete 세션이 1개 이상 있는 사용자만 포함
  - complete 세션이 2개 이상이면 첫 번째 complete 세션만 포함

출력:
  - [output-dir]/task_duration_stats.csv
  - [output-dir]/task_duration_stats.md
"""

import json
import sys
import os
from datetime import datetime
from statistics import mean, median

# 제외할 테스트/연구자 계정 목록
EXCLUDED_EMAILS = [
    'shyun.bae@gmail.com',
    'sh.bae@snu.ac.kr',
    'ellienbellie@snu.ac.kr',
    'lee.7313@osu.edu',
]


def parse_iso_datetime(iso_string):
    """ISO 8601 문자열을 timestamp(ms)로 변환"""
    if not iso_string:
        return None
    try:
        # ISO 8601 포맷 파싱
        dt = datetime.fromisoformat(iso_string.replace('Z', '+00:00'))
        return dt.timestamp() * 1000
    except:
        return None


def get_durations_ms(session):
    """세션의 두 가지 시간 측정(ms) 계산

    Returns:
        tuple: (total_duration, reading_duration)
        - total_duration: session.startedAt ~ reading.completedAt
        - reading_duration: reading.startedAt ~ reading.completedAt
    """
    reading = session.get('reading', {})
    completed_at = reading.get('completedAt')

    # Total duration: session.startedAt ~ reading.completedAt
    session_started_at = parse_iso_datetime(session.get('startedAt'))
    total_duration = None
    if session_started_at and completed_at:
        total_duration = completed_at - session_started_at

    # Reading duration: reading.startedAt ~ reading.completedAt
    reading_started_at = reading.get('startedAt')
    reading_duration = None
    if reading_started_at and completed_at:
        reading_duration = completed_at - reading_started_at

    return total_duration, reading_duration


def filter_complete_sessions(raw_data):
    """complete 세션 필터링

    - complete 세션이 1개 이상 있는 사용자만 포함
    - complete 세션이 2개 이상이면 첫 번째 complete 세션만 포함
    """
    filtered_sessions = []

    for user_id, user_data in raw_data.get('users', {}).items():
        email = user_data.get('email', '')

        # 테스트 계정 제외
        if email in EXCLUDED_EMAILS:
            continue

        sessions = user_data.get('sessions', {})

        # complete 세션만 필터링하고 시작 시간순 정렬
        complete_sessions = [
            (sid, s) for sid, s in sessions.items()
            if s.get('currentPhase') == 'complete'
        ]
        complete_sessions.sort(key=lambda x: x[1].get('startedAt', ''))

        # complete 세션이 없으면 제외
        if not complete_sessions:
            continue

        # 첫 번째 complete 세션만 포함
        session_id, session_data = complete_sessions[0]

        total_duration_ms, reading_duration_ms = get_durations_ms(session_data)

        # 최소한 하나의 duration이 있어야 포함
        if total_duration_ms is not None or reading_duration_ms is not None:
            filtered_sessions.append({
                'user_id': user_id,
                'email': email,
                'session_id': session_id,
                'condition': session_data.get('condition', user_data.get('condition', '')),
                'total_duration_ms': total_duration_ms,
                'total_duration_min': total_duration_ms / 60000 if total_duration_ms else None,
                'reading_duration_ms': reading_duration_ms,
                'reading_duration_min': reading_duration_ms / 60000 if reading_duration_ms else None,
                'started_at': session_data.get('startedAt', ''),
            })

    return filtered_sessions


def calculate_stats(durations_min):
    """Min, Max, Median, Mean 계산"""
    # None 값 필터링
    valid_durations = [d for d in durations_min if d is not None]

    if not valid_durations:
        return {'n': 0, 'min': None, 'max': None, 'median': None, 'mean': None}

    return {
        'n': len(valid_durations),
        'min': round(min(valid_durations), 2),
        'max': round(max(valid_durations), 2),
        'median': round(median(valid_durations), 2),
        'mean': round(mean(valid_durations), 2),
    }


def generate_csv(sessions, total_stats, reading_stats, output_path):
    """결과 CSV 생성"""
    lines = []

    # Total Duration 통계
    lines.append('# Total Duration Statistics (session.startedAt ~ reading.completedAt) (minutes)')
    lines.append('Metric,Value')
    lines.append(f'N,{total_stats["n"]}')
    lines.append(f'Min,{total_stats["min"]}')
    lines.append(f'Max,{total_stats["max"]}')
    lines.append(f'Median,{total_stats["median"]}')
    lines.append(f'Mean,{total_stats["mean"]}')
    lines.append('')

    # Reading Duration 통계
    lines.append('# Reading Duration Statistics (reading.startedAt ~ reading.completedAt) (minutes)')
    lines.append('Metric,Value')
    lines.append(f'N,{reading_stats["n"]}')
    lines.append(f'Min,{reading_stats["min"]}')
    lines.append(f'Max,{reading_stats["max"]}')
    lines.append(f'Median,{reading_stats["median"]}')
    lines.append(f'Mean,{reading_stats["mean"]}')
    lines.append('')

    # 개별 세션 데이터
    lines.append('# Individual Session Data')
    lines.append('user_id,email,session_id,condition,total_duration_min,reading_duration_min,started_at')
    for s in sessions:
        total_min = round(s["total_duration_min"], 2) if s["total_duration_min"] else ''
        reading_min = round(s["reading_duration_min"], 2) if s["reading_duration_min"] else ''
        lines.append(f'{s["user_id"]},{s["email"]},{s["session_id"]},{s["condition"]},{total_min},{reading_min},{s["started_at"]}')

    with open(output_path, 'w') as f:
        f.write('\n'.join(lines))


def generate_markdown(sessions, total_stats, reading_stats, total_by_cond, reading_by_cond, output_path):
    """결과 Markdown 생성"""
    lines = []

    lines.append('# Task Duration Analysis')
    lines.append('')
    lines.append('## Overview')
    lines.append('')
    lines.append('과제 수행 시간 분석')
    lines.append('')
    lines.append('**두 가지 측정 방식:**')
    lines.append('1. **Total Duration**: `session.startedAt` ~ `reading.completedAt` (세션 생성부터 완료까지, 자료 생성 대기 시간 포함)')
    lines.append('2. **Reading Duration**: `reading.startedAt` ~ `reading.completedAt` (순수 읽기 시간)')
    lines.append('')
    lines.append('**필터링 규칙:**')
    lines.append('- complete 세션이 1개 이상 있는 사용자만 포함')
    lines.append('- complete 세션이 2개 이상이면 첫 번째 complete 세션만 포함')
    lines.append('')

    # Total Duration 통계
    lines.append('## 1. Total Duration (session.startedAt ~ reading.completedAt)')
    lines.append('')
    lines.append('### Summary (minutes)')
    lines.append('')
    lines.append('| Metric | Value |')
    lines.append('|--------|-------|')
    lines.append(f'| N | {total_stats["n"]} |')
    lines.append(f'| Min | {total_stats["min"]} |')
    lines.append(f'| Max | {total_stats["max"]} |')
    lines.append(f'| Median | {total_stats["median"]} |')
    lines.append(f'| Mean | {total_stats["mean"]} |')
    lines.append('')

    lines.append('### By Condition (minutes)')
    lines.append('')
    lines.append('| Condition | N | Min | Max | Median | Mean |')
    lines.append('|-----------|---|-----|-----|--------|------|')
    for cond, cond_stats in total_by_cond.items():
        lines.append(f'| {cond} | {cond_stats["n"]} | {cond_stats["min"]} | {cond_stats["max"]} | {cond_stats["median"]} | {cond_stats["mean"]} |')
    lines.append('')

    # Reading Duration 통계
    lines.append('## 2. Reading Duration (reading.startedAt ~ reading.completedAt)')
    lines.append('')
    lines.append('### Summary (minutes)')
    lines.append('')
    lines.append('| Metric | Value |')
    lines.append('|--------|-------|')
    lines.append(f'| N | {reading_stats["n"]} |')
    lines.append(f'| Min | {reading_stats["min"]} |')
    lines.append(f'| Max | {reading_stats["max"]} |')
    lines.append(f'| Median | {reading_stats["median"]} |')
    lines.append(f'| Mean | {reading_stats["mean"]} |')
    lines.append('')

    lines.append('### By Condition (minutes)')
    lines.append('')
    lines.append('| Condition | N | Min | Max | Median | Mean |')
    lines.append('|-----------|---|-----|-----|--------|------|')
    for cond, cond_stats in reading_by_cond.items():
        lines.append(f'| {cond} | {cond_stats["n"]} | {cond_stats["min"]} | {cond_stats["max"]} | {cond_stats["median"]} | {cond_stats["mean"]} |')
    lines.append('')

    # 개별 데이터
    lines.append('## Individual Session Data')
    lines.append('')
    lines.append('| Email | Condition | Total (min) | Reading (min) |')
    lines.append('|-------|-----------|-------------|---------------|')
    for s in sorted(sessions, key=lambda x: x['reading_duration_min'] or 0):
        total_min = round(s["total_duration_min"], 2) if s["total_duration_min"] else '-'
        reading_min = round(s["reading_duration_min"], 2) if s["reading_duration_min"] else '-'
        lines.append(f'| {s["email"]} | {s["condition"]} | {total_min} | {reading_min} |')

    with open(output_path, 'w') as f:
        f.write('\n'.join(lines))


def main():
    if len(sys.argv) < 2:
        print('Usage: python analyze-task-duration.py <raw-data.json> [output-dir]')
        sys.exit(1)

    input_file = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else os.path.dirname(input_file)

    # 데이터 로드
    with open(input_file, 'r') as f:
        raw_data = json.load(f)

    # 세션 필터링
    sessions = filter_complete_sessions(raw_data)
    print(f'Filtered sessions: {len(sessions)}')

    # Total Duration 통계
    total_durations = [s['total_duration_min'] for s in sessions]
    total_stats = calculate_stats(total_durations)

    # Reading Duration 통계
    reading_durations = [s['reading_duration_min'] for s in sessions]
    reading_stats = calculate_stats(reading_durations)

    # 조건별 통계
    total_by_cond = {}
    reading_by_cond = {}
    for cond in ['control', 'ebm_cimo']:
        cond_total = [s['total_duration_min'] for s in sessions if s['condition'] == cond]
        cond_reading = [s['reading_duration_min'] for s in sessions if s['condition'] == cond]
        total_by_cond[cond] = calculate_stats(cond_total)
        reading_by_cond[cond] = calculate_stats(cond_reading)

    # 결과 출력
    print(f'\n=== Total Duration (session.startedAt ~ reading.completedAt) ===')
    print(f'N: {total_stats["n"]}, Min: {total_stats["min"]}, Max: {total_stats["max"]}, Median: {total_stats["median"]}, Mean: {total_stats["mean"]}')
    for cond, cond_stats in total_by_cond.items():
        print(f'  {cond}: N={cond_stats["n"]}, Min={cond_stats["min"]}, Max={cond_stats["max"]}, Median={cond_stats["median"]}, Mean={cond_stats["mean"]}')

    print(f'\n=== Reading Duration (reading.startedAt ~ reading.completedAt) ===')
    print(f'N: {reading_stats["n"]}, Min: {reading_stats["min"]}, Max: {reading_stats["max"]}, Median: {reading_stats["median"]}, Mean: {reading_stats["mean"]}')
    for cond, cond_stats in reading_by_cond.items():
        print(f'  {cond}: N={cond_stats["n"]}, Min={cond_stats["min"]}, Max={cond_stats["max"]}, Median={cond_stats["median"]}, Mean={cond_stats["mean"]}')

    # 파일 저장
    os.makedirs(output_dir, exist_ok=True)

    csv_path = os.path.join(output_dir, 'task_duration_stats.csv')
    md_path = os.path.join(output_dir, 'task_duration_stats.md')

    generate_csv(sessions, total_stats, reading_stats, csv_path)
    generate_markdown(sessions, total_stats, reading_stats, total_by_cond, reading_by_cond, md_path)

    print(f'\nOutput saved to:')
    print(f'  - {csv_path}')
    print(f'  - {md_path}')


if __name__ == '__main__':
    main()
