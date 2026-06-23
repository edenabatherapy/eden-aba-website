"use client";

import Link from "next/link";
import EdenLogo from "@/components/EdenLogo";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import "./AnimatedEdenLogoBrand.css";

type AnimatedEdenLogoBrandProps = {
  compact?: boolean;
  as?: "link" | "button";
  href?: string;
  onClick?: () => void;
};

export default function AnimatedEdenLogoBrand({
  compact = false,
  as = "link",
  href = "/",
  onClick,
}: AnimatedEdenLogoBrandProps) {
  const { language } = useSiteLanguage();
  const t = getTranslation(language);

  const rootClass = `eden-animated-brand${compact ? " eden-animated-brand--compact" : ""}`;
  const linkClass = `${rootClass} eden-animated-brand__link eden-animated-brand__shell group`;

  const content = (
    <>
      <div className="eden-animated-brand__glow-shell" aria-hidden="true">
        <span className="eden-animated-brand__glow eden-animated-brand__glow--emerald" />
        <span className="eden-animated-brand__glow eden-animated-brand__glow--teal" />
        <span className="eden-animated-brand__glow eden-animated-brand__glow--gold" />

        <div className="eden-animated-brand__logo-container eden-logo-animated">
          <span className="eden-animated-brand__shine" aria-hidden="true" />
          <EdenLogo
            size="headerBrand"
            alt="Eden ABA Therapy logo"
            priority
            className="eden-animated-brand__logo"
          />
        </div>
      </div>

      <div className="eden-animated-brand__text">
        <p className="eden-animated-brand__name">{t.brandName}</p>
        <p className="eden-animated-brand__tagline">{t.brandTagline}</p>
      </div>
    </>
  );

  if (as === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={linkClass}
        aria-label="Eden ABA Therapy home"
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className={linkClass} aria-label="Eden ABA Therapy home">
      {content}
    </Link>
  );
}
