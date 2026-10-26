# Project knowledge

Use this index to regain context without reading every file.

Read [current state and next work](development/current-state.md) at the start of project tasks. Documentation maintenance is part of normal AI work; the [automatic recording rules](development/README.md#automatic-recording-during-project-work) define its triggers and limits.

Active phase: team review of connected local [CRM](modules/crm/README.md), [Operations](modules/operations/README.md) and [Accounts](modules/accounts/README.md) journeys. [Walkthrough, sheet mapping and meeting questions](product/operations-accounts-review.md) distinguish user answers from provisional rules. Payment verification and Ops handoff now work; Marketing, sales auto-routing/settings, targets/tax calculations and external portals remain later slices. Manager/admin reassignment supersedes executive peer transfer. [Client sheet/script evidence](references/client-sheets/README.md) remains factual and separate from product proposals.

## Read by task

- **Client SOW and scope freeze:** [Draft and source map](client/README.md) and [editable SOW](client/travel-os-sow-v0.1.md). FB-057 confirms three phases (complete B2C, internal Bali B2B, third-party B2C only), INR 21 lakh, four 25-percent payments, three months from advance, and IP transfer after completion/full payment. FB-058 records Indian-bank advance and USDT/EUR subsequent settlement; FB-059 adds Admin/CXO conversational reporting and saved templates. Provider/policy/tax/legal/report-format details and client approval remain open; no production implementation is implied.

FB-056: [standard Frappe app reuse evaluation](product/frappe-standard-apps-evaluation.md) maps ERPNext, CRM, Helpdesk, Insights and later HR/Drive/Learning/Builder to our workflow. Separates apps/modules/platform features, documents CRM–ERPNext linkage and WhatsApp add-on dependency, and retains custom travel logic, role/scope reconciliation and compatible deployment as validation work. Evaluation only.

FB-053: [ERPNext expiring travel inventory evaluation](product/erpnext-travel-inventory-evaluation.md) maps native batches/reservations/dated prices to offline hotel and airline contracts, distinguishes nightly/departure capacity from rate validity and supplier deadlines, and records conditional reuse/custom-layer recommendations. Evaluation only; contract mix remains AS-028.

FB-052: [ERPNext/Frappe travel apps shortlist](product/erpnext-travel-apps-research.md) compares a commercial tours app, public travel repositories, hotel PMS alternatives and custom-implementation evidence. Published coverage and point-in-time maintenance/availability are distinguished from untested Travel OS fit; no app adopted or installed.

FB-051: [ERPNext/Frappe accounting and integration evaluation](product/erpnext-frappe-evaluation.md) compares standard ERPNext, Frappe-only, custom React UI over ERPNext and an incumbent-accounting connector; covers workflow mapping, permissions, AI/MCP, WhatsApp/email and current Tally JSON support. [0013](decisions/0013-travel-accounting-backend-evaluation.md) is proposed, not adopted. Accounting is a confirmed future core area; incumbent software/version, authoritative books, tax/recognition and deployment/isolation remain unverified. No backend or connector was installed.

For the upcoming users/roles/permissions design, review [proposed decision 0011](decisions/0011-configurable-users-roles-and-permissions.md) before implementation. Firm-specific teams are examples; assigned roles and reviewed capabilities should determine UI/action access, with authoritative service checks and record scope still to agree.

FB-037: [Bali B2B DMC team overview and flow](product/bali-dmc-team-flow.md) records the user's actual process: two main teams, Ops combining sales/operations, Accounts managing incoming/outgoing payments, event-contact outreach and locked deal/token before actual booking work. This takes precedence over earlier speculative staffing for Bali; current demo behavior is unchanged.

Current FB-034 work: [B2B/DMC flow evaluation](product/b2b-flow-evaluation.md) and [implemented internal DMC pilot](modules/dmc/README.md), with separate synthetic SQLite persistence and familiar Sembark navigation. Existing CRM/Ops/Accounts team review continues; external-agent delivery and authoritative financial policy remain open. Sembark stays logged out under FB-033.

FB-036: `#/dmc/login` now has isolated Admin/Accounts/Sales/Reservations/Operations demo sessions and protected-link return. [DMC module](modules/dmc/README.md#separate-dmc-login--fb-036) lists credentials and role homes; [0010](decisions/0010-separate-dmc-demo-login.md) records separation and pending permission policy.

For a simple explanation, read [B2B journey, stakeholders and suggested access](product/b2b-user-journey.md). It separates the chronological business interpretation from observed controls and unverified permissions.

Latest TripboxCRM evidence: [active Owner audit](references/tripbox-crm/README.md) includes organisation/property rates→quote→balanced confirmation→internal booking/payable, custom qualification, eleven report presets, saved template/favourites and a verified report XLSX. Coverage remains open for nested variants, roles and integrations; marketing screenshots remain separate. TravelOS app scope unchanged.

Latest scope clarification: use the [TripboxCRM platform/flow map](references/tripbox-crm/platform-map.md) as the entry point for future recreation. All19organisation destinations and major working areas connect to exact screen records; role descriptions are separately labeled. User requests discovery, not deep QA. Remaining work is missing nestedUI; current browsertool unavailable, no newliveinspection in this consolidation pass.

- **Planning:** [Product brief](product/README.md), [assumption register](product/assumptions.md), [delivery plan](product/delivery-plan.md), [domain model](product/domain-model.md).
- **Office staff interviews:** [Core questions, role follow-ups and notes template](product/staff-discovery-interview-guide.md). Proposed discovery guide; staff answers and policy validation remain to collect.
- **Sembark B2B/DMC:** [Saved evidence and interpretation](product/sembark-b2b-dmc-discovery.md), [flow evaluation](product/b2b-flow-evaluation.md), [initial pilot](modules/dmc/README.md). Further login requires fresh permission; deeper coverage/team validation pending. [Factual evidence](references/sembark/README.md) remains separate.
- **Implementation:** [Development workflow](development/README.md), [module index](modules/README.md), then the affected module README.
- **Portal analysis:** [Reference library and intake process](references/README.md), then the relevant source README and images.
- **Demo-system audit:** [Evaluation method and coverage checklist](development/existing-system-evaluation.md), [reusable execution prompt](templates/existing-system-audit-prompt.md). FB-050 method is applied in the [FB-054/055 TripboxCRM reference](references/tripbox-crm/README.md); factual observed behavior and untested branches remain distinct.
- **Changes to direction:** [Decision records](decisions/README.md) and [client feedback](feedback/README.md).
- **New documentation:** [Module template](templates/module-readme.md) and [reference analysis template](templates/reference-analysis.md).

## Knowledge boundaries

The product brief is the source for confirmed goals and proposed scope. The assumption register tracks material unverified premises and how to validate them. Module READMEs describe actual behavior and its mock/production status. Reference analyses contain evidence. Decision records explain choices. The feedback register tracks requests and their validation. The root `AGENTS.md` contains persistent instructions, not a growing product specification.

This structure was initialized on 2026-10-06. [Mind DMC](references/minddmc-ai/README.md) has structured records from 17 supplied screenshots, a generated customer PDF and partial user-reported progress messages. [Bingo Travel](references/bingo-travel/README.md) has seven records from 16 supplied hotel/activity/navigation screenshots. [Sembark](references/sembark/README.md) has eight records from 22 supplied dashboard/navigation/query/quotation/accounting/AI-usage screenshots. [Nexus DMC](references/nexus-dmc/README.md) has twenty-three completed screen records from 49 readable sources (48 archived), including leads/proposals, confirmed flight trip/payment/traveler details, menus and earlier account/itinerary coverage, plus a pending unreadable hotel Change Room record NEXUS-026. Proposal detail NEXUS-048 is extracted from its readable attachment but its local archive source is unavailable. Flight/hotel inventory explanations remain separately attributed. [U&I Holidays](references/ui-dmc/README.md), user-supplied https://uandiholidays.net/, now has five records from seven archived screenshots covering package/split-stay search, rooms, transfers, tour add-ons and table planner variants. Other supplied image/PDF evidence is archived; account-specific fields are redacted where noted. [Official Salesforce lead-management documentation](references/salesforce/lead-management-research.md) is researched; no client Salesforce organization or competitor screenshot portal was interacted with. CRM local-data/assignment/payment clarification is recorded in decision 0004 and the review brief; other systems await evidence.
