import { getJobDetailsPath } from "@/lib/careers-routes";

export const CAREERS_HOME_RECRUITING_EMAIL = "info@edenabatherapy.com";

export const CAREERS_HOME_HERO_COPY = {
  badge: "Now Hiring in Annandale, Virginia",
  location: "Annandale, VA · Northern Virginia",
  title: "Build a Meaningful Career in Autism Care",
  subtitle:
    "Join Eden ABA Therapy and help children, families, and communities thrive through compassionate, evidence-based ABA services across Annandale and Northern Virginia.",
  searchRoles: "Search Open Roles",
  viewPaths: "View Career Paths",
  joinNetwork: "Join Talent Network",
  journeyLabel: "Your Career Journey",
  journeyAria: "Your career journey at Eden",
};

export const CAREERS_HOME_HERO_JOURNEY = [
  { step: 1, label: "Apply" },
  { step: 2, label: "Interview" },
  { step: 3, label: "Onboarding" },
  { step: 4, label: "Supervised Care" },
  { step: 5, label: "Growth Path" },
];

export const CAREERS_HOME_SNAPSHOT_STATS = [
  { title: "7+ Current Role Types", description: "Clinical, leadership, and operations pathways across Eden." },
  { title: "Annandale Hiring Hub", description: "Primary location for active recruiting and onboarding." },
  { title: "Northern Virginia Growth", description: "Expanding access across high-need Virginia communities." },
  { title: "Clinical + Operations Careers", description: "Roles for clinicians, technicians, and support professionals." },
];

export const CAREERS_HOME_WHY_JOIN_CARDS = [
  {
    title: "Family-centered care",
    description: "Teams prioritize caregiver partnership, respectful communication, and practical treatment carryover.",
  },
  {
    title: "Supervision and mentorship",
    description: "Structured feedback, case consultation, and coaching designed to strengthen clinical quality.",
  },
  {
    title: "Growth pathways",
    description: "Credential-aware advancement from direct care through senior clinical and leadership roles.",
  },
  {
    title: "Quality-first operations",
    description: "Clinical and operations teams collaborate on documentation integrity and service coordination.",
  },
];

export type CareersHomeRoleCard = {
  title: string;
  href: string;
  openingsHref?: string;
  description: string;
  bestFit: string;
  growthPath: string;
};

export const CAREERS_HOME_ROLE_CARDS: CareersHomeRoleCard[] = [
  {
    title: "Behavior Technician (BT)",
    href: "/careers/bt",
    openingsHref: getJobDetailsPath("behavior-technician"),
    description: "Entry-level direct care with structured coaching toward RBT readiness.",
    bestFit: "Candidates new to ABA who want hands-on experience with mentorship.",
    growthPath: "BT → RBT → Senior RBT → Lead RBT → BCaBA → BCBA",
  },
  {
    title: "Registered Behavior Technician (RBT)",
    href: "/careers/rbt",
    openingsHref: getJobDetailsPath("rbt-annandale"),
    description: "Credential-backed direct therapy under BCBA supervision.",
    bestFit: "Active or eligible RBTs who value treatment fidelity and family partnership.",
    growthPath: "BT → RBT → Senior RBT → Lead RBT → BCaBA → BCBA",
  },
  {
    title: "Board Certified Behavior Analyst (BCBA)",
    href: "/careers/bcba",
    openingsHref: getJobDetailsPath("bcba-annandale"),
    description: "Graduate-level clinical leadership, supervision, and treatment planning.",
    bestFit: "Licensed BCBAs ready to lead caseloads, teams, and caregiver collaboration.",
    growthPath: "BT → RBT → Senior RBT → Lead RBT → BCaBA → BCBA",
  },
  {
    title: "Board Certified Assistant Behavior Analyst (BCaBA)",
    href: "/careers/bcaba",
    openingsHref: getJobDetailsPath("bcaba"),
    description: "Undergraduate-level credential supporting implementation under BCBA oversight.",
    bestFit: "BCaBAs or candidates progressing toward mid-level clinical support roles.",
    growthPath: "BT → RBT → Senior RBT → Lead RBT → BCaBA → BCBA",
  },
  {
    title: "Operations & Client Experience",
    href: "/careers/open-roles",
    openingsHref: getJobDetailsPath("client-services-coordinator"),
    description: "Intake, scheduling, client services, and operational excellence roles.",
    bestFit: "Professionals who support families, scheduling, and service continuity behind the scenes.",
    growthPath: "Coordinator → Operations leadership tracks",
  },
];

export const CAREERS_HOME_FIND_YOUR_FIT = [
  { label: "I'm new to ABA", cta: "BT Careers", href: "/careers/bt" },
  { label: "I'm already an RBT", cta: "RBT Careers", href: "/careers/rbt" },
  { label: "I'm a BCBA", cta: "BCBA Careers", href: "/careers/bcba" },
  { label: "I want to see growth pathways", cta: "Career Paths", href: "/careers/career-paths" },
  { label: "I'm interested in operations", cta: "Operations Roles", href: "/careers/open-roles" },
  { label: "I'm not sure", cta: "Talent Network", href: "/careers/talent-network" },
];

export const CAREERS_HOME_BENEFITS = [
  {
    title: "Competitive role-based compensation",
    description: "Transparent pay bands reviewed regularly with clear growth expectations.",
  },
  {
    title: "Clinical mentorship",
    description: "Structured feedback, supervision, and case consultation for clinical roles.",
  },
  {
    title: "Continuing education and development",
    description: "Internal training, mentorship tracks, and role-aligned professional development.",
  },
  {
    title: "Flexible scheduling where role-appropriate",
    description: "Scheduling designed to balance child needs, continuity, and staff sustainability.",
  },
  {
    title: "Family-centered culture",
    description: "Caregiver partnership and respectful communication across home and community settings.",
  },
  {
    title: "Quality-first operations support",
    description: "Documentation integrity, service coordination, and continuous quality improvement.",
  },
];

export const CAREERS_HOME_BENEFITS_DISCLAIMER =
  "Benefits, schedules, compensation, and growth opportunities may vary by role, location, employment status, and company needs.";

export const CAREERS_HOME_HIRING_STEPS = [
  { title: "Apply online", description: "Submit your application for an active role or join the talent network." },
  { title: "Recruiting review", description: "Our team reviews role alignment, credentials, and service-area fit." },
  { title: "Phone or video conversation", description: "Discuss schedule needs, expectations, and career interests." },
  { title: "Clinical or role-specific interview", description: "Meet leaders for values and competency alignment." },
  { title: "Offer and onboarding", description: "Complete references, credential checks as needed, and onboarding prep." },
  { title: "Begin training and support", description: "Start orientation, supervision, and role-specific training." },
];

export type CareersHomeLocation = {
  city: string;
  label: "Current hiring hub" | "Future growth area";
  description: string;
};

export const CAREERS_HOME_LOCATIONS: CareersHomeLocation[] = [
  {
    city: "Annandale",
    label: "Current hiring hub",
    description: "Eden's primary hiring hub for in-home and community-based ABA across Northern Virginia.",
  },
  {
    city: "Fairfax",
    label: "Future growth area",
    description: "Planned growth with high demand for in-home and community-based services.",
  },
  {
    city: "Falls Church",
    label: "Future growth area",
    description: "Priority area for family-centered care teams and technician pathway hiring.",
  },
  {
    city: "Springfield",
    label: "Future growth area",
    description: "Target market for expanding BT, RBT, and parent coaching support.",
  },
  {
    city: "Alexandria",
    label: "Future growth area",
    description: "Future clinical and client services roles supporting coordinated care access.",
  },
  {
    city: "Arlington",
    label: "Future growth area",
    description: "Strategic expansion for BCBA supervision and caregiver collaboration.",
  },
  {
    city: "Tysons",
    label: "Future growth area",
    description: "Operationally significant region for scalable scheduling and quality-focused delivery.",
  },
  {
    city: "Vienna",
    label: "Future growth area",
    description: "Growth corridor for clinician-led in-home ABA and caregiver training.",
  },
  {
    city: "McLean",
    label: "Future growth area",
    description: "Planned service area for high-touch family engagement and treatment continuity.",
  },
  {
    city: "Woodbridge",
    label: "Future growth area",
    description: "Emerging region for culturally responsive, family-centered ABA support.",
  },
  {
    city: "Manassas",
    label: "Future growth area",
    description: "Longer-term growth market aligned to workforce development goals.",
  },
];

export const CAREERS_HOME_COMPLIANCE_COPY =
  "Eden values ethical care, documentation quality, treatment integrity, caregiver communication, and supervision systems. Career pathways are designed with educational awareness of BACB supervision themes, Virginia DBHDS provider culture, Medicaid documentation expectations, and family-centered ABA practice.";

export const CAREERS_HOME_COMPLIANCE_DISCLAIMER =
  "This content is informational only and does not provide credentialing, legal, billing, licensing, or regulatory advice.";
