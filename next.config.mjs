/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/what-is-autism", destination: "/" },
        { source: "/m-chat-r-online-screener", destination: "/" },
        { source: "/autism-assessment", destination: "/" },
        { source: "/autism-evaluation/cast-online-screener", destination: "/" },
        { source: "/autism-evaluation/ados-2-assessment", destination: "/" },
        { source: "/autism-evaluation/ide-evaluation", destination: "/" },
        { source: "/autism-evaluation/autism-screener-faqs", destination: "/" },
        { source: "/autism-evaluation/parent-guidance", destination: "/" },
      ],
    };
  },
};

export default nextConfig;
