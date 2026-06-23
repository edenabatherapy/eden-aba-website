import { CAREER_BENEFITS, CAREER_BENEFITS_DISCLAIMER, type CareerBenefit } from "./benefits-data";
import { CAREER_PATH_STEPS, type CareerPathStep } from "./career-path-data";
import { CAREER_FAQ_ITEMS, type CareerFaqItem } from "./faq-data";

export const CAREER_PAGE_SLUGS = {
  WHY_EDEN: "why-eden",
  LIFE_AT_EDEN: "life-at-eden",
  BENEFITS: "benefits",
  CAREER_PATHS: "career-paths",
  BT: "bt",
  RBT: "rbt",
  BCBA: "bcba",
  BCABA: "bcaba",
  CLINICAL_LEADERSHIP: "clinical-leadership",
  PARENT_TRAINING_ROLES: "parent-training-roles",
  TRAINING: "training",
  BCBA_SUPERVISION: "bcba-supervision",
  MENTORSHIP: "mentorship",
  PROFESSIONAL_DEVELOPMENT: "professional-development",
  HIRING_PROCESS: "hiring-process",
  INTERVIEW_GUIDE: "interview-guide",
  RESUME_TIPS: "resume-tips",
  FAQS: "faqs",
  TALENT_NETWORK: "talent-network",
  VIRGINIA_ABA_CAREERS: "virginia-aba-careers",
  COMPLIANCE_CARE_STANDARDS: "compliance-care-standards",
} as const;

export type CareerPageSlug = (typeof CAREER_PAGE_SLUGS)[keyof typeof CAREER_PAGE_SLUGS];

type CareerCard = {
  title: string;
  description: string;
  bullets?: string[];
};

type StoryCard = {
  name: string;
  role: string;
  quote: string;
  pathway: string;
};

type TimelineStep = {
  title: string;
  description: string;
  timeframe?: string;
};

type HiringTimelineStep = {
  stage: string;
  description: string;
  typicalTiming: string;
};

type CtaSection = {
  type: "cta";
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

type CareerPageSection =
  | { type: "prose"; title: string; body: string[] }
  | { type: "timeline"; id?: string; title: string; steps: TimelineStep[] }
  | { type: "list"; id?: string; title: string; items: string[] }
  | { type: "cards"; id?: string; title: string; cards: CareerCard[] }
  | { type: "faq"; title: string; intro?: string; items: CareerFaqItem[] }
  | { type: "benefits"; title: string; intro?: string; items: CareerBenefit[]; disclaimer?: string }
  | { type: "path-timeline"; title: string; intro?: string; steps: CareerPathStep[] }
  | { type: "disclaimer"; title: string; body: string }
  | { type: "story-cards"; title: string; stories: StoryCard[] }
  | { type: "hiring-timeline"; title: string; stages: HiringTimelineStep[] }
  | CtaSection;

export type CareerPageData = {
  slug: CareerPageSlug;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  sections: CareerPageSection[];
};

const BACB_DBHDS_MEDICAID_EDUCATIONAL_DISCLAIMER =
  "Educational notice: references to BACB, DBHDS, and Medicaid standards are provided to support career awareness and quality practice understanding only. This content is not legal advice, credentialing advice, billing advice, or regulatory interpretation.";

const CAREER_PAGES: Record<CareerPageSlug, CareerPageData> = {
  "why-eden": {
    slug: "why-eden",
    meta: {
      title: "Why Eden | Careers",
      description:
        "Learn why clinicians and support professionals choose Eden ABA Therapy in Annandale and Northern Virginia.",
    },
    hero: {
      eyebrow: "Careers at Eden",
      title: "Why professionals choose Eden ABA Therapy",
      subtitle:
        "We combine clinical rigor, family-centered values, and practical career development so team members can grow while delivering meaningful outcomes.",
    },
    sections: [
      {
        type: "prose",
        title: "Mission-aligned work with real support",
        body: [
          "At Eden, we focus on helping children and families build sustainable skills across home, school, and community settings. That mission drives how we hire, train, and lead.",
          "Our Annandale-based team serves Northern Virginia with a model grounded in collaboration, data-informed decisions, and respectful caregiver partnership.",
        ],
      },
      {
        type: "cards",
        title: "What sets Eden apart",
        cards: [
          {
            title: "Family-centered care",
            description: "Caregiver partnership is integrated into treatment planning and progress review.",
          },
          {
            title: "Coaching-first leadership",
            description: "Supervisors provide structured feedback loops and practical skill-building support.",
          },
          {
            title: "Virginia-aware operations",
            description: "Teams are trained on documentation quality and payer-aware workflow expectations.",
          },
          {
            title: "Growth with purpose",
            description: "Career paths are clear from BT and RBT roles through advanced clinical leadership.",
          },
        ],
      },
      {
        type: "cta",
        title: "Explore current opportunities",
        description: "Find the role that matches your stage of growth and long-term goals in ABA.",
        primaryCta: { label: "View Open Roles", href: "/careers/open-roles" },
        secondaryCta: { label: "Review Career Paths", href: "/careers/career-paths" },
      },
    ],
  },
  "life-at-eden": {
    slug: "life-at-eden",
    meta: {
      title: "Life at Eden | Careers",
      description:
        "See how Eden teams collaborate across clinical, operations, and family support functions each day.",
    },
    hero: {
      eyebrow: "Team Culture",
      title: "Life at Eden in Annandale and Northern Virginia",
      subtitle:
        "Our teams value preparation, communication, and family trust. Daily routines are built around child progress and team sustainability.",
    },
    sections: [
      {
        type: "timeline",
        title: "What a typical week includes",
        steps: [
          {
            title: "Clinical alignment",
            description: "Teams review priorities, coordinate schedules, and confirm treatment integrity goals.",
          },
          {
            title: "Direct care and caregiver coaching",
            description: "Technicians and clinicians deliver services while reinforcing practical carryover routines.",
          },
          {
            title: "Data and quality review",
            description: "Supervisors analyze trends, refine plans, and support consistent documentation standards.",
          },
          {
            title: "Professional development",
            description: "Staff join training touchpoints, mentorship sessions, or case consultation blocks.",
          },
        ],
      },
      {
        type: "story-cards",
        title: "Career stories from our team",
        stories: [
          {
            name: "Nadia",
            role: "Lead RBT",
            pathway: "BT -> RBT -> Lead RBT",
            quote:
              "The support I received during onboarding helped me build confidence quickly, and now I mentor new technicians joining our team.",
          },
          {
            name: "James",
            role: "BCBA",
            pathway: "RBT -> BCaBA -> BCBA",
            quote:
              "Eden's mentorship approach helped me strengthen my clinical writing, family coaching, and supervision skills in a way that felt practical.",
          },
          {
            name: "Priya",
            role: "Client Services Coordinator",
            pathway: "Healthcare Admin -> Client Services",
            quote:
              "Collaboration between operations and clinicians makes it easier for families to feel supported from intake through ongoing care.",
          },
        ],
      },
      {
        type: "cta",
        title: "Find your place at Eden",
        description: "Join a team where preparation, empathy, and accountability work together.",
        primaryCta: { label: "Browse Roles", href: "/careers/open-roles" },
        secondaryCta: { label: "Join Talent Network", href: "/careers/talent-network" },
      },
    ],
  },
  benefits: {
    slug: "benefits",
    meta: {
      title: "Benefits | Careers",
      description:
        "Review compensation, development support, scheduling flexibility, and culture benefits at Eden ABA Therapy.",
    },
    hero: {
      eyebrow: "Benefits and Support",
      title: "Benefits designed for long-term careers in ABA",
      subtitle:
        "Eden invests in people through development pathways, coaching support, and operational systems that protect quality care.",
    },
    sections: [
      {
        type: "benefits",
        title: "Core benefits",
        intro:
          "Benefits are structured to support both professional growth and day-to-day sustainability for clinical and support teams.",
        items: CAREER_BENEFITS,
        disclaimer: CAREER_BENEFITS_DISCLAIMER,
      },
      {
        type: "cta",
        title: "Talk with recruiting",
        description: "Ask role-specific questions about eligibility, schedules, and advancement tracks.",
        primaryCta: { label: "Contact Recruiting", href: "mailto:careers@edenabatherapy.com" },
        secondaryCta: { label: "View Open Roles", href: "/careers/open-roles" },
      },
    ],
  },
  "career-paths": {
    slug: "career-paths",
    meta: {
      title: "Career Paths | Careers",
      description:
        "Explore Eden's progression model from Behavior Technician roles through regional clinical leadership.",
    },
    hero: {
      eyebrow: "Career Growth",
      title: "Clinical career pathways from BT to regional leadership",
      subtitle:
        "Our development model supports technical growth, supervision readiness, and increasing leadership responsibility over time.",
    },
    sections: [
      {
        type: "path-timeline",
        title: "Eden pathway framework",
        intro:
          "Progression depends on performance, role availability, credential status, and service needs across Virginia markets.",
        steps: CAREER_PATH_STEPS,
      },
      {
        type: "disclaimer",
        title: "Credential and scope notice",
        body: BACB_DBHDS_MEDICAID_EDUCATIONAL_DISCLAIMER,
      },
      {
        type: "cta",
        title: "Build your personalized path",
        description: "Connect with recruiting to discuss the best entry point based on your current experience.",
        primaryCta: { label: "Start with Open Roles", href: "/careers/open-roles" },
        secondaryCta: { label: "Learn About Training", href: "/careers/training" },
      },
    ],
  },
  bt: {
    slug: "bt",
    meta: {
      title: "Behavior Technician Careers | Eden ABA Therapy",
      description:
        "Start your ABA career in Northern Virginia with structured support and a family-centered approach.",
    },
    hero: {
      eyebrow: "Clinical Entry Roles",
      title: "Behavior Technician (BT) careers",
      subtitle:
        "BT roles at Eden are designed for early-career professionals who want direct coaching, meaningful client impact, and a clear growth pathway.",
    },
    sections: [
      {
        type: "list",
        title: "What you'll focus on",
        items: [
          "Delivering consistent direct support with supervisor guidance",
          "Building trust with caregivers and interdisciplinary partners",
          "Collecting reliable data to inform treatment decisions",
          "Developing readiness for RBT credential expectations",
        ],
      },
      {
        type: "cards",
        title: "BT development supports",
        cards: [
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
        ],
      },
      {
        type: "cta",
        title: "Apply for BT opportunities",
        description: "Explore current openings in Annandale and nearby Northern Virginia communities.",
        primaryCta: { label: "View BT Roles", href: "/careers/open-roles" },
      },
    ],
  },
  rbt: {
    slug: "rbt",
    meta: {
      title: "RBT Careers | Eden ABA Therapy",
      description:
        "Advance your RBT career with supportive supervision, quality expectations, and family partnership.",
    },
    hero: {
      eyebrow: "Clinical Roles",
      title: "Registered Behavior Technician (RBT) careers",
      subtitle:
        "RBTs play a central role in child progress, caregiver confidence, and treatment consistency across natural environments.",
    },
    sections: [
      {
        type: "prose",
        title: "High-impact direct care",
        body: [
          "RBTs implement individualized programs with supervision and coaching designed to strengthen treatment integrity.",
          "At Eden, RBT performance is supported through practical feedback, reliable scheduling coordination, and values-based collaboration.",
        ],
      },
      {
        type: "list",
        title: "What Eden looks for in RBT candidates",
        items: [
          "Reliable communication with families and supervisors",
          "Consistent data quality and session preparation",
          "Professional adaptability across home and community settings",
          "Commitment to ethical, respectful client engagement",
        ],
      },
      {
        type: "cta",
        title: "Continue your growth with Eden",
        description: "Explore opportunities for senior and lead technician pathways.",
        primaryCta: { label: "View RBT Openings", href: "/careers/open-roles" },
        secondaryCta: { label: "See Career Paths", href: "/careers/career-paths" },
      },
    ],
  },
  bcba: {
    slug: "bcba",
    meta: {
      title: "BCBA Careers | Eden ABA Therapy",
      description:
        "Lead high-quality ABA treatment in Northern Virginia with strong caregiver partnership and clinical support.",
    },
    hero: {
      eyebrow: "Clinical Leadership",
      title: "Board Certified Behavior Analyst (BCBA) careers",
      subtitle:
        "BCBAs at Eden guide treatment direction, coach teams, and align programming with family priorities and measurable outcomes.",
    },
    sections: [
      {
        type: "cards",
        title: "BCBA impact areas",
        cards: [
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
        ],
      },
      {
        type: "disclaimer",
        title: "Educational credential notice",
        body: BACB_DBHDS_MEDICAID_EDUCATIONAL_DISCLAIMER,
      },
      {
        type: "cta",
        title: "Explore BCBA and senior BCBA roles",
        description: "Join a clinically focused team committed to high standards and sustainable care.",
        primaryCta: { label: "View BCBA Roles", href: "/careers/open-roles" },
      },
    ],
  },
  bcaba: {
    slug: "bcaba",
    meta: {
      title: "BCaBA Careers | Eden ABA Therapy",
      description:
        "Grow as a BCaBA with mentorship, data-informed practice, and clear progression opportunities.",
    },
    hero: {
      eyebrow: "Mid-Level Clinical Roles",
      title: "Board Certified Assistant Behavior Analyst (BCaBA) careers",
      subtitle:
        "BCaBAs at Eden support treatment execution, documentation quality, and team consistency while developing advanced clinical skills.",
    },
    sections: [
      {
        type: "list",
        title: "BCaBA role priorities",
        items: [
          "Supporting BCBA-led plan implementation and revisions",
          "Coaching direct staff on treatment procedures",
          "Monitoring data trends and helping surface clinical recommendations",
          "Maintaining communication with caregivers and case teams",
        ],
      },
      {
        type: "disclaimer",
        title: "Scope and standards notice",
        body: BACB_DBHDS_MEDICAID_EDUCATIONAL_DISCLAIMER,
      },
      {
        type: "cta",
        title: "Find BCaBA pathway roles",
        description: "Explore opportunities that support long-term progression toward BCBA leadership.",
        primaryCta: { label: "Browse Open Roles", href: "/careers/open-roles" },
      },
    ],
  },
  "clinical-leadership": {
    slug: "clinical-leadership",
    meta: {
      title: "Clinical Leadership Careers | Eden ABA Therapy",
      description:
        "Lead quality systems, supervise teams, and shape service growth across Northern Virginia.",
    },
    hero: {
      eyebrow: "Leadership Pathways",
      title: "Clinical leadership opportunities at Eden",
      subtitle:
        "From Clinical Quality Supervisor to Regional Clinical Director, leadership roles center on quality, mentorship, and scalable care systems.",
    },
    sections: [
      {
        type: "cards",
        title: "Leadership responsibilities",
        cards: [
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
        ],
      },
      {
        type: "timeline",
        title: "Leadership readiness indicators",
        steps: [
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
        ],
      },
      {
        type: "cta",
        title: "Pursue leadership roles",
        description: "Review leadership openings and discuss fit with the recruiting team.",
        primaryCta: { label: "View Leadership Roles", href: "/careers/open-roles" },
        secondaryCta: { label: "Contact Recruiting", href: "mailto:careers@edenabatherapy.com" },
      },
    ],
  },
  "parent-training-roles": {
    slug: "parent-training-roles",
    meta: {
      title: "Parent Training Roles | Eden ABA Therapy",
      description:
        "Support caregivers through practical coaching, communication, and family-centered ABA implementation.",
    },
    hero: {
      eyebrow: "Family Partnership Roles",
      title: "Parent training and caregiver coaching careers",
      subtitle:
        "These roles focus on empowering caregivers with practical routines and confidence-building support that extends child progress beyond sessions.",
    },
    sections: [
      {
        type: "prose",
        title: "Why this role matters",
        body: [
          "Caregiver engagement is one of the strongest predictors of durable skill generalization. Parent training roles help families turn treatment recommendations into daily wins.",
          "At Eden, caregiver coaching is collaborative, respectful, and adapted to each family's priorities, language, and routine demands.",
        ],
      },
      {
        type: "list",
        title: "Core strengths for success",
        items: [
          "Clear, non-judgmental communication with caregivers",
          "Ability to model strategies in real-life contexts",
          "Coordination with BCBAs and direct care teams",
          "Documentation habits that support continuity and accountability",
        ],
      },
      {
        type: "cta",
        title: "Join our parent training team",
        description: "Explore caregiver-focused positions across current and pipeline openings.",
        primaryCta: { label: "View Open Roles", href: "/careers/open-roles" },
      },
    ],
  },
  training: {
    slug: "training",
    meta: {
      title: "Training at Eden | Careers",
      description:
        "Understand Eden's onboarding, competency milestones, and growth-focused training model.",
    },
    hero: {
      eyebrow: "Training and Development",
      title: "Training built for confident, ethical practice",
      subtitle:
        "Our development model combines onboarding structure, case-based coaching, and role-specific competency progression.",
    },
    sections: [
      {
        type: "timeline",
        id: "onboarding",
        title: "Training journey",
        steps: [
          {
            title: "Onboarding",
            description: "Role orientation, expectations, and initial competency checks.",
            timeframe: "Weeks 1-2",
          },
          {
            title: "Guided practice",
            description: "Supervised sessions with regular feedback and skill reinforcement.",
            timeframe: "Weeks 3-8",
          },
          {
            title: "Independent consistency",
            description: "Expanded responsibilities with quality monitoring and mentorship.",
            timeframe: "Months 2-6",
          },
        ],
      },
      {
        type: "cards",
        title: "Training pillars",
        cards: [
          {
            title: "Clinical quality",
            description: "Data accuracy, treatment integrity, and measurable child progress.",
          },
          {
            title: "Family communication",
            description: "Caregiver coaching grounded in practicality and respect.",
          },
          {
            title: "Professional accountability",
            description: "Documentation standards and ethical decision-making support.",
          },
        ],
      },
      {
        type: "cta",
        title: "Review supervision pathways",
        description: "Explore how training aligns with BCBA fieldwork planning and mentorship.",
        primaryCta: { label: "BCBA Supervision", href: "/careers/bcba-supervision" },
        secondaryCta: { label: "Professional Development", href: "/careers/professional-development" },
      },
    ],
  },
  "bcba-supervision": {
    slug: "bcba-supervision",
    meta: {
      title: "BCBA Supervision Pathways | Careers",
      description:
        "Learn how Eden supports supervised fieldwork through practical coaching and competency planning.",
    },
    hero: {
      eyebrow: "Supervision Pathways",
      title: "BCBA supervision and fieldwork support",
      subtitle:
        "Eden provides structured supervision touchpoints that connect day-to-day care responsibilities with long-term analyst development.",
    },
    sections: [
      {
        type: "list",
        id: "fieldwork",
        title: "What supervision planning includes",
        items: [
          "Role-aligned competency goals and feedback cycles",
          "Case-based discussion to strengthen decision quality",
          "Documentation habits that support consistency and accountability",
          "Mentorship on caregiver coaching and interdisciplinary communication",
        ],
      },
      {
        type: "disclaimer",
        title: "Important educational note",
        body: BACB_DBHDS_MEDICAID_EDUCATIONAL_DISCLAIMER,
      },
      {
        type: "cta",
        title: "Explore roles with supervision support",
        description: "Find positions that align with your current credential stage and growth goals.",
        primaryCta: { label: "Browse Open Roles", href: "/careers/open-roles" },
      },
    ],
  },
  mentorship: {
    slug: "mentorship",
    meta: {
      title: "Mentorship at Eden | Careers",
      description:
        "See how Eden mentorship supports technicians, clinicians, and future leaders.",
    },
    hero: {
      eyebrow: "Mentorship Culture",
      title: "Mentorship that turns feedback into growth",
      subtitle:
        "Mentorship at Eden is practical and role-specific, helping team members build confidence through consistent coaching relationships.",
    },
    sections: [
      {
        type: "cards",
        title: "Mentorship tracks",
        cards: [
          {
            title: "Technician mentorship",
            description: "Session implementation coaching, communication skills, and consistency routines.",
          },
          {
            title: "Clinical mentorship",
            description: "Treatment planning discussion, case analysis, and supervision development.",
          },
          {
            title: "Leadership mentorship",
            description: "Quality systems, team development, and cross-functional communication.",
          },
        ],
      },
      {
        type: "story-cards",
        title: "Mentorship outcomes",
        stories: [
          {
            name: "Luis",
            role: "Senior RBT",
            pathway: "RBT -> Senior RBT",
            quote:
              "My mentor helped me improve data precision and communication with caregivers, which made my sessions more effective.",
          },
          {
            name: "Aisha",
            role: "Clinical Quality Supervisor",
            pathway: "BCBA -> Senior BCBA -> Quality Supervisor",
            quote:
              "Mentorship at Eden prepared me to coach others while keeping quality and family trust at the center of decisions.",
          },
        ],
      },
      {
        type: "cta",
        title: "Build your mentorship plan",
        description: "Talk with recruiting about how mentorship is structured for your target role.",
        primaryCta: { label: "Contact Recruiting", href: "mailto:careers@edenabatherapy.com" },
      },
    ],
  },
  "professional-development": {
    slug: "professional-development",
    meta: {
      title: "Professional Development | Careers",
      description:
        "Plan continuing growth in ABA with Eden's competency, mentorship, and leadership development pathways.",
    },
    hero: {
      eyebrow: "Growth Planning",
      title: "Professional development for every career stage",
      subtitle:
        "Development planning at Eden links role expectations, coaching support, and future advancement opportunities.",
    },
    sections: [
      {
        type: "prose",
        title: "How growth plans are built",
        body: [
          "Leaders and team members align on role expectations, measurable performance goals, and practical next-step development priorities.",
          "Plans are revisited regularly to support sustainable progression and maintain care quality during growth transitions.",
        ],
      },
      {
        type: "list",
        title: "Development focus areas",
        items: [
          "Clinical writing and documentation integrity",
          "Family communication and coaching effectiveness",
          "Data interpretation and treatment decision quality",
          "Leadership readiness and team support skills",
        ],
      },
      {
        type: "cta",
        title: "Plan your next step",
        description: "Use Eden's pathways to map from your current role to your next growth target.",
        primaryCta: { label: "View Career Paths", href: "/careers/career-paths" },
        secondaryCta: { label: "Browse Open Roles", href: "/careers/open-roles" },
      },
    ],
  },
  "hiring-process": {
    slug: "hiring-process",
    meta: {
      title: "Hiring Process | Careers",
      description:
        "Understand Eden's step-by-step hiring process for clinical and support roles in Virginia.",
    },
    hero: {
      eyebrow: "Hiring Journey",
      title: "Our hiring process, clearly outlined",
      subtitle:
        "We aim for a respectful, efficient process that helps candidates evaluate fit and helps families gain consistent, prepared support.",
    },
    sections: [
      {
        type: "hiring-timeline",
        title: "Hiring stages",
        stages: [
          {
            stage: "Application review",
            description: "Recruiting reviews role alignment, credential status, and service-area fit.",
            typicalTiming: "2-5 business days",
          },
          {
            stage: "Recruiter conversation",
            description: "Discuss role expectations, schedule needs, and growth interests.",
            typicalTiming: "Week 1",
          },
          {
            stage: "Interview rounds",
            description: "Meet clinical or operational leaders for values and competency alignment.",
            typicalTiming: "Week 1-2",
          },
          {
            stage: "Final review and offer",
            description: "Complete references, credential checks as needed, and final decision steps.",
            typicalTiming: "Week 2-3",
          },
          {
            stage: "Onboarding readiness",
            description: "Prepare training timeline, documentation tasks, and first schedule milestones.",
            typicalTiming: "Post-offer",
          },
        ],
      },
      {
        type: "cta",
        title: "Start your application",
        description: "Apply to active roles or join the talent network for upcoming opportunities.",
        primaryCta: { label: "View Open Roles", href: "/careers/open-roles" },
        secondaryCta: { label: "Join Talent Network", href: "/careers/talent-network" },
      },
    ],
  },
  "interview-guide": {
    slug: "interview-guide",
    meta: {
      title: "Interview Guide | Careers",
      description:
        "Prepare for Eden ABA Therapy interviews with practical guidance for clinical and support roles.",
    },
    hero: {
      eyebrow: "Candidate Preparation",
      title: "Interview guide for Eden candidates",
      subtitle:
        "Our interviews focus on communication, ethical judgment, family partnership, and role-specific readiness.",
    },
    sections: [
      {
        type: "cards",
        title: "How to prepare effectively",
        cards: [
          {
            title: "Review your impact examples",
            description: "Prepare brief stories showing how you supported progress, quality, or team collaboration.",
          },
          {
            title: "Practice family-centered communication",
            description: "Show how you explain complex topics with clarity and respect for caregiver priorities.",
          },
          {
            title: "Highlight documentation habits",
            description: "Be ready to discuss how you maintain quality and consistency in record-keeping.",
          },
        ],
      },
      {
        type: "list",
        title: "Interview themes you may encounter",
        items: [
          "Responding to changes in client behavior while maintaining treatment integrity",
          "Balancing caregiver partnership with role boundaries",
          "Working across clinical and operations teams",
          "Managing reliability, punctuality, and communication expectations",
        ],
      },
      {
        type: "cta",
        title: "Find role-specific requirements",
        description: "Use open role listings to tailor your preparation to the position you want.",
        primaryCta: { label: "Review Open Roles", href: "/careers/open-roles" },
      },
    ],
  },
  "resume-tips": {
    slug: "resume-tips",
    meta: {
      title: "Resume Tips | Careers",
      description:
        "Build a stronger ABA resume with practical tips for clinical, caregiver, and operations roles.",
    },
    hero: {
      eyebrow: "Application Support",
      title: "Resume tips for ABA and care support roles",
      subtitle:
        "A strong resume shows role fit, measurable impact, and readiness to work in a family-centered environment.",
    },
    sections: [
      {
        type: "list",
        title: "What to include",
        items: [
          "Role-relevant credentials and credential progress status",
          "Population and setting experience (home, school, clinic, community)",
          "Measurable examples of progress, reliability, or quality outcomes",
          "Caregiver communication and interdisciplinary collaboration examples",
        ],
      },
      {
        type: "cards",
        title: "Common upgrades that help",
        cards: [
          {
            title: "Use impact language",
            description: "Replace task-only bullets with outcomes and context.",
          },
          {
            title: "Clarify schedule flexibility",
            description: "Mention availability windows relevant to direct service delivery.",
          },
          {
            title: "Show growth direction",
            description: "State near-term goals such as supervision or leadership pathways.",
          },
        ],
      },
      {
        type: "cta",
        title: "Ready to apply?",
        description: "Submit your application and let recruiting know which path you are targeting.",
        primaryCta: { label: "Apply to Open Roles", href: "/careers/open-roles" },
      },
    ],
  },
  faqs: {
    slug: "faqs",
    meta: {
      title: "Career FAQs | Eden ABA Therapy",
      description:
        "Read frequently asked questions about Eden careers, credentials, hiring timelines, and growth pathways.",
    },
    hero: {
      eyebrow: "Career Questions",
      title: "Frequently asked questions",
      subtitle:
        "Find practical answers about hiring, role expectations, and development pathways at Eden ABA Therapy.",
    },
    sections: [
      {
        type: "faq",
        title: "Top candidate questions",
        intro: "If your question is not listed, our recruiting team can provide role-specific guidance.",
        items: CAREER_FAQ_ITEMS,
      },
      {
        type: "cta",
        title: "Need additional support?",
        description: "Connect with recruiting for personalized guidance on your best-fit pathway.",
        primaryCta: { label: "Contact Recruiting", href: "mailto:careers@edenabatherapy.com" },
        secondaryCta: { label: "View Open Roles", href: "/careers/open-roles" },
      },
    ],
  },
  "talent-network": {
    slug: "talent-network",
    meta: {
      title: "Talent Network | Careers",
      description:
        "Join the Eden ABA Therapy talent network for future and upcoming Virginia opportunities.",
    },
    hero: {
      eyebrow: "Stay Connected",
      title: "Join the Eden talent network",
      subtitle:
        "Share your interests and availability so we can contact you when matching opportunities open in Annandale, Northern Virginia, or future expansion areas.",
    },
    sections: [
      {
        type: "prose",
        title: "Who should join",
        body: [
          "The talent network is ideal for candidates actively exploring BT, RBT, BCaBA, BCBA, leadership, and operations opportunities.",
          "It is also helpful for professionals planning future credential transitions or relocation within Virginia.",
        ],
      },
      {
        type: "list",
        title: "What to share when you join",
        items: [
          "Preferred roles and credential stage",
          "Current and target Virginia service areas",
          "Schedule availability and start timeline",
          "Short summary of relevant ABA or care coordination experience",
        ],
      },
      {
        type: "cta",
        title: "Submit your interest",
        description: "We will reach out as aligned opportunities become available.",
        primaryCta: { label: "Join Talent Network", href: "/careers/talent-network" },
        secondaryCta: { label: "Contact Recruiting", href: "mailto:careers@edenabatherapy.com" },
      },
    ],
  },
  "virginia-aba-careers": {
    slug: "virginia-aba-careers",
    meta: {
      title: "Virginia ABA Careers | Eden ABA Therapy",
      description:
        "Explore Virginia-focused ABA career context, including family needs, credential pathways, and care quality expectations.",
    },
    hero: {
      eyebrow: "Virginia Career Context",
      title: "Building an ABA career in Virginia",
      subtitle:
        "Virginia's families need clinicians and support professionals who combine technical skill with practical caregiver partnership.",
    },
    sections: [
      {
        type: "cards",
        title: "What matters in Virginia ABA careers",
        cards: [
          {
            title: "Regional service access",
            description: "Clinicians who can support continuity across varied home and community settings are in demand.",
          },
          {
            title: "Family-centered communication",
            description: "Caregiver collaboration and adaptable implementation are core to sustainable outcomes.",
          },
          {
            title: "Quality-focused documentation",
            description: "Consistent records support ethical practice and care coordination across systems.",
          },
        ],
      },
      {
        type: "disclaimer",
        title: "Educational information only",
        body: BACB_DBHDS_MEDICAID_EDUCATIONAL_DISCLAIMER,
      },
      {
        type: "cta",
        title: "Find Virginia-based opportunities",
        description: "Review current and pipeline roles aligned to your credential stage.",
        primaryCta: { label: "View Open Roles", href: "/careers/open-roles" },
      },
    ],
  },
  "compliance-care-standards": {
    slug: "compliance-care-standards",
    meta: {
      title: "Compliance and Care Standards | Careers",
      description:
        "Learn how Eden approaches quality, ethics, and educational compliance awareness in Virginia ABA careers.",
    },
    hero: {
      eyebrow: "Quality and Compliance",
      title: "Compliance-informed, family-centered care standards",
      subtitle:
        "Eden supports teams with educational guidance on clinical quality, ethical practice, and payer-aware documentation expectations.",
    },
    sections: [
      {
        type: "cards",
        id: "dbhds",
        title: "DBHDS-aware care",
        cards: [
          {
            title: "Service quality expectations",
            description: "Teams are trained to align care delivery with high standards for consistency and safety.",
          },
          {
            title: "Documentation integrity",
            description: "Clinical notes and care records should be clear, timely, and aligned to treatment goals.",
          },
        ],
      },
      {
        type: "cards",
        id: "medicaid",
        title: "Medicaid documentation culture",
        cards: [
          {
            title: "Payer-informed workflows",
            description: "Scheduling and authorization coordination help families maintain service continuity.",
          },
          {
            title: "Responsible record keeping",
            description: "Accurate records support communication, quality review, and continuity of care.",
          },
        ],
      },
      {
        type: "cards",
        id: "ethical",
        title: "Ethical ABA practice",
        cards: [
          {
            title: "Client dignity and assent",
            description: "Care plans prioritize respectful engagement and age-appropriate, humane support.",
          },
          {
            title: "Scope and supervision clarity",
            description: "Role boundaries and escalation pathways are reinforced through coaching and policy.",
          },
        ],
      },
      {
        type: "cards",
        id: "family-centered",
        title: "Family-centered care standards",
        cards: [
          {
            title: "Shared decision making",
            description: "Caregivers are treated as partners in goals, routines, and implementation choices.",
          },
          {
            title: "Culturally responsive communication",
            description: "Teams tailor communication style and supports to each family's context.",
          },
        ],
      },
      {
        type: "disclaimer",
        title: "Educational-only disclaimer",
        body: BACB_DBHDS_MEDICAID_EDUCATIONAL_DISCLAIMER,
      },
      {
        type: "cta",
        title: "Apply with confidence",
        description: "Join a team that values quality practice, transparent expectations, and caregiver partnership.",
        primaryCta: { label: "View Open Roles", href: "/careers/open-roles" },
        secondaryCta: { label: "Career FAQs", href: "/careers/faqs" },
      },
    ],
  },
};

export function getCareerPage(slug: string): CareerPageData | undefined {
  return CAREER_PAGES[slug as CareerPageSlug];
}

export function getAllCareerPages(): CareerPageData[] {
  return Object.values(CAREER_PAGES);
}
