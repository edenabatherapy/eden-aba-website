"use client";

import { Check, HeartHandshake } from "lucide-react";
import HomepageInterestForm from "@/components/HomepageInterestForm";
import CrystalLightAmbient, { getCrystalLightSectionClass } from "@/components/crystal-light/CrystalLightAmbient";
import "./HomepageIntakeCtaSection.css";

type HomepageIntakeCtaSectionProps = {
  t: {
    intakeBadge: string;
    intakeTitle: string;
    intakeSubtitle: string;
    benefits: string[];
    whatNext: string;
    whatNextText: string;
  };
};

export default function HomepageIntakeCtaSection({ t }: HomepageIntakeCtaSectionProps) {
  return (
    <section
      className={`homepage-intake-cta ${getCrystalLightSectionClass("healthcare-light")} px-4 py-24 lg:px-8`}
      aria-labelledby="homepage-intake-heading"
    >
      <CrystalLightAmbient preset="healthcare-light" />

      <div className="crystal-light-inner mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="homepage-intake-cta__copy pt-4 lg:sticky lg:top-28">
          <div className="homepage-intake-cta__badge">
            <HeartHandshake size={18} className="text-emerald-600" aria-hidden="true" />
            {t.intakeBadge}
          </div>

          <h2 id="homepage-intake-heading" className="homepage-intake-cta__title">
            {t.intakeTitle}
          </h2>

          <p className="homepage-intake-cta__subtitle">{t.intakeSubtitle}</p>

          <div className="homepage-intake-cta__benefits">
            {t.benefits.map((item) => (
              <div key={item} className="homepage-intake-cta__benefit crystal-light-border-glow">
                <div className="homepage-intake-cta__benefit-icon">
                  <Check size={20} aria-hidden="true" />
                </div>
                <p className="homepage-intake-cta__benefit-text">{item}</p>
              </div>
            ))}
          </div>

          <div className="homepage-intake-cta__next crystal-light-border-glow">
            <p className="homepage-intake-cta__next-label">{t.whatNext}</p>
            <p className="homepage-intake-cta__next-text">{t.whatNextText}</p>
          </div>
        </div>

        <div className="homepage-intake-cta__form-wrap crystal-light-border-glow">
          <HomepageInterestForm t={t} />
        </div>
      </div>
    </section>
  );
}
