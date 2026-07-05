"use client";

import { useCallback, useMemo, useState } from "react";
import { ABOUT_NAV_LINKS } from "@/lib/about-nav-links";
import EdenLogo from "@/components/EdenLogo";
import AboutMeaningAnimation, { type AboutMeaningAnimationType } from "@/components/AboutMeaningAnimation";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import "./AbaTherapyMegaMenu.css";

export type AboutEdenMenuItem = {
  title: string;
  href: string;
  description: string;
  animationType: AboutMeaningAnimationType;
  action: "navigate" | "start";
};

export type AboutEdenPreview = {
  title: string;
  description: string;
  animationType: AboutMeaningAnimationType;
  action?: null;
  learnMoreText?: string;
};

export const aboutEdenDefaultPreview: AboutEdenPreview = {
  title: "About Eden",
  description:
    "Learn about Eden ABA Therapy's story, mission, clinical approach, and the team supporting children and families across Virginia.",
  animationType: "eden",
  learnMoreText: "Explore About Eden →",
};

const ABOUT_MENU_DETAILS: Record<
  string,
  { description: string; animationType: AboutMeaningAnimationType }
> = {
  "Our Story": {
    description:
      "Learn why Eden ABA Therapy was founded and how our mission centers on compassionate, individualized autism care.",
    animationType: "story",
  },
  "Our Mission & Values": {
    description:
      "Explore the principles that guide Eden ABA Therapy — compassionate care, family partnership, and meaningful progress for every child.",
    animationType: "eden",
  },
  "Our Approach": {
    description:
      "Discover Eden's evidence-based ABA therapy model, ethical clinical standards, supervision, and measurable outcomes.",
    animationType: "quality",
  },
  "Our Team": {
    description:
      "Meet the clinical leaders and care professionals supporting children and families through guidance, therapy, and partnership.",
    animationType: "team",
  },
  "Clinical Quality": {
    description:
      "Review Eden's clinical standards, BCBA-led supervision, quality assurance, and evidence-based ABA care commitment.",
    animationType: "quality",
  },
  "Community Impact": {
    description:
      "See how Eden supports Northern Virginia through autism awareness, school partnerships, events, and advocacy.",
    animationType: "community-impact",
  },
  "Contact Us": {
    description:
      "Reach Eden for family support, referral inquiries, career questions, directions, and office contact information.",
    animationType: "contact",
  },
};

export const aboutEdenItems: AboutEdenMenuItem[] = ABOUT_NAV_LINKS.map((link) => ({
  title: link.label,
  href: link.href,
  description: ABOUT_MENU_DETAILS[link.label]?.description ?? aboutEdenDefaultPreview.description,
  animationType: ABOUT_MENU_DETAILS[link.label]?.animationType ?? "eden",
  action: "navigate",
}));

type AboutEdenMegaMenuProps = {
  onNavigate: (menuLinkLabel: string) => void;
  onStart: () => void;
  getDisplayTitle: (item: AboutEdenMenuItem) => string;
  sectionLabel?: string;
  previewLabel?: string;
  learnMoreText?: string;
  contactCtaText?: string;
  defaultPreview?: AboutEdenPreview;
  defaultTitle?: string;
  variant?: "desktop" | "mobile";
  onClose?: () => void;
};

function PreviewCardHeader({
  animationType,
  compact = false,
}: {
  animationType: AboutMeaningAnimationType;
  compact?: boolean;
}) {
  return (
    <div className={`preview-card-header${compact ? " preview-card-header--compact" : ""}`}>
      <div className="preview-brand">
        <EdenLogo
          size="compact"
          className={compact ? "preview-logo preview-logo--compact" : "preview-logo"}
        />
      </div>
      <AboutMeaningAnimation type={animationType} compact={compact} />
    </div>
  );
}

function PreviewCard({
  preview,
  displayTitle,
  previewLabel,
  learnMoreText,
  compact = false,
}: {
  preview: AboutEdenPreview | AboutEdenMenuItem;
  displayTitle: string;
  previewLabel: string;
  learnMoreText: string;
  compact?: boolean;
}) {
  const className = compact ? "aba-menu-mobile-preview" : "preview-card";

  return (
    <div className={className}>
      <PreviewCardHeader animationType={preview.animationType} compact={compact} />

      <div className="preview-card-body">
        <p className="preview-label">{previewLabel}</p>

        <h3>{displayTitle}</h3>

        <p>{preview.description}</p>

        <span className="learn-more-text">{learnMoreText}</span>
      </div>
    </div>
  );
}

export default function AboutEdenMegaMenu({
  onNavigate,
  onStart,
  getDisplayTitle,
  sectionLabel = "ABOUT EDEN",
  previewLabel = "ABOUT EDEN",
  learnMoreText = "Learn more →",
  contactCtaText = "Connect with us →",
  defaultPreview = aboutEdenDefaultPreview,
  defaultTitle = "About Eden",
  variant = "desktop",
  onClose,
}: AboutEdenMegaMenuProps) {
  const { language } = useSiteLanguage();
  const megaMenu = getTranslation(language).pages.megaMenu;
  const localizedItemDetails = useLocalizedContent(
    "ABOUT_EDEN_MEGA_MENU_ITEMS",
    aboutEdenItems.map((item) => ({ description: item.description })),
  );
  const localizedDefaultPreview = useLocalizedContent(
    "ABOUT_EDEN_MEGA_MENU_DEFAULT_PREVIEW",
    defaultPreview,
  );
  const menuItems = useMemo(
    () =>
      aboutEdenItems.map((item, index) => ({
        ...item,
        description: localizedItemDetails[index]?.description ?? item.description,
      })),
    [localizedItemDetails],
  );
  const resolvedSectionLabel = sectionLabel ?? megaMenu?.aboutSectionLabel ?? "ABOUT EDEN";
  const resolvedPreviewLabel = previewLabel ?? megaMenu?.aboutSectionLabel ?? "ABOUT EDEN";
  const resolvedLearnMoreText = learnMoreText ?? megaMenu?.learnMoreText ?? "Learn more →";
  const resolvedContactCtaText = contactCtaText ?? megaMenu?.connectWithUsText ?? "Connect with us →";
  const resolvedDefaultPreview = {
    ...localizedDefaultPreview,
    learnMoreText: localizedDefaultPreview.learnMoreText ?? resolvedLearnMoreText,
  };

  const [activeItem, setActiveItem] = useState<AboutEdenMenuItem | null>(null);

  const preview: AboutEdenPreview | AboutEdenMenuItem = activeItem ?? {
    ...resolvedDefaultPreview,
    title: defaultTitle,
  };

  const handleSelect = useCallback(
    (item: AboutEdenMenuItem) => {
      if (item.action === "start") {
        onStart();
        onClose?.();
        return;
      }

      window.location.assign(item.href);
      onClose?.();
    },
    [onClose, onStart],
  );

  const displayTitle = activeItem ? getDisplayTitle(activeItem) : defaultTitle;
  const previewKey = activeItem?.title ?? "about-eden-default";
  const previewCta =
    activeItem?.action === "start"
      ? resolvedContactCtaText
      : activeItem
        ? resolvedLearnMoreText
        : resolvedDefaultPreview.learnMoreText ?? resolvedLearnMoreText;

  const isMobile = variant === "mobile";

  return (
    <div className={`aba-mega-menu aba-mega-menu--about${isMobile ? " aba-mega-menu--mobile" : ""}`}>
      <div
        className="aba-menu-left"
        onMouseLeave={() => setActiveItem(null)}
        role="menu"
        aria-label={resolvedSectionLabel}
      >
        <p className="mega-menu-label">{resolvedSectionLabel}</p>

        {menuItems.map((item) => {
          const itemDisplayTitle = getDisplayTitle(item);
          const isActive = activeItem?.title === item.title;

          return (
            <button
              key={item.title}
              type="button"
              role="menuitem"
              className={`aba-menu-item${isActive ? " active" : ""}`}
              onMouseEnter={() => setActiveItem(item)}
              onFocus={() => setActiveItem(item)}
              onClick={() => handleSelect(item)}
              aria-current={isActive ? "true" : undefined}
            >
              <span>{itemDisplayTitle}</span>

              <span className="menu-arrow" aria-hidden="true">
                →
              </span>
            </button>
          );
        })}
      </div>

      {!isMobile ? (
        <div className="aba-menu-right" key={previewKey}>
          <PreviewCard
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
