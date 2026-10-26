# Product brief

Last updated: 2026-10-23. Status: workspace foundation, CRM, connected internal Ops/Accounts and initial internal DMC pilot implemented locally; wider modules remain proposed. The client SOW is a review draft, not an approved implementation baseline.

FB-034 now authorizes evaluating the provided B2B screens and starting a Sembark-style UI with SQLite. [Evaluation](b2b-flow-evaluation.md) finds the internal agency→query→quote→booking→services/payment/docs structure coherent. [Internal DMC pilot](../modules/dmc/README.md) implements that first journey with synthetic persistence. FB-037 partly confirms internal team ownership under AS-022; voucher/financial defaults remain provisional under AS-023. External-agent identity, pricing, credit, inventory and settlement remain open; no Sembark login occurred.

Current phase: [Ops/Accounts team demonstration](operations-accounts-review.md) following client sheets and owner meeting. The user authorizes connected internal mockups now, Marketing later, without further questions this turn. [Decision 0007](../decisions/0007-payment-operations-mockup.md) adds verified receipts, separate Ops ownership, service/document/voucher work and simulated Accounts payables to existing CRM. [0004](../decisions/0004-crm-local-mockup.md) retains synthetic local persistence; factual references stay separate. Actual team validation, incoming routing, tax/profit/target calculation and production access remain open.

## Confirmed from the user

- FB-059 (2026-10-23): Admin/CXO reporting access supports natural-language AI reports across available authorized data, follow-up prompts, tables/charts and saved reusable templates. The [SOW reporting scope](../client/travel-os-sow-v0.1.md#18-reports-documents-and-data-ownership) includes current-data refresh across delivered phases, with record/field/organization permissions. Client wording states capabilities without underlying tool or technology names. Supported visual/export formats, metric definitions and template permissions remain to agree; no app implementation or technology selection.

- FB-057 (2026-10-23): prepare a detailed client SOW and freeze scope through review/sign-off. The owner confirms Phase 1 complete B2C including accounting, lead ingestion, itineraries, flight/hotel APIs and offline contracts; Phase 2 internal Bali B2B DMC; Phase 3 third-party B2C travel agencies only. Latest correction excludes third-party B2B DMC use. Budget INR 21,00,000 with four 25-percent payments; overall delivery three calendar months from advance receipt; project IP transfer after completion and full payment. [SOW draft/status](../client/README.md) separates these confirmed directions from detailed proposed behavior and pending provider/policy/tax/legal fields. Existing application behavior remains unchanged; no client scope sign-off or architecture adoption.

- FB-056: evaluate how many standard Frappe apps can be reused and extended for Travel OS. [App reuse map](frappe-standard-apps-evaluation.md) identifies ERPNext/CRM as initial candidates, Helpdesk/Insights as optional additions, HR/Drive/Learning as later needs and Builder for optional websites. Framework features and ERPNext modules are distinguished from separate apps. Official CRM handoff, WhatsApp dependency and Sales Hierarchy are verified in docs; combined deployment/permissions remain AS-027. No adoption, installation or app change.

- FB-053: evaluate whether ERPNext inventory can support expiring offline hotel/airline inventory. [Evaluation](erpnext-travel-inventory-evaluation.md) finds partial batch/reservation/simple-price reuse; travel-date capacity and supplier release/hold rules require additional travel logic. Actual contract guarantees/accounting remain AS-028. Evaluation only, no inventory implementation/adoption.

- FB-052: research community travel-industry apps/plugins for ERPNext/Frappe. [Shortlist](erpnext-travel-apps-research.md) identifies a commercial tours candidate and limited public travel/hotel examples; their published features do not establish our workflow/permission/accounting fit. No add-on or backend adoption.

- FB-051: accounting is a core future area; evaluate ERPNext, Frappe-only and headless/custom UI architecture, possible Tally/other accounting integration, roles/access, AI development/MCP and email/WhatsApp fit. [Evaluation](erpnext-frappe-evaluation.md) and [proposed decision 0013](../decisions/0013-travel-accounting-backend-evaluation.md) record researched capabilities and conditional recommendations. The incumbent package/version, authoritative books, tax/recognition policy and backend adoption remain AS-025–027; no production backend or integration is selected/installed.

- FB-042/043: discuss a Sales day-wise itinerary builder with manual creation, AI import, future real airline/hotel price lookup and badges distinguishing offline contracts from API rates. B2C and B2B/DMC must have separate URLs; DMC pilot should not appear in B2C. [Builder plan](sales-itinerary-builder-plan.md) and [entry separation 0012](../decisions/0012-b2c-b2b-entry-separation.md) distinguish confirmed direction from proposed UI/provider/hosting choices. Discussion only: the current DMC sidebar/link and shared hash-router implementation still exist.

- FB-038: the Bali two-team description is firm-specific. Record a flexible users/roles approach where assigned roles determine available UI components and actions; review architecture key points before implementation. [Proposed decision 0011](../decisions/0011-configurable-users-roles-and-permissions.md) separates this direction from unapproved permission mappings, backend/scoping details and schema. Current role cards and authorization behavior remain unchanged.

- FB-037: Bali B2B DMC has two main teams, Ops and Accounts. Ops handles agency outreach, queries, quotations/negotiations and actual bookings; Accounts handles incoming/outgoing payments. Travel-event contacts are put in a sheet and divided among Ops. Once the deal is locked and token received, Ops searches for the cheapest actual booking options and books/updates them. [Team overview and chronological flow](bali-dmc-team-flow.md) records the explanation and remaining policies. This clarifies the Bali process; the separate CRM/B2C Sales handoff below is not automatically applicable. Documentation only; current demo roles and booking gates are unchanged.

- FB-036: separate DMC login and dummy role credentials, including Admin and Accounts. `#/dmc/login` now offers those plus Sales, Reservations and Operations; protected DMC links return after sign-in. CRM/B2C remains separate. Exact access rules and additional roles remain AS-024; [decision 0010](../decisions/0010-separate-dmc-demo-login.md).

- FB-023/024: observe Sembark without changing records, with visible exploration and continuing navigation/layout/flow documentation for B2B/DMC planning. Familiar structure is the requested starting direction; employee-reported sufficiency remains AS-021. [Discovery brief](sembark-b2b-dmc-discovery.md) retains evidence and gaps; FB-034 separately authorizes the initial implementation above. FB-033 prohibits login/session restoration without fresh permission.
- FB-020/021: free team feedback with optional area marking, text/voice, locally stored comments/audio and reviewer-led iteration. UI uses comments/suggestions wording; record the submitter name/team and selected demo identity/role. [Review module](../modules/review/README.md) implements the shared control and local inbox; [options/history](preview-feedback-options.md) retain vendor comparisons. Verified identity and production hosting remain open.
- Combine CRM, an MMT-style B2B portal, a third-party agent booking portal, and DMC functionality.
- Use Salesforce's lead management and filtering as a reference.
- Examine Nexus DMC, U&I DMC for Bali, and MyValue for Maldives and Mauritius as DMC references. Names and destination associations were supplied by the user; portal functionality remains unverified.
- Include IVR, WhatsApp, and AI integrations.
- Include an AI-assisted itinerary builder, with `minddmc.ai` as a reference.
- Begin with functional UI and sample data, refine through client feedback, then build and connect the backend.
- Maintain page/module documentation and reusable reference screenshots alongside persistent AI working guidance.
- Expect the team to propose initial flows rather than receive a complete specification.
- Start CRM development; compare Astryx and shadcn, then use shadcn (selected by the user for perceived maturity and testing).
- First deliver light/dark themes, dashboard side navigation and role buttons below login that fill dummy credentials; discuss detailed UI after this foundation.
- Internal CRM is separate from future external systems; no public direct traveler-centric portal is planned now. User clarifies B2C as agents handling leads; internal lead contact identity is under clarification.
- CRM demo may use fake data/local persistence; intake is Meta/Google/manual, both manager and auto assignment are required, and partial/full payment triggers an operations handoff milestone. Actual integrations/payments/booking remain outside mockup scope.
- Current screenshots are enough for initial understanding; brainstorm the provider flows and ask questions to prepare a Salesforce-style internal CRM-only client mockup. Separate agent/operator login experiences and DMC management are later expansions; exact deployment and shared-data boundaries are undecided.

- Managers work own leads, manually assign single/batch leads and release selections evenly (FB-010). Owner meeting under FB-016 narrows reassignment to manager/admin; executive peer transfer is superseded. Configurable immediate auto, selected-batch and manual release are required; immediate routing/settings remain unbuilt.
- UX is the current priority. Reuse existing components (WhatsApp/email/call/forms); manager/admin page layouts and navigation may differ, with new specialized components as needed (FB-011/012).

- Lead timeline includes customer-requested followbacks alongside internal notes (FB-013): agreed time/channel and visual reminder only, no notification delivery.

- Itineraries can start from template, blank hotel/flight/activity plan or received PDF/Word rebranding; quotation owner may be in either team. These builder methods remain unbuilt. Operations handles post-payment booking, now demonstrated locally; pre-payment quotation involvement remains open. See [FB-014 discussion](crm-client-review.md#itinerary-workspace-discussion--fb-014).
- FB-016: Sales/Marketing creates master entry after token/partial/full payment; Accounts verification gates Ops manager assignment. Ops handles services/documents/balance/vouchers/travel support, with selected remarks shared to Sales and detailed pricing restricted. Marketing UI/campaigns later; Ops/Accounts now authorized and implemented as mockups.

## Recommended product structure

Internal staffing: Nishant admin, Aishwarya/Mahima sales managers, Rikit/Mathew/Disha/Paji executives, **Babita Ops manager (FB-017)**, Pramod Sharma Accounts. Additional unnamed Ops manager/executive identities remain synthetic review examples. These are demo identities, not real credentials.

B2C and B2B/DMC entry URLs must be separate under FB-043, with no DMC pilot tab in B2C. Shared code/components are a recommendation; shared business records/backend remain AS-002. Whether an eventual MMT-style B2B storefront and external agent booking area share a workspace is a separate unresolved question; this user correction does not settle that internal B2B boundary. See [0012](../decisions/0012-b2c-b2b-entry-separation.md).

| Area | Proposed users | Responsibility |
| --- | --- | --- |
| CRM | Sales, team leads | Lead capture, list views, filtering, assignment, follow-ups, activity history |
| Itineraries and quotes | Sales, DMC specialists | Trip requirements, day plans, hotel/service options, pricing, quote versions, proposal previews |
| B2B agent workspace | Agency administrators and staff | Search offers, request custom trips, view agent pricing, submit and track bookings |
| DMC operations | Operations, contracting | Supplier confirmations, hotels, transfers, activities, rooming lists, vouchers, trip execution |
| Communications | Sales, support, operations | Shared conversations, IVR/call events, notes, reminders, AI summaries |
| Finance and administration | Finance, managers, administrators | Receipts, balances, reconciliation, margins, roles, reports |

This is a logical module map, not a commitment to microservices or a particular deployment stack. Shared records prevent three disconnected versions of the same trip or booking.

## First demonstration

Review the [connected internal Ops/Accounts walkthrough](operations-accounts-review.md) and separate [DMC pilot journey](b2b-flow-evaluation.md#review-tasks). First-payment evidence → Accounts verification → manager assignment → service/documents/balance/voucher/travel is implemented locally. The DMC catalog quote builder is implemented separately; earlier template/import/AI methods, Marketing, external agents and cross-module linkage remain proposals.

Use one synthetic Bali trip, one salesperson, one external agency, and one operations user. Walk from a lead through an itinerary and quotation to an agent booking request and supplier confirmation. Then review that same booking from each permitted role.

Lead management is the first screen set: searchable lists, combinable filters, saved views, sorting, columns, assignment, lead detail, activities, and next follow-up. Proposed filters include owner, team, stage, source, destination, travel date, budget, last activity, and overdue follow-up. These are proposed Travel OS controls, not claims about an inspected Salesforce screen.

After a reusable Bali flow works, use Maldives resort/meal/transfer choices and Mauritius multi-service trips to challenge the model. Destination-specific rules must be validated with the client's operations team.

## Important scope questions

These questions guide discovery; they do not block preparing the first reference analyses and CRM prototype specification.

1. Are the B2B storefront and third-party agent area one workspace or separate businesses?
2. Does the first release sell hotels only, land packages, flights, or combinations? What needs an API and what can be on request?
3. Which roles need supplier costs, margins, agent markups, credit limits, and branch access?
4. Are bookings instant, on request, or both? What event confirms a booking?
5. What agency credit/wallet/payment arrangements and cancellation rules exist?
6. What supplier inventory, tax treatment, currency policies, and contracts are already available?
7. Which IVR and official WhatsApp providers/accounts are available, and which approved APIs can the team access?
8. Does AI only assist staff, or also interact directly with agents/customers? Which external actions require review?

## Scope discipline

Track material working premises and their validation in the [assumption register](assumptions.md). The [current-state handoff](../development/current-state.md) identifies the next useful work and pending decisions.

The existing planner is a useful input, not an agreed production specification. Its default "Needed Now" labels, named vendors, tax figures, and timeline suggestions are not automatically confirmed requirements. Validate them before using them in implementation or estimates.

Keep broad flight/GDS connectivity, production accounting implementation and autonomous booking outside the current UI slice. Full accounting is a user-confirmed future core area under FB-051; its [backend feasibility evaluation](erpnext-frappe-evaluation.md) is researched separately. Review the connected Ops/Accounts journey and accounting examples before widening implementation.
