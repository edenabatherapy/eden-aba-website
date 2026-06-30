"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, Sparkles, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import { getButtonClasses } from "@/lib/button-styles";
import { EDEN_CARD } from "@/lib/eden-design-system";

const HIGHLIGHT_ICONS = [Users, Sparkles, BookOpen, Clock3] as const;

export default function AfterSchoolProgramsPage() {
  const reduceMotion = useReducedMotion();
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const content = t.pages?.resourcePlaceholders?.["afterschool-programs"];
  const highlights = content?.highlights ?? [
    "Social and communication skill-building after school",
    "Structured routines for homework and transitions",
    "BCBA-supervised, individualized support",
  ];

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-48px" },
          transition: { duration: 0.55, delay },
        };

  return (
    <AboutPremiumLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#49b8c8]/10 px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p {...reveal()} className="text-sm font-black uppercase tracking-[0.2em] text-[#128c8c]">
            {content?.breadcrumb ?? "Services / After School Programs"}
          </motion.p>
          <motion.h1 {...reveal(0.06)} className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">
            {content?.title ?? "After School Programs"}
          </motion.h1>
          <motion.p {...reveal(0.12)} className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-700">
            {content?.intro ??
              "Eden ABA Therapy after school programs provide structured support for communication, social participation, homework routines, and safe transitions after school."}
          </motion.p>
          <motion.div {...reveal(0.18)} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/start-aba-therapy" className={getButtonClasses("primarySite")}>
              {content?.primaryCta ?? "Start ABA Therapy"} <ArrowRight size={18} aria-hidden />
            </Link>
            <Link href="/about/contact-us" className={getButtonClasses("secondarySite")}>
              {content?.secondaryCta ?? "Contact Eden ABA Therapy"}
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.h2 {...reveal()} className="text-center text-3xl font-black text-[#0F172A] md:text-4xl">
            {language === "vi" ? "Chương trình hỗ trợ sau giờ học" : "What families can expect"}
          </motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {highlights.map((highlight, index) => {
              const Icon = HIGHLIGHT_ICONS[index] ?? Sparkles;
              return (
                <motion.article key={highlight} {...reveal(index * 0.05)} className={EDEN_CARD}>
                  <div className="inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                    <Icon size={22} aria-hidden />
                  </div>
                  <p className="mt-4 text-base font-semibold leading-7 text-slate-700">{highlight}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-16 text-white lg:px-8 lg:py-20">
        <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black md:text-4xl">
            {language === "vi" ? "Sẵn sàng tìm hiểu thêm?" : "Ready to learn more?"}
          </h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/90">
            {language === "vi"
              ? "Đội ngũ Eden ABA Therapy có thể giúp gia đình xác định chương trình phù hợp sau giờ học."
              : "The Eden ABA Therapy team can help your family explore after school options and next steps for services."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/getting-started" className={getButtonClasses("gold")}>
              {language === "vi" ? "Bắt đầu với Eden" : "Getting Started with Eden"}
            </Link>
            <Link href="/about/contact-us" className={getButtonClasses("secondaryOnDark")}>
              {language === "vi" ? "Liên hệ Eden" : "Contact Eden"}
            </Link>
          </div>
        </motion.div>
      </section>
    </AboutPremiumLayout>
  );
}
