"use client";

import { useCallback, useMemo, useState } from "react";
import { MENU_LINK_ROUTES } from "@/lib/navigation";
import EdenLogo from "@/components/EdenLogo";
import { type AboutMeaningAnimationType } from "@/components/AboutMeaningAnimation";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import viAppData from "@/locales/vi-app-data.json";
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

/** Desktop column layout by section index in `resourcesSections`. */
const RESOURCES_COLUMN_LAYOUT_INDICES: number[][] = [
  [0, 4],
  [1],
  [2],
  [3],
];

function mergeResourcesSections(language: string): ResourcesSection[] {
  if (language !== "vi") return resourcesSections;

  const overlay = viAppData.RESOURCES_MEGA_MENU_SECTIONS;
  if (!overlay?.length) return resourcesSections;

  return resourcesSections.map((section, sectionIndex) => {
    const sectionOverlay = overlay[sectionIndex];
    if (!sectionOverlay) return section;

    return {
      ...section,
      title: sectionOverlay.title ?? section.title,
      items: section.items.map((item, itemIndex) => ({
        ...item,
        description: sectionOverlay.items?.[itemIndex]?.description ?? item.description,
      })),
    };
  });
}

function getResourcesItemDisplayTitle(
  language: string,
  sectionIndex: number,
  itemIndex: number,
  item: ResourcesMenuItem,
  getDisplayTitle: (menuItem: ResourcesMenuItem) => string,
): string {
  if (language === "vi") {
    const overlayTitle = viAppData.RESOURCES_MEGA_MENU_SECTIONS?.[sectionIndex]?.items?.[itemIndex]?.title;
    if (overlayTitle) return overlayTitle;
  }

  const resolved = getDisplayTitle(item);
  return resolved || item.title;
}

function getResourcesSectionIndex(sectionTitle: string): number {
  return resourcesSections.findIndex((section) => section.title === sectionTitle);
}

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
        title: "ABA Success Stories",
        href: menuHref("ABA Success Stories"),
        description:
          "Read outcomes and family stories highlighting progress, partnership, and hope through ABA therapy.",
        animationType: "community-impact",
      },
      {
        title: "Getting Started with Eden",
        href: menuHref("Getting Started with Eden"),
        description:
          "Follow a clear path to connect with Eden, complete intake steps, and begin services with confidence.",
        animationType: "eden",
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
        title: "Financial Assistance",
        href: menuHref("Financial Assistance"),
        description:
          "Explore government, insurance, grant, and community financial assistance for autism and ABA therapy, plus the Autism Care Fund.",
        animationType: "community-impact",
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
        title: "Schedule Appointment",
        href: menuHref("Schedule Appointment"),
        description:
          "Request a consultation or appointment with Eden ABA Therapy to discuss evaluation, intake, or next steps.",
        animationType: "contact",
      },
      {
        title: "Location",
        href: menuHref("Location"),
        description:
          "Find Eden ABA Therapy service areas, center hours, directions, and scheduling options near your family.",
        animationType: "community-impact",
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
  sectionIndex,
  getSectionTitle,
  getItemDisplayTitle,
  activeItem,
  onSelect,
  onHover,
}: {
  section: ResourcesSection;
  sectionIndex: number;
  getSectionTitle: (title: string) => string;
  getItemDisplayTitle: (
    sectionIndex: number,
    itemIndex: number,
    item: ResourcesMenuItem,
  ) => string;
  activeItem: ResourcesMenuItem | null;
  onSelect: (item: ResourcesMenuItem) => void;
  onHover: (item: ResourcesMenuItem | null) => void;
}) {
  const englishSectionTitle = resourcesSections[sectionIndex]?.title ?? section.title;

  return (
    <div className="resources-mega-menu__section">
      <p className="resources-mega-menu__section-title">{getSectionTitle(englishSectionTitle)}</p>

      {section.items.map((item, itemIndex) => {
        const menuItem: ResourcesMenuItem = { ...item, sectionTitle: englishSectionTitle };
        const itemDisplayTitle = getItemDisplayTitle(sectionIndex, itemIndex, menuItem);
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
  previewLabel,
  learnMoreText,
  defaultPreview,
  defaultTitle,
  variant = "desktop",
  onClose,
}: ResourcesMegaMenuProps) {
  const { language } = useSiteLanguage();
  const megaMenu = getTranslation(language).pages.megaMenu;
  const localizedDefaultPreview = useLocalizedContent(
    "RESOURCES_MEGA_MENU_DEFAULT_PREVIEW",
    resourcesDefaultPreview,
  );
  const menuSections = useMemo(() => mergeResourcesSections(language), [language]);
  const resolvedPreviewLabel = previewLabel ?? megaMenu?.featuredResourcesLabel ?? "RESOURCES";
  const resolvedLearnMoreText = learnMoreText ?? megaMenu?.exploreResourcesCta ?? "Explore resources →";
  const resolvedDefaultPreview = {
    ...resourcesDefaultPreview,
    ...localizedDefaultPreview,
    ...(defaultPreview ?? {}),
    learnMoreText:
      localizedDefaultPreview.learnMoreText ??
      megaMenu?.exploreResourcesCta ??
      defaultPreview?.learnMoreText ??
      resourcesDefaultPreview.learnMoreText,
  };
  const resolvedDefaultTitle =
    defaultTitle ?? localizedDefaultPreview.title ?? resourcesDefaultPreview.title;

  const getItemDisplayTitle = useCallback(
    (sectionIndex: number, itemIndex: number, item: ResourcesMenuItem) =>
      getResourcesItemDisplayTitle(language, sectionIndex, itemIndex, item, getDisplayTitle),
    [getDisplayTitle, language],
  );

  const [activeItem, setActiveItem] = useState<ResourcesMenuItem | null>(null);

  const preview: ResourcesPreview | ResourcesMenuItem = activeItem ?? {
    ...resolvedDefaultPreview,
    title: resolvedDefaultTitle,
  };

  const handleSelect = useCallback(
    (item: ResourcesMenuItem) => {
      onNavigate(item.title);
      onClose?.();
    },
    [onClose, onNavigate],
  );

  const activeSectionIndex = activeItem ? getResourcesSectionIndex(activeItem.sectionTitle) : -1;
  const activeItemIndex =
    activeItem && activeSectionIndex >= 0
      ? resourcesSections[activeSectionIndex]?.items.findIndex((item) => item.title === activeItem.title) ?? -1
      : -1;

  const displayTitle = activeItem
    ? getItemDisplayTitle(activeSectionIndex, activeItemIndex, activeItem)
    : resolvedDefaultTitle;
  const previewKey = activeItem?.title ?? "resources-default";
  const previewCta = activeItem ? resolvedLearnMoreText : resolvedDefaultPreview.learnMoreText ?? resolvedLearnMoreText;
  const isMobile = variant === "mobile";

  const columnLayout = isMobile
    ? menuSections.map((_, index) => [index])
    : RESOURCES_COLUMN_LAYOUT_INDICES;

  return (
    <div className={`resources-mega-menu${isMobile ? " resources-mega-menu--mobile" : ""}`}>
      <div
        className="resources-mega-menu__columns"
        onMouseLeave={() => setActiveItem(null)}
        role="menu"
        aria-label={resolvedPreviewLabel}
      >
        {columnLayout.map((sectionIndices) => (
          <div
            key={sectionIndices.join("-")}
            className="resources-mega-menu__column"
          >
            {sectionIndices.map((sectionIndex) => {
              const section = menuSections[sectionIndex];
              if (!section) return null;

              return (
                <SectionBlock
                  key={resourcesSections[sectionIndex]?.title ?? section.title}
                  section={section}
                  sectionIndex={sectionIndex}
                  getSectionTitle={getSectionTitle}
                  getItemDisplayTitle={getItemDisplayTitle}
                  activeItem={activeItem}
                  onSelect={handleSelect}
                  onHover={setActiveItem}
                />
              );
            })}
          </div>
        ))}
      </div>

      {!isMobile ? (
        <div className="resources-mega-menu__preview" key={previewKey}>
          <FeaturedCard
            preview={preview}
            displayTitle={displayTitle}
            previewLabel={resolvedPreviewLabel}
            learnMoreText={previewCta}
          />
        </div>
      ) : null}
    </div>
  );
}
