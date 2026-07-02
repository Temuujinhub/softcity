import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      { source: "/work/projects/festival-2025", destination: "/work/festival", permanent: true },
      { source: "/work/projects/festival-2026", destination: "/work/festival", permanent: true },
      { source: "/work/training/meetings", destination: "/work/meetings", permanent: true },
      { source: "/work/consulting/events", destination: "/work/training", permanent: true },
      { source: "/work/consulting/study-tours", destination: "/work/study-tours", permanent: true },
      { source: "/work/consulting/translation", destination: "/work/translation", permanent: true },
    ];
  },
};

export default nextConfig;
