# TripboxCRM fictional audit records

Created 2026-10-09 using the authorised Owner demo account. Names start with `TOS-AUDIT`; lead reference is `TOS-AUDIT-20261009-A`. Only our new fictional records were changed. No existing records reset/deleted, real traveller identifiers, communications, reservations or fund transfers. Emails use example.invalid; phones left empty. Fixtures retained for review.

| Record | Portal ID / route | Values and relationship | Final retained state / evidence |
| --- | --- | --- | --- |
| Lead | `1`, `/leads/1` | TOS-AUDIT Fictional Traveller A; traveller-a@example.invalid; Social Media; Bali; 20 Nov 2026; 4 nights/5 days; 2 adults, no children/infants; Fictional Departure City; Hotels/Tour on, Flights off; current Owner; direct customer, no agency | New Query → In Progress after itinerary → manually Confirmed; refresh retained. 004/005, L077/L109 |
| Customer | ID not exposed | Automatically linked fictional name/email from lead | One customer; profile/lead history inspected; Won after confirmation. L101–103 |
| Itinerary | `8f8c639a-f315-444d-8cee-a031689e42f5`, under `/leads/1/itinerary/` | Indonesia (Bali), 20–24 Nov, 2 adults, INR; custom service TOS-AUDIT Internal trip planning, Trip-wide/Handled internally/Fixed total 10,000; hotel/activity below; markup 10%, no tax | Proposed; base 16,400, markup 1,640, sell 18,040, per adult 9,020. Refresh retained; approval did not confirm. L076/L123, 009 |
| Hotel snapshot | Inside itinerary | Alam Puisi Ubud, Ubud/4 Star; Standard Double, BB, 20–24 Nov/4 nights; 2 guests/room, 1 room, 0 adult extra beds; quote-local nightly costs 1,000 | Total 4,000; shared catalog not edited. L113; rate editing in additional session notes |
| Activity snapshot | Day 1 | Benoa Water Sports, Kuta/Attractions, SIC; adult rate 1,200 × 2 | Total 2,400; saved/refreshed. L069–070/L076 |
| Collection schedule | Internal ID not exposed; display ref `SCH-76FDEB`; lead Payments | TOS-AUDIT Fictional collection plan; INR 15,400 due 10 Nov 2026 | Partial; 4,000 received, 11,400 remaining, 26.0%; unchanged after quote rose to 18,040, leaving 2,640 unaccounted. L083/L110–111, 008 |
| Receipt | Internal ID not exposed; schedule history | INR 4,000, 9 Oct 2026, Other; reference TOS-AUDIT-NO-REAL-TRANSACTION; explicit fictional/no-funds notes | Logged, unverified, no attachment; guest ledger marks Pending verification. L083/L111 |
| Agency | ID not exposed; `/org/agencies` | TOS-AUDIT Fictional Agency A, fictional audit address | Active; no portal users or lead association. L106 |
| Agency contact | ID not exposed; agency drawer | TOS-AUDIT Fictional Agency Contact; agency-a@example.invalid; phone/region empty; Default off | Saved/viewed; no default/access change. L107 |
| Personal report | Full generated route in L090 | TOS-AUDIT Personal report A; rolling last 30 days, no grouping/totals; Leads and Conversion rate, table, maximum 25 rows; organisation sharing off | Saved definition initially 1 lead/0%, then 1 lead/100% after confirmation. L090 |
| Campaign | Full generated route in L094 | TOS-AUDIT Fictional outreach A | Pending; 0 contacts, 0 team members; no outreach. L094–097 |

Retained comment: `TOS-AUDIT: fictional quote reviewed; pending reference-only booking exploration. No actual travel or payment.` Original enquiry notes explicitly identify the fictional study scenario.

## Additional retained records — 2026-10-10

These later values supersede the earlier final-state column where applicable; the original 9 October observations remain historical evidence.

| Record | Portal ID / route | Retained values / evidence |
| --- | --- | --- |
| Supplier B | `5b4e2d6e-c845-476c-ab75-a56fcc459c1c`, `/org/supplier/` | TOS-AUDIT Fictional Supplier B, Bali, Active, no banking/payment details; first contact B `supplier-b@example.invalid` auto-default despite switch off. L142–145 |
| Hotel B | `89a6af2b-1773-41aa-b2a5-7d2fa4548d3e`, `/org/hotels-repository/` | TOS-AUDIT Fictional Hotel B, Ubud/4 Star, Active/Visible, no preferred supplier; room TOS-AUDIT Standard Room, pax 2, BB. Standard 2000/600/400/200/100; seasonal 20–22 Nov 3000/0/0/0/0. L164 |
| Activity B | `b1d01a9c-675f-4502-897f-7eff391067a1`, `/org/activities-repository/` | TOS-AUDIT Fictional Activity B, Attractions/2 hours, countrywide Bali, Active/Visible, regular INR adult/child/infant 500/300/0, no seasonal row. L177 |
| Transport B | `eba15477-932f-4aa8-bb30-449f41b9d722`, `/org/transports-repository/` | TOS-AUDIT Fictional Full Day Transport B, Cab/Full Day, Ubud/Bali, Active/Visible; TOS-AUDIT Sedan B, max 4 pax, INR 1500 rate; no preferred supplier. L216–224 |
| Existing itinerary | Same UUID as above | Added Hotel B snapshot 20–24 Nov/4 nights, 2 pax/1 room/BB, 11000 total; Activity B Day 2/SIC/2 adults ×500=1000. Route Ubud 4 nights. **Confirmed** after balancing collection schedule; base28400, markup2840 (10%), selling31240/peradult15620. L190/L204/L207 |
| Remaining collection milestone | Ref not yet inspected | TOS-AUDIT Fictional remaining collection, INR15840; due **24 Oct 2026** persisted despite 15 Nov input attempt. Original15400 milestone/4000 unverified receipt unchanged. Combined31240, remaining27240/progress12.8%. L207 |
| Hotel B booking status | Same itinerary item | **Booked** with Supplier B/default contact B, code TOS-AUDIT-NO-REAL-RESERVATION, explicit no-real-reservation comment. Internal status only; no Send Email. Remove item disabled. L208–213 |
| Supplier payout schedule | Ref not yet inspected | Automatically created from Booked Hotel B, INR11000, Pending, due **14 Nov 2026** despite 15 Nov date input in booking; no payout logged, sent0. L214–215 |
| Custom qualification | `/org/custom-fields` | TOS-AUDIT Qualification B, Select field TOS-AUDIT Service preference B, name `tos_audit_service_preference_b`, options TOS-AUDIT Private/TOS-AUDIT Shared. Saved organisation definition; existing Lead1 shows saved **TOS-AUDIT Shared**. L226–231 |
| Personal report B | `/reports/saved/6279ff3e-d466-498a-b0df-992d3cb71bd9` | TOS-AUDIT Fictional Report B, description explicitly fictional; sharing off, rolling last30 days, no grouping, Leads/Conversion rate, Table chart, maximum25 rows, no filters. Saved1/100%, XLSX retained. L255–272 |
| Template B | `/itinerary-templates/7e6608da-0578-4bcd-be5f-47fe21b547d2/edit` | TOS-AUDIT Fictional Template B, Ubud2N, Hotel B/StandardRoom/BB/2N, Transport BDay1–3/quantity1, one fictional inclusion, sharingoff/Internal only. Saved and reopened, favourited. L277–291 |
| Template tag B | ID not exposed | TOS-AUDIT Reference B created; no assignment confirmed due inaccessible popup. L287–289 |
| Lead B | `/leads/2` | TOS-AUDIT Fictional Traveller B/traveller-b@example.invalid,SocialMedia,20Nov2N2adults,autoOwner/directcustomer; initialAmed corrected toIndonesia(Bali),phoneblank. Saved itinerary moves to InProgress. Bulk saved qualification **Private**; OnHold tested then restored InProgress. Auto-linkedcustomer. L294–295/L326/L328/L340 |
| Itinerary B | `/leads/2/itinerary/618493db-775c-4d5b-bf54-99acfa98a89a` | AppliedTemplateB,Proposed,20–22Nov2N2adults/INR,country-levelroute,HotelB6000,CabB4500,fictionalflight500,inclusion1,latest base/sell11000/markup0/peradult5500,no tax/nocollectionplan. L301–308/L347/L362 |
| Personal saved filter B | `/leads` advanced filters | TOS-AUDIT Shared preference B; custom Select Equals Shared; returned Lead1 only, active filter cleared; definition retained. L317–320 |
| Non-default tax B | `/org/preferences` | TOS-AUDIT Reference Tax B, Cost Only5%,Default off; explicitly applied/tested then removed only from quoteB. Definition retained. L341–347 |
| Household C | CustomerID `3b208f0b-9a13-4874-b15c-772ef54e84e1` | TOS-AUDIT Fictional Family Contact C/family-c@example.invalid, Married/fictional spouse/child8/fictional notes; tag TOS-AUDIT Household C saved. L371–375/L377 |
| Campaign A continuation | `/campaign/2989036a-3d1d-4837-a4e6-7ba41f70c438` | Retains Pending, one fictional HouseholdC contact, New/Interested, explicit no-contact note, no assignee/team; no outreach. L383–388 |

AgencyA ID `f2ba4653-6796-4a27-8c62-d1d11b5db133`; Lead2 now associated with AgencyA and soleContactA, replacing direct-customer ownership display (L394). No portal account created; actual agency access remains untested.

HotelB additionally retains HB standard2500/700/500/250/125 and BB unchanged (L349). Quote-local HB/room/extra-bed/guest-count/removal attempts were discarded by reload (L362). Temporary USD100 rate/10% general margin/travel100 and tax variant persisted for verification, then restored to INR/zero margins/no tax (L347); on reload USDrate96.64 differed from manual100. These are test variants, not current retained quote values.

Temporary traveller counts (1 CWB/1 CNB/1 infant), custom base30000/peradultmarkup1000 were inspected then restored to 2 adults/no children, calculated base and overall10% before saving route. No selling currency change persisted. Actual date values above are deliberately recorded as observed rather than intended input.

## Discarded drafts and untouched settings — first pass

Paused checkpoint L418–429: QuoteB now retains **TOS-AUDIT Fictional reconciliation B**, Pending11000/due11Oct2026; allocated11000/unaccounted0/received0. One fictional134byteTXT schedule attachment saved. Relocation targetLeadA selected then cancelled. ReceiptB attempt not verified saved; displayed received0. PVT activity/FullDay quantity drafts discarded by reload; quote remains11000. [S06](../screens/06-payments.md).

On 9 October no transport, flight, template, supplier, shared inventory or workspace configuration was saved. Unsaved Alas Harum Bali transport, blank flight/connection, custom-service mode/field edits, contact child row, custom qualification section/select option, assignment rule and tax row were cancelled or discarded by reload. L123 shows no custom field/transport/flight, the internal 10,000 service and original totals. The later flight draft was also discarded by reload before finishing. Later saved repository/qualification records are listed above.

No users/passwords, teams, portal/domain/public links, OAuth, mailboxes, AI key/MCP tokens or access permissions created/changed. The later [report XLSX](../documents/report-b.md) is verified; PDF/receipt exports remain unverified. No cleanup/delete performed; these records remain in the demo. Credentials are not stored in this archive.
