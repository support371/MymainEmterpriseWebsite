import { Card } from "@/components/ui/primitives/Card";

const services = [
  "Managed threat detection",
  "Compliance automation",
  "Digital/physical incident coordination",
];

export default function ServicesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Services</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service}>{service}</Card>
        ))}
      </div>
    </section>
  );
}
