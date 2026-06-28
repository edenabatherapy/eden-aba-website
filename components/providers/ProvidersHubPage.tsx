"use client";

import { ArrowRight, Phone } from "lucide-react";
import ProviderComplianceNote from "@/components/providers/ProviderComplianceNote";
import { ProviderResourceGrid, ProviderServiceGrid, ProviderWhoCanReferGrid } from "@/components/providers/ProviderCardGrids";
import ProviderContactPanel from "@/components/providers/ProviderContactPanel";
import ProviderFAQ from "@/components/providers/ProviderFAQ";
import ProviderHero from "@/components/providers/ProviderHero";
import ProviderPageShell from "@/components/providers/ProviderPageShell";
import ProviderReferralChannels from "@/components/providers/ProviderReferralChannels";
import ProviderSection from "@/components/providers/ProviderSection";
import ProviderTrustBand from "@/components/providers/ProviderTrustBand";
import ProviderWorkflowTimeline from "@/components/providers/ProviderWorkflowTimeline";
import { ProviderButton } from "@/components/providers/ProviderButton";
import {
  AUTISM_SCREENING_SUPPORT,
  CENTRALREACH_LOGIN_URL,
  CLINICAL_COLLABORATION_POINTS,
  EDEN_PROVIDER_CONTACT,
  FAMILY_COMMUNICATION_WORKFLOW,
  HELPFUL_REFERRAL_DOCUMENTS,
  INSURANCE_INTAKE_COORDINATION,
  PROVIDER_HUB_SECTION_IDS,
  PROVIDER_OVERVIEW,
  SCHOOL_IEP_COORDINATION,
  WHEN_TO_CONSIDER_ABA_REFERRAL,
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
        id={PROVIDER_HUB_SECTION_IDS.overview}
        eyebrow="Overview"
        title={PROVIDER_OVERVIEW.title}
        description={PROVIDER_OVERVIEW.paragraphs[0]}
        variant="soft"
      >
        <div className="eden-providers-prose">
          {PROVIDER_OVERVIEW.paragraphs.slice(1).map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </ProviderSection>

      <ProviderSection
        id={PROVIDER_HUB_SECTION_IDS.whoCanRefer}
        eyebrow="Referral partners"
        title="Who can refer"
        description="Eden welcomes referrals from medical, educational, and community professionals supporting children and families in Northern Virginia."
      >
        <ProviderWhoCanReferGrid />
      </ProviderSection>

      <ProviderSection
        id={PROVIDER_HUB_SECTION_IDS.whenToRefer}
        eyebrow="Clinical guidance"
        title="When to consider an ABA referral"
        description="Referrals may be appropriate when developmental concerns persist, families request ABA exploration, or interdisciplinary teams identify goals that may benefit from behavioral support."
        variant="muted"
      >
        <div className="eden-providers-grid eden-providers-grid--2">
          {WHEN_TO_CONSIDER_ABA_REFERRAL.map((item) => (
            <article key={item.title} className="eden-providers-card">
              <h3 className="eden-providers-card__title">{item.title}</h3>
              <p className="eden-providers-card__text">{item.description}</p>
            </article>
          ))}
        </div>
      </ProviderSection>

      <ProviderSection
        id={PROVIDER_HUB_SECTION_IDS.documents}
        eyebrow="Referral preparation"
        title="Documents helpful for referral"
        description="Including the following information may help Eden respond efficiently. Share only records the family has authorized."
      >
        <ul className="eden-providers-checklist">
          {HELPFUL_REFERRAL_DOCUMENTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="eden-providers-actions eden-providers-actions--spaced">
          <ProviderButton href={PROVIDERS_REFER_CHILD_PATH}>Submit a referral</ProviderButton>
        </div>
      </ProviderSection>

      <ProviderSection
        id={PROVIDER_HUB_SECTION_IDS.screening}
        eyebrow="Screening support"
        title={AUTISM_SCREENING_SUPPORT.title}
        description={AUTISM_SCREENING_SUPPORT.intro}
        variant="soft"
      >
        <div className="eden-providers-grid eden-providers-grid--2">
          {AUTISM_SCREENING_SUPPORT.points.map((point) => (
            <article key={point.title} className="eden-providers-card">
              <h3 className="eden-providers-card__title">{point.title}</h3>
              <p className="eden-providers-card__text">{point.description}</p>
            </article>
          ))}
        </div>
        <div className="eden-providers-actions eden-providers-actions--spaced">
          <ProviderButton href={AUTISM_SCREENING_SUPPORT.resourceHref} variant="secondary">
            Learn about screening & evaluation
          </ProviderButton>
        </div>
      </ProviderSection>

      <ProviderSection
        id={PROVIDER_HUB_SECTION_IDS.insurance}
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
        <div className="eden-providers-actions eden-providers-actions--spaced">
          <ProviderButton href={INSURANCE_INTAKE_COORDINATION.resourceHref} variant="secondary">
            Insurance coverage information
          </ProviderButton>
        </div>
      </ProviderSection>

      <ProviderSection
        id="referral-options"
        eyebrow="Referral options"
        title="How to refer a child"
        description="Choose the referral channel that best fits your workflow. Eden may follow up with the family when contact information is available and when services may be appropriate."
        variant="soft"
      >
        <ProviderReferralChannels />
        <ProviderContactPanel />
        <div className="eden-providers-actions eden-providers-actions--spaced">
          <ProviderButton href={PROVIDERS_REFER_CHILD_PATH}>Make a Referral</ProviderButton>
          <ProviderButton href="/intake" variant="secondary">
            Family Intake Form
          </ProviderButton>
        </div>
      </ProviderSection>

      <ProviderSection
        id={PROVIDER_HUB_SECTION_IDS.collaboration}
        eyebrow="Clinical collaboration"
        title="Clinical collaboration with consent"
        description="Eden may support care coordination with referring providers when appropriate and with proper consent. Communication practices are designed to be HIPAA-conscious."
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
        id={PROVIDER_HUB_SECTION_IDS.schoolIep}
        eyebrow="School coordination"
        title={SCHOOL_IEP_COORDINATION.title}
        description={SCHOOL_IEP_COORDINATION.intro}
        variant="muted"
      >
        <ul className="eden-providers-checklist">
          {SCHOOL_IEP_COORDINATION.points.map((point) => (
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
        id={PROVIDER_HUB_SECTION_IDS.familyComm}
        eyebrow="Family communication"
        title="Family communication workflow"
        description="Eden may guide families through intake with clear expectations while respecting privacy and authorization requirements."
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
        id={PROVIDER_HUB_SECTION_IDS.afterReferral}
        eyebrow="Referral workflow"
        title="What happens after referral"
        description="Eden uses a structured intake process designed to respect families while supporting timely communication with referring partners when appropriate."
        variant="soft"
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
        id="provider-resources"
        eyebrow="Resources"
        title="Provider resources"
        description="Helpful Eden resources you may share with families and care teams during the referral process."
        variant="muted"
      >
        <ProviderResourceGrid />
      </ProviderSection>

      <ProviderSection
        id={PROVIDER_HUB_SECTION_IDS.faq}
        eyebrow="FAQ"
        title="Provider FAQ"
        description="Common questions from referring partners about referrals, collaboration, insurance, and intake."
      >
        <ProviderFAQ />
      </ProviderSection>

      <ProviderSection
        id={PROVIDER_HUB_SECTION_IDS.compliance}
        eyebrow="Compliance"
        title="Compliance note"
        variant="soft"
      >
        <ProviderComplianceNote />
      </ProviderSection>
    </ProviderPageShell>
  );
}
