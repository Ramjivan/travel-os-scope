# 0002: UI foundation for the first CRM workflow

Date: 2026-10-06.
Status: **Adopted: shadcn.** After requesting comparison, the user selected shadcn for perceived maturity and testing, then authorized the login/dashboard foundation in [0003](0003-demo-workspace-shell.md). [FB-004/005](../feedback/README.md) record the request and selection. The comparison below preserves the evidence gathered before installation.

## Context

At comparison time the app was a scope planner with no React frontend or selected product stack. The first proposed CRM journey is lead capture, searchable/filterable lists, assignment, qualification, notes and follow-ups; see the [CRM module](../modules/crm/README.md). Both UI options can support that journey. UI components do not supply CRM lifecycle rules, saved-view persistence, permissions, backend services or messaging integrations.

## Evidence and comparison

Official public pages below were read in the browser on 2026-10-06. Facts describe the published documentation, not a completed integration or performance/accessibility audit. Astryx's home page labels it **Currently in Beta**; its Table documentation displayed **@astryxdesign/core v0.6.5**. Its internal Meta usage claim is not independent evidence of public-package stability.

| Criterion | Astryx | shadcn/ui | Implication for Travel OS |
| --- | --- | --- | --- |
| Delivery model | Install `@astryxdesign/core`; theme packages and CLI support a shared system. Component source can also be copied for customization | Distributes editable component source into the app; underlying behavior remains in dependencies | Astryx centralizes defaults; shadcn makes local changes direct but gives us responsibility for maintaining that source |
| Dense lead tables | Composable plugins cover sorting, selection, pagination and column management; examples include inline filters and compact density | Data Table guide composes Table with TanStack Table for sorting, filtering, pagination, selection and column visibility | Both have credible table foundations. Advanced CRM filters, saved views, bulk actions and service queries still need application work |
| Workspace patterns | Catalog lists filterable/searchable/grouped tables, work-item detail, two-column forms, Kanban, app shells and AI chat templates | Component docs include Sidebar, Sheet, Dialog, Combobox, Calendar and form integrations; Tasks example shows a filterable table workspace | Both provide useful starting patterns; these are generic examples, not a ready-made travel CRM |
| Styling and brand | CSS tokens/themes; supports CSS, `className`, Tailwind v4 bridge and StyleX. Published components are precompiled | Tailwind styling with semantic CSS variables for colors, radius, surfaces and dark mode; local component source is editable | Both can carry Travel OS branding. Neither requires accepting the vendor site's visual style unchanged |
| Setup | React 19+ and `@stylexjs/stylex` peer dependency, reset/component/theme CSS. No StyleX build compiler needed merely to consume the published package; authored/copied StyleX source needs one | Official Vite path supports React + TypeScript, Tailwind and the shadcn CLI. Current docs offer Base UI, React Aria and Radix variants for Data Table | Both work with Vite. Choose one primitive variant consistently if using shadcn; document build/styling choices if using Astryx |
| Customization and updates | Theme/prop overrides and package updates provide centralized changes; copied components introduce local source/build maintenance | Core dependency updates can deliver behavior fixes; changes to the copied top layer need deliberate review/merging | Neither choice removes upgrade work; extensive custom UI favors direct source ownership |
| Public maturity | Public beta/0.x API surface; rich documented features | Established open-code approach with a broader visible integration/documentation surface; current dependency APIs still evolve | Engineering judgment favors shadcn for iterative custom CRM work; avoid equating component count or brand backing with release guarantees |
| AI-assisted work | Dedicated component/theme/template CLI documentation and agent workflows | Open component source, CLI, Skills and registry/MCP documentation | Both support AI tooling; this alone is not a deciding factor |
| Accessibility | Docs advertise accessible components and describe semantic tables and keyboard behavior | Docs advertise accessible components and use underlying primitive libraries | Verify the assembled workflow with keyboard, focus, labels and errors regardless of choice; no conformance claim follows from library marketing |

## Recommendation

**Use shadcn for this CRM**, as selected by the user. We expect substantial iteration on lead views, forms and detail/activity layouts. Editable component source and TanStack-based table patterns are a useful fit for those changes. Define shared tokens and reusable CRM patterns so customization stays consistent across later modules.

**Choose Astryx instead** if the priority is a cohesive packaged design system with broad table/form/shell behavior and the team is comfortable adopting its public beta API. Astryx is a credible alternative; it does not lack advanced table features and it does not force every consumer to author StyleX.

A **React + TypeScript + Vite** prototype with Tailwind and shadcn's Radix Nova components is adopted in [0003](0003-demo-workspace-shell.md). Production hosting/backend architecture remains open. There is no demonstrated requirement for server rendering at this stage.

Avoid installing both as competing foundations. Keep UI components separate from typed lead operations and fixture adapters so a later visual migration need not rewrite sales rules.

## Alternatives and consequences

- Astryx: more packaged consistency and documented templates; track beta API changes, CSS cascade order and any custom StyleX build requirements.
- shadcn: direct ownership and flexible composition; maintain copied source, primitive dependency updates and design consistency ourselves.
- Both libraries together: possible technically, but adds competing tokens, resets and interaction conventions without a demonstrated benefit for the first slice.
- Continue extending the planner's HTML as the CRM: less initial setup, but does not establish the chosen reusable component foundation; planner behavior should remain separately maintained.

## First implementation after selection

The user narrowed the immediate work to the [workspace shell](../modules/workspace/README.md) before discussing detailed CRM UI. Resolved versions are in `apps/web/package-lock.json`; module docs record commands and checks. Existing planner routes/SQLite remain separate. Detailed lead-management acceptance scenarios stay proposed.

## Sources and verification limits

- Astryx [home](https://astryx.atmeta.com/), [getting started](https://astryx.atmeta.com/docs/getting-started), [Table](https://astryx.atmeta.com/components/Table), [styling](https://astryx.atmeta.com/docs/styling), [migration](https://astryx.atmeta.com/docs/migration) and [template catalog](https://astryx.atmeta.com/templates).
- shadcn [introduction and upstream-update explanation](https://ui.shadcn.com/docs), [installation](https://ui.shadcn.com/docs/installation), [Vite](https://ui.shadcn.com/docs/installation/vite), [Data Table](https://ui.shadcn.com/docs/components/base/data-table), [theming](https://ui.shadcn.com/docs/theming) and [Tasks example](https://ui.shadcn.com/examples/tasks).

At comparison time no package was installed or benchmarked and no prototype was built. Subsequently shadcn was installed for the shell and locally verified as recorded in the workspace module. No comparative bundle/load benchmark or independent library-wide accessibility audit was performed. Template catalog availability was read; Astryx's attempted Filterable Table preview did not open, so its full-page preview behavior is unverified. The shadcn Tasks page was inspected visually. These limits do not imply a missing Astryx feature.

## Revisit when

The first CRM demo reveals customization/interaction gaps, dependency upgrades introduce incompatibility, or production browser/accessibility/performance constraints are defined.
