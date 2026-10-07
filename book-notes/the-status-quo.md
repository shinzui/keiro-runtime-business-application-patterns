---
type: Explanation
title: "The status quo"
description: "Book-grounded notes for chapter 2 with the Keiro application boundary made explicit."
docId: DOC-2
generated:
  by: process:codex
  at: "2026-10-07T17:25:06Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-the-status-quo
tags: [book-notes, business-applications]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1_2
---

# The status quo

Chapter 2 of Peter Royal’s *Building Modern Business Applications* (2023). Checked passages: printed pp. 9, 19; supplied PDF pages 23, 33. See the [edition and validation record](validation.md).

## Book guidance

The chapter describes Royal’s experience of business applications retaining familiar request/response interaction patterns while consumer applications changed. Its opening example is a web UI exchanging JSON with backend endpoints. The concluding argument is to combine improved interaction techniques with development practices that support change.

This is the author’s historical perspective, including a JVM focus, rather than a survey establishing that every contemporary business application has these limitations.

## Application boundary

Treat this as motivation for explicit intent and observable change, not a blanket prohibition on REST or relational databases.

Find the application destination in the [book-to-runtime map](../business-patterns/architecture/source-map.md).
