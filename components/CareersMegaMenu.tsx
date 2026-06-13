"use client";

import { useCallback, useState } from "react";
import { MENU_LINK_ROUTES } from "@/lib/navigation";
import EdenLogo from "@/components/EdenLogo";
import CareerMeaningAnimation, { type CareerMeaningAnimationType } from "@/components/CareerMeaningAnimation";
import "./AbaTherapyMegaMenu.css";

export type CareersMegaMenuItem = {
  title: string;
  href: string;
  description: string;
  animationType: CareerMeaningAnimationType;
};

export type CareersPreview = {
  title: string;
  description: string;
  animationType: CareerMeaningAnimationType;
  learnMoreText?: string;
};

function menuHref(menuLabel: string): string {
  const route = MENU_LINK_ROUTES[menuLabel as keyof typeof MENU_LINK_ROUTES];
  return route?.path ?? "#";
}

export const careersDefaultPreview: CareersPreview = {
  title: "Careers at Eden",
  description:
    "Explore meaningful career paths at Eden ABA Therapy, from RBT and BCBA roles to team culture, interview support, and professional growth.",
  animationType: "careers",
  learnMoreText: "Explore careers →",
};

export const careersItems: CareersMegaMenuItem[] = [
  {
    title: "Search Open Roles",
    href: menuHref("Search Open Roles"),
    description:
      "Explore current opportunities at Eden ABA Therapy and find a role where your work can make a meaningful difference.",
    animationType: "search-roles",
  },
  {
    title: "RBT Careers",
    href: menuHref("RBT Careers"),
    description:
      "Learn about Registered Behavior Technician roles supporting children through compassionate, hands-on ABA therapy.",
    animationType: "rbt",
  },
  {
    title: "BCBA Careers",
    href: menuHref("BCBA Careers"),
    description:
      "Explore BCBA opportunities focused on clinical leadership, ethical care, supervision, and individualized treatment planning.",
    animationType: "bcba",
  },
  {
    title: "Life at Eden",
    href: menuHref("Life at Eden"),
    description:
      "Discover Eden's supportive team culture, family-centered mission, and commitment to helping children and clinicians grow.",
    animationType: "life-at-eden",
  },
  {
    title: "Interview Guide",
    href: menuHref("Interview Guide"),
    description:
      "Prepare for the hiring process with helpful interview tips, expectations, and next steps for joining Eden ABA Therapy.",
    animationType: "interview-guide",
  },
  {
    title: "Career Resources",
    href: menuHref("Career Resources"),
    description:
      "Access career guidance, role information, and helpful resources for building your future in autism care.",
    animationType: "career-resources",
  },
];

type CareersMegaMenuProps = {
  onNavigate: (menuLinkLabel: string) => void;
  getDisplayTitle: (item: CareersMegaMenuItem) => string;
  sectionLabel?: string;
  previewLabel?: string;
  learnMoreText?: string;
  defaultPreview?: CareersPreview;
  defaultTitle?: string;
  variant?: "desktop" | "mobile";
  onClose?: () => void;
};

function PreviewCardHeader({
  animationType,
  compact = false,
}: {
  animationType: CareerMeaningAnimationType;
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
      <CareerMeaningAnimation type={animationType} compact={compact} />
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
  preview: CareersPreview | CareersMegaMenuItem;
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

export default function CareersMegaMenu({
  onNavigate,
  getDisplayTitle,
  sectionLabel = "CAREERS",
  previewLabel = "CAREERS",
  learnMoreText = "Learn more →",
  defaultPreview = careersDefaultPreview,
  defaultTitle = "Careers at Eden",
  variant = "desktop",
  onClose,
}: CareersMegaMenuProps) {
  const [activeItem, setActiveItem] = useState<CareersMegaMenuItem | null>(null);

  const preview: CareersPreview | CareersMegaMenuItem = activeItem ?? {
    ...defaultPreview,
    title: defaultTitle,
  };

  const handleSelect = useCallback(
    (item: CareersMegaMenuItem) => {
      onNavigate(item.title);
      onClose?.();
    },
    [onClose, onNavigate],
  );

  const displayTitle = activeItem ? getDisplayTitle(activeItem) : defaultTitle;
  const previewKey = activeItem?.title ?? "careers-default";
  const previewCta = activeItem ? learnMoreText : defaultPreview.learnMoreText ?? learnMoreText;

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

        {careersItems.map((item) => {
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
