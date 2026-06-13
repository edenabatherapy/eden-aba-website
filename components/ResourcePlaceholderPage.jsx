"use client";

import { ArrowRight } from "lucide-react";
import EdenButton from "@/components/EdenButton";

export default function ResourcePlaceholderPage({ content, onStart, onContact }) {
  if (!content) return null;

  return (
    <div className="bg-[#fffaf0] text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] px-4 py-20 lg:px-8">
        <div className="absolute -right-24 top-12 h-80 w-80 rounded-full bg-[#f7c72f]/40 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#49b8c8]/25 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          {content.breadcrumb ? (
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#128c8c]">{content.breadcrumb}</p>
          ) : null}
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-6xl">
            {content.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-700">{content.intro}</p>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {content.comingSoon ? (
            <div className="rounded-[2rem] border border-[#49b8c8]/20 bg-white p-8 shadow-xl shadow-[#128c8c]/10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#128c8c]">{content.comingSoonLabel}</p>
              <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{content.comingSoon}</p>
            </div>
          ) : null}

          {Array.isArray(content.highlights) && content.highlights.length > 0 ? (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {content.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-[1.5rem] border border-[#49b8c8]/15 bg-[#eef9f4]/60 p-5 text-sm font-bold leading-7 text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {onStart ? (
              <EdenButton variant="primarySite" onClick={onStart}>
                {content.primaryCta} <ArrowRight size={18} />
              </EdenButton>
            ) : null}
            {onContact ? (
              <EdenButton variant="secondarySite" onClick={onContact}>
                {content.secondaryCta}
              </EdenButton>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
