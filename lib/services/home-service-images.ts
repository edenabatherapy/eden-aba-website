/** Homepage service cards and matching service-page hero images (index order = locale `services`). */
export const HOME_SERVICE_IMAGE_PATHS = [
  "/images/services/school-support-aba.webp",
  "/images/services/home-based-aba.webp",
  "/images/services/center-based-aba.webp",
  "/images/services/early-intervention.webp",
  "/images/services/behavior-assessment.webp",
  "/images/services/individualized-aba.webp",
  "/images/services/social-skills-training.webp",
  "/images/services/parent-training-support.webp",
] as const;

export const INSURANCE_SUPPORT_IMAGE_PATH = "/images/services/insurance-support.webp";

export const HOME_SERVICE_IMAGE_WIDTH = 1200;
export const HOME_SERVICE_IMAGE_HEIGHT = 800;

export function getHomeServiceImagePath(index: number): string {
  return HOME_SERVICE_IMAGE_PATHS[index] ?? HOME_SERVICE_IMAGE_PATHS[0];
}
