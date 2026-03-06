import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import TopNavigation from '@/components/navigation/TopNavigation';
import { setMockPathname } from '../mocks/next-navigation';

vi.mock('next/navigation', () => import('../mocks/next-navigation'));

vi.mock('next/link', () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('TopNavigation', () => {
  beforeEach(() => {
    setMockPathname('/home');
  });

  it('renders brand name "GEM CYBER"', () => {
    render(<TopNavigation />);
    expect(screen.getByText('GEM CYBER')).toBeInTheDocument();
  });

  it('renders all 6 tab links', () => {
    render(<TopNavigation />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Intel')).toBeInTheDocument();
    expect(screen.getByText('Assets')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('Hub')).toBeInTheDocument();
  });

  it('renders Contact CTA linking to /home/contact', () => {
    render(<TopNavigation />);
    const contactLink = screen.getByText('Contact');
    expect(contactLink.closest('a')).toHaveAttribute('href', '/home/contact');
  });

  it('highlights active tab with cyan background', () => {
    setMockPathname('/assets/qfs');
    render(<TopNavigation />);
    const assetsLink = screen.getByText('Assets').closest('a')!;
    expect(assetsLink.className).toContain('bg-cyan-500');

    const homeLink = screen.getByText('Home').closest('a')!;
    expect(homeLink.className).not.toContain('bg-cyan-500');
  });

  it('is hidden on mobile (hidden lg:block)', () => {
    const { container } = render(<TopNavigation />);
    const header = container.querySelector('header')!;
    expect(header.className).toContain('hidden');
    expect(header.className).toContain('lg:block');
  });
});
