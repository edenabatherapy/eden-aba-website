"use client";

import { useCallback, useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import {
  hasCookieConsentChoice,
  readCookieConsent,
  saveCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent";

const COPY = {
  title: "Cookie Consent & Preferences",
  message:
    "We use cookies to improve your experience and understand how families use our website.",
  acceptAll: "Accept All Cookies",
  preferences: "Cookie Preferences",
  preferencesTitle: "Cookie Preferences",
  preferencesIntro:
    "Choose how Eden ABA Therapy uses cookies. Essential cookies help the site function. Analytics cookies help us improve the family experience.",
  essentialOnly: "Essential Only",
  savePreferences: "Save Preferences",
  reopenLabel: "Cookie settings",
};

export default function CookieConsentBanner() {
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
          aria-label="Cookie consent"
        >
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 sm:items-center">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eef9f4] text-[#0F8F4F]">
                  <Cookie size={20} aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-black text-[#12345A]">{COPY.title}</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                    {COPY.message}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => persistChoice("accepted")}
                  className="rounded-full bg-[#0F8F4F] px-5 py-2.5 text-sm font-extrabold text-white shadow-md transition hover:bg-[#0d7a43]"
                >
                  {COPY.acceptAll}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVisible(false);
                    setPrefsOpen(true);
                  }}
                  className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  {COPY.preferences}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {prefsOpen ? (
        <div
          className="fixed inset-0 z-[95] flex items-end justify-center bg-slate-900/45 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-prefs-title"
        >
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <h2 id="cookie-prefs-title" className="text-xl font-black text-[#12345A]">
                {COPY.preferencesTitle}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setPrefsOpen(false);
                  if (!hasCookieConsentChoice()) setVisible(true);
                }}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close cookie preferences"
              >
                <X size={20} />
              </button>
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
              {COPY.preferencesIntro}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => persistChoice("accepted")}
                className="rounded-full bg-[#0F8F4F] px-5 py-3 text-sm font-extrabold text-white"
              >
                {COPY.acceptAll}
              </button>
              <button
                type="button"
                onClick={() => persistChoice("essential-only")}
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-extrabold text-slate-700"
              >
                {COPY.essentialOnly}
              </button>
              <button
                type="button"
                onClick={() => persistChoice("essential-only")}
                className="rounded-full border border-[#0F8F4F]/30 bg-[#eef9f4] px-5 py-3 text-sm font-extrabold text-[#0F8F4F]"
              >
                {COPY.savePreferences}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showReopen && !visible && !prefsOpen ? (
        <button
          type="button"
          onClick={() => setPrefsOpen(true)}
          className="fixed bottom-6 left-6 z-[88] grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-[#0F8F4F] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          aria-label={COPY.reopenLabel}
          title={COPY.reopenLabel}
        >
          <Cookie size={18} aria-hidden />
        </button>
      ) : null}
    </>
  );
}
