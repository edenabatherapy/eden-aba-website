export const ENTERPRISE_SERVICE_SLUGS = [
  "behavior-assessment",
  "individualized-aba-programs",
  "early-intervention-aba-therapy",
  "social-skills-training",
] as const;

export type EnterpriseServiceSlug = (typeof ENTERPRISE_SERVICE_SLUGS)[number];

/** Maps URL slug to `enterpriseServices` content key in locale partials. */
export const ENTERPRISE_SERVICE_CONTENT_KEYS: Record<EnterpriseServiceSlug, string> = {
  "behavior-assessment": "behaviorAssessment",
  "individualized-aba-programs": "individualizedAbaPrograms",
  "early-intervention-aba-therapy": "earlyInterventionAbaTherapy",
  "social-skills-training": "socialSkillsTraining",
};

export const ENTERPRISE_SERVICE_IMAGE_INDEX: Record<EnterpriseServiceSlug, number> = {
  "behavior-assessment": 4,
  "individualized-aba-programs": 5,
  "early-intervention-aba-therapy": 3,
  "social-skills-training": 6,
};
