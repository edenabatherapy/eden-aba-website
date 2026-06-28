export const PROVIDERS_META = {
  title: "For Providers | Eden ABA Therapy",
  description:
    "Refer a child to Eden ABA Therapy. Professional referral resources for pediatricians, schools, psychologists, and community providers across Northern Virginia.",
};

export const CENTRALREACH_LOGIN_URL = "https://app.cressentials.com/users/sign_in";

export const EDEN_PROVIDER_CONTACT = {
  phone: "(703) 587-5238",
  phoneHref: "tel:+17035875238",
  email: "info@edenabatherapy.com",
  emailHref: "mailto:info@edenabatherapy.com",
  fax: "571-445-8631",
  faxHref: "tel:+15714458631",
  address: "7700 Little River Turnpike, Suite 304, Annandale, VA 22003",
  mapsQuery: "7700+Little+River+Turnpike+Suite+304+Annandale+VA+22003",
  serviceArea: "Annandale and Northern Virginia communities",
};

export const PROVIDER_OVERVIEW = {
  title: "Provider referral overview",
  paragraphs: [
    "Eden ABA Therapy welcomes referrals from pediatricians, behavioral health clinicians, schools, allied health professionals, and community partners serving families in Northern Virginia.",
    "Our intake team may review referral information, contact caregivers when appropriate, and guide families through eligibility review, intake, and clinical assessment based on individual need and authorization requirements.",
    "Eden is a regional provider centered in Annandale. We focus on compassionate, evidence-informed ABA services with family partnership—not a national call-center referral model.",
  ],
};

export const PROVIDER_TRUST_SIGNALS = [
  {
    label: "Regional focus",
    value: "Northern Virginia",
    detail: "In-home and clinic-based services centered in Annandale.",
  },
  {
    label: "Care model",
    value: "Evidence-informed ABA",
    detail: "Individualized plans with BCBA oversight and caregiver collaboration.",
  },
  {
    label: "Referral support",
    value: "Dedicated intake",
    detail: "Phone, fax, email, and referral form options for referring partners.",
  },
  {
    label: "Collaboration",
    value: "With consent",
    detail: "HIPAA-conscious coordination when families authorize communication.",
  },
];

export const WHO_CAN_REFER = [
  {
    title: "Pediatricians & primary care",
    description:
      "Medical home providers supporting developmental surveillance, screening follow-up, and referral coordination.",
  },
  {
    title: "Psychologists & psychiatrists",
    description:
      "Behavioral health clinicians referring for ABA services when assessment suggests benefit and families are ready to explore care.",
  },
  {
    title: "Schools & IEP teams",
    description:
      "Educators, coordinators, and specialists connecting families with community-based behavioral support.",
  },
  {
    title: "Speech & occupational therapists",
    description:
      "Allied health partners coordinating functional goals across home, clinic, and school environments.",
  },
  {
    title: "Social workers & case managers",
    description:
      "Community professionals helping families navigate services, authorization, and local resources.",
  },
  {
    title: "Community clinics & family organizations",
    description:
      "Local partners supporting families seeking autism and developmental services in Northern Virginia.",
  },
];

export const WHEN_TO_CONSIDER_ABA_REFERRAL = [
  {
    title: "Developmental concerns persist",
    description:
      "A child shows ongoing delays in communication, social engagement, adaptive skills, or daily routines that may benefit from structured behavioral support.",
  },
  {
    title: "Screening or evaluation suggests need",
    description:
      "Validated screening tools or diagnostic evaluation indicate behaviors or skill gaps that may warrant discussion of ABA services when families are interested.",
  },
  {
    title: "Functional challenges across settings",
    description:
      "Behaviors or skill deficits affect participation at home, school, or in the community and may respond to individualized intervention with caregiver involvement.",
  },
  {
    title: "Families request ABA exploration",
    description:
      "Caregivers ask for guidance on ABA therapy options, intake steps, or coordination after receiving a diagnosis or clinical recommendation.",
  },
  {
    title: "School or therapy teams recommend coordination",
    description:
      "IEP teams or allied providers identify goals that may benefit from aligned behavioral programming when authorized and clinically appropriate.",
  },
];

export const HELPFUL_REFERRAL_DOCUMENTS = [
  "Caregiver name, phone number, and preferred contact method",
  "Child date of birth or age",
  "Diagnostic summary or evaluation report, when available and authorized",
  "Current medications or relevant medical history, when applicable",
  "Insurance carrier and member ID, if the family chooses to share",
  "School or IEP contact information, when school coordination may be requested",
  "Signed release of information, when clinical records will be shared",
  "Brief statement of referral reason and priority concerns",
];

export const AUTISM_SCREENING_SUPPORT = {
  title: "Autism screening support",
  intro:
    "Early identification and timely next steps may support families navigating evaluation and service pathways. Eden may discuss screening history, prior evaluations, and appropriate referral options based on clinical review.",
  points: [
    {
      title: "Screening history review",
      description:
        "Eden may review whether a child has completed recommended developmental or autism-specific screening and what follow-up steps the family has taken.",
    },
    {
      title: "Evaluation pathway guidance",
      description:
        "When appropriate, Eden may help families understand evaluation and ABA intake options. Eden does not guarantee diagnosis or evaluation timelines.",
    },
    {
      title: "Coordination with medical home",
      description:
        "With consent, Eden may coordinate with referring pediatric or behavioral health providers to support continuity of care.",
    },
    {
      title: "Family education resources",
      description:
        "Eden may share educational materials about ABA therapy, intake expectations, and insurance questions families commonly ask.",
    },
  ],
  resourceHref: "/services/evaluations-diagnosis/screening-evaluation",
};

export const INSURANCE_INTAKE_COORDINATION = {
  title: "Insurance & intake coordination",
  intro:
    "Eden's intake team may help families understand benefit verification, authorization requirements, and intake documentation. Coverage and approval depend on payer rules, plan design, and clinical criteria.",
  steps: [
    {
      title: "Benefit inquiry",
      description:
        "Families may share insurance information so Eden can explore whether ABA benefits may be available under their plan.",
    },
    {
      title: "Authorization review",
      description:
        "When required, Eden may support authorization requests based on clinical documentation. Approval is determined by the payer, not Eden.",
    },
    {
      title: "Intake documentation",
      description:
        "Families may complete intake forms and provide records needed for clinical review and care planning.",
    },
    {
      title: "Scheduling coordination",
      description:
        "When services may begin, Eden may coordinate assessment and session scheduling based on clinical capacity and family availability.",
    },
  ],
  resourceHref: "/insurance-coverage",
};

export const SCHOOL_IEP_COORDINATION = {
  title: "School & IEP coordination",
  intro:
    "When families authorize communication, Eden may collaborate with school teams to support aligned goals, data sharing, and practical carryover across settings.",
  points: [
    "Review of educational goals that may overlap with behavioral programming",
    "Participation in meetings when authorized and clinically appropriate",
    "Coordination on skill generalization between home, school, and community",
    "Documentation practices that respect privacy and consent requirements",
  ],
};

export const FAMILY_COMMUNICATION_WORKFLOW = [
  {
    step: "Initial outreach",
    description:
      "Eden may contact the family using information provided in the referral to introduce services and answer preliminary questions.",
  },
  {
    step: "Intake conversation",
    description:
      "A team member may review the child's history, current concerns, and documents the family is authorized to share.",
  },
  {
    step: "Expectation setting",
    description:
      "Families receive guidance on possible next steps, including evaluation, authorization, and scheduling timelines that may vary.",
  },
  {
    step: "Ongoing updates",
    description:
      "With consent, Eden may provide referring partners periodic coordination updates when clinically appropriate and authorized.",
  },
];

export const REFERRAL_CHANNELS = [
  {
    id: "form",
    title: "Provider referral form",
    description: "Submit structured referral details through Eden's provider referral page.",
    actionLabel: "Open referral form",
    href: "/providers/refer-a-child",
    external: false,
  },
  {
    id: "phone",
    title: "Phone referral line",
    description: "Speak with Eden's team to share referral information and clinical context.",
    actionLabel: "Call (703) 587-5238",
    href: "tel:+17035875238",
    external: false,
  },
  {
    id: "fax",
    title: "Secure fax",
    description: "Send referral documentation and supporting records when authorized by the family.",
    actionLabel: "Fax 571-445-8631",
    href: "tel:+15714458631",
    external: false,
  },
  {
    id: "email",
    title: "Email coordination",
    description: "Share referral details with Eden's intake team using HIPAA-conscious practices.",
    actionLabel: "Email intake team",
    href: "mailto:info@edenabatherapy.com",
    external: false,
  },
];

export const REFERRAL_WORKFLOW = [
  {
    step: "01",
    title: "Referral received",
    description:
      "Eden acknowledges your referral and routes it to our intake team for initial review and documentation.",
    detail:
      "Include caregiver contact information when available, relevant clinical context, and any authorization for information sharing.",
  },
  {
    step: "02",
    title: "Family contacted",
    description:
      "Our team may reach out to the family to discuss services, answer questions, and explain potential next steps.",
    detail:
      "Families receive clear guidance on intake requirements. Response timing may vary based on availability and contact information provided.",
  },
  {
    step: "03",
    title: "Insurance & eligibility reviewed",
    description:
      "Benefits and coverage may be reviewed with the family. Authorization requirements may vary by payer and plan design.",
    detail:
      "Eden does not guarantee insurance approval or specific benefit levels. Eligibility may vary by plan, location, and clinical need.",
  },
  {
    step: "04",
    title: "Intake, assessment & care planning",
    description:
      "When appropriate, Eden may begin intake, clinical assessment, and individualized treatment planning with caregiver consent.",
    detail:
      "Service settings may include in-home ABA, clinic-based consultation, school collaboration, and parent training when clinically appropriate.",
  },
];

export const EDEN_SERVICES_FOR_REFERRALS = [
  {
    title: "In-home ABA therapy",
    description:
      "Evidence-informed support in the child's home and daily routines when clinically appropriate.",
    icon: "home" as const,
  },
  {
    title: "Clinic-based consultation & assessment",
    description:
      "Structured clinical consultation and assessment support at Eden's Annandale location.",
    icon: "clinic" as const,
  },
  {
    title: "School collaboration & IEP support",
    description:
      "Coordination with school teams when authorized and appropriate for the child's plan.",
    icon: "school" as const,
  },
  {
    title: "Parent training & caregiver guidance",
    description:
      "Practical coaching to help families support skill-building across home and community settings.",
    icon: "family" as const,
  },
  {
    title: "Autism screening & evaluation support",
    description:
      "Screening and evaluation pathways that may help families understand diagnostic and service next steps.",
    icon: "evaluation" as const,
  },
];

export const CLINICAL_COLLABORATION_POINTS = [
  {
    title: "Release of information",
    description:
      "Eden may coordinate with referring providers when families authorize release of information and when communication supports continuity of care.",
  },
  {
    title: "Progress & planning updates",
    description:
      "With consent, Eden may share appropriate treatment updates, coordination notes, or planning summaries that support collaborative care.",
  },
  {
    title: "HIPAA-conscious communication",
    description:
      "Communication practices are designed to respect privacy requirements. Eden does not represent that a full external provider portal is available unless explicitly implemented.",
  },
  {
    title: "Interdisciplinary alignment",
    description:
      "When authorized, Eden may discuss shared goals with speech, occupational, medical, and educational partners involved in the child's care.",
  },
];

export const PROVIDER_RESOURCE_CARDS = [
  {
    title: "Autism screening support",
    description:
      "Guidance on screening pathways and evaluation resources that may support early identification.",
    href: "/services/evaluations-diagnosis/screening-evaluation",
    icon: "screening" as const,
  },
  {
    title: "ABA therapy overview",
    description: "An overview of Eden's evidence-informed ABA approach for referred families.",
    href: "/aba-therapy/what-is-aba-therapy",
    icon: "aba" as const,
  },
  {
    title: "Insurance verification",
    description: "Information on how families may explore benefits and coverage with Eden's team.",
    href: "/insurance-coverage",
    icon: "insurance" as const,
  },
  {
    title: "Family intake",
    description: "The family intake process families may complete after a referral is received.",
    href: "/intake",
    icon: "intake" as const,
  },
  {
    title: "School collaboration",
    description: "How Eden may collaborate with school teams when appropriate and authorized.",
    href: "/services/school-based-aba-therapy",
    icon: "school" as const,
  },
  {
    title: "Clinical documentation coordination",
    description: "HIPAA-conscious communication practices when coordinating with referring providers.",
    href: "/providers/clinical-collaboration",
    icon: "documentation" as const,
  },
];

export const PROVIDER_FAQ = [
  {
    question: "Does Eden provide a diagnosis?",
    answer:
      "Eden may support screening and evaluation pathways, but does not guarantee diagnosis. Diagnostic determination depends on clinical evaluation, authorized records, and applicable professional standards.",
  },
  {
    question: "Will every referral be accepted for services?",
    answer:
      "No. Acceptance depends on clinical review, service area, staffing capacity, authorization requirements, and family readiness. Submitting a referral does not guarantee enrollment.",
  },
  {
    question: "Does Eden guarantee insurance coverage?",
    answer:
      "No. Eden may help families explore benefits and authorization requirements, but coverage and approval are determined by the payer and plan design.",
  },
  {
    question: "What information should I include in a referral?",
    answer:
      "Caregiver contact details, child age or date of birth, referral reason, and any authorized clinical or educational records are helpful. A signed release of information is needed before clinical records are shared.",
  },
  {
    question: "Can Eden communicate with my office about a referred patient?",
    answer:
      "Eden may communicate with referring providers when the family has authorized release of information and when communication is clinically appropriate.",
  },
  {
    question: "Does Eden collaborate with schools?",
    answer:
      "When families authorize it, Eden may coordinate with school or IEP teams to support aligned goals and skill generalization across settings.",
  },
  {
    question: "What is CentralReach Staff Login?",
    answer:
      "CentralReach Essentials is a staff clinical and operational platform for authorized Eden team members. It is not a public patient or provider referral portal unless Eden explicitly states otherwise.",
  },
  {
    question: "How quickly will Eden contact a referred family?",
    answer:
      "Contact timing may vary based on intake volume, information provided, and family availability. Eden does not guarantee immediate response or service start dates.",
  },
];

export const PROVIDER_COMPLIANCE_NOTE =
  "Submitting a referral does not guarantee acceptance, diagnosis, authorization, or immediate availability. Eligibility and service options may vary by plan, location, and clinical need. All services are subject to clinical review and applicable privacy requirements.";

export const PROVIDER_SECTION_NAV = [
  { label: "Overview", href: "/providers" },
  { label: "Refer a Child", href: "/providers/refer-a-child" },
  { label: "Referral Process", href: "/providers/referral-process" },
  { label: "Clinical Collaboration", href: "/providers/clinical-collaboration" },
];

export const PROVIDER_HUB_SECTION_IDS = {
  overview: "provider-overview",
  whoCanRefer: "who-can-refer",
  whenToRefer: "when-to-consider-aba",
  documents: "referral-documents",
  screening: "autism-screening-support",
  insurance: "insurance-intake-coordination",
  collaboration: "clinical-collaboration",
  schoolIep: "school-iep-coordination",
  familyComm: "family-communication",
  afterReferral: "after-referral",
  faq: "provider-faq",
  compliance: "provider-compliance",
} as const;
