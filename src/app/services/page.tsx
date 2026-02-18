import type { Metadata } from 'next';
import { Eye, Lock, Shield, Zap } from 'lucide-react';
import PlatformModuleCard from '@/components/ui/PlatformModuleCard';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Enterprise security service modules for monitoring, response, and compliance operations.',
};

const modules = [
  {
    title: 'Threat Monitoring',
    description: '24/7 visibility across cloud, endpoint, and identity layers.',
    outcomes: ['Continuous signal ingestion', 'Priority-based triage', 'Escalation runbooks'],
    ctaLabel: 'Explore',
    href: '/services/threat-monitoring',
    icon: Shield,
  },
  {
    title: 'Incident Response',
    description: 'SLA-backed response operations for high-severity incidents.',
    outcomes: ['2-minute escalation target', 'Containment coordination', 'Executive reporting'],
    ctaLabel: 'Request Demo',
    href: '/services/incident-response',
    icon: Zap,
  },
  {
    title: 'Compliance Management',
    description: 'Operationalize controls and evidence for audit readiness.',
    outcomes: ['SOC 2-ready controls', 'Audit evidence workflows', 'Control gap tracking'],
    ctaLabel: 'View Playbooks',
    href: '/services/compliance-management',
    icon: Lock,
  },
  {
    title: 'Federal Compliance',
    description: 'Mapped support for NIST and CMMC-driven programs.',
    outcomes: ['Control family mapping', 'Documentation templates', 'Policy implementation support'],
    ctaLabel: 'Explore',
    href: '/services/federal-compliance',
    icon: Eye,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen px-4 pb-16 pt-28 sm:pt-32">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">Platform Services</h1>
        <p className="mt-3 max-w-3xl text-slate-300">GEM CYBER service modules are designed for enterprise teams that need predictable security outcomes with measurable operational controls.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {modules.map((module) => (
            <PlatformModuleCard key={module.title} {...module} />
          ))}
        </div>
      </div>
    </div>
  );
}
