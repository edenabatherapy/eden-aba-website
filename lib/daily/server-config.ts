/** Server-only Daily.co configuration. Never import from client components. */

export function getDailyApiKey(): string | null {
  const apiKey = process.env.DAILY_API_KEY?.trim();
  return apiKey || null;
}

export function isDailyConfigured(): boolean {
  return Boolean(getDailyApiKey());
}
