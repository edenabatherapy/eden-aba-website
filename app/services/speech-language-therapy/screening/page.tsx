import type { Metadata } from "next";
import SpeechLanguageScreeningForm from "@/components/services/speech-language/SpeechLanguageScreeningForm";

export const metadata: Metadata = {
  title: "Speech & Language Therapy Screening | Eden ABA Therapy",
  description:
    "Complete Eden ABA Therapy's speech and language screening form. Share family concerns for intake review. This screening does not diagnose and does not replace evaluation by a licensed Speech-Language Pathologist.",
  alternates: {
    canonical: "/services/speech-language-therapy/screening",
  },
};

export default function Page() {
  return <SpeechLanguageScreeningForm />;
}
