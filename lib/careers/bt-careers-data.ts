import type { CareerFaqItem } from "./faq-data";

export const BT_CAREERS_META = {
  title: "Behavior Technician Careers | Eden ABA Therapy",
  description:
    "Explore Behavior Technician careers at Eden ABA Therapy. Learn about BT responsibilities, training, supervision, interview tips, career growth, and open roles in Annandale and Northern Virginia.",
};

export const BT_HERO_BADGES = [
  "Entry-Level Friendly",
  "Direct Child Support",
  "Supervised Practice",
  "Training Pathway",
  "Career Growth",
] as const;

export const BT_HERO_JOURNEY_STEPS = [
  { step: 1, label: "Apply" },
  { step: 2, label: "Meet Eden's team" },
  { step: 3, label: "Complete onboarding" },
  { step: 4, label: "Learn ABA session skills" },
  { step: 5, label: "Support children and families" },
  { step: 6, label: "Grow toward RBT" },
];

export const BT_MOTIVATION_STATS = [
  {
    title: "Entry-level opportunity",
    description: "Start a clinical career with structured onboarding even if you are new to ABA therapy.",
  },
  {
    title: "Supervised skill development",
    description: "Learn through observation, coaching, and practical feedback from Eden's clinical team.",
  },
  {
    title: "Pathway toward RBT and beyond",
    description: "Many BTs grow toward RBT, senior technician, and long-term clinical leadership tracks.",
  },
];

export const BT_JOURNEY_TIMELINE = [
  {
    title: "Apply for a BT role",
    description: "Review open positions and submit your application or join the Talent Network.",
  },
  {
    title: "Meet the recruiting team",
    description: "Share your experience, availability, and interest in working with children and families.",
  },
  {
    title: "Review schedule, service area, and role expectations",
    description: "Align on service settings, hours, and what supervised direct care looks like at Eden.",
  },
  {
    title: "Complete onboarding and training",
    description: "Learn session structure, safety expectations, documentation habits, and team communication.",
  },
  {
    title: "Begin supervised child support",
    description: "Start delivering direct care with clear supervisor direction in natural environments.",
  },
  {
    title: "Build skills in data, communication, and session preparation",
    description: "Strengthen consistency, caregiver communication, and treatment fidelity over time.",
  },
  {
    title: "Grow toward RBT, Senior RBT, Lead RBT, BCaBA, or BCBA",
    description: "Advance based on training, credential eligibility, performance, and organizational needs.",
  },
];

/** Preserved from original BT page */
export const BT_FOCUS_ITEMS = [
  "Delivering consistent direct support with supervisor guidance",
  "Building trust with caregivers and interdisciplinary partners",
  "Collecting reliable data to inform treatment decisions",
  "Developing readiness for RBT credential expectations",
];

export const BT_DEVELOPMENT_SUPPORTS = [
  {
    title: "Structured onboarding",
    description: "Early competency milestones and observation-based coaching.",
  },
  {
    title: "In-session feedback",
    description: "Regular supervisor support tied to measurable treatment integrity goals.",
  },
  {
    title: "Career pathway guidance",
    description: "Clear planning for RBT progression and long-term clinical growth.",
  },
];

export const BT_ROLE_SNAPSHOT = {
  roleType: "Entry-level clinical direct care",
  supervision: "Works under direction of qualified clinical supervisors",
  serviceSetting: "Home, community, and natural learning environments",
  focusAreas: "Play, communication, social interaction, daily living skills, learning readiness",
  growthPath: "BT → RBT → Senior RBT → Lead RBT → BCaBA → BCBA",
  bestFit: "Reliable, patient, coachable, caring, organized, and family-centered candidates",
};

export const BT_SKILL_CATEGORIES = [
  {
    title: "Child Support Skills",
    skills: [
      "Engaging with children",
      "Following session plans",
      "Supporting play-based learning",
      "Encouraging communication",
      "Helping with daily living practice",
    ],
  },
  {
    title: "Professional Habits",
    skills: ["Reliability", "Punctuality", "Calm communication", "Confidentiality", "Professional boundaries"],
  },
  {
    title: "Learning and Feedback",
    skills: [
      "Coachability",
      "Asking questions",
      "Applying supervisor feedback",
      "Growing through practice",
      "Staying open to training",
    ],
  },
  {
    title: "Data and Session Readiness",
    skills: ["Basic data collection", "Session preparation", "Observation notes", "Following documentation expectations"],
  },
  {
    title: "Family-Centered Communication",
    skills: ["Respectful caregiver interaction", "Clear updates when appropriate", "Cultural humility", "Team consistency"],
  },
];

export const BT_LEARNING_PATHWAY = [
  "ABA session structure",
  "Play-based learning support",
  "Reinforcement basics",
  "Prompting and fading basics",
  "Data collection habits",
  "Following supervisor direction",
  "Supporting communication goals",
  "Professional caregiver communication",
  "Ethical direct care",
  "Preparing for the RBT pathway",
];

export const BT_RESPONSIBILITIES_DETAILED = [
  {
    title: "Support children during supervised ABA sessions",
    description: "Provide caring, consistent direct support aligned to supervisor direction.",
    whyItMatters: "Consistent, caring support helps children practice skills in real-life routines.",
  },
  {
    title: "Follow treatment activities and supervisor direction",
    description: "Implement session plans with attention to safety and treatment fidelity.",
    whyItMatters: "Reliable follow-through helps children experience structured, predictable learning.",
  },
  {
    title: "Help children practice communication, social, play, and daily living goals",
    description: "Use play-based and structured activities to support individualized goals.",
    whyItMatters: "Everyday practice builds the skills families hope to see outside sessions.",
  },
  {
    title: "Prepare materials before sessions",
    description: "Set up reinforcers, visuals, and environments before each visit.",
    whyItMatters: "Prepared sessions reduce downtime and help children engage more successfully.",
  },
  {
    title: "Collect basic session data as trained",
    description: "Record observations accurately using Eden's documentation expectations.",
    whyItMatters: "Quality data helps supervisors adjust programs and track meaningful progress.",
  },
  {
    title: "Maintain a calm, respectful, and safe session environment",
    description: "Support dignity, safety, and professional boundaries throughout each visit.",
    whyItMatters: "Children and families deserve calm, respectful care in their homes and communities.",
  },
  {
    title: "Communicate professionally with caregivers and supervisors",
    description: "Share updates respectfully and ask questions when clinical guidance is needed.",
    whyItMatters: "Clear communication builds trust and supports skill carryover at home.",
  },
  {
    title: "Follow confidentiality and ethical care expectations",
    description: "Protect client dignity and follow Eden's professional standards.",
    whyItMatters: "Ethical habits protect families and support long-term clinical credibility.",
  },
  {
    title: "Participate in training, supervision, and feedback",
    description: "Attend coaching touchpoints and apply feedback to improve session quality.",
    whyItMatters: "Coachability is how strong BTs grow into confident RBTs and beyond.",
  },
  {
    title: "Support generalization of skills across home and community settings",
    description: "Help children practice goals in natural environments when directed.",
    whyItMatters: "Real-world practice makes therapy outcomes more sustainable for families.",
  },
];

export const BT_CONFIDENCE_CARDS = [
  { title: "We value reliability", description: "Showing up consistently helps families feel supported and children stay on track." },
  { title: "We value patience", description: "Calm, steady support matters during challenging or new learning moments." },
  { title: "We value coachability", description: "Strong BTs ask questions, accept feedback, and keep improving." },
  { title: "We value respectful communication", description: "Professional communication with caregivers and supervisors is essential." },
  { title: "We value ethical care", description: "Dignity, boundaries, and confidentiality are part of the role from day one." },
  { title: "We value growth mindset", description: "You do not need every skill on day one—bring willingness to learn and grow." },
];

export const BT_GROWTH_LADDER_DETAILED = [
  { title: "Behavior Technician", description: "Learn direct-care fundamentals under close supervisor direction." },
  { title: "Registered Behavior Technician", description: "Deliver credential-aligned services with ongoing BCBA supervision when qualified." },
  { title: "Senior RBT", description: "Model best practices and support newer team members." },
  { title: "Lead RBT", description: "Coordinate technician support and treatment consistency across caseloads." },
  { title: "BCaBA", description: "Provide mid-level clinical support under BCBA supervision." },
  { title: "BCBA", description: "Lead assessment, planning, supervision, and family guidance." },
];

export const BT_TRAINING_PATH = {
  summary:
    "Behavior Technicians at Eden begin with structured onboarding and supervised practice, then build ABA session skills over time with coaching, feedback, and optional RBT pathway planning depending on role requirements.",
  steps: [
    "BT onboarding and role expectations",
    "Supervised practice with observation and feedback",
    "ABA skill-building: session structure, reinforcement, prompting, data collection",
    "RBT preparation awareness where role-appropriate",
    "RBT role progression based on credential eligibility and company needs",
    "Senior and lead technician pathways for experienced clinicians",
  ],
};

export const BT_TAB_OVERVIEW = {
  summary:
    "Behavior Technicians (BTs) at Eden ABA Therapy provide supervised direct support that helps children build communication, play, social, and daily living skills across home and community settings. BT roles are entry-level friendly and designed for candidates who are reliable, compassionate, and ready to learn—with a clear pathway toward RBT and future clinical growth in Annandale and Northern Virginia.",
  highlights: [
    "Entry-level direct care with structured supervisor direction",
    "Training, feedback, and session preparation support",
    "Play-based and structured skill practice in natural environments",
    "Pathway awareness toward RBT and long-term clinical careers",
  ],
};

export const BT_INTERVIEW_TIPS = [
  "Be ready to explain why you want to work with children.",
  "Share examples of patience, reliability, and teamwork.",
  "Show that you can accept coaching.",
  "Be honest if you are new to ABA.",
  "Ask about training, supervision, scheduling, and growth.",
  "Speak respectfully about families and children.",
  "Show interest in learning data collection and session structure.",
];

export const BT_INTERVIEW_PREP_CARDS = [
  { title: "Show reliability", description: "Share examples of showing up on time and following through on commitments." },
  { title: "Explain why helping children matters to you", description: "Connect your motivation to compassion, consistency, and learning." },
  { title: "Share examples of patience", description: "Describe staying calm and supportive during challenging moments." },
  { title: "Be honest about being new to ABA", description: "Interviewers value coachability and honesty over pretending to know everything." },
  { title: "Show that you can receive feedback", description: "Explain how you improve after coaching or constructive input." },
  { title: "Ask about training and supervision", description: "Questions about support show you take growth seriously." },
  { title: "Speak professionally about families", description: "Use respectful language about caregivers and confidentiality." },
  { title: "Show interest in growth toward RBT", description: "Express interest in long-term pathway planning where appropriate." },
];

export const BT_FAQ_ITEMS: CareerFaqItem[] = [
  {
    question: "Do I need ABA experience to apply?",
    answer:
      "Many BT openings are entry-level friendly. Prior childcare, education, healthcare, or support experience may be helpful, but ABA experience is not always required. Review current openings for specific expectations.",
  },
  {
    question: "Do I need to already be an RBT?",
    answer:
      "BT roles typically do not require an RBT credential to start. Some team members work toward RBT eligibility over time depending on role requirements, supervision, training, and company needs.",
  },
  {
    question: "What does a Behavior Technician do?",
    answer:
      "BTs support supervised ABA sessions by helping children practice communication, play, social, and daily living goals, collecting data as trained, and communicating professionally with caregivers and supervisors.",
  },
  {
    question: "Who supervises BTs?",
    answer:
      "BTs work under the direction of qualified clinical supervisors, including BCBAs and other Eden clinical leadership, with structured feedback and training touchpoints.",
  },
  {
    question: "What settings do BTs work in?",
    answer:
      "BTs may support children and families in home-based, community-based, and other natural learning environments across Annandale and Northern Virginia.",
  },
  {
    question: "Is training provided?",
    answer:
      "Eden provides role-aligned onboarding, supervision, and practical coaching. Training scope and timing may vary by role, schedule, and service setting.",
  },
  {
    question: "Can BTs grow into RBT roles?",
    answer:
      "Many BTs pursue RBT credentialing and advancement over time. Progression depends on training, supervision, credential eligibility, and organizational needs—not guaranteed timelines.",
  },
  {
    question: "What skills help someone succeed?",
    answer:
      "Reliability, patience, coachability, calm communication, session preparation, and respectful family engagement are especially important for entry-level direct care.",
  },
  {
    question: "Are schedules full-time or part-time?",
    answer:
      "Schedule structures vary by role, caseload, and family availability. Some positions may include after-school or early evening hours. Details are shared during recruiting.",
  },
  {
    question: "How do I apply?",
    answer:
      "Search current BT and related direct-care openings on our Open Roles page, or join the Talent Network to be contacted when a matching opportunity becomes available.",
  },
];

export const BT_SAMPLE_INTERVIEW_QUESTIONS: CareerFaqItem[] = [
  {
    question: "Why do you want to become a Behavior Technician?",
    answer: "Focus on helping children, willingness to learn, and interest in supervised autism care—not salary promises.",
  },
  {
    question: "What experience do you have working with children?",
    answer: "Share childcare, education, camp, healthcare, or family support examples—even informal experience counts.",
  },
  {
    question: "Tell us about a time you stayed calm under pressure.",
    answer: "Describe patience, safety awareness, and professional communication during a challenging moment.",
  },
  {
    question: "How do you handle feedback?",
    answer: "Give a brief example of listening, adjusting, and improving after coaching.",
  },
  {
    question: "What does reliability mean to you?",
    answer: "Discuss punctuality, follow-through, session preparation, and consistent attendance.",
  },
  {
    question: "How would you communicate professionally with a caregiver?",
    answer: "Emphasize respect, clarity, confidentiality, and alignment with supervisor direction.",
  },
  {
    question: "How do you stay organized?",
    answer: "Mention session materials, data sheets, scheduling habits, and readiness before visits.",
  },
  {
    question: "What interests you about autism care?",
    answer: "Share genuine motivation for family-centered support and learning under supervision.",
  },
];

export const BT_DAY_TIMELINE = [
  { step: "Review session plan", detail: "Confirm goals and materials with supervisor direction before the visit." },
  { step: "Prepare materials", detail: "Set up reinforcers, visuals, and data sheets before the session begins." },
  { step: "Greet family and child professionally", detail: "Arrive on time and start the session with a calm, respectful tone." },
  { step: "Support play-based or structured activities", detail: "Help the child practice goals through engaging, age-appropriate activities." },
  { step: "Follow supervisor direction", detail: "Implement activities with fidelity and ask questions when needed." },
  { step: "Collect data as trained", detail: "Record observations accurately throughout the session." },
  { step: "Encourage communication and independence", detail: "Use natural opportunities to support individualized goals." },
  { step: "Communicate updates appropriately", detail: "Share concise, professional updates with caregivers when directed." },
  { step: "Complete notes or documentation", detail: "Finish required records promptly after the session." },
  { step: "Receive feedback and improve", detail: "Use supervision to strengthen skills and session consistency." },
];

export const BT_SUPPORT_CARDS = [
  { title: "Onboarding support", description: "Structured orientation to Eden expectations, safety, and session basics." },
  { title: "Supervisor coaching", description: "Regular direction and feedback from qualified clinical supervisors." },
  { title: "Practical feedback", description: "Observation-based coaching focused on growth, not perfection." },
  { title: "Session preparation guidance", description: "Help setting up materials and environments before each visit." },
  { title: "Data collection training", description: "Step-by-step support for accurate, timely session documentation." },
  { title: "Family communication expectations", description: "Guidance on respectful caregiver updates and boundaries." },
  { title: "RBT pathway awareness", description: "Educational planning for credential progression where role-appropriate." },
  { title: "Career growth support", description: "Pathway conversations toward RBT and long-term clinical roles." },
];

export const BT_SUPPORT_DISCLAIMER =
  "Training, schedules, supervision structures, benefits, and growth opportunities may vary by role, location, employment status, and company needs.";

export const BT_EDUCATIONAL_NOTICE =
  "Educational note: Behavior Technicians support direct ABA services under supervision. BTs may work toward RBT credentialing depending on role requirements, supervision, training, and company needs. This page is informational and does not provide credentialing, legal, billing, or regulatory advice.";

export const BT_PHOTO_GALLERY = [
  {
    src: "/images/aba-day-step-social-play.jpg",
    alt: "Behavior Technician supporting a child during play-based learning",
    caption: "Play-based learning support",
  },
  {
    src: "/images/aba-day-step-skills.jpg",
    alt: "Structured skill-building session with a child at a table",
    caption: "Structured skill-building sessions",
  },
  {
    src: "/images/home-service-parent-training.jpg",
    alt: "Supervisor coaching a technician during a family-centered session",
    caption: "Supervisor coaching and support",
  },
  {
    src: "/images/about-eden-family-centered-care.jpg",
    alt: "Caregiver collaboration in a family-centered care setting",
    caption: "Caregiver collaboration",
  },
  {
    src: "/images/aba-day-step-wrapup.jpg",
    alt: "Session preparation and data collection materials",
    caption: "Session preparation and data collection",
  },
  {
    src: "/images/home-service-in-home-aba.jpg",
    alt: "In-home ABA support in a natural home environment",
    caption: "Home and community-based support",
  },
];
