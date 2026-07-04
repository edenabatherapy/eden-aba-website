import type { VirginiaProgram } from "./types";

export const VIRGINIA_PROGRAMS: VirginiaProgram[] = [
  {
    id: "cover-virginia",
    name: "Cover Virginia — Medicaid & FAMIS",
    region: "Statewide",
    description:
      "Virginia's unified application portal for Medicaid, FAMIS (CHIP), and Plan First programs for eligible residents.",
    eligibility: "Income and household criteria vary by program. U.S. citizenship or qualified immigration status may apply.",
    officialLinks: [
      { label: "Apply — Cover Virginia", url: "https://coverva.dmas.virginia.gov/" },
      { label: "Virginia DMAS", url: "https://www.dmas.virginia.gov/" },
    ],
    tags: ["Medicaid", "Application", "Statewide"],
  },
  {
    id: "dd-waiver",
    name: "Developmental Disabilities (DD) Waiver",
    region: "Statewide",
    description:
      "Home- and community-based waiver services for individuals with developmental disabilities who meet level-of-care criteria.",
    eligibility:
      "Medicaid eligible with developmental disability. Waiting lists are common—confirm current status with DBHDS.",
    officialLinks: [
      {
        label: "DBHDS — Waiver Programs",
        url: "https://dbhds.virginia.gov/developmental-services/waiver-programs/",
      },
    ],
    tags: ["Waiver", "DD", "Long-term supports"],
  },
  {
    id: "itc-virginia",
    name: "Infant & Toddler Connection of Virginia",
    region: "Statewide",
    description:
      "Part C early intervention for infants and toddlers (birth–36 months) with developmental delays or qualifying diagnoses.",
    eligibility: "Developmental evaluation through local ITC office. No family income requirement for Part C.",
    officialLinks: [{ label: "Infant & Toddler Connection", url: "https://www.infantva.org/" }],
    tags: ["Early Intervention", "Birth–3", "IDEA Part C"],
  },
  {
    id: "fairfax-csbs",
    name: "Fairfax-Falls Church CSB",
    region: "Fairfax County & Falls Church",
    description:
      "Community Services Board providing intellectual and developmental disability services, intake, and resource navigation.",
    eligibility: "Residents of Fairfax County or Falls Church City. Eligibility assessment required.",
    officialLinks: [
      {
        label: "Fairfax CSB — I/DD Services",
        url: "https://www.fairfaxcounty.gov/community-services-board/intellectual-developmental-disabilities",
      },
    ],
    tags: ["Fairfax", "CSB", "I/DD"],
  },
  {
    id: "arlington-dhs",
    name: "Arlington County DHS",
    region: "Arlington County",
    description:
      "Human Services department offering disability resources, benefits screening, and referrals for Arlington families.",
    eligibility: "Arlington residents. Contact DHS for intake.",
    officialLinks: [
      {
        label: "Arlington DHS",
        url: "https://www.arlingtonva.us/Government/Departments/DHS/Disability-Services",
      },
    ],
    tags: ["Arlington", "County", "Disability"],
  },
  {
    id: "loudoun-mhsads",
    name: "Loudoun County MHSADS",
    region: "Loudoun County",
    description:
      "Loudoun County Mental Health, Substance Abuse & Developmental Services provides DD service coordination.",
    eligibility: "Loudoun County residents with developmental disabilities.",
    officialLinks: [
      {
        label: "Loudoun MHSADS",
        url: "https://www.loudoun.gov/478/Mental-Health-Substance-Abuse-Developmen",
      },
    ],
    tags: ["Loudoun", "County", "DD"],
  },
  {
    id: "prince-william-csb",
    name: "Prince William County CSB",
    region: "Prince William County",
    description:
      "CSB serving Prince William County with developmental disability services and community support coordination.",
    eligibility: "Prince William County residents. Contact CSB intake.",
    officialLinks: [
      {
        label: "Prince William CSB",
        url: "https://www.pwcs.edu/departments/special_education/community_services_board",
      },
    ],
    tags: ["Prince William", "CSB"],
  },
  {
    id: "alexandria-dchs",
    name: "Alexandria DCHS",
    region: "City of Alexandria",
    description:
      "Department of Community and Human Services connects Alexandria residents to disability and family support resources.",
    eligibility: "Alexandria City residents.",
    officialLinks: [
      {
        label: "Alexandria DCHS",
        url: "https://www.alexandriava.gov/DCHS",
      },
    ],
    tags: ["Alexandria", "City"],
  },
  {
    id: "feat-virginia",
    name: "FEAT of Virginia",
    region: "Northern Virginia",
    description:
      "Families for Effective Autism Treatment of Virginia offers education, support groups, and occasional family assistance.",
    eligibility: "Virginia families affected by autism. Program-specific criteria apply.",
    officialLinks: [{ label: "FEAT of Virginia", url: "https://featofva.org/" }],
    tags: ["Autism", "Community", "Northern Virginia"],
  },
  {
    id: "211-virginia",
    name: "211 Virginia",
    region: "Statewide",
    description:
      "Free referral line for health, financial, and social services available 24/7 by phone, text, or web search.",
    eligibility: "All Virginia residents.",
    officialLinks: [{ label: "211 Virginia", url: "https://211virginia.org/" }],
    tags: ["Referrals", "Emergency", "Hotline"],
  },
];

export const VIRGINIA_REGIONS = [
  "All",
  "Statewide",
  "Northern Virginia",
  "Fairfax County & Falls Church",
  "Arlington County",
  "Loudoun County",
  "Prince William County",
  "City of Alexandria",
] as const;

export type VirginiaRegion = (typeof VIRGINIA_REGIONS)[number];
