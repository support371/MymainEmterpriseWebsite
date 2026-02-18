import type { Metadata } from 'next';
import { BookOpenCheck, Handshake, ShieldCheck, Users } from 'lucide-react';
import PlatformModuleCard from '@/components/ui/PlatformModuleCard';

export const metadata: Metadata = {
  title: 'Membership',
  description: 'Membership offerings for managed security operations and advisory enablement.',
};

const modules = [
  {
    title: 'Operational Membership',
    description: 'Daily SOC and response coverage with standard reporting cadence.',
    outcomes: ['Continuous monitoring', 'Monthly posture reporting', 'Priority support channel'],
    ctaLabel: 'Explore',
    href: '/contact-us',
    icon: ShieldCheck,
  },
  {
    title: 'Advisory Membership',
    description: 'Strategic guidance for security architecture and governance.',
    outcomes: ['Quarterly strategy reviews', 'Risk roadmap planning', 'Leadership workshops'],
    ctaLabel: 'Request Demo',
    href: '/contact-us',
    icon: Users,
  },
  {
    title: 'Compliance Membership',
    description: 'Control operations support for ongoing audit readiness.',
    outcomes: ['Evidence management', 'Policy lifecycle support', 'Control maturity tracking'],
    ctaLabel: 'View Playbooks',
    href: '/services/compliance-management',
    icon: BookOpenCheck,
  },
  {
    title: 'Partner Enablement',
    description: 'Extend security outcomes across your critical vendor network.',
    outcomes: ['Vendor risk baseline', 'Shared control expectations', 'Joint escalation model'],
    ctaLabel: 'Explore',
    href: '/about',
    icon: Handshake,
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen px-4 pb-16 pt-28 sm:pt-32">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">Membership Programs</h1>
        <p className="mt-3 max-w-3xl text-slate-300">Flexible membership tiers align support depth to your risk profile while preserving enterprise-grade delivery standards.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {modules.map((module) => (
            <PlatformModuleCard key={module.title} {...module} />
          ))}
        </div>
      </div>
    </div>
  );
}
