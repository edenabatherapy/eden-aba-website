import Link from "next/link";
import { ArrowUpRight, Mail, Phone, Printer, FileText } from "lucide-react";
import { REFERRAL_CHANNELS } from "@/lib/providers/provider-content";

const CHANNEL_ICONS = {
  form: FileText,
  phone: Phone,
  fax: Printer,
  email: Mail,
} as const;

export default function ProviderReferralChannels() {
  return (
    <div className="eden-providers-channel-grid">
      {REFERRAL_CHANNELS.map((channel) => {
        const Icon = CHANNEL_ICONS[channel.id as keyof typeof CHANNEL_ICONS] ?? FileText;
        const isExternal = channel.href.startsWith("http");

        return (
          <article key={channel.id} className="eden-providers-channel-card">
            <div className="eden-providers-channel-card__icon" aria-hidden="true">
              <Icon size={18} />
            </div>
            <h3 className="eden-providers-channel-card__title">{channel.title}</h3>
            <p className="eden-providers-channel-card__text">{channel.description}</p>
            {isExternal ? (
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="eden-providers-channel-card__link"
              >
                {channel.actionLabel}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : channel.href.startsWith("mailto:") || channel.href.startsWith("tel:") ? (
              <a href={channel.href} className="eden-providers-channel-card__link">
                {channel.actionLabel}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : (
              <Link href={channel.href} className="eden-providers-channel-card__link">
                {channel.actionLabel}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            )}
          </article>
        );
      })}
    </div>
  );
}
