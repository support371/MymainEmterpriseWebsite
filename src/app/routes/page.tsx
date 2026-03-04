import type { Metadata } from 'next';
import Link from 'next/link';
import { routeCoverage } from '@/data/routeInventory';

export const metadata: Metadata = {
  title: 'Route Directory',
  description: 'Published frontend route inventory for GEM CYBER platform surfaces.',
};

export default function RouteDirectoryPage() {
  return (
    <div className="min-h-screen px-4 pb-16 pt-28 sm:pt-32">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">Route Directory</h1>
        <p className="mt-3 max-w-3xl text-slate-300">Centralized route directory for frontend and platform coverage validation.</p>
        <div className="mt-8 space-y-2">
          {routeCoverage.map((route) => (
            <div key={route.path} className="rounded-lg border border-slate-800 bg-slate-900/55 p-4">
              <p className="font-semibold text-cyan-300">{route.path}</p>
              <p className="mt-1 text-sm text-slate-300">{route.description}</p>
            </div>
          ))}
        </div>
        <Link href="/live-preview" className="mt-8 inline-flex rounded-lg border border-cyan-700/60 px-5 py-2.5 text-sm font-semibold text-cyan-200">
          Open Live Preview
        </Link>
      </div>
    </div>
  );
}
