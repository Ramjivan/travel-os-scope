# TripboxCRM — customers, agencies and agency contacts

Screen ID TRIPBOX-S07. Owner, 2026-10-09. References L101–107 and additional session creation notes; [session](../sessions/2026-10-09.md), [records](../data/test-records.md), [lead](05-lead-lists-and-documents.md).

## Customer directory

`/contacts`, Contacts. Refresh contacts, Import contacts, New contact. Filters search plus two text inputs whose purposes were not identified, Any gender, Newest first and unlabeled icon. Table selection/NAME/EMAIL/PHONE/TAGS/LOCATION/ACTION; name and email/phone expose sort labels, location has filter. Four row icons remain unlabeled. Pagination 20/page.

Creating Lead #1 automatically produced a reusable customer with the same fictional name/email. Contact count remained one while agency contact was created elsewhere. After Lead #1 became Confirmed, contact displayed **Won**; no direct tag edit was made. Customer ID not exposed in inspected UI.

Name opens profile modal with Profile, Documents, Lead history, Booking history. Profile sections: Personal details (Email, Phone, Alternate phone, Date of birth, Nationality, Location, Marriage anniversary, Address); Profile notes; Family details (Marital status, Spouse, Children); Record activity (Campaigns, Contact created, Last updated). Synthetic name/email only, all other personal fields blank, children 0/campaigns 0.

Lead history search/status dropdown; table Lead ID/Guest Name/Destinations/Status/Travel Date/Nights/Assigned To/Created. Row #1 links to the enquiry, Bali/20 Nov/4N/current Owner, status changed In Progress → Confirmed. Pagination 10/page. Documents and Booking history outcomes not inspected.

Create contact modal requires Full name. Optional Email, Phone, Alternate phone, Location, Date of birth, Marriage anniversary, Gender, Nationality, Address, Marital status, Spouse name, Tags, Kids details, Notes. Spouse name initially disabled. Tags placeholder honeymoon, family, vip, etc. Add child appends required Name and optional numeric Age default 0, Remove/Add child. Cancel/Create contact. Draft child row discarded; no extra customer created. Gender/marital/tag choices and import mapping remain unreviewed.

## Agencies

`/org/agencies`, inside Organisation settings. Search, Any status, Newest first, Refresh agencies, New agency. Table AGENCY NAME/STATUS/ACTIONS, pagination10. New agency form name and optional Address (512 character counter observed). Created **TOS-AUDIT Fictional Agency A**, fictional audit address, Active.

Actions View contacts, Add a contact, Manage portal users, Update, Delete. Only ordinary agency/contact creation and contact viewing were exercised. Portal users were not created and no access granted.

Add agency contact: name, optional email, country-code/phone, optional region, Default contact switch off. Created synthetic name and example.invalid email; phone/region blank/default false. View contacts drawer: search, Any region, New contact, Refresh agency contacts; NAME/EMAIL/PHONE/REGION/DEFAULT/ACTIONS,10/page. Row provides Set default, Update, Delete. No default/update/delete action tested.

## Customer and agency continuation — 10 October

L363–368: customer Documents is a reusable library “available to all linked leads.” Add customer document uses the same required File/Document type/Display label and optional metadata as trip documents. Full type list: **Passport, Visa, ID, Flight ticket, Voucher, Hotel confirmation, Insurance, Other**. Maximum5MB, PDF/images/Office/TXT/CSV. No upload performed. Booking history: search/status; Lead ID/Guest Name/Destinations/Booking Status/Start Date/End Date/Selling Price/Confirmed. Lead2 empty. Status **All, Pending, In Progress, Completed, Cancelled**.

L369–375: gender **Male, Female, Other, Prefer not to say**; marital status **Single, Married, Divorced, Widowed, Separated, Prefer not to say**. Married enables Spouse name. Created **TOS-AUDIT Fictional Family Contact C**, family-c@example.invalid, Married/fictional spouse/one fictional child8/fictional notes. Profile and edit form retained household values. Pencil row action opens Update contact; added freeform **TOS-AUDIT Household C** tag using Enter/Savechanges; directory showed the tag. No phone, identity dates or real personal data entered. Row icons remain unlabeled but pencil edit result is verified; delete not exercised.

L376 Import contacts instructions: case-sensitive required headers **fullname,email,phone**; at least email or phone per row. Optional **alternatePhone,location,dob,marriageAnniversary,gender,nationality,address,maritalStatus,spouseName,kidsNames,kidsAges,tags,notes**. E.164 phone; date YYYY-MM-DD; gender male/female/other/prefer_not_to_say; marital single/married/divorced/widowed/separated/prefer_not_to_say. Kids names/ages comma-separated paired values; tags comma-separated Excel, pipe-separated CSV. Only first Excel sheet processed. Downloadtemplate/Uploadcontacts shown, file parsing untested.

L389–392 agencyA ID **f2ba4653-6796-4a27-8c62-d1d11b5db133** user directory `/org/agencies/<id>/users`:0portalusers; User/Linkedcontact/Role/Status/Actions, Adduser/Addfirstuser. Add agency portal user requires Name/Email/Temporarypassword; role **Agency owner / Agency member(default)**; optional existing agency contact. Help requires password replacement after first sign-in and states contacts/users managed independently. Inspected choices, cancelled without credential entry or access creation. First-login enforcement and role boundaries remain unverified.

L393–394 Lead2 Edit agency selector selected AgencyA and auto-selected its sole contact. Saved lead replaced Directcustomer/Ownership with **Agency** name/contact/email, assignee unchanged; customerB/Private qualification/Proposed quote unchanged. No portal account exists and no sharing enabled.

## Distinctions and gaps

Customer records and agency business contacts are separate observed directories. No agency association was added to Lead #1. Portal configuration and pricing are in [workspace settings](09-workspace-settings.md). Matching rules, repeat travellers, household automation, invitation delivery, agency permissions and destructive recovery are not established.
