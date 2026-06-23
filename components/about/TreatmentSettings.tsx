"use client";

import Link from "next/link";
import { ArrowRight, Building2, GraduationCap, Home, MapPin, Monitor, Users } from "lucide-react";
import { motion } from "framer-motion";
import CtaLink from "@/components/about/CtaLink";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OUR_APPROACH_PAGE } from "@/lib/our-approach-content";
import { fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

const SETTING_ICONS = [Home, Building2, GraduationCap, MapPin, Users, Monitor];

export default function TreatmentSettings() {
  const content = OUR_APPROACH_PAGE.treatmentSettings;

  return (
    <section className="bg-slate-50 px-4 py-20 dark:bg-slate-900/50 lg:px-8" aria-labelledby="treatment-settings-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2
            id="treatment-settings-heading"
            className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl"
          >
            {content.headline}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">{content.intro}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {content.settings.map((setting, index) => {
            const Icon = SETTING_ICONS[index] || Home;
            return (
              <motion.div key={setting.title} variants={staggerItem}>
                <Card className="h-full transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
                  <CardHeader>
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-4 text-xl">
                      <Link
                        href={setting.href}
                        className="transition hover:text-emerald-700 dark:hover:text-emerald-300"
                      >
                        {setting.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{setting.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="mt-10 text-center">
          <CtaLink href="/intake">
            {content.cta}
            <ArrowRight size={18} aria-hidden="true" />
          </CtaLink>
        </motion.div>
      </div>
    </section>
  );
}
