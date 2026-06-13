"use client";

import { useCallback, useMemo, useState } from "react";
import { MENU_LINK_ROUTES } from "@/lib/navigation";
import EdenLogo from "@/components/EdenLogo";
import { type AboutMeaningAnimationType } from "@/components/AboutMeaningAnimation";
import "./ResourcesMegaMenu.css";

export type ResourcesMenuItem = {
  title: string;
  href: string;
  description: string;
  animationType: AboutMeaningAnimationType;
  sectionTitle: string;
};

export type ResourcesSection = {
  title: string;
  items: Omit<ResourcesMenuItem, "sectionTitle">[];
};

export type ResourcesPreview = {
  title: string;
  description: string;
  animationType: AboutMeaningAnimationType;
  learnMoreText?: string;
};

const HIGHLIGHTED_LINKS = new Set(["Schedule Appointment"]);

/** Desktop column layout: Learn About Autism + Learning Center share column 1. */
const RESOURCES_COLUMN_LAYOUT: string[][] = [
  ["Learn About Autism", "Learning Center"],
  ["Evaluations & Diagnosis"],
  ["ABA Therapy"],
  ["Getting Started"],
];

function menuHref(menuLabel: string): string {
  const route = MENU_LINK_ROUTES[menuLabel as keyof typeof MENU_LINK_ROUTES];
  if (!route || route.action === "start") return "#";
  return route.path ?? "#";
}

export const resourcesDefaultPreview: ResourcesPreview = {
  title: "Helpful tools for every step",
  description:
    "Explore our guides, articles, and resources to support your autism journey.",
  animationType: "eden",
  learnMoreText: "Explore resources →",
};

export const resourcesSections: ResourcesSection[] = [
  {
    title: "Learn About Autism",
    items: [
      {
        title: "What Is Autism?",
        href: menuHref("What Is Autism?"),
        description:
          "Understand autism spectrum disorder, common characteristics, and how families can recognize strengths and support needs.",
        animationType: "story",
      },
      {
        title: "Early Signs of Autism",
        href: menuHref("Early Signs of Autism"),
        description:
          "Learn developmental milestones and early signs that may suggest a need for screening or further evaluation.",
        animationType: "family-centered",
      },
      {
        title: "Autism Diagnosis Guide",
        href: menuHref("Autism Diagnosis Guide"),
        description:
          "Navigate screening, evaluation, records, and next steps with family-friendly autism diagnosis guidance.",
        animationType: "quality",
      },
      {
        title: "Autism by Age & Development",
        href: menuHref("Autism by Age & Development"),
        description:
          "Explore developmental milestones and autism-related guidance organized by age and stage of development.",
        animationType: "family-centered",
      },
    ],
  },
  {
    title: "Evaluations & Diagnosis",
    items: [
      {
        title: "Screening & Evaluation",
        href: menuHref("Screening & Evaluation"),
        description:
          "Explore Eden's evaluation pathway, what to expect, and how developmental assessments support diagnosis.",
        animationType: "quality",
      },
      {
        title: "M-CHAT-R Online Screener",
        href: menuHref("M-CHAT-R Online Screener"),
        description:
          "Complete the M-CHAT-R screening tool online and review guidance on follow-up steps with your care team.",
        animationType: "eden",
      },
      {
        title: "ADOS-2 Assessment",
        href: menuHref("ADOS-2 Assessment"),
        description:
          "Learn about the ADOS-2 gold-standard observational assessment used in autism diagnostic evaluations.",
        animationType: "quality",
      },
      {
        title: "School & IEP Evaluations",
        href: menuHref("School & IEP Evaluations"),
        description:
          "Understand school-based evaluations, IEP support, and how clinical assessments connect to educational planning.",
        animationType: "team",
      },
    ],
  },
  {
    title: "ABA Therapy",
    items: [
      {
        title: "What Is ABA Therapy?",
        href: menuHref("What Is ABA Therapy?"),
        description:
          "Discover how evidence-based ABA therapy supports communication, daily living skills, and meaningful progress.",
        animationType: "quality",
      },
      {
        title: "Parent Training",
        href: menuHref("Parent Training"),
        description:
          "Learn how parent training empowers caregivers with practical strategies to support their child at home.",
        animationType: "family-centered",
      },
      {
        title: "Parent Guides",
        href: menuHref("Parent Guides"),
        description:
          "Access caregiver-friendly guides on autism, therapy, routines, and partnering with your child's care team.",
        animationType: "family-centered",
      },
      {
        title: "Family Training & Support",
        href: menuHref("Family Training & Support"),
        description:
          "Explore caregiver coaching, family training resources, and practical support for home and community.",
        animationType: "family-centered",
      },
      {
        title: "How ABA Therapy Works",
        href: menuHref("How ABA Therapy Works"),
        description:
          "Learn how ABA therapy sessions, treatment planning, and skill-building support meaningful progress.",
        animationType: "quality",
      },
      {
        title: "ABA Success Stories",
        href: menuHref("ABA Success Stories"),
        description:
          "Read outcomes and family stories highlighting progress, partnership, and hope through ABA therapy.",
        animationType: "community-impact",
      },
    ],
  },
  {
    title: "Getting Started",
    items: [
      {
        title: "Insurance Coverage",
        href: menuHref("Insurance Coverage"),
        description:
          "Review insurance coverage options, verification support, and how Eden helps families understand benefits.",
        animationType: "eden",
      },
      {
        title: "Admissions Process",
        href: menuHref("Admissions Process"),
        description:
          "Walk through intake, documentation, scheduling, and the steps to begin services with Eden ABA Therapy.",
        animationType: "contact",
      },
      {
        title: "Getting Started with Eden",
        href: menuHref("Getting Started with Eden"),
        description:
          "Follow a clear path to connect with Eden, complete intake steps, and begin services with confidence.",
        animationType: "eden",
      },
      {
        title: "New Parent Checklist",
        href: menuHref("New Parent Checklist"),
        description:
          "Use a practical checklist to prepare documents, questions, and next steps as a new autism caregiver.",
        animationType: "story",
      },
      {
        title: "Schedule Appointment",
        href: menuHref("Schedule Appointment"),
        description:
          "Request a consultation or appointment with Eden ABA Therapy to discuss evaluation, intake, or next steps.",
        animationType: "contact",
      },
      {
        title: "FAQs",
        href: menuHref("FAQs"),
        description:
          "Browse frequently asked questions about services, evaluations, insurance, and getting started with Eden.",
        animationType: "contact",
      },
    ],
  },
  {
    title: "Learning Center",
    items: [
      {
        title: "Blog & Articles",
        href: menuHref("Blog & Articles"),
        description:
          "Read expert articles on autism, ABA therapy, family support, and developmental milestones.",
        animationType: "story",
      },
      {
        title: "Webinars & Videos",
        href: menuHref("Webinars & Videos"),
        description:
          "Watch educational webinars and videos designed to help families learn and feel supported.",
        animationType: "community-impact",
      },
    ],
  },
];

export function getAllResourcesItems(): ResourcesMenuItem[] {
  return resourcesSections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      sectionTitle: section.title,
    })),
  );
}

type ResourcesMegaMenuProps = {
  onNavigate: (menuLinkLabel: string) => void;
  getDisplayTitle: (item: ResourcesMenuItem) => string;
  getSectionTitle?: (sectionTitle: string) => string;
  previewLabel?: string;
  learnMoreText?: string;
  defaultPreview?: ResourcesPreview;
  defaultTitle?: string;
  variant?: "desktop" | "mobile";
  onClose?: () => void;
};

function LocationPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function FeaturedCard({
  preview,
  displayTitle,
  previewLabel,
  learnMoreText,
  compact = false,
}: {
  preview: ResourcesPreview | ResourcesMenuItem;
  displayTitle: string;
  previewLabel: string;
  learnMoreText: string;
  compact?: boolean;
}) {
  return (
    <div className={`resources-featured-card${compact ? " resources-featured-card--compact" : ""}`}>
      <div className="resources-featured-card__header">
        <div className="resources-featured-card__brand">
          <EdenLogo size="compact" className="preview-logo" />
        </div>
        <div className="resources-featured-card__pin">
          <LocationPinIcon />
        </div>
      </div>

      <p className="resources-featured-card__label">{previewLabel}</p>
      <h3 className="resources-featured-card__title">{displayTitle}</h3>
      <p className="resources-featured-card__description">{preview.description}</p>
      <span className="resources-featured-card__cta">{learnMoreText}</span>
    </div>
  );
}

function SectionBlock({
  section,
  getSectionTitle,
  getDisplayTitle,
  activeItem,
  onSelect,
  onHover,
}: {
  section: ResourcesSection;
  getSectionTitle: (title: string) => string;
  getDisplayTitle: (item: ResourcesMenuItem) => string;
  activeItem: ResourcesMenuItem | null;
  onSelect: (item: ResourcesMenuItem) => void;
  onHover: (item: ResourcesMenuItem | null) => void;
}) {
  return (
    <div className="resources-mega-menu__section">
      <p className="resources-mega-menu__section-title">{getSectionTitle(section.title)}</p>

      {section.items.map((item) => {
        const menuItem: ResourcesMenuItem = { ...item, sectionTitle: section.title };
        const itemDisplayTitle = getDisplayTitle(menuItem);
        const isActive = activeItem?.title === item.title;
        const isHighlighted = HIGHLIGHTED_LINKS.has(item.title);

        return (
          <button
            key={item.title}
            type="button"
            role="menuitem"
            className={`resources-mega-menu__link${isActive ? " active" : ""}${isHighlighted ? " resources-mega-menu__link--highlight" : ""}`}
            onMouseEnter={() => onHover(menuItem)}
            onFocus={() => onHover(menuItem)}
            onClick={() => onSelect(menuItem)}
            aria-current={isActive ? "true" : undefined}
          >
            {itemDisplayTitle}
          </button>
        );
      })}
    </div>
  );
}

export default function ResourcesMegaMenu({
  onNavigate,
  getDisplayTitle,
  getSectionTitle = (title) => title,
  previewLabel = "RESOURCES",
  learnMoreText = "Explore resources →",
  defaultPreview = resourcesDefaultPreview,
  defaultTitle = "Helpful tools for every step",
  variant = "desktop",
  onClose,
}: ResourcesMegaMenuProps) {
  const [activeItem, setActiveItem] = useState<ResourcesMenuItem | null>(null);

  const sectionByTitle = useMemo(
    () => Object.fromEntries(resourcesSections.map((section) => [section.title, section])),
    [],
  );

  const preview: ResourcesPreview | ResourcesMenuItem = activeItem ?? {
    ...defaultPreview,
    title: defaultTitle,
  };

  const handleSelect = useCallback(
    (item: ResourcesMenuItem) => {
      onNavigate(item.title);
      onClose?.();
    },
    [onClose, onNavigate],
  );

  const displayTitle = activeItem ? getDisplayTitle(activeItem) : defaultTitle;
  const previewKey = activeItem?.title ?? "resources-default";
  const previewCta = activeItem ? learnMoreText : defaultPreview.learnMoreText ?? learnMoreText;
  const isMobile = variant === "mobile";

  const columnLayout = isMobile
    ? resourcesSections.map((section) => [section.title])
    : RESOURCES_COLUMN_LAYOUT;

  return (
    <div className={`resources-mega-menu${isMobile ? " resources-mega-menu--mobile" : ""}`}>
      <div
        className="resources-mega-menu__columns"
        onMouseLeave={() => setActiveItem(null)}
        role="menu"
        aria-label={previewLabel}
      >
        {columnLayout.map((sectionTitles) => (
          <div
            key={sectionTitles.join("-")}
            className="resources-mega-menu__column"
          >
            {sectionTitles.map((sectionTitle) => {
              const section = sectionByTitle[sectionTitle];
              if (!section) return null;

              return (
                <SectionBlock
                  key={section.title}
                  section={section}
                  getSectionTitle={getSectionTitle}
                  getDisplayTitle={getDisplayTitle}
                  activeItem={activeItem}
                  onSelect={handleSelect}
                  onHover={setActiveItem}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="resources-mega-menu__preview" key={previewKey}>
        <FeaturedCard
          preview={preview}
          displayTitle={displayTitle}
          previewLabel={previewLabel}
          learnMoreText={previewCta}
          compact={isMobile}
        />
      </div>
    </div>
  );
}
