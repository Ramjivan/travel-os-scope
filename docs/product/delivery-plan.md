# Delivery plan

Status: proposed starting sequence, without a committed timeline. See [the initial decision](../decisions/0001-prototype-first.md).

**2026-10-23 scope planning update — FB-057:** The owner now specifies an overall **three-calendar-month period from advance receipt** for a full project: Phase 1 complete B2C with accounting, ingestion, itinerary/API/contracts/fulfillment; Phase 2 internal Bali B2B; Phase 3 third-party B2C use only. Four 25-percent payments total INR 21,00,000. [Draft SOW](../client/README.md) carries the proposed detailed requirements, UAT and freeze decisions. Its internal month allocation is a proposal, while the overall period and phase order are owner instructions. Provider access, policies, quantities and client sign-off remain open. Earlier prototype delivery sequence below is historical context, not the new commercial schedule; no production build is authorized or claimed by drafting the agreement.

FB-051 (2026-10-09): [ERPNext/Frappe/accounting evaluation](erpnext-frappe-evaluation.md) investigates the user-confirmed core accounting direction, custom UI, permission/AI/MCP and email/WhatsApp/Tally options. [0013](../decisions/0013-travel-accounting-backend-evaluation.md) proposes one fictional-trip accounting/access/recovery slice before backend adoption. Determine incumbent software/version and authoritative books, then Accounts/CA validates recognition/tax/currency and balances. No setup, migration or production integration starts from this research; current quick UI mockup preference remains.

FB-042/043 (2026-10-09): [Sales itinerary plan](sales-itinerary-builder-plan.md) proposes manual dated days/stays → sample source-aware rates/quote/customer preview → reviewed simulated AI import → accepted Sales handover → separately scoped real search/reprice adapters. [0012](../decisions/0012-b2c-b2b-entry-separation.md) records the confirmed separate B2C/B2B URL boundary and removal of DMC navigation from B2C; exact addresses and implementation are still proposed. This task is discussion/documentation only, not an itinerary build or portal-routing change.

FB-038: before implementing configurable roles/permissions, review [0011](../decisions/0011-configurable-users-roles-and-permissions.md). The Bali two-team setup is firm-specific; user-role assignments should drive UI/actions through a reviewed access model. Permission mappings, record scope, backend enforcement and administration remain proposed. Documentation only; no role implementation starts from this note.

FB-037 documents [Bali's two-team flow](bali-dmc-team-flow.md): combined Ops commercial/booking work and Accounts incoming/outgoing payments. Before the next Bali workflow implementation, review agency-contact intake/allocation, the combined Ops journey and locked-deal-plus-token actual-booking trigger. Exact acceptance/payment/permission rules remain open; this clarification changes documentation only, not the existing demo roster or gates. Keep the separate CRM/B2C handoff below scoped to that workflow.

FB-036 adds separate DMC demo login/session and direct-link return, before broader DMC role/access design. Five internal role cards and useful home destinations are implemented; shared pilot access is still a review default. No external-agent portal or production identity implied. See [0010](../decisions/0010-separate-dmc-demo-login.md).

Current step (2026-10-07): [Ops/Accounts team review](operations-accounts-review.md). FB-016 authorizes building these internal mockups now; Accounts verification gate resolves the previous handoff question. Connected Sales receipt → Accounts review → Ops assignment → service/documents/balance/voucher/travel work and simulated supplier payments are implemented. Manager/admin-only reassignment supersedes peer transfer. Marketing, incoming auto/settings/hygiene/targets, CRM-linked/template/import quotation builder and actual integrations remain later work; no team validation claimed.

## 1. Capture reference evidence and one workflow

FB-034 (2026-10-08): [evaluate saved B2B/DMC evidence](b2b-flow-evaluation.md) and implement a separate [internal DMC pilot](../modules/dmc/README.md) with SQLite. First catalog quote/booking/confirmation/receipt/voucher journey is delivered for review; no external-agent access or existing CRM handoff integration. This advances the earlier discovery-only status. Sembark login remains restricted under FB-033.

- FB-023/024 adds [Sembark structure discovery](sembark-b2b-dmc-discovery.md): visible observation documents navigation/grouping/layout and safe connected views with source-linked proposals. Deeper coverage/team validation remain pending; the walkthrough never authorized record changes or production business rules. Initial implementation is separately authorized under FB-034 above.
- Start with Salesforce lead list, filter panel, saved views, and lead detail/activity screenshots.
- Add an itinerary/quotation flow and an agent booking flow, followed by DMC confirmation screens.
- Document what is visible, the user's task, useful patterns, unknowns, and proposed Travel OS behavior.
- Agree a minimum role/access matrix and preliminary state/pricing rules from [the domain model](domain-model.md).
- Keep assumptions explicit and prioritize them by impact rather than sending the client an exhaustive questionnaire.

Exit criterion: a screen/flow inventory and acceptance scenarios for the first connected demonstration. Evidence can continue arriving during implementation.

## 2. Build a functional prototype with sample data

The isolated React + TypeScript + Vite frontend with Tailwind and shadcn Radix components is adopted for the shell in [decision 0003](../decisions/0003-demo-workspace-shell.md). After review, build reusable list/form/detail patterns and connected journeys behind mock service contracts. The planner remains separate; production hosting/backend decisions are open.

Recommended slices:

1. CRM leads: filters and saved views; detail, assignment, activity and follow-up.
2. Itinerary/quote: assigned quotation owner; template, blank day plan or PDF/Word rebranding; hotel/flight/activity choices, sample pricing, revisions and preview. These starting methods/ownership are user-confirmed under [FB-014](crm-client-review.md#itinerary-workspace-discussion--fb-014); import mechanics and pre-payment operations involvement remain pending. Sample AI assistance remains a later candidate.
3. Agent workspace: agency-scoped offers/quotes, booking request, status and document preview.
4. DMC operations: incoming request, per-service confirmation, unavailable service/replacement, voucher preview.
5. Communications: simulated call/message events, linked timeline, suggested summaries and extraction.

Finish the first end-to-end journey before widening each module. Within a declared slice, every visible action should behave meaningfully. Keep unavailable future actions clearly explained. A simulated send creates an auditable sample message; a simulated booking changes shared records; a reset restores the same starting dataset.

Internal Operations is distinct from later external DMC: it now demonstrates verified-payment handoff, manager assignment and executive trip work. Accounts verification precedes release; token/partial receipt can start Ops. Pre-payment quotation involvement and the CRM-linked/template/import builder remain open; the separate DMC catalog builder is implemented under FB-034; no full-payment gate is assumed for starting Ops. Full collection for vouchers is only a provisional review rule.

Exit criterion: client can complete the journey, records remain consistent across workspaces, error/access cases are demonstrated, and the affected module docs accurately explain behavior.

## 3. Review and iterate continuously

FB-021 adds an implemented [review widget and local inbox](../modules/review/README.md) on all preview pages. Team members can submit general or marked text/voice with their name/team and selected demo identity/role. The user reviews local issues here and requests improvements; pending/in-progress/needs-clarification/ready-to-recheck/resolved states preserve original feedback separately from reviewer notes. No automatic chat submission or client validation is implied.

Demonstrate tasks rather than isolated screenshots: find an overdue Bali lead, change its owner, revise the itinerary, compare a quote, request booking, handle one unavailable hotel, and confirm the revised services.

Record feedback with screen/flow, expected behavior, priority, evidence, and validation status. Update the related module docs and acceptance scenarios in the same change. Review both visual design and operational correctness. Mark a flow validated only after actual client review.

Use small, coherent changes and frequent reviewable commits. Do not declare the whole UI "final"; stabilize a slice while others continue evolving.

## 4. Check integration feasibility alongside the prototype

Investigate provider/API availability, sandbox access, data shapes, confirmation behavior, and contractual access early enough to catch blockers. This can be read-only research or a narrowly scoped sandbox spike, separately authorized where external actions are involved.

Focus on WhatsApp/IVR, contracted vs API rates, agent credit/payment rules, and AI grounding. Avoid promising a connection because another portal displays a feature. Use official provider documentation; screenshots do not establish API access.

Exit criterion: the first production slice has a viable integration path and its known constraints are reflected in the UI and estimates.

## 5. Implement production behavior in slices

Use validated flows and domain contracts to design migrations, database constraints, APIs, backend role/organization enforcement, and audit records. Replace one mock adapter at a time and run the same acceptance scenarios against it.

Start with core records and permissions, then quotation/pricing/versioning, booking/supplier lifecycle, and communications/payment adapters according to priority. Choose a modular application with a relational database as an initial architecture candidate; split services only when actual operational needs justify it.

Add meaningful automated checks for monetary calculations, invalid transitions, organization isolation, quote snapshots, repeated requests, provider failures, and reconciliation. Provider success, booking confirmation, payment receipt, and generated AI text require independent evidence.

## First prototype acceptance scenarios

- Combine destination, owner, stage, and overdue filters; save a view; reopen it and see the expected leads.
- Assign a lead, add a note and follow-up, then observe the updated list and timeline.
- Create/edit a draft itinerary, select services, price a quote, and retain earlier quote revisions.
- Submit the selected quote as the correct agency; show the same request in internal operations.
- Mark one supplier unavailable, propose a replacement, and reprice/review before confirmation.
- Switch to another agency and demonstrate restricted records and cost visibility.
- Simulate AI/service errors with useful recovery; show that sending and booking are sample actions.
- Reset the demo and reproduce the starting journey.

The exact screen order and acceptance rules remain subject to reference evidence and client feedback.
