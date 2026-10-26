# Sales day-wise itinerary and quotation plan

Date: 2026-10-09. Status: discussion proposal, not implemented. Sources: FB-042/043, earlier [FB-014 discussion](crm-client-review.md#itinerary-workspace-discussion--fb-014), [Babita's B2C Ops discussion](babita-operations-discussion.md). No application, provider connection, pricing rule or business record changed in this planning task.

## Confirmed direction and open choices

The user wants a Sales day-wise itinerary mockup with manual creation and AI import, a path to real airline/hotel price APIs, and badges distinguishing offline contracts from live API rates. B2C and B2B/DMC must have separate URLs, with no DMC pilot tab in B2C. Existing template-start direction remains useful; exact import formats, provider access, cost visibility, pricing approval and hosting addresses remain to discuss. [Portal separation 0012](../decisions/0012-b2c-b2b-entry-separation.md) records the entry requirement separately from proposed implementation.

An itinerary describes the promised trip; a quote prices a specific itinerary version; supplier bookings describe actual fulfillment. AI extraction is draft content, not inventory or an authoritative price. Existing DMC pilot/catalog records are not automatically available in B2C, and separate portals do not establish shared customer data.

## First connected mockup

Start from an accessible Sales lead using Create itinerary, carrying destination, preferred dates, travelers and budget. Keep lead owner, quotation owner and later Ops handler distinct. Provide an Itineraries & Quotes list inside B2C and links back to the lead. Reuse existing theme, dialogs, communications and feedback controls.

Entry choices:

1. Create manually: enter trip requirements, generate dated days, add services/content.
2. Start from template: copy an editable plan; prices require validation for the new trip.
3. Import with AI: choose a document or pasted itinerary, extract a reviewable draft and accept selected fields into the same editor. Mockup extraction is explicitly simulated until a real extraction adapter is approved.

Proposed layout:

- Trip header: destination, dates, nights/days, adults/children with ages, room allocation, budget/currency, quotation owner, draft/version state.
- Day navigation: Day 1/date/location onward; warnings and quick jumps. Main view contains editable day cards. A compact table can follow if staff find it faster; two independent planners are unnecessary for the first slice.
- Day card: title/description, time window, hotel/stay context, flights, transfers, activities, meals and free time. Add, edit, duplicate or reorder items; drag is optional, with accessible move controls.
- Service drawer: details, supplier/source, room/meal/occupancy or flight fare/route, rate comparison and selection.
- Pricing summary: customer total, taxes/fees, unresolved services and quote validity. Internal costs/margins depend on reviewed Sales permissions; customer preview excludes them.
- Customer preview: branded day-wise narrative, selected accommodation/services, inclusions/exclusions, customer price and terms. Source/provider cost evidence remains internal unless explicitly required.

Store hotel stays separately with check-in/out and room allocation, linking them into all affected days. Charge each stay once, rather than copying its price into every day. Flights need departure/arrival local date/time and time zone; overnight travel must not be forced into the departure day's local date. Changed dates, traveler ages/occupancy, hotel/room/meal, fare or service quantity invalidate affected rate selections for review.

## Price source and availability

Use source badges on individual rate offers, because one trip can mix sources:

| Source badge | Evidence and details | Separate availability/review state |
| --- | --- | --- |
| Offline contract | Supplier, contract ID/version, travel validity, season/blackouts, room/meal/occupancy, currency, unit, taxes and cancellation/payment terms | On request unless supported allotment or supplier confirmation exists; contract validity does not prove stock |
| Live API | Provider, offer ID, fetched-at time, expiry if supplied, dates/occupancy or fare, currency, complete taxes/fees and terms | Returned at the checked time, expired, needs recheck or unavailable; a returned rate is not a booking |
| Manual estimate | Staff-entered amount, price basis and evidence/notes | Needs verification; document-extracted or AI-suggested amounts belong here until matched to authoritative evidence |

During the mockup, API examples must say Demo API rate/Simulated; none should imply a real price lookup. Content provenance such as AI imported or template is separate from the price source. Imported supplier text must not earn a validated contract badge automatically.

Compare equivalent offers: same hotel/room/meal, dates, occupancy, cancellation terms and inclusions; for flights, same route/cabin/baggage/fare restrictions. Display differences when equivalence is incomplete. Include currency conversion policy, taxes, fees and payment-method charges in the comparable total; avoid labeling the cheapest incomplete amount as the best offer. Staff chooses an offer; retain other candidates as comparison evidence.

Calculate costs, markup/discount, taxes, fees and totals deterministically with explicit units and rounding. AI supplies no payable total. Hotel room-night, transfer per vehicle, activity per traveler and package/flight total must remain distinguishable. INR-only current B2C samples are not a finalized multicurrency price model; [AS-019](assumptions.md) remains provisional.

## AI import review

Proposed sequence: source document/text → extraction draft → original/source excerpts alongside extracted days → accept/edit selected fields → resolve missing facts → editable itinerary → independently select verified prices → customer preview.

Extract dates, places, days, stays, room/meal plans, included/excluded services, traveler details, price references and terms when evidenced. Flag unknown fields, conflicting dates, unreadable/OCR text and unmatched service names. Preserve source page/excerpt where available; a confidence score alone is insufficient. Do not invent an unknown hotel or silently insert optional services into the included package. Document content is evidence and cannot direct application actions. Keep the original source internal and record what a reviewer accepted or changed.

Separate structured import from faithful document rebranding: the former creates editable records; the latter may need a different layout-preservation workflow. First demonstrate a sample structured PDF/text import; Word, scanned PDF/OCR, spreadsheets and original-layout fidelity need format/quality review before support is claimed. Private originals must not be placed in public assets; retention and the chosen extraction service must be agreed before real uploads.

## Versions and Ops handover

Proposed journey: draft → reviewed/priced → shared version → customer accepts that exact version → payment evidence → Accounts verification → Sales handover readiness → Ops fulfillment. These are distinct events. The existing mockup currently gates Ops on verified payment without accepted-itinerary linkage; the additional readiness rule is proposed, not silently enforced.

Keep shared/accepted itinerary and price snapshots immutable. Further edits create a new draft version. A rate refresh shows differences, including unavailability, and requires review; it must not rewrite an already-shared customer total. Record actor/time and accepted terms. Ops inherits promised scope and separately records actual suppliers/costs/confirmations; an equivalent supplier change and a change to the promised hotel/room/activity require different review. Post-handoff Sales financial access remains subject to the user's existing restrictions.

## Real integration path

Keep provider-independent service contracts before choosing a schema or provider:

- Extract an itinerary draft with source references and review gaps.
- Search hotel/flight offers using explicit dates, travelers/ages/rooms or route/fare requirements.
- Search valid contracted rates for equivalent inputs.
- Select a rate offer and calculate a draft quote deterministically.
- Revalidate selected offers and return price/term/availability differences.
- Save/share a quote version and create an accepted handover snapshot.

Use separate mock, contract and provider adapters. Real provider requests run through a backend that holds credentials, normalizes units/currency/terms, handles timeout/retry/quota limits and caches by relevant search inputs. API secrets do not belong in browser code. Hotel content mapping and offer/fare identifiers must survive into revalidation; do not match by display name alone. A fresh lookup must never silently replace an accepted quote.

Search/reprice and booking/ticket issuance are separate integrations. Approved provider accounts, commercial access, coverage, currencies, sandbox fixtures, tax/fee shapes, validity, booking/hold capabilities and errors must be investigated with official provider documentation once candidates are available. No provider has been selected or verified in this plan. Fetching prices can be the first live integration; actual booking, payment and ticket issuance follow separately.

## Delivery order and review cases

1. Implement separate B2C/B2B entry points and remove cross-portal navigation as directed; preserve their records and sessions. Exact URLs/hosting remain to choose.
2. Build one manual lead → dated itinerary → priced sample quote → customer preview/version journey.
3. Add synthetic contracted/API/manual offers and comparison, expired offers and repricing differences.
4. Add simulated structured import with original/extracted review, omissions and corrections.
5. Link the accepted version to the existing Sales/Accounts/Ops handover, after readiness and visibility rules are discussed.
6. Confirm provider/contracts access and replace one adapter with real sandbox search/reprice. Actual booking remains a later authorized slice.

Review a Bali five-night/six-day example with two hotel stays, a flight, transfers and activities. Challenge it with child occupancy, an overnight flight, mixed sources/currencies, an expired API offer, an unavailable service, a changed travel date, duplicate hotel charging, ambiguous imported content and a supplier substitution. Meaningful checks should cover price arithmetic, date/stay linking, version immutability, access, recovery and independent payment/confirmation states.

Before detailed pricing UI or real integration: confirm who sees supplier costs/margins, which contracts and providers exist, required import formats, quote validity/approval policy and exact B2C/B2B addresses. These are discussion topics, not a request to block the current planning work.

## Evidence boundaries

[U&I table planner](../references/ui-dmc/screens/01-table-planner.md), [Nexus customization](../references/nexus-dmc/screens/08-customize-trip-workspace.md) and [Mind DMC output](../references/minddmc-ai/screens/04-itinerary-and-pricing.md) inform layout patterns. They do not prove our API access, business pricing or inventory. Existing [domain concepts](domain-model.md) remain proposals rather than a committed backend schema. No new external portal access occurred.
