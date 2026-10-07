---
type: Explanation
title: "What is a business application?"
description: "Book-grounded notes for chapter 1 with the Keiro application boundary made explicit."
docId: DOC-1
generated:
  by: process:codex
  at: "2026-10-07T17:25:06Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-what-is-a-business-application
tags: [book-notes, business-applications]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1_1
---

# What is a business application?

Chapter 1 of Peter Royal’s *Building Modern Business Applications* (2023). Checked passages: printed pp. 7–8; supplied PDF pages 21–22. See the [edition and validation record](validation.md).

## Book guidance

Royal scopes the book to bespoke, domain-specific, multiuser applications used for data entry and decision support. They act as a source of truth, automate workflows, and are critical because the business depends on them. Their data is described as medium-sized; internet-scale traffic is not a prerequisite for architectural care.

“Modern” concerns which techniques current computing resources make practical. It is not a claim that older techniques cease to work.

## Application boundary

Use the business action and its rules to define the feature. The book does not prescribe our service names, aggregate boundaries, or deployment topology.

Find the application destination in the [book-to-runtime map](../business-patterns/architecture/source-map.md).
