import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import KPISnapshot from '@/components/ui/KPISnapshot';

const mockMetrics = [
  { label: 'Threats Blocked', value: '12,847' },
  { label: 'Uptime', value: '99.97%' },
  { label: 'Response Time', value: '< 2 min' },
];

describe('KPISnapshot', () => {
  it('renders all metric values and labels', () => {
    render(<KPISnapshot metrics={mockMetrics} />);
    expect(screen.getByText('12,847')).toBeInTheDocument();
    expect(screen.getByText('Threats Blocked')).toBeInTheDocument();
    expect(screen.getByText('99.97%')).toBeInTheDocument();
    expect(screen.getByText('Uptime')).toBeInTheDocument();
    expect(screen.getByText('< 2 min')).toBeInTheDocument();
    expect(screen.getByText('Response Time')).toBeInTheDocument();
  });

  it('defaults to 3-column grid', () => {
    const { container } = render(<KPISnapshot metrics={mockMetrics} />);
    const grid = container.firstElementChild!;
    expect(grid.className).toContain('md:grid-cols-3');
  });

  it('uses 2-column grid when columns=2', () => {
    const { container } = render(<KPISnapshot metrics={mockMetrics} columns={2} />);
    const grid = container.firstElementChild!;
    expect(grid.className).toContain('grid-cols-2');
    expect(grid.className).not.toContain('md:grid-cols-3');
  });

  it('uses 4-column grid when columns=4', () => {
    const { container } = render(<KPISnapshot metrics={mockMetrics} columns={4} />);
    const grid = container.firstElementChild!;
    expect(grid.className).toContain('md:grid-cols-4');
  });
});
