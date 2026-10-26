# TripboxCRM — mailboxes, automated messages and intake integrations

Screen ID TRIPBOX-S10. Owner, 2026-10-09. References L016–023/L031–035/L046–050. [Evidence](../sessions/2026-10-09.md). Configuration viewed; no external connection, send or rule saved.

## Mailboxes

`/org/mailboxes`: Connected inboxes 0, Active inboxes 0, Spam senders 0; tabs Mailboxes/Spam Senders. Add mailbox; search; table Email/Display Name/Provider/Status/Default/Actions; **No mailboxes found / Connect a mailbox or adjust the current search.** Spam tab interior not inspected.

`/org/mailboxes/new`: required Email Provider with choices Outlook/Gmail; Mailbox Email disabled until connection; Display name; Sync status Active; Default sender Standard/off; Cancel/Connect mailbox. Provider authorization was not started. Shared-inbox conversation/assignment/reply capabilities appear in [MCP descriptions](13-ai-and-permissions.md), but mailbox UI outcomes were not exercised.

## Automated emails

`/org/automated-emails`: Add automation, refresh icon; Title/Event/Mailbox/Subject/Active/Actions; **No automated emails / Create an automation to send consistent event-driven messages.**

Create Automated Email modal: required Title, Trigger Event, Send From (Mailbox), Email Subject, Email Body; Active on. Events Lead Created; Status→Confirmed; Status→Ongoing Trip; Status→Trip Completed; Status→Cancelled; Payment Received. Body rich editor Bold/Italic/Underline/Strike, Link and four unlabelled controls. Placeholder insert choices Guest Name, Guest Email, Guest Mobile, Guest Location, Destinations, Nights, Planned Travel Date, Adults, CWB, CNB, Infants, Departure City, Lead ID, Status, Source, Organisation Name. Help example `{{guestName}}`. Cancel/Create. No mailbox exists; no automation submitted or email delivered.

## Query sources

`/org/query-sources`: totals 4 / visible 4 / active 4; search/status filter; Name/Contact Info/Status/Actions;10/page. Active Direct/Social Media/Website/Reference, matching lead creation choices. Add source route `/org/query-source/new`: required Source name, optional Contact name/email/phone, active Source status/Available for new leads, Cancel/Create source. No new source saved.

## Intake integrations

`/org/integrations`: tabs Meta Lead Ads/Website forms. Meta: Authorize Meta link, Add page; **No Meta pages connected. Authorize Meta, then add a business page.** No OAuth/grant applied; page/form mapping interior unshown.

Website forms: Create form; Name/Source/Fields/Status/CAPTCHA/Created/Actions; **No website forms / Create a form to start capturing first-party website enquiries.**

Create Form modal:

| Input/group | Visible fields/defaults |
| --- | --- |
| Identity | required Form Name, Slug; Lead Source Name Website |
| Required form fields | Editable display labels Guest Name, Travel Destinations, Nights, Planned Travel Date, Adults; cannot remove according to help |
| Optional field | Add Field appends display-label input, target selector, Optional label and remove icon |
| Optional target choices | Guest Email (email), Guest Mobile (phone), Guest Location (text), CWB (number), CNB (number), Infants (number), Departure City (text) |
| Submission | Submit Button Text Submit; Success Message Thank you. We will contact you soon. |
| Protection | CAPTCHA on; Rate Limit (per minute) 20; Allowed Domains token selector, e.g. example.com / leave empty for any domain |
| Actions | Cancel/Create; no form saved or public embed created |

The embedded form requires Guest Name in its configuration although direct lead creation did not mark it required. This is a visible channel-specific distinction; server validation unknown.

## Auto-assignment rules

`/org/auto-assignment-rules`: **Evaluate rules in priority order and route each matching lead to the right user or team.** Initially No rules yet; Add rule, Save rules disabled. Add rule appends PRIORITY 1, Rule name, Enabled on, move up/down (disabled single row), remove; Field/Operator/Value/Assign to. Source selection changes displayed operator from disabled Equals to Contains.

Field choices Guest Location, Departure City, Destinations, Source. Operators Contains, Equals, Starts with, Ends with, Does not contain, Is empty, Is not empty. Value allows commas or Enter; example Mumbai/Delhi. Assign to Select users or teams; **Assign to a single user or team when the rule matches.** Priority reordering/conflicts, team distribution and automatic execution not exercised. Unsaved rule discarded via reload; Save rules never clicked.

## Limits

No connected providers, emails, public forms or automation mutations. OAuth, inbound deduplication, parsing, queues/retry/delivery, spam, routing conflicts and integration security remain unverified. Exact empty states/forms are recorded; advertised behavior is not promoted to tested runtime behavior.
## Spam senders — 10 October

L225: Mailboxes **Spam Senders** tab has email input/Add, table **Email Address / Actions**, empty list. Help says messages from these addresses are removed on sync and hidden. No address added, mailbox connected or sync deletion exercised.
