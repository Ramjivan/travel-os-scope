# Sembark — empty supplier creation form

Screen ID **SEMBARK-S18**. References **SEMBARK-L041–L042**; observed 2026-10-08, formal role unverified. Related: [supplier directories/details S11](11-supplier-directories.md), [service creation S17](17-service-creation-forms.md), [live provenance](../live-observation-2026-10-08.md).

## Evidence, structure and actions

All three previously observed Add Supplier destinations opened as empty **New Supplier** forms. Breadcrumb **Suppliers > New**; back/breadcrumb supplier link respects originating directory. Shared section-help/fields, separators, footer **Save Details; Cancel**. Blank fields, expanded category/radio variants and preference lists inspected; no text/contact entered, Save Details pressed or supplier created. Cancel used on each form. Live screenshots not archived; rendered accessible UI evidence only.

| Entry route | Initial Supplied Services selection | Payment field / sections |
| --- | --- | --- |
| `/suppliers/new?type=cabs&back=<transport-directory>` | **Cabs** checked; Travel Activities/Hotels unchecked | **Cab Supplier Type**, Company Details, Contact Details, Supplier Payment Preferences → **Cab Payment Preferences** |
| `/suppliers/new?type=travel_activities&back=<activity-directory>` | **Travel Activities** checked; others unchecked | Company Details, Contact Details, Supplier Payment Preferences → **Activities Payment Preferences**; Cab Supplier Type absent |
| `/suppliers/new?type=hotels&back=<hotel-directory>` | **Hotels** checked; others unchecked | Company Details, Contact Details, Supplier Payment Preferences → **Hotel Payment Preferences**; Cab Supplier Type absent |

## Fields and options

| Area | Exact label / control | State, placeholder and help |
| --- | --- | --- |
| Supplied Services | **Cabs; Travel Activities; Hotels**, independent checkboxes in that order | **Select the types of services supplied by this supplier.** Checking all three locally reveals all three preference inputs; no saved multi-category supplier created |
| Cab Supplier Type | Radio **Transporter Company** initially checked; **Single Driver** unchecked | **Please select if this is a transporter company or a single driver.** Company help **Please select this if this a multi driver/cab transporter company.** Driver help **Please select this if the driver is the only person in this company.** |
| Company Details | **Name** textbox, **Sample Transportations** placeholder on all three entries | **Please provide the company/agent details e.g. name.** |
| Contact Details | **Contact Name** textbox (**Sample Name**); **Contact Phone Number(s)** native prefix **91-IN**, blank phone textbox and **Add More**; **Contact Email (optional)** textbox (**domain@example.com**) | **Please provide a contact's details for the service provide. You can add more contact later.** Example phone digits omitted |
| Single Driver variant | Replaces Company Details + Contact Details with **Driver Details**: **Name**, Contact Phone Number(s), Contact Email (optional) | **Please provide name and contact details of provider.** Personal-name example omitted; no separate Contact Name input |
| Supplier Payment Preferences | Search inputs **Cab Payment Preferences; Activities Payment Preferences; Hotel Payment Preferences** shown according to checked categories | **Please provide the supplier payment preferences details.** Required markers not observed |

### Preference choices

Cab and Activities preference dropdowns displayed **Type to search...** with no typed query; no loaded named options. This is a search-only observed state, not evidence that no preferences exist.

Hotel preferences loaded, in order: **100% 7 days after Checkout Date; 40% on Booking Date, 60% 7 days before Checkin Date; 50% on Booking Date, 50% 30 days before Checkin Date; 100% 1 day before Checkout Date; 50% on Booking Date, 50% 15 days before Checkin Date; 25% on Booking Date, 75% 2 days before Checkin Date**. No selection or preference creation. Phone prefix pattern matches the documented [shared control](17-service-creation-forms.md#shared-country-code-control); full per-form option equality not independently checked.

## Demonstrated transitions and coverage limits

Transport entry → company default → **Single Driver** → Driver Details → checked additional **Travel Activities** and **Hotels** → three preference fields → **Cancel**. Separate activity/hotel entry routes then verified their selected category and company/contact structure and cancelled. No record identity/contact, payment schedule, validation/submission, duplicate check, driver/cab inventory, approval, accounting setup, bank/tax/address registration or later contact-add result established. Those fields are not visible in the observed creation form; do not invent them from expected supplier onboarding.
