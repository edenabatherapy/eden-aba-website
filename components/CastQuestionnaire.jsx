"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CAST_QUESTIONS, CAST_QUESTION_COUNT } from "@/lib/cast-questions";
import { SITE_IMAGES } from "@/lib/site-images";
import EdenButton from "@/components/EdenButton";

const slide = {
  initial: false,
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

function RadioOption({ name, value, label, checked, onChange }) {
  return (
    <label
      className={`flex min-h-[72px] cursor-pointer items-center gap-4 rounded-2xl border-2 px-6 py-4 transition ${
        checked
          ? "border-[#0E6B4F] bg-[#0E6B4F]/5 shadow-md ring-2 ring-[#0E6B4F]/20"
          : "border-[#0E6B4F]/15 bg-white hover:border-[#0E6B4F]/40"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="h-6 w-6 shrink-0 accent-[#0E6B4F]"
      />
      <span className="text-lg font-black text-[#0F172A]">{label}</span>
    </label>
  );
}

export default function CastQuestionnaire({ t, onScheduleEvaluation }) {
  const cq = t.pages.castQuestionnaire;
  const imgs = SITE_IMAGES.castScreener;

  const [stage, setStage] = useState("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [form, setForm] = useState({
    parentFirstName: "",
    parentLastName: "",
    email: "",
    phone: "",
    postalCode: "",
    childFirstName: "",
    childDateOfBirth: "",
    preferredLocation: "",
    consent: false,
  });

  const current = CAST_QUESTIONS[index];
  const progressPct = stage === "questions" ? Math.round(((index + 1) / CAST_QUESTION_COUNT) * 100) : stage === "contact" ? 100 : 0;

  const yesLabel = cq.options.yes;
  const noLabel = cq.options.no;

  const allQuestionsAnswered = useMemo(
    () => CAST_QUESTIONS.every((q) => answers[q.id] === "yes" || answers[q.id] === "no"),
    [answers],
  );

  const phoneDigits = form.phone.replace(/\D/g, "");
  const emailValid = form.email.includes("@") && form.email.includes(".");
  const phoneValid = phoneDigits.length >= 10;
  const contactValid =
    form.parentFirstName.trim() &&
    form.parentLastName.trim() &&
    emailValid &&
    phoneValid &&
    form.postalCode.trim() &&
    form.consent;

  const updateForm = (key, value) => {
    if (key === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      const formatted =
        digits.length > 6
          ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
          : digits.length > 3
            ? `(${digits.slice(0, 3)}) ${digits.slice(3)}`
            : digits;
      setForm((old) => ({ ...old, phone: formatted }));
      return;
    }
    setForm((old) => ({ ...old, [key]: value }));
  };

  const setAnswer = (questionId, value) => {
    setAnswers((old) => ({ ...old, [questionId]: value }));
  };

  const handleSubmit = () => {
    setSubmitAttempted(true);
    if (!allQuestionsAnswered || !contactValid) return;

    const payload = {
      parentFirstName: form.parentFirstName.trim(),
      parentLastName: form.parentLastName.trim(),
      email: form.email.trim(),
      phone: form.phone,
      postalCode: form.postalCode.trim(),
      childFirstName: form.childFirstName.trim(),
      childDateOfBirth: form.childDateOfBirth,
      preferredLocation: form.preferredLocation,
      answers,
      submittedAt: new Date().toISOString(),
    };

    // TODO: Connect to Eden ABA Therapy CAST submission API endpoint.
    // Example: await fetch("/api/cast-screener", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (typeof window !== "undefined") {
      localStorage.setItem("eden-cast-screener-placeholder", JSON.stringify(payload));
    }

    setStage("confirmation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fieldClass =
    "w-full rounded-2xl border border-[#0E6B4F]/15 bg-white px-4 py-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0E6B4F] focus:ring-4 focus:ring-[#0E6B4F]/10";

  if (stage === "confirmation") {
    return (
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-[#0E6B4F]/10 bg-white p-8 text-center shadow-2xl md:p-12"
        >
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#0E6B4F]/10">
            <CheckCircle2 size={36} className="text-[#0E6B4F]" />
          </div>
          <h2 className="mt-6 text-3xl font-black text-[#0F172A] md:text-4xl">{cq.confirmation.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-semibold leading-8 text-slate-600">{cq.confirmation.message}</p>
          <EdenButton className="mt-8" onClick={onScheduleEvaluation}>
            {cq.confirmation.scheduleCta} <ArrowRight size={18} />
          </EdenButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* INTRO */}
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] border border-[#0E6B4F]/10 bg-white p-8 shadow-xl md:p-10"
        >
          <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{cq.intro.title}</h2>
          <p className="mt-5 text-base font-semibold leading-8 text-slate-600">{cq.intro.paragraph1}</p>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-600">{cq.intro.paragraph2}</p>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-bold leading-7 text-amber-900">
              <span className="font-black">{cq.intro.noteLabel}</span> {cq.intro.note}
            </p>
          </div>
          {stage === "intro" && (
            <EdenButton className="mt-8" onClick={() => setStage("questions")}>
              {cq.intro.beginButton} <ArrowRight size={18} />
            </EdenButton>
          )}
        </motion.div>

        <div className="hidden gap-4 lg:grid">
          <img
            src={imgs.gallery?.[0] || imgs.hero}
            alt={cq.intro.imageAlts[0]}
            loading="lazy"
            className="h-48 w-full rounded-[1.5rem] object-cover shadow-lg ring-4 ring-white"
          />
          <div className="grid grid-cols-2 gap-4">
            <img
              src={imgs.gallery?.[1] || imgs.hero}
              alt={cq.intro.imageAlts[1]}
              loading="lazy"
              className="aspect-square rounded-[1.25rem] object-cover shadow-md ring-4 ring-white"
            />
            <img
              src={imgs.gallery?.[2] || imgs.hero}
              alt={cq.intro.imageAlts[2]}
              loading="lazy"
              className="aspect-square rounded-[1.25rem] object-cover shadow-md ring-4 ring-white"
            />
          </div>
        </div>
      </div>

      {/* QUESTIONS */}
      {(stage === "questions" || stage === "contact") && (
        <div className="mt-12">
          {stage === "questions" && (
            <motion.div layout className="rounded-[2rem] border border-[#0E6B4F]/10 bg-white p-6 shadow-2xl md:p-10">
              <div className="mb-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-[#0E6B4F]">
                    {cq.progress.label} {index + 1} {cq.progress.of} {CAST_QUESTION_COUNT}
                  </p>
                  <p className="text-sm font-bold text-slate-500">
                    {Object.keys(answers).length}/{CAST_QUESTION_COUNT} {cq.progress.answered}
                  </p>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#FAF7F0]">
                  <motion.div
                    className="h-full rounded-full bg-[#0E6B4F]"
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={current.id} {...slide}>
                  <fieldset>
                    <legend className="sr-only">{current.text}</legend>
                    <h3 className="text-xl font-black leading-snug text-[#0F172A] md:text-2xl">{current.text}</h3>
                    <div
                      role="radiogroup"
                      aria-label={current.text}
                      className="mt-8 grid gap-4 sm:grid-cols-2"
                    >
                      <RadioOption
                        name={`cast-q-${current.id}`}
                        value="no"
                        label={noLabel}
                        checked={answers[current.id] === "no"}
                        onChange={(v) => setAnswer(current.id, v)}
                      />
                      <RadioOption
                        name={`cast-q-${current.id}`}
                        value="yes"
                        label={yesLabel}
                        checked={answers[current.id] === "yes"}
                        onChange={(v) => setAnswer(current.id, v)}
                      />
                    </div>
                  </fieldset>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#0E6B4F]/10 pt-6">
                <EdenButton
                  variant="outline"
                  disabled={index === 0}
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                >
                  {cq.navigation.previous}
                </EdenButton>
                <EdenButton
                  disabled={!answers[current.id]}
                  onClick={() => {
                    if (index < CAST_QUESTION_COUNT - 1) {
                      setIndex((i) => i + 1);
                    } else if (allQuestionsAnswered) {
                      setStage("contact");
                    }
                  }}
                >
                  {index === CAST_QUESTION_COUNT - 1 ? cq.navigation.toContact : cq.navigation.next}
                </EdenButton>
              </div>
            </motion.div>
          )}

          {/* CONTACT */}
          {stage === "contact" && (
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] border border-[#0E6B4F]/10 bg-white p-6 shadow-2xl md:p-10"
            >
              <h3 className="text-2xl font-black text-[#0F172A] md:text-3xl">{cq.contact.title}</h3>
              <p className="mt-2 text-sm font-semibold text-slate-500">{cq.contact.requiredNote}</p>

              {!allQuestionsAnswered && submitAttempted && (
                <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-black text-red-600">{cq.contact.questionsError}</p>
              )}

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-black text-slate-700">
                  {cq.contact.fields.parentFirstName}
                  <input
                    required
                    className={fieldClass}
                    value={form.parentFirstName}
                    onChange={(e) => updateForm("parentFirstName", e.target.value)}
                  />
                </label>
                <label className="grid gap-2 text-sm font-black text-slate-700">
                  {cq.contact.fields.parentLastName}
                  <input
                    required
                    className={fieldClass}
                    value={form.parentLastName}
                    onChange={(e) => updateForm("parentLastName", e.target.value)}
                  />
                </label>
                <label className="grid gap-2 text-sm font-black text-slate-700">
                  {cq.contact.fields.email}
                  <input
                    required
                    type="email"
                    className={fieldClass}
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                  />
                </label>
                <label className="grid gap-2 text-sm font-black text-slate-700">
                  {cq.contact.fields.phone}
                  <input
                    required
                    type="tel"
                    className={fieldClass}
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                  />
                </label>
                <label className="grid gap-2 text-sm font-black text-slate-700">
                  {cq.contact.fields.postalCode}
                  <input
                    required
                    className={fieldClass}
                    value={form.postalCode}
                    onChange={(e) => updateForm("postalCode", e.target.value)}
                  />
                </label>
                <label className="grid gap-2 text-sm font-black text-slate-700">
                  {cq.contact.fields.childFirstName}
                  <input className={fieldClass} value={form.childFirstName} onChange={(e) => updateForm("childFirstName", e.target.value)} />
                </label>
                <label className="grid gap-2 text-sm font-black text-slate-700">
                  {cq.contact.fields.childDateOfBirth}
                  <input
                    type="date"
                    className={fieldClass}
                    value={form.childDateOfBirth}
                    onChange={(e) => updateForm("childDateOfBirth", e.target.value)}
                  />
                </label>
                <label className="grid gap-2 text-sm font-black text-slate-700 md:col-span-2">
                  {cq.contact.fields.preferredLocation}
                  <select
                    className={fieldClass}
                    value={form.preferredLocation}
                    onChange={(e) => updateForm("preferredLocation", e.target.value)}
                  >
                    <option value="">{cq.contact.locationPlaceholder}</option>
                    {cq.contact.locationOptions.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-6 flex items-start gap-3 rounded-2xl bg-[#FAF7F0] p-5 text-sm font-semibold leading-7 text-slate-700">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => updateForm("consent", e.target.checked)}
                  className="mt-1 h-5 w-5 shrink-0 accent-[#0E6B4F]"
                />
                <span>{cq.contact.consent}</span>
              </label>

              {submitAttempted && !contactValid && (
                <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-black text-red-600">{cq.contact.validationError}</p>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                <EdenButton variant="outline" onClick={() => { setStage("questions"); setIndex(CAST_QUESTION_COUNT - 1); }}>
                  {cq.navigation.backToQuestions}
                </EdenButton>
                <EdenButton className="flex-1 sm:flex-none" onClick={handleSubmit}>
                  {cq.contact.submit}
                </EdenButton>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
