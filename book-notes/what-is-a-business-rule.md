---
type: Explanation
title: "Classify business rules"
description: "Book-grounded notes for chapter 5 with the Keiro application boundary made explicit."
docId: DOC-5
generated:
  by: process:codex
  at: "2026-10-07T17:25:06Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-what-is-a-business-rule
tags: [book-notes, business-applications]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1_5
---

# Classify business rules

Chapter 5 of Peter Royal’s *Building Modern Business Applications* (2023). Checked passages: printed pp. 39–46; supplied PDF pages 48–55. See the [edition and validation record](validation.md).

## Book guidance

Royal distinguishes three categories: constraints on data at rest; side effects initiated when data changes; and display logic, including derivation and aggregation. Derived data is part of the third category, not a fourth category alongside display logic.

Rules must reflect actual work, including exceptions. A hard constraint differs from a guideline. The same derived total can help enforce a write invariant and be displayed to users; these are separate uses even when they share a calculation.

Side effects should follow the successful persistence of their initiating change. Track attempts and their outcomes when interacting with external systems. An interrupted payment attempt may need reconciliation rather than a blind retry; receiver idempotency changes the recovery options. Display transformations should preserve the underlying facts and be reproducible from their inputs.

## Application boundary

Place pure decisions, view derivation, enrichment, and external effects according to the local patterns. Specific Keiro modules and Kiroku storage are application translations.

Find the application destination in the [book-to-runtime map](../business-patterns/architecture/source-map.md).
