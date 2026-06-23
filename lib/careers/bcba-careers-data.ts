import type { CareerFaqItem } from "./faq-data";

export const BCBA_CAREERS_META = {
  title: "BCBA Careers | Eden ABA Therapy",
  description:
    "Explore Board Certified Behavior Analyst careers at Eden ABA Therapy. Learn about BCBA responsibilities, supervision, caregiver collaboration, clinical leadership, interview tips, and open roles in Annandale and Northern Virginia.",
};

export const BCBA_HERO_BADGES = [
  "Clinical Excellence",
  "Treatment Planning",
  "Family Guidance",
  "RBT Supervision",
  "Growth Pathway",
] as const;

export const BCBA_HERO_JOURNEY_STEPS = [
  { step: 1, label: "Apply" },
  { step: 2, label: "Clinical conversation" },
  { step: 3, label: "Caseload alignment" },
  { step: 4, label: "Lead treatment planning" },
  { step: 5, label: "Mentor clinical teams" },
  { step: 6, label: "Grow into leadership" },
];

export const BCBA_MOTIVATION_STATS = [
  {
    title: "Clinical decision-making",
    description:
      "Guide assessment, treatment planning, and data-based adjustments that help children make meaningful progress.",
  },
  {
    title: "Family-centered outcomes",
    description:
      "Partner with caregivers to translate clinical goals into practical routines across home and community settings.",
  },
  {
    title: "Team supervision and mentorship",
    description:
      "Coach RBTs and technicians with observation, feedback, and professional development support.",
  },
];

export const BCBA_JOURNEY_TIMELINE = [
  {
    title: "Apply for a BCBA role",
    description: "Review open positions and submit your application or join the Talent Network for future openings.",
  },
  {
    title: "Meet the recruiting and clinical leadership team",
    description: "Discuss your experience, clinical approach, and interest in family-centered autism care at Eden.",
  },
  {
    title: "Discuss caseload, service area, and supervision model",
    description: "Align on service settings, caseload expectations, and how clinical support is structured.",
  },
  {
    title: "Begin clinical onboarding",
    description: "Learn Eden's documentation culture, quality standards, and team communication workflows.",
  },
  {
    title: "Lead assessment, treatment planning, and supervision",
    description: "Conduct clinical work with clear expectations for data review, caregiver guidance, and RBT coaching.",
  },
  {
    title: "Grow toward advanced clinical leadership pathways",
    description: "Experienced BCBAs may explore senior clinical and regional roles through Eden's Career Paths page.",
  },
];

/** Preserved from original BCBA page — impact areas */
export const BCBA_IMPACT_CARDS = [
  {
    title: "Assessment and planning",
    description: "Conduct functional assessment and maintain responsive, data-driven treatment plans.",
  },
  {
    title: "Supervision and coaching",
    description: "Develop technician capability through observation, feedback, and competency planning.",
  },
  {
    title: "Caregiver collaboration",
    description: "Translate clinical goals into practical routines that fit family contexts.",
  },
];

export const BCBA_ROLE_SNAPSHOT = {
  roleType: "Clinical leadership and behavior-analytic services",
  supervision: "Provides supervision and clinical direction when qualified",
  serviceSetting: "Home, community, school-collaboration, and natural environments",
  focusAreas: "Assessment, treatment planning, caregiver guidance, data review, supervision, quality care",
  growthPath: "BT → RBT → Senior RBT → Lead RBT → BCaBA → BCBA",
  bestFit: "Ethical, organized, collaborative, family-centered clinicians who value mentorship and treatment integrity",
};

export const BCBA_SKILL_CATEGORIES = [
  {
    title: "Clinical Practice",
    skills: [
      "Assessment and case conceptualization",
      "Treatment planning",
      "Data-based decision-making",
      "Behavior support planning",
      "Clinical quality review",
    ],
  },
  {
    title: "Supervision and Mentorship",
    skills: [
      "RBT coaching",
      "Feedback delivery",
      "Treatment fidelity monitoring",
      "Field observation",
      "Professional development support",
    ],
  },
  {
    title: "Family Collaboration",
    skills: [
      "Caregiver guidance",
      "Parent training support",
      "Compassionate communication",
      "Goal alignment",
      "Progress explanation",
    ],
  },
  {
    title: "Documentation and Compliance Culture",
    skills: [
      "Clinical documentation",
      "Treatment plan updates",
      "Authorization-readiness awareness",
      "Session note review",
      "Ethical and professional standards",
    ],
  },
  {
    title: "Team Operations",
    skills: [
      "Caseload organization",
      "Scheduling coordination",
      "Cross-functional communication",
      "Problem solving",
      "Service continuity",
    ],
  },
];

export const BCBA_LEADERSHIP_PATHWAY = [
  "Functional assessment and clinical recommendations",
  "Individualized treatment planning",
  "RBT training and supervision",
  "Caregiver communication and parent training",
  "Progress monitoring and data review",
  "Treatment integrity",
  "Ethical ABA practice",
  "Clinical collaboration",
  "Family-centered service delivery",
  "Growth of the clinical team",
];

export const BCBA_RESPONSIBILITIES_DETAILED = [
  {
    title: "Conduct assessments and contribute to individualized treatment planning",
    description: "Use assessment data to inform goals that reflect child and family priorities.",
    whyItMatters: "Strong assessment foundations help treatment plans stay relevant, measurable, and family-aligned.",
  },
  {
    title: "Develop, update, and monitor ABA treatment goals",
    description: "Review progress and refine goals based on data and caregiver input.",
    whyItMatters: "Responsive planning keeps services focused on skills that matter in everyday life.",
  },
  {
    title: "Review client progress through data-based decision-making",
    description: "Analyze trends, session data, and clinical observations to guide next steps.",
    whyItMatters: "Data-informed decisions support transparent progress and accountable clinical care.",
  },
  {
    title: "Supervise, coach, and support RBTs and behavior technicians",
    description: "Provide observation, feedback, and competency-focused coaching when qualified.",
    whyItMatters: "Strong supervision helps technicians feel supported and strengthens consistency across sessions.",
  },
  {
    title: "Provide caregiver guidance and parent training",
    description: "Help families understand goals and practice strategies between sessions.",
    whyItMatters: "Caregiver partnership improves generalization and long-term confidence at home.",
  },
  {
    title: "Monitor treatment integrity and clinical quality",
    description: "Review fidelity, documentation, and session quality across assigned caseloads.",
    whyItMatters: "Quality monitoring protects ethical standards and meaningful client outcomes.",
  },
  {
    title: "Collaborate with families, internal teams, and other providers when appropriate",
    description: "Coordinate communication respectfully across care partners.",
    whyItMatters: "Aligned teams reduce confusion and support smoother service continuity for families.",
  },
  {
    title: "Support behavior intervention planning and safety-focused care",
    description: "Guide intervention strategies with professional judgment and risk awareness.",
    whyItMatters: "Safe, dignity-centered support is essential in home and community settings.",
  },
  {
    title: "Maintain accurate clinical documentation",
    description: "Complete treatment plans, session reviews, and records with clarity and timeliness.",
    whyItMatters: "Reliable documentation supports care coordination, quality review, and payer readiness.",
  },
  {
    title: "Participate in clinical meetings, case reviews, and quality improvement",
    description: "Engage in team discussions that strengthen standards and shared learning.",
    whyItMatters: "Collaborative review helps clinicians grow while maintaining consistent care quality.",
  },
  {
    title: "Support ethical, respectful, culturally responsive ABA services",
    description: "Model professional boundaries, assent-aware practice, and family respect.",
    whyItMatters: "Ethical care builds trust with families and sustains long-term clinical credibility.",
  },
];

export const BCBA_CONFIDENCE_CARDS = [
  { title: "We value clinical judgment", description: "Thoughtful decision-making is central to BCBA leadership at Eden." },
  { title: "We value ethical decision-making", description: "Clinicians are expected to practice with integrity, respect, and professional accountability." },
  { title: "We value family partnership", description: "Caregivers are collaborators—not spectators—in the treatment process." },
  { title: "We value mentorship", description: "BCBAs help technicians grow through structured coaching and feedback." },
  { title: "We value sustainable growth", description: "Clear expectations and team support help clinicians lead without burnout." },
  { title: "We value treatment integrity", description: "Fidelity, data quality, and documentation habits protect client outcomes." },
];

export const BCBA_GROWTH_LADDER_DETAILED = [
  { title: "Behavior Technician (BT)", description: "Learn direct-care fundamentals under close supervisor direction." },
  { title: "Registered Behavior Technician (RBT)", description: "Deliver credential-aligned services with BCBA supervision." },
  { title: "Senior RBT", description: "Model best practices and support newer team members." },
  { title: "Lead RBT", description: "Coordinate technician support and treatment consistency across caseloads." },
  { title: "BCaBA", description: "Provide mid-level clinical support under BCBA supervision." },
  { title: "BCBA", description: "Lead assessment, planning, supervision, and family guidance." },
];

export const BCBA_SUPERVISION_MODEL = {
  summary:
    "BCBAs at Eden support RBTs and behavior technicians through structured supervision touchpoints designed to strengthen treatment fidelity, professional growth, and family-centered care.",
  points: [
    "Direct observation and session feedback aligned to competency goals",
    "Treatment fidelity monitoring and data-quality review",
    "Goal alignment between caregivers, technicians, and clinical leadership",
    "Professional coaching on communication, documentation, and ethical boundaries",
    "Case consultation and escalation pathways when clinical questions arise",
    "Ongoing development planning for technicians pursuing RBT advancement or leadership tracks",
  ],
};

export const BCBA_TAB_OVERVIEW = {
  summary:
    "Board Certified Behavior Analysts (BCBAs) at Eden ABA Therapy lead behavior-analytic services that help children build communication, social, daily living, and learning-readiness skills across natural environments. BCBAs guide treatment direction, supervise and coach RBTs when qualified, partner with caregivers, and support clinical quality across Annandale and Northern Virginia.",
  highlights: [
    "Graduate-level clinical leadership with family-centered expectations",
    "Assessment, planning, supervision, and data-based decision-making",
    "Caregiver guidance and parent training integrated into care",
    "Pathways toward advanced clinical leadership on Eden's Career Paths page",
  ],
};

export const BCBA_INTERVIEW_TIPS = [
  "Be ready to discuss your clinical decision-making style.",
  "Share examples of caregiver collaboration.",
  "Explain how you supervise and coach RBTs.",
  "Discuss how you use data to adjust treatment.",
  "Be prepared to talk about documentation quality.",
  "Ask about caseload structure, supervision support, clinical review, scheduling coordination, and leadership pathways.",
];

export const BCBA_INTERVIEW_PREP_CARDS = [
  { title: "Show your clinical reasoning", description: "Explain how you assess, plan, and adjust treatment using data and family context." },
  { title: "Explain your supervision style", description: "Describe how you observe, coach, and support RBT professional growth." },
  { title: "Share caregiver collaboration examples", description: "Highlight respectful communication and practical parent training strategies." },
  { title: "Discuss data-based decisions", description: "Walk through how you review progress and refine goals." },
  { title: "Describe how you handle challenging cases", description: "Focus on safety, ethics, escalation, and team collaboration." },
  { title: "Speak to treatment integrity", description: "Explain how you monitor fidelity and documentation quality." },
  { title: "Ask about caseload support", description: "Questions about structure show you think about sustainable clinical leadership." },
  { title: "Ask about mentorship and leadership growth", description: "Explore pathways toward senior and director-level roles." },
];

export const BCBA_FAQ_ITEMS: CareerFaqItem[] = [
  {
    question: "What does a BCBA do at Eden ABA Therapy?",
    answer:
      "BCBAs lead assessment, treatment planning, data review, caregiver guidance, and RBT supervision when qualified—supporting ethical, family-centered ABA services across natural environments.",
  },
  {
    question: "What settings do BCBAs support?",
    answer:
      "BCBAs may support in-home, community-based, and other natural environments across Annandale and Northern Virginia, with collaboration around school and care coordination when appropriate.",
  },
  {
    question: "Do BCBAs supervise RBTs?",
    answer:
      "Per BACB guidance, BCBAs are graduate-level certified behavior analysts who may provide behavior-analytic services and supervise RBTs and BCaBAs when qualified. Supervision scope depends on credential status and role requirements.",
  },
  {
    question: "What kind of clinical support is available?",
    answer:
      "Eden provides caseload alignment conversations, supervisor collaboration, clinical review touchpoints, and team communication structures. Support may vary by role and service area.",
  },
  {
    question: "Is there room to grow into leadership?",
    answer:
      "Many BCBAs pursue pathways toward Senior BCBA, Clinical Director, and Regional Clinical Director roles. Advancement depends on performance, credential eligibility, and organizational needs.",
  },
  {
    question: "How does Eden support caregiver collaboration?",
    answer:
      "BCBAs are expected to communicate respectfully, explain progress clearly, and integrate parent training goals that fit each family's routines and priorities.",
  },
  {
    question: "What should I prepare for the interview?",
    answer:
      "Prepare examples of clinical reasoning, supervision, data-based decisions, documentation habits, and family-centered communication. Review open roles for setting-specific expectations.",
  },
  {
    question: "How do I apply?",
    answer:
      "Search BCBA and clinical leadership openings on our Open Roles page, or join the Talent Network to be contacted when a matching opportunity becomes available.",
  },
];

export const BCBA_SAMPLE_INTERVIEW_QUESTIONS: CareerFaqItem[] = [
  {
    question: "How do you make treatment decisions using data?",
    answer: "Describe reviewing trends, session notes, and caregiver input before adjusting goals or interventions.",
  },
  {
    question: "How do you coach an RBT who needs support?",
    answer: "Share an example of observation, specific feedback, modeling, and follow-up to build competency.",
  },
  {
    question: "How do you communicate progress to caregivers?",
    answer: "Emphasize clarity, respect, practical language, and alignment with supervisor-approved messaging.",
  },
  {
    question: "Tell us about a time you adjusted a treatment plan.",
    answer: "Explain the data or context that prompted change and how you involved the care team.",
  },
  {
    question: "How do you balance clinical quality with scheduling realities?",
    answer: "Discuss prioritization, communication with operations, and maintaining treatment integrity.",
  },
  {
    question: "What does ethical ABA practice mean to you?",
    answer: "Cover assent-aware care, professional boundaries, dignity, and documentation accountability.",
  },
  {
    question: "How do you handle disagreements with families or team members?",
    answer: "Focus on calm communication, escalation pathways, and family-centered problem solving.",
  },
  {
    question: "What kind of clinical support helps you do your best work?",
    answer: "Ask about caseload structure, review meetings, mentorship, and leadership pathways.",
  },
];

export const BCBA_DAY_TIMELINE = [
  { step: "Review caseload priorities", detail: "Confirm sessions, supervision needs, and clinical follow-ups for the day." },
  { step: "Analyze client data", detail: "Review trends, graphs, and session notes to inform clinical decisions." },
  { step: "Observe sessions or review treatment fidelity", detail: "Monitor implementation quality and technician performance." },
  { step: "Coach RBTs and provide feedback", detail: "Deliver structured coaching aligned to competency and treatment goals." },
  { step: "Communicate with caregivers", detail: "Share progress updates and parent training guidance respectfully." },
  { step: "Update goals and clinical recommendations", detail: "Refine plans based on data and family priorities." },
  { step: "Coordinate with operations or scheduling when needed", detail: "Support service continuity and caseload alignment." },
  { step: "Complete documentation", detail: "Maintain timely, accurate clinical records and plan updates." },
  { step: "Participate in case review or supervision meetings", detail: "Collaborate with clinical leadership on quality and next steps." },
  { step: "Plan next clinical steps", detail: "Set priorities for upcoming sessions, supervision, and family touchpoints." },
];

export const BCBA_SUPPORT_CARDS = [
  { title: "Caseload alignment", description: "Conversations to align service settings, schedules, and clinical priorities." },
  { title: "Supervisor collaboration", description: "Access to clinical leadership for case consultation and escalation support." },
  { title: "RBT coaching structure", description: "Frameworks for observation, feedback, and technician development." },
  { title: "Data review systems", description: "Expectations and tools that support data-based clinical decisions." },
  { title: "Documentation expectations", description: "Clear standards for treatment plans, notes, and clinical records." },
  { title: "Family communication support", description: "Guidance on caregiver updates and parent training integration." },
  { title: "Clinical quality conversations", description: "Case reviews and quality touchpoints with leadership teams." },
  { title: "Growth toward leadership", description: "Pathways toward senior BCBA and director-level clinical roles." },
];

export const BCBA_SUPPORT_DISCLAIMER =
  "Benefits, schedules, caseloads, supervision structures, and growth opportunities may vary by role, location, employment status, and company needs.";

export const BCBA_BACB_NOTICE =
  "Educational note: Board Certified Behavior Analysts (BCBAs) are graduate-level certified behavior analysts who may provide behavior-analytic services and supervise RBTs and BCaBAs when qualified, per BACB framework. This page is informational and does not constitute credentialing, legal, billing, or regulatory advice.";

export const BCBA_CREDENTIAL_DISCLAIMER =
  "Educational notice: references to BACB, DBHDS, and Medicaid standards are provided to support career awareness and quality practice understanding only. This content is not legal advice, credentialing advice, billing advice, or regulatory interpretation.";

export const BCBA_PHOTO_GALLERY = [
  {
    src: "/images/aba-day-step-wrapup.jpg",
    alt: "BCBA reviewing session data and clinical documentation with treatment planning materials",
    caption: "Data review and treatment planning",
  },
  {
    src: "/images/aba-day-step-skills.jpg",
    alt: "BCBA coaching an RBT during a structured skill-building session with a child",
    caption: "RBT supervision and coaching",
  },
  {
    src: "/images/parent-guidance-hero-parent-child.jpg",
    alt: "Caregiver guidance conversation in a warm family-centered setting",
    caption: "Caregiver guidance and parent training",
  },
  {
    src: "/images/about-eden-hero-team.jpg",
    alt: "Eden clinical team collaboration meeting",
    caption: "Clinical team collaboration",
  },
  {
    src: "/images/aba-section-assessment.jpg",
    alt: "Clinician reviewing assessment and treatment planning materials",
    caption: "Assessment and clinical planning",
  },
  {
    src: "/images/about-eden-family-centered-care.jpg",
    alt: "Family-centered ABA collaboration between clinician and caregiver",
    caption: "Family-centered clinical partnership",
  },
];
