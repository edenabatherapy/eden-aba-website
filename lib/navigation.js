/** Maps English menu link labels to in-app routes (language-independent). */
export const MENU_LINK_ROUTES = {
  "M-CHAT-R Online Screener": {
    action: "navigate",
    page: "screening-evaluation",
    path: "/services/evaluations-diagnosis/screening-evaluation",
    scrollTo: "mchat-r-online-screener",
  },
  "Screening & Evaluation": {
    action: "navigate",
    page: "screening-evaluation",
    path: "/services/evaluations-diagnosis/screening-evaluation",
  },
  "CAST Online Screener": { action: "navigate", page: "cast", path: "/cast" },
  "ADOS-2 Assessment": {
    action: "navigate",
    page: "screening-evaluation",
    path: "/services/evaluations-diagnosis/screening-evaluation",
    scrollTo: "ados-2-assessment",
  },
  "ADOS-2 Evaluations": {
    action: "navigate",
    page: "screening-evaluation",
    path: "/services/evaluations-diagnosis/screening-evaluation",
    scrollTo: "ados-2-assessment",
  },
  "IDE Evaluation": { action: "navigate", page: "ide-evaluation", path: "/autism-evaluation/ide-evaluation" },
  "Autism Screener FAQs": { action: "navigate", page: "autism-screener-faqs", path: "/autism-evaluation/autism-screener-faqs" },
  "Autism FAQs": { action: "navigate", page: "autism-screener-faqs", path: "/resources/faqs" },
  FAQs: { action: "navigate", page: "autism-screener-faqs", path: "/resources/faqs" },
  "School & IEP Evaluations": {
    action: "navigate",
    page: "ide-evaluation",
    path: "/autism-evaluation/ide-evaluation",
  },
  "Parent Guidance": { action: "navigate", page: "parent-guidance", path: "/autism-evaluation/parent-guidance" },
  "Parent Guides": { action: "navigate", page: "parent-training", path: "/aba-therapy/parent-training" },
  "Diagnostic Guidance": {
    action: "navigate",
    page: "screening-evaluation",
    path: "/services/evaluations-diagnosis/screening-evaluation",
  },
  "Assessment Process": {
    action: "navigate",
    page: "screening-evaluation",
    path: "/services/evaluations-diagnosis/screening-evaluation",
  },
  "Autism Diagnosis Resources": {
    action: "navigate",
    page: "autism-diagnosis-resources",
    path: "/resources/autism-diagnosis-resources",
  },
  "Autism Diagnosis Guide": {
    action: "navigate",
    page: "autism-diagnosis-resources",
    path: "/resources/autism-diagnosis-resources",
  },
  "Autism by Age & Development": {
    action: "navigate",
    page: "what-is-autism",
    path: "/resources/autism-by-age-development",
    scrollTo: "developmental-milestones",
  },
  "Parent Consultation": { action: "start" },
  "Insurance Support": { action: "navigate", page: "insurance-coverage" },
  "What is Autism?": { action: "navigate", page: "what-is-autism", path: "/resources/what-is-autism" },
  "What Is Autism?": { action: "navigate", page: "what-is-autism", path: "/resources/what-is-autism" },
  "Early Signs of Autism": {
    action: "navigate",
    page: "what-is-autism",
    path: "/resources/early-signs-of-autism",
    scrollTo: "early-signs-autism",
  },
  "What is ABA Therapy?": { action: "navigate", page: "aba-therapy", path: "/aba-therapy/what-is-aba-therapy" },
  "What Is ABA Therapy?": { action: "navigate", page: "aba-therapy", path: "/aba-therapy/what-is-aba-therapy" },
  "How ABA Therapy Works": {
    action: "navigate",
    page: "aba-therapy",
    path: "/aba-therapy/what-is-aba-therapy",
    scrollTo: "how-aba-therapy-works",
  },
  "ABA Success Stories": {
    action: "navigate",
    page: "outcomes-family-stories",
    path: "/resources/family-stories",
  },
  "What is ABA?": { action: "navigate", page: "aba-therapy", path: "/aba-therapy/what-is-aba-therapy" },
  "Parent Training": { action: "navigate", page: "parent-training", path: "/aba-therapy/parent-training" },
  "Family Training & Support": {
    action: "navigate",
    page: "parent-training",
    path: "/aba-therapy/parent-training",
  },
  "Insurance Coverage": {
    action: "navigate",
    page: "insurance-coverage",
    path: "/insurance-coverage",
  },
  "Find Diagnostic Support": {
    action: "navigate",
    page: "screening-evaluation",
    path: "/services/evaluations-diagnosis/screening-evaluation",
  },
  "Start Intake": { action: "navigate", page: "intake", path: "/intake" },
  "Schedule Consultation": {
    action: "navigate",
    page: "schedule-appointment",
    path: "/schedule-appointment",
  },
  "Schedule Appointment": {
    action: "navigate",
    page: "schedule-appointment",
    path: "/schedule-appointment",
  },
  "Blog & Articles": { action: "navigate", page: "resources-blog", path: "/resources/blog" },
  "Webinars & Videos": { action: "navigate", page: "resources-webinars", path: "/resources/webinars-videos" },
  "About Us": { action: "navigate", page: "about-us", path: "/about/our-story" },
  "Our Story": { action: "navigate", page: "about-us", path: "/about/our-story" },
  "Our Mission & Values": {
    action: "navigate",
    page: "about-mission-values",
    path: "/about/our-mission-values",
  },
  "Our Approach": {
    action: "navigate",
    page: "about-clinical-excellence",
    path: "/about/our-approach",
  },
  "Our Team": {
    action: "navigate",
    page: "about-leadership-team",
    path: "/about/our-team",
  },
  "Leadership Team": {
    action: "navigate",
    page: "about-leadership-team",
    path: "/about/our-team",
  },
  "Clinical Excellence": {
    action: "navigate",
    page: "about-clinical-excellence",
    path: "/about/our-approach",
  },
  "Clinical Quality": {
    action: "navigate",
    page: "about-clinical-quality",
    path: "/about/clinical-quality",
  },
  "Family-Centered Care": {
    action: "navigate",
    page: "family-centered-care",
    path: "/about-eden/family-centered-care",
  },
  "Community Impact": {
    action: "navigate",
    page: "about-community-impact",
    path: "/about/community-impact",
  },
  "Contact Us": { action: "navigate", page: "about-contact-us", path: "/about/contact-us" },
  Location: { action: "navigate", page: "locations", path: "/locations" },
  "View All Locations": { action: "navigate", page: "locations", path: "/locations" },
  Admissions: { action: "navigate", page: "admissions", path: "/aba-therapy/admissions" },
  "Admissions Information": { action: "navigate", page: "admissions", path: "/aba-therapy/admissions" },
  "Admissions Process": { action: "navigate", page: "admissions", path: "/aba-therapy/admissions" },
  "Getting Started with Eden": {
    action: "navigate",
    page: "getting-started-with-eden",
    path: "/getting-started",
  },
  "New Parent Checklist": {
    action: "navigate",
    page: "new-parent-checklist",
    path: "/resources/new-parent-checklist",
  },
  "Outcomes & Family Stories": {
    action: "navigate",
    page: "outcomes-family-stories",
    path: "/resources/family-stories",
  },
  "Center-Based ABA Therapy": {
    action: "navigate",
    page: "center-based-aba-therapy",
    path: "/service-settings/center-based-aba-therapy",
  },
  "Home-Based ABA Therapy": {
    action: "navigate",
    page: "home-based-aba-therapy",
    path: "/service-settings/home-based-aba-therapy",
  },
  "Community-Based ABA Therapy": {
    action: "navigate",
    page: "community-based-aba-therapy",
    path: "/service-settings/community-based-aba-therapy",
  },
  "School-Based ABA Therapy": {
    action: "navigate",
    page: "school-based-aba-therapy",
    path: "/services/school-based-aba-therapy",
  },
  "Virtual ABA Therapy": {
    action: "navigate",
    page: "virtual-aba-therapy",
    path: "/service-settings/virtual-aba-therapy",
  },
  "After School Programs": {
    action: "navigate",
    page: "afterschool-programs",
    path: "/service-settings/afterschool-programs",
  },
  "Liệu pháp ABA tại trung tâm": {
    action: "navigate",
    page: "center-based-aba-therapy",
    path: "/service-settings/center-based-aba-therapy",
  },
  "Liệu pháp ABA tại nhà": {
    action: "navigate",
    page: "home-based-aba-therapy",
    path: "/service-settings/home-based-aba-therapy",
  },
  "Liệu pháp ABA tại cộng đồng": {
    action: "navigate",
    page: "community-based-aba-therapy",
    path: "/service-settings/community-based-aba-therapy",
  },
  "Liệu pháp ABA trực tuyến": {
    action: "navigate",
    page: "virtual-aba-therapy",
    path: "/service-settings/virtual-aba-therapy",
  },
  "Start ABA Therapy": { action: "start" },
  "Intake Form": { action: "navigate", page: "intake", path: "/intake" },
  "Get Started": { action: "start" },
  "Search Open Roles": { action: "navigate", page: "careers-open-roles", path: "/careers/open-roles" },
  "Careers Home": { action: "navigate", page: "careers", path: "/careers" },
  "Why Eden ABA Therapy": { action: "navigate", page: "careers-why-eden", path: "/careers/why-eden" },
  "Why Eden": { action: "navigate", page: "careers-why-eden", path: "/careers/why-eden" },
  "Benefits & Perks": { action: "navigate", page: "careers-benefits", path: "/careers/benefits" },
  "Benefits & Compensation": {
    action: "navigate",
    page: "careers-benefits-compensation",
    path: "/careers/benefits-compensation",
  },
  Benefits: { action: "navigate", page: "careers-benefits", path: "/careers/benefits" },
  "Career Paths": { action: "navigate", page: "careers-career-paths", path: "/careers/career-paths" },
  "Career Growth Pathways": {
    action: "navigate",
    page: "careers-career-growth-pathways",
    path: "/careers/growth-pathways",
  },
  "Behavior Technician Careers (BT & RBT)": {
    action: "navigate",
    page: "careers-behavior-technician",
    path: "/careers/behavior-technician-rbt",
  },
  "Behavior Technician Careers": { action: "navigate", page: "careers-bt", path: "/careers/bt" },
  "RBT Careers": { action: "navigate", page: "careers-rbt", path: "/careers/rbt" },
  "BCBA Careers": { action: "navigate", page: "careers-bcba", path: "/careers/bcba" },
  "BCaBA Careers": { action: "navigate", page: "careers-bcaba", path: "/careers/bcaba" },
  "Parent Training & Family Support Roles": {
    action: "navigate",
    page: "careers-parent-training",
    path: "/careers/parent-training-roles",
  },
  "RBT Training Program": { action: "navigate", page: "careers-training", path: "/careers/training" },
  "BCBA Supervision Pathway": {
    action: "navigate",
    page: "careers-bcba-supervision",
    path: "/careers/bcba-supervision",
  },
  "Mentorship Program": { action: "navigate", page: "careers-mentorship", path: "/careers/mentorship" },
  "CEUs & Professional Development": {
    action: "navigate",
    page: "careers-professional-development",
    path: "/careers/professional-development",
  },
  "Hiring Process": { action: "navigate", page: "careers-hiring-process", path: "/careers/hiring-process" },
  "Resume Tips": { action: "navigate", page: "careers-resume-tips", path: "/careers/resume-tips" },
  "Career FAQs": { action: "navigate", page: "careers-faqs", path: "/careers/faqs" },
  "Talent Network": { action: "navigate", page: "careers-talent-network", path: "/careers/talent-network" },
  "Virginia ABA Careers": {
    action: "navigate",
    page: "careers-virginia-aba",
    path: "/careers/virginia-aba-careers",
  },
  "Life at Eden": { action: "navigate", page: "careers-life-at-eden", path: "/careers/life-at-eden" },
  "Interview Guide": { action: "navigate", page: "careers-interview-guide", path: "/careers/interview-guide" },
  "Career Resources": { action: "navigate", page: "careers-faqs", path: "/careers/faqs" },
};

/** Footer link labels (English) → routes. Display labels may be translated. */
export const FOOTER_LINK_ROUTES = {
  "Autism Diagnostic Support": {
    action: "navigate",
    page: "screening-evaluation",
    path: "/services/evaluations-diagnosis/screening-evaluation",
  },
  "About Autism": { action: "navigate", page: "what-is-autism", path: "/resources/what-is-autism" },
  "About ABA Therapy": { action: "navigate", page: "aba-therapy", path: "/aba-therapy/what-is-aba-therapy" },
  "Insurance Coverage": { action: "navigate", page: "insurance-coverage", path: "/insurance-coverage" },
  "Family Resources": { action: "navigate", page: "parent-guidance", path: "/autism-evaluation/parent-guidance" },
  "Get Started": { action: "navigate", page: "intake", path: "/intake" },
  "M-CHAT-R Screener": { action: "navigate", page: "m-chat-r", path: "/m-chat-r" },
  "CAST Screener": { action: "navigate", page: "cast", path: "/cast" },
  "ADOS-2 Evaluation": {
    action: "navigate",
    page: "screening-evaluation",
    path: "/services/evaluations-diagnosis/screening-evaluation",
    scrollTo: "ados-2-assessment",
  },
  "Caregiver Guides": { action: "navigate", page: "parent-guidance", path: "/autism-evaluation/parent-guidance" },
  "Blog & Articles": { action: "navigate", page: "resources-blog", path: "/resources/blog" },
  "Frequently Asked Questions": { action: "navigate", page: "autism-screener-faqs", path: "/resources/faqs" },
  "Open Positions": { action: "navigate", page: "careers-open-roles", path: "/careers/open-roles" },
  "Search Open Roles": { action: "navigate", page: "careers-open-roles", path: "/careers/open-roles" },
  "RBT Careers": { action: "navigate", page: "careers-rbt", path: "/careers/rbt" },
  "BCBA Careers": { action: "navigate", page: "careers-bcba", path: "/careers/bcba" },
  "Career Paths": { action: "navigate", page: "careers-career-paths", path: "/careers/career-paths" },
  "Career Growth Pathways": {
    action: "navigate",
    page: "careers-career-growth-pathways",
    path: "/careers/growth-pathways",
  },
  "Benefits & Compensation": {
    action: "navigate",
    page: "careers-benefits-compensation",
    path: "/careers/benefits-compensation",
  },
  "Life at Eden": { action: "navigate", page: "careers-life-at-eden", path: "/careers/life-at-eden" },
  "Talent Network": { action: "navigate", page: "careers-talent-network", path: "/careers/talent-network" },
  "Why Eden ABA Therapy": { action: "navigate", page: "careers-why-eden", path: "/careers/why-eden" },
  "Benefits & Perks": { action: "navigate", page: "careers-benefits", path: "/careers/benefits" },
  "Virginia ABA Careers": {
    action: "navigate",
    page: "careers-virginia-aba",
    path: "/careers/virginia-aba-careers",
  },
  "Interview Guide": { action: "navigate", page: "careers-interview-guide", path: "/careers/interview-guide" },
  "Privacy Policy": { action: "navigate", page: "privacy-policy", path: "/privacy-policy" },
  "Terms of Service": { action: "navigate", page: "terms-of-service", path: "/terms-of-service" },
  Accessibility: { action: "navigate", page: "accessibility", path: "/accessibility" },
  "Notice of Privacy Practices": {
    action: "navigate",
    page: "notice-of-privacy-practices",
    path: "/notice-of-privacy-practices",
  },
  "Contact Eden": { action: "navigate", page: "about-contact-us", path: "/contact" },
};

export function normalizeMenuLabel(label) {
  if (typeof label === "string") return label;
  if (label && typeof label === "object" && typeof label.label === "string") return label.label;
  return "";
}

export function resolveMenuLink(enLinkLabel) {
  const label = normalizeMenuLabel(enLinkLabel);
  if (!label) return null;

  const route = MENU_LINK_ROUTES[label];
  if (route) return route;
  if (label.includes("Evaluation") || label.includes("Admissions")) {
    return { action: "start" };
  }
  return null;
}

export function resolveFooterLink(enLinkLabel) {
  const label = normalizeMenuLabel(enLinkLabel);
  if (!label) return null;
  return FOOTER_LINK_ROUTES[label] || MENU_LINK_ROUTES[label] || null;
}

export function getFooterLinkHref(enLinkLabel) {
  const route = resolveFooterLink(enLinkLabel);
  if (!route) return "#";
  if (route.action === "start") return "/intake";
  return route.path ?? "#";
}

function dispatchRoute(route, { onNavigate, onStart }) {
  if (!route) return;

  if (route.action === "navigate") {
    onNavigate?.(route.page, { path: route.path, scrollTo: route.scrollTo });
    return;
  }

  if (route.action === "start") {
    onStart?.();
  }
}

export function handleMenuLink(enLinkLabel, { onNavigate, onStart }) {
  dispatchRoute(resolveMenuLink(enLinkLabel), { onNavigate, onStart });
}

export function handleFooterLink(enLinkLabel, { onNavigate, onStart }) {
  dispatchRoute(resolveFooterLink(enLinkLabel), { onNavigate, onStart });
}
