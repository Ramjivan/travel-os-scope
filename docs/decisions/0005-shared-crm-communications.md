# 0005: Shared internal lead and communication mockup

Date: 2026-10-06. Status: adopted slice under [FB-008](../feedback/README.md); defaults provisional, client review pending.

## Decision and context

User requests replacing Leads coming-soon one slice at a time, with WhatsApp/email/call-IVR mockups and reusable components across roles. Implement a connected list/detail/conversation/follow-up journey in the shadcn shell using [0004 local data](0004-crm-local-mockup.md). Sales has assigned scope; manager/admin shares components with team scope/owner selector. Neutral Primary contact/optional Organization avoid deciding the pending contact question.

Channels append simulated local activity only. Call states/timer do not connect telephony; WhatsApp/email do not deliver. Manually selected stage and ownership stay independent. Automatic routing and payment/ops handoff remain next review slices.

## Alternatives and consequences

Duplicating communication components for each role duplicates behavior; shared typed components keep the journey consistent. Role-specific pages may compose them differently, as clarified under FB-011 and decision 0006. Unconnected static channel images cannot demonstrate history/persistence; record-linked service contracts can. Real channel integrations exceed current UI-only scope and need later provider decisions.

Local storage/access are demonstrations, not production policies. Contact/role/stage defaults in [AS-010](../product/assumptions.md). No backend/schema/paid infrastructure. Dev/build use native Vite configuration loading on project Node 24 after observed Windows dependency bundling failure.

## Revisit and verification

Review client contact, access, lifecycle and channel workflow. Revisit adapter for authoritative identity, organization isolation, concurrency and provider connections. [CRM module](../modules/crm/README.md) records contracts, transient drafts, tests and browser checks. [FB-009](../feedback/README.md) records typography/profile polish.

## Assignment follow-up

Selected-batch manager release and executive peer transfers are now implemented under [0006](0006-manager-lead-distribution.md). Earlier pending automatic-assignment details remain open for incoming intake only. Component reuse allows distinct manager/admin page layouts and navigation; UX review remains the priority.
