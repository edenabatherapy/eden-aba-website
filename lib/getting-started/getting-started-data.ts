export type GettingStartedResource = {
  id: string;
  title: string;
  category: GettingStartedResourceCategory;
  source: string;
  summary: string;
  url: string;
  tags: string[];
  featured?: boolean;
};

export type GettingStartedResourceCategory =
  | "ABA Therapy Basics"
  | "Medicaid & Insurance"
  | "Autism Diagnosis"
  | "Parent Onboarding"
  | "ABA Organizations"
  | "Provider Credentials"
  | "State Resources"
  | "FAQs"
  | "Documents Needed"
  | "What Happens Next";

export const GETTING_STARTED_META = {
  title: "Getting Started with Eden | Eden ABA Therapy",
  description:
    "Family resource hub for starting ABA therapy with Eden ABA Therapy—Medicaid, insurance, evaluations, provider credentials, documents, and next steps in Northern Virginia.",
  keywords: [
    "getting started ABA therapy",
    "Eden ABA Therapy intake",
    "Virginia Medicaid ABA",
    "insurance verification ABA",
    "autism diagnosis resources",
    "BCBA RBT credentials",
  ],
};

export const RESOURCE_CATEGORIES: GettingStartedResourceCategory[] = [
  "ABA Therapy Basics",
  "Medicaid & Insurance",
  "Autism Diagnosis",
  "Parent Onboarding",
  "ABA Organizations",
  "Provider Credentials",
  "State Resources",
  "Documents Needed",
  "What Happens Next",
  "FAQs",
];

const RAW_GETTING_STARTED_RESOURCES: GettingStartedResource[] = [
  {
    id: "medicaid-autism-services",
    title: "Medicaid Autism Services",
    category: "Medicaid & Insurance",
    source: "Medicaid.gov",
    summary: "Federal Medicaid resource explaining autism services and Medicaid benefit pathways.",
    url: "https://www.medicaid.gov/medicaid/benefits/autism-services",
    tags: ["Medicaid", "Autism", "Insurance", "Coverage"],
    featured: true,
  },
  {
    id: "medicaid-epsdt-autism",
    title: "Medicaid EPSDT Autism Coverage",
    category: "Medicaid & Insurance",
    source: "Autism Speaks",
    summary: "Explains EPSDT and how Medicaid autism services apply to children and young adults under 21.",
    url: "https://www.autismspeaks.org/medicaid-epsdt",
    tags: ["EPSDT", "ABA", "Children", "Medicaid"],
  },
  {
    id: "epsdt-overview-cms",
    title: "EPSDT Benefit Overview",
    category: "Medicaid & Insurance",
    source: "CMS",
    summary: "Centers for Medicare & Medicaid Services overview of Early and Periodic Screening, Diagnostic, and Treatment benefits.",
    url: "https://www.medicaid.gov/medicaid/benefits/epsdt/index.html",
    tags: ["EPSDT", "Medicaid", "Children", "Federal"],
  },
  {
    id: "virginia-dmas",
    title: "Virginia DMAS Medicaid Programs",
    category: "State Resources",
    source: "Virginia DMAS",
    summary: "Virginia Department of Medical Assistance Services information on Medicaid and health programs for families.",
    url: "https://www.dmas.virginia.gov/",
    tags: ["Virginia", "Medicaid", "DMAS", "State"],
  },
  {
    id: "maryland-medicaid-aba",
    title: "Maryland Medicaid ABA Program",
    category: "State Resources",
    source: "Maryland Department of Health",
    summary: "Maryland Medicaid information for medically necessary ABA services for members under 21.",
    url: "https://health.maryland.gov/mmcp/epsdt/ABA/Pages/Home.aspx",
    tags: ["Maryland", "Medicaid", "ABA"],
  },
  {
    id: "bacb-consumer-resources",
    title: "BACB Consumer Resources",
    category: "Provider Credentials",
    source: "Behavior Analyst Certification Board",
    summary: "Helps families understand BACB certification and why qualified ABA providers matter.",
    url: "https://www.bacb.com/consumer-resources/",
    tags: ["BCBA", "RBT", "Credentials", "ABA"],
    featured: true,
  },
  {
    id: "bcba-certification",
    title: "BCBA Certification",
    category: "Provider Credentials",
    source: "BACB",
    summary: "Explains the Board Certified Behavior Analyst credential and supervision responsibilities.",
    url: "https://www.bacb.com/bcba/",
    tags: ["BCBA", "Certification", "Supervision"],
  },
  {
    id: "rbt-certification",
    title: "RBT Certification",
    category: "Provider Credentials",
    source: "BACB",
    summary: "Overview of Registered Behavior Technician certification, training, and ongoing requirements.",
    url: "https://www.bacb.com/rbt/",
    tags: ["RBT", "Certification", "Direct Care"],
  },
  {
    id: "casp-aba-guidelines",
    title: "CASP ABA Practice Guidelines",
    category: "ABA Organizations",
    source: "Council of Autism Service Providers",
    summary: "Clinical practice guidance for ABA treatment of Autism Spectrum Disorder.",
    url: "https://www.casproviders.org/asd-guidelines/",
    tags: ["CASP", "ABA Guidelines", "Clinical Standards"],
    featured: true,
  },
  {
    id: "apba-home",
    title: "Association of Professional Behavior Analysts",
    category: "ABA Organizations",
    source: "APBA",
    summary: "Professional ABA organization supporting practitioners, public policy, and consumer protection.",
    url: "https://www.apbahome.net/",
    tags: ["APBA", "ABA Organization", "Advocacy"],
  },
  {
    id: "autism-speaks-resource-guide",
    title: "Autism Speaks Resource Guide",
    category: "Parent Onboarding",
    source: "Autism Speaks",
    summary: "Searchable family resource guide for autism services, support, and information.",
    url: "https://www.autismspeaks.org/resource-guide",
    tags: ["Autism", "Family Support", "Resources"],
    featured: true,
  },
  {
    id: "what-is-aba-autism-speaks",
    title: "What Is Applied Behavior Analysis?",
    category: "ABA Therapy Basics",
    source: "Autism Speaks",
    summary: "Family-friendly introduction to ABA therapy, how it works, and what families can expect.",
    url: "https://www.autismspeaks.org/applied-behavior-analysis",
    tags: ["ABA", "Basics", "Treatment"],
  },
  {
    id: "cdc-learn-autism",
    title: "CDC: Learn About Autism",
    category: "Autism Diagnosis",
    source: "Centers for Disease Control and Prevention",
    summary: "Evidence-based information on autism signs, screening, diagnosis, and developmental monitoring.",
    url: "https://www.cdc.gov/autism/index.html",
    tags: ["Autism", "Diagnosis", "Screening", "CDC"],
  },
  {
    id: "cdc-milestones",
    title: "CDC Developmental Milestones",
    category: "Autism Diagnosis",
    source: "CDC",
    summary: "Learn the skills most children reach by age and when to talk with a doctor about development.",
    url: "https://www.cdc.gov/ncbddd/actearly/milestones/index.html",
    tags: ["Milestones", "Early Intervention", "Development"],
  },
  {
    id: "autism-society-resources",
    title: "Autism Society Family Resources",
    category: "Parent Onboarding",
    source: "Autism Society of America",
    summary: "Connection, advocacy, and practical resources for autism caregivers across the lifespan.",
    url: "https://autismsociety.org/resources/",
    tags: ["Family", "Advocacy", "Support"],
  },
  {
    id: "insurance-parity-mental-health",
    title: "Mental Health Parity and Addiction Equity",
    category: "Medicaid & Insurance",
    source: "CMS",
    summary: "Federal guidance on mental health and substance use disorder parity that may affect autism benefits.",
    url: "https://www.cms.gov/marketplace/resources/regulations-guidance/mental-health-parity-addiction-equity",
    tags: ["Insurance", "Parity", "Benefits"],
  },
  {
    id: "documents-checklist-hhs",
    title: "Preparing for Autism Services",
    category: "Documents Needed",
    source: "HHS / Autism Support",
    summary: "Guidance on records and information families often gather before starting autism-related services.",
    url: "https://www.hhs.gov/autism/get-involved/family-support/index.html",
    tags: ["Documents", "Records", "Preparation"],
  },
  {
    id: "early-intervention-virginia",
    title: "Virginia Early Intervention",
    category: "State Resources",
    source: "Virginia Early Intervention",
    summary: "Virginia early intervention system supporting infants and toddlers with developmental delays.",
    url: "https://www.itcva.online/",
    tags: ["Virginia", "Early Intervention", "EI"],
  },
  {
    id: "aba-faq-casp",
    title: "Understanding ABA Treatment",
    category: "FAQs",
    source: "CASP",
    summary: "Answers common family questions about ABA therapy scope, quality, and clinical expectations.",
    url: "https://www.casproviders.org/for-parents/",
    tags: ["FAQ", "ABA", "Families"],
  },
  {
    id: "parent-training-aba",
    title: "Parent-Mediated Intervention",
    category: "Parent Onboarding",
    source: "Autism Speaks",
    summary: "How caregiver involvement and parent training can support skill generalization at home.",
    url: "https://www.autismspeaks.org/parent-mediated-intervention",
    tags: ["Parent Training", "Caregiver", "Home"],
  },
  {
    id: "authorization-overview",
    title: "Prior Authorization Basics",
    category: "What Happens Next",
    source: "Healthcare.gov",
    summary: "Explains prior authorization and why insurers may review services before approving care.",
    url: "https://www.healthcare.gov/glossary/prior-authorization/",
    tags: ["Authorization", "Insurance", "Next Steps"],
  },
  {
    id: "iep-school-support",
    title: "IDEA and School-Based Supports",
    category: "What Happens Next",
    source: "U.S. Department of Education",
    summary: "Overview of special education rights and how school supports may relate to clinical therapy planning.",
    url: "https://sites.ed.gov/idea/",
    tags: ["IEP", "School", "IDEA", "Next Steps"],
  },
];

function resourceKey(resource: GettingStartedResource) {
  return `${resource.title.trim().toLowerCase()}|${resource.url.trim().toLowerCase()}|${resource.category}`;
}

export function uniqueGettingStartedResources(resources: GettingStartedResource[]) {
  const seen = new Set<string>();
  return resources.filter((resource) => {
    const key = resourceKey(resource);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const GETTING_STARTED_RESOURCES = uniqueGettingStartedResources(RAW_GETTING_STARTED_RESOURCES);

export const FEATURED_RESOURCE_IDS = new Set(
  GETTING_STARTED_RESOURCES.filter((resource) => resource.featured).map((resource) => resource.id),
);

export const GETTING_STARTED_DISCLAIMER =
  "Resources are educational and do not replace medical, legal, or insurance advice. Coverage and eligibility vary by state and plan.";

export const CORE_TOPIC_CARDS = [
  {
    id: "what-is-aba",
    title: "What is ABA Therapy?",
    description: "Learn how evidence-based ABA supports communication, daily living skills, and meaningful progress.",
    href: "/aba-therapy/what-is-aba-therapy",
    anchor: null,
  },
  {
    id: "who-qualifies",
    title: "Who qualifies for ABA?",
    description: "Understand diagnosis, medical necessity, age requirements, and plan-specific eligibility factors.",
    href: null,
    anchor: "faq",
  },
  {
    id: "medicaid-epsdt",
    title: "Medicaid & EPSDT",
    description: "Explore how EPSDT may support autism services for eligible children and young adults.",
    href: null,
    anchor: "resources",
    filter: "Medicaid & Insurance",
  },
  {
    id: "insurance-auth",
    title: "Insurance authorization",
    description: "See how prior authorization, benefits verification, and plan rules may affect service start dates.",
    href: "/insurance-coverage",
    anchor: null,
  },
  {
    id: "diagnosis-eval",
    title: "Diagnosis and evaluation",
    description: "Review screening, diagnostic evaluation, and records families often share during intake.",
    href: "/services/evaluations-diagnosis/screening-evaluation",
    anchor: null,
  },
  {
    id: "credentials",
    title: "BCBA, RBT, and provider credentials",
    description: "Learn what BCBA and RBT credentials mean and why qualified supervision matters.",
    href: null,
    anchor: "resources",
    filter: "Provider Credentials",
  },
  {
    id: "parent-training",
    title: "Parent training",
    description: "Discover how caregiver coaching helps families use strategies consistently at home.",
    href: "/aba-therapy/parent-training",
    anchor: null,
  },
  {
    id: "first-30-days",
    title: "First 30 days with Eden",
    description: "A practical look at intake, assessment, authorization, and early therapy routines.",
    href: null,
    anchor: "timeline",
  },
] as const;

export const ONBOARDING_TIMELINE = [
  {
    step: 1,
    title: "Contact Eden",
    description: "Reach out by phone, form, or referral to discuss your child, location, and scheduling needs.",
  },
  {
    step: 2,
    title: "Share diagnosis and insurance information",
    description: "Provide insurance cards, diagnosis documents, and contact details so our team can guide next steps.",
  },
  {
    step: 3,
    title: "Benefits verification",
    description: "Eden reviews available benefits, network status, and possible family cost-sharing when plan details allow.",
  },
  {
    step: 4,
    title: "Clinical intake",
    description: "Families complete intake steps and share background information to prepare for clinical planning.",
  },
  {
    step: 5,
    title: "Assessment by BCBA",
    description: "A BCBA conducts an assessment to understand strengths, needs, safety concerns, and family goals.",
  },
  {
    step: 6,
    title: "Authorization request",
    description: "When required, clinical documentation is submitted to the insurance plan for review.",
  },
  {
    step: 7,
    title: "Therapy start date",
    description: "After approval and scheduling, direct therapy sessions begin with your assigned clinical team.",
  },
  {
    step: 8,
    title: "Ongoing parent training and progress reviews",
    description: "Caregiver coaching, goal updates, and progress reviews continue throughout treatment.",
  },
] as const;

export const DOCUMENTS_CHECKLIST = [
  "Insurance card (front and back) and member ID",
  "Child's full name and date of birth",
  "Autism or related diagnostic evaluation report, if available",
  "Pediatrician or referral contact information, when applicable",
  "Previous therapy, school, or IEP records that may support medical necessity",
  "Parent/guardian contact information and preferred communication method",
] as const;

export const GETTING_STARTED_FAQ = [
  {
    question: "What documents do I need to start ABA?",
    answer:
      "Families typically share insurance information, the child's date of birth, diagnostic or evaluation records when available, and any prior therapy or school documents that help explain clinical needs. Eden's intake team can tell you what is most helpful for your specific plan and situation.",
  },
  {
    question: "Does Medicaid cover ABA therapy?",
    answer:
      "Many children may access autism-related services through Medicaid when services are medically necessary and meet program rules. Virginia Medicaid and EPSDT pathways can differ from private insurance. Eden can help families review benefits and understand what their plan or program may require.",
  },
  {
    question: "What is EPSDT?",
    answer:
      "EPSDT (Early and Periodic Screening, Diagnostic, and Treatment) is a Medicaid benefit for children and young adults under 21 that can cover medically necessary services, including autism-related treatment in many states when eligibility and clinical criteria are met.",
  },
  {
    question: "What is a BCBA?",
    answer:
      "A Board Certified Behavior Analyst (BCBA) is a graduate-level clinician who designs, supervises, and monitors ABA treatment plans, trains staff, and partners with families on goals and progress.",
  },
  {
    question: "What is an RBT?",
    answer:
      "A Registered Behavior Technician (RBT) is a paraprofessional who delivers ABA services under BCBA supervision, implements treatment plans, collects data, and supports skill-building during sessions.",
  },
  {
    question: "How long does authorization take?",
    answer:
      "Authorization timelines vary by insurance plan, documentation completeness, and clinical complexity. Some plans respond within days; others may take longer or request additional information. Eden helps families understand status and next steps.",
  },
  {
    question: "Can Eden help with insurance verification?",
    answer:
      "Yes. Eden ABA Therapy can collect insurance information and help Virginia families review benefits, authorization requirements, and possible next steps. Verification is informational and does not guarantee coverage or payment.",
  },
  {
    question: "What happens during an ABA assessment?",
    answer:
      "A BCBA gathers information about your child's communication, behavior, safety, daily living skills, and family priorities. The assessment helps determine clinically appropriate goals and recommended service levels for the treatment plan.",
  },
  {
    question: "How are goals created?",
    answer:
      "Goals are individualized based on assessment results, family input, developmental needs, and clinical best practices. They are written to be measurable so the team can track progress and adjust strategies over time.",
  },
  {
    question: "How do parents participate?",
    answer:
      "Parents are essential partners. Eden emphasizes caregiver training, regular communication, and practical strategies families can use between sessions to support generalization at home and in the community.",
  },
] as const;
