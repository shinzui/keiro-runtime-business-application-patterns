#!/usr/bin/env python3
"""Finite screen-ordering model; deliberately not a runtime/database test."""
from itertools import permutations

EVENTS = ('initial_start', 'initial_end', 'attach', 'reconcile_start', 'reconcile_end', 'change')

def legal(order):
    at = {e: order.index(e) for e in EVENTS}
    return (at['initial_start'] < at['initial_end'] and
            at['initial_start'] < at['attach'] < at['reconcile_start'] < at['reconcile_end'])

def run(order, repair=True, guarded=True, notifications=True, final_refresh=False):
    server = 0
    screen = -1
    applied_request = -1
    attached = False
    captured = {}
    dirty = False
    # Requests 0/1 are initial/reconciliation. Request 2 is the coalesced refresh.
    def receive(request, value):
        nonlocal screen, applied_request
        if not guarded or request >= applied_request:
            screen, applied_request = value, request
    for event in order:
        if event == 'initial_start':
            captured[0] = server
        elif event == 'initial_end':
            receive(0, captured[0])
        elif event == 'attach':
            attached = True
        elif event == 'change':
            server += 1
            if attached and notifications:
                dirty = True
        elif event == 'reconcile_start' and repair:
            captured[1] = server
        elif event == 'reconcile_end' and repair:
            receive(1, captured[1])
    # Drain a retained notification after in-flight reads settle. The real client
    # repeats this protocol when a change occurs during a drain; this bounded
    # model has one change, no projection delay, and successful authorized reads.
    if dirty:
        receive(2, server)
    if final_refresh:
        receive(3, server)
    return screen, server

orders = [p for p in permutations(EVENTS) if legal(p)]
naive_failures = [p for p in orders if run(p, repair=False)[0] != run(p, repair=False)[1]]
assert naive_failures, 'Negative control failed: no naive query/attach gap found'
for p in orders:
    assert run(p)[0] == run(p)[1], ('Reconciliation failure', p)
    assert run(p, notifications=False, final_refresh=True)[0] == run(p, notifications=False, final_refresh=True)[1], ('Refresh recovery failure', p)
# Demonstrate why a late initial response needs a request-generation guard.
stale = ('initial_start', 'change', 'attach', 'reconcile_start', 'reconcile_end', 'initial_end')
assert run(stale, guarded=False) == (0, 1)
assert run(stale) == (1, 1)
# Losing a notification after reconciliation is NOT solved without a later read.
lost = ('initial_start', 'initial_end', 'attach', 'reconcile_start', 'reconcile_end', 'change')
assert run(lost, notifications=False) == (0, 1)
assert run(lost, notifications=False, final_refresh=True) == (1, 1)
print(f'PASS: {len(orders)} legal orderings reconcile; {len(naive_failures)} naive counterexamples found.')
print('PASS: stale-response negative control and dropped-notification refresh recovery.')
print('Scope: finite client ordering only; no database, projection, transport, or authorization proof.')
