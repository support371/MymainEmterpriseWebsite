import type { Metadata } from "next";
import DomainSurfacePage from "@/components/surfaces/DomainSurfacePage";

export const metadata: Metadata = {
  title: "Home",
  description: "Home domain surface with executive snapshot and enterprise operations feed.",
};

export default function HomeDomainPage() {
  return (
    <DomainSurfacePage
      storageKey="surface-home"
      title="Home"
      subtitle="Executive command snapshot for cybersecurity posture, operational velocity, and active program health."
      filters={["All", "Executive", "Operations", "Growth"]}
      kpis={[
        { label: "Risk Index", value: "A-", delta: "Improved 8% vs last cycle" },
        { label: "Active Programs", value: "14", delta: "3 entering deployment" },
        { label: "SLA Compliance", value: "99.2%", delta: "Within contractual threshold" },
      ]}
      cards={[
        {
          title: "Enterprise Live Preview",
          summary: "Cross-functional preview combining route governance, marketing posture, and operations framing.",
          tag: "Executive",
          href: "/live-preview",
        },
        {
          title: "Services Portfolio",
          summary: "Platform-aligned service catalog for monitoring, response, compliance, and asset recovery.",
          tag: "Operations",
          href: "/services",
        },
        {
          title: "Campaign Command Center",
          summary: "Newsletter and campaign execution workflows for market-facing communication operations.",
          tag: "Growth",
          href: "/campaigns",
        },
      ]}
    />
  );
}
