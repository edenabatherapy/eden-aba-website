/** Homepage service cards and matching service-page hero images (index order = locale `services`). */
export const HOME_SERVICE_IMAGE_PATHS = [
  "/images/home-service-school-support.jpg",
  "/images/home-service-in-home-aba.jpg",
  "/images/home-service-center-based-aba.jpg",
  "/images/home-service-early-intervention.jpg",
  "/images/home-service-behavior-assessment.jpg",
  "/images/home-service-individualized-programs.jpg",
  "/images/home-service-social-skills.jpg",
  "/images/home-service-parent-training.jpg",
] as const;

export const HOME_SERVICE_IMAGE_WIDTH = 1200;
export const HOME_SERVICE_IMAGE_HEIGHT = 800;

export function getHomeServiceImagePath(index: number): string {
  return HOME_SERVICE_IMAGE_PATHS[index] ?? HOME_SERVICE_IMAGE_PATHS[0];
}
