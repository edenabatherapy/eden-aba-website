"use client";

import Image from "next/image";
import { useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { PROFESSIONAL_ORGANIZATIONS } from "@/lib/professional-organizations";

function OrganizationResourceCard({ org, visitWebsiteLabel }) {
  return (
    <article
      title={org.summary}
      className="group flex h-[180px] w-[160px] shrink-0 flex-col items-center overflow-hidden rounded-[18px] border border-slate-100/90 bg-white p-4 text-center shadow-[0_8px_24px_-12px_rgba(11,79,79,0.18)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_28px_-14px_rgba(18,140,140,0.22)]"
    >
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
      className="relative w-full overflow-hidden bg-[#f4faf8] pt-12 pb-6"
      aria-labelledby="professional-organizations-title"
    >
      <style>{`
        @keyframes orgCarouselPingPong {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hub-orgs-track {
          animation: orgCarouselPingPong 48s ease-in-out infinite alternate;
          will-change: transform;
        }
        .hub-orgs-carousel:hover .hub-orgs-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .hub-orgs-track {
            animation: none !important;
            transform: none !important;
          }
          .hub-orgs-card--loop {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .hub-orgs-track {
            animation-duration: 56s;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, #2D9C9C 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#A8D86A]/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#6EC6C4]/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 lg:px-8">
        <header className="mx-auto max-w-4xl text-center">
          <h2
            id="professional-organizations-title"
            className="text-2xl font-extrabold tracking-tight text-[#0b4f4f] md:text-[30px] lg:text-[36px]"
          >
            {hub.zone2Title || "Professional Organizations & Community Resources"}
          </h2>
          <p className="mx-auto mt-3 max-w-[800px] text-base font-medium leading-[1.6] text-slate-600">
            {hub.zone2Subtitle ||
              "Trusted autism, ABA, advocacy, research, and family-support organizations."}
          </p>
        </header>

        <div
          className="hub-orgs-carousel relative mx-auto mt-5 w-full overflow-hidden"
          aria-label={hub.zone2Title || "Professional Organizations & Community Resources"}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f4faf8] to-transparent sm:w-12"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#f4faf8] to-transparent sm:w-12"
          />

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

        <p className="mx-auto mt-5 max-w-3xl text-center text-xs font-medium leading-5 text-[#173B2F]/55">
          {hub.disclaimer ||
            "Professional organization logos are shown as educational and resource references. Display does not imply endorsement, partnership, accreditation, or membership unless formally confirmed."}
        </p>
      </div>
    </section>
  );
}
