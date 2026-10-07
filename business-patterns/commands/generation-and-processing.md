---
type: Pattern
title: "Generate a complete business command"
description: "Choose direct or durable command processing while keeping the business decision deterministic."
generated:
  by: process:codex
  at: "2026-10-07T16:25:00Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/commands-generation-and-processing
tags: [business-applications, keiro, composition]
status: current
relationship: diverges
runtime_baseline: mori://shinzui/keiro-runtime-patterns/docs/keiro-command-cycle-and-errors
sources:
  - resource: mori://shinzui/keiro-runtime-patterns/docs/keiro-command-cycle-and-errors
  - resource: mori://shinzui/event-sourcing-full-app-patterns/docs/what-is-a-business-rule
  - resource: mori://shinzui/event-sourcing-full-app-patterns/docs/command-generator
  - resource: mori://shinzui/event-sourcing-full-app-patterns/docs/command-processor
---

# Generate a complete business command

## Problem and applicability

A user clicks “Activate chapter.” The action spans authentication, input parsing, business rules, durable storage, and a screen refresh. Putting all of these into a resolver makes retries and failure reporting ambiguous. Use this composition whenever an external request changes business state; the GraphQL boundary is the book-aligned default, but the same application contract can serve a CLI or HTTP endpoint.

## Book principle and source layer

The chapter notes on [business rules](mori://shinzui/event-sourcing-full-app-patterns/docs/what-is-a-business-rule) place invariants on the write side, derived state in materializers, and effects after durable facts. The [command generator](mori://shinzui/event-sourcing-full-app-patterns/docs/command-generator) supplies a complete input to a pure processor. The [processor notes](mori://shinzui/event-sourcing-full-app-patterns/docs/command-processor) describe a durable command log and initially serial processing. Those are indirect chapter evidence. Their Message DB/TanES examples are the note author's platform translation, not Keiro APIs.

## Runtime baseline

Inherit [domain design](mori://shinzui/keiro-runtime-patterns/docs/architecture-domain-design) and the [command cycle](mori://shinzui/keiro-runtime-patterns/docs/keiro-command-cycle-and-errors). They own aggregate boundaries, concurrency, runtime errors, silent outcomes, and receipt mechanics. The local addition is selecting a request topology and assigning application responsibilities across it.

## Application recommendation

For a short operation on one aggregate, let the owning application service process the complete command directly, returning a final business disposition only after the runtime reports the committed or silent outcome. Use durable asynchronous submission when offline processing, durable backlog, or processing beyond the request deadline is a business requirement. Submission then means **queued/pending**, not business acceptance. A durable input plus an authorized result lookup and progress worker are application-owned requirements; a runtime command runner alone is not a command-log service.

At the edge, authenticate, authorize the action in its tenant/context, parse the semantic input, and capture the caller's operation identity. The owning service repeats the necessary resource authorization; gateway authorization is not sufficient. Enrich a command with any external facts and their observation time before pure processing. State an expiry or revalidation policy when stale enrichment matters. Treat “the member was eligible when observed” differently from an atomic invariant across two services.

For this catalog's illustrative chapter, configuration must already exist before activation. A configured inactive chapter emits an activation fact; missing configuration gives `ConfigurationRequired`; an already active chapter gives `AlreadyActive` as a no-op. Use the [outcome contract](outcomes-and-visibility.md) for these distinct results. Derived display text belongs in the read model/API; a notification is separate durable work after activation. These are example domain choices, not Keiro-provided chapter types.

If the user supplied an expected revision, enforce the user-facing stale-edit policy explicitly. The runtime's optimistic retry may rehydrate and decide against newer state; that is not automatically equivalent to rejecting an edit made from an older screen. Carry the expected revision as a decision precondition where the domain needs that guarantee and preserve it across retries. Do not re-enrich with different time or facts while pretending to retry identical intent.

## Alternatives and divergences

The divergence is from the chapter's universal durable-command-log topology, **not** from Keiro's runtime command standard. Direct processing is appropriate when a bounded request can own the operation and durable queued intake adds no user value. It avoids a separate intake worker and result wait, but provides no durable backlog by itself. It still requires pure decisions, committed events, an observable outcome, and a declared retry contract. Choose logged intake when work must survive the request before processing begins; its cost is extra lifecycle, capacity, and result-retention management.

Do not introduce a global serial processor merely because the book begins with one. Inherit runtime concurrency boundaries and decide where the business truly requires ordering. Two aggregates cannot obtain a cross-service atomic invariant through naming alone; model a reservation/approval workflow or narrow the invariant.

## Failure and recovery

Malformed input or denied authorization is a pre-submission API failure. Missing configuration is a typed business rejection, not a runtime outage. A lost response after commit is unknown to the client; resolve using the same operation identity rather than create a second intent. Queue acceptance with no final result remains pending. A mismatch between declared and running aggregate definition is an operational failure governed by the runtime standard, never a friendly business rejection.

For concurrent edits, show the current version and allow a deliberate new intent after refresh. For duplicate submission, use the same-key behavior in [outcomes](outcomes-and-visibility.md). If the application has not implemented durable repeatable receipts, disclose that limitation and use authorized state reconciliation without claiming the original result has been recovered.

## Evidence

[Command composition evidence](../../docs/validation/command-composition.md) records the inspected runtime revision and accepted/silent branch tests. This document is an application design, not runnable GraphQL or a production receipt service. [ADR-2](../../docs/adr/0002-separate-command-disposition-from-read-visibility.md) records the topology and outcome boundary.
