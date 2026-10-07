---
type: Explanation
title: "Evolve the architecture deliberately"
description: "Book-grounded notes for chapter 15 with the Keiro application boundary made explicit."
docId: DOC-15
generated:
  by: process:codex
  at: "2026-10-07T17:25:06Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-expansion-points-and-beyond
tags: [book-notes, business-applications]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1_15
---

# Evolve the architecture deliberately

Chapter 15 of Peter Royal’s *Building Modern Business Applications* (2023). Checked passages: printed pp. 163–178; supplied PDF pages 163–178. See the [edition and validation record](validation.md).

## Book guidance

The final chapter explores options rather than a mandatory roadmap. Multiple command processors require partitioning rules and sometimes coordination for global invariants. A command generator may chain requests to different processors (pp. 165–166).

Cached processor state is disposable acceleration, not another source of truth. It must match the applicator version, and the application must remain able to recover without it (pp. 166–168). Parallel materialization complicates checkpoints: the highest completed position does not necessarily establish completion of earlier work. Multiple logs can require a source identity alongside the visibility position (pp. 168–170).

Other extensions include exposing log streams, GraphQL integration and federation, a Temporal-based implementation alternative, and bitemporal views that distinguish transaction time from valid time (pp. 170–178). Their inclusion does not mean every application needs these technologies.

## Application boundary

Follow the runtime catalog for current partitioning, workflow, and rebuild mechanisms. Preserve position scope and explain costs before adopting an extension.

Find the application destination in the [book-to-runtime map](../business-patterns/architecture/source-map.md).
