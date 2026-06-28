/** Canonical homepage insurance ticker — exactly 13 unique payer names, fixed order. */
export const INSURANCE_TICKER_PLANS = [
  "Virginia Medicaid",
  "Aetna",
  "Aetna Better Health",
  "Anthem HealthKeepers Plus",
  "Blue Cross Blue Shield",
  "Cigna",
  "Kaiser Permanente",
  "MedStar Family Choice",
  "Molina Healthcare",
  "Sentara Health Plans",
  "TRICARE",
  "UMR",
  "UnitedHealthcare",
] as const;

export type InsuranceTickerPlan = (typeof INSURANCE_TICKER_PLANS)[number];
