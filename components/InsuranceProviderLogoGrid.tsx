"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  INSURANCE_COVERAGE_LOGOS,
  type InsuranceCoverageLogo,
} from "@/lib/insurance-coverage-logos";

type InsuranceProviderLogoGridProps = {
  badge?: string;
  title?: string;
  subtitle?: string;
  disclaimer?: string;
  logos?: InsuranceCoverageLogo[];
};

function LogoCard({ provider, index }: { provider: InsuranceCoverageLogo; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <article className="flex h-full min-h-[168px] flex-col rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-shadow hover:border-emerald-200 hover:shadow-md sm:min-h-[176px] sm:p-5">
        <div className="flex flex-1 items-center justify-center rounded-xl bg-white px-3 py-4">
          <Image
            src={provider.src}
            alt={`${provider.name} logo`}
            width={200}
            height={72}
            className={`max-h-14 w-auto max-w-[88%] object-contain sm:max-h-16 lg:max-h-[72px] ${
              provider.contrastBoost ? "contrast-125 saturate-110" : ""
            } ${provider.compact ? "max-h-12 sm:max-h-14" : ""}`}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
          />
        </div>
        <p className="mt-3 text-center text-sm font-bold leading-snug text-slate-800">{provider.name}</p>
      </article>
    </motion.li>
  );
}

export default function InsuranceProviderLogoGrid({
  badge = "Insurance Coverage",
  title = "Insurance Plans We Can Help Review",
  subtitle = "Eden ABA Therapy can help Virginia families review benefits, authorization requirements, and next steps. If your plan is not listed, our team may still be able to review your benefits.",
  disclaimer = "Listed insurance plans do not guarantee coverage, authorization, or in-network status. Coverage depends on the member's plan, eligibility, medical necessity, authorization requirements, and payer rules.",
  logos = INSURANCE_COVERAGE_LOGOS,
}: InsuranceProviderLogoGridProps) {
  return (
    <div
      className="rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/30 to-white p-6 shadow-lg shadow-emerald-900/5 sm:p-10"
      aria-labelledby="insurance-providers-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">
          {badge}
        </div>

        <h2
          id="insurance-providers-heading"
          className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
        >
          {title}
        </h2>

        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{subtitle}</p>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-5">
        {logos.map((provider, index) => (
          <LogoCard key={provider.name} provider={provider} index={index} />
        ))}
      </ul>

      <p className="mx-auto mt-8 max-w-3xl rounded-2xl border border-amber-100 bg-amber-50/80 px-5 py-4 text-center text-sm font-medium leading-7 text-amber-950">
        {disclaimer}
      </p>
    </div>
  );
}
