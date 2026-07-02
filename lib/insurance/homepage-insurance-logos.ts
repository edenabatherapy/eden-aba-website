export type HomepageInsuranceLogo = {
  id: string;
  name: string;
  src: string;
};

export type HomepageInsuranceLogoGroup = {
  id: "medicaid" | "commercial";
  label: string;
  logos: HomepageInsuranceLogo[];
};

/** Homepage Accepted Insurance grid — attached logo assets only. */
export const HOMEPAGE_INSURANCE_LOGO_GROUPS: HomepageInsuranceLogoGroup[] = [
  {
    id: "medicaid",
    label: "MEDICAID",
    logos: [
      {
        id: "virginia-medicaid",
        name: "Virginia Medicaid",
        src: "/assets/insurance/homepage/virginia-medicaid.png",
      },
      {
        id: "aetna-better-health-of-virginia",
        name: "Aetna Better Health of Virginia",
        src: "/assets/insurance/homepage/aetna-better-health-of-virginia.png",
      },
      {
        id: "anthem-healthkeepers-plus",
        name: "Anthem HealthKeepers Plus",
        src: "/assets/insurance/homepage/anthem-healthkeepers-plus.png",
      },
      {
        id: "humana-healthy-horizons-in-virginia",
        name: "Humana Healthy Horizons in Virginia",
        src: "/assets/insurance/homepage/humana-healthy-horizons-in-virginia.png",
      },
      {
        id: "sentara-community-plan",
        name: "Sentara Community Plan",
        src: "/assets/insurance/homepage/sentara-community-plan.png",
      },
      {
        id: "unitedhealthcare-community-plan",
        name: "UnitedHealthcare Community Plan",
        src: "/assets/insurance/homepage/unitedhealthcare-community-plan.png",
      },
    ],
  },
  {
    id: "commercial",
    label: "COMMERCIAL",
    logos: [
      {
        id: "aetna",
        name: "Aetna",
        src: "/assets/insurance/homepage/aetna.png",
      },
      {
        id: "anthem-blue-cross-blue-shield",
        name: "Anthem Blue Cross Blue Shield",
        src: "/assets/insurance/homepage/anthem-blue-cross-blue-shield.png",
      },
      {
        id: "blue-cross-blue-shield",
        name: "Blue Cross Blue Shield",
        src: "/assets/insurance/homepage/blue-cross-blue-shield.png",
      },
      {
        id: "cigna-healthcare",
        name: "Cigna Healthcare",
        src: "/assets/insurance/homepage/cigna-healthcare.png",
      },
      {
        id: "kaiser-permanente",
        name: "Kaiser Permanente",
        src: "/assets/insurance/homepage/kaiser-permanente.png",
      },
      {
        id: "sentara-health-plans",
        name: "Sentara Health Plans",
        src: "/assets/insurance/homepage/sentara-health-plans.png",
      },
      {
        id: "tricare",
        name: "TRICARE",
        src: "/assets/insurance/homepage/tricare.png",
      },
      {
        id: "unitedhealthcare",
        name: "UnitedHealthcare",
        src: "/assets/insurance/homepage/unitedhealthcare.png",
      },
    ],
  },
];

/** Flat homepage logo list — preserves Medicaid then commercial order. */
export const HOMEPAGE_INSURANCE_LOGOS: HomepageInsuranceLogo[] = HOMEPAGE_INSURANCE_LOGO_GROUPS.flatMap(
  (group) => group.logos,
);
