"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Brain,
  ClipboardCheck,
  Heart,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { SITE_IMAGES } from "@/lib/site-images";

const STEP_ICONS = [ClipboardCheck, Brain, ShieldCheck, Heart, TrendingUp];

const STEP_ACCENTS = [
  "from-[#1f7a2e] to-[#128c8c]",
  "from-[#128c8c] to-[#49b8c8]",
  "from-[#49b8c8] to-[#128c8c]",
  "from-[#f7c72f] to-[#ff8a1f]",
  "from-[#1f7a2e] to-[#0b4f4f]",
];

const BOTTOM_ACCENTS = ["#1f7a2e", "#128c8c", "#49b8c8", "#f7c72f", "#1f7a2e"];

const NODE_POSITIONS = [
  { x: 60, y: 108 },
  { x: 300, y: 62 },
  { x: 540, y: 118 },
  { x: 780, y: 68 },
  { x: 1020, y: 98 },
];

const JOURNEY_PATH =
  "M 60 108 C 150 40, 220 150, 300 62 S 440 160, 540 118 S 680 30, 780 68 S 900 150, 1020 98 L 1140 88";

const fadeUp = (delay = 0) => ({
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

function JourneyNode({ stepNumber, accentClass, delay = 0 }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`journey-step-node step-${stepNumber} group/node relative flex flex-col items-center`}
    >
      <div
        className={`absolute -inset-3 rounded-full bg-gradient-to-br ${accentClass} opacity-25 blur-xl transition duration-300 group-hover/node:opacity-45`}
        aria-hidden="true"
      />
      <div
        className={`relative z-[1] grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br ${accentClass} text-lg font-black text-white shadow-lg shadow-[#128c8c]/25 ring-4 ring-white transition duration-300 group-hover/node:scale-110 group-hover/node:shadow-xl group-hover/node:shadow-[#128c8c]/30`}
      >
        {stepNumber}
      </div>
    </motion.div>
  );
}

function JourneyStepCard({ step, index, accentClass, bottomAccent }) {
  const Icon = STEP_ICONS[index] ?? ClipboardCheck;

  return (
    <motion.article
      {...fadeUp(0.08 + index * 0.08)}
      className="group/card relative flex h-full flex-col rounded-[1.75rem] border border-[#49b8c8]/15 bg-white p-6 shadow-lg shadow-[#128c8c]/8 transition duration-300 hover:-translate-y-1.5 hover:border-[#128c8c]/35 hover:shadow-xl hover:shadow-[#128c8c]/15 md:p-7"
    >
      <div
        className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${accentClass} text-white shadow-md transition duration-300 group-hover/card:scale-105`}
      >
        <Icon size={26} strokeWidth={2.2} />
      </div>
      <h3 className="text-xl font-black leading-snug text-[#0b4f4f]">{step.title}</h3>
      <p className="mt-3 flex-1 text-sm font-semibold leading-7 text-slate-600 md:text-[0.95rem]">
        {step.description}
      </p>
      <div
        className="mt-6 h-1.5 w-16 rounded-full transition-all duration-300 group-hover/card:w-24"
        style={{ backgroundColor: bottomAccent }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

function MobileTimelineStep({ step, index, accentClass, bottomAccent, isLast, timelineActive }) {
  const Icon = STEP_ICONS[index] ?? ClipboardCheck;

  return (
    <motion.li {...fadeUp(0.06 + index * 0.07)} className="relative flex gap-5">
      <div className="relative shrink-0">
        <div
          className={`journey-step-node step-${index + 1} ${timelineActive ? "journey-step-node--active" : ""} relative`}
        >
          <div
            className={`absolute -inset-2 rounded-full bg-gradient-to-br ${accentClass} opacity-20 blur-md`}
            aria-hidden="true"
          />
          <div
            className={`relative z-[1] grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br ${accentClass} text-lg font-black text-white shadow-lg ring-4 ring-[#eef9f4]`}
          >
            {index + 1}
          </div>
        </div>
      </div>
      <article className={`mb-8 flex-1 rounded-[1.75rem] border border-[#49b8c8]/15 bg-white p-6 shadow-lg shadow-[#128c8c]/8 ${isLast ? "mb-0" : ""}`}>
        <div
          className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${accentClass} text-white shadow-md`}
        >
          <Icon size={22} strokeWidth={2.2} />
        </div>
        <h3 className="text-lg font-black text-[#0b4f4f]">{step.title}</h3>
        <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{step.description}</p>
        <div
          className="mt-5 h-1.5 w-14 rounded-full"
          style={{ backgroundColor: bottomAccent }}
          aria-hidden="true"
        />
      </article>
    </motion.li>
  );
}

const JOURNEY_ANIMATION_STYLES = `
  .journey-path-base {
    stroke: rgba(22, 163, 74, 0.22);
    stroke-width: 6;
    fill: none;
    stroke-linecap: round;
  }

  .journey-path-glow {
    stroke: url(#journeyGradient);
    stroke-width: 7;
    fill: none;
    stroke-linecap: round;
    stroke-dasharray: 120 900;
    filter: url(#journeyGlow);
    opacity: 0;
  }

  .journey-roadmap--active .journey-path-glow {
    animation: journeyLightMove 6s ease-in-out infinite;
  }

  .journey-roadmap:hover .journey-path-glow {
    filter: url(#journeyGlowStrong);
  }

  @keyframes journeyLightMove {
    0% {
      stroke-dashoffset: 950;
      opacity: 0;
    }
    8% {
      opacity: 1;
    }
    20% {
      stroke-dashoffset: 760;
    }
    40% {
      stroke-dashoffset: 560;
    }
    60% {
      stroke-dashoffset: 360;
    }
    80% {
      stroke-dashoffset: 160;
    }
    92% {
      opacity: 1;
    }
    100% {
      stroke-dashoffset: -120;
      opacity: 0;
    }
  }

  .journey-step-node::after {
    content: "";
    position: absolute;
    inset: -10px;
    border-radius: 9999px;
    background: rgba(34, 197, 94, 0.25);
    opacity: 0;
    transform: scale(0.7);
    pointer-events: none;
  }

  .journey-roadmap--active .journey-step-node::after,
  .journey-step-node--active::after {
    animation: nodePulse 6s infinite;
  }

  .journey-step-node.step-1::after {
    animation-delay: 0.4s;
  }

  .journey-step-node.step-2::after {
    animation-delay: 1.5s;
  }

  .journey-step-node.step-3::after {
    animation-delay: 2.7s;
  }

  .journey-step-node.step-4::after {
    animation-delay: 3.9s;
  }

  .journey-step-node.step-5::after {
    animation-delay: 5.1s;
  }

  @keyframes nodePulse {
    0%, 12%, 100% {
      opacity: 0;
      transform: scale(0.7);
    }
    5% {
      opacity: 1;
      transform: scale(1.25);
    }
  }

  .mobile-journey-line {
    position: absolute;
    left: 1.65rem;
    top: 1.75rem;
    bottom: 1.75rem;
    width: 4px;
    border-radius: 9999px;
    background: rgba(22, 163, 74, 0.18);
    overflow: hidden;
    transform: translateX(-50%);
  }

  .mobile-journey-line::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 90px;
    border-radius: 9999px;
    background: linear-gradient(to bottom, transparent, #22c55e, #14b8a6, transparent);
    opacity: 0;
  }

  .mobile-journey-timeline--active .mobile-journey-line::after {
    animation: mobileJourneyLight 5.5s ease-in-out infinite;
  }

  @keyframes mobileJourneyLight {
    0% {
      transform: translateY(-100px);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(1000px);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .journey-path-glow,
    .journey-step-node::after,
    .mobile-journey-line::after {
      animation: none !important;
    }

    .journey-roadmap--active .journey-path-glow {
      opacity: 0.65;
      stroke-dashoffset: 0;
    }
  }
`;

export default function ChildJourneyRoadmap({ t, onCtaClick }) {
  const pathRef = useRef(null);
  const mobileTimelineRef = useRef(null);
  const pathInView = useInView(pathRef, { once: true, margin: "-80px" });
  const mobileInView = useInView(mobileTimelineRef, { once: true, margin: "-40px" });
  const imageSrc = SITE_IMAGES.abaTherapy?.hero ?? "/images/aba-therapy-hero-session.jpg";

  return (
    <section
      id="child-journey"
      className="relative scroll-mt-28 overflow-hidden bg-gradient-to-b from-[#f8fcfa] via-white to-[#eef9f4] px-4 py-20 lg:px-8 lg:py-28"
    >
      <style>{JOURNEY_ANIMATION_STYLES}</style>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #49b8c8 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#49b8c8]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#f7c72f]/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-[#128c8c]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div {...fadeUp(0)} className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-[#128c8c]">
              <span aria-hidden="true">{t.eyebrowIcon}</span>
              {t.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-5xl lg:text-[3.35rem]">
              {t.title}
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{t.subtitle}</p>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            className="relative mx-auto hidden w-full max-w-md overflow-hidden rounded-[2rem] shadow-2xl shadow-[#128c8c]/15 ring-1 ring-[#49b8c8]/20 lg:mx-0 lg:ml-auto lg:block lg:max-w-none"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0b4f4f]/25 via-transparent to-[#f7c72f]/10" />
            <img
              src={imageSrc}
              alt={t.imageAlt}
              className="aspect-[4/3] h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Desktop curved roadmap */}
        <div
          ref={pathRef}
          className={`journey-roadmap relative mt-16 hidden h-44 lg:block ${pathInView ? "journey-roadmap--active" : ""}`}
        >
          <svg
            viewBox="0 0 1200 180"
            preserveAspectRatio="none"
            className="journey-svg absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#84cc16" />
                <stop offset="35%" stopColor="#14b8a6" />
                <stop offset="70%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>

              <filter id="journeyGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="journeyGlowStrong" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path className="journey-path-base" d={JOURNEY_PATH} />
            <path className="journey-path-glow" d={JOURNEY_PATH} />
          </svg>

          {NODE_POSITIONS.map((pos, index) => (
            <div
              key={t.steps[index].title}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(pos.x / 1200) * 100}%`,
                top: `${(pos.y / 180) * 100}%`,
              }}
            >
              <JourneyNode
                stepNumber={index + 1}
                accentClass={STEP_ACCENTS[index]}
                delay={0.15 + index * 0.1}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 hidden gap-5 lg:grid lg:grid-cols-5">
          {t.steps.map((step, index) => (
            <JourneyStepCard
              key={step.title}
              step={step}
              index={index}
              accentClass={STEP_ACCENTS[index]}
              bottomAccent={BOTTOM_ACCENTS[index]}
            />
          ))}
        </div>

        {/* Mobile vertical timeline */}
        <ol
          ref={mobileTimelineRef}
          className={`mobile-journey-timeline relative mt-12 lg:hidden ${mobileInView ? "mobile-journey-timeline--active" : ""}`}
        >
          <div className="mobile-journey-line" aria-hidden="true" />
          {t.steps.map((step, index) => (
            <MobileTimelineStep
              key={step.title}
              step={step}
              index={index}
              accentClass={STEP_ACCENTS[index]}
              bottomAccent={BOTTOM_ACCENTS[index]}
              isLast={index === t.steps.length - 1}
              timelineActive={mobileInView}
            />
          ))}
        </ol>

        <motion.div
          {...fadeUp(0.2)}
          className="relative mt-16 overflow-hidden rounded-[2rem] border border-[#49b8c8]/20 bg-gradient-to-br from-white via-[#f8fcfa] to-[#ddf4f4]/60 p-8 text-center shadow-xl shadow-[#128c8c]/10 md:p-12"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#f7c72f]/20 blur-2xl" />
          <p className="mx-auto max-w-2xl text-2xl font-black leading-snug text-[#0b4f4f] md:text-3xl">
            {t.cta.line1}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-lg font-semibold text-slate-600">{t.cta.line2}</p>
          <button
            type="button"
            onClick={onCtaClick}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#1f7a2e] px-8 py-4 text-base font-black text-white shadow-lg shadow-[#1f7a2e]/25 transition hover:bg-[#ff8a1f] hover:shadow-[#ff8a1f]/25"
          >
            {t.cta.button} <ArrowRight size={18} />
          </button>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {t.trustBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[#128c8c]/20 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#0b4f4f] shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
