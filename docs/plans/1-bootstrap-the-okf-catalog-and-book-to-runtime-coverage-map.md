---
id: 1
slug: bootstrap-the-okf-catalog-and-book-to-runtime-coverage-map
title: "Bootstrap the OKF catalog and book-to-runtime coverage map"
kind: exec-plan
created_at: 2026-10-07T16:09:44Z
intention: "intention_01m4bhvpbsecpb5487rqdjwwkg"
master_plan: "docs/masterplans/1-bootstrap-a-book-aligned-keiro-business-application-pattern-catalog.md"
provenance:
  created_by:
    model: "gpt-6-astra"
    harness: "codex-cli"
    at: 2026-10-07T16:09:44Z
  revisions:
    - model: "gpt-6-astra"
      harness: "codex-cli"
      at: 2026-10-07T16:21:20Z
      mode: "implement"
      note: "Bootstrap shared profile, source map, Mori discovery, and validation"
---

# Bootstrap the OKF catalog and book-to-runtime coverage map

## Purpose / Big Picture

An author can discover the new business application catalog, understand its boundary with existing runtime guidance, add a valid pattern, and run one check that detects broken metadata and references. A reader can map every supplied chapter and curated supplemental guide to an inherited runtime rule, a planned local addition, a justified divergence, or a capability gap.

## Progress

- [x] M1: A small profiled catalog is discoverable and passes strict validation, including an invalid-document rejection check.
- [x] M2: Source coverage and authoring rules distinguish book principles, prior platform choices, and current runtime ownership.

## Surprises & Discoveries

2026-10-07: Mori identity and a current schema pin already existed at implementation start; extended them without changing the stable ID. The profile release is tag/changelog-based, with no GitHub Release object or Mori release fact.

## Decision Log

2026-10-07: Reuse `documentation.patternCatalog`; do not fork its metadata schema. Local editorial requirements govern the supplemental relationship.

## Outcomes & Retrospective

Completed 2026-10-07. Three catalog concepts pass strict validation and all 22 source documents have dispositions. Four rejection fixtures and local Mori resolution passed; see [bootstrap evidence](../validation/catalog-bootstrap.md). Durable ownership and evidence boundaries are captured in [ADR-1](../adr/0001-supplement-runtime-patterns-with-book-aligned-application-contracts.md). CI is configured but its hosted run is not claimed.

## Context and Orientation

This repository starts as a scaffold with installed planning skills and `.seihou/config.dhall`; no application code or catalog existed when this plan was written. Open Knowledge Format (OKF) stores Markdown concepts with validated metadata, generated indexes, and update logs. A profile is the reusable validation contract, not a new runtime capability. Mori resolves canonical project and document identities to local source paths. Run commands from this repository root, obtained with `git rev-parse --show-toplevel`.

Source authority is layered: `mori://shinzui/event-sourcing-full-app-patterns` contains notes on Peter Royal's *Building Modern Business Applications* and adaptations to an older platform; `mori://shinzui/keiro-runtime-patterns` owns runtime implementation standards; `mori://shinzui/keiro` and Mori-discovered supporting projects own actual APIs. Do not copy the notes' Message DB snippets into Keiro guidance. Use canonical Mori URIs for every durable external reference. If a source file lacks an artifact handle, cite its project URI together with its project-relative path and state that artifact-level coverage is pending.

No local ADR existed at planning time. Consult `mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-6`, which assigns one normative documentation owner, and `mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-8`, which isolates the catalog from plans and consumes a shared profile. Content involving transport also follows `mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-3`, distinguishing jobs, private event consumption, and cross-context facts. Read local ADRs created by bootstrap before implementation and carry their applicable decisions forward.

The intended project identity is `shinzui/keiro-runtime-business-application-patterns`, supported by the Git remote and `.seihou/config.dhall`. Confirm that identity before registering it. Create the isolated `business-patterns/` bundle; keep plans, skills, ADRs, and validation evidence outside it. The runtime example descriptor is `mori://shinzui/keiro-runtime-patterns` plus project-relative `okf/runtime-patterns.dhall`, and its checker is project-relative `scripts/check-runtime-patterns` (artifact handles pending). Inspect these for behavior, not for a fixed version or fixed concept count.

The shared profile source is `mori://shinzui/okf-profiles`, project-relative `profiles/documentation/pattern-catalog.dhall` (artifact handle pending). Its inspected source uses OKF 0.2, `generated`, structured `sources`, canonical `resource`, tags, and current/deprecated status. Narrative patterns do not require assessable PAT handles. The existing runtime descriptor pins an older release, so copying its pin is not a release decision.

## Plan of Work

### M1 — Establish a working catalog

Discover the current OKF, profile, and Mori schema sources with Mori. Verify released versions against their authoritative release records and upstream tags before choosing immutable imports. For Haskell package bounds, consult Hackage as well as tags; do not choose bounds from the local corpus alone. Record selected versions and verification date in the authoring documentation. Use the installed CLI help and source to confirm commands rather than inventing options.

Create `okf/business-patterns.dhall` importing the shared `documentation.patternCatalog` at a verified immutable tag with a Dhall integrity hash. Add `mori.dhall` with the project, the `business-patterns` OKF bundle, profile binding, source dependencies, and stable DocRefs. Follow current Mori schema source for the exact record shape. Add `business-patterns/getting-started.md` as the first real Navigation concept and generate reserved indexes/logs with the installed OKF tools. The first concept explains catalog purpose and links to the runtime library without reproducing its rules.

Implement `scripts/check-business-patterns`, a `just check-docs` recipe, and CI invoking that same recipe. Check profile freeze/type validity, Mori manifest validity, strict OKF/profile/log enforcement, generated-index determinism, graph integrity, and local document links. Check concept resource uniqueness and agreement with registered DocRefs. Do not copy the runtime checker's hard-coded node count. Where CLI drift diagnostics do not fail the process, turn the documented diagnostic into a failing check, verified with an invalid fixture. Expose an optional Git base-ref argument for changed-document/log pairing, with honest behavior for a new repository or missing base.

Validate one real concept before expanding content. In a temporary copy, remove a required metadata field and confirm a nonzero result; break a local link and confirm another failure. Register/refresh the project using Mori's documented local workflow and resolve the new getting-started DocRef. This is the early producer/consumer proof for the profile, authoring shape, and discovery tools.

### M2 — Make source ownership actionable

Create `business-patterns/architecture/source-map.md` and `business-patterns/architecture/authoring-contract.md`. Inventory all 16 numbered chapter documents (including chapter 0) and all six additional curated guides listed by the source README; exclude temporary scratch material. Use `mori registry docs shinzui/event-sourcing-full-app-patterns` for the 22 registered identities and verify against the source README. Each row records source URI and section, book versus adaptation evidence, nearest runtime owner, disposition (`inherits`, `supplements`, `diverges`, or `gap`), local destination when applicable, rationale, and verification status. This finite inventory defines coverage; it is not a requirement to produce 22 new patterns.

Every local pattern must explain problem, applicability, book principle, baseline runtime references, incremental recommendation, alternatives/tradeoffs, evidence, and failure/recovery behavior. A divergence must state exactly which baseline it departs from, why, when to choose it, and how to retain business guarantees. An inherited topic gets a link and brief relevance statement in the source map, not another standalone standard. A gap states the missing capability and supported fallback. Add a lightweight editorial check for these sections and source-map destinations; semantic non-duplication still requires review.

Create a plain local ADR documenting the supplement boundary and source layering, following `agents/skills/exec-plan/ADR.md`; no ADR profile exists, so do not invent profile metadata incidentally. Add README navigation and authoring commands. Reserve command and read-side destinations for the two content children without claiming they already exist; the checker must distinguish explicit planned destinations from broken published links. After those children publish, their rows must resolve and lose planned status.

## Concrete Steps

From the repository root, discover source contracts:

```bash
mori registry search okf
mori registry show shinzui/okf-profiles --full
mori registry docs shinzui/okf-profiles
mori registry show shinzui/keiro-runtime-patterns --full
mori registry docs shinzui/event-sourcing-full-app-patterns
okf validate --help
okf index --help
okf log --help
mori --help
```

After creating the descriptor, manifest, and bundle, run:

```bash
dhall freeze --check okf/business-patterns.dhall
dhall type --file okf/business-patterns.dhall
dhall type --file mori.dhall
okf validate business-patterns --strict --profile okf/business-patterns.dhall --profile-enforce --log-enforce
okf index business-patterns --write
okf graph business-patterns --json
just check-docs
mori path mori://shinzui/keiro-runtime-business-application-patterns/docs/getting-started
```

Document exact registration and log-update commands once confirmed by current CLI help. Save concise release verification and negative-check evidence in `docs/validation/catalog-bootstrap.md`.

## Validation and Acceptance

A clean checkout with documented prerequisites passes `just check-docs`; repeated index generation changes no files. A missing required field and a broken local link each fail in disposable fixtures. Plans and ADRs do not appear as pattern concepts. Mori resolves the intended getting-started URI to this checkout. Every one of the 22 source documents has an explicit disposition; inspect at least command processing, transport, and query/subscription guidance against both source layers. No inherited rule has been republished as a competing standard. Bootstrap may name planned child destinations, but must not present unwritten content as published.

## Idempotence and Recovery

Changes are additive and local. Preserve unrelated work, existing stable document identities, and generated frontmatter provenance. Regenerate indexes instead of hand-editing them; update each material concept's metadata and nearest log. Rerun checks after corrections. Perform deliberate invalid-fixture checks in a temporary copy, never by leaving the catalog broken. If Mori registration is unavailable, keep intended canonical references and record the exact failure; do not substitute machine-specific paths or claim discovery acceptance. Do not modify upstream repositories to force an example to pass. Record a capability gap and its supported alternative, and revise affected acceptance claims truthfully.

## Interfaces and Dependencies

No child prerequisite. This plan owns the catalog schema binding, discovery manifest, validation command, authoring contract, source map, navigation, and index/log conventions. `docs/plans/2-document-business-command-and-workflow-composition-patterns.md` and `docs/plans/3-document-read-side-application-patterns-and-verify-the-complete-flow.md` consume these accepted artifacts. The validation interface is `just check-docs`, delegating to `scripts/check-business-patterns [BASE_REF]`; later content must not weaken it. Use the declared Intention ID on implementation commits together with MasterPlan and ExecPlan trailers. At completion, distill durable decisions into `docs/adr/` and update this plan's provenance through the skill script.
