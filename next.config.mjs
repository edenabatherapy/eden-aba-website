/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY || "",
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY:
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || process.env.RECAPTCHA_SITE_KEY || "",
    NEXT_PUBLIC_RECAPTCHA_BYPASS:
      process.env.NEXT_PUBLIC_RECAPTCHA_BYPASS || process.env.RECAPTCHA_BYPASS || "",
  },
  async redirects() {
    return [
      {
        source: "/about-eden/mission-values",
        destination: "/about/our-mission-values",
        permanent: true,
      },
      {
        source: "/about-eden/our-story",
        destination: "/about/our-story",
        permanent: true,
      },
      {
        source: "/about-eden/leadership-team",
        destination: "/about/our-team",
        permanent: true,
      },
      {
        source: "/about-eden/clinical-excellence",
        destination: "/about/our-approach",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/about/our-story",
        permanent: false,
      },
      {
        source: "/resources/parent-training",
        destination: "/aba-therapy/parent-training",
        permanent: true,
      },
      {
        source: "/resources/family-training-support",
        destination: "/aba-therapy/parent-training",
        permanent: true,
      },
      {
        source: "/resources/parent-guides",
        destination: "/aba-therapy/parent-training",
        permanent: true,
      },
      {
        source: "/resources/what-is-aba-therapy",
        destination: "/aba-therapy/what-is-aba-therapy",
        permanent: true,
      },
      {
        source: "/resources/how-aba-therapy-works",
        destination: "/aba-therapy/what-is-aba-therapy",
        permanent: true,
      },
      {
        source: "/aba-therapy/how-aba-therapy-works",
        destination: "/aba-therapy/what-is-aba-therapy",
        permanent: true,
      },
      {
        source: "/autism-assessment",
        destination: "/services/evaluations-diagnosis/screening-evaluation",
        permanent: true,
      },
      {
        source: "/autism-evaluation/assessment-process",
        destination: "/services/evaluations-diagnosis/screening-evaluation",
        permanent: true,
      },
      {
        source: "/autism-evaluation/ados-2-assessment",
        destination: "/services/evaluations-diagnosis/screening-evaluation",
        permanent: true,
      },
      {
        source: "/autism-evaluation/ados-2",
        destination: "/services/evaluations-diagnosis/screening-evaluation",
        permanent: true,
      },
      {
        source: "/services/evaluations-diagnosis/m-chat-r-online-screener",
        destination: "/services/evaluations-diagnosis/screening-evaluation",
        permanent: true,
      },
      {
        source: "/services/evaluations-diagnosis/ados-2-assessment",
        destination: "/services/evaluations-diagnosis/screening-evaluation",
        permanent: true,
      },
      {
        source: "/m-chat-r-online-screener",
        destination: "/services/evaluations-diagnosis/screening-evaluation",
        permanent: true,
      },
      {
        source: "/speech-language-screening",
        destination: "/services/speech-language-therapy/screening",
        permanent: true,
      },
      {
        source: "/careers/behavior-technician-rbt",
        destination: "/careers/behavior-technician-careers",
        permanent: true,
      },
      {
        source: "/careers/growth-pathways",
        destination: "/careers/career-growth-pathways",
        permanent: true,
      },
      {
        source: "/service-settings/center-based-aba-therapy",
        destination: "/services/center-based-aba-therapy",
        permanent: true,
      },
      {
        source: "/service-settings/home-based-aba-therapy",
        destination: "/services/home-based-aba-therapy",
        permanent: true,
      },
      {
        source: "/services/in-home-aba-therapy",
        destination: "/services/home-based-aba-therapy",
        permanent: true,
      },
      {
        source: "/service-settings/community-based-aba-therapy",
        destination: "/services/community-based-aba-therapy",
        permanent: true,
      },
      {
        source: "/service-settings/virtual-aba-therapy",
        destination: "/services/virtual-aba-therapy",
        permanent: true,
      },
      {
        source: "/service-settings/afterschool-programs",
        destination: "/services/after-school-programs",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/what-is-autism", destination: "/" },
        { source: "/m-chat-r", destination: "/" },
        { source: "/cast", destination: "/" },
        { source: "/m-chat-r-online-screener", destination: "/" },
        { source: "/autism-assessment", destination: "/" },
        { source: "/autism-evaluation/:path*", destination: "/" },
        { source: "/aba-therapy/admissions", destination: "/" },
        { source: "/aba-therapy/outcomes-family-stories", destination: "/" },
        { source: "/intake", destination: "/" },
        { source: "/schedule-appointment", destination: "/" },
        { source: "/insurance-coverage", destination: "/" },
        { source: "/locations", destination: "/" },
        { source: "/locations/:path*", destination: "/" },
        { source: "/about-eden/:path*", destination: "/" },
      ],
    };
  },
};

export default nextConfig;
