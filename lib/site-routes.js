/** Path ↔ in-app page slug mapping for Eden ABA SPA routing. */
export const PATH_PAGE_ROUTES = {
  "/what-is-autism": "what-is-autism",
  "/resources/what-is-autism": "what-is-autism",
  "/resources/early-signs-of-autism": "what-is-autism",
  "/resources/what-is-aba-therapy": "aba-therapy",
  "/aba-therapy/what-is-aba-therapy": "aba-therapy",
  "/aba-therapy/how-aba-therapy-works": "aba-therapy",
  "/aba-therapy/parent-training": "parent-training",
  "/resources/parent-training": "parent-training",
  "/resources/family-training-support": "parent-training",
  "/resources/parent-guides": "parent-training",
  "/resources/autism-diagnosis-resources": "autism-diagnosis-resources",
  "/resources/autism-by-age-development": "what-is-autism",
  "/resources/how-aba-therapy-works": "aba-therapy",
  "/resources/getting-started-with-eden": "getting-started-with-eden",
  "/getting-started": "getting-started-with-eden",
  "/resources/new-parent-checklist": "new-parent-checklist",
  "/resources/faqs": "autism-screener-faqs",
  "/resources/blog": "resources-blog",
  "/resources/webinars-videos": "resources-webinars",
  "/resources/family-stories": "outcomes-family-stories",
  "/services/evaluations-diagnosis/screening-evaluation": "screening-evaluation",
  "/services/evaluations-diagnosis/m-chat-r-online-screener": "screening-evaluation",
  "/services/evaluations-diagnosis/ados-2-assessment": "screening-evaluation",
  "/m-chat-r": "m-chat-r",
  "/cast": "cast",
  "/m-chat-r-online-screener": "screening-evaluation",
  "/autism-assessment": "screening-evaluation",
  "/autism-evaluation/cast-online-screener": "cast",
  "/autism-evaluation/ados-2-assessment": "screening-evaluation",
  "/autism-evaluation/ados-2": "screening-evaluation",
  "/autism-evaluation/assessment-process": "screening-evaluation",
  "/autism-evaluation/ide-evaluation": "ide-evaluation",
  "/autism-evaluation/autism-screener-faqs": "autism-screener-faqs",
  "/autism-evaluation/parent-guidance": "parent-guidance",
  "/aba-therapy/admissions": "admissions",
  "/aba-therapy/outcomes-family-stories": "outcomes-family-stories",
  "/services/school-based-aba-therapy": "school-based-aba-therapy",
  "/service-settings/center-based-aba-therapy": "center-based-aba-therapy",
  "/service-settings/home-based-aba-therapy": "home-based-aba-therapy",
  "/service-settings/community-based-aba-therapy": "community-based-aba-therapy",
  "/service-settings/virtual-aba-therapy": "virtual-aba-therapy",
  "/service-settings/afterschool-programs": "afterschool-programs",
  "/intake": "intake",
  "/schedule-appointment": "schedule-appointment",
  "/insurance-coverage": "insurance-coverage",
  "/contact": "intake",
  "/about": "about-us",
  "/about/our-story": "about-us",
  "/about-eden/our-story": "about-us",
  "/about/our-mission-values": "about-mission-values",
  "/about/our-approach": "about-clinical-excellence",
  "/about/our-team": "about-leadership-team",
  "/about/clinical-quality": "about-clinical-quality",
  "/about/community-impact": "about-community-impact",
  "/about/contact-us": "about-contact-us",
  "/about-eden/mission-values": "about-mission-values",
  "/about-eden/leadership-team": "about-leadership-team",
  "/about-eden/clinical-excellence": "about-clinical-excellence",
  "/about-eden/family-centered-care": "family-centered-care",
  "/about-eden/community-impact": "community-impact",
  "/careers": "careers",
  "/careers/open-roles": "careers-open-roles",
  "/careers/saved-jobs": "careers-saved-jobs",
  "/careers/why-eden": "careers-why-eden",
  "/careers/benefits": "careers-benefits",
  "/careers/benefits-compensation": "careers-benefits-compensation",
  "/careers/career-paths": "careers-career-paths",
  "/careers/career-growth-pathways": "careers-career-growth-pathways",
  "/careers/bt": "careers-bt",
  "/careers/rbt": "careers-rbt",
  "/careers/behavior-technician-careers": "careers-behavior-technician",
  "/careers/bcba": "careers-bcba",
  "/careers/bcaba": "careers-bcaba",
  "/careers/clinical-leadership": "careers-clinical-leadership",
  "/careers/training": "careers-training",
  "/careers/bcba-supervision": "careers-bcba-supervision",
  "/careers/mentorship": "careers-mentorship",
  "/careers/professional-development": "careers-professional-development",
  "/careers/hiring-process": "careers-hiring-process",
  "/careers/resume-tips": "careers-resume-tips",
  "/careers/faqs": "careers-faqs",
  "/careers/talent-network": "careers-talent-network",
  "/careers/virginia-aba-careers": "careers-virginia-aba",
  "/careers/compliance-care-standards": "careers-compliance",
  "/careers/life-at-eden": "careers-life-at-eden",
  "/careers/interview-guide": "careers-interview-guide",
  "/locations": "locations",
  "/locations/annandale-va": "locations",
  "/privacy-policy": "privacy-policy",
};

const CANONICAL_PAGE_PATHS = {
  "m-chat-r": "/m-chat-r",
  cast: "/cast",
  "what-is-autism": "/resources/what-is-autism",
  "aba-therapy": "/aba-therapy/what-is-aba-therapy",
  "parent-guidance": "/autism-evaluation/parent-guidance",
  "parent-training": "/aba-therapy/parent-training",
  "screening-evaluation": "/services/evaluations-diagnosis/screening-evaluation",
  "school-based-aba-therapy": "/services/school-based-aba-therapy",
  "ados-2-assessment": "/services/evaluations-diagnosis/screening-evaluation",
  "autism-assessment": "/services/evaluations-diagnosis/screening-evaluation",
  "autism-screener-faqs": "/resources/faqs",
  "outcomes-family-stories": "/resources/family-stories",
  "about-us": "/about/our-story",
  "about-mission-values": "/about/our-mission-values",
  "about-clinical-excellence": "/about/our-approach",
  "about-leadership-team": "/about/our-team",
  "about-clinical-quality": "/about/clinical-quality",
  "about-community-impact": "/about/community-impact",
  "about-contact-us": "/about/contact-us",
  locations: "/locations",
};

export const PAGE_PATH_ROUTES = {
  ...Object.fromEntries(
    Object.entries(PATH_PAGE_ROUTES)
      .filter(([, page]) => !(page in CANONICAL_PAGE_PATHS))
      .map(([path, page]) => [page, path]),
  ),
  ...CANONICAL_PAGE_PATHS,
};

export const PATH_BASED_PAGES = new Set(Object.values(PATH_PAGE_ROUTES));

/** Hash-only routes (no dedicated pathname). */
export const HASH_PAGES = new Set([
  "locations",
  "aba-therapy",
  "about-us",
  "intake",
  "schedule-appointment",
  "insurance-coverage",
  "home",
]);

export const KNOWN_PAGES = new Set([
  ...PATH_BASED_PAGES,
  ...HASH_PAGES,
  "screening-evaluation",
  "school-based-aba-therapy",
  "parent-training",
  "autism-diagnosis-resources",
  "getting-started-with-eden",
  "new-parent-checklist",
  "afterschool-programs",
  "resources-blog",
  "resources-webinars",
  "family-centered-care",
  "community-impact",
  "about-mission-values",
  "about-leadership-team",
  "about-clinical-excellence",
  "about-clinical-quality",
  "about-community-impact",
  "about-contact-us",
  "careers",
  "careers-saved-jobs",
  "careers-rbt",
  "careers-bcba",
  "careers-life-at-eden",
  "careers-interview-guide",
  "careers-resources",
]);

export function resolvePathPage(pathname = "") {
  return PATH_PAGE_ROUTES[pathname] || "";
}

export function getPagePath(page) {
  return PAGE_PATH_ROUTES[page] || "";
}

/** Updates the browser URL for an in-app page without reloading. */
export function applyPageToBrowserUrl(page, { pathOverride, scrollTo } = {}) {
  if (typeof window === "undefined") return;

  const path = pathOverride ?? getPagePath(page);
  const destination = scrollTo && path ? `${path}#${scrollTo}` : path;

  if (path === "/about/our-story" || path === "/about") {
    window.location.assign("/about/our-story");
    return;
  }

  if (
    destination?.startsWith("/about/") ||
    destination?.startsWith("/careers") ||
    destination?.startsWith("/aba-therapy/") ||
    destination?.startsWith("/services/") ||
    destination === "/getting-started"
  ) {
    window.location.assign(destination);
    return;
  }

  if (destination) {
    window.history.pushState(null, "", destination);
    return;
  }

  if (page === "home") {
    window.history.pushState(null, "", "/");
    return;
  }

  if (HASH_PAGES.has(page)) {
    window.history.pushState(null, "", `/#${page}`);
    return;
  }

  window.location.hash = page;
}

export function resolveActivePage({ pathname, hash, eventDetail } = {}) {
  const hashPage = (hash || "").replace("#", "");
  if (hashPage === "insurance-coverage") return "insurance-coverage";

  if (eventDetail && KNOWN_PAGES.has(eventDetail)) return eventDetail;

  // Hash-only routes (e.g. #locations) must win over pathname so "Find care" works
  // from path-based pages like /aba-therapy/admissions.
  if (hashPage && HASH_PAGES.has(hashPage)) return hashPage;

  const pathPage = resolvePathPage(pathname);
  if (pathPage) return pathPage;

  if (hashPage && KNOWN_PAGES.has(hashPage)) return hashPage;

  return "home";
}
