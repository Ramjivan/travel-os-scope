# Bali B2B DMC — team overview and working flow

Updated 2026-10-08. Source: the user's description in FB-037. This records the usual Bali DMC process as reported by the user; it is not a newly observed Sembark walkthrough. Detailed exceptions and access rules are still open. Documentation only: no application behavior or business record changed.

FB-038 clarifies that this staffing/flow belongs to this particular firm. Travel OS must support different organization structures. [Architecture review 0011](../decisions/0011-configurable-users-roles-and-permissions.md) records the proposed user/role/permission approach and UI/action access checks for review before implementation; the two-team example is not a universal role model.

## Business and team overview

The Bali DMC receives travel enquiries from travel agencies or agents, prepares and negotiates packages, and arranges the actual services after the deal is locked and a token payment is received. The agency/agent is the business customer. Hotels, transport providers and activity suppliers provide the services being arranged.

There are two main working teams:

| Team | User-described responsibility |
| --- | --- |
| Ops | Handles both sales and operations: agency outreach, enquiries, query creation, quotations, negotiation, finding the cheapest booking options, making actual bookings and updating them |
| Accounts | Manages both incoming payments from agencies/agents and outgoing payments to suppliers |

Sales and operations are functions within the Ops team's journey here. The earlier separate Sales and Reservations demo cards do not establish separate departments in this business. Admin is a current demo identity; its actual responsibilities and permissions were not described in this clarification.

## Usual chronological journey

| Step | Work and result | Team |
| --- | --- | --- |
| 1. Collect agency contacts | Contacts gathered at travel events are added to a sheet | Collection and sheet-entry owner not specified |
| 2. Divide contacts | The contacts are divided among Ops team members | Allocation method and person responsible not specified |
| 3. Introduce the DMC | Ops contacts the agencies and tells them about the DMC | Ops |
| 4. Receive an enquiry | An agency/agent asks for a trip or package. Ops creates a query for that enquiry | Ops |
| 5. Quote and negotiate | Ops prepares quotations and negotiates with the agency/agent | Ops |
| 6. Lock the deal and receive token | The package is locked and a token amount is received. Both are the user-described trigger for the next stage | Ops handles the agreement; Accounts manages the incoming payment |
| 7. Find booking options | After that trigger, Ops looks for the cheapest options for the actual bookings | Ops |
| 8. Make and update actual bookings | Ops makes the supplier bookings and updates their details/status | Ops |
| 9. Manage payments alongside booking work | Accounts manages the remaining incoming payments and outgoing supplier payments | Accounts; precise instalments and timing not specified |

**Flow:** travel-event contacts → sheet → allocation to Ops → agency introduction → enquiry/query → quotations and negotiation → locked deal + token received → cheapest booking options → actual supplier bookings and updates, with Accounts managing incoming/outgoing money.

This is a usual sequence, not a claim that every enquiry comes from a travel event. The user explicitly describes queries arising from agencies/agents; other acquisition sources and exception paths are not yet specified.

## Important distinctions to preserve

- **Agency contact versus query:** an event contact exists before a specific trip enquiry. Introducing the DMC to an agency does not by itself mean there is a query or booking.
- **Quotation versus actual booking:** the negotiated offer comes first. Actual supplier selection and booking work follows the locked deal and token receipt. Quoted amounts/options and actual supplier purchases need to remain distinguishable.
- **Agreement versus payment:** locking the deal and receiving the token are two facts. The user describes both as prerequisites for actual booking work; the exact recording/verification procedure is not yet defined.
- **Incoming versus outgoing:** agency/agent → DMC is incoming; DMC → supplier is outgoing. Receiving money does not establish a supplier confirmation, and arranging a booking does not establish that its supplier has been paid.
- **Continuous Ops ownership:** Ops performs the commercial and booking work. A compulsory handoff from a separate Sales department to Ops is not part of the described Bali team structure.

These distinctions organize the user's explanation for product design; they are not finalized record types, status names or database rules.

## What this suggests for our UI

Proposed next review: give Ops a connected path from assigned agency contacts and follow-ups into query/quotation work, then actual supplier bookings. Give Accounts clear incoming and outgoing queues linked to the same trip. Keep the accepted offer visible alongside actual supplier costs and booking updates, so teams can see what was agreed and what has been arranged.

The current [DMC pilot](../modules/dmc/README.md) has five demo role cards and shared synthetic access. It does not implement event-contact sheet intake/allocation, the combined Ops role journey, negotiated acceptance or a token-before-booking gate. Its outgoing settlement page remains unavailable. The current booking request can precede receipt entry; that demonstration order differs from the user-described actual-booking trigger. Existing full-payment voucher and pricing rules remain provisional under AS-023. No changes to those behaviors are included in this documentation task.

The earlier [CRM/Ops/Accounts review](operations-accounts-review.md) belongs to a separate workflow; its staff roster, Sales handoff and payment rules must not automatically become Bali DMC requirements. [B2B journey interpretation](b2b-user-journey.md) retains the broader screenshot-based explanation separately.

## Details still to validate

| Open detail | Why it matters before implementation |
| --- | --- |
| Sheet fields, agency/contact deduplication, allocation owner and reassignment rules | Define how prospects reach the right Ops member and how follow-ups are retained |
| What makes a quotation locked, and how the accepted version is recorded | Establish the commercial basis before supplier purchases |
| Token amount/percentage, currency and receipt evidence/verification | Define the actual-booking trigger and any credit or urgency exceptions |
| What “cheapest options” permits | Confirm whether this means alternate suppliers for the same promised service or whether hotel/service changes require agency agreement; no automatic substitution policy is assumed |
| Supplier booking confirmation details and who updates them | Separate booked, requested and confirmed facts without inventing status rules |
| Incoming/outgoing due dates, approvals, account choices, balances, cancellation/refund handling | Define Accounts workflow and exception handling |
| Ops assignment/financial visibility, Accounts authority and Admin responsibilities | Define permissions for the two main teams without treating demo cards as production access |

This overview captures the user-confirmed team structure and usual order. It does not settle those detailed policies or prove that the current pilot matches them.
