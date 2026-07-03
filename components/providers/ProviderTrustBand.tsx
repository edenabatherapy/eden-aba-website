"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { PROVIDER_TRUST_SIGNALS } from "@/lib/providers/provider-content";

export default function ProviderTrustBand() {
  const providerTrustSignals = useLocalizedContent("PROVIDER_TRUST_SIGNALS", PROVIDER_TRUST_SIGNALS);

  return (
    <section className="eden-providers-trust" aria-label="Eden provider partnership highlights">
      <div className="eden-providers-trust__inner">
        {providerTrustSignals.map((signal) => (
          <article key={signal.label} className="eden-providers-trust__item">
            <p className="eden-providers-trust__label">{signal.label}</p>
            <p className="eden-providers-trust__value">{signal.value}</p>
            <p className="eden-providers-trust__detail">{signal.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
