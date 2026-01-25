import Link from 'next/link';
import { Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 text-white">Company</h3>
            <div className="space-y-2">
              <Link href="/about-us" className="block text-slate-400 hover:text-white transition-colors text-sm">About Us</Link>
              <Link href="/teams" className="block text-slate-400 hover:text-white transition-colors text-sm">Our Team</Link>
              <Link href="/case-studies" className="block text-slate-400 hover:text-white transition-colors text-sm">Case Studies</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">Services</h3>
            <div className="space-y-2">
              <Link href="/services/threat-monitoring" className="block text-slate-400 hover:text-white transition-colors text-sm">Threat Monitoring</Link>
              <Link href="/services/compliance-management" className="block text-slate-400 hover:text-white transition-colors text-sm">Compliance Management</Link>
              <Link href="/services/asset-recovery" className="block text-slate-400 hover:text-white transition-colors text-sm">Asset Recovery</Link>
              <Link href="/services/federal-compliance" className="block text-slate-400 hover:text-white transition-colors text-sm">Federal Compliance</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">Resources</h3>
            <div className="space-y-2">
              <Link href="/intelligence" className="block text-slate-400 hover:text-white transition-colors text-sm">Intelligence Hub</Link>
              <Link href="/resources" className="block text-slate-400 hover:text-white transition-colors text-sm">Resource Hub</Link>
              <Link href="/case-studies" className="block text-slate-400 hover:text-white transition-colors text-sm">Case Studies</Link>
              <Link href="/portfolio" className="block text-slate-400 hover:text-white transition-colors text-sm">Portfolio</Link>
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
          <div className="text-slate-400 text-sm">© 2026 GEM Enterprise. All rights reserved.</div>
          <div className="flex items-center gap-4 text-sm">
            <a href="tel:+18603054376" className="text-cyan-500 hover:text-cyan-400 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              (860) 305-4376
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
