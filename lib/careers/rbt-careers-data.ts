import type { CareerFaqItem } from "./faq-data";

export const RBT_CAREERS_META = {
  title: "RBT Careers | Eden ABA Therapy",
  description:
    "Explore Registered Behavior Technician careers at Eden ABA Therapy. Learn about RBT responsibilities, skills, supervision, career growth, interview tips, and open roles in Annandale and Northern Virginia.",
};

export const RBT_HERO_BADGES = [
  "Clinical Role",
  "Direct Care",
  "Supervised Practice",
  "Growth Pathway",
] as const;

export const RBT_OVERVIEW_CARDS = [
  {
    title: "Support Skill Growth",
    description:
      "Help children practice communication, play, social, and daily living goals through structured, individualized programs.",
  },
  {
    title: "Strengthen Treatment Consistency",
    description:
      "Apply supervisor direction with reliable session preparation, accurate data, and steady follow-through across visits.",
  },
  {
    title: "Partner With Families",
    description:
      "Communicate respectfully with caregivers and supervisors so families feel informed, supported, and confident in care.",
  },
];

export const RBT_RESPONSIBILITIES = [
  "Implement individualized treatment plans under BCBA and supervisor direction.",
  "Run skill-acquisition programs aligned with the approved treatment plan.",
  "Support communication, play, social, and daily living skills in natural environments.",
  "Collect accurate session data and record observations consistently.",
  "Follow behavior intervention plans with professional judgment and safety awareness.",
  "Prepare materials and session environments before each visit.",
  "Communicate professionally with caregivers, supervisors, and team members.",
  "Maintain confidentiality, boundaries, and ethical standards in all interactions.",
  "Support generalization of skills across home, community, and other service settings.",
  "Participate in supervision, feedback sessions, and collaborative team planning.",
];

export const RBT_SKILLS = [
  "Reliability and punctuality",
  "Calm communication",
  "Data accuracy",
  "Session preparation",
  "Patience and compassion",
  "Professional boundaries",
  "Adaptability across settings",
  "Responsiveness to feedback",
  "Safety awareness",
  "Respectful client engagement",
  "Family-centered communication",
  "Team collaboration",
];

export const RBT_CANDIDATE_FIT = [
  "Interested in child development and autism support",
  "Comfortable working one-on-one with children",
  "Organized with data and documentation",
  "Open to coaching and supervision",
  "Calm during challenging moments",
  "Motivated to grow in ABA therapy",
];

export const RBT_REQUIRED_QUALIFICATIONS = [
  "RBT credential or willingness to work toward role-specific requirements if applicable",
  "High school diploma or equivalent where required",
  "Ability to work reliably in assigned service settings",
  "Professional communication with families and clinical teams",
  "Ability to follow clinical direction and treatment protocols",
  "Commitment to ethical and respectful care",
  "Ability to document session activity accurately",
];

export const RBT_PREFERRED_QUALIFICATIONS = [
  "Prior ABA, childcare, education, healthcare, or autism support experience",
  "Existing RBT certification",
  "Experience with children or adolescents",
  "Comfort supporting communication, play, and daily living goals",
  "Strong availability after school or early evening",
  "Interest in growing toward Lead RBT, BCaBA, or BCBA pathways",
];

export const RBT_GROWTH_LADDER = [
  "Behavior Technician",
  "RBT",
  "Senior RBT",
  "Lead RBT",
  "BCaBA",
  "BCBA",
];

export const RBT_INTERVIEW_TIPS = [
  "Be ready to explain why you want to work with children and families.",
  "Share examples of reliability, patience, and teamwork.",
  "Talk about how you handle feedback and coaching.",
  "Be honest about your experience level and learning goals.",
  "Ask about supervision, training, schedule expectations, and team support.",
  "Show respect for ethical care, documentation, and family communication.",
];

export const RBT_FAQ_ITEMS: CareerFaqItem[] = [
  {
    question: "Do I need to already be an RBT?",
    answer:
      "Some Eden openings prefer or require an active RBT credential, while others may consider candidates who meet role requirements and are prepared to work toward RBT eligibility where applicable. Review current openings for specific expectations.",
  },
  {
    question: "Who supervises RBTs?",
    answer:
      "Per BACB guidance, RBTs are paraprofessionals who assist with behavior-analytic services under close supervision of an RBT Supervisor and/or RBT Requirements Coordinator. At Eden, RBTs also receive ongoing direction and feedback from supervising BCBAs and clinical leadership.",
  },
  {
    question: "What settings do RBTs work in?",
    answer:
      "RBTs at Eden may support children and families in home-based, community-based, and other natural environments across Annandale and Northern Virginia, depending on the treatment plan and service authorization.",
  },
  {
    question: "Is training provided?",
    answer:
      "Eden provides role-aligned onboarding, supervision touchpoints, and practical coaching. Training scope and timing may vary by role, credential status, and service setting.",
  },
  {
    question: "What skills help someone succeed?",
    answer:
      "Reliability, calm communication, data accuracy, session preparation, responsiveness to feedback, and respectful family engagement are especially important for consistent, high-quality direct care.",
  },
  {
    question: "Can RBTs grow into BCBA roles?",
    answer:
      "Many RBTs pursue structured growth toward Senior RBT, Lead RBT, BCaBA, and BCBA pathways. Advancement depends on credential eligibility, experience, supervision, and organizational needs—not guaranteed timelines.",
  },
  {
    question: "Are schedules full-time or part-time?",
    answer:
      "Schedule structures vary by role, caseload, and family availability. Some positions may include after-school or early evening hours. Details are shared during recruiting for each opening.",
  },
  {
    question: "How do I apply?",
    answer:
      "Search current RBT and related direct-care openings on our Open Roles page, or join the Talent Network to be contacted when a matching opportunity becomes available.",
  },
];

export const RBT_DAY_TIMELINE = [
  { step: "Review session plan", detail: "Confirm goals, materials, and priorities with your supervisor's direction." },
  { step: "Prepare materials", detail: "Set up reinforcers, visuals, and data sheets before the session begins." },
  { step: "Greet family/client professionally", detail: "Arrive on time and establish a respectful, calm start to the visit." },
  { step: "Implement programs", detail: "Deliver skill-acquisition and behavior-support procedures with fidelity." },
  { step: "Collect data", detail: "Record accurate, timely observations throughout the session." },
  { step: "Support behavior plan with supervision", detail: "Follow intervention plans and consult supervisors when needed." },
  { step: "Communicate session updates", detail: "Share concise, professional updates with caregivers when appropriate." },
  { step: "Submit documentation", detail: "Complete session notes and required records promptly." },
  { step: "Receive feedback and improve", detail: "Use supervision to refine skills and strengthen treatment consistency." },
];

export const RBT_SUPPORT_CARDS = [
  {
    title: "Supervision and coaching",
    description: "Regular direction from supervising clinicians aligned to your caseload and development goals.",
  },
  {
    title: "Practical feedback",
    description: "Observation-based coaching focused on treatment fidelity, communication, and professionalism.",
  },
  {
    title: "Scheduling coordination",
    description: "Operations support to help align sessions, travel, and caseload continuity where applicable.",
  },
  {
    title: "Career pathway support",
    description: "Educational guidance on growth toward senior technician, BCaBA, and BCBA tracks.",
  },
  {
    title: "Team communication",
    description: "Structured collaboration with supervisors, caregivers, and internal support teams.",
  },
  {
    title: "Values-based care culture",
    description: "Family-centered expectations that prioritize dignity, respect, and ethical practice.",
  },
];

export const RBT_SUPPORT_DISCLAIMER =
  "Benefits, schedules, and growth opportunities may vary by role, location, employment status, and company needs.";

export const RBT_BACB_NOTICE =
  "Educational note: Registered Behavior Technicians (RBTs) are paraprofessionals who assist with behavior-analytic services under close supervision of an RBT Supervisor and/or RBT Requirements Coordinator, per BACB framework. This page is informational and does not constitute credentialing, legal, or regulatory advice.";

export const RBT_PHOTO_GALLERY = [
  {
    src: "/images/aba-day-step-skills.jpg",
    alt: "RBT supporting a child during a structured skill-building activity at a table",
    caption: "Structured skill-building sessions",
  },
  {
    src: "/images/aba-day-step-social-play.jpg",
    alt: "Therapist supporting play-based learning during an ABA session",
    caption: "Play-based learning support",
  },
  {
    src: "/images/about-eden-family-centered-care.jpg",
    alt: "Caregiver and clinician collaboration during a family-centered care discussion",
    caption: "Caregiver and supervisor collaboration",
  },
  {
    src: "/images/aba-day-step-wrapup.jpg",
    alt: "Clinician reviewing session data and preparation materials",
    caption: "Data collection and session preparation",
  },
  {
    src: "/images/home-service-in-home-aba.jpg",
    alt: "In-home ABA therapy session in a natural home environment",
    caption: "Home and community-based support",
  },
];

export const RBT_TAB_OVERVIEW = {
  summary:
    "Registered Behavior Technicians (RBTs) deliver direct, supervised ABA services that help children build meaningful skills across natural environments. At Eden ABA Therapy, RBTs are supported through structured supervision, practical feedback, documentation expectations, and collaboration with families and clinical teams in Annandale and Northern Virginia.",
  highlights: [
    "Direct care role with clear supervisor direction",
    "Focus on communication, play, social, and daily living goals",
    "Data quality and ethical boundaries emphasized from day one",
    "Pathways toward senior technician and clinical leadership roles",
  ],
};

export const RBT_HERO_JOURNEY_STEPS = [
  { step: 1, label: "Apply" },
  { step: 2, label: "Interview" },
  { step: 3, label: "Train" },
  { step: 4, label: "Support children" },
  { step: 5, label: "Grow with Eden" },
];

export const RBT_MOTIVATION_STATS = [
  {
    title: "Direct child impact",
    description: "Every session is a chance to help a child practice skills that support communication, independence, and connection.",
  },
  {
    title: "Supervised clinical growth",
    description: "Receive direction, feedback, and coaching from Eden's supervising clinical team as you build confidence.",
  },
  {
    title: "Pathway to advancement",
    description: "Many RBTs grow toward Senior RBT, Lead RBT, BCaBA, BCBA, and clinical leadership over time.",
  },
];

export const RBT_JOURNEY_TIMELINE = [
  {
    title: "Apply for an RBT role",
    description: "Review open positions and submit your application or join the Talent Network for future openings.",
  },
  {
    title: "Meet the recruiting team",
    description: "Share your experience, availability, and interest in family-centered autism care.",
  },
  {
    title: "Complete onboarding and role expectations",
    description: "Learn Eden's clinical standards, documentation culture, and supervision structure.",
  },
  {
    title: "Begin supervised client support",
    description: "Start delivering direct care with clear BCBA direction in home and community settings.",
  },
  {
    title: "Build data, communication, and session skills",
    description: "Strengthen treatment fidelity, caregiver communication, and professional consistency.",
  },
  {
    title: "Grow toward Senior RBT, Lead RBT, BCaBA, or BCBA",
    description: "Advance based on credential eligibility, performance, supervision, and organizational needs.",
  },
];

export const RBT_ROLE_SNAPSHOT = {
  roleType: "Clinical direct care",
  supervision: "BCBA / qualified supervisor direction",
  serviceSetting: "Home, community, and natural environments",
  focusAreas: "Communication, play, social, daily living, learning-readiness skills",
  growthPath: "RBT → Senior RBT → Lead RBT → BCaBA → BCBA",
  bestFit: "Reliable, patient, coachable, organized, family-centered candidates",
};

export const RBT_SKILL_CATEGORIES = [
  {
    title: "Clinical Readiness",
    skills: [
      "Following treatment plans",
      "Running skill-acquisition programs",
      "Supporting behavior plans",
      "Generalization across settings",
    ],
  },
  {
    title: "Professional Skills",
    skills: ["Reliability", "Punctuality", "Communication", "Confidentiality", "Professional boundaries"],
  },
  {
    title: "Data & Documentation",
    skills: ["Session data", "Progress notes", "Observation tracking", "Accurate documentation habits"],
  },
  {
    title: "Family Collaboration",
    skills: ["Respectful caregiver updates", "Calm communication", "Cultural humility", "Team consistency"],
  },
];

export const RBT_LEARNING_PATHWAY = [
  "ABA session structure",
  "Skill acquisition",
  "Behavior support basics",
  "Reinforcement strategies",
  "Prompting and fading",
  "Data collection",
  "Caregiver communication",
  "Supervisor feedback",
  "Ethical direct care",
];

export const RBT_RESPONSIBILITIES_DETAILED = [
  {
    title: "Implement individualized treatment plans",
    description: "Deliver programs under BCBA and supervisor direction with consistency and care.",
    whyItMatters: "Consistent implementation helps children practice skills in a structured and meaningful way.",
  },
  {
    title: "Run skill-acquisition programs",
    description: "Support communication, play, social, and daily living goals aligned to the treatment plan.",
    whyItMatters: "Repeated, well-run practice builds the skills families hope to see in everyday life.",
  },
  {
    title: "Collect accurate session data",
    description: "Record observations promptly and reliably throughout each session.",
    whyItMatters: "Quality data helps supervisors adjust programs and show meaningful progress over time.",
  },
  {
    title: "Follow behavior intervention plans",
    description: "Apply protocols with professional judgment, safety awareness, and supervisor consultation.",
    whyItMatters: "Safe, consistent support protects dignity while helping children learn replacement skills.",
  },
  {
    title: "Prepare materials before sessions",
    description: "Set up reinforcers, visuals, and environments before the visit begins.",
    whyItMatters: "Prepared sessions reduce downtime and help children engage more successfully.",
  },
  {
    title: "Communicate with caregivers and supervisors",
    description: "Share updates professionally and respectfully with families and clinical teams.",
    whyItMatters: "Clear communication builds trust and helps skills carry over beyond the session.",
  },
  {
    title: "Maintain confidentiality and ethical boundaries",
    description: "Protect client dignity and follow Eden's ethical direct-care expectations.",
    whyItMatters: "Families deserve respectful, trustworthy professionals in their homes and communities.",
  },
  {
    title: "Support generalization across settings",
    description: "Help skills transfer across home, community, and natural environments.",
    whyItMatters: "Real-world practice is what makes therapy outcomes sustainable for families.",
  },
  {
    title: "Participate in supervision and team collaboration",
    description: "Attend feedback sessions and work openly with supervisors to improve.",
    whyItMatters: "Coachability and teamwork are how strong RBTs grow into long-term clinical careers.",
  },
  {
    title: "Support communication, play, and daily living skills",
    description: "Use naturalistic opportunities to practice goals throughout the session.",
    whyItMatters: "Everyday moments are often the best context for meaningful child progress.",
  },
];

export const RBT_CONFIDENCE_CARDS = [
  { title: "We value coachability", description: "Strong RBTs ask questions, accept feedback, and keep improving." },
  { title: "We value consistency", description: "Reliable attendance and follow-through help families feel supported." },
  { title: "We value respectful communication", description: "Calm, professional communication matters with children and caregivers." },
  { title: "We value ethical care", description: "Dignity, boundaries, and documentation habits are part of the role from day one." },
];

export const RBT_GROWTH_LADDER_DETAILED = [
  { title: "Behavior Technician", description: "Learn direct-care fundamentals under close supervision." },
  { title: "Registered Behavior Technician", description: "Deliver credential-aligned services with BCBA direction." },
  { title: "Senior RBT", description: "Model best practices and support newer team members." },
  { title: "Lead RBT", description: "Coordinate technician support and treatment consistency across caseloads." },
  { title: "BCaBA", description: "Provide mid-level clinical support under BCBA supervision." },
  { title: "BCBA", description: "Lead assessment, planning, supervision, and family guidance." },
];

export const RBT_INTERVIEW_PREP_CARDS = [
  { title: "Show reliability", description: "Share examples of showing up on time and following through on commitments." },
  { title: "Explain why child development matters to you", description: "Connect your motivation to helping children and families thrive." },
  { title: "Share examples of patience", description: "Describe how you stay calm and supportive during challenging moments." },
  { title: "Be open about your experience level", description: "Honesty about what you know—and what you are ready to learn—builds trust." },
  { title: "Show that you can receive feedback", description: "Interviewers look for coachability, not perfection." },
  { title: "Ask about supervision and training", description: "Questions about support show you take clinical growth seriously." },
  { title: "Speak professionally about families", description: "Use respectful language about caregivers and confidentiality." },
  { title: "Show interest in data and documentation", description: "Highlight organization habits and attention to detail." },
];

export const RBT_SAMPLE_INTERVIEW_QUESTIONS: CareerFaqItem[] = [
  {
    question: "Why do you want to become an RBT?",
    answer:
      "Focus on your interest in child development, autism support, teamwork, and learning under supervision—not on salary promises or credential guarantees.",
  },
  {
    question: "How do you handle feedback?",
    answer:
      "Share a brief example of listening, adjusting, and improving after coaching from a supervisor, teacher, or manager.",
  },
  {
    question: "Tell us about a time you stayed calm under pressure.",
    answer:
      "Describe a situation where patience, safety awareness, and clear communication helped you stay professional.",
  },
  {
    question: "How would you communicate professionally with a caregiver?",
    answer:
      "Emphasize respect, clarity, confidentiality, and calm updates aligned to supervisor direction.",
  },
  {
    question: "What does reliability mean in a clinical role?",
    answer:
      "Discuss punctuality, session preparation, accurate documentation, and consistent follow-through.",
  },
  {
    question: "How do you stay organized?",
    answer:
      "Mention data sheets, session materials, scheduling habits, and readiness before each visit.",
  },
];

export const RBT_PHOTO_GALLERY_EXTENDED = [
  ...RBT_PHOTO_GALLERY,
  {
    src: "/images/home-service-parent-training.jpg",
    alt: "Supervisor coaching conversation with a clinician during a parent training session",
    caption: "Supervisor coaching and support",
  },
];
