# 0001: Connected prototype first

Date: 2026-10-06.
Status: UI-first direction authorized by the user; lightweight domain/service refinements are the team's documented recommendation. No product code implemented yet.

## Context

The client wants a combined CRM, B2B/agent booking platform, DMC workflows, communications and AI. Requirements will emerge from existing portals and iterative client feedback. Building a full backend from a screen wishlist would lock in untested assumptions.

## Decision

Begin with one connected, functional UI journey using synthetic records. Define preliminary entities, lifecycle rules, ownership, pricing concepts, and mock service contracts as each slice is built. Delay final database design and broad integration wiring until the slice has enough workflow validation, while investigating integration feasibility alongside UI work.

Use module READMEs for behavior, a private reference library for evidence, decision records for substantial choices, and concise `AGENTS.md` files for working guidance.

## Alternatives considered

- Full schema/backend first: exposes useful constraints but risks designing around an unvalidated product.
- Disconnected clickable screens with arbitrary sample data: quick visual progress but poor evidence of a workable booking/operations process.
- Wait for all UI screens to become final: delays important provider and business-rule feedback; client iteration is likely to continue.

## Consequences

- Faster client feedback on real tasks, with a clear mock/production boundary.
- Early effort is still needed for coherent sample data, domain rules, service adapters, and error/access states.
- Some UI rework remains likely. Service boundaries and shared design patterns limit the cost.
- No commitment yet to framework, database, vendor APIs, deployment, or a delivery date.

## Revisit when

Portal evidence reveals incompatible business flows, provider constraints invalidate assumptions, or the client changes the first-release scope. Record replacements explicitly rather than silently rewriting the rationale.
