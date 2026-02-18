export type AppRoute = {
  path: string;
  label: string;
  category: 'core' | 'platform' | 'admin' | 'legal';
  description: string;
};

export type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
  reason: string;
};

export const appRoutes: AppRoute[] = [
  { path: '/', label: 'Home', category: 'core', description: 'Unified enterprise one-page marketing surface.' },
  { path: '/services', label: 'Services', category: 'platform', description: 'Cybersecurity and IT service overview.' },
  { path: '/intelligence', label: 'Intelligence', category: 'platform', description: 'Threat and regulatory intelligence command center.' },
  { path: '/campaigns', label: 'Campaigns', category: 'platform', description: 'Email campaign planning and delivery workspace.' },
  { path: '/roadmap', label: 'Roadmap', category: 'platform', description: 'Platform delivery roadmap and release trajectory.' },
  { path: '/contact-us', label: 'Contact', category: 'core', description: 'Lead capture and support contact entry point.' },
  { path: '/resources', label: 'Resources', category: 'core', description: 'Security and compliance educational resources.' },
  { path: '/news', label: 'News', category: 'core', description: 'Company and threat landscape news updates.' },
  { path: '/specs', label: 'Architecture Specs', category: 'platform', description: 'Technical architecture and backend surfaces.' },
  { path: '/routes', label: 'Route Directory', category: 'platform', description: 'Published frontend and backend URL registry.' },
  { path: '/admin', label: 'Admin Center', category: 'admin', description: 'Operations portal for internal admins.' },
  { path: '/legal/privacy-policy', label: 'Privacy Policy', category: 'legal', description: 'Legal privacy disclosures and data handling policies.' },
  { path: '/legal/terms-of-service', label: 'Terms of Service', category: 'legal', description: 'Platform terms and service boundaries.' },
  { path: '/legal/cookie-policy', label: 'Cookie Policy', category: 'legal', description: 'Cookie usage and tracking policy.' },
];

export const legacyRedirects: LegacyRedirect[] = [
  { source: '/home', destination: '/', permanent: true, reason: 'Legacy alias consolidated into root homepage.' },
  { source: '/contact', destination: '/contact-us', permanent: true, reason: 'Legacy contact URL normalized.' },
  { source: '/privacy', destination: '/legal/privacy-policy', permanent: true, reason: 'Legacy privacy URL redirected to legal namespace.' },
  { source: '/terms', destination: '/legal/terms-of-service', permanent: true, reason: 'Legacy terms URL redirected to legal namespace.' },
  { source: '/architecture', destination: '/specs', permanent: true, reason: 'Architecture page now managed by specs route.' },
];
