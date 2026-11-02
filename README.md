# Maharashtra Travel Companion

An own-product, Maharashtra-first travel planning MVP. The first milestone delivers a runnable responsive web starter, product documentation, a PostgreSQL/Supabase schema, and a rule-based destination discovery demo.

## Product decisions

- Ownership: Own product / startup
- Platform: Web first (PWA-ready direction; native Android later)
- Scope: MVP
- Initial product name: Maharashtra Travel Companion
- Initial launch geography: selected destinations reachable from Mumbai and Pune
- Initial booking approach: enquiry / trusted outbound links; no payment custody in MVP

## MVP principles

1. Recommend only destinations from a curated, maintainable catalogue.
2. Make estimated costs and travel times clearly labelled as estimates.
3. Do not invent hotel availability, live prices, opening hours, ratings, or route times.
4. Keep personal travel preferences private; public reviews require user consent and moderation.
5. AI is an enhancement over verified structured data, not the source of truth.

## Quick start

Requirements: Node.js 20.9+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

The first milestone demo uses local sample data and does not require Supabase or an AI key. The database schema is in `database/schema.sql`.

## Commands

```bash
npm run dev       # local development
npm run build     # production build
npm run start     # serve production build
npm run lint      # ESLint
npm run typecheck # TypeScript
```

## Repository map

```text
app/                  Next.js App Router pages and API routes
components/           Reusable UI
lib/                  Domain logic and curated sample data
database/schema.sql   PostgreSQL + PostGIS schema
docs/                 Product and engineering documentation
public/               Static assets
```

## First milestone acceptance

- Responsive landing page loads.
- User can enter origin, group size, duration, budget, travel mood, and transport.
- Submitting preferences returns a ranked shortlist from curated sample destinations.
- Recommendation explanations are visible.
- No fake live availability or booking claims.
- TypeScript checks and production build pass.

## Next milestone

Connect Supabase authentication and PostgreSQL, migrate the sample destination catalogue, then persist user profiles and saved trips. See `docs/ROADMAP.md`.

## Product ownership and legal

This repository is a starter implementation, not legal, travel, or safety advice. Before public launch, obtain rights to destination/hotel imagery and data, publish privacy/terms/refund policies, and verify any third-party API terms and attribution requirements.

## AI Travel Journal & Blog Creator

The approved product scope includes a private-first journal and AI-assisted blog creator. Users can attach trip media and details, generate editable stories, and explicitly publish a separate public blog. Private trip records and original media are never made public by publishing a blog. Public media use sanitized derivatives with GPS EXIF removed by default.

- Product/engineering specification: `docs/TRAVEL-JOURNAL-SPEC.md`
- Additive database migration: `database/002_travel_journal.sql` (run after `database/schema.sql`)

The migration defines metadata tables and row-level security. Supabase Storage bucket policies, signed upload endpoints, image processing, AI provider integration, and public blog API still need implementation and security testing; the schema alone does not deliver those runtime features.
