# Catalog bootstrap evidence

## Source and release baseline — 2026-10-07

The existing manifest and stable project ID were already present when implementation started; they are extended in place. Mori resolved the source notes, runtime catalog, OKF, profile, and schema checkouts. Runtime ADR handles 3, 6, and 8 resolved during planning.

`mori://shinzui/okf-profiles` v0.20.0 is published as an annotated upstream tag peeling to `47e75a651d35ff2c8879c1419224c0377a6c64ab`. The tagged CHANGELOG confirms the 2026-10-07 release and OKF >= 0.9.0.0 requirement. GitHub has no Release object and Mori has no release facts for this project; neither was substituted for the authoritative tag/changelog. The local descriptor pins that tag with semantic hash `079a5b3679dccafd2070535b3d59a0ffdf28e20bf9cacfe095dca96c8012879a`.

The existing `mori://shinzui/mori-schema` pin `3522f4a51181d73c9c90fc27a7c0838bd29ae95f` matches upstream HEAD. This project publishes no version tags in the queried remote. No schema upgrade was needed. Local source for `records/OkfBundle.dhall` and `records/ProfileBinding.dhall` establishes the typed local binding used here (artifact-level handles pending).

Installed OKF reports `v0.9.0.0 (da8459e)`. Upstream's latest GitHub Release and annotated tag are v0.10.0.0, peeling to `b57510200f949a72d48cb009d932be1d1cc11888`; CI selects that release, not the installed version by accident. No Haskell package dependency bounds are introduced. Bun 1.3.13's built-in YAML parser was exercised before using it in the checker.

## Initial integration proof

One Navigation concept passed the v0.20.0 profile under installed OKF, declared bundle format 0.2, and serialized as one graph node. Full bootstrap checks and rejection evidence are recorded below after execution.

## Accepted bootstrap checks

On 2026-10-07, `just check-docs HEAD` passed for three concepts and 22 source rows. `python3 scripts/test-catalog-checks.py` rejected missing description, broken local link, a manually changed generated index, and a material concept edit without its nearest log. Each fixture asserts both nonzero exit and the intended diagnostic, and uses a disposable copy. Repeated index generation was byte-identical.

`mori validate` passed the sealed two-file Dhall evaluation; `mori register --local` updated the existing project. The getting-started DocRef resolves to this checkout. The graph contains only catalog concepts, excluding plans and ADRs. The source-map's chapter processor, transport, and query/subscription rows were compared with their runtime owners: direct command processing is a scoped topology choice, transport stays inherited, and browser delivery is an application boundary with a documented gap.

CI is configured to run the same checker via Nix with released OKF 0.10.0.0; hosted CI has not been executed in this local session. Local acceptance used installed OKF 0.9.0.0, which satisfies the profile release requirement.
