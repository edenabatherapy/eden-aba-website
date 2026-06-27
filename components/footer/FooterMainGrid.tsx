"use client";

import Link from "next/link";
import { ChevronDown, Mail, MapPin, Phone, Printer } from "lucide-react";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import EdenLogo from "@/components/EdenLogo";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import {
  FOOTER_CAREER_LINKS,
  FOOTER_RESOURCE_LINKS,
  FOOTER_SERVICE_LINKS,
  type FooterLinkItem,
} from "@/lib/footer/footer-data";

type FooterMainGridProps = {
  brandName: string;
  phone: string;
  email: string;
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
      className="border-b border-white/10 pb-4 lg:border-b-0 lg:pb-0"
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
        className={`mt-3 grid gap-2.5 overflow-hidden transition-all duration-300 lg:mt-4 lg:grid lg:opacity-100 ${
          open ? "grid opacity-100" : "hidden lg:grid"
        }`}
      >
        {links.map((link) => (
          <FooterNavLink key={`${link.href}-${link.label}`} {...link} />
        ))}
      </nav>
    </motion.div>
  );
}

function mergeFooterLinks(
  englishLinks: FooterLinkItem[],
  localizedLabels: Array<{ label: string }> | undefined,
): FooterLinkItem[] {
  return englishLinks.map((link, index) => ({
    href: link.href,
    label: localizedLabels?.[index]?.label ?? link.label,
  }));
}

export default function FooterMainGrid({ brandName, phone, email }: FooterMainGridProps) {
  const reduceMotion = useReducedMotion();
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const grid = t.pages.footer.grid;
  const phoneDigits = phone.replace(/\D/g, "");

  const serviceLinks = mergeFooterLinks(FOOTER_SERVICE_LINKS, grid?.serviceLinks);
  const resourceLinks = mergeFooterLinks(FOOTER_RESOURCE_LINKS, grid?.resourceLinks);
  const careerLinks = mergeFooterLinks(FOOTER_CAREER_LINKS, grid?.careerLinks);

  return (
    <div className="grid gap-6 border-b border-white/10 pb-8 sm:gap-7 lg:grid-cols-[1.15fr_repeat(4,minmax(0,1fr))] lg:gap-8 lg:pb-10">
      <motion.div
        {...(reduceMotion ? {} : { ...columnMotion, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } })}
      >
        <Link href="/" aria-label={`${brandName} home`}>
          <EdenLogo size="footer" onDark className="rounded-2xl" />
        </Link>

        <p className="mt-4 text-lg font-black text-white">{brandName}</p>
        <p className="mt-3 max-w-md text-sm leading-6 text-emerald-50/95">{grid?.mission}</p>
      </motion.div>

      <FooterColumn title={grid?.servicesTitle ?? "Services"} links={serviceLinks} defaultOpen delay={0.05} />
      <FooterColumn title={grid?.resourcesTitle ?? "Resources"} links={resourceLinks} delay={0.1} />
      <FooterColumn title={grid?.careersTitle ?? "Careers"} links={careerLinks} delay={0.15} />

      <motion.div
        {...(reduceMotion ? {} : { ...columnMotion, transition: { duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] } })}
        className="border-b border-white/10 pb-4 lg:border-b-0 lg:pb-0"
      >
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
          {grid?.contactTitle ?? "Contact"}
        </h3>

        <div className="mt-3 grid gap-3 text-sm text-emerald-50 lg:mt-4">
          <p className="flex items-center gap-3 font-bold">
            <Phone size={17} className="shrink-0 text-lime-300" aria-hidden="true" />
            <span>
              {grid?.officePhoneLabel ?? "Office Phone:"}{" "}
              <a href={`tel:${phoneDigits}`} className="eden-footer-link">
                {phone}
              </a>
            </span>
          </p>

          <p className="flex items-center gap-3 font-bold">
            <Mail size={17} className="shrink-0 text-lime-300" aria-hidden="true" />
            <span>
              {grid?.emailLabel ?? "Email:"}{" "}
              <a href={`mailto:${email}`} className="eden-footer-link">
                {email}
              </a>
            </span>
          </p>

          <p className="flex items-start gap-3 leading-6 text-emerald-50/95">
            <MapPin size={17} className="mt-0.5 shrink-0 text-lime-300" aria-hidden="true" />
            <span>
              {grid?.addressLabel ?? "Address:"}
              <br />
              7700 Little River Turnpike
              <br />
              Suite 304
              <br />
              Annandale, VA 22003, United States
            </span>
          </p>

          <p className="flex items-center gap-3 font-bold">
            <Printer size={17} className="shrink-0 text-lime-300" aria-hidden="true" />
            <span>
              {grid?.faxLabel ?? "Fax:"} 571-445-8631
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
