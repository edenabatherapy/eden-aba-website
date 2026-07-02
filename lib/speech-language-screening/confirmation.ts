import { randomBytes } from "crypto";

/** Public confirmation ID for speech & language screening submissions. */
export function generateSpeechLanguageScreeningConfirmationId(): string {
  const date = new Date();
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const suffix = randomBytes(3).toString("hex").toUpperCase();
  return `EAT-SLP-${y}${m}${d}-${suffix}`;
}
