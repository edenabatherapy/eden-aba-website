"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Gift,
  GraduationCap,
  Heart,
  Route,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import EdenLogo from "@/components/EdenLogo";
import CareerMeaningAnimation from "@/components/CareerMeaningAnimation";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import {
  CAREERS_BRAND_TITLE,
  CAREERS_DEFAULT_PREVIEW,
  CAREERS_MENU_ITEMS,
  CAREERS_MEGA_MENU_LABEL,
  type CareersMenuItem,
  type CareersMegaMenuIcon,
  type CareersPreviewPanel,
} from "@/lib/careers/career-menu-data";
import "./careers/CareersMegaMenu.css";

type CareersMegaMenuProps = {
  onNavigate?: (href: string) => void;
  variant?: "desktop" | "mobile";
  onClose?: () => void;
};

const ICON_MAP: Record<CareersMegaMenuIcon, LucideIcon> = {
  search: Search,
  users: Users,
  "graduation-cap": GraduationCap,
  gift: Gift,
  heart: Heart,
  route: Route,
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

function PreviewPanel({
  preview,
  brandTitle,
  compact = false,
  onCtaClick,
}: {
  preview: CareersPreviewPanel;
  brandTitle: string;
  compact?: boolean;
  onCtaClick: (href: string) => void;
}) {
  const className = compact ? "careers-preview careers-preview--compact" : "careers-preview";

  return (
    <div className={className} aria-live="polite">
      <div className={`careers-preview__header${compact ? " careers-preview__header--compact" : ""}`}>
        <div className="careers-preview__brand">
          <EdenLogo
            size="compact"
            className={compact ? "preview-logo preview-logo--compact" : "preview-logo"}
          />
        </div>
        <CareerMeaningAnimation type={preview.animationType} compact={compact} />
      </div>

      <div className="careers-preview__body">
        <p className="careers-preview__brand-title">{brandTitle}</p>
        <p className="careers-preview__label">{preview.categoryLabel}</p>
        <h3 className="careers-preview__headline">{preview.headline}</h3>
        <p className="careers-preview__description">{preview.description}</p>
        <button
          type="button"
          className="careers-preview__cta"
          onClick={() => onCtaClick(preview.ctaHref)}
        >
          {preview.cta}
        </button>
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

  const handleCtaClick = useCallback(
    (href: string) => {
      handleNavigate(href);
      onClose?.();
    },
    [handleNavigate, onClose],
  );

  const preview = activeItem?.preview ?? localizedDefaultPreview;
  const previewKey = activeItem?.id ?? "careers-default";
  const menuLabel = typeof localizedMenuLabel === "string" ? localizedMenuLabel : CAREERS_MEGA_MENU_LABEL;
  const menuAria = typeof localizedMenuAria === "string" ? localizedMenuAria : "Careers menu";

  return (
    <div
      className={`careers-mega-menu${isMobile ? " careers-mega-menu--mobile" : ""}`}
      role="navigation"
      aria-label={menuAria}
    >
      <div
        className="careers-mega-menu__nav"
        onMouseLeave={() => setActiveItem(null)}
        role="menu"
        aria-label={menuLabel}
      >
        <p className="careers-mega-menu__label">{menuLabel}</p>

        <ul className="careers-mega-menu__list">
          {menuItems.map((item) => {
            const Icon = ICON_MAP[item.icon];
            const isHovered = activeItem?.id === item.id;
            const isRouteActive = isActiveHref(
              pathname,
              item.href,
              currentHash,
              item.activePaths,
            );
            const isActive = isHovered || (activeItem === null && isRouteActive);

            return (
              <li key={item.id} className="careers-mega-menu__item">
                <button
                  type="button"
                  role="menuitem"
                  className={`careers-mega-menu__link${isActive ? " active" : ""}`}
                  onMouseEnter={() => setActiveItem(item)}
                  onFocus={() => setActiveItem(item)}
                  onClick={() => handleSelect(item)}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="careers-mega-menu__link-icon" aria-hidden="true">
                    <Icon size={16} strokeWidth={2.25} />
                  </span>
                  <span className="careers-mega-menu__link-text">
                    <span className="careers-mega-menu__link-title">{item.label}</span>
                    <span className="careers-mega-menu__link-description">{item.description}</span>
                  </span>
                  <span className="careers-mega-menu__arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="careers-mega-menu__preview-wrap" key={previewKey}>
        <PreviewPanel
          preview={preview}
          brandTitle={CAREERS_BRAND_TITLE}
          compact={isMobile}
          onCtaClick={handleCtaClick}
        />
      </div>
    </div>
  );
}

export { careersDefaultPreview, careersItems } from "./CareersMegaMenu.legacy";
