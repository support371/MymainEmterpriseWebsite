import { Card } from "@/components/ui/primitives/Card";
import { Chip } from "@/components/ui/primitives/Chip";
import { Tabs } from "@/components/ui/primitives/Tabs";
import { intelligenceFeed } from "@/data/intelligence";

export default function AppIntelligencePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Command Center Intelligence</h1>
      <Tabs items={["Overview", "Signals", "Response"]} active="Signals" />
      <div className="grid gap-3">
        {intelligenceFeed.map((item) => (
          <Card key={item.id} className="flex items-center justify-between">
            <div>
              <p>{item.title}</p>
              <p className="text-xs text-muted">Region: {item.region}</p>
            </div>
            <Chip label={item.severity.toUpperCase()} />
          </Card>
        ))}
      </div>
    </section>
  );
}
