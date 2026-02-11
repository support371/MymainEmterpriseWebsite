import { Card } from "@/components/ui/primitives/Card";
import { Skeleton } from "@/components/ui/primitives/Skeleton";
import { platformSpecs } from "@/data/specs";

export default function MonitoringAssistPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Spec: Monitoring Assist</h1>
      <div className="grid gap-3 md:grid-cols-3">
        {platformSpecs.monitoringAssist.map((spec) => (
          <Card key={spec}>{spec}</Card>
        ))}
      </div>
      <Card>
        <p className="mb-2 text-sm text-muted">Placeholder panel state</p>
        <Skeleton className="h-5 w-1/3" />
      </Card>
    </section>
  );
}
