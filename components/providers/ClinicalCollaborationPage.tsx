"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { ArrowRight } from "lucide-react";
import ProviderComplianceNote from "@/components/providers/ProviderComplianceNote";
import ProviderFAQ from "@/components/providers/ProviderFAQ";
import ProviderHero from "@/components/providers/ProviderHero";
import ProviderPageShell from "@/components/providers/ProviderPageShell";
import ProviderSection from "@/components/providers/ProviderSection";
import { ProviderButton } from "@/components/providers/ProviderButton";
import {
  CLINICAL_COLLABORATION_POINTS,
  FAMILY_COMMUNICATION_WORKFLOW,
  SCHOOL_IEP_COORDINATION,
} from "@/lib/providers/provider-content";
import {
  PROVIDERS_HOME_PATH,
  PROVIDERS_REFER_CHILD_PATH,
} from "@/lib/providers/provider-menu-data";
import "./providers-pages.css";

export default function ClinicalCollaborationPage() {
  const clinicalCollaborationPoints = useLocalizedContent("CLINICAL_COLLABORATION_POINTS", CLINICAL_COLLABORATION_POINTS);
  const familyCommunicationWorkflow = useLocalizedContent("FAMILY_COMMUNICATION_WORKFLOW", FAMILY_COMMUNICATION_WORKFLOW);
  const schoolIepCoordination = useLocalizedContent("SCHOOL_IEP_COORDINATION", SCHOOL_IEP_COORDINATION);

  return (
    <ProviderPageShell
      breadcrumbs={[
        { label: "For Providers", href: "/providers" },
        { label: "Clinical Collaboration" },
      ]}
    >
      <ProviderHero
        eyebrow="Clinical collaboration"
        title="Clinical Collaboration"
        subtitle="Eden may support care coordination with referring providers when appropriate, authorized, and clinically relevant for the child and family."
      >
        <ProviderButton href={PROVIDERS_REFER_CHILD_PATH}>Refer a Child</ProviderButton>
      </ProviderHero>

      <ProviderSection
        eyebrow="Coordination"
        title="Clinical collaboration with consent"
        description="Collaboration may include school teams, medical providers, therapists, and community partners when families consent to information sharing and when coordination may support treatment goals."
      >
        <div className="eden-providers-grid eden-providers-grid--2">
          {clinicalCollaborationPoints.map((point) => (
            <article key={point.title} className="eden-providers-card">
              <h3 className="eden-providers-card__title">{point.title}</h3>
              <p className="eden-providers-card__text">{point.description}</p>
            </article>
          ))}
        </div>
      </ProviderSection>

      <ProviderSection
        eyebrow="School coordination"
        title={schoolIepCoordination.title}
        description={schoolIepCoordination.intro}
        variant="muted"
      >
        <ul className="eden-providers-checklist">
          {schoolIepCoordination.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="eden-providers-actions eden-providers-actions--spaced">
          <ProviderButton href="/services/school-based-aba-therapy" variant="secondary">
            School-based ABA services
          </ProviderButton>
        </div>
      </ProviderSection>

      <ProviderSection
        eyebrow="Family communication"
        title="Family communication workflow"
        description="With consent, Eden may provide referring partners coordination updates when clinically appropriate and authorized."
        variant="soft"
      >
        <ol className="eden-providers-steps-list">
          {familyCommunicationWorkflow.map((step, index) => (
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

      <ProviderSection eyebrow="FAQ" title="Collaboration FAQ">
        <ProviderFAQ limit={4} />
        <ProviderComplianceNote />
        <p className="eden-providers-note">
          Eden does not promise acceptance, specific clinical outcomes, or guaranteed response times.
          Collaboration depends on authorization, clinical appropriateness, and applicable privacy rules.
        </p>
      </ProviderSection>

      <section className="eden-providers-section eden-providers-section--soft">
        <div className="eden-providers-section__inner">
          <div className="eden-providers-actions eden-providers-actions--spaced">
            <ProviderButton href={PROVIDERS_REFER_CHILD_PATH}>Refer a Child</ProviderButton>
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
