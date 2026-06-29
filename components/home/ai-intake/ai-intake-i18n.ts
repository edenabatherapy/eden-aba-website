import type { SiteLanguage } from "@/hooks/useSiteLanguage";
import { getAiIntake } from "@/lib/i18n";

export function getAiIntakeSection(language: SiteLanguage) {
  return getAiIntake(language);
}

export function getAiIntakeCopy(language: SiteLanguage) {
  return getAiIntake(language).panel;
}
