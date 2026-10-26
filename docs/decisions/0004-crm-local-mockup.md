# 0004: CRM-only mockup with local persistence

Date: 2026-10-06. Status: adopted prototype boundary from user clarification; detailed workflow choices still under discussion. This decision defines the boundary; the first lead/communication/follow-up implementation is now recorded under [0005](0005-shared-crm-communications.md). Auto/payment handoff choices remain pending.

## Context and decision

User explicitly confirms UI mockups only, with existing fake data and newly created leads appearing in the list; local storage/local data are acceptable. Intake includes Meta, Google and manual form entry. Demonstrate both manager assignment and automatic assignment options. Partial or full client payment is the sales-to-operations handoff milestone; verification and routing details remain pending.

Extend the existing isolated shadcn frontend when building the CRM slice. Use synthetic fixtures and a versioned `localStorage` adapter for leads, activities, follow-ups and assignment settings, behind service contracts. A created/changed lead must agree across list/detail/queue after refresh, and Reset Demo restores deterministic sample state. Storage errors must preserve form input and avoid false success. No backend, database server, paid integration or change to the existing planner/SQLite app.

Meta/Google intake is simulated with labeled incoming sample leads and source/campaign metadata, not live API subscriptions or public form deployment. Payment is a simulated staff-recorded receipt/milestone; no money moves. Operations coverage is a CRM handoff queue/status, not a booking or supplier-management implementation. Internal CRM is separate from future external agent/tour-operator experiences; no public traveler-centric portal in current scope. Contact identity remains under clarification.

## Alternatives and consequences

- Static images: fast visual discussion, but cannot demonstrate a newly created lead, assignment or follow-up consistency.
- In-memory state: supports clicks, but loses the review scenario on refresh.
- Local database/IndexedDB: possible later if browser storage needs grow; unnecessary for this small synthetic demonstration.
- Production backend/integrations now: outside user-authorized scope and premature before field/workflow review.

Local storage is a single-browser demonstration, not shared multiuser state or production permission enforcement. It contains synthetic data only. Existing demo identity/role switching remains simulated. Internal/external deployment and shared record architecture are still undecided.

## Revisit and verification

Revisit persistence if the client needs cross-device sharing, large datasets, real data or production integrations. For the mockup, verify create/refresh/list/detail consistency, filters/views, manual/automatic assignment, follow-up transitions and payment/handoff deduplication after the pending choices are resolved. Type/build/service and browser checks apply when code is implemented; root `npm test` remains a failing placeholder.

See [FB-007](../feedback/README.md), [review brief](../product/crm-client-review.md), [CRM module](../modules/crm/README.md) and [assumptions](../product/assumptions.md).

## Assignment follow-up

Selected-batch manager release and executive peer transfers are now implemented under [0006](0006-manager-lead-distribution.md). Earlier pending automatic-assignment details remain open for incoming intake only. Component reuse allows distinct manager/admin page layouts and navigation; UX review remains the priority.
