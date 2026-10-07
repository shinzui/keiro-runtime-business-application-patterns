---
type: Explanation
title: "The book\u2019s Java and PostgreSQL implementation"
description: "Book-grounded notes for chapter 14 with the Keiro application boundary made explicit."
docId: DOC-14
generated:
  by: process:codex
  at: "2026-10-07T17:25:06Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-implementation-translation
tags: [book-notes, business-applications]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1_14
---

# The book’s Java and PostgreSQL implementation

Chapter 14 of Peter Royal’s *Building Modern Business Applications* (2023). Checked passages: printed pp. 147–162; supplied PDF pages 147–162. See the [edition and validation record](validation.md).

## Book guidance

The implementation chapter proposes PostgreSQL for the four infrastructure capabilities to reduce operational overhead while preserving replaceable boundaries. It discusses advisory locks, LISTEN/NOTIFY, schemas, and append-only tables.

Its notification example is tied to transaction commit. Notification delivery remains distinct from persistent event history. Schemas organize access and allow old and rebuilt view versions to coexist (pp. 150–153).

The JVM implementation uses Java, Spring Boot, GraphQL-Java, Project Reactor, R2DBC, and jqwik. These are the book’s implementation choices, not a requirement that another language reproduce its classes or driver API.

## Application boundary

This repository applies the architecture using Keiro and Kiroku. The book does not describe either. Its SQL and version-specific library snippets are omitted rather than presented as a supported Keiro adapter.

Find the application destination in the [book-to-runtime map](../business-patterns/architecture/source-map.md).
