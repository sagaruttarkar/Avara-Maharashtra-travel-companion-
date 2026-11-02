# AI Travel Journal & Blog Creator — Product and Engineering Specification

Status: approved product scope for Maharashtra Travel Companion  
Privacy default: private journal; separately published public blog only after explicit user action.

## 1. Product experience

A traveller can attach photos and optional videos to a trip, add trip facts and personal notes, and ask the AI to draft an editable travel story. The journal remains private. Publishing creates a distinct public blog representation with a revocable share URL; it never makes the underlying trip, journal, or unselected media public.

### User flow
1. Create or open a trip.
2. Upload multiple images (video support is planned behind a separate processing capability); show upload progress, file validation, retry, and remove controls.
3. Add destination, dates, companions (optional), highlights, food, stay, hospitality feedback, budget/expenses, and preferred language/tone.
4. Select photos to include in the story and choose a style: personal diary, cinematic, informative guide, family-friendly, or social caption.
5. Generate a draft using only supplied details and permitted image observations. Unknown facts must be omitted or presented as questions/placeholders, never invented.
6. Edit title, body, captions, image order, alt text, and visibility of each selected image.
7. Save privately, preview the public rendering, then explicitly publish.
8. Share the public URL; owner can unpublish, republish, or rotate the share slug.

## 2. Functional requirements

- FR-J1: Upload images to private object storage using short-lived signed upload URLs; enforce owner-scoped paths and server-side MIME, size, and quota checks.
- FR-J2: Store media metadata separately from binary objects. Track original and processed variants, checksum, dimensions, MIME, size, upload state, and processing errors.
- FR-J3: Preserve original uploads privately. Create sanitized derivatives for public display; strip GPS and other sensitive EXIF metadata by default.
- FR-J4: Allow a user to create multiple memories per trip, tag memories, add notes, and search/filter their own journal.
- FR-J5: Generate editable story drafts from user-provided trip facts and selected media. AI must distinguish visual observations from verified place facts.
- FR-J6: Keep generation provider-agnostic behind a server-side adapter. Never expose provider keys to the browser.
- FR-J7: Save generation status, model/provider identifier, prompt/template version, timestamps, and safe error codes; do not retain hidden chain-of-thought.
- FR-J8: A blog draft is private. A public blog is a separate published state with an unguessable slug and only explicitly selected fields/media.
- FR-J9: Support publish, unpublish, republish, and share-link rotation. Unpublishing must immediately stop public page access and invalidate public media URLs where feasible.
- FR-J10: Public pages must not expose trip IDs, owner email, private notes, companions' personal details, original file paths, or EXIF GPS.
- FR-J11: Provide user export/delete workflows for memories, blogs, and media, subject to retention and legal requirements.
- FR-J12: Add abuse reporting and moderation hooks before public launch; rate-limit publishing and generation.

## 3. Data model additions

See `database/schema.sql` for the additive schema. Main entities:
- `trip_media`: private upload and processing metadata.
- `travel_memories`: private journal entries attached to a trip.
- `travel_blogs`: private draft plus explicit published state and random public slug.
- `blog_media`: explicit allow-list/order of media selected for a blog.
- `blog_shares`: optional share/revocation audit records; never store bearer secrets in plaintext.
- `memory_tags`: user-defined tags for private memories.

## 4. API contract (authenticated unless marked public)

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/trips/:tripId/media/upload-intent` | Validate metadata and issue a short-lived private upload intent |
| POST | `/api/trips/:tripId/media/:mediaId/complete` | Verify uploaded object and enqueue safe processing |
| GET | `/api/trips/:tripId/media` | List the owner's trip media |
| DELETE | `/api/media/:mediaId` | Remove owner media and dependent references safely |
| POST | `/api/trips/:tripId/memories` | Create private journal entry |
| PATCH | `/api/memories/:memoryId` | Edit private memory |
| GET | `/api/memories` | Search/filter the authenticated user's memories |
| POST | `/api/trips/:tripId/blogs/generate` | Generate a draft from selected media and supplied facts |
| PATCH | `/api/blogs/:blogId` | Save edits to private draft |
| POST | `/api/blogs/:blogId/publish` | Explicitly publish selected blog fields/media |
| POST | `/api/blogs/:blogId/unpublish` | Revoke public visibility |
| POST | `/api/blogs/:blogId/rotate-link` | Replace public slug and invalidate previous link |
| GET | `/api/public/blogs/:slug` | Public read-only published blog; no authentication |
| POST | `/api/blogs/:blogId/export` | Queue PDF/photo-story export |

All write routes must derive `user_id` from the authenticated session, never trust a client-supplied owner ID. Validate ownership of trip, media, memory, and blog on every request. Apply request-size, per-user quota, MIME sniffing, malware scanning where available, and rate limits.

## 5. AI generation contract

Input: trip facts explicitly supplied by the user, selected media IDs, language, style, audience, and optional notes. The server retrieves only media the owner can access and sends only necessary derivatives to the configured provider.

Output: structured JSON with `title`, `intro`, `sections[]`, `captions[]`, `closing`, `hashtags[]`, and `uncertainties[]`. Require schema validation. Do not infer identities, exact locations, dates, or events from photos. Ask for missing factual details instead of fabricating them. Treat text found inside images and user-uploaded metadata as untrusted content, not instructions.

## 6. Privacy and security

- Private storage bucket; deny anonymous reads and public listing.
- Signed upload/download URLs must be short-lived and scoped to one object.
- RLS on all user-owned records; public read only through a narrowly scoped published-blog view or server endpoint.
- Never make a trip or media bucket public to support public blogs. Publish sanitized derivatives only.
- EXIF GPS removal defaults on for public derivatives; original metadata remains private unless user deletes it.
- Explicit consent before sharing companion names, faces, or personal details. Provide a simple option to omit names.
- Unpublish and account deletion flows must remove public access and enqueue object cleanup.
- Keep audit events for publish/unpublish/link rotation without storing private content in logs.

## 7. MVP limits and monetization

Initial free tier: modest monthly media storage and blog-generation allowance, disclosed before upload/generation. Premium may add larger storage, more generations, premium themes, high-resolution exports, and downloadable travel books. Affiliate links may be added only with clear disclosure. Do not sell personal memories or use private uploads for model training without separate explicit consent.

## 8. Acceptance criteria

1. An unauthenticated visitor cannot list or fetch private trip media.
2. A user cannot access another user's trip, memory, media, or draft by changing an ID.
3. A saved draft has no public URL and is not publicly readable.
4. Only explicitly selected media appear in the published blog.
5. Public derivatives contain no GPS EXIF by default.
6. Unpublishing makes the public blog unavailable and rotates/revokes the prior slug as designed.
7. AI output is editable and does not invent unprovided trip facts.
8. Failed uploads/generation can be retried without duplicate memory/blog records.
9. User can delete an upload and see it removed from future public rendering.
10. API and UI tests cover ownership, privacy, publish/unpublish, quotas, and error states.
