export type InsuranceCoverageLogo = {
  name: string;
  src: string;
  /** Slightly smaller logo asset for dense layouts */
  compact?: boolean;
  /** Apply subtle contrast boost for light marks on white */
  contrastBoost?: boolean;
};

/** One canonical logo per payer — used on the Insurance Coverage page and homepage toolbox. */
export const INSURANCE_COVERAGE_LOGOS: InsuranceCoverageLogo[] = [
  { name: "Aetna", src: "/assets/insurance/aetna-1.png" },
  { name: "Aetna Better Health", src: "/assets/insurance/aetna-better-health.png" },
  { name: "Anthem HealthKeepers Plus", src: "/assets/insurance/anthem-healthkeepers.png", compact: true },
  { name: "Blue Cross Blue Shield", src: "/assets/insurance/bcbs-4.png" },
  { name: "Cigna", src: "/assets/insurance/cigna.png" },
  { name: "Kaiser Permanente", src: "/assets/insurance/kaiser-permanente.png" },
  { name: "MedStar Family Choice", src: "/images/insurance/medstar-family-choice.svg" },
  { name: "Molina Healthcare", src: "/images/insurance/molina-healthcare.png", compact: true },
  { name: "Sentara", src: "/images/insurance/sentara.png" },
  { name: "TRICARE", src: "/images/insurance/tricare.png", contrastBoost: true },
  { name: "UMR", src: "/assets/insurance/umr.png", contrastBoost: true },
  { name: "UnitedHealthcare", src: "/images/insurance/united-healthcare.png" },
];
