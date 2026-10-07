# Own book explanations in a separate documentation bundle

Status: Accepted
Date: 2026-10-07

## Context

Application patterns depended on another repository's chapter summaries and platform guides. That made the reading path external and left book attribution indirect. The supplied book permits checking retained claims directly; several platform recommendations require qualification.

## Decision

Maintain concise, rewritten chapter explanations in `book-notes/`, governed by the shared `documentation.userDocumentation` profile at v0.20.0. Use Explanation for chapters and Reference for the validation record and consolidated application adaptations. Preserve `business-patterns/` under `documentation.patternCatalog` and leave normative runtime mechanics with their existing owner.

Cite printed book pages and record the PDF identity and inspected source hashes. Patterns link to local notes; origin references remain only as provenance or historical evidence. Do not distribute the book, obsolete adapters, or unverified framework snippets. A direct authoring comparison does not imply an independent review or a running implementation.

## Consequences

The local reading path works without the source-notes repository. Both bundles require metadata validation, DocRef registration, change logs, and generated-index checks. Future book claims require passage checks and future runtime claims require runtime evidence. Book-supported initial-snapshot subscriptions remain valid; query-first is an application choice, and durable browser replay is a separate capability claim.

See the [validation record](../../book-notes/validation.md) for corrections and import scope, and [ADR-1](0001-supplement-runtime-patterns-with-book-aligned-application-contracts.md) for runtime ownership.
