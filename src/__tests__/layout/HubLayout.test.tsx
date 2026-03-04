import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/components/navigation/HubSubNav', () => ({
  default: () => <div data-testid="hub-sub-nav">HubSubNav</div>,
}));

import HubLayout from '@/app/(tabs)/hub/layout';

describe('HubLayout', () => {
  it('renders HubSubNav', () => {
    render(<HubLayout>hub content</HubLayout>);
    expect(screen.getByTestId('hub-sub-nav')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<HubLayout><div data-testid="hub-child">Hub Page</div></HubLayout>);
    expect(screen.getByTestId('hub-child')).toBeInTheDocument();
  });
});
