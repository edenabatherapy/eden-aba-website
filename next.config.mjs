/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY || "",
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/what-is-autism", destination: "/" },
        { source: "/resources/:path*", destination: "/" },
        { source: "/m-chat-r", destination: "/" },
        { source: "/cast", destination: "/" },
        { source: "/m-chat-r-online-screener", destination: "/" },
        { source: "/autism-assessment", destination: "/" },
        { source: "/autism-evaluation/:path*", destination: "/" },
        { source: "/aba-therapy/admissions", destination: "/" },
        { source: "/aba-therapy/outcomes-family-stories", destination: "/" },
        { source: "/service-settings/center-based-aba-therapy", destination: "/" },
        { source: "/service-settings/home-based-aba-therapy", destination: "/" },
        { source: "/service-settings/community-based-aba-therapy", destination: "/" },
        { source: "/service-settings/virtual-aba-therapy", destination: "/" },
        { source: "/intake", destination: "/" },
        { source: "/schedule-appointment", destination: "/" },
        { source: "/insurance-coverage", destination: "/" },
        { source: "/contact", destination: "/" },
        { source: "/about-eden/:path*", destination: "/" },
        { source: "/careers", destination: "/" },
        { source: "/careers/:path*", destination: "/" },
      ],
    };
  },
};

export default nextConfig;
