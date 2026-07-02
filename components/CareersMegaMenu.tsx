"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import EdenLogo from "@/components/EdenLogo";
import CareerMeaningAnimation, { type CareerMeaningAnimationType } from "@/components/CareerMeaningAnimation";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import {
  CAREERS_DEFAULT_PREVIEW,
  CAREERS_MENU_ITEMS,
  CAREERS_MEGA_MENU_LABEL,
  type CareersMenuItem,
  type CareersPreviewPanel,
} from "@/lib/careers/career-menu-data";
import "./AbaTherapyMegaMenu.css";

type CareersMegaMenuProps = {
  onNavigate?: (href: string) => void;
  variant?: "desktop" | "mobile";
  onClose?: () => void;
};

function isActiveHref(
  pathname: string,
  href: string,
  currentHash: string,
  activePaths?: string[],
): boolean {
  if (href.startsWith("mailto:")) return false;

  const hashIndex = href.indexOf("#");
  const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";

  if (
    activePaths?.some(
      (activePath) => pathname === activePath || pathname.startsWith(`${activePath}/`),
    )
  ) {
    return true;
  }

  if (hash) {
    const normalizedPath = path || "/";
    return pathname === normalizedPath && currentHash === hash;
  }

  if (path === "/careers") {
    return pathname === "/careers" && !currentHash;
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}

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
  preview: CareersPreviewPanel;
  displayTitle: string;
  previewLabel: string;
  learnMoreText: string;
  compact?: boolean;
}) {
  const className = compact ? "aba-menu-mobile-preview" : "preview-card";

  return (
    <div className={className} aria-live="polite">
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
  variant = "desktop",
  onClose,
}: CareersMegaMenuProps) {
  const pathname = usePathname() ?? "";
  const localizedDefaultPreview = useLocalizedContent("CAREERS_DEFAULT_PREVIEW", CAREERS_DEFAULT_PREVIEW);
  const localizedMenuItems = useLocalizedContent("CAREERS_MENU_ITEMS", CAREERS_MENU_ITEMS);
  const localizedMenuLabel = useLocalizedContent("CAREERS_MEGA_MENU_LABEL", CAREERS_MEGA_MENU_LABEL);
  const localizedMenuAria = useLocalizedContent("CAREERS_MEGA_MENU_ARIA", "Careers menu");
  const menuItems = useMemo(
    () =>
      CAREERS_MENU_ITEMS.map((item, index) => ({
        ...item,
        label: localizedMenuItems[index]?.label ?? item.label,
        description: localizedMenuItems[index]?.description ?? item.description,
        preview: {
          ...item.preview,
          ...(localizedMenuItems[index]?.preview ?? {}),
        },
      })),
    [localizedMenuItems],
  );
  const [currentHash, setCurrentHash] = useState("");
  const [activeItem, setActiveItem] = useState<CareersMenuItem | null>(null);
  const isMobile = variant === "mobile";

  useEffect(() => {
    const syncHash = () => setCurrentHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  const handleNavigate = useCallback(
    (href: string) => {
      if (onNavigate) {
        onNavigate(href);
        return;
      }
      if (href.startsWith("/") || href.startsWith("mailto:")) {
        window.location.assign(href);
      }
    },
    [onNavigate],
  );

  const handleSelect = useCallback(
    (item: CareersMenuItem) => {
      handleNavigate(item.href);
      onClose?.();
    },
    [handleNavigate, onClose],
  );

  const preview = activeItem?.preview ?? localizedDefaultPreview;
  const previewKey = activeItem?.id ?? "careers-default";
  const menuLabel = typeof localizedMenuLabel === "string" ? localizedMenuLabel : CAREERS_MEGA_MENU_LABEL;
  const menuAria = typeof localizedMenuAria === "string" ? localizedMenuAria : "Careers menu";
  const displayTitle = activeItem?.label ?? preview.headline;
  const previewLabel = preview.categoryLabel;
  const learnMoreText = preview.cta;

  return (
    <div
      className={`aba-mega-menu aba-mega-menu--about${isMobile ? " aba-mega-menu--mobile" : ""}`}
      role="navigation"
      aria-label={menuAria}
    >
      <div
        className="aba-menu-left"
        onMouseLeave={() => setActiveItem(null)}
        role="menu"
        aria-label={menuLabel}
      >
        <p className="mega-menu-label">{menuLabel}</p>

        {menuItems.map((item) => {
          const isHovered = activeItem?.id === item.id;
          const isRouteActive = isActiveHref(
            pathname,
            item.href,
            currentHash,
            item.activePaths,
          );
          const isActive = isHovered || (activeItem === null && isRouteActive);

          return (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              className={`aba-menu-item${isActive ? " active" : ""}`}
              onMouseEnter={() => setActiveItem(item)}
              onFocus={() => setActiveItem(item)}
              onClick={() => handleSelect(item)}
              aria-current={isActive ? "true" : undefined}
            >
              <span>{item.label}</span>

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
            learnMoreText={learnMoreText}
          />
        </div>
      ) : (
        <div key={previewKey}>
          <PreviewCard
            preview={preview}
            displayTitle={displayTitle}
            previewLabel={previewLabel}
            learnMoreText={learnMoreText}
            compact
          />
        </div>
      )}
    </div>
  );
}

export { careersDefaultPreview, careersItems } from "./CareersMegaMenu.legacy";
