# Real-data integration plan

## Current status
SRM One is a prototype. No live connection to SRMIST exists.

## Recommended architecture
Android app (Expo / React Native)
  -> your secured backend
  -> SRMIST-approved API / SSO integration only

Do not have the app scrape the portal or store SRM credentials. Do not bypass CAPTCHA, OTP, MFA, rate limits, or access controls.

## Data-source inventory
| Data | Preferred authorized source | UI behaviour |
|---|---|---|
| Attendance | Official API / approved feed | Per-subject percentage, source and sync time |
| Internal/external marks | Official API / approved feed | Show published marks only; label estimates |
| Timetable/day order | Official calendar or API | Time zone Asia/Kolkata; holidays and exceptions |
| Faculty directory | Public official directory / approved API | Only published work contact details |
| Fees/receipts | Official API / approved portal link | Read-only, do not store card/bank secrets |
| Scholarships | Official notices and verified links | Source date, deadline, eligibility caveat |
| Notifications | Backend job triggered by authorized sync | Opt-in, no sensitive details on lock screen |
| Class analytics | Institution-approved aggregated/anonymized dataset | Minimum group-size threshold; never expose individual students |

## Security checklist
- Written authorization and documented scopes before integration.
- OAuth / university SSO redirect flow if offered by SRMIST; validate redirect URI and state.
- Never collect or store SRM password in the app.
- Store tokens securely; short expiry and revocation; no tokens in logs.
- Backend secrets in environment variables, not GitHub or app bundle.
- HTTPS, rate limiting, access checks, audit logs and deletion policy.
- Avoid showing private data on notifications or analytics.
- Provide a visible “data last synced” timestamp and stale-data warning.
