import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { cwd } from "node:process";
import { getIntakeConfig } from "./config";
import { appendIntakeSubmissionToGoogleSheet } from "./google-sheets";
import { notifyStaffIntakeSubmitted } from "./notify";
import type { IntakeSubmissionSummary } from "./submission-summary";

export type IntakeDeliveryResult = {
  sheets: { ok: boolean; error?: string };
  email: { ok: boolean; error?: string };
  allSucceeded: boolean;
};

async function appendDeliveryFailure(entry: Record<string, unknown>) {
  const config = getIntakeConfig();
  const failurePath = path.resolve(cwd(), config.storagePath, "_delivery_failures.jsonl");
  await mkdir(path.dirname(failurePath), { recursive: true });
  await appendFile(failurePath, `${JSON.stringify(entry)}\n`, "utf8");
}

/**
 * Deliver intake summary to Google Sheets and staff email.
 * Failures are logged server-side only — encrypted storage is already complete.
 */
export async function deliverIntakeSubmission(
  summary: IntakeSubmissionSummary,
  fileCount = 0,
): Promise<IntakeDeliveryResult> {
  const sheetsResult = await appendIntakeSubmissionToGoogleSheet(summary);
  const emailResult = await notifyStaffIntakeSubmitted(summary, fileCount);

  const result: IntakeDeliveryResult = {
    sheets:
      sheetsResult.ok === false
        ? { ok: false, error: sheetsResult.error }
        : { ok: true },
    email: emailResult.sent ? { ok: true } : { ok: false, error: emailResult.reason },
    allSucceeded: sheetsResult.ok && emailResult.sent,
  };

  if (sheetsResult.ok) {
    console.info("[intake-delivery] Google Sheets row appended", {
      confirmationId: summary.confirmationId,
      source: summary.source,
      spreadsheetId: sheetsResult.spreadsheetId,
      tab: sheetsResult.tabName,
      updatedRange: sheetsResult.updatedRange,
      updatedRows: sheetsResult.updatedRows,
    });
  } else {
    console.error("[intake-delivery] Google Sheets delivery failed", {
      confirmationId: summary.confirmationId,
      source: summary.source,
      error: result.sheets.error,
      note: "Encrypted intake was saved — retry Sheets delivery from admin logs.",
    });
  }

  if (emailResult.sent) {
    console.info("[intake-delivery] staff email sent", {
      confirmationId: summary.confirmationId,
      source: summary.source,
    });
  } else {
    console.error("[intake-delivery] staff email delivery failed", {
      confirmationId: summary.confirmationId,
      source: summary.source,
      error: result.email.error,
      note: "Encrypted intake was saved — configure RESEND_API_KEY or retry manually.",
    });
  }

  if (!result.allSucceeded) {
    const failureRecord = {
      at: new Date().toISOString(),
      confirmationId: summary.confirmationId,
      source: summary.source,
      sheets: result.sheets,
      email: result.email,
    };

    console.error("[intake-delivery] partial or failed delivery (intake preserved)", failureRecord);

    try {
      await appendDeliveryFailure(failureRecord);
    } catch (logError) {
      console.error("[intake-delivery] unable to write delivery failure log", {
        error: logError instanceof Error ? logError.message : "unknown",
        stack: logError instanceof Error ? logError.stack : undefined,
        failureRecord,
      });
    }
  }

  return result;
}
