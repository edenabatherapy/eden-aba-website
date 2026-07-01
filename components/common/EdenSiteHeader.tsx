"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import AbaTherapyMegaMenu from "@/components/AbaTherapyMegaMenu";
import AboutEdenMegaMenu, { aboutEdenDefaultPreview } from "@/components/AboutEdenMegaMenu";
import CareersMegaMenu from "@/components/CareersMegaMenu";
import ProvidersMegaMenu from "@/components/providers/ProvidersMegaMenu";
import ResourcesMegaMenu, { resourcesDefaultPreview } from "@/components/ResourcesMegaMenu";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import SiteHeaderBrand from "@/components/common/SiteHeaderBrand";
import { useHeaderScrolled } from "@/hooks/useHeaderScrolled";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getHeaderShellClasses } from "@/lib/header-brand";
import { getMenu, getTranslation } from "@/lib/i18n";
import { handleMenuLink } from "@/lib/navigation";
import { getPagePath } from "@/lib/site-routes";
import {
  isAboutMegaMenuGroup,
} from "@/lib/about-mega-menu";
import {
  isServicesMegaMenuGroup,
  SERVICES_MENU_ID,
} from "@/lib/services-mega-menu";
import {
  buildMenuDisplayTitleResolver,
  buildSectionTitleResolver,
  parseMenuLinkEntry,
} from "@/lib/site-header-utils";

function MenuLinkBadge({ badge }: { badge: string | null }) {
  if (!badge) return null;
  return (
    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold leading-snug tracking-wide text-emerald-700/80">
      {badge}
    </span>
  );
}

export default function EdenSiteHeader() {
  const pathname = usePathname();
  const scrolled = useHeaderScrolled();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const menuItems = getMenu(language);
  const enMenu = getMenu("en");

  const closeMenus = () => {
    setOpenDropdown(null);
    setOpen(false);
  };

  const navigate = (page: string, options?: { path?: string; scrollTo?: string }) => {
    closeMenus();
    const path = options?.path ?? getPagePath(page);
    if (path) {
      const target = options?.scrollTo ? `${path}#${options.scrollTo}` : path;
      window.location.assign(target);
      return;
    }
    if (page === "home") {
      window.location.assign("/");
    }
  };

  const onCareersNavigate = (href: string) => {
    closeMenus();
    if (href.startsWith("mailto:")) {
      window.location.href = href;
      return;
    }
    window.location.assign(href);
  };

  const onProvidersNavigate = (href: string) => {
    closeMenus();
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.assign(href);
  };

  const onMenuLink = (enLinkLabel: string) => {
    handleMenuLink(enLinkLabel, {
      onNavigate: navigate,
      onStart: () => {
        window.location.assign("/intake");
        closeMenus();
      },
    });
  };

  const toggleDropdown = (menuKey: string) => {
    setOpenDropdown((current) => (current === menuKey ? null : menuKey));
  };

  useEffect(() => {
    if (!openDropdown) return undefined;

    const handlePointerDown = (event: MouseEvent) => {
      if ((event.target as Element).closest("[data-nav-menu]")) return;
      setOpenDropdown(null);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openDropdown]);

  const navItemClass =
    "shrink-0 whitespace-nowrap rounded-full px-1.5 py-1.5 text-[10px] font-extrabold leading-tight text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800 lg:px-2 lg:py-1.5 lg:text-[11px] xl:px-2.5 xl:text-xs 2xl:px-3 2xl:py-2 2xl:text-sm";

  const getDropdownPanelClass = (isDropdownOpen: boolean) =>
    isDropdownOpen
      ? "visible translate-y-0 opacity-100 pointer-events-auto"
      : "invisible translate-y-2 opacity-0 pointer-events-none group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto";

  const abaMenuGroup = menuItems.find((group, idx) => enMenu[idx]?.id === SERVICES_MENU_ID);
  const abaEnGroup = enMenu.find((group) => group.id === SERVICES_MENU_ID);
  const getAbaDisplayTitle = buildMenuDisplayTitleResolver(abaMenuGroup, abaEnGroup);
  const getAbaSectionTitle = buildSectionTitleResolver(abaMenuGroup, abaEnGroup);
  const abaServicesLabel = abaMenuGroup?.label?.toUpperCase?.() || "SERVICES";

  const aboutMenuGroup = menuItems.find((_, idx) => isAboutMegaMenuGroup(enMenu[idx]));
  const aboutEnGroup = enMenu.find((group) => isAboutMegaMenuGroup(group));
  const getAboutDisplayTitle = buildMenuDisplayTitleResolver(aboutMenuGroup, aboutEnGroup);
  const aboutSectionLabel = aboutMenuGroup?.columns?.[0]?.title?.toUpperCase?.() || "ABOUT EDEN";
  const aboutDefaultDescription =
    t.aboutEdenMegaMenuDefaultDescription || aboutEdenDefaultPreview.description;

  const isCareersActive = pathname === "/careers" || pathname.startsWith("/careers/");
  const isProvidersActive = pathname === "/providers" || pathname.startsWith("/providers/");

  const resourcesMenuGroup = menuItems.find((_, idx) => enMenu[idx]?.label === "Resources");
  const resourcesEnGroup = enMenu.find((group) => group.label === "Resources");
  const getResourcesDisplayTitle = buildMenuDisplayTitleResolver(resourcesMenuGroup, resourcesEnGroup);
  const getResourcesSectionTitle = buildSectionTitleResolver(resourcesMenuGroup, resourcesEnGroup);
  const resourcesDefaultDescription =
    t.resourcesMegaMenuDefaultDescription || resourcesDefaultPreview.description;
  const resourcesDefaultTitle = t.resourcesMegaMenuDefaultTitle || resourcesDefaultPreview.title;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[#49b8c8]/20 bg-white/92 backdrop-blur-xl transition-shadow duration-300 dark:border-slate-800 dark:bg-slate-950/92 ${scrolled ? "shadow-sm shadow-emerald-950/5" : ""}`}
    >
      <div
        className={`mx-auto grid w-full max-w-[100rem] grid-cols-[minmax(0,auto)_minmax(0,1fr)_auto] items-center gap-x-2 px-3 transition-[padding] duration-300 sm:gap-x-3 sm:px-4 lg:gap-x-4 lg:px-5 xl:px-6 2xl:gap-x-5 2xl:px-8 ${getHeaderShellClasses(scrolled)}`}
      >
        <div className="relative shrink-0 lg:z-[60]">
          <SiteHeaderBrand compact={scrolled} />
        </div>

        <nav className="relative z-0 hidden min-w-0 items-center justify-center lg:flex" aria-label={t.ariaLabels?.mainNav ?? "Main navigation"}>
          <div className="flex max-w-full flex-nowrap items-center justify-center gap-1 lg:gap-1.5 xl:gap-2 2xl:gap-2.5">
            <Link href="/" className={`relative z-[60] ${navItemClass}`} onClick={closeMenus}>
              {t.navHome}
            </Link>
            {menuItems.map((group, groupIdx) => {
              const enGroup = enMenu[groupIdx];
              const menuKey = enGroup?.label || group.label;
              const isServicesMenu = isServicesMegaMenuGroup(enGroup);
              const isAboutEden = isAboutMegaMenuGroup(enGroup);
              const isCareers = enGroup?.label === "Careers";
              const isProviders = enGroup?.label === "For Providers";
              const isResources = enGroup?.label === "Resources";
              const isMegaMenu = isServicesMenu || isAboutEden || isCareers || isResources || isProviders;
              const isDropdownOpen = openDropdown === menuKey;
              const dropdownPanelClass = getDropdownPanelClass(isDropdownOpen);
              const isActive =
                (isCareers && isCareersActive) ||
                (isAboutEden && (pathname.startsWith("/about") || pathname === "/contact")) ||
                (isProviders && isProvidersActive) ||
                false;

              return (
                <div key={group.label} className="group relative shrink-0" data-nav-menu>
                  <button
                    type="button"
                    onClick={() => toggleDropdown(menuKey)}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-0.5 ${navItemClass} group-hover:bg-emerald-50 group-hover:text-emerald-900 ${isDropdownOpen || isActive ? "bg-emerald-50 text-emerald-900" : ""}`}
                  >
                    {group.label}
                    <ChevronDown size={12} className="shrink-0 opacity-70 2xl:size-[14px]" />
                  </button>

                  <div
                    className={`absolute left-1/2 top-[calc(100%+0.25rem)] z-50 -translate-x-1/2 transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${dropdownPanelClass} ${
                      isMegaMenu ? "w-auto" : "w-[560px] rounded-[1.4rem] border border-slate-100 bg-white p-5 shadow-2xl shadow-slate-900/10"
                    }`}
                  >
                    {isServicesMenu ? (
                      <AbaTherapyMegaMenu
                        onNavigate={(menuLinkLabel) => onMenuLink(menuLinkLabel)}
                        getDisplayTitle={getAbaDisplayTitle}
                        getSectionTitle={getAbaSectionTitle}
                        servicesLabel={abaServicesLabel}
                      />
                    ) : isAboutEden ? (
                      <AboutEdenMegaMenu
                        onNavigate={(menuLinkLabel) => onMenuLink(menuLinkLabel)}
                        onStart={() => window.location.assign("/intake")}
                        getDisplayTitle={getAboutDisplayTitle}
                        sectionLabel={aboutSectionLabel}
                        defaultTitle={aboutMenuGroup?.label || "About Eden"}
                        defaultPreview={{
                          ...aboutEdenDefaultPreview,
                          description: aboutDefaultDescription,
                        }}
                      />
                    ) : isCareers ? (
                      <CareersMegaMenu onNavigate={onCareersNavigate} />
                    ) : isProviders ? (
                      <ProvidersMegaMenu onNavigate={onProvidersNavigate} />
                    ) : isResources ? (
                      <ResourcesMegaMenu
                        onNavigate={(menuLinkLabel) => onMenuLink(menuLinkLabel)}
                        getDisplayTitle={getResourcesDisplayTitle}
                        getSectionTitle={getResourcesSectionTitle}
                        defaultTitle={resourcesDefaultTitle}
                        defaultPreview={{
                          ...resourcesDefaultPreview,
                          description: resourcesDefaultDescription,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2">
          <LanguageSwitcher comfortable className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="relative z-[21] rounded-full border border-emerald-100 p-2 lg:hidden"
            aria-label={open ? (t.ariaLabels?.closeMenu ?? "Close menu") : (t.ariaLabels?.openMenu ?? "Open menu")}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-[60] border-t border-emerald-100 bg-white lg:hidden dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="grid gap-2 p-4">
              <Link
                href="/"
                className="rounded-2xl bg-emerald-50/50 p-3 text-left font-black text-emerald-950 dark:bg-slate-900 dark:text-white"
                onClick={closeMenus}
              >
                {t.navHome}
              </Link>
              {menuItems.map((group, groupIdx) => {
                const enGroup = enMenu[groupIdx];
                const isServicesMenu = isServicesMegaMenuGroup(enGroup);
                const isAboutEden = isAboutMegaMenuGroup(enGroup);
                const isCareers = enGroup?.label === "Careers";
                const isProviders = enGroup?.label === "For Providers";
                const isResources = enGroup?.label === "Resources";

                return (
                  <details key={group.label} className="rounded-2xl bg-emerald-50/50 p-3 dark:bg-slate-900">
                    <summary className="cursor-pointer font-black text-emerald-950 dark:text-white">{group.label}</summary>
                    {isServicesMenu ? (
                      <div className="pt-3">
                        <AbaTherapyMegaMenu
                          variant="mobile"
                          onNavigate={(menuLinkLabel) => onMenuLink(menuLinkLabel)}
                          getDisplayTitle={getAbaDisplayTitle}
                          getSectionTitle={getAbaSectionTitle}
                          servicesLabel={abaServicesLabel}
                          onClose={() => setOpen(false)}
                        />
                      </div>
                    ) : isAboutEden ? (
                      <div className="pt-3">
                        <AboutEdenMegaMenu
                          variant="mobile"
                          onNavigate={(menuLinkLabel) => onMenuLink(menuLinkLabel)}
                          onStart={() => {
                            window.location.assign("/intake");
                            setOpen(false);
                          }}
                          getDisplayTitle={getAboutDisplayTitle}
                          sectionLabel={aboutSectionLabel}
                          defaultTitle={aboutMenuGroup?.label || "About Eden"}
                          defaultPreview={{
                            ...aboutEdenDefaultPreview,
                            description: aboutDefaultDescription,
                          }}
                          onClose={() => setOpen(false)}
                        />
                      </div>
                    ) : isCareers ? (
                      <div className="pt-3">
                        <CareersMegaMenu
                          variant="mobile"
                          onNavigate={onCareersNavigate}
                          onClose={() => setOpen(false)}
                        />
                      </div>
                    ) : isProviders ? (
                      <div className="pt-3">
                        <ProvidersMegaMenu
                          variant="mobile"
                          onNavigate={onProvidersNavigate}
                          onClose={() => setOpen(false)}
                        />
                      </div>
                    ) : isResources ? (
                      <div className="pt-3">
                        <ResourcesMegaMenu
                          variant="mobile"
                          onNavigate={(menuLinkLabel) => onMenuLink(menuLinkLabel)}
                          getDisplayTitle={getResourcesDisplayTitle}
                          getSectionTitle={getResourcesSectionTitle}
                          defaultTitle={resourcesDefaultTitle}
                          defaultPreview={{
                            ...resourcesDefaultPreview,
                            description: resourcesDefaultDescription,
                          }}
                          onClose={() => setOpen(false)}
                        />
                      </div>
                    ) : (
                      group.columns.flatMap((col, colIdx) =>
                        col.links.map((link, linkIdx) => {
                          const enLink = enGroup.columns[colIdx].links[linkIdx];
                          const { key, displayLabel, badge, comingSoon } = parseMenuLinkEntry(link, enLink);

                          if (comingSoon) {
                            return (
                              <div
                                key={String(key)}
                                aria-disabled="true"
                                className="block w-full cursor-default rounded-xl px-2 py-2.5 text-left"
                              >
                                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                  <span className="text-sm font-black text-slate-600">{String(displayLabel)}</span>
                                  <MenuLinkBadge badge={badge} />
                                </span>
                              </div>
                            );
                          }

                          return (
                            <button
                              key={String(key)}
                              type="button"
                              onClick={() => onMenuLink(String(enLink))}
                              className="block w-full rounded-xl px-2 py-2.5 text-left text-sm font-black text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                            >
                              {String(displayLabel)}
                            </button>
                          );
                        }),
                      )
                    )}
                  </details>
                );
              })}
              <LanguageSwitcher comfortable className="justify-center" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
