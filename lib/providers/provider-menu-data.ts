import { CENTRALREACH_LOGIN_URL } from "@/lib/providers/provider-content";

export type ProvidersMegaMenuIcon =
  | "user-plus"
  | "layout-grid"
  | "log-in"
  | "route"
  | "handshake";

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

export const PROVIDERS_MEGA_MENU_LABEL = "FOR PROVIDERS";
export const PROVIDERS_BRAND_TITLE = "Eden ABA Therapy";

export const PROVIDERS_DEFAULT_PREVIEW: ProvidersPreviewPanel = {
  categoryLabel: "PROVIDER PARTNERSHIPS",
  headline: "Refer a child to Eden ABA Therapy",
  description:
    "Partner with Eden to help families access compassionate, evidence-informed ABA services across Northern Virginia.",
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
        "Share referral details by phone, fax, email, or our provider referral form. Eden may follow up with the family when appropriate.",
      cta: "Refer a child →",
      ctaHref: PROVIDERS_REFER_CHILD_PATH,
    },
  },
  {
    id: "referral-portal",
    label: "Provider Referral Portal",
    description: "Access Eden's provider referral entry point and contact options.",
    href: PROVIDERS_REFER_CHILD_PATH,
    icon: "layout-grid",
    activePaths: [PROVIDERS_REFER_CHILD_PATH],
    preview: {
      categoryLabel: "REFERRAL PORTAL",
      headline: "Provider referral entry point",
      description:
        "Use Eden's referral portal to share patient information and connect families with intake support.",
      cta: "Open referral portal →",
      ctaHref: PROVIDERS_REFER_CHILD_PATH,
    },
  },
  {
    id: "centralreach",
    label: "CentralReach Staff Login",
    description: "Staff access to CentralReach Essentials for authorized Eden team members.",
    href: CENTRALREACH_LOGIN_URL,
    icon: "log-in",
    external: true,
    preview: {
      categoryLabel: "STAFF ACCESS",
      headline: "CentralReach Essentials login",
      description:
        "Authorized Eden ABA Therapy staff may sign in to CentralReach Essentials for clinical and operational workflows.",
      cta: "CentralReach Staff Login →",
      ctaHref: CENTRALREACH_LOGIN_URL,
    },
  },
  {
    id: "referral-process",
    label: "Referral Process",
    description: "Understand how Eden handles referrals from receipt through intake.",
    href: PROVIDERS_REFERRAL_PROCESS_PATH,
    icon: "route",
    activePaths: [PROVIDERS_REFERRAL_PROCESS_PATH],
    preview: {
      categoryLabel: "REFERRAL WORKFLOW",
      headline: "What happens after you refer",
      description:
        "Review Eden's referral workflow from acknowledgment through family contact, eligibility review, and care planning.",
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
        "Learn how Eden may support HIPAA-conscious communication with referring providers when authorized.",
      cta: "Clinical collaboration →",
      ctaHref: PROVIDERS_CLINICAL_COLLAB_PATH,
    },
  },
];
