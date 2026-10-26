# TripboxCRM — organisation, portal, users and teams

Screen ID TRIPBOX-S09. Owner, 2026-10-09. References L009–015/L088. UI inspection; no shared configuration/access changes applied. Exact observations in [session evidence](../sessions/2026-10-09.md). Related [agencies](07-contacts-and-agencies.md), [automation](10-automation-and-integrations.md), [AI](13-ai-and-permissions.md).

## Organisation profile

`/org/organisation`: Active workspace, Operating profile. Organisation name, operating country India, billing currencies INR, seat capacity 2 users. Company email, GST number, State name, Company address all Not set. Bank name, Account holder name, Account number, IFSC code, Branch name all Not set, described as proforma invoice content. Brand preview/name/image; Upload image, square PNG/JPG under 2 MB.

Edit company details opens Company email, GST number, State name, Company address (500 characters), five bank fields above; Cancel/Save details. Workspace name/country/currency/seat controls are not in this editor. Cancelled without edit.

## Agent Portal

`/org/agent-portal` exposes required Portal identifier (blank; internal, never part of portal URL); Enable portal off; primary colour default #B98022 (black text, 6.17:1 contrast); secondary #131B2A (dark shade recommended for white text); Add portal domain (hostnames only, first primary); Login background JPG/PNG crop at least 1000×500 / 2:1; Save portal. No portal configured.

Portal Pricing rules: **Create and save the portal configuration before setting pricing rules.** Disabled Markup strategy Percentage of cost, Markup percentage 0, Pricing currency INR, Travel markup percentage 0; GST/TCS percentage 0 and Apply on Cost Only; Save pricing rules disabled. Help says costs/markup/taxes are hidden from agency users. This is configuration wording, not a tested agency session or hidden-cost guarantee.

AI assistant access/usage: month 2026-10; agency table Agency/AI assistant/Requests/Tokens/Last used. Fictional agency has 0 portal users, off, 0 requests, 0 tokens, never used. Alert **AI is not enabled for your organisation / Turn on AI and the itinerary builder feature in Organisation → AI Settings. Agencies cannot use the assistant until then.** No switches changed.

## Workspace users

`/org/users`: Add user, search, Filter by role/status, table Name/Email/Phone/Role/Status/Last Active/Actions,10/page. One Owner Active. Personal identifier omitted; row detail route exists.

`/org/users/new`: required Full name, Email address, Temporary password, Role; optional Phone number; Account status Active; Allow verified payment amendments off (**Allow this user to unverify payments for correction**); Cancel/Create user. Role choices Admin, Sales, Operations, Accounts, Guest, Owner. No user/credential created, no seat/access expansion. Actual role permissions not tested.

## Teams

`/org/teams`: Create team; total/visible/active counts 0; search/status filter; Team Name/Members/Status/Actions; **No teams found / Try adjusting the search or status filter.**

`/org/teams/new`: required Team name, Search workspace users/Add members, current members empty; Active team on/Visible in assignment flows; Cancel/Create team. No team saved or membership changed.

## Personal profile and security

`/profile`: Personal information Full name, disabled Email address, Phone number, Save profile. Email managed by workspace administrator. Update password: Current password/New password, eye icons,6–20 characters/one number/one special character, Update password. MFA Not configured: Connect app/Scan secure QR→Verify six digits→Save recovery one-time codes, compatible TOTP apps, Set up MFA. Account overview shows Password access Active, Second factor Available,1 of 2 protection layers. No credentials entered, MFA started or profile saved. UI protection labels do not establish backend security properties.

## Gaps

Portal setup/pricing choices disabled; agency user login, domain/image crop, pricing secrecy, actual invitations/roles/teams and account security outcomes remain untested. Read-only forms and descriptions are fully attributed; future implementation requirements are outside this record.
