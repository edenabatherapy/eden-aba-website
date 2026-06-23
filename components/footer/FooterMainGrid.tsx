"use client";

import Link from "next/link";
import { ChevronDown, HeartHandshake, Mail, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import EdenLogo from "@/components/EdenLogo";
import {
  FOOTER_CAREER_LINKS,
  FOOTER_CONTACT_LINKS,
  FOOTER_MISSION,
  FOOTER_RESOURCE_LINKS,
  FOOTER_SERVICE_AREA,
  FOOTER_SERVICE_LINKS,
  FOOTER_TRUST_BADGES,
  type FooterLinkItem,
} from "@/lib/footer/footer-data";
import { getButtonClasses } from "@/lib/button-styles";

type FooterMainGridProps = {
  brandName: string;
  phone: string;
  email: string;
  startIntakeLabel: string;
};

const columnMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

function FooterNavLink({ href, label }: FooterLinkItem) {
  return (
    <Link href={href} className="eden-footer-link">
      {label}
    </Link>
  );
}

type FooterColumnProps = {
  title: string;
  links: FooterLinkItem[];
  defaultOpen?: boolean;
  delay?: number;
};

function FooterColumn({ title, links, defaultOpen = false, delay = 0 }: FooterColumnProps) {
  const [open, setOpen] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      {...(reduceMotion ? {} : { ...columnMotion, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } })}
      className="border-b border-white/10 pb-5 lg:border-b-0 lg:pb-0"
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 text-left lg:pointer-events-none lg:cursor-default"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">{title}</h3>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`shrink-0 text-emerald-100 transition-transform lg:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>

      <nav
        aria-label={title}
        className={`mt-5 grid gap-3 overflow-hidden transition-all duration-300 lg:mt-5 lg:grid lg:opacity-100 ${
          open ? "grid opacity-100" : "hidden lg:grid"
        }`}
      >
        {links.map((link) => (
          <FooterNavLink key={link.label} {...link} />
        ))}
      </nav>
    </motion.div>
  );
}

const BADGE_ICONS = [HeartHandshake, Sparkles, ShieldCheck, ShieldCheck] as const;

export default function FooterMainGrid({ brandName, phone, email, startIntakeLabel }: FooterMainGridProps) {
  const reduceMotion = useReducedMotion();
  const phoneDigits = phone.replace(/\D/g, "");

  return (
    <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1.35fr_repeat(4,minmax(0,1fr))] lg:gap-10 xl:gap-12">
      <motion.div
        {...(reduceMotion ? {} : { ...columnMotion, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } })}
      >
        <Link href="/" aria-label={`${brandName} home`}>
          <EdenLogo size="footer" onDark className="rounded-2xl" />
        </Link>

        <p className="mt-6 text-lg font-black text-white">{brandName}</p>
        <p className="mt-4 max-w-md text-sm leading-7 text-emerald-50/95">{FOOTER_MISSION}</p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Trust badges">
          {FOOTER_TRUST_BADGES.map((badge, index) => {
            const Icon = BADGE_ICONS[index] ?? ShieldCheck;
            return (
              <li key={badge} className="eden-footer-badge">
                <Icon size={13} aria-hidden="true" />
                {badge}
              </li>
            );
          })}
        </ul>

        <Link href="/intake" className={`eden-footer-cta-button mt-8 ${getButtonClasses("gold", "inline-flex")}`}>
          {startIntakeLabel}
        </Link>
      </motion.div>

      <FooterColumn title="Services" links={FOOTER_SERVICE_LINKS} defaultOpen delay={0.05} />
      <FooterColumn title="Resources" links={FOOTER_RESOURCE_LINKS} delay={0.1} />
      <FooterColumn title="Careers" links={FOOTER_CAREER_LINKS} delay={0.15} />

      <motion.div
        {...(reduceMotion ? {} : { ...columnMotion, transition: { duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] } })}
        className="border-b border-white/10 pb-5 lg:border-b-0 lg:pb-0"
      >
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">Contact</h3>

        <div className="mt-5 grid gap-4 text-sm text-emerald-50">
          <p className="flex items-center gap-3 font-bold">
            <Phone size={18} className="shrink-0 text-lime-300" aria-hidden="true" />
            <a href={`tel:${phoneDigits}`} className="eden-footer-link">
              {phone}
            </a>
          </p>

          <p className="flex items-center gap-3 font-bold">
            <Mail size={18} className="shrink-0 text-lime-300" aria-hidden="true" />
            <a href={`mailto:${email}`} className="eden-footer-link">
              {email}
            </a>
          </p>

          <p className="flex items-start gap-3 leading-7 text-emerald-50/95">
            <MapPin size={18} className="mt-0.5 shrink-0 text-lime-300" aria-hidden="true" />
            <span>{FOOTER_SERVICE_AREA}</span>
          </p>

          <nav aria-label="Contact actions" className="mt-2 grid gap-3">
            {FOOTER_CONTACT_LINKS.map((link) => (
              <FooterNavLink key={link.label} {...link} />
            ))}
          </nav>
        </div>
      </motion.div>
    </div>
  );
}
