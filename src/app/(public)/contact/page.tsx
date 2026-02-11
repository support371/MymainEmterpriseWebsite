import { Button } from "@/components/ui/primitives/Button";
import { Input } from "@/components/ui/primitives/Input";
import { Select } from "@/components/ui/primitives/Select";
import { Textarea } from "@/components/ui/primitives/Textarea";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-3xl font-semibold">Contact GEM CYBER</h1>
      <Input placeholder="Name" />
      <Input type="email" placeholder="Email" />
      <Select defaultValue="briefing">
        <option value="briefing">Threat briefing</option>
        <option value="assessment">Readiness assessment</option>
      </Select>
      <Textarea rows={5} placeholder="How can we help?" />
      <Button>Send Request</Button>
    </section>
  );
}
