import type { Metadata } from "next";
import DomainSurfacePage from "@/components/surfaces/DomainSurfacePage";

export const metadata: Metadata = {
  title: "Intel",
  description: "Intel domain surface for threat, compliance, and intelligence operations.",
};

export default function IntelDomainPage() {
  return (
    <DomainSurfacePage
      storageKey="surface-intel"
      title="Intel"
      subtitle="Threat and compliance intelligence stream with signal prioritization and action-ready context."
      filters={["All", "Threat", "Compliance", "Advisory"]}
      kpis={[
        { label: "Signal Throughput", value: "2.1K", delta: "24h normalized events" },
        { label: "Critical Signals", value: "27", delta: "4 require immediate triage" },
        { label: "Compliance Alerts", value: "9", delta: "2 policy deltas pending" },
      ]}
      cards={[
        {
          title: "Intelligence Command Center",
          summary: "Primary intelligence workspace with operational context and risk-driven alerting.",
          tag: "Threat",
          href: "/intelligence",
        },
        {
          title: "Architecture Specifications",
          summary: "Architecture baseline and control surface definitions for engineering and operations.",
          tag: "Compliance",
          href: "/specs",
        },
        {
          title: "Security News Feed",
          summary: "Rolling updates on cyber events, advisories, and strategic posture considerations.",
          tag: "Advisory",
          href: "/news",
        },
      ]}
    />
  );
}
