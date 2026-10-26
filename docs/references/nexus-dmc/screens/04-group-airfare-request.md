# Nexus DMC — group-airfare request

Screen ID: NEXUS-S04. Reference: NEXUS-005. Received/extracted: 2026-10-06. Identity: user-supplied Nexus DMC; URL/role/breadcrumb unshown. Title **Get Best Group Airfares**. Related: [series air](03-series-air-and-fixed-departures.md), [user explanation](../user-reported-behavior.md).

## Evidence and structure

[Archived group request](../screenshots/nexus-005-group-airfare-request.png). Pale heading above white form: journey buttons, route/dates left, passenger/fare/contact/preferences right, wide Remarks, bottom-right submit. **View All Requests** below at right partly covered by Windows watermark. From has focus/caret; pale title alone does not prove disabled screen.

Intro: **Please submit your group request below. Response time will be within 24 hours at max.** Displayed wording; timing unverified.

## Options and fields

NEXUS-005 journey options in order **One-way → Return → Open Jaw**; Return dark/highlighted. Other layouts unshown. Fields below apply to shown Return state.

| Exact label | Control | Value / placeholder | Requiredness / units shown |
| --- | --- | --- | --- |
| From | Text-style input | Empty, focused | No marker; suggestions closed |
| To | Text-style input | Empty | No marker |
| Depart on | Date input/calendar icon | **06 Oct 2026** | No range rule |
| Return on | Date input/calendar icon | **06 Oct 2026** | No validation shown |
| No. of Passengers | Input | **10** | Min/max/group threshold unstated |
| Expected fare (INR) * | Input | **per person** | Asterisk; INR, per-person unit |
| Preferred Airlines | Text-style input | Empty | No marker; suggestions unshown |
| Contact Number* | Input | Empty | Asterisk; format/prefix unshown |
| Email | Input | **Email** | No asterisk visible |
| Preferred Flight Number | Input | **Preferred Flight No** | No asterisk visible |
| Remarks | Wide multiline textarea | Pale **Direct Flight, Emirates from Bangalore** example | No asterisk visible |

10 passengers and equal dates are sample states, not proven defaults/rules. Only fare/contact visibly marked required; other requiredness unshown.

## Actions, flow and verification

| Control | Result / evidence gap |
| --- | --- |
| Journey buttons | Return selected; opening/alternate layouts unshown |
| Calendars/route/airlines | Inputs visible; option panels unshown |
| **Submit Group Request** | Button visible; click/validation/request ID/confirmation unshown |
| **View All Requests** | Action below form; list/statuses unshown |

User describes group request as one of two flight options; attribution in NEXUS-U01. Menu path not captured. Processing/payment/booking outcome unshown. Exact-copy image inspected and source/archive hashes verified in [manifest](../archive-manifest.json).
