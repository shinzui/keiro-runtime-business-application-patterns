---
id: 3
slug: document-read-side-application-patterns-and-verify-the-complete-flow
title: "Document read-side application patterns and verify the complete flow"
kind: exec-plan
created_at: 2026-10-07T16:09:44Z
intention: "intention_01m4bhvpbsecpb5487rqdjwwkg"
master_plan: "docs/masterplans/1-bootstrap-a-book-aligned-keiro-business-application-pattern-catalog.md"
provenance:
  created_by:
    model: "gpt-6-astra"
    harness: "codex-cli"
    at: 2026-10-07T16:09:44Z
  revisions:
    - model: "gpt-6-astra"
      harness: "codex-cli"
      at: 2026-10-07T16:28:17Z
      mode: "implement"
      note: "Implement read-side composition and complete-flow validation"
    - model: "gpt-6-astra"
      harness: "codex-cli"
      at: 2026-10-07T16:42:12Z
      mode: "update"
      note: "Apply Kiroku-only event-store terminology requested by the user"
---

# Document read-side application patterns and verify the complete flow

## Purpose / Big Picture

An application author can build a screen whose initial query, mutation result, projection visibility, and live updates agree. Readers can follow one complete chapter-activation scenario and its recovery cases, while navigating directly to the existing runtime mechanics rather than a duplicated implementation manual.

## Progress

- [x] M1: Read-model, query, and subscription composition patterns have source-backed failure and recovery guidance. Accepted 2026-10-07; evidence is recorded in Outcomes & Retrospective.
- [x] M2: A complete command-to-screen walkthrough consumes the accepted outcome contract and closes catalog coverage and validation. Accepted 2026-10-07; evidence is recorded in Outcomes & Retrospective.

## Surprises & Discoveries

## Decision Log

2026-10-07: Use a small reproducible walkthrough and scenario evidence to validate the documentation. A production reference application or a new frontend stack is outside scope.

## Outcomes & Retrospective

Completed 2026-10-07. Two read-side patterns and the complete chapter activation walkthrough close the 22-source coverage map. Ten concepts pass strict complete-mode checks; 51 Mori references resolve. The finite screen model checks 24 orderings and five naive counterexamples, and five invalid catalog fixtures fail for the intended reasons. [Flow evidence](../validation/business-application-flow.md) records validation and source-inspection limits. Durable decisions from all three plans are distilled in local ADRs 1–3. No production application or upstream runtime test execution is claimed.

## Context and Orientation

This repository starts as a scaffold with installed planning skills and `.seihou/config.dhall`; no application code or catalog existed when this plan was written. Open Knowledge Format (OKF) stores Markdown concepts with validated metadata, generated indexes, and update logs. A profile is the reusable validation contract, not a new runtime capability. Mori resolves canonical project and document identities to local source paths. Run commands from this repository root, obtained with `git rev-parse --show-toplevel`.

Source authority is layered: `mori://shinzui/event-sourcing-full-app-patterns` contains notes on Peter Royal's *Building Modern Business Applications* and adaptations to an older platform; `mori://shinzui/keiro-runtime-patterns` owns runtime implementation standards; `mori://shinzui/keiro` and Mori-discovered supporting projects own actual APIs. Ground event-store guidance in Kiroku and verify illustrative source snippets against current Keiro APIs. Use canonical Mori URIs for every durable external reference. If a source file lacks an artifact handle, cite its project URI together with its project-relative path and state that artifact-level coverage is pending.

No local ADR existed at planning time. Consult `mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-6`, which assigns one normative documentation owner, and `mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-8`, which isolates the catalog from plans and consumes a shared profile. Content involving transport also follows `mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-3`, distinguishing jobs, private event consumption, and cross-context facts. Read local ADRs created by bootstrap before implementation and carry their applicable decisions forward.

Hard prerequisite for this plan is completion of `docs/plans/1-bootstrap-the-okf-catalog-and-book-to-runtime-coverage-map.md`. It supplies the profile, authoring contract, source map, and checker. M1 can proceed after that prerequisite. M2 additionally requires accepted M1 in `docs/plans/2-document-business-command-and-workflow-composition-patterns.md`, specifically `business-patterns/commands/outcomes-and-visibility.md`. That contract must define request identity, typed outcomes, optional commit positions, and visibility scope; this plan consumes rather than independently invents it.

Primary source references are `mori://shinzui/event-sourcing-full-app-patterns/docs/event-materializer`, `mori://shinzui/event-sourcing-full-app-patterns/docs/high-level-data-flow`, `mori://shinzui/event-sourcing-full-app-patterns/docs/frontend-relay-patterns`, `mori://shinzui/event-sourcing-full-app-patterns/docs/screen-data-query-first-rationale`, and `mori://shinzui/event-sourcing-full-app-patterns/docs/testing-monitoring-observability`. The source notes discuss live-query initial state and later guides advocate query-first screen loading. Preserve that distinction; do not falsely label every source as one uniform book rule.

Runtime mechanics remain owned by `mori://shinzui/keiro-runtime-patterns/docs/keiro-read-models-and-projections`, `mori://shinzui/keiro-runtime-patterns/docs/keiro-projection-catalogs`, and `mori://shinzui/keiro-runtime-patterns/docs/kiroku-transactions-and-projections`. A materializer builds query-oriented state from committed facts. A checkpoint records processing progress; its scope and transaction semantics determine what freshness it can prove. Read source before assigning a position to an external API.

## Plan of Work

### M1 — Explain the screen-facing read contract

Create `business-patterns/reads/materialization-and-freshness.md` and `business-patterns/reads/query-and-live-updates.md`. Explain how to choose a read model for a screen, distinguish an accepted command from a visible result, and expose honest freshness and timeout behavior. Link to runtime projection catalogs, generation fencing, guarded read surfaces, transaction rules, and rebuild procedures instead of repeating them. Cover partial materialization, multiple source scopes, duplicate delivery, and safe rebuilds without claiming that a maximum observed event position proves all preceding work is complete.

Define the browser-facing composition: authorize the initial query, return an identifiable snapshot, attach updates with an explicit handoff protocol, reconcile races, and resynchronize after disconnect. Compare query-first plus changes with a true snapshot-and-stream contract; explain applicability and source provenance. A naive query followed by subscribe has a gap, so require a supported cursor/replay or subscribe-and-reconcile strategy. If the runtime/application boundary offers only ephemeral notifications, document requery and bounded staleness honestly; do not claim lossless delivery.

Discuss GraphQL mutation/query/subscription boundaries, Relay identity and connection handling by referencing the source guides, and the distinction between read-model changes and private domain events. Specify authorization on queries, subscriptions, and reconnect; avoid leaking private event streams or relying only on initial authentication. Document app-level lag indicators and user recovery actions; reuse runtime telemetry mechanics through citations.

### M2 — Reconcile the complete user journey

After the command contract prerequisite is accepted, create `business-patterns/examples/chapter-activation.md`. Start with an authorized screen query, submit a configured chapter's activation command with operation identity and expected revision, observe a truthful disposition, wait only as allowed by the projection contract, and refresh the screen. Before adding variants, trace this one accepted path through source-backed producer/consumer boundaries. Put concrete input, observed/expected outcome, source evidence, and whether the trace is executable or illustrative in `docs/validation/business-application-flow.md`.

Extend the walkthrough to business rejection, no-op, conflicting concurrent edit, duplicate request, lost command response, lagging projection, disconnect between query and subscription, duplicate/out-of-order notification, authorization loss, and projection rebuild. Each trace must name a user-visible result and recovery step. Use the accepted command contract rather than synthesizing new result fields. Demonstrate that an accepted write followed by a visibility timeout is not reported as a failed command and is not blindly resubmitted with a fresh identity.

Verify exact runtime claims against Mori-located source and existing tests, recording revisions and released support. Add a small local executable fixture only if a novel composition claim needs proof not available in those sources, and document its exact run command. A mocked trace cannot prove database transactionality, durable deduplication, or server-side authorization. For such guarantees, cite matching runtime evidence or explicitly identify the application-owned obligation; do not certify an unbuilt application.

Close every source-map row: published additions resolve, inherited topics point to their owner, and capability gaps have clear limitations and supported alternatives. No planned or unclassified rows remain, though a documented unsupported capability may remain a gap. Verify all new concept DocRefs, regenerate indexes/logs, and update getting-started/README navigation through the established conventions. Review each pattern for copied normative content; remove redundant sections in favor of baseline links. Record any durable architecture decision and perform ADR distillation across the initiative before declaring it complete.

## Concrete Steps

From the repository root:

```bash
mori path mori://shinzui/event-sourcing-full-app-patterns/docs/event-materializer
mori path mori://shinzui/event-sourcing-full-app-patterns/docs/screen-data-query-first-rationale
mori path mori://shinzui/keiro-runtime-patterns/docs/keiro-read-models-and-projections
mori registry show shinzui/keiro --full
mori registry docs shinzui/keiro-runtime-patterns
```

Read the returned documents and resolve supporting API/test evidence through Mori. Refresh release information before selecting executable-example dependency bounds. Use canonical project URI plus a source-relative path with artifact-handle-pending status where needed.

After writing concepts and recording logs with the bootstrap-documented command:

```bash
okf index business-patterns --write
just check-docs
mori path mori://shinzui/keiro-runtime-business-application-patterns/docs/examples-chapter-activation
```

The example DocRef must be added to `mori.dhall` and registry data refreshed before the last command. Add any executable fixture's exact invocation and expected output to the validation evidence document; do not leave a placeholder command at acceptance.

## Validation and Acceptance

The reader can answer what is durable, what is visible, what may be retried, and how the screen recovers at every step of the accepted path and listed failure scenarios. The query/subscription handoff explicitly handles a change occurring between the initial read and live attachment. Multi-source freshness uses the correct scope, and rebuild guidance does not expose partially built results or rerun irreversible effects. Sources distinguish the book, older adaptations, runtime guarantees, and proposed application glue.

`just check-docs` passes with stable generated output; all local links and newly registered Mori identities resolve. Every source row is classified and every published pattern explains its additional value. Record a final manual comparison against the closest runtime standard for each pattern in `docs/validation/business-application-flow.md`. Completion requires all child acceptance conditions, not merely a passing format check. Report unresolved implementation gaps honestly; they cannot stand in for required supported example behavior.

## Idempotence and Recovery

Changes are additive and local. Preserve unrelated work, existing stable document identities, and generated frontmatter provenance. Regenerate indexes instead of hand-editing them; update each material concept's metadata and nearest log. Rerun checks after corrections. Perform deliberate invalid-fixture checks in a temporary copy, never by leaving the catalog broken. If Mori registration is unavailable, keep intended canonical references and record the exact failure; do not substitute machine-specific paths or claim discovery acceptance. Do not modify upstream repositories to force an example to pass. Record a capability gap and its supported alternative, and revise affected acceptance claims truthfully.

## Interfaces and Dependencies

The whole-child prerequisite is `docs/plans/1-bootstrap-the-okf-catalog-and-book-to-runtime-coverage-map.md`; M2 also requires M1 of `docs/plans/2-document-business-command-and-workflow-composition-patterns.md`. This plan owns the read-side guidance, complete example, final coverage closure, and integration evidence. EP-2 retains ownership of the command outcome contract. Bootstrap retains ownership of profile/checker/source-map structure; extend content and registrations without changing that contract incidentally. Preserve the shared intention and record plan revisions through the skill scripts. Final ADR distillation covers all child Decision Logs, discoveries, and outcomes, leaving task-local evidence in the plans.

Revision 2026-10-07: Apply the user’s terminology constraint throughout the catalog and supporting documentation: Kiroku is Keiro’s event store; omit deprecated storage references. Implementation scope and acceptance remain unchanged.
