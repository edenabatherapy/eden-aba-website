/**
 * Central image registry for Eden ABA Therapy.
 * Each major page uses topic-matched child/family/therapy photography.
 * Regenerate assets: node scripts/compliant-image-replacement.mjs
 */

import {
  HOME_SERVICE_IMAGE_PATHS,
  INSURANCE_SUPPORT_IMAGE_PATH,
} from "./services/home-service-images";

export const SITE_IMAGES = {
  home: {
    awarenessDecoLeft: "/images/home-family-autism-care-deco-left.jpg",
    awarenessDecoRight: "/images/home-therapist-child-support-deco-right.jpg",
    services: [...HOME_SERVICE_IMAGE_PATHS],
  },
  abaTherapy: {
    hero: "/images/aba-therapy-hero-session.jpg",
    sections: {
      evidence: "/images/aba-section-evidence-based.jpg",
      howHelps: "/images/aba-section-how-helps.jpg",
      playBased: "/images/aba-section-play-based.jpg",
      whoBenefits: "/images/aba-section-who-benefits.jpg",
      typicalDay: "/images/aba-section-typical-day.jpg",
      signsBenefit: "/images/aba-section-signs-benefit.jpg",
      byAge: "/images/aba-section-by-age.jpg",
      progress: "/images/aba-section-progress.jpg",
      assessment: "/images/aba-section-assessment.jpg",
      firstNinety: "/images/aba-section-first-ninety.jpg",
      parentQuestions: "/images/aba-section-parent-questions.jpg",
    },
    daySteps: [
      "/images/aba-day-step-arrival.jpg",
      "/images/aba-day-step-warmup.jpg",
      "/images/aba-day-step-skills.jpg",
      "/images/aba-day-step-social-play.jpg",
      "/images/aba-day-step-break.jpg",
      "/images/aba-day-step-wrapup.jpg",
    ],
  },
  aboutEden: {
    hero: "/images/about-eden-hero-team.jpg",
    familyCentered: "/images/about-eden-family-centered-care.jpg",
    contactSupport: "/images/contact-care-coordinator.jpg",
  },
  autismAssessment: {
    hero: "/images/autism-evaluation-clinician-parent.jpg",
    collage: [
      "/images/autism-eval-collage-toddler.jpg",
      "/images/autism-eval-collage-school-age.jpg",
      "/images/autism-eval-collage-blocks.jpg",
      "/images/autism-eval-collage-therapy.jpg",
    ],
  },
  /** Alias used by AutismEvaluationPage.jsx */
  get autismEvaluation() {
    return this.autismAssessment;
  },
  castScreener: {
    hero: "/images/cast-hero-parent-child.jpg",
    gallery: [
      "/images/autism-eval-collage-school-age.jpg",
      "/images/mchat-topic-social-engagement.jpg",
      "/images/mchat-topic-imaginative-play.jpg",
    ],
  },
  ados2Assessment: {
    hero: "/images/ados2-hero-clinician-child.jpg",
    measure: "/images/ados2-play-assessment.jpg",
    results: "/images/ados2-family-review.jpg",
  },
  schoolBasedAba: {
    hero: HOME_SERVICE_IMAGE_PATHS[0],
    classroom: "/images/what-is-autism-school-support.jpg",
    collaboration: "/images/autism-eval-collage-school-age.jpg",
    team: "/images/home-service-social-skills.jpg",
  },
  ideEvaluation: {
    hero: "/images/ide-hero-diagnostic-support.jpg",
    tools: "/images/ide-tools-play-materials.jpg",
    after: "/images/ide-after-family-feedback.jpg",
  },
  autismScreenerFaqs: {
    hero: "/images/screener-faqs-hero-parent-child.jpg",
    cta: "/images/screener-faqs-child-play.jpg",
  },
  parentGuidance: {
    hero: "/images/parent-guidance-hero-parent-child.jpg",
    milestones: "/images/parent-guidance-milestones-play.jpg",
  },
  mchatScreener: {
    collage: [
      "/images/mchat-collage-mother-play.jpg",
      "/images/mchat-collage-father-read.jpg",
      "/images/mchat-collage-blocks-stack.jpg",
      "/images/mchat-collage-eye-contact.jpg",
    ],
    topics: {
      social: "/images/mchat-topic-social-engagement.jpg",
      communication: "/images/mchat-topic-communication.jpg",
      jointAttention: "/images/mchat-topic-joint-attention.jpg",
      imaginative: "/images/mchat-topic-imaginative-play.jpg",
      sensory: "/images/mchat-topic-sensory-play.jpg",
    },
  },
  insurance: {
    hero: INSURANCE_SUPPORT_IMAGE_PATH,
    priorAuth: "/images/insurance/insurance-prior-authorization.png",
  },
  intake: {
    hero: "/images/admissions-family-intake.jpg",
  },
  admissions: {
    hero: "/images/home-service-center-based-aba.jpg",
    testimonialAccent: "/images/about-eden-family-centered-care.jpg",
    stepsAccent: "/images/aba-section-typical-day.jpg",
    whyChooseAccent: "/images/home-service-parent-training.jpg",
    findCareAccent: "/images/locations-clinic-welcome.jpg",
  },
  outcomesFamilyStories: {
    hero: "/images/aba-therapy-hero-session.jpg",
    stories: [
      "/images/what-is-autism-language-development.jpg",
      "/images/what-is-autism-school-support.jpg",
      "/images/what-is-autism-daily-living.jpg",
      "/images/what-is-autism-social-skills.jpg",
      "/images/what-is-autism-emotional-regulation.jpg",
      "/images/what-is-autism-progress.jpg",
    ],
    school: "/images/aba-section-typical-day.jpg",
    evidence: "/images/about-eden-family-centered-care.jpg",
  },
  centerBasedAba: {
    hero: HOME_SERVICE_IMAGE_PATHS[2],
    centers: "/images/locations-clinic-welcome.jpg",
    gallery: [
      "/images/aba-section-play-based.jpg",
      "/images/aba-day-step-social-play.jpg",
      "/images/aba-section-typical-day.jpg",
      "/images/about-eden-family-centered-care.jpg",
      "/images/locations-clinic-welcome.jpg",
      "/images/aba-day-step-skills.jpg",
    ],
    programs: [
      "/images/what-is-autism-milestones-2-years.jpg",
      "/images/aba-section-by-age.jpg",
      "/images/aba-section-signs-benefit.jpg",
      "/images/what-is-autism-social-skills.jpg",
      "/images/home-service-parent-training.jpg",
      "/images/aba-section-assessment.jpg",
    ],
  },
  homeBasedAba: {
    hero: HOME_SERVICE_IMAGE_PATHS[1],
    programs: [
      "/images/home-service-early-intervention.jpg",
      "/images/aba-section-by-age.jpg",
      "/images/aba-section-signs-benefit.jpg",
      "/images/home-service-parent-training.jpg",
      "/images/home-service-behavior-assessment.jpg",
      "/images/home-service-social-skills.jpg",
    ],
  },
  communityBasedAba: {
    hero: "/images/what-is-autism-community-support.jpg",
    gallery: [
      "/images/aba-section-play-based.jpg",
      "/images/aba-day-step-social-play.jpg",
      "/images/aba-section-typical-day.jpg",
      "/images/what-is-autism-social-skills.jpg",
      "/images/home-service-social-skills.jpg",
      "/images/aba-day-step-skills.jpg",
    ],
  },
  /** Virtual ABA uses inline SVG illustrations — no shared JPG paths */
  virtualAba: {
    usesCustomIllustrations: true,
  },
  locations: {
    hero: "/images/locations-clinic-welcome.jpg",
  },
  parentResources: {
    banner: "/images/parent-resources-reading.jpg",
  },
  whatIsAutism: {
    hero: "/images/what-is-autism-family-consultation.jpg",
    learning: "/images/what-is-autism-child-learning.jpg",
    community: "/images/what-is-autism-community-support.jpg",
    observation: "/images/what-is-autism-early-signs-observation.jpg",
    social: "/images/what-is-autism-social-skills.jpg",
    language: "/images/what-is-autism-language-development.jpg",
    nonverbal: "/images/what-is-autism-communication-practice.jpg",
    sensory: "/images/what-is-autism-sensory-play.jpg",
    regulation: "/images/what-is-autism-emotional-regulation.jpg",
    daily: "/images/what-is-autism-daily-living.jpg",
    school: "/images/what-is-autism-school-support.jpg",
    family: "/images/what-is-autism-family-meeting.jpg",
    research: "/images/what-is-autism-research-family.jpg",
    support: "/images/what-is-autism-individualized-support.jpg",
    evaluation: "/images/what-is-autism-evaluation.jpg",
    screening: "/images/what-is-autism-screening.jpg",
    aba: "/images/what-is-autism-aba-overview.jpg",
    parent: "/images/what-is-autism-parent-training.jpg",
    clinic: "/images/what-is-autism-clinic-therapy.jpg",
    home: "/images/what-is-autism-in-home-therapy.jpg",
    progress: "/images/what-is-autism-progress.jpg",
    resources: "/images/what-is-autism-family-resources.jpg",
    cta: "/images/what-is-autism-get-started.jpg",
    milestones: [
      "/images/what-is-autism-milestones-18-months.jpg",
      "/images/what-is-autism-milestones-2-years.jpg",
      "/images/what-is-autism-milestones-3-years.jpg",
      "/images/what-is-autism-milestones-4-years.jpg",
      "/images/what-is-autism-milestones-5-years.jpg",
    ],
  },
};

/** Flat list of every registered image path (for inventory / duplicate checks). */
export function getAllSiteImagePaths() {
  const paths = [];
  const walk = (value) => {
    if (typeof value === "string") paths.push(value);
    else if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object") Object.values(value).forEach(walk);
  };
  walk(SITE_IMAGES);
  return paths;
}
