# Supplement runtime patterns with book-aligned application contracts

Status: Accepted
Date: 2026-10-07

## Context

The source notes combine book summaries and an older platform translation. The runtime catalog already owns command processing, receipts, projection freshness, transport, and service layout. Republishing those rules would create competing normative owners.

## Decision

Keep application composition in the isolated `business-patterns/` OKF bundle and consume the shared `documentation.patternCatalog` without a local schema fork. Keep plans, ADRs, and execution evidence outside that bundle. Preserve the registered Mori project identity and stable DocRef keys.

Every source has an explicit inherited, supplemental, divergent, or gap disposition. Book summaries, platform adaptations, runtime guarantees, and application-owned obligations remain distinguishable. A divergence names its baseline, condition, costs, and preserved guarantees. Unsupported capability claims get truthful fallbacks. Narrative guidance does not imply conformance certification or require PAT handles.

## Consequences

Mechanical checks validate structure and links; manual review verifies incremental value and accuracy. Existing runtime recommendations remain authoritative unless a document explicitly scopes an application alternative. No runtime source changes, product website, or new frontend stack are implied.

## Related decisions

Follow mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-6 for documentation ownership, mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-8 for catalog isolation, and mori://shinzui/keiro-runtime-patterns/okf/adrs/concepts/ADR-3 for transport responsibility. Their version-specific implementation claims must be rechecked against current sources.
