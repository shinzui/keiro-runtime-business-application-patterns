---
type: Explanation
title: "Required infrastructure capabilities"
description: "Book-grounded notes for chapter 13 with the Keiro application boundary made explicit."
docId: DOC-13
generated:
  by: process:codex
  at: "2026-10-07T17:25:06Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-required-technologies
tags: [book-notes, business-applications]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1_13
---

# Required infrastructure capabilities

Chapter 13 of Peter Royal’s *Building Modern Business Applications* (2023). Checked passages: printed pp. 140–143; supplied PDF pages 143–146. See the [edition and validation record](validation.md).

## Book guidance

The design needs append-only logs, publish/subscribe messaging, distributed locking, and a database for views. Log positions increase but need not be contiguous integers. Logs must support atomic batches, durable commits, and reading from a prior position.

Pub/sub notifications can wake consumers, which then query the durable log from their last observed position. Notifications are transient; they are not the durable history. The initial singleton processor and materializer require separate coordination locks across application instances. View storage can vary with the domain and can be replaced by rebuilding from events.

## Application boundary

These are capability requirements for the book’s design. Inherit Keiro runtime transport and storage guidance rather than create a competing implementation recipe here.

Find the application destination in the [book-to-runtime map](../business-patterns/architecture/source-map.md).
