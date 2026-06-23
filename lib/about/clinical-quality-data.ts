export const CLINICAL_QUALITY_META = {
  title: "Clinical Quality | Eden ABA Therapy",
  description:
    "Explore Eden ABA Therapy's clinical standards, BCBA-led supervision, evidence-based ABA care, quality assurance, and ethical treatment commitment for families across Virginia.",
  keywords: [
    "ABA clinical quality",
    "BCBA supervision",
    "evidence-based ABA",
    "autism therapy standards",
    "ABA quality assurance Virginia",
  ],
};

export const CLINICAL_QUALITY_SECTION_NAV = [
  { id: "clinical-standards", label: "Standards" },
  { id: "evidence-based", label: "Evidence-Based" },
  { id: "bcba-supervision", label: "Supervision" },
  { id: "treatment-planning", label: "Planning" },
  { id: "caregiver-collaboration", label: "Families" },
  { id: "progress-monitoring", label: "Progress" },
  { id: "quality-assurance", label: "QA Process" },
  { id: "ethical-care", label: "Ethics" },
  { id: "excellence-framework", label: "Framework" },
  { id: "faq", label: "FAQ" },
] as const;

export const CLINICAL_QUALITY_METRICS = [
  { label: "BCBA Supervision Ratio", value: 10, suffix: "%", detail: "Minimum weekly supervision for direct care staff" },
  { label: "Treatment Plan Reviews", value: 90, suffix: " days", detail: "Maximum interval for formal plan review cycles" },
  { label: "Data Collection Sessions", value: 95, suffix: "%", detail: "Sessions with documented skill and behavior data" },
  { label: "Parent Training Touchpoints", value: 2, suffix: "+/mo", detail: "Collaborative caregiver sessions per active case" },
];

export const CLINICAL_PROCESS_TIMELINE = [
  { step: 1, title: "Comprehensive Assessment", description: "BCBA-led evaluation of skills, behaviors, and family priorities." },
  { step: 2, title: "Individualized Treatment Plan", description: "Measurable goals aligned with evidence-based ABA strategies." },
  { step: 3, title: "Direct Therapy & Data", description: "RBT-delivered sessions with real-time data collection and analysis." },
  { step: 4, title: "Supervision & Coaching", description: "Weekly BCBA oversight, program adjustments, and staff coaching." },
  { step: 5, title: "Family Collaboration", description: "Parent training, progress reviews, and home generalization support." },
  { step: 6, title: "Quality Review", description: "Internal QA audits, outcome tracking, and ethical compliance checks." },
];

export const SUPERVISION_STRUCTURE = {
  bcba: "Board Certified Behavior Analyst (BCBA)",
  roles: [
    { title: "Clinical Director", description: "Oversees clinical standards, QA, and supervision systems." },
    { title: "BCBA Supervisor", description: "Leads assessment, programming, and weekly RBT supervision." },
    { title: "RBT / BT", description: "Delivers direct therapy with ongoing coaching and fidelity checks." },
    { title: "Quality Assurance", description: "Reviews documentation, data trends, and compliance metrics." },
  ],
};

export const DATA_DRIVEN_VISUALS = [
  { title: "Skill Acquisition Graphs", description: "Visual progress tracking for language, social, and adaptive skills." },
  { title: "Behavior Reduction Trends", description: "Data-informed strategies with measurable reduction targets." },
  { title: "Session Fidelity Scores", description: "Supervisor observations ensuring treatment integrity." },
  { title: "Goal Mastery Benchmarks", description: "Clear criteria for mastery, maintenance, and generalization." },
];

export const FAMILY_CENTERED_PRINCIPLES = [
  { title: "Respect & Dignity", description: "Every child and family is treated with compassion, cultural sensitivity, and respect." },
  { title: "Shared Decision-Making", description: "Families help shape goals, priorities, and the pace of treatment." },
  { title: "Transparent Communication", description: "Regular updates on progress, data, and next steps in plain language." },
  { title: "Generalization Support", description: "Skills taught in therapy are practiced at home, school, and community settings." },
];

export const CLINICAL_QUALITY_FAQ = [
  {
    question: "Who supervises my child's ABA therapy?",
    answer:
      "Every active case is overseen by a Board Certified Behavior Analyst (BCBA) who conducts assessments, writes treatment plans, supervises direct staff, and reviews progress data with families.",
  },
  {
    question: "How does Eden ensure treatment quality?",
    answer:
      "Eden uses structured QA reviews, supervision requirements, data audits, ethical compliance checks, and ongoing staff training to maintain consistent, evidence-based care.",
  },
  {
    question: "How often is my child's treatment plan updated?",
    answer:
      "Treatment plans are reviewed at least every 90 days—or sooner when goals are mastered, new needs emerge, or family priorities change.",
  },
  {
    question: "What evidence-based practices does Eden use?",
    answer:
      "Programs incorporate peer-reviewed ABA strategies including discrete trial training, natural environment teaching, functional communication training, and positive reinforcement systems.",
  },
  {
    question: "Can physicians and schools coordinate with Eden's clinical team?",
    answer:
      "Yes. With appropriate consent, Eden collaborates with pediatricians, educators, and referral partners to align goals and support continuity of care.",
  },
];

export const CLINICAL_STANDARDS_POINTS = [
  "BACB ethical guidelines and Virginia regulatory standards",
  "Written treatment plans with measurable, individualized goals",
  "Documented supervision and staff competency requirements",
  "HIPAA-aligned privacy and secure documentation practices",
];

export const EVIDENCE_BASED_POINTS = [
  "Functional behavior assessments and skill-based programming",
  "Data-driven decision making at every phase of care",
  "Generalization across home, center, school, and community settings",
  "Continuous staff training on current ABA research and best practices",
];

export const ETHICAL_CARE_POINTS = [
  "Assent-focused, trauma-informed interaction with every child",
  "Least-restrictive, dignity-preserving intervention selection",
  "Transparent consent and authorization processes for families",
  "Zero tolerance for practices that compromise safety or wellbeing",
];

export const EXCELLENCE_FRAMEWORK_PILLARS = [
  { title: "Clinical Rigor", description: "Assessment depth, program precision, and outcome accountability." },
  { title: "Supervision Excellence", description: "BCBA-led oversight with structured coaching and fidelity monitoring." },
  { title: "Family Partnership", description: "Caregiver training and shared goal-setting at the center of care." },
  { title: "Continuous Improvement", description: "QA cycles, feedback loops, and staff development investments." },
];
