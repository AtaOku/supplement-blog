import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/reviews", destination: "/research", permanent: true },
      { source: "/reviews/:slug", destination: "/research/:slug", permanent: true },
      { source: "/urun-inceleme", destination: "/research", permanent: true },
      { source: "/urun-inceleme/:slug", destination: "/research/:slug", permanent: true },
      { source: "/kategori/:slug", destination: "/category/:slug", permanent: true },
      { source: "/hakkimizda", destination: "/about", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
