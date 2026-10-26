# 0006 — Manager distribution and peer transfers

Date: 2026-10-06. Status: adopted local mockup slice; client review pending. Source: [FB-010/011](../feedback/README.md).

2026-10-07 update: executive peer reassignment is **superseded** by the owner transcript's manager/admin-only policy under [0007](0007-payment-operations-mockup.md). Current UI/service denies executive transfers; manager personal/team work and selected-batch preview/apply remain. Names/pool expanded under FB-015. The description below preserves the original decision and historical alternatives.

## Context and decision

User confirms managers work their own leads, manually assign single/batch leads, and release selected leads for an even division across sales executives. Executives can transfer their own leads to each other. Implement this behind shared typed preview/apply contracts, retaining existing lead IDs, stages, conversations and open follow-ups.

Release balances the selected batch, independently of existing workload. The demo pool has Sam Taylor and Riley Chen; the manager is a manual ownership option. Rotate an odd remainder across successive releases using a persisted cursor (older local records default to zero). Pool/availability/workload policy remains a reversible [AS-011](../product/assumptions.md) default. Intake routing is separate and still undecided.

Preview displays current/proposed owners and selected counts. Apply revalidates role, selection, targets, snapshot sequence and cursor, then writes the full batch once. A stale/invalid/failed operation saves nothing. Ownership changes append actor/time history and move incomplete tasks; completed tasks keep their original owner. Local service checks demonstrate scope only; production authorization and concurrent multiuser transactions require a backend.

Reuse communication, assignment and form primitives across roles. Page layouts, routes/navigation and specialized manager/admin components may differ, as the user clarifies under FB-011. Shared components do not require identical pages. Add Riley as a second login-able sales identity to review both directions of peer transfer.

## Alternatives and consequences

- Balance total existing workload: may concentrate a released selection on one owner, conflicting with the requested even selection split; defer for review.
- Always give the remainder to the first member: simple but repeatedly favors one executive; use rotation instead.
- Clear owner into an unassigned queue: introduces an intermediate state not requested; release directly assigns after preview.
- Separate role-specific copies of chat/call/forms: duplicate behavior; retain shared components and allow distinct compositions.

Filters/views clear selection; Select all covers visible matching rows. Manager/admin may assign batches or take ownership; sales may transfer one own lead only to another executive. No real ad intake, communications, payments or database introduced. Revisit pool/fairness when client defines teams, availability, workload and production permissions.
