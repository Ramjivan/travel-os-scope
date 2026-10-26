# Admin inspection

Status: existing implementation, documented by source inspection on 2026-10-06. No browser verification was performed during this documentation setup.

## Purpose and entry

Route `/admin`, served from `public/admin.html` with `public/admin.js`. An administrator inspects client scope-planner sessions and feedback. The server currently applies the same Basic authentication middleware to the planner and admin routes; there is no production role model implemented here.

## Functionality

- Shows session, activity, identified email, interaction, and note statistics.
- Lists sessions and filters/searches them, including identifying details.
- Opens a session to inspect metadata, activity events, and saved board information.
- Refreshes server data and displays recent/active session indicators.
- Generates and copies personalized planner links containing client/email parameters.
- Provides a delete-session action with confirmation in the current UI.

## Data and boundaries

Reads `/api/admin/stats`, `/api/admin/sessions`, and `/api/admin/session/:id`. The delete action calls `DELETE /api/admin/session/:id` and affects stored planner data. Unlike planned travel workflows, these endpoints use real persistence.

Personalized URLs can contain client identifiers. Use suitable sample data for demonstrations. This is a scope-review tool, not the proposed travel product's operational admin dashboard.

## Verification

For future changes: check statistics against a sample planner session, list filters, session selection, event/board views, refresh, and personalized link generation. Exercise deletion only with a designated disposable sample session. No automated check commands are configured for this module yet.
