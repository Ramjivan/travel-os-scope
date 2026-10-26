# Existing-system evaluation method

Prepared: 2026-10-09, FB-050. Status: reusable method and prompt. Subsequently applied to the user-supplied [TripboxCRM demo audit](../references/tripbox-crm/README.md) under FB-054; its evidence and remaining coverage are separate from this method.

**Current discovery depth — user clarification, 10 October:** understand platform options and connected flows for future recreation, not QA. Prioritize distinct screens, conditional forms, actions and record relationships. One representative fictional journey is sufficient per materially different flow; further arithmetic, attachment limits, malformed inputs, repeated reloads, capacity/security checks and exhaustive lifecycle combinations are outside the present scope. Existing deeper evidence remains useful but is not a requirement for finishing flow discovery.

The user wants to explore a CRM with demo credentials, create fictional records, document its options and connected behavior, and retain the learning alongside other systems for future Travel OS development. TripboxCRM initially had landing illustrations only. The user then supplied its demo target and credentials; the linked reference now includes an Owner audit and fictional journey, with explicit limits. Credentials remain outside project files.

## Documentation before implementation

Use a factual behavior library first while evaluating multiple systems. An immediate implementation would require choices about hidden rules and mix the reference system's behavior with our own decisions. Small prototypes can later validate a difficult interaction, but should be separately scoped and linked to their evidence.

The target is enough detail to reproduce **observed user-facing behavior**: navigation, fields/options, data relationships, transitions, calculations actually tested, documents and UI states. Browser observation cannot establish source code, database schema, full security enforcement, reliability, unseen roles or provider integrations. Record those limits rather than claiming the entire system can be reconstructed exactly.

Factual records belong in `docs/references/<system>/`. Comparative judgments, UX recommendations and proposed Travel OS requirements belong in `docs/product/`, linked to evidence. Vendor behavior does not automatically become our requirement. Follow [reference guidance](../references/AGENTS.md), [screen template](../templates/reference-analysis.md) and [reusable audit prompt](../templates/existing-system-audit-prompt.md).

## 1. Establish access and test boundaries

Use the supplied target URL and credentials through supported browser controls. Do not put passwords, tokens, session URLs or sensitive account details in documentation. Identify the observed role, demo/sandbox indicators, version if visible, date and viewport. A product calling itself a demo does not establish whether messaging, bookings or payments are simulated.

Existing authorization to log in and create dummy records is sufficient for ordinary demo CRUD within the agreed target. Before an action whose behavior could reach a real recipient/provider, charge money, consume paid credits, change shared organization configuration or affect existing records, establish a sandbox/simulation boundary. If it cannot be established, document the form and leave that action untested until the user explicitly authorizes its actual consequences. Do not repeatedly seek permission for ordinary actions already authorized.

Inspect available record counts/context without copying unrelated customer details. Do not reset a shared demo or modify/delete someone else's data. Other systems retain their own access restrictions, including [Sembark's fresh-permission boundary](../references/sembark/README.md).

## 2. Make the complete inventory before deep exploration

Discover every visible navigation branch, nested tab, menu, dialog, row action, context menu, tooltip, selector, conditional field, list/detail view, export and help route. Start the coverage register immediately; do not rely on memory or declare coverage from the sidebar alone.

Use one row per meaningful page/action/variant:

| Coverage ID | Module → screen → action/variant | Role / record state | Discovered | UI inspected | Outcome tested | Evidence / linked record | Gap / next step |
| --- | --- | --- | --- | --- | --- | --- | --- |

Each coverage dimension uses `not started`, `partial`, `complete for stated scope`, `blocked`, or `not applicable`, with a reason. A form inspected without submission has UI coverage but no outcome coverage. A dropdown opened without reaching all options remains partial. A successful action for one role does not establish other roles' permissions.

## 3. Inspect these aspects wherever present

| Aspect | What to capture or test |
| --- | --- |
| Purpose and terminology | Module names, exact record/status labels, what each visible screen organizes, and distinctions between lead, query, itinerary, quote, booking and payment |
| Navigation and layout | Header/sidebar order, breadcrumbs, tabs/subtabs, drawers/modals, detail hierarchy, persistent controls, back/cancel paths and direct-link behavior |
| Lists and retrieval | Search scope, filters/operators/combinations, sorting, saved views, grouping, columns, counts, pagination/page size, selection and bulk actions |
| Forms and selectors | Exact field labels/types, required markers and validation, defaults versus sample values, all loaded options, dependent fields, repeatable rows, date/currency/unit formats, attachment limits shown |
| Records and lifecycle | Create/view/edit/duplicate/archive/delete where available; status transitions, prerequisites, invalid attempts, confirmation/reversal, relationships and audit history |
| Ownership and roles | Assignment/reassignment, authorized role variants, record visibility, restricted fields/actions, organization boundaries and ownership after handoff; UI visibility alone is not backend enforcement |
| CRM work | Sources, qualification, priorities, notes, tasks, follow-ups, activity timeline, communication composer/history and conversion, only where present |
| Itinerary and quotation | Blank/template/import paths, days/dates, services/alternatives, inclusions/exclusions, edits/reordering, pricing units, markup/discount/tax/rounding, currencies, versions/acceptance and customer preview |
| Booking and operations | Booking trigger, per-service versus whole-trip state, supplier selections/confirmations, substitutions, deadlines, traveler/document requirements, voucher/travel stages and cancellation paths |
| Finance | Schedules, invoice/receipt/payment records, incoming/outgoing distinctions, approval, partial/full/overpayment checks, refunds/credit/balances and displayed totals; simulate only in a verified test boundary |
| Catalogs and settings | Customers/agencies, suppliers/services/rates, templates, tags/sources/destinations, users/roles, branding and preferences; inspect global editors without changing shared configuration |
| Automation, AI and integrations | Visible trigger/action/condition controls, connection status, inputs/output/review states, logs and limitations; clearly distinguish advertised, configured, simulated and actually exercised |
| Reports and exports | Definitions shown, filters/date scope, drill-through, report changes caused by our dummy records, document formats/content/branding, export options and customer/internal price visibility |
| UX and accessibility evidence | Visible hierarchy/density, focus and keyboard behavior, labels/feedback, empty/loading/error/success states, unsaved changes, long text, scrolling, responsive layout at recorded viewports |
| Persistence and recovery | Save versus success toast, revisit/refresh behavior, cancel/discard, duplicate submissions and recovery where safely testable; do not induce failures on a shared service |

This is a discovery checklist, not a claim that every system has these modules. Mark absent or inaccessible features explicitly. Do not invent hidden selector choices, business rules, integrations or roles.

## 4. Follow connected journeys with traceable dummy data

First complete one observed primary journey, then systematically cover alternatives and modules not used in it. Adapt the journey to the portal's actual structure; a suggested travel example is enquiry → lead → itinerary/quote → accepted option → booking → supplier/service work → payment/document states. Do not impose this order if the system behaves differently.

Create a small reusable set of records using a unique prefix such as `TOS-AUDIT-20261009-A`. Use fictional names, `example.invalid` email addresses, synthetic notes and locally generated harmless attachments. Leave phone numbers empty where possible; if required, use a documented non-deliverable test value accepted by the system, rather than inventing a potentially real number. Do not enter real traveler IDs or payment identifiers.

Keep a `data/test-records.md` ledger with scenario ID, prefix, portal record ID, creation date, role, relationships, purpose, changes and retained/removed status. Retain only dummy IDs and safe links; omit URLs containing credentials or sensitive query parameters. Use the same records across modules so a change can be traced into lists, histories, reports and documents. Select existing catalog references only where doing so does not initiate real inventory work.

Suggested scenarios, where supported:

- Main successful journey, including reopening after save and refresh.
- Missing required fields, invalid dates/amounts and duplicate records.
- Alternate creation methods and dependent selections.
- Quote revision with the earlier version retained or changed as actually observed.
- Partial collection, rejected/invalid transition and a corrected retry in the test boundary.
- Unavailable service/substitution and cancellation/reversal only where safely simulated.
- Empty result, alternate role/ownership and narrow-screen view.

Do not exhaust every Cartesian combination. Test each distinct branch/rule, important boundary and meaningful interaction; record untested combinations. For a proposed pricing rule, vary one input at a time, note starting values, observed total and counterexamples. Record a rule as verified only for the inputs actually exercised. Do not infer a universal tax/markup formula from a single quote.

## 5. Write screens, actions and workflows together

Screen records extend the [existing template](../templates/reference-analysis.md). Add live-observation timestamps, action IDs and outcome evidence; retain earlier supplied references separately. Capture exact labels/options in text and use screenshots as supporting evidence.

For every material action, record:

| Action ID | Role / precondition / starting record state | Exact control + inputs | Result / message | Record changes and affected linked views | Revisit/refresh check | Evidence | Untested conditions |
| --- | --- | --- | --- | --- | --- | --- | --- |

For every connected flow, record goal/role, linked screen sequence, prerequisites, dummy IDs, transitions, handoffs, alternatives, invalid states, outputs and unresolved branches. Use linked tables or an evidenced Mermaid diagram. Each transition needs before/action/after evidence; adjacent screenshots alone do not establish sequence.

Keep `data/records-and-states.md` as the observed field/relationship/state dictionary, not a proposed database schema. Keep `rules-and-validations.md` as evidence-linked tested rules and unresolved hypotheses. Keep `roles-and-visibility.md` scoped to supplied/authorized roles. Every financial and status rule must identify its evidence and test limits.

Use these evidence labels consistently: `observed UI`, `tested outcome`, `user-described`, `vendor claim`, `hypothesis`, and `unknown/not tested`. UX findings inside factual reference files describe behavior (for example, focus location or an extra required navigation step); judgments and recommendations go into a later product evaluation.

## 6. Save visuals and outputs selectively

Capture a full-page overview when layout/scrolling matters and the available browser tool supports it. Use viewport or component screenshots for open menus, dialogs, conditional fields, validation, dense pricing, detail states and before/after changes. Record viewport, capture scope and scroll position where relevant. Long full-page images can miss sticky controls and transient dialogs; supplement them where needed.

Do not capture every click or duplicate state. Text must enumerate options even when images are saved. Archive generated PDF/CSV/documents only from our safe demo scenarios or other explicitly authorized evidence, and inspect their complete readable output. Outputs prove their content, not an unobserved generation sequence.

Use stable evidence IDs and descriptive filenames. For TripboxCRM, preserve TRIPBOX-001/002 and continue at TRIPBOX-003; distinguish screen, action and flow IDs. A manifest maps each evidence ID to timestamp, role alias, safe route, record/scenario, viewport/state, path, redactions and file hash when available. Verify files exist and open before claiming persistence. If capture/save is unavailable, document the limitation and retain textual observation evidence. Redact unrelated customer details and never archive login passwords/session secrets.

## Suggested per-system structure

Keep the existing `tripbox-crm` directory rather than creating a parallel `tripboxcrm` archive. The following is a planned shape; create detailed records only when there is evidence, and directories when they contain files:

```text
docs/references/tripbox-crm/
  README.md                         # identity, access scope, index, coverage summary
  coverage.md                       # discovered branches, inspection and outcome status
  navigation.md                     # factual map with links to screen records
  rules-and-validations.md           # tested rules, evidence and unresolved hypotheses
  roles-and-visibility.md            # actual role/record scopes tested
  sessions/2026-10-09.md             # provenance and concise resumable checkpoint
  screens/                          # existing landing record + new screen/task records
  flows/                            # connected journeys, branches and handoffs
  data/test-records.md               # dummy record and cleanup ledger
  data/records-and-states.md         # observed fields, links and lifecycle states
  screenshots/                      # stable evidence names + existing source images
  documents/                        # inspected demo exports and linked analyses
  evidence-manifest.md               # provenance/path/redaction/capture metadata
```

Later cross-system evaluation can live in `docs/product/reference-comparison.md` when requested. It should compare task support, evidenced rules, UX findings and fit to actual staff needs, with explicit unknowns. It should not duplicate the factual screen library.

## Completion and handoff

A pass is complete only **for its declared scope** when every discovered branch has an explicit coverage status; every inspected screen has fields/options/actions; tested journeys have traceable transitions/records/output; screenshots/files and links are verified; and outstanding role, action and integration gaps are listed. Report counts of discovered, inspected and outcome-tested items with denominators, not an unsupported “100% explored.”

Check whether a developer could reproduce the tested journey without logging into the reference: fields and options, enabled/disabled states, triggers, saved relationships, feedback, calculations and outputs must all be findable. Missing details return to the gap register. Hidden backend/security rules remain separately unverified.

At each session checkpoint, save the last safe page, completed coverage IDs, retained dummy records, outstanding branches, capture limitations and next action. Update the source README and affected project indices/feedback/handoff/changelog following [recording rules](README.md#automatic-recording-during-project-work). Do not make application changes during discovery unless separately requested.

## Preparation verification

This method and its prompt are planning artifacts, not portal evidence. Preparation checked nine affected files and 212 local Markdown file links (excluding code examples): no missing file targets or trailing whitespace. Link anchors and portal behavior were not validated by this file-target check. No login, browser review, screenshot capture, export, dummy-data mutation, application test or implementation is claimed.
