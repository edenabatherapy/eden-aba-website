"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

/**
 * @param {{ labels: object }} props
 */
export default function FooterFindCenter({ labels }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
        <MapPin size={16} className="shrink-0 text-lime-300" aria-hidden="true" />
        {labels.title}
      </h4>

      <p className="mt-4 text-sm leading-7 text-emerald-50">{labels.description}</p>

      {labels.proximityNote ? (
        <p className="mt-4 text-xs leading-6 text-emerald-100/75">{labels.proximityNote}</p>
      ) : null}
    </motion.div>
  );
}
