"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useInViewport } from "@/lib/use-in-viewport";
import { useOurStoryPage } from "@/contexts/OurStoryContent";
import { AnimatedCounter, fadeUp } from "./shared";

export default function ImpactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInViewport(ref, 0.2);
  const content = useOurStoryPage().impact;

  return (
    <section className="px-4 py-20 lg:px-8 dark:bg-slate-950" aria-labelledby="impact-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="text-center">
          <h2 id="impact-heading" className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {content.title}
          </h2>
        </motion.div>

        <div ref={ref} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.stats.map((stat, index) => (
            <motion.div key={stat.id} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.06 }}>
              <Card className="h-full border-emerald-100 dark:border-slate-700 dark:bg-slate-900">
                <CardContent className="p-6 sm:p-8">
                  <p className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 sm:text-5xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                  </p>
                  <p className="mt-2 text-base font-bold text-slate-900 dark:text-white sm:text-lg">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
