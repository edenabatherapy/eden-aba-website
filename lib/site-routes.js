/** Path ↔ in-app page slug mapping for Eden ABA SPA routing. */
export const PATH_PAGE_ROUTES = {
  "/what-is-autism": "what-is-autism",
  "/m-chat-r-online-screener": "m-chat-r-online-screener",
  "/autism-assessment": "autism-assessment",
  "/autism-evaluation/cast-online-screener": "cast-online-screener",
  "/autism-evaluation/ados-2-assessment": "ados-2-assessment",
  "/autism-evaluation/ide-evaluation": "ide-evaluation",
  "/autism-evaluation/autism-screener-faqs": "autism-screener-faqs",
  "/autism-evaluation/parent-guidance": "parent-guidance",
};

export const PAGE_PATH_ROUTES = Object.fromEntries(
  Object.entries(PATH_PAGE_ROUTES).map(([path, page]) => [page, path]),
);

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

export const KNOWN_PAGES = new Set([...PATH_BASED_PAGES, ...HASH_PAGES]);

export function resolvePathPage(pathname = "") {
  return PATH_PAGE_ROUTES[pathname] || "";
}

export function getPagePath(page) {
  return PAGE_PATH_ROUTES[page] || "";
}

export function resolveActivePage({ pathname, hash, eventDetail } = {}) {
  const pathPage = resolvePathPage(pathname);
  if (pathPage) return pathPage;

  const hashPage = (hash || "").replace("#", "");
  if (hashPage && KNOWN_PAGES.has(hashPage)) return hashPage;

  if (eventDetail && KNOWN_PAGES.has(eventDetail)) return eventDetail;

  return "home";
}
