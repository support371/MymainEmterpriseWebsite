import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import BottomTabBar from '@/components/navigation/BottomTabBar';
import { setMockPathname } from '../mocks/next-navigation';

vi.mock('next/navigation', () => import('../mocks/next-navigation'));

vi.mock('next/link', () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('BottomTabBar', () => {
  beforeEach(() => {
    setMockPathname('/home');
  });

  it('renders all 6 tab labels', () => {
    render(<BottomTabBar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Intel')).toBeInTheDocument();
    expect(screen.getByText('Assets')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('Hub')).toBeInTheDocument();
  });

  it('renders 6 tab links with correct hrefs', () => {
    render(<BottomTabBar />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(6);
    expect(links[0]).toHaveAttribute('href', '/home');
    expect(links[1]).toHaveAttribute('href', '/services');
    expect(links[2]).toHaveAttribute('href', '/intel');
    expect(links[3]).toHaveAttribute('href', '/assets');
    expect(links[4]).toHaveAttribute('href', '/community');
    expect(links[5]).toHaveAttribute('href', '/hub');
  });

  it('highlights active tab based on pathname', () => {
    setMockPathname('/intel');
    render(<BottomTabBar />);
    const intelLink = screen.getByText('Intel').closest('a')!;
    expect(intelLink.className).toContain('text-cyan-400');

    const homeLink = screen.getByText('Home').closest('a')!;
    expect(homeLink.className).toContain('text-slate-500');
  });

  it('highlights tab for nested routes', () => {
    setMockPathname('/hub/soc/incident-response');
    render(<BottomTabBar />);
    const hubLink = screen.getByText('Hub').closest('a')!;
    expect(hubLink.className).toContain('text-cyan-400');
  });

  it('has lg:hidden class for mobile-only visibility', () => {
    const { container } = render(<BottomTabBar />);
    const nav = container.querySelector('nav')!;
    expect(nav.className).toContain('lg:hidden');
  });
});
