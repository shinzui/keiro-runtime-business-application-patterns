---
type: Explanation
title: "Materialize views and communicate changes"
description: "Book-grounded notes for chapter 11 with the Keiro application boundary made explicit."
docId: DOC-11
generated:
  by: process:codex
  at: "2026-10-07T17:25:06Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-event-materializer
tags: [book-notes, business-applications]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1_11
---

# Materialize views and communicate changes

Chapter 11 of Peter Royal’s *Building Modern Business Applications* (2023). Checked passages: printed pp. 105–116; supplied PDF pages 109–120. See the [edition and validation record](validation.md).

## Book guidance

Shape the view for its query consumers and precompute useful derivations where appropriate. The event log remains authoritative. Process each source in order; update the view and its checkpoint transactionally. Consistency across all events from one command is an additional guarantee that can use processed-command boundaries (pp. 105–107).

A query may wait for the final event position returned by a mutation. Track checkpoints separately for multiple input logs and design derivation to produce the same result despite different interleavings across sources (pp. 107–109).

A new view version can rebuild beside the old version. Rollback is constrained if new events cannot be understood by the old code; a parallel view alone does not remove that constraint (pp. 109–110).

The preferred live-query subscription sends an initial state snapshot followed by new snapshots when its results change (pp. 111–112). A subscription is not inherently limited to future changes. Its semantics need documentation beyond the GraphQL return type.

Replayable derivative stores and one-time business effects have different progress requirements. Payment or notification effects need durable state independent of a disposable view, and receiver idempotency where possible (pp. 113–114). On an unhandled event, stop the affected input partition rather than skipping past it. Queries may continue serving an older view; writes may continue, although stale-edit preconditions can limit their usefulness (pp. 114–116).

## Application boundary

Keiro owns projection mechanics and freshness checks. Query-first with invalidation and requery is our chosen fallback, not the book’s only permitted screen-loading model. No book passage establishes lossless browser delivery in our implementation.

Find the application destination in the [book-to-runtime map](../business-patterns/architecture/source-map.md).
