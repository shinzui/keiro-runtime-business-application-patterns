# Separate command disposition from read visibility

Status: Accepted
Date: 2026-10-07

## Context

The chapter notes propose durable command intake and result observation. Keiro supports direct domain processing as well as composition primitives. Its silent rejection/no-op paths append nothing and skip SQL callbacks. A committed write may precede projection visibility or external delivery.

## Decision

Use direct processing for bounded one-aggregate requests; require durable input, worker progress, and result lookup when asynchronous intake is needed. This is a scoped alternative to the chapter topology, not a change to runtime mechanics. Treat accepted/rejected/no-op disposition independently from pending/unknown observation and from read-model visibility. Never manufacture a global position for a silent result.

Applications own repeatable request receipts, their retention and authorization, including the serialized silent-result path. Follow mori://shinzui/keiro-runtime-patterns/docs/keiro-command-cycle-and-errors for underlying semantics. Separate notification/integration progress from business acceptance and avoid exactly-once claims for external effects. Late automation obeys an explicit business policy.

## Consequences

A visibility timeout preserves acceptance. Lost responses trigger same-identity result lookup, not blind new intent. An application that reevaluates silent retries instead of returning an original receipt must declare the weaker contract. This catalog defines composition obligations and examples, not a supplied receipt or GraphQL implementation.

## Related guidance

[Command outcomes](../../business-patterns/commands/outcomes-and-visibility.md), [time](../../business-patterns/workflows/time-and-automation.md), and [effects](../../business-patterns/workflows/effects-and-integration.md).
