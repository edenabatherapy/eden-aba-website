import type { CareerFaqItem } from "./faq-data";

export const CLINICAL_LEADERSHIP_META = {
  title: "Clinical Leadership Careers | Eden ABA Therapy",
  description:
    "Explore Clinical Leadership careers at Eden ABA Therapy. Learn about Clinical Director, Regional Clinical Director, quality governance, workforce development, supervision systems, leadership pathways, and opportunities across Northern Virginia.",
};

export const CL_RECRUITING_EMAIL = "info@edenabatherapy.com";

export const CL_HERO_BADGES = [
  "Clinical Leadership",
  "Quality Governance",
  "Team Development",
  "Regional Growth",
  "Family-Centered Care",
  "Executive Pathways",
] as const;

export const CL_HERO_IMPACT_STEPS = [
  { step: 1, label: "Support Clinical Quality" },
  { step: 2, label: "Develop Future Leaders" },
  { step: 3, label: "Strengthen Supervision Systems" },
  { step: 4, label: "Guide Family-Centered Care" },
  { step: 5, label: "Improve Treatment Integrity" },
  { step: 6, label: "Help Shape Regional Growth" },
];

export const CL_WHY_MATTERS_STATS = [
  {
    title: "Clinical Quality",
    description: "Help establish standards that strengthen treatment integrity across caseloads and teams.",
  },
  {
    title: "Workforce Development",
    description: "Support growth of clinicians, supervisors, and future leaders through structured mentorship.",
  },
  {
    title: "Family Impact",
    description: "Create systems that improve consistency, communication, and confidence for families.",
  },
  {
    title: "Regional Growth",
    description: "Help expand access to high-quality autism services across Northern Virginia responsibly.",
  },
];

/** Preserved from original page — leadership responsibilities */
export const CL_LEADERSHIP_RESPONSIBILITY_CARDS = [
  {
    title: "Quality governance",
    description: "Set and monitor documentation, supervision, and treatment integrity standards.",
  },
  {
    title: "Workforce development",
    description: "Coach supervisors and clinicians to build high-performing care teams.",
  },
  {
    title: "Regional planning",
    description: "Align staffing and service expansion with family needs across Virginia markets.",
  },
];

/** Preserved — leadership readiness indicators */
export const CL_READINESS_INDICATORS_LEGACY = [
  {
    title: "Strong case outcomes",
    description: "Evidence of measurable progress and adaptable clinical decision making.",
  },
  {
    title: "Team development track record",
    description: "Demonstrated success mentoring direct staff and developing supervisors.",
  },
  {
    title: "Operational collaboration",
    description: "Ability to partner on scheduling, care coordination, and quality initiatives.",
  },
];

export type LeadershipLevelDetail = {
  title: string;
  primaryResponsibilities: string;
  leadershipFocus: string;
  teamImpact: string;
  growthOpportunities: string;
};

export const CL_LEADERSHIP_LADDER: LeadershipLevelDetail[] = [
  {
    title: "BCBA",
    primaryResponsibilities: "Lead assessment, treatment planning, supervision, and family guidance on assigned caseloads.",
    leadershipFocus: "Clinical decision-making and direct team coaching.",
    teamImpact: "Sets the standard for treatment fidelity among supervised staff.",
    growthOpportunities: "Senior BCBA and supervisory leadership tracks.",
  },
  {
    title: "Senior BCBA",
    primaryResponsibilities: "Expand clinical influence through mentorship, complex cases, and quality support.",
    leadershipFocus: "Modeling excellence and supporting supervisor development.",
    teamImpact: "Elevates consistency across multiple technicians and caseloads.",
    growthOpportunities: "Clinical Supervisor and Clinical Director pathways.",
  },
  {
    title: "Clinical Supervisor",
    primaryResponsibilities: "Lead technician development, supervision systems, and treatment quality monitoring.",
    leadershipFocus: "Supervision structure, feedback loops, and competency growth.",
    teamImpact: "Strengthens day-to-day clinical performance across teams.",
    growthOpportunities: "Clinical Director and regional leadership roles.",
  },
  {
    title: "Clinical Director",
    primaryResponsibilities: "Guide clinical operations, supervision systems, and quality workflows within a service area.",
    leadershipFocus: "Operational-clinical partnership and team alignment.",
    teamImpact: "Creates sustainable systems for supervisors and BCBAs.",
    growthOpportunities: "Regional Clinical Director and quality leadership.",
  },
  {
    title: "Regional Clinical Director",
    primaryResponsibilities: "Support multi-location quality, workforce development, and responsible growth initiatives.",
    leadershipFocus: "Regional strategy, leadership development, and service continuity.",
    teamImpact: "Aligns clinical culture across expanding service areas.",
    growthOpportunities: "Director of Clinical Quality and executive clinical leadership.",
  },
  {
    title: "Director of Clinical Quality",
    primaryResponsibilities: "Strengthen standards, audits, treatment integrity systems, and quality improvement.",
    leadershipFocus: "Quality governance, documentation culture, and audit readiness awareness.",
    teamImpact: "Improves consistency and accountability organization-wide.",
    growthOpportunities: "Executive clinical leadership and training systems leadership.",
  },
  {
    title: "Executive Clinical Leadership",
    primaryResponsibilities: "Shape long-term clinical strategy, organizational culture, and scalable care systems.",
    leadershipFocus: "Strategic influence, change management, and mission-aligned growth.",
    teamImpact: "Defines the clinical future of Eden's service communities.",
    growthOpportunities: "Expanded executive and regional leadership scope as organization grows.",
  },
];

export const CL_ROLE_CATEGORIES = [
  {
    title: "Clinical Supervisor",
    description: "Lead technician development and treatment quality across supervised teams.",
  },
  {
    title: "Clinical Director",
    description: "Guide clinical operations, supervision systems, and quality workflows.",
  },
  {
    title: "Regional Clinical Director",
    description: "Support multi-location quality, workforce development, and growth initiatives.",
  },
  {
    title: "Director of Clinical Quality",
    description: "Strengthen standards, audits, treatment integrity, and quality systems.",
  },
  {
    title: "Director of RBT Development",
    description: "Improve workforce development, technician growth, and RBT pathway systems.",
  },
  {
    title: "Training & Professional Development Leadership",
    description: "Build educational systems for long-term staff success and clinical excellence.",
  },
];

export const CL_COMPETENCY_DASHBOARDS = [
  {
    id: "clinical-excellence",
    title: "Clinical Excellence",
    items: [
      "Assessment quality",
      "Treatment planning",
      "Data-based decision making",
      "Treatment integrity",
      "Family-centered care",
    ],
  },
  {
    id: "supervision",
    title: "Supervision & Mentorship",
    items: [
      "Staff development",
      "Performance coaching",
      "Supervisor development",
      "Clinical feedback",
      "Competency growth",
    ],
  },
  {
    id: "operations",
    title: "Operational Partnership",
    items: [
      "Scheduling collaboration",
      "Caseload planning",
      "Service continuity",
      "Capacity planning",
      "Expansion readiness",
    ],
  },
  {
    id: "quality-governance",
    title: "Quality Governance",
    items: [
      "Documentation standards",
      "Quality reviews",
      "Risk awareness",
      "Audit readiness",
      "Compliance culture",
    ],
  },
  {
    id: "strategic",
    title: "Strategic Leadership",
    items: [
      "Change management",
      "Growth planning",
      "Team alignment",
      "Communication",
      "Organizational influence",
    ],
  },
];

export const CL_WHAT_LEADERS_DO = [
  {
    title: "Clinical Quality Oversight",
    description: "Monitor treatment integrity, documentation quality, and supervision consistency across teams.",
    whyItMatters: "Strong systems improve consistency across all clients and clinicians.",
  },
  {
    title: "Supervision Development",
    description: "Build feedback structures, competency planning, and supervisor coaching models.",
    whyItMatters: "Future clinical excellence depends on strong supervision.",
  },
  {
    title: "Workforce Growth",
    description: "Support RBT, BCBA, and supervisor development through mentorship and pathway planning.",
    whyItMatters: "Developing talent creates sustainable care systems.",
  },
  {
    title: "Family Partnership",
    description: "Champion caregiver communication standards and family-centered care culture.",
    whyItMatters: "Families deserve consistency, communication, and confidence.",
  },
  {
    title: "Quality Improvement",
    description: "Lead case reviews, quality conversations, and continuous improvement initiatives.",
    whyItMatters: "Continuous improvement strengthens long-term outcomes.",
  },
  {
    title: "Regional Expansion Planning",
    description: "Partner on staffing, service area growth, and scalable clinical systems.",
    whyItMatters: "Growth requires quality systems that scale responsibly.",
  },
];

export const CL_READINESS_INDICATORS = [
  "Strong clinical judgment",
  "Consistent treatment outcomes",
  "Mentorship experience",
  "Supervision experience",
  "Documentation quality",
  "Family collaboration",
  "Team communication",
  "Operational awareness",
  "Ethical decision making",
  "Quality improvement mindset",
];

export const CL_FUTURE_LEADERS_PATH = [
  "BT",
  "RBT",
  "BCaBA",
  "BCBA",
  "Senior BCBA",
  "Clinical Leadership",
];

export const CL_CULTURE_VALUES = [
  { title: "Integrity", description: "Lead with ethical, transparent clinical decision-making." },
  { title: "Mentorship", description: "Invest in developing the next generation of clinicians." },
  { title: "Accountability", description: "Own quality outcomes and follow-through across teams." },
  { title: "Growth", description: "Pursue responsible expansion with clinical excellence at the center." },
  { title: "Family Partnership", description: "Keep caregivers at the heart of care systems and communication." },
  { title: "Clinical Excellence", description: "Model treatment integrity and data-informed practice." },
];

export const CL_TAB_OVERVIEW = {
  summary:
    "Clinical leadership at Eden ABA Therapy exists to strengthen quality systems, develop clinicians, support families, and guide responsible regional growth. Leaders influence supervision culture, documentation standards, treatment integrity, workforce development, and family-centered service delivery across Annandale and Northern Virginia.",
  highlights: [
    "Mission-driven leadership focused on children, families, and clinicians",
    "Quality governance with educational DBHDS and Medicaid-readiness awareness",
    "Structured pathways from Senior BCBA to regional and executive roles",
    "Operational partnership that supports sustainable, scalable care",
  ],
};

export const CL_INTERVIEW_PREP_CARDS = [
  { title: "Demonstrate clinical reasoning", description: "Explain how you assess, plan, and adjust treatment using data and family context." },
  { title: "Show mentorship examples", description: "Share how you develop supervisors, BCBAs, and direct care staff." },
  { title: "Discuss treatment integrity", description: "Describe systems you use to monitor fidelity and documentation quality." },
  { title: "Explain quality improvement initiatives", description: "Highlight case reviews, audits, or process improvements you led." },
  { title: "Share supervision experiences", description: "Discuss observation, feedback, and competency-based coaching." },
  { title: "Describe difficult leadership situations", description: "Focus on ethics, communication, and resolution pathways." },
  { title: "Discuss caregiver collaboration", description: "Emphasize family-centered communication and goal alignment." },
  { title: "Show strategic thinking", description: "Connect clinical quality to workforce planning and regional growth." },
];

export const CL_FAQ_ITEMS: CareerFaqItem[] = [
  {
    question: "What leadership roles does Eden hire for?",
    answer:
      "Eden may hire for Clinical Supervisor, Clinical Director, Regional Clinical Director, Director of Clinical Quality, Director of RBT Development, and related training and professional development leadership roles depending on organizational needs.",
  },
  {
    question: "Do I need regional leadership experience?",
    answer:
      "Requirements vary by role. Some positions prioritize Senior BCBA or Clinical Director experience, while regional roles may require multi-team or multi-site leadership background. Review current openings for specifics.",
  },
  {
    question: "How does Eden approach quality governance?",
    answer:
      "Eden emphasizes treatment integrity, documentation quality, supervision systems, and educational awareness of Virginia provider and payer expectations—without substituting for legal or regulatory advice.",
  },
  {
    question: "Do clinical leaders still supervise cases?",
    answer:
      "Role scope varies. Some leadership positions remain clinically active while others focus more on systems, teams, and regional strategy.",
  },
  {
    question: "Is there a path from BCBA to leadership?",
    answer:
      "Many leaders progress from BCBA to Senior BCBA, Clinical Supervisor, and director-level roles based on experience, performance, and organizational needs.",
  },
  {
    question: "How do I apply for leadership roles?",
    answer:
      "Search leadership openings on Open Roles, join the Talent Network, or contact recruiting to discuss fit.",
  },
];

export const CL_SAMPLE_INTERVIEW_QUESTIONS: CareerFaqItem[] = [
  { question: "How do you develop clinical staff?", answer: "Discuss mentorship, feedback structures, competency planning, and supervision models." },
  { question: "How do you improve treatment quality?", answer: "Share data review, fidelity monitoring, documentation standards, and case consultation examples." },
  { question: "Describe a difficult supervision situation.", answer: "Focus on ethics, communication, escalation, and outcomes." },
  { question: "How do you maintain treatment integrity?", answer: "Explain observation systems, coaching, and quality review habits." },
  { question: "How do you balance quality and growth?", answer: "Discuss capacity planning, staffing alignment, and scalable systems." },
  { question: "How do you build strong teams?", answer: "Highlight communication, accountability, mentorship, and shared clinical standards." },
  { question: "How do you approach family-centered leadership?", answer: "Emphasize caregiver partnership, respectful communication, and goal alignment." },
  { question: "What leadership environment helps you perform best?", answer: "Ask about Eden's support systems, quality review, and strategic collaboration." },
];

export const CL_DAY_TIMELINE = [
  { step: "Review quality metrics", detail: "Assess treatment integrity indicators, documentation trends, and caseload priorities." },
  { step: "Review caseload concerns", detail: "Identify clinical escalations and supervisor support needs." },
  { step: "Support supervisors", detail: "Coach clinical supervisors on feedback, case review, and team development." },
  { step: "Coach clinicians", detail: "Provide mentorship on complex cases and leadership competencies." },
  { step: "Review documentation quality", detail: "Monitor clinical records and treatment plan alignment with quality standards." },
  { step: "Collaborate with operations", detail: "Partner on scheduling, capacity, and service continuity planning." },
  { step: "Participate in leadership meetings", detail: "Align on quality initiatives, workforce development, and regional priorities." },
  { step: "Support family-centered initiatives", detail: "Champion caregiver communication and parent training standards." },
  { step: "Address escalations", detail: "Guide ethical, calm resolution pathways for complex clinical situations." },
  { step: "Plan future growth", detail: "Contribute to staffing, expansion readiness, and long-term clinical strategy." },
];

export const CL_SUPPORT_CARDS = [
  { title: "Leadership mentorship", description: "Access to experienced clinical executives and regional leaders for consultation." },
  { title: "Quality review systems", description: "Structured case review, documentation feedback, and treatment integrity conversations." },
  { title: "Clinical collaboration", description: "Cross-functional partnership with supervisors, BCBAs, and training leaders." },
  { title: "Operational partnership", description: "Scheduling, capacity, and service continuity alignment with operations teams." },
  { title: "Professional development", description: "Leadership coaching and continuing education aligned to role scope." },
  { title: "Regional leadership support", description: "Guidance for multi-location quality and workforce planning." },
  { title: "Strategic planning opportunities", description: "Participation in growth and expansion readiness discussions." },
  { title: "Long-term growth pathways", description: "Clear advancement conversations based on performance and organizational needs." },
];

export const CL_SUPPORT_DISCLAIMER =
  "Leadership opportunities may vary based on experience, credential eligibility, organizational needs, and service area growth. Benefits, schedules, caseloads, and supervision structures may also vary by role and location.";

export const CL_EDUCATIONAL_NOTICE =
  "Educational note: Clinical leadership content references BACB supervision themes, quality assurance concepts, family-centered care, and Virginia provider culture including DBHDS and Medicaid documentation awareness for educational purposes only. This page does not provide legal, credentialing, billing, or regulatory advice.";

export const CL_PHOTO_GALLERY = [
  {
    src: "/images/about-eden-hero-team.jpg",
    alt: "Eden clinical leadership team collaboration meeting",
    caption: "Clinical leadership collaboration",
  },
  {
    src: "/images/home-service-parent-training.jpg",
    alt: "Supervisor coaching session with a clinician",
    caption: "Supervisor coaching and development",
  },
  {
    src: "/images/aba-day-step-wrapup.jpg",
    alt: "Quality review and clinical documentation discussion",
    caption: "Quality review and documentation",
  },
  {
    src: "/images/aba-section-assessment.jpg",
    alt: "Treatment planning and assessment collaboration",
    caption: "Treatment planning collaboration",
  },
  {
    src: "/images/about-eden-family-centered-care.jpg",
    alt: "Family-centered care planning discussion",
    caption: "Family-centered care planning",
  },
  {
    src: "/images/about-eden-hero-team.jpg",
    alt: "Regional leadership strategy discussion among clinical leaders",
    caption: "Regional leadership strategy",
  },
];
