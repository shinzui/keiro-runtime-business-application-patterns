---
type: Explanation
title: "Constraints and guiding principles"
description: "Book-grounded notes for chapter 7 with the Keiro application boundary made explicit."
docId: DOC-7
generated:
  by: process:codex
  at: "2026-10-07T17:25:06Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-constraints-and-principles
tags: [book-notes, business-applications]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1_7
---

# Constraints and guiding principles

Chapter 7 of Peter Royal’s *Building Modern Business Applications* (2023). Checked passages: printed pp. 59, 68–69; supplied PDF pages 65, 74–75. See the [edition and validation record](validation.md).

## Book guidance

The proposed design deliberately chooses GraphQL and the capability for real-time UI updates as constraints. These are Royal’s selected constraints for this architecture.

Its principles are preserving history, message-driven communication, separation of reads and writes, partial availability, design flexibility, modularity, testability, and amenability to change. Keeping future changes possible does not mean implementing every possible extension now.

## Application boundary

GraphQL is the book’s interface choice. The local command and observation contracts can also be applied to another interface when its behavior is made explicit.

Find the application destination in the [book-to-runtime map](../business-patterns/architecture/source-map.md).
