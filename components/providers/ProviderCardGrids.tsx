import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  FileCheck,
  GraduationCap,
  HeartHandshake,
  Home,
  School,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { EDEN_SERVICES_FOR_REFERRALS, PROVIDER_RESOURCE_CARDS, WHO_CAN_REFER } from "@/lib/providers/provider-content";

const SERVICE_ICONS = {
  home: Home,
  clinic: Stethoscope,
  school: School,
  family: HeartHandshake,
  evaluation: ShieldCheck,
} as const;

const RESOURCE_ICONS = {
  screening: Stethoscope,
  aba: BookOpen,
  insurance: ShieldCheck,
  intake: ClipboardList,
  school: GraduationCap,
  documentation: FileCheck,
} as const;

export function ProviderServiceGrid() {
  return (
    <div className="eden-providers-grid eden-providers-grid--2">
      {EDEN_SERVICES_FOR_REFERRALS.map((service) => {
        const Icon = SERVICE_ICONS[service.icon];
        return (
          <article key={service.title} className="eden-providers-card">
            <div className="eden-providers-card__icon" aria-hidden="true">
              <Icon size={18} />
            </div>
            <h3 className="eden-providers-card__title">{service.title}</h3>
            <p className="eden-providers-card__text">{service.description}</p>
          </article>
        );
      })}
    </div>
  );
}

export function ProviderResourceGrid() {
  return (
    <div className="eden-providers-grid eden-providers-grid--3">
      {PROVIDER_RESOURCE_CARDS.map((card) => {
        const Icon = RESOURCE_ICONS[card.icon];
        return (
          <article key={card.title} className="eden-providers-card">
            <div className="eden-providers-card__icon" aria-hidden="true">
              <Icon size={18} />
            </div>
            <h3 className="eden-providers-card__title">{card.title}</h3>
            <p className="eden-providers-card__text">{card.description}</p>
            <Link href={card.href} className="eden-providers-card__link">
              Learn more →
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export function ProviderWhoCanReferGrid() {
  return (
    <div className="eden-providers-grid eden-providers-grid--3">
      {WHO_CAN_REFER.map((partner) => (
        <article key={partner.title} className="eden-providers-card">
          <div className="eden-providers-card__icon" aria-hidden="true">
            <HeartHandshake size={18} />
          </div>
          <h3 className="eden-providers-card__title">{partner.title}</h3>
          <p className="eden-providers-card__text">{partner.description}</p>
        </article>
      ))}
    </div>
  );
}
