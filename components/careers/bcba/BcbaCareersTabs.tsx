"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ClipboardList,
  HelpCircle,
  LayoutGrid,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import FAQAccordion from "@/components/careers/hub/FAQAccordion";
import {
  BCBA_FAQ_ITEMS,
  BCBA_GROWTH_LADDER_DETAILED,
  BCBA_INTERVIEW_TIPS,
  BCBA_RESPONSIBILITIES_DETAILED,
  BCBA_SKILL_CATEGORIES,
  BCBA_SUPERVISION_MODEL,
  BCBA_TAB_OVERVIEW,
} from "@/lib/careers/bcba-careers-data";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "responsibilities", label: "Responsibilities", icon: ClipboardList },
  { id: "skills", label: "Clinical Skills", icon: Sparkles },
  { id: "supervision", label: "Supervision Model", icon: Users },
  { id: "growth", label: "Growth Path", icon: TrendingUp },
  { id: "interview", label: "Interview Tips", icon: MessageCircle },
  { id: "faq", label: "FAQ", icon: HelpCircle },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function BcbaCareersTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const reduceMotion = useReducedMotion();
  const isMobileAccordion = useMobileAccordion();

  const handleKeyDown = useCallback((event: React.KeyboardEvent, index: number) => {
    const last = TABS.length - 1;
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next !== index) {
      event.preventDefault();
      setActiveTab(TABS[next].id);
      document.getElementById(`bcba-tab-${TABS[next].id}`)?.focus();
    }
  }, []);

  if (isMobileAccordion) {
    return (
      <section aria-labelledby="bcba-tabs-heading">
        <h2 id="bcba-tabs-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Explore the BCBA role
        </h2>
        <p className="mt-3 text-base leading-8 text-slate-600">
          Clinical responsibilities, supervision model, growth paths, interview guidance, and FAQs.
        </p>
        <div className="mt-8 space-y-3">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const open = activeTab === tab.id;
            return (
              <div key={tab.id} className="overflow-hidden rounded-[1.25rem] border border-teal-100 bg-white shadow-sm">
                <button
                  type="button"
                  id={`bcba-tab-${tab.id}`}
                  aria-expanded={open}
                  aria-controls={`bcba-panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex w-full items-center gap-3 px-4 py-4 text-left"
                >
                  <Icon size={18} className="shrink-0 text-teal-700" aria-hidden="true" />
                  <span className="flex-1 text-sm font-bold text-slate-900">{tab.label}</span>
                </button>
                {open && (
                  <div id={`bcba-panel-${tab.id}`} className="border-t border-teal-50 px-4 pb-5 pt-2">
                    <TabPanelContent tabId={tab.id} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="bcba-tabs-heading">
      <h2 id="bcba-tabs-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
        Explore the BCBA role
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
        Clinical responsibilities, supervision model, growth paths, interview guidance, and FAQs in one place.
      </p>

      <div
        role="tablist"
        aria-label="BCBA role details"
        className="mt-8 flex flex-wrap gap-2 border-b border-teal-100 pb-1"
      >
        {TABS.map((tab, index) => {
          const selected = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`bcba-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`bcba-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`inline-flex items-center gap-2 rounded-t-xl px-4 py-2.5 text-sm font-bold transition ${
                selected
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-transparent text-slate-600 hover:bg-teal-50 hover:text-teal-900"
              }`}
            >
              <Icon size={16} aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 min-h-[300px] overflow-hidden rounded-[1.5rem] border border-teal-100 bg-white p-6 shadow-sm sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role="tabpanel"
            id={`bcba-panel-${activeTab}`}
            aria-labelledby={`bcba-tab-${activeTab}`}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE_OUT }}
          >
            <TabPanelContent tabId={activeTab} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function TabPanelContent({ tabId }: { tabId: TabId }) {
  switch (tabId) {
    case "overview":
      return (
        <>
          <p className="text-base leading-8 text-slate-600">{BCBA_TAB_OVERVIEW.summary}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {BCBA_TAB_OVERVIEW.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-2 rounded-xl bg-teal-50/80 px-4 py-3 text-sm font-semibold leading-6 text-slate-700"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </>
      );
    case "responsibilities":
      return (
        <ul className="space-y-3">
          {BCBA_RESPONSIBILITIES_DETAILED.map((item, i) => (
            <li key={item.title} className="rounded-xl border border-teal-100 px-4 py-3">
              <p className="text-sm font-extrabold text-slate-900">
                {i + 1}. {item.title}
              </p>
              <p className="mt-1 text-sm leading-7 text-slate-600">{item.description}</p>
            </li>
          ))}
        </ul>
      );
    case "skills":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {BCBA_SKILL_CATEGORIES.map((cat) => (
            <div key={cat.title} className="rounded-xl border border-teal-100 bg-teal-50/30 p-4">
              <h3 className="text-sm font-extrabold text-slate-900">{cat.title}</h3>
              <ul className="mt-2 space-y-1">
                {cat.skills.map((s) => (
                  <li key={s} className="text-sm text-slate-600">
                    • {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "supervision":
      return (
        <>
          <p className="text-base leading-8 text-slate-600">{BCBA_SUPERVISION_MODEL.summary}</p>
          <ul className="mt-4 space-y-2">
            {BCBA_SUPERVISION_MODEL.points.map((point) => (
              <li key={point} className="flex gap-2 text-sm leading-7 text-slate-600">
                <span className="font-black text-teal-700" aria-hidden="true">
                  •
                </span>
                {point}
              </li>
            ))}
          </ul>
        </>
      );
    case "growth":
      return (
        <ol className="space-y-3">
          {BCBA_GROWTH_LADDER_DETAILED.map((step) => (
            <li key={step.title} className="rounded-xl border border-teal-100 px-4 py-3">
              <p className="font-extrabold text-slate-900">{step.title}</p>
              <p className="mt-1 text-sm text-slate-600">{step.description}</p>
            </li>
          ))}
        </ol>
      );
    case "interview":
      return (
        <ul className="space-y-3">
          {BCBA_INTERVIEW_TIPS.map((tip) => (
            <li key={tip} className="flex gap-3 rounded-xl border border-teal-100 px-4 py-3 text-sm leading-7 text-slate-600">
              <span className="font-black text-teal-700" aria-hidden="true">
                •
              </span>
              {tip}
            </li>
          ))}
        </ul>
      );
    case "faq":
      return <FAQAccordion title="" items={BCBA_FAQ_ITEMS} />;
    default:
      return null;
  }
}

function useMobileAccordion() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}
