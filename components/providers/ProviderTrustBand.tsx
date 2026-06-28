import { PROVIDER_TRUST_SIGNALS } from "@/lib/providers/provider-content";

export default function ProviderTrustBand() {
  return (
    <section className="eden-providers-trust" aria-label="Eden provider partnership highlights">
      <div className="eden-providers-trust__inner">
        {PROVIDER_TRUST_SIGNALS.map((signal) => (
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
