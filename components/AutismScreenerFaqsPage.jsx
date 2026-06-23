"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  HeartHandshake,
  Mail,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
} from "lucide-react";
import { FAQ_CATEGORIES, FAQ_ITEMS } from "@/lib/autism-screener-faqs";
import { SITE_IMAGES } from "@/lib/site-images";
import EdenButton from "@/components/EdenButton";
import ReCaptchaVerification from "@/components/security/ReCaptchaVerification";
import RecaptchaNotice from "@/components/RecaptchaNotice";
import { useNewsletterSignup } from "@/hooks/useNewsletterSignup";

const fadeUp = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

function FaqFilterList({ categories, selected, onToggle, onSelectAll, idPrefix = "faq-filter" }) {
  return (
    <ul className="grid gap-2" role="group" aria-label="FAQ categories">
      {categories.map((cat) => {
        const checked = cat.id === "all" ? selected.size === 0 : selected.has(cat.id);
        return (
          <li key={cat.id}>
            <label
              htmlFor={`${idPrefix}-${cat.id}`}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                checked
                  ? "border-[#0E6B4F]/30 bg-[#0E6B4F]/10 text-[#0E6B4F]"
                  : "border-[#0E6B4F]/10 bg-white text-slate-700 hover:border-[#0E6B4F]/25"
              }`}
            >
              <span
                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 ${
                  checked ? "border-[#0E6B4F] bg-[#0E6B4F] text-white" : "border-slate-300 bg-white"
                }`}
                aria-hidden="true"
              >
                {checked && <Check size={12} strokeWidth={3} />}
              </span>
              <input
                id={`${idPrefix}-${cat.id}`}
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => (cat.id === "all" ? onSelectAll() : onToggle(cat.id))}
              />
              <span>{cat.label}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

const BENEFIT_ICONS = [Sparkles, BookOpen, HeartHandshake, ShieldCheck, Sprout, Mail];

function FaqNewsletterSection({ t }) {
  const n = t.pages.autismScreenerFaqs.newsletter;
  const reduceMotion = useReducedMotion();

  const sectionMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      };

  const cardHover = reduceMotion
    ? {}
    : {
        whileHover: { y: -4, transition: { duration: 0.22 } },
      };

  return (
    <section
      id="faq-newsletter"
      aria-labelledby="faq-newsletter-heading"
      className="relative overflow-hidden px-4 py-16 lg:px-8 lg:py-24"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#FFF7ED] via-[#ECFDF5] to-[#F0FDFA]"
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#0F7F4F]/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#0EA5A4]/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-[#FBC02D]/25 blur-3xl" aria-hidden />

      <motion.div {...sectionMotion} className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
          <div className="order-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#0F7F4F]/20 bg-white/80 px-4 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#064E3B] shadow-sm">
              <Mail size={14} className="text-[#0F7F4F]" aria-hidden />
              Eden Family Resources
            </p>
            <h2 id="faq-newsletter-heading" className="mt-5 text-3xl font-black leading-tight text-[#0F172A] md:text-4xl lg:text-[2.5rem]">
              {n.title}
            </h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-[#475569]">{n.intro}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Newsletter benefits">
              {(n.benefits || []).map((benefit, index) => {
                const Icon = BENEFIT_ICONS[index] ?? Sparkles;
                return (
                  <motion.li
                    key={benefit}
                    whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 rounded-2xl border border-[#0F7F4F]/10 bg-white/90 px-4 py-3 text-sm font-bold text-[#064E3B] shadow-sm backdrop-blur-sm"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ECFDF5] to-[#FFF7ED] text-[#0F7F4F]">
                      <Icon size={18} aria-hidden />
                    </span>
                    {benefit}
                  </motion.li>
                );
              })}
            </ul>

            <p className="mt-8 flex items-start gap-2 rounded-2xl border border-[#0F7F4F]/10 bg-white/70 px-4 py-3 text-sm font-semibold leading-7 text-[#475569]">
              <ShieldCheck className="mt-0.5 shrink-0 text-[#0F7F4F]" size={18} aria-hidden />
              {n.trustNote}
            </p>
          </div>

          <motion.div {...cardHover} className="order-2">
            <FaqNewsletterForm t={t} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function FaqNewsletterForm({ t }) {
  const n = t.pages.autismScreenerFaqs.newsletter;
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    type: "parent",
    consent: false,
  });
  const {
    recaptchaRef,
    recaptchaError,
    verifying,
    validating,
    canSubmit: recaptchaReady,
    handleTokenChange,
    handleExpired,
    submitting,
    submittingMessage,
    error,
    success,
    formDisabled,
    submit,
  } = useNewsletterSignup();

  const valid = form.firstName.trim() && form.lastName.trim() && form.email.includes("@") && form.consent;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid) return;

    await submit({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      source: "screener-faq-newsletter",
      type: form.type,
      consent: form.consent,
    });
  };

  if (success) {
    return (
      <div className="rounded-[28px] border border-[#0F7F4F]/15 bg-white p-8 text-center shadow-xl shadow-[#064E3B]/10 md:p-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#ECFDF5] text-[#0F7F4F]">
          <Check size={28} strokeWidth={2.5} aria-hidden />
        </span>
        <p className="mt-5 text-lg font-bold leading-8 text-[#064E3B]">{n.success}</p>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-2xl border border-[#0F7F4F]/20 bg-white px-4 py-3.5 text-sm font-semibold text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0F7F4F] focus:ring-4 focus:ring-[#0F7F4F]/15";

  return (
    <div className="rounded-[28px] border border-[#0EA5A4]/25 bg-white p-6 shadow-xl shadow-[#064E3B]/8 md:p-8 lg:p-10">
      <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ECFDF5] to-[#FFF7ED] px-4 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-[#064E3B] ring-1 ring-[#0F7F4F]/15">
        <Sparkles size={14} className="text-[#FBC02D]" aria-hidden />
        {n.badge || "Free Family Resource Newsletter"}
      </div>

      <p className="mt-5 text-sm font-semibold leading-7 text-[#475569]">
        {n.benefitTagline || "Helpful, practical, and family-friendly. No spam. Unsubscribe anytime."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6" noValidate>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-extrabold text-[#0F172A]">
            {n.fields.firstName}
            <input
              required
              autoComplete="given-name"
              className={fieldClass}
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </label>
          <label className="grid gap-2 text-sm font-extrabold text-[#0F172A]">
            {n.fields.lastName}
            <input
              required
              autoComplete="family-name"
              className={fieldClass}
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </label>
          <label className="grid gap-2 text-sm font-extrabold text-[#0F172A] md:col-span-2">
            {n.fields.email}
            <input
              required
              type="email"
              autoComplete="email"
              className={fieldClass}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
        </div>

        <fieldset className="mt-6">
          <legend className="mb-3 text-sm font-extrabold text-[#0F172A]">{n.typeLabel}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["parent", n.types.parent],
              ["professional", n.types.professional],
            ].map(([value, label]) => {
              const selected = form.type === value;
              return (
                <label
                  key={value}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-bold transition ${
                    selected
                      ? "border-[#0F7F4F] bg-[#ECFDF5] text-[#064E3B] shadow-sm ring-2 ring-[#0F7F4F]/15"
                      : "border-[#0F7F4F]/15 bg-white text-[#475569] hover:border-[#0F7F4F]/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="newsletter-type"
                    value={value}
                    checked={selected}
                    onChange={() => setForm({ ...form, type: value })}
                    className="h-4 w-4 border-[#0F7F4F]/30 text-[#0F7F4F] focus:ring-[#0F7F4F]"
                  />
                  {label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6 rounded-2xl border border-[#FBC02D]/30 bg-[#FFF7ED]/80 p-4">
          <label className="flex items-start gap-3 text-sm font-semibold leading-7 text-[#475569]">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="mt-1 h-5 w-5 shrink-0 rounded border-[#0F7F4F]/30 text-[#0F7F4F] focus:ring-[#0F7F4F]"
              aria-describedby="faq-newsletter-privacy-note"
            />
            <span>{n.consent}</span>
          </label>
          <p id="faq-newsletter-privacy-note" className="mt-3 pl-8 text-xs font-medium leading-6 text-[#64748B]">
            {n.privacyNote ||
              "We respect your privacy and only send helpful Eden ABA Therapy updates and resources."}
          </p>
        </div>

        <div className="mt-6 max-w-sm">
          <ReCaptchaVerification
            ref={recaptchaRef}
            onTokenChange={handleTokenChange}
            onExpired={handleExpired}
            error={recaptchaError}
            disabled={formDisabled || success}
          />
        </div>

        <button
          type="submit"
          disabled={!valid || formDisabled || !recaptchaReady || success}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0F7F4F] via-[#0B6B4F] to-[#0EA5A4] px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-[#064E3B]/20 transition enabled:hover:-translate-y-0.5 enabled:hover:brightness-110 enabled:hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none sm:w-auto"
        >
          {submitting ? submittingMessage : verifying ? "Verifying…" : n.submit}
          <ArrowRight size={18} aria-hidden />
        </button>
        <RecaptchaNotice />

        {error ? (
          <p role="alert" className="mt-4 text-xs text-red-600">
            {error}
          </p>
        ) : null}
      </form>
    </div>
  );
}

function FaqSchema({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function AutismScreenerFaqsPage({
  t,
  onStart,
  onLocations,
  onMchat,
  onCast,
  onAdos,
  onIde,
  onInsurance,
  onAba,
  onAutism,
}) {
  const p = t.pages.autismScreenerFaqs;
  const img = SITE_IMAGES.autismScreenerFaqs;

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [openIds, setOpenIds] = useState(new Set());
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const linkHandlers = {
    mchat: onMchat,
    cast: onCast,
    ados: onAdos,
    ide: onIde,
    insurance: onInsurance,
    locations: onLocations,
    aba: onAba,
    autism: onAutism,
    intake: onStart,
  };

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      const categoryMatch = selectedCategories.size === 0 || selectedCategories.has(item.category);
      if (!categoryMatch) return false;
      if (!query) return true;
      return (
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    });
  }, [search, selectedCategories]);

  const toggleCategory = (id) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAllCategories = () => setSelectedCategories(new Set());

  const toggleFaq = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const resultsLabel = p.faqSection.resultsLabel.replace("{count}", String(filteredItems.length));

  return (
    <div className="bg-[#FAF7F0] text-[#0F172A]">
      <FaqSchema items={FAQ_ITEMS} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0E6B4F] via-[#0a5640] to-[#0F172A] px-4 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div {...fadeUp}>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm font-bold text-[#10B981]">
              <ol className="flex flex-wrap items-center gap-2">
                {p.hero.breadcrumb.map((crumb, i) => (
                  <li key={crumb} className="flex items-center gap-2">
                    {i > 0 && <span className="text-white/50">›</span>}
                    <span className={i === p.hero.breadcrumb.length - 1 ? "text-white" : ""}>{crumb}</span>
                  </li>
                ))}
              </ol>
            </nav>
            <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-black uppercase tracking-[0.22em] text-[#10B981]">
              {p.hero.badge}
            </span>
            <h1 className="mt-6 text-3xl font-black leading-tight md:text-5xl">{p.hero.title}</h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/85">{p.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <EdenButton onClick={onStart}>
                {p.hero.findCareButton} <ArrowRight size={18} />
              </EdenButton>
              <EdenButton variant="secondaryOnDark" onClick={onLocations}>
                <MapPin size={18} /> {p.hero.viewLocationsButton}
              </EdenButton>
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
            <img
              src={img.hero}
              alt={p.hero.imageAlt}
              loading="eager"
              className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-2xl ring-4 ring-white/20"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="screener-faqs" className="scroll-mt-28 px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-black text-[#0F172A] md:text-4xl">
            {p.faqSection.title}
          </motion.h2>

          {/* Mobile filter toggle */}
          <div className="mt-8 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="w-full rounded-2xl border border-[#0E6B4F]/15 bg-white px-4 py-3 text-left text-sm font-black text-[#0E6B4F] shadow-sm"
              aria-expanded={mobileFilterOpen}
            >
              Filter categories {selectedCategories.size > 0 ? `(${selectedCategories.size} selected)` : ""}
            </button>
            <AnimatePresence>
              {mobileFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 rounded-2xl border border-[#0E6B4F]/10 bg-white p-4 shadow-md">
                    <FaqFilterList
                      categories={FAQ_CATEGORIES}
                      selected={selectedCategories}
                      onToggle={toggleCategory}
                      onSelectAll={selectAllCategories}
                      idPrefix="faq-filter-mobile"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile horizontal category chips */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:hidden" role="group" aria-label="Quick category filters">
            {FAQ_CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
              const active = selectedCategories.has(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-black transition ${
                    active ? "bg-[#0E6B4F] text-white" : "bg-white text-[#0E6B4F] shadow-sm"
                  }`}
                >
                  {cat.label.split(" ")[0]}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-[1.75rem] border border-[#0E6B4F]/10 bg-white p-5 shadow-lg">
                <label htmlFor="faq-search" className="sr-only">
                  Search FAQs
                </label>
                <div className="relative">
                  <Search size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0E6B4F]/50" />
                  <input
                    id="faq-search"
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={p.faqSection.searchPlaceholder}
                    className="w-full rounded-2xl border border-[#0E6B4F]/15 bg-[#FAF7F0] py-3.5 pl-4 pr-11 text-sm font-semibold outline-none focus:border-[#0E6B4F] focus:ring-4 focus:ring-[#0E6B4F]/10"
                  />
                </div>
                <div className="mt-5">
                  <FaqFilterList
                    categories={FAQ_CATEGORIES}
                    selected={selectedCategories}
                    onToggle={toggleCategory}
                    onSelectAll={selectAllCategories}
                  />
                </div>
              </div>
            </aside>

            {/* FAQ cards */}
            <div>
              <div className="mb-4 lg:hidden">
                <label htmlFor="faq-search-mobile" className="sr-only">
                  Search FAQs
                </label>
                <div className="relative">
                  <Search size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0E6B4F]/50" />
                  <input
                    id="faq-search-mobile"
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={p.faqSection.searchPlaceholder}
                    className="w-full rounded-2xl border border-[#0E6B4F]/15 bg-white py-3.5 pl-4 pr-11 text-sm font-semibold shadow-sm outline-none focus:border-[#0E6B4F]"
                  />
                </div>
              </div>

              <p className="mb-4 text-sm font-bold text-slate-500">{resultsLabel}</p>

              {filteredItems.length === 0 ? (
                <div className="rounded-[1.75rem] border border-[#0E6B4F]/10 bg-white p-12 text-center shadow-md">
                  <p className="text-lg font-semibold text-slate-600">{p.faqSection.emptyState}</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredItems.map((item) => {
                    const isOpen = openIds.has(item.id);
                    return (
                      <article
                        key={item.id}
                        className="overflow-hidden rounded-[1.75rem] border border-[#0E6B4F]/10 bg-white shadow-md"
                        data-searchable={item.question}
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${item.id}`}
                          id={`faq-trigger-${item.id}`}
                          onClick={() => toggleFaq(item.id)}
                          className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                        >
                          <div className="min-w-0">
                            <span className="inline-flex rounded-full bg-[#0E6B4F]/10 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#0E6B4F]">
                              {item.category}
                            </span>
                            <h3 className="mt-3 text-lg font-black text-[#0F172A]">{item.question}</h3>
                          </div>
                          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="mt-2 shrink-0">
                            <ChevronDown size={22} className="text-[#0E6B4F]" />
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`faq-panel-${item.id}`}
                              role="region"
                              aria-labelledby={`faq-trigger-${item.id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28 }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-[#0E6B4F]/10 px-6 pb-6 pt-2">
                                <p className="text-base font-semibold leading-8 text-slate-600">{item.answer}</p>
                                {item.linkKey && p.linkLabels[item.linkKey] && linkHandlers[item.linkKey] && (
                                  <button
                                    type="button"
                                    onClick={linkHandlers[item.linkKey]}
                                    className="mt-4 inline-flex items-center gap-1 text-sm font-black text-[#0E6B4F] hover:underline"
                                  >
                                    {p.linkLabels[item.linkKey]} <ArrowRight size={14} />
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <FaqNewsletterSection t={t} />

      {/* CTA */}
      <section className="px-4 py-16 lg:px-8">
        <motion.div
          {...fadeUp}
          className="mx-auto grid max-w-6xl overflow-hidden rounded-[2.5rem] bg-[#0E6B4F] shadow-2xl lg:grid-cols-2"
        >
          <div className="p-10 text-white lg:p-14">
            <h2 className="text-3xl font-black md:text-4xl">
              Your Child Is <span className="text-[#F7C948]">Accepted</span> Here
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-white/90">{p.cta.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <EdenButton variant="secondaryOnDark" onClick={onAutism}>
                {p.cta.autismButton} <ArrowRight size={16} />
              </EdenButton>
              <EdenButton variant="outlineOnDark" onClick={onAba}>
                {p.cta.abaButton}
              </EdenButton>
            </div>
          </div>
          <div className="relative min-h-[280px]">
            <img
              src={img.cta}
              alt={p.cta.imageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
