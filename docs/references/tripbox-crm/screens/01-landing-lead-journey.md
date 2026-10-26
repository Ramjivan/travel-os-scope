# TripboxCRM — landing-page lead journey

Screen ID: TRIPBOX-S01. Reference IDs: TRIPBOX-001, TRIPBOX-002. Received: 2026-10-06.

System identity: user identifies TripboxCRM; brand readable in TRIPBOX-001 paragraph. Exact URL, page title/breadcrumb/route and role/account context: not shown.

## Evidence and coverage

| Reference ID | Image / persistence | Visible state | Coverage limits |
| --- | --- | --- | --- |
| TRIPBOX-001 | [Exact-copy archive](../screenshots/tripbox-001-capture-itinerary.png) | Two side-by-side landing cards, numbered Step 1 and Step 2 | Surrounding page/header/navigation absent; Windows watermark lower right; no CRM interaction shown |
| TRIPBOX-002 | [Exact-copy archive](../screenshots/tripbox-002-booking-payments.png) | Two side-by-side landing cards, numbered Step 3 and Step 4 | Surrounding page/header/navigation absent; Windows watermark lower right; no CRM interaction shown |

The inner cards are illustrations embedded in promotional sections. A readable status, figure or badge establishes its appearance in the landing illustration only. It does not demonstrate an actual connected integration, document generation, transaction, supplier confirmation or state transition.

## Structure and exact marketing copy

Each large rounded white card has an icon, gold step number, bold title, descriptive paragraph and smaller framed UI illustration. Step 2 and Step 3 have gold outlines; other outer borders are light gray. A narrow dotted connector with a gold dot is visible between Step 1 and Step 2. Placeholder strokes inside service rows carry no readable data.

| Step / reference | Exact heading | Exact paragraph |
| --- | --- | --- |
| Step 1 / TRIPBOX-001 | Capture leads instantly | Pull enquiries from Meta Ads, Google Ads, your website, WhatsApp, Gmail, and Outlook. TripboxCRM creates clean lead cards with source, owner, trip intent, and follow-up priority. |
| Step 2 / TRIPBOX-001 | Build itineraries faster | Use reusable templates, pricing rules, supplier inventory, and branded proposal layouts so your team can quote in minutes instead of rebuilding every file from scratch. |
| Step 3 / TRIPBOX-002 | Confirm bookings | Lock suppliers, generate confirmations, issue vouchers, and keep every booking status visible. No more searching chats to know whether a trip is actually ready. |
| Step 4 / TRIPBOX-002 | Track payments | Create payment schedules, send invoices, and monitor collections from the same workspace. Finance gets clear status instead of scattered screenshots and spreadsheet formulas. |

## Step 1 — lead illustration (TRIPBOX-001)

| Area | Exact labels / displayed content | Structure / limits |
| --- | --- | --- |
| Inner header | Lead created; Auto routed | Gold status dot and right pill; routing rules, eligibility and execution not shown |
| Source tiles, left to right | Website: +12; Email: +08; WhatsApp: +19 | Globe, envelope and message icons; no time range, units or count definition shown |
| Lead card | New lead card; Dubai family trip, 6 nights; Hot lead | Trip intent and priority pill; no qualification formula shown |
| Bottom fields, left to right | Owner: Aarav; Source: Website; Follow-up: 10:30 AM | Displayed illustrative values; date/timezone, owner selector and scheduling interaction not shown |

The paragraph additionally names Meta Ads, Google Ads, Gmail and Outlook. The source tiles show Website, Email and WhatsApp only; there is no expanded source configuration or connection status.

## Step 2 — proposal illustration (TRIPBOX-001)

| Area | Exact labels / displayed content | Structure / limits |
| --- | --- | --- |
| Inner header | Proposal ready; 60 sec | Gold status dot and right duration pill; promotional timing, no measured generation run |
| Day row 1 | D1; Arrival + hotel check-in; Added | Hotel icon, placeholder strokes and right badge |
| Day row 2 | D2; City tour + guide assigned; Added | Vehicle icon, placeholder strokes and right badge |
| Day row 3 | D3; Departure transfer; Added | Plane icon, placeholder strokes and right badge |
| Bottom left tile | Pricing logic; 18% markup | Sample percentage; basis, calculation, tax/currency and rule configuration not shown |
| Bottom right tile | Proposal; PDF ready | Document icon; no PDF contents, file, export settings or generation action demonstrated |

Dates, service availability, supplier inventory and actual quoted total are not shown. Reusable templates and inventory appear in marketing text, without a pictured template chooser or inventory system.

## Step 3 — booking illustration (TRIPBOX-002)

Inner header: **Booking synced**, with gold dot; right pill: **Ops board**. Table headings, left to right: **Service**, **Status**.

| Service, displayed order | Status | Icon / layout |
| --- | --- | --- |
| Hotel confirmation | Locked | Hotel icon; placeholder connector line; right status pill |
| Guide + transfer | Assigned | Vehicle icon; placeholder connector line; right status pill |
| Client voucher | Issued | Document icon; placeholder connector line; right status pill |

Three bottom tiles read **Supplier**, **Voucher**, **Departure**, each with a gold dot. These show categories without further readable fields. Booking reference, supplier identity, confirmation number, voucher document, dates and actual operational interactions are not shown.

## Step 4 — collections illustration (TRIPBOX-002)

Inner header: **Collection tracked**, with gold dot; right pill: **Finance view**. Below is a booking-value card and three ordered rows, each with a gold dot and a right amount.

| Area / row | Exact label | Secondary text / status | Displayed value |
| --- | --- | --- | --- |
| Value summary | Booking value | Receipt icon on gold square | ₹4.82L |
| Row 1 | Deposit invoice | Paid | ₹1.20L |
| Row 2 | Supplier advance | Due 18 Jul | ₹84K |
| Row 3 | Final balance | Scheduled | ₹2.78L |
| Bottom left tile | Collection health | Gold outline | 63% |
| Bottom right tile | Next reminder | — | Today |

Preserve displayed `L`/`K` units without converting or reconciling sample figures. Collection-health formula, incoming/outgoing ledger direction, payment verification, invoice identifiers and account balance are not shown. The July due date has no year; `Today` has no dated page context. `Paid`, `Scheduled` and reminder text appear only in the illustration. No invoice-send, payment-receive or reminder-send action is demonstrated.

## Controls, actions and state coverage

No editable input, required indicator, dropdown, filter, sorting, pagination, navigation tab, button or actual click result is shown. Pills such as `Auto routed`, `Ops board`, `Finance view`, `Added` and `PDF ready` are display elements in the illustration; their interactivity is unknown. No loading, validation, error, permission or empty state is shown.

## Documented flow and transitions

| Ordered marketing step | Reference / shown illustration | Evidence basis and transition gap |
| --- | --- | --- |
| 1. Capture leads instantly | TRIPBOX-001 — Lead created, Auto routed, illustrative website lead | Screenshot-visible numbering/copy; real intake/assignment transition unshown |
| 2. Build itineraries faster | TRIPBOX-001 — Proposal ready, D1–D3, 18% markup, PDF ready | Screenshot-visible numbering/copy; relation to the pictured lead and actual generation unshown |
| 3. Confirm bookings | TRIPBOX-002 — Booking synced, Locked/Assigned/Issued service rows | Screenshot-visible numbering/copy; actual proposal acceptance, supplier confirmation and synchronization unshown |
| 4. Track payments | TRIPBOX-002 — Collection tracked, Paid deposit, due supplier advance, Scheduled final balance | Screenshot-visible numbering/copy; invoice/payment/reminder actions unshown |

The numbered promotional sequence is evidenced; a real end-to-end journey of one record is not. It does not establish whether an initial payment precedes a booking or whether operations receives work automatically.

## User-provided explanation

On 2026-10-06, user identifies these as part of TripboxCRM's landing page and says it “somehow shows flow of journy of a lead.” This supplies landing-page context, not a demonstrated transaction or signed-in system sequence.

## Missing evidence

Full landing page/URL and surrounding navigation; logged-in screens/roles; actual field definitions, lead stages and assignment options; integration setup; live itinerary/pricing/inventory; booking/payment gating; actual supplier/document/payment/reminder actions and their outcomes. All remain unshown.

## Extraction verification

Both supplied images were inspected at original resolution and compared with this transcription. Two exact copies were saved; source/archive SHA-256, dimensions and decoding verified, and source hashes unchanged after archiving. See [manifest](../screenshots/manifest.json). No redactions applied to these marketing illustrations; no website or CRM action exercised.
