import { Badge } from "@/components/ui/primitives/Badge";
import { Card } from "@/components/ui/primitives/Card";
import { intelligenceFeed } from "@/data/intelligence";

export default function PublicIntelligencePage() {
  return (
    <section className="space-y-5">
      <h1 className="text-3xl font-semibold">Public Intelligence</h1>
      <Badge>Open feed · mocked data</Badge>
      <div className="grid gap-3">
        {intelligenceFeed.map((item) => (
          <Card key={item.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-muted">{item.id}</p>
            </div>
            <p className="text-sm uppercase text-primary">{item.severity}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
