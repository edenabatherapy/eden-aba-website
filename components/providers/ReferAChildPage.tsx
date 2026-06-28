"use client";

import { ArrowRight, Phone } from "lucide-react";
import ProviderComplianceNote from "@/components/providers/ProviderComplianceNote";
import ProviderContactPanel from "@/components/providers/ProviderContactPanel";
import ProviderHero from "@/components/providers/ProviderHero";
import ProviderPageShell from "@/components/providers/ProviderPageShell";
import ProviderReferralForm from "@/components/providers/ProviderReferralForm";
import { ProviderButton } from "@/components/providers/ProviderButton";
import { EDEN_PROVIDER_CONTACT } from "@/lib/providers/provider-content";
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

          <ProviderComplianceNote />

          <div className="eden-providers-actions eden-providers-actions--spaced">
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
