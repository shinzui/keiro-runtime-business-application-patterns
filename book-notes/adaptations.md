---
type: Reference
title: "Application adaptations and their book boundaries"
description: "Preserve relevant platform guidance while separating it from claims the book actually makes."
docId: DOC-16
generated:
  by: process:codex
  at: "2026-10-07T17:27:01Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-adaptations
tags: [book-notes, business-applications, source-validation]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1
---

# Application adaptations and their book boundaries

These are locally maintained summaries of relevant platform-guide ideas, corrected against the book where a book attribution is involved. They are application guidance, not additional book chapters or verified SDK recipes. See [validation and provenance](validation.md). The full application protocols live in the linked patterns; runtime mechanics retain their existing owners.

## Ideal platform architecture

The useful principle is separation of authoritative business facts, derived views, and external work. Chapters [5](what-is-a-business-rule.md), [8](high-level-data-flow.md), and [11](event-materializer.md) support that separation. The original “chapter 0” topology is an adaptation: a gateway, a particular broker, one database per context, and named services are not prescribed by the book. Keiro uses Kiroku; select integration transport using the [runtime transport owner](mori://shinzui/keiro-runtime-patterns/docs/messaging-transport-selection). Follow [effects and integration](../business-patterns/workflows/effects-and-integration.md) for the application decision.

## Service architecture blueprint

Keep business decisions, API input preparation, view maintenance, and effects distinguishable. Do not import an obsolete adapter or create a second service-package standard. Chapter [14](implementation-translation.md) motivates operational simplicity; current layout and scaffolding belong to [runtime service packages](mori://shinzui/keiro-runtime-patterns/docs/architecture-service-packages).

## Frontend Relay patterns

Use a useful initial read and add live behavior to selected boundaries. Give independently observed entities stable identities. A changed entity record does not by itself describe changes to list membership, ordering, pagination, or totals; invalidate or explicitly update affected connections. Keep authorization at the read boundary. These are application decisions, not Relay APIs established by the book. See [screen reconciliation](../business-patterns/reads/query-and-live-updates.md) for the protocol; no Relay hook examples are imported.

## Subscription flow implementation

A service may expose view-change hints, a live read endpoint, or a polling interface. The gateway must honor the read service’s authorization and freshness semantics. Browser delivery does not inherit the durability of a backend event cursor. Chapter [11](event-materializer.md) grounds view publication; chapter [13](required-technologies.md) distinguishes transient signals from persistent logs. Use [scoped freshness](../business-patterns/reads/materialization-and-freshness.md) and [reconciliation](../business-patterns/reads/query-and-live-updates.md), including recovery after lost hints. The source guide’s backend alternatives are not proof that any specific server exists here.

## Subscription flow implementation TypeScript

The same read contract applies to an external TypeScript API. Language choice does not authorize raw reads that bypass the supported lifecycle and access boundary. We retain the architecture question, not the original GraphQL Yoga resolver and async-iterator snippets. Their APIs and operational behavior cannot be validated from this book. See the [external-read boundary](../business-patterns/reads/materialization-and-freshness.md).

## Screen data subscription mental model

Choose live regions by what users need to observe; do not equate a component, domain aggregate, and subscription scope. An initial query followed by listener attachment has a gap. Our [handoff protocol](../business-patterns/reads/query-and-live-updates.md) acknowledges attachment, requeries, retains invalidations received during that query, and guards against older responses. These details supplement the book rather than quote it.

## Screen data query first rationale

Query-first is a useful default for a channel that only carries change hints. It is incorrect to say all subscriptions must wait for a new event before returning initial data: chapter 11, printed pp. 111–112, explicitly describes initial snapshots followed by updated snapshots. A live-query endpoint can bootstrap a screen if it establishes a correct initial-state/update handoff and recovery contract. Lossless replay is a separate, stronger promise. Our current fallback remains authorized queries with invalidation/requery or polling. Do not import blanket claims that subscriptions lack usable initial-load semantics or that all deployments have the same cost tradeoff.

## Relay child node subscriptions

A child can have a read identity while writes remain governed by its owning aggregate. For an order line, a quantity change must still respect the order’s editable state and shared invariants. Child-specific subscriptions must account for derived dependencies: an order-wide discount can change a line even when its ID is absent from the triggering event.

Keep three concepts separate: the owning aggregate revision represented by a snapshot, the last change to the child’s public state, and the projection’s processed frontier. A filtered child stream may legitimately omit unrelated aggregate revisions; those gaps prove neither loss nor completeness. Read snapshot metadata consistently with the data it describes. Deletion and connection membership need explicit handling.

An unchanged child may emit no tick after a successful command. Confirm read-after-write through a progress-aware query or explicit acknowledgment, not silence or the child’s last-change marker. A filtered child observation may also be stale as an aggregate write precondition. Preserve the caller’s explicit conflict policy; never silently refresh its expected revision and treat that as consent. Chapters [10](command-generator.md) and [11](event-materializer.md) support optimistic checks and materialization progress, but this child-node design is our application interpretation, not a book-prescribed Relay architecture.
