"use client";

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
import { HOME_INSURANCE_LOGOS } from "@/lib/home-insurance-logos";

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
    disclaimer?: string;
  };
};

type InsuranceSupportSectionProps = {
  t: InsuranceSupportContent;
  onVerify: () => void;
  onTalkToTeam: () => void;
};

export default function InsuranceSupportSection({ t, onVerify, onTalkToTeam }: InsuranceSupportSectionProps) {
  const benefits = t.benefits ?? [];
  const steps = t.processSteps ?? [];
  const tickerPlans = HOME_INSURANCE_LOGOS.map((plan) => plan.name);
  const tickerItems = [...tickerPlans, ...tickerPlans];

  return (
    <section
      id="insurance-support"
      className="eden-insurance-final scroll-mt-28"
      aria-labelledby="homepage-insurance-heading"
    >
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
              {t.toolbox?.headline ?? "Plans we can help review"}
            </h3>
            <p className="eden-insurance-ticker__subtitle">
              {t.toolbox?.subheadline ?? t.toolbox?.disclaimer}
            </p>

            <div className="eden-insurance-ticker__viewport" aria-label="Insurance plans Eden ABA Therapy can help review">
              <div className="eden-insurance-ticker__track">
                {tickerItems.map((name, index) => (
                  <div key={`${name}-${index}`} className="eden-insurance-ticker__item">
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
