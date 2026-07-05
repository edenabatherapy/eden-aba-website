"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import EdenLogo from "@/components/EdenLogo";
import AboutMeaningAnimation, { type AboutMeaningAnimationType } from "@/components/AboutMeaningAnimation";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import {
  PROVIDERS_DEFAULT_PREVIEW,
  PROVIDERS_MENU_ITEMS,
  PROVIDERS_MEGA_MENU_LABEL,
  type ProvidersMenuItem,
  type ProvidersPreviewPanel,
} from "@/lib/providers/provider-menu-data";
import "../AbaTherapyMegaMenu.css";

type ProvidersMegaMenuProps = {
  onNavigate?: (href: string) => void;
  variant?: "desktop" | "mobile";
  onClose?: () => void;
};

const PROVIDER_ANIMATION_TYPES: Record<string, AboutMeaningAnimationType> = {
  "refer-a-child": "contact",
  "referral-portal": "contact",
  centralreach: "contact",
  "referral-process": "quality",
  "clinical-collaboration": "team",
  "autism-screening": "quality",
  "insurance-intake": "contact",
};

const DEFAULT_PROVIDER_ANIMATION: AboutMeaningAnimationType = "contact";

function isActiveHref(
  pathname: string,
  href: string,
  activePaths?: string[],
): boolean {
  if (href.startsWith("http") || href.startsWith("mailto:")) return false;

  const hashIndex = href.indexOf("#");
  const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;

  if (
    activePaths?.some(
      (activePath) => pathname === activePath || pathname.startsWith(`${activePath}/`),
    )
  ) {
    return true;
  }

  if (path === "/providers") {
    return pathname === "/providers";
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}

function getAnimationType(itemId: string | undefined): AboutMeaningAnimationType {
  if (!itemId) return DEFAULT_PROVIDER_ANIMATION;
  return PROVIDER_ANIMATION_TYPES[itemId] ?? DEFAULT_PROVIDER_ANIMATION;
}

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
  animationType,
  compact = false,
}: {
  preview: ProvidersPreviewPanel;
  displayTitle: string;
  previewLabel: string;
  learnMoreText: string;
  animationType: AboutMeaningAnimationType;
  compact?: boolean;
}) {
  const className = compact ? "aba-menu-mobile-preview" : "preview-card";

  return (
    <div className={className} aria-live="polite">
      <PreviewCardHeader animationType={animationType} compact={compact} />

      <div className="preview-card-body">
        <p className="preview-label">{previewLabel}</p>

        <h3>{displayTitle}</h3>

        <p>{preview.description}</p>

        <span className="learn-more-text">{learnMoreText}</span>
      </div>
    </div>
  );
}

export default function ProvidersMegaMenu({
  onNavigate,
  variant = "desktop",
  onClose,
}: ProvidersMegaMenuProps) {
  const pathname = usePathname() ?? "";
  const menuItems = useLocalizedContent("PROVIDERS_MENU_ITEMS", PROVIDERS_MENU_ITEMS);
  const megaMenuLabel = useLocalizedContent("PROVIDERS_MEGA_MENU_LABEL", PROVIDERS_MEGA_MENU_LABEL);
  const defaultPreview = useLocalizedContent("PROVIDERS_DEFAULT_PREVIEW", PROVIDERS_DEFAULT_PREVIEW);
  const [activeItem, setActiveItem] = useState<ProvidersMenuItem | null>(null);
  const isMobile = variant === "mobile";

  const handleNavigate = useCallback(
    (href: string, external?: boolean) => {
      if (external || href.startsWith("http")) {
        window.open(href, "_blank", "noopener,noreferrer");
        onClose?.();
        return;
      }

      if (onNavigate) {
        onNavigate(href);
        onClose?.();
        return;
      }

      window.location.assign(href);
      onClose?.();
    },
    [onNavigate, onClose],
  );

  const handleSelect = useCallback(
    (item: ProvidersMenuItem) => {
      handleNavigate(item.href, item.external);
    },
    [handleNavigate],
  );

  const preview = activeItem?.preview ?? defaultPreview;
  const previewKey = activeItem?.id ?? "providers-default";
  const displayTitle = activeItem?.label ?? preview.headline;
  const previewLabel = preview.categoryLabel;
  const learnMoreText = preview.cta;
  const animationType = getAnimationType(activeItem?.id);

  return (
    <div
      className={`aba-mega-menu aba-mega-menu--about${isMobile ? " aba-mega-menu--mobile" : ""}`}
      role="navigation"
      aria-label="For Providers menu"
    >
      <div
        className="aba-menu-left"
        onMouseLeave={() => setActiveItem(null)}
        role="menu"
        aria-label={megaMenuLabel}
      >
        <p className="mega-menu-label">{megaMenuLabel}</p>

        {menuItems.map((item) => {
          const isHovered = activeItem?.id === item.id;
          const isRouteActive = isActiveHref(pathname, item.href, item.activePaths);
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
            animationType={animationType}
          />
        </div>
      ) : null}
    </div>
  );
}
