"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import CareerPageShell from "@/components/careers/hub/CareerPageShell";
import CareerBreadcrumbs from "@/components/careers/hub/CareerBreadcrumbs";
import CareersPortal from "@/components/careers/CareersPortal";
import CareersFutureLocations from "@/components/careers/CareersFutureLocations";
import TalentNetworkForm from "@/components/careers/hub/TalentNetworkForm";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export default function OpenRolesPage() {
  return (
    <CareerPageShell>
      <CareerBreadcrumbs
        items={[
          { label: "Careers", href: "/careers" },
          { label: "Search Open Roles" },
        ]}
      />
      <section
        className="relative overflow-hidden bg-gradient-to-br from-[#e8f8f2] via-white to-[#dff5f0] px-4 py-12 lg:px-8 lg:py-16"
        aria-labelledby="open-roles-heading"
      >
        <div className="relative mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
            Search Open Roles
          </p>
          <h1 id="open-roles-heading" className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Find your next role at Eden ABA Therapy
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Search, filter, and apply to clinical and operations openings across Annandale and Northern Virginia.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16" aria-labelledby="job-search-heading">
        <motion.div {...fadeUp}>
          <h2 id="job-search-heading" className="sr-only">
            Job search and filters
          </h2>
          <Suspense fallback={null}>
            <CareersPortal />
          </Suspense>
        </motion.div>
      </section>

      <section className="bg-slate-50 px-4 py-16 dark:bg-slate-900/50 lg:px-8">
        <CareersFutureLocations />
      </section>

      <section id="talent-network" className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Don&apos;t see the right role?</h2>
        <p className="mt-3 text-base leading-8 text-slate-600 dark:text-slate-300">
          Join our talent network and we&apos;ll reach out when a matching opportunity becomes available.
        </p>
        <div className="mt-8">
          <TalentNetworkForm />
        </div>
      </section>
    </CareerPageShell>
  );
}
