export const SCREENING_EVALUATION_META = {
  title: "Autism Screening & Evaluation | Eden ABA Therapy",
  description:
    "Learn about autism screening, M-CHAT-R, ADOS-2, evaluation steps, early signs of autism, and next steps for ABA therapy with Eden ABA Therapy.",
  keywords: [
    "autism screening",
    "autism evaluation",
    "M-CHAT-R",
    "ADOS-2",
    "early signs of autism",
    "autism diagnosis",
    "developmental evaluation",
  ],
} as const;

export const SCREENING_HERO = {
  title: "Autism Screening & Evaluation",
  subtitle:
    "Understand early signs of autism, complete helpful screening steps, and learn how comprehensive evaluations support diagnosis, treatment planning, and access to services.",
  trustBadge: "Family-centered • Evidence-informed • Clinician-guided",
  imageAlt: "Clinician and parent supporting a young child during a warm developmental moment",
} as const;

export const WHAT_IS_SCREENING = {
  title: "What Is Autism Screening?",
  intro:
    "Autism screening helps families and clinicians identify developmental or autism-related concerns early. Screening tools can highlight patterns that may benefit from follow-up—but screening does not replace a full diagnostic evaluation by a qualified professional.",
  cards: [
    {
      title: "Early communication differences",
      text: "Limited gestures, delayed speech, or difficulty using words to request, comment, or respond may appear in early screening conversations.",
    },
    {
      title: "Social interaction differences",
      text: "Reduced eye contact, limited shared interest, or difficulty joining peer play may be areas families notice first.",
    },
    {
      title: "Repetitive behaviors",
      text: "Repeating words, lining up toys, strong routines, or focused interests can be part of how a child self-regulates and learns.",
    },
    {
      title: "Sensory differences",
      text: "Some children are more sensitive to sounds, textures, or lights; others may seek movement or sensory input.",
    },
    {
      title: "Delayed milestones",
      text: "Missing expected communication, play, or daily living milestones may signal a need for screening or evaluation.",
    },
    {
      title: "Parent concerns",
      text: "If something feels different from expected development, sharing concerns with a pediatrician or evaluator is an important first step.",
    },
  ],
} as const;

export const EARLY_SIGNS = {
  title: "Early Signs Families May Notice",
  intro: "These patterns are common reasons families explore screening or evaluation. Every child is different.",
  signs: [
    "Limited eye contact",
    "Delayed speech or communication",
    "Limited response to name",
    "Repetitive movements",
    "Strong preference for routines",
    "Sensory sensitivities",
    "Difficulty with transitions",
    "Limited pretend play",
    "Challenges with peer interaction",
  ],
  disclaimer:
    "Every child develops differently. These signs do not confirm autism, but they may indicate that a screening or evaluation could be helpful.",
} as const;

export const MCHAT_SECTION = {
  title: "M-CHAT-R Online Screener",
  intro:
    "The Modified Checklist for Autism in Toddlers, Revised (M-CHAT-R) is a screening tool commonly used for toddlers. It is designed for children around 16–30 months and helps identify whether a child may benefit from further evaluation. It is not a diagnosis—a clinician should review concerns and next steps with your family.",
  points: [
    "M-CHAT-R is a screening tool commonly used for toddlers.",
    "It is designed for children around 16–30 months.",
    "It helps identify whether a child may benefit from further evaluation.",
    "It is not a diagnosis.",
    "A clinician should review concerns and next steps.",
  ],
  featureCards: [
    {
      title: "Quick parent questionnaire",
      text: "Most families complete 20 yes/no questions in under five minutes from home.",
    },
    {
      title: "Helps identify possible autism risk",
      text: "The screener highlights social, communication, and play patterns that may need follow-up.",
    },
    {
      title: "Supports early next steps",
      text: "Results can guide whether monitoring, pediatric follow-up, or evaluation may be helpful.",
    },
    {
      title: "Best used with professional guidance",
      text: "Share results with your pediatrician or Eden's team to plan appropriate next steps.",
    },
  ],
  ctaLabel: "Complete Screening and Discuss Next Steps",
  ctaHref: "/m-chat-r",
  disclaimer:
    "M-CHAT-R results are informational and should not be treated as a diagnosis.",
} as const;

export const AUTISM_SCREENING_TOOLS = {
  title: "Autism Screening Tools",
  intro:
    "Eden offers parent-friendly online screeners to help families take an early step. Choose the tool that best matches your child's age.",
  disclaimer:
    "Screening tools do not diagnose autism. Results should be discussed with qualified professionals.",
  tools: [
    {
      id: "mchat-r",
      title: "M-CHAT-R/F",
      badge: "Toddlers • 16–30 months",
      href: "/m-chat-r",
      buttonLabel: "Take M-CHAT-R",
      gradient: "from-emerald-50 via-white to-teal-50",
      accent: "text-emerald-700",
      badgeClass: "bg-emerald-100 text-emerald-800",
      features: [
        "For children approximately 16–30 months",
        "Parent questionnaire",
        "Early autism screening tool",
        "Not a diagnosis",
      ],
    },
    {
      id: "cast",
      title: "CAST (Childhood Autism Spectrum Test)",
      badge: "School-age • Ages 4–11",
      href: "/cast",
      buttonLabel: "Take CAST",
      gradient: "from-amber-50 via-white to-emerald-50",
      accent: "text-teal-700",
      badgeClass: "bg-amber-100 text-amber-900",
      features: [
        "For older children",
        "Parent questionnaire",
        "Helps identify possible autism-related concerns",
        "Not a diagnosis",
      ],
    },
  ],
} as const;

export const EVALUATION_PROCESS = {
  title: "Comprehensive Autism Evaluation Process",
  intro:
    "A comprehensive evaluation brings together screening, history, observation, and clinical judgment to support diagnosis, recommendations, and treatment planning.",
  steps: [
    {
      title: "Parent concern or referral",
      text: "Families, pediatricians, or schools raise concerns about communication, behavior, or development.",
    },
    {
      title: "Initial screening",
      text: "Parent questionnaires or screening tools help identify whether further evaluation may be helpful.",
    },
    {
      title: "Intake and developmental history",
      text: "Clinicians review milestones, medical history, family priorities, and prior records.",
    },
    {
      title: "Observation and clinical assessment",
      text: "Direct observation of communication, play, social interaction, and daily living skills.",
    },
    {
      title: "Standardized tools when appropriate",
      text: "Tools such as ADOS-2 may be used as part of a broader evaluation—not as the only factor.",
    },
    {
      title: "Clinical recommendations",
      text: "Findings are interpreted alongside history, parent input, and developmental context.",
    },
    {
      title: "ABA therapy planning or referral support",
      text: "Families receive guidance on therapy options, school supports, and community resources.",
    },
    {
      title: "Insurance or Medicaid authorization support",
      text: "Eden can help families understand documentation needs for coverage and authorization.",
    },
  ],
} as const;

export const ADOS2_SECTION = {
  title: "ADOS-2 Assessment",
  intro:
    "The Autism Diagnostic Observation Schedule, Second Edition (ADOS-2) is a structured observational assessment used as part of autism evaluations. It may help clinicians observe communication, social interaction, play, and restricted or repetitive behaviors. It should be administered by trained professionals and is one part of a broader diagnostic process—not the only factor.",
  points: [
    "ADOS-2 is a structured observational assessment used as part of autism evaluations.",
    "It may help clinicians observe communication, social interaction, play, and restricted or repetitive behaviors.",
    "It should be administered by trained professionals.",
    "It is one part of a broader diagnostic process, not the only factor.",
  ],
  cards: [
    {
      title: "Structured observation",
      text: "Play-based activities are tailored to the child's age, language level, and developmental stage.",
    },
    {
      title: "Social communication",
      text: "Clinicians observe eye contact, gestures, shared enjoyment, and back-and-forth interaction.",
    },
    {
      title: "Play and interaction",
      text: "How a child uses toys, engages in pretend play, and participates in social activities is observed.",
    },
    {
      title: "Repetitive behaviors",
      text: "Restricted interests, repetitive movements, or strong routines may be noted when clinically relevant.",
    },
    {
      title: "Clinical interpretation",
      text: "Scores are reviewed alongside developmental history, parent concerns, and other evaluation data.",
    },
    {
      title: "Family discussion",
      text: "Results are explained in family-friendly language with clear next-step guidance.",
    },
  ],
  ctaLabel: "Learn What to Expect During Evaluation",
  ctaHref: "/intake",
} as const;

export const AFTER_EVALUATION = {
  title: "What Happens After Evaluation?",
  intro: "After an evaluation, families should receive clear information and practical guidance—not confusion about what comes next.",
  cards: [
    { title: "Results review", text: "Clinicians explain findings in understandable terms and answer family questions." },
    { title: "Recommendations", text: "Suggested supports may include therapy, school services, or additional assessments." },
    { title: "ABA therapy planning", text: "If ABA is appropriate, Eden can help with intake, assessment, and treatment planning." },
    { title: "Parent guidance", text: "Families receive strategies and resources to support daily routines and communication." },
    { title: "School support suggestions", text: "Evaluation results may inform IEP conversations and classroom accommodations when appropriate." },
    { title: "Insurance or Medicaid documentation", text: "Reports and records needed for authorization or benefits review are discussed." },
    { title: "Treatment goals", text: "Initial goals focus on communication, safety, independence, and family priorities." },
    { title: "Next steps with Eden", text: "Our team helps connect screening, evaluation, and ABA services when clinically appropriate." },
  ],
} as const;

export const DOCUMENTS_CHECKLIST = {
  title: "Helpful Documents to Prepare",
  intro: "Gathering records before an evaluation or intake call can save time and help clinicians understand your child's full picture.",
  items: [
    "Child's diagnosis or referral notes if available",
    "Pediatrician notes",
    "Insurance card",
    "Medicaid information if applicable",
    "Previous evaluations",
    "IEP or school documents",
    "Speech/OT/PT reports",
    "Parent concerns and questions",
    "Developmental history",
  ],
} as const;

export const SCREENING_VS_EVALUATION = {
  title: "Screening vs Evaluation",
  intro: "Understanding the difference helps families know what to expect at each stage.",
  screening: {
    label: "Screening",
    items: [
      "Shorter process",
      "Identifies possible concerns",
      "May use parent questionnaires",
      "Does not diagnose",
      "Helps decide next steps",
    ],
  },
  evaluation: {
    label: "Evaluation",
    items: [
      "More comprehensive",
      "May include observation and testing",
      "Reviews developmental history",
      "Can support diagnosis and recommendations",
      "Helps guide treatment planning",
    ],
  },
} as const;

export const SCREENING_EVALUATION_FAQ = [
  {
    question: "Is a screening the same as a diagnosis?",
    answer:
      "No. Screening tools identify possible concerns and help families decide whether further evaluation may be helpful. Only a qualified clinician can diagnose autism after a comprehensive evaluation.",
  },
  {
    question: "What age is M-CHAT-R for?",
    answer:
      "The M-CHAT-R is designed for toddlers around 16–30 months. If your child is older, other screeners such as CAST may be more appropriate.",
  },
  {
    question: "Does M-CHAT-R diagnose autism?",
    answer:
      "No. M-CHAT-R is a screening tool only. Results should be reviewed with a pediatrician or qualified clinician who can recommend next steps.",
  },
  {
    question: "What is ADOS-2?",
    answer:
      "ADOS-2 is a structured, play-based observational assessment used as part of autism evaluations. Trained clinicians observe communication, social interaction, play, and behavior patterns.",
  },
  {
    question: "Does every child need ADOS-2?",
    answer:
      "Not necessarily. Whether ADOS-2 is recommended depends on the child's age, concerns, prior evaluations, and the evaluator's clinical judgment as part of a broader assessment.",
  },
  {
    question: "Who can diagnose autism?",
    answer:
      "Autism is diagnosed by qualified professionals such as developmental pediatricians, psychologists, psychiatrists, or other licensed clinicians with appropriate training in autism assessment.",
  },
  {
    question: "Can evaluation help with ABA authorization?",
    answer:
      "Yes. A formal diagnosis and evaluation report are often required for insurance or Medicaid authorization of ABA therapy. Eden can help families understand documentation needs.",
  },
  {
    question: "What should I bring to an evaluation?",
    answer:
      "Helpful items include prior evaluation reports, pediatrician notes, insurance cards, IEP or school records, therapy reports, and a list of your main concerns and questions.",
  },
  {
    question: "What happens after my child is evaluated?",
    answer:
      "Families typically receive results review, clinical recommendations, and guidance on therapy, school supports, and next steps. Eden can help connect evaluation findings to ABA planning when appropriate.",
  },
  {
    question: "Can Eden help explain next steps?",
    answer:
      "Yes. Eden ABA Therapy supports families through screening review, evaluation coordination, intake, insurance verification, and ABA therapy planning when clinically appropriate.",
  },
] as const;

export const SCREENING_CTA = {
  title: "Ready to Take the Next Step?",
  subtitle:
    "If you have concerns about your child's development, Eden can help guide your family through screening, evaluation, documentation, and next steps for ABA therapy.",
  primaryLabel: "Start Evaluation",
  secondaryLabel: "Contact Eden",
  tertiaryLabel: "View Getting Started Guide",
} as const;

export const SCREENING_RELATED_LINKS = [
  {
    label: "Getting Started with Eden",
    href: "/getting-started",
    description: "Intake steps, documents, insurance, and scheduling guidance.",
  },
  {
    label: "What Is ABA Therapy?",
    href: "/aba-therapy/what-is-aba-therapy",
    description: "Learn how ABA supports communication, behavior, and daily skills.",
  },
  {
    label: "Parent Training",
    href: "/aba-therapy/parent-training",
    description: "Caregiver coaching and family support beyond therapy sessions.",
  },
  {
    label: "School & IEP Evaluations",
    href: "/autism-evaluation/ide-evaluation",
    description: "School-based evaluations and educational planning support.",
  },
  {
    label: "Start Intake",
    href: "/intake",
    description: "Share your family's information and begin the next step with Eden.",
  },
] as const;
