# Sembark — Trip Details and quotation suggestions

Screen ID: SEMBARK-S04. References: SEMBARK-011–012. Received/extracted: 2026-10-06. Identity: user-supplied Sembark; URL/formal role not shown. Title: **Trip Details**; breadcrumb **Trips > Current**. Related: [Trips list](02-trips-list.md), [New Query](03-new-query.md), [AI usage](08-mail-and-ai-usage.md).

## Evidence and coverage

| Reference | Archived evidence | State / limits |
| --- | --- | --- |
| SEMBARK-011 | [Upper quotation suggestions](../screenshots/sembark-011-quote-suggestions-upper-redacted.png) | Current trip header, suggested quote and days 1–5; lower content cropped |
| SEMBARK-012 | [Lower quotation suggestions](../screenshots/sembark-012-quote-suggestions-lower-redacted.png) | Same suggested quote, expanded descriptive content, days 6–8 and bottom actions; page header cropped |

Current/suggested trip IDs, guest names/phone, source reference ID, staff names and private comment text are redacted. Layout and public itinerary entries remain visible. Both images were inspected before and after redaction. Matching original quote identifiers and destination badges establish the same suggestion context; expansion/scroll gestures are unshown.

## Current trip header

Source SEMBARK-011. Full-width white header, followed by suggestion content on the left and **Tasks & Comments** panel on the right.

| Area | Visible structure and text | Controls / limits |
| --- | --- | --- |
| Main line | Trip ID • guest name • **Japan** • **Meta Ads** • **Ref:** source identifier • **Initiated** status | Overflow button; menu closed; identities omitted |
| Trip line | **5 Jan, 2027 • 8N, 9D**, group icon, **1 Adult** | No date/duration editor open |
| Guest line | Guest name, phone, envelope icon, **(1A)**, pencil icon, green star **NEW** badge | Tooltip/action results unshown |
| Tags | **Tags**, pencil icon, **No Tags** | Tag editor unshown |
| Team | **Sales Team**, pencil icon, staff name | Staff identity omitted; selector unshown |

Initiated is the shown trip badge; relationship to the Trips sidebar groups and permitted transitions is not demonstrated.

## Suggestion controls and side panel

| Location | Exact visible label / control | State / result actually shown |
| --- | --- | --- |
| Suggestion heading | **To Create Quote you can start with below suggestions.** | No quote creation result shown |
| Search | **Search by trip id or guest name** | Empty input |
| Beside search | **Request Package**, share-like icon | Result not shown |
| Suggested quote card | Original numeric ID and guest name; **Shinjuku 4N**, **Osaka 4N** | Identity omitted; badges preserved |
| Card tabs, in order | **Itinerary**, **Hotels**, **Details** | Itinerary selected; other tab contents unshown |
| Card footer | **Use this Quote** | Result not shown |
| Bottom action row (012) | **Create Custom Quotation**; **Request Package**; **Upload with AI** with upload/sparkle icons | Forms, upload formats and resulting quote unshown |
| Right panel (011–012) | **Tasks & Comments**, private text entries, relative timestamp/author lines, per-entry vertical ellipsis, **+ Add** | Private text/identities omitted; add/edit menu result unshown |

Right panel contains multiline entries, including names/phone-like text and travel note content. Those details are not necessary to record the panel's structure and are omitted. Visible relative author timestamp: **an hour ago** (011–012).

## Suggested itinerary content

The card groups services under blue **Day** badges. Compact entries have icons and colored backgrounds: transfer/tour entries are pale yellow; ticket/activity/train entries pale green. Some expanded entries show an **Activity** badge, bold title and prose beneath. No meaning for colors beyond the shown association is supplied.

| Day / shown position | Exact visible services in order | Source |
| --- | --- | --- |
| Day 1 | Narita Airport to Tokyo hotel - Transfer; Shibuya Sky - Entry Ticket | SEMBARK-011 |
| Day 2 | Tokyo - Tokyo DisneySea - Attraction Entry | SEMBARK-011 |
| Day 3 | Tokyo City Tour - Tour | SEMBARK-011 |
| Day 4 | Mt. Fuji + Hakone Ropeway + Owakudani - Tour; Hakone - Lake Ashi Pirate Ship Cruise - Attraction Entry | SEMBARK-011 |
| Day 5 | Tokyo - TeamLab Planets Tokyo - Attraction Entry; Bullet Train - Tokyo To Osaka - Train Journey | SEMBARK-011; same entries expanded at top of 012, Day 5 header above crop |
| Day 6 | Day at Leisure - Relax & Shopping | SEMBARK-012 |
| Day 7 | Explore Osaka with Osaka Amazing Pass - Pass | SEMBARK-012 |
| Day 8 | Kyoto + Nara Day Tour - Tour | SEMBARK-012 |

Expanded descriptive text visible in SEMBARK-012:

- **Tokyo - TeamLab Planets Tokyo - Attraction Entry:** “Enjoy the Attraction Entry experience at Tokyo - TeamLab Planets Tokyo, carefully curated to provide a seamless and memorable journey. This professionally organized activity allows travelers to discover the destination through comfortable arrangements, attentive service, and authentic local experiences, ensuring a relaxing visit while creating unforgettable memories and appreciating Japan's unique cultural and scenic attractions.”
- **Bullet Train - Tokyo To Osaka - Train Journey:** Activity badge and title; description not visible beneath it.
- **Day at Leisure - Relax & Shopping:** “Free Day In Osaka for Self Exploration”.
- **Explore Osaka with Osaka Amazing Pass - Pass:** “- Gain free entry to around 40 iconic Osaka tourist sites ranging from Osaka Water Bus to the Umeda Sky Building. - Unlimited rides on Osaka Metro, Osaka Municipal Bus (Except for some routes), and private railway lines”.

Days 6 and 7 show circular minus icons at the right of their headers (012); resulting collapse behavior is not captured. Day 8 remains a compact service entry. No day 9, pricing, hotel selection, inclusions/exclusions or customer export is supplied for this suggestion.

## Documented flow and limits

| Segment | Evidence basis / gap |
| --- | --- |
| Trips row → current Trip Details | Original row and header match in 008/011; opening click unshown |
| Suggested quote upper/lower states | Matching original card ID/name and Shinjuku/Osaka badges in 011/012; scroll/expansion sequence unconfirmed |
| Search existing trip/guest suggestions | Input visible; typed search/result not shown |
| Reuse quote / custom quote / Request Package / Upload with AI | Action labels visible; downstream screens and external effects unshown |
| Tasks/comments / tags / team edit | Controls visible; editors and submitted changes unshown |

No observed quote completion or AI-generation sequence is established by these screenshots. Source/archive hashes and redactions are recorded in [manifest](../archive-manifest.json).
