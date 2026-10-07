# Local book-note validation

Date: 2026-10-07

## Result

Added 17 documents in `book-notes/`: fifteen chapter explanations, one consolidated adaptation reference, and one edition/validation record. Adopted the hash-pinned `documentation.userDocumentation` profile at v0.20.0. Preserved the separate pattern catalog and runtime ownership. The source map now covers 23 inputs, including the source working tree’s additional child-node guide.

The [book comparison record](../../book-notes/validation.md) contains printed-page citations, the PDF hash, source-document hashes, corrections, and exclusions. It is an authoring comparison of retained claims, not an independent review. Source content was rewritten selectively; framework snippets and the book PDF were not copied. The original repository was not modified.

## Executed checks

- `just check-docs HEAD --complete`: passed, 27 concepts across two bundles and 23 coverage inputs, including profile enforcement, DocRef joins, local links/source fragments, generated indexes, graph integrity, and diff-aware log pairing.
- `okf validate book-notes --strict --profile okf/book-notes.dhall --profile-enforce --log-enforce`: passed, 17 concepts.
- `python3 scripts/test-catalog-checks.py`: all nine rejection fixtures passed, including missing book source, missing source anchor, invalid book identity, and stale book index.
- `mori validate`: configuration valid; sealed evaluation checked three repository Dhall files with no violations.
- `mori register --local`: completed for the preserved project identity.
- `git diff --check`: passed for tracked changes.

Dhall-backed checks required access outside the restricted sandbox for their existing cache and pinned remote imports. No runtime implementation changed and no application integration test was claimed. The existing Mermaid diagrams and screen-ordering model were preserved.

## Durable decision

[ADR-4](../adr/0004-own-book-explanations-in-a-separate-documentation-bundle.md) records the profile and evidence boundary. Historical validation records describe the previous indirect-source state; this record and the local book notes supersede that source limitation for retained book claims.
