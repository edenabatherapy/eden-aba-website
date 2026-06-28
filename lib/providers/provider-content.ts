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

/** Accurate trust signals for a single-location regional provider — no inflated claims. */
export const PROVIDER_TRUST_SIGNALS = [
  {
    label: "Regional focus",
    value: "Northern Virginia",
    detail: "In-home and clinic-based services centered in Annandale.",
  },
  {
    label: "Care model",
    value: "Evidence-informed ABA",
    detail: "Individualized plans with family partnership and clinical oversight.",
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
    title: "Pediatricians",
    description: "Primary care and developmental medicine providers supporting early identification.",
  },
  {
    title: "Psychologists & psychiatrists",
    description: "Behavioral health clinicians referring for ABA coordination after assessment.",
  },
  {
    title: "Schools & IEP teams",
    description: "Educators and specialists connecting families with community-based support.",
  },
  {
    title: "Allied health professionals",
    description: "Speech, occupational therapy, and related providers collaborating on care goals.",
  },
  {
    title: "Social workers & case managers",
    description: "Community professionals helping families navigate services and next steps.",
  },
  {
    title: "Community clinics & family organizations",
    description: "Local partners supporting families seeking autism and developmental services.",
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
    title: "School & community coordination",
    description:
      "When authorized, Eden may collaborate with school teams and community partners involved in the child's support plan.",
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

export const PROVIDER_COMPLIANCE_NOTE =
  "Submitting a referral does not guarantee acceptance, diagnosis, authorization, or immediate availability. Eligibility and service options may vary by plan, location, and clinical need.";

export const PROVIDER_SECTION_NAV = [
  { label: "Overview", href: "/providers" },
  { label: "Refer a Child", href: "/providers/refer-a-child" },
  { label: "Referral Process", href: "/providers/referral-process" },
  { label: "Clinical Collaboration", href: "/providers/clinical-collaboration" },
];
