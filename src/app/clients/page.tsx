import type { Metadata } from "next";
import DomainSurfacePage from "@/components/surfaces/DomainSurfacePage";

export const metadata: Metadata = {
  title: "Clients",
  description: "Client relationship and investment service operations surface.",
};

export default function ClientsPage() {
  return (
    <DomainSurfacePage
      storageKey="surface-clients"
      title="Clients"
      subtitle="Client lifecycle, investment security services, and portfolio governance for enterprise and private market accounts."
      filters={["All", "Onboarding", "Investment", "Security", "Portfolio"]}
      kpis={[
        { label: "Active Clients", value: "312", delta: "18 high-priority accounts" },
        { label: "AUM Coverage", value: "$1.9B", delta: "Secured under policy controls" },
        { label: "Portal Adoption", value: "86%", delta: "Rising across managed clients" },
      ]}
      cards={[
        {
          title: "Client Portal",
          summary: "Unified client-facing portal for investment reports, security posture, and service requests.",
          tag: "Onboarding",
          href: "/clients/portal",
        },
        {
          title: "Portfolio Service Layer",
          summary: "Investment service tracking and portfolio-level risk posture for managed clients.",
          tag: "Portfolio",
          href: "/portfolio",
        },
        {
          title: "Compliance and Security Operations",
          summary: "Operational controls for fintech, digital banking, QFS, and regulated investment workflows.",
          tag: "Security",
          href: "/hub/compliance",
        },
      ]}
    />
  );
}
