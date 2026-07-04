export const DEFAULT_CAMPAIGN_SLUG = "autism-care-fund-2026";

export const MIN_DONATION_CENTS = 500;
export const MAX_DONATION_CENTS = 5_000_000;

export const DONATION_TYPE_LABELS: Record<string, string> = {
  one_time: "One-time donation",
  monthly: "Monthly donation",
  corporate_sponsorship: "Corporate sponsorship",
  foundation_sponsorship: "Foundation sponsorship",
  employer_matching: "Employer matching",
  memorial: "Memorial donation",
  anonymous: "Anonymous donation",
  dedicated_child_sponsorship: "Dedicated child sponsorship",
  dedicated_therapy_sponsorship: "Dedicated therapy sponsorship",
  general_autism_fund: "General autism fund",
};

export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  received: "Application received",
  under_review: "Under review",
  documentation_requested: "Documentation requested",
  approved: "Approved",
  waitlist: "Waitlist",
  funded: "Funded",
  completed: "Completed",
  denied: "Not approved",
};

export const LEGAL_DISCLAIMER =
  "Eden ABA Therapy provides financial assistance based on available funding, eligibility, and program policies. Assistance is not guaranteed. Eden ABA Therapy is not represented as a nonprofit or 501(c)(3) organization, and contributions are not described as tax-deductible unless separately verified in writing.";
