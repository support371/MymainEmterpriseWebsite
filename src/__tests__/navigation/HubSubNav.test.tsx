import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import HubSubNav from '@/components/navigation/HubSubNav';
import { setMockPathname } from '../mocks/next-navigation';

vi.mock('next/navigation', () => import('../mocks/next-navigation'));

vi.mock('next/link', () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('HubSubNav', () => {
  beforeEach(() => {
    setMockPathname('/hub');
  });

  it('renders all 4 hub sub-links', () => {
    render(<HubSubNav />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('SOC')).toBeInTheDocument();
    expect(screen.getByText('Compliance')).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
  });

  it('links to correct hub routes', () => {
    render(<HubSubNav />);
    expect(screen.getByText('Overview').closest('a')).toHaveAttribute('href', '/hub');
    expect(screen.getByText('SOC').closest('a')).toHaveAttribute('href', '/hub/soc');
    expect(screen.getByText('Compliance').closest('a')).toHaveAttribute('href', '/hub/compliance');
    expect(screen.getByText('Research').closest('a')).toHaveAttribute('href', '/hub/research');
  });

  it('highlights Overview only for exact /hub path', () => {
    setMockPathname('/hub');
    render(<HubSubNav />);
    const overview = screen.getByText('Overview').closest('a')!;
    expect(overview.className).toContain('text-cyan-400');
  });

  it('highlights SOC for nested SOC routes', () => {
    setMockPathname('/hub/soc/incident-response');
    render(<HubSubNav />);
    const soc = screen.getByText('SOC').closest('a')!;
    expect(soc.className).toContain('text-cyan-400');

    const overview = screen.getByText('Overview').closest('a')!;
    expect(overview.className).not.toContain('text-cyan-400');
  });

  it('highlights Compliance for nested compliance routes', () => {
    setMockPathname('/hub/compliance/federal');
    render(<HubSubNav />);
    const compliance = screen.getByText('Compliance').closest('a')!;
    expect(compliance.className).toContain('text-cyan-400');
  });
});
