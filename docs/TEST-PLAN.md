# Test Plan

## Milestone 1 manual checks

| ID | Scenario | Expected result |
|---|---|---|
| TC-01 | Open `/` on desktop | Landing page renders without errors |
| TC-02 | Open on 360px mobile width | No horizontal overflow; form usable |
| TC-03 | Submit default Mumbai, 2 people, 2 days, ₹10,000, peaceful | Relevant shortlist is shown |
| TC-04 | Change mood to adventure | Adventure destinations rank above unrelated destinations |
| TC-05 | Enter blank origin | Inline validation appears |
| TC-06 | Enter budget below ₹1,000 | Validation prevents recommendation |
| TC-07 | Use duration 1 day | One-day-compatible destinations can appear |
| TC-08 | No matching mood/time/budget | Helpful empty state appears |
| TC-09 | Inspect result cards | Estimate and seasonal caveats are visible |
| TC-10 | Keyboard-only navigation | Inputs and submit button are reachable and labelled |

## Automated test backlog

- Unit tests for each recommendation scoring branch.
- Component tests for form validation and result rendering.
- API contract tests after route handlers are implemented.
- RLS tests using two users to verify isolation.
- E2E tests for sign-up, save trip, edit trip and delete trip.
- Accessibility checks with axe.
- Load tests for destination search and recommendation endpoints.
- Security checks for authorization, rate limiting and secret exposure.

## Release gates

No public beta until critical defects are closed, RLS isolation is tested, privacy/terms are published, production backups are verified and catalogue records have a named source and verification date.
