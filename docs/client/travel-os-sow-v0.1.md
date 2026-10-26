# Travel OS Scope of Work

## Document control

**Document reference:** TOS-SOW-001  
**Version:** 0.1  
**Issue date:** 23 October 2026  
**Status:** Draft for client review and agreement  
**Client legal name:** To be completed  
**Delivery company legal name:** To be completed

This Scope of Work defines the Travel OS implementation, its functional requirements, three delivery phases, acceptance conditions, commercial milestones, exclusions and project handover. The parties will use the approved version to freeze the requirements and assess subsequent changes.

The project covers a complete internal B2C travel system, a separate internal Bali B2B DMC system, and extension of the B2C system to third-party travel agencies. Third-party access to, or licensing of, the B2B DMC system is outside this scope.

| Agreed commercial item | Basis |
| --- | --- |
| Total project fee | INR 21,00,000; GST treatment to be agreed |
| Advance | 25 percent, INR 5,25,000 to the designated Indian bank account |
| B2C completion milestone | 25 percent, INR 5,25,000 equivalent in USDT or EUR international transfer |
| Internal Bali B2B completion milestone | 25 percent, INR 5,25,000 equivalent in USDT or EUR international transfer |
| Final phase completion milestone | 25 percent, INR 5,25,000 equivalent in USDT or EUR international transfer |
| Overall delivery period | Three calendar months from receipt of the advance payment |
| Project IP transfer | On project completion and receipt of full payment, subject to the third-party rights identified in this SOW |

The commercial amounts, phase sequence, overall period and project IP transfer condition are recorded from the project owner's instructions. Detailed requirements and acceptance rules in this draft are proposed for client agreement unless explicitly identified otherwise. An existing demonstration, competitor feature or sample setting does not constitute acceptance of a production requirement.

**Review action:** Confirm the scope and decision register, complete the party and commercial details, approve the phase allocations and sign the final baseline. This draft does not record a client sign-off.

## 1 Scope baseline and interpretation

The delivery team will design, implement, integrate, verify and deploy the requirements selected in the signed baseline. Requirement identifiers in this document provide a common reference for development, review, acceptance and change requests.

**Baseline requirement** means a requirement proposed for inclusion in the applicable phase. **Decision required** means the requirement's detailed boundary, policy or quantity must be completed before it can be frozen. **Excluded** means the work requires a separately approved change or agreement.

The term **complete B2C system** means the connected B2C journeys and supporting requirements expressly listed in this document. It includes accounting, lead ingestion, itinerary and quotation building, flight and hotel API connectivity, offline contracts, internal fulfillment and the specified administration and reporting. It does not imply every feature of a competitor product or every possible travel-industry workflow.

| Phase | Delivery boundary | Main completion outcome |
| --- | --- | --- |
| Phase 1 | Internal B2C system | Authorized staff can manage an inquiry through itinerary, quotation, verified collection, supplier fulfillment, accounting, documents and trip completion |
| Phase 2 | Internal Bali B2B DMC system | Internal Ops and Accounts can manage agency relationships, queries, quotations, accepted deals, bookings, collections, supplier payments and trip delivery |
| Phase 3 | External use of B2C only | Approved third-party travel agencies can use the B2C capabilities allocated to them within separate organization access and data boundaries |

All three phases form the INR 21,00,000 project. The phase payment amounts are commercial milestones; they do not represent an independently agreed cost breakdown by module.

Production accounting and live API integrations are included in Phase 1. Their providers, supported operations, licenses, transaction coverage and limits must be named in the integration and decision registers. They will not be treated as delivered through mock screens alone.

Screens and demonstrations support discovery and design review. The signed requirement register, approved business policies, approved integration schedules and approved changes determine delivery obligations. A reference portal's hidden functions, proprietary design assets and unverified behavior are not incorporated by reference.

## 2 Delivery phases and planning basis

The contractual delivery period is three calendar months from the date the delivery company receives the advance. The actual receipt date and corresponding completion date will be entered in the final agreement. Three calendar months must not be silently replaced with a fixed 90-day period.

| Planning stage | Proposed scheduling allocation | Outputs |
| --- | --- | --- |
| Mobilization and baseline | Beginning of Month 1 | Scope freeze, policies, access matrix, integrations, environment and data plan |
| Phase 1 build and acceptance | Month 1 and first part of Month 2 | Connected B2C system and live integrations, accounting verification, B2C UAT |
| Phase 2 build and acceptance | Remaining part of Month 2 | Internal Bali DMC flow, agency commercial records and Accounts/Ops UAT |
| Phase 3 and final handover | Month 3 | Third-party B2C onboarding, organization isolation, final UAT, deployment and handover package |

These internal allocations are a proposed execution plan, not separately agreed delivery dates. Activities may overlap. The final plan must fit the agreed overall period and identify phase demonstrations, testing, client reviews and deployment windows.

**PLN-01** The kickoff output will include a dated delivery plan with owners, dependencies, review dates and the integration critical path. The client will nominate one person authorized to consolidate requirements and approve scope decisions.

**PLN-02** The team will track requirements as planned, in progress, ready for review, accepted, rejected or changed. A phase is complete only after its applicable acceptance conditions have been met and acceptance has been recorded.

**PLN-03** Provider approvals, access credentials, accounting policies, sample data and client decisions will have agreed required-by dates. A delay or material provider limitation will be recorded with its effect on scope and schedule; any revised obligation requires written agreement.

**PLN-04** A change request will identify the affected requirements, work already completed, estimated effort, costs, dependencies and any impact on the three-month completion date before additional work is authorized.

No production stack, accounting package, cloud host or integration vendor is adopted merely by issuing this SOW. Their selection must support the agreed features, deployment, data access and handover obligations.

## 3 Business journeys and boundaries

The implementation will connect records across the applicable modules while retaining separate lead, quotation, booking, supplier, receipt and accounting states.

| Journey | Required sequence and outcome |
| --- | --- |
| B2C acquisition and sales | Lead ingestion or manual entry, qualification, assignment, follow-up, trip requirements, itinerary draft, priced quote, reviewed version and recorded customer acceptance |
| B2C fulfillment | Accepted itinerary and payment evidence, Accounts verification, Sales handover readiness, Ops responsibility, service procurement, confirmations, payment deadlines, documents, voucher and travel completion |
| Bali B2B commercial work | Agency contact and allocation, outreach record, agency query, quotations and negotiation, locked deal and token verification, actual supplier booking and trip fulfillment |
| Bali B2B finance | Agency collections, verification and allocation, supplier liabilities and payments, balances, exceptions and accounting links for the same trip |
| Third-party B2C use | Approved agency onboarding, organization users and roles, permitted B2C records and integrations, isolated access, support and offboarding/export arrangements |

**FLOW-01** Stable identifiers will link a lead or query, itinerary versions, quote versions, accepted commercial snapshot, booking, service confirmations, payments, documents and history. Reopening a record will show the same underlying business record rather than disconnected page copies.

**FLOW-02** Shared and accepted versions will remain identifiable. Changing a catalog rate, template, supplier or itinerary draft must not silently rewrite an accepted price or promised package.

**FLOW-03** A received or verified payment will not automatically confirm suppliers. A confirmed hotel will not automatically confirm a whole trip. Accounting posting, receipt evidence and real money transfer will be represented separately.

**FLOW-04** B2C Sales and Operations responsibilities will remain distinct. Bali Ops combines commercial and fulfillment functions; a compulsory transfer from a separate Bali Sales department is not assumed.

**FLOW-05** A supplier change for an equivalent promised service will be distinguished from a change to hotel, room, meal, dates, traveler configuration or included activity. Changes to the customer promise require the agreed commercial review and versioning process.

**FLOW-06** Missing information, rejected payments, unavailable services, rate changes, cancellation requests and incomplete handovers will have visible exception paths. The system will explain the blocker and preserve the record for recovery.

## 4 Users roles and financial access

Roles represent capabilities rather than a fixed organizational chart. Department names and combined responsibilities may vary by operating company. Real users, role membership and permissions will be confirmed through an approved access matrix.

| Role group | Proposed responsibility | Access boundary to confirm |
| --- | --- | --- |
| Platform administrator | Organization provisioning and technical configuration | Exceptional business-data access, audit and support permissions |
| Company administrator | Company settings, users and approved business administration | Own organization only; sensitive approvals explicitly granted |
| Admin and CXO reporting access | On-demand AI reports, tables/charts and reusable templates | Authorized data only; reporting does not grant operational or approval rights |
| B2C Sales executive | Assigned leads, contact history, itineraries and customer quotations | Own records; customer prices; supplier costs and markup withheld |
| B2C Sales manager | Own/team leads, allocation, quotation oversight | Agreed team scope; internal cost and markup capability |
| B2C Operations | Accepted handovers, procurement, documents and travel delivery | Team versus assigned visibility and edit/coverage policy |
| Accounts | Receipt verification, liabilities, payment records and accounting | Own entities and authorized financial actions |
| Bali Ops | Agency relationships, queries, negotiations and fulfillment | Combined commercial/Ops capabilities within Bali scope |
| Third-party B2C agency users | Their organization's permitted B2C workflows | Their organization's records, files, settings and prices |

**ACC-01** Authentication, session expiry, logout, account disabling and password or identity recovery will operate through the selected production identity service. Demonstration credential buttons will not act as production authentication.

**ACC-02** Backend services will enforce role, organization, record and sensitive-field permissions. Direct URLs, APIs, downloads, exports and background jobs must follow the same boundaries as visible screens.

**ACC-03** B2C supplier costs and markup are restricted to authorized manager/admin capabilities as instructed. Sales sees customer prices. Accounts/Ops financial visibility and post-handover exceptions require explicit matrix entries.

**ACC-04** B2C lead reassignment belongs to authorized manager/admin users. Executive peer reassignment is excluded unless the client approves a policy change.

**ACC-05** Sensitive actions will retain actor, organization, time and affected record. User/role changes, approvals, payment corrections and support access will be auditable.

**ACC-06** Provide a reporting access role for authorized Admin and CXO users. It enables natural-language AI reporting, refinement and saved templates within approved data/field scope; it does not grant transaction editing, financial approval or unrestricted company access.

**Decision required:** Multi-role assignment, company/team scope, shared Ops visibility, financial approval limits, administrator business-data access and the external-agency subscription/onboarding model.

## 5 Phase 1 Workspace and administration

The internal B2C workspace will provide a consistent interface for Sales, managers, Operations, Accounts and company administration. Light and dark themes, side navigation and role-appropriate dashboards are included.

**ADM-01** Provide authenticated entry, permitted navigation, current user/company context, profile and logout. Role-specific home pages will direct staff to their actionable work queues.

**ADM-02** Provide company identity, business contacts, branding, base currency and approved document details. Statutory identifiers and bank information will be restricted according to the access matrix.

**ADM-03** Manage users, active/inactive status, teams and role assignments. Deactivating a user must prevent new access and preserve past activities and ownership history. Reallocation of open work will be explicit.

**ADM-04** Configure approved lead sources, lifecycle labels, assignment rules, follow-up outcomes and relevant workflow policies. Policy changes will be attributable and will not erase historical statuses or accepted transactions.

**ADM-05** Provide reusable search, filters, forms, detail views, validation messages and status labels. Functional copy will describe the action and result; promotional banners and decorative actions are excluded from work screens.

**ADM-06** Display loading, empty, permission-denied, missing-record, invalid-input, error, retry and successful-save states where applicable. Duplicate clicks or request retries must not create duplicate business records.

**ADM-07** Maintain separate test and production environments. Synthetic sample reset is a test/demo function; a production reset that deletes company records is not included as an ordinary user action.

**ADM-08** Store private files and integration secrets outside public frontend assets. Configuration exports and handover documents must not disclose passwords or API secrets.

**Acceptance:** Each approved role can log in, reach its permitted home, complete the relevant actions and receive a denial for unauthorized direct requests. Company changes and disabled accounts behave as approved without losing historical records.

**Decision required:** Party names, operating entities/branches, production domains, identity method, administrator scope and any supported languages beyond the proposed English interface.

## 6 Phase 1 Leads and ingestion

The lead module will support the internal B2C sales workflow from incoming inquiry to accepted commercial handover. Customer/contact identity, qualification fields and stages must be reviewed with Sales before freeze.

**CRM-01** Capture manual inquiries and ingest leads from the approved advertising/form sources. Retain source, external event identifier, received time, contact, trip brief and ingestion result. Failed events must be visible for review and controlled replay.

**CRM-02** Validate required contact and trip fields, normalize mapped values and detect repeated ingestion events. Contact similarity may flag potential duplicates; rules for merging existing customers and new trip inquiries require agreement.

**CRM-03** Provide searchable lead lists with combined owner/team, source, stage, destination, travel date and follow-up filters; sorting, agreed columns and saved views. Results and exports must respect the user's record scope.

**CRM-04** Support manual single/batch allocation, selected-batch distribution and incoming auto-assignment as configurable alternatives. Eligible users, routing priorities, fairness rules, absence handling and fallback queues will be defined in the approved routing schedule.

**CRM-05** Provide lead details, qualification, trip preferences, notes and attributed activity history. Lead owner, quotation owner and Ops handler will remain separate responsibilities.

**CRM-06** Record internal follow-ups and customer-requested callbacks with date, time, time zone, channel, request context and completion. Staff can view overdue/due work, update or reschedule tasks and retain completed history.

**CRM-07** Support approved stage transitions and lost/nurturing reasons. Call outcomes, first-touch service-level timers and cold/dead/reactivation rules will be configurable only after the client approves definitions and exceptions.

**CRM-08** Open itinerary/query creation from a lead, inherit its trip context and list associated saved versions. A specific itinerary may be revised without overwriting the lead or unrelated trip inquiries.

**CRM-09** Submit accepted trip/payment context to the handover journey and retain the permitted status and shared Ops remarks. Post-handover Sales detail and pricing restrictions will follow the approved policy.

**CRM-10** Retain ingestion errors, assignment history and significant edits. Retry, stale edits and unavailable provider behavior must preserve input and prevent partial or duplicate changes.

**Decision required:** Named sources and form counts, Google lead-form versus website attribution, field mapping, duplicate/merge policy, eligible allocation pool, first-call SLA and lead lifecycle. Advertising campaign management and ad spend optimization are excluded.

## 7 Phase 1 Itinerary authoring and import

The itinerary builder will create the promised trip from a lead, reusable template, manual plan or reviewed import. It will support hotels, flights, transfers, activities, meals and applicable custom/included services within the agreed product coverage.

**ITI-01** Capture destinations, dates, days/nights, adults, children and ages, infants, room allocations, budget, currency and preferences. Dates, traveler groups and occupancy must remain consistent across service choices and pricing inputs.

**ITI-02** Build dated day plans with descriptions, locations, service details and relevant times. Add, edit, remove, copy and reorder services using accessible controls; warn about missing or conflicting trip information.

**ITI-03** Represent hotel stays with check-in/out, hotel, room, meal plan, room quantity and occupancy. Show a stay across its days while charging the approved room-night quantities once.

**ITI-04** Record flight routes, departure/arrival dates, local times and time zones, cabin, baggage and fare conditions where available. Overnight travel will not be forced into a single incorrect local date.

**ITI-05** Maintain reusable templates with relative days, destinations, service suggestions, inclusions, exclusions and policy text. Applying a template creates a new editable itinerary; old rates do not automatically become valid for new dates.

**ITI-06** Import the agreed text/document formats into a reviewable extraction draft. Show source excerpts or page references, unresolved fields and conflicts. Staff selects or corrects extracted fields before they become itinerary content.

**ITI-07** Identify template, staff and AI/import provenance separately from rate source. Extracted price text does not become an authoritative supplier cost or confirmed offer without validation.

**ITI-08** Save drafts and retain shared/accepted versions. Unsaved changes must be disclosed before a destructive navigation action. Ops will inherit the accepted itinerary rather than recreate the promised plan manually.

**Acceptance:** Create a multi-stay itinerary from a lead, revise the day plan, review a supported imported document, validate dates/occupancy and preserve the shared version. Unreadable or unsupported content must produce review gaps or a clear rejection.

**Decision required:** Real AI and extraction provider, supported PDF/Word/text formats, scanned PDF/OCR, upload limits, languages, destination coverage and whether faithful original-document rebranding is required. Exact preservation of arbitrary source layouts is excluded unless specifically agreed.

## 8 Phase 1 Rates quotation and acceptance

Pricing must be deterministic and based on the approved supplier, contract or provider data. AI may assist with content and extraction; it will not approve payable prices, taxes, inventory or bookings.

**QTE-01** Distinguish supplier cost, customer sell amount, markup, discount, taxes, fees and currency. Price each service using an explicit basis such as room-night, person, vehicle, service or package; apply the approved rounding policy.

**QTE-02** Display Offline contract, API offer and Manual estimate sources with relevant supplier/provider identifiers, checked time, validity, price basis and terms. Rate source and availability/confirmation status must be separate labels.

**QTE-03** Compare offers using equivalent dates, traveler/room configuration, service content, meal/fare terms, taxes, fees and cancellation conditions. Show material differences before selecting a lower amount.

**QTE-04** Invalidate or request review of affected prices after changing dates, occupancy, hotel/room/meal, route, fare or quantities. Repricing will show differences and require staff review; shared or accepted prices will not be silently replaced.

**QTE-05** Create priced quotation versions with validity, inclusions/exclusions, approved terms and customer-facing totals. Internal costs and markup will be omitted from customer outputs and unauthorized views.

**QTE-06** Record review and sharing status, recipient context and accepted version. The signed policy will determine whether acceptance is recorded by staff, through a customer approval link, or both, and how evidence is retained.

**QTE-07** Preserve accepted itinerary, sell-price and policy snapshots for fulfillment and accounting. Amendments create identifiable revisions and require the approved customer/manager review where promised scope or amount changes.

**QTE-08** Provide the agreed branded quotation/proposal preview and export. Document generation must handle long days, multiple stays, terms and page breaks while protecting internal information.

**Decision required:** Tax and foreign exchange rules, margin authority, discount approvals, quotation expiry, supported document formats, customer acceptance mechanism and number of branded templates. Proposed baseline is one quotation/proposal design and one voucher design per internal business brand.

A quotation, customer acceptance, supplier reservation, supplier confirmation and payment are independent facts. Customer acceptance alone must not claim that every supplier service is available or confirmed.

## 9 Phase 1 Hotel and flight APIs

Live hotel and flight API connectivity is part of Phase 1. The final integration schedule will name providers and supported operations; search/reprice, reservations, payment and ticket issuance are separate deliverables.

**API-01** Connect approved hotel and flight providers through authenticated backend adapters. Keep provider credentials server-side and map provider identifiers, service data, prices, currency, taxes, fees and terms into the travel records.

**API-02** Submit hotel searches using destinations/properties, check-in/out, rooms, travelers and child ages. Display supported room/meal and cancellation choices, complete price components and provider availability evidence.

**API-03** Submit flight searches using agreed routes, dates, traveler groups, cabin and trip types. Display available schedules, fare conditions, baggage and price components supported by the selected API.

**API-04** Revalidate selected offers before the agreed commercial/booking action. Handle price changes, sold-out offers, expired identifiers and changed terms with an explicit review or alternative path.

**API-05** Retain rate/offer identifiers and checked times. Cached offers will be marked appropriately; stale results must not imply an inventory guarantee.

**API-06** Handle authentication errors, timeouts, quotas, provider outages and repeated requests. An uncertain reservation or payment outcome must be checked through provider status/reference recovery before a duplicate attempt.

**API-07** Where explicitly selected in the integration schedule, support provider booking, retrieval and the agreed cancellation/ticketing operations with appropriate authorization, confirmation references and status reconciliation.

**API-08** Demonstrate approved search/reprice operations against the provider sandbox and complete production readiness checks. If an operation is unavailable from the contracted API, disclose the limitation and agree a manual path or scope adjustment.

**Decision required:** Provider names/counts, commercial access, search coverage, domestic/international and one-way/return/multicity flight support, instant/on-request hotel booking, flight ticket issuance, cancellation/refund operations and provider charges. Proposed starting boundary is one hotel provider and one flight provider; this quantity requires owner confirmation before freeze.

Unapproved portal scraping, browser automation of supplier accounts, universal GDS connectivity and support for every airline or hotel supplier are excluded. Manual recording of bookings made outside approved APIs remains part of internal fulfillment.

## 10 Phase 1 Offline contracts and inventory

Offline contracts are part of Phase 1. The system will distinguish negotiated rates from finite stock, booking windows, travel windows and supplier deadlines. A valid rate alone does not establish availability.

**CON-01** Manage suppliers and hotel/service records, contacts, destinations, rooms, meal plans, vehicle/activity options and applicable price bases. Supplier approval and financial details will follow the approved access and onboarding workflow.

**CON-02** Record contract reference/version, supplier, currency, validity, travel periods, seasons, blackout/stop-sale dates, prices, occupancy/age rules and cancellation/payment terms within the agreed contract types.

**CON-03** Store rate evidence and private contract documents. Historical versions and the contract/rate used by a quote or purchase must remain identifiable when future terms change.

**CON-04** Search applicable contracted prices for itinerary dates, rooms, ages and service quantities. Validate restrictions and clearly identify unmatched inputs or contracts that require manual supplier confirmation.

**CON-05** Support the agreed offline inventory classifications: on-request negotiated rates, free-sale, releasable allotments, guaranteed/prepaid blocks or other explicitly approved types. Unsupported contract types will not be labeled available through a generic rate record.

**CON-06** For agreed finite inventory, track capacity by occupied night or departure/service date. Holds, allocations, release and confirmed consumption will be atomic and must not permit overselling through concurrent requests.

**CON-07** Track distinct rate expiry, booking/travel validity, hold expiry, release cutoffs and ticketing/payment deadlines. Time zones and partial-release policies will be stated; an expired hold needs an explicit recovery path.

**CON-08** Provide approved structured import/export templates and validate rows with error reporting. Importing a contract document will not automatically establish legal correctness or usable inventory without staff review.

**Acceptance:** Quote a valid contract, reject a blackout or mismatched occupancy, preserve the old quoted rate after a contract revision and verify date-level capacity/hold release for each finite inventory type included in the signed baseline.

**Decision required:** Redacted hotel/flight contract examples, classifications, rate dimensions, allotment units, concurrency/hold rules, import quantities and accounting recognition. Airline hard blocks, open vouchers and complex allocations must be explicitly named; no stock accounting treatment is inferred from the word contract.

## 11 Phase 1 Sales handover and procurement

Sales provides the accepted commercial promise; Ops records actual fulfillment and procurement against it. Accounts verification, Sales handover readiness and supplier confirmation remain separate events.

**HND-01** Capture the accepted quote/itinerary, customer/traveler context, dates, included services, reference suppliers/rates, collection terms and required evidence in the Sales handover.

**HND-02** Verify payment evidence through Accounts before the approved Ops release. Pending/rejected evidence will not count as verified collection. Token thresholds, handover readiness and exceptions will follow signed policy.

**HND-03** Display incomplete handovers and missing fields without creating a misleading ready status. Define whether verified trips with incomplete Sales handover are visible as incomplete or withheld from Ops.

**HND-04** Allocate an Ops handler and support the approved team visibility and coverage model. Sales and Ops owners remain separately identifiable; reassignment preserves history and open responsibilities.

**HND-05** Preserve Sales reference supplier/cost evidence separately from the selected actual supplier, procurement cost, payment method fees and confirmation details.

**HND-06** Compare equivalent procurement options and retain chosen supplier/evidence. A cheaper supplier does not authorize a different promised hotel, room, meal or activity without the agreed approval.

**HND-07** Record service reservations/holds, booking requests, confirmed references, unavailable outcomes and alternatives. Supplier payment may precede confirmation where contract terms require it; a global confirmation-before-payment rule is not assumed.

**HND-08** Handle approved changes to traveler details, dates or services with repricing, acceptance review, payment impact and supplier updates. Preserve prior promises and financial history rather than editing a confirmed booking without trace.

**Decision required:** Mandatory handover fields/documents, minimum token, separate handover submission, shared Ops editing, equivalent-substitution authority, spend limits and credit/urgent purchase exceptions.

**Acceptance:** A verified receipt with an incomplete handover follows the chosen policy; Ops receives the accepted version, assigns responsibility, records an alternate equivalent supplier and handles an unavailable service without changing the customer promise or falsely confirming the trip.

## 12 Phase 1 Operations and travel delivery

Operations will manage the day-to-day delivery of accepted B2C trips. Nearby departures, incomplete tasks and per-service deadlines will be actionable work queues.

**OPS-01** Provide upcoming departures, arrivals, unassigned work, own/team work, incomplete confirmations, customer balance and urgent supplier deadlines. Filters will include destination, dates, handler, travel phase and relevant service states.

**OPS-02** Manage each included hotel stay, transfer, activity, flight, visa, insurance or custom service with supplier, service date, reference, procurement amount, currency and independent status.

**OPS-03** Separate applicability, package inclusion and fulfillment responsibility for visa/insurance/arrival requirements. Track the agreed arrival forms and document tasks without implying every destination or traveler has identical requirements.

**OPS-04** Maintain traveler and rooming details and required document checklists. Files will be private, access-controlled and linked to the appropriate person or trip; mandatory fields and retention require approval.

**OPS-05** Track guest collection, supplier instalments, credit settlement, hold expiry and arrival tasks as distinct deadlines. Provide the agreed in-app reminders and escalation queues; external notification delivery depends on the communications schedule.

**OPS-06** Record internal remarks and deliberately shared Sales updates with actor/time. Sales must receive only the fields permitted by the post-handover projection.

**OPS-07** Generate the approved voucher and travel document outputs when the signed release policy is satisfied. Explain missing prerequisites; retain issued versions and corrections. Full collection is not an automatic contractual voucher requirement in this draft.

**OPS-08** Support ready-for-travel, in-travel and completed phases, incidents and assigned follow-up work. Operational trip hold, supplier hold, postponement, cancellation and refund request must remain distinct states with approved authority and reason.

**Acceptance:** An Ops user finds a near departure, sees separate hold/payment/form deadlines, completes permitted tasks, generates a correctly filtered voucher and records travel completion. Restricted users cannot retrieve private documents or internal costs.

**Decision required:** Shared team visibility, collection deadlines, supplier/pay-to-confirm rules, arrival responsibility, leave coverage, voucher release criteria, cancellation/refund authorization and operational escalation. Destination rules and reminder content must be supplied or validated by the client.

## 13 Phase 1 Receipts supplier payments and balances

The finance workbench will link customer collections and supplier obligations to bookings and the selected accounting system. Payment evidence, approved allocation, ledger posting and bank settlement will remain distinguishable.

**FIN-01** Record incoming evidence with amount/currency, payer, date, method, account/reference and attachment or supporting note. Allocate receipts to the approved booking/invoice/advance records and prevent duplicate active events.

**FIN-02** Allow authorized Accounts review, verification/rejection and correction with reasons. Rejected evidence must not reduce the balance or release Ops. Reversal and reallocation preserve history and accounting links.

**FIN-03** Show sale, verified collection, approved adjustments, due dates and outstanding balance. Multi-currency and overpayment/customer-credit behavior will use the agreed ledger and exchange-rate policies.

**FIN-04** Generate supplier payable requests from the agreed booking/hold/contract evidence, with supplier, service, currency, instalment, due date and approval. Track requested, approved, paid, rejected and cancelled states as applicable.

**FIN-05** Record outgoing settlement references and account/currency against approved liabilities. Prevent duplicate references and payments that exceed the approved payable unless an authorized adjustment/advance policy permits them.

**FIN-06** Support approved cancellation charges, credit notes, supplier/customer refunds and corrections through traceable requests and accounting entries. A refund request is not a completed bank refund.

**FIN-07** Provide upcoming collection/payable queues, account movements and reconciliation exceptions. Net recorded movement will not be presented as a bank balance without opening balances and reconciliation.

**FIN-08** Export permitted finance records and retain actor/time/approval history. Invoice, receipt, ledger and supplier outputs will disclose only approved details and currencies.

**Acceptance:** Verify/reject receipts, correct a rejected entry, reconcile the booking balance, approve a pay-to-confirm liability, record a partial supplier payment, detect a duplicate, and process the agreed refund/correction case without inconsistent books.

**Decision required:** Approval limits, bank accounts, multi-currency treatment, advance/overpayment allocation, taxes, reconciliation authority and whether payment gateways or automated bank transfers are included. Real automated fund movement is excluded unless expressly named in the integration schedule.

## 14 Phase 1 Accounting implementation

An accounting solution is included in Phase 1. The selected software must own the agreed official books or connect to the agreed incumbent authority; the same transaction must not be independently posted into competing authoritative ledgers.

**ACT-01** Select and configure the accounting system or approved connector. Map legal entities, fiscal year, chart of accounts, customers, agencies, suppliers, currencies, tax masters and opening balances within the agreed data schedule.

**ACT-02** Link accepted bookings, customer advances/collections, sales invoices, supplier bills/payables, supplier advances/payments, credit/debit notes and refunds to their accounting records as required by the signed posting schedule.

**ACT-03** Implement posting and correction rules for advances, revenue/expense recognition, customer/supplier balances and cancellation adjustments. The client's Accounts team or accountant will approve sample expected entries before production posting.

**ACT-04** Apply agreed taxes and withholding, rounding and exchange-rate policies. GST/TCS/TDS, international transactions and remittance requirements will be validated for the named entities; sample spreadsheet headings do not establish statutory formulas.

**ACT-05** Reconcile travel records with the ledger and surface unmatched, failed or duplicate postings. Connector retry must preserve external references and prevent double posting. Correction ownership and synchronization direction will be explicit.

**ACT-06** Provide the agreed financial reports, such as customer/supplier ledgers, receivables/payables ageing, trial balance, profit and loss and balance sheet through the selected accounting software or approved reports.

**ACT-07** Enforce accounting roles, approval boundaries, period locking and audit/correction capabilities available in the chosen system. Financial exports, files and background posting must respect the organization and entity scope.

**ACT-08** Complete one reconciled end-to-end case and the agreed advance, supplier, cancellation/refund and currency/tax cases with Accounts sign-off. Provide configuration, mapping, operating notes and recovery procedures.

**Decision required:** Accounting software/version, official books owner, number of entities, package licenses, migration/opening balances, localization, bank statement formats, statutory submissions and reports. ERPNext/Frappe and incumbent-accounting integration remain alternatives; neither is adopted by this draft.

Payroll, HR, incentives and automated statutory filing are excluded unless added explicitly. Accountant validation and third-party compliance/product limitations remain client/provider dependencies; operational margin must not be labeled realized accounting profit without the agreed definition.

## 15 Phase 2 Internal Bali B2B DMC

Phase 2 delivers the internal Bali DMC system. Agency/agent organizations are its business customers. Bali Ops manages both commercial and fulfillment work, while Accounts manages incoming and outgoing payments.

**DMC-01** Maintain agency/company contacts, source and event-contact history, allocation to Ops, introduction/follow-up activities and active status. Prospect outreach records will remain distinct from specific trip queries and bookings.

**DMC-02** Create agency-linked queries with contact, destination, dates, passengers/ages, occupancy, budget/currency and requirements. Search/filter query queues by agency, handler, destination and commercial status.

**DMC-03** Build itineraries/quotation versions using the approved Bali catalogs, contracts, manual services and integration capabilities allocated to Phase 2. Retain agency pricing, inclusions, validity and negotiation history.

**DMC-04** Record the locked deal and accepted version separately from token receipt/verification. Start actual supplier booking through the approved deal-plus-token gate, with documented credit/urgency exceptions where agreed.

**DMC-05** Preserve quoted promises and separate actual procurement suppliers/costs. Ops may seek better equivalent options; changed promised hotels/services require the approved agency acceptance and revision process.

**DMC-06** Manage independent service reservation/confirmation and supplier cutoff states. Unavailable services, alternatives, changes, vouchers, rooming/document tasks and travel delivery will follow approved Bali policies.

**DMC-07** Provide agency collections, verification, balances, supplier liabilities/payments and accounting links. Currency, agency credit, settlement, refund and voucher rules must be agreed for Bali rather than copied from B2C examples.

**DMC-08** Provide internal dashboards, upcoming travel, payment queues, agency/handler reports, attributed history and permitted exports. All delivered buttons must perform a real action or clearly explain an unavailable operation.

**DMC-09** Maintain a separate B2B entry URL and approved internal access policy. B2C navigation will not expose the DMC workspace. Shared code does not automatically permit shared business data or credentials.

**Acceptance:** An internal Ops user takes an allocated agency contact through query, quote and locked deal; Accounts verifies the token; Ops records actual supplier bookings; Accounts handles liabilities and collection; Ops issues the permitted documents and completes the trip.

**Decision required:** Bali entity/currencies, agency credit, token threshold, voucher policy, quote approval, supplier/contract coverage, API reuse and finance/role scope. External agency/DMC logins to the B2B system are excluded from this project.

## 16 Phase 3 Third party B2C organizations

Phase 3 opens the B2C system to third-party travel agencies. It does not open the Bali B2B system to outside DMCs or agencies. Each external organization will receive only the B2C capabilities and commercial arrangement approved for this phase.

**EXT-01** Onboard approved third-party B2C travel agencies with company profile, organization administrator, enabled features, operational status and the agreed user limits. Proposed baseline is administrator-led onboarding; public self-registration requires a separate decision.

**EXT-02** Isolate business records, users, files, settings, exports, reports, cached results and background processing by organization. One agency must not access another agency's leads, travelers, prices, contracts, bookings or accounts.

**EXT-03** Apply an organization-specific access matrix for B2C Sales, managers, Ops, Accounts and administration. Organization administrators will not gain platform-wide rights by changing their own roles or requests.

**EXT-04** Define whether agencies use their own supplier contracts, accounting and API accounts, approved shared platform services, or a named combination. The system will enforce the selected ownership and charging rules.

**EXT-05** Provide the allocated B2C journey, brand/document settings and organization-scoped configuration. Features available to the internal client will not automatically be enabled for every agency.

**EXT-06** Provide controlled support access, organization suspension/reactivation and the agreed offboarding/data-export path. Staff access to agency data must be authorized and auditable.

**EXT-07** Apply agreed organization/user/usage limits and usage visibility. Subscription plans, billing, collection and entitlement automation will be included only if expressly selected and detailed before freeze.

**EXT-08** Pilot at least two separate test organizations and demonstrate denied cross-organization reads, writes, reports and files. Complete an external-agency trial of the agreed B2C journey and record issues before final acceptance.

**Decision required:** Hosted shared service versus separate installations, initial agency/user counts, white labeling/domains, integration/accounting ownership, platform support authority, commercial plans and data export/retention. The two test organizations are an acceptance scenario, not a cap on contracted production agencies.

Public traveler self-service booking, third-party B2B DMC access, a supplier marketplace and resale of the B2B product are excluded. Dedicated deployments for each agency, custom mobile apps and per-agency bespoke developments require explicit allocation or change control.

## 17 Communications and AI services

WhatsApp, email, IVR/calls and AI are part of the recorded product direction. Their phase allocation, provider accounts and exact production functions require confirmation in the final integration schedule.

**COM-01** Link permitted inbound/outbound conversations and call events to the correct lead, customer, agency or booking, with actor/time, provider references and send/delivery/failure states where supported.

**COM-02** Connect approved email accounts or service, provide the agreed templates and delivery/error handling, and restrict shared-mailbox visibility. User access must not expose another organization's messages or attachments.

**COM-03** Connect the approved official WhatsApp provider with authorized sender accounts, supported templates and incoming messages. Consent, service-window/template policies and usage charges depend on the contracted provider and client authorization.

**COM-04** Connect approved IVR/telephony events and the agreed call logging/click-to-call functions. Call recording, transcription, IVR trees, number provisioning and recording retention require explicit scope and provider support.

**COM-05** Implement the agreed follow-up, balance and operational notifications with clear recipient/rule selection, retry/status history and prevention of duplicate sends. Staff notes and visual reminders will remain separate from delivered messages.

**AI-01** Provide AI assistance for selected itinerary drafts, document extraction, summaries and the reporting capabilities in Section 18. Review and correction precede commercial sharing or other external actions; preserve input provenance and review decisions.

**AI-02** Flag missing, inconsistent and unreadable content instead of silently inventing hotels, service inclusions, prices, traveler facts or legal requirements. AI content must be distinguishable from verified contract/provider evidence.

**AI-03** Keep AI credentials server-side and apply agreed privacy, retention, usage/cost and access limits. Private traveler or contract data must not enter an unapproved model/provider.

**AI-04** Preserve useful drafts and provide recovery for provider timeouts, unsupported documents or extraction failures. AI cannot confirm inventory, approve tax, move funds or book suppliers autonomously.

**Decision required:** Communications/itinerary AI phase allocation, outbound/inbound scope, reminder channels, import formats, call recording and data consent. AI reporting is included as specified in Section 18. Bulk campaigns, autonomous customer-outreach chatbots and unattended AI booking are excluded unless separately agreed.

## 18 Reports documents and data ownership

Reporting includes on-demand AI reports across all data available from the delivered modules, alongside saved reports. Authorized Admin and CXO users can request a report in natural language, refine it through subsequent prompts and save it as a reusable template. This applies to B2C in Phase 1, internal Bali B2B in Phase 2 and permitted organization reporting in Phase 3.

**REP-01** Report Sales source, stage, owner/team, follow-ups and conversion using approved definitions. A lead label must not be equated with accepted sale or verified collection.

**REP-02** Report departures/arrivals, handler workload, missing documents, service confirmations, holds and payment deadlines. Actionable rows open the relevant permitted record.

**REP-03** Report customer/agency balances, supplier liabilities, payments and accounting reconciliation within authorized scope, with visible currency and accounting basis.

**REP-04** Report booking profitability and source/team analysis using approved cost, tax, fee, refund, currency and attribution rules. Distinguish procurement savings, gross margin and realized profit.

**REP-05** Report internal Bali agency/query/quote/booking performance and organization-specific B2C activity. Reports and exports enforce organization and field permissions.

**REP-06** Let authorized Admin and CXO users ask AI for reports in natural language about the data they need, including summaries, comparisons, trends, filtered details and grouped totals across available modules.

**REP-07** Accept subsequent prompts to refine the same report's period, filters, grouping, measures, comparisons and presentation while retaining the context of the user's earlier requests.

**REP-08** Generate tables, bar charts and other supported visualizations. Users can request a supported presentation; displayed charts and tables must reflect the same underlying report data.

**REP-09** Save a completed report as a named template retaining its data selection, measures, filters, grouping and presentation. Authorized users can find and reopen saved templates.

**REP-10** Run or refresh a saved template against current available data without repeating the original prompts. Retain the report definition; show the refresh time and permit approved period/filter changes.

**REP-11** Apply the user's current record and sensitive-field permissions to generation, follow-up prompts, saved templates and exports. Show report period, filters, units/currency and metric definitions; clarify ambiguous requests and explain missing or unavailable data without inventing results.

**DOC-01** Generate approved proposals/quotations, vouchers, receipts/invoices and finance documents with company identity, version, terms and permitted prices. Statutory layouts require Accounts approval.

**DOC-02** Keep source contracts, traveler files and internal supplier evidence private. Customer/supplier outputs contain permitted fields only; expiring/revocable share links require agreement if included.

**DAT-01** Distinguish company, agency, customer/traveler and supplier data from software IP. IP transfer does not override other parties' data rights or supplier licenses.

**Decision required:** Reporting data/metric definitions, supported visuals/exports, initial saved templates, template access, document designs, share links and retention. On-demand reports are included beyond an initial preset list; new data sources, payroll/incentive calculations and unsupported bespoke visualizations require separate scope. Cross-company reporting requires explicit authorization.

## 19 Quality security and nonfunctional requirements

Production delivery includes backend persistence, authorization, reliable business actions and documented operational recovery. The existing local demonstrations are discovery assets; they are not production security, integration or accounting evidence.

**NFR-01** Use a persistent data store with reliable transactional changes, versioning and constraints appropriate to financial and inventory actions. Partial failures must not leave contradictory booking/payment/capacity states.

**NFR-02** Prevent duplicate submissions and double posting through stable request identifiers and provider/accounting references. Detect concurrent/stale edits and provide an explicit refresh/review path.

**NFR-03** Protect production transport, credentials, private files and backups using the selected hosting and identity controls. Apply the approved organization, team, record and sensitive-field access policy throughout services and jobs.

**NFR-04** Retain auditable history for approvals, financial corrections, quote acceptance, supplier changes, access administration and external-provider operations. Logs must not expose secrets or unnecessarily replicate sensitive documents.

**NFR-05** Provide automated scheduled backups and complete a restore demonstration for the agreed dataset. Backup frequency, retention, restore time objective and acceptable data-loss window must be agreed with the hosting schedule.

**NFR-06** Provide operational logs, health/error visibility and alert ownership for integration failures, failed jobs, backup failures and important reconciliation exceptions. Client support and provider incident responsibilities will be documented.

**NFR-07** Support the agreed desktop browsers and responsive working views. Primary flows will offer readable text, labeled inputs, keyboard-operable actions, visible focus and understandable validation; formal certification requires separate scope.

**NFR-08** Define capacity and response targets against an agreed environment and dataset. Measure search/list/save performance under that workload; provider/network response time and internal processing must be reported separately.

**NFR-09** Separate test/production configuration and synthetic/real data. Deployment and rollback will preserve records; an environment error must not trigger a silent sample reset or destructive replacement.

**Decision required:** User/concurrency counts, records/files, browser support, availability/support targets, backup/restore objectives, retention, hosting region and security acceptance. Penetration testing by an independent assessor, formal compliance certification and an unconditional 24-hour support SLA are excluded unless agreed.

## 20 Data migration and deployment

The implementation will include the agreed initial data setup and migration boundary. Existing spreadsheet headers do not prove data quality, formulas, completeness or current accounting balances.

**MIG-01** Prepare an inventory of source systems/files and agreed record types, including users, suppliers, agencies/customers, contracts, active leads/bookings and accounting opening data where selected.

**MIG-02** Approve mappings, identifiers, duplicate handling, required fields and error rules before import. The client will validate source data and resolve missing or conflicting business facts.

**MIG-03** Execute a sample migration and report accepted/rejected records, totals and reconciled balances. Final migration will use the approved extraction date and cutover plan; reruns must avoid duplicates.

**MIG-04** Keep source files unchanged and private. Import errors will remain reviewable, and accounting opening balances will require Accounts approval before production use.

**DEP-01** Provision the agreed environments, domains, production identity and selected application/accounting components. Hosting and provider accounts will have named owners and recurring-cost responsibility.

**DEP-02** Configure approved integrations, webhooks, scheduled jobs, file storage, monitoring and backups. Verify the live production domain and permissions, rather than relying on successful local builds.

**DEP-03** Perform a documented release with data backup, smoke checks, change notes and rollback steps. Client go-live authorization will follow UAT acceptance and known-issue review.

**DEP-04** Provide staff onboarding and operational training for B2C, internal Bali DMC and third-party B2C administration as allocated in the delivery schedule.

**Decision required:** Source systems, historical period, record/file volumes, number of migration runs, legacy integrations, hosting accounts/regions, domains and training sessions. Proposed migration baseline is approved masters, active operational records and opening accounting balances; full historical reconstruction requires explicit agreement.

Live two-way Google Sheets synchronization, indefinite data cleaning, migration of all competitor history and ongoing manual source correction are excluded unless listed. Existing planner/demo databases are not automatically production travel databases.

## 21 Deliverables and milestone completion

The delivery company will prepare the following outputs for review. Each phase's requirements, integration schedule and acceptance cases must be traceable in the completion pack.

| Milestone | Required delivery pack | Completion condition |
| --- | --- | --- |
| Kickoff and freeze | Approved SOW, requirement/decision register, access and policy matrices, provider schedule, data and delivery plan | Parties agree the baseline and required inputs; advance received |
| Phase 1 B2C | Running B2C system; approved live hotel/flight/lead/accounting integrations; contracts; quotation/fulfillment/finance/docs; access controls; UAT evidence and operating notes | Phase 1 UAT passes against the approved scope and client records written acceptance |
| Phase 2 Bali B2B | Running internal DMC system; agency/query/accepted-deal/token/booking/payment/voucher journey; approved accounting/integration links; UAT and training | Phase 2 UAT passes, internal access boundary verified and client records written acceptance |
| Phase 3 external B2C | Approved organization onboarding; allocated B2C workflows; isolated records/settings/files/reports; external pilot; support/offboarding functions | Phase 3 UAT and isolation cases pass; client records acceptance |
| Final completion | Approved production deployment, reconciled final migration, known-issue register, training, final technical/business documentation and complete handover package | All selected scope accepted and final handover package ready; IP/package released after full payment |

**DEL-01** Provide version-controlled custom source, database/migration definitions, configuration guidance, integration mappings and build/deployment instructions as part of the final handover package.

**DEL-02** Provide business operating guides, role/access rules, accounting posting/reconciliation notes, backup/restore and provider failure/retry procedures relevant to delivered functions.

**DEL-03** Provide acceptance evidence and known limitations. Demonstration data or a provider mock will not substitute for an agreed production integration deliverable.

**DEL-04** Identify third-party and pre-existing components, versions and license terms, recurring services and nontransferable account rights. Maintain an approved inventory before final transfer.

**DEL-05** Demonstrate that the handed-over custom application can be built and deployed from the package in the agreed environment, with client-controlled or properly transferred access.

The parties will agree invoice/payment due periods and post-completion support terms. Completion evidence, client acceptance, final invoice payment and IP transfer are separate recorded events.

## 22 User acceptance testing

The client will nominate Sales, Ops, Accounts and administrator representatives for UAT. Accounts or its appointed accountant must approve financial expectations. The delivery team will supply scenarios, test data, evidence and a defect register.

| Case | Required acceptance result |
| --- | --- |
| UAT-01 Lead ingestion | Approved sources create correct records; duplicate event replay creates no duplicate; a failure can be reviewed/recovered |
| UAT-02 Allocation and follow-up | Approved manual/batch/auto rules work; executive reassignment is denied; callbacks and overdue work retain history |
| UAT-03 Itinerary | Lead context, multiple stays, age/room/date rules and supported import review work without duplicate hotel charging |
| UAT-04 Pricing and versions | Correct units/tax/FX/rounding; source and validity visible; accepted versions unchanged after catalog or draft updates |
| UAT-05 Live APIs | Named hotel/flight operations work; expired/unavailable/changed offers and uncertain outcomes follow agreed recovery |
| UAT-06 Contracts and inventory | Applicable rates/restrictions match examples; agreed finite holds/capacity cannot oversell; expiry releases as approved |
| UAT-07 Handover | Payment verification and readiness gate work; Ops receives the accepted promise and permitted Sales projection |
| UAT-08 Procurement and Ops | Equivalent supplier and scope changes follow policy; pay-to-confirm/hold deadlines, documents and vouchers behave correctly |
| UAT-09 Financial control | Pending/rejected/verified receipts, duplicates, instalments, corrections and refunds produce expected balances/history |
| UAT-10 Accounting | Approved cases reconcile booking records with ledger entries, taxes, customer/supplier balances and reports |
| UAT-11 Bali DMC | Agency contact to locked quote/token to procurement, payments and travel completion follows Bali rules |
| UAT-12 Third-party B2C | Two organizations complete allocated B2C flows and cannot access each other's records, APIs, files, exports or jobs |
| UAT-13 Permissions | Direct requests, combined roles, cost fields, disabled users and support/admin boundaries obey approved matrix |
| UAT-14 Recovery and deployment | Failed/repeated writes recover without duplicates; backup restores; release/rollback and production smoke checks pass |
| UAT-15 Outputs and usability | Agreed document/report samples, themes, supported browsers and main responsive flows pass review |
| UAT-16 AI reporting | Admin/CXO requests a report, refines it, creates a table/chart and saves a template; refresh uses current data without new prompts; unauthorized data remains inaccessible |

A defect means a delivered function fails the approved requirement or expected result. A new feature, changed policy, new provider or different approved output is assessed through change control.

Acceptance requires successful applicable cases, no unresolved critical/high defects, and a written agreement on any remaining lower-severity defects with owners and resolution dates. Test scope, review duration and severity definitions will be finalized at freeze. Silence or expiry of a review period is not treated as acceptance in this draft.

## 23 Client responsibilities and dependencies

The client will supply business authority, access and data required to implement and validate the system. The delivery company will record dependencies and notify the client of material issues with a proposed resolution.

**CLI-01** Nominate a project owner and authorized Sales, B2C Ops, Bali Ops, Accounts and administrator reviewers. Consolidate conflicting feedback and approve decisions through the agreed project channel.

**CLI-02** Provide legal entities, branding, document terms, role/visibility matrix, workflow approvals and destination-specific operating rules. An employee's suggestion will not become a compulsory policy until the authorized reviewer approves it.

**CLI-03** Provide accounting software/version, accountant access and validated posting/tax/currency examples. Approve opening balances, report definitions and financial reconciliation outcomes.

**CLI-04** Arrange provider contracts, approved API access, sandbox/production credentials, commercial balances/credit and permissions for hotel, flight, lead, communications and AI services included in the signed scope.

**CLI-05** Provide redacted representative contracts, supported inventory classifications, clean migration files and lawful rights to use traveler, supplier, contact and third-party agency data.

**CLI-06** Review designs, integration limitations and UAT within the agreed review windows; provide go-live authorization and named operating/support owners.

**CLI-07** Approve and fund recurring infrastructure, provider, license and usage costs according to the commercial schedule. Their inclusion in the INR 21,00,000 fee remains an open commercial item until confirmed.

**DEV-01** The delivery company will manage design/build/integration, configuration and release work; maintain source/docs; perform agreed verification; correct defects within scope; and prepare the complete handover package.

**DEV-02** The delivery company will identify unsupported provider operations, material security/data risks and schedule effects promptly. It will not claim a successful booking, payment, delivery or ledger posting without the relevant evidence.

Dependencies and any changes to the three-month plan will be agreed in writing. The final agreement should state how delayed client inputs, provider approval, external outages or scope changes affect delivery dates and costs; automatic extension terms are not assumed here.

## 24 Exclusions and bounded extensions

The following items are outside the baseline unless expressly added through a signed scope allocation or change request. An exclusion does not remove the B2C accounting, lead ingestion, itinerary, API and offline-contract capabilities expressly included in Phase 1.

- Third-party access, licensing or onboarding to the B2B DMC system; external DMC use of that system; a B2B marketplace or external B2B agent storefront.
- Public direct-traveler self-service booking portal, native Android/iOS apps and unrelated marketing websites.
- Unlimited suppliers, API providers, accounting connectors, bespoke destination rules, brands, legal entities or historical migration; quantities must be agreed. On-demand AI reports over available authorized data are included; new external data sources and bespoke visualizations outside supported reporting capabilities require separate scope.
- Supplier-portal scraping, unattended browser booking and integrations without commercial/API access; universal GDS/airline coverage.
- Flight ticket issuance, provider booking/cancellation/refund endpoints, automated payments and banking connections not named in the integration schedule.
- HR, payroll, employee incentives, lending, staff training platforms and unrelated ERP modules.
- Advertising campaign creation/optimization, ad spend, bulk marketing campaigns, autonomous calling/messaging and autonomous AI supplier booking.
- Arbitrary document layout cloning, unlimited OCR/document formats and guaranteed correctness of AI output without review.
- Automated filing of statutory returns, professional tax/legal advice, independent compliance certification or penetration testing unless separately contracted.
- Unlimited historical reconstruction, data remediation, indefinite source-system synchronization and ongoing manual operations by the delivery team.
- Dedicated per-agency deployments, custom features for individual external agencies, subscription billing/self-service registration or per-agency accounting/API integrations not allocated to Phase 3.
- Unconditional continuous support, unlimited maintenance, future roadmap features or third-party license/usage fees unless included explicitly in the commercial schedule.

A client request to add an excluded function will be assessed against the approved baseline. If it is required to meet an already approved requirement, the parties will resolve the interpretation and dependency; the delivery team will not use an exclusion to remove a named commitment unilaterally.

Existing prototypes may contain demonstration-only pages or controls. Production delivery will either implement an approved action, remove it from the relevant production scope or explain the unavailable function without a misleading success message.

## 25 Decisions required before scope freeze

The following items must be completed, or assigned a specific written resolution date and agreed consequence, before they can form a fixed implementation boundary. An unresolved item is not authorization for unlimited functionality.

| ID | Decision to record | Approval owner |
| --- | --- | --- |
| DEC-01 | Legal names, signatories, GST basis; Indian bank/international settlement details, USDT network, conversion and transfer charges | Owner, commercial |
| DEC-02 | Named B2C/Bali legal entities, branches, currencies, destinations and brands | Owner, Accounts, Ops |
| DEC-03 | Accounting product/version, authoritative books, connector direction, licenses, financial transaction/report schedule | Owner, Accounts, accountant |
| DEC-04 | Hotel/flight providers and counts; search/reprice/booking/ticketing/cancellation coverage and access dates | Owner, Ops |
| DEC-05 | Lead sources/form counts/mappings, deduplication, routing, lifecycle and SLA policies | Sales owner |
| DEC-06 | Real AI/import formats/OCR and WhatsApp/email/IVR functions/providers; phase allocation | Owner, Sales, Ops |
| DEC-07 | Offline hotel/flight contract types, dated capacity, holds/releases and supported import dimensions | Ops, Accounts |
| DEC-08 | Price/tax/FX/rounding, discounts, quotation expiry/acceptance and procurement approval | Sales, Accounts, Ops |
| DEC-09 | Token/receipt gate, Sales readiness, Ops visibility/editing/cover, post-handover field access | Owner, Sales, Ops, Accounts |
| DEC-10 | Guest/supplier deadlines, voucher release, visa/arrival obligations and cancellation/refund exceptions | Ops, Accounts |
| DEC-11 | User/role matrix, organization isolation, platform support authority and private-file retention | Owner, admin |
| DEC-12 | Third-party B2C agency counts, hosted/deployment model, enabled features, own/shared contracts/APIs/accounting | Owner |
| DEC-13 | Agency onboarding, user limits, white labeling/domains, subscription billing and offboarding | Owner, commercial |
| DEC-14 | Reporting metrics/data, Admin/CXO scope, supported visuals/exports, saved-template access and document designs | Owner, Accounts, team leads |
| DEC-15 | Migration sources/volumes/history, opening balances, cutover, training sessions | Owner, Accounts, admin |
| DEC-16 | Hosting/usage/license costs, capacity, backups/restore, browser/performance/support targets | Owner, technical |
| DEC-17 | Phase review dates, UAT duration/severity, payment due period, warranty and later maintenance | Both parties |
| DEC-18 | Advance receipt/start date, three-calendar-month completion date and dependency/change treatment | Both parties |

Confirmed boundary: Phase 3 serves third-party B2C travel agencies only. External use of B2B by third-party DMCs is excluded.

## 26 Commercial terms and project IP

The agreed total project fee is **INR 21,00,000**. Each of the four agreed installments is **INR 5,25,000**, before any applicable tax treatment is finalized. The parties must state whether GST is additional or included before issuing the signed commercial baseline.

| Payment | Trigger | Percent | INR basis |
| --- | --- | --- | --- |
| 1 Advance | Indian bank transfer; receipt initiates the three-month delivery period | 25 | 5,25,000 |
| 2 B2C completion | Phase 1 completion and acceptance; USDT or EUR international transfer | 25 | 5,25,000 |
| 3 Bali B2B completion | Phase 2 completion and acceptance; USDT or EUR international transfer | 25 | 5,25,000 |
| 4 Final completion | Phase 3/final completion and acceptance; USDT or EUR international transfer | 25 | 5,25,000 |
| Total | All three phases | 100 | 21,00,000 |

**Payment routing:** The first tranche will be paid in INR to the delivery company's designated Indian bank account. The remaining three tranches will be settled in USDT to the designated wallet on an agreed network, or in EUR by transfer to the designated international bank account. Beneficiary and wallet instructions will be supplied separately in writing.

The INR amounts remain the contractual value basis. Before each international payment, the parties will agree the settlement currency, INR conversion rate/source and date, amount payable, transfer/network charges and receipt criteria. No fixed EUR or USDT amount or exchange rate is established by this draft.

**Commercial fields to complete:** GST, invoice/payment-due and withholding terms; settlement instructions/conversion/charges; recurring costs; warranty/maintenance; and master agreement terms.

**IP-01** Upon project completion and receipt of full payment, the delivery company will transfer the complete project-specific intellectual property created for the client, including custom source code, bespoke business logic, custom schemas/migrations, configuration assets, designs and delivered documentation, subject to the final assignment agreement.

**IP-02** Third-party software, open-source components, standard accounting products, libraries, provider services and pre-existing materials remain subject to their original licenses and owners. They will be disclosed; the client will receive the rights necessary to use the delivered system as agreed. The delivery company cannot assign ownership of rights it does not hold.

**IP-03** The final handover pack will include the repository/source, build/deploy instructions, dependency/license inventory, database/migration material, integrations, backup/recovery guides and operating documentation. Credentials will be transferred securely or reissued under client-controlled accounts.

**IP-04** At final acceptance, the complete handover package will be ready for review and release. Full project IP assignment and final source/access handover follow completion and full payment; the parties will document the acceptance, invoice and transfer sequence so final review remains possible.

Project software IP and customer/supplier/agency data ownership are separate matters. Rights to supplier contracts, provider inventories and third-party agency records require the relevant agreements.

## 27 Change control warranty and handover

After scope freeze, each proposed change will receive an identifier and a written description. The parties will classify it as an in-scope defect, clarification or change before adjusting the delivery baseline.

**CHG-01** A change request will specify the affected requirement/version, requested result, reason, effort and fee, delivery-date impact, migration/integration implications and acceptance conditions. The project owner will approve or reject it in writing.

**CHG-02** Approval will update the SOW or a linked change schedule, requirement status, delivery plan and commercial milestone impact. Unapproved discussion, prototype experiments and competitor features will not amend the fixed scope.

**CHG-03** Defects against the accepted baseline will be tracked and corrected under the agreed delivery/warranty terms. A provider changing its API, policy or commercial terms after baseline approval will be assessed with its effect on supported obligations.

**SUP-01** The final agreement will state the defect warranty period from production acceptance, supported hours, severity/response rules, support channel and responsibility for hosting/provider incidents. No duration or guaranteed response time is agreed by this draft.

**SUP-02** Ongoing enhancements, maintenance, infrastructure operation, provider charges and future organization-specific development require an agreed maintenance or service schedule. The project fee does not imply unlimited future development.

**HOV-01** Confirm the final requirement/acceptance register, known issues, approved production release, data reconciliation, training, source/configuration package, license inventory, backup/restore demonstration and client-controlled access before final handover.

**HOV-02** Record completed IP transfer and final payment, repository/package version, delivery date, account ownership and the client recipient. Open lower-severity issues will retain agreed owners and dates; they will not disappear from the handover record.

The parties will complete confidentiality, data processing, governing law, liability, termination and dispute terms in their master agreement or final contract. This SOW does not invent those obligations.

## 28 Scope approval and signatures

By signing the final approved version, the parties confirm the selected three-phase scope, requirement and integration schedules, approved policies, exclusions, acceptance conditions, commercial amounts and IP transfer basis. They acknowledge the decision register and any explicitly approved deferrals or exceptions.

| Freeze checklist | Recorded outcome |
| --- | --- |
| Requirements and phase allocations reviewed | To be completed |
| DEC-01 through DEC-18 resolved or explicitly scheduled with agreed consequences | To be completed |
| Access matrix and workflow/pricing/accounting policies approved | To be completed |
| Providers, operations, counts, accounts and recurring-cost ownership confirmed | To be completed |
| Phase 3 restricted to third-party B2C agencies; external B2B excluded | Confirmed project boundary |
| UAT, deliverables, dependency treatment and handover agreed | To be completed |
| Total fee, tax basis, installment triggers and payment due period agreed | To be completed |
| Advance receipt/start date and three-month completion date recorded | To be completed |

**Approved SOW version:** ____________________  
**Advance receipt and project start date:** ____________________  
**Completion date three calendar months later:** ____________________  
**Approved schedules or change references:** ____________________

| Client approval | Delivery company approval |
| --- | --- |
| Legal entity: ____________________ | Legal entity: ____________________ |
| Authorized name: ____________________ | Authorized name: ____________________ |
| Designation: ____________________ | Designation: ____________________ |
| Signature: ____________________ | Signature: ____________________ |
| Date: ____________________ | Date: ____________________ |

Until the final baseline is approved, this document remains a review draft. No signature, client validation or production completion is asserted by its preparation.
