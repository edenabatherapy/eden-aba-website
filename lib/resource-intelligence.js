export const PROFESSIONAL_ORGANIZATIONS = [
  {
    name: "CASP",
    category: "Autism service provider organization",
    logo: "/images/affiliations/casp-10-years.png",
    website: "https://www.casproviders.org",
    summary:
      "The Council of Autism Service Providers supports autism service providers through best-practice resources, advocacy, and quality-focused initiatives.",
  },
  {
    name: "ABAI",
    category: "Behavior analysis professional organization",
    logo: "/images/affiliations/abai.png",
    website: "https://www.abainternational.org",
    summary:
      "The Association for Behavior Analysis International connects behavior analysis researchers, educators, students, and practitioners through events, publications, and professional resources.",
  },
  {
    name: "APBA",
    category: "Professional behavior analyst association",
    logo: "/images/affiliations/apba.png",
    website: "https://www.apbahome.net",
    summary:
      "The Association of Professional Behavior Analysts promotes the professional practice of behavior analysis through advocacy, education, and resources.",
  },
  {
    name: "Autism Society",
    category: "Autism advocacy and family support",
    logo: "/images/affiliations/autism-society.png",
    website: "https://autismsociety.org",
    summary:
      "The Autism Society provides advocacy, education, community resources, and support for autistic individuals and their families.",
  },
  {
    name: "MABA",
    category: "State behavior analysis association",
    logo: "/images/affiliations/maba.png",
    website: "https://www.mdaba.org",
    summary:
      "The Maryland Association for Behavior Analysis supports behavior analysis professionals through education, events, and professional community resources.",
  },
  {
    name: "OAR",
    category: "Autism research and education",
    logo: "/images/affiliations/oar.png",
    website: "https://researchautism.org",
    summary:
      "The Organization for Autism Research funds practical autism research and provides evidence-based resources for families, educators, and communities.",
  },
  {
    name: "TACA",
    category: "Family education and autism support",
    logo: "/images/affiliations/taca.png",
    website: "https://tacanow.org",
    summary:
      "The Autism Community in Action provides education, support, and resources for families living with autism.",
  },
  {
    name: "VABA",
    category: "Virginia behavior analysis association",
    logo: "/images/affiliations/vaba.png",
    website: "https://virginiaaba.org",
    summary:
      "The Virginia Association for Behavior Analysis supports behavior analysis professionals in Virginia through advocacy, education, and membership resources.",
  },
];

export const IMPACT_STATS = [
  { id: "families", value: 500, suffix: "+", label: "Families Supported", icon: "users" },
  { id: "satisfaction", value: 95, suffix: "%", label: "Parent Satisfaction", icon: "heart" },
  { id: "insurance", value: 25, suffix: "+", label: "Insurance Plans Accepted", icon: "shield" },
  { id: "hours", value: 10000, suffix: "+", label: "Therapy Hours Delivered", icon: "clock" },
];

export const INSIGHT_METRICS = [
  {
    id: "trust",
    label: "Family Trust Index",
    formula: "500 × 95%",
    value: 475,
    display: "475",
    ringPct: 95,
    accent: "#2D8A43",
  },
  {
    id: "access",
    label: "Access Score",
    formula: "25 ÷ 30 × 100",
    value: 83,
    display: "83%",
    ringPct: 83,
    accent: "#2D9C9C",
  },
  {
    id: "hoursAvg",
    label: "Avg. Therapy Hours / Family",
    formula: "10,000 ÷ 500",
    value: 20,
    display: "20",
    ringPct: 72,
    accent: "#F4B54A",
  },
  {
    id: "impact",
    label: "Overall Impact Score",
    formula: "Trust + Access + Consistency",
    value: 92,
    display: "92/100",
    ringPct: 92,
    accent: "#173B2F",
  },
];

export const MATCHER_AGE_OPTIONS = ["under3", "3to5", "6to12", "13plus"];
export const MATCHER_CONCERN_OPTIONS = [
  "communication",
  "social",
  "behavior",
  "school",
  "diagnosis",
];
export const MATCHER_NEED_OPTIONS = [
  "evaluation",
  "aba",
  "insurance",
  "parentResources",
  "community",
];

/** Frontend-only recommendation engine */
export function getResourceRecommendations(age, concern, need) {
  const items = new Set();

  if (need === "evaluation" || concern === "diagnosis") {
    items.add("evaluationGuidance");
  }
  if (need === "aba" || concern === "behavior" || concern === "communication" || concern === "social") {
    items.add("abaSupport");
  }
  if (need === "insurance") {
    items.add("insuranceVerification");
  }
  if (need === "parentResources" || age === "under3" || age === "3to5") {
    items.add("parentResources");
  }
  if (need === "community" || concern === "social" || concern === "school") {
    items.add("autismSociety");
    items.add("tacaResources");
  }
  if (concern === "diagnosis" || need === "evaluation") {
    items.add("oarResources");
  }
  if (concern === "behavior" || need === "aba") {
    items.add("scheduleConsultation");
  }

  if (items.size === 0) {
    items.add("evaluationGuidance");
    items.add("parentResources");
  }

  return Array.from(items);
}
