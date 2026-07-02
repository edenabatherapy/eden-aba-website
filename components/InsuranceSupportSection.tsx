"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  CircleDollarSign,
  ClipboardList,
  MessageCircle,
  Phone,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { HOMEPAGE_INSURANCE_LOGOS, type HomepageInsuranceLogo } from "@/lib/insurance/homepage-insurance-logos";

const BENEFIT_ICONS = [ShieldCheck, ClipboardList, CircleDollarSign, Users];
const STEP_ICONS = [ClipboardList, ShieldCheck, MessageCircle];

export type InsuranceSupportContent = {
  eyebrow?: string;
  headlineBefore?: string;
  headlineAccent?: string;
  headlineAfter?: string;
  intro?: string;
  benefits?: Array<{ title: string; description: string }>;
  verifyCta?: string;
  talkCta?: string;
  trustNote?: string;
  processTitle?: string;
  processSubtitle?: string;
  processSteps?: Array<{ title: string; description: string }>;
  toolbox?: {
    headline?: string;
    subheadline?: string;
    description?: string;
    disclaimer?: string;
    medicaidLabel?: string;
    commercialLabel?: string;
  };
};

type InsuranceSupportSectionProps = {
  t: InsuranceSupportContent;
  onVerify: () => void;
  onTalkToTeam: () => void;
};

function InsuranceLogoCard({ logo, index }: { logo: HomepageInsuranceLogo; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
      className="eden-insurance-ticker__logo-item"
    >
      <article className="eden-insurance-ticker__logo-card" aria-label={logo.name}>
        <Image
          src={logo.src}
          alt={`${logo.name} logo`}
          width={220}
          height={80}
          className="eden-insurance-ticker__logo-image"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
        />
      </article>
    </motion.li>
  );
}

export default function InsuranceSupportSection({ t, onVerify, onTalkToTeam }: InsuranceSupportSectionProps) {
  const benefits = t.benefits ?? [];
  const steps = t.processSteps ?? [];

  return (
    <section
      id="insurance-support"
      className="eden-insurance-final scroll-mt-28"
      aria-labelledby="homepage-insurance-heading"
    >
      <div className="eden-insurance-final__bg-glow" aria-hidden="true" />
      <div className="eden-insurance-final__shell">
        <div className="eden-insurance-final__panel">
          <div className="eden-insurance-final__grid">
            <div className="min-w-0">
              <span className="eden-insurance-final__badge">
                <Shield size={14} aria-hidden="true" />
                {t.eyebrow}
              </span>

              <h2 id="homepage-insurance-heading" className="eden-insurance-final__title">
                {t.headlineBefore} <em>{t.headlineAccent}</em> {t.headlineAfter}
              </h2>

              <p className="eden-insurance-final__copy">{t.intro}</p>

              <div className="eden-insurance-final__features">
                {benefits.map((benefit, index) => {
                  const Icon = BENEFIT_ICONS[index] ?? ShieldCheck;
                  return (
                    <article key={benefit.title} className="eden-insurance-feature">
                      <div className="eden-insurance-feature__icon">
                        <Icon size={22} strokeWidth={2.2} aria-hidden="true" />
                      </div>
                      <strong>{benefit.title}</strong>
                      <p>{benefit.description}</p>
                    </article>
                  );
                })}
              </div>

              <div className="eden-insurance-final__actions">
                <button type="button" onClick={onVerify} className="eden-insurance-btn eden-insurance-btn--primary">
                  {t.verifyCta}
                </button>
                <button
                  type="button"
                  onClick={onTalkToTeam}
                  className="eden-insurance-btn eden-insurance-btn--secondary"
                >
                  <Phone size={18} aria-hidden="true" />
                  {t.talkCta}
                </button>
              </div>

              <p className="eden-insurance-final__note">
                <ShieldCheck size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                {t.trustNote}
              </p>
            </div>

            <aside className="eden-insurance-process" aria-labelledby="eden-insurance-process-heading">
              <span className="eden-insurance-process__light" aria-hidden="true" />
              <h3 id="eden-insurance-process-heading">{t.processTitle}</h3>
              {t.processSubtitle ? (
                <p className="sr-only">{t.processSubtitle}</p>
              ) : null}

              <div className="eden-insurance-process__steps">
                {steps.map((step, index) => {
                  const Icon = STEP_ICONS[index] ?? ClipboardList;
                  return (
                    <article key={step.title} className="eden-process-step">
                      <span className="eden-process-step__num">{index + 1}</span>
                      <div className="eden-process-step__icon">
                        <Icon size={24} strokeWidth={2.1} aria-hidden="true" />
                      </div>
                      <div>
                        <strong>{step.title}</strong>
                        <p>{step.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </aside>
          </div>

          <div className="eden-insurance-ticker" aria-labelledby="eden-insurance-ticker-heading">
            <h3 id="eden-insurance-ticker-heading" className="eden-insurance-ticker__title">
              <Sparkles size={20} className="eden-insurance-ticker__spark" aria-hidden="true" />
              {t.toolbox?.headline ?? "Accepted Insurance"}
            </h3>
            <p className="eden-insurance-ticker__subtitle">{t.toolbox?.subheadline}</p>
            {t.toolbox?.description ? (
              <p className="eden-insurance-ticker__description">{t.toolbox.description}</p>
            ) : null}

            <ul className="eden-insurance-ticker__logo-grid" aria-label="Accepted insurance plans">
              {HOMEPAGE_INSURANCE_LOGOS.map((logo, index) => (
                <InsuranceLogoCard key={logo.id} logo={logo} index={index} />
              ))}
            </ul>

            {t.toolbox?.disclaimer ? (
              <p className="eden-insurance-ticker__disclaimer">{t.toolbox.disclaimer}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
