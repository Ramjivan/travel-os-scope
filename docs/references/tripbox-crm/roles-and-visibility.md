# TripboxCRM roles and visibility

Owner demo,9–10October2026. Consolidated from [S09](screens/09-workspace-settings.md), [S07](screens/07-contacts-and-agencies.md) and [S13](screens/13-ai-and-permissions.md). These are observed session capabilities and UI descriptions, not tested backend security or a proposed permission model.

| Scope | What was actually observed | What remains unobserved |
| --- | --- | --- |
| Owner session | All major navigation and19organisation destinations; fictional CRM, inventory, template, quote, booking-status, schedule, customer, campaign and personal report actions | Other users' sessions and record visibility |
| Workspace roles | User form offers Owner, Admin, Sales, Operations, Accounts, Guest; Active status and Allow verified payment amendments switch | Per-role navigation/actions, invitations, actual amendment rights; no new user created |
| Teams | Workspace users can be chosen as team members, team active state shown | Populated membership/distribution and team isolation |
| Agency users | Agency owner and Agency member(default), separate portal-user records and optional contact link | Agency login/first-password replacement, actual role boundaries; no portal account created |
| Agent portal | Disabled until configured; wording says costs/markup/taxes hidden from agency users | Actual price visibility, agency separation and enabled portal workflow |
| Templates | Share with agents option; own template saved Internal only; Tripbox defaults/team templates/favourites visible | Actual agent access and sharing behavior |
| Reports/filters | Personal versus organisation sharing visible; own personal report/filter saved | Other-user/shared visibility; report wording says owners/admins manage shared reports |
| Custom-service fields | Visible to: Customer and supplier, Supplier only, Internal team only | Actual customer/supplier output filtering |
| Trip/customer documents | Trip-only document section versus reusable customer library available to linked leads | Cross-user access enforcement and document output visibility |
| MCP |14areas/127tools,77enabled; role annotations, instantly applied settings and attributed writes per wording | Working token/tool access, actual role enforcement; no token generated or permission changed |

MCP UI role annotations (L045) associate itinerary writes/workflow/share with Owner/Admin/Sales/Operations; booking writes/vouchers with Owner/Admin/Operations; payment writes with Owner/Admin/Accounts; contact/inventory/supplier/agency/settings writes with Owner/Admin; exports include Owner labels. Read-only tool descriptions and group defaults are in S13. These describe MCP options only and must not be used as evidence of browser-role permissions.

Current discovery requires only supplied sessions and visible forms. Creating credentials, changing permissions or validating backend isolation is outside this flow-mapping pass.

## Brief role-focused review — 10 October

Requested by the user after the broader flow map. Reviewed original captures **L011–015, L045, L389–392** and linked screens. Current tools still do not expose the retained browser, so this is evidence review, not a new login or live role switch.

The observed user form assigns **one selected Role**, account Active/Inactive and a separate **Allow verified payment amendments** switch. Six predefined role labels were shown: Owner, Admin, Sales, Operations, Accounts, Guest. No custom-role builder, per-user module permission grid, reporting hierarchy or multiple-role assignment was observed. This does not establish that those features are absent elsewhere.

### Role annotations explicitly shown in MCP settings

The table transcribes allowed-role labels shown next to selected MCP permission groups in [L045](sessions/evidence/L045-mcp-permissions.txt). It describes that interface only. Missing role labels or omitted capabilities are **not proven denials**; browser navigation/access for non-Owner roles remains unobserved.

| Capability group | Explicit role labels | Meaning described in the UI |
| --- | --- | --- |
| Bulk lead updates | Owner, Admin | Change status, assignee or tags on many leads |
| Itinerary creation/update/workflow/share/email | Owner, Admin, Sales, Operations | Proposed itinerary authoring; confirm/cancel/revert/return to agency; link management and guest email |
| Save itinerary as template | Owner, Admin | Save an existing itinerary for reuse |
| Booking updates and vouchers | Owner, Admin, Operations | Update booking/operation items, mark booked, generate supplier vouchers |
| Payment recording/schedules | Owner, Admin, Accounts | Create/edit schedules, record payments, change schedule status |
| Customer read/edit | Owner, Admin | Contacts and their trips/events; create/update customer records |
| Inventory/supplier/agency writes | Owner, Admin | Create/update repository and business/contact records |
| Saved reports and settings writes | Owner, Admin | Save report definitions; update rates and assignment rules |
| Lead/payment/inventory exports | Owner | Excel output with download link |

Sales has itinerary authoring/workflow annotations; Operations additionally has booking/voucher annotations; Accounts has payment-write annotations. Owner/Admin recur across most explicitly restricted groups. **Guest's specific capabilities are unshown.** General read groups often have no role label; do not translate them into universal access.

### Other access controls visible in the platform

- Agency accounts are separate from workspace users and business contacts. Portal user role choices are **Agency owner / Agency member** (member default), with optional linked contact. Their detailed differences are not shown. Portal was unconfigured and agency users empty.
- Portal wording says cost/markup/tax details hidden from agency users; template **Share with agents** and custom-service field visibility choose what is exposed. Actual agent session and rendered filtering are unobserved.
- Teams supply membership for assignment flows; leads have an assignee and rules choose a single user or team. Campaign assignment had no eligible members. These observations do not establish team-scoped record access.
- Personal/shared report and filter choices are separate from account roles. Shared report wording names Owner/Admin as managers. Cross-user visibility was not observed.
- MCP has its own switches,77of127tools enabled across14areas. Help says available tools must also be allowed by the user's role, changes apply instantly, writes attributed to the token-generating admin, and enabling a group never permits deletion. No connector was activated.

To finish role discovery briefly, use existing supplied demo-role sessions and note visible navigation, lead scope, quote cost visibility, booking/payment actions and settings access once per role. No new credential, role change, security test or permission expansion is needed for this document review.
