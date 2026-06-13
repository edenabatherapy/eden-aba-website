const MIN_TOKEN_LENGTH = 32;
const MIN_ENCRYPTION_KEY_LENGTH = 32;
const HEX_KEY_LENGTH = 64;

export function getInsuranceConfig() {
  const encryptionKey =
    process.env.INSURANCE_ENCRYPTION_KEY?.trim() ||
    process.env.INTAKE_ENCRYPTION_KEY?.trim() ||
    "";
  const staffAdminToken = process.env.INSURANCE_STAFF_ADMIN_TOKEN?.trim() || "";
  const storagePath = process.env.INSURANCE_STORAGE_PATH?.trim() || "./storage/insurance";
  const sessionTtlSeconds = Number(
    process.env.INSURANCE_ADMIN_SESSION_TTL_SECONDS || 8 * 60 * 60,
  );
  const notificationChannels =
    process.env.INSURANCE_NOTIFICATION_CHANNELS?.trim() || "email";
  const staffNotificationEmail =
    process.env.INSURANCE_STAFF_NOTIFICATION_EMAIL?.trim() ||
    process.env.INTAKE_STAFF_NOTIFICATION_EMAIL?.trim() ||
    "intake@edenabatherapy.com";
  const notificationFromEmail =
    process.env.INSURANCE_NOTIFICATION_FROM_EMAIL?.trim() ||
    process.env.INTAKE_NOTIFICATION_FROM_EMAIL?.trim() ||
    "notifications@edenabatherapy.com";
  const resendApiKey = process.env.RESEND_API_KEY?.trim() || "";
  const slackWebhookUrl = process.env.INSURANCE_SLACK_WEBHOOK_URL?.trim() || "";

  return {
    encryptionKey,
    staffAdminToken,
    storagePath,
    sessionTtlSeconds,
    notificationChannels,
    staffNotificationEmail,
    notificationFromEmail,
    resendApiKey,
    slackWebhookUrl,
  };
}

export function validateEncryptionKey(key: string): { valid: boolean; error?: string } {
  if (!key) {
    return {
      valid: false,
      error:
        "INTAKE_ENCRYPTION_KEY (or INSURANCE_ENCRYPTION_KEY) is required. Generate with: openssl rand -hex 32",
    };
  }

  if (/^[0-9a-fA-F]{64}$/.test(key)) {
    return { valid: true };
  }

  if (key.length < MIN_ENCRYPTION_KEY_LENGTH) {
    return {
      valid: false,
      error: `Encryption key must be at least ${MIN_ENCRYPTION_KEY_LENGTH} characters or ${HEX_KEY_LENGTH} hex characters (32 bytes).`,
    };
  }

  return { valid: true };
}

export function validateAdminToken(token: string): { valid: boolean; error?: string } {
  if (!token) {
    return {
      valid: false,
      error:
        "INSURANCE_STAFF_ADMIN_TOKEN is required. Generate with: openssl rand -hex 32",
    };
  }

  if (token.length < MIN_TOKEN_LENGTH) {
    return {
      valid: false,
      error: `INSURANCE_STAFF_ADMIN_TOKEN must be at least ${MIN_TOKEN_LENGTH} characters.`,
    };
  }

  return { valid: true };
}

export function assertInsuranceProductionReady(): void {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const { encryptionKey, staffAdminToken } = getInsuranceConfig();
  const errors: string[] = [];

  const keyCheck = validateEncryptionKey(encryptionKey);
  if (!keyCheck.valid) {
    errors.push(`[Insurance] ${keyCheck.error}`);
  }

  const tokenCheck = validateAdminToken(staffAdminToken);
  if (!tokenCheck.valid) {
    errors.push(`[Insurance] ${tokenCheck.error}`);
  }

  if (errors.length > 0) {
    const message = [
      "Insurance verification production startup failed:",
      ...errors,
      "Set missing values in environment variables before deploying.",
    ].join("\n");

    console.error(message);
    throw new Error(message);
  }

  console.info("[Insurance] Production environment validation passed.");
}
