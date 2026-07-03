export const COOKIE_CONSENT_KEY = "eden-cookie-consent";
export const LEGACY_COOKIE_CONSENT_KEY = "eden_cookie_consent";

export type CookieCategoryId = "necessary" | "preferences" | "statistics" | "marketing";

export type CookieCategoryPreferences = {
  necessary: true;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
};

export type CookieConsentChoice = "accepted" | "essential-only" | "custom";

export type CookieConsentRecord = {
  version: 2;
  categories: CookieCategoryPreferences;
  choice: CookieConsentChoice;
  timestamp: string;
};

export const ALL_COOKIE_CATEGORIES_ACCEPTED: CookieCategoryPreferences = {
  necessary: true,
  preferences: true,
  statistics: true,
  marketing: true,
};

export const NECESSARY_ONLY_PREFERENCES: CookieCategoryPreferences = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
};

export const COOKIE_CONSENT_UPDATED_EVENT = "eden-cookie-consent-updated";

function isCategoryPreferences(value: unknown): value is CookieCategoryPreferences {
  if (!value || typeof value !== "object") return false;
  const record = value as CookieCategoryPreferences;
  return (
    record.necessary === true &&
    typeof record.preferences === "boolean" &&
    typeof record.statistics === "boolean" &&
    typeof record.marketing === "boolean"
  );
}

function legacyStatusFromCategories(categories: CookieCategoryPreferences): CookieConsentChoice {
  if (categories.statistics && categories.marketing && categories.preferences) {
    return "accepted";
  }
  if (!categories.preferences && !categories.statistics && !categories.marketing) {
    return "essential-only";
  }
  return "custom";
}

function legacyStorageValue(categories: CookieCategoryPreferences): string {
  return categories.statistics || categories.marketing || categories.preferences
    ? "accepted"
    : "essential-only";
}

function normalizeLegacyRecord(raw: {
  status?: CookieConsentChoice;
  categories?: CookieCategoryPreferences;
}): CookieConsentRecord | null {
  if (isCategoryPreferences(raw.categories)) {
    return {
      version: 2,
      categories: raw.categories,
      choice: legacyStatusFromCategories(raw.categories),
      timestamp: new Date().toISOString(),
    };
  }

  if (raw.status === "accepted") {
    return {
      version: 2,
      categories: { ...ALL_COOKIE_CATEGORIES_ACCEPTED },
      choice: "accepted",
      timestamp: new Date().toISOString(),
    };
  }

  if (raw.status === "essential-only") {
    return {
      version: 2,
      categories: { ...NECESSARY_ONLY_PREFERENCES },
      choice: "essential-only",
      timestamp: new Date().toISOString(),
    };
  }

  return null;
}

export function readCookieConsent(): CookieConsentRecord | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CookieConsentRecord & {
      status?: CookieConsentChoice;
      categories?: CookieCategoryPreferences;
    };

    if (parsed.version === 2 && isCategoryPreferences(parsed.categories)) {
      return {
        version: 2,
        categories: parsed.categories,
        choice: parsed.choice ?? legacyStatusFromCategories(parsed.categories),
        timestamp: parsed.timestamp ?? new Date().toISOString(),
      };
    }

    return normalizeLegacyRecord(parsed);
  } catch {
    return null;
  }
}

export function saveCookieConsent(categories: CookieCategoryPreferences): CookieConsentRecord {
  const record: CookieConsentRecord = {
    version: 2,
    categories: {
      necessary: true,
      preferences: Boolean(categories.preferences),
      statistics: Boolean(categories.statistics),
      marketing: Boolean(categories.marketing),
    },
    choice: legacyStatusFromCategories(categories),
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(record));
    localStorage.setItem(LEGACY_COOKIE_CONSENT_KEY, legacyStorageValue(record.categories));
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT, { detail: record }));
  }

  return record;
}

export function saveAcceptedAllCookieConsent(): CookieConsentRecord {
  return saveCookieConsent(ALL_COOKIE_CATEGORIES_ACCEPTED);
}

export function saveDeniedCookieConsent(): CookieConsentRecord {
  return saveCookieConsent(NECESSARY_ONLY_PREFERENCES);
}

export function hasCookieConsentChoice(): boolean {
  return Boolean(readCookieConsent());
}

export function hasStatisticsConsent(): boolean {
  return Boolean(readCookieConsent()?.categories.statistics);
}
