import type { ReactNode } from 'react';
import TopNavigation from '@/components/navigation/TopNavigation';
import BottomTabBar from '@/components/navigation/BottomTabBar';
import Footer from '@/components/layout/Footer';
import LiveSupport from '@/components/layout/LiveSupport';

export default function TabLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavigation />
      <main className="flex-1 pb-16 lg:pb-0">
        {children}
        <Footer />
      </main>
      <BottomTabBar />
      <LiveSupport />
    </div>
  );
}
