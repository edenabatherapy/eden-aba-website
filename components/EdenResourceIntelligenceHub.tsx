"use client";

import Image from "next/image";
import { useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { PROFESSIONAL_ORGANIZATIONS } from "@/lib/professional-organizations";
import CrystalLightAmbient, { getCrystalLightSectionClass } from "@/components/crystal-light/CrystalLightAmbient";
import "./EdenResourceIntelligenceHub.css";

function OrganizationResourceCard({ org, visitWebsiteLabel }) {
  return (
    <article title={org.summary} className="eden-resource-hub__card group">
      <div className="flex h-[55px] w-full shrink-0 items-center justify-center">
        <Image
          src={org.logo}
          alt={`${org.name} logo`}
          width={100}
          height={55}
          className="max-h-[55px] max-w-[100px] object-contain"
        />
      </div>
      <h4 className="mt-1.5 w-full truncate text-[11px] font-extrabold leading-tight text-[#0b4f4f] sm:text-xs">
        {org.name}
      </h4>
      <p className="mt-1 line-clamp-3 w-full flex-1 overflow-hidden text-[10px] font-medium leading-[1.25] text-slate-600 sm:text-[11px] sm:leading-snug">
        {org.summary}
      </p>
      <a
        href={org.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1.5 inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[#128c8c] to-[#1f7a2e] px-3.5 py-2 text-xs font-extrabold text-white shadow-sm transition hover:from-[#0b4f4f] hover:to-[#128c8c]"
      >
        {visitWebsiteLabel}
        <ExternalLink size={11} aria-hidden />
      </a>
    </article>
  );
}

export default function EdenResourceIntelligenceHub({ t }) {
  const hub = t.resourceIntelligenceHub || {};
  const orgContent = t.professionalOrganizations?.organizations || {};
  const visitWebsiteLabel = t.intakeForm?.ui?.visitWebsite || "Visit Website";

  const organizations = useMemo(
    () =>
      PROFESSIONAL_ORGANIZATIONS.map((org) => ({
        ...org,
        summary: orgContent[org.name]?.summary || org.summary,
      })),
    [orgContent],
  );

  return (
    <section
      id="eden-resource-intelligence-hub"
      className={`eden-resource-hub ${getCrystalLightSectionClass("warm-ivory")}`}
      aria-labelledby="professional-organizations-title"
    >
      <CrystalLightAmbient preset="warm-ivory" />

      <div className="crystal-light-inner relative mx-auto w-full max-w-7xl px-4 lg:px-8">
        <header className="eden-resource-hub__header">
          {hub.eyebrow ? (
            <p className="eden-resource-hub__eyebrow">{hub.eyebrow}</p>
          ) : null}
          <h2 id="professional-organizations-title" className="eden-resource-hub__title">
            {hub.zone2Title || "Professional Organizations & Community Resources"}
          </h2>
          <p className="eden-resource-hub__subtitle">
            {hub.zone2Subtitle ||
              "Trusted autism, ABA, advocacy, research, and family-support organizations."}
          </p>
        </header>

        <div
          className="hub-orgs-carousel eden-resource-hub__carousel"
          aria-label={hub.zone2Title || "Professional Organizations & Community Resources"}
        >
          <div aria-hidden="true" className="eden-resource-hub__fade-left" />
          <div aria-hidden="true" className="eden-resource-hub__fade-right" />

          <div className="hub-orgs-viewport w-full overflow-hidden">
            <div className="hub-orgs-track flex w-max flex-nowrap items-center gap-3 sm:gap-4">
              {organizations.map((org) => (
                <OrganizationResourceCard
                  key={org.name}
                  org={org}
                  visitWebsiteLabel={visitWebsiteLabel}
                />
              ))}
              {organizations.map((org, index) => (
                <div
                  key={`loop-${org.name}-${index}`}
                  className="hub-orgs-card--loop shrink-0"
                  aria-hidden="true"
                >
                  <OrganizationResourceCard org={org} visitWebsiteLabel={visitWebsiteLabel} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="eden-resource-hub__disclaimer">
          {hub.disclaimer ||
            "Professional organization logos are shown as educational and resource references. Display does not imply endorsement, partnership, accreditation, or membership unless formally confirmed."}
        </p>
      </div>
    </section>
  );
}
