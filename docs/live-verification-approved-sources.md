# Live Verification — Approved Sources Only

This document defines **what Eden ABA Therapy may and may not use** for Virginia Medicaid / Cardinal Care eligibility verification, how the website behaves today, and which code is ready for live integration.

**Eden does not connect to member login websites.** Live verification is built only through **approved provider workflows**.

---

## What Eden Will NOT Do

The following are **explicitly out of scope** and must never be implemented:

| Prohibited approach | Example |
|---------------------|---------|
| Member portal login | [Virginia Managed Care](https://www.virginiamanagedcare.com/en/login) |
| Screen scraping | Automating any public member-facing website |
| Browser automation | Puppeteer, Playwright, or headless login flows |
| Family portal credentials | Asking families for MCO or DMAS login passwords |
| Fabricated eligibility | Mocking Active/Inactive responses without a real API |

### Why Virginia Managed Care login is not allowed

[virginiamanagedcare.com](https://www.virginiamanagedcare.com/en/login) is a **member self-service website**. It is designed for enrolled members to view their own coverage — not for licensed providers or billing entities to perform eligibility inquiries.

Provider eligibility must use **provider channels**:

- Virginia **MES Provider Portal** (provider enrollment required)
- **MediCall** (manual provider verification workflow)
- **EDI 270/271** eligibility transactions (via clearinghouse or direct payer connection)
- **Approved clearinghouse APIs** (e.g. Optum Eligibility, Availity)

Using the member portal would violate terms of use, create HIPAA/security risk, and produce unreliable results for provider billing workflows.

---

## Approved Verification Paths

### Path 1 — Virginia MES Provider Portal / EDI 270/271

**What it is:** Virginia DMAS Medicaid Enterprise System (MES) provider tools. Eligibility is verified as a **provider**, using NPI, taxonomy, and enrolled provider credentials — not member login.

**Typical access:**

- MES Provider Portal (web UI for staff)
- EDI **270** eligibility inquiry → **271** response (often via clearinghouse or direct connection)

**Eden code hook:**

| File | Status |
|------|--------|
| `lib/insurance/providers/MesProviderVerificationProvider.ts` | Stub — credentials check only; API body not implemented |
| `lib/insurance/verifyInsurance.ts` | Selects provider when `MEDICAID_VERIFICATION_MODE=mes_provider_api` |

**Credentials Eden must obtain:**

| Credential | Source |
|------------|--------|
| Virginia Medicaid **provider enrollment** | DMAS / MES onboarding |
| **NPI** and provider identifiers | NPPES + state enrollment |
| MES Provider Portal access | Assigned after provider approval |
| API / EDI credentials (if available) | DMAS or authorized EDI vendor |
| Virginia Medicaid **payer ID** for 270/271 | Payer companion guide |
| **Signed BAA** | DMAS or authorized intermediary |

**Environment variables:**

```bash
MEDICAID_VERIFICATION_MODE=mes_provider_api
MES_PROVIDER_API_URL=
MES_PROVIDER_CLIENT_ID=
MES_PROVIDER_CLIENT_SECRET=
MEDICAID_LIVE_VERIFICATION_ENABLED=true   # only after UAT
```

---

### Path 2 — MediCall Manual Provider Verification

**What it is:** MediCall is a **staff-operated** Virginia Medicaid eligibility verification workflow used by enrolled providers. It is not a public family API and Eden does **not** automate MediCall from the website.

**How Eden uses MediCall today:**

1. Family submits verification form → **Pending Staff Review**
2. Staff logs into MediCall through approved internal process
3. Staff updates status in `/admin/insurance-verifications`

**Eden code hook:**

| File | Role |
|------|------|
| `lib/insurance/providers/ManualVerificationProvider.ts` | Default mode — always Pending Staff Review |
| `app/admin/insurance-verifications/page.tsx` | Staff queue, status updates, PHI-masked detail |
| `lib/insurance/db/repository.ts` | Persists staff verification results |

MediCall does **not** require a separate `InsuranceVerificationProvider` class — it is the operational workflow behind manual mode.

**Credentials Eden must obtain:**

| Credential | Source |
|------------|--------|
| MediCall provider access | Virginia Medicaid provider enrollment |
| Staff training on MediCall lookup | Internal compliance / billing team |
| Documented SOP for PHI handling | Organizational policy |

---

### Path 3 — Approved Clearinghouse API (Optum, Availity, etc.)

**What it is:** HIPAA-eligible eligibility APIs that submit **270/271-style** inquiries to payers on behalf of enrolled providers. Optum (Change Healthcare) and Availity are common choices for Virginia Medicaid / MCO coverage.

**Eden code hook:**

| File | Status |
|------|--------|
| `lib/insurance/providers/clearinghouse/client.ts` | HTTP client with retries, timeout, no fabricated responses |
| `lib/insurance/providers/ClearinghouseVerificationProvider.ts` | Maps real API responses → Active / Inactive / Not Found; falls back to Pending on error |
| `lib/insurance/providers/logging.ts` | Provider errors to `_provider_errors.jsonl` (no PHI) |

**Credentials Eden must obtain:**

| Credential | Source |
|------------|--------|
| Clearinghouse **vendor contract** | Optum, Availity, or equivalent |
| **API URL** and **API key** (or OAuth/mTLS per vendor) | Vendor onboarding portal |
| Virginia Medicaid **payer ID(s)** | Vendor payer list / companion guide |
| Provider **NPI** and billing identifiers | Internal credential vault |
| **Signed BAA** with clearinghouse | Legal / compliance |
| Sandbox credentials for UAT | Vendor |

**Environment variables:**

```bash
MEDICAID_VERIFICATION_MODE=clearinghouse
CLEARINGHOUSE_API_URL=
CLEARINGHOUSE_API_KEY=
CLEARINGHOUSE_TIMEOUT_MS=30000
CLEARINGHOUSE_MAX_RETRIES=3
MEDICAID_LIVE_VERIFICATION_ENABLED=true   # only after UAT
```

**Implementation note:** `mapClearinghouseResponse()` in `ClearinghouseVerificationProvider.ts` must be updated to match the **vendor’s actual JSON schema** after contract signing. Unrecognized shapes fall back to **Pending Staff Review** — never fake Active/Inactive.

---

## Runtime Behavior (A / B)

When a family submits **name, DOB, and Medicaid ID or SSN**:

```
POST /api/insurance/verify
        │
        ├─ Encrypt PHI → queue record → staff notification
        │
        └─ InsuranceVerificationProvider.verifyMember()
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
   Live credentials        No credentials OR
   + LIVE flag=true         LIVE flag=false
        │                       │
        ▼                       ▼
   Call approved API         Pending Staff Review
        │                   (Manual / MediCall path)
        ▼
   Map real response:
   • Active
   • Inactive
   • Not Found
   • Unable To Verify
   • MCO / plan name
   • Effective date
   • Verification timestamp
```

### A — Approved live provider credentials exist

Requirements **all** of:

- `MEDICAID_LIVE_VERIFICATION_ENABLED=true`
- Configured provider credentials (clearinghouse **or** MES API)
- Successful API response with recognized schema

Family may see live-mapped fields from `InsuranceVerificationResponse`:

| Field | Source |
|-------|--------|
| `verificationStatus` / `eligibilityStatus` | Active, Inactive, Not Found, Unable To Verify, Verified |
| `currentEnrollmentChoice` | MCO / plan name from API |
| `effectiveDate` | From API |
| `programType` / `subprogramType` | From API when available |
| `verificationTimestamp` | ISO timestamp when live check completed |
| `notes` | Provider message (no fabricated eligibility) |

### B — No approved credentials

Family always sees:

- **Pending Staff Review**
- Message that staff will verify through approved provider workflows (MES, MediCall, clearinghouse — **not** the public member website)

This is the **current production default** with `MEDICAID_VERIFICATION_MODE=manual` and `MEDICAID_LIVE_VERIFICATION_ENABLED` unset or `false`.

---

## Code Files Ready for Live Integration

### Provider architecture (complete)

| File | Purpose |
|------|---------|
| `lib/insurance/providers/types.ts` | `InsuranceVerificationProvider` interface, `EligibilityResult` |
| `lib/insurance/verifyInsurance.ts` | Provider selection, response mapping |
| `lib/insurance/providers/ManualVerificationProvider.ts` | Default — Pending Staff Review |
| `lib/insurance/providers/ClearinghouseVerificationProvider.ts` | Clearinghouse adapter + response mapper |
| `lib/insurance/providers/clearinghouse/client.ts` | HTTP client, retry, live gate |
| `lib/insurance/providers/MesProviderVerificationProvider.ts` | MES API stub — implement after contract |
| `lib/insurance/providers/logging.ts` | PHI-safe provider error log |

### Submission & storage (complete)

| File | Purpose |
|------|---------|
| `app/api/insurance/verify/route.ts` | Public submit endpoint |
| `lib/insurance/db/repository.ts` | Encrypted queue persistence |
| `lib/insurance/encryptField.ts` | SSN / Medicaid ID encryption |
| `lib/insurance/storeVerificationRequest.ts` | Encrypted backup blob |

### Staff workflow (complete)

| File | Purpose |
|------|---------|
| `app/admin/insurance-verifications/page.tsx` | Staff queue (MediCall / manual path) |
| `app/api/admin/insurance-verifications/[id]/route.ts` | Staff status updates |

### Not live API — client identity only

| File | Purpose |
|------|---------|
| `app/api/insurance/portal/verify/route.ts` | Family proves identity to view **their own** request status |
| `lib/insurance/portal/verifyIdentity.ts` | DOB + last-4 + contact match |

Portal verification is **not** Medicaid eligibility lookup. It does not call DMAS, MediCall, or clearinghouse.

---

## Live Integration Gate

Live verification is disabled unless **both** are true:

```bash
MEDICAID_LIVE_VERIFICATION_ENABLED=true
# AND one of:
MEDICAID_VERIFICATION_MODE=clearinghouse   # + CLEARINGHOUSE_API_URL + KEY
MEDICAID_VERIFICATION_MODE=mes_provider_api # + MES credentials
```

Checked in: `lib/insurance/providers/clearinghouse/client.ts` → `isLiveVerificationEnabled()`

Families see `liveVerificationAvailable: true` on the form only when the gate passes **and** the selected provider reports configured credentials.

---

## Pre-Launch Checklist (Live Path)

- [ ] Vendor contract + **BAA** executed (clearinghouse or DMAS/MES)
- [ ] Provider enrollment and NPI active for Virginia Medicaid
- [ ] Sandbox UAT with test members: Active, Inactive, Not Found
- [ ] Response mapper updated to vendor schema (no guessed fields)
- [ ] Security review: PHI in transit, logging, encryption at rest
- [ ] `MEDICAID_LIVE_VERIFICATION_ENABLED=true` set only in production secrets
- [ ] Monitor `storage/insurance/_provider_errors.jsonl` for 48–72 hours
- [ ] Confirm **no** references to member portal automation in code or runbooks

---

## Related Documentation

- [live-medicaid-integration.md](./live-medicaid-integration.md) — deployment, env vars, security
- [insurance-verification-audit.md](./insurance-verification-audit.md) — Phase 1 architecture audit

---

## Summary

| Source | Role | Eden integration |
|--------|------|------------------|
| Virginia Managed Care member login | **Members only — NOT APPROVED** | ❌ Never |
| MES Provider Portal / EDI 270/271 | Provider eligibility | 🔧 Stub ready (`MesProviderVerificationProvider`) |
| MediCall | Staff manual verification | ✅ Admin queue (manual mode) |
| Clearinghouse (Optum, Availity) | Automated 270/271-style API | 🔧 Client + mapper ready; needs vendor schema |
| Manual / staff queue | Default until live creds | ✅ Production today |

Until approved provider credentials are configured and UAT is complete, families receive **Pending Staff Review** and staff verify through the admin queue using MediCall or other approved internal tools.
