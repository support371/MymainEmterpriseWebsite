import type { Metadata } from "next";
import DomainSurfacePage from "@/components/surfaces/DomainSurfacePage";

export const metadata: Metadata = {
  title: "Hub Compliance",
  description: "Compliance hub module.",
};

export default function HubCompliancePage() {
  return (
    <DomainSurfacePage
      storageKey="surface-hub-compliance"
      title="Hub / Compliance"
      subtitle="Compliance operations module for control verification, policy lifecycle, and regulatory response."
      filters={["All", "Federal", "Policy", "Audit"]}
      kpis={[
        { label: "Control Coverage", value: "94%", delta: "Target 95% this quarter" },
        { label: "Open Findings", value: "7", delta: "2 in remediation" },
        { label: "Audit Readiness", value: "High", delta: "Evidence pack current" },
      ]}
      cards={[
        { title: "Federal Compliance Service", summary: "Control alignment for defense and regulated enterprise contexts.", tag: "Federal", href: "/services/federal-compliance" },
        { title: "Compliance Management Service", summary: "Policy orchestration and operational compliance support model.", tag: "Policy", href: "/services/compliance-management" },
        { title: "Legal and Policy Routes", summary: "Privacy, terms, and cookie policy governance artifacts.", tag: "Audit", href: "/legal/privacy-policy" },
      ]}
    />
  );
}
