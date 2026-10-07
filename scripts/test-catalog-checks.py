#!/usr/bin/env python3
"""Prove catalog failures are enforced, without modifying the real checkout."""
from pathlib import Path
from tempfile import TemporaryDirectory
from concurrent.futures import ThreadPoolExecutor
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]

def check(case):
    with TemporaryDirectory(prefix='business-pattern-rejection-') as d:
        work = Path(d)
        for name in ['business-patterns', 'okf', 'scripts', 'docs']:
            shutil.copytree(ROOT / name, work / name)
        shutil.copy2(ROOT / 'mori.dhall', work / 'mori.dhall')
        doc = work / 'business-patterns/getting-started.md'
        args = []
        if case == 'missing description':
            doc.write_text('\n'.join(x for x in doc.read_text().split('\n') if not x.startswith('description:')))
            expected = 'description'
        elif case == 'broken link':
            doc.write_text(doc.read_text() + '\n[Missing](does-not-exist.md)\n')
            expected = 'does-not-exist'
        elif case == 'stale index':
            p = work / 'business-patterns/index.md'
            p.write_text(p.read_text() + '\nUnexpected manual edit\n')
            expected = 'Generated index is stale'
        else:
            for cmd in [['git', 'init', '-q'], ['git', 'add', '.'],
                        ['git', '-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-qm', 'fixture']]:
                subprocess.run(cmd, cwd=work, check=True, capture_output=True)
            doc.write_text(doc.read_text() + '\nA material change without its log entry.\n')
            args = ['HEAD']
            expected = 'Changed concept requires its nearest log'
        result = subprocess.run(['bun', 'scripts/check-business-patterns.ts', *args], cwd=work, capture_output=True, text=True)
        output = result.stdout + result.stderr
        if result.returncode == 0 or expected.lower() not in output.lower():
            raise AssertionError(f'{case}: expected rejection containing {expected!r}; got {result.returncode}\n{output}')
        return f'PASS: {case} rejected for the expected reason'

if __name__ == '__main__':
    with ThreadPoolExecutor(max_workers=4) as pool:
        for result in pool.map(check, ['missing description', 'broken link', 'stale index', 'unlogged change']):
            print(result, flush=True)
