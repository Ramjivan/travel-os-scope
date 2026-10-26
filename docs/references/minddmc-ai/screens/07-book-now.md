# Mind DMC — Book Now / Complete your booking

Screen ID: MIND-S07. Reference: MIND-016. Received: 2026-10-06. User identifies this as the **Book Now** screen reached from the itinerary. This action attribution comes from the user; the actual click is not captured. [Image/source index](../README.md); [itinerary actions](04-itinerary-and-pricing.md).

## Structure and package context

Expanded application sidebar on left. Main area has **Back**, a large booking/traveller panel, and a right-hand **Booking summary** panel.

| Area | Visible content |
| --- | --- |
| Main heading | Complete your booking |
| Package | Portugal Family Escape: Lisbon & Porto (7N/8D) |
| Package subline | departing 18-10-2026 · 4 travellers |
| Badge | Secure booking, lock icon |
| Instruction | Enter details for all 4 travellers exactly as they appear on their passports. |
| Stepper, in order | 1 Traveller details; 2 Contact; 3 Confirm |
| Current step | 1 Traveller details, red active state |
| Requirement copy | All fields are required. |

The security badge is displayed copy, not independent verification of technical security controls. Back's destination is not shown.

## Traveller card shown in full

Card header: **A1**, **Traveller 1 · Adult 1**, **0 of 7 fields**.

| Field | Control/visible options | Placeholder/value | Visible constraint |
| --- | --- | --- | --- |
| Title | Four pill controls: Mr, Mrs, Ms, Miss | No highlighted selection apparent | Covered by All fields are required copy |
| First name | Text input | As on passport | Passport matching instruction above |
| Last name | Text input | As on passport | Passport matching instruction above |
| Date of birth | Date input, faint calendar icon | dd-mm-yyyy | No age range or validation shown |
| Passport number | Text input | e.g. A1234567 | No further format rule shown |
| Passport expiry | Date input, faint calendar icon | dd-mm-yyyy | Must be valid 6 months past travel date. |
| Meal preference | Closed dropdown, chevron | Select | Option list not shown |

The seven fields correspond to the displayed count; no entered values or validation errors are shown. The expiry guidance appears with a small information icon and wraps onto two lines.

## Further travellers / coverage

The next card header is visible: **A2**, **Traveller 2 · Adult 2**, **0 of 7 fields**. Its fields are below the screenshot edge. The page asks for all four travellers, but no child-card headings or fields are visible; do not assume their contents duplicate the adult form.

## Booking summary

| Label | Displayed amount/detail |
| --- | --- |
| Adults × 2 | €2,828.06 |
| Children × 2 | €650.52 |
| Trip total | €3,478.57 |
| Summary subline | For 4 travellers · 18-10-2026 |
| Deposit due now | €347.86 |
| Deposit explanatory copy | 10% to submit your request · balance payable after the DMC confirms |

Amounts and percentage are copied as shown. No calculation, currency selection, deposit payment method, payment provider, or DMC confirmation mechanism is demonstrated.

## Actions and next steps

| Control | Visible label/state | Outcome |
| --- | --- | --- |
| Back | Left arrow and Back | Destination not shown |
| Main summary action | Continue to contact, right arrow | Step 2 named by stepper, but its contents not supplied |
| Under-button copy | Step 1 of 3 · nothing is charged until you confirm. | Displayed assurance; no charge demonstrated |

No screenshot of Contact or Confirm steps, errors, submission, transaction, success message, booking reference or resulting list item exists in this batch. The deposit and charge timing statements are both retained as displayed; the exact payment sequence is unshown.

## Verification

The MIND-016 image was checked for package metadata, three-step labels, first adult's complete form, partial second-card header, summary and deposit/action copy. Its archived image is an exact source copy verified by hash. No actual booking or payment was performed.
