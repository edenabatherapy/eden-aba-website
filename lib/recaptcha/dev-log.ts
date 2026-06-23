const isDevelopment = process.env.NODE_ENV === "development";

export function logRecaptchaDev(event: string, details?: Record<string, unknown>) {
  if (!isDevelopment) {
    return;
  }

  if (details) {
    console.log(`[recaptcha] ${event}`, details);
    return;
  }

  console.log(`[recaptcha] ${event}`);
}
