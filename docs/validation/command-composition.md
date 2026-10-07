# Command composition evidence

## Source baseline

Inspected on 2026-10-07. mori://shinzui/event-sourcing-full-app-patterns at `479946721924895f4242cd6ab86558f795c9af71` supplies chapter summaries and platform adaptations. mori://shinzui/keiro-runtime-patterns at `9914450cb36fcdf7d7a00e961ac1433cf7d8f26d` supplies normative runtime patterns. `mori://shinzui/keiro` at `b5ad9d571abee8d3fde270d0859047f855003d50` supplies source. Hackage's preferred package endpoint and upstream annotated tag both identify keiro 0.19.0.1; the tag peels to `9b215c1121a694e49d582d9bb4e8600a3b9b446f`. The inspected command and read-model files have no diff from that tag. No package bounds or new application dependencies are introduced.

Source locations below are project-relative within `mori://shinzui/keiro`; artifact-level source/test handles are pending. This is source inspection, not an assertion that upstream tests were executed in this session.

| Claim | Source evidence | Limit |
|---|---|---|
| Accepted/rejected/no-op are distinct | `keiro/src/Keiro/Command.hs`, `DomainDecision`, `DomainCommandOutcome` | Public wire mapping belongs to application |
| A silent decision has no append position | Same module, `CommandResult`, `prepareDomainCommandPlan`, `noOpResult` | Stream version is not a global visibility token |
| Silent decisions bypass append callbacks | Same module, `domainSqlCommandAttempts` routes silent branch to `DomainSqlCommandSilent` | A universal receipt service is not provided |
| Append and SQL callback share the controlled transaction | Same module, `domainSqlCommandAttempts`, `appendWithSqlOnce` | Does not make remote effects atomic |
| Actual branches have regression tests | `keiro/test/Main.hs`, typed domain command outcomes: exact ordered accepted batch; sibling silent rejection/no-op; skips SQL callbacks and inline projections; applies inline projections atomically | Tests read, not rerun |
| Durable steps need downstream idempotence | mori://shinzui/keiro-runtime-patterns/docs/keiro-durable-workflows, Run and replay the journal; `mori://shinzui/keiro` at project-relative `keiro/src/Keiro/Workflow.hs`, Step branch, executes `unlift act` before `appendJournal` (artifact handle pending) | A workflow is not exactly-once external execution |

## Scenario review

The table in [outcomes](../../business-patterns/commands/outcomes-and-visibility.md) was reviewed against those branches. Accepted activation yields a position; missing configuration rejects; already active is a no-op; neither silent branch invents a position or waits on an append callback. Concurrent identical keys share an application-owned protected operation. Conflicting payload reuse is an identity conflict. A lost response resolves the original receipt where implemented and otherwise remains pending/unknown. An accepted append with a stale projection remains accepted. These are specified application traces, not observations from a deployed service.

The time guidance separately handles delayed timers, superseded schedules, replayed historical inputs, and duplicate wakeups. The effect guidance handles success-before-timeout, downstream idempotency absence, integration duplicates, and rebuild isolation. It does not promise a PGMQ public integration path or exactly-once remote effects.

## Non-duplication review

`generation-and-processing` adds the topology selection and stale-edit boundary beyond the runtime cycle. `outcomes-and-visibility` adds the external vocabulary and cross-boundary interpretation, citing the existing receipt standard for mechanics. `time-and-automation` adds lateness and correction policy beyond journal/timer operation. `effects-and-integration` adds business acceptance versus consequence status beyond inbox/outbox delivery. No new SQL schema, runner, migration recipe, or competing runtime error taxonomy is copied into this catalog.

## Acceptance

On 2026-10-07 `just check-docs HEAD` passed for seven concepts and 22 source rows. Mori local registration succeeded, and the command outcome DocRef resolves to this checkout. M1’s producer contract is accepted for the read-side child. No upstream runtime tests were rerun; runtime mechanisms are supported by source/test inspection, while the local application scenario remains a specified contract.
