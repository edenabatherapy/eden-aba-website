"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import EdenLogo from "@/components/EdenLogo";
import ServiceMeaningAnimation, { type ServiceMeaningAnimationType } from "@/components/ServiceMeaningAnimation";
import {
  servicesMegaMenuItems,
  servicesMegaMenuSections,
  type ServicesMegaMenuItem,
} from "@/lib/services-mega-menu";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import "./AbaTherapyMegaMenu.css";

export type AbaTherapyMegaMenuItem = ServicesMegaMenuItem;

/** @deprecated Use servicesMegaMenuItems from @/lib/services-mega-menu */
export const abaTherapyItems = servicesMegaMenuItems;

type AbaTherapyMegaMenuProps = {
  onNavigate: (menuLinkLabel: string) => void;
  getDisplayTitle: (item: AbaTherapyMegaMenuItem) => string;
  getSectionTitle?: (englishSectionTitle: string) => string;
  servicesLabel?: string;
  servicePreviewLabel?: string;
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
  learnMoreText,
  servicePreviewLabel,
  compact = false,
  onNavigate,
}: {
  item: AbaTherapyMegaMenuItem;
  displayTitle: string;
  learnMoreText: string;
  servicePreviewLabel: string;
  compact?: boolean;
  onNavigate: (item: AbaTherapyMegaMenuItem) => void;
}) {
  const className = compact ? "aba-menu-mobile-preview" : "preview-card";

  return (
    <div className={className}>
      <PreviewCardHeader animationType={item.animationType} compact={compact} />

      <div className="preview-card-body">
        <p className="preview-label">{servicePreviewLabel}</p>
        <h3>{displayTitle}</h3>
        <p>{item.description}</p>
        <Link
          href={item.href}
          className="learn-more-text"
          onClick={(event) => {
            event.preventDefault();
            onNavigate(item);
          }}
        >
          {learnMoreText}
        </Link>
      </div>
    </div>
  );
}

export default function AbaTherapyMegaMenu({
  onNavigate,
  getDisplayTitle,
  getSectionTitle = (title) => title,
  servicesLabel = "SERVICES",
  servicePreviewLabel = "ABA THERAPY SERVICE",
  learnMoreText = "Learn more →",
  variant = "desktop",
  onClose,
}: AbaTherapyMegaMenuProps) {
  const { language } = useSiteLanguage();
  const megaMenu = getTranslation(language).pages.megaMenu;
  const englishDescriptions = useMemo(
    () => servicesMegaMenuItems.map((item) => ({ description: item.description })),
    [],
  );
  const localizedLabels = useLocalizedContent("ABA_MEGA_MENU_LABELS", {
    servicePreviewLabel: servicePreviewLabel,
    learnMoreText: learnMoreText,
  });
  const localizedDescriptions = useLocalizedContent(
    "SERVICES_MEGA_MENU_ITEMS",
    englishDescriptions,
  );
  const menuItems = useMemo(
    () =>
      servicesMegaMenuItems.map((item, index) => ({
        ...item,
        description: localizedDescriptions[index]?.description ?? item.description,
      })),
    [localizedDescriptions],
  );

  const sections = useMemo(
    () =>
      servicesMegaMenuSections.map((section) => ({
        ...section,
        items: section.items.map((item) => {
          const localized = menuItems.find((entry) => entry.id === item.id);
          return localized ?? item;
        }),
      })),
    [menuItems],
  );

  const [activeItem, setActiveItem] = useState(menuItems[0]);

  useEffect(() => {
    setActiveItem((current) => menuItems.find((item) => item.id === current.id) ?? menuItems[0]);
  }, [menuItems]);

  const handleSelect = useCallback(
    (item: AbaTherapyMegaMenuItem) => {
      onNavigate(item.title);
      onClose?.();
    },
    [onClose, onNavigate],
  );

  const activeDisplayTitle = getDisplayTitle(activeItem);
  const isMobile = variant === "mobile";

  return (
    <div className={`aba-mega-menu aba-mega-menu--services${isMobile ? " aba-mega-menu--mobile" : ""}`}>
      <div className="aba-menu-left">
        <p className="mega-menu-label">{servicesLabel || megaMenu?.servicesLabel || "SERVICES"}</p>

        <div className="aba-menu-left__columns">
          {sections.map((section) => (
            <div key={section.id} className="aba-menu-column">
              <p className="aba-menu-column__title">{getSectionTitle(section.title)}</p>
              <ul className="aba-menu-column__list">
                {section.items.map((item) => {
                  const displayTitle = getDisplayTitle(item);
                  const isActive = activeItem.id === item.id;

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`aba-menu-item${isActive ? " active" : ""}`}
                        onMouseEnter={() => setActiveItem(item)}
                        onFocus={() => setActiveItem(item)}
                        onClick={() => handleSelect(item)}
                        aria-current={isActive ? "true" : undefined}
                      >
                        <span className="aba-menu-item__title">{displayTitle}</span>
                        <span className="menu-arrow" aria-hidden="true">
                          →
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {!isMobile ? (
        <div className="aba-menu-right" key={activeItem.id}>
          <PreviewCard
            item={activeItem}
            displayTitle={activeDisplayTitle}
            learnMoreText={localizedLabels.learnMoreText}
            servicePreviewLabel={localizedLabels.servicePreviewLabel}
            onNavigate={handleSelect}
          />
        </div>
      ) : (
        <div key={activeItem.id}>
          <PreviewCard
            item={activeItem}
            displayTitle={activeDisplayTitle}
            learnMoreText={localizedLabels.learnMoreText}
            servicePreviewLabel={localizedLabels.servicePreviewLabel}
            compact
            onNavigate={handleSelect}
          />
        </div>
      )}
    </div>
  );
}
