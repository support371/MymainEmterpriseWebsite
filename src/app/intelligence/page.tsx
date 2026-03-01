import type { Metadata } from 'next';
import { Radar, ShieldAlert, Siren, Workflow } from 'lucide-react';
import PlatformModuleCard from '@/components/ui/PlatformModuleCard';

export const metadata: Metadata = {
  title: 'Intelligence',
  description: 'Threat intelligence and analyst operations modules for proactive defense.',
};

const modules = [
  {
    title: 'Threat Feed Operations',
    description: 'Normalize and score intelligence before analyst review.',
    outcomes: ['Feed quality scoring', 'Duplicate suppression', 'Source confidence weighting'],
    ctaLabel: 'Explore',
    href: '/intelligence',
    icon: Radar,
  },
  {
    title: 'Critical Alert Routing',
    description: 'Ensure high-risk indicators trigger the right response team immediately.',
    outcomes: ['Risk-based routing', 'Channel escalation mapping', 'Coverage by severity tier'],
    ctaLabel: 'Request Demo',
    href: '/contact-us',
    icon: Siren,
  },
  {
    title: 'Analyst Playbooks',
    description: 'Codified triage and remediation guidance across recurring events.',
    outcomes: ['Guided containment steps', 'Root-cause capture', 'Post-incident recommendations'],
    ctaLabel: 'View Playbooks',
    href: '/resources',
    icon: Workflow,
  },
  {
    title: 'Executive Risk Briefing',
    description: 'Translate telemetry into business-impact reporting.',
    outcomes: ['Weekly risk brief', 'Asset-level heatmap', 'Mitigation trendline'],
    ctaLabel: 'Explore',
    href: '/about',
    icon: ShieldAlert,
  },
];

export default function IntelligencePage() {
  return (
    <div className="min-h-screen px-4 pb-16 pt-28 sm:pt-32">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">Intelligence Platform</h1>
        <p className="mt-3 max-w-3xl text-slate-300">From ingestion to executive briefing, intelligence modules provide clear context and response priorities for cyber and compliance leaders.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {modules.map((module) => (
            <PlatformModuleCard key={module.title} {...module} />
          ))}
        </div>
      </div>
    </div>
  );
}
