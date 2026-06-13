#!/usr/bin/env node
/**
 * One-shot patch for remaining i18n wiring in app/page.js
 */
import { readFileSync, writeFileSync } from "fs";

const path = "/Users/wagmaomari/Desktop/eden-aba-website/app/page.js";
let s = readFileSync(path, "utf8");

// --- LogoImage ---
s = s.replace(
  `function LogoImage({ alt = "Eden ABA Therapy", className = "h-14 w-auto" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={\`grid place-items-center rounded-2xl bg-white px-4 py-2 text-center font-black leading-tight text-emerald-800 shadow-sm \${className}\`}>
        <span className="text-sm">EDEN</span>
        <span className="text-[10px] tracking-wide">ABA THERAPY</span>
      </div>
    );
  }

  return <img src={logoPath} alt={alt} className={className} onError={() => setFailed(true)} />;
}`,
  `function LogoImage({ t, alt, className = "h-14 w-auto" }) {
  const [failed, setFailed] = useState(false);
  const altText = alt || t?.logo?.alt || t?.logo?.defaultAlt || "Eden ABA Therapy";

  if (failed) {
    return (
      <div className={\`grid place-items-center rounded-2xl bg-white px-4 py-2 text-center font-black leading-tight text-emerald-800 shadow-sm \${className}\`}>
        <span className="text-sm">{t?.logo?.fallbackLine1 || "EDEN"}</span>
        <span className="text-[10px] tracking-wide">{t?.logo?.fallbackLine2 || "ABA THERAPY"}</span>
      </div>
    );
  }

  return <img src={logoPath} alt={altText} className={className} onError={() => setFailed(true)} />;
}`
);

// --- GoogleMapEmbed ---
s = s.replace(
  `function GoogleMapEmbed({ address, title = "Eden ABA Therapy Google Map", className = "h-[560px] w-full" }) {
  const encodedAddress = encodeURIComponent(address);
  const apiKey = typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : "";
  const mapSrc = apiKey
    ? \`https://www.google.com/maps/embed/v1/place?key=\${apiKey}&q=\${encodedAddress}&zoom=16\`
    : \`https://www.google.com/maps?q=\${encodedAddress}&z=16&hl=en&output=embed\`;
  const directionsUrl = \`https://www.google.com/maps/dir/?api=1&destination=\${encodedAddress}\`;

  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden bg-slate-100">
      <iframe
        title={title}
        src={mapSrc}
        className={className}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      {!apiKey && (
        <div className="border-t border-slate-100 bg-white p-4 text-center text-sm font-bold text-slate-600">
          For the most reliable embedded Google Map, add <span className="font-black text-slate-900">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</span> to your environment variables. You can still <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-[#128c8c] underline underline-offset-4">open Eden ABA Therapy in Google Maps</a>.
        </div>
      )}
    </div>
  );
}`,
  `function GoogleMapEmbed({ t, address, title, className = "h-[560px] w-full" }) {
  const mapT = t?.googleMap;
  const mapTitle = title || mapT?.defaultTitle || "Eden ABA Therapy Google Map";
  const encodedAddress = encodeURIComponent(address);
  const apiKey = typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : "";
  const mapSrc = apiKey
    ? \`https://www.google.com/maps/embed/v1/place?key=\${apiKey}&q=\${encodedAddress}&zoom=16\`
    : \`https://www.google.com/maps?q=\${encodedAddress}&z=16&hl=en&output=embed\`;
  const directionsUrl = \`https://www.google.com/maps/dir/?api=1&destination=\${encodedAddress}\`;

  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden bg-slate-100">
      <iframe
        title={mapTitle}
        src={mapSrc}
        className={className}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      {!apiKey && (
        <div className="border-t border-slate-100 bg-white p-4 text-center text-sm font-bold text-slate-600">
          {mapT?.apiKeyNotice || "For the most reliable embedded Google Map, add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables."}{" "}
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-[#128c8c] underline underline-offset-4">
            {mapT?.openInGoogleMaps || "open Eden ABA Therapy in Google Maps"}
          </a>.
        </div>
      )}
    </div>
  );
}`
);

s = s.replace(
  `<LogoImage alt={t.logo?.alt || t.logo?.defaultAlt} className="h-14 w-auto" />`,
  `<LogoImage t={t} className="h-14 w-auto" />`
);
s = s.replace(
  `<LogoImage alt={t.logo?.defaultAlt || t.brandName} className="h-20 w-auto rounded-2xl bg-white p-2" />`,
  `<LogoImage t={t} alt={t.logo?.defaultAlt || t.brandName} className="h-20 w-auto rounded-2xl bg-white p-2" />`
);
s = s.replace(
  `<GoogleMapEmbed address={location.address} title={pl.annandaleMapTitle} className="h-[560px] w-full" />`,
  `<GoogleMapEmbed t={t} address={location.address} title={pl.annandaleMapTitle} className="h-[560px] w-full" />`
);
s = s.replace(
  `<GoogleMapEmbed address={location.address} title={pl.annandaleMapTitle} className="h-full min-h-[520px] w-full" />`,
  `<GoogleMapEmbed t={t} address={location.address} title={pl.annandaleMapTitle} className="h-full min-h-[520px] w-full" />`
);

// --- NewsletterBanner ---
s = s.replace(
  `          Stay connected with our family newsletter`,
  `          {t.newsletterTitle}`
);
s = s.replace(
  `            Join Family Newsletter`,
  `            {t.joinNewsletter}`
);

// --- MChatQuestionnaire signature ---
s = s.replace(
  `function MChatQuestionnaire() {
  const questions = [
    [1, "If you point at something across the room, does your child look at it?", "No"],
    [2, "Have you ever wondered if your child might be deaf?", "Yes"],
    [3, "Does your child play pretend or make-believe?", "No"],
    [4, "Does your child like climbing on things?", "No"],
    [5, "Does your child make unusual finger movements near their eyes?", "Yes"],
    [6, "Does your child point with one finger to ask for something or get help?", "No"],
    [7, "Does your child point with one finger to show you something interesting?", "No"],
    [8, "Is your child interested in other children?", "No"],
    [9, "Does your child show you things by bringing them to you or holding them up?", "No"],
    [10, "Does your child respond when you call their name?", "No"],
    [11, "When you smile at your child, does your child smile back?", "No"],
    [12, "Does your child get upset by everyday noises?", "Yes"],
    [13, "Does your child walk?", "No"],
    [14, "Does your child look you in the eye when you are talking, playing, or helping them?", "No"],
    [15, "Does your child try to copy what you do?", "No"],
    [16, "If you turn your head to look at something, does your child look to see what you are looking at?", "No"],
    [17, "Does your child try to get you to watch them?", "No"],
    [18, "Does your child understand when you tell them to do something?", "No"],
    [19, "If something new happens, does your child look at your face to see how you feel about it?", "No"],
    [20, "Does your child like movement activities?", "No"],
  ];`,
  `function MChatQuestionnaire({ t }) {
  const mq = t.pages.mchatQuestionnaire;
  const questions = mq.questions;`
);

s = s.replace(
  `  const result = score <= 2
    ? ["Lower concern", "Your responses fall in a lower-concern range. Continue monitoring development and speak with your pediatrician if concerns continue.", "bg-emerald-100 text-emerald-800", "bg-emerald-600"]
    : score <= 7
      ? ["Moderate concern", "Your responses suggest follow-up may be helpful. Consider sharing these results with your child's pediatrician or a qualified developmental clinician.", "bg-yellow-100 text-yellow-800", "bg-yellow-500"]
      : ["Elevated concern", "Your responses fall in an elevated-concern range. A professional developmental evaluation is recommended.", "bg-orange-100 text-orange-800", "bg-orange-500"];`,
  `  const result = score <= 2
    ? [...mq.results.lower, "bg-emerald-100 text-emerald-800", "bg-emerald-600"]
    : score <= 7
      ? [...mq.results.moderate, "bg-yellow-100 text-yellow-800", "bg-yellow-500"]
      : [...mq.results.elevated, "bg-orange-100 text-orange-800", "bg-orange-500"];`
);

s = s.replace(
  `  const followUpAreas = [
    { label: "Joint attention and pointing", ids: [1, 6, 7, 9, 16, 17] },
    { label: "Social engagement and response", ids: [8, 10, 11, 14, 19] },
    { label: "Pretend play, imitation, and learning readiness", ids: [3, 15, 18] },
    { label: "Sensory responses and repetitive behaviors", ids: [5, 12] },
    { label: "Movement and motor participation", ids: [4, 13, 20] },
  ].filter((area) => area.ids.some((id) => riskQuestionNumbers.includes(id))).map((area) => area.label);
  const disclaimer = "The M-CHAT-R is a screening tool only. It does not diagnose autism or any medical condition. Results should be reviewed with a pediatrician or qualified clinician.";`,
  `  const followUpAreaMap = [
    { label: mq.followUpAreas[0], ids: [1, 6, 7, 9, 16, 17] },
    { label: mq.followUpAreas[1], ids: [8, 10, 11, 14, 19] },
    { label: mq.followUpAreas[2], ids: [3, 15, 18] },
    { label: mq.followUpAreas[3], ids: [5, 12] },
    { label: mq.followUpAreas[4], ids: [4, 13, 20] },
  ].filter((area) => area.ids.some((id) => riskQuestionNumbers.includes(id))).map((area) => area.label);
  const followUpAreas = followUpAreaMap;
  const disclaimer = mq.disclaimer;
  const formT = mq.form;
  const qs = mq.questionsStage;
  const rs = mq.resultsStage;
  const rp = mq.report;`
);

// MChatROnlineScreenerPage - pass t to questionnaire
s = s.replace(
  `<MChatQuestionnaire />`,
  `<MChatQuestionnaire t={t} />`
);

writeFileSync(path, s);
console.log("Patch phase 1 complete");
