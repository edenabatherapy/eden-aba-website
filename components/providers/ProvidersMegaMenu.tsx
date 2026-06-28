"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Handshake,
  LayoutGrid,
  LogIn,
  Route,
  ScanSearch,
  ShieldCheck,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import EdenLogo from "@/components/EdenLogo";
import {
  PROVIDERS_DEFAULT_PREVIEW,
  PROVIDERS_MENU_ITEMS,
  PROVIDERS_MEGA_MENU_LABEL,
  PROVIDERS_MEGA_MENU_TAGLINE,
  type ProvidersMenuItem,
  type ProvidersMegaMenuIcon,
} from "@/lib/providers/provider-menu-data";
import "./ProvidersMegaMenu.css";

type ProvidersMegaMenuProps = {
  onNavigate?: (href: string) => void;
  variant?: "desktop" | "mobile";
  onClose?: () => void;
};

const ICON_MAP: Record<ProvidersMegaMenuIcon, LucideIcon> = {
  "user-plus": UserPlus,
  "layout-grid": LayoutGrid,
  "log-in": LogIn,
  route: Route,
  handshake: Handshake,
  screening: ScanSearch,
  insurance: ShieldCheck,
};

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

function PreviewPanel({
  preview,
  compact = false,
  onCtaClick,
}: {
  preview: typeof PROVIDERS_DEFAULT_PREVIEW;
  compact?: boolean;
  onCtaClick: (href: string, external?: boolean) => void;
}) {
  const className = compact ? "providers-preview providers-preview--compact" : "providers-preview";
  const isExternal = preview.ctaHref.startsWith("http");

  return (
    <div className={className} aria-live="polite">
      <div className="providers-preview__header">
        <div className="providers-preview__brand">
          <EdenLogo size="compact" className="preview-logo" />
        </div>
        <span className="providers-preview__badge" aria-hidden="true">
          +
        </span>
      </div>

      <div className="providers-preview__body">
        <p className="providers-preview__label">{preview.categoryLabel}</p>
        <h3 className="providers-preview__headline">{preview.headline}</h3>
        <p className="providers-preview__description">{preview.description}</p>
        <button
          type="button"
          className="providers-preview__cta"
          onClick={() => onCtaClick(preview.ctaHref, isExternal)}
        >
          {preview.cta}
        </button>
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
  const menuItems = useMemo(() => PROVIDERS_MENU_ITEMS, []);
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

  const preview = activeItem?.preview ?? PROVIDERS_DEFAULT_PREVIEW;
  const previewKey = activeItem?.id ?? "providers-default";

  return (
    <div
      className={`providers-mega-menu${isMobile ? " providers-mega-menu--mobile" : ""}`}
      role="navigation"
      aria-label="For Providers menu"
    >
      <div
        className="providers-mega-menu__nav"
        onMouseLeave={() => setActiveItem(null)}
        role="menu"
        aria-label={PROVIDERS_MEGA_MENU_LABEL}
      >
        <div className="providers-mega-menu__head">
          <p className="providers-mega-menu__label">{PROVIDERS_MEGA_MENU_LABEL}</p>
          {!isMobile ? <p className="providers-mega-menu__tagline">{PROVIDERS_MEGA_MENU_TAGLINE}</p> : null}
        </div>

        <ul className="providers-mega-menu__list">
          {menuItems.map((item) => {
            const Icon = ICON_MAP[item.icon];
            const isHovered = activeItem?.id === item.id;
            const isRouteActive = isActiveHref(pathname, item.href, item.activePaths);
            const isActive = isHovered || (activeItem === null && isRouteActive);

            return (
              <li key={item.id} className="providers-mega-menu__item">
                <button
                  type="button"
                  role="menuitem"
                  className={`providers-mega-menu__link${isActive ? " active" : ""}`}
                  onMouseEnter={() => setActiveItem(item)}
                  onFocus={() => setActiveItem(item)}
                  onClick={() => handleSelect(item)}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="providers-mega-menu__link-icon" aria-hidden="true">
                    <Icon size={16} strokeWidth={2.25} />
                  </span>
                  <span className="providers-mega-menu__link-text">
                    <span className="providers-mega-menu__link-title">{item.label}</span>
                    <span className="providers-mega-menu__link-description">{item.description}</span>
                  </span>
                  <span className="providers-mega-menu__arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {!isMobile ? (
        <div className="providers-mega-menu__preview-wrap" key={previewKey}>
          <PreviewPanel preview={preview} onCtaClick={handleNavigate} />
        </div>
      ) : null}
    </div>
  );
}
