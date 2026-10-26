# Nexus DMC — wallet top-up and deposit request

Screen ID: NEXUS-S15. References: NEXUS-038–039. Received/extracted 2026-10-06. Nexus DMC from user context; URL/role/breadcrumb unshown. Related: [statements](14-account-and-wallet-statements.md), [dashboard Recharge control](01-dashboard-and-navigation.md).

## Evidence and layout

| Reference | Archive | State / limits |
| --- | --- | --- |
| NEXUS-038 | [Online top-up](../screenshots/nexus-038-wallet-top-up-redacted.png) | Wallet Summary left, top-up amount/payment methods right; private Deposit Balance masked; lower Credit Card section cropped |
| NEXUS-039 | [Deposit request](../screenshots/nexus-039-deposit-request.png) | Cash/bank-transfer request fields and receipt upload; submission controls below crop, exact copy |

Two different task screens; receiving them in order does not establish navigation. No real payment/deposit action performed. Portal policy/security statements below are displayed claims, not independently verified rules.

## Online add money

038 left heading **Wallet Summary**; **Deposit Balance** card with private rupee balance (two decimal places, redacted); **View Statement** button. Right heading **Add money to your deposit**; subtitle **All transactions are secure and encrypted.** This claim does not establish independently verified encryption or payment-security implementation.

Pale-blue strip: **Topup Amount (INR)** text input displaying **2000.0**, **Load** button. This displayed amount is not an established default/minimum/increment. No required marker or validation shown.

| Payment method in order | Visible control/state | Content/actions |
| --- | --- | --- |
| UPI | Selected radio, expanded white panel; payment-style icon right | **UPI has a maximum limit of Rs 1,00,000/- per day as per the guidelines of NPCI**; **Total amount to be paid: ₹ 2,000**; **Pay now** |
| Net Banking | Unselected radio, collapsed pale-gray row; bank/globe icon | Bank list, amount/fees and Pay action unshown |
| Credit Card | Unselected radio, collapsed row; card icon; bottom crop | Card fields, fees and Pay action unshown |

No payment receipt, QR/UPI app choice, gateway identification, status/redirect, success/failure, loaded-amount change, fee/tax breakdown or credited-wallet state supplied. The printed UPI maximum is a portal claim; enforcement and exceptions unshown. Input and displayed payable amount coexist without proving Load was clicked.

## Cash/bank-transfer deposit request

039 title **Update Deposit Request for Cash/Bank Transfers**. Subtitle: **Once you update the deposit request please allow us 30 minutes - 1 hour to update your deposit account.** Cyan notice with warning icon: **Please Note: Cash Transactions are not allowed. 100% penalty for cash deposits over Rs. 1.99 lacs.** Preserve this wording alongside the currently selected Cash Deposit value; no explanation or enforcement shown.

Two bordered two-column field groups, followed by receipt upload:

| Exact label | Control / state | Requiredness / help / coverage |
| --- | --- | --- |
| PAYMENT MODE | Closed dropdown **Cash Deposit** | No * visible; other options unshown |
| AMOUNT | Empty text-style input | Placeholder **e.g. Enter Amount Deposited**; no currency unit printed at field; validation unshown |
| BANK NAME | Empty text input | Help **Your bank name in which money has been deposited.** |
| BRANCH | Empty text input | No help/required marker visible |
| OUR BANK ACCOUNT | Closed dropdown, blank displayed value | Actual accounts/options unshown |
| BANK TRANSACTION ID | Empty text input | Format/requiredness unshown |
| ON DATE | Date input **06 Oct 2026**, adjacent calendar icon | Calendar/range rules unshown; sample value not presumed default |
| REMARKS (IF ANY) | Empty multiline textarea | Parenthetical label retained; no required marker |
| Upload Payment Receipt | **Browse** file control, gray **NO IMAGE AVAILABLE** thumbnail | **\*** visible; no selected file, type/size limits or preview/result supplied |

No submit button in crop. Request creation, bank reconciliation, receipt verification, approval/status, processing timing and balance update unshown. Subtitle is requested waiting-time wording, not observed completion. No supplied receipt or populated bank account/transaction data to archive.

## Flow and verification

Recharge label in 004 and these supplied screens share wallet context; menu paths unshown. View Statement in 038 and Wallet Statement in 037 correspond by title/task, click unshown. Load, payment radios, Pay now, dropdowns, calendar and Browse have no captured action results. No portal interaction, supplier/customer contact or real transfer. Two images visually inspected; one balance-redacted derivative and one exact copy saved, hashes/dimensions/decoding verified in [manifest](../archive-manifest.json); redaction visually checked.
