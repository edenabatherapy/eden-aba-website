import type { CareerFaqItem } from "./faq-data";

export const LIFE_AT_EDEN_META = {
  title: "Life at Eden | Eden ABA Therapy Careers",
  description:
    "Discover life at Eden ABA Therapy—collaborative culture, team environment, employee stories, recognition programs, diversity and inclusion, mentorship, work-life balance, community impact, and photo and video highlights across Northern Virginia.",
};

export const LIFE_AT_EDEN_SECTION_NAV = [
  { id: "our-culture", label: "Our Culture" },
  { id: "team-environment", label: "Team Environment" },
  { id: "employee-experience", label: "Employee Experience" },
  { id: "employee-stories", label: "Employee Stories" },
  { id: "recognition-programs", label: "Recognition Programs" },
  { id: "diversity-inclusion", label: "Diversity & Inclusion" },
  { id: "training-mentorship", label: "Training & Mentorship" },
  { id: "work-life-balance", label: "Work-Life Balance" },
  { id: "community-impact", label: "Community Impact" },
  { id: "photo-gallery", label: "Photo Gallery" },
  { id: "video-highlights", label: "Video Highlights" },
] as const;

export const LIFE_AT_EDEN_HERO_BADGES = [
  "Mission-Driven",
  "Collaborative Teams",
  "Clinical Excellence",
  "Growth Culture",
] as const;

export const LIFE_AT_EDEN_STATS = [
  { value: 7, suffix: "+", label: "Career pathways", description: "From direct care through clinical leadership" },
  { value: 3, label: "Core values", description: "Compassion, integrity, and family partnership" },
  { value: 100, suffix: "%", label: "Team focus", description: "Supporting clinicians and families together" },
  { value: 1, label: "Northern Virginia hub", description: "Annandale-based team and recruiting center" },
];

export const LIFE_AT_EDEN_CULTURE_CARDS = [
  { title: "Mission-driven environment", description: "Every role connects to helping children and families access ethical, evidence-based autism care." },
  { title: "Family-centered care", description: "Caregivers are partners in treatment—not spectators—and that philosophy extends to how teams collaborate." },
  { title: "Collaboration", description: "Clinical, operations, and leadership teams work together to protect service quality and continuity." },
];

export const LIFE_AT_EDEN_TEAM_CARDS = [
  { title: "Clinical collaboration", description: "BCBAs, RBTs, and technicians coordinate through supervision, case consultation, and shared quality standards." },
  { title: "Supervisor support", description: "Structured feedback, observation, and coaching help team members build confidence and clinical skill." },
  { title: "Interdisciplinary teamwork", description: "Communication with caregivers, schools, and community partners keeps care coordinated and practical." },
];

export const LIFE_AT_EDEN_EXPERIENCE_ITEMS = [
  { title: "Morning session prep", description: "Review treatment plans, gather materials, and coordinate with supervisors before heading to home or community sessions." },
  { title: "Direct care with purpose", description: "Deliver skill-building and behavior support while collecting reliable data and partnering with caregivers." },
  { title: "Afternoon documentation", description: "Complete session notes, communicate updates, and prepare for the next day with supervisor guidance." },
  { title: "Growth conversations", description: "Regular check-ins on competency, credential pathways, and professional development goals." },
];

export const LIFE_AT_EDEN_TESTIMONIALS = [
  {
    quote: "Eden gave me structure when I was new to ABA. My supervisor helped me build confidence session by session.",
    name: "Jordan M.",
    role: "Registered Behavior Technician",
    journey: "BT → RBT in 8 months",
  },
  {
    quote: "I appreciate how Eden balances clinical rigor with respect for families. That culture shows up in team meetings too.",
    name: "Priya S.",
    role: "Board Certified Behavior Analyst",
    journey: "BCBA since 2022",
  },
  {
    quote: "Scheduling and operations teams genuinely support clinicians. That makes a difference when families depend on consistency.",
    name: "Marcus T.",
    role: "Client Services Coordinator",
    journey: "Operations track",
  },
  {
    quote: "The mentorship here isn't generic—it's tied to real cases, real feedback, and a clear path toward my BCBA goals.",
    name: "Elena R.",
    role: "Senior RBT",
    journey: "RBT → Senior RBT",
  },
];

export const LIFE_AT_EDEN_SPOTLIGHTS = [
  { title: "Clinical mentorship in action", description: "BCBAs and senior RBTs model treatment fidelity during joint sessions and team huddles.", highlight: "Supervised growth" },
  { title: "New hire onboarding cohorts", description: "Structured orientation groups help BTs and RBTs start with shared expectations and peer support.", highlight: "Strong starts" },
  { title: "Family partnership moments", description: "Teams celebrate caregiver wins and practical carryover routines that extend beyond the session.", highlight: "Mission impact" },
];

export const LIFE_AT_EDEN_RECOGNITION = [
  { title: "Employee appreciation", description: "Team celebrations, milestone acknowledgments, and culture events that recognize everyday excellence." },
  { title: "Service awards", description: "Recognition for tenure, reliability, and sustained contribution to families and teammates." },
  { title: "Achievement recognition", description: "Credential milestones, competency achievements, and leadership readiness acknowledgments." },
];

export const LIFE_AT_EDEN_DEI_CARDS = [
  { title: "Inclusive workplace", description: "Eden strives to create an environment where diverse perspectives strengthen clinical care and team culture." },
  { title: "Respect for differences", description: "Professional communication, cultural humility, and dignity-centered practice guide how teams work together." },
  { title: "Equal opportunity", description: "Eden is an equal opportunity employer committed to fair hiring and advancement practices." },
];

export const LIFE_AT_EDEN_TRAINING = [
  { title: "New hire onboarding", description: "Role clarity, systems training, ethical boundaries, and introduction to Eden's clinical standards." },
  { title: "Ongoing coaching", description: "Regular supervisor touchpoints with observation, feedback, and competency planning." },
  { title: "Supervisor guidance", description: "Case consultation, escalation pathways, and professional development aligned to your credential level." },
];

export const LIFE_AT_EDEN_WORK_LIFE = [
  { title: "Scheduling support", description: "Operations teams coordinate caseloads and travel with sustainability in mind." },
  { title: "Wellness initiatives", description: "Culture that acknowledges the emotional demands of clinical work and supports rest and recovery." },
  { title: "Flexibility", description: "Schedule considerations where role-appropriate to balance service continuity and staff needs." },
];

export const LIFE_AT_EDEN_COMMUNITY = [
  { title: "Volunteer activities", description: "Team participation in community events that raise autism awareness and family support." },
  { title: "Community partnerships", description: "Collaboration with local organizations and schools across Northern Virginia." },
  { title: "Family events", description: "Opportunities to connect with the families and communities Eden serves." },
];

export const LIFE_AT_EDEN_GALLERY = [
  { src: "/images/about-eden-hero-team.jpg", alt: "Eden team collaboration", caption: "Team huddle", span: "tall" as const },
  { src: "/images/home-service-parent-training.jpg", alt: "Supervisor coaching session", caption: "Supervisor coaching", span: "wide" as const },
  { src: "/images/aba-day-step-skills.jpg", alt: "Skill-building session", caption: "Skill-building", span: "normal" as const },
  { src: "/images/about-eden-family-centered-care.jpg", alt: "Family-centered care", caption: "Family partnership", span: "normal" as const },
  { src: "/images/aba-section-assessment.jpg", alt: "Clinical assessment collaboration", caption: "Clinical collaboration", span: "wide" as const },
  { src: "/images/aba-day-step-social-play.jpg", alt: "Social play therapy moment", caption: "Play-based learning", span: "normal" as const },
  { src: "/images/aba-day-step-wrapup.jpg", alt: "Session wrap-up and documentation", caption: "Session wrap-up", span: "tall" as const },
  { src: "/images/home-service-in-home-aba.jpg", alt: "In-home ABA therapy", caption: "In-home care", span: "normal" as const },
];

export type LifeAtEdenVideo = {
  title: string;
  description: string;
  duration: string;
  category: "Recruiting" | "Employee Story" | "Community";
};

export const LIFE_AT_EDEN_VIDEOS: LifeAtEdenVideo[] = [
  { title: "Welcome to Eden ABA Therapy", description: "Meet the team and learn what makes Eden's approach to autism care unique.", duration: "2:30", category: "Recruiting" },
  { title: "A Day in the Life: RBT", description: "Follow a registered behavior technician through session prep, direct care, and supervision.", duration: "3:15", category: "Employee Story" },
  { title: "Growing as a BCBA at Eden", description: "Hear from a board certified behavior analyst about mentorship and clinical leadership.", duration: "4:00", category: "Employee Story" },
  { title: "Community Impact in Northern Virginia", description: "See how Eden teams partner with families and local organizations.", duration: "2:45", category: "Community" },
];

export type LifeAtEdenTestimonial = (typeof LIFE_AT_EDEN_TESTIMONIALS)[number];

export const LIFE_AT_EDEN_FAQ: CareerFaqItem[] = [
  {
    question: "What is the culture like at Eden?",
    answer:
      "Eden emphasizes family-centered care, ethical ABA practice, respectful communication, and structured clinical support. Teams collaborate across clinical and operations functions.",
  },
  {
    question: "How does Eden support new hires?",
    answer:
      "New hires typically receive structured onboarding, supervisor coaching, role clarity, and ongoing feedback aligned to competency goals.",
  },
];

export const LIFE_AT_EDEN_DISCLAIMER =
  "Employee experiences may vary by role, location, schedule, and team assignment. Testimonials represent illustrative team member perspectives and do not guarantee specific outcomes or advancement timelines.";
