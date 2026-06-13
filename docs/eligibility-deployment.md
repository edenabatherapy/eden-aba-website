# Live Eligibility Deployment

## Vendor account required before production

Obtain a **HIPAA-eligible clearinghouse eligibility account** with a signed BAA.

**Recommended for Virginia Medicaid / MCO:** [Availity Essentials](https://www.availity.com) with Coverages API access.

Virginia Medicaid MCO eligibility uses payer IDs from the vendor payer directory (Anthem HealthKeepers Plus, Aetna Better Health, Molina, Sentara/Optima, UHC Community Plan, DMAS FFS).

---

## Availity integration (implemented)

Set `ELIGIBILITY_VENDOR=availity` and configure OAuth credentials from the [Availity Developer Portal](https://developer.availity.com/partner/gettingstarted).

### Sandbox onboarding

1. Create a Developer Portal account.
2. Create an app and subscribe to the **Demo plan** (auto-approved).
3. Copy **API Key** → `ELIGIBILITY_API_CLIENT_ID` and **Secret** → `ELIGIBILITY_API_CLIENT_SECRET`.
4. Set `ELIGIBILITY_PROVIDER_NPI` to Eden's 10-digit NPI.
5. Map form payer names to Availity payer IDs via `ELIGIBILITY_PAYER_ID_MAP`.
6. Restart the dev server and test `/insurance/status`.

Demo plan returns canned responses — use Availity documentation test scenarios for connectivity UAT.

### Production onboarding

1. Subscribe to **Standard plan** via Developer Portal + Contact Sales.
2. Execute BAA with Availity.
3. Enroll provider NPI in Availity Essentials.
4. Replace demo payer IDs with production VA payer IDs in `ELIGIBILITY_PAYER_ID_MAP`.

---

## Environment variables

### Availity portal live (required)

| Variable | Required | Purpose |
|----------|----------|---------|
| `ELIGIBILITY_VENDOR` | Yes | `availity` |
| `ELIGIBILITY_API_CLIENT_ID` | Yes | Availity API Key (OAuth client_id) |
| `ELIGIBILITY_API_CLIENT_SECRET` | Yes | Availity Secret (OAuth client_secret) |
| `ELIGIBILITY_PROVIDER_NPI` | Yes | Eden provider NPI on inquiries |
| `ELIGIBILITY_PAYER_ID_MAP` | Recommended | JSON map of form display names → Availity payer IDs |

### Availity optional

| Variable | Default | Purpose |
|----------|---------|---------|
| `ELIGIBILITY_TOKEN_URL` | `https://api.availity.com/v1/token` | OAuth token endpoint |
| `ELIGIBILITY_API_BASE_URL` | `https://api.availity.com` | Coverages API base |
| `ELIGIBILITY_DEFAULT_PATIENT_STATE` | `VA` | `patientState` on Availity POST |
| `ELIGIBILITY_AVAILITY_SCOPE` | — | OAuth scope if required by app |
| `ELIGIBILITY_AVAILITY_POLL_INTERVAL_MS` | `1500` | Poll interval for async coverage |
| `ELIGIBILITY_AVAILITY_POLL_MAX_MS` | `25000` | Max poll duration |
| `ELIGIBILITY_PORTAL_LIVE_ENABLED` | on when creds exist | Set `false` to force stored-only portal |

### Generic REST vendor (alternative)

| Variable | Purpose |
|----------|---------|
| `ELIGIBILITY_VENDOR` | `standard` or `clearinghouse_legacy` |
| `ELIGIBILITY_API_URL` | Vendor eligibility endpoint |
| `ELIGIBILITY_API_KEY` | Static Bearer token |

### Form submission live gate

| Variable | Value |
|----------|-------|
| `MEDICAID_VERIFICATION_MODE` | `clearinghouse` |
| `MEDICAID_LIVE_VERIFICATION_ENABLED` | `true` after UAT |

Portal live checks do **not** require `MEDICAID_LIVE_VERIFICATION_ENABLED`.

---

## Portal behavior

After identity verification on `/insurance/status`:

- **Live success:** `{ ok: true, live: true, status, statusLabel, statusMessage, checkedAt }`
- **Availity down / timeout / auth failure:** `{ ok: true, live: false, status: <stored>, ... }` — Eden stored status with fallback message

Identity verification, rate limiting, reCAPTCHA, and session cookies are unchanged.

---

## After vendor contract

1. Set real Availity payer IDs in `ELIGIBILITY_PAYER_ID_MAP`.
2. UAT in sandbox with vendor test members.
3. Enable `MEDICAID_LIVE_VERIFICATION_ENABLED=true` for form live checks when ready.
