import type { Metadata } from "next";
import DomainSurfacePage from "@/components/surfaces/DomainSurfacePage";

export const metadata: Metadata = {
  title: "Hub",
  description: "Hub domain surface for SOC operations, research, compliance, and portfolio command modules.",
};

export default function HubDomainPage() {
  return (
    <DomainSurfacePage
      storageKey="surface-hub"
      title="Hub"
      subtitle="Operational hub coordinating SOC execution, research intelligence, compliance controls, and portfolio workflows."
      filters={["All", "SOC", "Research", "Compliance"]}
      kpis={[
        { label: "Hub Modules", value: "5", delta: "All operational" },
        { label: "Open Tasks", value: "34", delta: "9 high-priority" },
        { label: "Control Evidence", value: "92%", delta: "Audit cycle completeness" },
      ]}
      cards={[
        {
          title: "SOC Module",
          summary: "Operational security command center with diagnostics, routing, and incident readiness controls.",
          tag: "SOC",
          href: "/hub/soc",
        },
        {
          title: "Research Module",
          summary: "Threat, architecture, and market research pipeline for strategic decision support.",
          tag: "Research",
          href: "/hub/research",
        },
        {
          title: "Compliance Module",
          summary: "Control governance, policy checks, and verification evidence workflows.",
          tag: "Compliance",
          href: "/hub/compliance",
        },
      ]}
    />
  );
}
