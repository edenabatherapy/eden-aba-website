"use client";

import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InsuranceVerificationForm from "@/components/InsuranceVerificationForm";
import MChatScreenerPage from "@/components/MChatScreenerPage";
import AutismEvaluationPage from "@/components/AutismEvaluationPage";
import CastScreenerPage from "@/components/CastScreenerPage";
import CastQuestionnaire from "@/components/CastQuestionnaire";
import Ados2AssessmentPage from "@/components/Ados2AssessmentPage";
import IdeEvaluationPage from "@/components/IdeEvaluationPage";
import AutismScreenerFaqsPage from "@/components/AutismScreenerFaqsPage";
import ParentGuidancePage from "@/components/ParentGuidancePage";
import AdvancedIntakeForm from "@/components/intake/AdvancedIntakeForm";
import GoogleReviews from "@/components/GoogleReviews";
import FooterFindCenter from "@/components/FooterFindCenter";
import GoogleMapInteractive from "@/components/GoogleMapInteractive";
import { getButtonClasses } from "@/lib/button-styles";
import { getDirectionsUrl } from "@/lib/eden-location";
import {
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  ClipboardCheck,
  Users,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  CheckCircle2,
  LockKeyhole,
  CalendarDays,
  FileText,
  GraduationCap,
  BriefcaseBusiness,
  Stethoscope,
  Home,
  Building2,
  School,
  MessageCircle,
  Star,
  Search,
  ChevronDown,
  UploadCloud,
  UserRound,
  Baby,
  BadgeCheck,
  Clock3,
  BarChart3,
  FileSignature,
  CreditCard,
  Sparkles,
  Filter,
  PlayCircle,
  ExternalLink,
  AlertCircle,
  Check,
} from "lucide-react";
import {
  getTranslation,
  getMeta,
  getMenu,
  getJobs,
  getServiceData,
  getIntakeSteps,
  getEdenLocations,
  getEdenBusinessInfo,
  STORAGE_KEY,
} from "@/lib/i18n";
import { handleMenuLink } from "@/lib/navigation";
import { getPagePath, KNOWN_PAGES, resolveActivePage } from "@/lib/site-routes";
import { SITE_IMAGES } from "@/lib/site-images";

const logoPath = "/logo.png";

const brandColors = {
  forest: "#1f7a2e",
  leaf: "#58b82e",
  teal: "#128c8c",
  aqua: "#49b8c8",
  orange: "#ff8a1f",
  gold: "#f7c72f",
  lime: "#b6d930",
  cream: "#fff8df",
};

const SERVICE_ICONS = [Home, Building2, School, Users];
const INTAKE_STEP_ICONS = [FileText, CreditCard, FileSignature, UserRound, ClipboardCheck, HeartHandshake];
const HEADER_EVAL_ICONS = [ClipboardCheck, Users, ShieldCheck, CalendarDays];

const IMG = SITE_IMAGES;


function LanguageSwitcher({ language, setLanguage }) {
  const t = getTranslation(language);

  const chooseLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, nextLanguage);
    }
  };

  return (
    <div className="flex overflow-hidden rounded-full border border-[#49b8c8]/40 bg-white p-1 shadow-lg shadow-[#128c8c]/10">
      <button type="button" onClick={() => chooseLanguage("en")} aria-pressed={language === "en"} className={`rounded-full px-4 py-2 text-xs font-black transition ${language === "en" ? "bg-[#1f7a2e] text-white" : "text-[#0b4f4f] hover:bg-[#49b8c8]/10"}`}>
        {t.english}
      </button>
      <button type="button" onClick={() => chooseLanguage("vi")} aria-pressed={language === "vi"} className={`rounded-full px-4 py-2 text-xs font-black transition ${language === "vi" ? "bg-[#1f7a2e] text-white" : "text-[#0b4f4f] hover:bg-[#49b8c8]/10"}`}>
        {t.vietnamese}
      </button>
    </div>
  );
}

function LogoImage({ t, alt, className = "h-14 w-auto" }) {
  const [failed, setFailed] = useState(false);
  const altText = alt || t?.logo?.alt || t?.logo?.defaultAlt || "Eden ABA Therapy";

  if (failed) {
    return (
      <div className={`grid place-items-center rounded-2xl bg-white px-4 py-2 text-center font-black leading-tight text-emerald-800 shadow-sm ${className}`}>
        <span className="text-sm">{t?.logo?.fallbackLine1 || "EDEN"}</span>
        <span className="text-[10px] tracking-wide">{t?.logo?.fallbackLine2 || "ABA THERAPY"}</span>
      </div>
    );
  }

  return <img src={logoPath} alt={altText} className={className} onError={() => setFailed(true)} />;
}

function Button({ children, variant = "primary", className = "", type = "button", ...props }) {
  const variantMap = {
    primary: "primarySite",
    secondary: "secondarySite",
    dark: "dark",
    gold: "gold",
  };
  return (
    <button
      type={type}
      {...props}
      className={getButtonClasses(variantMap[variant] || "primarySite", className, "sm")}
    >
      {children}
    </button>
  );
}

function ImageCard({ src, alt, className = "h-[420px]", priority = false }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={`w-full rounded-[2.5rem] object-cover shadow-2xl ring-8 ring-white ${className}`}
    />
  );
}

function SplitSection({ id, eyebrow, title, image, reverse = false, children }) {
  const imageEl = <ImageCard src={image[0]} alt={image[1]} />;
  const textEl = (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">{title}</h2>
      <div className="mt-6 space-y-6 text-lg font-semibold leading-9 text-slate-700">{children}</div>
    </div>
  );

  return (
    <section id={id} className="scroll-mt-28 bg-[#eef9f4] px-4 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        {reverse ? (<>{textEl}{imageEl}</>) : (<>{imageEl}{textEl}</>)}
      </div>
    </section>
  );
}

function InfoCard({ Icon, title, text }) {
  return (
    <article className="rounded-[1.6rem] border border-slate-100 bg-white p-5 shadow-sm">
      <Icon className="text-[#1f7a2e]" size={28} />
      <h3 className="mt-4 text-xl font-black text-[#0b4f4f]">{title}</h3>
      <p className="mt-2 font-semibold leading-7 text-slate-700">{text}</p>
    </article>
  );
}

function Header({ onStart, onNavigate, language, setLanguage }) {
  const [open, setOpen] = useState(false);
  const t = getTranslation(language);
  const menuItems = getMenu(language);
  const enMenu = getMenu("en");
  const evalHeader = t.headerEvaluation;

  const onMenuLink = (enLinkLabel) => {
    handleMenuLink(enLinkLabel, { onNavigate, onStart });
  };

  const goHome = () => {
    onNavigate?.("home");
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#49b8c8]/20 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <button type="button" onClick={goHome} className="flex items-center gap-3 text-left transition hover:opacity-90">
          <LogoImage t={t} className="h-14 w-auto" />
          <div className="hidden sm:block">
            <p className="text-lg font-black tracking-tight text-[#1f7a2e]">{t.brandName}</p>
            <p className="text-xs font-bold text-[#128c8c]">{t.brandTagline}</p>
          </div>
        </button>

        <nav className="hidden items-center gap-1 xl:flex">
          <button
            type="button"
            onClick={goHome}
            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
          >
            {t.navHome}
          </button>
          {menuItems.map((group, groupIdx) => {
            const enGroup = enMenu[groupIdx];
            const isLocations = enGroup?.label === "Locations";

            return (
              <div key={group.label} className="group relative">
                {isLocations ? (
                  <button
                    type="button"
                    onClick={() => onNavigate?.("locations")}
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    {group.label}
                  </button>
                ) : (
                  <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800 group-hover:bg-emerald-50 group-hover:text-emerald-900">
                    {group.label}
                    <ChevronDown size={15} />
                  </button>
                )}

                {!isLocations && (
                  <div className="invisible absolute left-1/2 top-12 w-[560px] -translate-x-1/2 translate-y-3 rounded-[1.4rem] border border-slate-100 bg-white p-5 opacity-0 shadow-2xl shadow-slate-900/10 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="grid gap-5 md:grid-cols-2">
                      {group.type === "evaluation" && (
                        <div className="overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 text-white shadow-xl">
                          <div className="border-b border-white/10 p-5">
                            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-100">
                              {evalHeader.eyebrow}
                            </p>
                            <h3 className="mt-3 text-2xl font-black leading-tight">
                              {evalHeader.title}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-emerald-50">
                              {evalHeader.text}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 p-5">
                            {evalHeader.cards.map(([cardTitle, cardText], cardIdx) => {
                              const Icon = HEADER_EVAL_ICONS[cardIdx];
                              const isScheduling = cardIdx === 3;
                              const isParentGuidance = cardIdx === 1;
                              const cardBody = (
                                <>
                                  <Icon className="text-yellow-300" size={26} />
                                  <p className="mt-3 text-sm font-black">{cardTitle}</p>
                                  <p className="mt-1 text-xs text-emerald-50">{cardText}</p>
                                </>
                              );
                              return isScheduling ? (
                                <button
                                  key={cardTitle}
                                  type="button"
                                  onClick={() => onNavigate?.("autism-assessment")}
                                  className="rounded-2xl bg-white/10 p-4 text-left backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                >
                                  {cardBody}
                                </button>
                              ) : isParentGuidance ? (
                                <button
                                  key={cardTitle}
                                  type="button"
                                  onClick={() => onNavigate?.("parent-guidance")}
                                  className="rounded-2xl bg-white/10 p-4 text-left backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                >
                                  {cardBody}
                                </button>
                              ) : (
                                <div key={cardTitle} className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                                  {cardBody}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {group.columns.map((col, colIdx) => (
                        <div key={col.title}>
                          <p className="mb-2 border-b border-slate-100 pb-2 text-xs font-black uppercase tracking-widest text-slate-500">
                            {col.title}
                          </p>

                          {col.links.map((link, linkIdx) => {
                            const enLink = enGroup.columns[colIdx].links[linkIdx];
                            return (
                              <button
                                key={enLink}
                                type="button"
                                onClick={() => onMenuLink(enLink)}
                                className="block w-full rounded-xl px-2 py-2.5 text-left text-sm font-black text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                              >
                                {link}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Button onClick={() => onStart()}>
            {t.startABA} <ArrowRight size={16} />
          </Button>
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>

        <button onClick={() => setOpen(!open)} className="rounded-full border border-emerald-100 p-2 xl:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-emerald-100 bg-white xl:hidden">
            <div className="grid gap-2 p-4">
              <button
                type="button"
                onClick={goHome}
                className="rounded-2xl bg-emerald-50/50 p-3 text-left font-black text-emerald-950"
              >
                {t.navHome}
              </button>
              {menuItems.map((group, groupIdx) => {
                const enGroup = enMenu[groupIdx];
                const isLocations = enGroup?.label === "Locations";

                return isLocations ? (
                  <button
                    key={group.label}
                    type="button"
                    onClick={() => {
                      onNavigate?.("locations");
                      setOpen(false);
                    }}
                    className="rounded-2xl bg-emerald-50/50 p-3 text-left font-black text-emerald-950"
                  >
                    {t.navLocations}
                  </button>
                ) : (
                  <details key={group.label} className="rounded-2xl bg-emerald-50/50 p-3">
                    <summary className="cursor-pointer font-black text-emerald-950">{group.label}</summary>
                    {group.columns.flatMap((col, colIdx) =>
                      col.links.map((link, linkIdx) => {
                        const enLink = enGroup.columns[colIdx].links[linkIdx];
                        return (
                          <button
                            key={enLink}
                            type="button"
                            onClick={() => {
                              onMenuLink(enLink);
                              setOpen(false);
                            }}
                            className="block w-full py-2 pl-3 text-left text-sm font-semibold text-slate-700"
                          >
                            {link}
                          </button>
                        );
                      })
                    )}
                  </details>
                );
              })}

              <div className="mt-3 flex justify-center">
                <LanguageSwitcher language={language} setLanguage={setLanguage} />
              </div>

              <Button onClick={() => onStart()} className="mt-2 w-full">
                {t.startABA}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LocationSearchBox({ onStart, onFindCare, t }) {
  const [query, setQuery] = useState("");

  const openLocationsPage = () => {
    if (typeof onFindCare === "function") {
      onFindCare(query);
    }

    if (typeof window !== "undefined") {
      window.location.hash = "locations";
      window.dispatchEvent(new CustomEvent("eden:navigate", { detail: "locations" }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    openLocationsPage();
  };

  return (
    <div className="mt-10 max-w-4xl rounded-[2rem] bg-white p-6 shadow-2xl shadow-[#128c8c]/10 ring-1 ring-[#49b8c8]/30">
      <form onSubmit={handleSubmit}>
        <label className="mb-4 block text-lg font-black text-[#0b4f4f]">{t.finderTitle}</label>
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600" size={22} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-4 pl-14 pr-5 text-base font-bold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              placeholder={t.finderPlaceholder}
            />
          </div>
          <a
            href="#locations"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              openLocationsPage();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#1f7a2e] px-8 py-4 font-black text-white shadow-lg shadow-[#128c8c]/20 transition hover:bg-[#ff8a1f]"
          >
            {t.findCare} <ArrowRight className="ml-2 inline" size={18} />
          </a>
        </div>
      </form>

      <div className="mt-5 flex flex-wrap gap-5 text-sm font-bold text-slate-600">
        <button type="button" onClick={onStart} className="inline-flex items-center gap-2 hover:text-emerald-700">
          <CheckCircle2 size={16} className="text-emerald-600" /> {t.abaRightForMe}
        </button>
        <button type="button" onClick={onStart} className="inline-flex items-center gap-2 hover:text-emerald-700">
          <CheckCircle2 size={16} className="text-emerald-600" /> {t.asdSupport}
        </button>
      </div>
    </div>
  );
}

function AutismAwarenessCounter({ t }) {
  const a = t.pages.autismAwareness;
  const s = a.stats;
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!now) {
    return (
      <section className="relative overflow-hidden bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="relative mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-black italic tracking-tight text-[#128c8c] md:text-5xl">
            {a.title}
          </h2>
        </div>
      </section>
    );
  }

  const midnight = new Date(now);
  midnight.setHours(0, 0, 0, 0);
  const secondsToday = Math.max(0, Math.floor((now.getTime() - midnight.getTime()) / 1000));
  const minutesToday = secondsToday / 60;
  const birthsToday = Math.floor(minutesToday * 7);
  const estimatedAutismPrevalence = Math.floor(birthsToday / 31);
  const dayProgress = Math.min(100, (secondsToday / 86400) * 100);
  const timeLabel = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" });

  return (
    <section className="relative overflow-hidden bg-[#eef9f4] px-4 py-20 lg:px-8">
      <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#49b8c8]/20 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#f7c72f]/25 blur-3xl" />

      {/* TODO: Replace with final brand photo — warm family-focused autism care decoration. */}
      <img
        src={IMG.home.awarenessDecoLeft}
        alt={a.imageAlts.childActivity}
        className="pointer-events-none absolute left-6 top-24 hidden h-40 w-40 rounded-full object-cover opacity-70 shadow-2xl ring-8 ring-white lg:block xl:h-52 xl:w-52"
      />
      {/* TODO: Replace with final brand photo — therapist supporting child in welcoming environment. */}
      <img
        src={IMG.home.awarenessDecoRight}
        alt={a.imageAlts.therapistSupport}
        className="pointer-events-none absolute right-8 bottom-24 hidden h-40 w-40 rounded-full object-cover opacity-70 shadow-2xl ring-8 ring-white lg:block xl:h-52 xl:w-52"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mx-auto inline-flex rounded-full border border-[#49b8c8]/40 bg-white px-5 py-3 text-sm font-black text-[#128c8c] shadow-lg shadow-[#128c8c]/10">
          {a.cdcBadge}
        </div>

        <h2 className="mt-7 text-4xl font-black italic tracking-tight text-[#128c8c] md:text-5xl">
          {a.title}
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-700">
          {a.intro}
        </p>
        <p className="mt-4 text-base font-black text-[#1f7a2e]">
          {a.tagline}
        </p>
        <p className="mt-5 text-2xl font-black text-[#128c8c]">
          {a.currentTimePrefix} {timeLabel}
        </p>

        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[1.8rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
            <p className="text-base font-bold text-slate-700">{s.birthsToday.label}</p>
            <p className="mt-4 text-5xl font-black text-[#128c8c]">{birthsToday.toLocaleString()}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">{s.birthsToday.note}</p>
          </div>

          <div className="rounded-[1.8rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
            <p className="text-base font-bold text-slate-700">{s.prevalence.label}</p>
            <p className="mt-4 text-5xl font-black text-[#128c8c]">{estimatedAutismPrevalence.toLocaleString()}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">{s.prevalence.note}</p>
          </div>

          <div className="rounded-[1.8rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
            <p className="text-base font-bold text-slate-700">{s.birthsPerMinute.label}</p>
            <p className="mt-4 text-5xl font-black text-[#128c8c]">{s.birthsPerMinute.value}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">{s.birthsPerMinute.note}</p>
          </div>

          <div className="rounded-[1.8rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
            <p className="text-base font-bold text-slate-700">{s.earlySupport.label}</p>
            <p className="mt-4 text-3xl font-black leading-tight text-[#128c8c]">{s.earlySupport.value}</p>
            <div className="mt-4 grid gap-1 text-sm font-semibold text-slate-600">
              {s.earlySupport.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-[1.8rem] bg-white p-6 shadow-xl shadow-[#128c8c]/10">
          <p className="font-black text-[#0b4f4f]">{a.dayProgress}</p>
          <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-gradient-to-r from-[#1f7a2e] via-[#128c8c] to-[#f7c72f] transition-all duration-500" style={{ width: `${dayProgress}%` }} />
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-500">{dayProgress.toFixed(1)}{a.dayProgressSuffix}</p>
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-[1.8rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
          <h3 className="font-black text-[#0b4f4f]">{a.factTitle}</h3>
          <p className="mt-3 text-base font-semibold leading-7 text-slate-700">
            {a.factText}
          </p>
        </div>
      </div>
    </section>
  );
}

function Hero({ onStart, onFindCare, language }) {
  const t = getTranslation(language);
  const animatedWords = t.hero.animatedWords;
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % animatedWords.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [animatedWords.length]);
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#49b8c8]/15">
      <div className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-[#f7c72f]/35 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-[32rem] w-[32rem] rounded-full bg-[#49b8c8]/35 blur-3xl" />
      <div className="absolute left-1/2 top-28 h-40 w-40 -translate-x-1/2 rounded-full bg-[#ff8a1f]/20 blur-2xl" />
      <div className="mx-auto max-w-5xl px-4 py-20 lg:px-8 lg:py-28 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl">
          
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-[#0b4f4f] md:text-7xl">
            <span className="block">{t.hero.line1}</span>
            <span className="block">{t.hero.line2}</span>
            <span className="inline-flex items-baseline justify-center text-[#1f7a2e]">
              <span className="relative inline-flex min-w-[7.5ch] items-baseline justify-center align-baseline">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={animatedWords[wordIndex]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="inline-block leading-[0.95]"
                  >
                    {animatedWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-700">
            {t.hero.subtitle}
          </p>
          <div className="mx-auto mt-10 max-w-3xl">
            <LocationSearchBox onStart={onStart} onFindCare={onFindCare} t={t} />
          </div>
        </motion.div>

        
      </div>
    </section>
  );
}

function LocationsPage({ t, onStart }) {
  const [view, setView] = useState("list");
  const ld = t.locationsDetail;
  const pl = t.pages.locations;
  const ann = ld.annandale;
  const [distance, setDistance] = useState(ld.distanceOptions[2]);
  const location = {
    name: ann.name,
    street: ann.street,
    suite: ann.suite,
    cityStateZip: ann.cityStateZip,
    phone: ann.phone,
    fax: ann.fax,
    address: ann.address,
    hours: t.edenLocations[0]?.hours || t.edenBusinessInfo.hours,
  };
  const directionsUrl = getDirectionsUrl(location.address);

  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 bg-gradient-to-br from-white via-[#fff8df]/60 to-[#49b8c8]/10 px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">{ld.breadcrumbPrefix} <span className="text-[#128c8c]">{t.navLocations}</span></p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-6xl">
            {t.locationsPageTitle}
          </h1>
          <p className="mt-5 max-w-5xl text-lg font-semibold leading-8 text-slate-700">
            {t.locationsIntro}
          </p>

          {/* TODO: Replace with final brand photo — welcoming therapy center exterior or family entering clinic. */}
          <div className="mt-8 overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-slate-100">
            <img
              src={IMG.locations.hero}
              alt={pl.heroImageAlt}
              className="h-64 w-full object-cover md:h-80"
            />
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-[#128c8c]/10">
            <div className="relative">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1f7a2e]" size={22} />
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-14 pr-12 text-base font-bold text-slate-800 outline-none transition focus:border-[#128c8c] focus:bg-white focus:ring-4 focus:ring-[#49b8c8]/20"
                placeholder={t.currentlyUsingLocation}
                defaultValue=""
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                <X size={22} />
              </button>
            </div>

            <div className="mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-black text-slate-500">{t.distanceLabel}</span>
                {ld.distanceOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setDistance(option)}
                    className={`rounded-xl px-5 py-3 text-sm font-black transition ${distance === option ? "bg-[#1f7a2e] text-white shadow-lg shadow-[#1f7a2e]/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-600 hover:bg-slate-200">
                <Filter size={17} /> {t.filters}
              </button>
            </div>

            <div className="mt-7 flex overflow-hidden rounded-t-2xl border border-slate-200 bg-slate-100 w-fit">
              <button
                type="button"
                onClick={() => setView("list")}
                className={`px-6 py-4 text-sm font-black transition ${view === "list" ? "bg-white text-[#0b4f4f]" : "text-slate-600 hover:bg-white/70"}`}
              >
                {t.listView}
              </button>
              <button
                type="button"
                onClick={() => setView("map")}
                className={`px-6 py-4 text-sm font-black transition ${view === "map" ? "bg-white text-[#0b4f4f]" : "text-slate-600 hover:bg-white/70"}`}
              >
                {t.mapView}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f7] px-4 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {view === "map" ? (
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
              <GoogleMapInteractive t={t} address={location.address} title={pl.annandaleMapTitle} className="h-[320px] w-full sm:h-[420px] md:h-[560px]" />
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#128c8c]">{pl.brandLabel}</p>
                    <h2 className="mt-3 text-3xl font-black uppercase leading-tight tracking-tight text-[#1f7a2e] md:text-4xl">
                      {location.name}
                    </h2>
                    <div className="mt-6 space-y-1 text-base font-semibold leading-7 text-slate-800">
                      <p>{location.street}</p>
                      <p>{location.suite}</p>
                      <p>{location.cityStateZip}</p>
                    </div>
                    <p className="mt-5 text-base font-bold text-slate-800">
                      {ld.officePhone} <a className="text-[#1f7a2e] underline" href="tel:7035875238">{location.phone}</a>
                    </p>
                    <p className="mt-2 text-base font-bold text-slate-800">
                      {ld.fax} <span className="text-slate-700">{location.fax}</span>
                    </p>
                  </div>
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#fff8df] text-[#ff8a1f] shadow-sm">
                    <MapPin size={34} />
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-black text-[#0b4f4f]">{t.hours}</h3>
                  <div className="mt-4 grid gap-2">
                    {location.hours.map(([day, time]) => (
                      <div key={day} className="flex justify-between gap-5 border-b border-slate-200 pb-2 text-sm last:border-0 last:pb-0">
                        <span className="font-black text-slate-700">{day}</span>
                        <span className="font-semibold text-slate-600">{time}</span>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="mt-4 text-sm font-black text-[#128c8c] underline underline-offset-4">
                    {t.suggestHours}
                  </button>
                </div>

                <GoogleReviews
                  variant="location"
                  labels={t.pages.footer.googleReviews}
                  className="mt-8"
                />

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <Button variant="secondary" className="w-full">{t.locationDetails}</Button>
                  <Button onClick={onStart} className="w-full">{t.startABA}</Button>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f7c72f] px-6 py-3 text-sm font-extrabold text-[#0b4f4f] transition-all hover:bg-[#ff8a1f] hover:text-white"
                  >
                    {t.getDirections} <ExternalLink size={16} />
                  </a>
                </div>
              </article>

              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
                <GoogleMapInteractive t={t} address={location.address} title={pl.annandaleMapTitle} className="h-full min-h-[320px] w-full sm:min-h-[420px] md:min-h-[520px]" />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function WhatIsAutismPage({ onStart, onAssessment, t }) {
  const p = t.pages.whatIsAutism;
  const sectionNav = p.sectionNav;
  const heroStats = p.heroStats;
  const wia = IMG.whatIsAutism;
  const imageBlocks = Object.fromEntries(
    Object.entries(wia).filter(([key]) => key !== "milestones").map(([key, src]) => [key, [src, p.imageAlts[key]]])
  );
  const EARLY_ICONS = [MessageCircle, Users, PlayCircle, Sparkles];
  const COMM_ICONS = [MessageCircle, Users, HeartHandshake];
  const BEHAVIOR_ICONS = [Sparkles, Star, AlertCircle, ClipboardCheck];
  const LIFE_ICONS = [Home, School, Users];
  const DIAG_ICONS = [Search, ClipboardCheck, Stethoscope];
  const THERAPY_ICONS = [Building2, Home, Users, School];
  const earlySigns = p.earlySigns.cards.map(([title, text], i) => [EARLY_ICONS[i], title, text]);
  const communicationCards = p.communication.cards.map(([title, text], i) => [COMM_ICONS[i], title, text]);
  const behaviorCards = p.sensoryBehavior.cards.map(([title, text], i) => [BEHAVIOR_ICONS[i], title, text]);
  const lifeCards = p.sensoryBehavior.lifeCards.map(([title, text], i) => [LIFE_ICONS[i], title, text]);
  const mythFacts = p.causesMyths.mythFacts;
  const supportLevels = p.spectrum.levels;
  const diagnosisSteps = p.diagnosis.steps.map(([title, text], i) => [DIAG_ICONS[i], title, text]);
  const therapyServices = p.abaSupport.services.map(([title, text], i) => [THERAPY_ICONS[i], title, text]);
  const milestones = p.milestones.ages.map(([age, alt, items], i) => [age, wia.milestones[i], alt, items]);
  const faqOne = p.faqOne.items;
  const faqTwo = p.faqTwo.items;
  return (
    <div className="bg-[#fffaf0] text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] px-4 py-20 lg:px-8">
        <div className="absolute -right-24 top-12 h-80 w-80 rounded-full bg-[#f7c72f]/40 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#49b8c8]/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#128c8c]">{p.breadcrumb}</p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-7xl">{p.title}</h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-9 text-slate-700">
              {p.heroIntro}
            </p>
            <div className="mt-6 rounded-[2rem] border border-[#49b8c8]/25 bg-white/90 p-5 shadow-xl shadow-[#128c8c]/10">
              <p className="font-bold leading-7 text-slate-700"><span className="font-black text-[#0b4f4f]">{p.parentNotePrefix}</span> {p.parentNote}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={onAssessment}>{p.screeningSupport} <ArrowRight size={18} /></Button>
              <Button variant="secondary" onClick={onStart}>{p.startABA}</Button>
            </div>
          </div>
          <ImageCard src={imageBlocks.hero[0]} alt={imageBlocks.hero[1]} className="h-[470px]" priority />
        </div>
        <div className="relative mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-3">
          {heroStats.map(([number, label]) => (
            <div key={number} className="rounded-[2rem] border border-[#49b8c8]/20 bg-white/85 p-6 shadow-xl shadow-[#128c8c]/10 backdrop-blur">
              <p className="text-3xl font-black text-[#1f7a2e]">{number}</p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-700">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#49b8c8]/10 bg-white px-4 py-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl gap-3 overflow-x-auto" aria-label={t.ariaLabels.whatIsAutismSections}>
          {sectionNav.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-[#49b8c8]/25 bg-[#eef9f4] px-4 py-2 text-sm font-black text-[#0b4f4f] transition hover:bg-[#1f7a2e] hover:text-white">{label}</a>
          ))}
        </nav>
      </section>

      <SplitSection id="what-is-autism-overview" eyebrow={p.overview.eyebrow} title={p.overview.title} image={imageBlocks.learning}>
        {p.overview.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
        <div className="rounded-[2rem] bg-[#eef9f4] p-6 text-base font-black leading-7 text-[#0b4f4f]">{p.overview.callout}</div>
      </SplitSection>

      <section id="how-common-is-autism" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <ImageCard src={imageBlocks.community[0]} alt={imageBlocks.community[1]} />
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{p.howCommon.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">{p.howCommon.title}</h2>
            {p.howCommon.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-6 text-lg font-semibold leading-9 text-slate-700">{paragraph}</p>
            ))}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {p.howCommon.pillars.map((item) => <div key={item} className="rounded-2xl bg-[#eef9f4] p-5 text-center font-black text-[#0b4f4f]">{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="spectrum" className="scroll-mt-28 bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{p.spectrum.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.spectrum.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-9 text-slate-700">{p.spectrum.intro}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {supportLevels.map(([level, title, text]) => (
              <article key={level} className="rounded-[2rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#128c8c]">{level}</p>
                <h3 className="mt-3 text-2xl font-black text-[#0b4f4f]">{title}</h3>
                <p className="mt-3 font-semibold leading-8 text-slate-700">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10"><ImageCard src={imageBlocks.support[0]} alt={imageBlocks.support[1]} className="h-[360px]" /></div>
        </div>
      </section>

      <section id="early-signs-autism" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{p.earlySigns.eyebrow}</p>
              <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.earlySigns.title}</h2>
              {p.earlySigns.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-6 text-lg font-semibold leading-9 text-slate-700">{paragraph}</p>
              ))}
            </div>
            <ImageCard src={imageBlocks.observation[0]} alt={imageBlocks.observation[1]} />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {earlySigns.map(([Icon, title, text]) => <InfoCard key={title} Icon={Icon} title={title} text={text} />)}
          </div>
        </div>
      </section>

      <SplitSection id="communication-differences" eyebrow={p.communication.eyebrow} title={p.communication.title} image={imageBlocks.social} reverse>
        {p.communication.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </SplitSection>

      <section className="bg-[#fff8df]/60 px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <ImageCard src={imageBlocks.language[0]} alt={imageBlocks.language[1]} className="h-[310px]" />
          <ImageCard src={imageBlocks.nonverbal[0]} alt={imageBlocks.nonverbal[1]} className="h-[310px]" />
          <div className="rounded-[2rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
            <h2 className="text-3xl font-black text-[#0b4f4f]">{p.communication.verbalTitle}</h2>
            <div className="mt-6 grid gap-4">
              {communicationCards.map(([Icon, title, text]) => <InfoCard key={title} Icon={Icon} title={title} text={text} />)}
            </div>
          </div>
        </div>
      </section>

      <section id="sensory-behavior" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{p.sensoryBehavior.eyebrow}</p>
              <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.sensoryBehavior.title}</h2>
              <p className="mt-6 text-lg font-semibold leading-9 text-slate-700">{p.sensoryBehavior.intro}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <ImageCard src={imageBlocks.sensory[0]} alt={imageBlocks.sensory[1]} className="h-[250px]" />
              <ImageCard src={imageBlocks.regulation[0]} alt={imageBlocks.regulation[1]} className="h-[250px]" />
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{behaviorCards.map(([Icon, title, text]) => <InfoCard key={title} Icon={Icon} title={title} text={text} />)}</div>
        </div>
      </section>

      <section className="bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-3">
            {lifeCards.map(([Icon, title, text], index) => (
              <article key={title} className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-[#128c8c]/10">
                <img src={[imageBlocks.daily[0], imageBlocks.school[0], imageBlocks.family[0]][index]} alt={[imageBlocks.daily[1], imageBlocks.school[1], imageBlocks.family[1]][index]} loading="lazy" className="h-56 w-full object-cover" />
                <div className="p-7">
                  <Icon className="text-[#1f7a2e]" size={30} />
                  <h3 className="mt-4 text-2xl font-black text-[#0b4f4f]">{title}</h3>
                  <p className="mt-3 font-semibold leading-8 text-slate-700">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="causes-myths" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <ImageCard src={imageBlocks.research[0]} alt={imageBlocks.research[1]} />
            <div className="mt-8 rounded-[2rem] bg-[#eef9f4] p-7">
              <h3 className="text-2xl font-black text-[#0b4f4f]">{p.causesMyths.causesTitle}</h3>
              <p className="mt-3 font-semibold leading-8 text-slate-700">{p.causesMyths.causesText}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{p.causesMyths.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.causesMyths.title}</h2>
            <div className="mt-6 space-y-5 text-lg font-semibold leading-9 text-slate-700">
              <p><strong className="text-[#0b4f4f]">{p.causesMyths.geneticsLabel}</strong> {p.causesMyths.genetics}</p>
              <p><strong className="text-[#0b4f4f]">{p.causesMyths.environmentLabel}</strong> {p.causesMyths.environment}</p>
            </div>
            <div className="mt-8 grid gap-4">
              {mythFacts.map(([myth, fact]) => (
                <article key={myth} className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
                  <h3 className="font-black text-[#0b4f4f]">{myth}</h3>
                  <p className="mt-2 font-semibold leading-7 text-slate-700">{fact}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="autism-diagnosis" className="scroll-mt-28 bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{p.diagnosis.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.diagnosis.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-9 text-slate-700">{p.diagnosis.intro}</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {diagnosisSteps.map(([Icon, title, text], index) => (
              <article key={title} className="rounded-[2rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#fff8df] text-[#ff8a1f]"><Icon size={28} /></div>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-[#128c8c]">{p.diagnosis.stepPrefix} {index + 1}</p>
                <h3 className="mt-2 text-2xl font-black text-[#0b4f4f]">{title}</h3>
                <p className="mt-3 font-semibold leading-8 text-slate-700">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ImageCard src={imageBlocks.evaluation[0]} alt={imageBlocks.evaluation[1]} className="h-[320px]" />
            <ImageCard src={imageBlocks.screening[0]} alt={imageBlocks.screening[1]} className="h-[320px]" />
          </div>
        </div>
      </section>

      <section id="aba-support" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{p.abaSupport.eyebrow}</p>
              <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.abaSupport.title}</h2>
              {p.abaSupport.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-6 text-lg font-semibold leading-9 text-slate-700">{paragraph}</p>
              ))}
            </div>
            <ImageCard src={imageBlocks.aba[0]} alt={imageBlocks.aba[1]} />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{therapyServices.map(([Icon, title, text]) => <InfoCard key={title} Icon={Icon} title={title} text={text} />)}</div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ImageCard src={imageBlocks.parent[0]} alt={imageBlocks.parent[1]} className="h-[260px]" />
            <ImageCard src={imageBlocks.clinic[0]} alt={imageBlocks.clinic[1]} className="h-[260px]" />
            <ImageCard src={imageBlocks.home[0]} alt={imageBlocks.home[1]} className="h-[260px]" />
          </div>
        </div>
      </section>

      <section id="developmental-milestones" className="scroll-mt-28 bg-[#fff8df]/70 px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{p.milestones.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.milestones.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-9 text-slate-700">{p.milestones.intro}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {milestones.map(([age, src, alt, items]) => (
              <article key={age} className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-[#128c8c]/10">
                <img src={src} alt={alt} loading="lazy" className="h-44 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-2xl font-black text-[#0b4f4f]">{age}</h3>
                  <ul className="mt-4 grid gap-2 text-sm font-bold leading-6 text-slate-700">
                    {items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 shrink-0 text-[#1f7a2e]" size={16} />{item}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{p.faqOne.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.faqOne.title}</h2>
            <div className="mt-8"><ImageCard src={imageBlocks.resources[0]} alt={imageBlocks.resources[1]} className="h-[300px]" /></div>
          </div>
          <div className="grid gap-4">
            {faqOne.map(([question, answer]) => (
              <article key={question} className="rounded-[1.6rem] border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black text-[#0b4f4f]">{question}</h3>
                <p className="mt-3 font-semibold leading-8 text-slate-700">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="parent-resources" className="scroll-mt-28 bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{p.parentResources.eyebrow}</p>
              <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.parentResources.title}</h2>
              <p className="mt-5 text-lg font-semibold leading-9 text-slate-700">{p.parentResources.intro}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {p.parentResources.checklist.map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}
              </div>
            </div>
            <ImageCard src={imageBlocks.progress[0]} alt={imageBlocks.progress[1]} />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4">
            {faqTwo.map(([question, answer]) => (
              <article key={question} className="rounded-[1.6rem] border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black text-[#0b4f4f]">{question}</h3>
                <p className="mt-3 font-semibold leading-8 text-slate-700">{answer}</p>
              </article>
            ))}
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{p.faqTwo.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.faqTwo.title}</h2>
            <div className="mt-8"><ImageCard src={imageBlocks.cta[0]} alt={imageBlocks.cta[1]} className="h-[300px]" /></div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#1f7a2e] via-[#128c8c] to-[#0b4f4f] px-4 py-20 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f7c72f]">{p.cta.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">{p.cta.title}</h2>
            <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-teal-50">{p.cta.text}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="gold" onClick={onAssessment}>{p.cta.screeningSupport}</Button>
              <Button variant="secondary" onClick={onStart}>{p.cta.startABA}</Button>
            </div>
          </div>
          <ImageCard src={imageBlocks.cta[0]} alt={imageBlocks.cta[1]} className="h-[360px]" />
        </div>
      </section>
    </div>
  );
}

function ABATherapyEducationPage({ t, onStart }) {
  const p = t.pages.abaTherapy;
  const sidebarLinks = p.sidebarLinks;
  const THERAPY_CARD_ICONS = [Building2, GraduationCap, Home];
  const therapyCards = p.therapyCards.map(([title, text, note], i) => ({
    icon: THERAPY_CARD_ICONS[i],
    title,
    text,
    note,
  }));

  const SKILL_CARD_ICONS = [MessageCircle, GraduationCap, ShieldCheck, HeartHandshake];
  const skillCards = p.howAbaHelps.skillCards.map(([title, text], i) => [SKILL_CARD_ICONS[i], title, text]);
  const goalExamples = p.practicalGoals.examples;
  const aba = IMG.abaTherapy;
  const daySteps = p.typicalDay.steps.map(([stepName, title, text], i) => [stepName, title, text, aba.daySteps[i]]);
  const SIGNS_CARD_ICONS = [MessageCircle, ShieldCheck, Clock3, Users];
  const signsCards = p.signsBenefit.cards.map(([title, text], i) => [SIGNS_CARD_ICONS[i], title, text]);
  const AGE_GROUP_ICONS = [Baby, PlayCircle, School, GraduationCap];
  const ageGroupCards = p.byAgeGroup.cards.map(([title, text], i) => [AGE_GROUP_ICONS[i], title, text]);
  const PROGRESS_ICONS = [BarChart3, ClipboardCheck, BadgeCheck, FileSignature];
  const progressCards = p.progress.cards.map(([title, text], i) => [PROGRESS_ICONS[i], title, text]);
  const assessmentSteps = p.assessment.steps;
  const firstNinetyDays = p.firstNinetyDays.phases;
  const abaMyths = p.mythsFacts.items;
  const parentQuestions = p.parentQuestions.items;
  const RELATED_RESOURCE_ROUTES = ["#autism-assessment", "/what-is-autism", "/m-chat-r-online-screener", "#insurance-coverage", "#locations", "#intake"];
  const relatedResources = p.relatedResources.cards.map(([title, text, cta], i) => [title, text, RELATED_RESOURCE_ROUTES[i], cta]);
  const additionalFaqs = p.additionalFaqs.items;

  const sd = p.structuredData;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: sd.breadcrumbHome, item: "/" },
          { "@type": "ListItem", position: 2, name: sd.breadcrumbAba, item: "/aba-therapy" },
        ],
      },
      {
        "@type": "MedicalWebPage",
        name: p.title,
        description: p.heroIntro,
        about: { "@type": "MedicalTherapy", name: sd.therapyName },
        provider: { "@type": "MedicalOrganization", name: t.brandName, telephone: t.edenBusinessInfo.phone, address: t.edenBusinessInfo.address },
      },
      {
        "@type": "FAQPage",
        mainEntity: additionalFaqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      {
        "@type": "Organization",
        name: t.brandName,
        telephone: t.edenBusinessInfo.phone,
        email: "info@edenabatherapy.com",
      },
    ],
  };

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-white via-emerald-50/50 to-white px-4 py-20 lg:px-8">
        <div className="absolute right-16 top-14 h-48 w-48 rounded-full bg-yellow-300/70" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.85fr]">
          <div className="relative z-10">
            <p className="text-base font-bold text-slate-600">{p.breadcrumb}</p>
            <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight text-emerald-950 md:text-7xl">
              {p.title}
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-700">
              {p.heroIntro}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={onStart}>{p.getStarted} <ArrowRight size={18} /></Button>
              <Button variant="secondary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{p.findCenter}</Button>
            </div>
          </div>

          <div className="relative z-10">
            <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-yellow-300/80" />
            <div className="absolute -right-4 bottom-4 h-32 w-32 rounded-[2.5rem] bg-emerald-600" />
            {/* TODO: Replace with final brand photo — ABA therapist in play-based skill-building session. */}
            <img
              src={aba.hero}
              alt={p.heroImageAlt}
              className="relative h-[430px] w-full rounded-full object-cover shadow-2xl ring-8 ring-white"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-black text-emerald-950">{p.therapyTypesTitle}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {therapyCards.map(({ icon: Icon, title, text, note }) => (
              <article key={title} className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5 transition hover:-translate-y-1">
                <div className="flex items-center gap-5 bg-slate-50 p-6">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"><Icon size={30} /></div>
                  <h3 className="text-2xl font-black text-slate-900 underline decoration-slate-300 decoration-2 underline-offset-4">{title}</h3>
                </div>
                <div className="p-6">
                  <p className="leading-8 text-slate-700">{text}</p>
                  <p className="mt-4 font-black text-emerald-800">{note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[270px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-[1.6rem] bg-white p-6 shadow-lg shadow-slate-900/5 ring-1 ring-slate-100">
              <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-emerald-700">{p.sidebarTitle}</p>
              <nav className="grid gap-3 text-base font-semibold text-slate-700" aria-label={t.ariaLabels.abaTherapySections}>
                {sidebarLinks.map(([label, id]) => (
                  <a key={id} href={`#${id}`} className="underline-offset-4 transition hover:text-emerald-700 hover:underline">
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="min-w-0">
            <section id="what-is-aba-therapy" className="scroll-mt-28 border-t border-slate-200 pt-16">
              <ImageHeader image={aba.sections.evidence} color="green" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.whatIsAba.title}</h2>
              {p.whatIsAba.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-5 text-lg leading-9 text-slate-700 first:mt-5">{paragraph}</p>
              ))}
            </section>

            <section id="target-behaviors" className="scroll-mt-28 mt-14">
              <h3 className="text-3xl font-black text-emerald-950">{p.targetBehaviors.title}</h3>
              <p className="mt-4 text-lg leading-9 text-slate-700">{p.targetBehaviors.text}</p>
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-lg font-bold leading-8 text-emerald-900">{p.targetBehaviors.callout}</div>
            </section>

            <section id="how-aba-helps" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <ImageHeader image={aba.sections.howHelps} color="yellow" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.howAbaHelps.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.howAbaHelps.intro}</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {skillCards.map(([Icon, title, text]) => (
                  <div key={title} className="flex gap-5 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
                    <Icon className="mt-1 shrink-0 text-emerald-600" size={32} />
                    <div>
                      <h3 className="text-xl font-black text-emerald-950">{title}</h3>
                      <p className="mt-2 leading-7 text-slate-700">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="signs-child-may-benefit" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.signsBenefit.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.signsBenefit.intro}</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {signsCards.map(([Icon, title, text]) => (
                  <article key={title} className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <Icon className="text-emerald-600" size={34} />
                    <h3 className="mt-4 text-2xl font-black text-emerald-950">{title}</h3>
                    <p className="mt-3 leading-8 text-slate-700">{text}</p>
                  </article>
                ))}
              </div>
              <div className="mt-7 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
                <p className="text-lg font-black text-emerald-950">{p.signsBenefit.nextStepTitle}</p>
                <p className="mt-2 leading-8 text-slate-700">{p.signsBenefit.nextStepText}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button onClick={onStart}>{p.signsBenefit.startABA} <ArrowRight size={18} /></Button>
                  <a href="/what-is-autism" className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-emerald-50">{p.signsBenefit.learnAutism}</a>
                </div>
              </div>
            </section>

            <section id="aba-by-age-group" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.byAgeGroup.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.byAgeGroup.intro}</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {ageGroupCards.map(([Icon, title, text]) => (
                  <article key={title} className="rounded-[1.7rem] border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
                    <Icon className="text-emerald-700" size={34} />
                    <h3 className="mt-4 text-2xl font-black text-emerald-950">{title}</h3>
                    <p className="mt-3 leading-8 text-slate-700">{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="communication-development-aba" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <ImageHeader image={aba.sections.playBased} color="yellow" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.communication.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.communication.intro}</p>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {p.communication.goals.map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}
              </div>
            </section>

            <section id="practical-goals" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <ImageHeader image={aba.sections.whoBenefits} color="green" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.practicalGoals.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.practicalGoals.intro}</p>
              <div className="mt-7 grid gap-3">
                {goalExamples.map((goal) => (
                  <div key={goal} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-lg font-bold text-slate-700 shadow-sm">
                    <CheckCircle2 className="shrink-0 text-emerald-600" />
                    {goal}
                  </div>
                ))}
              </div>
            </section>

            <section id="aba-progress-measured" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.progress.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.progress.intro}</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {progressCards.map(([Icon, title, text]) => (
                  <article key={title} className="flex gap-5 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <Icon className="mt-1 shrink-0 text-emerald-600" size={32} />
                    <div>
                      <h3 className="text-xl font-black text-emerald-950">{title}</h3>
                      <p className="mt-2 leading-8 text-slate-700">{text}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-8 overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-sm">
                <div className="grid bg-emerald-50 text-sm font-black uppercase tracking-[0.16em] text-emerald-800 md:grid-cols-2">{p.progress.tableHeaders.map((header) => <div key={header} className="border-t border-emerald-100 p-5 first:border-t-0 md:first:border-t-0 md:[&:not(:first-child)]:border-l">{header}</div>)}</div>
                <div className="grid md:grid-cols-2">
                  <div className="space-y-3 p-6 text-slate-700">{p.progress.initialItems.map((item) => <p key={item}>{item}</p>)}</div>
                  <div className="space-y-3 border-t border-slate-100 p-6 text-slate-700 md:border-l md:border-t-0">{p.progress.ongoingItems.map((item) => <p key={item}>{item}</p>)}</div>
                </div>
              </div>
            </section>

            <section id="typical-day" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <ImageHeader image={aba.sections.typicalDay} color="yellow" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.typicalDay.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.typicalDay.intro}</p>
              <div className="mt-8 grid gap-5">
                {daySteps.map(([stepName, title, text, image]) => (
                  <div key={stepName} className="grid gap-5 rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:grid-cols-[210px_1fr]">
                    <img src={image} alt={title} className="h-32 w-full rounded-2xl object-cover" />
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">{stepName}</p>
                      <h3 className="mt-2 text-2xl font-black text-emerald-950">{title}</h3>
                      <p className="mt-2 text-lg leading-8 text-slate-700">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="first-90-days-aba" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.firstNinetyDays.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.firstNinetyDays.intro}</p>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {firstNinetyDays.map(([label, title, text]) => (
                  <article key={label} className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">{label}</p>
                    <h3 className="mt-3 text-2xl font-black text-emerald-950">{title}</h3>
                    <p className="mt-3 leading-8 text-slate-700">{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="parent-involvement" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <ImageHeader image={aba.sections.signsBenefit} color="green" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.parentInvolvement.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.parentInvolvement.intro}</p>
              <ul className="mt-6 space-y-3 text-lg leading-9 text-slate-700">
                {p.parentInvolvement.bullets.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </section>

            <section id="home-school-success" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.homeSchool.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.homeSchool.intro}</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <article className="rounded-[1.8rem] bg-emerald-50 p-7 ring-1 ring-emerald-100">
                  <Home className="text-emerald-700" size={34} />
                  <h3 className="mt-4 text-2xl font-black text-emerald-950">{p.homeSchool.home.title}</h3>
                  <p className="mt-3 leading-8 text-slate-700">{p.homeSchool.home.text}</p>
                </article>
                <article className="rounded-[1.8rem] bg-yellow-50 p-7 ring-1 ring-yellow-200">
                  <School className="text-yellow-700" size={34} />
                  <h3 className="mt-4 text-2xl font-black text-emerald-950">{p.homeSchool.school.title}</h3>
                  <p className="mt-3 leading-8 text-slate-700">{p.homeSchool.school.text}</p>
                </article>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#locations" className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-800">{p.homeSchool.findCenter}</a>
                <a href="#autism-assessment" className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-emerald-50">{p.homeSchool.scheduleEvaluation}</a>
              </div>
            </section>

            <section id="effectiveness" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <ImageHeader image={aba.sections.byAge} color="yellow" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.effectiveness.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.effectiveness.intro}</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {p.effectiveness.methods.map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h3 className="text-xl font-black text-emerald-950">{title}</h3><p className="mt-3 leading-8 text-emerald-900">{text}</p></div>
                ))}
              </div>
            </section>

            <section id="aba-myths-facts" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.mythsFacts.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.mythsFacts.intro}</p>
              <div className="mt-8 grid gap-4">
                {abaMyths.map(([myth, fact]) => (
                  <details key={myth} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm open:bg-emerald-50">
                    <summary className="cursor-pointer text-xl font-black text-emerald-950">{p.mythsFacts.mythPrefix} {myth}</summary>
                    <p className="mt-3 text-lg leading-8 text-slate-700"><strong>{p.mythsFacts.factPrefix}</strong> {fact}</p>
                  </details>
                ))}
              </div>
            </section>

            <section id="aba-assessment-process" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <ImageHeader image={aba.sections.assessment} color="green" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.assessment.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.assessment.intro}</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {assessmentSteps.map(([number, title, text]) => (
                  <article key={title} className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-700 text-lg font-black text-white">{number}</div>
                    <h3 className="mt-4 text-2xl font-black text-emerald-950">{title}</h3>
                    <p className="mt-3 leading-8 text-slate-700">{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="treatment-plans" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.treatmentPlans.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.treatmentPlans.intro}</p>
              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {p.treatmentPlans.checklist.map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}
              </div>
            </section>

            <section id="early-intervention-benefits" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.earlyIntervention.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.earlyIntervention.intro}</p>
              <div className="mt-7 rounded-[1.7rem] border border-emerald-200 bg-emerald-50 p-6">
                <p className="text-xl font-black text-emerald-950">{p.earlyIntervention.callout}</p>
              </div>
            </section>

            <section id="cost" className="scroll-mt-28 mt-16 rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
              <h2 className="text-4xl font-black text-emerald-950">{p.cost.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.cost.intro}</p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Button onClick={onStart}>{p.cost.getStarted} <ArrowRight size={18} /></Button>
                <Button variant="secondary" onClick={onStart}>{p.cost.checkInsurance}</Button>
              </div>
            </section>

            <section id="questions-before-aba" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.parentQuestions.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.parentQuestions.intro}</p>
              <div className="mt-8 grid gap-4">
                {parentQuestions.map(([question, answer]) => (
                  <details key={question} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm open:bg-emerald-50">
                    <summary className="cursor-pointer text-xl font-black text-emerald-950">{question}</summary>
                    <p className="mt-3 text-lg leading-8 text-slate-700">{answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section id="aba-success-factors" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.successFactors.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.successFactors.intro}</p>
              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {p.successFactors.items.map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}
              </div>
            </section>

            <section id="aba-additional-faq" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.additionalFaqs.title}</h2>
              <div className="mt-8 grid gap-4">
                {additionalFaqs.map(([question, answer]) => (
                  <details key={question} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm open:bg-yellow-50">
                    <summary className="cursor-pointer text-xl font-black text-emerald-950">{question}</summary>
                    <p className="mt-3 text-lg leading-8 text-slate-700">{answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section id="aba-related-resources" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.relatedResources.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.relatedResources.intro}</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {relatedResources.map(([title, text, href, cta]) => (
                  <a key={title} href={href} className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
                    <h3 className="text-2xl font-black text-emerald-950">{title}</h3>
                    <p className="mt-3 leading-8 text-slate-700">{text}</p>
                    <span className="mt-5 inline-flex font-black text-emerald-700">{cta} →</span>
                  </a>
                ))}
              </div>
            </section>
          </article>
        </div>
      </section>
    </div>
  );
}

function ImageHeader({ image, color, alt }) {
  return (
    <div className="relative max-w-lg">
      <div className={`absolute -right-10 -top-8 h-32 w-32 ${color === "yellow" ? "rounded-full bg-yellow-300" : "rounded-[2.5rem] bg-emerald-600"}`} />
      <img src={image} alt={alt} className="relative h-56 w-full rounded-[2rem] object-cover shadow-xl ring-8 ring-white" />
    </div>
  );
}

function MiniCheck({ children }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-sm font-black text-slate-700 shadow-sm">
      <CheckCircle2 className="shrink-0 text-[#1f7a2e]" size={18} />
      <span>{children}</span>
    </div>
  );
}

function AboutEdenPage({ t, onStart, onFindCare }) {
  const p = t.pages.aboutEden;
  const MISSION_ICONS = [HeartHandshake, ClipboardCheck, Users];
  const APPROACH_ICONS = [Search, UserRound, HeartHandshake, BarChart3];
  const SERVE_ICONS = [Baby, School, Users];
  const missionCards = p.mission.cards.map(([title, text], i) => ({ Icon: MISSION_ICONS[i], title, text }));
  const approachCards = p.approach.cards.map(([title, text], i) => ({ Icon: APPROACH_ICONS[i], title, text }));
  const serveCards = p.whoWeServe.cards.map(([title, text], i) => ({ Icon: SERVE_ICONS[i], title, text }));
  const bullets = p.different.bullets;

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] px-4 py-20 lg:px-8">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#49b8c8]/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#f7c72f]/30 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative z-10">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#128c8c]">{p.eyebrow}</p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-7xl">{p.title}</h1>
            <p className="mt-5 max-w-2xl text-2xl font-black leading-9 text-[#1f7a2e]">{p.subtitle}</p>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-9 text-slate-700">
              {p.heroIntro}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={onStart}>{p.startABA} <ArrowRight size={18} /></Button>
              <Button variant="secondary" onClick={onFindCare}>{p.findCare}</Button>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-xl">
            <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-[#f7c72f]" />
            <div className="absolute -right-8 top-10 h-44 w-44 rounded-[3rem] bg-[#49b8c8]/70" />
            <div className="absolute bottom-0 left-10 h-28 w-28 rounded-full bg-[#ff8a1f]/80" />
            {/* TODO: Replace with final brand photo — Eden ABA team welcoming families. */}
            <img src={IMG.aboutEden.hero} alt={p.heroImageAlt} className="relative h-[440px] w-full rounded-[3rem] object-cover shadow-2xl ring-8 ring-white" />
          </div>
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{p.whoWeAre.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.whoWeAre.title}</h2>
          </div>
          <p className="text-lg font-semibold leading-9 text-slate-700">
            {p.whoWeAre.text}
          </p>
        </div>
      </section>

      <section className="bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.mission.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {missionCards.map(({ Icon, title, text }) => (
              <article key={title} className="rounded-[2rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#fff8df] text-[#ff8a1f]"><Icon size={28} /></div>
                <h3 className="mt-5 text-2xl font-black text-[#0b4f4f]">{title}</h3>
                <p className="mt-3 font-semibold leading-7 text-slate-700">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          {/* TODO: Replace with final brand photo — family-centered autism care approach. */}
          <img src={IMG.aboutEden.familyCentered} alt={p.different.imageAlt} className="h-[420px] w-full rounded-[2.5rem] object-cover shadow-2xl" />
          <div>
            <h2 className="text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.different.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-9 text-slate-700">
              {p.different.text}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {bullets.map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fff8df]/60 px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.approach.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {approachCards.map(({ Icon, title, text }) => (
              <article key={title} className="rounded-[2rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
                <Icon className="text-[#1f7a2e]" size={34} />
                <h3 className="mt-5 text-xl font-black text-[#0b4f4f]">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.whoWeServe.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-9 text-slate-700">{p.whoWeServe.intro}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {serveCards.map(({ Icon, title, text }) => (
              <article key={title} className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-xl shadow-[#128c8c]/10">
                <Icon className="text-[#128c8c]" size={34} />
                <h3 className="mt-5 text-2xl font-black text-[#0b4f4f]">{title}</h3>
                <p className="mt-3 font-semibold leading-7 text-slate-700">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-white p-8 text-center shadow-2xl shadow-[#128c8c]/10 md:p-12">
          <h2 className="text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.quality.title}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-9 text-slate-700">
            {p.quality.text}
          </p>
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[3rem] bg-gradient-to-br from-[#1f7a2e] via-[#128c8c] to-[#0b4f4f] p-8 text-center text-white shadow-2xl md:p-12">
          <h2 className="text-4xl font-black md:text-5xl">{p.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-teal-50">{p.cta.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button onClick={onStart} variant="gold">{p.cta.startABA}</Button>
            <Button onClick={onStart} variant="secondary">{p.cta.contactEden}</Button>
            <Button onClick={onFindCare} variant="dark">{p.cta.findLocation}</Button>
          </div>
        </div>
      </section>
    </div>
  );
}


function MChatQuestionnaire({ t }) {
  const mq = t.pages.mchatQuestionnaire;
  const questions = mq.questions;

  const [stage, setStage] = useState("intake");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [form, setForm] = useState({
    parentFirstName: "",
    parentLastName: "",
    email: "",
    phone: "",
    childFirstName: "",
    childDateOfBirth: "",
    zipCode: "",
    preferredLocation: "",
    consent: false,
  });

  const current = questions[index];
  const score = questions.reduce((total, [id, _question, riskAnswer]) => total + (answers[id] === riskAnswer ? 1 : 0), 0);
  const percentageScore = Math.round((score / questions.length) * 100);
  const progress = Math.round(((index + 1) / questions.length) * 100);
  const valid = form.parentFirstName && form.parentLastName && form.email.includes("@") && form.phone && form.childDateOfBirth && form.zipCode && form.preferredLocation && form.consent;
  const updateForm = (key, value) => setForm((old) => ({ ...old, [key]: value }));

  const result = score <= 2
    ? [...mq.results.lower, "bg-emerald-100 text-emerald-800", "bg-emerald-600"]
    : score <= 7
      ? [...mq.results.moderate, "bg-yellow-100 text-yellow-800", "bg-yellow-500"]
      : [...mq.results.elevated, "bg-orange-100 text-orange-800", "bg-orange-500"];

  const parentName = `${form.parentFirstName} ${form.parentLastName}`.trim();
  const childName = form.childFirstName.trim();
  const generatedAt = new Date();
  const reportDate = generatedAt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  const reportDateTime = generatedAt.toLocaleString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" });
  const riskResponses = questions.filter(([id, _question, riskAnswer]) => answers[id] === riskAnswer);
  const nonRiskResponses = questions.length - riskResponses.length;
  const riskQuestionNumbers = riskResponses.map(([id]) => Number(id));
  const followUpAreaMap = [
    { label: mq.followUpAreas[0], ids: [1, 6, 7, 9, 16, 17] },
    { label: mq.followUpAreas[1], ids: [8, 10, 11, 14, 19] },
    { label: mq.followUpAreas[2], ids: [3, 15, 18] },
    { label: mq.followUpAreas[3], ids: [5, 12] },
    { label: mq.followUpAreas[4], ids: [4, 13, 20] },
  ].filter((area) => area.ids.some((id) => riskQuestionNumbers.includes(id))).map((area) => area.label);
  const followUpAreas = followUpAreaMap;
  const disclaimer = mq.disclaimer;
  const formT = mq.form;
  const qs = mq.questionsStage;
  const rs = mq.resultsStage;
  const rp = mq.report;
  const fieldClass = "w-full rounded-2xl border border-[#0E6B4F]/15 bg-[#FAF7F0]/50 px-4 py-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0E6B4F] focus:ring-4 focus:ring-[#0E6B4F]/10";

  const handlePrintReport = () => {
    console.log("Print button clicked");

    const reportElement = document.getElementById("printable-report");

    if (!reportElement) {
      console.error("Printable report not found");
      return;
    }

    const printWindow = window.open("", "_blank", "width=900,height=700");

    if (!printWindow) {
      console.error("Print window was blocked. Allow popups for this site, then try again.");
      window.print();
      return;
    }

    printWindow.document.open();
    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${rp.printTitle}</title>
          <style>
            @page { size: auto; margin: 0.5in; }
            * { box-sizing: border-box; }
            body {
              margin: 0;
              padding: 24px;
              background: #ffffff;
              color: #0f172a;
              font-family: Arial, Helvetica, sans-serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .print-actions { display: none !important; }
            #printable-report {
              width: 100%;
              max-width: none;
              margin: 0;
              padding: 0;
              border: 0;
              border-radius: 0;
              box-shadow: none;
              background: #ffffff;
            }
            h2, h3, p { margin-top: 0; }
            .report-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
            .report-three { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
            .report-card { border: 1px solid #dbe5e1; border-radius: 18px; padding: 16px; background: #ffffff; break-inside: avoid; }
            .report-muted { background: #f8fafc; }
            .report-title { color: #083b35; font-weight: 900; }
            .report-label { color: #64748b; font-size: 11px; font-weight: 900; letter-spacing: 0.16em; text-transform: uppercase; }
            .report-value { color: #083b35; font-size: 16px; font-weight: 900; margin-top: 6px; }
            .report-section { margin-top: 28px; break-inside: avoid; }
            .severity-meter { height: 16px; border-radius: 999px; overflow: hidden; background: linear-gradient(90deg, #16a34a 0 15%, #f59e0b 15% 40%, #f97316 40% 100%); position: relative; }
            .severity-marker { position: absolute; top: -4px; width: 4px; height: 24px; border-radius: 999px; background: #0f172a; }
            .donut-wrap { display: flex; gap: 22px; align-items: center; }
            .question-row { border: 1px solid #dbe5e1; border-radius: 16px; padding: 14px; margin-top: 10px; break-inside: avoid; }
            .risk-row { border-color: #fed7aa; background: #fff7ed; }
            .safe-row { border-color: #bbf7d0; background: #f0fdf4; }
            .pill { display: inline-flex; border-radius: 999px; padding: 5px 10px; font-size: 12px; font-weight: 900; }
            .risk-pill { background: #fed7aa; color: #9a3412; }
            .safe-pill { background: #bbf7d0; color: #166534; }
            .notes-box { min-height: 90px; border: 1px solid #cbd5e1; border-radius: 14px; padding: 14px; }
            @media print {
              body { padding: 0; }
              .report-grid, .report-three { gap: 10px; }
              .report-section { margin-top: 20px; }
            }
          </style>
        </head>
        <body>
          ${reportElement.outerHTML}
          <script>
            window.onload = function () {
              window.focus();
              window.print();
            };
          <\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const sendResultsToEden = () => {
    const payload = {
      parentName,
      childName,
      childDateOfBirth: form.childDateOfBirth,
      email: form.email,
      phone: form.phone,
      zipCode: form.zipCode,
      preferredLocation: form.preferredLocation,
      totalScore: score,
      riskLevel: result[0],
      percentageScore,
      recommendation: result[1],
      submittedAt: new Date().toISOString(),
    };

    // TODO: Connect this placeholder to your real Eden ABA Therapy intake email/API endpoint.
    // Example: await fetch("/api/mchat-results", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (typeof window !== "undefined") {
      localStorage.setItem("eden-mchat-results-placeholder", JSON.stringify(payload));
    }
    setSendSuccess(true);
  };

  const contactEden = (event) => {
    event.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("eden:navigate", { detail: "intake" }));
    }
  };

  if (stage === "printReport") {
    const reportRowValues = [parentName, childName, form.childDateOfBirth, form.email, form.phone, form.zipCode, form.preferredLocation, reportDateTime];
    const reportRows = rp.reportFields.map((label, i) => [label, reportRowValues[i] || "—"]);

    const nextSteps = score <= 2 ? mq.results.nextSteps.lower : score <= 7 ? mq.results.nextSteps.moderate : mq.results.nextSteps.elevated;

    const circumference = 2 * Math.PI * 46;
    const donutOffset = circumference - (percentageScore / 100) * circumference;
    const markerLeft = `${Math.min(98, Math.max(2, percentageScore))}%`;

    return (
      <section className="min-h-screen bg-slate-100 px-4 py-10 print:bg-white print:p-0 lg:px-8">
        <style>{`
          @page { size: auto; margin: 0.5in; }

          @media print {
            html,
            body {
              width: 100% !important;
              min-height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              background: #ffffff !important;
            }

            body * {
              visibility: hidden !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            #printable-report,
            #printable-report * {
              visibility: visible !important;
            }

            #printable-report {
              display: block !important;
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 0 !important;
              border: 0 !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              background: #ffffff !important;
            }

            .print-hidden,
            .print-hidden * {
              display: none !important;
              visibility: hidden !important;
            }
          }
        `}</style>

        <div className="print:hidden print-hidden mx-auto mb-6 flex max-w-5xl flex-wrap gap-4">
          <button
            type="button"
            aria-label={rp.printButton}
            onClick={handlePrintReport}
            className="relative z-[10000] inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#1f7a2e] px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-[#128c8c]/20 transition hover:bg-[#166326] focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            {rp.printButton}
          </button>
          <button
            type="button"
            onClick={() => setStage("results")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#49b8c8]/30 bg-white/90 px-6 py-3 text-sm font-extrabold text-[#0b4f4f] transition hover:bg-[#49b8c8]/10"
          >
            {rp.backToResults}
          </button>
        </div>

        <div id="printable-report" className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl print:max-w-none print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none md:p-10">
          <header className="border-b border-slate-200 pb-6 print:border-slate-300">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
              <div>
                <p className="report-label text-emerald-700">{rp.brandLabel}</p>
                <h2 className="report-title mt-3 text-4xl font-black text-[#083b35]">{rp.title}</h2>
                <p className="mt-3 text-sm font-bold text-slate-500">{rp.generatedOn} {reportDateTime}</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-left print:bg-white">
                <p className="report-label">{rp.screeningResult}</p>
                <p className="mt-2 text-2xl font-black text-[#083b35]">{score}/20</p>
                <p className="mt-1 text-sm font-black text-emerald-800">{result[0]}</p>
              </div>
            </div>
          </header>

          <section className="report-section mt-8">
            <h3 className="report-title text-2xl font-black text-[#083b35]">{rp.familyInformation}</h3>
            <div className="report-grid mt-4 grid gap-4 md:grid-cols-2">
              {reportRows.map(([label, value]) => (
                <div key={label} className="report-card report-muted rounded-2xl border border-slate-200 bg-slate-50 p-4 print:bg-white">
                  <p className="report-label text-xs font-black uppercase tracking-[0.15em] text-slate-500">{label}</p>
                  <p className="report-value mt-2 text-lg font-black text-[#083b35]">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="report-section mt-8">
            <h3 className="report-title text-2xl font-black text-[#083b35]">{rp.scoreSummary}</h3>
            <div className="mt-4 grid gap-5 lg:grid-cols-[260px_1fr]">
              <div className="report-card rounded-[2rem] border border-slate-200 bg-white p-6">
                <div className="donut-wrap flex items-center gap-5">
                  <svg width="124" height="124" viewBox="0 0 124 124" role="img" aria-label={`${rp.riskPercentageAria} ${percentageScore}%`}>
                    <circle cx="62" cy="62" r="46" fill="none" stroke="#e2e8f0" strokeWidth="16" />
                    <circle cx="62" cy="62" r="46" fill="none" stroke={score <= 2 ? "#16a34a" : score <= 7 ? "#f59e0b" : "#f97316"} strokeWidth="16" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={donutOffset} transform="rotate(-90 62 62)" />
                    <text x="62" y="57" textAnchor="middle" className="fill-[#083b35] text-3xl font-black">{percentageScore}%</text>
                    <text x="62" y="78" textAnchor="middle" className="fill-slate-500 text-xs font-bold">{rp.riskPercentageLabel}</text>
                  </svg>
                  <div>
                    <p className="report-label">{rp.totalScoreLabel}</p>
                    <p className="report-title mt-2 text-4xl font-black text-[#083b35]">{score}/20</p>
                    <span className={`mt-3 inline-flex rounded-full px-4 py-2 text-sm font-black ${result[2]}`}>{result[0]}</span>
                  </div>
                </div>
              </div>

              <div className="report-card rounded-[2rem] border border-slate-200 bg-white p-6">
                <p className="report-label">{rp.severityMeter}</p>
                <div className="severity-meter relative mt-4 h-4 overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 via-yellow-500 to-orange-500">
                  <span className="severity-marker absolute -top-1 h-6 w-1 rounded-full bg-slate-900" style={{ left: markerLeft }} />
                </div>
                <div className="mt-2 grid grid-cols-3 text-xs font-black text-slate-600">
                  {rp.severityRanges.map((label, i) => (
                    <span key={label} className={i === 1 ? "text-center" : i === 2 ? "text-right" : ""}>{label}</span>
                  ))}
                </div>
                <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{result[1]}</p>
              </div>
            </div>

            <div className="report-three mt-5 grid gap-4 md:grid-cols-4">
              <div className="report-card rounded-2xl border border-slate-200 p-4">
                <p className="report-label">{rp.totalQuestions}</p>
                <p className="report-value">20</p>
              </div>
              <div className="report-card rounded-2xl border border-orange-200 bg-orange-50 p-4 print:bg-white">
                <p className="report-label">{rp.riskScoredAnswers}</p>
                <p className="report-value text-orange-700">{score}</p>
              </div>
              <div className="report-card rounded-2xl border border-emerald-200 bg-emerald-50 p-4 print:bg-white">
                <p className="report-label">{rp.nonRiskAnswers}</p>
                <p className="report-value text-emerald-700">{nonRiskResponses}</p>
              </div>
              <div className="report-card rounded-2xl border border-slate-200 p-4">
                <p className="report-label">{rp.riskPercentage}</p>
                <p className="report-value">{percentageScore}%</p>
              </div>
            </div>
          </section>

          <section className="report-section mt-8">
            <h3 className="report-title text-2xl font-black text-[#083b35]">{rp.parentResponseReview}</h3>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-600">{rp.parentResponseIntro}</p>
            <div className="mt-4 grid gap-3">
              {questions.map(([id, question, riskAnswer]) => {
                const answer = answers[id] || "—";
                const isRisk = answer === riskAnswer;

                return (
                  <article key={id} className={`question-row rounded-2xl border p-4 ${isRisk ? "risk-row border-orange-200 bg-orange-50" : "safe-row border-emerald-200 bg-emerald-50"}`}>
                    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                      <div>
                        <p className="report-label">{rp.questionPrefix} {id}</p>
                        <h4 className="mt-2 text-base font-black leading-7 text-[#083b35]">{question}</h4>
                      </div>
                      <span className={`pill shrink-0 rounded-full px-3 py-1 text-xs font-black ${isRisk ? "risk-pill bg-orange-200 text-orange-800" : "safe-pill bg-emerald-200 text-emerald-800"}`}>
                        {isRisk ? rp.riskScored : rp.nonRisk}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <p className="rounded-xl bg-white/80 p-3 text-sm font-bold text-slate-700"><span className="text-slate-500">{rp.parentAnswer}</span> {answer}</p>
                      <p className="rounded-xl bg-white/80 p-3 text-sm font-bold text-slate-700"><span className="text-slate-500">{rp.riskScoredResponse}</span> {isRisk ? rp.yes : rp.no}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="report-section mt-8">
            <h3 className="report-title text-2xl font-black text-[#083b35]">{rp.staffNotes}</h3>
            <div className="report-card mt-4 rounded-[2rem] border border-slate-200 bg-white p-6">
              <ul className="grid gap-3 text-sm font-bold leading-7 text-slate-700">
                <li>• {rp.staffNotesItems[0]} <strong>{score}</strong> {rp.staffNotesItems[1]}</li>
                <li>• {rp.staffNotesItems[2]} <strong>{result[0]}</strong>.</li>
                <li>• {rp.staffNotesItems[3]} <strong>{followUpAreas.length ? followUpAreas.join(", ") : rp.staffNotesItems[4]}</strong></li>
                <li>• {rp.staffNotesItems[5]}</li>
                <li>• {rp.staffNotesItems[6]}</li>
              </ul>
            </div>
          </section>

          <section className="report-section mt-8">
            <h3 className="report-title text-2xl font-black text-[#083b35]">{rp.suggestedNextSteps}</h3>
            <div className="report-card mt-4 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 print:bg-white">
              <p className="text-lg font-black leading-8 text-[#083b35]">{nextSteps}</p>
              <p className="mt-3 text-sm font-bold leading-7 text-slate-700">{rp.nextStepsShare}</p>
            </div>
          </section>

          <section className="report-section mt-8">
            <h3 className="report-title text-2xl font-black text-[#083b35]">{rp.medicalDisclaimer}</h3>
            <div className="report-card mt-4 rounded-[2rem] border border-slate-200 bg-emerald-50 p-6 print:bg-white">
              <p className="text-sm font-bold leading-7 text-slate-700">{disclaimer}</p>
            </div>
          </section>

          <section className="report-section mt-8">
            <h3 className="report-title text-2xl font-black text-[#083b35]">{rp.staffSignature}</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="report-card rounded-2xl border border-slate-200 p-4">
                <p className="report-label">{rp.reviewedBy}</p>
                <div className="mt-8 border-b border-slate-400" />
              </div>
              <div className="report-card rounded-2xl border border-slate-200 p-4">
                <p className="report-label">Date</p>
                <div className="mt-8 border-b border-slate-400" />
              </div>
            </div>
            <div className="notes-box mt-4 rounded-2xl border border-slate-200 p-4">
              <p className="report-label">Notes</p>
            </div>
          </section>
        </div>
      </section>
    );
  }

  if (stage === "results") {
    return (
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">{rs.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-black text-[#083b35] md:text-5xl">{rs.title}</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2rem] bg-slate-50 p-6">
              <p className="text-sm font-bold text-slate-500">{rs.totalScore}</p>
              <p className="mt-2 text-6xl font-black text-[#083b35]">{score}/20</p>
              <div className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-black ${result[2]}`}>{result[0]}</div>
              <p className="mt-4 text-sm font-black text-slate-500">{rs.percentageScore} {percentageScore}%</p>
              <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-200"><div className={`h-full rounded-full ${result[3]}`} style={{ width: `${Math.max(6, percentageScore)}%` }} /></div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
              <h3 className="text-2xl font-black text-[#083b35]">{rs.whatThisMeans}</h3>
              <p className="mt-4 text-lg leading-8 text-slate-700">{result[1]}</p>
              <div className="mt-5 rounded-2xl bg-emerald-50 p-5 text-sm font-bold leading-7 text-slate-700">{disclaimer}</div>
            </div>
          </div>

          {sendSuccess && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-black leading-7 text-emerald-800">
              {rs.sendSuccess}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <Button onClick={() => { setAnswers({}); setIndex(0); setSendSuccess(false); setStage("questions"); }}>{rs.retake}</Button>
            <Button variant="secondary" onClick={() => setStage("printReport")}>{rs.printResults}</Button>
            <Button variant="secondary" onClick={sendResultsToEden}>{rs.sendToEden}</Button>
            <a href="#intake" onClick={contactEden} className="rounded-full bg-[#f7c72f] px-6 py-3 font-black text-[#083b35] transition hover:bg-yellow-400">{rs.contactEden}</a>
          </div>
        </div>
      </section>
    );
  }

  if (stage === "questions") {
    return (
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-10">
          <div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-700 transition-all" style={{ width: `${progress}%` }} /></div>
          <div className="py-12 text-center">
            <p className="text-base font-black text-emerald-700">{qs.label} {index + 1} {qs.of} {questions.length}</p>
            <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-black leading-tight text-[#083b35] md:text-4xl">{current[1]}</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {qs.answers.map((answer) => (
                <button key={answer} type="button" onClick={() => setAnswers((old) => ({ ...old, [current[0]]: answer }))} className={`min-w-[140px] rounded-full border px-8 py-4 text-base font-black transition ${answers[current[0]] === answer ? "border-emerald-700 bg-emerald-700 text-white shadow-lg" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-600"}`}>{answer}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 pt-6">
            <Button variant="secondary" disabled={index === 0} onClick={() => setIndex((currentIndex) => Math.max(0, currentIndex - 1))}>{qs.previous}</Button>
            <p className="hidden text-sm font-black text-slate-500 sm:block">{Object.keys(answers).length} {qs.answered}</p>
            <Button disabled={!answers[current[0]]} onClick={() => index === questions.length - 1 ? setStage("results") : setIndex((currentIndex) => currentIndex + 1)}>{index === questions.length - 1 ? qs.seeResults : qs.next}</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 lg:px-0">
      <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); if (valid) { setAnswers({}); setIndex(0); setSendSuccess(false); setStage("questions"); } }} className="mx-auto max-w-5xl rounded-[2rem] border border-[#0E6B4F]/10 bg-white p-6 shadow-2xl shadow-[#0E6B4F]/10 md:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0E6B4F]">{formT.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black text-[#0F172A] md:text-4xl">{formT.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-7 text-slate-600">{formT.intro}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input className={fieldClass} value={form.parentFirstName} onChange={(e) => updateForm("parentFirstName", e.target.value)} placeholder={formT.placeholders.parentFirstName} />
          <input className={fieldClass} value={form.parentLastName} onChange={(e) => updateForm("parentLastName", e.target.value)} placeholder={formT.placeholders.parentLastName} />
          <input className={fieldClass} type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder={formT.placeholders.email} />
          <input className={fieldClass} value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder={formT.placeholders.phone} />
          <label className="grid gap-2 text-sm font-black text-slate-700">
            {formT.placeholders.childDateOfBirth}
            <input className={fieldClass} type="date" value={form.childDateOfBirth} onChange={(e) => updateForm("childDateOfBirth", e.target.value)} />
          </label>
          <input className={fieldClass} value={form.childFirstName} onChange={(e) => updateForm("childFirstName", e.target.value)} placeholder={formT.placeholders.childFirstName} />
          <input className={fieldClass} value={form.zipCode} onChange={(e) => updateForm("zipCode", e.target.value)} placeholder={formT.placeholders.zipCode} />
          <select className={fieldClass} value={form.preferredLocation} onChange={(e) => updateForm("preferredLocation", e.target.value)}>
            <option value="">{formT.placeholders.preferredLocation}</option>
            {formT.locationOptions.map((location) => <option key={location} value={location}>{location}</option>)}
          </select>
        </div>
        <label className="mt-5 flex items-start gap-3 rounded-2xl bg-[#FAF7F0] p-4 text-sm font-bold leading-6 text-slate-700">
          <input type="checkbox" checked={form.consent} onChange={(e) => updateForm("consent", e.target.checked)} className="mt-1 h-5 w-5 accent-[#0E6B4F]" />
          <span>{formT.consent}</span>
        </label>
        {submitted && !valid && <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-black text-red-600">{formT.validationError}</p>}
        <Button type="submit" className="mt-6 w-full !bg-[#0E6B4F] hover:!bg-[#0a5640]">{formT.submit}</Button>
      </form>
    </section>
  );
}

function Ados2AssessmentPageWrapper({ t, onStart, onMchat, onCast, onLocations, onEvaluationHub, onIde }) {
  return (
    <Ados2AssessmentPage
      t={t}
      onStart={onStart}
      onMchat={onMchat}
      onCast={onCast}
      onLocations={onLocations}
      onEvaluationHub={onEvaluationHub}
      onIde={onIde}
    />
  );
}

function IdeEvaluationPageWrapper({ t, onStart, onMchat, onCast, onAdos, onLocations, onInsurance, onContact }) {
  return (
    <IdeEvaluationPage
      t={t}
      onStart={onStart}
      onMchat={onMchat}
      onCast={onCast}
      onAdos={onAdos}
      onLocations={onLocations}
      onInsurance={onInsurance}
      onContact={onContact}
    />
  );
}

function AutismScreenerFaqsPageWrapper({ t, onStart, onLocations, onMchat, onCast, onAdos, onIde, onInsurance, onAba, onAutism }) {
  return (
    <AutismScreenerFaqsPage
      t={t}
      onStart={onStart}
      onLocations={onLocations}
      onMchat={onMchat}
      onCast={onCast}
      onAdos={onAdos}
      onIde={onIde}
      onInsurance={onInsurance}
      onAba={onAba}
      onAutism={onAutism}
    />
  );
}

function ParentGuidancePageWrapper({
  t,
  onMchat,
  onCast,
  onAdos,
  onIde,
  onSchedule,
  onAssessment,
  onInsurance,
  onAba,
  onStart,
}) {
  return (
    <ParentGuidancePage
      t={t}
      onMchat={onMchat}
      onCast={onCast}
      onAdos={onAdos}
      onIde={onIde}
      onSchedule={onSchedule}
      onAssessment={onAssessment}
      onInsurance={onInsurance}
      onAba={onAba}
      onStart={onStart}
    />
  );
}

function CastOnlineScreenerPage({ t, onStart, onMchat, onScheduleEvaluation }) {
  return (
    <CastScreenerPage
      t={t}
      onStart={onStart}
      onMchat={onMchat}
      questionnaire={<CastQuestionnaire t={t} onScheduleEvaluation={onScheduleEvaluation} />}
    />
  );
}

function MChatROnlineScreenerPage({ t, onStart, onCast }) {
  return (
    <MChatScreenerPage
      t={t}
      onStart={onStart}
      onCast={onCast}
      questionnaire={<MChatQuestionnaire t={t} />}
    />
  );
}

function InsuranceVerificationPage({ t, onSchedule, onHome, onStart }) {
  const ins = t.pages.insurance;
  const formT = t.insuranceForm;
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    childName: "",
    childDob: "",
    zip: "",
    provider: "",
    memberId: "",
    groupNumber: "",
    contactMethod: "Phone",
    notes: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAllProviders, setShowAllProviders] = useState(false);
  const va = ins.virginia;
  const pa = ins.priorAuth;
  const [openFaq, setOpenFaq] = useState(ins.faqs[0]?.[0] || "");

  const providers = va.providers;
  const visibleProviders = showAllProviders ? providers : providers.slice(0, 9);
  const VIRGINIA_CARD_ICONS = [ShieldCheck, BadgeCheck, ClipboardCheck];
  const virginiaCards = va.cards.map(([title, text], i) => [VIRGINIA_CARD_ICONS[i], title, text]);
  const prepItems = va.prepareItems;
  const helpItems = va.helpItems;
  const faqs = ins.faqs;
  const PRIOR_AUTH_ICONS = [Stethoscope, Clock3, FileSignature, HeartHandshake];
  const required = ["firstName", "lastName", "email", "phone", "childName", "zip", "provider", "memberId"];
  const emailValid = form.email.includes("@") && form.email.includes(".");
  const complete = required.every((key) => String(form[key] || "").trim()) && emailValid && form.consent;
  const completion = Math.round(((required.filter((key) => String(form[key] || "").trim()).length + (emailValid ? 1 : 0) + (form.consent ? 1 : 0)) / (required.length + 2)) * 100);

  const update = (key, value) => {
    if (key === "phone") {
      const digits = value.replace(/[^0-9]/g, "").slice(0, 10);
      const formatted = digits.length > 6 ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}` : digits.length > 3 ? `(${digits.slice(0, 3)}) ${digits.slice(3)}` : digits;
      setForm((old) => ({ ...old, phone: formatted }));
      return;
    }
    setForm((old) => ({ ...old, [key]: value }));
  };

  const scrollToVerify = () => document.getElementById("verify-form")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const submit = (event) => {
    event.preventDefault();
    setTouched(true);
    if (!complete) return;
    if (typeof window !== "undefined") localStorage.setItem("eden-insurance-coverage-request", JSON.stringify({ ...form, submittedAt: new Date().toISOString() }));
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);
  };

  const fieldClass = "w-full rounded-2xl border border-[#49b8c8]/25 bg-white px-4 py-4 text-sm font-bold text-slate-900 outline-none transition focus:border-[#128c8c] focus:ring-4 focus:ring-[#49b8c8]/20";

  const MiniCheckLocal = ({ children }) => <li className="flex gap-3 text-sm font-bold leading-7 text-slate-700"><CheckCircle2 className="mt-1 shrink-0 text-[#1f7a2e]" size={18} />{children}</li>;

  if (submitted) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-[#ddf4f4] via-white to-[#fff8df] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[3rem] border border-[#49b8c8]/20 bg-white p-8 text-center shadow-2xl shadow-[#128c8c]/10 md:p-12">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#1f7a2e] text-white shadow-xl"><CheckCircle2 size={42} /></div>
          <h1 className="mt-6 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">{ins.submitted.title}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-700">{ins.submitted.intro}</p>
          <p className="mt-5 rounded-[2rem] bg-[#ddf4f4]/60 p-6 font-semibold leading-8 text-slate-700">{ins.submitted.followUp}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><Button onClick={onSchedule}>{ins.submitted.scheduleAppointment}</Button><Button variant="secondary" onClick={onHome}>{ins.submitted.returnHome}</Button></div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{ins.hero.eyebrow}</p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-7xl">{ins.hero.title}</h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-9 text-slate-700">{ins.hero.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4"><Button onClick={scrollToVerify}>{ins.hero.verifyInsurance} <ArrowRight size={18} /></Button><Button variant="secondary" onClick={onStart}>{ins.hero.startABA}</Button></div>
            <div className="mt-8 max-w-2xl rounded-[2rem] border border-[#49b8c8]/20 bg-white/90 p-6 shadow-xl shadow-[#128c8c]/10 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#eef9f4] text-[#1f7a2e]">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#0b4f4f]">{ins.hero.supportTitle}</h2>
                  <p className="mt-3 text-base font-semibold leading-7 text-slate-700">{ins.hero.supportText}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {ins.hero.supportItems.map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-2xl bg-[#ddf4f4]/55 p-3 text-sm font-black leading-6 text-[#0b4f4f]">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[#1f7a2e]" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative"><div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-[#f7c72f]" />
            {/* TODO: Replace with final brand photo — family reviewing insurance benefits with care coordinator. */}
            <img src={IMG.insurance.hero} alt={ins.hero.imageAlt} className="relative h-[440px] w-full rounded-[3rem] object-cover shadow-2xl ring-8 ring-white" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#49b8c8]/30 bg-white px-5 py-3 text-sm font-black text-[#0b4f4f] shadow-lg shadow-[#128c8c]/10"><MapPin size={18} className="text-[#1f7a2e]" /> {va.badge}</div>
              <h2 className="mt-6 text-4xl font-black leading-tight text-[#0b4f4f] md:text-6xl">{va.title}</h2>
              <p className="mt-6 text-lg font-semibold leading-9 text-slate-700">{va.intro}</p>
              <div className="mt-8 rounded-[2rem] border border-[#49b8c8]/20 bg-white p-6 shadow-xl shadow-[#128c8c]/10"><h3 className="text-2xl font-black text-[#0b4f4f]">{va.prepareTitle}</h3><ul className="mt-5 grid gap-3">{prepItems.map((item) => <MiniCheckLocal key={item}>{item}</MiniCheckLocal>)}</ul></div>
            </div>
            <div className="grid gap-5">
              {virginiaCards.map(([Icon, title, text]) => <article key={title} className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-xl shadow-[#128c8c]/10"><div className="flex items-start gap-5"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#ddf4f4] to-[#fff8df] text-[#1f7a2e]"><Icon size={30} /></div><div><h3 className="text-2xl font-black text-[#0b4f4f]">{title}</h3><p className="mt-3 font-semibold leading-8 text-slate-700">{text}</p></div></div></article>)}
              <article className="rounded-[2rem] border border-[#49b8c8]/20 bg-gradient-to-br from-white to-[#ddf4f4]/60 p-7 shadow-xl shadow-[#128c8c]/10"><h3 className="text-2xl font-black text-[#0b4f4f]">{va.helpTitle}</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{helpItems.map((item) => <MiniCheckLocal key={item}>{item}</MiniCheckLocal>)}</div></article>
            </div>
          </div>

          <div className="mt-12 rounded-[2.5rem] border border-[#49b8c8]/20 bg-white p-6 shadow-2xl shadow-[#128c8c]/10 md:p-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><h3 className="text-3xl font-black text-[#0b4f4f]">{va.plansTitle}</h3><p className="mt-3 max-w-3xl font-semibold leading-7 text-slate-700">{va.plansIntro}</p></div><Button onClick={scrollToVerify}>{ins.hero.verifyInsurance} <ArrowRight size={18} /></Button></div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{visibleProviders.map((provider) => <div key={provider} className="rounded-[1.4rem] border border-[#49b8c8]/20 bg-gradient-to-br from-white to-[#ddf4f4]/50 p-5 text-center font-black text-[#0b4f4f] shadow-sm"><CheckCircle2 className="mx-auto mb-3 text-[#1f7a2e]" size={22} />{provider}</div>)}</div>
            <button type="button" onClick={() => setShowAllProviders((v) => !v)} className="mt-6 w-full rounded-full border border-slate-200 bg-white px-6 py-4 font-black text-[#0b4f4f] shadow-sm transition hover:bg-[#ddf4f4]">{showAllProviders ? va.showLess : va.showMore}</button>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-[#f7c72f]/70" />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-[2.5rem] bg-[#49b8c8]/20" />
            {/* TODO: Replace with final brand photo — insurance prior authorization and care planning support. */}
            <img
              src={IMG.insurance.priorAuth}
              alt={pa.imageAlt}
              className="relative h-[420px] w-full rounded-[2.5rem] object-cover shadow-2xl ring-8 ring-white"
            />
          </div>

          <div className="order-1 rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-900/10 md:p-8 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eef9f4] px-4 py-2 text-sm font-black text-[#1f7a2e]">
              <ClipboardCheck size={18} /> {pa.badge}
            </div>
            <h2 className="mt-5 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">{pa.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{pa.intro}</p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {pa.steps.map(([title, text], i) => {
                const Icon = PRIOR_AUTH_ICONS[i];
                return (
                <div key={title} className="rounded-[1.5rem] border border-slate-100 bg-gradient-to-br from-white to-[#eef9f4] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1f7a2e] text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#0b4f4f]">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{text}</p>
                </div>
              );})}
            </div>

            <p className="mt-6 rounded-[1.5rem] bg-[#fff8df] p-5 text-base font-bold leading-7 text-[#0b4f4f]">{pa.disclaimer}</p>

            <div className="mt-7">
              <Button onClick={scrollToVerify}>{pa.cta} <ArrowRight size={18} /></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><h2 className="text-4xl font-black text-[#0b4f4f] md:text-5xl">{ins.faqTitle}</h2></div><div className="grid gap-3">{faqs.map(([question, answer]) => <div key={question} className="rounded-[1.4rem] border border-slate-100 bg-white shadow-sm"><button type="button" onClick={() => setOpenFaq(openFaq === question ? "" : question)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-black text-[#0b4f4f]">{question}<ChevronDown className={openFaq === question ? "rotate-180 transition" : "transition"} size={20} /></button>{openFaq === question && <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-base font-medium leading-8 text-slate-700">{answer}</div>}</div>)}</div></div></section>

      <section id="verify-form" className="bg-[#fff8df] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <InsuranceVerificationForm
            t={formT}
            onSchedule={onSchedule}
            onHome={onHome}
          />
        </div>
      </section>
    </div>
  );
}

function ServiceExplorer({ t }) {
  const cards = t.services.map(([title, text], index) => ({
    title,
    text,
    image: IMG.home.services[index],
    alt: t.serviceImageAlts?.[index] ?? title,
  }));

  return (
    <section className="bg-white px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black italic tracking-tight text-[#128c8c] md:text-5xl">{t.serviceHeadline}</h2>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{t.serviceSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <article key={card.title} className="overflow-hidden rounded-[1.8rem] bg-white shadow-xl shadow-[#128c8c]/10 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-2xl">
              <img src={card.image} alt={card.alt} className="h-44 w-full object-cover" />
              <div className="min-h-[230px] bg-gradient-to-br from-[#1f7a2e] via-[#128c8c] to-[#0b4f4f] p-6 text-white">
                <h3 className="text-2xl font-black leading-tight">{card.title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-white/90">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientReviewMarquee({ t, onStart, onVerifyInsurance }) {
  const c = t.pages.clientReviews;
  const reviews = c.reviews;

  const firstRow = reviews.slice(0, 12);
  const secondRow = reviews.slice(12);
  const labels = c.cardLabels;
  const initials = ["A.", "M.", "S.", "L.", "R.", "J.", "K.", "N.", "T.", "P.", "D.", "H."];

  const ReviewCard = ({ text, index }) => (
    <article className="mx-3 w-[520px] shrink-0 rounded-[1.7rem] border border-[#49b8c8]/20 bg-white p-5 shadow-xl shadow-[#128c8c]/10 md:w-[600px]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-1 text-[#f7c72f]">
          {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={18} fill="currentColor" />)}
        </div>
        <span className="rounded-full bg-[#ddf4f4] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#0b4f4f]">
          {labels[index % labels.length]}
        </span>
      </div>
      <p className="mt-4 truncate whitespace-nowrap overflow-hidden text-ellipsis text-base font-semibold leading-7 text-slate-700">“{text}”</p>
      <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#1f7a2e] to-[#128c8c] text-sm font-black text-white">
          {initials[index % initials.length]}
        </div>
        <div>
          <p className="text-sm font-black text-[#0b4f4f]">{c.parentReview}</p>
          <p className="text-xs font-bold text-slate-500">{labels[index % labels.length]}</p>
        </div>
      </div>
    </article>
  );

  return (
    <section className="relative overflow-hidden bg-[#eef9f4] px-4 py-20 lg:px-8">
      <style>{`
        @keyframes eden-scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes eden-scroll-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .eden-marquee-left { animation: eden-scroll-left 46s linear infinite; }
        .eden-marquee-right { animation: eden-scroll-right 52s linear infinite; }
        .eden-marquee-wrap:hover .eden-marquee-left,
        .eden-marquee-wrap:hover .eden-marquee-right { animation-play-state: paused; }
      `}</style>
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#49b8c8]/25 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#f7c72f]/25 blur-3xl" />
      <div className="relative mx-auto max-w-7xl text-center">
        <p className="inline-flex rounded-full border border-[#49b8c8]/30 bg-white px-5 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#128c8c] shadow-sm">
          {c.badge}
        </p>
        <h2 className="mt-5 text-4xl font-black tracking-tight text-[#0b4f4f] md:text-6xl">{c.title}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-700">
          {c.intro}
        </p>
        <GoogleReviews
          variant="compact"
          labels={t.pages.footer.googleReviews}
          className="mt-5"
        />
      </div>

      <div className="eden-marquee-wrap relative mt-12 space-y-6 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#eef9f4] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#eef9f4] to-transparent" />
        <div className="eden-marquee-left flex w-max">
          {[...firstRow, ...firstRow].map((review, index) => <ReviewCard key={`top-${index}`} text={review} index={index} />)}
        </div>
        <div className="eden-marquee-right flex w-max">
          {[...secondRow, ...secondRow].map((review, index) => <ReviewCard key={`bottom-${index}`} text={review} index={index + 12} />)}
        </div>
      </div>

      <div className="relative z-20 mt-12 flex flex-wrap justify-center gap-4">
        <Button onClick={onStart}>{c.startABA} <ArrowRight size={18} /></Button>
        <Button onClick={onVerifyInsurance} variant="secondary">{c.verifyInsurance}</Button>
      </div>
    </section>
  );
}

function InsurancePaymentSection({ t, onStart }) {
  const ip = t.pages.insurancePayment;
  const providerColors = [
    "border-[#58b82e]/30 bg-[#58b82e]/10 text-[#1f7a2e]",
    "border-[#128c8c]/30 bg-[#128c8c]/10 text-[#0b4f4f]",
    "border-[#49b8c8]/40 bg-[#49b8c8]/15 text-[#0b4f4f]",
    "border-[#1f7a2e]/30 bg-[#1f7a2e]/10 text-[#1f7a2e]",
    "border-[#b6d930]/50 bg-[#b6d930]/20 text-[#0b4f4f]",
    "border-[#ff8a1f]/40 bg-[#ff8a1f]/15 text-[#8a3f00]",
    "border-[#f7c72f]/60 bg-[#fff8df] text-[#0b4f4f]",
    "border-[#49b8c8]/40 bg-[#ddf4f4] text-[#0b4f4f]",
    "border-[#f7c72f]/70 bg-[#f7c72f]/25 text-[#0b4f4f]",
  ];
  const providers = ip.providers.map((name, index) => ({
    name,
    color: providerColors[index % providerColors.length],
  }));

  return (
    <section className="relative overflow-hidden bg-[#eef9f4] px-4 py-20 lg:px-8">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#49b8c8]/20 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#f7c72f]/25 blur-3xl" />
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-[#49b8c8]/20 bg-white shadow-2xl shadow-[#128c8c]/10">
        <div className="grid gap-8 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{ip.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">
              {ip.title}
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">
              {ip.intro}
            </p>
            <h3 className="mt-8 text-xl font-black text-[#128c8c]">
              {ip.providersHeading}
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {providers.map((provider) => (
                <span key={provider.name} className={`rounded-full border px-4 py-3 text-sm font-black shadow-sm ${provider.color}`}>
                  {provider.name}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button onClick={onStart}>{ip.verifyInsurance} <ArrowRight size={18} /></Button>
              <button type="button" onClick={onStart} className="font-black text-[#128c8c] underline-offset-4 hover:underline">
                {ip.contactLearnMore}
              </button>
            </div>
          </div>

          <div className="rounded-[2.2rem] bg-gradient-to-br from-[#1f7a2e] via-[#128c8c] to-[#0b4f4f] p-8 text-white shadow-xl">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#f7c72f] text-[#0b4f4f]">
              <ShieldCheck size={34} />
            </div>
            <h3 className="mt-6 text-3xl font-black">{ip.sidebarTitle}</h3>
            <div className="mt-6 grid gap-4 text-sm font-semibold leading-7 text-teal-50">
              {ip.sidebarItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                  <CheckCircle2 className="shrink-0 text-[#f7c72f]" size={20} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EligibilityChecker({ t, onStart, onAssessment, onCast, onMchat, onSchedule }) {
  return (
    <section className="bg-gradient-to-br from-[#1f7a2e] via-[#128c8c] to-[#0b4f4f] px-4 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">
            {t.gettingStartedTitle}
          </h2>

          <p className="mx-auto mt-8 max-w-4xl text-lg font-semibold leading-8 text-white/95">
            {t.gettingStartedP1}
          </p>

          <p className="mx-auto mt-7 max-w-4xl text-lg font-semibold leading-8 text-white/95">
            {t.gettingStartedP2}
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          <div className="rounded-[2rem] bg-[#0b4f4f] p-8 shadow-2xl shadow-[#0b4f4f]/30 ring-1 ring-white/10 md:p-10">
            <div className="mb-8 grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-lime-300">
              <ClipboardCheck size={42} />
            </div>

            <h3 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              {t.screeningToolsTitle}
            </h3>

            <div className="mt-8">
              <p className="text-lg font-bold text-white">{t.forToddlers}</p>
              <button
                type="button"
                onClick={onMchat || (() => { window.location.href = "/m-chat-r-online-screener"; })}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f7c72f] px-7 py-4 text-base font-black text-[#0b4f4f] shadow-lg transition hover:bg-[#ff8a1f] hover:text-white"
              >
                {t.takeMchat} <ArrowRight size={18} />
              </button>
            </div>

            <div className="mt-8">
              <p className="text-lg font-bold text-white">{t.forOlderChildren}</p>
              <button
                type="button"
                onClick={onCast}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f7c72f] px-7 py-4 text-base font-black text-[#0b4f4f] shadow-lg transition hover:bg-[#ff8a1f] hover:text-white"
              >
                {t.takeCast} <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 text-slate-800 shadow-2xl shadow-emerald-950/20 md:p-10">
            <div className="mb-8 grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-lime-600">
              <MapPin size={42} />
            </div>

            <h3 className="text-3xl font-black tracking-tight text-emerald-950 md:text-4xl">
              {t.assessmentTitle}
            </h3>

            <p className="mt-6 text-lg font-semibold leading-8 text-slate-700">
              {t.assessmentText}
            </p>

            <button
              type="button"
              onClick={onAssessment || onStart}
              className="mt-14 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1f7a2e] px-7 py-4 text-base font-black text-white shadow-lg transition hover:bg-[#ff8a1f]"
            >
              {t.diagnosticSupport} <ArrowRight size={18} />
            </button>
          </div>

          <div className="rounded-[2rem] bg-white p-8 text-slate-800 shadow-2xl shadow-emerald-950/20 ring-2 ring-[#f7c72f]/40 md:p-10">
            <div className="mb-8 grid h-16 w-16 place-items-center rounded-2xl bg-[#fff8df] text-[#ff8a1f]">
              <CalendarDays size={42} />
            </div>

            <h3 className="text-3xl font-black tracking-tight text-emerald-950 md:text-4xl">
              {t.onlineSchedulerTitle}
            </h3>

            <p className="mt-6 text-lg font-semibold leading-8 text-slate-700">
              {t.onlineSchedulerText}
            </p>

            <ul className="mt-6 grid gap-2.5">
              {t.onlineSchedulerFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm font-semibold leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#128c8c]" size={18} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={onSchedule}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f7c72f] px-7 py-4 text-base font-black text-[#0b4f4f] shadow-lg transition hover:bg-[#ff8a1f] hover:text-white"
            >
              {t.pages.scheduler.introOnly.scheduleOnline} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ParentResourcesSection({ t, onStart }) {
  const pr = t.pages.parentResources;
  const RESOURCE_ICONS = [ClipboardCheck, FileText, ShieldCheck, MessageCircle];
  const resources = pr.cards.map(([title, text], i) => [RESOURCE_ICONS[i], title, text]);

  return (
    <section className="bg-white px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{pr.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-black text-[#0b4f4f] md:text-5xl">{pr.title}</h2>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{pr.intro}</p>
        </div>
        {/* TODO: Replace with final brand photo — parent reading caregiver education resources. */}
        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-slate-100">
          <img
            src={IMG.parentResources.banner}
            alt={pr.bannerImageAlt}
            className="h-56 w-full object-cover md:h-72"
          />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {resources.map(([Icon, title, text]) => (
            <article key={title} className="rounded-[2rem] border border-slate-100 bg-gradient-to-br from-white to-[#ddf4f4]/40 p-7 shadow-xl shadow-[#128c8c]/5">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#fff8df] text-[#ff8a1f]"><Icon size={28} /></div>
              <h3 className="mt-5 text-xl font-black text-[#0b4f4f]">{title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-9 text-center">
          <Button onClick={onStart}>{pr.cta} <ArrowRight size={18} /></Button>
        </div>
      </div>
    </section>
  );
}

function Careers({ t }) {
  const [q, setQ] = useState("");
  const jobs = t.jobs || [];
  const filtered = jobs.filter((j) => `${j.role} ${j.type} ${j.location} ${j.dept}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <div className="rounded-[2.5rem] bg-gradient-to-br from-emerald-50 via-white to-yellow-50 p-8 md:p-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-black text-emerald-700">{t.careersEyebrow}</p>
            <h2 className="mt-3 text-4xl font-black text-emerald-950">{t.careersTitle}</h2>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.searchJobs} className="w-full rounded-full border border-emerald-100 bg-white py-3 pl-11 pr-4 font-bold outline-none focus:border-emerald-500" />
          </div>
        </div>
        <div className="mt-8 grid gap-4">
          {filtered.map((job) => (
            <div key={job.role} className="flex flex-col justify-between gap-4 rounded-3xl bg-white p-5 shadow-sm md:flex-row md:items-center">
              <div><p className="text-xl font-black text-emerald-950">{job.role}</p><p className="mt-1 text-sm font-bold text-slate-600">{job.dept} • {job.type} • {job.location}</p></div>
              <Button variant="dark">{t.apply} <ExternalLink size={16} /></Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnterprisePlatformSuite() {
  const [activeModule, setActiveModule] = useState("Backend + Supabase");
  const [role, setRole] = useState("Admin");
  const [leadStatus, setLeadStatus] = useState("New Intake");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "Eden Assistant",
      text: "Hi! I can help with ABA therapy, speech therapy, occupational therapy, intake, insurance, scheduling, documents, and parent questions. How can I help today?",
    },
  ]);
  const [appointment, setAppointment] = useState({ date: "", time: "" });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const modules = [
    { name: "Backend + Supabase", icon: ShieldCheck, text: "Secure form submission, database tables, server validation, encrypted records, and audit history." },
    { name: "Secure Uploads", icon: UploadCloud, text: "Insurance cards, diagnosis reports, IEPs, referrals, signed forms, and clinical documents." },
    
    { name: "Parent Portal", icon: Users, text: "Family login, appointment view, document upload, messages, signatures, and intake status tracking." },
    { name: "Staff Login + RBAC", icon: LockKeyhole, text: "Admin, BCBA, RBT, Intake, Billing, Parent, and Read Only permissions." },
    { name: "Insurance Verification", icon: CreditCard, text: "API-ready eligibility workflow with payer, member ID, DOB, authorization status, and benefits notes." },
    { name: "Appointment Scheduling", icon: CalendarDays, text: "Consultation bookings, assessment scheduling, staff availability, reminders, and calendar sync." },
    { name: "Locations + SEO", icon: MapPin, text: "City pages for Fairfax, Loudoun, Prince William, Alexandria, Arlington, Manassas, and more." },
    { name: "Blog + CMS", icon: FileText, text: "Resource articles, autism education, caregiver guides, editable content, categories, and SEO metadata." },
    { name: "Live Chat", icon: MessageCircle, text: "Website chat widget, intake support, routing, staff responses, and saved conversation history." },
    { name: "Email + SMS", icon: Mail, text: "Confirmation emails, staff alerts, SMS reminders, intake follow-ups, and no-show communication." },
    { name: "PDF + E-Sign", icon: FileSignature, text: "Electronic signature capture and PDF generation for intake summaries and consent records." },
  ];

  const pipeline = ["New Intake", "Insurance Review", "Documents Needed", "Clinical Review", "Assessment Scheduled", "Authorization Pending", "Ready to Start"];
  const cities = ["Fairfax", "Loudoun", "Prince William", "Alexandria", "Arlington", "Falls Church", "Manassas", "Centreville", "Chantilly", "Reston", "Herndon", "Woodbridge"];
  const permissions = [
    ["Admin", "Full access to dashboard, users, files, messages, billing, analytics, and settings"],
    ["BCBA", "Clinical review, treatment notes, assessment files, parent messages, and care plans"],
    ["RBT", "Assigned client schedule, session documents, and limited client information"],
    ["Intake", "Admissions pipeline, insurance review, documents, and family communication"],
    ["Billing", "Insurance, authorizations, payer data, invoices, and payment notes"],
    ["Parent", "Own child portal, uploads, forms, signatures, appointments, and messages"],
  ];

  const active = modules.find((m) => m.name === activeModule) || modules[0];
  const ActiveIcon = active.icon;

  const getChatReply = (message) => {
    const q = message.toLowerCase();

    if (q.includes("emergency") || q.includes("danger") || q.includes("suicide") || q.includes("hurt") || q.includes("911")) {
      return "If there is immediate danger or a medical emergency, call 911 right away. For urgent safety concerns, contact your child’s doctor or local emergency services. I can still help with general ABA safety planning after the immediate risk is handled.";
    }

    if (q.includes("aba") || q.includes("behavior") || q.includes("tantrum") || q.includes("hitting") || q.includes("aggression") || q.includes("elop") || q.includes("autism")) {
      return "ABA therapy focuses on understanding why behavior happens and teaching safer, more helpful replacement skills. A BCBA usually assesses communication, daily living, social skills, triggers, reinforcement, and safety needs, then creates a treatment plan. For hitting, aggression, tantrums, or elopement, the next step is usually an intake, caregiver interview, and behavior assessment.";
    }

    if (q.includes("speech") || q.includes("talk") || q.includes("language") || q.includes("communication") || q.includes("words") || q.includes("nonverbal")) {
      return "Speech therapy helps with communication, understanding language, expressive language, articulation, social communication, feeding-related oral motor skills when appropriate, and AAC supports such as picture systems or speech devices. ABA and speech therapy can work together when the child needs help requesting, following directions, social communication, or reducing frustration from communication difficulty.";
    }

    if (q.includes("occupational") || q.includes(" ot") || q.includes("sensory") || q.includes("fine motor") || q.includes("feeding") || q.includes("dressing") || q.includes("handwriting")) {
      return "Occupational therapy helps children build daily living, sensory regulation, fine motor, feeding, dressing, play, and school-readiness skills. OT is often helpful when a child has sensory sensitivities, difficulty with transitions, trouble with utensils, dressing, handwriting, or body awareness. ABA can coordinate with OT goals so skills generalize at home and school.";
    }

    if (q.includes("insurance") || q.includes("medicaid") || q.includes("authorization") || q.includes("benefit") || q.includes("coverage")) {
      return "For insurance verification, families usually provide the child’s full name, date of birth, insurance provider, member ID, policy holder information, diagnosis documentation, and sometimes a referral. The intake team can check benefits, authorization requirements, copays, deductibles, and documentation needed before starting ABA therapy.";
    }

    if (q.includes("intake") || q.includes("start") || q.includes("begin") || q.includes("apply") || q.includes("form")) {
      return "To start ABA therapy, complete the Start ABA Therapy form with parent information, child information, diagnosis status, insurance details, preferred contact method, and your main concerns. After submission, the intake team should review insurance, documents, availability, and schedule the next call or assessment.";
    }

    if (q.includes("schedule") || q.includes("appointment") || q.includes("assessment") || q.includes("availability")) {
      return "Scheduling usually depends on your child’s needs, location, insurance authorization, staff availability, and recommended service hours. The first appointments are commonly an intake call and assessment. You can share preferred days, times, school schedule, and whether you want in-home, clinic, or community support.";
    }

    if (q.includes("document") || q.includes("upload") || q.includes("diagnosis") || q.includes("iep") || q.includes("file")) {
      return "Helpful documents include the diagnosis report, insurance card, referral if required, IEP or school evaluation, prior therapy reports, medication/allergy information, and custody/legal documents if applicable. For a live website, uploads should be stored securely with access controls and audit logs.";
    }

    if (q.includes("parent") || q.includes("training") || q.includes("caregiver")) {
      return "Parent training helps caregivers use the same strategies outside therapy sessions. It can cover communication, routines, behavior prevention, reinforcement, transitions, toileting, feeding routines, safety, and how to respond consistently to challenging behaviors.";
    }

    if (q.includes("price") || q.includes("cost") || q.includes("pay") || q.includes("copay")) {
      return "Cost depends on insurance coverage, deductible, copay, coinsurance, authorization, and whether services are covered as medically necessary. The intake team should verify benefits before services begin and explain any estimated family responsibility.";
    }

    return "I can help with ABA therapy, speech therapy, occupational therapy, autism support, intake, insurance, scheduling, documents, and parent training. Please tell me your child’s age, main concern, diagnosis status, and whether you are asking about ABA, speech, OT, or starting services.";
  };

  const sendChatMessage = () => {
    const clean = chatInput.trim();
    if (!clean) return;
    const reply = getChatReply(clean);
    setChatMessages((old) => [...old, { sender: "You", text: clean }, { sender: "Eden Assistant", text: reply }]);
    setChatInput("");
  };

  return (
    <section className="bg-slate-950 px-4 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="font-black uppercase tracking-[0.3em] text-yellow-300">Complete Business System</p>
            <h2 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">Full custom-coded ABA platform.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              This adds the architecture and working front-end foundation for backend submission, portals, dashboards, scheduling, documents, automation, analytics, SEO, and dark mode. Supabase keys and third-party API credentials are added later through environment variables.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-emerald-400/20 p-4 text-emerald-300"><ActiveIcon size={34} /></div>
              <div>
                <h3 className="text-2xl font-black">{active.name}</h3>
                <p className="mt-2 text-slate-300">{active.text}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {modules.map(({ name, icon: Icon, text }) => (
            <button
              key={name}
              type="button"
              onClick={() => setActiveModule(name)}
              className={`rounded-[1.5rem] border p-5 text-left transition ${activeModule === name ? "border-emerald-300 bg-emerald-400/15" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
            >
              <Icon className="text-yellow-300" size={26} />
              <p className="mt-4 font-black">{name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-black">Parent Portal</h3>
            <div className="mt-5 space-y-3 text-sm font-bold text-slate-300">
              <p>✅ Intake status: {leadStatus}</p>
              <p>✅ Uploaded documents: {Math.max(uploadedFiles.length, 2)}</p>
              <p>✅ Messages with admissions team</p>
              <p>✅ Appointment: {appointment.date || "Not scheduled"} {appointment.time}</p>
              <p>✅ E-sign consent forms</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-black">Insurance Verification API</h3>
            <div className="mt-5 grid gap-3">
              <input className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-bold text-white placeholder:text-slate-400" placeholder="Insurance payer" />
              <input className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-bold text-white placeholder:text-slate-400" placeholder="Member ID" />
              <Button variant="gold">Run Eligibility Check</Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-black">PDF + E-Sign</h3>
            <div className="mt-5 rounded-2xl bg-white p-4 text-slate-900">
              <p className="font-black text-emerald-950">Electronic Signature</p>
              <input className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 font-bold" placeholder="Type parent/guardian signature" />
            </div>
            <Button className="mt-4 w-full">Generate Intake PDF</Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-black">Blog / CMS System</h3>
            {[
              "What Is ABA Therapy?",
              "How Parent Training Helps",
              "Preparing for an ABA Assessment",
            ].map((post) => <p key={post} className="mt-3 rounded-2xl bg-white/10 p-4 font-bold">📝 {post}</p>)}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-black">Email + SMS Automation</h3>
            <div className="mt-4 space-y-3 text-sm font-bold text-slate-300">
              <p>📧 Intake confirmation email</p>
              <p>📧 Staff notification email</p>
              <p>📱 Appointment reminder SMS</p>
              <p>📱 Missing document follow-up SMS</p>
              <p>📧 Authorization status update</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-black">Analytics Dashboard</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[["2.4k", "Visitors"], ["184", "Leads"], ["38", "Scheduled"], ["21%", "Conversion"]].map(([n, l]) => (
                <div key={l} className="rounded-2xl bg-white/10 p-4 text-center"><p className="text-2xl font-black text-yellow-300">{n}</p><p className="text-sm text-slate-300">{l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveChatAssistant({ t }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "Eden Assistant",
      text: t.chatGreeting,
    },
  ]);

  const r = t.chatResponses;

  useEffect(() => {
    setMessages([{ sender: "Eden Assistant", text: t.chatGreeting }]);
  }, [t.chatGreeting]);

  const answerQuestion = (question) => {
    const q = question.toLowerCase();

    if (q.includes("emergency") || q.includes("911") || q.includes("danger") || q.includes("suicide") || q.includes("kill") || q.includes("hurt himself") || q.includes("hurt herself")) {
      return r.emergency;
    }

    if (q.includes("what is aba") || q.includes("aba therapy") || q.includes("applied behavior") || q.includes("behavior therapy")) {
      return r.aba;
    }

    if (q.includes("hit") || q.includes("hitting") || q.includes("aggression") || q.includes("bite") || q.includes("biting") || q.includes("tantrum") || q.includes("meltdown") || q.includes("throw")) {
      return r.behavior;
    }

    if (q.includes("speech") || q.includes("talk") || q.includes("language") || q.includes("nonverbal") || q.includes("communication") || q.includes("aac")) {
      return r.speech;
    }

    if (q.includes("occupational") || q.includes(" ot") || q.includes("sensory") || q.includes("fine motor") || q.includes("handwriting") || q.includes("feeding") || q.includes("dressing") || q.includes("toilet")) {
      return r.occupational;
    }

    if (q.includes("insurance") || q.includes("medicaid") || q.includes("anthem") || q.includes("aetna") || q.includes("cigna") || q.includes("united") || q.includes("coverage") || q.includes("authorization") || q.includes("copay")) {
      return r.insurance;
    }

    if (q.includes("start") || q.includes("intake") || q.includes("begin") || q.includes("apply") || q.includes("enroll") || q.includes("form")) {
      return r.intake;
    }

    if (q.includes("assessment") || q.includes("schedule") || q.includes("appointment") || q.includes("availability") || q.includes("hours")) {
      return r.scheduling;
    }

    if (q.includes("document") || q.includes("upload") || q.includes("diagnosis") || q.includes("iep") || q.includes("evaluation") || q.includes("referral")) {
      return r.documents;
    }

    if (q.includes("parent training") || q.includes("caregiver") || q.includes("parents help") || q.includes("home")) {
      return r.parentTraining;
    }

    if (q.includes("cost") || q.includes("price") || q.includes("pay") || q.includes("expensive")) {
      return r.cost;
    }

    if (q.includes("school") || q.includes("iep") || q.includes("teacher")) {
      return r.school;
    }

    return r.default;
  };

  

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      {open && (
        <div className="mb-3 w-[370px] overflow-hidden rounded-[2rem] border border-emerald-100 bg-white text-slate-900 shadow-2xl sm:w-[420px]">
          <div className="bg-emerald-800 p-5 text-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-black">{t.edenAssistant}</h3>
                <p className="text-xs font-bold text-emerald-50">{t.chatSupport}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full bg-white/10 p-2"><X size={16} /></button>
            </div>
            </div>

          <div ref={(el) => { if (el) el.scrollTop = el.scrollHeight; }} className="max-h-96 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((msg, index) => (
              <div key={`${msg.sender}-${index}`} className={`rounded-2xl p-3 text-sm leading-6 ${msg.sender === "You" ? "ml-10 bg-emerald-700 text-white" : "mr-6 bg-white text-slate-800 shadow-sm"}`}>
                <p className="mb-1 text-xs font-black opacity-70">{msg.sender === "You" ? t.you : msg.sender}</p>
                <p>{msg.text}</p>
              </div>
            ))}
          {isTyping && <div className="mr-6 rounded-2xl bg-white p-3 text-sm font-bold text-slate-500 shadow-sm">{t.typing}</div>}
          </div>

          <div className="border-t border-slate-100 bg-white p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const clean = input.trim();
                if (!clean) return;
                setIsTyping(true);
                const reply = answerQuestion(clean);
                setTimeout(() => {
                  setMessages((old) => [...old, { sender: "You", text: clean }, { sender: "Eden Assistant", text: reply }]);
                  setInput("");
                  setIsTyping(false);
                }, 400);
              }}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                className="min-h-20 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                placeholder={t.chatPlaceholder}
              />
              <button type="submit" className="mt-3 w-full rounded-full bg-emerald-700 px-6 py-3 text-sm font-black text-white hover:bg-emerald-800">
                {t.sendMessage}
              </button>
            </form>
            <p className="mt-3 text-center text-[11px] leading-4 text-slate-500">{t.emergencyNote}</p>
          </div>
        </div>
      )}

      <button type="button" onClick={() => setOpen(!open)} className="rounded-full bg-yellow-400 px-6 py-4 font-black text-emerald-950 shadow-2xl">
        💬 {t.liveChat}
      </button>
    </div>
  );
}

function NewsletterBanner({ t }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <section className="bg-white px-4 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-6 py-12 text-center shadow-2xl shadow-[#128c8c]/20 md:px-10 md:py-16">
        <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
          {t.newsletterTitle}
        </h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!firstName.trim() || !email.trim()) return;
            setJoined(true);
          }}
          className="mx-auto mt-9 flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-center"
        >
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="h-14 min-w-0 flex-1 rounded-full border border-white/10 bg-white px-6 text-base font-bold text-slate-900 outline-none shadow-lg transition focus:ring-4 focus:ring-lime-300/30"
            placeholder={t.firstName}
          />

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-14 min-w-0 flex-1 rounded-full border border-white/10 bg-white px-6 text-base font-bold text-slate-900 outline-none shadow-lg transition focus:ring-4 focus:ring-lime-300/30"
            placeholder={t.email}
          />

          <button
            type="submit"
            className="h-14 rounded-full bg-[#f7c72f] px-8 text-base font-black text-[#0b4f4f] shadow-xl transition hover:bg-[#ff8a1f] hover:text-white"
          >
            {t.joinNewsletter}
          </button>
        </form>

        {joined && (
          <p className="mt-5 text-sm font-bold text-lime-200">
            {t.newsletterThanks}, {firstName}! {t.newsletterThanksEnd}
          </p>
        )}
      </div>
    </section>
  );
}

function Footer({ t }) {
  const f = t.pages.footer;
  return (
    <footer className="bg-gradient-to-br from-[#032f2b] via-[#0b4f4f] to-[#1f7a2e] px-4 pt-16 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <LogoImage t={t} alt={t.logo?.defaultAlt || t.brandName} className="h-20 w-auto rounded-2xl bg-white p-2" />
            <p className="mt-6 text-base leading-8 text-emerald-50">
              {t.footerDescription}
            </p>

            <a
              href="#intake"
              onClick={(event) => {
                event.preventDefault();
                window.location.hash = "intake";
                window.dispatchEvent(new CustomEvent("eden:navigate", { detail: "intake" }));
              }}
              className="mt-6 inline-flex items-center rounded-full bg-lime-500 px-6 py-3 text-sm font-black text-emerald-950 transition hover:bg-lime-400"
            >
              {t.startABA}
            </a>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">{f.forParents.title}</h4>
            <div className="mt-5 grid gap-3 text-sm font-bold text-emerald-50">
              {f.forParents.links.map((link) => <a key={link} href="#">{link}</a>)}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">{f.resources.title}</h4>
            <div className="mt-5 grid gap-3 text-sm font-bold text-emerald-50">
              {f.resources.links.map((link) => <a key={link} href="#">{link}</a>)}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">{f.careers.title}</h4>
            <div className="mt-5 grid gap-3 text-sm font-bold text-emerald-50">
              {f.careers.links.map((link) => <a key={link} href="#">{link}</a>)}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">{f.contact.title}</h4>

            <div className="mt-5 grid gap-4 text-sm text-emerald-50">
              <p className="flex gap-3 leading-7">
                <MapPin size={18} className="mt-1 shrink-0" />
                <span>{t.edenBusinessInfo.address}</span>
              </p>

              <p className="flex items-center gap-3 font-bold">
                <Phone size={18} />
                <span>{t.edenBusinessInfo.phone}</span>
              </p>

              <p className="flex items-center gap-3 font-bold">
                <FileText size={18} />
                <span>{f.contact.faxPrefix} {t.edenBusinessInfo.fax}</span>
              </p>

              <p className="flex items-center gap-3 font-bold">
                <Mail size={18} />
                <span>{f.contact.email}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 border-b border-white/10 py-10 lg:grid-cols-3">
          <FooterFindCenter labels={f.findCenter} />

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
              {t.officeHours}
            </h4>

            <div className="mt-4 grid gap-2 text-sm text-emerald-50">
              {t.edenBusinessInfo.hours.map(([day, time]) => (
                <div key={day} className="flex justify-between gap-5">
                  <span className="font-bold">{day}</span>
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </div>

          <GoogleReviews variant="footer" labels={f.googleReviews} />
        </div>

        <div className="flex flex-col gap-5 py-6 text-sm text-emerald-100 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {f.copyright}</p>

          <div className="flex flex-wrap gap-5 font-bold">
            {f.legalLinks.map((link) => <a key={link} href="#">{link}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SchedulerIntroCard({ t, onStart }) {
  const intro = t.pages.scheduler.introCard;
  const sections = intro.sections;


  return (
    <div className="mb-10 overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#1f7a2e] via-[#128c8c] to-[#0b4f4f] p-6 shadow-2xl shadow-[#128c8c]/20 md:p-10">
      <div className="grid gap-6 lg:grid-cols-3">
        {sections.map((section) => (
          <div key={section.title} className="rounded-[2rem] bg-white/95 p-6 shadow-xl shadow-emerald-950/10">
            <h2 className="text-xl font-black text-[#0b4f4f]">{section.title}</h2>
            <div className="mt-5 grid gap-3">
              {section.items.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#1f7a2e]" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button onClick={onStart} variant="gold">{intro.startButton} <ArrowRight size={18} /></Button>
      </div>
    </div>
  );
}

function OnlineAppointmentSchedulerCTA({ t, introOnly = false, onOpenScheduler }) {
  const sched = t.pages.scheduler;
  const w = sched.wizard;
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [form, setForm] = useState({
    communication: w.triage.concernOptions[1],
    behavior: w.triage.concernOptions[1],
    social: w.triage.concernOptions[1],
    urgency: w.triage.concernOptions[3],
    notes: "",
    service: w.service.serviceOptions[0],
    locationType: w.service.locationOptions[0],
    visitType: w.service.visitOptions[0],
    parentName: "",
    childName: "",
    phone: "",
    email: "",
    dob: "",
    ageGroup: w.family.ageGroups[1],
    zip: "",
    date: "",
    time: "",
    insurance: w.insurance.planOptions[0],
    memberId: "",
    referral: "",
    parentConcerns: "",
  });

  const updateForm = (key, value) => setForm((old) => ({ ...old, [key]: value }));

  const steps = w.steps;
  const availableTimes = w.availableTimes;

  const requiredMissing = () => {
    if (step === 1) return !form.notes;
    if (step === 2) return !form.service || !form.locationType || !form.visitType;
    if (step === 3) return !form.parentName || !form.childName || !form.phone || !form.email || !form.dob || !form.zip;
    if (step === 4) return !form.date || !form.time;
    if (step === 5) return !form.insurance || !form.memberId || !form.referral || !form.parentConcerns;
    return false;
  };

  const selectedDateTime = `${form.date || w.notSelected} ${form.time || ""}`.trim();
  const progress = Math.round((step / steps.length) * 100);

  const nextStep = () => {
    if (requiredMissing()) return;
    setStep((current) => Math.min(6, current + 1));
  };

  const backStep = () => setStep((current) => Math.max(1, current - 1));

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
  };

  if (introOnly) {
    return (
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-[#49b8c8]/20 bg-gradient-to-br from-[#ddf4f4] via-white to-[#fff8df] p-8 text-center shadow-2xl shadow-[#128c8c]/10 md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{sched.introOnly.eyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">{sched.introOnly.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-700">{sched.introOnly.intro}</p>
          <div className="mt-8">
            <Button onClick={onOpenScheduler}>{sched.introOnly.scheduleOnline} <ArrowRight size={18} /></Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f7f7f7] px-4 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="font-black uppercase tracking-[0.25em] text-[#128c8c]">{t.schedulerEyebrow}</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{t.schedulerTitle}</h1>
          <p className="mt-3 text-lg leading-8 text-slate-700">{t.schedulerSubtitle}</p>
        </div>

        {!showWizard && <SchedulerIntroCard t={t} onStart={() => setShowWizard(true)} />}

        {showWizard && <div className="grid items-start gap-8 lg:grid-cols-[1fr_340px]">
          <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
            <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 via-white to-emerald-50 p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-700">{t.guidedWizard}</p>
                  <h3 className="mt-2 text-3xl font-black text-slate-950">{w.stepPrefix} {step}: {steps[step - 1]}</h3>
                </div>
                <div className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm ring-1 ring-slate-100">
                  {progress}% {t.complete}
                </div>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-white shadow-inner">
                <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {steps.map((label, index) => {
                  const number = index + 1;
                  const isActive = step === number;
                  const isComplete = step > number || submitted;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => !submitted && setStep(number)}
                      className={`rounded-2xl border px-3 py-3 text-center transition ${
                        isActive
                          ? "border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                          : isComplete
                          ? "border-emerald-200 bg-emerald-100 text-emerald-950"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      <p className="text-xs font-black">{number}</p>
                      <p className="mt-1 text-xs font-black">{label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="min-h-[430px] p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={submitted ? "submitted" : step}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                >
                  {submitted ? (
                    <div className="rounded-[1.8rem] bg-emerald-50 p-8 text-center ring-1 ring-emerald-100">
                      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-600 text-white">
                        <Check size={34} />
                      </div>
                      <h3 className="mt-5 text-3xl font-black text-emerald-900">{w.submitted.title}</h3>
                      <p className="mt-2 font-bold text-emerald-800">{w.submitted.referencePrefix}{Math.floor(1000000 + Math.random() * 9000000)}</p>
                      <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-700">{w.submitted.liveNote}</p>
                      <div className="mx-auto mt-6 max-w-xl rounded-2xl bg-white p-5 text-left shadow-sm">
                        <p className="font-black text-slate-950">{w.submitted.zoomPreview}</p>
                        <p className="mt-2 break-all rounded-xl bg-sky-50 p-3 text-sm font-bold text-sky-700">{w.submitted.zoomUrl}</p>
                        <p className="mt-2 text-sm text-slate-700">{w.submitted.passcodeLabel} <strong>{w.submitted.passcode}</strong></p>
                        <p className="text-sm text-slate-700">{w.submitted.appointmentLabel} <strong>{selectedDateTime}</strong></p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {step === 1 && (
                        <div>
                          <h4 className="text-2xl font-black text-slate-950">{w.triage.title}</h4>
                          <p className="mt-2 text-slate-600">{w.triage.intro}</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {w.triage.fields.map(([key, label]) => (
                              <label key={key} className="grid gap-2 text-sm font-black text-slate-700">
                                {label} <span className="text-red-500">*</span>
                                <select value={form[key]} onChange={(e) => updateForm(key, e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100">
                                  {w.triage.concernOptions.map((option) => <option key={option}>{option}</option>)}
                                </select>
                              </label>
                            ))}
                          </div>
                          <label className="mt-5 grid gap-2 text-sm font-black text-slate-700">
                            {w.triage.parentNotes} <span className="text-red-500">*</span>
                            <textarea value={form.notes} onChange={(e) => updateForm("notes", e.target.value)} className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.triage.notesPlaceholder} />
                          </label>
                        </div>
                      )}

                      {step === 2 && (
                        <div>
                          <h4 className="text-2xl font-black text-slate-950">{w.service.title}</h4>
                          <p className="mt-2 text-slate-600">{w.service.intro}</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-3">
                            <label className="grid gap-2 text-sm font-black text-slate-700">{w.service.serviceLabel} <span className="text-red-500">*</span><select value={form.service} onChange={(e) => updateForm("service", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold">{w.service.serviceOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                            <label className="grid gap-2 text-sm font-black text-slate-700">{w.service.locationLabel} <span className="text-red-500">*</span><select value={form.locationType} onChange={(e) => updateForm("locationType", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold">{w.service.locationOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                            <label className="grid gap-2 text-sm font-black text-slate-700">{w.service.visitLabel} <span className="text-red-500">*</span><select value={form.visitType} onChange={(e) => updateForm("visitType", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold">{w.service.visitOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                          <h4 className="text-2xl font-black text-slate-950">{w.family.title}</h4>
                          <p className="mt-2 text-slate-600">{w.family.intro}</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <input value={form.parentName} onChange={(e) => updateForm("parentName", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.family.parentName} />
                            <input value={form.email} onChange={(e) => updateForm("email", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.family.email} />
                            <input value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.family.phone} />
                            <input value={form.childName} onChange={(e) => updateForm("childName", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.family.childName} />
                            <label className="grid gap-2 text-sm font-black text-slate-700">{w.family.childBirthdate} <input type="date" value={form.dob} onChange={(e) => updateForm("dob", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" /></label>
                            <select value={form.ageGroup} onChange={(e) => updateForm("ageGroup", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold">{w.family.ageGroups.map((option) => <option key={option}>{option}</option>)}</select>
                            <input value={form.zip} onChange={(e) => updateForm("zip", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.family.zipCode} />
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div>
                          <h4 className="text-2xl font-black text-slate-950">{w.schedule.title}</h4>
                          <p className="mt-2 text-slate-600">{w.schedule.intro}</p>
                          <div className="mt-6 grid items-start gap-5 md:grid-cols-[0.85fr_1.15fr]">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <label className="mb-2 block text-sm font-black text-slate-700">{w.schedule.preferredDate}</label>
                              <input type="date" value={form.date} onChange={(e) => updateForm("date", e.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-bold text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
                              <p className="mt-3 text-xs font-bold text-emerald-700">{w.schedule.slotsAvailable}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                              {availableTimes.map((time) => (
                                <button key={time} type="button" onClick={() => updateForm("time", time)} className={`rounded-2xl border px-4 py-3 font-black transition ${form.time === time ? "border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-500/20" : "border-slate-200 bg-white text-slate-700 hover:border-sky-300"}`}>{time}</button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 5 && (
                        <div>
                          <h4 className="text-2xl font-black text-slate-950">{w.insurance.title}</h4>
                          <p className="mt-2 text-slate-600">{w.insurance.intro}</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <label className="grid gap-2 text-sm font-black text-slate-700">{w.insurance.planLabel} <select value={form.insurance} onChange={(e) => updateForm("insurance", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold">{w.insurance.planOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                            <input value={form.memberId} onChange={(e) => updateForm("memberId", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.insurance.memberId} />
                            <input value={form.referral} onChange={(e) => updateForm("referral", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.insurance.referral} />
                            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700"><input type="checkbox" defaultChecked className="h-5 w-5 accent-sky-500" /> {w.insurance.eligibilityCheck}</label>
                            <textarea value={form.parentConcerns} onChange={(e) => updateForm("parentConcerns", e.target.value)} className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100 md:col-span-2" placeholder={w.insurance.parentConcerns} />
                          </div>
                        </div>
                      )}

                      {step === 6 && (
                        <div>
                          <h4 className="text-2xl font-black text-slate-950">{w.review.title}</h4>
                          <p className="mt-2 text-slate-600">{w.review.intro}</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">{w.review.triageSummary}</p><p className="mt-2 text-sm">{w.review.urgency} <strong>{form.urgency}</strong></p><p className="text-sm">{w.review.communication} {form.communication}</p><p className="text-sm">{w.review.behavior} {form.behavior}</p><p className="text-sm">{w.review.social} {form.social}</p></div>
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">{w.review.appointment}</p><p className="mt-2 text-sm">{form.service}</p><p className="text-sm">{form.locationType} • {form.visitType}</p><p className="text-sm">{selectedDateTime}</p></div>
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">{w.review.familyInformation}</p><p className="mt-2 text-sm">{form.parentName || "—"}</p><p className="text-sm">{form.email || "—"}</p><p className="text-sm">{form.phone || "—"}</p><p className="text-sm">{w.review.childPrefix} {form.childName || "—"}</p></div>
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">{w.review.insurance}</p><p className="mt-2 text-sm">{form.insurance}</p><p className="text-sm">{w.review.memberIdPrefix} {form.memberId || "—"}</p><p className="text-sm">{w.review.eligibilityRequested}</p></div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="border-t border-slate-100 bg-slate-50 px-6 py-5 md:px-8">
              <div className="flex items-center justify-between gap-4">
                <Button variant="secondary" disabled={step === 1 || submitted} onClick={backStep}>{t.back}</Button>
                {submitted ? (
                  <Button onClick={resetForm}>{t.bookAnother}</Button>
                ) : step === 6 ? (
                  <Button onClick={() => setSubmitted(true)}>{t.submitRequest}</Button>
                ) : (
                  <Button disabled={requiredMissing()} onClick={nextStep}>{t.continue} <ArrowRight size={16} /></Button>
                )}
              </div>
              {!submitted && requiredMissing() && step > 2 && (
                <p className="mt-3 text-center text-sm font-bold text-red-600">{t.requiredNotice}</p>
              )}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">{w.sidebar.title}</p>
            <div className="mt-4 rounded-2xl bg-slate-950 p-5 text-white">
              <p className="font-black">{w.sidebar.bookingStatus}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 p-3"><p className="text-xs text-slate-400">{w.sidebar.stepLabel}</p><p className="text-2xl font-black">{step}/6</p></div>
                <div className="rounded-xl bg-white/10 p-3"><p className="text-xs text-slate-400">{w.sidebar.progressLabel}</p><p className="text-2xl font-black">{progress}%</p></div>
              </div>
              <div className="mt-3 rounded-xl bg-white/10 p-3"><p className="text-xs text-slate-400">{w.sidebar.nextAutomation}</p><p className="text-sm font-bold">{w.sidebar.automationValue}</p></div>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-700">
              <p className="flex justify-between gap-4"><span>{w.sidebar.service}</span><strong>{form.service}</strong></p>
              <p className="flex justify-between gap-4"><span>{w.sidebar.chosenTime}</span><strong>{selectedDateTime}</strong></p>
              <p className="flex justify-between gap-4"><span>{w.sidebar.insurance}</span><strong>{form.insurance}</strong></p>
              <p className="flex justify-between gap-4"><span>{w.sidebar.officeEmail}</span><strong>info@edenabatherapy.com</strong></p>
            </div>
          </aside>
        </div>}
      </div>
    </section>
  );
}

/*
BACKEND FILES TO CREATE IN YOUR NEXT.JS PROJECT:

1) /app/api/appointments/route.ts
- Save appointment to Supabase
- Call /api/zoom/create-meeting
- Save Zoom link back to appointment row
- Trigger email/SMS automation

2) /app/api/zoom/create-meeting/route.ts
- Uses Zoom Server-to-Server OAuth credentials
- Creates secure Zoom intake meeting

3) Supabase table: appointments
- parent_name, patient_name, email, phone, dob, insurance, concerns,
  appointment_date, appointment_time, status, zoom_join_url,
  zoom_meeting_id, zoom_password, created_at

4) .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ZOOM_ACCOUNT_ID=
ZOOM_CLIENT_ID=
ZOOM_CLIENT_SECRET=
RESEND_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
*/

export default function EdenABAWebsite() {
  const [darkMode, setDarkMode] = useState(false);
  const [consentUpdates, setConsentUpdates] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [language, setLanguage] = useState("en");
  const t = getTranslation(language);

  const syncPageFromLocation = (event, { scroll = true } = {}) => {
    if (typeof window === "undefined") return;

    const page = resolveActivePage({
      pathname: window.location.pathname,
      hash: window.location.hash,
      eventDetail: event?.detail,
    });

    if (!KNOWN_PAGES.has(page)) return;

    setCurrentPage(page);
    if (scroll) {
      window.scrollTo({ top: 0, behavior: event ? "smooth" : "auto" });
    }
  };

  const goToPage = (page) => {
    if (typeof window !== "undefined") {
      const path = getPagePath(page);
      if (path) {
        window.history.pushState(null, "", path);
      } else if (page === "home") {
        window.history.pushState(null, "", "/");
      } else {
        window.location.hash = page;
      }
    }

    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    syncPageFromLocation(undefined, { scroll: false });
  }, []);

  useEffect(() => {
    const handleNavigate = (event) => syncPageFromLocation(event);

    window.addEventListener("eden:navigate", handleNavigate);
    window.addEventListener("hashchange", handleNavigate);
    window.addEventListener("popstate", handleNavigate);
    return () => {
      window.removeEventListener("eden:navigate", handleNavigate);
      window.removeEventListener("hashchange", handleNavigate);
      window.removeEventListener("popstate", handleNavigate);
    };
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    if (savedLanguage === "en" || savedLanguage === "vi") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      const pageMeta =
        currentPage === "cast-online-screener" && t.pages.castScreener?.meta
          ? t.pages.castScreener.meta
          : currentPage === "ados-2-assessment" && t.pages.ados2Assessment?.meta
            ? t.pages.ados2Assessment.meta
            : currentPage === "ide-evaluation" && t.pages.ideEvaluation?.meta
              ? t.pages.ideEvaluation.meta
              : currentPage === "autism-screener-faqs" && t.pages.autismScreenerFaqs?.meta
                ? t.pages.autismScreenerFaqs.meta
                : currentPage === "parent-guidance" && t.pages.parentGuidance?.meta
                  ? t.pages.parentGuidance.meta
                  : getMeta(language);
      document.title = pageMeta.title;
      const description = pageMeta.description;
      let descriptionMeta = document.querySelector('meta[name="description"]');
      if (!descriptionMeta) {
        descriptionMeta = document.createElement("meta");
        descriptionMeta.setAttribute("name", "description");
        document.head.appendChild(descriptionMeta);
      }
      descriptionMeta.setAttribute("content", description);
    }
  }, [language, currentPage, t]);

  if (currentPage === "what-is-autism") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <WhatIsAutismPage t={t} onStart={() => goToPage("intake")} onAssessment={() => goToPage("autism-assessment")} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "aba-therapy") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <ABATherapyEducationPage t={t} onStart={() => goToPage("intake")} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "locations") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <LocationsPage t={t} onStart={() => goToPage("intake")} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "about-us") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <AboutEdenPage t={t} onStart={() => goToPage("intake")} onFindCare={() => goToPage("locations")} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "intake") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <AdvancedIntakeForm t={t} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "schedule-appointment") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <OnlineAppointmentSchedulerCTA t={t} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "insurance-coverage") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <InsuranceVerificationPage t={t} onSchedule={() => goToPage("schedule-appointment")} onHome={() => goToPage("home")} onStart={() => goToPage("intake")} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "autism-assessment") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <AutismEvaluationPage
          t={t}
          onStart={() => goToPage("intake")}
          onMchat={() => goToPage("m-chat-r-online-screener")}
          onCast={() => goToPage("cast-online-screener")}
          onAdos={() => goToPage("ados-2-assessment")}
        />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "m-chat-r-online-screener") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <MChatROnlineScreenerPage t={t} onStart={() => goToPage("intake")} onCast={() => goToPage("cast-online-screener")} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "cast-online-screener") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <CastOnlineScreenerPage
          t={t}
          onStart={() => goToPage("intake")}
          onMchat={() => goToPage("m-chat-r-online-screener")}
          onScheduleEvaluation={() => goToPage("autism-assessment")}
        />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "ados-2-assessment") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <Ados2AssessmentPageWrapper
          t={t}
          onStart={() => goToPage("intake")}
          onMchat={() => goToPage("m-chat-r-online-screener")}
          onCast={() => goToPage("cast-online-screener")}
          onLocations={() => goToPage("locations")}
          onEvaluationHub={() => goToPage("autism-assessment")}
          onIde={() => goToPage("ide-evaluation")}
        />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "ide-evaluation") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <IdeEvaluationPageWrapper
          t={t}
          onStart={() => goToPage("intake")}
          onMchat={() => goToPage("m-chat-r-online-screener")}
          onCast={() => goToPage("cast-online-screener")}
          onAdos={() => goToPage("ados-2-assessment")}
          onLocations={() => goToPage("locations")}
          onInsurance={() => goToPage("insurance-coverage")}
          onContact={() => goToPage("intake")}
        />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "parent-guidance") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <ParentGuidancePageWrapper
          t={t}
          onMchat={() => goToPage("m-chat-r-online-screener")}
          onCast={() => goToPage("cast-online-screener")}
          onAdos={() => goToPage("ados-2-assessment")}
          onIde={() => goToPage("ide-evaluation")}
          onSchedule={() => goToPage("schedule-appointment")}
          onAssessment={() => goToPage("autism-assessment")}
          onInsurance={() => goToPage("insurance-coverage")}
          onAba={() => goToPage("aba-therapy")}
          onStart={() => goToPage("intake")}
        />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "autism-screener-faqs") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <AutismScreenerFaqsPageWrapper
          t={t}
          onStart={() => goToPage("intake")}
          onLocations={() => goToPage("locations")}
          onMchat={() => goToPage("m-chat-r-online-screener")}
          onCast={() => goToPage("cast-online-screener")}
          onAdos={() => goToPage("ados-2-assessment")}
          onIde={() => goToPage("ide-evaluation")}
          onInsurance={() => goToPage("insurance-coverage")}
          onAba={() => goToPage("aba-therapy")}
          onAutism={() => goToPage("what-is-autism")}
        />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  return (
    <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
      <button
        type="button"
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
      >
        {darkMode ? t.lightMode : t.darkMode}
      </button>
      <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
      <Hero onStart={() => goToPage("intake")} onFindCare={() => goToPage("locations")} language={language} />
      <AutismAwarenessCounter t={t} />
      <ServiceExplorer t={t} />
      <InsurancePaymentSection t={t} onStart={() => goToPage("insurance-coverage")} />
      <EligibilityChecker
        t={t}
        onStart={() => goToPage("intake")}
        onAssessment={() => goToPage("autism-assessment")}
        onCast={() => goToPage("cast-online-screener")}
        onMchat={() => goToPage("m-chat-r-online-screener")}
        onSchedule={() => goToPage("schedule-appointment")}
      />
      <ParentResourcesSection t={t} onStart={() => goToPage("intake")} />
      <Careers t={t} />
      <OnlineAppointmentSchedulerCTA t={t} />
      <ClientReviewMarquee t={t} onStart={() => goToPage("intake")} onVerifyInsurance={() => goToPage("insurance-coverage")} />
      <section className="bg-gradient-to-br from-[#128c8c] via-[#1f7a2e] to-[#0b4f4f] px-4 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="pt-4 text-white lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black backdrop-blur-md">
              <HeartHandshake size={18} className="text-lime-300" /> {t.intakeBadge}
            </div>

            <h2 className="mt-7 max-w-xl text-5xl font-black leading-tight tracking-tight md:text-6xl">
              {t.intakeTitle}
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-teal-50/95">
              {t.intakeSubtitle}
            </p>

            <div className="mt-8 grid gap-4">
              {t.benefits.map((item) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg shadow-emerald-950/10 backdrop-blur-md">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime-400 text-emerald-950">
                    <Check size={20} />
                  </div>
                  <p className="text-base font-black text-white">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.8rem] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-lime-300">{t.whatNext}</p>
              <p className="mt-3 leading-7 text-teal-50">
                {t.whatNextText}
              </p>
            </div>
          </div>

          <div className="rounded-[2.25rem] border border-white/70 bg-white p-6 shadow-2xl shadow-emerald-950/25 lg:p-8">
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-700">{t.brandName}</p>
                <h3 className="mt-2 text-3xl font-black text-emerald-950">{t.intakeFormTitle}</h3>
              </div>
              <div className="hidden rounded-2xl bg-teal-50 p-3 text-teal-700 sm:block">
                <ShieldCheck size={30} />
              </div>
            </div>

            <form className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-black text-slate-700">{t.parentName}</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100" placeholder={t.homeIntakePlaceholders.parentName} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.childFirstName}</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100" placeholder={t.homeIntakePlaceholders.childFirstName} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.childLastName}</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100" placeholder={t.homeIntakePlaceholders.childLastName} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.childBirthdate}</label>
                <input type="date" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.phoneNumber}</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100" placeholder={t.homeIntakePlaceholders.phone} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.emailAddress}</label>
                <input type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100" placeholder={t.homeIntakePlaceholders.email} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.preferredContact}</label>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100">
                  {t.homeIntakePlaceholders.preferredContactOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.diagnosisQuestion}</label>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100">
                  {t.homeIntakePlaceholders.diagnosisOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.state}</label>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100">
                  {t.homeIntakePlaceholders.stateOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-black text-slate-700">{t.message}</label>
                <textarea className="min-h-36 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100" placeholder={t.homeIntakePlaceholders.message} />
              </div>

              <div className="md:col-span-2 rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-5 shadow-lg shadow-teal-900/5">
                <div className="grid gap-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal-700 text-white shadow-lg">
                      <CalendarDays size={21} />
                    </div>
                    <div>
                      <p className="text-base font-black text-emerald-950">{t.appointmentIntake}</p>
                      <p className="mt-1 text-sm font-bold leading-6 text-slate-700">
                        {t.appointmentIntakeText}
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-teal-100" />

                  <div className="flex items-start gap-4">
                    <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal-700 text-white shadow-lg">
                      <LockKeyhole size={21} />
                    </div>
                    <div>
                      <p className="text-base font-black text-emerald-950">{t.secureConfidential}</p>
                      <p className="mt-1 text-sm font-bold leading-6 text-slate-700">
                        {t.secureConfidentialText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4 text-sm leading-6 text-slate-700">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consentUpdates}
                    onChange={(e) => setConsentUpdates(e.target.checked)}
                    className="mt-1 h-5 w-5 accent-teal-700"
                  />
                  <span>{t.consentUpdates}</span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consentTerms}
                    onChange={(e) => setConsentTerms(e.target.checked)}
                    className="mt-1 h-5 w-5 accent-teal-700"
                  />
                  <span>{t.consentTerms}</span>
                </label>
              </div>

              <button
                type="button"
                onClick={() => setRecaptchaChecked((value) => !value)}
                className={`md:col-span-2 rounded-xl border p-4 text-left transition ${
                  recaptchaChecked
                    ? "border-teal-500 bg-teal-50 ring-4 ring-teal-100"
                    : "border-slate-200 bg-slate-50 hover:border-teal-300"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-10 w-10 place-items-center rounded border-2 bg-white ${recaptchaChecked ? "border-teal-600" : "border-slate-300"}`}>
                      {recaptchaChecked && <Check size={20} className="text-teal-700" />}
                    </div>
                    <span className="text-sm font-black text-slate-700">{t.recaptcha}</span>
                  </div>
                  <div className="h-9 w-9 rounded bg-gradient-to-br from-sky-400 to-blue-600" />
                </div>
              </button>

              <div className="md:col-span-2">
                <button className="w-full rounded-xl bg-[#f7c72f] px-6 py-4 text-lg font-black text-[#0b4f4f] shadow-lg transition hover:bg-[#ff8a1f] hover:text-white">
                  {t.submitRequest}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <LiveChatAssistant t={t} />
      <NewsletterBanner t={t} />
      <Footer t={t} />
    </main>
  );
}
