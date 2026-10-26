# B2B/DMC journey in plain language

Updated 2026-10-08. Source FB-035: user requests a simple chronological explanation of Sembark's trip, booking, payment, stakeholder and access structure. Interpretation from saved evidence, not a newly observed transaction walkthrough. No Sembark access or application changes.

FB-037 supplies the actual Bali team's usual process: two main teams, Ops combining sales and operations, and Accounts managing incoming/outgoing payments. Event contacts go into a sheet and are divided among Ops; agency enquiries become queries, followed by quotation/negotiation. Actual booking-option search and supplier bookings follow a locked deal plus token receipt. See [Bali DMC team overview and flow](bali-dmc-team-flow.md) for the user-described process. The broader roles and ordering below remain screenshot-based interpretations, not separate-department requirements for Bali.

## What the system organizes

A travel agency asks a destination company (DMC) to arrange a holiday for its guests. The DMC sells a package to the agency and buys the component services from hotels, transport providers and activity suppliers. The agency is the DMC's business customer; the guests use the services. An agency need not have a Sembark login for staff to record its requests.

The trip is the main work file. A quote describes the offer and price. A service booking describes what has actually been arranged with a supplier. A payment obligation describes an amount due; a transaction records money logged against accounts. These are linked but distinct. Paying a supplier and receiving a supplier confirmation are different facts.

## Normal business sequence inferred from the screens

| Step | What people do | Evidence and boundary |
| --- | --- | --- |
| 0. Prepare reusable records | Keep agency sources, hotels/services, suppliers and defaults available for repeated use | S10/S11/S14 show catalogs/directories/defaults; maintenance is ongoing, not repeated for every query |
| 1. Record the enquiry | Agency asks for destination, dates, nights, passengers and preferences. Staff creates New Query, attaches source/contact and Sales owner | S03 shows source-dependent enquiry contact, optional guest details, dates/child ages and notes. Save outcome untested |
| 2. Prepare the offer | Staff combines hotels/room/meal options, transfers and activities into a priced itinerary; communicates the offer and revises it as needed | S12 shows cost/sell prices, versions and options, Share/Edit/New Quote. Actual authoring/sharing outcomes untested; one version can contain multiple options |
| 3. Agree an offer | Agency selects an offer; staff proceeds with the selected quotation as the trip's commercial basis, or keeps it on hold | S12 shows Convert/On-Hold using Quote and Used for Conversion. Exact acceptance/payment prerequisite and conversion effects untested |
| 4. Arrange supplier services | Reservations arranges rooms, transport and activity slots; records suppliers, dates, quantities and confirmation details | S12 Services Bookings has Hotels/Operational/Flights. A converted trip can still have pending services. Supplier request delivery and status transitions untested |
| 5. Manage amounts due and paid | Track money expected from agency/customer and money payable to each supplier; schedule instalments/due dates, log amount/date/reference/accounts and review unverified entries | S05/S12 show incoming/outgoing queues, instalments, Log Payment and Verify. Save/verification policy, currency conversion and actual settlement untested |
| 6. Prepare travel handover | Ops checks service/timing/guest details and prepares trip/hotel/activity vouchers and required guest documents | S12 Docs previews and pending/mismatch warnings are observed. Exact release gates and sharing outcomes untested |
| 7. Run and close the trip | Ops handles travel support; Accounts follows balances/settlement and reviews costs/profit; history supports handover | S02 shows On Trip/Past Trips and other lifecycle queues; S12 shows Ops ownership, history, dues and estimated profit. Completion/closure policy untested |

Steps 4–6 overlap. An agency may pay a deposit before all services are arranged. A hotel may require a deposit to hold rooms. Some agreed balances may fall due later. Screens show due/paid instalments and pending bookings, but do not establish one mandatory payment-before-booking order. These examples explain business possibilities, not confirmed Sembark policy.

Money paths in the B2B case: agency → DMC (incoming); DMC → hotel/transport/activity supplier (outgoing). Guests may pay their agency separately; that retail payment is not demonstrated in the DMC workspace. Debit/Credit Account are the portal's transaction labels. Observed account choices distinguish agency/customer, company/cash/bank and supplier accounts in several currencies; their exact ledger posting and conversion rules are unknown.

## Stakeholders, likely responsibilities and suggested access

The following access is a proposal for our system, not verified Sembark permissions. S12 visibly has Sales Team, Resv. Team and Ops Team; one observed actor occupies multiple team fields. FB-037 confirms combined sales/operations responsibility within Bali's Ops team. Treat the Sales/Reservations/Ops rows below as functions when considering that business, not a confirmed staffing structure.

| Stakeholder | Responsibility | Suggested access for our later permission design |
| --- | --- | --- |
| Agency staff | Send requirements, review offers, request booking, provide guest details, pay DMC | Own agency's offers/bookings/documents and sell price; no other-agency records or internal supplier costs |
| DMC Sales/quotation staff | Capture enquiry, follow up, prepare/revise offer and record agreement | Assigned/team commercial work; exact cost visibility and post-handoff access need review |
| Reservations staff | Secure hotel rooms and component services, record supplier confirmations and changes | Assigned service bookings, supplier details and relevant purchase costs; payment authority separate |
| Operations staff | Coordinate timings, arrival/departure, guests, vouchers and on-trip support | Assigned operational trip information and necessary contacts; exact financial visibility needs review |
| Accounts staff | Review receipts, payable schedules, accounts, transactions, invoices and balances | Relevant incoming/outgoing finances, bank/account details and supplier obligations; payment/reversal authority explicitly defined |
| Manager/admin | Assign ownership, oversee exceptions/financial summaries and maintain master settings | Team/company oversight as authorized; financial approval and permission management explicitly defined |
| Supplier/driver | Deliver agreed room, transfer or activity; provide confirmation | Only relevant service/guest instructions and agreed purchase terms if shared; supplier login not demonstrated |
| Guest/traveler | Supply required details/documents and receive final travel instructions | Their own necessary travel information if a portal is built; guest login not demonstrated |

Inspection of one account does not establish who can create/edit/verify/export/delete, whether staff are limited to assigned records, or whether agencies/suppliers/guests have a portal. User-supplied account purpose and our demo role labels do not prove Sembark's formal role matrix. Do not import the earlier client-specific Sales→Accounts→Ops mockup's access/gates into Sembark claims.

## Problem solved and why the structure helps

The system keeps the promised package, supplier arrangements and two money directions attached to one trip. It helps staff answer: What did we offer? Which version was chosen? Which rooms/services are confirmed? Who owes us money? Whom do we owe? What does the guest need? Who changed a detail?

Persistent trip tabs let Sales, Reservations, Ops and Accounts refer to the same work file. Global booking/payment queues let teams find work across trips; catalogs let them reuse services; history helps handover. This reduces dependence on searching conversations and separate sheets for the latest information. That is an assessment of the structure's purpose, not evidence of quantified efficiency or error reduction.

Sembark's mismatch and incomplete-profit warnings matter: what was sold may differ from what was booked. Missing supplier costs make a profit figure provisional. A simple illustrative one-currency package might sell for 100,000 with 80,000 known supplier costs, but the remaining 20,000 is only a preliminary difference until taxes, fees, currency effects and all costs are known.

## What we understand and what remains open

We understand the linked-record structure and responsibilities sufficiently to build an initial internal journey. We have not verified every authoring action, state transition, pricing formula, approval, credit exception, cancellation/refund or access rule. The [initial DMC pilot](../modules/dmc/README.md) demonstrates a narrower synthetic journey. Its IDR-only prices, one-booking-per-trip and full verified collection plus all-confirmed-service voucher gate are AS-023 defaults; they are not established Sembark requirements. Full debit/credit accounts, outgoing settlement and external-agency isolation are not implemented in that pilot.

Evidence: [S02 Trips](../references/sembark/screens/02-trips-list.md), [S03 New Query](../references/sembark/screens/03-new-query.md), [S05 Payments](../references/sembark/screens/05-payment-lists.md), [S06 Accounts/Transactions](../references/sembark/screens/06-accounts-and-transactions.md), [S10 Catalogs](../references/sembark/screens/10-service-catalogs-and-price-lists.md), [S11 Suppliers](../references/sembark/screens/11-supplier-directories.md), [S12 Trip workspace](../references/sembark/screens/12-trip-quote-booking-accounting-workspace.md), [S14 Repository](../references/sembark/screens/14-organization-repository-and-templates.md), [flow evaluation](b2b-flow-evaluation.md).
