import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock all child components to isolate the layout test
vi.mock('@/components/navigation/TopNavigation', () => ({
  default: () => <div data-testid="top-navigation">TopNavigation</div>,
}));
vi.mock('@/components/navigation/BottomTabBar', () => ({
  default: () => <div data-testid="bottom-tab-bar">BottomTabBar</div>,
}));
vi.mock('@/components/layout/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));
vi.mock('@/components/layout/LiveSupport', () => ({
  default: () => <div data-testid="live-support">LiveSupport</div>,
}));

import TabLayout from '@/app/(tabs)/layout';

describe('TabLayout', () => {
  it('renders TopNavigation', () => {
    render(<TabLayout>content</TabLayout>);
    expect(screen.getByTestId('top-navigation')).toBeInTheDocument();
  });

  it('renders BottomTabBar', () => {
    render(<TabLayout>content</TabLayout>);
    expect(screen.getByTestId('bottom-tab-bar')).toBeInTheDocument();
  });

  it('renders Footer', () => {
    render(<TabLayout>content</TabLayout>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders LiveSupport', () => {
    render(<TabLayout>content</TabLayout>);
    expect(screen.getByTestId('live-support')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<TabLayout><div data-testid="child">Page Content</div></TabLayout>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });

  it('has correct structural classes', () => {
    const { container } = render(<TabLayout>content</TabLayout>);
    const wrapper = container.firstElementChild!;
    expect(wrapper.className).toContain('flex');
    expect(wrapper.className).toContain('flex-col');
    expect(wrapper.className).toContain('min-h-screen');
  });
});
