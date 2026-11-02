# Software Requirements Specification (SRS)

## 1. System context

The MVP is a responsive web client. The first development milestone runs on local curated TypeScript data. The target architecture adds Supabase Auth and PostgreSQL/PostGIS for persistence.

## 2. Inputs and constraints

| Input | Type | Constraints |
|---|---|---|
| Origin | String | Required, 2–80 characters |
| People | Integer | 1–30 |
| Duration | Integer | 1–7 days in MVP |
| Total budget | Integer INR | Minimum ₹1,000 |
| Mood | Enum | peaceful, adventure, beach, culture, family, party, shopping |
| Transport | Enum | own-car, public-transport, bike, not-decided |

## 3. Recommendation behavior

The current demo score is a transparent heuristic:
- Mood match: +5.
- Exact duration fit: +4; near fit: +1.
- Starting city included in the destination's initial launch origins: +2.
- Indicative per-person planning amount multiplied by group size within total budget: +3; otherwise a weaker budget signal: +1.
- Results are sorted by score descending, then indicative per-person amount ascending; at most five are returned.

This scoring is a prototype and must be validated with users. The score is not a probability or guarantee.

## 4. Error handling

- Blank origin: show inline validation.
- Invalid group/duration/budget: block submission and show message.
- No recommendations: show suggestions to broaden budget, duration or mood.
- Catalogue unavailable in future API-backed version: show retry state and do not fabricate results.

## 5. Security requirements

- All authenticated data access must be authorized on the server and protected by RLS.
- Service-role credentials must never be included in client bundles.
- Validate API payloads server-side.
- Rate-limit AI and search endpoints.
- Avoid storing precise location unless required and consented to.
- Provide account data export/deletion procedures before public release.

## 6. Browser support

Target current stable Chrome, Safari, Firefox and Edge; mobile Safari and Chrome Android. Validate responsive behavior at 360px, 390px, 768px and desktop widths.

## 12. Travel journal, media, and blog requirements

- The system shall store original media in a private object-storage bucket and keep metadata in `trip_media`.
- The system shall enforce authenticated ownership for every trip, memory, media, and blog operation.
- The system shall allow a user to create private memory entries, tags, notes, and trip-linked media collections.
- The system shall generate an editable blog draft from user-supplied trip facts and selected media through a server-side AI adapter.
- The system shall not publish a draft automatically. Publishing requires an explicit authenticated action.
- The system shall expose only published blog fields and selected sanitized media through a public read endpoint.
- The system shall support unpublish and share-link rotation; prior links must stop resolving after rotation/unpublish.
- The system shall strip GPS EXIF from public media derivatives by default and never return private storage paths or metadata from public APIs.
- The system shall validate file size, MIME type, quotas, upload completion, and processing status server-side.
- The system shall support deletion/export workflows and auditable publish-state transitions.

Detailed API routes and acceptance criteria are maintained in `TRAVEL-JOURNAL-SPEC.md`.
