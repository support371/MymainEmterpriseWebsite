import type { Metadata } from "next";
import DomainSurfacePage from "@/components/surfaces/DomainSurfacePage";

export const metadata: Metadata = {
  title: "Hub Research",
  description: "Research hub module.",
};

export default function HubResearchPage() {
  return (
    <DomainSurfacePage
      storageKey="surface-hub-research"
      title="Hub / Research"
      subtitle="Research module covering architecture, threat context, and strategic planning intelligence."
      filters={["All", "Architecture", "Threat", "Strategy"]}
      kpis={[
        { label: "Research Streams", value: "18", delta: "6 active this week" },
        { label: "Published Briefs", value: "42", delta: "4 added this cycle" },
        { label: "Actionable Findings", value: "13", delta: "Prioritized for execution" },
      ]}
      cards={[
        { title: "Architecture Route", summary: "Canonical architecture views and system-level decomposition.", tag: "Architecture", href: "/architecture" },
        { title: "Specs Route", summary: "Detailed technical specifications supporting implementation planning.", tag: "Architecture", href: "/specs" },
        { title: "Roadmap", summary: "Program roadmap integrating intelligence findings into delivery planning.", tag: "Strategy", href: "/roadmap" },
      ]}
    />
  );
}
