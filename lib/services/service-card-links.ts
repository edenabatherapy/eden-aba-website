/** Homepage service card order matches `home.services` in locale files. */
export const HOME_SERVICE_CARD_HREFS = [
  "/services/school-support-aba-therapy",
  "/services/home-based-aba-therapy",
  "/services/center-based-aba-therapy",
  "/services/early-intervention-aba-therapy",
  "/services/behavior-assessment",
  "/services/individualized-aba-programs",
  "/services/social-skills-training",
  "/services/parent-training-support",
] as const;

export type HomeServiceCardHref = (typeof HOME_SERVICE_CARD_HREFS)[number];
