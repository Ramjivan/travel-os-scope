# Reusable prompt — existing-system demo audit

Prepared 2026-10-09 for FB-050. Use with the [evaluation method](../development/existing-system-evaluation.md). Reusable execution brief for an authorised portal audit; first applied to [TripboxCRM](../references/tripbox-crm/README.md) under FB-054. Preparing or using this prompt does not establish exhaustive coverage. Supply credentials privately in the audit session, never in this file.

Updated 2026-10-10: the user clarifies that this is **platform/flow discovery for future recreation, not software testing**. Default to breadth and connected examples. Preserve any earlier test evidence, but do not spend time on attachment limits, exhaustive arithmetic, invalid combinations, repeated persistence checks or security/financial testing. The human's current scope overrides any deeper checklist below.

Copy the following and replace the bracketed non-secret scope values:

```text
Evaluate [SYSTEM NAME] through its user-facing demo and build an evidence-linked
Markdown reference library that we can later use alongside other systems to
design Travel OS. Reproduce its observed workflows in documentation, including
fields/options, state transitions, data relationships and output behavior.
Do not implement Travel OS as part of this audit.

Target: [exact supplied login URL]
Access: use the demo credentials supplied privately in this session.
Authorized roles: [provided role accounts; discover visible role names without
assuming access to them]
Scope: all accessible modules and meaningful UI/flow branches within these roles.
Depth: flow discovery, not QA. Explain what a person can do, what choices appear,
what records connect and what comes next. Use one representative fictional
journey; inspect alternate forms safely without executing every variation.
Mutation scope: create/edit fictional audit records and follow their lifecycle
in the agreed demo. Keep existing records and shared organization settings intact.
Output: docs/references/[existing-system-slug]/

Read root/nested AGENTS.md, README.md, docs/README.md,
docs/development/current-state.md, product README/delivery plan, this system's
reference README/analyses, docs/references/AGENTS.md,
docs/development/existing-system-evaluation.md and the reference-analysis template.
Inspect the working tree and preserve unrelated edits. Use available supported
browser controls and follow the applicable computer-use skill when using them.

1. ESTABLISH CONTEXT
Confirm the supplied target, visible role, demo/test indicators and current
account context. Record date, visible version and viewport. Keep credentials,
tokens, sensitive URLs and unrelated customer details out of all artifacts.
Ordinary demo CRUD is already authorized; continue without repeated approval.
For send/publish, external bookings, payments, paid AI/inventory calls or changes
to shared settings, establish that the action is simulated and within scope.
If its actual consequences remain uncertain, inspect/document its UI and mark
the outcome untested; seek authorization only for the consequential action.
Do not reset shared data, modify existing customers or access another system
under this system's authorization.

2. DISCOVER AND TRACK COVERAGE
Inventory every visible module, page, nested tab, menu, dialog, row/bulk action,
selector, conditional field, creation method, output and settings branch.
Create coverage.md immediately. Give each meaningful action/variant an ID.
Track discovery, UI inspection and tested outcome separately, with role/record
scope, evidence links, status and next step. A visible button is not a tested
feature. An opened dropdown is not complete if options remain unreviewed.
Do not create empty screen records or assume modules exist from this checklist.

3. MAP SCREENS COMPREHENSIVELY
Use the reference-analysis template for each distinct screen/task and group
additional states sensibly. Preserve exact readable labels and nesting/order.
Record navigation, layout, tabs, list/card/table fields, filters/operators,
sorting/views/columns/pagination, all loaded options, selected versus default
values, field types, requiredness/validation, dependent/repeatable controls,
dates/units/currency, help text, actions and messages. Open accessible menus
and conditional branches safely. Record partial/search-dependent options and
closed/unreadable/cropped/unavailable controls explicitly.

4. FOLLOW ONE COMPLETE JOURNEY, THEN ITS BRANCHES
Adapt to the actual system; do not impose a presumed travel workflow.
Create a small fictional scenario set with a unique TOS-AUDIT-[date]-[suffix]
prefix. Use fictional names, example.invalid email addresses and harmless
synthetic attachments. Avoid potentially real phone numbers and identity data.
Keep data/test-records.md with scenario/portal IDs, relationships, mutations
and retained/removed status. Never send real messages or perform real purchases.
Trace the same records across CRM, itinerary/quotes, bookings, suppliers,
operations, finance, history, reports and documents wherever those areas exist.
For each material action record precondition → exact inputs/action → resulting
state/message → affected records/views → revisit/refresh result and evidence.
Do not accept a success toast as proof of persistence.

5. MAP DISTINCT CHOICES AND FLOW BRANCHES
Inspect alternate creation paths, conditional choices, edit/cancel controls,
quote versions, ownership/handoff, status gates and recovery messages as visible.
Capture pricing bases and displayed breakdowns using representative examples;
do not exhaust every combination or test boundary values. Do not test attachment
size/count enforcement, malformed input, duplicates, rounding or overpayment
unless the user separately asks for testing. Record visible requiredness/help
without manufacturing failures. Execute a branch only when needed to understand
the connected journey; otherwise its form/options are sufficient discovery.
Use supplied role sessions where available without privilege escalation.
Record UI permission descriptions separately from backend enforcement.
Inspect integration/automation/AI configuration and review/output states, but
do not assume a listed feature is connected or a demo output uses a real provider.
Do not induce service failures or brute-force every input combination.

6. RECORD CONNECTED BEHAVIOR
Write linked flows with role/goal, prerequisites, screen sequence, record IDs,
transitions, handoffs, branches, validation, recovery and output evidence.
Maintain navigation.md, data/records-and-states.md, rules-and-validations.md
and roles-and-visibility.md as evidence develops. These describe observed
behavior; they are not a proposed backend schema or production security model.
Use evidence labels: observed UI, tested outcome, user-described, vendor claim,
hypothesis, unknown/not tested. Every material claim needs source IDs.
Keep comparisons, UX judgments and Travel OS proposals outside factual reference
records, in a separately requested product evaluation linked to this evidence.

7. CAPTURE USEFUL VISUALS AND EXPORTS
Use supported full-page captures for layout/scroll coverage and viewport or
component captures for dialogs, menus, conditional forms, pricing and errors.
Capture meaningful before/after states, avoiding redundant images.
Text must still enumerate readable content and options. Record viewport and
capture scope; full-page capture support must be verified, not assumed.
Save safe dummy-generated outputs under documents/ and inspect complete content.
Redact private details before archiving; do not save login/session secrets.
Use stable evidence/screen/action/flow IDs and descriptive filenames. Preserve
existing IDs; for TripboxCRM continue reference IDs after TRIPBOX-002.
Maintain a provenance manifest: date, role alias, safe route, scenario/state,
file path, viewport, redactions and file hash where available.
Verify saved files exist/open and relative links resolve. If capture/save is
unsupported, retain textual evidence and explicitly record that limitation.

8. REVIEW COVERAGE AND HAND OFF
Reconcile every discovered branch with its inspection/outcome status.
Use another safe targeted pass to fill important screen/flow gaps, without
repeating completed cases or turning discovery into a test matrix. Check that a developer
can follow the demonstrated journey from these files without reopening the portal:
fields/options, feedback, relationships, transitions and outputs must be clear.
Declare completion only for the stated accessible roles/modules/branches.
List inaccessible actions, untested combinations, hidden roles, integration
boundaries and backend/security/financial rules that observation cannot prove.
Report coverage counts with denominators; do not claim an exhaustive clone.
Record exactly which dummy records remain. Remove only our records when cleanup
is authorized and safe; never bulk-reset the account. Preserve useful examples
when the agreed audit scope requires them to remain for review.

Keep README.md as the source index and sessions/[date].md as a concise
provenance/resume checkpoint, not a click-by-click diary. Save progress throughout
the audit; update affected project feedback/index/handoff/changelog records.
Give concise progress updates with findings, gaps and next action.
At delivery link the library, summarize tested journeys and coverage, report
actual file/link verification, retained test data and material limitations.
Never claim a login, test, screenshot, export or outcome that did not happen.
```
