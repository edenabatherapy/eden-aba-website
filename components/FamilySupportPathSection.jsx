"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  FileCheck2,
  Search,
  Sparkles,
} from "lucide-react";
import "./FamilySupportPathSection.css";

const STEP_ICONS = [Search, FileCheck2, CalendarDays, ClipboardList];

const STEP_THEMES = [
  {
    id: "emerald-mint",
    cardGlow: "linear-gradient(135deg, rgba(16,185,129,0.16) 0%, rgba(167,243,208,0.28) 100%)",
    badge: "bg-emerald-100 text-emerald-800",
    icon: "bg-gradient-to-br from-emerald-500 to-teal-300 text-white",
    outcomes: "text-emerald-700",
    bullet: "bg-emerald-500",
    button: "bg-emerald-700 text-white hover:bg-emerald-600 shadow-[0_14px_30px_-12px_rgba(5,150,105,0.55)]",
    buttonAlt: "bg-white text-emerald-800 ring-1 ring-emerald-200 hover:bg-emerald-50",
    ring: "hover:border-emerald-200/80",
  },
  {
    id: "indigo-sky",
    cardGlow: "linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(125,211,252,0.24) 100%)",
    badge: "bg-indigo-100 text-indigo-800",
    icon: "bg-gradient-to-br from-indigo-600 to-sky-400 text-white",
    outcomes: "text-indigo-700",
    bullet: "bg-indigo-500",
    button: "bg-indigo-700 text-white hover:bg-indigo-600 shadow-[0_14px_30px_-12px_rgba(67,56,202,0.5)]",
    buttonAlt: "bg-white text-indigo-800 ring-1 ring-indigo-200 hover:bg-indigo-50",
    ring: "hover:border-indigo-200/80",
  },
  {
    id: "teal-gold",
    cardGlow: "linear-gradient(135deg, rgba(20,184,166,0.16) 0%, rgba(251,191,36,0.22) 100%)",
    badge: "bg-teal-100 text-teal-800",
    icon: "bg-gradient-to-br from-teal-600 to-amber-300 text-white",
    outcomes: "text-teal-700",
    bullet: "bg-teal-500",
    button: "bg-teal-700 text-white hover:bg-teal-600 shadow-[0_14px_30px_-12px_rgba(15,118,110,0.5)]",
    buttonAlt: "bg-white text-teal-800 ring-1 ring-teal-200 hover:bg-teal-50",
    ring: "hover:border-teal-200/80",
  },
  {
    id: "green-cream",
    cardGlow: "linear-gradient(135deg, rgba(22,101,52,0.14) 0%, rgba(254,243,199,0.34) 100%)",
    badge: "bg-lime-100 text-lime-900",
    icon: "bg-gradient-to-br from-green-800 to-amber-100 text-green-950",
    outcomes: "text-green-800",
    bullet: "bg-green-700",
    button: "bg-green-900 text-white hover:bg-green-800 shadow-[0_14px_30px_-12px_rgba(20,83,45,0.45)]",
    buttonAlt: "bg-amber-50 text-green-900 ring-1 ring-amber-200 hover:bg-amber-100",
    ring: "hover:border-lime-200/80",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1];

function PathStepCard({
  step,
  theme,
  iconIndex,
  outcomesLabel,
  onClick,
  actions,
  note,
  reduceMotion,
  cardDelay,
}) {
  const Icon = STEP_ICONS[iconIndex] ?? Search;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: cardDelay, ease: EASE_OUT }}
      className={`family-path-card ${theme.ring}`}
    >
      <div className="family-path-card__glow" style={{ background: theme.cardGlow }} aria-hidden="true" />

      <div className="family-path-card__body">
        <span className={`family-path-step-badge ${theme.badge}`}>{step.step}</span>

        <motion.div
          className={`family-path-icon-wrap mt-5 ${reduceMotion ? "" : "family-path-icon-wrap--animated"}`}
          style={{ animationDelay: `${iconIndex * 0.35}s` }}
          whileHover={reduceMotion ? undefined : { scale: 1.05, rotate: -2 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <div className={`grid h-full w-full place-items-center rounded-[1.05rem] ${theme.icon}`}>
            <Icon size={30} strokeWidth={2.2} aria-hidden="true" />
          </div>
        </motion.div>

        <h3 className="mt-6 text-[1.55rem] font-black leading-tight tracking-tight text-slate-900 md:text-[1.65rem]">
          {step.title}
        </h3>

        <p className="mt-4 text-[0.96rem] font-medium leading-7 text-slate-600">{step.description}</p>

        <div className="mt-6">
          <p className={`family-path-outcomes-label ${theme.outcomes}`}>{outcomesLabel}</p>
          <ul className="mt-3 space-y-2.5">
            {step.benefits.map((item, bulletIndex) => (
              <motion.li
                key={item}
                initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: cardDelay + 0.08 + bulletIndex * 0.06, ease: EASE_OUT }}
                className="family-path-bullet"
              >
                <span className={`family-path-bullet__dot ${theme.bullet}`} aria-hidden="true" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {note ? <p className="family-path-note">{note}</p> : null}

        <div className={`mt-auto pt-8${actions?.length > 1 ? " space-y-3" : ""}`}>
          {actions?.length ? (
            actions.map(({ label, onClick: actionClick }, actionIndex) => (
              <button
                key={label}
                type="button"
                onClick={actionClick}
                className={`family-path-btn ${actionIndex === 0 ? theme.button : theme.buttonAlt}`}
              >
                {label}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            ))
          ) : (
            <button type="button" onClick={onClick} className={`family-path-btn ${theme.button}`}>
              {step.button}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function FamilySupportPathSection({
  t,
  onMchat,
  onCast,
  onDiagnosticSupport,
  onScheduleConsultation,
  onStartIntake,
}) {
  const content = t.familySupportPath || {};
  const steps = content.steps || [];
  const outcomesLabel = content.outcomesLabel || "What this step helps with";
  const trustBadges = content.trustBadges || [];
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const connectorInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handlers = [onMchat, onDiagnosticSupport, onScheduleConsultation, onStartIntake];

  return (
    <section
      id="getting-started"
      className="family-path-section scroll-mt-28 px-4 py-20 lg:px-8 lg:py-28"
    >
      <div className="family-path-grid" aria-hidden="true" />
      <div className="family-path-blob family-path-blob--1" aria-hidden="true" />
      <div className="family-path-blob family-path-blob--2" aria-hidden="true" />
      <div className="family-path-blob family-path-blob--3" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="family-path-badge">
            <Sparkles size={14} aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h2 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight text-slate-900 md:text-5xl lg:text-[3.2rem]">
            {content.title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-600 md:text-xl md:leading-9">
            {content.subtitle}
          </p>

          {trustBadges.length ? (
            <div className="family-path-trust-row mt-8">
              {trustBadges.map((badge) => (
                <span key={badge} className="family-path-trust-pill">
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
        </motion.div>

        <div ref={sectionRef} className="relative mt-14 lg:mt-16">
          <div className="family-path-connector" aria-hidden="true">
            <div className="family-path-connector__track">
              <motion.div
                className="family-path-connector__fill"
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={connectorInView || reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.1, ease: EASE_OUT }}
              />
            </div>
            <div className="family-path-connector__nodes">
              {steps.map((step) => (
                <div key={step.step} className="family-path-connector__node">
                  <div className="family-path-connector__dot" />
                </div>
              ))}
            </div>
          </div>

          {content.journeyLabel ? (
            <p className="mb-8 hidden text-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 xl:block">
              {content.journeyLabel}
            </p>
          ) : null}

          <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {steps.map((step, index) => (
              <PathStepCard
                key={step.step}
                step={step}
                theme={STEP_THEMES[index] ?? STEP_THEMES[0]}
                iconIndex={index}
                outcomesLabel={outcomesLabel}
                onClick={handlers[index]}
                note={index === 0 ? content.stepOneNote : undefined}
                reduceMotion={reduceMotion}
                cardDelay={0.08 + index * 0.08}
                actions={
                  index === 0 && step.buttons?.length
                    ? step.buttons.map((label, buttonIndex) => ({
                        label,
                        onClick: buttonIndex === 0 ? onMchat : onCast,
                      }))
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
