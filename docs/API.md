# API contract (planned)

Milestone 1 uses an in-process recommendation function and does not expose a public API. These routes are proposed for Milestone 2 onward.

## `POST /api/v1/recommendations`

Request:
```json
{
  "origin": "Mumbai",
  "people": 2,
  "days": 2,
  "budgetTotalInr": 10000,
  "mood": "peaceful",
  "transport": "own-car"
}
```

Response:
```json
{
  "items": [
    {
      "destinationId": "lonavala",
      "name": "Lonavala & Khandala",
      "score": 14,
      "reasons": ["Matches your peaceful travel mood", "Fits your 2-day time window"],
      "estimate": {
        "amountPerPersonInr": 3200,
        "basis": "indicative planning estimate",
        "verifiedAt": null
      }
    }
  ],
  "disclaimer": "Estimates are not live quotes or booking confirmations."
}
```

## Planned routes

| Method | Route | Auth | Purpose |
|---|---|---|---|
| POST | `/api/v1/recommendations` | Optional | Rank curated destinations |
| GET | `/api/v1/destinations` | No | Search published destination catalogue |
| GET | `/api/v1/destinations/:slug` | No | Destination details |
| POST | `/api/v1/trips` | Yes | Save a trip |
| GET | `/api/v1/trips` | Yes | List current user's trips |
| GET | `/api/v1/trips/:id` | Yes | Read owned trip |
| PATCH | `/api/v1/trips/:id` | Yes | Modify owned trip |
| DELETE | `/api/v1/trips/:id` | Yes | Delete owned trip |
| GET | `/api/v1/profile/preferences` | Yes | Read private preferences |
| PUT | `/api/v1/profile/preferences` | Yes | Update private preferences |

All payloads require server-side schema validation, request size limits, rate limits and ownership checks. Return standard 400/401/403/404/429/500 errors without leaking internals.

## Travel journal and AI blog endpoints

The complete contract and security requirements are in `TRAVEL-JOURNAL-SPEC.md`. Add these authenticated routes:

- `POST /api/trips/:tripId/media/upload-intent`
- `POST /api/trips/:tripId/media/:mediaId/complete`
- `GET /api/trips/:tripId/media`
- `DELETE /api/media/:mediaId`
- `POST /api/trips/:tripId/memories`
- `PATCH /api/memories/:memoryId`
- `GET /api/memories`
- `POST /api/trips/:tripId/blogs/generate`
- `PATCH /api/blogs/:blogId`
- `POST /api/blogs/:blogId/publish`
- `POST /api/blogs/:blogId/unpublish`
- `POST /api/blogs/:blogId/rotate-link`
- `POST /api/blogs/:blogId/export`

Public unauthenticated route: `GET /api/public/blogs/:slug`. It must return only published allow-listed content and sanitized derivatives. Never return private storage paths or owner identifiers.
