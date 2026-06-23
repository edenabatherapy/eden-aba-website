"use client";

import { useCallback, useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import {
  hasCookieConsentChoice,
  readCookieConsent,
  saveCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";

export default function CookieConsentBanner() {
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const copy = t.cookieConsent || {
    title: "Cookie Consent & Preferences",
    message: "We use cookies to improve your experience and understand how families use our website.",
    acceptAll: "Accept All Cookies",
    preferences: "Cookie Preferences",
    preferencesTitle: "Cookie Preferences",
    preferencesIntro:
      "Choose how Eden ABA Therapy uses cookies. Essential cookies help the site function. Analytics cookies help us improve the family experience.",
    essentialOnly: "Essential Only",
    savePreferences: "Save Preferences",
    reopenLabel: "Cookie settings",
  };

  const [visible, setVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [showReopen, setShowReopen] = useState(false);

  useEffect(() => {
    const existing = readCookieConsent();
    if (existing) {
      setShowReopen(true);
      setVisible(false);
    } else {
      const timer = window.setTimeout(() => setVisible(true), 700);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, []);

  const persistChoice = useCallback((status: CookieConsentChoice) => {
    saveCookieConsent(status);
    setVisible(false);
    setPrefsOpen(false);
    setShowReopen(true);
  }, []);

  if (!visible && !prefsOpen && !showReopen) {
    return null;
  }

  return (
    <>
      {visible ? (
        <div
          className="fixed bottom-5 left-1/2 z-[90] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 sm:bottom-6"
          role="dialog"
          aria-label={copy.title}
        >
          <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Cookie size={20} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-black text-slate-900">{copy.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{copy.message}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => persistChoice("accepted")}
                    className="rounded-full bg-[#1f7a2e] px-5 py-2.5 text-sm font-black text-white transition hover:bg-[#166534]"
                  >
                    {copy.acceptAll}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVisible(false);
                      setPrefsOpen(true);
                    }}
                    className="rounded-full border border-emerald-200 px-5 py-2.5 text-sm font-black text-emerald-800 transition hover:bg-emerald-50"
                  >
                    {copy.preferences}
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
                aria-label="Close cookie banner"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {prefsOpen ? (
        <div className="fixed inset-0 z-[95] flex items-end justify-center bg-slate-900/40 p-4 sm:items-center">
          <div
            role="dialog"
            aria-label={copy.preferencesTitle}
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
          >
            <h2 className="text-xl font-black text-slate-900">{copy.preferencesTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{copy.preferencesIntro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => persistChoice("essential-only")}
                className="rounded-full border border-emerald-200 px-5 py-2.5 text-sm font-black text-emerald-800 transition hover:bg-emerald-50"
              >
                {copy.essentialOnly}
              </button>
              <button
                type="button"
                onClick={() => persistChoice("accepted")}
                className="rounded-full bg-[#1f7a2e] px-5 py-2.5 text-sm font-black text-white transition hover:bg-[#166534]"
              >
                {copy.savePreferences}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showReopen && !visible && !prefsOpen ? (
        <button
          type="button"
          onClick={() => setPrefsOpen(true)}
          className="fixed bottom-5 left-5 z-[80] inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-black text-emerald-800 shadow-lg"
        >
          <Cookie size={14} aria-hidden="true" />
          {copy.reopenLabel}
        </button>
      ) : null}
    </>
  );
}
