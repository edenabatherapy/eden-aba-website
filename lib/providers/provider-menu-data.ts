import { CENTRALREACH_LOGIN_URL, PROVIDER_HUB_SECTION_IDS } from "@/lib/providers/provider-content";

export type ProvidersMegaMenuIcon =
  | "user-plus"
  | "layout-grid"
  | "log-in"
  | "route"
  | "handshake"
  | "screening"
  | "insurance";

export type ProvidersPreviewPanel = {
  categoryLabel: string;
  headline: string;
  description: string;
  cta: string;
  ctaHref: string;
};

export type ProvidersMenuItem = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: ProvidersMegaMenuIcon;
  external?: boolean;
  activePaths?: string[];
  preview: ProvidersPreviewPanel;
};

export const PROVIDERS_HOME_PATH = "/providers";
export const PROVIDERS_REFER_CHILD_PATH = "/providers/refer-a-child";
export const PROVIDERS_REFERRAL_PROCESS_PATH = "/providers/referral-process";
export const PROVIDERS_CLINICAL_COLLAB_PATH = "/providers/clinical-collaboration";
export const PROVIDERS_SCREENING_ANCHOR = `/providers#${PROVIDER_HUB_SECTION_IDS.screening}`;
export const PROVIDERS_INSURANCE_ANCHOR = `/providers#${PROVIDER_HUB_SECTION_IDS.insurance}`;

export const PROVIDERS_MEGA_MENU_LABEL = "FOR PROVIDERS";
export const PROVIDERS_MEGA_MENU_TAGLINE =
  "Professional referral resources for Northern Virginia partners";

export const PROVIDERS_DEFAULT_PREVIEW: ProvidersPreviewPanel = {
  categoryLabel: "PROVIDER PARTNERSHIPS",
  headline: "Refer a child to Eden ABA Therapy",
  description:
    "Partner with Eden to help families access compassionate, evidence-informed ABA services with HIPAA-conscious coordination when appropriate.",
  cta: "Explore provider resources →",
  ctaHref: PROVIDERS_HOME_PATH,
};

export const PROVIDERS_MENU_ITEMS: ProvidersMenuItem[] = [
  {
    id: "refer-a-child",
    label: "Refer a Child",
    description: "Submit a professional referral or share family contact details.",
    href: PROVIDERS_REFER_CHILD_PATH,
    icon: "user-plus",
    activePaths: [PROVIDERS_REFER_CHILD_PATH],
    preview: {
      categoryLabel: "REFERRALS",
      headline: "Make a professional referral",
      description:
        "Share referral details by phone, fax, email, or Eden's provider referral form when families may benefit from ABA services.",
      cta: "Refer a child →",
      ctaHref: PROVIDERS_REFER_CHILD_PATH,
    },
  },
  {
    id: "referral-portal",
    label: "Provider Referral Portal",
    description: "Access Eden's referral entry point and secure contact options.",
    href: PROVIDERS_REFER_CHILD_PATH,
    icon: "layout-grid",
    activePaths: [PROVIDERS_REFER_CHILD_PATH],
    preview: {
      categoryLabel: "REFERRAL PORTAL",
      headline: "Provider referral entry point",
      description:
        "Use Eden's referral portal to share authorized patient information and connect families with intake support.",
      cta: "Open referral portal →",
      ctaHref: PROVIDERS_REFER_CHILD_PATH,
    },
  },
  {
    id: "centralreach",
    label: "CentralReach Staff Login",
    description: "Authorized Eden staff access to CentralReach Essentials.",
    href: CENTRALREACH_LOGIN_URL,
    icon: "log-in",
    external: true,
    preview: {
      categoryLabel: "STAFF ACCESS",
      headline: "CentralReach Staff Login",
      description:
        "Authorized Eden ABA Therapy staff may sign in to CentralReach Essentials for clinical and operational workflows.",
      cta: "CentralReach Staff Login →",
      ctaHref: CENTRALREACH_LOGIN_URL,
    },
  },
  {
    id: "referral-process",
    label: "Referral Process",
    description: "Review intake workflow from referral receipt through care planning.",
    href: PROVIDERS_REFERRAL_PROCESS_PATH,
    icon: "route",
    activePaths: [PROVIDERS_REFERRAL_PROCESS_PATH],
    preview: {
      categoryLabel: "REFERRAL WORKFLOW",
      headline: "What happens after you refer",
      description:
        "See how Eden may acknowledge referrals, contact families, review eligibility, and begin intake based on clinical review.",
      cta: "View referral process →",
      ctaHref: PROVIDERS_REFERRAL_PROCESS_PATH,
    },
  },
  {
    id: "clinical-collaboration",
    label: "Clinical Collaboration",
    description: "Care coordination with referring providers when appropriate and with consent.",
    href: PROVIDERS_CLINICAL_COLLAB_PATH,
    icon: "handshake",
    activePaths: [PROVIDERS_CLINICAL_COLLAB_PATH],
    preview: {
      categoryLabel: "COLLABORATION",
      headline: "Coordinate care with Eden",
      description:
        "Learn how Eden may support HIPAA-conscious communication and interdisciplinary alignment when authorized.",
      cta: "Clinical collaboration →",
      ctaHref: PROVIDERS_CLINICAL_COLLAB_PATH,
    },
  },
  {
    id: "autism-screening",
    label: "Autism Screening Support",
    description: "Screening history review and evaluation pathway guidance for referred families.",
    href: PROVIDERS_SCREENING_ANCHOR,
    icon: "screening",
    activePaths: [PROVIDERS_HOME_PATH],
    preview: {
      categoryLabel: "SCREENING SUPPORT",
      headline: "Support families after screening",
      description:
        "Eden may discuss screening history and evaluation next steps. Diagnosis is not guaranteed and depends on clinical review.",
      cta: "Autism screening support →",
      ctaHref: PROVIDERS_SCREENING_ANCHOR,
    },
  },
  {
    id: "insurance-intake",
    label: "Insurance & Intake Coordination",
    description: "Benefit inquiry, authorization review, and intake documentation guidance.",
    href: PROVIDERS_INSURANCE_ANCHOR,
    icon: "insurance",
    activePaths: [PROVIDERS_HOME_PATH],
    preview: {
      categoryLabel: "INTAKE COORDINATION",
      headline: "Insurance and intake support",
      description:
        "Eden may help families explore benefits and complete intake steps. Coverage approval depends on payer rules.",
      cta: "Insurance & intake →",
      ctaHref: PROVIDERS_INSURANCE_ANCHOR,
    },
  },
];
