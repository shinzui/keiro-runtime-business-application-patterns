---
type: Explanation
title: "Generate complete commands and report dispositions"
description: "Book-grounded notes for chapter 10 with the Keiro application boundary made explicit."
docId: DOC-10
generated:
  by: process:codex
  at: "2026-10-07T17:25:06Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-command-generator
tags: [book-notes, business-applications]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1_10
---

# Generate complete commands and report dispositions

Chapter 10 of Peter Royal’s *Building Modern Business Applications* (2023). Checked passages: printed pp. 91–104; supplied PDF pages 95–108. See the [edition and validation record](validation.md).

## Book guidance

A mutation validates structural input, gathers required external information, creates at most one command in the initial design, submits it, and awaits its disposition. Enrichment must be safe to retry. Business side effects belong after successful processing (pp. 91–94, 99).

A caller supplies a request ID per logical intent and reuses it for retries. The book favors rejecting duplicates with an explicit code and providing a query for the original disposition; returning a variation of success is also discussed. A command envelope’s correlation ID is distinct from that request ID. Subscribe for the correlated result before append to avoid missing a fast completion (pp. 94–96).

Typed mutation results distinguish business failures. Success supplies the final event sequence number as a visibility target, not proof that the read model is already updated (pp. 96–98). Client-supplied as-of revisions permit coarse or fine-grained optimistic checks; conflicts need a deliberate user response (pp. 100–101).

A processing timeout after confirmed submission differs from a submission timeout with an unknown outcome. Request identity and disposition lookup support recovery without inventing a new intent (pp. 101–102).

## Application boundary

Our receipt policy, no-op outcomes, scoped tokens, and response shapes supplement this design. The one-command simplification is scoped to the initial topology; Chapter 15 discusses chained processors. Version-sensitive GraphQL schema limitations and old SDK examples are not imported as current API advice.

Find the application destination in the [book-to-runtime map](../business-patterns/architecture/source-map.md).
