# Business application flow evidence

## Baseline and scope

The revisions and keiro 0.19.0.1 release checks in [command evidence](command-composition.md) apply here. Inspected command/read-model source matches the released tag. Source references below name project-relative files within `mori://shinzui/keiro`; source/test artifact handles are pending. Tests were read, not executed against PostgreSQL in this session. Application receipt handling, stale-edit policy, GraphQL authorization, and browser transport remain explicit implementation obligations.

## Representative producer/consumer check

Before expanding failure cases, the chapter activation path was checked against `keiro/src/Keiro/Command.hs` (`DomainAccepted`, `CommandResult`, append result construction) and `keiro/src/Keiro/ReadModel.hs` (`QueryFreshness`, `positionWaitingReadModel`, `runQueryWithFreshness`, `waitForCursor`). Accepted appends supply a position. Waiting requires a concrete position and a durable query cursor. Silent outcomes supply no new position. The example's `(S,104)` therefore reaches the async query only under an explicit same-source cursor contract; no-op uses an independent read. This is a source-backed interface trace, not an executed application roundtrip.

`keiro/test/ReadModelSpec.hs` tests cursorless immediate construction, refusal of waiting without a cursor, refusal of a missing position, and truthful waiting defaults. `keiro/test/Main.hs` contains typed domain outcome and inline transaction tests described in command evidence. `keiro/src/Keiro/ReadModel/External.hs` and `keiro/test/ExternalReadSpec.hs` cover the guarded SQL surface, lifecycle locks, execute-only grants, result types, and bounded all-row reads. Those mechanisms do not implement tenant authorization or a browser replay cursor.

## Screen ordering experiment

Run from this repository root:

```bash
python3 scripts/check-screen-handoff.py
```

The experiment enumerates legal orderings of initial read start/finish, live attachment, reconciliation start/finish, and a visible model change. It compares the naive query/attach flow against post-attachment reconciliation with a response guard and retained invalidation. It also tests dropped invalidations with an eventual successful refresh. The model assumes one already-materialized, monotonically versioned authorized view; it makes no claim about event-store atomicity, projection lag, network delivery, or server authorization. A negative control must find a lost-gap or stale-response counterexample, preventing a vacuous always-passing assertion.

The [walkthrough](../../business-patterns/examples/chapter-activation.md) adds the domain rejection, no-op, revision conflict, duplicate request, response loss, projection lag, authorization loss, retention expiry, and rebuild traces. Those are illustrative acceptance expectations for an adopting application, not observed runtime executions.

## Source coverage and non-duplication review

The source map covers all 22 registered inputs. Inherited rows retain their existing owners. Command-log topology has a named direct-processing alternative; all event-store guidance targets Kiroku. The two subscription implementation guides have documented gaps for a durable browser service and use query/invalidation or polling as the supported design fallback. The query-first recommendation is distinguished from the book's live-query option.

The four command/workflow patterns' added value is recorded in [command evidence](command-composition.md). `materialization-and-freshness` adds screen-level selection and scoped observation, not a new projection runner. `query-and-live-updates` adds an attachment/reconciliation and authorization boundary, not a second server-side subscription standard. `chapter-activation` integrates those decisions and failure states, without copying runtime setup recipes. Profile, indexes, and source navigation remain owned by the bootstrap contract.

## Durable decisions

[ADR-1](../adr/0001-supplement-runtime-patterns-with-book-aligned-application-contracts.md) captures catalog ownership/source layering; [ADR-2](../adr/0002-separate-command-disposition-from-read-visibility.md) captures outcome/visibility separation; [ADR-3](../adr/0003-reconcile-live-screens-through-authorized-read-contracts.md) captures live-screen reconciliation. This is the distillation of all three child plans' durable choices. No runtime source changes or additional profile fork were needed.

## Final acceptance — 2026-10-07

`just check-docs HEAD --complete` passed: 10 concepts, 22 classified source entries, no planned destinations. All 51 unique Mori references in the catalog resolved locally. `mori validate` passed, and local registry refresh exposed the new example and patterns. Generated-index comparison remained byte-identical.

`python3 scripts/check-screen-handoff.py` passed all 24 legal orderings, found five naive counterexamples, and passed the stale-response and dropped-notification negative controls. `python3 scripts/test-catalog-checks.py` passed all five rejection cases: missing description, broken link, stale index, unlogged concept change, and incomplete coverage. CI YAML parsed successfully and invokes the same checks; a hosted CI run is not claimed.

All seven application Pattern documents were compared with their stated nearest runtime owners. The catalog adds application decisions, source interpretation, and explicit divergences rather than duplicating runtime implementation recipes. The complete flow remains an illustrative source-backed design plus a finite client-ordering experiment; it does not claim a deployed service or newly executed PostgreSQL integration tests.
