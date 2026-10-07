---
id: 2
slug: document-business-command-and-workflow-composition-patterns
title: "Document business command and workflow composition patterns"
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
      at: 2026-10-07T16:23:18Z
      mode: "implement"
      note: "Implement application command outcomes, time, and effect composition guidance"
---

# Document business command and workflow composition patterns

## Purpose / Big Picture

An application author can translate a user intent into a complete command, choose synchronous processing or durable asynchronous acceptance, and report a truthful business outcome. The resulting guidance explains how the book's command generator and processor compose with Keiro without redefining Keiro's command cycle, request receipt, or messaging standards.

## Progress

- [ ] M1: Command-to-outcome guidance and the shared visibility contract are source-verified and validate as catalog concepts.
- [ ] M2: Business time, automation, and side-effect guidance closes its assigned coverage with explicit tradeoffs and failure traces.

## Surprises & Discoveries

## Decision Log

2026-10-07: Application guidance composes the existing runtime receipt and command-cycle rules. It must not create a competing universal receipt implementation or claim every command needs a durable command log.

## Outcomes & Retrospective

## Context and Orientation

This repository starts as a scaffold with installed planning skills and `.seihou/config.dhall`; no application code or catalog existed when this plan was written. Open Knowledge Format (OKF) stores Markdown concepts with validated metadata, generated indexes, and update logs. A profile is the reusable validation contract, not a new runtime capability. Mori resolves canonical project and document identities to local source paths. Run commands from this repository root, obtained with `git rev-parse --show-toplevel`.

Source authority is layered: `mori://shinzui/event-sourcing-full-app-patterns` contains notes on Peter Royal's *Building Modern Business Applications* and adaptations to an older platform; `mori://shinzui/keiro-runtime-patterns` owns runtime implementation standards; `mori://shinzui/keiro` and Mori-discovered supporting projects own actual APIs. Do not copy the notes' Message DB snippets into Keiro guidance. Use canonical Mori URIs for every durable external reference. If a source file lacks an artifact handle, cite its project URI together with its project-relative path and state that artifact-level coverage is pending.

No local ADR existed at planning time. Consult `mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-6`, which assigns one normative documentation owner, and `mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-8`, which isolates the catalog from plans and consumes a shared profile. Content involving transport also follows `mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-3`, distinguishing jobs, private event consumption, and cross-context facts. Read local ADRs created by bootstrap before implementation and carry their applicable decisions forward.

Hard prerequisite: `docs/plans/1-bootstrap-the-okf-catalog-and-book-to-runtime-coverage-map.md` must be Complete, providing `business-patterns/architecture/source-map.md`, `business-patterns/architecture/authoring-contract.md`, a working profile, and `just check-docs`. Read these accepted local contracts. No production application will be built by this child.

Primary source references are `mori://shinzui/event-sourcing-full-app-patterns/docs/what-is-a-business-rule`, `mori://shinzui/event-sourcing-full-app-patterns/docs/managing-time`, `mori://shinzui/event-sourcing-full-app-patterns/docs/command-generator`, and `mori://shinzui/event-sourcing-full-app-patterns/docs/command-processor`. The notes distinguish pure decisions from effectful enrichment, describe a durable command log and disposition, and contain illustrative old-platform APIs. Runtime owners include `mori://shinzui/keiro-runtime-patterns/docs/keiro-command-cycle-and-errors`, `mori://shinzui/keiro-runtime-patterns/docs/architecture-domain-design`, and `mori://shinzui/keiro-runtime-patterns/docs/messaging-outbox`.

The runtime command-cycle standard already specifies accepted/rejected/no-op outcomes and application-owned request receipts. It states that silent outcomes invoke no after-append callback, and acceptance is separate from read freshness. Treat those as starting evidence and verify the current implementation before claiming exact APIs. A receipt is durable evidence of the result for a particular request, not merely an event ID. Optimistic concurrency prevents conflicting stream writes; it does not by itself deduplicate client retries.

## Plan of Work

### M1 — Define the business command journey

Create `business-patterns/commands/generation-and-processing.md` and `business-patterns/commands/outcomes-and-visibility.md`, plus a subject overview if needed. Map semantic mutation input, authorization, validation, external enrichment, captured time, and expected revision to one complete domain command. Explain which checks happen before submission and which belong to deterministic domain decisions. Preserve the book's principle of one user intent without requiring its concrete command-log topology universally.

Use chapter activation as a shared example: a chapter may become active only when its required configuration is present. Define preconditions and typed outcomes in plain language. Present synchronous completion and durable asynchronous acceptance as conditional choices, with evidence of the runtime boundary and application-owned parts. Do not claim a built-in durable request service if source only provides append/transaction primitives.

Own the shared contract at `commands/outcomes-and-visibility.md`: operation identity and payload conflict, accepted/rejected/no-op disposition, pending/unknown status when completion cannot be established, committed stream revision, optional committed position, and the separate read-model visibility observation. For each field define who produces it, its scope, whether absent values are allowed, and how the read side uses it. Do not invent a scalar global ordering across different stores. Specify bounded waiting and result lookup for asynchronous processing, including the subscribe-before-submit race where relevant. A timeout does not prove command failure; a fresh query does not prove an unrelated request's outcome.

Prove this interface before expanding workflow variants: trace accepted activation, deterministic rejection, no-op, same-key same-payload retry, same-key different-payload conflict, concurrent duplicates, and a lost response after commit. Cite existing runtime tests or source for mechanisms. Record which application obligations remain example designs. Any executable snippet must compile under source-verified released dependencies; pseudocode carries an explicit label and is not compilation evidence.

### M2 — Explain time, automation, and effects at application boundaries

Create `business-patterns/workflows/time-and-automation.md` and `business-patterns/workflows/effects-and-integration.md`. Explain capturing decision inputs, effective time versus processing time, scheduled commands, cross-aggregate automation, and separating replayable materialization from irreversible effects. Link to existing runtime workflow, process-manager, inbox/outbox, and transport standards for mechanics. The added value is choosing a composition for a business use case and explaining partial failure, compensation where appropriate, and user-visible status.

Compare the source notes' private Message DB store and Kafka assumptions with source-verified Kiroku/Keiro choices. Preserve bounded-context ownership. Do not turn the book's PostgreSQL simplicity argument into a claim that every currently required integration path is available on PGMQ. Classify genuine unsupported paths as gaps, with supported alternatives. Cover late/duplicate deliveries, delayed scheduling, external timeout after success, and replay without reissuing an irreversible effect.

Update only this child's assigned source-map rows, DocRefs, navigation, logs, and indexes. Prefer a single useful composition document over a set of duplicated runtime mini-guides. Record a local ADR only when a durable application decision warrants one, using the convention bootstrap established.

## Concrete Steps

From the repository root:

```bash
mori path mori://shinzui/event-sourcing-full-app-patterns/docs/command-generator
mori path mori://shinzui/event-sourcing-full-app-patterns/docs/command-processor
mori path mori://shinzui/keiro-runtime-patterns/docs/keiro-command-cycle-and-errors
mori registry show shinzui/keiro --full
mori registry docs shinzui/keiro
mori registry docs shinzui/keiro-runtime-patterns
```

Read the returned files and locate exact runtime modules and tests through the registered checkout. For any dependency API used in snippets, run Mori discovery first and verify registry releases/upstream tags before choosing bounds. Record source revision, release support, and precise artifact references in `docs/validation/command-composition.md`.

After authoring and updating logs through the bootstrap-documented command:

```bash
okf index business-patterns --write
just check-docs
mori path mori://shinzui/keiro-runtime-business-application-patterns/docs/commands-outcomes-and-visibility
```

Register that stable DocRef when adding the document. The final command must resolve to the new contract after registry refresh.

## Validation and Acceptance

Readers can follow every M1 scenario to one unambiguous disposition and know whether a read can yet expose it. The source evidence distinguishes application protocol from runtime guarantee. The lost-response trace returns the recorded result or explicit unknown/pending status, not an automatic second business operation. Rejected/no-op results do not rely on an append callback. Workflow traces show how retries and replay avoid unintended side effects. The source map links every new pattern to book/adaptation evidence and a runtime baseline; each divergence includes scope, reason, tradeoff, and selection rule. `just check-docs` passes, URI resolution succeeds, and the non-duplication review records why each local document adds application-level value.

## Idempotence and Recovery

Changes are additive and local. Preserve unrelated work, existing stable document identities, and generated frontmatter provenance. Regenerate indexes instead of hand-editing them; update each material concept's metadata and nearest log. Rerun checks after corrections. Perform deliberate invalid-fixture checks in a temporary copy, never by leaving the catalog broken. If Mori registration is unavailable, keep intended canonical references and record the exact failure; do not substitute machine-specific paths or claim discovery acceptance. Do not modify upstream repositories to force an example to pass. Record a capability gap and its supported alternative, and revise affected acceptance claims truthfully.

## Interfaces and Dependencies

Hard dependency is all of `docs/plans/1-bootstrap-the-okf-catalog-and-book-to-runtime-coverage-map.md`. This child owns `business-patterns/commands/outcomes-and-visibility.md`; M1 acceptance is the hard prerequisite for M2 in `docs/plans/3-document-read-side-application-patterns-and-verify-the-complete-flow.md`. Publish the contract with its evidence before calling M1 accepted. Any later contract change must update the consuming read-side example in the same coordinated change. Shared catalog files retain bootstrap ownership and conventions. Distill durable application decisions into local ADRs and record provenance with the provided scripts at handoff/completion.
