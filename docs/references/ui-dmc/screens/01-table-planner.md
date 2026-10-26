# U&I Holidays — table planner

Screen ID: UI-S01. References: UI-001, UI-007. Received/extracted: 2026-10-06. System and [URL](https://uandiholidays.net/) supplied by user, who describes “this table like plan”; exact page URL, title, breadcrumb, brand/account header and formal role unshown. Related: [search/split stay](02-package-and-split-stay-search.md), [hotel rooms](03-hotel-room-options.md), [transfers](04-transfer-selection.md), [tours](05-tour-selection-and-addons.md).

## Evidence and structure

| Reference | Archive | Visible state / limits |
| --- | --- | --- |
| UI-001 | [Two-hotel plan](../screenshots/ui-001-planner-two-hotels.png) | Six dated rows, hotel/transfer/tour/meal content; total and partially cropped savings message; watermark overlaps lower-right |
| UI-007 | [Partial-stay plan](../screenshots/ui-007-planner-partial-stay.png) | Six dated rows, partly populated services, add/remove icons, grand total and cropped bottom buttons; watermark overlap |

Both top tabs read **Planner**, gray with white text, and **Hotel Details**, white with dark text. Table visible beneath despite Hotel Details tab styling; selected-tab semantics and switching result unshown. Table columns in exact order: **Date; Hotel; Transfer; Tours; Meals**. Gray header, light grid, large row heights, multiline dates/property/location labels. No time, traveler count, room subtype, nightly rate, supplier confirmation or price per item in these table crops.

## UI-001 — 15–20 October plan

Dates below reproduce the visible date/year as one cell. Blank means no text shown, not proof of an excluded service.

| Date | Hotel | Transfer | Tours | Meals |
| --- | --- | --- | --- | --- |
| 15-Oct 2026 | Truntum Kuta; Bali-Kuta | Airport to Kuta | Blank | Dinner - Romantic Candle light; red information icon |
| 16-Oct 2026 | Truntum Kuta; Bali-Kuta | Blank | Benoa Beach With Uluwatu Sunset Tour - Full Day; red information icon | Blank |
| 17-Oct 2026 | Truntum Kuta; Bali-Kuta | Blank | Nusa Penida Tour - Full Day; red information icon | Green Lunch is Included in Tour |
| 18-Oct 2026 | Wyndham Tamansari Jiva Resort; Bali-Ubud | Kuta to Ubud | Blank | Blank |
| 19-Oct 2026 | Wyndham Tamansari Jiva Resort; Bali-Ubud | Blank | Blank | Blank |
| 20-Oct 2026 | Wyndham Tamansari Jiva Resort; Bali-Ubud | Ubud to Airport | Blank | Blank |

No plus/trash controls visible in this source. Red information-icon tooltips/details unshown. Footer **Total :** followed by **USD 991.22** with strikethrough and **USD 967** without two decimal places; watermark overlaps this area but figures readable. Partially cropped line below reads **Congratulations, You Saved USD 24.71**, with saving figure red. Complete footer/next controls outside crop. Do not recompute the difference or infer discount/tax/rounding policy. Property location strings are as displayed, not independently verified geography.

## UI-007 — 07–12 October partial-stay plan

| Date | Hotel | Transfer | Tours | Meals |
| --- | --- | --- | --- | --- |
| 07-Oct 2026 | Truntum Kuta; Bali-Kuta | Airport to Kuta; trash icon | Blank; plus icon | Blank; plus icon |
| 08-Oct 2026 | Truntum Kuta; Bali-Kuta | Blank | Kintamani Volcano Tour with Ubud Village - Full Day; red information icon, plus and trash icons | Blank; plus icon |
| 09-Oct 2026 | Truntum Kuta; Bali-Kuta; trash icon | Blank | Blank; plus icon | Blank; plus icon |
| 10-Oct 2026 | Blank; plus icon | Blank; plus icon | Blank; plus icon | Blank; plus icon |
| 11-Oct 2026 | Blank; plus icon | Blank; plus icon | Blank; plus icon | Blank; plus icon |
| 12-Oct 2026 | Blank; plus icon | Blank; plus icon | Blank; plus icon | Blank; plus icon |

Hotel trash appears in 09-Oct row, not each occupied hotel row; do not infer removal applies only to that date or to the whole stay. Transfer trash on 07-Oct and tour trash on 08-Oct. Plus icons are unlabeled gray controls in the positions above; their tooltips/opening effects unshown. No transfer plus in blank 08/09-Oct cells. Footer **Grand Total : USD 282.19**, amount red, watermark overlaps. Bottom red **Proceed To Next** and **Cancel** buttons partially cropped but labels readable. Their resulting stage/reset/confirmation unshown.

## Relationships, states and gaps

UI-007's hotel dates/property match UI-004's 07–10 Oct stay criteria; room rows there show five choices, all unchecked, so the chosen subtype is unshown. Its Airport to Kuta service corresponds to UI-005 and 08-Oct Kintamani title/date to UI-006. UI-006 says **Private** in card title while planner says **Full Day**; retain both visible labels rather than silently combine. **Add To Planner** clicks and sequence are unconfirmed. Grand Total not decomposed into pictured service prices or an inferred fee/markup.

UI-001 is a different date/content state, including Kuta/Ubud stays, departure transfer and meals. No gesture demonstrates transforming one plan into the other; receiving UI-001 first does not prove chronology. Table days alone do not establish nights, hotel checkout semantics or service exclusions on empty days. No save/export/customer proposal, booking confirmation, error/loading state or planner validation result supplied.

## Verification

Both sources inspected at original resolution and transcribed; exact copies archived with matching source/archive hashes, dimensions and decoding in [manifest](../archive-manifest.json). No private identifiers/redaction required in these crops; no portal interaction or price calculation performed.
