import type { ReactNode } from 'react';
import HubSubNav from '@/components/navigation/HubSubNav';

export default function HubLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HubSubNav />
      {children}
    </>
  );
}
