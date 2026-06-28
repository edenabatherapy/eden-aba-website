"use client";

import { ArrowRight, Phone } from "lucide-react";
import ProviderComplianceNote from "@/components/providers/ProviderComplianceNote";
import { ProviderWhoCanReferGrid } from "@/components/providers/ProviderCardGrids";
import ProviderContactPanel from "@/components/providers/ProviderContactPanel";
import ProviderFAQ from "@/components/providers/ProviderFAQ";
import ProviderHero from "@/components/providers/ProviderHero";
import ProviderPageShell from "@/components/providers/ProviderPageShell";
import ProviderReferralForm from "@/components/providers/ProviderReferralForm";
import ProviderSection from "@/components/providers/ProviderSection";
import { ProviderButton } from "@/components/providers/ProviderButton";
import {
  AUTISM_SCREENING_SUPPORT,
  EDEN_PROVIDER_CONTACT,
  HELPFUL_REFERRAL_DOCUMENTS,
  INSURANCE_INTAKE_COORDINATION,
  PROVIDER_OVERVIEW,
} from "@/lib/providers/provider-content";
import { PROVIDERS_HOME_PATH } from "@/lib/providers/provider-menu-data";
import "./providers-pages.css";

export default function ReferAChildPage() {
  return (
    <ProviderPageShell
      breadcrumbs={[
        { label: "For Providers", href: "/providers" },
        { label: "Refer a Child" },
      ]}
    >
      <ProviderHero
        eyebrow="Provider referral portal"
        title="Refer a Child"
        subtitle="Share referral information with Eden's intake team. A member of our team may contact the family to discuss services, eligibility, and next steps when appropriate."
      >
        <ProviderButton href={EDEN_PROVIDER_CONTACT.phoneHref} variant="secondary">
          <Phone size={16} aria-hidden="true" />
          Call Eden
        </ProviderButton>
      </ProviderHero>

      <ProviderSection
        eyebrow="Overview"
        title={PROVIDER_OVERVIEW.title}
        description="Use this page as Eden's provider referral entry point for phone, fax, email, and structured referral submissions."
        variant="soft"
      >
        <div className="eden-providers-prose">
          {PROVIDER_OVERVIEW.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </ProviderSection>

      <section className="eden-providers-section">
        <div className="eden-providers-section__inner">
          <div className="eden-providers-split">
            <div>
              <header className="eden-providers-section__head">
                <p className="eden-providers-section__eyebrow">Direct referral channels</p>
                <h2 className="eden-providers-section__title">Refer by phone, email, or fax</h2>
                <p className="eden-providers-section__text">
                  You may also refer a child using Eden&apos;s established contact channels. Please include
                  caregiver contact information when available and any relevant clinical context permitted
                  under applicable privacy rules.
                </p>
              </header>

              <ProviderContactPanel />

              <div className="eden-providers-actions eden-providers-actions--spaced">
                <ProviderButton href="/intake" variant="secondary">
                  Family Intake Form
                </ProviderButton>
              </div>
            </div>

            <ProviderReferralForm />
          </div>
        </div>
      </section>

      <ProviderSection
        eyebrow="Referral partners"
        title="Who can refer"
        description="Pediatricians, behavioral health clinicians, schools, allied health professionals, and community partners may refer when families may benefit from ABA services."
      >
        <ProviderWhoCanReferGrid />
      </ProviderSection>

      <ProviderSection
        eyebrow="Referral preparation"
        title="Documents helpful for referral"
        description="Including authorized records and contact details may help Eden begin intake review efficiently."
        variant="muted"
      >
        <ul className="eden-providers-checklist">
          {HELPFUL_REFERRAL_DOCUMENTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ProviderSection>

      <ProviderSection
        eyebrow="Screening support"
        title={AUTISM_SCREENING_SUPPORT.title}
        description={AUTISM_SCREENING_SUPPORT.intro}
        variant="soft"
      >
        <div className="eden-providers-grid eden-providers-grid--2">
          {AUTISM_SCREENING_SUPPORT.points.slice(0, 2).map((point) => (
            <article key={point.title} className="eden-providers-card">
              <h3 className="eden-providers-card__title">{point.title}</h3>
              <p className="eden-providers-card__text">{point.description}</p>
            </article>
          ))}
        </div>
      </ProviderSection>

      <ProviderSection
        eyebrow="Intake coordination"
        title={INSURANCE_INTAKE_COORDINATION.title}
        description={INSURANCE_INTAKE_COORDINATION.intro}
      >
        <ol className="eden-providers-steps-list">
          {INSURANCE_INTAKE_COORDINATION.steps.map((step, index) => (
            <li key={step.title} className="eden-providers-steps-list__item">
              <span className="eden-providers-steps-list__index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="eden-providers-steps-list__title">{step.title}</h3>
                <p className="eden-providers-steps-list__text">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </ProviderSection>

      <ProviderSection eyebrow="FAQ" title="Referral FAQ" variant="muted">
        <ProviderFAQ limit={4} />
        <ProviderComplianceNote />
      </ProviderSection>

      <section className="eden-providers-section eden-providers-section--soft">
        <div className="eden-providers-section__inner">
          <div className="eden-providers-actions">
            <ProviderButton href={PROVIDERS_HOME_PATH} variant="ghost">
              Back to For Providers
              <ArrowRight size={16} aria-hidden="true" />
            </ProviderButton>
          </div>
        </div>
      </section>
    </ProviderPageShell>
  );
}
