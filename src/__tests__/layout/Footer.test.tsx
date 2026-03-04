import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

vi.mock('next/link', () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('Footer', () => {
  it('renders all 4 section headings', () => {
    render(<Footer />);
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  it('uses new route structure for links', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));

    // Company section
    expect(hrefs).toContain('/home/about');
    expect(hrefs).toContain('/community');
    expect(hrefs).toContain('/home/case-studies');

    // Services section
    expect(hrefs).toContain('/hub/soc');
    expect(hrefs).toContain('/hub/compliance');
    expect(hrefs).toContain('/assets/recovery');
    expect(hrefs).toContain('/hub/compliance/federal');

    // Resources section
    expect(hrefs).toContain('/intel');
    expect(hrefs).toContain('/intel/resources');
    expect(hrefs).toContain('/assets');

    // Legal section
    expect(hrefs).toContain('/legal/privacy-policy');
    expect(hrefs).toContain('/legal/terms-of-service');
    expect(hrefs).toContain('/legal/cookie-policy');
  });

  it('contains no old route references', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));

    const oldRoutes = ['/about-us', '/teams', '/news', '/services', '/portfolio', '/contact-us', '/resources'];
    for (const old of oldRoutes) {
      expect(hrefs).not.toContain(old);
    }
  });

  it('renders copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText(/2026 GEM Enterprise/)).toBeInTheDocument();
  });

  it('renders phone link', () => {
    render(<Footer />);
    expect(screen.getByText('(860) 305-4376')).toBeInTheDocument();
  });
});
