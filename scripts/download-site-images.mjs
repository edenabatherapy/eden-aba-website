#!/usr/bin/env node
/**
 * Downloads unique placeholder photos into public/images/.
 * Each filename maps to one distinct Unsplash photo ID.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images");

const IMAGE_SOURCES = {
  "home-family-autism-care-deco-left.jpg": "photo-1607453998774-d533f65dac99",
  "home-therapist-child-support-deco-right.jpg": "photo-1516627145497-ae6968895b74",
  "home-service-school-support.jpg": "photo-1509062526246-059595136b85",
  "home-service-in-home-therapy.jpg": "photo-1587654780291-39c9404d746b",
  "home-service-center-based-therapy.jpg": "photo-1588072432836-e10032774350",
  "home-service-early-intervention.jpg": "photo-1488520877036-213b0ed38a2f",

  "aba-therapy-hero-session.jpg": "photo-1596495578065-6e0763fa1178",
  "aba-section-evidence-based.jpg": "photo-1576765608535-5e04a4b4a5c5",
  "aba-section-how-helps.jpg": "photo-1604881991720-f91add269bed",
  "aba-section-play-based.jpg": "photo-1503454537195-1dcabb73ffb9",
  "aba-section-who-benefits.jpg": "photo-1516534770206-ad29c075934e",
  "aba-section-typical-day.jpg": "photo-1544717297-f8995ab504cc",
  "aba-section-signs-benefit.jpg": "photo-1579154204601-01588fb58226",
  "aba-section-by-age.jpg": "photo-1519824145375-96960745229f",
  "aba-section-progress.jpg": "photo-1551836022-d5d88e9218df",
  "aba-section-assessment.jpg": "photo-1584515939437-2a4236927c59",
  "aba-section-first-ninety.jpg": "photo-1573497019140-b87d7497d8b1",
  "aba-section-parent-questions.jpg": "photo-1576091160556-0b0deb5fc635",
  "aba-day-step-arrival.jpg": "photo-1476703993599-0035583a4928",
  "aba-day-step-warmup.jpg": "photo-1512820790801-58125515f9f3",
  "aba-day-step-skills.jpg": "photo-1530023368154-c11c4d881922",
  "aba-day-step-social-play.jpg": "photo-1560250097-dfc86bb37365",
  "aba-day-step-break.jpg": "photo-1582750431439-178eb1015c99",
  "aba-day-step-wrapup.jpg": "photo-1612349317150-e413f6a5b16d",

  "about-eden-hero-team.jpg": "photo-1529156069898-bce0e8505812",
  "about-eden-family-centered-care.jpg": "photo-1609220039445-40a8941486b8",
  "contact-care-coordinator.jpg": "photo-1573496359142-b8d87734a5a2",

  "autism-evaluation-clinician-parent.jpg": "photo-1631815589968-fdb097a4b882",
  "mchat-parent-screener.jpg": "photo-1579684385127-1ef15d508118",

  "insurance-benefits-support.jpg": "photo-1450101499163-c8848c66ca85",
  "insurance-prior-authorization.jpg": "photo-1554224155-6726b3ff858f",

  "admissions-family-intake.jpg": "photo-1576091160399-112ba8d25d1d",
  "locations-clinic-welcome.jpg": "photo-1519494026892-80bbd2d6fd0d",
  "parent-resources-reading.jpg": "photo-1503676260728-1c00da094a0b",

  "what-is-autism-family-consultation.jpg": "photo-1629909613654-966e96796626",
  "what-is-autism-child-learning.jpg": "photo-1631217865072-1e100a393a9e",
  "what-is-autism-community-support.jpg": "photo-1581594693702-fbdc50a7502c",
  "what-is-autism-early-signs-observation.jpg": "photo-1556760544-74068525f36c",
  "what-is-autism-social-skills.jpg": "photo-1522202176988-66273c2fd55f",
  "what-is-autism-language-development.jpg": "photo-1503454537195-1dcabb73ffb9",
  "what-is-autism-communication-practice.jpg": "photo-1662482995250-d31a24c1442b",
  "what-is-autism-sensory-play.jpg": "photo-1713877843577-eda4065d8e63",
  "what-is-autism-emotional-regulation.jpg": "photo-1579154204601-01588fb58226",
  "what-is-autism-daily-living.jpg": "photo-1519824145375-96960745229f",
  "what-is-autism-school-support.jpg": "photo-1509062526246-059595136b85",
  "what-is-autism-family-meeting.jpg": "photo-1573497019140-b87d7497d8b1",
  "what-is-autism-research-family.jpg": "photo-1576765608535-5e04a4b4a5c5",
  "what-is-autism-individualized-support.jpg": "photo-1596495578065-6e0763fa1178",
  "what-is-autism-evaluation.jpg": "photo-1631815589968-fdb097a4b882",
  "what-is-autism-screening.jpg": "photo-1588072432836-e10032774350",
  "what-is-autism-aba-overview.jpg": "photo-1551836022-d5d88e9218df",
  "what-is-autism-parent-training.jpg": "photo-1609220039445-40a8941486b8",
  "what-is-autism-clinic-therapy.jpg": "photo-1519494026892-80bbd2d6fd0d",
  "what-is-autism-in-home-therapy.jpg": "photo-1587654780291-39c9404d746b",
  "what-is-autism-progress.jpg": "photo-1554224155-6726b3ff858f",
  "what-is-autism-family-resources.jpg": "photo-1503676260728-1c00da094a0b",
  "what-is-autism-get-started.jpg": "photo-1529156069898-bce0e8505812",
  "what-is-autism-milestones-18-months.jpg": "photo-1488520877036-213b0ed38a2f",
  "what-is-autism-milestones-2-years.jpg": "photo-1516627145497-ae6968895b74",
  "what-is-autism-milestones-3-years.jpg": "photo-1607453998774-d533f65dac99",
  "what-is-autism-milestones-4-years.jpg": "photo-1584515939437-2a4236927c59",
  "what-is-autism-milestones-5-years.jpg": "photo-1544717297-f8995ab504cc",
};

await mkdir(outDir, { recursive: true });

let ok = 0;
let fail = 0;

for (const [filename, photoId] of Object.entries(IMAGE_SOURCES)) {
  const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=80`;
  const dest = join(outDir, filename);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok += 1;
    console.log(`✓ ${filename}`);
  } catch (error) {
    fail += 1;
    console.error(`✗ ${filename}: ${error.message}`);
  }
}

console.log(`\nDone: ${ok} saved, ${fail} failed → ${outDir}`);
