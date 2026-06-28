"use client";

import { ArrowRight } from "lucide-react";
import ProviderComplianceNote from "@/components/providers/ProviderComplianceNote";
import ProviderFAQ from "@/components/providers/ProviderFAQ";
import ProviderHero from "@/components/providers/ProviderHero";
import ProviderPageShell from "@/components/providers/ProviderPageShell";
import ProviderSection from "@/components/providers/ProviderSection";
import ProviderWorkflowTimeline from "@/components/providers/ProviderWorkflowTimeline";
import { ProviderButton } from "@/components/providers/ProviderButton";
import {
  FAMILY_COMMUNICATION_WORKFLOW,
  HELPFUL_REFERRAL_DOCUMENTS,
  INSURANCE_INTAKE_COORDINATION,
  PROVIDER_OVERVIEW,
} from "@/lib/providers/provider-content";
import {
  PROVIDERS_HOME_PATH,
  PROVIDERS_REFER_CHILD_PATH,
} from "@/lib/providers/provider-menu-data";
import "./providers-pages.css";

export default function ReferralProcessPage() {
  return (
    <ProviderPageShell
      breadcrumbs={[
        { label: "For Providers", href: "/providers" },
        { label: "Referral Process" },
      ]}
    >
      <ProviderHero
        eyebrow="Referral process"
        title="Referral Process"
        subtitle="A clear, professional workflow from referral receipt through family contact, eligibility review, and care planning when services may be appropriate."
      >
        <ProviderButton href={PROVIDERS_REFER_CHILD_PATH}>Make a Referral</ProviderButton>
      </ProviderHero>

      <ProviderSection
        eyebrow="Overview"
        title={PROVIDER_OVERVIEW.title}
        description={PROVIDER_OVERVIEW.paragraphs[1]}
        variant="soft"
      >
        <div className="eden-providers-prose">
          <p>{PROVIDER_OVERVIEW.paragraphs[2]}</p>
        </div>
      </ProviderSection>

      <ProviderSection
        eyebrow="Referral workflow"
        title="What happens after referral"
        description="Each step below may vary based on family availability, authorization requirements, and clinical complexity."
      >
        <ProviderWorkflowTimeline showDetail />
      </ProviderSection>

      <ProviderSection
        eyebrow="Intake coordination"
        title={INSURANCE_INTAKE_COORDINATION.title}
        description={INSURANCE_INTAKE_COORDINATION.intro}
        variant="muted"
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

      <ProviderSection
        eyebrow="Family communication"
        title="Family communication workflow"
        description="Eden may guide families through intake with transparent expectations about possible next steps."
      >
        <ol className="eden-providers-steps-list">
          {FAMILY_COMMUNICATION_WORKFLOW.map((step, index) => (
            <li key={step.step} className="eden-providers-steps-list__item">
              <span className="eden-providers-steps-list__index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="eden-providers-steps-list__title">{step.step}</h3>
                <p className="eden-providers-steps-list__text">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </ProviderSection>

      <ProviderSection
        eyebrow="Referral preparation"
        title="Documents helpful for referral"
        description="Providing authorized records at referral may reduce follow-up requests and support timely intake review."
        variant="soft"
      >
        <ul className="eden-providers-checklist">
          {HELPFUL_REFERRAL_DOCUMENTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ProviderSection>

      <ProviderSection eyebrow="FAQ" title="Referral process FAQ">
        <ProviderFAQ limit={5} />
        <ProviderComplianceNote />
        <p className="eden-providers-note">
          Timelines may vary based on family availability, authorization requirements, and clinical
          complexity. Eden does not guarantee immediate openings, diagnosis, or insurance approval.
        </p>
      </ProviderSection>

      <section className="eden-providers-section eden-providers-section--soft">
        <div className="eden-providers-section__inner">
          <div className="eden-providers-actions eden-providers-actions--spaced">
            <ProviderButton href={PROVIDERS_REFER_CHILD_PATH}>Make a Referral</ProviderButton>
            <ProviderButton href={PROVIDERS_HOME_PATH} variant="secondary">
              Back to For Providers
              <ArrowRight size={16} aria-hidden="true" />
            </ProviderButton>
          </div>
        </div>
      </section>
    </ProviderPageShell>
  );
}
