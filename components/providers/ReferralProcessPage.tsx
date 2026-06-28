"use client";

import { ArrowRight } from "lucide-react";
import ProviderComplianceNote from "@/components/providers/ProviderComplianceNote";
import ProviderHero from "@/components/providers/ProviderHero";
import ProviderPageShell from "@/components/providers/ProviderPageShell";
import ProviderWorkflowTimeline from "@/components/providers/ProviderWorkflowTimeline";
import { ProviderButton } from "@/components/providers/ProviderButton";
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

      <section className="eden-providers-section">
        <div className="eden-providers-section__inner">
          <ProviderWorkflowTimeline showDetail />

          <ProviderComplianceNote />

          <p className="eden-providers-note">
            Timelines may vary based on family availability, authorization requirements, and clinical
            complexity. Eden does not guarantee immediate openings, diagnosis, or insurance approval.
          </p>

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
