import { randomBytes } from "crypto";

/** Public confirmation ID — safe to show families and include in staff email. */
export function generateConfirmationId(): string {
  const date = new Date();
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const suffix = randomBytes(4).toString("hex").toUpperCase();
  return `EAT-INT-${y}${m}${d}-${suffix}`;
}
