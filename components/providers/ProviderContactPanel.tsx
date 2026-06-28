import { EDEN_PROVIDER_CONTACT } from "@/lib/providers/provider-content";

export default function ProviderContactPanel() {
  return (
    <div className="eden-providers-contact-panel">
      <div className="eden-providers-contact-item">
        <span>Phone</span>
        <a href={EDEN_PROVIDER_CONTACT.phoneHref}>{EDEN_PROVIDER_CONTACT.phone}</a>
      </div>
      <div className="eden-providers-contact-item">
        <span>Email</span>
        <a href={EDEN_PROVIDER_CONTACT.emailHref}>{EDEN_PROVIDER_CONTACT.email}</a>
      </div>
      <div className="eden-providers-contact-item">
        <span>Fax</span>
        <p>{EDEN_PROVIDER_CONTACT.fax}</p>
      </div>
      <div className="eden-providers-contact-item">
        <span>Clinic address</span>
        <p>{EDEN_PROVIDER_CONTACT.address}</p>
      </div>
    </div>
  );
}
