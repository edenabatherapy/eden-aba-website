"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
  HeartHandshake,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import GettingStartedPageSchema from "@/components/getting-started/GettingStartedPageSchema";
import ResourceCard from "@/components/getting-started/ResourceCard";
import SearchFilters from "@/components/getting-started/SearchFilters";
import TimelineStep from "@/components/getting-started/TimelineStep";
import FAQAccordion from "@/components/getting-started/FAQAccordion";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import {
  CORE_TOPIC_CARDS,
  DOCUMENTS_CHECKLIST,
  FEATURED_RESOURCE_IDS,
  GETTING_STARTED_DISCLAIMER,
  GETTING_STARTED_RESOURCES,
  ONBOARDING_TIMELINE,
  RESOURCE_CATEGORIES,
  GETTING_STARTED_FAQ,
  type GettingStartedResourceCategory,
} from "@/lib/getting-started/getting-started-data";
import { searchGettingStartedResources } from "@/lib/getting-started/resource-search";
import { getButtonClasses } from "@/lib/button-styles";

const CORE_ICONS = [
  BookOpen,
  Users,
  ShieldCheck,
  FileText,
  Stethoscope,
  GraduationCap,
  HeartHandshake,
  Sparkles,
] as const;

const FILTER_CATEGORIES_EN = ["All", ...RESOURCE_CATEGORIES] as const;

const GETTING_STARTED_PAGE_UI = {
  heroBadge: "Family Resource Hub",
  heroTitle: "Getting Started with Eden",
  heroSubtitle:
    "Everything families need to understand ABA therapy, Medicaid, insurance, evaluations, eligibility, and next steps with Eden ABA Therapy.",
  startIntake: "Start Intake",
  checkDocuments: "Check Required Documents",
  exploreResources: "Explore Resources",
  coreTopicsTitle: "Start with the essentials",
  coreTopicsIntro:
    "Explore the topics families ask about most when beginning ABA therapy with Eden in Northern Virginia.",
  learnMore: "Learn more",
  timelineTitle: "Your onboarding timeline",
  timelineIntro: "A clear path from first contact through therapy start and ongoing family partnership.",
  documentsTitle: "Documents families often prepare",
  documentsIntro:
    "Having these items ready can help Eden's intake and insurance teams move more efficiently. Requirements may vary by plan and child.",
  resourcesTitle: "Deep-search resource library",
  resourcesIntro:
    "Trusted educational links on ABA therapy, Medicaid, diagnosis, credentials, state programs, and next steps. Each resource appears once—no duplicates.",
  featuredResources: "Featured resources",
  noResultsTitle: "No resources match your search",
  noResultsText: "Try a different keyword or reset the category filter to explore the full library.",
  clearFilters: "Clear filters",
  faqTitle: "Frequently asked questions",
  faqIntro:
    "Clear answers for families beginning ABA therapy, insurance review, and clinical onboarding with Eden.",
  ctaTitle: "Ready to take the next step?",
  ctaText:
    "Eden ABA Therapy is here to help Virginia families navigate intake, benefits questions, and the path toward compassionate ABA services.",
  insuranceCta: "Insurance & financial assistance",
  filterAll: "All",
};

function cardHref(card: (typeof CORE_TOPIC_CARDS)[number]) {
  if (card.href) return card.href;
  if (card.anchor === "resources" && "filter" in card && card.filter) {
    return `/getting-started#resources?category=${encodeURIComponent(card.filter)}`;
  }
  if (card.anchor) return `/getting-started#${card.anchor}`;
  return "/getting-started";
}

export default function GettingStartedPage() {
  const reduceMotion = useReducedMotion();
  const page = useLocalizedContent("GETTING_STARTED_PAGE", {
    ui: GETTING_STARTED_PAGE_UI,
    coreTopicCards: CORE_TOPIC_CARDS,
    onboardingTimeline: ONBOARDING_TIMELINE,
    documentsChecklist: DOCUMENTS_CHECKLIST,
    faq: GETTING_STARTED_FAQ,
    disclaimer: GETTING_STARTED_DISCLAIMER,
  });
  const ui = page.ui;
  const coreTopicCards = page.coreTopicCards;
  const onboardingTimeline = page.onboardingTimeline;
  const documentsChecklist = page.documentsChecklist;
  const faq = page.faq;
  const disclaimer = page.disclaimer;
  const categoryLabels = useLocalizedContent(
    "GETTING_STARTED_RESOURCE_CATEGORY_LABELS",
    Object.fromEntries(RESOURCE_CATEGORIES.map((category) => [category, category])),
  );
  const filterCategories = FILTER_CATEGORIES_EN;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GettingStartedResourceCategory | "All">("All");

  const filteredResources = useMemo(
    () => searchGettingStartedResources(GETTING_STARTED_RESOURCES, query, category),
    [query, category],
  );

  const filteredFeatured = useMemo(
    () =>
      searchGettingStartedResources(
        GETTING_STARTED_RESOURCES.filter((resource) => FEATURED_RESOURCE_IDS.has(resource.id)),
        query,
        category,
      ),
    [query, category],
  );

  const filteredStandardResources = useMemo(
    () => filteredResources.filter((resource) => !FEATURED_RESOURCE_IDS.has(resource.id)),
    [filteredResources],
  );

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-48px" },
          transition: { duration: 0.5, delay },
        };

  return (
    <AboutPremiumLayout schema={<GettingStartedPageSchema />}>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e8f8f2] via-white to-[#fff8df] px-4 py-16 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-100/50 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.p {...reveal(0)} className="text-xs font-black uppercase tracking-[0.16em] text-emerald-800">
            {ui.heroBadge}
          </motion.p>
          <motion.h1
            {...reveal(0.06)}
            className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            {ui.heroTitle}
          </motion.h1>
          <motion.p {...reveal(0.12)} className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {ui.heroSubtitle}
          </motion.p>
          <motion.div
            {...reveal(0.18)}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/intake" className={getButtonClasses("primarySite")}>
              {ui.startIntake}
              <ArrowRight size={18} aria-hidden />
            </Link>
            <a href="#documents-needed" className={getButtonClasses("secondarySite")}>
              {ui.checkDocuments}
            </a>
            <a href="#resources" className={getButtonClasses("secondarySite")}>
              {ui.exploreResources}
            </a>
          </motion.div>
        </div>
      </section>

      <div className="eden-section eden-section--mint mx-auto max-w-6xl space-y-20 px-4 py-16 pb-24 lg:px-8 lg:py-20">
        <motion.section {...reveal()} aria-labelledby="core-topics-heading">
          <h2 id="core-topics-heading" className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {ui.coreTopicsTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
            {ui.coreTopicsIntro}
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {coreTopicCards.map((card, index) => {
              const Icon = CORE_ICONS[index] ?? BookOpen;
              return (
                <motion.li
                  key={card.id}
                  {...reveal(index * 0.04)}
                  className="h-full"
                >
                  <Link
                    href={cardHref(card)}
                    className="group flex h-full flex-col rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:scale-105">
                      <Icon size={22} aria-hidden />
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold text-slate-900">{card.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{card.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-emerald-800">
                      {ui.learnMore}
                      <ArrowRight size={16} aria-hidden />
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </motion.section>

        <motion.section
          id="timeline"
          {...reveal()}
          className="scroll-mt-28 rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/40 p-6 shadow-sm sm:p-10"
          aria-labelledby="timeline-heading"
        >
          <h2 id="timeline-heading" className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {ui.timelineTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
            {ui.timelineIntro}
          </p>
          <ol className="relative mt-8 max-w-3xl">
            {onboardingTimeline.map((step, index) => (
              <TimelineStep
                key={step.step}
                step={step.step}
                title={step.title}
                description={step.description}
                isLast={index === ONBOARDING_TIMELINE.length - 1}
                index={index}
              />
            ))}
          </ol>
        </motion.section>

        <motion.section
          id="documents-needed"
          {...reveal()}
          className="scroll-mt-28 rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm sm:p-10"
          aria-labelledby="documents-heading"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <ClipboardList size={22} aria-hidden />
            </span>
            <h2 id="documents-heading" className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              {ui.documentsTitle}
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            {ui.documentsIntro}
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {documentsChecklist.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-emerald-50 bg-emerald-50/40 px-4 py-3 text-sm font-semibold leading-7 text-slate-700"
              >
                <FileText className="mt-1 shrink-0 text-emerald-700" size={18} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          id="resources"
          {...reveal()}
          className="scroll-mt-28"
          aria-labelledby="resources-heading"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <Search size={22} aria-hidden />
            </span>
            <div>
              <h2 id="resources-heading" className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                {ui.resourcesTitle}
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
                {ui.resourcesIntro}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <SearchFilters
              query={query}
              category={category}
              categories={filterCategories}
              categoryLabels={categoryLabels}
              allLabel={ui.filterAll}
              resultCount={filteredResources.length}
              onQueryChange={setQuery}
              onCategoryChange={setCategory}
            />
          </div>

          {filteredFeatured.length > 0 ? (
            <div className="mt-10">
              <h3 className="text-xl font-extrabold text-slate-900">{ui.featuredResources}</h3>
              <ul className="mt-5 grid gap-5 lg:grid-cols-2">
                {filteredFeatured.map((resource) => (
                  <li key={resource.id}>
                    <ResourceCard resource={resource} featured />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-10">
            {filteredResources.length > 0 ? (
              <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredStandardResources.map((resource) => (
                  <li key={resource.id}>
                    <ResourceCard resource={resource} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 px-6 py-12 text-center">
                <p className="text-lg font-extrabold text-slate-900">{ui.noResultsTitle}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {ui.noResultsText}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                  }}
                  className={`mt-5 ${getButtonClasses("secondarySite")}`}
                >
                  {ui.clearFilters}
                </button>
              </div>
            )}
          </div>

          <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/80 px-5 py-4 text-sm leading-7 text-amber-950">
            {disclaimer}
          </p>
        </motion.section>

        <motion.section
          id="faq"
          {...reveal()}
          className="scroll-mt-28 rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm sm:p-10"
          aria-labelledby="faq-heading"
        >
          <h2 id="faq-heading" className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {ui.faqTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
            {ui.faqIntro}
          </p>
          <div className="mt-8">
            <FAQAccordion items={faq} />
          </div>
        </motion.section>

        <motion.section
          {...reveal()}
          className="rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 p-8 text-white shadow-lg sm:p-10"
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl">{ui.ctaTitle}</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-50">
            {ui.ctaText}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/intake"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-emerald-900"
            >
              {ui.startIntake}
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              href="/insurance-coverage"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-extrabold text-white"
            >
              {ui.insuranceCta}
            </Link>
          </div>
        </motion.section>
      </div>
    </AboutPremiumLayout>
  );
}
