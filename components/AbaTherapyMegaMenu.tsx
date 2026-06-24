"use client";

import { useCallback, useState } from "react";
import EdenLogo from "@/components/EdenLogo";
import ServiceMeaningAnimation, { type ServiceMeaningAnimationType } from "@/components/ServiceMeaningAnimation";
import { servicesMegaMenuItems, type ServicesMegaMenuItem } from "@/lib/services-mega-menu";
import "./AbaTherapyMegaMenu.css";

export type AbaTherapyMegaMenuItem = ServicesMegaMenuItem;

/** @deprecated Use servicesMegaMenuItems from @/lib/services-mega-menu */
export const abaTherapyItems = servicesMegaMenuItems;

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
  const [activeAbaItem, setActiveAbaItem] = useState(servicesMegaMenuItems[0]);

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
    <div className={`aba-mega-menu aba-mega-menu--services${isMobile ? " aba-mega-menu--mobile" : ""}`}>
      <div className="aba-menu-left">
        <p className="mega-menu-label">{servicesLabel}</p>

        <div className="aba-menu-left__items">
          {servicesMegaMenuItems.map((item) => {
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
                <span className="aba-menu-item__label">
                  <span className="aba-menu-item__title">{displayTitle}</span>
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
