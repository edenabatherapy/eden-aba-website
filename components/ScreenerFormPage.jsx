"use client";

import React from "react";

export default function ScreenerFormPage({ badge, title, subtitle, footerNote, children }) {
  return (
    <div className="bg-white text-[#0F172A]">
      <section className="border-b border-[#0E6B4F]/10 bg-[#FAF7F0] px-4 py-10 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {badge ? (
            <span className="inline-flex rounded-full bg-[#0E6B4F]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.22em] text-[#0E6B4F]">
              {badge}
            </span>
          ) : null}
          <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#0F172A] md:text-4xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 max-w-2xl text-lg font-semibold leading-8 text-slate-600">{subtitle}</p>
          ) : null}
          {footerNote ? (
            <p className="mt-4 text-xs font-semibold text-slate-500">{footerNote}</p>
          ) : null}
        </div>
      </section>
      <section className="px-4 py-10 lg:px-8">
        <div className="mx-auto max-w-4xl">{children}</div>
      </section>
    </div>
  );
}
