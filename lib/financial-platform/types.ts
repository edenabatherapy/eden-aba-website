export type DonationType =
  | "one_time"
  | "monthly"
  | "corporate_sponsorship"
  | "foundation_sponsorship"
  | "employer_matching"
  | "memorial"
  | "anonymous"
  | "dedicated_child_sponsorship"
  | "dedicated_therapy_sponsorship"
  | "general_autism_fund";

export type AllocationStatus = "pending" | "reserved" | "distributed";

export type ApplicationStatus =
  | "received"
  | "under_review"
  | "documentation_requested"
  | "approved"
  | "waitlist"
  | "funded"
  | "completed"
  | "denied";

export type AdminRole =
  | "owner"
  | "administrator"
  | "finance"
  | "intake_coordinator"
  | "viewer";

export type PlatformDashboard = {
  configured: boolean;
  campaignName: string;
  campaignSlug: string;
  goalAmountCents: number;
  monthlyGoalCents: number;
  annualGoalCents: number;
  raisedAmountCents: number;
  totalDonationsCents: number;
  reservedFundsCents: number;
  distributedFundsCents: number;
  availableBalanceCents: number;
  familiesSupported: number;
  childrenSponsored: number;
  therapyHoursFunded: number;
  assessmentsSponsored: number;
  parentTrainings: number;
  transportationAssistance: number;
  equipmentPurchased: number;
  donorCount: number;
  returningDonors: number;
  averageDonationCents: number;
  largestDonationCents: number;
  applicationsPending: number;
  familiesWaiting: number;
  lastUpdated: string;
};

export type TransparencyDonationRow = {
  id: string;
  donatedAt: string;
  donationType: DonationType;
  campaignName: string;
  amountCents: number;
  allocationStatus: AllocationStatus;
  isAnonymous: boolean;
  donorDisplayName: string | null;
  impactCategory: string | null;
};

export type ImpactMetricsSnapshot = {
  averageDonationCents: number;
  largestDonationCents: number;
  monthlyGrowthPercent: number;
  yearlyGrowthPercent: number;
  donorCount: number;
  returningDonors: number;
  averageSponsorshipCents: number;
  totalTherapyHoursFunded: number;
  childrenCurrentlySupported: number;
  familiesWaiting: number;
  applicationsPending: number;
};

export type FinancialResourceRow = {
  id: string;
  slug: string;
  title: string;
  group: string;
  programType: string;
  description: string;
  eligibilitySummary: string | null;
  coverageNotes: string | null;
  officialLinks: Array<{ label: string; url: string }>;
  documents: string[];
  tips: string[];
  county: string | null;
};
