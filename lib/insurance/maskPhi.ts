/** Mask SSN for logs — last 4 only. Example: *****6789 */
export function maskSsn(ssn?: string): string | undefined {
  if (!ssn?.trim()) return undefined;
  const digits = ssn.replace(/\D/g, "");
  if (digits.length < 4) return "*****";
  const last4 = digits.slice(-4);
  return `${"*".repeat(Math.max(digits.length - 4, 5))}${last4}`;
}

/** Mask SSN for admin UI — Example: ***-**-6789 */
export function maskSsnForDisplay(ssn?: string): string | undefined {
  if (!ssn?.trim()) return undefined;
  const digits = ssn.replace(/\D/g, "");
  if (digits.length < 4) return "***-**-****";
  return `***-**-${digits.slice(-4)}`;
}

/** Mask Medicaid ID for logs and admin UI — Example: 123456789 → *****6789 */
export function maskMedicaidId(medicaidId?: string): string | undefined {
  if (!medicaidId?.trim()) return undefined;
  const value = medicaidId.trim();
  if (value.length <= 4) return "****";
  const last4 = value.slice(-4);
  return `${"*".repeat(Math.max(value.length - 4, 5))}${last4}`;
}

/** Mask phone for logs — last 4 digits only. */
export function maskPhone(phone?: string): string | undefined {
  if (!phone?.trim()) return undefined;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return "*****";
  return `${"*".repeat(Math.max(digits.length - 4, 5))}${digits.slice(-4)}`;
}

/** Redact PHI fields from objects before logging or analytics. */
export function redactVerificationRequest<T extends Record<string, unknown>>(record: T): T {
  return {
    ...record,
    ...(record.ssn !== undefined ? { ssn: maskSsn(String(record.ssn)) } : {}),
    ...(record.medicaidId !== undefined
      ? { medicaidId: maskMedicaidId(String(record.medicaidId)) }
      : {}),
    ...(record.phone !== undefined ? { phone: maskPhone(String(record.phone)) } : {}),
    ...(record.dateOfBirth !== undefined ? { dateOfBirth: "[REDACTED]" } : {}),
  };
}
