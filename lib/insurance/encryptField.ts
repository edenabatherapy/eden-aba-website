import { decryptBuffer, encryptUtf8 } from "@/lib/intake/server/crypto";

function getEncryptionKey(): string | null {
  const key =
    process.env.INSURANCE_ENCRYPTION_KEY?.trim() ||
    process.env.INTAKE_ENCRYPTION_KEY?.trim();
  return key || null;
}

/** Encrypt a single PHI field (SSN, Medicaid ID) before database storage. */
export function encryptPhiField(value: string): string | null {
  const key = getEncryptionKey();
  if (!key || !value.trim()) return null;
  return encryptUtf8(value.trim(), key).toString("base64");
}

/** Decrypt a stored PHI field — staff/admin use only. */
export function decryptPhiField(encryptedBase64: string): string | null {
  const key = getEncryptionKey();
  if (!key || !encryptedBase64.trim()) return null;
  try {
    return decryptBuffer(Buffer.from(encryptedBase64, "base64"), key).toString("utf8");
  } catch {
    return null;
  }
}
