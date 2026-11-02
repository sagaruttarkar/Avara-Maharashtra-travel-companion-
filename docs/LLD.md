# Low-Level Design (LLD) — Milestone 1

## Modules

### `lib/types.ts`
Defines the canonical TypeScript types for travel mood, transport mode, trip preferences and destination records.

### `lib/destinations.ts`
Contains a small, illustrative curated destination dataset for the UI demo. Each record includes a stable ID, district, supported moods, duration range, indicative per-person planning budget, launch origins and caveats.

### `lib/recommend.ts`
Pure domain function. Accepts `TripPreferences`, scores each destination using explicit rules, returns at most five ranked destinations with explanation strings. It has no network, database or AI dependency.

### `components/TripPlanner.tsx`
Client-side form and result rendering. Validates user input, calls the pure recommendation function, and displays a no-match state. It does not persist personal information.

### `app/page.tsx`
Landing page and product positioning. It composes the planner and feature overview.

## Extension points

- Replace local catalogue import with repository interface backed by PostgreSQL.
- Add Zod request schemas at the API boundary.
- Add an itinerary optimizer as a separate domain service.
- Add map and AI provider adapters behind server-only interfaces.
- Add auth before any trip or memory persistence.
