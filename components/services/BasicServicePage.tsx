"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import { SITE_IMAGES } from "@/lib/site-images";
import { getButtonClasses } from "@/lib/button-styles";

type BasicServicePageProps = {
  serviceIndex: number;
};

export default function BasicServicePage({ serviceIndex }: BasicServicePageProps) {
  const reduceMotion = useReducedMotion();
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const [title, description] = t.services[serviceIndex] ?? ["", ""];
  const imageAlt = t.serviceImageAlts?.[serviceIndex] ?? title;
  const heroImage = SITE_IMAGES.home.services[serviceIndex];

  const heroMotion = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.65 } };

  return (
    <AboutPremiumLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#0E6B4F] to-[#0d9488] px-4 py-16 text-white lg:px-8 lg:py-24">
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div {...heroMotion}>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm font-bold text-emerald-200">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/40">
                  ›
                </li>
                <li>
                  <span className="text-white/80">Services</span>
                </li>
                <li aria-hidden="true" className="text-white/40">
                  ›
                </li>
                <li className="text-white">{title}</li>
              </ol>
            </nav>
            <h1 className="text-3xl font-black leading-tight md:text-5xl lg:text-6xl">{title}</h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/90">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/intake" className={`${getButtonClasses("primarySite")} transition hover:scale-[1.02]`}>
                Start Services <ArrowRight size={18} aria-hidden />
              </Link>
              <Link href="/getting-started" className={getButtonClasses("secondaryOnDark")}>
                Getting Started
              </Link>
              <Link href="/about/contact-us" className={getButtonClasses("secondaryOnDark")}>
                Contact Eden
              </Link>
            </div>
          </motion.div>
          <motion.div {...heroMotion} transition={{ duration: 0.65, delay: 0.1 }}>
            <Image
              src={heroImage}
              alt={imageAlt}
              width={800}
              height={640}
              priority
              className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-2xl ring-4 ring-white/20"
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-[#FAF7F0] px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">How Eden Can Help</h2>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{description}</p>
          <div className="mt-8">
            <Link href="/intake" className={getButtonClasses("primarySite")}>
              Request an Intake Consultation <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </AboutPremiumLayout>
  );
}
