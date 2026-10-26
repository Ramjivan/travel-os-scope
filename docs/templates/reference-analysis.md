# Existing-system screenshot documentation template

Use for factual extraction in the active screenshot phase. Create one record per distinct screen/task and extend it with additional states. Omit inapplicable sections; use `not shown` for relevant gaps. Do not add proposed behavior or cross-system evaluation.

```markdown
# System name — screen / task

Screen ID:
Reference IDs:
Received date:
System identity / URL: visible, user-supplied, or not shown.
Role / account context: visible, user-supplied, or not shown.
Page title / breadcrumb / route: exact visible labels or not shown.
Related documented screens:

## Evidence and coverage

| Reference ID | Image path / persistence status | Visible screen state | Coverage limits |
| --- | --- | --- | --- |

Record cropping, unreadable text, hidden menus, and redactions.
Distinguish screenshot observations from user explanations throughout.

## Screen structure and navigation

Capture header, sidebar, menu hierarchy, tabs, sections, breadcrumbs,
selected item, modal/drawer context, and relevant layout relationships.
List exact visible labels in their displayed order and nesting.

| Area / parent | Label | Type / hierarchy | Selected or displayed state | Reference IDs |
| --- | --- | --- | --- | --- |

## Fields and inputs

| Section | Exact label | Visible control type | Required indicator | Placeholder / default / current value | Units / format / constraints shown | Reference IDs |
| --- | --- | --- | --- | --- | --- | --- |

Distinguish a sample value from a default or rule. Requiredness comes only
from a visible marker/message or attributed user explanation.
Describe sensitive values structurally rather than transcribing identities.

## Options and selection controls

| Parent field / menu | Exact visible options in order | Selected option(s) | Coverage: expanded / partial / closed | Reference IDs |
| --- | --- | --- | --- | --- |

For a closed dropdown, record the displayed selection; other options are
not shown. Preserve hierarchy, disabled states, and multi-select indicators.

## Search, filters, sorting, and views

| Control / field | Visible operators or choices | Applied value / sort / view | Visible count, chips, or result state | Reference IDs |
| --- | --- | --- | --- | --- |

Include date ranges, saved-view names, column controls, filter logic,
pagination and page size only where visible.

## Tables, cards, and displayed content

| Section / table / card | Columns or repeated fields in displayed order | Visible content structure and relevant sample values | Row/card actions | Reference IDs |
| --- | --- | --- | --- | --- |

Capture summary counts, badges/statuses, grouping, totals, currency/units,
price or tax breakdowns, inclusions/exclusions, and terms where shown.
Do not infer formulas, permissions, or availability from a sample result.

## Buttons, links, and other actions

| Location | Exact label / icon description | Enabled / disabled / selected | Destination or result actually shown | Reference IDs |
| --- | --- | --- | --- | --- |

An unshown result is `not shown`; do not assume click behavior.
Record tooltip text only if visible. Unlabeled icons remain descriptions.

## Messages and visible states

| State / section | Exact message or visible indicator | Context shown | Reference IDs |
| --- | --- | --- | --- |

Include validation, errors, confirmation, empty/loading states, warnings,
help text, and status labels only when present in supplied evidence.

## Documented flow and transitions

| Step | Screen / reference | Action shown or described | Resulting screen/state shown or described | Evidence basis / gap |
| --- | --- | --- | --- | --- |

Evidence basis: screenshot-visible, user-described, or sequence unconfirmed.
Connect screens only where the relation is evidenced. If the screenshots
show states without a transition, document both and mark the link unknown.

## Additional states / variants

Record differences across dates, tabs, expanded panels, roles, or sample
records, referencing each source. Keep earlier observations traceable.

## User-provided explanations

Record relevant explanations with their source/date. These supplement
the observations; do not present them as text or behavior visible in images.

## Missing or unreadable evidence

List relevant gaps without proposing fixes or assuming answers.

## Extraction verification

State which supplied references were checked for transcription/coverage,
which image files were actually saved, and any unresolved extraction gaps.
```
