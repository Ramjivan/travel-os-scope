# TripboxCRM — AI configuration and MCP permissions

Screen ID TRIPBOX-S13. Owner, 2026-10-09. References L044–045. [Full expanded permission evidence](../sessions/evidence/L045-mcp-permissions.txt), [session](../sessions/2026-10-09.md). No token/key generated, provider connected or permission altered.

## Provider and usage

`/org/ai-settings`: required AI Provider (Google/Gemini displayed), Tool-calling model (Select a supported model), API Key, Show entered API key; optional Requests per minute limit, Monthly token budget. Blank caps use provider capacity per visible help. Test API key/Save Configuration. AI Features says Configure AI provider above to enable features. Usage date range, No usage data yet; Request Logs Date/Feature/Operation/Provider/Model/Tokens/User, No request logs. Provider/model alternatives and configured feature switches unshown. Quote-with-AI displayed recommendations despite this unconfigured state; do not infer provider generation occurred.

## MCP configuration

Page advertises external assistants through Model Context Protocol. Not connected/Generate a token to get started; Connect MCP; MCP access on. **77 of 127 tools on across 14 areas**, requests last 7 days 0, last used Never. Expand all exposes permission descriptions. Changes apply instantly; role restrictions also apply; writes attributed to admin who generated token; group-on never enables deletion, according to visible text. These are product descriptions, not tested backend enforcement.

| Area | Enabled/total | Visible permission groups and current state |
| --- | --- | --- |
| Lead management | 11/13 | Read leads, Create leads, Update leads, Log follow-ups on; Bulk update leads, Export leads off |
| Itineraries | 3/17 | Read itineraries, Generate itinerary PDF on; Create, Update, Itinerary workflow, Manage share links, Email itineraries off |
| Itinerary templates | 4/5 | Browse templates on; Save templates off |
| Bookings & operations | 5/8 | Read bookings, Generate vouchers on; Update bookings off |
| Payments | 6/11 | Read payments, Payment documents on; Record payments, Export payments off |
| Contacts | 5/7 | Read contacts on; Edit contacts off |
| Inventory | 3/6 | Search inventory on; Edit inventory, Export inventory off |
| Suppliers & agencies | 6/12 | Read on; Edit off |
| Campaigns | 4/8 | Read campaigns on; Manage campaigns off |
| Emails | 6/13 | Read emails on; Organise emails, Send email replies off |
| Reports & dashboard | 6/7 | Read reports on; Save reports off |
| Workspace settings | 7/9 | Read settings on; Edit settings off |
| Team | 3/3 | Read team on |
| Lookups | 5/5 | Reference data on |

Expanded evidence retains every displayed tool name and description. Role annotations shown: bulk leads Owner/Admin; lead/payment/inventory exports Owner; itinerary create/update/workflow/share/send Owner/Admin/Sales/Operations; template writes Owner/Admin; booking writes/vouchers Owner/Admin/Operations; payment writes Owner/Admin/Accounts; contacts/inventory/supplier-agency/settings writes Owner/Admin; report Save Owner/Admin.

Read search inventory says supplier rates never returned in search results. Create itineraries says totals calculated by Tripbox using agent-portal pricing profile. Workflow description includes confirmation/cancellation/revert/return to agency. Booking descriptions mention item updates/mark booked/operations/vouchers; email descriptions mention lead linking/assignment/tags/status/spam/sync/replies. All remain **UI-described capabilities**, distinct from observed browser CRUD or a working connector.

Recent activity empty. Connect MCP was not clicked because it can create persistent access. No need to grant access to document the displayed permission catalogue.

## Reconstruction limits

Do not treat this as an actual API contract, authorization matrix or endpoint/schema discovery. Only UI-visible names/descriptions and default permission states are evidenced. Other roles, token lifetime/revocation, isolation, prompt handling, billing and actual tool outputs/errors remain unverified.
