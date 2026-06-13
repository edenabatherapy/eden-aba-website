export const COOKIE_CONSENT_KEY = "eden-cookie-consent";

export type CookieConsentChoice = "accepted" | "essential-only";

export type CookieConsentRecord = {
  status: CookieConsentChoice;
  timestamp: string;
};

export function readCookieConsent(): CookieConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsentRecord;
  } catch {
    return null;
  }
}

export function saveCookieConsent(status: CookieConsentChoice): CookieConsentRecord {
  const record: CookieConsentRecord = {
    status,
    timestamp: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(record));
  }
  return record;
}

export function hasCookieConsentChoice(): boolean {
  return Boolean(readCookieConsent());
}
