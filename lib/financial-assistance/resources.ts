import type { FinancialAssistanceResource } from "./types";

export const ASSISTANCE_CATEGORY_GROUPS = [
  "Government",
  "Insurance",
  "Foundation",
  "Grant",
  "Community",
  "Education",
  "Military",
  "Emergency",
] as const;

export const ASSISTANCE_PROGRAM_TYPES = [
  "Medicaid",
  "Private Insurance",
  "TRICARE",
  "SSI",
  "State Waivers",
  "Grants",
  "Foundations",
  "Employer",
  "Military",
  "Scholarships",
  "County",
  "Religious",
  "Non-profits",
] as const;

export const FINANCIAL_ASSISTANCE_RESOURCES: FinancialAssistanceResource[] = [
  {
    id: "medicaid-autism-services",
    title: "Medicaid Autism Services (Federal)",
    group: "Government",
    programType: "Medicaid",
    description:
      "Federal Medicaid overview of autism-related benefits and how states may cover medically necessary services for eligible members.",
    eligibilitySummary:
      "Varies by state. Generally based on income, disability status, age, and categorical eligibility. Contact your state Medicaid agency.",
    coverageNotes:
      "States determine covered services. Many cover ABA when medically necessary for eligible children under EPSDT rules.",
    officialLinks: [
      {
        label: "Medicaid.gov — Autism Services",
        url: "https://www.medicaid.gov/medicaid/benefits/autism-services",
      },
    ],
    documents: ["Medicaid ID or application", "Diagnosis documentation", "Prescription or referral when required"],
    tips: ["Apply through your state Medicaid agency.", "Ask about EPSDT for children under 21."],
    status: "Active",
    tags: ["Medicaid", "Federal", "Autism", "EPSDT"],
    featured: true,
  },
  {
    id: "epsdt-overview",
    title: "EPSDT Benefit Overview",
    group: "Government",
    programType: "Medicaid",
    description:
      "Early and Periodic Screening, Diagnostic, and Treatment (EPSDT) is a Medicaid benefit for children and youth under 21.",
    eligibilitySummary: "Children enrolled in Medicaid. State rules apply to covered treatments including autism services.",
    coverageNotes:
      "EPSDT requires states to cover medically necessary services, which may include ABA for qualifying children.",
    officialLinks: [
      {
        label: "CMS — EPSDT Overview",
        url: "https://www.medicaid.gov/medicaid/benefits/epsdt/index.html",
      },
    ],
    tips: ["Request a written coverage determination from your MCO or state agency if unsure."],
    status: "Active",
    tags: ["EPSDT", "Children", "Medicaid"],
  },
  {
    id: "chip-overview",
    title: "Children's Health Insurance Program (CHIP)",
    group: "Government",
    programType: "Medicaid",
    description:
      "CHIP provides low-cost health coverage to children in families that earn too much for Medicaid in some states.",
    eligibilitySummary: "Income-based. Rules vary by state. Some CHIP programs coordinate with Medicaid.",
    coverageNotes: "Autism and ABA coverage depends on state CHIP plan benefits and medical necessity criteria.",
    officialLinks: [
      {
        label: "Healthcare.gov — CHIP",
        url: "https://www.healthcare.gov/medicaid-chip/childrens-health-insurance-program/",
      },
      {
        label: "InsureKidsNow.gov",
        url: "https://www.insurekidsnow.gov/",
      },
    ],
    status: "Active",
    tags: ["CHIP", "Children", "Insurance"],
  },
  {
    id: "virginia-dmas",
    title: "Virginia Medicaid (DMAS)",
    group: "Government",
    programType: "Medicaid",
    description:
      "Virginia Department of Medical Assistance Services administers Medicaid and related health programs for eligible residents.",
    eligibilitySummary:
      "Virginia residency and income/disability criteria. Apply through Cover Virginia or local DSS.",
    coverageNotes:
      "Virginia Medicaid may cover medically necessary ABA for eligible members. Managed care plans administer many benefits.",
    officialLinks: [
      { label: "Virginia DMAS", url: "https://www.dmas.virginia.gov/" },
      { label: "Cover Virginia — Apply", url: "https://coverva.dmas.virginia.gov/" },
    ],
    documents: ["Proof of income", "Proof of residency", "Social Security numbers for household members"],
    tips: ["Keep your MCO member services number handy for prior authorization questions."],
    status: "Active",
    tags: ["Virginia", "Medicaid", "DMAS"],
    featured: true,
  },
  {
    id: "virginia-dd-waiver",
    title: "Virginia Developmental Disabilities (DD) Waiver",
    group: "Government",
    programType: "State Waivers",
    description:
      "Virginia Medicaid waivers may provide home- and community-based services for individuals with developmental disabilities.",
    eligibilitySummary:
      "Requires Medicaid eligibility and meeting DD waiver criteria, including level-of-care determination. Waiting lists may apply.",
    coverageNotes:
      "Waiver services vary by slot and plan. ABA may be accessed through waiver or Medicaid benefit pathways—verify with DBHDS and your service coordinator.",
    officialLinks: [
      {
        label: "Virginia DBHDS — Waivers",
        url: "https://dbhds.virginia.gov/developmental-services/waiver-programs/",
      },
      { label: "Virginia DMAS — Waivers", url: "https://www.dmas.virginia.gov/for-members/benefits-and-services/waivers" },
    ],
    status: "Verify",
    tags: ["Virginia", "Waiver", "DD", "Medicaid"],
    featured: true,
  },
  {
    id: "ssa-ssi-child",
    title: "Supplemental Security Income (SSI) for Children",
    group: "Government",
    programType: "SSI",
    description:
      "SSI provides monthly payments to eligible children with disabilities from families with limited income and resources.",
    eligibilitySummary:
      "Child must meet SSA disability criteria and household must meet income/resource limits. Not automatic Medicaid in all cases.",
    coverageNotes:
      "SSI may help families afford care-related costs. In many states, SSI recipients qualify for Medicaid—confirm with SSA and Virginia DMAS.",
    officialLinks: [
      {
        label: "SSA — SSI for Children",
        url: "https://www.ssa.gov/ssi/text-child-ussi.htm",
      },
      {
        label: "SSA — Disability Benefits",
        url: "https://www.ssa.gov/benefits/disability/",
      },
    ],
    documents: ["Medical records", "School/IEP records", "Income and asset documentation"],
    status: "Active",
    tags: ["SSI", "Federal", "Disability"],
  },
  {
    id: "healthcare-marketplace",
    title: "Health Insurance Marketplace",
    group: "Insurance",
    programType: "Private Insurance",
    description:
      "Healthcare.gov helps families compare and enroll in private health plans that may cover autism services when medically necessary.",
    eligibilitySummary: "Open enrollment periods apply. Special enrollment may be available after qualifying life events.",
    coverageNotes:
      "Essential health benefits and autism coverage vary by plan. Review summary of benefits and network before enrolling.",
    officialLinks: [
      { label: "Healthcare.gov", url: "https://www.healthcare.gov/" },
      { label: "Essential Health Benefits", url: "https://www.healthcare.gov/coverage/what-marketplace-plans-cover/" },
    ],
    status: "Seasonal",
    tags: ["Private Insurance", "Marketplace", "ACA"],
  },
  {
    id: "tricare-autism",
    title: "TRICARE Autism Care Demonstration",
    group: "Military",
    programType: "TRICARE",
    description:
      "TRICARE may cover ABA services for eligible beneficiaries diagnosed with autism spectrum disorder under program rules.",
    eligibilitySummary:
      "Active duty, retirees, and eligible family members enrolled in TRICARE. Diagnosis and referral requirements apply.",
    coverageNotes:
      "Coverage limits, authorizations, and provider requirements are defined by TRICARE. Verify with your regional contractor.",
    officialLinks: [
      {
        label: "TRICARE — Autism Services",
        url: "https://www.tricare.mil/CoveredServices/IsItCovered/AutismServices",
      },
      { label: "TRICARE Home", url: "https://www.tricare.mil/" },
    ],
    documents: ["Autism diagnosis", "Treatment plan", "Referral or prescription as required"],
    status: "Active",
    tags: ["TRICARE", "Military", "ABA"],
    featured: true,
  },
  {
    id: "tricare-east",
    title: "TRICARE East Region",
    group: "Military",
    programType: "Military",
    description: "Regional TRICARE contractor for the East region, including Virginia. Contact for benefits and authorizations.",
    eligibilitySummary: "TRICARE-eligible beneficiaries in the East region.",
    coverageNotes: "Autism and ABA benefits follow TRICARE policy. Prior authorization may be required.",
    officialLinks: [{ label: "Humana Military — TRICARE East", url: "https://www.humanamilitary.com/" }],
    status: "Active",
    tags: ["TRICARE", "Virginia", "Military"],
  },
  {
    id: "autism-speaks-financial",
    title: "Autism Speaks — Financial Resources",
    group: "Foundation",
    programType: "Foundations",
    description:
      "Autism Speaks maintains educational resources on insurance, Medicaid, and financial planning for autism care.",
    eligibilitySummary: "Educational resource; individual programs have separate eligibility rules.",
    coverageNotes: "Does not provide direct therapy funding. Links to external programs and guides.",
    officialLinks: [
      {
        label: "Autism Speaks — Financial Resources",
        url: "https://www.autismspeaks.org/financial-resources-autism",
      },
    ],
    status: "Active",
    tags: ["Autism Speaks", "Education", "Insurance"],
  },
  {
    id: "autism-society-resources",
    title: "Autism Society — Resource Directory",
    group: "Community",
    programType: "Non-profits",
    description:
      "National autism organization with a resource directory that may include local financial and support programs.",
    eligibilitySummary: "Varies by listed program.",
    coverageNotes: "Directory entries are maintained by local affiliates and partners.",
    officialLinks: [
      { label: "Autism Society", url: "https://autismsociety.org/" },
      { label: "Resource Directory", url: "https://autismsociety.org/resource-directory/" },
    ],
    status: "Active",
    tags: ["Autism Society", "Community", "Directory"],
  },
  {
    id: "autism-cares",
    title: "Autism Cares Foundation",
    group: "Foundation",
    programType: "Foundations",
    description:
      "Non-profit foundation offering family support grants for autism-related needs, subject to program availability.",
    eligibilitySummary:
      "Families with a child diagnosed with autism. Application requirements and funding cycles vary—check current guidelines.",
    coverageNotes: "Grants may support therapy-related costs, equipment, or family needs—not a substitute for insurance.",
    officialLinks: [{ label: "Autism Cares", url: "https://www.autismcaresfoundation.org/" }],
    status: "Seasonal",
    tags: ["Grants", "Foundation", "Family Support"],
  },
  {
    id: "national-autism-association-assistance",
    title: "National Autism Association — Helping Hand Program",
    group: "Grant",
    programType: "Grants",
    description:
      "The NAA Helping Hand Program may provide financial assistance for autism-related needs when funding is available.",
    eligibilitySummary:
      "Families with a child under 18 with an autism diagnosis and demonstrated financial need. Application windows apply.",
    coverageNotes: "Award amounts and eligible expenses are defined by NAA. Not guaranteed.",
    officialLinks: [
      {
        label: "NAA — Helping Hand",
        url: "https://nationalautismassociation.org/family-support/helping-hand/",
      },
    ],
    status: "Limited",
    tags: ["Grants", "Emergency", "NAA"],
  },
  {
    id: "uaa-family-grants",
    title: "United Autism Alliance — Family Grants",
    group: "Grant",
    programType: "Grants",
    description:
      "United Autism Alliance may offer small grants to families for autism-related expenses when funds are available.",
    eligibilitySummary: "U.S. families with a child with autism. Subject to application review and available funding.",
    coverageNotes: "Grants are typically one-time and may not cover ongoing therapy costs.",
    officialLinks: [{ label: "United Autism Alliance", url: "https://www.unitedautismalliance.com/" }],
    status: "Verify",
    tags: ["Grants", "Community"],
  },
  {
    id: "families-for-effective-autism-treatment",
    title: "FEAT — Family Grants & Resources",
    group: "Community",
    programType: "Non-profits",
    description:
      "Families for Effective Autism Treatment chapters sometimes offer local grants, scholarships, or resource referrals.",
    eligibilitySummary: "Varies by local FEAT chapter.",
    coverageNotes: "Contact your nearest chapter for current programs.",
    officialLinks: [{ label: "FEAT of Virginia", url: "https://featofva.org/" }],
    status: "Verify",
    tags: ["Virginia", "Community", "FEAT"],
  },
  {
    id: "employer-eap",
    title: "Employer Assistance & EAP Programs",
    group: "Community",
    programType: "Employer",
    description:
      "Some employers offer Employee Assistance Programs (EAP), flexible spending accounts (FSA), or dependent care benefits.",
    eligibilitySummary: "Available to employees of participating employers. HR can confirm specific benefits.",
    coverageNotes:
      "EAPs typically offer counseling referrals, not ABA coverage. FSAs may help with eligible medical expenses per IRS rules.",
    officialLinks: [
      { label: "IRS — FSA Overview", url: "https://www.irs.gov/faqs/employer-sponsored-plans/employer-sponsored-plans" },
    ],
    tips: ["Ask HR about FSA/HSA options and any autism-specific employee benefits."],
    status: "Active",
    tags: ["Employer", "FSA", "EAP"],
  },
  {
    id: "idea-part-c",
    title: "IDEA Part C — Early Intervention",
    group: "Education",
    programType: "County",
    description:
      "Virginia's Part C early intervention system (Infant & Toddler Connection) serves eligible children birth through age 2.",
    eligibilitySummary:
      "Developmental delay or diagnosed condition with high probability of delay. No income test for Part C services.",
    coverageNotes:
      "Early intervention may include developmental supports. Transition planning connects families to school-age services.",
    officialLinks: [
      {
        label: "Virginia ITC",
        url: "https://www.infantva.org/",
      },
      {
        label: "CDC — Early Intervention",
        url: "https://www.cdc.gov/ncbddd/actearly/parents/states/index.html",
      },
    ],
    status: "Active",
    tags: ["Early Intervention", "Virginia", "IDEA"],
  },
  {
    id: "virginia-idea",
    title: "Virginia Special Education (IDEA)",
    group: "Education",
    programType: "County",
    description:
      "School-based special education services under IDEA may include related services; ABA in schools varies by IEP team decisions.",
    eligibilitySummary: "Eligibility through school evaluation process. Not based on family income.",
    coverageNotes:
      "School services complement—not replace—medically necessary clinical ABA when covered by insurance or Medicaid.",
    officialLinks: [
      {
        label: "Virginia DOE — Special Education",
        url: "https://www.doe.virginia.gov/programs-services/special-education",
      },
    ],
    status: "Active",
    tags: ["IEP", "School", "Virginia"],
  },
  {
    id: "fairfax-csbs",
    title: "Fairfax County CSB — Developmental Services",
    group: "Community",
    programType: "County",
    description:
      "Fairfax-Falls Church Community Services Board offers developmental disability services and referral pathways for residents.",
    eligibilitySummary: "Fairfax County/Falls Church residency. Eligibility determination required.",
    coverageNotes: "May connect families to Medicaid waiver and community resources. Services vary.",
    officialLinks: [
      {
        label: "Fairfax CSB",
        url: "https://www.fairfaxcounty.gov/community-services-board",
      },
    ],
    status: "Active",
    tags: ["Fairfax", "Virginia", "County"],
  },
  {
    id: "arlington-dhs",
    title: "Arlington County — Disability Services",
    group: "Community",
    programType: "County",
    description:
      "Arlington County Department of Human Services provides information on disability resources and Medicaid application support.",
    eligibilitySummary: "Arlington residents. Contact DHS for intake and referral.",
    coverageNotes: "County staff can help navigate state programs but do not guarantee funding.",
    officialLinks: [
      {
        label: "Arlington DHS",
        url: "https://www.arlingtonva.us/Government/Departments/DHS",
      },
    ],
    status: "Active",
    tags: ["Arlington", "Virginia", "County"],
  },
  {
    id: "religious-community-assistance",
    title: "Faith & Community Assistance Networks",
    group: "Community",
    programType: "Religious",
    description:
      "Local churches, mosques, synagogues, and community centers sometimes maintain emergency assistance funds for member families.",
    eligibilitySummary: "Varies by organization. Often prioritizes congregants or local residents.",
    coverageNotes:
      "Typically short-term emergency aid—not sustained therapy funding. Ask about confidentiality and application process.",
    officialLinks: [
      {
        label: "211 Virginia",
        url: "https://211virginia.org/",
      },
    ],
    tips: ["Dial 2-1-1 in Virginia for local resource referrals including emergency assistance."],
    status: "Verify",
    tags: ["Community", "Emergency", "211"],
  },
  {
    id: "emergency-211",
    title: "Virginia 211 — Resource Hotline",
    group: "Emergency",
    programType: "Non-profits",
    description:
      "Free, confidential referral service connecting Virginia families to local health, housing, and financial assistance programs.",
    eligibilitySummary: "Available to all Virginia residents.",
    coverageNotes: "Operators provide referrals; they do not approve benefits or guarantee funding.",
    officialLinks: [{ label: "211 Virginia", url: "https://211virginia.org/" }],
    status: "Active",
    tags: ["Emergency", "Virginia", "211"],
    featured: true,
  },
  {
    id: "patient-advocacy-foundation",
    title: "Patient Advocate Foundation",
    group: "Community",
    programType: "Non-profits",
    description:
      "PAF offers case management and co-pay relief programs for qualifying patients with chronic or life-threatening conditions.",
    eligibilitySummary: "Diagnosis and financial criteria vary by disease fund. Check active funds list.",
    coverageNotes: "Autism-specific funds may not always be open. Verify current fund status.",
    officialLinks: [{ label: "Patient Advocate Foundation", url: "https://www.patientadvocate.org/" }],
    status: "Verify",
    tags: ["Co-pay", "Advocacy", "Non-profit"],
  },
  {
    id: "autism-speaks-grants",
    title: "Autism Speaks — Grants & Scholarships",
    group: "Grant",
    programType: "Scholarships",
    description:
      "Autism Speaks lists grant and scholarship opportunities; availability and deadlines change frequently.",
    eligibilitySummary: "Varies by program. Review each opportunity's published criteria.",
    coverageNotes: "Educational listing only. Eden does not administer these programs.",
    officialLinks: [
      {
        label: "Autism Speaks — Grants",
        url: "https://www.autismspeaks.org/grants",
      },
    ],
    status: "Seasonal",
    tags: ["Grants", "Scholarships", "Autism Speaks"],
  },
  {
    id: "private-insurance-appeals",
    title: "State Insurance Consumer Assistance",
    group: "Insurance",
    programType: "Private Insurance",
    description:
      "State departments of insurance help consumers understand coverage rights and file complaints or appeals.",
    eligibilitySummary: "Policyholders in the state where coverage was issued.",
    coverageNotes:
      "Virginia SCC Bureau of Insurance assists with questions about fully insured plans in Virginia.",
    officialLinks: [
      {
        label: "Virginia Bureau of Insurance",
        url: "https://www.scc.virginia.gov/pages/Insurance",
      },
      {
        label: "CMS — Coverage Rights",
        url: "https://www.cms.gov/marketplace/resources/regulations-guidance",
      },
    ],
    tips: ["Keep denial letters and request written explanations of benefits (EOBs)."],
    status: "Active",
    tags: ["Appeals", "Virginia", "Private Insurance"],
  },
];

export const FEATURED_ASSISTANCE_IDS = new Set(
  FINANCIAL_ASSISTANCE_RESOURCES.filter((r) => r.featured).map((r) => r.id),
);
