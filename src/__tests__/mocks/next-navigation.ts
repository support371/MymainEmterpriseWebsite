import { vi } from 'vitest';

let currentPathname = '/home';

export function setMockPathname(p: string) {
  currentPathname = p;
}

export const usePathname = vi.fn(() => currentPathname);
export const useRouter = vi.fn(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(),
}));
export const useSearchParams = vi.fn(() => new URLSearchParams());
export const redirect = vi.fn();
