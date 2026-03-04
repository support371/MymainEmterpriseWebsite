export type RouteItem = {
  path: string;
  description: string;
  tag: 'CORE' | 'PLATFORM' | 'ADMIN' | 'LEGAL';
};

export const routeCoverage: RouteItem[] = [
  { path: '/', description: 'Unified enterprise one-page marketing surface.', tag: 'CORE' },
  { path: '/about', description: 'Company overview and trust positioning.', tag: 'CORE' },
  { path: '/about-us', description: 'Extended organizational narrative and mission.', tag: 'CORE' },
  { path: '/contact-us', description: 'Lead capture and support contact entry point.', tag: 'CORE' },
  { path: '/resources', description: 'Security and compliance educational resources.', tag: 'CORE' },
  { path: '/news', description: 'Company and threat landscape news updates.', tag: 'CORE' },
  { path: '/leadership', description: 'Leadership and advisory overview.', tag: 'PLATFORM' },
  { path: '/pricing', description: 'Service packaging and pricing guidance.', tag: 'CORE' },
  { path: '/teams', description: 'Team-oriented workflows and collaboration view.', tag: 'CORE' },
  { path: '/services', description: 'Cybersecurity and IT service overview.', tag: 'PLATFORM' },
  { path: '/services/threat-monitoring', description: 'Continuous monitoring and alert intelligence delivery.', tag: 'PLATFORM' },
  { path: '/services/incident-response', description: 'Coordinated incident triage, containment, and recovery support.', tag: 'PLATFORM' },
  { path: '/services/compliance-management', description: 'Compliance readiness lifecycle and evidence operations.', tag: 'PLATFORM' },
  { path: '/services/federal-compliance', description: 'Federal-grade controls alignment and reporting support.', tag: 'PLATFORM' },
  { path: '/services/asset-recovery', description: 'Asset tracking, recovery workflow, and post-incident assurance.', tag: 'PLATFORM' },
  { path: '/intelligence', description: 'Threat and regulatory intelligence command center.', tag: 'PLATFORM' },
  { path: '/campaigns', description: 'Email campaign planning and delivery workspace.', tag: 'PLATFORM' },
  { path: '/roadmap', description: 'Platform delivery roadmap and release trajectory.', tag: 'PLATFORM' },
  { path: '/architecture', description: 'High-level architecture and enterprise systems view.', tag: 'PLATFORM' },
  { path: '/specs', description: 'Technical architecture and backend surfaces.', tag: 'PLATFORM' },
  { path: '/routes', description: 'Published frontend and backend URL registry.', tag: 'PLATFORM' },
  { path: '/live-preview', description: 'Enterprise live preview combining hero + route ops.', tag: 'PLATFORM' },
  { path: '/bridge/alliance-trust', description: 'Strategic bridge narrative for alliance trust programs.', tag: 'PLATFORM' },
  { path: '/cyber-sentinel-trust', description: 'Trust-centered cybersecurity positioning surface.', tag: 'PLATFORM' },
  { path: '/membership', description: 'Membership offerings and participation model.', tag: 'PLATFORM' },
  { path: '/portfolio', description: 'Portfolio and capability references for buyers.', tag: 'PLATFORM' },
  { path: '/case-studies', description: 'Delivered outcomes and implementation proof points.', tag: 'PLATFORM' },
  { path: '/qfs', description: 'QFS capability and integration context page.', tag: 'PLATFORM' },
  { path: '/admin', description: 'Admin center operations portal.', tag: 'ADMIN' },
  { path: '/admin/login', description: 'Administrative authentication surface.', tag: 'ADMIN' },
  { path: '/admin/diagnostics', description: 'Runtime diagnostics and environment checks.', tag: 'ADMIN' },
  { path: '/admin/inbox', description: 'Inbound contact and communication queue.', tag: 'ADMIN' },
  { path: '/admin/users', description: 'User and access administration panel.', tag: 'ADMIN' },
  { path: '/admin/teams', description: 'Team and role orchestration workspace.', tag: 'ADMIN' },
  { path: '/admin/organizations', description: 'Organization-level profile and governance management.', tag: 'ADMIN' },
  { path: '/admin/grants', description: 'Grant operations and entitlement controls.', tag: 'ADMIN' },
  { path: '/legal/privacy-policy', description: 'Legal privacy disclosures and data handling policies.', tag: 'LEGAL' },
  { path: '/legal/terms-of-service', description: 'Platform terms and service boundaries.', tag: 'LEGAL' },
  { path: '/legal/cookie-policy', description: 'Cookie usage and tracking policy.', tag: 'LEGAL' },
];

export const serviceScaleCoverage = [
  'Services — Cybersecurity and IT service overview.',
  'Threat Monitoring — Continuous monitoring and alert intelligence delivery.',
  'Incident Response — Coordinated incident triage, containment, and recovery support.',
  'Compliance Management — Compliance readiness lifecycle and evidence operations.',
  'Federal Compliance — Federal-grade controls alignment and reporting support.',
  'Asset Recovery — Asset tracking, recovery workflow, and post-incident assurance.',
];

export const adminOpsCoverage = [
  '/admin — Operations portal for internal admins.',
  '/admin/login — Administrative authentication surface.',
  '/admin/diagnostics — Runtime diagnostics and environment checks.',
  '/admin/inbox — Inbound contact and communication queue.',
  '/admin/users — User and access administration panel.',
  '/admin/teams — Team and role orchestration workspace.',
  '/admin/organizations — Organization-level profile and governance management.',
  '/admin/grants — Grant operations and entitlement controls.',
];

export const backendEndpoints = [
  { method: 'GET', path: '/api/routes', detail: 'Route + redirect registry payload for frontend/admin tooling.' },
  { method: 'GET', path: '/api/health', detail: 'Deployment health check endpoint for uptime and smoke tests.' },
  { method: 'POST', path: '/api/contact', detail: 'Contact request intake endpoint.' },
  { method: 'POST', path: '/api/newsletter', detail: 'Newsletter subscription endpoint.' },
  { method: 'POST', path: '/api/admin/login', detail: 'Admin session authentication endpoint.' },
  { method: 'POST', path: '/api/admin/logout', detail: 'Admin session termination endpoint.' },
  { method: 'GET', path: '/api/admin/inbox', detail: 'Secured admin message retrieval endpoint.' },
];

export const legacyRedirects = [
  { from: '/home', to: '/', notes: 'Legacy alias consolidated into homepage.' },
  { from: '/contact', to: '/contact-us', notes: 'Legacy contact URL normalized.' },
  { from: '/privacy', to: '/legal/privacy-policy', notes: 'Legacy privacy path normalized.' },
  { from: '/terms', to: '/legal/terms-of-service', notes: 'Legacy terms URL redirected.' },
  { from: '/architecture', to: '/specs', notes: 'Architecture content managed by specs route.' },
];
