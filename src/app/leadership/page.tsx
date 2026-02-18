import type { Metadata } from 'next';
import { BriefcaseBusiness, ChartNoAxesCombined, Flag, Presentation } from 'lucide-react';
import PlatformModuleCard from '@/components/ui/PlatformModuleCard';

export const metadata: Metadata = {
  title: 'Leadership',
  description: 'Leadership solutions for board-ready risk communication and operating governance.',
};

const modules = [
  {
    title: 'Board Risk Reporting',
    description: 'Convert technical risk signals into leadership-ready narratives.',
    outcomes: ['Quarterly board packet', 'Top risk trendline', 'Investment prioritization support'],
    ctaLabel: 'Explore',
    href: '/about',
    icon: Presentation,
  },
  {
    title: 'Security Program Governance',
    description: 'Institutionalize accountability, ownership, and operating rhythms.',
    outcomes: ['Role and policy mapping', 'KPI governance cadence', 'Control ownership matrix'],
    ctaLabel: 'View Playbooks',
    href: '/resources',
    icon: Flag,
  },
  {
    title: 'Executive Readiness',
    description: 'Prepare leadership teams for breach response and communication.',
    outcomes: ['Tabletop exercises', 'Decision framework alignment', 'Stakeholder comms templates'],
    ctaLabel: 'Request Demo',
    href: '/contact-us',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Performance Insights',
    description: 'Track strategic security outcomes against enterprise objectives.',
    outcomes: ['KPI scorecard', 'SLA performance analytics', 'Maturity progress tracking'],
    ctaLabel: 'Explore',
    href: '/intelligence',
    icon: ChartNoAxesCombined,
  },
];

export default function LeadershipPage() {
  return (
    <div className="min-h-screen px-4 pb-16 pt-28 sm:pt-32">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">Leadership Enablement</h1>
        <p className="mt-3 max-w-3xl text-slate-300">Leadership modules help security executives align operations, governance, and stakeholder communication across the business.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {modules.map((module) => (
            <PlatformModuleCard key={module.title} {...module} />
          ))}
        </div>
      </div>
    </div>
  );
}
