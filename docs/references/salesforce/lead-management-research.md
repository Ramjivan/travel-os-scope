# Salesforce Lightning — lead-management research

Researched: 2026-10-06. Basis: public official Salesforce Trailhead pages read in the browser under the user's explicit research request. No client Salesforce organization, configuration, login or live CRM workflow inspected. No vendor screenshot files archived; the documented Lightning list illustration was visually inspected on the official page. Product adaptations belong in [CRM review brief](../../product/crm-client-review.md), not this factual research record.

## Sources read

| ID | Official source | Coverage read |
| --- | --- | --- |
| SF-R01 | [Create and Convert Leads as Potential Customers](https://trailhead.salesforce.com/content/learn/modules/leads_opportunities_lightning_experience/create-and-convert-leads-lightning) | Leads versus opportunities, intake/assignment, record tabs, Lead Intelligence View/activity metrics, Sales Engagement context, creation and conversion |
| SF-R02 | [Work with List Views](https://trailhead.salesforce.com/content/learn/modules/lightning-experience-for-salesforce-classic-users/work-with-list-views) | Object home/list selection and pinning, controls, filters, displayed columns, inline/mass edit, charts and Kanban |

Sources are official descriptions/training examples. Features and layouts can depend on organization configuration, permissions and purchased products; the client's exact Salesforce setup is unshown. Trailhead exercises and example company/person records are not requirements or our sample data. No exercises, signup, account creation or data changes performed.

## Organization of the sales records

SF-R01 distinguishes:

- **Lead:** early person/company prospect, used to gather information and assess interest/potential.
- **Opportunity:** qualified viable deal with expected revenue, sales stage, close date and probability.
- **Account and Contact:** the organization/person context used during conversion. Salesforce describes creating or selecting an account/contact and an opportunity when converting a lead; its person-account variant depends on enablement and company information.
- **Tasks/Events and activities:** follow-up work and interaction history associated with the record.

Qualification/conversion is different from a confirmed booking or payment. The source does not define our travel-sales payment handoff. Its sample **Open - Not Contacted** status and list examples are examples, not an exhaustive universal status model.

## Lead creation and assignment

SF-R01 lists contact forms, partner information exchange, search/social advertising, referrals and events as lead origins. It documents manual creation through **Sales → Leads → New → Save**, file import and automatic processes such as **Web-to-Lead**.

It describes company-specific assignment: automatic criteria such as geographical location/territory, or new leads assigned to a queue, with an administrator setting the process. It does not establish native round-robin behavior, an available-salesperson rule, Meta/Google connector details or any implementation for this project. Those must remain separate design proposals.

## Lead home and list views

SF-R02 describes object home pages as entry points for record lists. The page's illustrated Lightning **All Open Leads** table includes name/company/phone/email/status/source, record checkboxes/action menus and a toolbar. It is a training illustration, not the client's configured columns.

| Documented pattern | Official behavior described |
| --- | --- |
| List View dropdown | Switch between named lists |
| Pin icon | Choose the object's default list; a Recently Viewed summary is otherwise described as the landing experience |
| List View Controls | Create, rename, clone, share, choose fields and edit filters |
| Filter pane | Opens beside list; add/modify/remove criteria and see matching records |
| Select Fields to Display | Choose and order table columns |
| Record/inline edits | Record action menu or editable fields; save changes; availability depends on field/record conditions |
| Mass inline edit | Apply some changes to selected records; source notes record-type restrictions |
| Layout toggle | Table or Kanban; source also describes split view for task lists |
| Refresh | Refresh the list without a full-page reload |
| Charts | Visual summaries with grouping and aggregates; source describes bar/donut options |

The source distinguishes the **Recently Viewed landing summary** from a filterable Recently Viewed object list. They should not be treated as identical.

## Lead record workspace

SF-R01 describes these tabs:

| Tab | Purpose described |
| --- | --- |
| Activity | Log calls/emails/conversation notes; create Tasks or Events |
| Details | Review and update lead information |
| Chatter | Team collaboration, updates/files/discussion |
| Related | Associated campaigns/files and related information |

The record is presented as the workspace for previous interactions, campaign history and planned future work. This supports a record-focused workflow; it does not authorize real calling/email features in a prototype.

## Lead Intelligence View and work prioritization

SF-R01 describes switching from Lead home to **Intelligence View**, filtering records, reviewing aggregate activity and opening record activity through a side panel. Metrics:

| Metric | Official definition described |
| --- | --- |
| Total leads | Leads meeting filter criteria |
| No activity | No completed activities |
| Idle | Past activity, but no completed activity in last 30 days |
| No upcoming | Recently completed activity with no future activity scheduled |
| Overdue | Activities overdue |
| Due today | Activities due today |
| Upcoming | Activities due in next 30 days |

The source also describes Sales Engagement's console, Work Queue, dialer and cadences as a productivity offering. Their availability is not presumed for the client, and this research does not propose installing or purchasing them.

## Kanban and list consistency

SF-R02 describes cards grouped by a selected field such as stage/owner, optional numerical summaries, and retaining the active list's filters/displayed fields when changing layouts. Dragging a lead card can update status in its example. Opportunity alerts are described for overdue tasks, no open activity or no activity for 30 days. Do not automatically attribute those exact alert rules to every lead list or our prototype.

## Research limits

Read official documentation and visually checked the list illustration; did not interact with a live Salesforce app. Assignment-rule configuration, duplicate matching/merge rules, detailed Path setup, role hierarchy/sharing, real Meta/Google intake, licensing and the client's exact layout remain unverified. No screenshots supplied by the client. Use the documented patterns as research evidence and label adaptations separately.
