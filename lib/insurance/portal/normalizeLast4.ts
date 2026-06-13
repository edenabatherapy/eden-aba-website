/** Portal last-4: trim, strip spaces, uppercase, take last 4 characters. */
export function normalizeLast4(value: string): string {
  return value.replace(/\s+/g, "").trim().toUpperCase().slice(-4);
}

export function normalizeProvidedLastFour(input: string): string | null {
  const normalized = normalizeLast4(input);
  return normalized.length === 4 ? normalized : null;
}
