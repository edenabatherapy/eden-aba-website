import type { CareerMeaningAnimationType } from "@/components/CareerMeaningAnimation";

export type CareersMegaMenuIcon =
  | "search"
  | "users"
  | "graduation-cap"
  | "gift"
  | "heart"
  | "route";

export type CareersPreviewPanel = {
  categoryLabel: string;
  headline: string;
  description: string;
  cta: string;
  animationType: CareerMeaningAnimationType;
  ctaHref: string;
};

export type CareersMenuItem = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: CareersMegaMenuIcon;
  activePaths?: string[];
  preview: CareersPreviewPanel;
};

/** @deprecated Use CareersMenuItem */
export type CareersMegaMenuLink = {
  label: string;
  href: string;
  subtitle?: string;
  icon?: CareersMegaMenuIcon;
  activePaths?: string[];
};

/** @deprecated */
export type CareersMegaMenuColumn = {
  items: CareersMegaMenuLink[];
};

export const CAREERS_HOME_PATH = "/careers";
export const CAREERS_OPEN_ROLES_PATH = "/careers/open-roles";
export const BEHAVIOR_TECHNICIAN_CAREERS_PATH = "/careers/behavior-technician-rbt";
export const BCBA_CAREERS_PATH = "/careers/bcba";
export const BENEFITS_COMPENSATION_PATH = "/careers/benefits-compensation";
export const LIFE_AT_EDEN_PATH = "/careers/life-at-eden";
export const CAREER_GROWTH_PATHWAYS_PATH = "/careers/growth-pathways";

export const CAREERS_MEGA_MENU_LABEL = "CAREERS";
export const CAREERS_BRAND_TITLE = "Eden ABA Therapy";

export const CAREERS_DEFAULT_PREVIEW: CareersPreviewPanel = {
  categoryLabel: "RESOURCES",
  headline: "Helpful tools for every step",
  description:
    "Explore our guides, articles, and resources to support your autism journey.",
  cta: "Explore resources →",
  animationType: "career-resources",
  ctaHref: "/resources/getting-started",
};

export const CAREERS_MENU_ITEMS: CareersMenuItem[] = [
  {
    id: "open-roles",
    label: "Search Open Roles",
    description: "Find current ABA therapy and clinical career opportunities.",
    href: CAREERS_OPEN_ROLES_PATH,
    icon: "search",
    preview: {
      categoryLabel: "CAREERS",
      headline: "Find your next role at Eden",
      description:
        "Search open positions across clinical, administrative, and support roles.",
      cta: "Search open roles →",
      animationType: "search-roles",
      ctaHref: CAREERS_OPEN_ROLES_PATH,
    },
  },
  {
    id: "behavior-technician-rbt",
    label: "Behavior Technician Careers (BT & RBT)",
    description: "Entry-level and certified ABA therapy careers.",
    href: BEHAVIOR_TECHNICIAN_CAREERS_PATH,
    icon: "users",
    activePaths: [
      "/careers/behavior-technician-careers",
      "/careers/bt",
      "/careers/rbt",
    ],
    preview: {
      categoryLabel: "BT & RBT CAREERS",
      headline: "Start or grow your ABA career",
      description:
        "Explore entry-level Behavior Technician roles and RBT opportunities supporting children and families.",
      cta: "Explore BT & RBT careers →",
      animationType: "rbt",
      ctaHref: BEHAVIOR_TECHNICIAN_CAREERS_PATH,
    },
  },
  {
    id: "bcba",
    label: "BCBA Careers",
    description: "Clinical leadership, supervision, and behavior analyst opportunities.",
    href: BCBA_CAREERS_PATH,
    icon: "graduation-cap",
    preview: {
      categoryLabel: "BCBA CAREERS",
      headline: "Lead clinical care with purpose",
      description:
        "Join Eden as a BCBA and support treatment planning, supervision, parent training, and meaningful child progress.",
      cta: "Explore BCBA careers →",
      animationType: "bcba",
      ctaHref: BCBA_CAREERS_PATH,
    },
  },
  {
    id: "benefits-compensation",
    label: "Benefits & Compensation",
    description: "Pay, benefits, and professional support.",
    href: BENEFITS_COMPENSATION_PATH,
    icon: "gift",
    activePaths: ["/careers/benefits"],
    preview: {
      categoryLabel: "BENEFITS",
      headline: "Support for the people who support families",
      description:
        "Learn about pay, benefits, scheduling support, training, mentorship, and professional development.",
      cta: "View benefits →",
      animationType: "careers",
      ctaHref: BENEFITS_COMPENSATION_PATH,
    },
  },
  {
    id: "life-at-eden",
    label: "Life at Eden",
    description: "Culture, mentorship, and team experience.",
    href: LIFE_AT_EDEN_PATH,
    icon: "heart",
    preview: {
      categoryLabel: "LIFE AT EDEN",
      headline: "A culture built on compassion and growth",
      description:
        "See how Eden supports team collaboration, mentorship, clinical excellence, and a family-centered mission.",
      cta: "Explore life at Eden →",
      animationType: "life-at-eden",
      ctaHref: LIFE_AT_EDEN_PATH,
    },
  },
  {
    id: "growth-pathways",
    label: "Career Growth Pathways",
    description: "BT → RBT → BCBA development.",
    href: CAREER_GROWTH_PATHWAYS_PATH,
    icon: "route",
    activePaths: ["/careers/career-growth-pathways", "/careers/career-paths"],
    preview: {
      categoryLabel: "CAREER GROWTH",
      headline: "Grow from BT to RBT to BCBA",
      description:
        "Discover Eden's career pathway for behavior technicians, RBTs, students, and future behavior analysts.",
      cta: "View growth pathways →",
      animationType: "career-resources",
      ctaHref: CAREER_GROWTH_PATHWAYS_PATH,
    },
  },
];

/** @deprecated Legacy column layout — kept for compatibility */
export const CAREERS_MEGA_MENU_COLUMNS: CareersMegaMenuColumn[] = [
  {
    items: CAREERS_MENU_ITEMS.slice(0, 3).map((item) => ({
      label: item.label,
      href: item.href,
      subtitle: item.description,
      icon: item.icon,
      activePaths: item.activePaths,
    })),
  },
  {
    items: CAREERS_MENU_ITEMS.slice(3).map((item) => ({
      label: item.label,
      href: item.href,
      subtitle: item.description,
      icon: item.icon,
      activePaths: item.activePaths,
    })),
  },
];

/** Flat list of all mega menu links (mobile / utilities). */
export const CAREERS_MEGA_MENU_LINKS: CareersMegaMenuLink[] = CAREERS_MENU_ITEMS.map((item) => ({
  label: item.label,
  href: item.href,
  subtitle: item.description,
  icon: item.icon,
  activePaths: item.activePaths,
}));
