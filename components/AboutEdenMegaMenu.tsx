"use client";

import { useCallback, useState } from "react";
import { MENU_LINK_ROUTES } from "@/lib/navigation";
import EdenLogo from "@/components/EdenLogo";
import AboutMeaningAnimation, { type AboutMeaningAnimationType } from "@/components/AboutMeaningAnimation";
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

function menuHref(menuLabel: string): string {
  const route = MENU_LINK_ROUTES[menuLabel as keyof typeof MENU_LINK_ROUTES];
  if (!route || route.action === "start") return "#";
  return route.path ?? "#";
}

export const aboutEdenDefaultPreview: AboutEdenPreview = {
  title: "About Eden",
  description:
    "Learn about Eden ABA Therapy's story, mission, leadership, clinical excellence, and community impact.",
  animationType: "eden",
  learnMoreText: "Explore About Eden →",
};

export const aboutEdenItems: AboutEdenMenuItem[] = [
  {
    title: "Our Story",
    href: menuHref("Our Story"),
    description:
      "Learn why Eden ABA Therapy was founded and how our mission centers on compassionate, individualized autism care.",
    animationType: "story",
    action: "navigate",
  },
  {
    title: "Our Mission & Values",
    href: menuHref("Our Mission & Values"),
    description:
      "Explore the principles that guide Eden ABA Therapy — compassionate care, family partnership, and meaningful progress for every child.",
    animationType: "eden",
    action: "navigate",
  },
  {
    title: "Leadership Team",
    href: menuHref("Leadership Team"),
    description:
      "Meet the clinical leaders and care professionals supporting children and families through guidance, therapy, and partnership.",
    animationType: "team",
    action: "navigate",
  },
  {
    title: "Clinical Excellence",
    href: menuHref("Clinical Excellence"),
    description:
      "Discover Eden's commitment to evidence-based ABA therapy, ethical care, supervision, and measurable outcomes.",
    animationType: "quality",
    action: "navigate",
  },
  {
    title: "Community Impact",
    href: menuHref("Community Impact"),
    description:
      "See how Eden supports families beyond therapy through education, outreach, awareness, and local community connection.",
    animationType: "community-impact",
    action: "navigate",
  },
  {
    title: "Contact Us",
    href: menuHref("Contact Us"),
    description:
      "Connect with Eden ABA Therapy to ask questions, request support, or take the next step toward services.",
    animationType: "contact",
    action: "navigate",
  },
];

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
  const [activeItem, setActiveItem] = useState<AboutEdenMenuItem | null>(null);

  const preview: AboutEdenPreview | AboutEdenMenuItem = activeItem ?? {
    ...defaultPreview,
    title: defaultTitle,
  };

  const handleSelect = useCallback(
    (item: AboutEdenMenuItem) => {
      if (item.action === "start") {
        onStart();
        onClose?.();
        return;
      }
      onNavigate(item.title);
      onClose?.();
    },
    [onClose, onNavigate, onStart],
  );

  const displayTitle = activeItem ? getDisplayTitle(activeItem) : defaultTitle;
  const previewKey = activeItem?.title ?? "about-eden-default";
  const previewCta =
    activeItem?.action === "start"
      ? contactCtaText
      : activeItem
        ? learnMoreText
        : defaultPreview.learnMoreText ?? learnMoreText;

  const isMobile = variant === "mobile";

  return (
    <div className={`aba-mega-menu${isMobile ? " aba-mega-menu--mobile" : ""}`}>
      <div
        className="aba-menu-left"
        onMouseLeave={() => setActiveItem(null)}
        role="menu"
        aria-label={sectionLabel}
      >
        <p className="mega-menu-label">{sectionLabel}</p>

        {aboutEdenItems.map((item) => {
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
            previewLabel={previewLabel}
            learnMoreText={previewCta}
          />
        </div>
      ) : (
        <div key={previewKey}>
          <PreviewCard
            preview={preview}
            displayTitle={displayTitle}
            previewLabel={previewLabel}
            learnMoreText={previewCta}
            compact
          />
        </div>
      )}
    </div>
  );
}
