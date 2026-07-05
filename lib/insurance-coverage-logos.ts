export type InsuranceCoverageLogo = {
  id: string;
  name: string;
  src: string;
  /** Slightly smaller logo asset for dense layouts */
  compact?: boolean;
  /** Apply subtle contrast boost for light marks on white */
  contrastBoost?: boolean;
};

/** Insurance Coverage page — 14 Virginia Medicaid, MCO, and commercial plan logos. */
export const INSURANCE_COVERAGE_PAGE_LOGOS: InsuranceCoverageLogo[] = [
  {
    id: "virginia-medicaid",
    name: "Virginia Medicaid",
    src: "/images/insurance/virginia-medicaid.png",
  },
  {
    id: "aetna",
    name: "Aetna",
    src: "/images/insurance/aetna.png",
  },
  {
    id: "aetna-better-health-of-virginia",
    name: "Aetna Better Health of Virginia",
    src: "/images/insurance/aetna-better-health-of-virginia.png",
  },
  {
    id: "anthem-blue-cross-blue-shield",
    name: "Anthem Blue Cross Blue Shield",
    src: "/images/insurance/anthem-blue-cross-blue-shield.png",
    compact: true,
  },
  {
    id: "anthem-healthkeepers-plus",
    name: "Anthem HealthKeepers Plus",
    src: "/images/insurance/anthem-healthkeepers-plus.png",
    compact: true,
  },
  {
    id: "blue-cross-blue-shield",
    name: "Blue Cross Blue Shield",
    src: "/images/insurance/blue-cross-blue-shield.png",
    compact: true,
  },
  {
    id: "cigna-healthcare",
    name: "Cigna Healthcare",
    src: "/images/insurance/cigna-healthcare.png",
  },
  {
    id: "humana-healthy-horizons-in-virginia",
    name: "Humana Healthy Horizons in Virginia",
    src: "/images/insurance/humana-healthy-horizons-in-virginia.png",
    compact: true,
  },
  {
    id: "kaiser-permanente",
    name: "Kaiser Permanente",
    src: "/images/insurance/kaiser-permanente.png",
  },
  {
    id: "sentara-health-plans",
    name: "Sentara Health Plans",
    src: "/images/insurance/sentara-health-plans.png",
    compact: true,
  },
  {
    id: "sentara-community-plan",
    name: "Sentara Community Plan",
    src: "/images/insurance/sentara-community-plan.png",
    compact: true,
  },
  {
    id: "tricare",
    name: "TRICARE",
    src: "/images/insurance/tricare.png",
    contrastBoost: true,
  },
  {
    id: "unitedhealthcare",
    name: "UnitedHealthcare",
    src: "/images/insurance/unitedhealthcare.png",
  },
  {
    id: "unitedhealthcare-community-plan",
    name: "UnitedHealthcare Community Plan",
    src: "/images/insurance/unitedhealthcare-community-plan.png",
    compact: true,
  },
];

/** Legacy default list — used by other sections; unchanged for non-coverage pages. */
export const INSURANCE_COVERAGE_LOGOS: InsuranceCoverageLogo[] = [
  { id: "aetna-legacy", name: "Aetna", src: "/assets/insurance/aetna-1.png" },
  {
    id: "aetna-better-health-legacy",
    name: "Aetna Better Health",
    src: "/assets/insurance/aetna-better-health.png",
  },
  {
    id: "anthem-healthkeepers-legacy",
    name: "Anthem HealthKeepers Plus",
    src: "/assets/insurance/anthem-healthkeepers.png",
    compact: true,
  },
  { id: "bcbs-legacy", name: "Blue Cross Blue Shield", src: "/assets/insurance/bcbs-4.png" },
  { id: "cigna-legacy", name: "Cigna", src: "/assets/insurance/cigna.png" },
  { id: "kaiser-legacy", name: "Kaiser Permanente", src: "/assets/insurance/kaiser-permanente.png" },
  {
    id: "medstar-legacy",
    name: "MedStar Family Choice",
    src: "/images/insurance/medstar-family-choice.svg",
  },
  {
    id: "molina-legacy",
    name: "Molina Healthcare",
    src: "/images/insurance/molina-healthcare.png",
    compact: true,
  },
  { id: "sentara-legacy", name: "Sentara", src: "/images/insurance/sentara.png" },
  { id: "tricare-legacy", name: "TRICARE", src: "/images/insurance/tricare.png", contrastBoost: true },
  { id: "umr-legacy", name: "UMR", src: "/assets/insurance/umr.png", contrastBoost: true },
  {
    id: "unitedhealthcare-legacy",
    name: "UnitedHealthcare",
    src: "/images/insurance/united-healthcare.png",
  },
];

export const INSURANCE_COVERAGE_PAGE_DISCLAIMER =
  "Eden ABA Therapy is preparing to work with major Virginia Medicaid, MCO, and commercial insurance plans. Coverage and authorization depend on payer requirements, credentialing status, eligibility, and medical necessity.";
