# Scope planner

Status: existing implementation, documented by source inspection on 2026-10-06. No browser verification was performed during this documentation setup.

## Purpose and entry

Route `/`, served from `public/index.html`. The client uses it to organize potential platform features and provide scope feedback. Basic authentication is required by the server. This page is not the proposed CRM or booking portal.

## Functionality

- Organizes features in module boards with "Needed Now", "Later", and "Excluded" states.
- Provides drag/drop within a module and quick movement buttons.
- Supports custom features, feature names/details, formatted notes, and module feedback.
- Shows live feature counts and a set of scope questions.
- Allows optional email identification and client tagging through the page/link.
- Copies a scope summary, downloads board JSON, and invokes browser print/save-to-PDF.
- Saves page state and reports sessions, interactions, answers, and snapshots to planner telemetry endpoints.

## State and data

The browser maintains the board state and identifiers locally. `public/tracker.js` posts session/interaction/heartbeat/state data to `/api/telemetry/*`; `database.js` stores session records, events, and board snapshots in the planner SQLite database. See code for exact fields and persistence behavior before altering it.

These are real planner persistence actions. Future product integrations described by the feature cards are proposals, not integrations implemented by this page.

## Important boundaries

- Initial card statuses do not establish agreed client requirements.
- Tax values, vendor examples, and timeline claims in planner content require independent validation before production use.
- Styling/fonts depend on external CDNs.
- `scope_builder.html` is a second planner file and is not the served entry. Review differences before deciding whether to synchronize or retire it.

## Verification

For future behavior changes: check feature movement, custom content, refresh/persistence, questions, counters, summary/JSON/print actions, and the corresponding admin snapshot. Confirm malformed input and telemetry failures behave usefully. No automated check commands are configured for this module yet.
