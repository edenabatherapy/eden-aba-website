"use client";

import Link from "next/link";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOurTeamPage } from "@/contexts/OurTeamContent";
import { fadeUp, GlassPanel, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

export default function RecruitingSection() {
  const content = useOurTeamPage().recruiting;

  return (
    <section
      className="bg-gradient-to-br from-emerald-900 via-[#0b4f4f] to-emerald-800 px-4 py-20 text-white lg:px-8"
      aria-labelledby="recruiting-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">{content.eyebrow}</p>
          <h2 id="recruiting-heading" className="mt-3 text-3xl font-extrabold sm:text-4xl">
            {content.headline}
          </h2>
          <p className="mt-5 text-base leading-8 text-emerald-50 sm:text-lg">{content.intro}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {content.roles.map((role) => (
            <motion.div key={role.title} variants={staggerItem}>
              <Card className="h-full border-white/10 bg-white/10 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-lime-200">
                      <Briefcase size={20} aria-hidden="true" />
                    </div>
                    <span className="rounded-full border border-lime-300/40 bg-lime-400/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-lime-200">
                      Future Opportunity
                    </span>
                  </div>
                  <CardTitle className="mt-4 text-lg leading-snug text-white">{role.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-emerald-50">{role.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="mt-10 text-center">
          <GlassPanel className="mx-auto max-w-2xl border-white/10 bg-white/10 text-center backdrop-blur-sm">
            <p className="text-base leading-7 text-emerald-50">
              Interested in joining Eden ABA Therapy? Explore current and upcoming opportunities on our careers page.
            </p>
            <Link
              href="/careers"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-[#f7c72f] px-8 py-3 text-sm font-black text-[#0b4f4f] transition hover:bg-[#ff8a1f] hover:text-white"
            >
              View Careers
            </Link>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
