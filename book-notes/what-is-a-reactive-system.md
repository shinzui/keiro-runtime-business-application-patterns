---
type: Explanation
title: "What is a reactive system?"
description: "Book-grounded notes for chapter 3 with the Keiro application boundary made explicit."
docId: DOC-3
generated:
  by: process:codex
  at: "2026-10-07T17:25:06Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-what-is-a-reactive-system
tags: [book-notes, business-applications]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1_3
---

# What is a reactive system?

Chapter 3 of Peter Royal’s *Building Modern Business Applications* (2023). Checked passages: printed pp. 23, 29; supplied PDF pages 34, 40. See the [edition and validation record](validation.md).

## Book guidance

A spreadsheet introduces the idea of dependent values reacting to changed inputs. The chapter extends data-flow thinking from programming to systems.

The four properties are responsiveness, resilience, elasticity, and message-driven communication. Asynchronous messages provide boundaries that help elasticity and resilience serve the goal of remaining responsive. Uniform component interfaces also make composition and later changes easier.

## Application boundary

These are design properties. A library name, reactive programming API, or browser subscription alone does not demonstrate that a deployed application has them.

Find the application destination in the [book-to-runtime map](../business-patterns/architecture/source-map.md).
