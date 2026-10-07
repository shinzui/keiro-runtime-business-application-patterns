---
type: Explanation
title: "Connect intent to an observable view"
description: "Book-grounded notes for chapter 8 with the Keiro application boundary made explicit."
docId: DOC-8
generated:
  by: process:codex
  at: "2026-10-07T17:25:06Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-high-level-data-flow
tags: [book-notes, business-applications]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1_8
---

# Connect intent to an observable view

Chapter 8 of Peter Royal’s *Building Modern Business Applications* (2023). Checked passages: printed pp. 71, 75–79; supplied PDF pages 76, 80–84. See the [edition and validation record](validation.md).

## Book guidance

Event sourcing retains changes as the authoritative history; materialization produces useful state. CQRS permits different models for changing and observing that state.

The flow is: a caller observes a view, invokes a specific semantic mutation, a generator creates a command, a processor produces events, and a materializer updates the view used by queries and subscriptions. GraphQL’s separation of input and output types supports this division.

A business action should communicate intent. An approval operation can explicitly request approval and payment instead of making callers infer that changing a generic status field triggers payment. The chapter describes current system state; the initial design is not inherently one processor per aggregate.

## Application boundary

The chapter-activation walkthrough is our illustrative domain example. Its entities, positions, and Keiro mappings are not examples supplied by Royal.

Find the application destination in the [book-to-runtime map](../business-patterns/architecture/source-map.md).
