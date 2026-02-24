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
  // ── CORE ──────────────────────────────────────────────────────────────────
  { path: '/', label: 'Home', category: 'core', description: 'Unified enterprise one-page marketing surface.' },
  { path: '/about', label: 'About', category: 'core', description: 'Company overview and trust positioning.' },
  { path: '/about-us', label: 'About Us', category: 'core', description: 'Extended organizational narrative and mission.' },
  { path: '/contact-us', label: 'Contact', category: 'core', description: 'Lead capture and support contact entry point.' },
  { path: '/resources', label: 'Resources', category: 'core', description: 'Security and compliance educational resources.' },
  { path: '/news', label: 'News', category: 'core', description: 'Company and threat landscape news updates.' },
  { path: '/leadership', label: 'Leadership', category: 'core', description: 'Leadership and advisory overview.' },
  { path: '/pricing', label: 'Pricing', category: 'core', description: 'Service packaging and pricing guidance.' },
  { path: '/teams', label: 'Teams', category: 'core', description: 'Team-oriented workflows and collaboration view.' },

  // ── PLATFORM ──────────────────────────────────────────────────────────────
  { path: '/services', label: 'Services', category: 'platform', description: 'Cybersecurity and IT service overview.' },
  { path: '/services/threat-monitoring', label: 'Threat Monitoring', category: 'platform', description: 'Continuous monitoring and alert intelligence delivery.' },
  { path: '/services/incident-response', label: 'Incident Response', category: 'platform', description: 'Coordinated incident triage, containment, and recovery support.' },
  { path: '/services/compliance-management', label: 'Compliance Management', category: 'platform', description: 'Compliance readiness lifecycle and evidence operations.' },
  { path: '/services/federal-compliance', label: 'Federal Compliance', category: 'platform', description: 'Federal-grade controls alignment and reporting support.' },
  { path: '/services/asset-recovery', label: 'Asset Recovery', category: 'platform', description: 'Asset tracking, recovery workflow, and post-incident assurance.' },
  { path: '/intelligence', label: 'Intelligence', category: 'platform', description: 'Threat and regulatory intelligence command center.' },
  { path: '/campaigns', label: 'Campaigns', category: 'platform', description: 'Email campaign planning and delivery workspace.' },
  { path: '/roadmap', label: 'Roadmap', category: 'platform', description: 'Platform delivery roadmap and release trajectory.' },
  { path: '/architecture', label: 'Architecture', category: 'platform', description: 'High-level architecture and enterprise systems view.' },
  { path: '/specs', label: 'Architecture Specs', category: 'platform', description: 'Technical architecture and backend surfaces.' },
  { path: '/routes', label: 'Route Directory', category: 'platform', description: 'Published frontend and backend URL registry.' },
  { path: '/live-preview', label: 'Enterprise Live Preview', category: 'platform', description: 'Unified enterprise surface combining brand homepage and route operations preview.' },
  { path: '/bridge/alliance-trust', label: 'Alliance Trust', category: 'platform', description: 'Strategic bridge narrative for alliance trust programs.' },
  { path: '/cyber-sentinel-trust', label: 'Cyber Sentinel Trust', category: 'platform', description: 'Trust-centered cybersecurity positioning surface.' },
  { path: '/membership', label: 'Membership', category: 'platform', description: 'Membership offerings and participation model.' },
  { path: '/portfolio', label: 'Portfolio', category: 'platform', description: 'Portfolio and capability references for enterprise buyers.' },
  { path: '/case-studies', label: 'Case Studies', category: 'platform', description: 'Delivered outcomes and implementation proof points.' },
  { path: '/qfs', label: 'QFS', category: 'platform', description: 'QFS capability and integration content page.' },
  { path: '/superadmin', label: 'Super Admin', category: 'platform', description: 'Top-level system management entry point.' },

  // ── ADMIN ─────────────────────────────────────────────────────────────────
  { path: '/admin', label: 'Admin Center', category: 'admin', description: 'Operations portal for internal admins.' },
  { path: '/admin/login', label: 'Admin Login', category: 'admin', description: 'Administrative authentication surface.' },
  { path: '/admin/diagnostics', label: 'Admin Diagnostics', category: 'admin', description: 'Runtime diagnostics and environment checks.' },
  { path: '/admin/inbox', label: 'Admin Inbox', category: 'admin', description: 'Inbound contact and communication queue.' },
  { path: '/admin/users', label: 'Admin Users', category: 'admin', description: 'User and access administration panel.' },
  { path: '/admin/teams', label: 'Admin Teams', category: 'admin', description: 'Team and role orchestration workspace.' },
  { path: '/admin/organizations', label: 'Admin Organizations', category: 'admin', description: 'Organization-level profile and governance management.' },
  { path: '/admin/grants', label: 'Admin Grants', category: 'admin', description: 'Grant operations and entitlement controls.' },

  // ── LEGAL ─────────────────────────────────────────────────────────────────
  { path: '/legal/privacy-policy', label: 'Privacy Policy', category: 'legal', description: 'Legal privacy disclosures and data handling policies.' },
  { path: '/legal/terms-of-service', label: 'Terms of Service', category: 'legal', description: 'Platform terms and service boundaries.' },
  { path: '/legal/cookie-policy', label: 'Cookie Policy', category: 'legal', description: 'Cookie usage and tracking policy.' },
];

export const legacyRedirects: LegacyRedirect[] = [
  { source: '/home', destination: '/', permanent: true, reason: 'Legacy alias consolidated into root homepage.' },
  { source: '/contact', destination: '/contact-us', permanent: true, reason: 'Legacy renamed URL redirected to contact-us.' },
  { source: '/privacy', destination: '/legal/privacy-policy', permanent: true, reason: 'Legacy privacy URL redirected to legal namespace.' },
  { source: '/terms', destination: '/legal/terms-of-service', permanent: true, reason: 'Legacy terms URL redirected to legal namespace.' },
  { source: '/architecture', destination: '/specs', permanent: true, reason: 'Architecture page now managed by specs route.' },
];
