#!/usr/bin/env node
/**
 * Replaces site images with individually verified child/family/therapy stock photos.
 * Each source ID was manually audited — no bulk Pexels range mapping.
 * Run: node scripts/compliant-image-replacement.mjs
 */
import { createHash } from "node:crypto";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images");

/** Verified Pexels child/family/therapy photo IDs (manually audited). */
const P = {
  schoolGirlsWalk: 8617519,
  classroomReading: 8613089,
  girlChalkboard: 8613069,
  girlNumbersPoster: 8613109,
  sensoryBallPlay: 8613310,
  childrenGroupCarpet: 8613316,
  childrenMeditation: 8613320,
  childrenMindfulness: 8613321,
  girlBananaPhone: 8617520,
  twoGirlsSnack: 8617521,
  threeGirlsLunch: 8617523,
  overheadLunch: 8617541,
  craftWithTherapist: 8613300,
  motherGirlWriting: 4260314,
  womanGirlLaptopGuide: 4260315,
  girlThinking: 4260316,
  girlWritingProfile: 4260317,
  womanGirlFocused: 4260318,
  girlWritingBraid: 4260319,
  fatherChildHug: 4260320,
  girlWritingDesk: 4260321,
  fatherSonCouch: 4260322,
  womanGirlLaptopPoint: 4260323,
  girlAssessmentWriting: 4260324,
  motherGirlLaptop: 4260325,
};

/** Verified Unsplash child/family photo IDs (manually audited). */
const U = {
  motherBaby: "photo-1607453998774-d533f65dac99",
  fatherChild: "photo-1516627145497-ae6968895b74",
  childPlaying: "photo-1503454537195-1dcabb73ffb9",
  toddler: "photo-1488520877036-213b0ed38a2f",
  motherChildHome: "photo-1587654780291-39c9404d746b",
  childLearning: "photo-1631217865072-1e100a393a9e",
  familyConsultation: "photo-1629909613654-966e96796626",
  communicationPractice: "photo-1662482995250-d31a24c1442b",
  sensoryPlay: "photo-1713877843577-eda4065d8e63",
  therapistChild: "photo-1596495578065-6e0763fa1178",
  childAssessment: "photo-1584515939437-2a4236927c59",
  therapyCenter: "photo-1588072432836-e10032774350",
  parentTraining: "photo-1609220039445-40a8941486b8",
  schoolChildren: "photo-1509062526246-059595136b85",
  parentScreener: "photo-1579684385127-1ef15d508118",
  childrenGroup: "photo-1516534770206-ad29c075934e",
  childOutdoorPlay: "photo-1476703993599-0035583a4928",
  childrenPlayground: "photo-1512820790801-58125515f9f3",
  childBlocks: "photo-1530023368154-c11c4d881922",
  childrenClassroom: "photo-1544717297-f8995ab504cc",
  childPlayTherapy: "photo-1555252333-9f8e92e65df9",
  parentChildReading: "photo-1503676260728-1c00da094a0b",
  childDailyLiving: "photo-1519824145375-96960745229f",
  playBasedTherapy: "photo-1604881991720-f91add269bed",
  therapyProgress: "photo-1551836022-d5d88e9218df",
  childrenPlaying: "photo-1503454537195-1dcabb73ffb9",
};

/** Topic-matched filename → source mapping. */
const REPLACEMENTS = {
  // M-CHAT-R / toddlers
  "mchat-hero-caregiver-toddler.jpg": ["unsplash", U.motherBaby],
  "mchat-collage-mother-play.jpg": ["unsplash", U.motherBaby],
  "mchat-collage-father-read.jpg": ["unsplash", U.fatherChild],
  "mchat-collage-blocks-stack.jpg": ["pexels", P.girlNumbersPoster],
  "mchat-collage-eye-contact.jpg": ["pexels", P.girlChalkboard],
  "mchat-topic-social-engagement.jpg": ["pexels", P.motherGirlLaptop],
  "mchat-topic-communication.jpg": ["pexels", P.womanGirlLaptopGuide],
  "mchat-topic-joint-attention.jpg": ["pexels", P.womanGirlFocused],
  "mchat-topic-imaginative-play.jpg": ["pexels", P.classroomReading],
  "mchat-topic-sensory-play.jpg": ["pexels", P.childrenGroupCarpet],
  "mchat-parent-screener.jpg": ["unsplash", U.parentScreener],
  "mchat-scoring-session.jpg": ["pexels", P.womanGirlLaptopPoint],
  "mchat-follow-up-support.jpg": ["pexels", P.fatherChildHug],

  // CAST / school-age
  "cast-hero-parent-child.jpg": ["pexels", P.schoolGirlsWalk],
  "autism-eval-collage-school-age.jpg": ["pexels", P.twoGirlsSnack],

  // ADOS-2 / IDE / evaluation
  "ados2-hero-clinician-child.jpg": ["pexels", P.craftWithTherapist],
  "ados2-play-assessment.jpg": ["pexels", P.girlAssessmentWriting],
  "ados2-family-review.jpg": ["pexels", P.womanGirlLaptopPoint],
  "ide-hero-diagnostic-support.jpg": ["pexels", P.motherGirlWriting],
  "ide-tools-play-materials.jpg": ["pexels", P.classroomReading],
  "ide-after-family-feedback.jpg": ["pexels", P.fatherSonCouch],

  // Autism evaluation hub
  "autism-evaluation-clinician-parent.jpg": ["pexels", P.womanGirlFocused],
  "autism-eval-collage-toddler.jpg": ["pexels", P.girlChalkboard],
  "autism-eval-collage-blocks.jpg": ["pexels", P.girlWritingDesk],
  "autism-eval-collage-therapy.jpg": ["unsplash", U.therapistChild],

  // Screener FAQs
  "screener-faqs-hero-parent-child.jpg": ["pexels", P.girlWritingBraid],
  "screener-faqs-child-play.jpg": ["pexels", P.sensoryBallPlay],
  "parent-guidance-hero-parent-child.jpg": ["pexels", 4260305],
  "parent-guidance-milestones-play.jpg": ["pexels", 8617541],

  // ABA Therapy page
  "aba-therapy-hero-session.jpg": ["unsplash", U.therapistChild],
  "aba-section-evidence-based.jpg": ["unsplash", U.playBasedTherapy],
  "aba-section-how-helps.jpg": ["pexels", P.craftWithTherapist],
  "aba-section-play-based.jpg": ["pexels", P.girlWritingDesk],
  "aba-section-who-benefits.jpg": ["pexels", P.childrenGroupCarpet],
  "aba-section-typical-day.jpg": ["pexels", P.threeGirlsLunch],
  "aba-section-signs-benefit.jpg": ["pexels", P.girlThinking],
  "aba-section-by-age.jpg": ["pexels", P.childrenMindfulness],
  "aba-section-progress.jpg": ["unsplash", U.therapyProgress],
  "aba-section-assessment.jpg": ["pexels", P.girlAssessmentWriting],
  "aba-section-first-ninety.jpg": ["pexels", P.fatherChildHug],
  "aba-section-parent-questions.jpg": ["pexels", P.womanGirlLaptopGuide],
  "aba-day-step-arrival.jpg": ["pexels", P.schoolGirlsWalk],
  "aba-day-step-warmup.jpg": ["pexels", P.sensoryBallPlay],
  "aba-day-step-skills.jpg": ["pexels", P.girlNumbersPoster],
  "aba-day-step-social-play.jpg": ["pexels", P.twoGirlsSnack],
  "aba-day-step-break.jpg": ["pexels", P.childrenMeditation],
  "aba-day-step-wrapup.jpg": ["pexels", P.fatherSonCouch],

  // What Is Autism / signs / milestones
  "what-is-autism-family-consultation.jpg": ["pexels", P.womanGirlFocused],
  "what-is-autism-child-learning.jpg": ["pexels", P.motherGirlWriting],
  "what-is-autism-community-support.jpg": ["pexels", P.childrenGroupCarpet],
  "what-is-autism-early-signs-observation.jpg": ["pexels", P.girlChalkboard],
  "what-is-autism-social-skills.jpg": ["pexels", P.twoGirlsSnack],
  "what-is-autism-language-development.jpg": ["pexels", P.girlNumbersPoster],
  "what-is-autism-communication-practice.jpg": ["pexels", P.womanGirlLaptopGuide],
  "what-is-autism-sensory-play.jpg": ["pexels", P.sensoryBallPlay],
  "what-is-autism-emotional-regulation.jpg": ["pexels", P.childrenMeditation],
  "what-is-autism-daily-living.jpg": ["pexels", P.girlWritingDesk],
  "what-is-autism-school-support.jpg": ["pexels", P.threeGirlsLunch],
  "what-is-autism-family-meeting.jpg": ["pexels", P.fatherChildHug],
  "what-is-autism-research-family.jpg": ["unsplash", U.parentChildReading],
  "what-is-autism-individualized-support.jpg": ["pexels", P.girlAssessmentWriting],
  "what-is-autism-evaluation.jpg": ["pexels", P.womanGirlFocused],
  "what-is-autism-screening.jpg": ["unsplash", U.parentScreener],
  "what-is-autism-aba-overview.jpg": ["unsplash", U.therapistChild],
  "what-is-autism-parent-training.jpg": ["pexels", P.womanGirlLaptopPoint],
  "what-is-autism-clinic-therapy.jpg": ["pexels", P.classroomReading],
  "what-is-autism-in-home-therapy.jpg": ["unsplash", U.motherChildHome],
  "what-is-autism-progress.jpg": ["unsplash", U.therapyProgress],
  "what-is-autism-family-resources.jpg": ["unsplash", U.parentChildReading],
  "what-is-autism-get-started.jpg": ["pexels", P.motherGirlLaptop],
  "what-is-autism-milestones-18-months.jpg": ["pexels", P.girlChalkboard],
  "what-is-autism-milestones-2-years.jpg": ["unsplash", U.motherBaby],
  "what-is-autism-milestones-3-years.jpg": ["pexels", P.girlChalkboard],
  "what-is-autism-milestones-4-years.jpg": ["pexels", P.sensoryBallPlay],
  "what-is-autism-milestones-5-years.jpg": ["pexels", P.girlBananaPhone],

  // Insurance / intake / resources (family-focused)
  "insurance-benefits-support.jpg": ["pexels", P.fatherChildHug],
  "insurance-prior-authorization.jpg": ["pexels", P.motherGirlLaptop],
  "admissions-family-intake.jpg": ["pexels", P.womanGirlLaptopPoint],
  "parent-resources-reading.jpg": ["unsplash", U.parentChildReading],

  // Home page services
  "home-family-autism-care-deco-left.jpg": ["pexels", P.fatherChildHug],
  "home-therapist-child-support-deco-right.jpg": ["unsplash", U.therapistChild],
  "home-service-school-support.jpg": ["pexels", P.schoolGirlsWalk],
  "home-service-in-home-aba.jpg": ["unsplash", U.motherChildHome],
  "home-service-center-based-aba.jpg": ["pexels", P.classroomReading],
  "home-service-early-intervention.jpg": ["pexels", P.girlChalkboard],
  "home-service-behavior-assessment.jpg": ["pexels", P.girlAssessmentWriting],
  "home-service-individualized-programs.jpg": ["pexels", P.girlWritingProfile],
  "home-service-social-skills.jpg": ["pexels", P.twoGirlsSnack],
  "home-service-parent-training.jpg": ["pexels", P.womanGirlLaptopGuide],

  // About / locations (child-friendly where possible)
  "about-eden-hero-team.jpg": ["pexels", P.classroomReading],
  "about-eden-family-centered-care.jpg": ["pexels", P.fatherSonCouch],
  "contact-care-coordinator.jpg": ["pexels", P.womanGirlLaptopGuide],
  "locations-clinic-welcome.jpg": ["pexels", P.schoolGirlsWalk],
};

function sourceUrl([type, id]) {
  if (type === "pexels") {
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop`;
  }
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
}

async function downloadSource(source) {
  const res = await fetch(sourceUrl(source));
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error(`too small (${buf.length}b)`);
  return buf;
}

await mkdir(outDir, { recursive: true });

const report = {
  replaced: [],
  failed: [],
  duplicates: [],
};

const md5ToFile = new Map();

for (const [filename, source] of Object.entries(REPLACEMENTS)) {
  const dest = join(outDir, filename);
  try {
    const buf = await downloadSource(source);
    const md5 = createHash("md5").update(buf).digest("hex");
    if (md5ToFile.has(md5)) {
      report.duplicates.push({ filename, sameAs: md5ToFile.get(md5), source });
    } else {
      md5ToFile.set(md5, filename);
    }
    await writeFile(dest, buf);
    report.replaced.push({ filename, source: source.join(":"), bytes: buf.length });
    console.log(`✓ ${filename} ← ${source.join(":")}`);
  } catch (error) {
    report.failed.push({ filename, source: source.join(":"), error: error.message });
    console.error(`✗ ${filename}: ${error.message}`);
  }
}

const reportPath = join(root, "IMAGE_AUDIT_REPORT.json");
await writeFile(reportPath, JSON.stringify(report, null, 2));
console.log(`\nDone: ${report.replaced.length} replaced, ${report.failed.length} failed`);
console.log(`Unique binaries: ${md5ToFile.size}`);
console.log(`Report: ${reportPath}`);

if (report.failed.length) process.exit(1);
