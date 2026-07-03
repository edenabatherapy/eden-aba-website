"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { PROVIDER_COMPLIANCE_NOTE } from "@/lib/providers/provider-content";

export default function ProviderComplianceNote() {
  const providerComplianceNote = useLocalizedContent("PROVIDER_COMPLIANCE_NOTE", PROVIDER_COMPLIANCE_NOTE);

  return (
    <p className="eden-providers-note" role="note">
      {providerComplianceNote}
    </p>
  );
}
