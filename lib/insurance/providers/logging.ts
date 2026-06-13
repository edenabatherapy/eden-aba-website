import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { cwd } from "node:process";

/** Provider error logging — never logs SSN, Medicaid ID, or DOB. */
export async function logProviderError(
  provider: string,
  message: string,
  context?: { statusCode?: number; memberName?: string },
) {
  const storagePath = process.env.INSURANCE_STORAGE_PATH || "./storage/insurance";
  const logPath = path.resolve(cwd(), storagePath, "_provider_errors.jsonl");

  await mkdir(path.dirname(logPath), { recursive: true });

  const entry = {
    provider,
    message,
    statusCode: context?.statusCode,
    memberInitial: context?.memberName?.trim()?.charAt(0) || undefined,
    timestamp: new Date().toISOString(),
  };

  await appendFile(logPath, `${JSON.stringify(entry)}\n`, "utf8");
}
