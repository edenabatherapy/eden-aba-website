/** Maps English menu link labels to in-app routes (language-independent). */
export const MENU_LINK_ROUTES = {
  "M-CHAT-R Online Screener": { action: "navigate", page: "m-chat-r", path: "/m-chat-r" },
  "Screening & Evaluation": { action: "navigate", page: "autism-assessment", path: "/autism-assessment" },
  "CAST Online Screener": { action: "navigate", page: "cast", path: "/cast" },
  "ADOS-2 Assessment": { action: "navigate", page: "ados-2-assessment", path: "/autism-evaluation/ados-2-assessment" },
  "ADOS-2 Evaluations": { action: "navigate", page: "ados-2-assessment", path: "/autism-evaluation/ados-2" },
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
  "Parent Guides": { action: "navigate", page: "parent-guidance", path: "/resources/parent-guides" },
  "Diagnostic Guidance": { action: "navigate", page: "autism-assessment", path: "/autism-assessment" },
  "Assessment Process": { action: "navigate", page: "autism-assessment", path: "/autism-evaluation/assessment-process" },
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
  "What is ABA Therapy?": { action: "navigate", page: "aba-therapy", path: "/resources/what-is-aba-therapy" },
  "What Is ABA Therapy?": { action: "navigate", page: "aba-therapy", path: "/resources/what-is-aba-therapy" },
  "How ABA Therapy Works": {
    action: "navigate",
    page: "aba-therapy",
    path: "/resources/how-aba-therapy-works",
    scrollTo: "how-aba-helps",
  },
  "ABA Success Stories": {
    action: "navigate",
    page: "outcomes-family-stories",
    path: "/resources/family-stories",
  },
  "What is ABA?": { action: "navigate", page: "aba-therapy", path: "/resources/what-is-aba-therapy" },
  "Parent Training": { action: "navigate", page: "parent-training", path: "/resources/parent-training" },
  "Family Training & Support": {
    action: "navigate",
    page: "parent-training",
    path: "/resources/family-training-support",
  },
  "Insurance Coverage": {
    action: "navigate",
    page: "insurance-coverage",
    path: "/insurance-coverage",
  },
  "Find Diagnostic Support": { action: "navigate", page: "autism-assessment", path: "/autism-assessment" },
  "Start Intake": { action: "navigate", page: "intake", path: "/intake" },
  "Schedule Consultation": { action: "navigate", page: "schedule-appointment" },
  "Schedule Appointment": {
    action: "navigate",
    page: "schedule-appointment",
    path: "/schedule-appointment",
  },
  "Blog & Articles": { action: "navigate", page: "resources-blog", path: "/resources/blog" },
  "Webinars & Videos": { action: "navigate", page: "resources-webinars", path: "/resources/webinars-videos" },
  "About Us": { action: "navigate", page: "about-us", path: "/about-eden/our-story" },
  "Our Story": { action: "navigate", page: "about-us", path: "/about-eden/our-story" },
  "Our Mission & Values": {
    action: "navigate",
    page: "about-mission-values",
    path: "/about-eden/mission-values",
  },
  "Leadership Team": {
    action: "navigate",
    page: "about-leadership-team",
    path: "/about-eden/leadership-team",
  },
  "Clinical Excellence": {
    action: "navigate",
    page: "about-clinical-excellence",
    path: "/about-eden/clinical-excellence",
  },
  "Our Team": { action: "navigate", page: "about-leadership-team", path: "/about-eden/leadership-team" },
  "Clinical Quality": {
    action: "navigate",
    page: "about-clinical-excellence",
    path: "/about-eden/clinical-excellence",
  },
  "Family-Centered Care": {
    action: "navigate",
    page: "family-centered-care",
    path: "/about-eden/family-centered-care",
  },
  "Community Impact": {
    action: "navigate",
    page: "community-impact",
    path: "/about-eden/community-impact",
  },
  "Contact Us": { action: "navigate", page: "intake", path: "/intake" },
  "View All Locations": { action: "navigate", page: "locations" },
  Admissions: { action: "navigate", page: "admissions", path: "/aba-therapy/admissions" },
  "Admissions Information": { action: "navigate", page: "admissions", path: "/aba-therapy/admissions" },
  "Admissions Process": { action: "navigate", page: "admissions", path: "/aba-therapy/admissions" },
  "Getting Started with Eden": {
    action: "navigate",
    page: "admissions",
    path: "/resources/getting-started-with-eden",
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
  "School-Based ABA Therapy": { action: "navigate", page: "aba-therapy", path: "/resources/what-is-aba-therapy" },
  "Virtual ABA Therapy": {
    action: "navigate",
    page: "virtual-aba-therapy",
    path: "/service-settings/virtual-aba-therapy",
  },
  "Afterschool Programs": {
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
  "Search Open Roles": { action: "navigate", page: "careers", path: "/careers" },
  "RBT Careers": { action: "navigate", page: "careers-rbt", path: "/careers/rbt" },
  "BCBA Careers": { action: "navigate", page: "careers-bcba", path: "/careers/bcba" },
  "Life at Eden": { action: "navigate", page: "careers-life-at-eden", path: "/careers/life-at-eden" },
  "Interview Guide": { action: "navigate", page: "careers-interview-guide", path: "/careers/interview-guide" },
  "Career Resources": { action: "navigate", page: "careers-resources", path: "/careers/resources" },
};

/** Footer link labels (English) → routes. Display labels may be translated. */
export const FOOTER_LINK_ROUTES = {
  "Autism Diagnostic Support": { action: "navigate", page: "autism-assessment", path: "/autism-assessment" },
  "About Autism": { action: "navigate", page: "what-is-autism", path: "/resources/what-is-autism" },
  "About ABA Therapy": { action: "navigate", page: "aba-therapy", path: "/resources/what-is-aba-therapy" },
  "Insurance Coverage": { action: "navigate", page: "insurance-coverage", path: "/insurance-coverage" },
  "Family Resources": { action: "navigate", page: "parent-guidance", path: "/resources/parent-guides" },
  "Get Started": { action: "navigate", page: "intake", path: "/intake" },
  "M-CHAT-R Screener": { action: "navigate", page: "m-chat-r", path: "/m-chat-r" },
  "CAST Screener": { action: "navigate", page: "cast", path: "/cast" },
  "ADOS-2 Evaluation": { action: "navigate", page: "ados-2-assessment", path: "/autism-evaluation/ados-2" },
  "Caregiver Guides": { action: "navigate", page: "parent-guidance", path: "/resources/parent-guides" },
  "Blog & Articles": { action: "navigate", page: "resources-blog", path: "/resources/blog" },
  "Frequently Asked Questions": { action: "navigate", page: "autism-screener-faqs", path: "/resources/faqs" },
  "Open Positions": { action: "navigate", page: "careers", path: "/careers" },
  "RBT Careers": { action: "navigate", page: "careers-rbt", path: "/careers/rbt" },
  "BCBA Careers": { action: "navigate", page: "careers-bcba", path: "/careers/bcba" },
  "Clinical Leadership": {
    action: "navigate",
    page: "about-leadership-team",
    path: "/about-eden/leadership-team",
  },
  "Interview Guide": { action: "navigate", page: "careers-interview-guide", path: "/careers/interview-guide" },
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
