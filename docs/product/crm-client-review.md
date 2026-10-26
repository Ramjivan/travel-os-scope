# CRM client review — discussion draft

Last updated: 2026-10-07. Status: **CRM and connected Ops/Accounts local mockups implemented; team review pending.** [FB-016](../feedback/README.md) resolves Accounts verification before Ops manager assignment and supersedes executive peer reassignment. [Current team walkthrough](operations-accounts-review.md) owns sheet mapping and meeting questions; earlier proposals below retain discovery context. Marketing and sales auto/settings/hygiene/targets remain deferred.

## Confirmed direction and boundaries

- Build an internal CRM-only interactive UI mockup first; fake seeded records plus created leads may persist locally across refresh. Adopted boundary: [decision 0004](../decisions/0004-crm-local-mockup.md).
- Internal sales CRM and future external agent/operator experiences are separate. User explicitly rules out a direct public traveler-centric/B2C portal plan; their use of B2C refers to travel agents handling leads. The earlier assistant interpretation of a public/direct-traveler segment is superseded. Whose contact is stored on an internal enquiry is still being clarified.
- Leads arrive through Meta, Google or manual form entry. Mockup uses labeled simulated intake; actual ad/form integrations are outside scope.
- Keep both manager manual assignment and automatic assignment options. Manager-selected release is an even split across executives (FB-010); incoming automatic routing/eligibility still needs clarification.
- Token/partial/full payment is the master-entry milestone. Sales submits evidence; Accounts verification releases Ops manager assignment (FB-016), now implemented locally. Payment does not confirm supplier services.
- Later provide agent/operator login and DMC management; shared records, organization ownership and deployment remain undecided.
- Client likes Salesforce-style lead management. [Official Salesforce research](../references/salesforce/lead-management-research.md) now provides factual patterns, but the client's exact configuration/screens remain absent.
- Login/dashboard/theme shell and the first shared CRM list/detail/channel/follow-up UI are implemented. No real database, payment, booking, advertising or communication integration. See [FB-008/009](../feedback/README.md).

- Managers work own leads, assign selections or release evenly. FB-016 owner meeting supersedes executive peer transfer: manager/admin-only reassignment is current UI/service behavior.
- UX is the current priority (FB-012). Reuse existing components; role-specific page layout/navigation/custom components may differ (FB-011).

- Lead timeline followbacks capture customer requests to reconnect later; quick/custom times and reminder previews are implemented locally (FB-013). Notifications are outside this UI slice.

## Provider flow walkthrough

This synthesis is outside factual vendor records. Arrows below organize pictured contexts; they do not prove every click or a completed transaction. Source files record exact evidence and gaps.

| Provider | Demonstrated contexts organized as a flow | Limits and relevance to this discussion |
| --- | --- | --- |
| [Mind DMC](../references/minddmc-ai/README.md) | Trip request → conversational questions/replies/night split → generated itinerary → enquiry or booking-entry screens; supplied customer PDF | Conversation is visible, later submission/payment/confirmation unshown. Useful context for a future itinerary handoff; internal lead ownership/follow-up not established |
| [Bingo Travel](../references/bingo-travel/README.md) | Hotel search → results → rooms → supplements → guest/fare/flight booking form; separate activity search/detail | Matching property/room context, click sequence partly unshown; completed payment/booking absent. Later service-selection context |
| [Nexus DMC](../references/nexus-dmc/README.md) | Leads/quote links → proposal list/detail; separate customization and flights/hotels/activities/visa/insurance views; separate confirmed flight trip with payment/ledger correspondence | Confirmed booking is a different record from pictured Dubai proposal. Full lead-to-booking transition unshown. Lead ownership, dates/status and latest quote are useful CRM references; wallet/inventory are later scope |
| [U&I Holidays](../references/ui-dmc/README.md) | Package search → room-night split-stay state → room/transfer/tour choices → dated service table → Proceed To Next control | Matching service/date contexts; actions and next stage unshown. Future itinerary-workspace reference, with different date variants retained |
| [Sembark](../references/sembark/README.md) | Trips/query list → New Query/contact/trip/team/comment fields → existing Trip Details with quote suggestions/tasks; separate accounting/usage views | Empty-query save and existing trip are not a proven creation sequence. Closest supplied internal enquiry/task context; lifecycle/permissions still unshown |
| [Salesforce](../references/salesforce/README.md) | User/client preference for lead management | Official lead/list documentation now researched; client-specific screenshots/configuration still absent |
| [TripboxCRM](../references/tripbox-crm/README.md) | Numbered landing illustrations: capture leads → build itineraries → confirm bookings → track payments | Marketing claims and sample cards, not an observed signed-in journey. Source/owner/follow-up illustration is relevant to CRM discussion; later itinerary, supplier/voucher and finance coverage stays outside the first CRM build |

These references do not require us to put all competitor modules into the first mockup.

Tripbox's promotional numbering does not establish when an initial deposit is collected. Our confirmed partial/full-payment milestone for operations handoff remains unchanged; later supplier confirmation and collection tracking retain separate states. The pictured `18% markup`, `60 sec` and finance amounts are vendor illustration values, not Travel OS requirements or fixtures.

## Proposed client demonstration

Story: simulate a Meta enquiry → assign automatically or through manager → salesperson records contact outcome and trip requirements → schedules follow-up → records simulated partial payment → enquiry becomes eligible for operations handoff. A second manual enquiry demonstrates the other intake/assignment path. Contact identity, routing and verification remain pending; these are proposed mechanics.

| Surface | Client review question | Candidate controls |
| --- | --- | --- |
| Leads | Can staff find and prioritize the right enquiries? | Named/pinned saved views; search; filters panel; sortable/configurable columns; row/bulk assignment; New Lead; optional Table/Kanban toggle |
| Lead detail | Is customer/trip context, progress and next action easy to understand? | Compact identity/trip header; stage indicator; Activity and Details; notes/contact outcomes; follow-up; source/campaign; simulated payment summary |
| Follow-ups | Does today's work clearly separate overdue, due today and later? | Work list with selected-record detail; owner/due time; complete/reschedule; linked lead |
| Assignment | Can a manager control intake ownership? | Manual assignment plus automatic mode/rule settings; preview/test with synthetic incoming leads; visible assignment history |
| Ready for Operations | Is the payment-based sales handoff clear? | Received payment amount, partial/full state, trip context and handoff status; no real booking or supplier workflow |

### Salesforce patterns to adapt

[Research sources](../references/salesforce/lead-management-research.md) describe Leads as early enquiries, Opportunities as qualified deals, and Activity/Details/Chatter/Related record tabs. They describe named/pinned lists, adjacent filters, displayed-column controls, inline/bulk edits, Table/Kanban and activity priorities.

Recommended first-review adaptation: Leads as the main enquiry workspace, saved My Leads/Unassigned/Today's Follow-ups/Overdue/Payment Received views, a details/activity record layout, and a small handoff queue. Status updates must have clear actions/validation rather than decorative buttons. Table is the primary dense work view; Kanban is an optional alternate of the same filtered records.

Defer a separate Opportunities module and Salesforce-style account/contact conversion for this first CRM review. This is a scope recommendation, not a claim that Salesforce converts leads on payment. Chatter-like collaboration, real email/dialing, cadences and chart builders are also later choices. Keep our travel enquiry, payment and handoff states separate even when displayed together.

## Candidate lead information and lifecycle

- Identity: stable enquiry ID, contact name, phone/email; company/agent fields only if the pending contact answer requires them. Contact person and traveling passengers remain distinct concepts.
- Intake: Meta/Google/Manual source, received timestamp, illustrative campaign/form metadata and intake method. Source and contact type are separate fields.
- Trip: destination(s), dates or flexible date, duration, adults/children, budget/currency, preferences.
- Sales: owner/team, status, priority, last contact, next follow-up, notes/history and loss reason when closing lost.
- Later sales milestone: simulated payment amount/date/method/note with partial/full state and separate ops handoff status. No bank/card credentials or real traveler/payment data.
- Proposed capture requirement: contact name and at least phone or email; incomplete trip requirements may be added later. Final requiredness awaits review.

Suggested table columns: Enquiry/contact, Destination, Travel date, Source, Owner, Status, Next follow-up, Last activity; payment/handoff columns available when useful. Company/customer-type fields remain conditional proposals.

Proposed path: **New → Contacted → Qualified → Proposal Shared → Payment Received**; **Nurturing** and **Closed Lost** as alternate outcomes. Exact labels, quoting boundary and intermediate stages remain unapproved. Proposal Shared means manually recorded sales progress in this mockup, not an implemented itinerary/pricing/send feature. Ownership/assignment is independent from lifecycle.

User confirms partial or full payment leads to operations for booking. Separate examples: lead sales milestone Payment Received; payment Partial/Full; handoff Ready/Sent/Received if adopted; booking remains unconfirmed. Do not force Salesforce's Lead → Opportunity conversion into this process or mark a booking confirmed from payment alone. Verification/dispatch choice is pending.

## Clarified contact scope and remaining questions

Earlier answer was “both travelers and travel agents/tour operators”. The user's follow-up distinguishes internal CRM from external systems and says no public direct-B2C plan. Accordingly, do not promote the earlier suggested Direct traveler/Agency customer selector to a requirement. Remaining identity question: does an internal enquiry store the traveler contact, the agency contact, or either? No public traveler login is being proposed in any option.

### Follow-up questions asked on 2026-10-06

1. Lead contact: traveler or agency depending on enquiry; agency contact only; or traveler contact internally with agency lead handling in their separate later CRM?
2. Automatic assignment: round-robin among available salespeople; destination/team matching then round-robin; or source-to-salesperson mapping?
3. Payment handoff: immediately appear in ops queue; manager verifies then dispatches; or salesperson manually dispatches after recording payment?

Question 2 is resolved for selected batch; immediate auto/manual/batch settings are required under FB-016, with intake eligibility/fallback pending. Question 3 is resolved: Sales evidence → Accounts verification → Ops manager assignment. Contact identity and exact production permission/release exception rules remain open. Layout/fields and actual team feedback remain later refinements.

## Synthetic demo scenarios

Use an incoming Meta Bali enquiry, a Google enquiry and a manually created enquiry; received source/campaign information is simulated. Proposed contact Asha Mehta is synthetic and its contact role remains pending. Illustrative requirements: two adults/one child, five nights, flexible November travel; ₹1.5 lakh budget is a sample requirement, not a travel quote. Demonstrate assignment override, note/history, next follow-up, simulated payment and the chosen handoff mechanism once clarified.

Seed additional unassigned, overdue, nurturing and lost enquiries. Keep fixtures resettable, input errors recoverable, and changes consistent across views after refresh. No real calls, messages, ads, payments or bookings. Agent/operator login screens are excluded from this review.

## Intended client review output

After the follow-up answers, prepare the connected CRM mockup in the existing shell with synthetic local data: list → lead detail → follow-up, both assignment modes and simulated payment/ops handoff. The client should react to field relevance, work priorities, lifecycle, visibility and how quickly staff can do the job. Agent portal/DMC planning stays outside this first review.

Current delivery includes [CRM](../modules/crm/README.md) and [connected internal Ops/Accounts mockups](operations-accounts-review.md), official Salesforce research and this proposal brief. Manager own/team/manual/batch release remains; peer transfer is superseded. Payment handoff now works locally; incoming auto/settings, targets, quotation builder and live integrations remain deferred. Building does not establish client validation.

## Itinerary workspace discussion — FB-014

Later update FB-016: post-payment Ops/Accounts workspace is now built; the itinerary builder, template/blank/document-rebranding methods and pre-payment quotation work below remain proposals. Verification is resolved by Accounts gate; older pending statements here describe the FB-014 discussion date.

Status: **proposed, discussion only**. The user asks what to add next and whether an itinerary builder belongs in CRM or elsewhere. No app UI or service behavior changes are authorized in this discussion. This recommendation is not an adopted portal or production architecture decision.

Recommended UX: a dedicated **Itineraries & Proposals** workspace inside the internal app, entered through **Create proposal** on a lead and accessible from a proposals list. Keep the lead as the relationship/activity/followback workspace; use a full page for trip planning, service selection and pricing. The lead would show linked proposal alternatives, latest version/status and timeline events, with a route back from the builder. Reuse the existing shell and communications components. Later external agent/operator and DMC experiences could reuse builder components with their own layouts and visibility rules; this does not establish shared production deployment or data access.

Keep three concepts distinct: itinerary describes the trip, quotation describes the commercial offer, and booking/operations records supplier fulfillment. Proposed alternatives and revisions belong to one lead; retain the shared version when editing a subsequent draft. Neither a proposal acceptance nor payment should imply supplier confirmation. These concepts align with the [proposed domain model](domain-model.md), not a committed database schema.

| Reference pattern | Proposed adaptation | Evidence boundary |
| --- | --- | --- |
| [U&I dated service table](../references/ui-dmc/screens/01-table-planner.md) | Staff matrix with date, stay, transfer, activities and meals; selected-cell service editor; separate customer day-card preview | Add/remove controls are pictured; their resulting behavior is unshown |
| [Nexus customization and warnings](../references/nexus-dmc/screens/08-customize-trip-workspace.md) | Stay/room/meal/service details, contextual missing-information/date warnings and actionable review before sharing | Exact hotel-consistency rules and enforcement are unverified; define our own review rules before implementation |
| [Mind DMC generated itinerary](../references/minddmc-ai/screens/04-itinerary-and-pricing.md) | Guided trip clarification, template/draft start and customer preview; any later AI assistance clearly simulated and reviewed | Generated text/prices do not prove authoritative live availability, supplier pricing or booking |

Proposed first journey: lead requirements → start from template, blank day plan or imported document → review/edit content and services → review sample cost/markup/customer price → customer preview → simulated share saved as a version → linked lead timeline and followback. Include explicit inclusions/exclusions and draft gaps. Synthetic service choices/prices only; no live inventory, external sending or AI integration. Pricing visibility and review requirements need discussion before implementation.

Suggested UX order: trip requirements/qualification and connected proposals first; then alternatives/version comparison and contextual warnings; followback reschedule/cancel and manager pipeline/loss reasons as CRM refinements; simulated payment and operations handoff after the existing verification/dispatch question is answered. Inventory marketplaces, wallets and full DMC operations remain later scope.

User answers (2026-10-06): **either team, with an assigned quotation owner**, and **all three starting methods**. PDF or Word competitor proposals may be received and rebranded; a blank day plan allows hotel, flight and activity selection. Internal operations is responsible for actual booking, and the user proposes a separate operations login/view showing leads and the percentage of payment received. The existing Operations demo identity already provides a shell; the payment-aware lead/booking workspace is not implemented. This remains discussion only; client validation and workspace placement are pending.

Proposed UX refinement: keep sales lead owner, quotation owner and later operations owner distinct. An operations workspace could offer a quotations queue for pre-payment assistance and a booking-work queue for paid/handoff-eligible trips. Whether operations assists with service selection/costing before payment is still being clarified; do not implement that queue or treat it as confirmed. Partial/full payment is already the confirmed handoff milestone, while verification and manual versus automatic dispatch remain unresolved.

Proposed document route: source PDF/Word → draft preview with editable agency branding, content, price, inclusions and terms → reviewed customer version. Keep the original source internal and preserve the reviewed output version. Rebranding produces a proposal, not supplier availability or confirmation. Automatic extraction into editable days versus document-only rebranding, layout fidelity and supported file formats remain unspecified; a future UI slice must label simulated import clearly.

Proposed operations columns: lead/trip, travel date, sales owner, quotation owner, operations owner, selected proposal, agreed total, received amount and percentage, balance, next payment due and booking/service progress. Example only: agreed ₹200,000, received ₹60,000, **30% paid**, balance ₹140,000; no assumed minimum payment percentage. Percentage should refer to the selected agreed offer, separately from supplier booking progress. A revised offer/refund/verification policy still needs definition.

Follow-up asked: does operations also select/cost services before payment, or begin only after payment? The former would separate quotation work from booking work within the operations experience. No application changes made.
