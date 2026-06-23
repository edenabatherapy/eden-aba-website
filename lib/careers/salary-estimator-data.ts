export type SalaryRoleType = "bt" | "rbt" | "senior-rbt" | "lead-rbt" | "bcba";
export type SalaryEmploymentType = "full-time" | "part-time";
export type SalaryExperienceLevel = "entry" | "mid" | "experienced";
export type SalaryGeographicArea = "annandale-nova" | "arlington-alexandria" | "fairfax-loudoun" | "prince-william";

export const SALARY_ESTIMATOR_ROLES: { id: SalaryRoleType; label: string; isSalary: boolean }[] = [
  { id: "bt", label: "Behavior Technician (BT)", isSalary: false },
  { id: "rbt", label: "Registered Behavior Technician (RBT)", isSalary: false },
  { id: "senior-rbt", label: "Senior RBT", isSalary: false },
  { id: "lead-rbt", label: "Lead RBT", isSalary: false },
  { id: "bcba", label: "Board Certified Behavior Analyst (BCBA)", isSalary: true },
];

export const SALARY_ESTIMATOR_EMPLOYMENT = [
  { id: "full-time" as const, label: "Full-Time" },
  { id: "part-time" as const, label: "Part-Time" },
];

export const SALARY_ESTIMATOR_EXPERIENCE = [
  { id: "entry" as const, label: "Entry / New to role" },
  { id: "mid" as const, label: "Mid-level (1–3 years)" },
  { id: "experienced" as const, label: "Experienced (3+ years)" },
];

export const SALARY_ESTIMATOR_GEOGRAPHY = [
  { id: "annandale-nova" as const, label: "Annandale & Northern Virginia hub" },
  { id: "arlington-alexandria" as const, label: "Arlington & Alexandria" },
  { id: "fairfax-loudoun" as const, label: "Fairfax & Loudoun County" },
  { id: "prince-william" as const, label: "Prince William County" },
];

/** Informational hourly/salary ranges — not offers or guarantees. */
const HOURLY_BASE: Record<SalaryRoleType, { min: number; max: number }> = {
  bt: { min: 18, max: 22 },
  rbt: { min: 20, max: 26 },
  "senior-rbt": { min: 24, max: 30 },
  "lead-rbt": { min: 26, max: 33 },
  bcba: { min: 42, max: 55 },
};

const ANNUAL_BASE: Record<"bcba", { min: number; max: number }> = {
  bcba: { min: 72000, max: 95000 },
};

const EXPERIENCE_MULTIPLIER: Record<SalaryExperienceLevel, number> = {
  entry: 1,
  mid: 1.07,
  experienced: 1.14,
};

const GEO_MULTIPLIER: Record<SalaryGeographicArea, number> = {
  "annandale-nova": 1,
  "arlington-alexandria": 1.05,
  "fairfax-loudoun": 1.03,
  "prince-william": 0.98,
};

const EMPLOYMENT_MULTIPLIER: Record<SalaryEmploymentType, number> = {
  "full-time": 1,
  "part-time": 0.97,
};

export type SalaryEstimateResult = {
  roleLabel: string;
  isSalary: boolean;
  min: number;
  max: number;
  midpoint: number;
  displayMin: string;
  displayMax: string;
  displayMid: string;
  annualEstimate?: string;
  factors: string[];
};

export function calculateSalaryEstimate(input: {
  role: SalaryRoleType;
  employment: SalaryEmploymentType;
  experience: SalaryExperienceLevel;
  geography: SalaryGeographicArea;
}): SalaryEstimateResult {
  const roleMeta = SALARY_ESTIMATOR_ROLES.find((r) => r.id === input.role)!;
  const exp = EXPERIENCE_MULTIPLIER[input.experience];
  const geo = GEO_MULTIPLIER[input.geography];
  const emp = EMPLOYMENT_MULTIPLIER[input.employment];

  const factors = [
    `${roleMeta.label}`,
    SALARY_ESTIMATOR_EMPLOYMENT.find((e) => e.id === input.employment)?.label ?? "",
    SALARY_ESTIMATOR_EXPERIENCE.find((e) => e.id === input.experience)?.label ?? "",
    SALARY_ESTIMATOR_GEOGRAPHY.find((g) => g.id === input.geography)?.label ?? "",
  ];

  if (input.role === "bcba") {
    const base = ANNUAL_BASE.bcba;
    const min = Math.round(base.min * exp * geo * emp);
    const max = Math.round(base.max * exp * geo * emp);
    const midpoint = Math.round((min + max) / 2);
    return {
      roleLabel: roleMeta.label,
      isSalary: true,
      min,
      max,
      midpoint,
      displayMin: formatCurrency(min),
      displayMax: formatCurrency(max),
      displayMid: formatCurrency(midpoint),
      annualEstimate: `${formatCurrency(min)} – ${formatCurrency(max)} / year`,
      factors,
    };
  }

  const base = HOURLY_BASE[input.role];
  const min = roundToHalf(base.min * exp * geo * emp);
  const max = roundToHalf(base.max * exp * geo * emp);
  const midpoint = roundToHalf((min + max) / 2);
  const annualLow = Math.round(min * 40 * 52);
  const annualHigh = Math.round(max * 40 * 52);

  return {
    roleLabel: roleMeta.label,
    isSalary: false,
    min,
    max,
    midpoint,
    displayMin: `$${min.toFixed(2)}`,
    displayMax: `$${max.toFixed(2)}`,
    displayMid: `$${midpoint.toFixed(2)}`,
    annualEstimate:
      input.employment === "full-time"
        ? `~${formatCurrency(annualLow)} – ${formatCurrency(annualHigh)} / year at 40 hrs/week`
        : `Hourly rate; annual total varies by scheduled hours`,
    factors,
  };
}

function roundToHalf(n: number) {
  return Math.round(n * 2) / 2;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export const SALARY_BENEFITS_COMPARISON = [
  {
    benefit: "Health & wellness",
    fullTime: "May be eligible for medical, dental, vision, and EAP resources",
    partTime: "Eligibility may vary by hours and classification",
  },
  {
    benefit: "Paid time off",
    fullTime: "Accrued PTO, holidays, and sick leave where applicable",
    partTime: "PTO accrual may differ; review role-specific details",
  },
  {
    benefit: "Clinical supervision",
    fullTime: "Structured supervision and mentorship for clinical roles",
    partTime: "Supervision aligned to caseload and credential requirements",
  },
  {
    benefit: "Professional development",
    fullTime: "Onboarding, CEU culture, and pathway planning",
    partTime: "Training and development where role-eligible",
  },
  {
    benefit: "Referral incentives",
    fullTime: "Employee referral rewards when hiring criteria are met",
    partTime: "Referral program may apply; confirm with recruiting",
  },
];

export const COMPENSATION_PHILOSOPHY = {
  intro:
    "Eden approaches compensation as one part of a total rewards strategy—designed to support ethical, family-centered care while recognizing credential level, experience, reliability, and regional market factors across Northern Virginia.",
  pillars: [
    {
      title: "Role-based pay bands",
      description:
        "Compensation reflects credential requirements, clinical responsibility, supervision scope, and the complexity of each role—from direct care through BCBA leadership.",
    },
    {
      title: "Performance & reliability",
      description:
        "Consistent attendance, treatment fidelity, documentation quality, and professional communication contribute to advancement conversations and recognition.",
    },
    {
      title: "Transparent growth planning",
      description:
        "Recruiting and leadership teams discuss pathway expectations openly—without guaranteeing promotion timelines or specific future pay amounts.",
    },
    {
      title: "Regional awareness",
      description:
        "Northern Virginia market factors, travel between service areas, and caseload structure may influence role-specific compensation discussions.",
    },
  ],
};

export const SALARY_ESTIMATOR_DISCLAIMER =
  "Salary estimates shown are for informational and exploratory purposes only. They do not constitute an offer of employment, a guarantee of compensation, or a promise of benefits eligibility. Actual pay depends on role, credential status, experience, schedule, location, employment classification, and organizational needs. Confirm details with Eden recruiting for specific openings.";

export const CAREER_LADDER = SALARY_ESTIMATOR_ROLES.map((role) => ({
  id: role.id,
  shortLabel:
    role.id === "bt"
      ? "BT"
      : role.id === "rbt"
        ? "RBT"
        : role.id === "senior-rbt"
          ? "Senior RBT"
          : role.id === "lead-rbt"
            ? "Lead RBT"
            : "BCBA",
  label: role.label,
}));

export const SUCCESS_MILESTONES = [
  {
    id: "90-days",
    title: "90 Days",
    description: "Foundational competency, team integration, and supervised clinical routines.",
  },
  {
    id: "rbt-cert",
    title: "RBT Certification",
    description: "Structured supervision, competency checkpoints, and credential pathway support.",
  },
  {
    id: "senior-tech",
    title: "Senior Technician",
    description: "Expanded responsibility, peer mentoring, and advanced case participation.",
  },
  {
    id: "leadership",
    title: "Leadership Development",
    description: "Lead scope conversations, training support, and reliability recognition.",
  },
  {
    id: "bcba-path",
    title: "BCBA Pathway",
    description: "Graduate-level supervision exposure and long-term clinical leadership planning.",
  },
] as const;

export type EstimatorTabId = "rewards" | "growth" | "interview";

export const ESTIMATOR_TABS: { id: EstimatorTabId; label: string }[] = [
  { id: "rewards", label: "Rewards" },
  { id: "growth", label: "Growth" },
  { id: "interview", label: "Interview" },
];

export const ESTIMATOR_TAB_CONTENT: Record<
  EstimatorTabId,
  { title: string; intro: string; highlights: { title: string; text: string }[] }
> = {
  rewards: {
    title: "Rewards & total compensation",
    intro: "Illustrative total rewards combine base pay with role-eligible benefits, training support, and paid time off value.",
    highlights: [
      {
        title: "Competitive base pay",
        text: "Role-based hourly or salary bands adjusted for experience and Northern Virginia market factors.",
      },
      {
        title: "Benefits value",
        text: "Health, wellness, and support programs may add meaningful value for eligible full-time roles.",
      },
      {
        title: "Referral & recognition",
        text: "Employee referral incentives and performance conversations recognize reliability and clinical quality.",
      },
    ],
  },
  growth: {
    title: "Growth & advancement",
    intro: "Eden supports credential-aware pathways—from direct care through BCBA leadership—with mentorship at every stage.",
    highlights: [
      {
        title: "Structured supervision",
        text: "Clinical supervision aligned to your credential requirements and caseload complexity.",
      },
      {
        title: "Credential pathways",
        text: "RBT, senior technician, and BCBA development conversations with transparent expectations.",
      },
      {
        title: "Leadership scope",
        text: "Lead RBT and BCBA roles expand mentoring, training, and organizational impact over time.",
      },
    ],
  },
  interview: {
    title: "Interview & onboarding",
    intro: "Recruiting teams discuss role fit, schedule preferences, credential status, and benefits eligibility during the hiring process.",
    highlights: [
      {
        title: "What to prepare",
        text: "Resume, credential documents, availability, and questions about supervision and caseload structure.",
      },
      {
        title: "Benefits conversation",
        text: "Recruiters explain role-eligible benefits, PTO policies, and pay band context for specific openings.",
      },
      {
        title: "Next steps",
        text: "Background checks, onboarding, and clinical orientation follow an accepted offer—not estimator results.",
      },
    ],
  },
};

export type TotalRewardsBreakdown = {
  baseEarnings: number;
  benefitsValue: number;
  trainingSupport: number;
  ptoEstimate: number;
  total: number;
};

export function calculateTotalRewards(
  estimate: SalaryEstimateResult,
  hoursPerWeek: number,
  employment: SalaryEmploymentType,
): TotalRewardsBreakdown {
  const baseEarnings = estimate.isSalary
    ? estimate.midpoint
    : Math.round(estimate.midpoint * hoursPerWeek * 52);

  const employmentFactor = employment === "full-time" ? 1 : 0.42;
  const roleFactor = estimate.isSalary ? 1.15 : 1;

  const benefitsValue = Math.round(baseEarnings * 0.13 * employmentFactor * roleFactor);
  const trainingSupport = Math.round((estimate.isSalary ? 3200 : 1600) * employmentFactor);
  const ptoEstimate = Math.round(baseEarnings * (employment === "full-time" ? 0.055 : 0.028));

  return {
    baseEarnings,
    benefitsValue,
    trainingSupport,
    ptoEstimate,
    total: baseEarnings + benefitsValue + trainingSupport + ptoEstimate,
  };
}

export function calculateCareerFitScore(input: {
  role: SalaryRoleType;
  employment: SalaryEmploymentType;
  experience: SalaryExperienceLevel;
  geography: SalaryGeographicArea;
}): number {
  let score = 70;

  const experienceBonus: Record<SalaryExperienceLevel, number> = {
    entry: 0,
    mid: 9,
    experienced: 16,
  };
  const geographyBonus: Record<SalaryGeographicArea, number> = {
    "annandale-nova": 5,
    "arlington-alexandria": 7,
    "fairfax-loudoun": 6,
    "prince-william": 3,
  };
  const roleBonus: Record<SalaryRoleType, number> = {
    bt: 0,
    rbt: 5,
    "senior-rbt": 9,
    "lead-rbt": 11,
    bcba: 14,
  };

  score += experienceBonus[input.experience];
  score += geographyBonus[input.geography];
  score += roleBonus[input.role];
  if (input.employment === "full-time") score += 7;

  return Math.min(98, score);
}

export const ESTIMATOR_HERO_STATS = [
  { value: 5, suffix: "", label: "Clinical roles modeled", description: "BT through BCBA pathways" },
  { value: 4, suffix: "", label: "NOVA service areas", description: "Regional pay adjustments" },
  { value: 40, suffix: " hrs", label: "Default full-time week", description: "Adjustable in calculator" },
  { value: 100, suffix: "%", label: "Informational tool", description: "Not a job offer" },
] as const;

export const BREAKDOWN_LABELS = {
  baseEarnings: "Base Earnings",
  benefitsValue: "Benefits Value",
  trainingSupport: "Training Support",
  ptoEstimate: "PTO Estimate",
} as const;

export const BENEFITS_VALUE_TOOLTIPS: Record<keyof Omit<TotalRewardsBreakdown, "total">, string> = {
  baseEarnings: "Illustrative annual pay at your selected hours, role, experience, and geography.",
  benefitsValue: "Estimated value of health, wellness, and support programs for eligible roles.",
  trainingSupport: "Onboarding, supervision, CEU culture, and professional development resources.",
  ptoEstimate: "Approximate paid time off value based on role classification and schedule.",
};
