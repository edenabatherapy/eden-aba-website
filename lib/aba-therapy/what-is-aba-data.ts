export const WHAT_IS_ABA_META = {
  title: "What Is ABA Therapy? | Eden ABA Therapy",
  description:
    "A family-friendly guide to Applied Behavior Analysis (ABA), how it works, who can benefit, and how Eden ABA Therapy supports children with autism through individualized, evidence-based care.",
  keywords: [
    "what is ABA therapy",
    "applied behavior analysis",
    "ABA for autism",
    "how ABA works",
    "ABA therapy benefits",
    "BCBA RBT roles",
  ],
} as const;

export const WHAT_IS_ABA_HERO = {
  title: "What Is ABA Therapy?",
  subtitle:
    "A family-friendly guide to Applied Behavior Analysis, how it works, and how it can support children with autism.",
  imageAlt: "Child and therapist in a warm, play-based ABA therapy session",
} as const;

export const WHAT_IS_ABA_SECTION = {
  title: "What Is ABA Therapy?",
  paragraphs: [
    "Applied Behavior Analysis, often called ABA, is a research-backed therapy that uses the science of learning and behavior to help children build meaningful skills for everyday life. ABA looks at what happens before and after behavior so clinicians can understand why behavior occurs and teach safer, more effective ways to communicate and participate.",
    "At Eden ABA Therapy, goals are individualized and family-centered. A BCBA reviews your child's strengths, needs, communication style, routines, safety concerns, and learning profile before creating a treatment plan.",
    "The purpose is not to change who your child is. The purpose is to teach useful skills, support safety, and help your child communicate needs more successfully.",
  ],
} as const;

export const ABA_BENEFITS = {
  title: "Benefits of ABA Therapy",
  intro:
    "ABA therapy helps children develop functional skills they can use at home, school, and in the community. Families also receive guidance to support progress across daily routines and with different caregivers.",
  cards: [
    {
      title: "Communication skills",
      text: "Develop requesting, answering, following directions, gestures, AAC use, and spoken language when appropriate.",
    },
    {
      title: "School readiness skills",
      text: "Build imitation, matching, waiting, transitions, group routines, attention, and learning-to-learn behaviors.",
    },
    {
      title: "Behavior support",
      text: "Teach safer replacement skills and reduce unsafe patterns such as aggression, elopement, self-injury, or severe tantrums.",
    },
    {
      title: "Social skills",
      text: "Support turn-taking, shared play, greetings, peer interaction, conversation, and relationship-building.",
    },
    {
      title: "Daily living & independence",
      text: "Practice routines such as meals, hygiene, dressing, transitions, and safe participation in family life.",
    },
    {
      title: "Evidence-based teaching",
      text: "Use individualized goals, ongoing data, and compassionate strategies reviewed regularly by a BCBA.",
    },
  ],
} as const;

export const WHO_CAN_BENEFIT = {
  title: "Who Can Benefit from ABA?",
  intro:
    "Families often ask when ABA therapy may be appropriate. A child may benefit when communication, safety, daily routines, school readiness, or social participation are difficult enough to affect everyday life. These signs do not replace a clinical assessment, but they can help parents decide when to ask for guidance.",
  signs: [
    {
      title: "Difficulty communicating needs",
      text: "Your child may become frustrated when they cannot ask for help, request a break, make choices, or tell caregivers what they need.",
    },
    {
      title: "Safety or behavior concerns",
      text: "ABA may help when a child engages in elopement, aggression, self-injury, severe tantrums, or other unsafe patterns that need careful support.",
    },
    {
      title: "Hard transitions and routines",
      text: "Some children need support moving between activities, tolerating waiting, following routines, or coping when plans change.",
    },
    {
      title: "Limited play or social interaction",
      text: "ABA can help build shared attention, imitation, peer play, turn-taking, greetings, and flexible participation with others.",
    },
  ],
  ageNote:
    "ABA goals change as children grow—from early communication and play in toddlers to school participation, independence, and self-advocacy for older children.",
} as const;

export const HOW_ABA_WORKS = {
  title: "How ABA Therapy Works",
  intro:
    "ABA therapy at Eden follows a clear, family-centered process. Each step is designed to understand your child's needs, create meaningful goals, and support progress with ongoing clinical oversight.",
  steps: [
    {
      title: "Intake",
      text: "Families share concerns, contact information, diagnosis status, insurance details, and scheduling preferences so Eden can review eligibility and next steps.",
    },
    {
      title: "Assessment",
      text: "A BCBA learns about your child's strengths, communication, routines, safety needs, and family priorities through interviews and direct observation.",
    },
    {
      title: "Treatment planning",
      text: "Assessment findings guide a personalized plan that explains recommended services, teaching strategies, and how caregivers will be supported.",
    },
    {
      title: "Goal creation",
      text: "Measurable goals are written for skills that matter in real life—communication, routines, safety, social participation, and independence.",
    },
    {
      title: "Therapy sessions",
      text: "RBTs and therapists teach goals through play, structured practice, and natural routines matched to your child's learning style.",
    },
    {
      title: "Parent involvement",
      text: "Caregivers receive coaching to practice strategies at home, build consistency, and help skills generalize beyond therapy sessions.",
    },
    {
      title: "Progress tracking",
      text: "Session data shows whether teaching strategies are working. Skills are considered mastered when they are used consistently in daily life.",
    },
    {
      title: "Ongoing updates from the clinical team",
      text: "The BCBA reviews data, adjusts goals, coordinates with families, and updates the plan as your child's needs change.",
    },
  ],
} as const;

export const ASSESSMENT_AND_PLANNING = {
  title: "Assessment and Treatment Planning",
  intro:
    "Before therapy begins, the BCBA learns about your child's strengths, needs, communication, routines, safety concerns, school history, and family priorities. The assessment becomes the foundation for treatment planning.",
  assessmentSteps: [
    {
      title: "Family interview",
      text: "Parents share concerns, routines, strengths, priorities, safety needs, and goals for home, school, and community.",
    },
    {
      title: "Direct observation",
      text: "The clinician observes communication, play, transitions, learning readiness, and behavior patterns.",
    },
    {
      title: "Skill review",
      text: "The team evaluates communication, adaptive skills, daily routines, social engagement, and independence.",
    },
    {
      title: "Plan development",
      text: "Findings are used to create measurable goals, recommended service intensity, and family guidance.",
    },
  ],
  planIntro:
    "A BCBA uses assessment results, family input, observation, developmental priorities, and data to create a plan that is specific, measurable, and meaningful.",
  planItems: [
    "Family priorities",
    "Current skill levels",
    "Behavior and safety needs",
    "Communication profile",
    "School and home routines",
    "Progress review schedule",
  ],
} as const;

export const BCBA_RBT_ROLES = {
  title: "BCBA and RBT Roles",
  intro:
    "ABA therapy is delivered by a supervised clinical team. Understanding each role helps families know who is supporting their child and how care is coordinated.",
  roles: [
    {
      badge: "BCBA",
      title: "Board Certified Behavior Analyst",
      text: "The BCBA completes assessment, designs the individualized treatment plan, supervises therapy, reviews data, updates goals, supports parent training, and ensures ethical, evidence-based care.",
      highlights: [
        "Conducts assessments and treatment planning",
        "Supervises the therapy team",
        "Reviews progress data and updates goals",
        "Provides caregiver coaching and clinical oversight",
      ],
    },
    {
      badge: "RBT",
      title: "Registered Behavior Technician",
      text: "The RBT implements the treatment plan under BCBA supervision. They work directly with your child during sessions, collect data, practice goals, and communicate updates to the clinical team.",
      highlights: [
        "Delivers one-on-one therapy sessions",
        "Teaches goals through play and structured practice",
        "Collects session data for the BCBA to review",
        "Partners with families to support consistency",
      ],
    },
  ],
} as const;

export const PARENT_INVOLVEMENT_SECTION = {
  title: "Parent Involvement",
  intro:
    "Families play a vital role in every successful ABA program. Parent guidance helps caregivers understand strategies, practice skills during daily routines, and support progress outside therapy sessions.",
  bullets: [
    "Set personalized goals that reflect home, school, and community needs",
    "Learn evidence-based strategies for transitions, safety, communication, and routines",
    "Coordinate care with doctors, schools, speech therapy, occupational therapy, and other providers when appropriate",
    "Build consistency so children can use skills with different people and in different places",
  ],
  linkLabel: "Explore Parent Training & Family Support",
  linkHref: "/aba-therapy/parent-training",
} as const;

export const WHAT_IS_ABA_FAQ = [
  {
    question: "How many hours of ABA therapy will my child need?",
    answer:
      "Recommended hours depend on assessment results, medical necessity, family goals, school schedule, age, safety concerns, and insurance authorization requirements.",
  },
  {
    question: "Can ABA therapy help with communication?",
    answer:
      "Yes. ABA can support functional communication such as requesting help, making choices, asking for breaks, following directions, using AAC, and reducing frustration related to communication difficulties.",
  },
  {
    question: "Can ABA support school readiness?",
    answer:
      "ABA may help children practice waiting, transitions, following instructions, peer interaction, group routines, and learning-to-learn skills that support classroom participation.",
  },
  {
    question: "What does a BCBA do?",
    answer:
      "A BCBA completes assessment, designs the treatment plan, supervises therapy, reviews data, updates goals, and supports parent training.",
  },
  {
    question: "How is progress measured?",
    answer:
      "ABA uses baseline data, session data, goal mastery criteria, and parent feedback. The BCBA reviews trends over time and adjusts the treatment plan when your child needs different support or strategies.",
  },
  {
    question: "What should I bring to the first ABA visit?",
    answer:
      "Helpful documents include diagnosis reports, insurance cards, pediatrician notes, IEP or school records, prior therapy reports, and a list of your biggest family concerns.",
  },
] as const;

export const WHAT_IS_ABA_CTA = {
  title: "Ready to Start ABA Therapy With Eden?",
  subtitle:
    "Connect with our team to learn about intake, assessment, insurance review, and the next steps for your family.",
  primaryLabel: "Start Intake",
  secondaryLabel: "Contact Eden",
} as const;

export const WHAT_IS_ABA_RELATED_LINKS = [
  {
    label: "Parent Training",
    href: "/aba-therapy/parent-training",
    description: "Caregiver coaching, family support, and practical strategies for home.",
  },
  {
    label: "ABA Success Stories",
    href: "/resources/family-stories",
    description: "Read family stories highlighting progress, partnership, and hope.",
  },
  {
    label: "Getting Started with Eden",
    href: "/getting-started",
    description: "Follow a clear path through intake, documents, insurance, and scheduling.",
  },
] as const;
