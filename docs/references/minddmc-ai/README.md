# Mind DMC — existing-system record

Last updated: 2026-10-06. Evidence: 17 supplied screenshots, one generated customer-itinerary PDF, and one user-reported partial set of generation messages. All images and the PDF are archived locally; the enquiry image has its prefilled email redacted. No portal browsing, interaction, or backend verification was performed.

System identity: the interface displays **Mind DMC**; the user identified it as **minddmc.ai**. Browser URLs/routes are not visible. The screenshots show a Free plan account; the account's formal role is not shown. The landing-page copy addresses people planning trips for their clients.

This record documents this system independently. It contains observations and separately attributed user explanations, without comparison or design recommendations. The assistant summarized understanding in chat before creating these records, as requested.

## Documentation index

| Screen/document ID | Record | Coverage |
| --- | --- | --- |
| MIND-S01 | [Application shell and planning home](screens/01-shell-and-home.md) | Navigation, global controls, prompt composer, destinations |
| MIND-S02 | [Conversation and trip clarification](screens/02-conversation.md) | Visible messages and selected trip requirements |
| MIND-S03 | [Generation progress messages](screens/03-generation-progress.md) | Partial user-reported status examples; no screenshots |
| MIND-S04 | [Generated itinerary and commercial controls](screens/04-itinerary-and-pricing.md) | Overview, days 1–8, inclusions/exclusions, margin, exports and actions |
| MIND-S05 | [Chats and saved itineraries](screens/05-chats-and-saved.md) | Conversation list and saved-itinerary table |
| MIND-S06 | [Enquiries and bookings lists](screens/06-enquiries-and-bookings.md) | Filters, counts, empty states |
| MIND-S07 | [Book Now — traveller details](screens/07-book-now.md) | First booking step, fields, summary and deposit copy |
| MIND-S08 | [Send Enquiry — Request Booking modal](screens/08-send-enquiry.md) | Contact/request fields and submission control |
| MIND-S09 | [Generated customer PDF](screens/09-customer-pdf.md) | Full export text, images/layout, package prices, day-by-day content and file provenance |

## Evidence index

IDs are assigned by source filename time for the first batch, rather than the order attachments were displayed in chat. Capture time alone is not proof of a navigation transition.

| Reference | Original supplied filename | Archived image | Document/state |
| --- | --- | --- | --- |
| MIND-001 | Screenshot 2026-10-06 083118.png | [Image](screenshots/mind-001-home.png) | S01: new-chat home, no recent chats |
| MIND-002 | Screenshot 2026-10-06 084449.png | [Image](screenshots/mind-002-chats.png) | S05: Chats, one conversation |
| MIND-003 | Screenshot 2026-10-06 084500.png | [Image](screenshots/mind-003-saved.png) | S05: Saved Itineraries, one row |
| MIND-004 | Screenshot 2026-10-06 084512.png | [Image](screenshots/mind-004-enquiries-empty.png) | S06: Enquiries, zero counts |
| MIND-005 | Screenshot 2026-10-06 084527.png | [Image](screenshots/mind-005-bookings-empty.png) | S06: Bookings, empty |
| MIND-006 | Screenshot 2026-10-06 084605.png | [Image](screenshots/mind-006-trip-questions.png) | S02: original request, questions and reply |
| MIND-007 | Screenshot 2026-10-06 084619.png | [Image](screenshots/mind-007-type-regions.png) | S02: SIC/private clarification and regions |
| MIND-008 | Screenshot 2026-10-06 084633.png | [Image](screenshots/mind-008-night-split.png) | S02: night split and selected second option |
| MIND-009 | Screenshot 2026-10-06 084645.png | [Image](screenshots/mind-009-overview-day-1.png) | S04: overview and day 1 |
| MIND-010 | Screenshot 2026-10-06 084656.png | [Image](screenshots/mind-010-days-2-4.png) | S04: days 2–3 and start of day 4 |
| MIND-011 | Screenshot 2026-10-06 084707.png | [Image](screenshots/mind-011-days-4-6.png) | S04: days 4–5 and start of day 6 |
| MIND-012 | Screenshot 2026-10-06 084721.png | [Image](screenshots/mind-012-days-6-8.png) | S04: days 6–7 and start of day 8 |
| MIND-013 | Screenshot 2026-10-06 084733.png | [Image](screenshots/mind-013-day-8-inclusions.png) | S04: day 8 and most inclusions |
| MIND-014 | Screenshot 2026-10-06 084743.png | [Image](screenshots/mind-014-exclusions-margin.png) | S04: last inclusions, exclusions, margin |
| MIND-015 | Screenshot 2026-10-06 084806.png | [Image](screenshots/mind-015-price-actions-summary.png) | S04: customer price, actions and AI closing message |
| MIND-016 | codex-clipboard-b70bd8c9-d814-4788-966b-670f2100c064.png | [Image](screenshots/mind-016-book-now-travellers.png) | S07: Complete your booking, step 1 |
| MIND-017 | codex-clipboard-c9e9e5e3-b7e2-4546-b935-12ad108b8d84.png | [Redacted image](screenshots/mind-017-send-enquiry-redacted.png) | S08: Request Booking modal |
| MIND-018 | itinerary-01a10f2c-5f00-7104-b24f-a7beabf6f984-customer.pdf | [Original PDF](documents/mind-018-customer-itinerary.pdf); [extracted text](documents/mind-018-extracted-text.md) | S09: one long page, inspected completely |
| MIND-U01 | User message, 2026-10-06; text only | [Exact status text](screens/03-generation-progress.md) | S03: six partial progress examples and report of thinking display |

The first 15 source files were supplied from `D:/Screenshots/`; the last two were clipboard attachments from the user's temporary directory. Sixteen archived copies were checked against source SHA-256 hashes. MIND-017 was derived from its source with only the email-value region obscured and labeled; the derived image was visually checked, and the source was checked to remain unchanged. No unredacted copy of MIND-017 was added to this repository.

MIND-018 was supplied from Downloads and moved into `documents/` as requested, preserving its bytes and verifying the final SHA-256 hash. Its original Downloads path no longer exists. The full single-page PDF was text-extracted and visually inspected; provenance and layout are recorded in S09.

## Observed navigation

The expanded sidebar lists **New Chat, Chats, Saved, Enquiries, Bookings**, followed by **Recent**. The Home state says **No recent chats**; later screens show **Portugal Family Trip 7 Night...**. Some screenshots show a compact icon rail. Their layouts are documented as observed variants; the screenshots do not establish why the layout changed.

## Documented flow

| Segment | Evidence basis | Result/limit |
| --- | --- | --- |
| New-chat planning input | MIND-001 | Prompt and destination controls shown; initial send interaction not captured |
| Trip request -> questions -> replies -> night split selection | Messages in MIND-006–008 | Conversational sequence visible within the same titled chat |
| Generation with thinking/progress | MIND-U01, user report | Partial examples; exact timing/order and full status set not captured |
| Generated package | MIND-009–015 | Same chat title and Portugal itinerary; result shown across scroll positions |
| Send Enquiry -> Request Booking modal | User identifies action; MIND-015 and MIND-017 | Request fields shown; submission outcome not shown |
| Book Now -> Complete your booking | User identifies action; MIND-015 and MIND-016 | Traveller step shown; Contact/Confirm/payment outcomes not shown |
| Saved result and chats list | MIND-002–003 | Matching trip represented; click-to-open, save, edit and delete transitions not demonstrated |
| Enquiries/bookings lists | MIND-004–005 | Empty states only; not evidence of a completed request |
| Generated customer PDF supplied | MIND-018, user attribution | PDF output inspected and archived; exact export click/settings not captured |

## Coverage limits

The PDF output is now supplied and inspected, but its export click/settings are unshown. No actual save click, edit, deletion, external link navigation, itinerary revision, payment, request submission, enquiry assignment, or booking confirmation is demonstrated. Dropdowns for language/currency and meal preference are closed. The progress messages are user-reported, incomplete examples rather than an exhaustive trace. AI explanations and UI messages are recorded as system-displayed statements, not independently verified supplier/business rules.
