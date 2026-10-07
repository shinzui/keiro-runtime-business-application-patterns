---
type: Pattern
title: "Follow a chapter activation from intent to screen"
description: "Walk one business action through command disposition, scoped visibility, and live-screen recovery."
generated:
  by: process:codex
  at: "2026-10-07T17:27:01Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/examples-chapter-activation
tags: [business-applications, keiro, composition]
status: current
relationship: supplements
runtime_baseline: mori://shinzui/keiro-runtime-patterns/docs/keiro-command-cycle-and-errors
sources:
  - resource: mori://shinzui/keiro-runtime-patterns/docs/keiro-command-cycle-and-errors
  - resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-high-level-data-flow
  - resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-testing-monitoring-observability
  - resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-command-generator
  - resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-command-processor
  - resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-event-materializer
---

# Follow a chapter activation from intent to screen

## Problem and applicability

Use this worked example to design and review one business feature across API, command, materializer, and screen boundaries. It is an illustrative acceptance walkthrough, not a runnable Keiro application. The numbers below make scopes visible; they are not captured production output.

## Book principle and source layer

The [high-level flow notes](../../book-notes/high-level-data-flow.md) connect mutation, pure command processing, events, materialization, and observation. The [testing notes](../../book-notes/testing-monitoring-observability.md) require composed workflow checks in addition to component tests. This example traces that conceptual loop through source-verified Keiro boundaries, Kiroku event storage, and the local application contracts.

## Runtime baseline

Use [command outcomes](../commands/outcomes-and-visibility.md), [command generation](../commands/generation-and-processing.md), [materialization](../reads/materialization-and-freshness.md), and [screen reconciliation](../reads/query-and-live-updates.md). Runtime owners are [command cycle](mori://shinzui/keiro-runtime-patterns/docs/keiro-command-cycle-and-errors) and [read-model freshness](mori://shinzui/keiro-runtime-patterns/docs/keiro-read-models-and-projections). Source symbol and test evidence is recorded in [flow evidence](../../docs/validation/business-application-flow.md).

## Application recommendation

Assume one tenant, an authorized operator, and chapter C in source store S. C is configured but inactive at stream revision 7. Model `chapter-detail`, generation G1, covers the relevant source through a durable ordered cursor. Its row shows inactive at revision 7. The application has chosen repeatable request receipts, with authorization, serialized key handling, and a retention horizon; this is an application implementation prerequisite, not a runtime feature this repository creates.

1. Query C through the authorized read service. Show inactive and revision 7. Attach the live invalidation channel, await acknowledgment, and requery; record the response generation so a late initial response cannot roll back this view.
2. Submit ActivateChapter with operation identity K, target C, expected revision 7, and captured decision inputs. The application binds K to the canonical request fingerprint and performs its stale-edit check; runtime conflict retry must not quietly erase that precondition.
3. The pure domain decision emits ChapterActivated because configuration exists. The runtime accepted path appends at C revision 8 and, for illustration, store S position 104. The application commits its repeatable result evidence using the sanctioned receipt protocol. It returns disposition accepted, streamRevision 8, commitPosition `(S,104)`, and visibility not_requested. It does not claim notification delivery or immediate screen visibility.
4. The read service verifies that this model/cursor can satisfy the supplied target. It asks the sanctioned runtime read path to wait for position 104 within a bounded budget. Suppose the cursor is still 103: preserve the accepted outcome and show “saved, view updating.”
5. The materializer applies the event using the registered projection protocol and advances its durable coverage to 104. The authorized read returns active, revision 8, with the model/source/generation scope. The client can now show visible. A live hint may prompt this query but is not required to certify command acceptance.
6. A later duplicate invalidation only refreshes the read. A notification worker has its own status and operation key; rebuilding the view does not resend its email. After a disconnect, reauthorize and repeat attachment/reconciliation instead of assuming no changes occurred.

This accepted path is the producer/consumer check: the command supplies an optional **store** position; the consumer waits only through an appropriate durable cursor. If the chosen model is cursorless, use its sanctioned immediate read after an inline commit or choose a different proven visibility predicate. Do not force step 4 to compile by inventing a cursor.

## Alternatives and divergences

Direct processing is selected here because the mutation is short and local. Durable intake would insert a pending phase before step 3 and an authorized result lookup; it would not redefine accepted or make an enqueue position the domain event position. Inline projection would change step 4's freshness mechanism and increase coupling to the command transaction. A resumable snapshot-stream contract could replace the initial query/invalidation protocol only with the stronger guarantee described in the screen pattern.

## Failure and recovery

| Changed input or failure | Expected user-visible result | Recovery and invariant |
|---|---|---|
| Configuration absent | rejected, ConfigurationRequired | Fix configuration and deliberately submit new intent; no append position |
| Already active | no_op, AlreadyActive | Query current view; no fake event or after-append callback |
| Another edit changes revision before K | Stale-edit conflict under this application's policy | Refresh and let user choose a new intent; automatic retry does not remove the precondition |
| K resent with identical payload | Original result or pending/unknown | Reuse protected receipt and position; never append twice for the advertised repeatable contract |
| K resent with different payload | Identity conflict | Do not execute; caller must distinguish new intent from retry |
| Two K requests arrive together | One protected operation | Serialize or observe its durable state; no independent second success |
| Response lost after accepted commit | Client initially unknown | Authorized lookup of K recovers accepted; no fresh key as an automatic fix |
| Crash before any commit | No accepted evidence | Same-key retry follows the receipt protocol; do not infer from timeout alone |
| Projection remains at 103 | accepted plus waiting/unavailable visibility | Retry reads, not the activation; show lag |
| Change occurs before live attachment | Initial view may be stale | Post-attachment query catches it |
| Change occurs during reconciliation | Dirty signal retained | Run another query and reject late older responses |
| Duplicate/reordered/lost live hints | Hints do not decide command status | Coalesce; guard responses; periodic/focus/reconnect refresh repairs loss |
| Authorization revoked | View unavailable to that actor | Stop delivery, clear inaccessible state, and reauthorize; no fallback private read |
| Projection rebuild begins | Offline unavailable or old live generation, as configured | Use guarded lifecycle; after promotion requery, do not read retained old tables |
| Receipt retention expires | Explicit expired/unknown contract | Reconcile state and require deliberate user action; never silently execute the old key as new |

An adopting application's composed test should drive these cases through its public API and real persistence boundary, not merely mock an accepted response. Add generated action sequences for configure/activate/correct/retry only after this simple oracle agrees with the actual service. Verify append atomicity and receipt races with database tests, authorization with server tests, and live reconnect with the actual transport. This documentation does not certify an unbuilt service.

## Evidence

The local screen ordering model is reproducible with `python3 scripts/check-screen-handoff.py`. Runtime source inspection supports accepted/silent branch mapping, cursor requirements, and guarded external reads; [flow evidence](../../docs/validation/business-application-flow.md) records exact locations and what was not executed. There is no substitute mock database pretending to prove transactionality.
