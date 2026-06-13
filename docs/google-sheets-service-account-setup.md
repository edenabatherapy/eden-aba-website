# Google Sheets service account setup (Eden ABA intake)

This project logs **completed intake submissions** to Google Sheets. The Eden chatbot (`/api/eden-chat`) uses OpenAI only — it does **not** use Google Sheets.

Intake routes that append rows:

- `POST /api/intake` (advanced intake form)
- `POST /api/start-aba-therapy` (homepage interest form)

Code: `lib/intake/server/google-sheets.ts` · Test: `npm run test:google-sheets`

### Auth methods (priority order)

1. **`env_private_key`** — `GOOGLE_SERVICE_ACCOUNT_EMAIL` + `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` in `.env.local`
2. **`json_key`** — service account JSON at `secrets/google-sheets-service-account.json`
3. **`adc`** — Application Default Credentials (no downloadable key required)

Use **ADC** when your organization blocks service account key creation (`iam.disableServiceAccountKeyCreation`).

```bash
gcloud auth application-default login --scopes=https://www.googleapis.com/auth/spreadsheets
```

Your signed-in Google account must have **Editor** access to the spreadsheet. Logs show `[intake-sheets] authenticating { authMethod: "adc", ... }`.

---

## 1. Create a Google Cloud project

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Click the project picker (top bar) → **New project**.
3. Name it (e.g. `eden-aba-intake`) → **Create**.
4. Select the new project from the picker so it is active.

---

## 2. Enable the Google Sheets API

1. In Cloud Console: **APIs & Services** → **Library**.
2. Search for **Google Sheets API**.
3. Open it → **Enable**.

No billing is required for typical intake volume, but Google may prompt you to link a billing account to the project.

---

## 3. Create a service account

1. **APIs & Services** → **Credentials**.
2. **Create credentials** → **Service account**.
3. Service account name: `eden-intake-sheets` (or similar).
4. Service account ID: auto-filled (e.g. `eden-intake-sheets`).
5. Click **Create and continue**.
6. Role: optional for Sheets-only access (sharing the spreadsheet with the service account is what grants access). You can skip roles → **Done**.

---

## 4. Generate a JSON credentials file

1. **APIs & Services** → **Credentials**.
2. Under **Service accounts**, click `eden-intake-sheets@…`.
3. **Keys** tab → **Add key** → **Create new key** → **JSON** → **Create**.
4. A `.json` file downloads. Keep it private — treat it like a password.

**Install the key in this repo (recommended):**

```bash
# From project root — rename your downloaded file to:
mv ~/Downloads/your-project-*.json secrets/google-sheets-service-account.json
```

The file is gitignored. A template lives at `secrets/google-sheets-service-account.json.example`.

---

## 5. Values from the JSON → `.env.local`

Open the downloaded JSON. It looks like:

```json
{
  "type": "service_account",
  "project_id": "your-gcp-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "eden-intake-sheets@your-gcp-project-id.iam.gserviceaccount.com",
  "client_id": "...",
  ...
}
```

### Option A — Key file (recommended)

Set only spreadsheet settings in `.env.local`. The app reads `client_email` and `private_key` from the JSON automatically:

```env
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id-from-url
GOOGLE_SHEETS_TAB_NAME=Intake Submissions
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=secrets/google-sheets-service-account.json
```

You do **not** need to copy `private_key` into `.env.local` when using Option A.

### Option B — Environment variables

Copy two fields from the JSON into `.env.local`:

| JSON field     | `.env.local` variable              |
|----------------|------------------------------------|
| `client_email` | `GOOGLE_SERVICE_ACCOUNT_EMAIL`     |
| `private_key`  | `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` |

Example (use your real values; keep the key on one line with `\n` for line breaks):

```env
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id-from-url
GOOGLE_SHEETS_TAB_NAME=Intake Submissions
GOOGLE_SERVICE_ACCOUNT_EMAIL=eden-intake-sheets@your-gcp-project-id.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Spreadsheet ID:** from the sheet URL:

`https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`

Other JSON fields (`project_id`, `client_id`, `private_key_id`, etc.) are **not** used by this app.

---

## 6. Service account email (share the Google Sheet)

The email you share with is the **`client_email`** value from the JSON. It always ends with:

`.iam.gserviceaccount.com`

Example format:

`eden-intake-sheets@your-gcp-project-id.iam.gserviceaccount.com`

**Share the spreadsheet:**

1. Open your Google Sheet.
2. **Share** → paste the `client_email` → role **Editor** → **Send** (uncheck “Notify people” if you prefer).

To print your exact email after placing the key file:

```bash
npm run test:google-sheets
```

The script shows `Service account: …@….iam.gserviceaccount.com` without printing any private key.

---

## 7. Prepare the spreadsheet tab

Create a tab named **`Intake Submissions`** (or set `GOOGLE_SHEETS_TAB_NAME` to match your tab).

Row 1 headers (exact order):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Submission Date and Time | Parent Name | Child Name | Age | Diagnosis Status | State | City | Service Type | Goals | Insurance Provider | Phone Number | Email Address | Preferred Contact Method | Confirmation ID | Source |

---

## 8. Verify the integration

Restart the dev server after changing `.env.local`:

```bash
npm run dev
```

Run the test script:

```bash
# Check credentials + sheet access (no row written)
npm run test:google-sheets

# Append a safe test row you can delete
npm run test:google-sheets:append
```

Success indicators:

- Console: `[intake-sheets] saved submission to Google Sheet`
- Log file: `storage/intake/_sheets_delivery.jsonl`
- New row in your Google Sheet

If access fails, confirm:

- Google Sheets API is enabled
- Spreadsheet ID is correct
- Tab name matches `GOOGLE_SHEETS_TAB_NAME`
- Sheet is shared with the service account **Editor** email

---

## Security notes

- Never commit `secrets/google-sheets-service-account.json` or paste `private_key` into chat, tickets, or git.
- Restrict who can read `.env.local` on servers.
- Rotate keys in GCP if a key is exposed: delete the old key, create a new JSON key, redeploy.
