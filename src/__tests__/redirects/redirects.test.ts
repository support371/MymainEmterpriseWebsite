import { describe, it, expect } from 'vitest';
import nextConfig from '../../../next.config';

describe('next.config.ts redirects', () => {
  let redirects: Array<{ source: string; destination: string; permanent: boolean }>;

  beforeAll(async () => {
    redirects = await (nextConfig as any).redirects();
  });

  it('defines exactly 18 redirect rules', () => {
    expect(redirects).toHaveLength(18);
  });

  it('all redirects are permanent (308)', () => {
    for (const r of redirects) {
      expect(r.permanent).toBe(true);
    }
  });

  const expectedRedirects = [
    ['/news', '/intel'],
    ['/intelligence', '/intel'],
    ['/about-us', '/home/about'],
    ['/services', '/hub'],
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
  ];

  it.each(expectedRedirects)(
    'redirects %s → %s',
    (source, destination) => {
      const match = redirects.find((r) => r.source === source);
      expect(match).toBeDefined();
      expect(match!.destination).toBe(destination);
    }
  );
});
