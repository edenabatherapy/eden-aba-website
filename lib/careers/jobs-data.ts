import { ALL_JOBS as LEGACY_ALL_JOBS, type CareersJob } from "@/lib/careers-content";

export type CareersJobWithSlug = CareersJob & {
  slug: string;
  applyUrl: string;
};

/** Canonical URL slugs for job detail and apply routes */
const JOB_SLUG_OVERRIDES: Record<string, string> = {
  "rbt-annandale": "rbt",
  "bcba-annandale": "bcba",
  "behavior-technician": "bt",
  "clinical-supervisor-annandale": "clinical-supervisor-bcba",
  "director-rbt-development": "director-of-rbt-development",
};

function toSlug(value: string): string {
  if (JOB_SLUG_OVERRIDES[value]) {
    return JOB_SLUG_OVERRIDES[value];
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toApplyUrl(slug: string): string {
  return `/careers/apply?role=${slug}`;
}

const PIPELINE_JOBS: CareersJobWithSlug[] = [
  {
    id: "bcaba",
    slug: "bcaba",
    applyUrl: toApplyUrl("bcaba"),
    title: "Board Certified Assistant Behavior Analyst (BCaBA)",
    department: "Clinical Services",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Pipeline opportunity for BCaBA clinicians who want to strengthen treatment quality, technician coaching, and caregiver collaboration.",
    highlights: ["BCaBA pathway", "Clinical coaching", "Family-centered care", "Northern Virginia"],
    status: "Future Opening",
    experienceLevel: "Mid Level",
    credential: "BCaBA Preferred",
    workSetting: ["In-Home", "Community-Based", "Hybrid"],
    schedule: ["Morning", "Afternoon", "Flexible"],
    postedAt: "2026-06-20",
    keywords: ["BCaBA", "assistant behavior analyst", "ABA", "Virginia"],
    isFutureOpening: true,
    details: {
      overview:
        "Support BCBA-led treatment implementation, monitor data quality, and reinforce consistent caregiver communication across services.",
      responsibilities: [
        "Assist with plan implementation and case follow-through",
        "Coach direct team members on treatment consistency",
        "Review data trends and communicate clinical concerns",
        "Support family-centered care routines with supervising clinicians",
      ],
      qualifications: [
        "BCaBA credential preferred or active progression toward eligibility",
        "Applied experience in direct ABA service delivery",
        "Strong written documentation and communication habits",
      ],
      preferredExperience: [
        "Experience in in-home or community-based ABA settings",
        "Familiarity with Virginia payer documentation expectations",
      ],
      benefits: [
        "Role-based compensation with pathway growth planning",
        "Mentorship and supervision support",
        "Flexible scheduling design where role-appropriate",
      ],
      schedule: "Primarily weekday schedules with family-facing flexibility.",
      locationServiceArea: "Annandale and surrounding Northern Virginia service areas.",
      whyJoin: [
        "Family-centered care model",
        "Structured advancement opportunities",
        "Supportive clinical leadership culture",
      ],
    },
  },
  {
    id: "senior-rbt",
    slug: "senior-rbt",
    applyUrl: toApplyUrl("senior-rbt"),
    title: "Senior Registered Behavior Technician (Senior RBT)",
    department: "Clinical Services",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Pipeline role for experienced RBTs prepared to mentor peers and support treatment integrity across caseloads.",
    highlights: ["RBT advancement", "Peer mentorship", "Quality support", "Team leadership"],
    status: "Future Opening",
    experienceLevel: "Mid Level",
    credential: "RBT Required",
    workSetting: ["In-Home", "Community-Based", "Hybrid"],
    schedule: ["Morning", "Afternoon", "Flexible"],
    postedAt: "2026-06-20",
    keywords: ["senior RBT", "RBT lead", "ABA technician", "career growth"],
    isFutureOpening: true,
    details: {
      overview:
        "Provide advanced direct care while helping onboard and support technicians with consistency, communication, and treatment fidelity.",
      responsibilities: [
        "Model high-quality session implementation",
        "Support onboarding and peer coaching routines",
        "Partner with supervisors to monitor treatment integrity",
        "Facilitate caregiver communication handoffs",
      ],
      qualifications: [
        "Active RBT certification in good standing",
        "Demonstrated track record of reliable direct service delivery",
        "Strong communication and team collaboration skills",
      ],
      preferredExperience: [
        "Mentorship or peer coaching experience",
        "Exposure to diverse service settings and age groups",
      ],
      benefits: [
        "Leadership development within technician pathways",
        "Structured clinical feedback and mentoring support",
        "Growth planning toward lead or analyst roles",
      ],
      schedule: "Weekday sessions with some flexible service windows.",
      locationServiceArea: "Annandale and neighboring Northern Virginia communities.",
      whyJoin: [
        "Defined path from RBT to leadership",
        "Family-centered model with strong support systems",
        "Collaborative supervision culture",
      ],
    },
  },
  {
    id: "lead-rbt",
    slug: "lead-rbt",
    applyUrl: toApplyUrl("lead-rbt"),
    title: "Lead Registered Behavior Technician (Lead RBT)",
    department: "Clinical Services",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Pipeline leadership role for RBTs ready to coordinate technician workflows and strengthen consistency across service teams.",
    highlights: ["Lead technician", "Workflow coordination", "Training support", "Clinical partnership"],
    status: "Future Opening",
    experienceLevel: "Senior Level",
    credential: "RBT Required",
    workSetting: ["In-Home", "Community-Based", "Hybrid"],
    schedule: ["Morning", "Afternoon", "Flexible"],
    postedAt: "2026-06-20",
    keywords: ["lead RBT", "behavior technician leader", "ABA team lead"],
    isFutureOpening: true,
    details: {
      overview:
        "Coordinate front-line technician excellence through peer support, schedule awareness, and treatment consistency collaboration.",
      responsibilities: [
        "Support daily coordination for technician teams",
        "Escalate service quality concerns promptly",
        "Partner with supervisors on coaching priorities",
        "Promote family-centered communication consistency",
      ],
      qualifications: [
        "Active RBT certification and advanced direct care experience",
        "Strong reliability, organization, and communication skills",
        "Interest in mentorship and team support responsibilities",
      ],
      preferredExperience: [
        "Experience guiding new technicians",
        "Prior participation in quality improvement or onboarding support",
      ],
      benefits: [
        "Expanded leadership pathway within clinical services",
        "Mentorship from BCBA and leadership teams",
        "Career planning toward BCaBA/BCBA tracks",
      ],
      schedule: "Flexible weekday model aligned with caseload needs.",
      locationServiceArea: "Annandale, VA and greater Northern Virginia.",
      whyJoin: [
        "Visible leadership development track",
        "Family-centered and quality-focused culture",
        "Opportunity to shape technician excellence",
      ],
    },
  },
  {
    id: "senior-bcba",
    slug: "senior-bcba",
    applyUrl: toApplyUrl("senior-bcba"),
    title: "Senior Board Certified Behavior Analyst (Senior BCBA)",
    department: "Clinical Leadership",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Pipeline role for experienced BCBAs who lead complex case support, mentor analysts, and advance quality systems.",
    highlights: ["Senior BCBA", "Complex cases", "Mentorship", "Quality initiatives"],
    status: "Future Opening",
    experienceLevel: "Senior Level",
    credential: "BCBA Required",
    workSetting: ["Hybrid", "In-Home", "Community-Based"],
    schedule: ["Flexible", "Afternoon"],
    postedAt: "2026-06-20",
    keywords: ["senior BCBA", "ABA leadership", "clinical mentorship"],
    isFutureOpening: true,
    details: {
      overview:
        "Lead advanced clinical support, strengthen analyst development, and contribute to quality and consistency across service teams.",
      responsibilities: [
        "Support complex case review and treatment adaptation",
        "Coach BCBAs and supervisory staff on clinical decision quality",
        "Contribute to quality assurance and outcomes monitoring",
        "Partner with operations on scalable care delivery planning",
      ],
      qualifications: [
        "Active BCBA certification in good standing",
        "Demonstrated supervisory and coaching experience",
        "Strong data-informed clinical judgment",
      ],
      preferredExperience: [
        "Experience supporting multi-team caseloads",
        "Familiarity with Virginia Medicaid and commercial authorization contexts",
      ],
      benefits: [
        "Senior clinical leadership progression pathway",
        "Cross-functional collaboration with operations and quality teams",
        "Support for long-term leadership growth",
      ],
      schedule: "Flexible leadership schedule with family and team meeting support.",
      locationServiceArea: "Northern Virginia service markets with Annandale hub support.",
      whyJoin: [
        "Strong quality and mentorship emphasis",
        "Family-centered care model",
        "Regional leadership growth opportunities",
      ],
    },
  },
  {
    id: "intake-coordinator",
    slug: "intake-coordinator",
    applyUrl: toApplyUrl("intake-coordinator"),
    title: "Intake Coordinator",
    department: "Client Experience",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Pipeline role focused on helping families navigate onboarding, documentation readiness, and care-start coordination.",
    highlights: ["Family onboarding", "Care coordination", "Documentation workflows", "Client support"],
    status: "Future Opening",
    experienceLevel: "Mid Level",
    credential: "No Credential Required",
    workSetting: ["Hybrid", "Center-Based"],
    schedule: ["Morning", "Afternoon", "Flexible"],
    postedAt: "2026-06-20",
    keywords: ["intake", "family support", "care coordination", "ABA operations"],
    isFutureOpening: true,
    details: {
      overview:
        "Guide prospective families through intake readiness, timeline communication, and transition into active services.",
      responsibilities: [
        "Coordinate intake checkpoints and required documentation",
        "Communicate timelines and next steps with families",
        "Collaborate with clinical and scheduling teams for service launch readiness",
        "Maintain accurate intake records and status updates",
      ],
      qualifications: [
        "Experience in healthcare intake, care coordination, or client services",
        "Excellent communication and empathy with family-facing interactions",
        "Strong organization and follow-through",
      ],
      preferredExperience: [
        "Behavioral health or pediatric service intake experience",
        "Bilingual communication capabilities",
      ],
      benefits: [
        "Mission-driven work with family impact",
        "Cross-functional collaboration opportunities",
        "Professional development support",
      ],
      schedule: "Weekday schedule with family communication flexibility.",
      locationServiceArea: "Annandale clinic supporting Northern Virginia families.",
      whyJoin: [
        "Direct family-centered impact",
        "Collaborative team environment",
        "Clear advancement opportunities",
      ],
    },
  },
  {
    id: "scheduling-coordinator",
    slug: "scheduling-coordinator",
    applyUrl: toApplyUrl("scheduling-coordinator"),
    title: "Scheduling Coordinator",
    department: "Operations",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Pipeline role for operations professionals who coordinate schedules that support continuity of care and staff sustainability.",
    highlights: ["Scheduling systems", "Care continuity", "Operations coordination", "Team communication"],
    status: "Future Opening",
    experienceLevel: "Mid Level",
    credential: "No Credential Required",
    workSetting: ["Hybrid", "Center-Based"],
    schedule: ["Morning", "Afternoon", "Flexible"],
    postedAt: "2026-06-20",
    keywords: ["scheduling", "operations", "caseload planning", "ABA"],
    isFutureOpening: true,
    details: {
      overview:
        "Coordinate clinician and technician schedules to maintain service reliability, family communication, and efficient coverage planning.",
      responsibilities: [
        "Build and maintain role-aligned service schedules",
        "Coordinate schedule changes with families and clinical teams",
        "Track service gaps and support continuity planning",
        "Collaborate on workflow improvements and reporting",
      ],
      qualifications: [
        "Experience with scheduling or care coordination systems",
        "Detail-oriented communication and organization",
        "Ability to manage multiple moving priorities",
      ],
      preferredExperience: [
        "Healthcare or behavioral health operations experience",
        "Familiarity with caseload and coverage planning in service environments",
      ],
      benefits: [
        "Stable operations growth pathway",
        "Cross-team exposure to clinical and family support workflows",
        "Structured onboarding and process support",
      ],
      schedule: "Weekday operational coverage with occasional extended support windows.",
      locationServiceArea: "Annandale operations hub supporting Northern Virginia service areas.",
      whyJoin: [
        "Meaningful impact on family service continuity",
        "Collaborative operations culture",
        "Defined growth opportunities",
      ],
    },
  },
  {
    id: "parent-training-specialist",
    slug: "parent-training-specialist",
    applyUrl: toApplyUrl("parent-training-specialist"),
    title: "Parent Training Specialist",
    department: "Clinical Services",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Pipeline role supporting caregiver coaching, treatment carryover, and family-centered behavior support implementation.",
    highlights: ["Caregiver coaching", "Family partnership", "Treatment carryover", "Clinical collaboration"],
    status: "Future Opening",
    experienceLevel: "Senior Level",
    credential: "RBT Preferred",
    workSetting: ["In-Home", "Community-Based", "Hybrid"],
    schedule: ["Afternoon", "Evening", "Flexible"],
    postedAt: "2026-06-20",
    keywords: ["parent training", "caregiver coaching", "family centered ABA"],
    isFutureOpening: true,
    details: {
      overview:
        "Deliver practical caregiver coaching that supports generalization, confidence, and consistency across home routines.",
      responsibilities: [
        "Coach caregivers on role-appropriate behavior support practices",
        "Coordinate parent training goals with supervising clinicians",
        "Document coaching progress and implementation barriers",
        "Promote respectful, culturally responsive caregiver communication",
      ],
      qualifications: [
        "Experience in caregiver coaching, parent training, or direct ABA roles",
        "Strong communication and relationship-building skills",
        "Comfort with collaborative clinical coordination",
      ],
      preferredExperience: [
        "RBT credential or comparable clinical support background",
        "Experience with family training in in-home or community contexts",
      ],
      benefits: [
        "Family-centered role with direct impact",
        "Mentorship and interdisciplinary collaboration",
        "Pathway opportunities into advanced clinical roles",
      ],
      schedule: "Flexible model with caregiver-friendly afternoon and evening windows.",
      locationServiceArea: "Northern Virginia with Annandale-based coordination.",
      whyJoin: [
        "High-impact family partnership focus",
        "Clinical coaching and growth support",
        "Values-driven care culture",
      ],
    },
  },
  {
    id: "clinical-quality-supervisor",
    slug: "clinical-quality-supervisor",
    applyUrl: toApplyUrl("clinical-quality-supervisor"),
    title: "Clinical Quality Supervisor",
    department: "Clinical Leadership",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Pipeline leadership role focused on documentation quality, supervision standards, and measurable care improvement initiatives.",
    highlights: ["Quality assurance", "Clinical standards", "Supervisor coaching", "Virginia care context"],
    status: "Future Opening",
    experienceLevel: "Leadership",
    credential: "BCBA Required",
    workSetting: ["Hybrid", "Center-Based", "In-Home"],
    schedule: ["Flexible"],
    postedAt: "2026-06-20",
    keywords: ["clinical quality", "BCBA leadership", "quality assurance", "ABA standards"],
    isFutureOpening: true,
    details: {
      overview:
        "Lead quality systems that strengthen treatment integrity, documentation reliability, and supervisory consistency across service lines.",
      responsibilities: [
        "Implement and monitor quality review workflows",
        "Coach teams on documentation and treatment consistency",
        "Partner with leadership on performance improvement initiatives",
        "Support educational awareness of DBHDS and Medicaid-related workflow implications",
      ],
      qualifications: [
        "Active BCBA certification with supervisory experience",
        "Strong record of documentation quality and case oversight",
        "Clear communication and training facilitation skills",
      ],
      preferredExperience: [
        "Quality assurance or clinical auditing experience",
        "Exposure to payer-facing workflow standards in Virginia service settings",
      ],
      benefits: [
        "Leadership trajectory toward regional clinical direction",
        "Cross-functional strategic influence",
        "Team-centered coaching environment",
      ],
      schedule: "Leadership flexibility with periodic cross-team quality meetings.",
      locationServiceArea: "Annandale and Northern Virginia program oversight.",
      whyJoin: [
        "Quality-first mission and systems focus",
        "Meaningful mentorship and leadership impact",
        "Long-term regional growth opportunities",
      ],
    },
  },
];

const BASE_JOBS: CareersJobWithSlug[] = LEGACY_ALL_JOBS.map((job) => ({
  ...job,
  slug: toSlug(job.id),
  applyUrl: toApplyUrl(toSlug(job.id)),
}));

export const ALL_JOBS: CareersJobWithSlug[] = [...BASE_JOBS, ...PIPELINE_JOBS];

export function isJobOpen(job: CareersJobWithSlug): boolean {
  return !job.isFutureOpening && job.status !== "Future Opening";
}

/** Active Annandale roles for homepage highlights — excludes closed and future openings */
export const HOMEPAGE_OPEN_JOBS: CareersJobWithSlug[] = ALL_JOBS.filter(
  (job) => job.location === "Annandale, VA" && isJobOpen(job),
);

export function getJobSlugById(jobId: string): string | undefined {
  const job = ALL_JOBS.find((entry) => entry.id === jobId);
  return job?.slug;
}
