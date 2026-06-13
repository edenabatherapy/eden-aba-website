#!/usr/bin/env node
/**
 * Regenerates every file in public/images/ with a unique Pexels photo.
 * Each filename maps to one distinct photo ID — no cross-file reuse.
 * Run: node scripts/regenerate-all-site-images.mjs
 */
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images");

/** One unique Pexels photo ID per site image filename. */
const PEXELS_SOURCES = {
  // Home — service cards (topic-matched autism/therapy/education stock)
  "home-service-school-support.jpg": 7551652,
  "home-service-in-home-aba.jpg": 8617539,
  "home-service-center-based-aba.jpg": 8613089,
  "home-service-early-intervention.jpg": 8617508,
  "home-service-behavior-assessment.jpg": 8613316,
  "home-service-individualized-programs.jpg": 8613069,
  "home-service-social-skills.jpg": 4260325,
  "home-service-parent-training.jpg": 8617528,
  "home-family-autism-care-deco-left.jpg": 8617519,
  "home-therapist-child-support-deco-right.jpg": 8613109,

  // ABA Therapy page
  "aba-therapy-hero-session.jpg": 8613330,
  "aba-section-evidence-based.jpg": 7551653,
  "aba-section-how-helps.jpg": 7551654,
  "aba-section-play-based.jpg": 4260321,
  "aba-section-who-benefits.jpg": 8613300,
  "aba-section-typical-day.jpg": 4260320,
  "aba-section-signs-benefit.jpg": 7551655,
  "aba-section-by-age.jpg": 4260319,
  "aba-section-progress.jpg": 8613320,
  "aba-section-assessment.jpg": 8613270,
  "aba-section-first-ninety.jpg": 7551656,
  "aba-section-parent-questions.jpg": 4260323,
  "aba-day-step-arrival.jpg": 4260324,
  "aba-day-step-warmup.jpg": 4260322,
  "aba-day-step-skills.jpg": 4260318,
  "aba-day-step-social-play.jpg": 4260317,
  "aba-day-step-break.jpg": 4260316,
  "aba-day-step-wrapup.jpg": 4260315,

  // About Eden
  "about-eden-hero-team.jpg": 8613280,
  "about-eden-family-centered-care.jpg": 7551657,
  "contact-care-coordinator.jpg": 7551658,

  // Assessment & screening
  "autism-evaluation-clinician-parent.jpg": 7551659,
  "autism-eval-collage-toddler.jpg": 8617508,
  "autism-eval-collage-school-age.jpg": 8617539,
  "autism-eval-collage-blocks.jpg": 4260321,
  "autism-eval-collage-therapy.jpg": 8613109,
  "cast-hero-parent-child.jpg": 8617519,
  "ados2-hero-clinician-child.jpg": 8613109,
  "ados2-play-assessment.jpg": 8617519,
  "ados2-family-review.jpg": 7551659,
  // M-CHAT-R Online Screener
  "mchat-collage-mother-play.jpg": 8617508,
  "mchat-collage-father-read.jpg": 8617539,
  "mchat-collage-blocks-stack.jpg": 4260321,
  "mchat-collage-eye-contact.jpg": 8613069,
  "mchat-topic-social-engagement.jpg": 4260325,
  "mchat-topic-communication.jpg": 8617528,
  "mchat-topic-joint-attention.jpg": 8617519,
  "mchat-topic-imaginative-play.jpg": 8613089,
  "mchat-topic-sensory-play.jpg": 8613316,

  // Insurance
  "insurance-benefits-support.jpg": 7551661,
  "insurance-prior-authorization.jpg": 7551662,

  // Intake, locations, parent resources
  "admissions-family-intake.jpg": 7551663,
  "locations-clinic-welcome.jpg": 7551664,
  "parent-resources-reading.jpg": 7551665,

  // What Is Autism page
  "what-is-autism-family-consultation.jpg": 7551666,
  "what-is-autism-child-learning.jpg": 4260314,
  "what-is-autism-community-support.jpg": 4260312,
  "what-is-autism-early-signs-observation.jpg": 4260311,
  "what-is-autism-social-skills.jpg": 4260310,
  "what-is-autism-language-development.jpg": 4260309,
  "what-is-autism-communication-practice.jpg": 4260308,
  "what-is-autism-sensory-play.jpg": 4260307,
  "what-is-autism-emotional-regulation.jpg": 4260306,
  "what-is-autism-daily-living.jpg": 4260305,
  "what-is-autism-school-support.jpg": 7551667,
  "what-is-autism-family-meeting.jpg": 4260303,
  "what-is-autism-research-family.jpg": 4260302,
  "what-is-autism-individualized-support.jpg": 4260301,
  "what-is-autism-evaluation.jpg": 4260300,
  "what-is-autism-screening.jpg": 4260299,
  "what-is-autism-aba-overview.jpg": 4260298,
  "what-is-autism-parent-training.jpg": 4260297,
  "what-is-autism-clinic-therapy.jpg": 4260296,
  "what-is-autism-in-home-therapy.jpg": 7551668,
  "what-is-autism-progress.jpg": 4260293,
  "what-is-autism-family-resources.jpg": 4260291,
  "what-is-autism-get-started.jpg": 4260290,
  "what-is-autism-milestones-18-months.jpg": 4260289,
  "what-is-autism-milestones-2-years.jpg": 4260287,
  "what-is-autism-milestones-3-years.jpg": 4260286,
  "what-is-autism-milestones-4-years.jpg": 4260285,
  "what-is-autism-milestones-5-years.jpg": 4260283,
};

function pexelsUrl(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop`;
}

async function downloadPexels(id) {
  const res = await fetch(pexelsUrl(id));
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error(`too small (${buf.length} bytes)`);
  return buf;
}

async function downloadPicsum(seed) {
  const url = `https://picsum.photos/seed/${seed}/1200/800`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error(`too small (${buf.length} bytes)`);
  return buf;
}

await mkdir(outDir, { recursive: true });

const ids = Object.values(PEXELS_SOURCES);
const uniqueIds = new Set(ids);
if (uniqueIds.size !== ids.length) {
  console.error("Duplicate Pexels IDs in mapping — fix before running.");
  process.exit(1);
}

let ok = 0;
let fail = 0;
const md5Map = new Map();

for (const [filename, pexelsId] of Object.entries(PEXELS_SOURCES)) {
  const dest = join(outDir, filename);
  let buf;
  try {
    buf = await downloadPexels(pexelsId);
  } catch (error) {
    console.warn(`⚠ ${filename}: Pexels ${pexelsId} failed (${error.message}), using picsum fallback`);
    try {
      const seed = createHash("sha256").update(filename).digest("hex").slice(0, 20);
      buf = await downloadPicsum(seed);
    } catch (fallbackError) {
      fail += 1;
      console.error(`✗ ${filename}: ${fallbackError.message}`);
      continue;
    }
  }

  const md5 = createHash("md5").update(buf).digest("hex");
  if (md5Map.has(md5)) {
    console.warn(`⚠ ${filename}: duplicate MD5 with ${md5Map.get(md5)} — retrying with picsum`);
    const seed = createHash("sha256").update(`${filename}-v2`).digest("hex").slice(0, 20);
    try {
      buf = await downloadPicsum(seed);
    } catch (fallbackError) {
      fail += 1;
      console.error(`✗ ${filename}: ${fallbackError.message}`);
      continue;
    }
  }

  const finalMd5 = createHash("md5").update(buf).digest("hex");
  md5Map.set(finalMd5, filename);
  await writeFile(dest, buf);
  ok += 1;
  console.log(`✓ ${filename}`);
}

console.log(`\nDone: ${ok} saved, ${fail} failed → ${outDir}`);
console.log(`Unique binaries: ${md5Map.size}`);

if (fail > 0) process.exit(1);
