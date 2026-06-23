import type { CareerFaqItem } from "./faq-data";

export const BT_RBT_HUB_META = {
  title: "Behavior Technician Careers (BT & RBT) | Eden ABA Therapy",
  description:
    "Learn about Behavior Technician (BT) and Registered Behavior Technician (RBT) careers at Eden ABA Therapy. Compare roles, responsibilities, supervision, training, and growth pathways across Annandale and Northern Virginia.",
};

export const BT_RBT_HERO_BADGES = [
  "Entry-Level Pathways",
  "RBT Credential Track",
  "Supervised Practice",
  "Family-Centered Care",
  "Career Growth",
] as const;

export const BT_RBT_WHAT_IS_BT = {
  title: "What is a Behavior Technician (BT)?",
  summary:
    "A Behavior Technician (BT) is typically an entry-level direct care role in ABA therapy. BTs deliver hands-on support under clinical supervision, help children practice communication and daily living skills, and learn professional habits in home and community settings.",
  points: [
    "Often the first step into ABA for candidates new to the field",
    "Works under BCBA or supervisor direction on assigned treatment plans",
    "Focuses on rapport, session consistency, data collection, and caregiver communication",
    "May progress toward RBT credential readiness depending on role requirements and eligibility",
  ],
};

export const BT_RBT_WHAT_IS_RBT = {
  title: "What is a Registered Behavior Technician (RBT)?",
  summary:
    "A Registered Behavior Technician (RBT) is a paraprofessional credential recognized by the Behavior Analyst Certification Board (BACB). RBTs implement treatment plans with documented competency requirements, ongoing supervision, and ethical practice standards.",
  points: [
    "Requires meeting BACB RBT eligibility, training, and examination requirements",
    "Delivers direct ABA services under qualified supervision",
    "Maintains active certification and supervision compliance",
    "Often serves as a foundation for Senior RBT, Lead RBT, and BCBA pathways",
  ],
};

export const BT_RBT_DIFFERENCES = [
  {
    aspect: "Typical entry point",
    bt: "Common starting role for candidates new to ABA",
    rbt: "Often pursued after BT experience or when credential is required",
  },
  {
    aspect: "Credential status",
    bt: "May not require RBT certification at hire depending on role",
    rbt: "Requires active RBT certification in good standing",
  },
  {
    aspect: "Supervision",
    bt: "Structured supervision and coaching from clinical leaders",
    rbt: "BACB-aligned supervision, observation, and competency monitoring",
  },
  {
    aspect: "Documentation",
    bt: "Session notes and data collection with supervisor review",
    rbt: "Higher accountability for treatment fidelity and record quality",
  },
  {
    aspect: "Career progression",
    bt: "Pathway toward RBT, Senior RBT, and clinical advancement",
    rbt: "Pathway toward Lead RBT, BCaBA awareness, and BCBA tracks",
  },
];

export const BT_RBT_RESPONSIBILITIES = {
  shared: [
    "Implement individualized treatment activities under supervisor direction",
    "Support communication, play, social, and daily living skill goals",
    "Collect session data and communicate professionally with families",
    "Maintain ethical boundaries, confidentiality, and child safety",
    "Participate in supervision, feedback, and team planning",
  ],
  bt: [
    "Build session readiness and rapport with children and caregivers",
    "Learn ABA fundamentals through onboarding and coached practice",
    "Develop consistency with observation, feedback, and skill rehearsal",
  ],
  rbt: [
    "Deliver treatment with credential-backed competency expectations",
    "Monitor treatment fidelity across assigned programs and settings",
    "Support caregiver carryover within scope of supervisor guidance",
  ],
};

export const BT_RBT_SUPERVISION = [
  {
    title: "Structured supervision",
    description:
      "BTs and RBTs receive ongoing supervision from BCBAs or qualified supervisors, including observation, feedback, and competency development aligned to role scope.",
  },
  {
    title: "Training expectations",
    description:
      "Onboarding may include ABA fundamentals, documentation standards, ethical practice, and role-specific skill building. RBT roles include credential-aligned training requirements.",
  },
  {
    title: "Documentation culture",
    description:
      "Teams emphasize accurate session data, timely notes, and quality habits that support treatment integrity and family communication.",
  },
  {
    title: "Educational payer awareness",
    description:
      "Eden teams work with educational awareness of Medicaid-funded ABA documentation and Virginia provider workflow expectations—without providing regulatory or billing advice.",
  },
];

export const BT_RBT_GROWTH_PATH = [
  { stage: "BT", note: "Entry-level direct care with supervised skill development." },
  { stage: "RBT", note: "Credential-backed implementation and treatment fidelity." },
  { stage: "Senior RBT", note: "Peer modeling and expanded clinical responsibility." },
  { stage: "Lead RBT", note: "Team coordination and technician support." },
  { stage: "BCaBA", note: "Mid-level clinical support where credential-eligible." },
  { stage: "BCBA", note: "Assessment, supervision, and treatment planning leadership." },
];

export const BT_RBT_FAQ: CareerFaqItem[] = [
  {
    question: "Should I apply for BT or RBT roles?",
    answer:
      "If you are new to ABA, a BT role may be the best entry point. If you already hold an active RBT certification, RBT openings may be a better fit. Review current postings for specific requirements.",
  },
  {
    question: "Do I need experience to start as a BT?",
    answer:
      "Some BT roles welcome candidates new to ABA with strong reliability, communication, and interest in working with children. Requirements vary by posting.",
  },
  {
    question: "Does Eden help BTs become RBTs?",
    answer:
      "Eden may support pathway planning, supervision, and development conversations toward RBT readiness where role requirements and organizational needs align.",
  },
  {
    question: "What supervision do RBTs receive?",
    answer:
      "RBTs work under qualified supervision with observation, feedback, and competency support aligned to BACB-aware expectations and Eden clinical standards.",
  },
  {
    question: "Can BT or RBT roles lead to BCBA careers?",
    answer:
      "Many clinicians progress from direct care through Senior RBT and BCBA pathways based on education, credential eligibility, performance, and organizational needs.",
  },
];

export const BT_RBT_EDUCATIONAL_NOTICE =
  "Educational note: BT and RBT descriptions reference BACB-aware terminology and common Medicaid-funded ABA provider practices for recruiting clarity only. This page does not provide credentialing, legal, billing, or regulatory advice. Role requirements vary by posting.";
