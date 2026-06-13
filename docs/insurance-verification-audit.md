# Insurance Verification — Phase 1 Audit

## Architecture overview

The insurance verification system uses a **public family form**, a **verification API**, **encrypted file storage**, and a **staff admin queue**. Live Medicaid eligibility lookup is optional and controlled by environment configuration.

```
Family browser
    │
    ▼
InsuranceVerificationForm.tsx  (MM/DD/YYYY input, no PHI in localStorage/URL)
    │
    POST /api/insurance/verify
    │
    ├── validateDOB / normalizeDOB  →  store YYYY-MM-DD
    ├── encryptPhiField (SSN, Medicaid ID)  →  AES-256-GCM
    ├── createVerificationRecord  →  storage/insurance/queue/{id}.json
    ├── storeVerificationRequest  →  storage/insurance/{id}/verification.json.enc
    ├── verifyInsurance (adapter: manual | clearinghouse | mes_provider_api)
    └── audit log  →  storage/insurance/_audit.jsonl (masked PHI only)

Staff browser
    │
    ▼
/admin/insurance-verifications
    │
    ├── GET  /api/admin/insurance-verifications
    └── GET/PATCH /api/admin/insurance-verifications/[id]
         (Bearer INSURANCE_STAFF_ADMIN_TOKEN)
```

### Adapter modes

| Mode | Env var | Behavior |
|------|---------|----------|
| `manual` (default) | `MEDICAID_VERIFICATION_MODE=manual` | Returns **Pending Staff Review**; staff completes verification in admin queue |
| `clearinghouse` | Requires `CLEARINGHOUSE_API_URL` + `CLEARINGHOUSE_API_KEY` + `MEDICAID_LIVE_VERIFICATION_ENABLED=true` | Stub — throws until implemented |
| `mes_provider_api` | Requires MES credentials + live flag | Stub — throws until implemented |

## Data flow

1. **Submit** — Family enters name, DOB (`MM/DD/YYYY`), Medicaid ID or SSN, contact info, consent.
2. **Normalize** — `normalizeDOB()` converts `02/01/1985` → `1985-02-01` (US month-first, never swapped).
3. **Encrypt** — SSN and Medicaid ID encrypted with `INSURANCE_ENCRYPTION_KEY` / `INTAKE_ENCRYPTION_KEY` before any disk write.
4. **Queue** — `InsuranceVerificationRecord` saved to `storage/insurance/queue/{uuid}.json`.
5. **Respond** — Family sees **Pending Staff Review** with staff workflow message; DOB displayed as `MM/DD/YYYY`.
6. **Staff review** — Staff opens `/admin/insurance-verifications`, views decrypted PHI, updates status/plan/effective date/notes.
7. **Audit** — Append-only `_audit.jsonl` records actions with masked SSN/Medicaid ID only.

## DOB fix

**Problem:** Dates of birth must be interpreted as US format `MM/DD/YYYY`. Storing or displaying as `DD/MM/YYYY` or ISO without explicit rules can swap month and day (e.g. `02/01/1985` becoming January 2 instead of February 1).

**Solution:** Centralized helpers in `lib/insurance/dates.ts`:

| Function | Purpose |
|----------|---------|
| `validateDOB(input)` | Validates format and calendar date |
| `normalizeDOB(input)` | Canonical storage: `YYYY-MM-DD` |
| `formatDOBForDisplay(input)` | Family/staff UI: `MM/DD/YYYY` |

All insurance verification paths (form, API, storage, responses, admin queue, legacy `/api/insurance-verification`) use these functions.

## Security model

| Requirement | Implementation |
|-------------|----------------|
| SSN encrypted before storage | `encryptPhiField()` → `ssnEncrypted` on record + encrypted backup blob |
| Medicaid ID encrypted before storage | `encryptPhiField()` → `medicaidIdEncrypted` |
| No SSN in logs | `auditLog.ts` masks via `maskSsn()` / `maskMedicaidId()` |
| No SSN in browser console (public form) | Form never logs payload; SSN field is `type="password"` |
| No SSN in localStorage | Active form does not persist PHI (legacy dead code in `page.js` unused) |
| No SSN in URL parameters | All submission via POST JSON body |
| Staff PHI access | Token-gated admin API decrypts fields server-side only |

**Required env vars (production):**

- `INTAKE_ENCRYPTION_KEY` or `INSURANCE_ENCRYPTION_KEY` — 32-byte AES key
- `INSURANCE_STAFF_ADMIN_TOKEN` — staff access for admin queue

## Staff verification workflow

### Statuses

- **Pending Staff Review** — New submission (default)
- **Active** — Eligibility confirmed active
- **Inactive** — Confirmed inactive coverage
- **Unable To Verify** — Could not verify with available identifiers

### Staff actions (`/admin/insurance-verifications`)

1. Sign in with `INSURANCE_STAFF_ADMIN_TOKEN` (stored in `sessionStorage`, not localStorage).
2. View queue sorted by submission time.
3. Open a request — see contact info, decrypted Medicaid ID/SSN, DOB (`MM/DD/YYYY`).
4. Enter plan name, effective date, program/subprogram type, notes.
5. Update status or use quick actions: **Mark Active**, **Mark Inactive**, **Mark Unable To Verify**.
6. `verifiedAt` and `verifiedBy` recorded on terminal status changes.

### Database model

`InsuranceVerificationRequest` is persisted as JSON records at:

```
storage/insurance/queue/{id}.json
```

Fields: `id`, `clientName`, `dateOfBirth`, `medicaidIdEncrypted`, `ssnEncrypted`, `status`, `planName`, `effectiveDate`, `programType`, `subprogramType`, `notes`, `submittedAt`, `verifiedAt`, `verifiedBy`, plus non-PHI metadata (`email`, `phone`, `insuranceProvider`, etc.).

A `DATABASE_URL` ORM layer can replace file queue in a future phase; the model shape is stable for migration.

## Remaining blockers before live Medicaid integration

1. **`verifyWithClearinghouse()`** and **`verifyWithMesProviderApi()`** are stubs — they throw until real API contracts are implemented.
2. **`MEDICAID_LIVE_VERIFICATION_ENABLED=true`** must be set only after adapter implementation and credential review.
3. **No scraping** of `virginiamanagedcare.com` or public member portals — use approved provider/clearinghouse APIs only. See [live-verification-approved-sources.md](./live-verification-approved-sources.md).
4. **Staff notification** (email/Slack) on new queue items is not wired — staff must refresh admin queue or add webhook later.
5. **Production hosting** must secure `storage/insurance/` (encrypted volume, access controls) and rotate encryption keys per policy.
