---
type: Reference
title: "Book edition, validation, and import decisions"
description: "Record checked book passages, corrected source claims, and exclusions from the local notes."
docId: DOC-17
generated:
  by: process:codex
  at: "2026-10-07T17:27:01Z"
resource: mori://shinzui/keiro-runtime-business-application-patterns/docs/book-validation
tags: [book-notes, business-applications, source-validation]
status: stable
sources:
  - resource: https://doi.org/10.1007/978-1-4842-8992-1
---

# Book edition, validation, and import decisions

## Edition and method

Peter Royal, *Building Modern Business Applications: Reactive Cloud Architecture for Java, Spring, and PostgreSQL*, Apress, copyright 2023. Ebook ISBN 978-1-4842-8992-1; [book DOI](https://doi.org/10.1007/978-1-4842-8992-1).

On 2026-10-07, the retained claims were compared directly with text extracted from the supplied 185-page PDF. The live-query passage on printed page 112 (PDF page 116) was also rendered and visually checked. Each chapter note identifies its checked printed pages and physical PDF pages; they differ, and the offset changes within the file. The supplied PDF SHA-256 is `0a502d60ba9c1a58ac8ae871dc53def9a3d1b94ea01c01768658742271e9810b`.

These are concise, rewritten explanations, not a copy of the book, a full transcription of the original notes, or a certification of a running application. Validation covers the retained architectural claims. Library APIs and version-sensitive technology assertions were omitted. The original PDF and extracted full text are not distributed in this repository. The authoring check is recorded here; no independent reviewer or OKF `verified` status is claimed.

## Corrections and qualifications

| Source issue | Local treatment | Book evidence |
|---|---|---|
| Derived rules described separately from display rules | Use three categories; derivation and aggregation are within display logic | Chapter 5, pp. 44–46 |
| Core flow described as necessarily aggregate-scoped | Explain the initial single processor and system state; partitioning is a later choice | Chapter 9, pp. 81–85; chapter 15, pp. 165–166 |
| Pure decision summary omits prospective application | Record the applicator’s rule validation before append | Chapter 9, p. 88 |
| Request identity treated as one undifferentiated ID | Distinguish retry identity from command-envelope correlation | Chapter 10, pp. 94–96 |
| At most one command stated without qualification | Scope to the initial design; chained processors are a later extension | Chapter 10, p. 92; chapter 15, p. 166 |
| Success implies immediately visible data | Retain position-based observation as a separate step | Chapter 10, p. 98; chapter 11, p. 107 |
| Subscriptions supposedly cannot load initial state | Correct: the book’s live query sends an initial snapshot | Chapter 11, pp. 111–112 |
| View rebuild treated as safe for all consumers | Preserve independent business-effect progress and event-compatibility limits | Chapter 11, pp. 109–114 |
| Platform topology presented as implied by the book | Label gateway, transport, package, and frontend choices as adaptations | Chapters 13–14, pp. 140–162 |
| A position or row marker treated as universal progress | Keep source identity and completed frontier separate from individual row change | Chapter 11, pp. 107–108; chapter 15, pp. 168–170 |

Chapter 6 supplies occurrence/awareness time and rule-change history; workflow scheduling details remain application guidance. Chapter 12 supplies composed-flow testing and the independent oracle; the repository’s document checks do not implement that system test. Chapter 14 describes Java and PostgreSQL, not Keiro or Kiroku. The book’s version-sensitive claims are historical context, not current library documentation.

## Import scope

All 15 numbered chapter summaries are now locally rewritten as explanations. The eight relevant platform guides are consolidated into [application adaptations](adaptations.md), including the additional child-node guide found in the source working tree. Old Haskell/TypeScript adapters, framework snippets, service-specific domain examples, scratch notes, and generic runtime recipes are excluded. The existing runtime catalog continues to own those mechanics.

The [coverage map](../business-patterns/architecture/source-map.md) tracks 23 inputs: 15 chapters and eight adaptations. Every active pattern reading link and source entry targets local support or the runtime owner. Provenance below records the origin for audit purposes; it is not a dependency needed to read these patterns.

## Profile choice

Use `documentation.userDocumentation` from [OKF profiles](mori://shinzui/okf-profiles/profiles/user-documentation), pinned at v0.20.0 through `okf/book-notes.dhall`. Chapter explanations use `Explanation`; this record and the adaptation guide use `Reference`, with bundle-scoped `DOC-N` identities. The existing `documentation.patternCatalog` continues to govern application patterns. The research profile’s research lifecycle and review-oriented records are unnecessary for this maintained reference corpus.

The upstream annotated tag v0.20.0 resolves to commit `47e75a651d35ff2c8879c1419224c0377a6c64ab`, verified on 2026-10-07. The versioned package integrity hash is shared with the existing pattern profile. Automated checks enforce both bundles, their DocRefs, local references, coverage, generated indexes, and change logs. They do not prove semantic accuracy.

## Origin provenance

The source project is mori://shinzui/event-sourcing-full-app-patterns; documents came from its project-relative `docs/ebook-principles/` directory and the book from project-relative `ebook.pdf` (artifact-level PDF URI pending). Base Git revision: `479946721924895f4242cd6ab86558f795c9af71`. The working tree contained modified README/frontend guidance and an untracked child-node guide, so that commit alone is not the identity of every inspected input. Content hashes below identify the actual document inputs. No source-repository files were modified.

| Source document within that directory | SHA-256 |
|---|---|
| `00-ideal-platform-architecture.md` | `dba43b9fdaf003282730f7925d641e3d180424a71028a142fe94fcd4a9a9c5dd` |
| `01-what-is-a-business-application.md` | `1d2bf852a99cfef414f5cd85b4c672e474ba2583cbca95f6dfe23016873f90aa` |
| `02-the-status-quo.md` | `12b47f7712054828af5ebaeb044bdc0119d2a473a5066511aba4b0139125708e` |
| `03-what-is-a-reactive-system.md` | `124cb080ab13f24ef7e31ad4414d8d280d85904175c7b5b57fb46588e027a448` |
| `04-why-reactive-business-applications.md` | `7fc20a88dd9038597aa642308742ad310762f6687132ad7399644119c2be91ea` |
| `05-what-is-a-business-rule.md` | `2fd006cf5f4119ede96d68d52e1092006c3072860307b9e64fe9f83947193b09` |
| `06-managing-time.md` | `743489299f42139332c1345601e2bfae755160f8e3bf689b7ffec44d60f5c2f4` |
| `07-constraints-and-principles.md` | `c739f98a26a1a96123147efd88542d7864cb1c0a6449017e7a0ef6c7e157917e` |
| `08-high-level-data-flow.md` | `40874f536d7208475bc163e40582ade1bf07c6bc5c916f1605573ea51ed0294a` |
| `09-command-processor.md` | `90c104466e85bfe63bddca0b7ddb7b079c03456ad60f2f7d38a7fb1263f692fb` |
| `10-command-generator.md` | `581b77ad99d5536c6a6994dd048cad729b442ee7d4e61bfcfebc08897368884c` |
| `11-event-materializer.md` | `49d8388f10eab822bc9e791183a4cae3bd37d0ce5cf064be7338853689628586` |
| `12-testing-monitoring-observability.md` | `ef91aab6d752797c17caa40daec730242fc2905440ae7b78d52d880d3680840a` |
| `13-required-technologies.md` | `62ed658dabeb942229dc81b11e21420139189d7cac6079c06cf41afa22a65b5d` |
| `14-implementation-translation.md` | `1bb08d52cf11aae1a1da53a3630704d37c340b20f7401c614c4849bf903d2a8f` |
| `15-expansion-points-and-beyond.md` | `a6b82dcf897db68b7005569621ce72ac485d77e6e3fa1f5cb7db6eadbfeced96` |
| `frontend-relay-patterns.md` | `d801db196b88a4f86cedcefcf28530ca68f7be9f3743c398d640924fd3db0d3a` |
| `relay-child-node-subscriptions.md` | `20494005fa64f134352f47a27f526ba6ca79c52bbaf91d054beb84dde31e2a87` |
| `screen-data-query-first-rationale.md` | `4de181ee39d9276a195d0be96f3c1569b913bb0d41bbb18915985ccd45431e25` |
| `screen-data-subscription-mental-model.md` | `c434bf1252caff3a208d047d8d96e0139388ef8cb0da7da55227194f4adb1d2c` |
| `service-architecture-blueprint.md` | `9eb0bb61d0bd396034187162c2a563e919085efa474f2d455d3ed68a5a00f1a2` |
| `subscription-flow-implementation-typescript.md` | `a5cc7ebc03f7a661a1c7ae6fbc8d3817b54cedd146acfc8d9728e3f6c33ed2b1` |
| `subscription-flow-implementation.md` | `7362ad9b2afb8f7ec78028b0ca0301d1dd0f8824bab4cee65e836978caad2189` |
