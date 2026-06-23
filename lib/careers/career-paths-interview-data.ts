import type { CareerFaqItem } from "./faq-data";

export const INTERVIEW_GUIDE_EXPECT = [
  {
    title: "Phone or video screening",
    description: "Initial conversation about schedule, role interest, experience level, and basic role fit.",
  },
  {
    title: "Clinical or role conversation",
    description: "Discussion of your approach to children, families, supervision, documentation, and ethical boundaries.",
  },
  {
    title: "Scenario-based questions",
    description: "Questions about reliability, feedback, challenging moments, and professional communication.",
  },
  {
    title: "Logistics & next steps",
    description: "Review of credential status, availability, service area, onboarding timeline, and questions for the team.",
  },
];

export const INTERVIEW_GUIDE_STAR = {
  title: "STAR interview method",
  summary:
    "Structure behavioral answers with Situation, Task, Action, and Result—especially helpful for direct care and clinical roles.",
  steps: [
    { letter: "S", label: "Situation", description: "Briefly describe the context (session, team, family need)." },
    { letter: "T", label: "Task", description: "Explain your responsibility or goal in that moment." },
    { letter: "A", label: "Action", description: "Share the specific steps you took—stay professional and concrete." },
    { letter: "R", label: "Result", description: "Describe the outcome, what you learned, or how supervision supported you." },
  ],
};

export const INTERVIEW_GUIDE_COMMUNICATION = [
  "Use respectful language when describing children, caregivers, and colleagues.",
  "Be honest about experience level—coachability matters as much as credentials.",
  "Ask thoughtful questions about supervision, training, and schedule expectations.",
  "Avoid discussing confidential client details; use generalized examples.",
  "Confirm understanding before answering complex clinical scenario questions.",
];

export const INTERVIEW_GUIDE_PROFESSIONALISM = [
  "Arrive prepared with your resume, credential status, and availability windows.",
  "Dress professionally; virtual interviews should use a quiet, neutral background.",
  "Demonstrate calm communication—even when describing challenging situations.",
  "Show awareness of ethical boundaries, HIPAA-style confidentiality, and role scope.",
  "Thank interviewers and follow up promptly if additional materials are requested.",
];

export const INTERVIEW_GUIDE_CHECKLIST = [
  "Review the job posting and Eden role page for expectations",
  "Prepare 2–3 STAR stories about reliability, patience, or teamwork",
  "List your credential status (RBT, BCBA, in-progress, etc.)",
  "Confirm your geographic availability and schedule windows",
  "Prepare questions about supervision, onboarding, and growth pathways",
  "Test technology for virtual interviews; have a backup contact method",
  "Review professional social media and email signature for consistency",
];

export const INTERVIEW_BT_QUESTIONS: CareerFaqItem[] = [
  { question: "Why do you want to become a Behavior Technician?", answer: "Focus on helping children, willingness to learn, and interest in supervised autism care." },
  { question: "What experience do you have working with children?", answer: "Share childcare, education, camp, healthcare, or family support examples." },
  { question: "Tell us about a time you stayed calm under pressure.", answer: "Describe patience, safety awareness, and professional communication." },
  { question: "How do you handle feedback from a supervisor?", answer: "Emphasize coachability, asking clarifying questions, and applying feedback." },
  { question: "What questions do you have for us?", answer: "Ask about training, supervision frequency, schedule, and RBT pathway support." },
];

export const INTERVIEW_RBT_QUESTIONS: CareerFaqItem[] = [
  { question: "Why do you want to work as an RBT at Eden?", answer: "Connect motivation to treatment fidelity, family partnership, and ethical ABA practice." },
  { question: "How do you ensure treatment plan fidelity?", answer: "Discuss data collection habits, supervisor communication, and session preparation." },
  { question: "Describe your experience with caregiver communication.", answer: "Share examples of respectful updates and practical carryover support." },
  { question: "How do you maintain RBT certification requirements?", answer: "Mention renewal awareness, supervision, and competency maintenance." },
  { question: "Where do you see yourself growing clinically?", answer: "Senior RBT, Lead RBT, or BCBA pathway awareness—without demanding timelines." },
];

export const INTERVIEW_BCBA_QUESTIONS: CareerFaqItem[] = [
  { question: "How do you approach functional assessment and treatment planning?", answer: "Describe data-based decisions, caregiver input, and measurable outcomes." },
  { question: "How do you supervise and coach RBTs?", answer: "Share observation, feedback, competency planning, and treatment integrity monitoring." },
  { question: "Tell us about a complex case you supported.", answer: "Use STAR format; emphasize collaboration, ethics, and documentation quality." },
  { question: "How do you partner with caregivers?", answer: "Explain practical training, respectful communication, and culturally responsive care." },
  { question: "What is your philosophy on sustainable caseload management?", answer: "Discuss quality, supervision bandwidth, and team support—not burnout glorification." },
];

export const RESUME_BEST_PRACTICES = [
  { title: "Lead with role clarity", description: "State target role (BT, RBT, BCBA) and credential status near the top." },
  { title: "Use impact bullets", description: "Replace task lists with outcomes, populations served, and settings (home, school, community)." },
  { title: "Keep it scannable", description: "One to two pages; clear headings; consistent dates and formatting." },
  { title: "Proofread carefully", description: "Spelling, grammar, and consistent tense reflect professional communication." },
];

export const RESUME_EXPERIENCE_EXAMPLES = [
  "Delivered direct ABA therapy to children ages 3–8 in home settings under BCBA supervision.",
  "Maintained 95%+ session attendance over 6 months while supporting caregiver carryover routines.",
  "Collected skill acquisition and behavior data with same-day documentation compliance.",
  "Co-facilitated parent training goals focused on communication and daily living skills.",
  "Supported onboarding of new technicians through modeling and peer feedback.",
];

export const RESUME_CLINICAL_SKILLS = [
  "Skill acquisition & behavior reduction procedures",
  "Data collection, graphing, and session notes",
  "RBT/BCBA supervision and competency planning",
  "Functional behavior assessment support",
  "Caregiver training and interdisciplinary communication",
  "Treatment fidelity and ethical boundary awareness",
];

export const RESUME_EDUCATION_GUIDANCE = [
  { title: "Direct care roles", description: "High school diploma or equivalent; note RBT coursework or certification progress." },
  { title: "RBT candidates", description: "List active RBT certification, expiration date, and supervising BCBA relationship if applicable." },
  { title: "BCBA candidates", description: "Graduate degree, BCBA certification, Virginia authorization/licensure status as applicable." },
  { title: "In-progress credentials", description: "Clearly label coursework in progress with expected completion timeframe." },
];

export const RESUME_FORMATTING_TIPS = [
  "Use a clean, professional font (11–12 pt body text)",
  "Save and submit as PDF unless another format is requested",
  "Include city/state and professional email; avoid unprofessional handles",
  "List certifications in a dedicated section with issuing body (BACB, etc.)",
  "Remove outdated roles unrelated to care unless they show transferable reliability skills",
];

export const RESUME_FAQ: CareerFaqItem[] = [
  {
    question: "Should I include non-ABA jobs?",
    answer: "Yes, if they demonstrate reliability, childcare, customer service, healthcare, or education experience relevant to direct care.",
  },
  {
    question: "How long should my resume be?",
    answer: "Most BT and RBT resumes fit one page. BCBA resumes may extend to two pages with relevant clinical leadership experience.",
  },
];
