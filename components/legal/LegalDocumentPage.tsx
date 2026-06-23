"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import type { LegalPageContent } from "@/lib/legal/legal-pages-content";
import { getButtonClasses } from "@/lib/button-styles";

type LegalDocumentPageProps = {
  content: LegalPageContent;
};

export default function LegalDocumentPage({ content }: LegalDocumentPageProps) {
  return (
    <AboutPremiumLayout>
      <div className="mx-auto max-w-4xl px-4 py-14 lg:px-8 lg:py-20">
        <header className="rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-8 dark:border-slate-700 dark:from-emerald-950/30 dark:via-slate-900 dark:to-teal-950/20">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
            {content.badge}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{content.title}</h1>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{content.subtitle}</p>
          <p className="mt-4 text-sm font-bold text-emerald-800 dark:text-emerald-300">{content.effectiveDate}</p>
        </header>

        <div className="mt-10 grid gap-8">
          {content.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                  {paragraph}
                </p>
              ))}
              {section.listItems && (
                <ul className="mt-4 grid gap-2.5">
                  {section.listItems.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-7 text-slate-700 dark:text-slate-300">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className={getButtonClasses("primary")}>
            Contact Eden
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/privacy-policy" className={getButtonClasses("secondary")}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </AboutPremiumLayout>
  );
}
