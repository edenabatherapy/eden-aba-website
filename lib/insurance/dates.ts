const MM_DD_YYYY = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})$/;
const FLEX_MM_DD_YYYY = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
const ISO_DATE = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

function isValidCalendarDate(year: number, month: number, day: number): boolean {
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/**
 * Parse DOB as US format MM/DD/YYYY or storage format YYYY-MM-DD.
 * Returns canonical storage value YYYY-MM-DD (never swaps month and day).
 */
export function normalizeDOB(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const usMatch = trimmed.match(MM_DD_YYYY);
  if (usMatch) {
    const month = Number(usMatch[1]);
    const day = Number(usMatch[2]);
    const year = Number(usMatch[3]);
    if (!isValidCalendarDate(year, month, day)) return null;
    return `${String(year).padStart(4, "0")}-${usMatch[1]}-${usMatch[2]}`;
  }

  const flexMatch = trimmed.match(FLEX_MM_DD_YYYY);
  if (flexMatch) {
    const month = Number(flexMatch[1]);
    const day = Number(flexMatch[2]);
    const year = Number(flexMatch[3]);
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    if (!isValidCalendarDate(year, month, day)) return null;
    return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  const isoMatch = trimmed.match(ISO_DATE);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]);
    const day = Number(isoMatch[3]);
    if (!isValidCalendarDate(year, month, day)) return null;
    return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
  }

  return null;
}

/** Display DOB as MM/DD/YYYY for UI and API responses shown to families. */
export function formatDOBForDisplay(input: string): string {
  const normalized = normalizeDOB(input);
  if (!normalized) return input.trim();
  const [year, month, day] = normalized.split("-");
  return `${month}/${day}/${year}`;
}

export function validateDOB(input: string): { valid: boolean; error?: string } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { valid: false, error: "Date of birth is required." };
  }

  if (!MM_DD_YYYY.test(trimmed) && !FLEX_MM_DD_YYYY.test(trimmed) && !ISO_DATE.test(trimmed)) {
    return {
      valid: false,
      error: "Date of birth must be in MM/DD/YYYY format.",
    };
  }

  if (!normalizeDOB(trimmed)) {
    return { valid: false, error: "Please enter a valid date of birth." };
  }

  return { valid: true };
}
