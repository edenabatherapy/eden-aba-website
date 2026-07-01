export type FooterLinkItem = {
  label: string;
  href: string;
};

export const FOOTER_MISSION =
  "Compassionate, evidence-informed ABA therapy and family support designed to help children build meaningful skills across home, school, and community.";

export const FOOTER_SERVICE_LINKS: FooterLinkItem[] = [
  { label: "ABA Therapy", href: "/aba-therapy/what-is-aba-therapy" },
  { label: "School-Based ABA Therapy", href: "/services/school-based-aba-therapy" },
  { label: "Evaluations & Diagnosis", href: "/services/evaluations-diagnosis/screening-evaluation" },
  { label: "Screening & Evaluation", href: "/services/evaluations-diagnosis/screening-evaluation" },
  { label: "School & IEP Evaluations", href: "/autism-evaluation/ide-evaluation" },
  { label: "Parent Training", href: "/aba-therapy/parent-training" },
  { label: "After School Programs", href: "/services/after-school-programs" },
];

export const FOOTER_RESOURCE_LINKS: FooterLinkItem[] = [
  { label: "Getting Started with Eden", href: "/getting-started" },
  { label: "What Is ABA Therapy?", href: "/aba-therapy/what-is-aba-therapy" },
  { label: "Autism Resources", href: "/getting-started" },
  { label: "FAQs", href: "/resources/faqs" },
  { label: "Parent Guides", href: "/aba-therapy/parent-training" },
  { label: "Success Stories", href: "/resources/family-stories" },
];

export const FOOTER_CAREER_LINKS: FooterLinkItem[] = [
  { label: "Search Open Roles", href: "/careers/open-roles" },
  { label: "Behavior Technician Careers", href: "/careers/behavior-technician-careers" },
  { label: "RBT Careers", href: "/careers/rbt" },
  { label: "BCBA Careers", href: "/careers/bcba" },
  { label: "Benefits & Compensation", href: "/careers/benefits-compensation" },
  { label: "Life at Eden", href: "/careers/life-at-eden" },
  { label: "Career Growth Pathways", href: "/careers/career-growth-pathways" },
];

export const FOOTER_ABOUT_EDEN_LINKS: FooterLinkItem[] = [
  { label: "Our Story", href: "/about/our-story" },
  { label: "Our Mission & Values", href: "/about/mission-values" },
  { label: "Our Approach", href: "/about/our-approach" },
  { label: "Our Team", href: "/about/our-team" },
  { label: "Clinical Quality", href: "/about/clinical-quality" },
  { label: "Community Impact", href: "/about/community-impact" },
  { label: "Contact Us", href: "/contact" },
];

export const FOOTER_COMPLIANCE = {
  accessibility: {
    title: "Accessibility Notice",
    content:
      "This website is designed to support WCAG 2.0 AA accessibility standards. If you experience difficulty accessing any content on the Eden ABA Therapy website, our team will be happy to help.",
  },
  privacy: {
    title: "Cookie & Privacy Notice",
    content:
      "This website uses cookies to help us understand which pages are most helpful to visitors. This data is anonymous. We do not sell user data.",
  },
};

export const FOOTER_LEGAL_LINKS: FooterLinkItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Notice of Privacy Practices", href: "/notice-of-privacy-practices" },
];

export const FOOTER_SERVICE_AREA =
  "Northern Virginia — Annandale clinic hub with in-home and community-based services.";

export const FOOTER_BUILT_BY = {
  label: "Built by ITMagnum",
  href: undefined as string | undefined,
};
