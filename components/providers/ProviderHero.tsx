import Link from "next/link";
import type { ReactNode } from "react";

type ProviderHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export default function ProviderHero({ eyebrow, title, subtitle, children }: ProviderHeroProps) {
  return (
    <section className="eden-providers-hero" aria-labelledby="provider-hero-title">
      <div className="eden-providers-shell">
        <div className="eden-providers-hero__grid">
          <div>
            <p className="eden-providers-eyebrow">{eyebrow}</p>
            <h1 id="provider-hero-title" className="eden-providers-title">
              {title}
            </h1>
            <p className="eden-providers-subtitle">{subtitle}</p>
            {children ? <div className="eden-providers-actions">{children}</div> : null}
          </div>

          <aside className="eden-providers-hero__aside" aria-label="Provider quick contact">
            <p className="eden-providers-hero__aside-label">Referral coordination</p>
            <p className="eden-providers-hero__aside-text">
              Annandale, Virginia · Serving families across Northern Virginia
            </p>
            <div className="eden-providers-hero__aside-links">
              <Link href="/providers/refer-a-child">Make a referral</Link>
              <Link href="/providers/referral-process">View referral process</Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
