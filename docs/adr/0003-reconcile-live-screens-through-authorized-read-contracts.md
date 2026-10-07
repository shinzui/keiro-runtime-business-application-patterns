# Reconcile live screens through authorized read contracts

Status: Accepted
Date: 2026-10-07

## Context

The book notes allow a live-query shape; later platform guides advocate query-first rendering. Query followed by attachment alone loses updates in the gap. Current runtime guarded reads and durable cursors do not imply a durable browser stream.

## Decision

Use authorized snapshot queries with post-attachment reconciliation for an invalidation-based live screen. Retain in-flight invalidations, guard stale responses, and requery on reconnect/focus with a product-appropriate fallback refresh interval. Bounds depend on successful queries and projection progress. A proven resumable snapshot-stream service is an alternative, not an assumed runtime feature.

Keep source/store, model, generation, and request scope explicit. Use the sanctioned runtime read boundary; do not substitute direct projection table reads for lifecycle checks. Runtime lifecycle permission and application row/tenant authorization are distinct obligations.

## Consequences

Notifications prompt reads and are not command receipts. A no-op has no invented append position, a visibility timeout does not reverse acceptance, and a rebuild invalidates incompatible comparison assumptions. The local executable model proves only a finite handoff/response-ordering property. It does not certify server security, durable delivery, or database behavior.

## Related guidance

[Live screens](../../business-patterns/reads/query-and-live-updates.md), [materialization](../../business-patterns/reads/materialization-and-freshness.md), and mori://shinzui/keiro-runtime-patterns/docs/keiro-read-models-and-projections.
