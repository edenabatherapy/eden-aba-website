"use client";

import Link from "next/link";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { getButtonClasses } from "@/lib/button-styles";
import CrystalLightAmbient, { getCrystalLightSectionClass } from "@/components/crystal-light/CrystalLightAmbient";
import EdenStage10AnimatedLogo from "@/components/eden-logo/EdenStage10AnimatedLogo";
import { FAMILY_COMMITMENT_CONTENT } from "@/lib/home/family-commitment-content";
import "./FamilyCommitmentSection.css";

type FamilyCommitmentSectionProps = {
  copy: {
    startABA: string;
    verifyInsurance: string;
  };
  onStart: () => void;
  onVerifyInsurance: () => void;
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const headerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
};

const headerEyebrow = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

const headerTitle = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

const headerUnderline = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.65, ease: EASE_OUT, delay: 0.12 },
  },
};

const headerIntro = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

const cardContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export default function FamilyCommitmentSection({
  copy,
  onStart,
  onVerifyInsurance,
}: FamilyCommitmentSectionProps) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, intro, cards, banner, approachCta } = FAMILY_COMMITMENT_CONTENT;

  const viewport = { once: true, margin: "-60px" as const };
  const motionProps = reduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport,
      };

  return (
    <section
      className={`eden-commitment-section ${getCrystalLightSectionClass("dark-emerald")} px-4 py-16 sm:py-20 lg:px-8 lg:py-24`}
      aria-labelledby="family-commitment-heading"
    >
      <CrystalLightAmbient preset="dark-emerald" />

      <div className="eden-commitment-inner crystal-light-inner mx-auto max-w-7xl">
        <div className="eden-commitment-hero">
          <motion.header
            className="eden-commitment-header eden-commitment-hero__copy"
            variants={headerContainer}
            {...motionProps}
          >
            <motion.div className="eden-commitment-eyebrow" variants={headerEyebrow}>
              <span className="eden-commitment-eyebrow__line" aria-hidden="true" />
              {eyebrow}
              <Heart size={14} className="text-teal-300/80" aria-hidden="true" />
            </motion.div>

            <motion.h2
              id="family-commitment-heading"
              className="eden-commitment-title"
              variants={headerTitle}
            >
              {title}
              <motion.span
                className="eden-commitment-title__underline"
                variants={headerUnderline}
                aria-hidden="true"
              />
            </motion.h2>

            <motion.p className="eden-commitment-intro" variants={headerIntro}>
              {intro}
            </motion.p>
          </motion.header>

          <div className="eden-commitment-hero__logo">
            <EdenStage10AnimatedLogo />
          </div>
        </div>

        <motion.div
          className="eden-commitment-grid mt-12 sm:mt-14 lg:mt-16"
          variants={cardContainer}
          {...motionProps}
        >
          {cards.map(({ id, title: cardTitle, description, Icon }) => (
            <motion.article
              key={id}
              className="eden-commitment-card"
              variants={cardItem}
            >
              <div className="eden-commitment-card__shine" aria-hidden="true" />
              <div className="eden-commitment-card__icon-wrap">
                <span className="eden-commitment-card__icon-glow" aria-hidden="true" />
                <span className="eden-commitment-card__icon">
                  <Icon size={22} strokeWidth={2} aria-hidden="true" />
                </span>
              </div>
              <h3 className="eden-commitment-card__title">{cardTitle}</h3>
              <p className="eden-commitment-card__text">{description}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="eden-commitment-banner"
          variants={fadeUp}
          {...motionProps}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
        >
          <div className="eden-commitment-banner__shimmer" aria-hidden="true" />
          <div className="eden-commitment-banner__icon-wrap" aria-hidden="true">
            <span className="eden-commitment-banner__icon-glow" />
            <span className="eden-commitment-banner__icon">
              <Sparkles size={20} strokeWidth={2} />
            </span>
          </div>
          <p className="eden-commitment-banner__title">{banner.title}</p>
          <p className="eden-commitment-banner__text">{banner.description}</p>
        </motion.div>

        <motion.div
          className="eden-commitment-actions mt-8 sm:mt-10"
          variants={fadeUp}
          {...motionProps}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.22 }}
        >
          <Link
            href="/about/our-approach"
            className="eden-commitment-approach-btn"
          >
            <span className="eden-commitment-approach-btn__shine" aria-hidden="true" />
            <span className="eden-commitment-approach-btn__label">{approachCta}</span>
            <ArrowRight size={18} className="eden-commitment-approach-btn__icon" aria-hidden="true" />
          </Link>

          <div className="eden-commitment-actions__secondary">
            <button type="button" onClick={onStart} className={getButtonClasses("primarySite", "", "sm")}>
              {copy.startABA} <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onVerifyInsurance}
              className={getButtonClasses("secondarySite", "", "sm")}
            >
              {copy.verifyInsurance}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
