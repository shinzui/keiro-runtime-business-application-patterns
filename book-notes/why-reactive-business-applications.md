---
type: Explanation
title: "Why build reactive business applications?"
description: "Book-grounded notes for chapter 4 with the Keiro application boundary made explicit."
docId: DOC-4
generated:
  by: process:codex
  at: "2026-10-07T17:25:06Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-why-reactive-business-applications
tags: [book-notes, business-applications]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1_4
---

# Why build reactive business applications?

Chapter 4 of Peter Royal’s *Building Modern Business Applications* (2023). Checked passages: printed pp. 31, 37; supplied PDF pages 41, 47. See the [edition and validation record](validation.md).

## Book guidance

The business expects availability when it needs to record or retrieve information, capacity to grow, and the ability to change workflows. Developers need to make those changes with confidence.

Making a change request an explicit command separates its processing steps. Message boundaries make those steps easier to test and change independently. The chapter connects this structure to the reliability and adaptability expected of business software.

## Application boundary

Select boundaries for the business and its failure modes. This motivation does not require an independent service or broker for every component.

Find the application destination in the [book-to-runtime map](../business-patterns/architecture/source-map.md).
