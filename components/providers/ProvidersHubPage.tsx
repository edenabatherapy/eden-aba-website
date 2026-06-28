"use client";

import { ArrowRight, Phone } from "lucide-react";
import ProviderComplianceNote from "@/components/providers/ProviderComplianceNote";
import { ProviderResourceGrid, ProviderServiceGrid, ProviderWhoCanReferGrid } from "@/components/providers/ProviderCardGrids";
import ProviderContactPanel from "@/components/providers/ProviderContactPanel";
import ProviderHero from "@/components/providers/ProviderHero";
import ProviderPageShell from "@/components/providers/ProviderPageShell";
import ProviderReferralChannels from "@/components/providers/ProviderReferralChannels";
import ProviderSection from "@/components/providers/ProviderSection";
import ProviderTrustBand from "@/components/providers/ProviderTrustBand";
import ProviderWorkflowTimeline from "@/components/providers/ProviderWorkflowTimeline";
import { ProviderButton } from "@/components/providers/ProviderButton";
import {
  CENTRALREACH_LOGIN_URL,
  CLINICAL_COLLABORATION_POINTS,
  EDEN_PROVIDER_CONTACT,
} from "@/lib/providers/provider-content";
import {
  PROVIDERS_CLINICAL_COLLAB_PATH,
  PROVIDERS_REFER_CHILD_PATH,
  PROVIDERS_REFERRAL_PROCESS_PATH,
} from "@/lib/providers/provider-menu-data";
import "./providers-pages.css";

export default function ProvidersHubPage() {
  return (
    <ProviderPageShell
      breadcrumbs={[
        { label: "For Providers", href: "/providers" },
        { label: "Overview" },
      ]}
    >
      <ProviderHero
        eyebrow="For Providers"
        title="Refer a Child to Eden ABA Therapy"
        subtitle="Partner with Eden ABA Therapy to help families access compassionate, evidence-informed ABA services across Northern Virginia."
      >
        <ProviderButton href={PROVIDERS_REFER_CHILD_PATH}>
          Make a Referral
          <ArrowRight size={16} aria-hidden="true" />
        </ProviderButton>
        <ProviderButton href={EDEN_PROVIDER_CONTACT.phoneHref} variant="secondary">
          <Phone size={16} aria-hidden="true" />
          Call Eden
        </ProviderButton>
        <ProviderButton href={CENTRALREACH_LOGIN_URL} variant="ghost" external>
          CentralReach Staff Login
        </ProviderButton>
      </ProviderHero>

      <ProviderTrustBand />

      <ProviderSection
        id="who-can-refer"
        eyebrow="Referral partners"
        title="Who can refer"
        description="Eden welcomes referrals from medical, educational, and community professionals supporting children and families in Northern Virginia."
        variant="soft"
      >
        <ProviderWhoCanReferGrid />
      </ProviderSection>

      <ProviderSection
        id="referral-options"
        eyebrow="Referral options"
        title="How to refer a child"
        description="Choose the referral channel that best fits your workflow. Eden may follow up with the family when contact information is available and when services may be appropriate."
      >
        <ProviderReferralChannels />
        <ProviderContactPanel />
        <div className="eden-providers-actions eden-providers-actions--spaced">
          <ProviderButton href={PROVIDERS_REFER_CHILD_PATH}>Make a Referral</ProviderButton>
          <ProviderButton href="/intake" variant="secondary">
            Family Intake Form
          </ProviderButton>
        </div>
        <ProviderComplianceNote />
      </ProviderSection>

      <ProviderSection
        id="referral-workflow"
        eyebrow="Referral workflow"
        title="What happens after a referral"
        description="Eden uses a structured intake process designed to respect families while supporting timely communication with referring partners when appropriate."
        variant="muted"
      >
        <ProviderWorkflowTimeline />
        <div className="eden-providers-actions eden-providers-actions--spaced">
          <ProviderButton href={PROVIDERS_REFERRAL_PROCESS_PATH} variant="secondary">
            View full referral process
          </ProviderButton>
        </div>
      </ProviderSection>

      <ProviderSection
        id="eden-services"
        eyebrow="Services"
        title="Eden services for referred families"
        description="Referred families may access a range of evidence-informed services when clinically appropriate and authorized."
      >
        <ProviderServiceGrid />
      </ProviderSection>

      <ProviderSection
        id="clinical-collaboration"
        eyebrow="Clinical collaboration"
        title="Coordinated care with referring providers"
        description="Eden may support care coordination with referring providers when appropriate and with proper consent. Communication practices are designed to be HIPAA-conscious."
        variant="soft"
      >
        <div className="eden-providers-grid eden-providers-grid--2">
          {CLINICAL_COLLABORATION_POINTS.map((point) => (
            <article key={point.title} className="eden-providers-card">
              <h3 className="eden-providers-card__title">{point.title}</h3>
              <p className="eden-providers-card__text">{point.description}</p>
            </article>
          ))}
        </div>
        <div className="eden-providers-actions eden-providers-actions--spaced">
          <ProviderButton href={PROVIDERS_CLINICAL_COLLAB_PATH}>Learn about clinical collaboration</ProviderButton>
        </div>
      </ProviderSection>

      <ProviderSection
        id="provider-resources"
        eyebrow="Resources"
        title="Provider resources"
        description="Helpful Eden resources you may share with families and care teams during the referral process."
      >
        <ProviderResourceGrid />
      </ProviderSection>
    </ProviderPageShell>
  );
}
