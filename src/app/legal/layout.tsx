import type { ReactNode } from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import Footer from '@/components/layout/Footer';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/home" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">GEM CYBER</span>
          </Link>
          <Link href="/home" className="text-sm text-slate-400 hover:text-white transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
