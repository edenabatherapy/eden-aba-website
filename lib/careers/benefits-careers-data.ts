import type { CareerFaqItem } from "./faq-data";

export const BENEFITS_CAREERS_META = {
  title: "Benefits & Compensation | Eden ABA Therapy Careers",
  description:
    "Explore benefits and compensation at Eden ABA Therapy—health and wellness, paid time off, professional development, continuing education, competitive pay, referral rewards, and FAQs for clinical and operations roles across Northern Virginia.",
};

export const BENEFITS_SECTION_NAV = [
  { id: "benefits-overview", label: "Benefits Overview" },
  { id: "health-wellness", label: "Health & Wellness" },
  { id: "pto-leave", label: "PTO & Leave" },
  { id: "compensation-philosophy", label: "Compensation Philosophy" },
  { id: "salary-estimator", label: "Salary Estimator" },
  { id: "benefits-faq", label: "Benefits FAQ" },
] as const;

export const BENEFITS_STATS = [
  { value: 7, suffix: "+", label: "Role types", description: "Clinical, leadership, and operations pathways" },
  { value: 6, suffix: "+", label: "Support pillars", description: "Health, growth, time off, training, pay, referrals" },
  { value: 100, suffix: "%", label: "Mission-driven", description: "Family-centered care at the center of every role" },
  { value: 1, label: "Northern Virginia hub", description: "Annandale-based recruiting and onboarding" },
];

export const BENEFITS_OVERVIEW_CARDS = [
  {
    title: "Total rewards philosophy",
    description:
      "Eden approaches compensation and benefits as part of a total rewards strategy—supporting clinicians and staff with competitive pay, role-based development, and resources that help you deliver consistent, family-centered care.",
  },
  {
    title: "Employee support programs",
    description:
      "From onboarding through advancement, Eden emphasizes supervision, mentorship, scheduling coordination, and practical tools that help team members feel prepared—not overwhelmed—in their roles.",
  },
  {
    title: "Family-centered workplace",
    description:
      "The same values that guide client care shape our workplace: respectful communication, collaboration, ethical practice, and sustainable growth for the professionals who serve Northern Virginia families.",
  },
];

export const BENEFITS_HEALTH_ITEMS = [
  { title: "Medical", description: "Role-eligible medical benefit options may be available depending on employment classification and plan offerings." },
  { title: "Dental", description: "Dental coverage may support preventive care and ongoing oral health for eligible team members." },
  { title: "Vision", description: "Vision benefits may be available where applicable to support eye care and corrective services." },
  { title: "Mental wellness resources", description: "Access to mental wellness support and stress-management resources may be offered to eligible employees." },
  { title: "Employee assistance programs", description: "EAP-style resources may provide confidential support for personal, family, and work-life concerns." },
];

export const BENEFITS_PTO_ITEMS = [
  { title: "Paid time off (PTO)", description: "Accrued PTO may be available for eligible roles to support rest, recovery, and personal time." },
  { title: "Holidays", description: "Observed holidays may apply based on role, schedule, and organizational calendar." },
  { title: "Sick leave", description: "Sick leave policies may support team members when illness or medical needs arise." },
  { title: "Work-life flexibility", description: "Scheduling teams work to balance child and family service needs with sustainable staff schedules where role-appropriate." },
];

export const BENEFITS_PRO_DEV_ITEMS = [
  { title: "Clinical training", description: "Structured onboarding, ABA fundamentals, and role-specific clinical education." },
  { title: "Mentorship", description: "Supervisor coaching, case consultation, and feedback loops aligned to your credential level." },
  { title: "Leadership development", description: "Pathway awareness and development conversations for senior clinical and operational roles." },
  { title: "Skill-building workshops", description: "Internal training on documentation, family communication, ethical practice, and treatment fidelity." },
];

export const BENEFITS_CE_ITEMS = [
  { title: "CEU support", description: "Continuing education culture that may include internal training, mentorship, and professional development planning." },
  { title: "RBT support", description: "Supervised practice, competency planning, and pathway awareness toward RBT certification and renewal." },
  { title: "BCBA development", description: "Case consultation, supervision systems exposure, and growth conversations for graduate-level clinicians." },
  { title: "Certification assistance", description: "Educational awareness and organizational support for credential pathways where role-eligible—not legal or regulatory advice." },
];

export const BENEFITS_COMPENSATION_ITEMS = [
  { title: "Competitive compensation philosophy", description: "Role-based pay bands reviewed with transparency and growth expectations where applicable." },
  { title: "Performance recognition", description: "Feedback, competency milestones, and advancement conversations tied to clinical quality and reliability." },
  { title: "Advancement opportunities", description: "Credential-aware pathways from BT through BCBA and advanced leadership for experienced clinicians." },
];

export const BENEFITS_REFERRAL_ITEMS = [
  { title: "Employee referral incentives", description: "Refer qualified candidates for open roles and may be eligible for referral rewards when hiring criteria are met." },
  { title: "Team growth rewards", description: "Help Eden build a mission-driven team while supporting Northern Virginia families through expanded access to care." },
];

export const BENEFITS_TIMELINE = [
  { phase: "Day 1", title: "Welcome & orientation", description: "Role clarity, systems access, and introduction to Eden's clinical and operational expectations." },
  { phase: "Week 1–4", title: "Supervised practice", description: "Hands-on coaching, observation, and feedback aligned to your credential and caseload." },
  { phase: "Month 2–3", title: "Skill consolidation", description: "Documentation habits, family communication, and treatment fidelity milestones." },
  { phase: "Ongoing", title: "Growth planning", description: "Development conversations, CEU culture, and pathway awareness toward your next role." },
];

export const BENEFITS_FAQ_BENEFITS = [
  {
    question: "What benefits does Eden ABA Therapy offer?",
    answer:
      "Eden may offer role-based compensation, health and wellness benefits, paid time off, clinical supervision, training, scheduling support, mentorship, referral incentives, and career development resources. Specific offerings vary by role, location, and employment status.",
  },
  {
    question: "Do benefits vary by role?",
    answer:
      "Yes. Benefits, schedules, compensation, and support structures may vary by role, credential status, location, and employment classification.",
  },
  {
    question: "How do I learn what benefits apply to a specific role?",
    answer:
      "Review the job posting, speak with recruiting during the hiring process, or join the talent network to discuss role-specific expectations.",
  },
];

export const BENEFITS_FAQ_ELIGIBILITY = [
  {
    question: "When do benefits become effective?",
    answer:
      "Benefit eligibility and effective dates may depend on employment classification, hours, and plan requirements. Recruiting can share role-specific details during the hiring process.",
  },
  {
    question: "Are part-time roles eligible for benefits?",
    answer:
      "Eligibility may differ for part-time, full-time, and per-diem classifications. Review individual job postings or ask recruiting for details.",
  },
  {
    question: "Can operations team members access the same support?",
    answer:
      "Operations and client experience roles may include competitive compensation, scheduling support, professional development, and growth opportunities aligned to their function.",
  },
];

export const BENEFITS_FAQ_TRAINING = [
  {
    question: "Is training provided?",
    answer:
      "New hires may receive onboarding, ABA fundamentals education, documentation guidance, and role-specific training. Training scope varies by position.",
  },
  {
    question: "Is supervision available?",
    answer:
      "Clinical roles typically include supervision and coaching aligned to BACB-aware expectations where applicable. Supervision structures vary by role and credential requirements.",
  },
  {
    question: "Does Eden support CEU and certification pathways?",
    answer:
      "Eden emphasizes continuing education culture, RBT and BCBA development support, and credential pathway awareness. Specific assistance varies by role and organizational needs.",
  },
];

export const BENEFITS_HERO_BADGES = [
  "Health & Wellness",
  "Paid Time Off",
  "Professional Development",
  "Competitive Pay",
  "Referral Rewards",
] as const;

export const BENEFITS_HERO_JOURNEY = [
  { step: 1, label: "Join Eden" },
  { step: 2, label: "Receive role-based support" },
  { step: 3, label: "Build clinical confidence" },
  { step: 4, label: "Grow your skills" },
  { step: 5, label: "Advance your career" },
];

export const BENEFITS_WHY_MATTER_CARDS = [
  {
    title: "Feel supported in your role",
    description: "Onboarding, supervision, and team communication designed to help you start strong and stay prepared.",
  },
  {
    title: "Build confidence through feedback",
    description: "Practical coaching and case consultation that may include structured supervisor feedback loops.",
  },
  {
    title: "Grow through clear pathways",
    description: "Role-aware advancement conversations from direct care through clinical and leadership tracks.",
  },
  {
    title: "Serve families with consistency",
    description: "Scheduling and operations support that helps protect service continuity for children and caregivers.",
  },
];

export type BenefitsCategory = {
  id: string;
  title: string;
  items: string[];
};

export const BENEFITS_CATEGORIES: BenefitsCategory[] = [
  {
    id: "financial",
    title: "Financial Support",
    items: [
      "Competitive role-based compensation language",
      "Transparent growth conversations where applicable",
      "Role-specific pay structures where applicable",
      "Performance and advancement discussions where applicable",
    ],
  },
  {
    id: "scheduling",
    title: "Scheduling Support",
    items: [
      "Flexible scheduling where role-appropriate",
      "Caseload continuity planning",
      "Support from scheduling and operations teams",
      "Consideration for family needs, travel, and service consistency",
    ],
  },
  {
    id: "clinical",
    title: "Clinical Growth",
    items: [
      "Supervision and coaching",
      "Practical feedback",
      "Case consultation",
      "RBT development support",
      "BCBA mentorship and leadership pathways",
    ],
  },
  {
    id: "training",
    title: "Training & Development",
    items: [
      "New hire onboarding",
      "ABA fundamentals training",
      "Documentation expectations",
      "Ethical practice education",
      "Continuing education culture",
      "Leadership development opportunities",
    ],
  },
  {
    id: "wellbeing",
    title: "Wellbeing & Team Culture",
    items: [
      "Respectful communication",
      "Team collaboration",
      "Family-centered mission",
      "Supportive supervision culture",
      "Sustainable growth mindset",
      "Values-based care environment",
    ],
  },
  {
    id: "advancement",
    title: "Career Advancement",
    items: [
      "BT to RBT pathway",
      "Senior RBT / Lead RBT opportunities",
      "BCaBA / BCBA growth awareness",
      "Senior BCBA and clinical leadership pathways",
      "Operations and client experience growth",
    ],
  },
];

export const BENEFITS_SUPPORT_SYSTEM = [
  { title: "Role clarity", description: "Know what success looks like." },
  { title: "Coaching", description: "Receive practical feedback from supervisors." },
  { title: "Scheduling support", description: "Work with operations to protect service continuity." },
  { title: "Documentation culture", description: "Build strong professional habits." },
  { title: "Growth planning", description: "Explore your next step." },
  { title: "Family partnership", description: "Stay connected to the mission behind the work." },
];

export type BenefitsByStage = {
  id: string;
  title: string;
  items: string[];
};

export const BENEFITS_BY_STAGE: BenefitsByStage[] = [
  {
    id: "bt",
    title: "For Behavior Technicians",
    items: [
      "Entry-level support",
      "Session preparation guidance",
      "Supervisor feedback",
      "RBT pathway awareness",
      "Growth into Senior RBT / Lead RBT",
    ],
  },
  {
    id: "rbt",
    title: "For RBTs",
    items: [
      "Supervised clinical development",
      "Treatment fidelity coaching",
      "Data and documentation support",
      "Career ladder options",
      "BCaBA / BCBA pathway awareness",
    ],
  },
  {
    id: "bcba",
    title: "For BCBAs",
    items: [
      "Clinical collaboration",
      "Case consultation",
      "Supervision systems",
      "Family communication support",
      "Senior BCBA and leadership pathways",
    ],
  },
  {
    id: "leadership",
    title: "For Clinical Leaders",
    items: [
      "Quality systems involvement",
      "Workforce development",
      "Regional growth opportunities",
      "Leadership mentorship",
      "Clinical governance culture",
    ],
  },
  {
    id: "operations",
    title: "For Operations / Client Experience",
    items: [
      "Mission-driven administrative work",
      "Scheduling and care coordination impact",
      "Family communication support",
      "Process improvement opportunities",
      "Growth with expanding service areas",
    ],
  },
];

export const BENEFITS_GROWTH_PATH = [
  { stage: "BT", note: "Entry-level onboarding and supervisor-guided session support." },
  { stage: "RBT", note: "Credential-backed development with treatment fidelity coaching." },
  { stage: "Senior RBT", note: "Peer modeling and expanded clinical responsibility where applicable." },
  { stage: "Lead RBT", note: "Team coordination support and pathway planning toward BCaBA or BCBA." },
  { stage: "BCaBA", note: "Mid-level clinical support under BCBA direction where role-eligible." },
  { stage: "BCBA", note: "Supervision, case consultation, and family training leadership." },
];

export const BENEFITS_PRO_DEV_CARDS = [
  { title: "New hire onboarding", description: "Structured orientation to Eden's clinical and operational expectations." },
  { title: "Supervisor feedback", description: "Regular coaching conversations that may include observation and competency planning." },
  { title: "Clinical mentorship", description: "Case consultation and skill-building support aligned to your role." },
  { title: "Documentation skills", description: "Education on documentation quality and treatment record expectations." },
  { title: "Ethical ABA practice", description: "Training culture centered on respectful, evidence-informed care." },
  { title: "Family communication", description: "Support for caregiver partnership and practical carryover routines." },
  { title: "Leadership readiness", description: "Pathway awareness for senior clinical and leadership roles where applicable." },
  { title: "Continuing learning culture", description: "Ongoing development planning that may include internal training and mentorship." },
];

export const BENEFITS_COMPARISON = [
  { candidate: "Clear expectations", eden: "Role clarity, onboarding, and communication." },
  { candidate: "Supportive supervision", eden: "Practical feedback and clinical collaboration." },
  { candidate: "Growth opportunities", eden: "Career pathways from BT through leadership." },
  { candidate: "Meaningful work", eden: "Family-centered ABA care and measurable progress." },
  { candidate: "Sustainable schedules", eden: "Scheduling coordination where role-appropriate." },
];

export const BENEFITS_FAQ_ITEMS: CareerFaqItem[] = [
  {
    question: "What benefits does Eden ABA Therapy offer?",
    answer:
      "Eden may offer role-based compensation, clinical supervision, training, scheduling support, mentorship, and career development resources. Specific offerings vary by role, location, and employment status.",
  },
  {
    question: "Do benefits vary by role?",
    answer:
      "Yes. Benefits, schedules, compensation, and support structures may vary by role, credential status, location, and employment classification.",
  },
  {
    question: "Does Eden support career growth?",
    answer:
      "Eden emphasizes structured pathways from BT and RBT roles through BCBA and clinical leadership tracks, depending on performance, credential eligibility, and organizational needs.",
  },
  {
    question: "Is training provided?",
    answer:
      "New hires may receive onboarding, ABA fundamentals education, documentation guidance, and role-specific training. Training scope varies by position.",
  },
  {
    question: "Is supervision available?",
    answer:
      "Clinical roles typically include supervision and coaching aligned to BACB-aware expectations where applicable. Supervision structures vary by role and credential requirements.",
  },
  {
    question: "Are schedules flexible?",
    answer:
      "Flexible scheduling may be available where role-appropriate. Scheduling teams work to balance child needs, service continuity, and staff sustainability.",
  },
  {
    question: "Does Eden support RBT growth?",
    answer:
      "Eden may support RBT development through feedback, treatment fidelity coaching, and pathway awareness toward Senior RBT, Lead RBT, and BCBA tracks.",
  },
  {
    question: "Does Eden support BCBA leadership growth?",
    answer:
      "BCBAs may access case consultation, supervision systems support, and awareness of Senior BCBA and clinical leadership pathways based on experience and organizational needs.",
  },
  {
    question: "Can operations team members grow too?",
    answer:
      "Operations and client experience roles may include process improvement exposure, scheduling impact, and growth opportunities as service areas expand.",
  },
  {
    question: "How do I learn what benefits apply to a specific role?",
    answer:
      "Review the job posting, speak with recruiting during the hiring process, or join the talent network to discuss role-specific expectations.",
  },
];

export const BENEFITS_PHOTO_GALLERY = [
  {
    src: "/images/about-eden-hero-team.jpg",
    alt: "Eden ABA Therapy team collaboration",
    caption: "Team collaboration",
  },
  {
    src: "/images/home-service-parent-training.jpg",
    alt: "Supervisor coaching a clinician",
    caption: "Supervisor coaching",
  },
  {
    src: "/images/aba-day-step-warmup.jpg",
    alt: "RBT preparing for a therapy session",
    caption: "Session preparation",
  },
  {
    src: "/images/aba-section-assessment.jpg",
    alt: "BCBA mentorship and assessment collaboration",
    caption: "BCBA mentorship",
  },
  {
    src: "/images/about-eden-family-centered-care.jpg",
    alt: "Family-centered care at Eden",
    caption: "Family-centered care",
  },
  {
    src: "/images/aba-day-step-wrapup.jpg",
    alt: "Clinical training and development session",
    caption: "Training and development",
  },
];

export const BENEFITS_REQUIRED_DISCLAIMER =
  "Benefits, schedules, compensation, training, supervision structures, and growth opportunities may vary by role, location, employment status, credential status, and organizational needs. This page is informational and does not create a contract or guarantee of employment terms.";
