"use client";

import {
  ClipboardList,
  GraduationCap,
  Headphones,
  Stethoscope,
  UserCheck,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOurTeamPage } from "@/contexts/OurTeamContent";
import { fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

const ROLE_ICONS = [GraduationCap, Stethoscope, Users, UserCheck, ClipboardList, Headphones];

export default function ClinicalStructureSection() {
  const content = useOurTeamPage().clinicalStructure;

  return (
    <section className="px-4 py-20 lg:px-8 dark:bg-slate-950" aria-labelledby="clinical-structure-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2
            id="clinical-structure-heading"
            className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl"
          >
            {content.headline}
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {content.roles.map((role, index) => {
            const Icon = ROLE_ICONS[index] || GraduationCap;
            return (
              <motion.div key={role.title} variants={staggerItem}>
                <Card className="h-full transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
                  <CardHeader>
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-4 text-lg leading-snug">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{role.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
