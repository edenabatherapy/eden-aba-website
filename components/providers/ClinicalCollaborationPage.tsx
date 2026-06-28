"use client";

import { ArrowRight } from "lucide-react";
import ProviderHero from "@/components/providers/ProviderHero";
import ProviderPageShell from "@/components/providers/ProviderPageShell";
import ProviderSection from "@/components/providers/ProviderSection";
import { ProviderButton } from "@/components/providers/ProviderButton";
import { CLINICAL_COLLABORATION_POINTS } from "@/lib/providers/provider-content";
import {
  PROVIDERS_HOME_PATH,
  PROVIDERS_REFER_CHILD_PATH,
} from "@/lib/providers/provider-menu-data";
import "./providers-pages.css";

export default function ClinicalCollaborationPage() {
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
        title="How Eden collaborates with referring providers"
        description="Collaboration may include school teams, medical providers, therapists, and community partners when families consent to information sharing and when coordination may support treatment goals."
      >
        <div className="eden-providers-grid eden-providers-grid--2">
          {CLINICAL_COLLABORATION_POINTS.map((point) => (
            <article key={point.title} className="eden-providers-card">
              <h3 className="eden-providers-card__title">{point.title}</h3>
              <p className="eden-providers-card__text">{point.description}</p>
            </article>
          ))}
        </div>

        <p className="eden-providers-note">
          Eden does not promise acceptance, specific clinical outcomes, or guaranteed response times.
          Collaboration depends on authorization, clinical appropriateness, and applicable privacy rules.
        </p>

        <div className="eden-providers-actions eden-providers-actions--spaced">
          <ProviderButton href={PROVIDERS_REFER_CHILD_PATH}>Refer a Child</ProviderButton>
          <ProviderButton href={PROVIDERS_HOME_PATH} variant="secondary">
            Back to For Providers
            <ArrowRight size={16} aria-hidden="true" />
          </ProviderButton>
        </div>
      </ProviderSection>
    </ProviderPageShell>
  );
}
