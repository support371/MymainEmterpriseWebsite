import type { Metadata } from "next";
import DomainSurfacePage from "@/components/surfaces/DomainSurfacePage";

export const metadata: Metadata = {
  title: "Hub Portfolio",
  description: "Portfolio hub module.",
};

export default function HubPortfolioPage() {
  return (
    <DomainSurfacePage
      storageKey="surface-hub-portfolio"
      title="Hub / Portfolio"
      subtitle="Portfolio operations module for asset oversight, case tracking, and strategic resource allocation."
      filters={["All", "Assets", "Cases", "Planning"]}
      kpis={[
        { label: "Portfolio Units", value: "226", delta: "2.3% growth QoQ" },
        { label: "Active Cases", value: "19", delta: "11 in active review" },
        { label: "Recovery Yield", value: "87%", delta: "Within target range" },
      ]}
      cards={[
        { title: "Portfolio View", summary: "Asset portfolio status and assurance checkpoints.", tag: "Assets", href: "/portfolio" },
        { title: "Case Studies", summary: "Outcome analytics and client engagement narratives.", tag: "Cases", href: "/case-studies" },
        { title: "Resource Planning", summary: "Resource and roadmap planning for portfolio evolution.", tag: "Planning", href: "/resources" },
      ]}
    />
  );
}
