import type { LucideIcon } from "lucide-react";
import {
  Heart,
  ShieldCheck,
  Users,
  Sparkles,
  FileCheck,
  LineChart,
} from "lucide-react";

export type FamilyCommitmentCard = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

export const FAMILY_COMMITMENT_CONTENT = {
  eyebrow: "Families first, always",
  title: "Our Commitment to Families",
  intro:
    "Eden ABA Therapy is built on trust, transparency, and compassionate care. These are the promises we make to every family we serve across Northern Virginia.",
  cards: [
    {
      id: "compassionate-care",
      title: "Compassionate, Child-Centered Care",
      description:
        "Every session honors your child's strengths, dignity, and individuality — with warmth, patience, and respect at the center of care.",
      Icon: Heart,
    },
    {
      id: "clinical-excellence",
      title: "BCBA-Led Clinical Excellence",
      description:
        "Board-certified supervisors guide evidence-based ABA programs with rigorous oversight, ethical practice, and clinical integrity.",
      Icon: ShieldCheck,
    },
    {
      id: "family-partnership",
      title: "Transparent Family Partnership",
      description:
        "Clear communication, collaborative goal-setting, and respectful involvement so families feel informed and supported at every step.",
      Icon: Users,
    },
    {
      id: "personalized-plans",
      title: "Personalized Treatment Plans",
      description:
        "Programs tailored to your child's communication, behavior, daily living, and social goals — never one-size-fits-all.",
      Icon: Sparkles,
    },
    {
      id: "insurance-access",
      title: "Insurance & Access Support",
      description:
        "Dedicated guidance verifying coverage, navigating intake, and reducing administrative stress so families can focus on their child.",
      Icon: FileCheck,
    },
    {
      id: "measurable-progress",
      title: "Progress You Can Understand",
      description:
        "Ongoing measurement and family-friendly updates that make milestones tangible, meaningful, and worth celebrating together.",
      Icon: LineChart,
    },
  ] satisfies FamilyCommitmentCard[],
  banner: {
    title: "Family Success Stories Coming Soon",
    description:
      "We are preparing a space for authentic family stories — shared only when families are ready. Real journeys, real progress, no fabricated testimonials.",
  },
  approachCta: "More About Our Approach",
} as const;
