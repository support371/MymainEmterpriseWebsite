import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
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

      // Dashboard → Portal redirects
      { source: '/dashboard', destination: '/portal', permanent: true },
      { source: '/dashboard/services', destination: '/portal/services', permanent: true },
      { source: '/dashboard/cybersecurity', destination: '/portal/cybersecurity', permanent: true },
      { source: '/dashboard/cybersecurity/incidents', destination: '/portal/cybersecurity/incidents', permanent: true },
      { source: '/dashboard/cybersecurity/monitoring', destination: '/portal/cybersecurity/monitoring', permanent: true },
      { source: '/dashboard/cybersecurity/compliance', destination: '/portal/cybersecurity/compliance', permanent: true },
      { source: '/dashboard/real-estate', destination: '/portal/real-estate', permanent: true },
      { source: '/dashboard/real-estate/deals', destination: '/portal/real-estate/deals', permanent: true },
      { source: '/dashboard/real-estate/documents', destination: '/portal/real-estate/documents', permanent: true },
      { source: '/dashboard/wealth/investments', destination: '/portal/wealth/investments', permanent: true },
      { source: '/dashboard/wealth/retirement', destination: '/portal/wealth/retirement', permanent: true },
      { source: '/dashboard/wealth/qfs', destination: '/portal/wealth/qfs', permanent: true },
      { source: '/dashboard/legal/poa', destination: '/portal/legal/poa', permanent: true },
      { source: '/dashboard/legal/estate', destination: '/portal/legal/estate', permanent: true },
      { source: '/dashboard/requests', destination: '/portal/requests', permanent: true },
      { source: '/dashboard/users', destination: '/portal/users', permanent: true },
      { source: '/dashboard/audit', destination: '/portal/audit', permanent: true },

      // Legal convenience redirects
      { source: '/privacy', destination: '/legal/privacy-policy', permanent: true },
      { source: '/terms', destination: '/legal/terms-of-service', permanent: true },
      { source: '/security', destination: '/services', permanent: true },
    ];
  },
};

export default nextConfig;
