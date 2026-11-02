# Product Requirements Document (PRD)

**Product:** Maharashtra Travel Companion  
**Version:** 0.1 | **Status:** Draft for MVP | **Owner:** Founder  
**Platform:** Responsive web application; PWA-ready architecture  
**Market:** Maharashtra, India

## 1. Product summary

Maharashtra Travel Companion helps people decide where to travel and turn their constraints—starting location, group size, trip duration, budget, interests and transport mode—into a useful destination shortlist and editable itinerary.

The product is Maharashtra-first, not a generic global travel chatbot. Its long-term differentiation is trusted local destination and hospitality data, practical planning, user-controlled travel memory, and local partner relationships.

## 2. Problem

Travellers often need to combine information from search engines, social media, maps, hotel listings and blogs. They struggle to compare destinations against their available days, group needs and total budget. Local hidden gems and reliable hospitality information can be difficult to assess.

## 3. Target users

- Couples planning short breaks.
- Friends planning weekend trips.
- Families with children or older travellers.
- Solo travellers.
- Maharashtra residents and visitors starting from Mumbai, Pune and later other cities.

## 4. Value proposition

"Tell us your time, budget, group and travel mood. Get a Maharashtra trip shortlist with transparent reasons and a plan you can customize."

## 5. MVP goals

1. Validate whether users want preference-based Maharashtra destination discovery.
2. Capture enough trip context to rank relevant destinations.
3. Show transparent recommendation reasons and planning estimates.
4. Establish the data model for destinations, stays, attractions, trips and private preferences.
5. Collect early user feedback before investing in complex AI and booking integrations.

## 6. Non-goals for MVP

- Direct hotel inventory or guaranteed real-time availability.
- Taking payment or acting as merchant of record.
- Automated booking/cancellation.
- Nationwide/global destinations.
- Native Android app.
- User-generated public reviews without moderation.
- Guaranteed live weather, traffic, opening hours or ticket prices.
- Fully autonomous AI planning without curated data.

## 7. Core user stories

| ID | User story | Acceptance criteria |
|---|---|---|
| US-01 | As a traveller, I enter my starting city. | Required text input; validation for blank values. |
| US-02 | I specify group size and days. | Group size 1–30; duration 1–7 days in MVP. |
| US-03 | I specify a total budget. | INR input; positive amount; label clearly says total group budget. |
| US-04 | I select a travel mood. | Peaceful, adventure, beach, culture, family, party, shopping. |
| US-05 | I select transport mode. | Own car, public transport, bike, undecided. |
| US-06 | I receive destination suggestions. | Up to five curated results, ranked using documented rules. |
| US-07 | I understand each suggestion. | Each card shows match reasons, estimate caveat and seasonal note. |
| US-08 | I can use the product on mobile. | Responsive layout at 360px and larger. |

## 8. Functional requirements

- FR-01: The system shall accept origin, people, days, total budget, mood and transport.
- FR-02: The system shall validate all user inputs on the client and server when APIs are added.
- FR-03: The system shall rank only destinations present in the curated catalogue.
- FR-04: The system shall explain the main factors behind each ranking.
- FR-05: The system shall display budget values as indicative estimates, never as live quotes.
- FR-06: The system shall display season and safety verification notes where available.
- FR-07: Later releases shall allow authenticated users to save, edit and delete trips.
- FR-08: Later releases shall allow users to opt in to private travel memory.
- FR-09: Public reviews shall require explicit sharing consent and moderation.
- FR-10: Admin users shall be able to manage catalogue records in a later milestone.

## 9. Non-functional requirements

- Security: enforce authorization server-side and PostgreSQL row-level security.
- Privacy: collect only necessary data; private memories must not be public.
- Performance: target LCP under 2.5 seconds on a typical 4G connection after optimization.
- Accessibility: keyboard-operable forms, visible labels, semantic landmarks and readable contrast.
- Reliability: recommendation engine must return a graceful empty state when no matches exist.
- Maintainability: TypeScript strict mode, modular domain logic and documented migrations.
- Transparency: clearly identify estimates, sponsored content and partner placements.

## 10. Success metrics

MVP validation targets (initial hypotheses, not forecasts):
- 100 completed trip searches from test users.
- At least 40% of users click or save one suggested destination.
- At least 20% return within 30 days.
- Median time to first useful shortlist under 2 minutes.
- Qualitative feedback identifies whether recommendations feel relevant and trustworthy.

## 11. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Stale or inaccurate place information | Source, verification date, owner and review cadence on records. |
| AI hallucination | AI may summarize/rank approved records only; never invent inventory. |
| Misleading prices | Show range, assumptions and last-verified date; label estimates. |
| Seasonal hazards | Add advisories and require operators/official sources for activity status. |
| Privacy leakage | RLS, data minimization, explicit consent and deletion workflow. |
| Competition | Differentiate through Maharashtra-local data quality and hospitality signals. |

## 12. MVP release definition

The first public beta is ready only after authentication, persisted trips, destination catalogue quality checks, privacy/terms pages, analytics consent review, basic security testing, backup strategy and a support contact are in place.

## 13. AI travel journal and publishing (approved scope)

The product also includes a private-first travel journal. A signed-in traveller can upload trip photos (and, when video processing is enabled, videos), add trip facts and notes, and generate an editable AI travel story. The journal remains private. A separate blog draft can be explicitly published as a public page with a revocable share link. Only media and fields explicitly selected for publication are exposed. Public derivatives strip GPS EXIF metadata by default. See `TRAVEL-JOURNAL-SPEC.md` for detailed requirements, API contracts, privacy controls, and acceptance criteria.

Additional MVP user stories:
- As a traveller, I can keep trip photos, notes, expenses, and favourite moments in a private journal.
- As a traveller, I can generate and edit a blog using my trip details and selected photos.
- As a traveller, I can preview a public version and deliberately publish or unpublish it.
- As a traveller, I can export a trip story and share a public link without exposing my private journal.

Additional success measures: successful media upload rate, AI draft completion rate, draft-to-publish conversion, unpublish success, and privacy/security test pass rate.
