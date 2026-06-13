#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";

const path = "/Users/wagmaomari/Desktop/eden-aba-website/app/page.js";
let lines = readFileSync(path, "utf8").split("\n");

function replaceLineRange(start, end, newLines) {
  lines.splice(start - 1, end - start + 1, ...newLines);
}

// ABATherapyEducationPage data arrays (1122-1227)
replaceLineRange(1122, 1227, `  const SKILL_CARD_ICONS = [MessageCircle, GraduationCap, ShieldCheck, HeartHandshake];
  const skillCards = p.howAbaHelps.skillCards.map(([title, text], i) => [SKILL_CARD_ICONS[i], title, text]);
  const goalExamples = p.practicalGoals.examples;
  const DAY_STEP_IMAGES = [
    "https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop",
  ];
  const daySteps = p.typicalDay.steps.map(([stepName, title, text], i) => [stepName, title, text, DAY_STEP_IMAGES[i]]);
  const SIGNS_CARD_ICONS = [MessageCircle, ShieldCheck, Clock3, Users];
  const signsCards = p.signsBenefit.cards.map(([title, text], i) => [SIGNS_CARD_ICONS[i], title, text]);
  const AGE_GROUP_ICONS = [Baby, PlayCircle, School, GraduationCap];
  const ageGroupCards = p.byAgeGroup.cards.map(([title, text], i) => [AGE_GROUP_ICONS[i], title, text]);
  const PROGRESS_ICONS = [BarChart3, ClipboardCheck, BadgeCheck, FileSignature];
  const progressCards = p.progress.cards.map(([title, text], i) => [PROGRESS_ICONS[i], title, text]);
  const assessmentSteps = p.assessment.steps;
  const firstNinetyDays = p.firstNinetyDays.phases;
  const abaMyths = p.mythsFacts.items;
  const parentQuestions = p.parentQuestions.items;
  const RELATED_RESOURCE_ROUTES = ["#autism-assessment", "/what-is-autism", "/m-chat-r-online-screener", "#insurance-coverage", "#locations", "#intake"];
  const relatedResources = p.relatedResources.cards.map(([title, text, cta], i) => [title, text, RELATED_RESOURCE_ROUTES[i], cta]);
  const additionalFaqs = p.additionalFaqs.items;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "ABA Therapy", item: "/aba-therapy" },
        ],
      },
      {
        "@type": "MedicalWebPage",
        name: p.title,
        description: p.heroIntro,
        about: { "@type": "MedicalTherapy", name: "Applied Behavior Analysis Therapy" },
        provider: { "@type": "MedicalOrganization", name: "Eden ABA Therapy", telephone: t.edenBusinessInfo.phone, address: t.edenBusinessInfo.address },
      },`.split("\n"));

writeFileSync(path, lines.join("\n"));
console.log("ABA data arrays replaced");
