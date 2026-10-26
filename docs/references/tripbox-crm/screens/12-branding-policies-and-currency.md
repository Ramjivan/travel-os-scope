# TripboxCRM — document branding, policies, taxes and currency

Screen ID TRIPBOX-S12, Owner,9–10October2026. References L027–030/L051–053 and later L330–347. [Session](../sessions/2026-10-09.md), [quote sharing](04-itinerary-workspace.md). First-pass preferences not saved; later nondefault fictional tax saved.

## Currency rates

`/org/currency-rates`: INR base rates, 0 configured; **No preferred rates configured for INR**. Client currency selector, Rate 0, Add rate. Help describes 1 client currency unit equalling the entered INR amount; preferred rates precede live market rates and remain adjustable on individual quotes. Currency choices, provider and live fallback not verified.

## Document customization

`/org/itinerary-customization`, Document (PDF/Word) and Link tabs. Document controls: Itinerary format PDF default, Document template, Theme colour, Header artwork/Footer artwork Upload image, Save preferences. Template cards have Preview buttons.

| Template | Visible description |
| --- | --- |
| Standard Summary | Selected |
| Visual Brochure | PDF |
| Structured Package | Compact tables and day-wise cards for information-rich itineraries. PDF |
| B2B Compact Quote | Dense Day/Service/Type/Basis itinerary table with no images, for DMC-to-agent quoting. PDF |
| Trip Proposal | Section-by-section proposal matching emailed quote, standard itinerary header/footer. PDF |
| Trip Proposal v2 | Trip Proposal with four-column Day/Service/Type/Basis brief program like B2B Compact Quote. PDF |

Front pages automatically attach an opening PDF for exact country/city sets according to help. Add rule; Countries/Cities/Actions; no rules. Back cover PDF: Include back cover on, override per-download Advanced; Upload PDF, 1–10 pages/A4 portrait/up to 5 MB. Previews/artwork/uploads not exercised.

## Customer itinerary links

Link section anchors Appearance, Hero images, Content, Expert, Why choose us, Testimonials, Footer. Help says preferences apply when a link is published/refreshed, independently of document settings.

| Section | Controls/defaults |
| --- | --- |
| Template/appearance | Classic—simple and spacious; Showcase—compact and interactive; Accent colour (empty uses organisation); Hero tagline; Welcome message, 1,000 characters |
| Destination hero images | Add destination rule, Countries/Cities/Images/Actions; empty; help gives exact city sets priority over country; service-image fallback on |
| Content/privacy | Route/dates/duration/travellers always appear; Show customer name, accommodation, flights and full day transport, additional services all on |
| Destination expert | Show expert off; source Lead assignee (closed); call/WhatsApp/email buttons on; fallback organisation contact name/phone/WhatsApp/email |
| Why choose us | Show off, heading Why choose us, Add benefit, up to four |
| Testimonials | Show off, heading Traveller stories, Add testimonial, ordered reviews/photos |
| Footer/social | Reuses organisation name/logo/address/email; Company description 1,000 characters, Public phone/WhatsApp, HTTPS website, Add social or footer link |
| Actions | Preview template, Save preferences; not applied |

Public-link PIN and notification controls are separately documented under Quick Share. No link published.

## Standard policies and taxes

`/org/preferences`: Standard itinerary content Add Inclusion/Add Exclusion. Client policies: Terms & Conditions, Cancellation Policy, Payment Policy, TCS Terms, Important Information; each 10,000 characters, blank.

Add Tax appends name, calculation base, percentage 0, Default checkbox off, Remove. Bases expanded: Cost Only, All Markup, Cost + All Markup. Outer Save preferences persists the configuration. Unsaved tax row discarded by reload; no preference changes saved.

## Tested tax and currency continuation — 10 October

L341–347 saved a fictional **non-default**5% CostOnly tax. It became selectable on the existing quote without automatic application. Quote-local bases/percentages, save/reload and removal verified; [S04](04-itinerary-workspace.md) carries exact totals. Organisation policies remained blank; no default tax enabled.

L330–340: only INR base option surfaced. USD client conversion entered100 INR per USD; selling display rounded totals to whole units. Save/reload retained USD/margins but rate changed to96.64, an unresolved persistence/provider-refresh discrepancy. Restored original INR/no markup/no tax. Live fallback provider and stored/export precision are not established by these observations.

## Gaps

Document/template/link preview interiors, artwork/destination rules and published-link UI remain incomplete. Three quote tax bases and USDdisplay were later demonstrated above; all statutory correctness, rounding and output-parity tests remain unverified and outside present discovery scope. Currencyreload discrepancy preserved. No local itineraryPDF/Word verified.
