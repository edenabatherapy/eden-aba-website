/** Path ↔ in-app page slug mapping for Eden ABA SPA routing. */
export const PATH_PAGE_ROUTES = {
  "/what-is-autism": "what-is-autism",
  "/resources/what-is-autism": "what-is-autism",
  "/resources/early-signs-of-autism": "what-is-autism",
  "/resources/what-is-aba-therapy": "aba-therapy",
  "/resources/parent-guides": "parent-guidance",
  "/resources/parent-training": "parent-training",
  "/resources/family-training-support": "parent-training",
  "/resources/autism-diagnosis-resources": "autism-diagnosis-resources",
  "/resources/autism-by-age-development": "what-is-autism",
  "/resources/how-aba-therapy-works": "aba-therapy",
  "/resources/getting-started-with-eden": "admissions",
  "/resources/new-parent-checklist": "new-parent-checklist",
  "/resources/faqs": "autism-screener-faqs",
  "/resources/blog": "resources-blog",
  "/resources/webinars-videos": "resources-webinars",
  "/resources/family-stories": "outcomes-family-stories",
  "/m-chat-r": "m-chat-r",
  "/cast": "cast",
  "/m-chat-r-online-screener": "m-chat-r",
  "/autism-assessment": "autism-assessment",
  "/autism-evaluation/cast-online-screener": "cast",
  "/autism-evaluation/ados-2-assessment": "ados-2-assessment",
  "/autism-evaluation/ados-2": "ados-2-assessment",
  "/autism-evaluation/assessment-process": "autism-assessment",
  "/autism-evaluation/ide-evaluation": "ide-evaluation",
  "/autism-evaluation/autism-screener-faqs": "autism-screener-faqs",
  "/autism-evaluation/parent-guidance": "parent-guidance",
  "/aba-therapy/admissions": "admissions",
  "/aba-therapy/outcomes-family-stories": "outcomes-family-stories",
  "/service-settings/center-based-aba-therapy": "center-based-aba-therapy",
  "/service-settings/home-based-aba-therapy": "home-based-aba-therapy",
  "/service-settings/community-based-aba-therapy": "community-based-aba-therapy",
  "/service-settings/virtual-aba-therapy": "virtual-aba-therapy",
  "/service-settings/afterschool-programs": "afterschool-programs",
  "/intake": "intake",
  "/schedule-appointment": "schedule-appointment",
  "/insurance-coverage": "insurance-coverage",
  "/contact": "intake",
  "/about-eden/our-story": "about-us",
  "/about-eden/mission-values": "about-mission-values",
  "/about-eden/leadership-team": "about-leadership-team",
  "/about-eden/clinical-excellence": "about-clinical-excellence",
  "/about-eden/family-centered-care": "family-centered-care",
  "/about-eden/community-impact": "community-impact",
  "/careers": "careers",
  "/careers/rbt": "careers-rbt",
  "/careers/bcba": "careers-bcba",
  "/careers/life-at-eden": "careers-life-at-eden",
  "/careers/interview-guide": "careers-interview-guide",
  "/careers/resources": "careers-resources",
};

const CANONICAL_PAGE_PATHS = {
  "m-chat-r": "/m-chat-r",
  cast: "/cast",
  "what-is-autism": "/resources/what-is-autism",
  "aba-therapy": "/resources/what-is-aba-therapy",
  "parent-guidance": "/resources/parent-guides",
  "ados-2-assessment": "/autism-evaluation/ados-2",
  "autism-screener-faqs": "/resources/faqs",
  "outcomes-family-stories": "/resources/family-stories",
  "about-us": "/about-eden/our-story",
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
  "parent-training",
  "autism-diagnosis-resources",
  "new-parent-checklist",
  "afterschool-programs",
  "resources-blog",
  "resources-webinars",
  "family-centered-care",
  "community-impact",
  "about-mission-values",
  "about-leadership-team",
  "about-clinical-excellence",
  "careers",
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
export function applyPageToBrowserUrl(page, { pathOverride } = {}) {
  if (typeof window === "undefined") return;

  const path = pathOverride ?? getPagePath(page);
  if (path) {
    window.history.pushState(null, "", path);
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
