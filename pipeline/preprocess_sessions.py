#!/usr/bin/env python3
"""
sessions.csv 전처리 스크립트

전처리 규칙:
  1. currentPhase == 'complete' 인 세션만 남기기
  2. 유저당 최초 complete 세션 1개만 남기기 (completedAt 기준)

사용법:
  python scripts/preprocess_sessions.py
  python scripts/preprocess_sessions.py <input_sessions_csv> <output_path>

기본 경로:
  입력: data/final-dataset/sessions.csv
  출력: data/final-dataset/sessions_preprocessed.csv
"""

import csv
import sys
import os


def preprocess(input_path, output_path):
    with open(input_path, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        rows = list(reader)

    total = len(rows)

    # 1. complete 세션만
    complete = [r for r in rows if r['currentPhase'] == 'complete']
    print(f"전체 세션       : {total}행")
    print(f"complete 세션   : {len(complete)}행")

    # 2. 유저당 최초 complete 세션만 (completedAt 오름차순 → 첫 번째)
    first_complete = {}
    for r in complete:
        uid = r.get('S1_userid') or r.get('userid', '')
        cat = r.get('S1_completedAt') or r.get('completedAt', '')
        if uid not in first_complete or cat < (first_complete[uid].get('S1_completedAt') or first_complete[uid].get('completedAt', '')):
            first_complete[uid] = r

    def sort_key(r):
        uca = r.get('S1_userCreatedAt') or r.get('userCreatedAt', '')
        cat = r.get('S1_completedAt') or r.get('completedAt', '')
        return (uca, cat)

    result = sorted(first_complete.values(), key=sort_key)

    print(f"유저당 최초 1개 : {len(result)}행")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(result)

    print(f"\n저장 완료: {output_path}")


def default_paths():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root = os.path.dirname(script_dir)
    input_path = os.path.join(root, 'data', 'final-dataset', 'sessions.csv')
    output_path = os.path.join(root, 'data', 'final-dataset', 'sessions_preprocessed.csv')
    return input_path, output_path


if __name__ == '__main__':
    if len(sys.argv) >= 3:
        input_path, output_path = sys.argv[1], sys.argv[2]
    else:
        input_path, output_path = default_paths()

    preprocess(input_path, output_path)
