import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));
vi.mock('@/components/layout/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

import LegalLayout from '@/app/legal/layout';

describe('LegalLayout', () => {
  it('renders GEM CYBER brand link to /home', () => {
    render(<LegalLayout>legal content</LegalLayout>);
    const brandLink = screen.getByText('GEM CYBER').closest('a')!;
    expect(brandLink).toHaveAttribute('href', '/home');
  });

  it('renders "Back to Home" link', () => {
    render(<LegalLayout>legal content</LegalLayout>);
    const backLink = screen.getByText(/Back to Home/);
    expect(backLink.closest('a')).toHaveAttribute('href', '/home');
  });

  it('renders Footer', () => {
    render(<LegalLayout>legal content</LegalLayout>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<LegalLayout><p>Terms of Service</p></LegalLayout>);
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });
});
