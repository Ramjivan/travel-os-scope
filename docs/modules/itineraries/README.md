# Sales itineraries and quotes

Updated 2026-10-09. Status: local UI mockup for user testing; FB-044 implementation and FB-045 scope correction. User requests quick mockups with fake data/selectable options and will test personally. No further agent tests or browser verification after that instruction.

## Pages and roles

FB-049 removes the promotional intro banner, illustrative Ubud card and slogan subtitle from `#/itineraries`. The page opens directly with its title, Create itinerary, search and saved records. The duplicate Start a day plan button and informational Price connections dialog are removed; manual/template creation and per-service source/rate selection remain in the workflow. Empty-state copy is factual. No tests/build/browser review per FB-045; user review pending.

FB-048 improves readability across the itinerary list, day editor, rate comparison/forms and customer preview. Body and input text is 15–16px at the default browser size; secondary details/actions are 13–14px, with clearer heading sizes and theme-aware stronger secondary text. Larger controls, roomier cards/dialogs and wider day/pricing columns accommodate the text. The builder stacks earlier on smaller screens and badges/long labels can wrap. Styling is scoped to itinerary screens and their dialogs; sample records, pricing rules and role visibility are unchanged. No tests/build/browser review run under FB-045; user visual review remains pending.

B2C `#/itineraries` is available as **Itineraries & Quotes** for Sales, managers and admin. Lead detail offers **Create itinerary** → `#/itineraries/new?lead=<id>`. Existing accessible leads provide customer/destination/dates; post-handoff Sales pricing remains restricted. B2B/DMC has a separate `/b2b/` app entry and no navigation within B2C.

FB-046 makes this entry prominent in the lead header and adds a linked **Queries & itineraries** list. The lead-origin creation form shows the inherited name/destination/nights/travelers, fixes its lead ID and provides Back to lead; standalone creation still allows lead selection. Create query / itinerary starts the same local planning draft, not a separate backend/B2B enquiry. User testing only; no new checks run.

Sales sees customer amounts. User explicitly confirmed manager/admin-only supplier costs and markup; those roles see internal breakdowns and can apply sample markup. This is browser-side demonstration access, not production security.

## Working mockup actions

- Choose a lead and start a manual dated day plan or the five-night Bali template with two hotel stays, flight, transfer and activity examples.
- Edit trip details, days and descriptions; add/edit/remove services, duplicate non-hotel items and move items. A hotel stay appears across its days but is charged once for room-nights.
- Compare synthetic **Offline contract**, **Demo API rate**, flexible/non-refundable and **Manual estimate** options. Source badges are separate from availability/recheck/expiry labels. No API lookup occurs.
- Review **Import with AI · demo** using pasted text, a sample or a small `.txt` file with Day headings. Inspect source excerpts and warnings; select day text to apply. It creates no priced services. PDF/Word/OCR and real AI are not connected.
- Save draft locally, open customer preview and download proposal text without internal costing/provider evidence. Save a shared version locally; create a revision for later edits. No external delivery or acceptance/booking is implied.
- Reset itinerary samples separately from CRM, bookings, DMC and feedback. Normal reset is scoped to accessible pre-handoff leads; corrupt module reset replaces the unreadable itinerary snapshot.

Loading, empty/out-of-scope, error, unsaved, saved, incomplete pricing, changed/expired offer and read-only shared states are included. Refresh of the saved list discards unsaved edits; some navigation outside this page can also lose drafts. Page reload uses a browser unsaved-change prompt. Staff should save before navigation.

## Fake data and local boundary

FB-047 adds two ready-to-open examples per accessible Sales owner: **Bali · Ubud & beach escape** (5 nights/6 days, two stays) and **Dubai · City lights & desert adventure** (4 nights/5 days). Both have narrated days, sample hotels/flights/transfers/tours/meals and contract/API prices. Initial list loading adds the samples once with stable IDs, preserving existing/custom plans and edits. Other Sales identities get the same scenarios linked to their own leads; managers see the combined accessible team set. Reset can remove these samples without repeatedly refilling them. API offers retain the existing demo expiry/recheck behavior. No tests or browser review run under FB-045; user validation pending.

`apps/web/src/domain/itinerary.ts` defines UI records/calculations; `fixtures/itinerary.ts` contains fake rates/template/import text; `services/itinerary.ts` is a frontend localStorage adapter; `pages/itineraries.tsx` and `itinerary.css` render the mockup. New storage key: `travel-os-itineraries-demo-v1`. Existing CRM and booking storage and DMC SQLite are preserved.

Amounts use integer INR paise, tax-inclusive sample unit prices and sample 20% markup. Manager markup is editable; real currency/tax/fee/occupancy/season calculations are not implemented. Changing trip/service configuration asks for rate review; these are mockup rules only. Basic local scope, overlap/date, save revision and shared-snapshot checks help the demonstration behave coherently; they are not an actual backend.

The accepted itinerary is **not yet integrated into Accounts/Ops booking handover**. Quotation ownership/admin reassignment, contract management, inventory, approved provider search/reprice, customer acceptance, actual reservation/payment/ticket issuance and production access are outside this delivery. Future provider integration details remain in the linked plan rather than an informational UI panel. Real AI and backend work require a later explicit task.

## Verification and next work

Before FB-045: TypeScript/build passed for the initial two-entry builder; 39 web checks passed for initial pricing/version/local scope/recovery/import behavior. Browser opened Disha's Bali template, inspected rate comparison and edited a flight time. Later manager markup/time-zone/import-source refinements were made before the user's stop instruction and were not rechecked. Do not claim complete browser acceptance or a passing final suite. Existing test source remains optional for future engineering; no further checks run for this delivery.

Next: user tests the quick UI mockup, gathers Sales feedback and requests specific changes. [Plan](../../product/sales-itinerary-builder-plan.md), [portal boundary](../../decisions/0012-b2c-b2b-entry-separation.md) and [AS-026](../../product/assumptions.md) distinguish proposals and mock boundaries.
