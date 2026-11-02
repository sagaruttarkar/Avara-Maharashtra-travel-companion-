# Delivery roadmap

## Milestone 1 — Foundation + clickable working demo
- Repository and Next.js setup.
- Product documentation.
- Responsive landing page.
- Trip preference form.
- Transparent rule-based destination shortlist.
- Initial SQL schema.
- Local run/build/typecheck instructions.

## Milestone 2 — Real data and user accounts
- Supabase project and migrations.
- Authentication and profile.
- Destination/places/stays catalogue.
- Admin data-entry workflow.
- Save, list, edit and delete trips.
- RLS and account deletion tests.

## Milestone 3 — Itinerary builder
- Day-wise itinerary generation from verified places.
- Reorder/add/remove activities.
- Route ordering and travel-time provider integration.
- Budget line items and totals.
- Shareable itinerary.

## Milestone 4 — AI assistance and personal memory
- Server-side AI provider adapter.
- Structured output constrained to catalogue IDs.
- Explicit opt-in preference memory.
- Memory review/edit/delete controls.
- AI cost limits and abuse protection.

## Milestone 5 — Partner ecosystem and beta
- Hotel and local operator onboarding.
- Enquiry and affiliate tracking.
- Review moderation.
- Analytics and feedback loops.
- Privacy, terms, support and incident process.

## Milestone 6 — Android
- Choose Kotlin or React Native based on team and offline/location needs.
- Reuse backend APIs and auth.
- Push notifications and offline saved itineraries.

## Expanded journal and publishing workstream

- **M5 — Media foundation:** private bucket, signed uploads, file validation, processing status, quotas, image derivatives, EXIF stripping.
- **M6 — Private journal:** memory entries, trip notes, tags, favourites, expense notes, media gallery, search.
- **M7 — AI story drafts:** provider adapter, prompt/template versioning, structured output validation, editing and retry UX.
- **M8 — Publishing and exports:** preview, explicit publish/unpublish, revocable public slug, PDF/photo-story export.
- **M9 — Hardening and monetization:** abuse reporting, moderation, privacy/export/delete, billing limits, premium themes and disclosed affiliate links.

These workstreams extend the trip-planning roadmap; the private-first privacy model is a release-blocking requirement, not a later enhancement.
