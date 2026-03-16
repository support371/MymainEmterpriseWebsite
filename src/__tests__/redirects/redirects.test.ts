import { describe, it, expect } from 'vitest';
import nextConfig from '../../../next.config';

describe('next.config.ts redirects', () => {
  let redirects: Array<{ source: string; destination: string; permanent: boolean }>;

  beforeAll(async () => {
    const redirectsFn = nextConfig.redirects;
    if (!redirectsFn) {
      throw new Error('redirects function is not defined in next.config.ts');
    }
    redirects = await redirectsFn();
  });

  const expectedRedirects = [
    ['/news', '/intel'],
    ['/intelligence', '/intel'],
    ['/about-us', '/home/about'],
    ['/services/threat-monitoring', '/hub/soc'],
    ['/services/incident-response', '/hub/soc/incident-response'],
    ['/services/compliance-management', '/hub/compliance'],
    ['/services/federal-compliance', '/hub/compliance/federal'],
    ['/services/asset-recovery', '/assets/recovery'],
    ['/teams', '/community'],
    ['/portfolio', '/assets'],
    ['/qfs', '/assets/qfs'],
    ['/cyber-sentinel-trust', '/hub/research'],
    ['/bridge/alliance-trust', '/assets/alliance-trust'],
    ['/case-studies', '/home/case-studies'],
    ['/resources', '/intel/resources'],
    ['/pricing', '/home/pricing'],
    ['/contact-us', '/home/contact'],
    ['/contact', '/home/contact'],
    ['/dashboard', '/portal'],
    ['/dashboard/services', '/portal/services'],
    ['/dashboard/cybersecurity', '/portal/cybersecurity'],
    ['/dashboard/cybersecurity/incidents', '/portal/cybersecurity/incidents'],
    ['/dashboard/cybersecurity/monitoring', '/portal/cybersecurity/monitoring'],
    ['/dashboard/cybersecurity/compliance', '/portal/cybersecurity/compliance'],
    ['/dashboard/real-estate', '/portal/real-estate'],
    ['/dashboard/real-estate/deals', '/portal/real-estate/deals'],
    ['/dashboard/real-estate/documents', '/portal/real-estate/documents'],
    ['/dashboard/wealth/investments', '/portal/wealth/investments'],
    ['/dashboard/wealth/retirement', '/portal/wealth/retirement'],
    ['/dashboard/wealth/qfs', '/portal/wealth/qfs'],
    ['/dashboard/legal/poa', '/portal/legal/poa'],
    ['/dashboard/legal/estate', '/portal/legal/estate'],
    ['/dashboard/requests', '/portal/requests'],
    ['/dashboard/users', '/portal/users'],
    ['/dashboard/audit', '/portal/audit'],
    ['/privacy', '/legal/privacy-policy'],
    ['/terms', '/legal/terms-of-service'],
    ['/security', '/services'],
  ] as const;

  it('defines the full redirect rule set', () => {
    expect(redirects).toHaveLength(expectedRedirects.length);
  });

  it('all redirects are permanent (308)', () => {
    for (const r of redirects) {
      expect(r.permanent).toBe(true);
    }
  });

  it.each(expectedRedirects)(
    'redirects %s → %s',
    (source, destination) => {
      const match = redirects.find((r) => r.source === source);
      expect(match).toBeDefined();
      expect(match!.destination).toBe(destination);
    }
  );
});
