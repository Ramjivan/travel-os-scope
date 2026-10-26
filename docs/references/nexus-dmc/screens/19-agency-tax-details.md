# Nexus DMC — agency tax details

Screen ID: NEXUS-S19. Reference: NEXUS-044. Received/extracted 2026-10-06. Nexus DMC from user context; user batch label “profile”. Visible title **Taxes**, back link **‹ Settings**. URL/formal viewer role unshown. Related: [Settings menu](17-settings-menu.md), [Sales tax display controls](18-sales-and-markup-settings.md).

## Evidence and layout

[NEXUS-044 archive](../screenshots/nexus-044-agency-tax-details-redacted.png). Gray background, left section heading/help, two white cards right. Agency GST fields empty; PAN value and email in status/help message masked. Original source unchanged. No actual tax or identity verification performed.

## Agency GST Details

Left **Agency GST Details**, help **Provide your GST details**. Card field order/layout:

| Row / exact label | Visible control / value | Limits |
| --- | --- | --- |
| Upper left — GSTIN | Empty text input | No required marker, format or validation shown |
| Upper right — State | Empty outlined input | Dropdown/editor type and state options unshown |
| Middle left — Business Name | Empty text input | No required marker/help shown |
| Middle right — Contact Email | Empty text input | No validation message shown |
| Lower left — Contact Phone | Empty text input | Country code, formatting and validation unshown |

Empty GST fields coexist with populated PAN below; no requirement/dependency or submission flow inferred.

## PAN Details and message

Left **PAN Details**, help **Provide your PAN card number**. Field **PAN Number** populated with a private identifier (masked). Whether editable/read-only is not established from appearance.

Below divider, message: **Your PAN number is updated. For any update, please write to us at [email redacted]**. Bracketed phrase is the record's privacy placeholder, not literal portal text. The source email is an address displayed by the portal; recipient identity/organizational relationship not inferred. This is a visible existing status/help message, not proof of a save/update action performed in this review. No save control, verification badge, tax calculation, upload, action result or error supplied.

## Flow and verification

Settings Taxes tile in 041 corresponds to 044 title, opening click/order unshown. Back link destination not exercised. Updating GST/PAN, sending email and field validation are unshown. One original visually inspected; one PAN/email-redacted derivative saved. Dimensions/decoding and original/archive hashes recorded in [manifest](../archive-manifest.json); masks visually checked. No portal change or message sent.
