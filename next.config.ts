import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/news',
        destination: '/intelligence',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
