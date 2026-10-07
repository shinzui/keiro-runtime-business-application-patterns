---
type: Navigation
title: Business applications with Keiro
description: Choose book-aligned application compositions that supplement the Keiro runtime standards.
generated:
  by: process:codex
  at: "2026-10-07T17:27:01Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/getting-started
tags: [business-applications, keiro, navigation]
status: current
sources:
  - resource: mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-6
  - resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-high-level-data-flow
---

# Business applications with Keiro

Start with the business action and what a user must observe. This catalog connects book-checked explanations of Peter Royal's *Building Modern Business Applications* to application contracts over Keiro.

The [runtime library](mori://shinzui/keiro-runtime-patterns) owns runtime mechanics. This catalog owns interpretation, composition, and explicitly scoped alternatives. Keiro uses Kiroku as its event store. The local [book notes](../book-notes/index.md) provide the supporting explanations. Their [validation record](../book-notes/validation.md) distinguishes checked book claims from application adaptations and records corrections.

## Choose a route

| Your decision | Start here |
|---|---|
| What does this catalog add to existing standards? | [Source map](architecture/source-map.md) |
| How should a mutation become a business command? | [Generation and processing](commands/generation-and-processing.md) |
| What does accepted mean, and what can be retried? | [Outcomes and visibility](commands/outcomes-and-visibility.md) |
| What if an action is delayed or policy changes? | [Time and automation](workflows/time-and-automation.md) |
| What if another system fails after activation? | [Effects and integration](workflows/effects-and-integration.md) |
| When may the screen claim a write is visible? | [Materialization and freshness](reads/materialization-and-freshness.md) |
| How do live screens recover missed changes? | [Query and live updates](reads/query-and-live-updates.md) |
| How does the whole feature fit together? | [Chapter activation walkthrough](examples/chapter-activation.md) |
| How do I contribute without duplicating runtime rules? | [Authoring contract](architecture/authoring-contract.md) |

## Read evidence honestly

The book is represented through locally maintained explanations checked against its cited passages; platform adaptations are identified separately. Patterns are source-backed application designs, not a shipped GraphQL service or a general request-receipt library. Each pattern cites its runtime owner, states its additional decision, and names failure/recovery behavior. A validated document is not a certified application. The walkthrough gives adoption acceptance scenarios; the small executable model checks only screen ordering assumptions.
