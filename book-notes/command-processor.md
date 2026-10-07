---
type: Explanation
title: "Process commands with pure domain functions"
description: "Book-grounded notes for chapter 9 with the Keiro application boundary made explicit."
docId: DOC-9
generated:
  by: process:codex
  at: "2026-10-07T17:25:06Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-command-processor
tags: [book-notes, business-applications]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1_9
---

# Process commands with pure domain functions

Chapter 9 of Peter Royal’s *Building Modern Business Applications* (2023). Checked passages: printed pp. 81–90; supplied PDF pages 85–94. See the [edition and validation record](validation.md).

## Book guidance

The initial design uses one serial processor within the application. It consumes a durable command log and reconstructs the state needed for enforcing rules from the event log. A mutator maps state and command to prospective events; an applicator maps state and event to new state. Both are pure. External information needed for a decision must be captured before processing.

The processor checks prospective events with the applicator before persisting them (p. 88). Rule enforcement is therefore not described as exclusively belonging to the mutator. Replaying historical events must remain valid; an applicator failure on stored history requires investigation.

Append all events for a command transactionally. Record each command’s disposition in a processed-command log with its command pointer and the latest event pointer (pp. 86–87). A failed command can retain the previous event pointer without creating new events. Pure domain rejection differs from retriable infrastructure failure.

The serial processor is an intentional simplification. Chapter 15 discusses partitioning and the coordination obligations it introduces.

## Application boundary

Direct Keiro command execution is a deliberate alternative to the book’s durable command-intake topology. Do not present Keiro decider placement, per-aggregate concurrency, or silent-outcome position semantics as the book’s identical implementation.

Find the application destination in the [book-to-runtime map](../business-patterns/architecture/source-map.md).
