import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/contact', destination: '/contact-us', permanent: true },
      { source: '/privacy', destination: '/legal/privacy-policy', permanent: true },
      { source: '/terms', destination: '/legal/terms-of-service', permanent: true },
    ];
  },
};

export default nextConfig;
