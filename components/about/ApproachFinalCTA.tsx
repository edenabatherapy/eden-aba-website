"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CtaLink from "@/components/about/CtaLink";
import { useOurApproachPage } from "@/contexts/OurApproachContent";
import { fadeUp, GlassPanel } from "./shared";

export default function ApproachFinalCTA() {
  const content = useOurApproachPage().finalCta;

  return (
    <section className="px-4 pb-28 lg:px-8 dark:bg-slate-950" aria-labelledby="approach-final-cta-heading">
      <motion.div {...fadeUp} className="mx-auto max-w-5xl">
        <GlassPanel className="border-emerald-100/80 bg-gradient-to-br from-emerald-50/80 via-white/90 to-emerald-50/50 p-8 text-center dark:from-emerald-950/30 dark:via-slate-900/80 dark:to-emerald-950/20 sm:p-12">
          <h2 id="approach-final-cta-heading" className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {content.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            {content.body}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink href="/intake" className="w-full sm:w-auto">
              {content.primaryCta}
              <ArrowRight size={18} aria-hidden="true" />
            </CtaLink>
            <CtaLink href="/intake" variant="secondary" className="w-full sm:w-auto">
              {content.secondaryCta}
            </CtaLink>
          </div>
        </GlassPanel>
      </motion.div>
    </section>
  );
}
