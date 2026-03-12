import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getCurrentPortalSession } from '@/lib/auth/session';
import Topbar from '@/components/portal/Topbar';
import Sidebar from '@/components/portal/Sidebar';
import Toast from '@/components/portal/Toast';

export const metadata: Metadata = {
  title: 'Portal',
  description: 'GEM Cyber Enterprise Portal — secure client platform',
};

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const session = await getCurrentPortalSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Topbar userName={session.name} userEmail={session.email} userRole={session.role} />
      <div className="container mx-auto px-4 py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        <Sidebar role={session.role} />
        <main className="space-y-6">
          <Suspense>
            <Toast />
          </Suspense>
          {children}
        </main>
      </div>
    </div>
  );
}
