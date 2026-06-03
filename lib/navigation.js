/** Maps English menu link labels to in-app routes (language-independent). */
export const MENU_LINK_ROUTES = {
  "M-CHAT-R Online Screener": { action: "navigate", page: "m-chat-r-online-screener", path: "/m-chat-r-online-screener" },
  "CAST Online Screener": { action: "navigate", page: "cast-online-screener", path: "/autism-evaluation/cast-online-screener" },
  "ADOS-2 Assessment": { action: "navigate", page: "ados-2-assessment", path: "/autism-evaluation/ados-2-assessment" },
  "IDE Evaluation": { action: "navigate", page: "ide-evaluation", path: "/autism-evaluation/ide-evaluation" },
  "Autism Screener FAQs": { action: "navigate", page: "autism-screener-faqs", path: "/autism-evaluation/autism-screener-faqs" },
  "Parent Guidance": { action: "navigate", page: "parent-guidance", path: "/autism-evaluation/parent-guidance" },
  "Diagnostic Guidance": { action: "navigate", page: "autism-assessment", path: "/autism-assessment" },
  "Parent Consultation": { action: "start" },
  "Insurance Support": { action: "navigate", page: "insurance-coverage" },
  "What is Autism?": { action: "navigate", page: "what-is-autism", path: "/what-is-autism" },
  "What is ABA Therapy?": { action: "navigate", page: "aba-therapy" },
  "What is ABA?": { action: "navigate", page: "aba-therapy" },
  "Insurance Coverage": { action: "navigate", page: "insurance-coverage" },
  "About Us": { action: "navigate", page: "about-us" },
  "Contact Us": { action: "start" },
  "View All Locations": { action: "navigate", page: "locations" },
  "Admissions Information": { action: "start" },
  "Start ABA Therapy": { action: "start" },
  "Get Started": { action: "start" },
};

export function resolveMenuLink(enLinkLabel) {
  const route = MENU_LINK_ROUTES[enLinkLabel];
  if (route) return route;
  if (enLinkLabel.includes("Evaluation") || enLinkLabel.includes("Admissions")) {
    return { action: "start" };
  }
  return null;
}

export function handleMenuLink(enLinkLabel, { onNavigate, onStart }) {
  const route = resolveMenuLink(enLinkLabel);
  if (!route) return;

  if (route.action === "navigate") {
    onNavigate?.(route.page);
    return;
  }

  if (route.action === "start") {
    onStart?.();
  }
}
