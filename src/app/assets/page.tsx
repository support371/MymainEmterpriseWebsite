import type { Metadata } from "next";
import DomainSurfacePage from "@/components/surfaces/DomainSurfacePage";

export const metadata: Metadata = {
  title: "Assets",
  description: "Assets domain surface for portfolio protection, recovery, and operational readiness.",
};

export default function AssetsDomainPage() {
  return (
    <DomainSurfacePage
      storageKey="surface-assets"
      title="Assets"
      subtitle="Asset-centric operations dashboard for protection coverage, recovery workflows, and trust-layer execution."
      filters={["All", "Coverage", "Recovery", "Portfolio"]}
      kpis={[
        { label: "Protected Assets", value: "1,482", delta: "96% policy coverage" },
        { label: "Recovery Cases", value: "11", delta: "8 in active handling" },
        { label: "Portfolio Health", value: "Stable", delta: "No critical gaps detected" },
      ]}
      cards={[
        {
          title: "Asset Recovery Operations",
          summary: "End-to-end recovery workflow coordination, forensic support, and assurance reporting.",
          tag: "Recovery",
          href: "/services/asset-recovery",
        },
        {
          title: "Portfolio Command View",
          summary: "Portfolio-level status and assurance outcomes mapped to enterprise protection objectives.",
          tag: "Portfolio",
          href: "/portfolio",
        },
        {
          title: "Alliance Trust Integration",
          summary: "Bridge operations for cyber-physical trust and high-value property security workflows.",
          tag: "Coverage",
          href: "/bridge/alliance-trust",
        },
      ]}
    />
  );
}
