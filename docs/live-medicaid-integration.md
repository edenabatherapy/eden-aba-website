# Live Medicaid Integration Guide

This document describes how Eden ABA Therapy's insurance verification system connects to approved Medicaid eligibility sources, what is implemented today, and what is required before live verification can be enabled.

## 1. Current architecture

```
Family form → POST /api/insurance/verify
                    │
                    ├─ validate/normalize DOB (MM/DD/YYYY → YYYY-MM-DD)
                    ├─ encrypt SSN + Medicaid ID at rest
                    ├─ persist queue record (storage/insurance/queue/)
                    ├─ notify staff (email and/or Slack — PHI-free)
                    └─ InsuranceVerificationProvider.verifyMember()
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
         ManualProvider  ClearinghouseProvider  MesProviderProvider
              │               │               │
         Pending Staff    HTTP to approved   MES API (pending
         Review always    clearinghouse API   implementation)
```

**Live verification gate:** All providers check `MEDICAID_LIVE_VERIFICATION_ENABLED === "true"`. Until that flag is set **and** credentials are configured, every submission returns **Pending Staff Review** for staff manual verification.

## 2. Provider interface

Location: `lib/insurance/providers/types.ts`

```typescript
interface InsuranceVerificationProvider {
  readonly name: string;
  verifyMember(input: VerificationMemberInput): Promise<EligibilityResult>;
}
```

Implementations:

| Provider | File | Behavior today |
|----------|------|----------------|
| `ManualVerificationProvider` | `ManualVerificationProvider.ts` | Always pending staff review |
| `ClearinghouseVerificationProvider` | `ClearinghouseVerificationProvider.ts` | Calls clearinghouse HTTP client when live enabled; returns "Provider not configured" without credentials |
| `MesProviderVerificationProvider` | `MesProviderVerificationProvider.ts` | Credentials check only; integration body not yet implemented |

Provider selection: `MEDICAID_VERIFICATION_MODE` env var (`manual` | `clearinghouse` | `mes_provider_api`).

**Important:** Providers map **real API responses only**. Unrecognized response shapes fall back to manual staff review. No fabricated eligibility data.

## 3. Required credentials

### Always required (production)

| Variable | Purpose |
|----------|---------|
| `INTAKE_ENCRYPTION_KEY` | AES-256-GCM encryption for PHI at rest + session signing |
| `INSURANCE_STAFF_ADMIN_TOKEN` | Staff admin login (min 32 characters) |

Validated at startup via `instrumentation.ts` in production.

### Staff notifications (at least one recommended)

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Email via Resend |
| `INSURANCE_STAFF_NOTIFICATION_EMAIL` | Recipient (defaults to intake email) |
| `INSURANCE_NOTIFICATION_FROM_EMAIL` | Sender address |
| `INSURANCE_SLACK_WEBHOOK_URL` | Slack incoming webhook |
| `INSURANCE_NOTIFICATION_CHANNELS` | `email`, `slack`, or `both` |

### Clearinghouse mode

| Variable | Purpose |
|----------|---------|
| `MEDICAID_VERIFICATION_MODE=clearinghouse` | Select clearinghouse provider |
| `CLEARINGHOUSE_API_URL` | Approved eligibility API endpoint |
| `CLEARINGHOUSE_API_KEY` | API bearer token |
| `CLEARINGHOUSE_TIMEOUT_MS` | Optional (default 30000) |
| `CLEARINGHOUSE_MAX_RETRIES` | Optional (default 3) |
| `MEDICAID_LIVE_VERIFICATION_ENABLED=true` | **Only after contract + testing** |

### Virginia Medicaid MES Provider API mode

| Variable | Purpose |
|----------|---------|
| `MEDICAID_VERIFICATION_MODE=mes_provider_api` | Select MES provider |
| `MES_PROVIDER_API_URL` | Virginia DMAS / MES provider API base URL |
| `MES_PROVIDER_CLIENT_ID` | OAuth / client identifier |
| `MES_PROVIDER_CLIENT_SECRET` | OAuth client secret |
| `MEDICAID_LIVE_VERIFICATION_ENABLED=true` | **Only after contract + testing** |

## 4. Required API documentation

Before implementing live mapping logic, Eden must obtain official documentation from the approved vendor:

### Clearinghouse path

- Eligibility inquiry endpoint URL and HTTP method
- Authentication scheme (Bearer, mTLS, signed requests)
- Request schema: member name, DOB format, Medicaid ID, SSN rules, payer ID for Virginia Medicaid
- Response schema: eligibility status, plan/MCO name, program type, effective dates
- Error codes and retry guidance
- Rate limits and sandbox/test credentials
- **Signed BAA** covering PHI transmission

### MES Provider API path (Virginia Medicaid)

- Virginia DMAS provider enrollment and API access approval
- OAuth token endpoint and scopes
- Eligibility verification operation ID (not member portal login)
- Virginia-specific payer codes for Cardinal Care / MCO plans
- Test member scenarios (active, inactive, not found)
- **Signed BAA** with Virginia/DMAS or authorized intermediary

### What Eden must NOT use

- Public member portals (e.g. [Virginia Managed Care member login](https://www.virginiamanagedcare.com/en/login))
- Screen scraping or automated browser login
- Unofficial third-party eligibility aggregators without BAA

See also: [live-verification-approved-sources.md](./live-verification-approved-sources.md)

## 5. Deployment checklist

- [ ] `INTAKE_ENCRYPTION_KEY` set (64 hex chars from `openssl rand -hex 32`)
- [ ] `INSURANCE_STAFF_ADMIN_TOKEN` set (min 32 chars)
- [ ] Production startup passes `assertInsuranceProductionReady()`
- [ ] `storage/insurance/` on encrypted volume with restricted filesystem ACLs
- [ ] `INSURANCE_EXPORT_ENABLED=true` only if CSV export is policy-approved
- [ ] Staff notification channel configured and tested (email and/or Slack)
- [ ] Resend (or email vendor) BAA executed
- [ ] Admin sessions use HTTPS (`secure` cookies in production)
- [ ] `MEDICAID_LIVE_VERIFICATION_ENABLED` remains **false** until UAT complete
- [ ] Clearinghouse or MES credentials stored in secrets manager (not git)
- [ ] Audit logs (`_audit.jsonl`, `_admin_audit.jsonl`, `_provider_errors.jsonl`) monitored
- [ ] Retention and breach notification procedures documented organizationally

## 6. Security requirements

- SSN and Medicaid ID encrypted before any disk write
- Audit logs mask PHI (`*****6789` format)
- Staff notifications contain **no PHI** (request ID and metadata only)
- Admin API protected by signed HttpOnly session cookies + rate limiting
- Admin audit log records login, logout, status changes, note updates, exports
- Export CSV excludes SSN, Medicaid ID, email, phone
- Provider error logs include provider name and error message only — no SSN/Medicaid ID/DOB
- No PHI in URL query parameters or client analytics events

## 7. Compliance considerations

- **HIPAA:** Organizational policies, workforce training, access controls, audit review, and vendor BAAs are required beyond application-level controls.
- **Minimum necessary:** Staff admin detail view shows full PHI only to authenticated staff; exports are PHI-minimized by default.
- **Virginia Medicaid:** Provider-level verification must use DMAS-approved channels; member-facing portals are not provider verification tools.
- **Consent:** Family form consent checkbox must remain required before submission.
- **Retention:** Define how long encrypted queue files and audit logs are retained and securely destroyed.

## Enabling live verification (when ready)

1. Obtain clearinghouse or MES contract, credentials, and API documentation.
2. Implement response mapping in the appropriate provider against **sandbox** endpoints.
3. Complete UAT with test members (active, inactive, not found).
4. Security review of PHI flow and logging.
5. Set `MEDICAID_LIVE_VERIFICATION_ENABLED=true` in production secrets.
6. Monitor `_provider_errors.jsonl` and `_audit.jsonl` for 48–72 hours after go-live.

Until step 5 is complete, families will continue to see **Pending Staff Review** and staff will verify through the admin queue.
