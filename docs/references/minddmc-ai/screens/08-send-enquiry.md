# Mind DMC — Send Enquiry / Request Booking modal

Screen ID: MIND-S08. Reference: MIND-017. Received: 2026-10-06. The user identifies this as the **Send Enquiry** screen reached from the itinerary. Actual click not captured. [Image/source index](../README.md); [itinerary actions](04-itinerary-and-pricing.md).

## Modal structure

The itinerary/chat is dimmed behind a centered modal with a dark header. The header says **Request Booking**; subtitle says **Agent confirms within 24 hrs · no payment required now**. An X close control is at the upper right. The final button says **Submit Enquiry**; preserve the distinction between header and action wording.

The displayed confirmation time/no-payment statement is UI copy, not a verified service guarantee or completed request.

## Package strip

| Displayed item | Value |
| --- | --- |
| Title | Portugal Family Escape: Lisbon & Porto · ... (truncated) |
| Price | €3478.57 |
| Metadata | 2 Adults, 2 Children · 7 nights · 2026-10-18 |
| Per-person line | EUR 1,414.03 / adult · EUR 325.26 / child |

## Inputs and controls

| Field/control | Type/options shown | Required marker | Placeholder/current state |
| --- | --- | --- | --- |
| Full Name | Text input | Red * | As it appears on passport |
| Phone | Text input | None shown | Optional but helpful |
| Email | Text input, prefilled | Red * | Prefilled address; value redacted in repository image and omitted from text |
| Departure Date | Input displaying ISO-style date | Red * | 2026-10-18 |
| Flexible | Square checkbox beside departure date | None shown | No visible tick; change outcome not shown |
| Passengers | Readout, not an editable input in supplied view | None shown | 2 adults · 2 children · 0 infants |
| Passenger note | Inline text | Not applicable | Fixed from itinerary (4 total) |
| Special Requests | Wide input area | None shown | Dietary needs, accessibility... (optional, agent will review) |

No full set of traveller/passport fields is shown in this modal. Phone/date constraints, field validation, email editability, flexible-date semantics and special-request length limits are not demonstrated.

## Actions

| Location | Control | Result shown |
| --- | --- | --- |
| Header | X | Close result not captured |
| Footer | Document-shaped icon; Submit Enquiry | Submission not captured |

## Background state

The dimmed itinerary shows margin presets **5%, 8%, 10%, 12%, 15%** with **5%** highlighted and a custom value **5** followed by **%**. The modal's displayed price is still **€3478.57**. The changed customer-price panel and margin feedback are not visible; no relationship between margin and submitted enquiry price is established by this image.

## Evidence handling and verification

MIND-017 was checked for labels, required markers, values, fixed passenger counts, package strip, subtitle and action. The persisted image has only the email-value region obscured with an **[email redacted]** label; all form labels and surrounding fields remain visible. The source image is unchanged, and no unredacted copy was added to the repository. No enquiry submission, assignment, response, payment, or resulting list entry was performed or shown.
