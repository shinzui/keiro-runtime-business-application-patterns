# Keiro business application patterns

Application guidance for Peter Royal's *Building Modern Business Applications*, using the Keiro runtime. This catalog supplements [mori://shinzui/keiro-runtime-patterns](mori://shinzui/keiro-runtime-patterns); each local pattern explains what it adds and when it diverges.

Start with [getting started](business-patterns/getting-started.md), the [source map](business-patterns/architecture/source-map.md), and the [authoring contract](business-patterns/architecture/authoring-contract.md). [MasterPlan](docs/masterplans/1-bootstrap-a-book-aligned-keiro-business-application-pattern-catalog.md) tracks implementation.

## Validate and discover

Prerequisites: OKF 0.9.0.0 or later supporting OKF 0.2, Dhall and dhall-to-json, Bun 1.3.13 or later, Git, and Just. CI pins OKF 0.10.0.0, whose upstream release was checked on 2026-10-07. Mori is required only to refresh local discovery.

```bash
just check-docs
just check-docs HEAD
# At final catalog acceptance, reject unfinished coverage:
just check-docs --complete
mori register --local
mori path mori://shinzui/keiro-runtime-business-application-patterns/docs/getting-started
```

Checks use a temporary directory and do not rewrite the working tree. To refresh indexes intentionally, run `okf index business-patterns --write --okf-version 0.2`. Record material changes with `okf log add` as described in the authoring contract. No runtime or server needs to run for documentation checks.
