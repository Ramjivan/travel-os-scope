# Travel OS

A proposed travel platform combining CRM, B2B sales and agent booking, DMC operations, communications, and AI-assisted itinerary creation.

**Current status:** connected local [CRM](docs/modules/crm/README.md), [Operations](docs/modules/operations/README.md) and [Accounts](docs/modules/accounts/README.md) mockups run in the shared demo login/dashboard/theme shell. Sales submits payment evidence, Accounts verification releases Ops manager assignment, and executives manage sample services/documents/balance/voucher/travel work. Shared remarks retain limited Sales visibility. [Team walkthrough and meeting questions](docs/product/operations-accounts-review.md) record provisional rules; Marketing, incoming auto-routing/settings, tax/target calculations and live integrations remain deferred. The scope planner/admin stays separate.

## Product direction

FB-034 adds a separate [Sembark-style internal DMC pilot](docs/modules/dmc/README.md): agency query → versioned quote → sample booking → supplier confirmations → receipt verification → voucher/history. It uses synthetic records in local SQLite, preserving existing CRM/Ops/Accounts samples. [Flow evaluation](docs/product/b2b-flow-evaluation.md) records why the structure makes sense and which external-agency/financial rules remain unknown. Sembark access remains prohibited without fresh login permission.

Start with a connected prototype using synthetic data, supported by lightweight business rules and service contracts. Validate complete user journeys with the client, then implement the database and backend in slices. UI feedback can continue throughout development; do not wait for every screen to become final before addressing integration feasibility.

The first proposed journey is:

`Inquiry -> CRM lead -> itinerary draft -> priced quote -> agent booking request -> DMC confirmation`

See the [product brief](docs/product/README.md), [delivery plan](docs/product/delivery-plan.md), and [domain model](docs/product/domain-model.md).

## Documentation and references

| Location | Purpose |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Persistent working rules for AI-assisted development |
| [Documentation index](docs/README.md) | Starting point for project knowledge |
| [Reference library](docs/references/README.md) | Portal screenshots, observations, and evidence |
| [Module index](docs/modules/README.md) | Implemented features and planned module boundaries |
| [Development workflow](docs/development/README.md) | How to scope, implement, review, and document changes |
| [Assumption register](docs/product/assumptions.md) | Material unverified premises and validation paths |
| [Current-state handoff](docs/development/current-state.md) | Completed work, next action, and unresolved decisions |
| [Decisions](docs/decisions/README.md) | Architecture and workflow choices with their reasons |
| [Client feedback](docs/feedback/README.md) | Feedback, related changes, and validation status |
| [Changelog](CHANGELOG.md) | Meaningful project deliverables |

## Run the workspace preview

Sales now has [Itineraries & Quotes](docs/modules/itineraries/README.md) at `http://127.0.0.1:5173/#/itineraries` after login. B2B/DMC uses its separate URL `http://127.0.0.1:5173/b2b/#/dmc/login`; it is no longer a B2C tab. Manual/template/text-import and rates are local mockups. User will test; no real AI/airline/hotel integration is configured.

Use Node.js 24. From the repository root:

```sh
npm ci --prefix apps/web
npm run dev:web
```

Open `http://127.0.0.1:5173/`. Choose a demo role below login to fill dummy credentials, then sign in. Authentication and dashboard records are simulated; no real credentials are needed. Themes persist locally and demo sessions last eight hours in the current tab.

```sh
npm run check:web
npm run test:web
npm run build:web
```

The production frontend output is `apps/web/dist`; the existing Docker/Express app does not serve it yet. See [module behavior and verification](docs/modules/workspace/README.md).

For DMC, open `http://127.0.0.1:5173/#/dmc/login` and choose Admin, Accounts, Sales, Reservations or Operations. Each fills its separate dummy email and `DmcDemo!2026` password. DMC links preserve their requested page through login; its session/sign-out is independent of CRM/B2C. Role cards use default home pages but all still share synthetic pilot access. Node 24/Vite serves its SQLite adapter locally; `data/dmc/pilot.db` is ignored. `npm run test:dmc` checks its storage and HTTP rules. Static hosting alone has no DMC API, and the pilot API is restricted to local addresses. Use fictional data only; no production identity, external-agency tenancy, real bookings or financial transactions.

The preview also has [floating feedback and a local reviewer inbox](docs/modules/review/README.md), independent of sample bookings. Text/voice, marked sections and submitter/role context are saved on this host while Vite development/preview runs. `npm run review:list` shows local issues; static frontend deployment alone needs an inbox service.

## Run the existing scope planner

Use Node.js 24, matching the Docker image and the built-in `node:sqlite` usage.

```sh
npm ci
npm start
```

Open `http://localhost:3000/` for the scope planner and `http://localhost:3000/admin` for inspection. The server requires Basic authentication using its existing configuration; this README does not duplicate credentials.

Planner sessions, interactions, and board snapshots are stored in `data/travel_os.db`. This database serves the planner; it is not the future travel product database. Styling and fonts currently load from external CDNs.

The root `npm test` command remains a placeholder that exits with failure. `npm run test:web` is the separate usable workspace service suite.

## Existing code

- `apps/web`: React/TypeScript/Vite workspace preview, using Tailwind and shadcn Radix components.
- `public/index.html`: served scope planner; [feature documentation](docs/modules/scope-planner/README.md).
- `public/admin.html` and `public/admin.js`: session inspection; [feature documentation](docs/modules/admin-inspection/README.md).
- `public/tracker.js`: planner session and interaction reporting.
- `server.js` and `database.js`: Express routes and planner persistence.
- `scope_builder.html`: a second planner HTML file, not the file served at `/`. Inspect its differences before changing it; do not assume both copies stay synchronized.
- `Dockerfile`: Node.js 24 container configuration.

The frontend prototype stack is adopted in [decision 0003](docs/decisions/0003-demo-workspace-shell.md). Production backend architecture, identity and deployment remain open.
