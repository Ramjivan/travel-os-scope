# Observed TripboxCRM entities and rules

This is a conceptual map derived from the UI, not the vendor database or API schema. Owner,9–10October2026. Sources: [screen index](../README.md), [initial journey](../flows/lead-to-quote-and-collections.md), [repository and confirmation journey](../flows/repository-to-itinerary.md), [sessions](../sessions/evidence-index.md).

| Entity | Visible fields and relationships | Evidenced distinction |
| --- | --- | --- |
| Lead | Numeric ID, guest/contact, source, destinations, planned date, nights, passenger types, inclusions, agency/owner/tags, comments/documents | Lead status is independent of itinerary confirmation |
| Customer | Name/email/phones, dates, nationality/location/address, family, tags/notes, documents, lead/booking/campaign history | Automatically linked after the first enquiry; matching rules unknown |
| Agency/contact | Business name/address/status; separate contacts with name/email/phone/region/default; portal users | Agency contacts are separate from the customer directory |
| Itinerary | UUID, parent lead, route/stops/dates/duration/currency/passengers, hotels/day activities/transport/flights/custom services, policies/pricing | Proposed quote and confirmed operations are separate; inventory snapshots independent |
| Hotel snapshot | Room/meal/occupancy/rooms/extra beds/dates/nightly rates/description | Custom nightly rate edits are local to the quote; shared hotel not edited |
| Activity snapshot | Day, service/rate, guest quantity, SIC/PVT, description | Activity and passenger costs update the live quote |
| Transport snapshot | Day/start time/duration/service price/quantity/vehicle/rate/capacity/description | Inspected draft discarded; calculations unverified |
| Custom service | Placement/fulfillment/location/dates/description/pricing/custom fields | Handled internally or Supplier fulfilled; Fixed total, Per unit, By traveler |
| Collection schedule | Description/currency/amount/due date, attachments, receipt list, state | Can exist while itinerary is Proposed; amount does not automatically track later quote changes |
| Receipt | Amount/date/method/reference/notes/evidence/verification | Logging differs from verification and actual fund transfer |
| Guest ledger | Date/particulars/travel details/reference/debit/receipt/running balance | Includes unverified receipt; UI help says cancelled/junk schedules excluded |
| Template | Reusable route/service plan, tags/favourite/portal visibility | Library inspected; no template saved or applied |
| Report | Personal/shared definition, date/group/measures/chart/filters | Saved definition reflects updated lead state |
| Campaign | Named status, contact queue and team | Empty saved campaign did not initiate communication |

## Status vocabulary

Lead: New Query, In Progress, On Hold, Confirmed, Ongoing Trip, Trip Completed, Cancelled. Lists abbreviate some as New queries, In progress, Ongoing, Completed. Itinerary: Proposed/Confirmed persisted; Cancelled filter visible. Booking status: Pending, In Progress, Booked, Changed, Cancelled; Booked saved as internal dummy status. Payment filters: Pending, Partially paid, Paid, Verified, Overdue, Junk; card **Partial** and list **partial** observed. Campaign: Pending, Active, Completed, Cancelled. Campaign contacts: New, Assigned, Contacted, Closed; outcomes Interested, Not interested, No answer. Customer **Won** appeared after lead confirmation.

## Tested rules and described rules

Tested outcomes include five required lead fields, a simple 10% markup, four custom hotel nights, activity passenger cost, refresh persistence, manual lead confirmation, report conversion update, partial receipt balance, schedule/quote difference, booking gate and guest-ledger availability. Exact examples and sources are in the linked screen records; one example does not establish all boundary cases.

UI descriptions cover portal cost visibility and permissions, tax bases, preferred currency rates before live rates, seasonal prices, exact-city image priority, automation/routing and MCP tools. These were not executed. Hidden validation, rounding/conversion, capacity, backend isolation, transactions and provider/API contracts remain unknown.

## Later verified relationships

Repository hotel room/BB rates fed three seasonal3000 nights plus standard2000night into an11000 itinerary snapshot. Checkout excluded in this example. Itinerary editors explicitly preserve snapshot independence. Activity standardadult500×2 produced1000. Supplier contact first-record default appeared despite form switch off; PreferredSupplier lookup failed while booking supplier lookup succeeded. Neither anomaly establishes the general rule (S11/S04).

Balanced collection allocations31240 enabled itinerary confirmation, initial price snapshot and booking controls. BookingHotel B internally created11000Pending supplier payable; receipt logging remains separate from verification. The report verified-payment columns exclude the4000unverified receipt, while guest ledger includes it. Annual supplier report still0 despite pendingpayable, unresolved (S06/S16).

Organisation qualification definition propagated to lead edit/detail and report group/filter/factor dimensions. TemplateB saves relative route/hotel nights/day-index transport/quantity/inclusion, with no calendar dates or quote occupancy/prices in inspected template fields; favourite persisted, tagdefinition saved but assignment unconfirmed (S14/S15/S16). These relationships are observed UI behavior, not a relational schema.

Later TemplateB applied to LeadB: HotelBB6000 and inclusive3daytransport4500; saved manualflight500 yields11000. RepositoryHB addition did not update the existing saved hotel snapshot; fresh snapshot offersHB. General10% applies ground10500 separately from travel500; travelmarkup100, tax basis and currency variants are evidenced in S04/S12. ManualUSD100 rate differed from reload96.64; precision/persistence unresolved.

HouseholdC stores spouse/child/tag and joins PendingCampaignA as New/Interested with notes; no communication or assignee. LeadB can associateAgencyA and contact separately from its travellerCustomerB. Saved custom field also propagates to columns/personalfilters/bulk editing (S05/S07/S08). QuoteB reconciliation createsPending11000 schedule and independently saved fictional attachment (S06). Earlier empty/untested rows above describe first-pass evidence and are superseded by these linked outcomes.
