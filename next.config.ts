import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/news', destination: '/intel', permanent: true },
      { source: '/intelligence', destination: '/intel', permanent: true },
      { source: '/about-us', destination: '/home/about', permanent: true },
      { source: '/services/threat-monitoring', destination: '/hub/soc', permanent: true },
      { source: '/services/incident-response', destination: '/hub/soc/incident-response', permanent: true },
      { source: '/services/compliance-management', destination: '/hub/compliance', permanent: true },
      { source: '/services/federal-compliance', destination: '/hub/compliance/federal', permanent: true },
      { source: '/services/asset-recovery', destination: '/assets/recovery', permanent: true },
      { source: '/teams', destination: '/community', permanent: true },
      { source: '/portfolio', destination: '/assets', permanent: true },
      { source: '/qfs', destination: '/assets/qfs', permanent: true },
      { source: '/cyber-sentinel-trust', destination: '/hub/research', permanent: true },
      { source: '/bridge/alliance-trust', destination: '/assets/alliance-trust', permanent: true },
      { source: '/case-studies', destination: '/home/case-studies', permanent: true },
      { source: '/resources', destination: '/intel/resources', permanent: true },
      { source: '/pricing', destination: '/home/pricing', permanent: true },
      { source: '/contact-us', destination: '/home/contact', permanent: true },
    ];
  },
};

export default nextConfig;
