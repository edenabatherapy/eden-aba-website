export type CareerPathStep = {
  id: string;
  title: string;
  roleDescription: string;
  skillsLearned: string[];
  nextStep: string;
  credentialNote: string;
};

export const CAREER_PATH_STEPS: CareerPathStep[] = [
  {
    id: "bt",
    title: "Behavior Technician (BT)",
    roleDescription:
      "Launch your career by delivering direct support under close supervision while learning relationship-based, family-centered care in home and community settings.",
    skillsLearned: [
      "Session readiness and rapport building",
      "Fundamental behavior data collection",
      "Professional communication with caregivers",
    ],
    nextStep: "Registered Behavior Technician (RBT)",
    credentialNote:
      "No certification is required to start in some settings, but early progress toward RBT readiness is strongly encouraged.",
  },
  {
    id: "rbt",
    title: "Registered Behavior Technician (RBT)",
    roleDescription:
      "Implement treatment plans with fidelity, coordinate with supervising clinicians, and become a consistent partner for children and families.",
    skillsLearned: [
      "Skill acquisition and behavior reduction procedures",
      "Accurate, timely session documentation",
      "Caregiver coaching reinforcement within treatment boundaries",
    ],
    nextStep: "Senior RBT",
    credentialNote:
      "RBT certification must remain active and in good standing under BACB requirements.",
  },
  {
    id: "senior-rbt",
    title: "Senior RBT",
    roleDescription:
      "Model best practices for newer technicians, support onboarding, and help maintain treatment integrity across assigned teams.",
    skillsLearned: [
      "Peer modeling and in-session support",
      "Advanced behavior plan implementation",
      "Escalation communication and case coordination",
    ],
    nextStep: "Lead RBT or BCaBA Pathway",
    credentialNote:
      "Experienced RBTs may pursue leadership or continue into coursework aligned with BCaBA and BCBA pathways.",
  },
  {
    id: "lead-rbt",
    title: "Lead RBT",
    roleDescription:
      "Coordinate day-to-day technician support and partner with supervisors to sustain consistency across caseloads and care settings.",
    skillsLearned: [
      "Team huddles and workflow coordination",
      "Quality checks for treatment fidelity",
      "Family communication support and continuity planning",
    ],
    nextStep: "BCaBA",
    credentialNote:
      "Role expectations may include additional competency checks and leadership training.",
  },
  {
    id: "bcaba",
    title: "Board Certified Assistant Behavior Analyst (BCaBA)",
    roleDescription:
      "Provide mid-level clinical support, assist with program updates, and strengthen treatment delivery under BCBA direction.",
    skillsLearned: [
      "Data-informed clinical recommendations",
      "Structured staff coaching and feedback",
      "Case collaboration across caregivers, schools, and clinical teams",
    ],
    nextStep: "Board Certified Behavior Analyst (BCBA)",
    credentialNote:
      "BCaBA responsibilities and supervision structures should align with BACB and payer-specific requirements.",
  },
  {
    id: "bcba",
    title: "Board Certified Behavior Analyst (BCBA)",
    roleDescription:
      "Lead assessments, design and revise treatment plans, supervise direct teams, and partner with caregivers around measurable outcomes.",
    skillsLearned: [
      "Functional assessment and treatment planning",
      "Supervisor development and performance coaching",
      "Interdisciplinary communication and family training leadership",
    ],
    nextStep: "Senior BCBA",
    credentialNote:
      "BCBA certification and required supervision practices must remain current; renewal timelines are managed by the individual certificant.",
  },
  {
    id: "senior-bcba",
    title: "Senior BCBA",
    roleDescription:
      "Support complex cases, mentor early-career analysts, and contribute to service quality initiatives across programs.",
    skillsLearned: [
      "Advanced case conceptualization",
      "Cross-team clinical consultation",
      "Outcome review and quality trend analysis",
    ],
    nextStep: "Clinical Quality Supervisor or Clinical Supervisor",
    credentialNote:
      "Senior responsibilities often include expanded coaching, documentation review, and quality oversight expectations.",
  },
  {
    id: "clinical-quality-supervisor",
    title: "Clinical Quality Supervisor",
    roleDescription:
      "Drive quality assurance systems, chart review standards, and evidence-based consistency across service lines.",
    skillsLearned: [
      "Clinical audit and documentation standards",
      "Quality improvement planning",
      "Training design based on care quality metrics",
    ],
    nextStep: "Regional Clinical Director",
    credentialNote:
      "Quality leadership responsibilities are shaped by internal standards plus educational awareness of Virginia payer and regulatory frameworks.",
  },
  {
    id: "regional-clinical-director",
    title: "Regional Clinical Director",
    roleDescription:
      "Set regional clinical direction, develop leaders, and scale family-centered, high-integrity care across Northern Virginia and future expansion markets.",
    skillsLearned: [
      "Regional strategy and workforce planning",
      "Clinical governance and escalation oversight",
      "Cross-functional leadership with operations and client services",
    ],
    nextStep: "Executive Clinical Leadership",
    credentialNote:
      "This pathway is educational and role-dependent; credentialing and scope requirements vary by position and applicable standards.",
  },
];

export const PUBLIC_CAREER_PATH_STEP_IDS = [
  "bt",
  "rbt",
  "senior-rbt",
  "lead-rbt",
  "bcaba",
  "bcba",
] as const;

/** Public-facing progression ending at BCBA for menus, home, and applicant-facing pages. */
export const PUBLIC_CAREER_PATH_STEPS: CareerPathStep[] = CAREER_PATH_STEPS.filter((step) =>
  (PUBLIC_CAREER_PATH_STEP_IDS as readonly string[]).includes(step.id),
).map((step) =>
  step.id === "bcba"
    ? {
        ...step,
        nextStep: "Advanced clinical leadership pathways (see Career Paths)",
        credentialNote:
          "BCBA certification and supervision practices must remain current. Experienced BCBAs may explore advanced leadership pathways on Eden's Career Paths page.",
      }
    : step,
);

/** Advanced leadership steps — surfaced on Career Paths, not primary navigation. */
export const ADVANCED_LEADERSHIP_PATH_STEPS: CareerPathStep[] = CAREER_PATH_STEPS.filter((step) =>
  ["senior-bcba", "clinical-quality-supervisor", "regional-clinical-director"].includes(step.id),
);

export const PUBLIC_CAREER_PROGRESSION_LABELS = [
  "Behavior Technician (BT)",
  "Registered Behavior Technician (RBT)",
  "Senior RBT",
  "Lead RBT",
  "BCaBA",
  "BCBA",
] as const;
