import type { Metadata } from "next";
import DomainSurfacePage from "@/components/surfaces/DomainSurfacePage";

export const metadata: Metadata = {
  title: "Hub SOC",
  description: "Security operations center hub module.",
};

export default function HubSocPage() {
  return (
    <DomainSurfacePage
      storageKey="surface-hub-soc"
      title="Hub / SOC"
      subtitle="Operational SOC surface for diagnostics, incident readiness, and rapid response workflows."
      filters={["All", "Diagnostics", "Incidents", "Operations"]}
      kpis={[
        { label: "MTTR", value: "37m", delta: "Down 12% this month" },
        { label: "Active Incidents", value: "3", delta: "All under SLA" },
        { label: "Diagnostics Health", value: "99.1%", delta: "Stable across environments" },
      ]}
      cards={[
        { title: "Admin Diagnostics", summary: "Live operational diagnostics and runtime health verification.", tag: "Diagnostics", href: "/admin/diagnostics" },
        { title: "Admin Inbox", summary: "Incident-related contact and triage queue for analyst assignment.", tag: "Incidents", href: "/admin/inbox" },
        { title: "Threat Monitoring Service", summary: "Continuous monitoring control layer for SOC operations.", tag: "Operations", href: "/services/threat-monitoring" },
      ]}
    />
  );
}
