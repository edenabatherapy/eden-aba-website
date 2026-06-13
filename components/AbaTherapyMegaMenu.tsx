"use client";

import { useCallback, useState } from "react";
import { MENU_LINK_ROUTES } from "@/lib/navigation";
import EdenLogo from "@/components/EdenLogo";
import ServiceMeaningAnimation, { type ServiceMeaningAnimationType } from "@/components/ServiceMeaningAnimation";
import "./AbaTherapyMegaMenu.css";

export type AbaTherapyMegaMenuItem = {
  title: string;
  href: string;
  description: string;
  comingSoon: boolean;
  animationType: ServiceMeaningAnimationType;
};

function serviceHref(menuLabel: string): string {
  const route = MENU_LINK_ROUTES[menuLabel as keyof typeof MENU_LINK_ROUTES];
  return route?.path ?? "#";
}

export const abaTherapyItems: AbaTherapyMegaMenuItem[] = [
  {
    title: "Home-Based ABA Therapy",
    href: serviceHref("Home-Based ABA Therapy"),
    description:
      "Personalized ABA therapy delivered in your child's home, helping build communication, daily living, behavior, and social skills in a familiar environment.",
    comingSoon: false,
    animationType: "home",
  },
  {
    title: "Center-Based ABA Therapy",
    href: serviceHref("Center-Based ABA Therapy"),
    description:
      "Structured therapy in a supportive center setting with learning spaces, peer interaction, clinical supervision, and individualized treatment programs.",
    comingSoon: false,
    animationType: "center",
  },
  {
    title: "Community-Based ABA Therapy",
    href: serviceHref("Community-Based ABA Therapy"),
    description:
      "Real-world ABA support that helps children practice safety, communication, social participation, and independence in community settings.",
    comingSoon: false,
    animationType: "community",
  },
  {
    title: "School-Based ABA Therapy",
    href: serviceHref("School-Based ABA Therapy"),
    description:
      "ABA support coordinated with school environments to improve classroom readiness, behavior, communication, and participation in learning.",
    comingSoon: false,
    animationType: "school",
  },
  {
    title: "Virtual ABA Therapy",
    href: serviceHref("Virtual ABA Therapy"),
    description:
      "Remote ABA support, parent coaching, and consultation through secure virtual sessions for families needing flexible access to care.",
    comingSoon: false,
    animationType: "virtual",
  },
  {
    title: "Afterschool Programs",
    href: serviceHref("Afterschool Programs"),
    description:
      "Structured afterschool ABA programs that support social skills, homework routines, communication, and safe participation after the school day.",
    comingSoon: false,
    animationType: "school",
  },
  {
    title: "Occupational Therapy",
    href: "#",
    description:
      "Coming soon to Eden Family. Occupational therapy will support sensory needs, fine motor skills, self-care routines, and daily independence.",
    comingSoon: true,
    animationType: "occupational",
  },
  {
    title: "Speech & Language Therapy",
    href: "#",
    description:
      "Coming soon to Eden Family. Speech therapy will support communication, language development, social communication, and expressive skills.",
    comingSoon: true,
    animationType: "speech",
  },
  {
    title: "Feeding & Swallowing Therapy",
    href: "#",
    description:
      "Coming soon to Eden Family. Feeding support will help children with safe eating, food variety, oral-motor skills, and mealtime routines.",
    comingSoon: true,
    animationType: "feeding",
  },
];

type AbaTherapyMegaMenuProps = {
  onNavigate: (menuLinkLabel: string) => void;
  getDisplayTitle: (item: AbaTherapyMegaMenuItem) => string;
  servicesLabel?: string;
  comingSoonBadge?: string;
  servicePreviewLabel?: string;
  comingSoonPreviewLabel?: string;
  learnMoreText?: string;
  variant?: "desktop" | "mobile";
  onClose?: () => void;
};

function PreviewCardHeader({
  animationType,
  compact = false,
}: {
  animationType: ServiceMeaningAnimationType;
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
      <ServiceMeaningAnimation type={animationType} compact={compact} />
    </div>
  );
}

function PreviewCard({
  item,
  displayTitle,
  comingSoonPreviewLabel,
  learnMoreText,
  servicePreviewLabel,
  comingSoonBadge = "Coming Soon to Eden Family",
  compact = false,
}: {
  item: AbaTherapyMegaMenuItem;
  displayTitle: string;
  comingSoonPreviewLabel: string;
  learnMoreText: string;
  servicePreviewLabel: string;
  comingSoonBadge?: string;
  compact?: boolean;
}) {
  const className = compact ? "aba-menu-mobile-preview" : "preview-card";

  return (
    <div className={className}>
      <PreviewCardHeader animationType={item.animationType} compact={compact} />

      <div className="preview-card-body">
        <p className="preview-label">
          {item.comingSoon ? comingSoonPreviewLabel : servicePreviewLabel}
        </p>

        <h3>{displayTitle}</h3>

        <p>{item.description}</p>

        {!item.comingSoon ? (
          <span className="learn-more-text">{learnMoreText}</span>
        ) : (
          <span className="coming-soon-preview-badge">{comingSoonBadge}</span>
        )}
      </div>
    </div>
  );
}

export default function AbaTherapyMegaMenu({
  onNavigate,
  getDisplayTitle,
  servicesLabel = "SERVICES",
  comingSoonBadge = "Coming Soon to Eden Family",
  servicePreviewLabel = "ABA THERAPY SERVICE",
  comingSoonPreviewLabel = "COMING SOON",
  learnMoreText = "Learn more →",
  variant = "desktop",
  onClose,
}: AbaTherapyMegaMenuProps) {
  const [activeAbaItem, setActiveAbaItem] = useState(abaTherapyItems[0]);

  const handleSelect = useCallback(
    (item: AbaTherapyMegaMenuItem) => {
      if (item.comingSoon) return;
      onNavigate(item.title);
      onClose?.();
    },
    [onClose, onNavigate],
  );

  const activeDisplayTitle = getDisplayTitle(activeAbaItem);
  const isMobile = variant === "mobile";

  return (
    <div className={`aba-mega-menu${isMobile ? " aba-mega-menu--mobile" : ""}`}>
      <div className="aba-menu-left">
        <p className="mega-menu-label">{servicesLabel}</p>

        {abaTherapyItems.map((item) => {
          const displayTitle = getDisplayTitle(item);
          const isActive = activeAbaItem.title === item.title;

          return (
            <button
              key={item.title}
              type="button"
              className={`aba-menu-item${isActive ? " active" : ""}${item.comingSoon ? " aba-menu-item--disabled" : ""}`}
              onMouseEnter={() => setActiveAbaItem(item)}
              onFocus={() => setActiveAbaItem(item)}
              onClick={() => handleSelect(item)}
              aria-current={isActive ? "true" : undefined}
              aria-disabled={item.comingSoon ? true : undefined}
            >
              <span>
                {displayTitle}
                {item.comingSoon ? (
                  <small className="coming-soon-badge">{comingSoonBadge}</small>
                ) : null}
              </span>

              <span className="menu-arrow" aria-hidden="true">
                →
              </span>
            </button>
          );
        })}
      </div>

      {!isMobile ? (
        <div className="aba-menu-right" key={activeAbaItem.title}>
          <PreviewCard
            item={activeAbaItem}
            displayTitle={activeDisplayTitle}
            comingSoonPreviewLabel={comingSoonPreviewLabel}
            learnMoreText={learnMoreText}
            servicePreviewLabel={servicePreviewLabel}
            comingSoonBadge={comingSoonBadge}
          />
        </div>
      ) : (
        <div key={activeAbaItem.title}>
          <PreviewCard
            item={activeAbaItem}
            displayTitle={activeDisplayTitle}
            comingSoonPreviewLabel={comingSoonPreviewLabel}
            learnMoreText={learnMoreText}
            servicePreviewLabel={servicePreviewLabel}
            comingSoonBadge={comingSoonBadge}
            compact
          />
        </div>
      )}
    </div>
  );
}
