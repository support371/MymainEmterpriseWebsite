import type { Metadata } from "next";
import DomainSurfacePage from "@/components/surfaces/DomainSurfacePage";

export const metadata: Metadata = {
  title: "Hub Real Estate",
  description: "Real-estate security hub module.",
};

export default function HubRealEstatePage() {
  return (
    <DomainSurfacePage
      storageKey="surface-hub-real-estate"
      title="Hub / Real Estate"
      subtitle="Real-estate trust and cyber-physical protection module for high-value property operations."
      filters={["All", "Trust", "Security", "Operations"]}
      kpis={[
        { label: "Protected Sites", value: "24", delta: "All monitored" },
        { label: "Trust Workflows", value: "31", delta: "5 pending closure" },
        { label: "Physical-Cyber Sync", value: "98%", delta: "Cross-domain parity maintained" },
      ]}
      cards={[
        { title: "Alliance Trust Realty", summary: "Cyber-physical trust alignment for real-estate operations.", tag: "Trust", href: "/bridge/alliance-trust" },
        { title: "Cyber Sentinel Trust", summary: "Zero-trust and property security posture for critical assets.", tag: "Security", href: "/cyber-sentinel-trust" },
        { title: "Incident Response Service", summary: "Operational response playbooks for physical and digital incidents.", tag: "Operations", href: "/services/incident-response" },
      ]}
    />
  );
}
