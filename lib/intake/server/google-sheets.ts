import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { cwd } from "node:process";
import { getIntakeConfig } from "./config";
import {
  getGoogleServiceAccountEmail,
  getGoogleSheetsAccessToken,
  getGoogleSheetsAuthIdentity,
  isGoogleSheetsConfigured,
  resolveGoogleSheetsAuthMethod,
} from "./google-credentials";
import type { IntakeSubmissionSummary } from "./submission-summary";
import { summaryToSheetRow } from "./submission-summary";

export {
  getGoogleServiceAccountEmail,
  getGoogleSheetsAuthIdentity,
  isGoogleSheetsConfigured,
  resolveGoogleSheetsAuthMethod,
};

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

export const GOOGLE_SHEETS_HEADER_ROW = [
  "Submission Date and Time",
  "Parent Name",
  "Child Name",
  "Age",
  "Diagnosis Status",
  "State",
  "City",
  "Service Type",
  "Goals",
  "Insurance Provider",
  "Phone Number",
  "Email Address",
  "Preferred Contact Method",
  "Confirmation ID",
  "Source",
];

export type GoogleSheetsAppendResult =
  | {
      ok: true;
      updatedRange?: string;
      updatedRows?: number;
      spreadsheetId: string;
      tabName: string;
    }
  | { ok: false; error: string };

async function appendSheetsDeliveryLog(entry: Record<string, unknown>) {
  const { storagePath } = getIntakeConfig();
  const logPath = path.resolve(cwd(), storagePath, "_sheets_delivery.jsonl");
  await mkdir(path.dirname(logPath), { recursive: true });
  await appendFile(logPath, `${JSON.stringify(entry)}\n`, "utf8");
}

async function getGoogleAccessToken(): Promise<string> {
  const { token, authMethod } = await getGoogleSheetsAccessToken();
  console.info("[intake-sheets] access token obtained", { authMethod });
  return token;
}

export async function appendIntakeSubmissionToGoogleSheet(
  summary: IntakeSubmissionSummary,
): Promise<GoogleSheetsAppendResult> {
  const { googleSheetsTabName } = getIntakeConfig();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() || "";

  if (!isGoogleSheetsConfigured()) {
    const authMethod = resolveGoogleSheetsAuthMethod();
    const message =
      "Google Sheets is not configured. Set GOOGLE_SHEETS_SPREADSHEET_ID plus one of: GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, a service account JSON key file, or Application Default Credentials (gcloud auth application-default login).";

    console.warn("[intake-sheets] skipped — not configured", {
      spreadsheetId: spreadsheetId || "(missing)",
      authMethod: authMethod || "(none)",
      authIdentity: getGoogleSheetsAuthIdentity(),
      tab: googleSheetsTabName,
    });

    return { ok: false, error: message };
  }

  const range = encodeURIComponent(`${googleSheetsTabName}!A:O`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  try {
    const accessToken = await getGoogleAccessToken();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [summaryToSheetRow(summary)],
      }),
    });

    const payload = (await response.json()) as {
      updates?: { updatedRange?: string; updatedRows?: number };
      error?: { message?: string; status?: string };
    };

    if (!response.ok) {
      const detail = payload.error?.message || `Google Sheets HTTP ${response.status}`;
      const failureRecord = {
        at: new Date().toISOString(),
        event: "append_failed",
        confirmationId: summary.confirmationId,
        source: summary.source,
        spreadsheetId,
        tab: googleSheetsTabName,
        status: response.status,
        authMethod: resolveGoogleSheetsAuthMethod(),
        error: detail,
      };

      console.error("[intake-sheets] append failed", failureRecord);

      try {
        await appendSheetsDeliveryLog(failureRecord);
      } catch (logError) {
        console.error("[intake-sheets] unable to write delivery log", {
          error: logError instanceof Error ? logError.message : "unknown",
        });
      }

      return { ok: false, error: detail };
    }

    const successRecord = {
      at: new Date().toISOString(),
      event: "append_succeeded",
      confirmationId: summary.confirmationId,
      source: summary.source,
      parentName: summary.parentName,
      childName: summary.childName,
      spreadsheetId,
      tab: googleSheetsTabName,
      updatedRange: payload.updates?.updatedRange,
      updatedRows: payload.updates?.updatedRows,
      sheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
      authMethod: resolveGoogleSheetsAuthMethod(),
    };

    console.info("[intake-sheets] saved submission to Google Sheet", successRecord);

    try {
      await appendSheetsDeliveryLog(successRecord);
    } catch (logError) {
      console.error("[intake-sheets] unable to write success log", {
        error: logError instanceof Error ? logError.message : "unknown",
        confirmationId: summary.confirmationId,
      });
    }

    return {
      ok: true,
      updatedRange: payload.updates?.updatedRange,
      updatedRows: payload.updates?.updatedRows,
      spreadsheetId,
      tabName: googleSheetsTabName,
    };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown Google Sheets error";
    const stack = error instanceof Error ? error.stack : undefined;

    console.error("[intake-sheets] exception", {
      confirmationId: summary.confirmationId,
      detail,
      stack,
      spreadsheetId,
      tab: googleSheetsTabName,
    });

    return { ok: false, error: detail };
  }
}

export async function verifyGoogleSheetsAccess(): Promise<
  | {
      ok: true;
      spreadsheetTitle: string;
      tabName: string;
      authMethod: NonNullable<ReturnType<typeof resolveGoogleSheetsAuthMethod>>;
      authIdentity: string;
    }
  | { ok: false; error: string; authMethod?: string; authIdentity?: string }
> {
  if (!isGoogleSheetsConfigured()) {
    return {
      ok: false,
      error: "Google Sheets credentials or spreadsheet ID are not configured.",
      authMethod: resolveGoogleSheetsAuthMethod() || undefined,
      authIdentity: getGoogleSheetsAuthIdentity(),
    };
  }

  const { googleSheetsTabName } = getIntakeConfig();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!.trim();
  const authMethod = resolveGoogleSheetsAuthMethod()!;
  const authIdentity = getGoogleSheetsAuthIdentity();

  try {
    const accessToken = await getGoogleAccessToken();
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=properties.title,sheets.properties.title`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const payload = (await response.json()) as {
      properties?: { title?: string };
      sheets?: Array<{ properties?: { title?: string } }>;
      error?: { message?: string };
    };

    if (!response.ok) {
      return {
        ok: false,
        error: payload.error?.message || `Google Sheets HTTP ${response.status}`,
        authMethod,
        authIdentity,
      };
    }

    const tabNames = payload.sheets?.map((sheet) => sheet.properties?.title).filter(Boolean) || [];
    if (!tabNames.includes(googleSheetsTabName)) {
      return {
        ok: false,
        error: `Tab "${googleSheetsTabName}" was not found. Existing tabs: ${tabNames.join(", ") || "(none)"}`,
        authMethod,
        authIdentity,
      };
    }

    return {
      ok: true,
      spreadsheetTitle: payload.properties?.title || spreadsheetId,
      tabName: googleSheetsTabName,
      authMethod,
      authIdentity,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown Google Sheets error",
      authMethod,
      authIdentity,
    };
  }
}
