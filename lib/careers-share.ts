import { getJobShareUrl } from "@/lib/careers-routes";
import type { CareersJob } from "@/lib/careers-content";

export type ShareJobResult = "shared" | "copied" | "failed";

export async function shareJob(job: CareersJob): Promise<ShareJobResult> {
  const url = getJobShareUrl(job.id);
  const shareData = {
    title: `${job.title} | Eden ABA Therapy Careers`,
    text: job.summary,
    url,
  };

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share(shareData);
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "failed";
      }
    }
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    return "copied";
  } catch {
    return "failed";
  }
}
