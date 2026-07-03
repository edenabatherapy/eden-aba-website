"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import {
  ALL_COOKIE_CATEGORIES_ACCEPTED,
  NECESSARY_ONLY_PREFERENCES,
  readCookieConsent,
  saveAcceptedAllCookieConsent,
  saveCookieConsent,
  saveDeniedCookieConsent,
  type CookieCategoryPreferences,
} from "@/lib/cookie-consent";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";

type ModalTab = "consent" | "details" | "about";

const CATEGORY_IDS = ["necessary", "preferences", "statistics", "marketing"] as const;

const DEFAULT_COPY = {
  title: "This website uses cookies",
  message:
    "Eden ABA Therapy uses cookies to improve your experience, remember preferences, and understand how families use our website. You can choose which optional cookies to allow.",
  acceptAll: "Accept All",
  allowSelection: "Allow Selection",
  deny: "Deny",
  showDetails: "Show Details",
  modalTitle: "Cookie Preferences",
  tabs: { consent: "Consent", details: "Details", about: "About" },
  categories: {
    necessary: {
      title: "Necessary",
      description: "Required for the website to function. These cannot be disabled.",
    },
    preferences: {
      title: "Preferences",
      description: "Remember your settings, such as language and display choices.",
    },
    statistics: {
      title: "Statistics",
      description: "Help us understand how visitors use the site so we can improve the family experience.",
    },
    marketing: {
      title: "Marketing",
      description: "May be used to deliver relevant Eden ABA Therapy information on other platforms.",
    },
  },
  alwaysActive: "Always active",
  saveSelection: "Allow Selection",
  aboutIntro:
    "Eden ABA Therapy respects your privacy. Cookies are small files stored on your device. We do not sell personal data.",
  aboutAnalytics:
    "Statistics cookies may support anonymous analytics tools when you allow them. Optional cookies are only used after you consent.",
  privacyLink: "Privacy Policy",
  closeModal: "Close preferences",
};

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition ${
        disabled
          ? "cursor-not-allowed bg-emerald-200"
          : checked
            ? "bg-[#1f7a2e]"
            : "bg-slate-300"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function CookieConsentBanner() {
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const copy = { ...DEFAULT_COPY, ...(t.cookieConsent || {}) };
  const titleId = useId();
  const modalTitleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [consentResolved, setConsentResolved] = useState<boolean | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ModalTab>("consent");
  const [draft, setDraft] = useState<CookieCategoryPreferences>(ALL_COOKIE_CATEGORIES_ACCEPTED);

  useEffect(() => {
    const existing = readCookieConsent();
    if (existing) {
      setConsentResolved(true);
      return undefined;
    }

    setConsentResolved(false);
    const timer = window.setTimeout(() => setBannerVisible(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const finishConsent = useCallback(() => {
    setBannerVisible(false);
    setModalOpen(false);
    setConsentResolved(true);
  }, []);

  const handleAcceptAll = useCallback(() => {
    saveAcceptedAllCookieConsent();
    finishConsent();
  }, [finishConsent]);

  const handleDeny = useCallback(() => {
    saveDeniedCookieConsent();
    finishConsent();
  }, [finishConsent]);

  const openModal = useCallback((tab: ModalTab) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setDraft({ ...NECESSARY_ONLY_PREFERENCES });
    setActiveTab(tab);
    setBannerVisible(false);
    setModalOpen(true);
  }, []);

  const handleSaveSelection = useCallback(() => {
    saveCookieConsent(draft);
    finishConsent();
  }, [draft, finishConsent]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    if (!readCookieConsent()) {
      setBannerVisible(true);
    }
    previousFocusRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!modalOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(() => {
      modalRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [modalOpen, closeModal]);

  if (consentResolved) {
    return null;
  }

  return (
    <>
      {bannerVisible ? (
        <div
          className="fixed inset-x-0 bottom-0 z-[90] border-t border-emerald-100 bg-white/98 shadow-[0_-12px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-5">
            <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700"
                aria-hidden="true"
              >
                <Cookie size={18} />
              </div>
              <div className="min-w-0">
                <h2 id={titleId} className="text-sm font-black text-slate-900 sm:text-base">
                  {copy.title}
                </h2>
                <p className="mt-1 text-xs leading-6 text-slate-600 sm:text-sm">{copy.message}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:justify-end">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="rounded-full bg-[#1f7a2e] px-4 py-2 text-xs font-black text-white transition hover:bg-[#166534] sm:px-5 sm:text-sm"
              >
                {copy.acceptAll}
              </button>
              <button
                type="button"
                onClick={() => openModal("consent")}
                className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-black text-emerald-800 transition hover:bg-emerald-50 sm:px-5 sm:text-sm"
              >
                {copy.allowSelection}
              </button>
              <button
                type="button"
                onClick={handleDeny}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-50 sm:px-5 sm:text-sm"
              >
                {copy.deny}
              </button>
              <button
                type="button"
                onClick={() => openModal("details")}
                className="rounded-full px-3 py-2 text-xs font-bold text-emerald-800 underline decoration-emerald-300 underline-offset-2 transition hover:text-emerald-900 sm:text-sm"
              >
                {copy.showDetails}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {modalOpen ? (
        <div className="fixed inset-0 z-[95] flex items-end justify-center bg-slate-900/45 p-0 sm:items-center sm:p-4">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2 id={modalTitleId} className="text-lg font-black text-slate-900 sm:text-xl">
                  {copy.modalTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
                aria-label={copy.closeModal}
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex gap-1 border-b border-slate-100 px-4 pt-2 sm:px-6" role="tablist">
              {(["consent", "details", "about"] as ModalTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-t-xl px-4 py-2.5 text-sm font-black transition ${
                    activeTab === tab
                      ? "border-b-2 border-[#1f7a2e] text-emerald-800"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {copy.tabs[tab]}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              {activeTab === "consent" ? (
                <div className="space-y-4" role="tabpanel">
                  {CATEGORY_IDS.map((categoryId) => {
                      const category = copy.categories[categoryId];
                      const isNecessary = categoryId === "necessary";
                      const checked = isNecessary ? true : draft[categoryId];

                      return (
                        <div
                          key={categoryId}
                          className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <h3 className="text-sm font-black text-slate-900">{category.title}</h3>
                              <p className="mt-1 text-sm leading-6 text-slate-600">
                                {category.description}
                              </p>
                            </div>
                            {isNecessary ? (
                              <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">
                                {copy.alwaysActive}
                              </span>
                            ) : (
                              <Toggle
                                checked={checked}
                                label={category.title}
                                onChange={(next) =>
                                  setDraft((current) => ({ ...current, [categoryId]: next }))
                                }
                              />
                            )}
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              ) : null}

              {activeTab === "details" ? (
                <div className="space-y-4 text-sm leading-7 text-slate-600" role="tabpanel">
                  <p>{copy.message}</p>
                  <ul className="space-y-3">
                    {CATEGORY_IDS.map((categoryId) => (
                      <li
                        key={categoryId}
                        className="rounded-2xl border border-slate-100 bg-white px-4 py-3"
                      >
                        <p className="font-black text-slate-900">{copy.categories[categoryId].title}</p>
                        <p className="mt-1">{copy.categories[categoryId].description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {activeTab === "about" ? (
                <div className="space-y-4 text-sm leading-7 text-slate-600" role="tabpanel">
                  <p>{copy.aboutIntro}</p>
                  <p>{copy.aboutAnalytics}</p>
                  <p>
                    <Link
                      href="/privacy-policy"
                      className="font-bold text-emerald-800 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-900"
                    >
                      {copy.privacyLink}
                    </Link>
                  </p>
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2 border-t border-slate-100 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="rounded-full bg-[#1f7a2e] px-5 py-2.5 text-sm font-black text-white transition hover:bg-[#166534]"
              >
                {copy.acceptAll}
              </button>
              <button
                type="button"
                onClick={handleSaveSelection}
                className="rounded-full border border-emerald-200 px-5 py-2.5 text-sm font-black text-emerald-800 transition hover:bg-emerald-50"
              >
                {copy.saveSelection}
              </button>
              <button
                type="button"
                onClick={handleDeny}
                className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
              >
                {copy.deny}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
