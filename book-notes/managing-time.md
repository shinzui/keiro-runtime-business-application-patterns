---
type: Explanation
title: "Preserve history and distinguish time"
description: "Book-grounded notes for chapter 6 with the Keiro application boundary made explicit."
docId: DOC-6
generated:
  by: process:codex
  at: "2026-10-07T17:25:06Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-managing-time
tags: [book-notes, business-applications]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1_6
---

# Preserve history and distinguish time

Chapter 6 of Peter Royal’s *Building Modern Business Applications* (2023). Checked passages: printed pp. 47, 49–55; supplied PDF pages 56, 58–64. See the [edition and validation record](validation.md).

## Book guidance

Remembering the inputs to a calculation makes historical answers possible. Tracking values explains what changed; recording intent and causes helps explain why. Events describe past changes, commands request future changes, and materialization constructs state from the event history.

Occurrence time and the time the application learned of an occurrence are distinct. Separate systems observe information at different times. The loyalty-points example distinguishes a past balance based on what was known then from a past balance recomputed using what is known now.

Business rule changes can themselves be represented by events. Replay can then interpret subsequent facts under the appropriate rule instead of applying today’s rules blindly to all history.

## Application boundary

Name each timestamp by its meaning. Scheduling policy, lateness handling, and the choice of a durable workflow are application decisions; storing two timestamps alone does not implement complete bitemporal query semantics.

Find the application destination in the [book-to-runtime map](../business-patterns/architecture/source-map.md).
