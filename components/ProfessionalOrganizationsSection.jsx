"use client";

import Image from "next/image";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { PROFESSIONAL_ORGANIZATIONS } from "@/lib/professional-organizations";

function OrganizationLogoCard({ org, isActive, onActivate, onDeactivate, onToggleTap, visitWebsiteLabel }) {
  return (
    <div
      className="group/logo relative shrink-0"
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
    >
      <a
        href={org.website}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onToggleTap}
        className="relative flex h-[5.5rem] w-[8.5rem] items-center justify-center rounded-2xl border border-[#A8D86A]/25 bg-white p-3 shadow-[0_14px_40px_-18px_rgba(23,59,47,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2D9C9C]/60 hover:shadow-[0_22px_48px_-20px_rgba(45,156,156,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D8A43] sm:h-[6rem] sm:w-[9.5rem]"
        aria-label={`Visit ${org.name} website`}
        aria-describedby={isActive ? `${org.name}-tooltip` : undefined}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(45,156,156,0.35), 0 0 24px rgba(102,179,78,0.25)",
          }}
        />
        <Image
          src={org.logo}
          alt={`${org.name} logo`}
          width={120}
          height={56}
          className="relative z-[1] h-full w-full object-contain"
        />
      </a>

      <div
        id={`${org.name}-tooltip`}
        role="tooltip"
        className={`absolute bottom-[calc(100%+0.75rem)] left-1/2 z-40 w-64 -translate-x-1/2 rounded-2xl border border-[#A8D86A]/35 bg-white p-4 shadow-2xl shadow-[#173B2F]/15 transition-all duration-200 ${
          isActive
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-[#A8D86A]/35 bg-white" />
        <p className="text-base font-black text-[#173B2F]">{org.name}</p>
        <p className="mt-2 text-xs font-medium leading-5 text-[#173B2F]/75">{org.summary}</p>
        <a
          href={org.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-[#2D9C9C] hover:text-[#2D8A43]"
          tabIndex={isActive ? 0 : -1}
        >
          {visitWebsiteLabel}
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

function isTouchLikeDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

export default function ProfessionalOrganizationsSection({ t }) {
  const content = t.professionalOrganizations || {};
  const visitWebsiteLabel = t.intakeForm?.ui?.visitWebsite || t.visitWebsite || "Visit Website";
  const orgSummaries = content.organizations || {};
  const organizations = PROFESSIONAL_ORGANIZATIONS.map((org) => ({
    ...org,
    summary: orgSummaries[org.name]?.summary || org.summary,
  }));
  const [activeKey, setActiveKey] = useState(null);
  const [paused, setPaused] = useState(false);
  const handleToggleTap = (key, event) => {
    if (!isTouchLikeDevice()) return;
    if (activeKey !== key) {
      event.preventDefault();
      setActiveKey(key);
      setPaused(true);
    }
  };

  return (
    <section
      id="professional-organizations"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#FFFDF6] via-white to-[#ddf4f4]/40 py-20 lg:py-24"
    >
      <style>{`
        @keyframes scrollRightToLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .logo-marquee-track {
          animation: scrollRightToLeft 28s linear infinite;
        }
        .logo-marquee-paused .logo-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-marquee-track {
            animation: none !important;
            transform: none !important;
          }
          .logo-marquee-card--loop {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .logo-marquee-track {
            animation-duration: 40s;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-[#A8D86A]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#A9DDE7]/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#2D9C9C]">
            {content.eyebrow || "Community connections"}
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#173B2F] md:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-medium leading-8 text-[#173B2F]/75">
            {content.subtitle}
          </p>
        </div>
      </div>

      <div
        className={`logo-marquee relative mt-12 w-full overflow-hidden ${paused ? "logo-marquee-paused" : ""}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setActiveKey(null);
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#FFFDF6] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#ddf4f4]/80 to-transparent sm:w-24" />

        <div className="logo-marquee-viewport w-full overflow-hidden">
          <div className="logo-marquee-track flex w-max flex-nowrap gap-6 px-4 py-2 sm:px-6">
            {organizations.map((org) => {
              const key = org.name;
              return (
                <OrganizationLogoCard
                  key={key}
                  org={org}
                  isActive={activeKey === key}
                  onActivate={() => setActiveKey(key)}
                  onDeactivate={() => setActiveKey((current) => (current === key ? null : current))}
                  onToggleTap={(event) => handleToggleTap(key, event)}
                  visitWebsiteLabel={visitWebsiteLabel}
                />
              );
            })}
            {organizations.map((org, index) => {
              const key = `loop-${org.name}-${index}`;
              return (
                <div key={key} className="logo-marquee-card--loop shrink-0" aria-hidden="true">
                  <OrganizationLogoCard
                    org={org}
                    isActive={activeKey === key}
                    onActivate={() => setActiveKey(key)}
                    onDeactivate={() => setActiveKey((current) => (current === key ? null : current))}
                    onToggleTap={(event) => handleToggleTap(key, event)}
                    visitWebsiteLabel={visitWebsiteLabel}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs font-medium leading-5 text-[#173B2F]/55">
          {content.disclaimer}
        </p>
      </div>
    </section>
  );
}
