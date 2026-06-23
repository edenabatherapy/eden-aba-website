export const SCHOOL_BASED_ABA_META = {
  title: "School-Based ABA Therapy | Eden ABA Therapy",
  description:
    "Learn how school-based ABA therapy supports communication, behavior, social skills, classroom success, IEP goals, and student independence through evidence-based interventions.",
  keywords: [
    "school-based ABA therapy",
    "classroom ABA support",
    "IEP collaboration",
    "school behavior support",
    "autism school services",
    "BCBA school consultation",
  ],
} as const;

export const SCHOOL_HERO = {
  title: "School-Based ABA Therapy",
  subtitle:
    "Supporting student success through evidence-based behavioral, communication, social, and academic interventions in educational environments.",
  imageAlt: "Educator and student collaborating in a supportive classroom learning environment",
} as const;

export const WHAT_IS_SCHOOL_ABA = {
  title: "What Is School-Based ABA Therapy?",
  intro:
    "School-based ABA therapy brings applied behavior analysis into educational settings to help students participate, learn, communicate, and regulate behavior in real classrooms—not only in clinics or at home.",
  cards: [
    {
      title: "ABA in educational settings",
      text: "Therapists and BCBAs support goals that matter at school: following routines, engaging in instruction, communicating needs, and participating with peers.",
    },
    {
      title: "Educational success focus",
      text: "Interventions align with classroom demands such as transitions, group work, independent tasks, and safe behavior during instruction.",
    },
    {
      title: "Teacher & school team collaboration",
      text: "With family consent, Eden coordinates with teachers, special educators, and related service providers to align strategies across the school day.",
    },
    {
      title: "IEP goal integration",
      text: "School-based ABA can support IEP objectives related to communication, behavior, social participation, and adaptive skills when clinically appropriate.",
    },
    {
      title: "Classroom generalization",
      text: "Skills are practiced where they are needed—cafeteria, playground, specials, and general education or specialized classrooms.",
    },
    {
      title: "Data-driven adjustments",
      text: "Progress is tracked in school contexts so teams can refine supports based on what works in live learning environments.",
    },
  ],
} as const;

export const WHO_BENEFITS = {
  title: "Who Benefits?",
  intro: "School-based ABA may help students who need targeted support in one or more of these areas. Click a card to learn more.",
  items: [
    {
      id: "communication",
      title: "Communication",
      summary: "Functional communication in classroom settings.",
      detail:
        "Supports requesting help, answering questions, using AAC, commenting, and reducing frustration related to communication barriers during instruction.",
    },
    {
      id: "social",
      title: "Social skills",
      summary: "Peer interaction and group participation.",
      detail:
        "Teaches turn-taking, greetings, shared play, conversation starters, and appropriate ways to join group activities with classmates.",
    },
    {
      id: "participation",
      title: "Classroom participation",
      summary: "Engaging in lessons and school routines.",
      detail:
        "Helps students attend to instruction, respond to teachers, complete seatwork, and participate in group learning activities.",
    },
    {
      id: "transitions",
      title: "Transition skills",
      summary: "Moving between activities and locations.",
      detail:
        "Supports hallway transitions, line-up routines, changes in schedule, and shifting from preferred to non-preferred tasks.",
    },
    {
      id: "regulation",
      title: "Self-regulation",
      summary: "Coping and calming strategies at school.",
      detail:
        "Teaches break requests, calming routines, sensory strategies, and replacement behaviors for dysregulation in busy environments.",
    },
    {
      id: "attention",
      title: "Attention and focus",
      summary: "Sustaining engagement during tasks.",
      detail:
        "Builds learning-to-learn skills such as sitting for short periods, following multi-step directions, and staying on task with appropriate supports.",
    },
    {
      id: "adaptive",
      title: "Adaptive skills",
      summary: "Daily school living skills.",
      detail:
        "Supports lunch routines, hygiene, dressing for outdoors, organizing materials, and other functional independence at school.",
    },
    {
      id: "behavior",
      title: "Functional behavior needs",
      summary: "Safer, more effective behavior patterns.",
      detail:
        "Uses positive behavior support and function-based planning to reduce unsafe or interfering behavior while teaching replacement skills.",
    },
    {
      id: "readiness",
      title: "School readiness",
      summary: "Foundational skills for learning environments.",
      detail:
        "Focuses on imitation, matching, waiting, group responding, and other prerequisites for classroom success.",
    },
    {
      id: "executive",
      title: "Executive functioning",
      summary: "Planning, organization, and flexibility.",
      detail:
        "Supports task initiation, sequencing steps, using visual schedules, and adapting when plans change during the school day.",
    },
  ],
} as const;

export const SCHOOL_ABA_TIMELINE = {
  title: "How School ABA Works",
  intro: "A collaborative process that connects families, schools, and Eden's clinical team from referral through ongoing review.",
  steps: [
    { title: "Referral", text: "A family, school, or physician identifies a need for school-based behavioral or communication support." },
    { title: "Records review", text: "The team reviews IEP documents, evaluations, behavior plans, and relevant educational records." },
    { title: "School collaboration", text: "Eden coordinates with administrators and school staff to understand settings, schedules, and priorities." },
    { title: "Assessment", text: "BCBAs observe the student in classroom and non-classroom contexts to identify strengths and support needs." },
    { title: "Goal development", text: "Measurable goals are written to support educational participation, communication, behavior, and independence." },
    { title: "Intervention planning", text: "Strategies, prompting plans, reinforcement systems, and data methods are defined for school implementation." },
    { title: "Data collection", text: "RBTs and team members collect session data on skill acquisition and behavior patterns during the school day." },
    { title: "Progress monitoring", text: "Data trends are reviewed to determine whether supports are effective in live classroom environments." },
    { title: "Team collaboration", text: "BCBAs meet with teachers and families to adjust strategies and align across home and school." },
    { title: "Ongoing review", text: "Goals, intensity, and placement are revisited as the student's needs and educational program evolve." },
  ],
} as const;

export const SERVICES_IN_SCHOOL = {
  title: "Services Provided in School Settings",
  intro: "School-based ABA at Eden is designed to support meaningful participation—not isolated drill work disconnected from the classroom.",
  categories: [
    {
      title: "Behavior Support",
      items: ["Functional behavior support", "Positive behavior strategies", "Behavior reduction planning"],
    },
    {
      title: "Communication Development",
      items: ["Functional communication", "AAC support", "Social communication"],
    },
    {
      title: "Social Skills",
      items: ["Peer interactions", "Group participation", "Friendship development"],
    },
    {
      title: "Academic Support",
      items: ["Task completion", "Following directions", "Classroom routines"],
    },
    {
      title: "Transition Support",
      items: ["Classroom transitions", "Schedule changes", "New environments"],
    },
    {
      title: "Independence Skills",
      items: ["Self-management", "Organization", "Daily routines"],
    },
  ],
} as const;

export const IEP_TABS = [
  {
    id: "iep-support",
    label: "IEP Support",
    title: "Understanding and supporting IEP goals",
    body: "Eden helps families understand how ABA strategies can align with IEP objectives related to communication, behavior, social skills, and adaptive functioning—without replacing the school's IEP process.",
    bullets: ["Goal alignment with educational priorities", "Functional skill targets", "Documentation for team meetings"],
  },
  {
    id: "teacher-collab",
    label: "Teacher Collaboration",
    title: "Partnering with classroom teams",
    body: "BCBAs and RBTs coordinate with teachers to implement practical strategies that fit classroom routines, group instruction, and individual student needs.",
    bullets: ["Classroom-friendly interventions", "Shared language and prompts", "Coaching on reinforcement systems"],
  },
  {
    id: "parent-partnership",
    label: "Parent Partnership",
    title: "Keeping families informed and involved",
    body: "Parents receive updates, participate in planning, and learn how to reinforce school skills at home for better generalization.",
    bullets: ["Regular progress communication", "Parent coaching opportunities", "Home-school strategy alignment"],
  },
  {
    id: "progress-monitoring",
    label: "Progress Monitoring",
    title: "Data-driven educational support",
    body: "Objective data helps teams see whether interventions are working in school and when goals or strategies need adjustment.",
    bullets: ["Session and observation data", "Goal mastery criteria", "Team review meetings"],
  },
] as const;

export const MTSS_TIERS = {
  title: "Multi-Tiered Support Systems",
  intro: "School-based supports often align with tiered models used in education—from universal strategies to intensive individualized intervention.",
  tiers: [
    {
      tier: "Tier 1",
      title: "Universal Supports",
      text: "Classroom-wide expectations, visual schedules, predictable routines, and positive reinforcement systems that benefit all learners.",
    },
    {
      tier: "Tier 2",
      title: "Targeted Supports",
      text: "Small-group skill practice, check-in systems, social skills groups, and targeted prompting for students needing more structure.",
    },
    {
      tier: "Tier 3",
      title: "Intensive Supports",
      text: "Individualized ABA intervention, behavior support plans, 1:1 skill teaching, and BCBA-led programming for students with significant needs.",
    },
  ],
} as const;

export const SCHOOL_TEAM = {
  title: "School Team Collaboration",
  intro: "Meaningful school-based ABA connects the people who support a student every day.",
  roles: [
    { role: "BCBA", text: "Assessment, supervision, treatment planning, and team training." },
    { role: "RBT", text: "Direct implementation, data collection, and skill practice in school settings." },
    { role: "Teachers", text: "Classroom instruction, routines, and daily implementation of strategies." },
    { role: "Special Educators", text: "IEP services, specialized instruction, and coordinated supports." },
    { role: "Speech Therapists", text: "Communication goals and AAC collaboration when appropriate." },
    { role: "Occupational Therapists", text: "Sensory, fine motor, and daily living skill coordination." },
    { role: "School Psychologists", text: "Evaluation input, behavior consultation, and team planning." },
    { role: "Parents/Caregivers", text: "Consent, priorities, home-school consistency, and progress partnership." },
  ],
} as const;

export const DATA_TRACKING = {
  title: "Data Collection & Progress Tracking",
  intro: "School-based ABA relies on objective measurement so teams can see what is working in real educational contexts.",
  examples: [
    { title: "Behavior tracking", text: "Frequency, duration, or interval data on target behaviors during instruction and transitions.", value: 78 },
    { title: "Goal measurement", text: "Percent correct, trials to mastery, and independence levels on IEP-aligned skills.", value: 85 },
    { title: "Skill acquisition", text: "Step-by-step data on communication, social, and adaptive goals taught in classroom routines.", value: 72 },
    { title: "Classroom observations", text: "Structured observation notes across settings such as cafeteria, playground, and specials.", value: 90 },
    { title: "Progress reports", text: "Family-friendly summaries connecting data trends to next steps and team recommendations.", value: 88 },
  ],
} as const;

export const FAMILY_PARTNERSHIP = {
  title: "Family Partnership",
  intro: "Students make the strongest gains when families and schools use consistent strategies across settings.",
  points: [
    { title: "Home-school consistency", text: "Shared prompts, reinforcement, and routines help skills transfer between home and school." },
    { title: "Parent communication", text: "Regular updates keep caregivers informed about progress, challenges, and team recommendations." },
    { title: "Generalization of skills", text: "Families practice school goals during homework, meals, and community outings when appropriate." },
    { title: "Training opportunities", text: "Caregiver coaching helps parents understand school behavior plans and communication strategies." },
    { title: "Progress updates", text: "Data summaries and team meetings support informed decision-making about services and goals." },
  ],
} as const;

export const SCHOOL_ABA_FAQ = [
  {
    question: "What is school-based ABA therapy?",
    answer:
      "School-based ABA therapy applies evidence-based behavioral strategies in educational settings to support communication, behavior, social skills, and classroom participation. Services are coordinated with families and school teams when appropriate releases are in place.",
  },
  {
    question: "How does ABA support IEP goals?",
    answer:
      "When clinically appropriate, ABA strategies can align with IEP objectives related to communication, adaptive behavior, social participation, and independence. Eden collaborates with families to understand IEP priorities and document how ABA supports educational outcomes.",
  },
  {
    question: "Does ABA occur during school hours?",
    answer:
      "Yes. School-based services are typically delivered during the school day in classrooms and other educational settings, depending on the student's plan, school policies, and authorization.",
  },
  {
    question: "How do BCBAs work with teachers?",
    answer:
      "BCBAs observe in classrooms, recommend practical strategies, train staff on implementation, review data, and participate in team meetings with family consent. Collaboration focuses on realistic supports that fit instructional routines.",
  },
  {
    question: "What data is collected?",
    answer:
      "Teams may track skill acquisition, behavior patterns, independence levels, and participation during instruction. Data helps determine whether interventions are effective and when goals should be updated.",
  },
  {
    question: "How are goals selected?",
    answer:
      "Goals are based on assessment, IEP priorities, family input, classroom observation, and the student's communication and behavior profile. Goals should be measurable and meaningful in school contexts.",
  },
  {
    question: "How are parents involved?",
    answer:
      "Parents participate in planning, receive progress updates, and may receive coaching to reinforce school skills at home. Family partnership is essential for generalization across settings.",
  },
  {
    question: "How is progress measured?",
    answer:
      "Progress is measured through ongoing data collection, goal mastery criteria, teacher feedback, and periodic BCBA review. Trends over time—not single sessions—guide treatment updates.",
  },
  {
    question: "Can ABA support social skills?",
    answer:
      "Yes. School-based ABA often targets peer interaction, group participation, joint attention, turn-taking, and friendship skills during recess, lunch, and structured group activities.",
  },
  {
    question: "Can ABA support classroom behavior?",
    answer:
      "Yes. Functional behavior assessment and positive behavior support can help reduce interfering behaviors while teaching safer replacement skills during instruction and transitions.",
  },
  {
    question: "How is school ABA different from clinic ABA?",
    answer:
      "School-based ABA focuses on skills needed in educational environments with direct coordination among teachers and school staff. Clinic or home-based services may emphasize different goals and settings. Many students benefit from a combination when authorized.",
  },
  {
    question: "Can ABA support transition planning?",
    answer:
      "Yes. ABA can support transitions between classrooms, grade levels, schools, and post-secondary planning by teaching flexibility, self-advocacy, organization, and independent routines.",
  },
] as const;

export type SchoolResourceCategory =
  | "School Readiness"
  | "Classroom Success"
  | "Behavior Support"
  | "IEP Resources"
  | "Social Skills"
  | "Communication"
  | "Executive Functioning";

export const SCHOOL_RESOURCE_CATEGORIES = [
  "School Readiness",
  "Classroom Success",
  "Behavior Support",
  "IEP Resources",
  "Social Skills",
  "Communication",
  "Executive Functioning",
] as const;

export const SCHOOL_RESOURCES: Array<{
  id: string;
  title: string;
  category: SchoolResourceCategory;
  summary: string;
  href: string;
}> = [
  { id: "classroom-routines", title: "Classroom Routine Supports", category: "Classroom Success", summary: "Visual schedules and predictable routines for smoother school days.", href: "/aba-therapy/parent-training" },
  { id: "iep-basics", title: "IEP Collaboration Overview", category: "IEP Resources", summary: "How families, schools, and providers align on educational goals.", href: "/autism-evaluation/ide-evaluation" },
  { id: "social-peer", title: "Peer Interaction Strategies", category: "Social Skills", summary: "Supporting turn-taking, greetings, and group play at school.", href: "/aba-therapy/parent-training" },
  { id: "aac-school", title: "AAC in the Classroom", category: "Communication", summary: "Using communication devices and visuals during instruction.", href: "/aba-therapy/what-is-aba-therapy" },
  { id: "behavior-fba", title: "Understanding Behavior Support Plans", category: "Behavior Support", summary: "How function-based planning supports safer classroom behavior.", href: "/aba-therapy/what-is-aba-therapy" },
  { id: "readiness-skills", title: "School Readiness Skills", category: "School Readiness", summary: "Imitation, waiting, and group responding for early learners.", href: "/getting-started" },
  { id: "transitions", title: "Transition Planning at School", category: "Classroom Success", summary: "Strategies for hallway, cafeteria, and schedule changes.", href: "/aba-therapy/parent-training" },
  { id: "exec-function", title: "Organization & Task Initiation", category: "Executive Functioning", summary: "Supports for starting work, sequencing steps, and using checklists.", href: "/getting-started" },
  { id: "screening", title: "Evaluation & Screening Pathway", category: "School Readiness", summary: "When families should explore screening and comprehensive evaluation.", href: "/services/evaluations-diagnosis/screening-evaluation" },
  { id: "parent-training", title: "Parent Training for Home-School Consistency", category: "IEP Resources", summary: "Caregiver coaching to reinforce school goals at home.", href: "/aba-therapy/parent-training" },
];

export const SUCCESS_METRICS = {
  title: "Outcomes We Track",
  intro: "Placeholder metrics illustrate the types of school-based progress Eden monitors with families and educational teams.",
  stats: [
    { value: 87, suffix: "%", label: "Student engagement", description: "Increased participation during structured instruction" },
    { value: 82, suffix: "%", label: "Goal achievement", description: "Skills meeting mastery criteria in school settings" },
    { value: 79, suffix: "%", label: "Classroom participation", description: "Improved group and independent task engagement" },
    { value: 84, suffix: "%", label: "Communication growth", description: "Functional communication during school routines" },
    { value: 81, suffix: "%", label: "Social development", description: "Peer interaction and group skill progress" },
  ],
} as const;

export const SCHOOL_CTA = {
  title: "Help Your Child Thrive at School",
  subtitle:
    "Eden partners with families and educational teams to support meaningful student growth, participation, and independence.",
  primaryLabel: "Request Consultation",
  secondaryLabel: "Contact Eden",
  tertiaryLabel: "Start Intake",
} as const;
