import { PROVIDER_COMPLIANCE_NOTE } from "@/lib/providers/provider-content";

export default function ProviderComplianceNote() {
  return (
    <p className="eden-providers-note" role="note">
      {PROVIDER_COMPLIANCE_NOTE}
    </p>
  );
}
