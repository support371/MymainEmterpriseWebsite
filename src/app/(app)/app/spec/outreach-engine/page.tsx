import { Card } from "@/components/ui/primitives/Card";
import { Modal } from "@/components/ui/primitives/Modal";
import { Spinner } from "@/components/ui/primitives/Spinner";
import { platformSpecs } from "@/data/specs";

export default function OutreachEnginePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Spec: Outreach Engine</h1>
      <div className="grid gap-3 md:grid-cols-3">
        {platformSpecs.outreachEngine.map((spec) => (
          <Card key={spec}>{spec}</Card>
        ))}
      </div>
      <Modal title="Placeholder workflow">
        <p className="mb-2 text-sm text-muted">Reasonable placeholder: sequence preview is loading from mock plan files.</p>
        <Spinner />
      </Modal>
    </section>
  );
}
