---
type: Pattern
title: "Separate activation from its external consequences"
description: "Keep committed business facts independent from retryable notifications and public integration events."
generated:
  by: process:codex
  at: "2026-10-07T16:25:00Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/workflows-effects-and-integration
tags: [business-applications, keiro, composition]
status: current
relationship: supplements
runtime_baseline: mori://shinzui/keiro-runtime-patterns/docs/messaging-outbox
sources:
  - resource: mori://shinzui/keiro-runtime-patterns/docs/messaging-outbox
  - resource: mori://shinzui/event-sourcing-full-app-patterns/docs/ideal-platform-architecture
  - resource: mori://shinzui/event-sourcing-full-app-patterns/docs/what-is-a-business-rule
  - resource: mori://shinzui/event-sourcing-full-app-patterns/docs/implementation-translation
---

# Separate activation from its external consequences

## Problem and applicability

Activation should not be rolled back because an email provider is down. Conversely, “chapter active” must not imply “email delivered.” Use this composition when a domain transition triggers external actions or informs another bounded context, meaning another owner of business state.

## Book principle and source layer

The [business-rule notes](mori://shinzui/event-sourcing-full-app-patterns/docs/what-is-a-business-rule) separate effects from write invariants and derived views. The [ideal platform guide](mori://shinzui/event-sourcing-full-app-patterns/docs/ideal-platform-architecture) adds private Message DB stores and Kafka as a platform adaptation. The [implementation notes](mori://shinzui/event-sourcing-full-app-patterns/docs/implementation-translation) describe PostgreSQL simplicity; that motivation is not evidence of a current PGMQ integration bus.

## Runtime baseline

Inherit [outbox](mori://shinzui/keiro-runtime-patterns/docs/messaging-outbox), [inbox](mori://shinzui/keiro-runtime-patterns/docs/messaging-inbox), [transport selection](mori://shinzui/keiro-runtime-patterns/docs/messaging-transport-selection), and [durable workflows](mori://shinzui/keiro-runtime-patterns/docs/keiro-durable-workflows). They own delivery, deduplication, and failure semantics. The local addition is deciding which consequence affects the application's user-visible success and what to do when systems disagree temporarily.

## Application recommendation

Commit the activation fact under its owning aggregate. Represent required notification work durably and separately, using the sanctioned transaction/outbox or workflow composition appropriate to the existing runtime. Give the external operation a stable key derived from the business consequence identity, not a retry counter. Show activation status separately from notification status. Do not put SMTP/HTTP calls into the pure decision or treat a read-model rebuild as a request to resend email.

Public integration facts are selected, versioned contracts, not copies of all private event fields. Include only what the receiving context is authorized to depend on. The receiver translates the public fact into its own local command or read update and uses the existing inbox contract. The catalog does not instruct contexts to read another owner's event store or internal read tables. A gateway composes supported APIs; a sanctioned external SQL read surface inside an owner's architecture is not general cross-context database sharing.

Use local jobs for local operational work and existing integration paths for public facts. If the deployment has no Kafka integration path and needs cross-context distribution, explicitly design and prove that integration or use a supported public API with its own durable delivery protocol. Do not label a PGMQ job as a substitute event bus merely to avoid a broker. At the inspected runtime baseline, a production PGMQ public-event path is not established by these sources.

For a multi-step business process, publish intermediate status. If activation must wait for payment approval, make approval a precondition/state in the process; do not optimistically activate and pretend the two systems committed atomically. If reversal is allowed, issue a new compensating business command with audit history. Compensation may itself fail and is not deletion of the original fact.

## Alternatives and divergences

This inherits runtime delivery mechanics and supplements the source guide with a user-facing consequence policy. Message DB-to-Kiroku is a technology translation. Private facts versus public contracts remains unchanged. Synchronous remote calls can be acceptable for pre-decision enrichment with explicit stale-data/failure policy; they cannot make an external effect and the event append one atomic operation.

## Failure and recovery

A timeout after a provider has delivered email is uncertain delivery, not proof of non-delivery. Retry using the provider's supported idempotency key or reconcile with its operation lookup. If neither exists, disclose possible duplication or require operator resolution for an irreversible high-impact action. Do not claim exactly-once effects from the presence of a workflow journal.

Duplicate integration delivery is handled through the baseline inbox protocol; payload conflicts or unsupported schema versions require deliberate failure handling. A failed notification does not erase activation. Replay of read models updates derived state only. Replaying an effect path requires explicit intent and retained deduplication evidence, not a generic “rebuild everything” procedure.

## Evidence

See [command composition evidence](../../docs/validation/command-composition.md) for runtime source and non-duplication review. These are application responsibilities and scenario expectations, not proof of a running notification service. The durable decision is recorded in [ADR-2](../../docs/adr/0002-separate-command-disposition-from-read-visibility.md).
