"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import FinancialAssistancePageSchema from "./FinancialAssistancePageSchema";
import FinancialAssistanceHero from "./FinancialAssistanceHero";
import AssistanceResourcesSection from "./AssistanceResourcesSection";
import VirginiaResourcesSection from "./VirginiaResourcesSection";
import NationalGrantsSection from "./NationalGrantsSection";
import EdenSupportSection from "./EdenSupportSection";
import AutismCareFundSection from "./AutismCareFundSection";
import AssistanceApplicationSection from "./AssistanceApplicationSection";
import { FINANCIAL_ASSISTANCE_DISCLAIMER } from "@/lib/financial-assistance/meta";
import { getButtonClasses } from "@/lib/button-styles";

const PAGE_UI = {
  heroTitle: "Helping Every Child Access ABA Therapy",
  heroSubtitle:
    "Explore verified financial assistance pathways for autism and ABA therapy—plus how Eden ABA Therapy supports insurance verification, Virginia programs, and the Autism Care Fund.",
};

export default function FinancialAssistancePage() {
  return (
    <AboutPremiumLayout schema={<FinancialAssistancePageSchema />}>
      <FinancialAssistanceHero title={PAGE_UI.heroTitle} subtitle={PAGE_UI.heroSubtitle} />

      <div
        className="border-b border-amber-200 bg-amber-50/80 px-4 py-4 dark:border-amber-800 dark:bg-amber-950/40 lg:px-8"
        role="note"
      >
        <p className="mx-auto max-w-5xl text-sm leading-7 text-amber-900 dark:text-amber-100">
          {FINANCIAL_ASSISTANCE_DISCLAIMER}
        </p>
      </div>

      <AssistanceResourcesSection />
      <VirginiaResourcesSection />
      <NationalGrantsSection />
      <EdenSupportSection />
      <AssistanceApplicationSection />
      <AutismCareFundSection />

      <section className="bg-[#0b4f4f] px-4 py-16 text-white lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Questions about costs or eligibility?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-emerald-100/90">
            Eden&apos;s intake and insurance teams can help you understand benefits, documentation, and next steps—without
            promising third-party approvals.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className={getButtonClasses("gold")}>
              Contact Eden
              <ArrowRight size={18} aria-hidden />
            </Link>
            <Link
              href="/getting-started"
              className={getButtonClasses("secondarySite", "border-white/30 bg-white/10 text-white hover:bg-white/20")}
            >
              Getting started guide
            </Link>
          </div>
        </div>
      </section>
    </AboutPremiumLayout>
  );
}
