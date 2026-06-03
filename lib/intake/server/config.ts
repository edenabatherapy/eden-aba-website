/**
 * Intake backend configuration from environment variables.
 *
 * HIPAA note: Production deployment still requires organizational controls —
 * access policies, audit log review, retention schedules, breach procedures,
 * and signed BAAs with hosting/email/storage vendors.
 */

export function getIntakeConfig() {
  const encryptionKey = process.env.INTAKE_ENCRYPTION_KEY?.trim() || "";
  const storagePath = process.env.INTAKE_STORAGE_PATH?.trim() || "./storage/intake";
  const databaseUrl = process.env.DATABASE_URL?.trim() || "";
  const resendApiKey = process.env.RESEND_API_KEY?.trim() || "";
  const staffEmail =
    process.env.INTAKE_STAFF_NOTIFICATION_EMAIL?.trim() || "intake@edenabatherapy.com";
  const fromEmail =
    process.env.INTAKE_NOTIFICATION_FROM_EMAIL?.trim() || "notifications@edenabatherapy.com";

  return {
    encryptionKey,
    storagePath,
    databaseUrl,
    resendApiKey,
    staffEmail,
    fromEmail,
    maxFileBytes: Number(process.env.INTAKE_MAX_FILE_BYTES || 10 * 1024 * 1024),
    maxTotalBytes: Number(process.env.INTAKE_MAX_TOTAL_BYTES || 50 * 1024 * 1024),
  };
}

export function assertIntakeBackendReady() {
  const { encryptionKey } = getIntakeConfig();
  if (!encryptionKey || encryptionKey.length < 32) {
    throw new Error(
      "INTAKE_ENCRYPTION_KEY is not configured. Set a 32+ character secret in .env.local before accepting intake submissions."
    );
  }
}
