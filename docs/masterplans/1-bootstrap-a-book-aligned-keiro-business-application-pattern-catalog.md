---
id: 1
slug: bootstrap-a-book-aligned-keiro-business-application-pattern-catalog
title: "Bootstrap a book-aligned Keiro business application pattern catalog"
kind: master-plan
created_at: 2026-10-07T16:09:31Z
intention: "intention_01m4bhvpbsecpb5487rqdjwwkg"
provenance:
  created_by:
    model: "gpt-6-astra"
    harness: "codex-cli"
    at: 2026-10-07T16:09:31Z
  revisions:
    - model: "gpt-6-astra"
      harness: "codex-cli"
      at: 2026-10-07T16:16:03Z
      mode: "implement"
      note: "Implement catalog bootstrap and coordinate application guidance acceptance"
---

# Bootstrap a book-aligned Keiro business application pattern catalog

This MasterPlan is a living coordination document. Child plans own implementation progress. Update durable architectural decisions in `docs/adr/` during implementation.

## Vision & Scope

Create a discoverable, validated Open Knowledge Format (OKF) catalog that helps an application author apply Peter Royal's *Building Modern Business Applications* to the Keiro runtime. Readers should be able to start from a business use case, select the existing runtime standards, understand the additional application contract, and follow a worked command-to-screen flow with explicit failure and recovery behavior.

The catalog supplements `mori://shinzui/keiro-runtime-patterns`. That repository remains the normative owner of runtime mechanics. This repository owns book-to-runtime interpretation, application composition, and explicitly justified departures. Every recommendation must identify whether it is inherited, supplemental, divergent, or an unsupported capability gap. A different implementation technology alone does not imply a different business principle.

Included are adoption of the shared OKF pattern profile, Mori registration, authoring and validation conventions, a complete source coverage map, focused command/workflow and read-side patterns, and a reproducible scenario walkthrough. Excluded are runtime library changes, a second runtime standards library, a production application, a new frontend framework, deployments, and a bespoke shared OKF profile. Minimal example code is appropriate only where needed to substantiate an application contract; illustrative code must be labeled.

The supplied source is `mori://shinzui/event-sourcing-full-app-patterns`, whose registered checkout contains chapter notes, platform adaptations, additional frontend guidance, and the book PDF. Do not attribute Message DB, Kafka, Relay, or a note author's recommendation automatically to the book. Record chapter evidence separately from those adaptations. At plan creation the inspected repository appeared to be a scaffold: `.seihou/config.dhall`, installed planning skills, and Git configuration; no catalog, validation script, or local ADR corpus was present; implementation subsequently found and preserved the existing Mori manifest and stable identity. Its remote and Seihou name are `keiro-runtime-business-application-patterns`; use intended project identity `mori://shinzui/keiro-runtime-business-application-patterns`, verifying registration during bootstrap rather than deriving identity from the misspelled checkout directory.

## Decomposition Strategy

Three work streams separate the catalog contract from two user journeys. Bootstrap establishes valid authoring, source ownership, and coverage decisions. Command composition makes business intent and outcomes precise. Read-side composition explains what the user sees and reconciles the full flow. Splitting each chapter into a child would create many coupled documents without independent outcomes; combining all content with bootstrap would hide the source and validation boundary.

No local ADRs existed at creation. Relevant consulted decisions are `mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-6` (one normative documentation owner), `mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-8` (isolated catalog, shared profile, generated indexes and logs), and `mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-3` (choose local event consumption, jobs, and integration transport by failure semantics). Their handles resolved with Mori during creation. Their historical package/version statements are evidence to recheck, not release pins for this initiative.

## Exec-Plan Registry

| # | Title | Path | Hard Deps | Soft Deps | Status |
|---|-------|------|-----------|-----------|--------|
| 1 | Bootstrap the OKF catalog and book-to-runtime coverage map | docs/plans/1-bootstrap-the-okf-catalog-and-book-to-runtime-coverage-map.md | None | None | Complete |
| 2 | Document business command and workflow composition patterns | docs/plans/2-document-business-command-and-workflow-composition-patterns.md | EP-1 | None | Complete |
| 3 | Document read-side application patterns and verify the complete flow | docs/plans/3-document-read-side-application-patterns-and-verify-the-complete-flow.md | EP-1; EP-2 M1 for M2 only | EP-2 whole-child completion | Complete |

## Dependency Graph

Execute EP-1, then EP-2, then EP-3 by default. EP-1 must be Complete before either content child starts: its accepted profile, coverage map, source conventions, and checker are prerequisites. EP-3 M1 may proceed independently of EP-2 after EP-1. EP-3 M2, the integrated example, requires EP-2 M1's accepted command outcome contract at `business-patterns/commands/outcomes-and-visibility.md`. EP-2's remaining workflow guidance is a soft dependency for drafting read-side content, but all children must be Complete before initiative completion. This graph has no reverse hard dependency.

## Integration Points

EP-1 owns `mori.dhall`, `okf/business-patterns.dhall`, `scripts/check-business-patterns`, `justfile`, CI wiring, `README.md`, `business-patterns/getting-started.md`, `business-patterns/architecture/source-map.md`, and `business-patterns/architecture/authoring-contract.md`. Later children add their own DocRefs and source-map outcomes through that established contract; they do not redefine metadata or validation. Generated indexes and logs are maintained by every child for its changed concepts. EP-1 owns their conventions, and final index/log reconciliation belongs to EP-3.

The source map records source URI and chapter/section, distinction between book and local adaptation, runtime owner URI, disposition, local destination if any, rationale, and evidence status. Each new concept cites its nearest runtime counterpart and explains the incremental application value. `inherits` means link only; `supplements` means an additional application decision; `diverges` means a scoped alternative with consequences and a selection rule; `gap` means unsupported behavior with a truthful fallback. Absence of implementation evidence must not be disguised as a divergence.

EP-2 owns the command outcome and visibility contract; EP-3 consumes it. It must distinguish request identity, accepted/rejected/no-op outcomes, unknown or pending disposition, append completion, and read visibility. It must not treat a stream revision, global position, or read-model watermark as interchangeable. EP-3 owns the example at `business-patterns/examples/chapter-activation.md` and acceptance evidence under `docs/validation/`. Before expanding example variants, EP-3 M2 traces one accepted activation from command receipt to an authorized query result using the actual source-verified runtime boundary. That check must expose any mismatch between outcome and freshness assumptions.

During EP-1, record the catalog ownership and source-layering decisions in local ADRs; subsequent children record justified architectural departures. Follow `agents/skills/exec-plan/ADR.md` and preserve the ADR convention established at bootstrap. Do not introduce ADR profile adoption as an incidental requirement. At final acceptance, distill durable decisions from all plans into the local ADR corpus.

## Progress

All three children are Complete as of 2026-10-07. The catalog has 10 concepts and complete dispositions for 22 sources; all 51 unique Mori references resolve. Complete-mode validation, five rejection fixtures, and the 24-ordering screen experiment passed. Cross-plan outcome/visibility and source-ownership checks are accepted, and durable context is distilled in local ADRs 1–3. Hosted CI is configured but has not been run in this session.

## Surprises & Discoveries

2026-10-07: Implementation found an existing Mori manifest and stable identity and extended them in place. Runtime source confirms no-op/rejection paths skip append callbacks; the consumer contract therefore never invents a position for them. The query-first handoff model found five naive counterexamples, supporting explicit attachment reconciliation and response guarding.

## Decision Log

2026-10-07: Adopt the shared pattern catalog profile through a local descriptor instead of creating a new profile. This preserves existing OKF interoperability and keeps application-specific comparison requirements in an authoring contract and focused validation.

2026-10-07: Treat the book notes, their prior platform translation, and Keiro runtime guidance as three distinct evidence layers. The notes explicitly target Message DB and contain illustrative snippets; copying them would falsely imply current Keiro APIs.

2026-10-07: Reuse runtime request-receipt and freshness standards. The inspected runtime command-cycle and read-model documents already cover these mechanisms; this catalog must add application composition and selection guidance, not restate those standards.

## Outcomes & Retrospective

Delivered a shared-profile OKF catalog with stable Mori discovery, generated navigation, strict checks and CI wiring, seven application patterns, a 22-source ownership map, and a complete activation walkthrough. The existing runtime library remains the normative mechanics owner. Direct command processing and the conditional snapshot-stream alternative are explicitly distinguished from source-note topology choices; durable-browser-stream gaps retain supported query/reconciliation fallbacks.

Acceptance and limits are recorded in [flow evidence](../validation/business-application-flow.md). Local ADRs [1](../adr/0001-supplement-runtime-patterns-with-book-aligned-application-contracts.md), [2](../adr/0002-separate-command-disposition-from-read-visibility.md), and [3](../adr/0003-reconcile-live-screens-through-authorized-read-contracts.md) preserve ownership, outcome/visibility separation, and screen reconciliation. The result is documentation and a finite ordering model, not a production application or certification of unbuilt API glue.
