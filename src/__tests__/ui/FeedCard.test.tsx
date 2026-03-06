import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeedCard from '@/components/ui/FeedCard';
import { Shield } from 'lucide-react';

vi.mock('next/link', () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('FeedCard', () => {
  it('renders title and description', () => {
    render(<FeedCard title="Test Title" description="Test description" href="/test" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('links to the provided href', () => {
    render(<FeedCard title="Link Test" description="desc" href="/intel/resources" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/intel/resources');
  });

  it('renders metric when provided', () => {
    render(<FeedCard title="Metric" description="desc" href="/test" metric="99.9%" />);
    expect(screen.getByText('99.9%')).toBeInTheDocument();
  });

  it('does not render metric div when metric is not provided', () => {
    const { container } = render(<FeedCard title="No Metric" description="desc" href="/test" />);
    expect(container.querySelector('.text-2xl')).toBeNull();
  });

  it('renders icon when provided', () => {
    const { container } = render(
      <FeedCard title="Icon Test" description="desc" href="/test" icon={Shield} />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
