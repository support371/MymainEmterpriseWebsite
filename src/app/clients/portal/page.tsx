import type { Metadata } from "next";
import DomainSurfacePage from "@/components/surfaces/DomainSurfacePage";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Client portal for investment services, cybersecurity assurance, and compliance reporting.",
};

export default function ClientPortalPage() {
  return (
    <DomainSurfacePage
      storageKey="surface-clients-portal"
      title="Clients / Portal"
      subtitle="Secure workspace for investment clients to access service status, portfolio risk signals, and compliance evidence."
      filters={["All", "Investment", "Cyber", "Compliance", "Support"]}
      kpis={[
        { label: "Open Client Requests", value: "26", delta: "7 due within 24h" },
        { label: "Security SLA", value: "99.4%", delta: "Across managed clients" },
        { label: "Regulatory Readiness", value: "High", delta: "Audit packs available" },
      ]}
      cards={[
        {
          title: "Investment Services Security",
          summary: "Managed security controls for fintech, digital banking, and investment account infrastructure.",
          tag: "Investment",
          href: "/services/threat-monitoring",
        },
        {
          title: "QFS and Financial Assurance",
          summary: "QFS-adjacent control posture and operational monitoring for high-integrity finance workflows.",
          tag: "Compliance",
          href: "/qfs",
        },
        {
          title: "Client Support Routing",
          summary: "Structured intake and triage for client requests through monitored support channels.",
          tag: "Support",
          href: "/contact-us",
        },
      ]}
    />
  );
}
