export type CareerBenefit = {
  id: string;
  title: string;
  description: string;
};

export const CAREER_BENEFITS: CareerBenefit[] = [
  {
    id: "compensation",
    title: "Competitive, transparent compensation",
    description:
      "Role-based pay bands are reviewed regularly and paired with clear growth expectations so team members can plan for long-term advancement.",
  },
  {
    id: "clinical-support",
    title: "Clinical mentorship and supervision support",
    description:
      "Technicians and clinicians receive structured feedback, case consultation, and coaching designed to strengthen treatment quality.",
  },
  {
    id: "development",
    title: "Continuing education and development planning",
    description:
      "Eden supports ongoing learning through internal trainings, mentorship tracks, and role-aligned professional development planning.",
  },
  {
    id: "scheduling",
    title: "Flexible scheduling where role-appropriate",
    description:
      "Scheduling teams collaborate with staff to build caseloads that balance child needs, continuity of care, and clinician sustainability.",
  },
  {
    id: "family-centered",
    title: "Family-centered care culture",
    description:
      "Teams prioritize caregiver partnership, respectful communication, and practical treatment carryover across home, school, and community settings.",
  },
  {
    id: "quality",
    title: "Quality-first operations support",
    description:
      "Clinical and operations teams work together on documentation integrity, service coordination, and continuous quality improvement.",
  },
  {
    id: "wellbeing",
    title: "Team wellbeing and retention focus",
    description:
      "Leaders actively monitor onboarding experience, caseload stability, and coaching needs to support sustainable careers in ABA.",
  },
  {
    id: "growth",
    title: "Defined Virginia growth opportunities",
    description:
      "As Eden expands in Northern Virginia, team members can pursue advancement into senior clinical, quality, and leadership tracks.",
  },
];

export const CAREER_BENEFITS_DISCLAIMER =
  "Benefit offerings can vary by role classification, schedule, location, and employment status. Any references to BACB, DBHDS, or Medicaid are provided for educational context only and do not constitute legal, billing, licensing, or regulatory advice.";
