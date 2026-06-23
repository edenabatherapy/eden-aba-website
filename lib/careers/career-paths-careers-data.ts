import type { CareerFaqItem } from "./faq-data";

export const CAREER_PATHS_META = {
  title: "Career Growth Pathways | Eden ABA Therapy Careers",
  description:
    "Explore Eden ABA Therapy career growth pathways from Behavior Technician (BT) through BCBA—including Senior RBT, Lead RBT, BCaBA tracks, training roadmaps, mentorship, and long-term career planning across Northern Virginia.",
};

export const CAREER_PATHS_SECTION_NAV = [
  { id: "career-overview", label: "Career Overview" },
  { id: "bt-rbt-pathway", label: "BT → RBT" },
  { id: "bcba-pathway", label: "BCBA Pathway" },
  { id: "interview-guide", label: "Interview Guide" },
  { id: "resume-tips", label: "Resume Tips" },
  { id: "training-roadmap", label: "Training Roadmap" },
  { id: "mentorship-program", label: "Mentorship" },
  { id: "long-term-planning", label: "Long-Term Planning" },
] as const;

export const CAREER_PATHS_HERO_BADGES = [
  "BT to BCBA Pathways",
  "Credential-Aware Growth",
  "Supervised Practice",
  "Mentorship Built In",
] as const;

export const CAREER_PATHS_STATS = [
  { value: 6, label: "Public pathway steps", description: "BT through BCBA clinical responsibility" },
  { value: 90, suffix: " days", label: "Structured onboarding", description: "30/60/90-day development milestones" },
  { value: 3, label: "Leadership tiers", description: "Senior RBT, Lead RBT, and BCBA tracks" },
  { value: 1, label: "Growth philosophy", description: "Performance, credentials, and organizational needs" },
];

export const CAREER_PATHS_OVERVIEW = {
  philosophy:
    "Eden supports credential-aware career growth—from entry-level direct care through BCBA clinical leadership. Advancement depends on performance, role availability, credential status, and service needs—not guaranteed timelines.",
  opportunities: [
    "Structured onboarding and supervised practice for new clinicians",
    "Pathway awareness from BT through RBT, Senior RBT, Lead RBT, BCaBA, and BCBA",
    "Mentorship, case consultation, and competency-based feedback",
    "Advanced clinical leadership exploration for experienced BCBAs on Eden's Career Paths page",
  ],
};

export type CareerPathwayDetail = {
  id: string;
  title: string;
  summary: string;
  requirements: string[];
  skills: string[];
  training: string[];
  milestones: string[];
};

export const CAREER_PATHS_BT_RBT: CareerPathwayDetail = {
  id: "bt-rbt",
  title: "BT → RBT Pathway",
  summary:
    "Behavior Technicians build direct-care fundamentals under close supervision, then progress toward Registered Behavior Technician (RBT) credential readiness where role-eligible.",
  requirements: [
    "High school diploma or equivalent (role-dependent)",
    "Reliability, communication, and interest in working with children",
    "Completion of RBT training and competency assessment for certification",
    "Background checks and role-specific hiring requirements",
  ],
  skills: [
    "Session preparation and rapport building",
    "Data collection and treatment plan implementation",
    "Caregiver communication within professional boundaries",
    "Treatment fidelity under BCBA supervision",
  ],
  training: [
    "BT onboarding and ABA fundamentals",
    "Supervised practice with observation and feedback",
    "RBT task list preparation where applicable",
    "Competency assessment and certification steps",
  ],
  milestones: [
    "Complete BT onboarding competencies",
    "Demonstrate consistent session readiness and data accuracy",
    "Begin RBT training pathway where role-eligible",
    "Achieve active RBT certification and maintain renewal requirements",
  ],
};

export const CAREER_PATHS_SENIOR_RBT: CareerPathwayDetail = {
  id: "senior-rbt",
  title: "Senior RBT Pathway",
  summary:
    "Senior RBTs model best practices, support onboarding for newer technicians, and help maintain treatment integrity across assigned teams.",
  requirements: [
    "Active RBT certification in good standing",
    "Demonstrated treatment fidelity and reliability",
    "Supervisor recommendation based on performance",
    "Role availability and organizational needs",
  ],
  skills: [
    "Peer modeling and in-session support",
    "Advanced behavior plan implementation",
    "Escalation communication and case coordination",
    "Onboarding support for new team members",
  ],
  training: [
    "Leadership readiness conversations with supervisor",
    "Expanded competency checks and quality observations",
    "Pathway planning toward Lead RBT or BCaBA/BCBA tracks",
  ],
  milestones: [
    "Consistent modeling of best practices across sessions",
    "Support newer technicians through structured feedback",
    "Participate in team huddles and quality initiatives",
    "Document readiness for Lead RBT or mid-level clinical support roles",
  ],
};

export const CAREER_PATHS_LEAD_RBT: CareerPathwayDetail = {
  id: "lead-rbt",
  title: "Lead RBT Pathway",
  summary:
    "Lead RBTs coordinate day-to-day technician support and partner with supervisors to sustain consistency across caseloads and care settings.",
  requirements: [
    "Senior RBT experience or equivalent competency",
    "Strong communication and organizational skills",
    "Supervisor endorsement and role availability",
    "Leadership training completion where applicable",
  ],
  skills: [
    "Team huddles and workflow coordination",
    "Quality checks for treatment fidelity",
    "Family communication support and continuity planning",
    "Escalation to BCBA supervision when clinical questions arise",
  ],
  training: [
    "Leadership and coordination training",
    "Documentation and quality review expectations",
    "BCaBA or BCBA pathway planning conversations",
  ],
  milestones: [
    "Coordinate technician support across assigned caseloads",
    "Maintain clinical consistency during supervisor transitions",
    "Support onboarding and competency development for newer RBTs",
    "Prepare for BCaBA coursework or BCBA graduate pathway where eligible",
  ],
};

export const CAREER_PATHS_BCABA: CareerPathwayDetail = {
  id: "bcaba",
  title: "BCaBA Pathway",
  summary:
    "Board Certified Assistant Behavior Analysts provide mid-level clinical support, assist with program updates, and strengthen treatment delivery under BCBA direction.",
  requirements: [
    "Undergraduate degree and BCaBA coursework completion",
    "BCaBA certification through BACB",
    "Supervision structure aligned to BACB and payer requirements",
    "Role availability and organizational needs",
  ],
  skills: [
    "Data-informed clinical recommendations",
    "Structured staff coaching and feedback",
    "Case collaboration across caregivers, schools, and clinical teams",
    "Program update support under BCBA oversight",
  ],
  training: [
    "Graduate or undergraduate coursework aligned to BCaBA requirements",
    "Supervised field experience under qualified BCBA",
    "BCBA pathway planning for future graduate-level credential",
  ],
  milestones: [
    "Complete BCaBA coursework and supervised experience",
    "Pass BCaBA certification examination",
    "Deliver mid-level clinical support with treatment integrity",
    "Plan BCBA graduate education pathway where desired",
  ],
};

export const CAREER_PATHS_BCBA: CareerPathwayDetail = {
  id: "bcba",
  title: "BCBA Pathway",
  summary:
    "Board Certified Behavior Analysts lead assessments, design and revise treatment plans, supervise direct teams, and partner with caregivers around measurable outcomes.",
  requirements: [
    "Graduate degree in behavior analysis or related field",
    "BCBA certification through BACB",
    "Supervised field experience meeting BACB requirements",
    "Virginia licensure or authorization where applicable",
  ],
  skills: [
    "Functional assessment and treatment planning",
    "Supervisor development and performance coaching",
    "Interdisciplinary communication and family training leadership",
    "Data-based decision-making and clinical quality review",
  ],
  training: [
    "Graduate coursework and supervised fieldwork",
    "BCBA examination preparation and certification",
    "Eden clinical onboarding and documentation culture",
    "Supervision systems and case consultation exposure",
  ],
  milestones: [
    "Complete graduate education and supervised experience",
    "Achieve and maintain active BCBA certification",
    "Lead caseloads with treatment planning and RBT supervision",
    "Explore advanced leadership pathways through Career Paths resources",
  ],
};

export const CAREER_PATHS_TRAINING_ROADMAP = [
  {
    period: "30-day plan",
    title: "Foundation & orientation",
    items: [
      "Role clarity, systems access, and ethical boundaries",
      "Observation of supervised sessions and documentation expectations",
      "Initial competency milestones with supervisor feedback",
      "Introduction to family-centered communication standards",
    ],
  },
  {
    period: "60-day plan",
    title: "Skill building & consistency",
    items: [
      "Independent session delivery with ongoing supervision",
      "Treatment fidelity and data quality improvements",
      "Caregiver communication and carryover support",
      "Credential pathway conversation (RBT, BCaBA, or BCBA awareness)",
    ],
  },
  {
    period: "90-day plan",
    title: "Integration & growth planning",
    items: [
      "Consistent performance across assigned caseloads",
      "Competency review and development plan update",
      "Peer collaboration and team huddle participation",
      "Next-step pathway planning with supervisor",
    ],
  },
  {
    period: "Annual development",
    title: "Sustained excellence",
    items: [
      "Continuing education and renewal planning",
      "Leadership readiness or specialty skill development",
      "Quality initiatives and mentorship involvement",
      "Long-term career mapping conversation",
    ],
  },
];

export const CAREER_PATHS_MENTORSHIP = [
  { title: "Coaching", description: "Regular supervisor touchpoints with observation, feedback, and competency planning tied to real cases." },
  { title: "Supervisor support", description: "Escalation pathways, case consultation, and structured development conversations at every credential level." },
  { title: "Professional guidance", description: "Credential pathway awareness, ethical practice education, and sustainable growth planning." },
];

export const CAREER_PATHS_LONG_TERM = [
  { title: "Career mapping", description: "Structured conversations about where you are today and which pathways align with your credentials and goals." },
  { title: "Development plans", description: "Competency milestones, training goals, and timeline awareness—not guaranteed promotion schedules." },
  { title: "Future opportunities", description: "Awareness of senior clinical, quality, regional leadership, and operations tracks as Eden grows across Northern Virginia." },
];

export const CAREER_PATHS_ROLE_ENTRIES = [
  {
    title: "Behavior Technician (BT)",
    href: "/careers/bt",
    description: "Entry-level direct care with structured onboarding and supervision.",
  },
  {
    title: "Registered Behavior Technician (RBT)",
    href: "/careers/rbt",
    description: "Credential-backed direct therapy under BCBA supervision.",
  },
  {
    title: "Board Certified Behavior Analyst (BCBA)",
    href: "/careers/bcba",
    description: "Clinical assessment, supervision, treatment planning, and family partnership.",
  },
];

export const CAREER_PATHS_ADVANCED_LEADERSHIP = {
  title: "Advanced clinical leadership pathways",
  summary:
    "After gaining BCBA experience, some clinicians pursue senior clinical, quality, and regional leadership roles. These pathways are typically explored by experienced BCBAs based on performance, credential eligibility, and organizational needs—not as entry-level applicant targets.",
  roles: [
    "Senior BCBA",
    "Clinical Supervisor",
    "Clinical Director",
    "Clinical Quality Supervisor",
    "Regional Clinical Director",
    "Director of Clinical Quality",
  ],
  detailPageHref: "/careers/clinical-leadership",
  detailPageLabel: "Explore clinical leadership resources",
};

export const CAREER_PATHS_FAQ: CareerFaqItem[] = [
  {
    question: "How long does it take to progress from BT to BCBA?",
    answer:
      "Timelines vary widely based on credential requirements, coursework, supervised experience, performance, and role availability. Eden provides pathway awareness and mentorship—not guaranteed promotion schedules.",
  },
  {
    question: "Does Eden guarantee advancement?",
    answer:
      "No. Progression depends on performance, credential status, organizational needs, and open roles. Development planning helps team members understand options and requirements.",
  },
];

export const CAREER_PATHS_DISCLAIMER =
  "Progression depends on performance, role availability, credential status, and service needs. Educational references to BACB, DBHDS, and Medicaid are for awareness only and do not constitute legal, credentialing, billing, or regulatory advice.";
