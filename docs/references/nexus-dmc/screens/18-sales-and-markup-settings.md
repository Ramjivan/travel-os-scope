# Nexus DMC — sales and markup settings

Screen ID: NEXUS-S18. References: NEXUS-042–043. Received/extracted 2026-10-06. Nexus DMC from continuing user context; user labels this batch “profile”. 042 visible page title **Sales**, back link **‹ Settings**. URL/formal viewer role unshown. Related: [Settings menu](17-settings-menu.md), [staff permissions](16-manage-staff-members.md), [business profile](20-business-profile.md).

## Evidence and layout

| Reference | Archive | State / limits |
| --- | --- | --- |
| NEXUS-042 | [Markup settings](../screenshots/nexus-042-sales-markup-settings-redacted.png) | Land markup, agency ID, hotels/flight markup cards; agency ID masked |
| NEXUS-043 | [Sales settings](../screenshots/nexus-043-sales-settings.png) | Three unchecked sales controls, extra text/product/tax fields and Save Changes; preceding markup card cropped; exact copy |

Gray background, left section labels/help, right white cards. 043's upper fragment shows ADD NEW MARKUP without its parent heading; do not assign it to a different markup product. The overlap and user context support grouping these under Sales; scrolling/action sequence not captured.

## Markup Settings

042 left **Markup Settings**; help **Set up how much markup will be applied on proposals and packages on your website**. Top card:

- **Markup on Land Part in Package/Proposal (%)** — input **0.0**, percentage unit explicit; required indicator/range/validation unshown. Displayed value not established default.
- **Agency ID** — populated numeric identifier shown as text, redacted; editability unshown. Different formatting from business-profile identifier in 045 is preserved structurally, not assigned a relationship.
- Help: **To control if markup needs to be asked while saving a proposal, you can set it up on your profile page. Each staff can have different setting for the same.** **profile** is a blue link in the sentence. This is displayed explanatory text; prompt timing, staff-specific field and save flow unshown.

Next cards, in order:

| Exact heading | Exact description | Action / coverage |
| --- | --- | --- |
| Markup - Hotels Search | Define markup which will be applied on hotels in search. | ADD NEW MARKUP; no existing rule row visible |
| Markup on Flights | Define markup which will be applied on flights | ADD NEW MARKUP; no existing rule row visible |

No expanded rule form, currency/percentage choice for hotel/flight rules, supplier/product selection, min/max, rule priority, commission, computed fare or saved output. The controls and wording do not establish actual applied-price formulas or backend enforcement.

## Sales Settings

043 left heading **Sales Settings**. Three unchecked checkboxes, in displayed order:

1. **Don't show "Book Now" button on proposals sent to customers**
2. **Show fully refundable cancellation policy on hotel to customers**
3. **CC main admin account email in all communications related to a booking or proposal by the staff**

No selected/changed variants, customer proposal output, email copy or actual communications supplied. These are visible configuration labels, not tested effects or authorization to contact anyone.

| Exact label | Visible control / state | Exact help text |
| --- | --- | --- |
| Package price extra text | Empty text input | This text appears below the total price of all quotes/proposals. It can be used to mention any extra fees applicable. |
| Products to disable | Empty outlined field; selection/editor type not identifiable from crop | These products will not be shown or allowed to be added while creating a quote/proposal |
| Show taxes extra | Empty outlined field; selection/editor type not identifiable from crop | The selected tax types will be shown as extra chargeable on quotes/proposal |

Field option sets, requiredness, disabled-product categories, tax types/rates and combination rules unshown. **SAVE CHANGES** dark-blue button in lower white footer, partly cropped at bottom; click, validation and persistence result unshown. No success/error/loading state.

Later [proposal detail 048](23-proposal-details.md) shows BOOK NOW, Update Markup, Net Price/Total Price and INCLUDING ALL TAXES. That independently supplied agency view does not demonstrate changing these settings or the resulting customer-facing proposal. Customer output, markup application and tax-display effects remain unshown.

## Flow and verification

Settings Sales and Markups tile in 041 corresponds to supplied Sales content, but opening click unshown. Settings back link, profile link, ADD NEW MARKUP, checkboxes and SAVE CHANGES have no captured action outcomes. No calculation, product recommendation or proposed implementation added. Two originals inspected; one ID-redacted derivative and one exact copy saved with dimensions/decoding/hash checks in [manifest](../archive-manifest.json); mask visually checked.
