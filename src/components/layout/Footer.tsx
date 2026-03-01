import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { appEnv } from '@/lib/env';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 text-white">Company</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-slate-400 hover:text-white transition-colors text-sm">Home</Link>
              <Link href="/about-us" className="block text-slate-400 hover:text-white transition-colors text-sm">About Us</Link>
              <Link href="/teams" className="block text-slate-400 hover:text-white transition-colors text-sm">Our Team</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">Products</h3>
            <div className="space-y-2">
              <Link href="/intelligence" className="block text-slate-400 hover:text-white transition-colors text-sm">Intelligence Command Center</Link>
              <Link href="/campaigns" className="block text-slate-400 hover:text-white transition-colors text-sm">Email Campaign Engine</Link>
              <Link href="/specs" className="block text-slate-400 hover:text-white transition-colors text-sm">Architecture Specs</Link>
              <Link href="/roadmap" className="block text-slate-400 hover:text-white transition-colors text-sm">Roadmap</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">Services</h3>
            <div className="space-y-2">
              <Link href="/services/threat-monitoring" className="block text-slate-400 hover:text-white transition-colors text-sm">Threat Monitoring</Link>
              <Link href="/services/compliance-management" className="block text-slate-400 hover:text-white transition-colors text-sm">Compliance Management</Link>
              <Link href="/services/asset-recovery" className="block text-slate-400 hover:text-white transition-colors text-sm">Asset Recovery</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">Legal</h3>
            <div className="space-y-2">
              <Link href="/legal/privacy-policy" className="block text-slate-400 hover:text-white transition-colors text-sm">Privacy</Link>
              <Link href="/legal/terms-of-service" className="block text-slate-400 hover:text-white transition-colors text-sm">Terms</Link>
              <Link href="/legal/cookie-policy" className="block text-slate-400 hover:text-white transition-colors text-sm">Cookies</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-sm">© 2026 {appEnv.appName}. All rights reserved.</div>
          <div className="flex items-center gap-4 text-sm">
            <a href={`mailto:${appEnv.supportEmail}`} className="text-cyan-500 hover:text-cyan-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {appEnv.supportEmail}
            </a>
            <a href={`tel:${appEnv.supportPhone}`} className="text-cyan-500 hover:text-cyan-400 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {appEnv.supportPhone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
