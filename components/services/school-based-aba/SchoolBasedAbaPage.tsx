"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  HeartHandshake,
  MessageCircle,
  School,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import AnimatedStatCounter from "@/components/careers/hub/AnimatedStatCounter";
import FAQAccordion from "@/components/getting-started/FAQAccordion";
import SchoolBasedAbaPageSchema from "@/components/services/school-based-aba/SchoolBasedAbaPageSchema";
import {
  DATA_TRACKING,
  FAMILY_PARTNERSHIP,
  IEP_TABS,
  MTSS_TIERS,
  SCHOOL_ABA_FAQ,
  SCHOOL_ABA_TIMELINE,
  SCHOOL_CTA,
  SCHOOL_HERO,
  SCHOOL_RESOURCE_CATEGORIES,
  SCHOOL_RESOURCES,
  SCHOOL_TEAM,
  SERVICES_IN_SCHOOL,
  SUCCESS_METRICS,
  WHAT_IS_SCHOOL_ABA,
  WHO_BENEFITS,
  type SchoolResourceCategory,
} from "@/lib/services/school-based-aba-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EDEN_CARD } from "@/lib/eden-design-system";
import { SITE_IMAGES } from "@/lib/site-images";

const WHAT_ICONS = [School, Target, Users, ClipboardList, Sparkles, BarChart3] as const;
const SERVICE_ICONS = [ShieldCheck, MessageCircle, Users, BookOpen, ArrowRight, CheckCircle2] as const;

const cardClass = EDEN_CARD;

function FloatingEduIcon({ icon: Icon, className, delay = 0 }: { icon: typeof BookOpen; className: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <Icon className={className} aria-hidden />;
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden
    >
      <Icon size={28} />
    </motion.div>
  );
}

export default function SchoolBasedAbaPage() {
  const reduceMotion = useReducedMotion();
  const img = SITE_IMAGES.schoolBasedAba;
  const [expandedBenefit, setExpandedBenefit] = useState<string | null>(WHO_BENEFITS.items[0]?.id ?? null);
  const [iepTab, setIepTab] = useState<(typeof IEP_TABS)[number]["id"]>(IEP_TABS[0].id);
  const [resourceQuery, setResourceQuery] = useState("");
  const [resourceCategory, setResourceCategory] = useState<SchoolResourceCategory | "All">("All");

  const activeIep = IEP_TABS.find((tab) => tab.id === iepTab) ?? IEP_TABS[0];

  const filteredResources = useMemo(() => {
    const q = resourceQuery.trim().toLowerCase();
    return SCHOOL_RESOURCES.filter((resource) => {
      const matchesCategory = resourceCategory === "All" || resource.category === resourceCategory;
      const matchesQuery =
        !q ||
        resource.title.toLowerCase().includes(q) ||
        resource.summary.toLowerCase().includes(q) ||
        resource.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [resourceQuery, resourceCategory]);

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-48px" },
          transition: { duration: 0.55, delay },
        };

  const heroMotion = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.65 } };

  return (
    <AboutPremiumLayout schema={<SchoolBasedAbaPageSchema />}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#0E6B4F] to-[#0d9488] px-4 py-16 text-white lg:px-8 lg:py-24">
        <FloatingEduIcon icon={BookOpen} className="pointer-events-none absolute left-[6%] top-[14%] text-amber-200/50" />
        <FloatingEduIcon icon={GraduationCap} className="pointer-events-none absolute right-[8%] top-[18%] text-white/30" delay={0.8} />
        <FloatingEduIcon icon={School} className="pointer-events-none absolute bottom-[20%] left-[12%] text-emerald-200/40" delay={1.4} />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div {...heroMotion}>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm font-bold text-emerald-200">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li aria-hidden="true" className="text-white/40">›</li>
                <li><span className="text-white/80">Services</span></li>
                <li aria-hidden="true" className="text-white/40">›</li>
                <li className="text-white">School-Based ABA</li>
              </ol>
            </nav>
            <h1 className="text-3xl font-black leading-tight md:text-5xl lg:text-6xl">{SCHOOL_HERO.title}</h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/90">{SCHOOL_HERO.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/schedule-appointment" className={`${getButtonClasses("primarySite")} transition hover:scale-[1.02]`}>
                Request School Consultation <ArrowRight size={18} aria-hidden />
              </Link>
              <Link href="/intake" className={`${getButtonClasses("secondaryOnDark")} transition hover:scale-[1.02]`}>
                Start Services
              </Link>
              <Link href="/about/contact-us" className={getButtonClasses("secondaryOnDark")}>
                Contact Eden
              </Link>
            </div>
          </motion.div>
          <motion.div {...heroMotion} transition={{ duration: 0.65, delay: 0.1 }}>
            <Image src={img.hero} alt={SCHOOL_HERO.imageAlt} width={800} height={640} priority className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-2xl ring-4 ring-white/20" />
          </motion.div>
        </div>
      </section>

      {/* What Is School-Based ABA */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{WHAT_IS_SCHOOL_ABA.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{WHAT_IS_SCHOOL_ABA.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_IS_SCHOOL_ABA.cards.map((card, i) => {
              const Icon = WHAT_ICONS[i] ?? Sparkles;
              return (
                <motion.article key={card.title} {...reveal(i * 0.05)} whileHover={reduceMotion ? undefined : { y: -6 }} className={cardClass}>
                  <div className="inline-flex rounded-2xl bg-blue-50 p-3 text-blue-700"><Icon size={24} aria-hidden /></div>
                  <h3 className="mt-4 text-lg font-black text-[#0F172A]">{card.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{WHO_BENEFITS.title}</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{WHO_BENEFITS.intro}</p>
          </motion.div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {WHO_BENEFITS.items.map((item, i) => {
              const isOpen = expandedBenefit === item.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  {...reveal(i * 0.03)}
                  onClick={() => setExpandedBenefit(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className={`text-left ${cardClass} ${isOpen ? "border-emerald-300 bg-emerald-50/50 ring-2 ring-emerald-200" : ""}`}
                >
                  <h3 className="text-base font-black text-[#0F172A]">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-slate-600">{isOpen ? item.detail : item.summary}</p>
                  <span className="mt-3 inline-block text-xs font-bold uppercase tracking-wide text-emerald-700">
                    {isOpen ? "Show less" : "Learn more"}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gradient-to-br from-slate-900 via-[#0E6B4F] to-teal-800 px-4 py-16 text-white lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black md:text-4xl">{SCHOOL_ABA_TIMELINE.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-white/85">{SCHOOL_ABA_TIMELINE.intro}</p>
          </motion.div>
          <ol className="relative mt-14 space-y-0 border-l-2 border-white/20 pl-8 md:pl-0 md:border-l-0">
            {SCHOOL_ABA_TIMELINE.steps.map((step, i) => (
              <motion.li
                key={step.title}
                {...reveal(i * 0.04)}
                className="relative pb-10 md:grid md:grid-cols-[80px_1fr] md:gap-6 md:pb-8"
              >
                <div className="absolute -left-[41px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-amber-300 text-sm font-black text-slate-900 shadow-lg md:relative md:left-0">
                  {i + 1}
                </div>
                <div className="md:col-start-2">
                  <h3 className="text-lg font-black">{step.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-white/80">{step.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services in school */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{SERVICES_IN_SCHOOL.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{SERVICES_IN_SCHOOL.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_IN_SCHOOL.categories.map((cat, i) => {
              const Icon = SERVICE_ICONS[i] ?? Target;
              return (
                <motion.article key={cat.title} {...reveal(i * 0.06)} className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50/80 via-white to-emerald-50/50 p-8 shadow-lg">
                  <div className="inline-flex rounded-2xl bg-white p-3 text-blue-700 shadow-sm"><Icon size={26} aria-hidden /></div>
                  <h3 className="mt-5 text-xl font-black text-[#0F172A]">{cat.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={16} aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* IEP Tabs */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.h2 {...reveal()} className="text-center text-3xl font-black text-[#0F172A] md:text-4xl">
            IEP Collaboration
          </motion.h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="IEP collaboration topics">
            {IEP_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={iepTab === tab.id}
                aria-controls={`iep-panel-${tab.id}`}
                id={`iep-tab-${tab.id}`}
                onClick={() => setIepTab(tab.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-black transition ${
                  iepTab === tab.id ? "bg-[#0E6B4F] text-white shadow-md" : "bg-white text-slate-700 hover:bg-emerald-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIep.id}
              id={`iep-panel-${activeIep.id}`}
              role="tabpanel"
              aria-labelledby={`iep-tab-${activeIep.id}`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-8 rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-xl"
            >
              <h3 className="text-2xl font-black text-[#0F172A]">{activeIep.title}</h3>
              <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{activeIep.body}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {activeIep.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-900">{bullet}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* MTSS */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{MTSS_TIERS.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{MTSS_TIERS.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {MTSS_TIERS.tiers.map((tier, i) => (
              <motion.article
                key={tier.tier}
                {...reveal(i * 0.08)}
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                className={`rounded-[2rem] p-8 text-white shadow-xl ${
                  i === 0 ? "bg-gradient-to-br from-teal-600 to-emerald-600" : i === 1 ? "bg-gradient-to-br from-blue-600 to-teal-700" : "bg-gradient-to-br from-slate-800 to-emerald-800"
                }`}
              >
                <span className="text-sm font-black uppercase tracking-widest text-amber-200">{tier.tier}</span>
                <h3 className="mt-3 text-2xl font-black">{tier.title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-white/90">{tier.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Team collaboration */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...reveal()}>
              <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{SCHOOL_TEAM.title}</h2>
              <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{SCHOOL_TEAM.intro}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {SCHOOL_TEAM.roles.map((member) => (
                  <div key={member.role} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-sm font-black text-emerald-800">{member.role}</p>
                    <p className="mt-1 text-xs font-semibold leading-6 text-slate-600">{member.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...reveal(0.1)} className="relative">
              <Image src={img.collaboration} alt="School team collaborating to support a student" width={600} height={480} className="rounded-[2rem] object-cover shadow-xl" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
                <div className="grid h-48 w-48 place-items-center rounded-full border-4 border-dashed border-emerald-400/50 bg-white/80">
                  <Users className="text-emerald-700" size={48} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data tracking */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50/40 px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{DATA_TRACKING.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{DATA_TRACKING.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {DATA_TRACKING.examples.map((example, i) => (
              <motion.article key={example.title} {...reveal(i * 0.06)} className={cardClass}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-[#0F172A]">{example.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{example.text}</p>
                  </div>
                  <BarChart3 className="shrink-0 text-emerald-600" size={28} aria-hidden />
                </div>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    initial={reduceMotion ? { width: `${example.value}%` } : { width: 0 }}
                    whileInView={{ width: `${example.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </div>
                <p className="mt-2 text-xs font-bold text-slate-500">Sample progress indicator — illustrative only</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Family partnership */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl grid items-center gap-10 lg:grid-cols-2">
          <motion.div {...reveal()}>
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{FAMILY_PARTNERSHIP.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{FAMILY_PARTNERSHIP.intro}</p>
            <ul className="mt-8 space-y-4">
              {FAMILY_PARTNERSHIP.points.map((point) => (
                <li key={point.title} className="flex gap-3">
                  <HeartHandshake className="mt-1 shrink-0 text-emerald-600" size={22} aria-hidden />
                  <div>
                    <p className="font-black text-[#0F172A]">{point.title}</p>
                    <p className="mt-1 text-sm font-semibold leading-7 text-slate-600">{point.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/aba-therapy/parent-training" className={`mt-8 inline-flex ${getButtonClasses("primarySite")}`}>
              Explore Parent Training <ArrowRight size={18} aria-hidden />
            </Link>
          </motion.div>
          <motion.div {...reveal(0.1)}>
            <Image src={img.classroom} alt="Student and educator in a supportive classroom" width={600} height={480} className="rounded-[2rem] object-cover shadow-xl" />
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.h2 {...reveal()} className="text-center text-3xl font-black text-[#0F172A] md:text-4xl">
            Frequently Asked Questions
          </motion.h2>
          <motion.div {...reveal(0.08)} className="mt-10">
            <FAQAccordion items={SCHOOL_ABA_FAQ} />
          </motion.div>
        </div>
      </section>

      {/* Resource center */}
      <section id="school-resources" className="scroll-mt-28 eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">Resource Center</h2>
            <p className="mt-4 text-base font-semibold text-slate-600">Search school-related guides and Eden resources.</p>
          </motion.div>
          <motion.div {...reveal(0.06)} className="mx-auto mt-8 max-w-2xl">
            <label className="sr-only" htmlFor="school-resource-search">Search resources</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden />
              <input
                id="school-resource-search"
                type="search"
                value={resourceQuery}
                onChange={(e) => setResourceQuery(e.target.value)}
                placeholder="Search by topic, skill, or keyword..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-semibold shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {(["All", ...SCHOOL_RESOURCE_CATEGORIES] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setResourceCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-black transition ${
                    resourceCategory === cat ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-emerald-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource, i) => (
              <motion.div key={resource.id} {...reveal(i * 0.03)}>
                <Link href={resource.href} className={`block h-full ${cardClass} hover:border-emerald-200`}>
                  <span className="text-xs font-black uppercase tracking-wide text-emerald-700">{resource.category}</span>
                  <h3 className="mt-2 text-lg font-black text-[#0F172A]">{resource.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{resource.summary}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                    View resource <ArrowRight size={14} aria-hidden />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success metrics */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#0E6B4F] px-4 py-16 text-white lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black md:text-4xl">{SUCCESS_METRICS.title}</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-white/80">{SUCCESS_METRICS.intro}</p>
          </motion.div>
          <div className="mt-10">
            <AnimatedStatCounter stats={[...SUCCESS_METRICS.stats]} className="lg:grid-cols-5" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-emerald-50 px-4 py-16 lg:px-8 lg:py-20">
        <motion.div {...reveal()} className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{SCHOOL_CTA.title}</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{SCHOOL_CTA.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/schedule-appointment" className={getButtonClasses("primarySite")}>
              {SCHOOL_CTA.primaryLabel} <ArrowRight size={18} aria-hidden />
            </Link>
            <Link href="/about/contact-us" className={getButtonClasses("secondarySite")}>
              {SCHOOL_CTA.secondaryLabel}
            </Link>
            <Link href="/intake" className={getButtonClasses("secondarySite")}>
              {SCHOOL_CTA.tertiaryLabel}
            </Link>
          </div>
        </motion.div>
      </section>
    </AboutPremiumLayout>
  );
}
