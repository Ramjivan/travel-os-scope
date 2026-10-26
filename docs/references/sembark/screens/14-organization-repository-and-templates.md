# Sembark — organization repository and templates

Screen ID SEMBARK-S14. References SEMBARK-L004/L029–L030, L058–L063; [live provenance](../live-observation-2026-10-08.md). Observed 2026-10-08. Avatar Organization → `/org` → `/org/trip-destinations` directly demonstrated in the earlier sequence. Formal role unverified. Organization's business ID and private staff/source/contact/supplier identifiers omitted. Currency IDR and timezone Asia/Kolkata (GMT+05:30) displayed. No save, delete, archive, image upload or other record-changing submission performed. One accidental unsaved hotel-preference selection was cancelled, as disclosed below; no backend side-effect audit.

## Repository navigation and list pages

Organization header above **Repository**, then **Destinations; Trip Sources; Templates; Supplier Payment Prefs; T&C; Inc/Exclusions; Cab Types; Document Types NEW; Tags NEW**. Each category opened through its visible link. Most directories use Search..., count/refresh and table; create/row/overflow actions untested. Visible taxonomy reflects this organization, not defaults for every account.

| Category / route after `/org/` | Title / columns | Count / specific observed content |
| --- | --- | --- |
| trip-destinations | Destinations; Image, Name, Short, Currency, Created By, unlabeled actions | 1–2 of 2: Bali-Indonesia / ID / IDR; Dubai / DB / AED. Filter control observed on first arrival, options untested |
| trip-sources | Trip Sources; Name, Created By, Tags, Teams, unlabeled actions | Showing 20 Items; no Advanced Filters control matched in observed page |
| supplier-payment-preferences | Supplier Payment Preferences; Hotel, Activity, Transport; Hotel Payment Preferences; Description, Suppliers, Created By, unlabeled actions | Hotel default 1–6 of 6; preset descriptions encode percentage instalments relative to Booking/Checkin/Checkout Date. Private specific commercial terms omitted. Add New untouched; Activity/Transport internals untested |
| terms-and-conditions | Terms and Conditions; Name, By, On | 1–1 of 1; text record content not opened |
| inclusion-exclusion-presets | Inc/Exclusion Presets; Name, Created On | 1–1 of 1; preset contents not opened |
| cab-types | Cab Types; Name, Created By, Last Updated, unlabeled actions | 1–20 of 39; Previous/Next |
| document-types | Document Types; Name, Destinations NEW, unlabeled actions | 1–8 of 8; document files not inspected |
| tags | Tags; Trips; Trips Tags; Title, Usage, Created By, unlabeled actions | 1–3 of 3: Cancelled, Quoted, Prospect; usage numbers displayed; Add New NEW untouched |

## Template configuration navigation

Templates `/org/templates` displays **Template Configurations**, tabs **Quote Email; Quote PDF NEW; Proforma Invoice; Trip Voucher; Hotel Booking Enquiry Email; Activity Voucher Email**. All six viewing tabs opened. Configuration editing controls not activated; observations below are current displayed values, not our chosen design.

### Quote Email

**Quote Email Template Configurations**, applicability **These configuration will be applied to Quote Emails only.** Font Family Verdana, Justified Text Default, Subject Using the default subject, Greetings with `{{CUSTOMER_NAME}}`/`{{BRAND_NAME}}` placeholders.

Sections **Settings for Hotels Section** (Section Title Hotels; separate Total Price section; Similar Word In Hotel Names disabled), **Settings for Transportation and Activity Section** (default Section Variant; No, Show Day Wise Transport Summary; Specific Terms and Notes N/A), **Section Title Settings** (Background fill; Border none; Text Align center; preview Sample Title Text), **Show, Hide & Reorder Email Sections**, **Day Wise Itinerary Settings** (title Day Wise Itinerary; Travel Distance Always Show; Show Services Together disabled), **Important Notes**, **Terms Settings**. Update/creator metadata displayed, identities omitted.

Shown email section order: **1 Hotels / Accommodations; 2 Total Price; 3 Transfer and Activity; 4 Flights; 5 Inclusions & Exclusions; 6 Day Wise Itinerary; 7 Important Notes**. No reordering performed.

### Quote PDF

`/org/templates/quote-pdf-templates`: **Quote Pdf Template Configurations**, applicability Quote PDFs only; font/heading font DejaVu Sans, Justified Text Default, watermark uses `{{BRAND_NAME}}`/`{{TRIP_ID}}`. **Hide Branding For B2B: No; Hide Branding For B2C: No; Header Banner Image: Show; Footer Banner Image: Show; Show Header on First Page & Footer on Last Page: No**. Watermark Opacity and border/background opacity labels shown without readable numeric value; not inferred.

Section-title style Background fill, Border left, Rounded right, Text Align auto. Hotels: title Hotels / Accommodations, similar-word disabled, Hotel Card Style Image & Text (right), preview hotel/location/date/room/pax/meal labels. Greeting placeholders. Package Preview Style Label & Value; **DESTINATION; PAX; START DATE; TRIP ID; DURATION**. Transportation/activity default section variant, day-wise transport summary, Specific Terms N/A, **Show Activity Start Time: No, Hide Activity Start Time**.

Pricing: separate Total Price section, Hide Price in Quote disabled (price shown), Show Price Breakup (Component wise Total) disabled. Day Wise Itinerary title/distance/disabled grouping; **Itinerary Style Stacked (align_to_service)** with day/date/service/description preview. PDF order **1 Total Price; 2 Flights; 3 Hotels / Accommodations; 4 Transfer and Activity; 5 Day Wise Itinerary; 6 Inclusions & Exclusions; 7 Important Notes**. Important Notes, Terms and Conditions, Inclusions/Exclusions titles; Sales Title **Your Holiday Consultant**. No PDF generated/downloaded.

### Other templates

| Tab / route after `/org/templates/` | Observed content |
| --- | --- |
| Proforma Invoice / invoice-templates | Applies to Proforma Invoice only; Title Customization Proforma Invoice; Show Place of Supply Yes; Show HSN/SAC Number Yes; Default HSN/SAC Number N/A; Title for T&C Section Terms and Conditions; No Terms and Conditions selected |
| Trip Voucher / trip-voucher-templates | Using default trip voucher template configurations |
| Hotel Booking Enquiry Email / hotel-booking-enquiry-email-template | Applies to Hotel Booking Enquiry Email/WhatsApp Template only; Using default hotel sharing email template configurations |
| Activity Voucher Email / activity-voucher-templates | Applies to Activity Voucher only; Using default activity voucher template configurations |

## Repository walkthrough — L058–L063

[FB-032](../../../feedback/README.md): user requests all tabs/options at `/org/trip-destinations`. All nine Repository categories, all six Template tabs, all three Supplier Payment Prefs tabs and the single shown Trips Tags tab were opened and their loaded contents read. Earlier table describes first-pass coverage; the following observations extend it. At the observed viewport, the organization/logo header sits above Repository and a vertical left category list; content title/search/table occupies the right. Template and preference categories add a nested tab row. A Cab Types screenshot was visually inspected for overflow/refresh placement, not archived. Other states were primarily read through rendered accessible text.

### Destinations — L058

**Search...**, **Advanced Filters** and count/refresh; no Add destination action shown for this login. Expanded filters: unchecked **Disabled Only**, **Apply Filters**, **Reset Filters**, **Hide Advanced Filters**. No filter applied. Both destination detail links opened, then returned using **Trip Destinations** breadcrumb.

| Detail field | Bali-Indonesia | Dubai |
| --- | --- | --- |
| Name / short / currency | Bali-Indonesia / ID / IDR | Dubai / DB / AED |
| Related trip link | 11,414 Trips | 56 Trips |
| Address(es) | Primary Address; no address value readable | Primary Address; no address value readable |
| Child Age Range | 6 - 12 yrs | 6 - 12 yrs |
| Default Hotel Checkin | 14:00 hrs | 12:00 hrs |
| Default Hotel Checkout | 11:00 hrs | 11:00 hrs |
| Contact Numbers | Not Set | Not Set |
| Metadata | Created By/date; Last Updated By/date | Created By/date; no update metadata shown |

Both details show **Destination Image → This image appears on first page of your PDF**; **Branding Image → Shown on the first page of branded quote PDFs**; **Non Branding Image → Shown on the first page when Hide Branding is enabled on quote PDFs**; **Review/Branding Section → This image to be displayed in the last page of your review**. Each of the three image slots has **Add Image / No Image Selected**. **Bank Account → Bank Accounts that are linked to this destination → No Bank account details added for this destination**. Image controls and related Trips links not activated; no Edit control shown.

### Trip Sources — L059

`/org/trip-sources`: **Add New Source** is now observed, plus Search..., refresh and unlabeled header control. Rows show full name, parenthesized short name, locality and **B2B Agent**, creator/date, Tags and Teams (`-` in the sampled rows). Showing **20 Items**, with no total count or pagination controls shown. Sample row overflow opens **Edit Details; View Queries**; neither action submitted. One existing source opened through its name link; all four main tabs viewed:

| Source tab / route after `/trip-sources/<source>` | Loaded content / available actions |
| --- | --- |
| Details / base | Name/short name, B2B badge, related Trip count, Teams N/A, city/state/country, phone/email links, creator/time. **Contacts** table: primary-contact icon, Name, Designation, Phone Number, Email, unlabeled row action. **Edit; Add Contact** visible, not used; no contact links activated |
| Trips / trips?status=new | Search, Advanced Filters, Sort By; **New Query; In Progress; On Hold; Converted; On Trip; Past Trips; Canceled; Dropped; All**. Columns **ID; Contact; Details; Team; Tags**. Details includes destination/date/nights/adults; Team includes owner/time. Displayed **1–5 of 5** |
| Payments / payments/incoming?status=future_due | **Incoming Payments; Refund Only; Upcoming; Past 7 Days; Unverified; Paid; Overdue; All**, Search/Advanced Filters. **No results matched your search / Refresh Results**; other status/refund views not opened here |
| Accounting / accounting | **View Due Payments**; table **Name; Type; Tags; Assets**, one linked account, Type `-`, Tags n/a, unlabeled Assets action. Account ledger not opened |

**Observed discrepancy:** source Details shows **1 Trip**, but source Trips/New Query shows five rows, including contacts with different source names. This is the rendered result, not evidence that source isolation/filtering works correctly; its cause and account scope remain unverified. Private row values omitted.

**Add New Source** → `/trip-sources/new?back=<repository>` opened blank and cancelled. Two source-type radios are displayed (B2B selected by default):

- **B2B Agent / Online Marketplace**: page explanation says the source acts as agent/intermediator until trip end and accounting should be managed for guest and source; examples ABC Holidays, Travel Triangle, Thrillophilia.
- **Direct / Website / Referrals / Ads / Lead Sellers**: page explanation says no agent/intermediator after lead generation and accounting should be managed for Guest only; examples Direct Call/WhatsApp/Email, Website/Landing Pages, Referrals, TripCrafters. Radio not switched; conditional Direct fields unknown.

Form sections: **Basic Details** (Agency / Company Full Name, Short Name); **Contact Person** (Name, Email, Phone Number(s), country-code selector default +91 India, Add More); **Address** (City / Town / District, State / Province / Region, Country searchable fields; Pin Code, Street Address, Locality / Area, Landmark optional); **Billing Details** (Addressing Name on Bills/Invoices, **Aditional Details** textarea; helper mentions Billing Name, CIN, PAN, GST); **Save Details; Cancel**. No text entered, repeated rows added or source type changed. Country-code options were exposed by accessibility while the native selector was collapsed, not visually expanded; full country/address option coverage not claimed.

### Supplier Payment Prefs — L060

Entry resolves to `/org/supplier-payment-preferences/hotel`. **Hotel; Activity; Transport** have separate lists and **Add New** routes. Hotel retains six preset rows, percentage/date-offset descriptions and supplier usage counts (five zero, one one); private commercial descriptions omitted. Sample hotel overflow shows **Delete**, untouched. Activity displays **There are currently no Activity Payment Preferences / Add Activity Payment Preference**. Transport displays equivalent empty/add text. No Advanced Filters control shown on these three lists.

All three **Add New** blank forms were opened, read and exited with Cancel. `/supplier-payment-preferences/<hotel|activity|transport>/new`: breadcrumb **Supplier Payment Preferences → category → New**, heading **New Preference**, category-specific instruction. Helper explains a negative offset as days before a reference event and Amount Share as percentage. One breakdown row: **Reference Event** searchable selector (initially blank), **Day offset from reference** number default **0**, **Amount share from total amount** number default **50**, `%`; **Add More; Save Preference; Cancel**. No number edited or additional breakdown added; save-time percentage/offset validation unknown.

| Expanded Reference Event selector | Options shown |
| --- | --- |
| Hotel | Booking Date; Checkin Date; Checkout Date; Booking Month End; Checkout Month End; Trip End |
| Activity | Booking Date; Service Date; Month End Of Booking; Month End Of Service End; Trip End |
| Transport | Booking Date; Service Date; Month End Of Booking; Month End Of Service End; Trip End |

**Interaction exception:** while Hotel dropdown was open, a click intended for Cancel was intercepted and selected **Booking Month End** in the unsaved form. The resulting **Summary: 50% on Booking Month End** was read; **Save Preference was never clicked**. A second Cancel returned to the six-row hotel list. Disclosed to the user during inspection. For Activity/Transport, dropdowns were dismissed by clicking the page heading before Cancel; Reference remained blank and blur displayed **Reference field is required**. Both returned to their empty lists. This records a client-side draft selection, not a submitted preference or an audited guarantee about automatic side effects.

### T&C and Inc/Exclusions — L061

**T&C** list now shows **Add TnC**; Advanced Filters opens unchecked **Archived only**, Apply/Reset/Hide. One **BALI** detail `/terms-and-conditions/<terms>`: **Details → TnC → BALI**, **Edit**, unlabeled overflow, **Name**, creator/date, **View Revisions**. Content uses rendered headings, bullets, links, paragraphs and code-style lines: **UPDATED TRAVEL GUIDELINE FOR BALI :**, passport/visa/tourist-levy/payment guidance, All Indonesia declaration instructions, **SPCL NOTE : ROE AS PER TODAY ONLY**, vehicle extra-hour commercial notes. Text was read; private commercial values are not copied and legal/travel claims were not independently checked. External links not followed.

**View Revisions** changes to **Hide Revisions**, displays disabled **Latest**, one date button **21 Nov, 2025**, **- 5 Deletion / + 4 Addition**, actor/date/time and a line-oriented change view. No revision date switched or restored. **Add TnC** → `/terms-and-conditions/new`: **New Terms**, **Name**, **Terms and Conditions Text** editor with **Write; Preview; Heading; Bold [Control+b]; Italic [Control+i]; Link [Control+k]; Numbered List [Control+Shift+7]; Unordered List [Control+Shift+8]**, one unlabeled toolbar control, Save Details/Cancel. Helper asks to avoid the business name because signature/contact details are added automatically to itineraries and terms can be shared between businesses. This is page-described behavior, not a demonstrated generation/share result. Blank form cancelled, no formatting/text added.

**Inc/Exclusions** list shows Add New. One **BALI** detail `/inclusion-exclusion-presets/<preset>`: Name, creator/update metadata, Edit, separate **Inclusions / List of inclusions in this preset** and **Exclusions / List of exclusions in this preset**. Six inclusion bullets cover airport assistance, arrival welcome, tour/transfer water, accommodation/meal basis, private transfers/vehicle and driver-guide. Four exclusions cover airfare/taxes/unmentioned meals, costs outside Cost Includes, visa/levy and personal expenses. Footer **Anything not mentioned in the inclusions is excluded.** Private package specifics omitted.

Add New → `/inclusion-exclusion-presets/new`: **New Inclusion/Exclusion Group**, **Preset Name**, both inclusion/exclusion sections with one category searchbox **Select or create category (Optional)**, description field and unlabeled row button; separate **Add More** buttons; exclusion footer above; **Note: Drag and drop items in the list to change their order**; Save Details/Cancel. Inclusion category opening only showed **Type to search...**, no loaded choices. No search input/category/repeated row/reorder performed; blank form cancelled.

### Cab Types, Document Types and Tags — L062

**Cab Types**: both pages viewed, **1–20 of 39** and **21–39 of 39**; Previous disabled on first, Next disabled on last. Name entries bear **Added Manually** or **Added by Sheet** icons. Advanced Filters: **Trip Destinations** (Bali-Indonesia, Dubai); **Upload Type** (Only Sheet, Only Manual); unchecked **Archived only**; Apply/Reset/Hide. No filter selection/apply. Overflow on one manual and one sheet row shows **Edit Cab Type; Archive**. No archive submitted; edit dialog was not successfully opened, so its fields remain unobserved. No Add Cab Type shown.

Cab names, preserving displayed spelling/order:

- Page 1: **07 Seater; 14 Seater; 31 seater; 41; Alphard; Avanza Ertiga CALYA; BMW 320i RED CANDY; Booked By Own Side; BUS 35 SEATS; BUS 29 SEATS; BUS 31 SEATS; BUS 41 SEATER; BUS 52 SEATS; Cidomo; Coaster; Elf Giga; ELF LONG (20 Seater); ELF SHORT (12 SEATER); Executive Legrest (20+5 Seats); fortuner**.
- Page 2: **Giga; Guide; HIAC PREMIO; HIACE; Hiace Commuter; Hiace Commuter Luxury; HIACE GEDE; HIACE MUSKURANE; HIACE PREMIO LUXURY; Innova Reborn; Lagguage Van; latest Alphard; Mercedes Benz E400; Mercedez Benz S 400; N/A; Premium Luxury; shuttle; Volkswagen; zenix**.

**Document Types**: all eight rows **Govt. ID; Health Certificate; Voter ID; Driving License; PAN; Aadhaar; Visa; Passport**; Destinations `-` for each. This is a type catalog, not stored traveler document files. Advanced Filters **Destinations** expands Bali-Indonesia/Dubai; Apply/Reset/Hide. Sample row menu **Edit Document Type; Delete** (untouched). **Add Document Type NEW** → `/document-type/new`: **New Document Type**, Name, Destinations searchable selector (same two choices), Save Details/Cancel; no selection/text entry, cancelled.

**Tags** entry resolves to `/org/tags/trips`; only nested **Trips** shown. Three tags **Cancelled (1); Quoted (55); Prospect (13)** usage values, not application status rules. Advanced Filters: unchecked **Show unused tags only**, Apply/Reset/Hide. A sampled row action was disabled; attempted opening produced no menu, not a demonstrated permission rule. **Add New NEW** → `/tags/trips/new`: **New Tag**, **Title**, **Color (Optional)** text/color well (native color value #000000), **Preview / Sample Tag**, **Description (Optional)** textarea, **Save Tag; Cancel**. Picker not opened, no fields entered, cancelled.

### Templates — L063

All six template viewing tabs reread. Entry resolves to `/org/templates/quote-email-templates`; current values/order above remain observed. Quote Email's Terms Settings Section Title is **Important Notes**, while Quote PDF's is **Terms and Conditions**; preserved as displayed. Proforma Invoice heading **Proforma Invoice Template Configurations** and its shown tax/place/T&C values confirmed. Trip Voucher applicability is **Trip voucher only**; Hotel Enquiry applicability **Hotel Booking Enquiry Email/WhatsApp Template only**; Activity Voucher Email tab leads to **Activity Voucher Template Configurations**, applicability **Activity Voucher only**. Their default notices expose no detailed layout settings. No editing controls were exposed in the inspected template states for this login; alternate styles, closed customization options and generated output remain unknown.

## Current limits and return state

All shown Repository category/default nested views covered, not every record, every search-dependent result, all source trip/payment status groups, linked account ledger or historical revision. Add forms were inspected only where a visible New link led to an unsubmitted form; required marks not established beyond the explicit blur validation above. Existing source/terms/preset/doc editors, cab edit dialog, image picker/uploads, tag color picker, template customization and action outcomes remain unreviewed. Displayed B2B/B2C branding and source-accounting explanations do not establish external-agency permissions or authoritative financial rules. No save/delete/archive/payment/share/upload submitted. Restored `/org/trip-destinations` and retained the visible tab. Database design and automated application of presets cannot be inferred from these views.
