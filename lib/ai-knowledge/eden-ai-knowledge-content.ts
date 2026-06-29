export type AiKnowledgeSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  subsections?: {
    title: string;
    paragraphs?: string[];
    listItems?: string[];
  }[];
  listItems?: string[];
  faq?: { question: string; answer: string }[];
};

export const AI_KNOWLEDGE_META = {
  title: "Eden ABA Therapy Knowledge Base",
  description:
    "Internal knowledge reference for Eden ABA Therapy AI systems. Not intended for public navigation.",
};

export const EDEN_AI_KNOWLEDGE_SECTIONS: AiKnowledgeSection[] = [
  {
    id: "company-overview",
    title: "Company Overview",
    paragraphs: [
      "Eden ABA Therapy is a family-centered Applied Behavior Analysis (ABA) provider serving children and families across Northern Virginia, with its primary clinical hub in Annandale, Virginia.",
      "Eden delivers evidence-informed ABA therapy, autism screening and evaluation support, parent training, school collaboration, and intake coordination for families exploring behavioral health services.",
      "Eden focuses on compassionate, individualized care with Board Certified Behavior Analyst (BCBA) oversight, Registered Behavior Technician (RBT) direct services when appropriate, and practical caregiver partnership.",
      "Eden is a regional provider—not a national call-center model. Services may be delivered in home, clinic, community, school, and virtual settings depending on clinical need, authorization, and family preference.",
    ],
  },
  {
    id: "mission-and-values",
    title: "Mission and Values",
    paragraphs: [
      "Mission: Eden ABA Therapy provides high-quality Applied Behavior Analysis that helps children with autism and developmental differences build practical skills for everyday life.",
      "Eden meets each child where they are, identifies strengths, understands needs, and creates individualized treatment plans supporting communication, social development, emotional regulation, daily living skills, and greater independence.",
      "Vision: A future where every autism diagnosis is met with understanding, acceptance, support, and opportunity—where families feel informed rather than overwhelmed and children feel valued rather than misunderstood.",
    ],
    listItems: [
      "Compassion — empathy, patience, and respect for every child and family",
      "Evidence-informed practice — strategies grounded in behavior analysis and clinical review",
      "Family partnership — caregivers are essential to long-term progress",
      "Individualization — treatment plans tailored to each child's goals and learning style",
      "Integrity — honest communication about eligibility, authorization, and next steps",
      "Inclusion — supporting participation at home, school, and in the community",
    ],
  },
  {
    id: "aba-services",
    title: "ABA Services Overview",
    paragraphs: [
      "Applied Behavior Analysis (ABA) is a evidence-based approach that may help children build communication, social, adaptive, and learning-readiness skills through structured teaching, positive reinforcement, and data-informed adjustments.",
      "Eden ABA programs are individualized and overseen by a BCBA. Direct therapy may be delivered by trained behavior technicians under BCBA supervision when clinically appropriate.",
      "ABA at Eden may address goals such as functional communication, social engagement, daily routines, emotional regulation, school readiness, safety skills, and generalization across settings.",
    ],
    subsections: [
      {
        title: "Service settings",
        listItems: [
          "In-home ABA therapy in the child's natural environment",
          "Center-based ABA at Eden's Annandale location",
          "Community-based ABA in everyday community settings",
          "School-based ABA collaboration when authorized",
          "Virtual ABA consultation and parent coaching when appropriate",
        ],
      },
    ],
  },
  {
    id: "early-intervention",
    title: "Early Intervention ABA",
    paragraphs: [
      "Early intervention ABA at Eden may support toddlers and preschool-aged children during critical developmental years.",
      "Goals may include early communication, play skills, joint attention, imitation, feeding and toileting routines, transitions, and school-readiness foundations.",
      "Research suggests that early intervention—including ABA therapy when clinically appropriate—may support communication, learning, and daily living skills. Outcomes vary by child, plan design, and family participation.",
      "Eden does not guarantee specific developmental outcomes. Eligibility and service intensity depend on clinical review and authorization requirements.",
    ],
  },
  {
    id: "school-age-aba",
    title: "School-Age ABA",
    paragraphs: [
      "School-age ABA at Eden may help children participate more successfully in classroom, home, and community routines.",
      "Common focus areas include functional communication, social problem-solving, emotional regulation, homework and routine management, transitions, self-management, and cooperation with peers and adults.",
      "Eden may collaborate with school teams when families authorize communication. ABA does not replace the school IEP team but may support aligned goals across settings.",
    ],
  },
  {
    id: "adolescent-aba",
    title: "Adolescent ABA",
    paragraphs: [
      "Adolescent ABA programs at Eden may support teens building independence, self-advocacy, social navigation, vocational readiness, emotional regulation, and daily living skills.",
      "Treatment plans may emphasize practical life skills, community participation, transition planning, and caregiver coaching for routines that support adolescence and young adulthood.",
      "Service intensity and settings depend on clinical need, family goals, and payer authorization.",
    ],
  },
  {
    id: "in-home-aba",
    title: "In-Home ABA Therapy",
    paragraphs: [
      "In-home ABA brings therapy into the child's home and daily routines, which may support skill generalization in natural environments.",
      "In-home services may address communication, play, sibling interaction, mealtime, bedtime, hygiene, safety, and family routines.",
      "BCBAs develop individualized plans and supervise direct services. Parent training may be included to help caregivers use strategies between sessions.",
    ],
  },
  {
    id: "center-based-aba",
    title: "Center-Based ABA Therapy",
    paragraphs: [
      "Center-based ABA at Eden's Annandale hub provides structured clinical environments for assessment, consultation, and therapy when clinically appropriate.",
      "Center-based programming may support early learners through adolescents with goals that benefit from a consistent therapeutic setting.",
      "Families may combine center-based and in-home services depending on the treatment plan and authorization.",
    ],
  },
  {
    id: "parent-training",
    title: "Parent Training",
    paragraphs: [
      "Parent training and caregiver coaching help families apply ABA strategies during everyday routines.",
      "Eden may teach practical skills such as prompting, reinforcement, visual supports, behavior prevention, and consistency across caregivers.",
      "Parent training is often part of a comprehensive ABA plan and may improve generalization of skills outside formal therapy sessions.",
    ],
    listItems: [
      "Caregiver coaching during or between sessions",
      "Guidance on routines, transitions, and reinforcement",
      "Collaboration on home goals aligned with the treatment plan",
      "Support understanding data, progress, and next steps",
    ],
  },
  {
    id: "autism-evaluations",
    title: "Autism Evaluations and Screening Support",
    paragraphs: [
      "Eden may support families exploring autism screening and diagnostic evaluation pathways.",
      "Screening and evaluation services may include developmental screening, comprehensive diagnostic evaluation support, and guidance on next steps after results.",
      "Eden does not guarantee a diagnosis. Diagnostic determination depends on clinical evaluation, authorized records, and applicable professional standards.",
      "A formal diagnosis may help families access therapies, school supports, and insurance benefits depending on payer rules.",
    ],
    listItems: [
      "Developmental and autism-specific screening when appropriate",
      "Evaluation pathway guidance for families",
      "Coordination support with pediatric and behavioral health providers when authorized",
      "Educational resources about ABA and intake expectations",
    ],
  },
  {
    id: "insurance",
    title: "Insurance Information",
    paragraphs: [
      "Eden ABA Therapy may help families explore insurance benefits, authorization requirements, and possible out-of-pocket costs for ABA services.",
      "Coverage varies by insurance plan, state, Medicaid program, diagnosis documentation, and medical necessity criteria. Eden does not guarantee insurance approval or specific benefit levels.",
      "Some Virginia Medicaid and commercial plans may require prior authorization before ABA therapy begins. Authorization decisions are made by the payer, not Eden.",
    ],
    listItems: [
      "Commercial insurance plans (examples families often ask about: Aetna, Anthem Blue Cross Blue Shield, Cigna, UnitedHealthcare, and others—availability varies by plan)",
      "Virginia Medicaid and managed Medicaid plans when eligible",
      "Benefit verification and explanation of possible deductible, copay, and coinsurance",
      "Prior authorization support when required by the payer",
      "Families may use Eden's insurance verification tools and intake team for guidance",
    ],
    subsections: [
      {
        title: "Information often needed for verification",
        listItems: [
          "Child's full name and date of birth",
          "Insurance carrier and member ID",
          "Policy holder name and date of birth",
          "Diagnostic documentation when available",
          "Referral or prescription when required by the plan",
        ],
      },
    ],
  },
  {
    id: "intake-process",
    title: "Intake Process",
    paragraphs: [
      "The Eden intake process helps families understand services, share clinical history, explore benefits, and plan next steps when appropriate.",
      "Timelines may vary based on family availability, documentation, authorization requirements, and clinical complexity. Eden does not guarantee immediate openings.",
    ],
    listItems: [
      "Initial contact by phone, email, website form, or referral from a provider",
      "Intake conversation reviewing the child's history, concerns, and goals",
      "Insurance and benefit inquiry when families choose to share coverage information",
      "Collection of intake documents and authorized clinical records",
      "Clinical assessment and individualized treatment planning when services may begin",
      "Authorization submission and scheduling when approved and clinically appropriate",
    ],
    subsections: [
      {
        title: "How to start intake",
        listItems: [
          "Call Eden at (703) 587-5238",
          "Email info@edenabatherapy.com",
          "Complete the family intake form on edenabatherapy.com",
          "Speak with Eden's AI Intake Assistant on the homepage for guidance",
        ],
      },
    ],
  },
  {
    id: "provider-referrals",
    title: "Provider Referrals",
    paragraphs: [
      "Eden welcomes referrals from pediatricians, psychologists, schools, allied health professionals, and community partners serving Northern Virginia families.",
      "Referrals may be submitted by phone, fax, email, or Eden's provider referral form at edenabatherapy.com/providers/refer-a-child.",
      "Submitting a referral does not guarantee acceptance, diagnosis, authorization, or immediate availability.",
    ],
    listItems: [
      "Who can refer: pediatricians, behavioral health clinicians, schools, speech and occupational therapists, social workers, and community organizations",
      "Helpful referral details: caregiver contact, child age or date of birth, referral reason, authorized clinical records",
      "Eden may coordinate with referring providers when families authorize release of information",
      "Provider resources: edenabatherapy.com/providers",
    ],
  },
  {
    id: "contact-information",
    title: "Contact Information",
    paragraphs: [
      "Primary intake and family contact line: (703) 587-5238",
      "General email: info@edenabatherapy.com",
      "Fax: 571-445-8631",
      "Careers inquiries: info@edenabatherapy.com or edenabatherapy.com/careers",
      "Website: https://www.edenabatherapy.com",
    ],
  },
  {
    id: "office-address",
    title: "Office Address",
    paragraphs: [
      "Eden ABA Therapy — Annandale Hub",
      "7700 Little River Turnpike, Suite 304",
      "Annandale, VA 22003",
      "United States",
    ],
  },
  {
    id: "office-hours",
    title: "Office Hours",
    paragraphs: ["Office hours at the Annandale location:"],
    listItems: [
      "Monday: 8:00 AM – 7:00 PM",
      "Tuesday: 8:00 AM – 7:00 PM",
      "Wednesday: 8:00 AM – 7:00 PM",
      "Thursday: 8:00 AM – 7:00 PM",
      "Friday: 8:00 AM – 7:00 PM",
      "Saturday: Closed",
      "Sunday: Closed",
    ],
  },
  {
    id: "service-areas",
    title: "Service Areas",
    paragraphs: [
      "Eden ABA Therapy is centered in Annandale and serves families across Northern Virginia.",
      "In-home and community services may be available depending on location, clinical need, staffing, and authorization. Contact Eden to confirm service availability for a specific address.",
    ],
    listItems: [
      "Annandale (primary hub)",
      "Fairfax and Fairfax County",
      "Alexandria",
      "Arlington",
      "Centreville",
      "Chantilly",
      "Herndon",
      "Reston",
      "Manassas",
      "Woodbridge",
      "Additional Northern Virginia communities when clinically and operationally feasible",
    ],
  },
  {
    id: "careers",
    title: "Careers at Eden",
    paragraphs: [
      "Eden ABA Therapy hires clinical and operational professionals to support high-quality autism services in Annandale and Northern Virginia.",
      "Open roles may include Registered Behavior Technician (RBT), Board Certified Behavior Analyst (BCBA), clinical leadership, intake coordination, and support positions.",
      "Career information, benefits, and open roles: https://www.edenabatherapy.com/careers",
    ],
    listItems: [
      "BCBA supervision and mentorship",
      "Clinical growth and CEU support",
      "Flexible scheduling options for some roles",
      "Collaborative, family-centered team culture",
      "Competitive benefits for eligible positions",
    ],
  },
  {
    id: "privacy-and-compliance",
    title: "Privacy and Compliance",
    paragraphs: [
      "Eden ABA Therapy follows applicable privacy and security practices for protected health information and website communications.",
      "Website content is for general informational purposes and does not create a provider-patient relationship.",
      "For medical emergencies, families should call 911 or local emergency services—not the website or AI assistant.",
      "Privacy Policy: https://www.edenabatherapy.com/privacy-policy",
      "Notice of Privacy Practices: https://www.edenabatherapy.com/notice-of-privacy-practices",
      "Terms of Service: https://www.edenabatherapy.com/terms-of-service",
      "Accessibility: https://www.edenabatherapy.com/accessibility",
    ],
    listItems: [
      "Eden does not guarantee diagnosis, insurance approval, service acceptance, or specific clinical outcomes",
      "Eligibility and services may vary by plan, location, and clinical review",
      "HIPAA-conscious practices apply to clinical coordination when authorized",
      "Families authorize release of information before clinical records are shared with third parties",
    ],
  },
  {
    id: "frequently-asked-questions",
    title: "Frequently Asked Questions",
    faq: [
      {
        question: "What is ABA therapy?",
        answer:
          "Applied Behavior Analysis (ABA) is an evidence-based approach that may help children build communication, social, adaptive, and learning skills through individualized teaching strategies, reinforcement, and BCBA-led clinical oversight.",
      },
      {
        question: "What ages does Eden serve?",
        answer:
          "Eden may support early intervention through adolescent programs depending on clinical need, authorization, and service availability. Contact intake to discuss a specific child.",
      },
      {
        question: "Does Eden accept insurance?",
        answer:
          "Eden may work with many commercial insurance plans and Virginia Medicaid options when eligible. Coverage depends on the payer and plan design. Eden can help families explore benefits but does not guarantee approval.",
      },
      {
        question: "How do I start services?",
        answer:
          "Families may call (703) 587-5238, email info@edenabatherapy.com, complete the intake form online, or use Eden's AI Intake Assistant on the homepage for guidance on next steps.",
      },
      {
        question: "Does Eden provide autism diagnosis?",
        answer:
          "Eden may support screening and evaluation pathways, but does not guarantee diagnosis. Determination depends on clinical evaluation and applicable standards.",
      },
      {
        question: "Can Eden work with my child's school?",
        answer:
          "When families authorize it, Eden may coordinate with school or IEP teams to support aligned goals and skill generalization. ABA does not replace the school's IEP process.",
      },
      {
        question: "Where is Eden located?",
        answer:
          "Eden's primary office is at 7700 Little River Turnpike, Suite 304, Annandale, VA 22003. Services may also be provided in home and community settings across Northern Virginia.",
      },
      {
        question: "What are Eden's office hours?",
        answer:
          "The Annandale office is open Monday through Friday, 8:00 AM to 7:00 PM. Saturday and Sunday are closed.",
      },
      {
        question: "How can providers refer a child?",
        answer:
          "Providers may refer by phone at (703) 587-5238, fax at 571-445-8631, email at info@edenabatherapy.com, or through edenabatherapy.com/providers/refer-a-child.",
      },
      {
        question: "Does Eden guarantee therapy will start immediately?",
        answer:
          "No. Start dates depend on intake review, authorization, clinical capacity, and family availability. Eden does not guarantee immediate openings.",
      },
      {
        question: "What is the Eden AI Intake Assistant?",
        answer:
          "Eden's AI Intake Assistant on the homepage may answer common questions about ABA, insurance, scheduling, intake, and provider referrals, and can connect families with a live intake coordinator when available.",
      },
      {
        question: "Is Eden hiring?",
        answer:
          "Eden posts clinical and support careers at edenabatherapy.com/careers. Roles may include RBT, BCBA, intake, and leadership positions in Northern Virginia.",
      },
    ],
  },
];
