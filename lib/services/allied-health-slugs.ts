export const ALLIED_HEALTH_SLUGS = [
  "occupational-therapy",
  "speech-language-therapy",
  "feeding-swallowing-therapy",
] as const;

export type AlliedHealthSlug = (typeof ALLIED_HEALTH_SLUGS)[number];

export const ALLIED_HEALTH_CONTENT_KEYS: Record<AlliedHealthSlug, string> = {
  "occupational-therapy": "occupationalTherapy",
  "speech-language-therapy": "speechLanguageTherapy",
  "feeding-swallowing-therapy": "feedingSwallowingTherapy",
};

export const ALLIED_HEALTH_MENU_LABELS: Record<AlliedHealthSlug, string> = {
  "occupational-therapy": "Occupational Therapy",
  "speech-language-therapy": "Speech & Language Therapy",
  "feeding-swallowing-therapy": "Feeding & Swallowing Therapy",
};
