import Link from "next/link";
import { Badge } from "@/components/ui/primitives/Badge";
import { Button } from "@/components/ui/primitives/Button";
import { Card } from "@/components/ui/primitives/Card";
import { marketingHighlights } from "@/data/marketing";
import { kpis } from "@/data/kpis";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Badge>Phase 6 Preview</Badge>
      <h1 className="text-4xl font-bold">GEM CYBER Platform</h1>
      <p className="max-w-2xl text-muted">Delivery-focused architecture with public intelligence surfaces and an internal command center.</p>
      <div className="grid gap-4 md:grid-cols-3">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <p className="text-xs text-muted">{kpi.label}</p>
            <p className="text-2xl font-semibold">{kpi.value}</p>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {marketingHighlights.map((item) => (
          <span key={item} className="rounded-md bg-surface px-3 py-1 text-sm">{item}</span>
        ))}
      </div>
      <div className="flex gap-3">
        <Link href="/services"><Button>Explore Services</Button></Link>
        <Link href="/app/intelligence"><Button variant="secondary">Open Command Center</Button></Link>
      </div>
    </div>
  );
}
