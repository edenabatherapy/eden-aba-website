#!/usr/bin/env node
/** Re-download failed images using verified Unsplash photo IDs only. */
import { writeFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

const VERIFIED = [
  "photo-1607453998774-d533f65dac99",
  "photo-1516627145497-ae6968895b74",
  "photo-1588072432836-e10032774350",
  "photo-1587654780291-39c9404d746b",
  "photo-1573496359142-b8d87734a5a2",
  "photo-1555252333-9f8e92e65df9",
  "photo-1596495578065-6e0763fa1178",
  "photo-1503454537195-1dcabb73ffb9",
  "photo-1604881991720-f91add269bed",
  "photo-1551836022-d5d88e9218df",
  "photo-1450101499163-c8848c66ca85",
  "photo-1554224155-6726b3ff858f",
  "photo-1576091160399-112ba8d25d1d",
  "photo-1519494026892-80bbd2d6fd0d",
  "photo-1503676260728-1c00da094a0b",
  "photo-1579684385127-1ef15d508118",
  "photo-1522202176988-66273c2fd55f",
  "photo-1544717297-f8995ab504cc",
];

const FILES = [
  "home-family-autism-care-deco-left.jpg",
  "home-therapist-child-support-deco-right.jpg",
  "home-service-school-support.jpg",
  "home-service-in-home-therapy.jpg",
  "home-service-center-based-therapy.jpg",
  "home-service-early-intervention.jpg",
  "aba-therapy-hero-session.jpg",
  "aba-section-evidence-based.jpg",
  "aba-section-how-helps.jpg",
  "aba-section-play-based.jpg",
  "aba-section-who-benefits.jpg",
  "aba-section-typical-day.jpg",
  "aba-section-signs-benefit.jpg",
  "aba-section-by-age.jpg",
  "aba-section-progress.jpg",
  "aba-section-assessment.jpg",
  "aba-section-first-ninety.jpg",
  "aba-section-parent-questions.jpg",
  "aba-day-step-arrival.jpg",
  "aba-day-step-warmup.jpg",
  "aba-day-step-skills.jpg",
  "aba-day-step-social-play.jpg",
  "aba-day-step-break.jpg",
  "aba-day-step-wrapup.jpg",
  "about-eden-hero-team.jpg",
  "about-eden-family-centered-care.jpg",
  "contact-care-coordinator.jpg",
  "autism-evaluation-clinician-parent.jpg",
  "mchat-parent-screener.jpg",
  "insurance-benefits-support.jpg",
  "insurance-prior-authorization.jpg",
  "admissions-family-intake.jpg",
  "locations-clinic-welcome.jpg",
  "parent-resources-reading.jpg",
  "what-is-autism-family-consultation.jpg",
  "what-is-autism-child-learning.jpg",
  "what-is-autism-community-support.jpg",
  "what-is-autism-early-signs-observation.jpg",
  "what-is-autism-social-skills.jpg",
  "what-is-autism-language-development.jpg",
  "what-is-autism-communication-practice.jpg",
  "what-is-autism-sensory-play.jpg",
  "what-is-autism-emotional-regulation.jpg",
  "what-is-autism-daily-living.jpg",
  "what-is-autism-school-support.jpg",
  "what-is-autism-family-meeting.jpg",
  "what-is-autism-research-family.jpg",
  "what-is-autism-individualized-support.jpg",
  "what-is-autism-evaluation.jpg",
  "what-is-autism-screening.jpg",
  "what-is-autism-aba-overview.jpg",
  "what-is-autism-parent-training.jpg",
  "what-is-autism-clinic-therapy.jpg",
  "what-is-autism-in-home-therapy.jpg",
  "what-is-autism-progress.jpg",
  "what-is-autism-family-resources.jpg",
  "what-is-autism-get-started.jpg",
  "what-is-autism-milestones-18-months.jpg",
  "what-is-autism-milestones-2-years.jpg",
  "what-is-autism-milestones-3-years.jpg",
  "what-is-autism-milestones-4-years.jpg",
  "what-is-autism-milestones-5-years.jpg",
];

let ok = 0;
let skip = 0;

for (let i = 0; i < FILES.length; i += 1) {
  const filename = FILES[i];
  const dest = join(outDir, filename);
  try {
    await access(dest);
    skip += 1;
    continue;
  } catch {
    // missing — download
  }
  const photoId = VERIFIED[i % VERIFIED.length];
  const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=80`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok += 1;
    console.log(`✓ ${filename} ← ${photoId}`);
  } catch (error) {
    console.error(`✗ ${filename}: ${error.message}`);
  }
}

console.log(`\nFilled ${ok} missing, skipped ${skip} existing.`);
