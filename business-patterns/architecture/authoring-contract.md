---
type: Guide
title: "Authoring supplemental patterns"
description: "Keep one owner for runtime mechanics and make application choices and evidence explicit."
generated:
  by: process:codex
  at: "2026-10-07T17:27:01Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/architecture-authoring-contract
tags: [business-applications, keiro, composition]
status: current
sources:
  - resource: mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-6
  - resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-high-level-data-flow
---

# Authoring supplemental patterns

## Ownership and evidence

The [runtime ownership decision](mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-6) is the baseline. A local pattern earns its place by answering an application decision that the baseline leaves to its consumer. Links and short contextual summaries are appropriate; copying a runtime recipe, schema, or error taxonomy is not. A change of programming language or store is an implementation translation, not automatically a disagreement about architecture.

Distinguish four relationships. **Inherits** selects the existing owner and has no local replacement. **Supplements** adds an application contract or composition. **Diverges** selects a scoped alternative to a named baseline and explains why. **Gap** records missing proof or capability and gives a supported fallback. An application-owned implementation obligation is not a claim that Keiro supplies that implementation.

Book claims are grounded in the local [book explanations](../../book-notes/index.md), with printed-page citations checked against the supplied PDF. The [validation record](../../book-notes/validation.md) records the edition, inspected inputs, corrections, and exclusions. Application adaptations are labeled separately and do not acquire book authority through import. Use Kiroku for event-store guidance. Verify illustrative APIs against current runtime source before using them. New book claims need direct passage checks; structural validation alone cannot establish accuracy.

## Pattern shape

Every `Pattern` has these sections: `Problem and applicability`, `Book principle and source layer`, `Runtime baseline`, `Application recommendation`, `Alternatives and divergences`, `Failure and recovery`, and `Evidence`. Include a nearest-baseline URI in metadata as `runtime_baseline` and a `relationship` of supplements, diverges, or gap. Inherited guidance belongs in the source map and is not republished as a Pattern.

The recommendation must add a named application choice. For every divergence name the baseline, the changed decision, the condition for choosing it, its costs, and the preserved business guarantee. For a gap give an honest fallback and what would establish support. Evidence identifies source revision, exact source/test location, and whether an example is illustrative, statically checked, or executed. A cited test is source evidence unless its execution is actually recorded. Never mark `verified` merely because the same author wrote the document.

## Metadata and identity

The shared `documentation.patternCatalog` from [OKF profiles](mori://shinzui/okf-profiles) is imported by `okf/business-patterns.dhall` at v0.20.0 with its Dhall integrity hash. This release was verified against the upstream tag and tagged changelog on 2026-10-07. The package has no GitHub Release object or Mori release fact; tags and the tagged changelog are the published release evidence. The existing Mori schema commit remains pinned and was verified against upstream HEAD. See [bootstrap evidence](../../docs/validation/catalog-bootstrap.md).

Use OKF 0.2: `type`, `title`, `description`, `generated.by`, `generated.at`, `resource`, `tags`, and `status`. `sources` is a list of records containing `resource`; add the specific source references a concept relies on. Use `current` or `deprecated` for publication state. Every concept's stable DocRef is registered in `mori.dhall`; preserve keys across file renames. Narrative patterns do not acquire PAT identifiers or conformance criteria by default. Assessable patterns require a deliberate future adoption decision.

`business-patterns/` is the only pattern bundle. Supporting explanations and references live in the separate `book-notes/` bundle governed by `documentation.userDocumentation`, pinned to the same shared profile release. Book notes use stable `DOC-N` handles and `stable` publication status; patterns retain their existing metadata. Register both bundles’ DocRefs in the manifest. Plans, ADRs, validation evidence, scripts, and README remain outside it. Root and subject `index.md` files are generated. Update `generated.at` for a material change and add an entry to the nearest enclosing `log.md`. A status of current means maintained guidance, not a proof of a running implementation.

## Authoring and validation

From this repository root, edit the concept, its DocRef, and its source-map row, then run:

```bash
okf log add business-patterns architecture/authoring-contract -m 'Describe the material change.'
okf index business-patterns --write --okf-version 0.2
okf index book-notes --write --okf-version 0.2
just check-docs
# Include a real Git base to check concept/log pairing in the diff:
just check-docs HEAD
mori register --local
```

For book notes use `okf log add book-notes <concept-id> -m ...`; each bundle maintains its own log and indexes. Use the changed concept ID in place of `architecture/authoring-contract`. The log command creates or updates a log in the concept’s directory. Keep each changed concept’s nearest log in the same diff. The checker regenerates indexes in a temporary copy, so stale output fails without altering the checkout. It validates the frozen profile, manifest, OKF metadata and graph, DocRef joins, local links, pattern sections, coverage, and diff-aware log pairing. CI runs the same command. Mori refresh is a local discovery step, not required for offline document validation.

The 23 local source rows in [the source map](source-map.md) are the finite coverage boundary. `planned` destinations are allowed while the catalog is under implementation; `just check-docs --complete` rejects them at initiative completion. Semantic accuracy and non-duplication still require manual source comparison; the checker cannot certify either.
