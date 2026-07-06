"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Brain,
  ClipboardCheck,
  Heart,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import CrystalLightAmbient, { getCrystalLightSectionClass } from "@/components/crystal-light/CrystalLightAmbient";
import "./ChildJourneyRoadmap.css";

const JOURNEY_IMAGE_SRC = "/images/clinical-milestones-journey-girl.jpg";
const JOURNEY_IMAGE_WIDTH = 1024;
const JOURNEY_IMAGE_HEIGHT = 682;

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

const fadeUp = (delay = 0, reduceMotion = false) =>
  reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
      };

function JourneyNode({ stepNumber, accentClass, delay = 0, reduceMotion = false }) {
  return (
    <motion.div
      {...fadeUp(delay, reduceMotion)}
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

function JourneyStepCard({ step, index, accentClass, bottomAccent, reduceMotion = false }) {
  const Icon = STEP_ICONS[index] ?? ClipboardCheck;

  return (
    <motion.article
      {...fadeUp(0.08 + index * 0.08, reduceMotion)}
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

function MobileTimelineStep({ step, index, accentClass, bottomAccent, isLast, timelineActive, reduceMotion = false }) {
  const Icon = STEP_ICONS[index] ?? ClipboardCheck;

  return (
    <motion.li {...fadeUp(0.06 + index * 0.07, reduceMotion)} className="relative flex gap-5">
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

export default function ChildJourneyRoadmap({ t, onCtaClick }) {
  const pathRef = useRef(null);
  const mobileTimelineRef = useRef(null);
  const imageWrapRef = useRef(null);
  const pathInView = useInView(pathRef, { once: true, margin: "-80px" });
  const mobileInView = useInView(mobileTimelineRef, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [10, -10],
  );

  return (
    <section
      id="child-journey"
      className={`child-journey-section ${getCrystalLightSectionClass("light-mint")} relative overflow-hidden px-4 lg:px-8`}
    >
      <CrystalLightAmbient preset="light-mint" />

      <div className="crystal-light-inner relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div {...fadeUp(0, reduceMotion)} className="max-w-2xl">
            <p className="child-journey-eyebrow">
              <span aria-hidden="true">{t.eyebrowIcon}</span>
              {t.eyebrow}
            </p>
            <h2 className="child-journey-title">{t.title}</h2>
            <p className="child-journey-subtitle">{t.subtitle}</p>
          </motion.div>

          <motion.div
            ref={imageWrapRef}
            {...fadeUp(0.1, reduceMotion)}
            className="child-journey-image-wrap crystal-light-border-glow ring-1 ring-[#49b8c8]/20"
          >
            <div className="child-journey-image-glow" aria-hidden="true" />
            <motion.div style={{ y: parallaxY }} className="child-journey-image-parallax">
              <div
                className={`child-journey-image-inner${reduceMotion ? "" : " child-journey-image-inner--float"}`}
              >
                <Image
                  src={JOURNEY_IMAGE_SRC}
                  alt={t.imageAlt}
                  width={JOURNEY_IMAGE_WIDTH}
                  height={JOURNEY_IMAGE_HEIGHT}
                  sizes="(max-width: 1023px) 100vw, 48vw"
                  className="child-journey-image"
                  loading="lazy"
                  quality={90}
                />
              </div>
            </motion.div>
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
                reduceMotion={reduceMotion}
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
              reduceMotion={reduceMotion}
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
              reduceMotion={reduceMotion}
            />
          ))}
        </ol>

        <motion.div
          {...fadeUp(0.2, reduceMotion)}
          className="child-journey-cta crystal-light-border-glow"
        >
          <p className="child-journey-cta__line1">{t.cta.line1}</p>
          <p className="child-journey-cta__line2">{t.cta.line2}</p>
          <button
            type="button"
            onClick={onCtaClick}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#1f7a2e] px-8 py-4 text-base font-black text-white shadow-lg shadow-[#1f7a2e]/25 transition hover:bg-[#ff8a1f] hover:shadow-[#ff8a1f]/25"
          >
            {t.cta.button} <ArrowRight size={18} />
          </button>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {t.trustBadges.map((badge) => (
              <span key={badge} className="child-journey-trust-badge">
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
