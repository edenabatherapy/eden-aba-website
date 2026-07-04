export const AUTISM_CARE_FUND_SLUG = "autism-care-fund-2026";

export const DEFAULT_CAMPAIGN = {
  slug: AUTISM_CARE_FUND_SLUG,
  name: "Eden Autism Care Fund",
  goalAmountCents: 150_000_00,
  description:
    "Community-supported fund helping eligible Virginia families access ABA therapy when insurance, Medicaid, or other resources leave gaps.",
} as const;

/** Percent of each dollar directed to program areas (must sum to 100). */
export const ALLOCATION_TARGETS = {
  therapy: 70,
  assessment: 15,
  emergency: 10,
  operating: 5,
} as const;

/** Estimated therapy hours supported per $1,000 donated (conservative planning estimate). */
export const HOURS_PER_THOUSAND_DOLLARS = 8;

export const MIN_DONATION_CENTS = 500;
export const MAX_DONATION_CENTS = 50_000_00;

export const DONATION_AMOUNTS_PRESET = [2500, 5000, 10000, 25000, 50000] as const;
