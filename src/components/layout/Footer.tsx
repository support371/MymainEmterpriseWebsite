import Link from 'next/link';
import { Shield, Phone, Mail, Linkedin, Twitter, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="font-bold text-xl text-white">GEM CYBER</div>
            </Link>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              GEM Cybersecurity & Alliance Trust Realty: Unified enterprise security and high-value asset protection.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:text-cyan-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:text-cyan-500 transition-colors">
                <Twitter size={20} />
              </a>
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
            <h3 className="font-bold mb-4 text-white">Company</h3>
            <div className="space-y-2">
              <Link href="/about-us" className="block text-slate-400 hover:text-white transition-colors text-sm">About Us</Link>
              <Link href="/teams" className="block text-slate-400 hover:text-white transition-colors text-sm">Our Team</Link>
              <Link href="/pricing" className="block text-slate-400 hover:text-white transition-colors text-sm">Pricing</Link>
              <Link href="/contact-us" className="block text-slate-400 hover:text-white transition-colors text-sm">Contact Us</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-white">Contact</h3>
            <div className="space-y-4">
              <a href="tel:+18603054376" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:text-cyan-500">
                  <Phone size={16} />
                </div>
                <span className="text-sm">(860) 305-4376</span>
              </a>
              <a href="mailto:Support@gemcybersecurityassist.com" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:text-cyan-500">
                  <Mail size={16} />
                </div>
                <span className="text-sm">Support@gemcybersecurityassist.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 GEM Cybersecurity & Monitoring Assist. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/legal/privacy-policy" className="text-slate-500 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link href="/legal/terms-of-service" className="text-slate-500 hover:text-white text-xs transition-colors">Terms of Service</Link>
            <Link href="/legal/cookie-policy" className="text-slate-500 hover:text-white text-xs transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
