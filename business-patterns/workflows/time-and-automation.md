---
type: Pattern
title: "Model business time and delayed automation"
description: "Keep business effective time, captured decision inputs, and delayed execution distinct."
generated:
  by: process:codex
  at: "2026-10-07T17:27:01Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/workflows-time-and-automation
tags: [business-applications, keiro, composition]
status: current
relationship: supplements
runtime_baseline: mori://shinzui/keiro-runtime-patterns/docs/keiro-durable-workflows
sources:
  - resource: mori://shinzui/keiro-runtime-patterns/docs/keiro-durable-workflows
  - resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-managing-time
  - resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-what-is-a-business-rule
---

# Model business time and delayed automation

## Problem and applicability

A chapter is scheduled to activate tomorrow, but the worker runs late or configuration is revoked before it wakes. “Run this later” is not enough to determine the correct business outcome. Use this pattern for deadlines, scheduled transitions, corrections, or actions that depend on another aggregate.

## Book principle and source layer

The [time notes](../../book-notes/managing-time.md) distinguish future requests from immutable past facts and discuss historical interpretation. Chapter 6 itself distinguishes occurrence time from awareness time and discusses rule changes; the local scheduling and correction policies make those distinctions concrete for this application. The choice of Keiro workflow versus local event reaction below is an application translation, not a technology prescribed by the book.

## Runtime baseline

Inherit [durable workflows](mori://shinzui/keiro-runtime-patterns/docs/keiro-durable-workflows) and [process managers](mori://shinzui/keiro-runtime-patterns/docs/messaging-process-managers). These own journaling, timer progress, replay, and reaction machinery. This pattern adds the meaning of lateness and policy change to a business request.

## Application recommendation

Name time by meaning: `requestedAt` records admission, `effectiveAt` is the domain's intended validity time, and `processedAt` is when execution actually ran. Record the policy/version or facts used when historical interpretation needs them. Capture time and external data at an explicit effectful boundary; pure decisions and workflow replay must not silently replace historical inputs with “now.”

For scheduled activation, store an intent with target chapter, operation identity, due instant, policy, and cancellation/version identity. When due, reevaluate the declared current-state invariants: chapter exists, required configuration remains present, and the schedule has not been superseded. Choose and document whether a late activation is allowed with the original effective time, effective only at actual execution, or rejected as expired. Do not backdate merely because a timer ran late. A schedule and a completed activation are different facts and produce different user-facing states.

Use an event reaction/process manager for “this committed fact triggers this domain command.” Use a durable workflow when the business procedure needs persisted waits, external acknowledgments, or multiple resumable steps. A short local job is enough for an isolated retryable task; do not make every projection a workflow. Multi-aggregate coordination is a process with intermediate facts, not an implied distributed transaction.

For correction, append the correction and distinguish “what was known then” from “what is now considered effective then.” A bitemporal read model, which answers both questions, is application work; ordinary replay alone does not implement that policy. Define how policy revisions affect existing schedules before changing them.

## Alternatives and divergences

Neither event sourcing nor a runtime timer guarantees punctual business execution. A cron job that computes eligibility from wall time on every retry may fit a simple reevaluating policy, but loses the exact admitted intent unless it records it. A journaled procedure preserves progress at the cost of schema/evolution and worker ownership. This supplements the book's time principle and the runtime workflow standard without redefining timer internals.

## Failure and recovery

If a timer is delayed, expose “scheduled/overdue” and apply the declared lateness rule, not “active.” Repeated delivery uses stable intent identity and a domain guard so a superseded schedule cannot reactivate a cancelled chapter. External enrichment that has expired requires a deliberate new decision input, not silent mutation of an old receipt fingerprint. An external effect that succeeds just before a crash needs the same downstream key on recovery; a journal step is at-least-once at that boundary.

Keep waiting, failed, cancelled, and completed business states distinguishable. Operators repair stuck progress using the runtime runbooks; a user retry should not allocate a second workflow for the same admitted schedule unless explicitly creating a new intent.

## Evidence

The [command evidence](../../docs/validation/command-composition.md) records inspected workflow journal source and its effect-before-journal boundary. The schedule policy is illustrative and unimplemented; it states what an adopting application must test. [Effects and integration](effects-and-integration.md) explains recovery when another system has already acted.
