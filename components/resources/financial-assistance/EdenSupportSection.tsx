"use client";

import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileSignature, HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { getButtonClasses } from "@/lib/button-styles";

const EDEN_SERVICES = [
  {
    icon: ShieldCheck,
    title: "Insurance verification",
    description:
      "Eden's team reviews your plan benefits, explains deductibles and copays, and identifies documentation needed to begin services.",
  },
  {
    icon: ClipboardCheck,
    title: "Prior authorization support",
    description:
      "We coordinate clinical documentation and payer requirements for prior authorization when your plan requires it.",
  },
  {
    icon: FileSignature,
    title: "Appeals & documentation",
    description:
      "If coverage is denied or delayed, Eden can help gather medical necessity documentation and guide families through appeal steps.",
  },
  {
    icon: Stethoscope,
    title: "Medicaid & MCO coordination",
    description:
      "For Virginia Medicaid and managed care members, Eden helps navigate enrollment questions, service authorization, and provider network requirements.",
  },
  {
    icon: HeartHandshake,
    title: "Intake & family guidance",
    description:
      "From first contact through therapy start, Eden's intake team walks families through paperwork, scheduling, and realistic cost expectations.",
  },
] as const;

export default function EdenSupportSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="eden-support"
      className="scroll-mt-28 bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] px-4 py-16 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 lg:px-8 lg:py-20"
      aria-labelledby="eden-support-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="max-w-3xl"
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
              })}
        >
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#128c8c]">How Eden Helps</p>
          <h2 id="eden-support-heading" className="mt-3 text-3xl font-extrabold text-[#0b4f4f] dark:text-white sm:text-4xl">
            How Eden ABA Therapy Helps Families Navigate Costs
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
            Eden does not control third-party payer decisions. Our team focuses on clear communication, accurate
            verification, and connecting families to appropriate resources—including the Autism Care Fund when eligible
            and funded.
          </p>
        </motion.div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {EDEN_SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.li
                key={service.title}
                {...(reduceMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 16 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { delay: index * 0.05 },
                    })}
                className="rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-slate-900 dark:text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/insurance-coverage#verify-form" className={getButtonClasses("primarySite")}>
            Verify insurance benefits
            <ArrowRight size={18} aria-hidden />
          </Link>
          <Link href="/intake" className={getButtonClasses("secondarySite")}>
            Start intake
          </Link>
          <Link href="/contact" className={getButtonClasses("secondarySite")}>
            Contact Eden
          </Link>
        </div>
      </div>
    </section>
  );
}
