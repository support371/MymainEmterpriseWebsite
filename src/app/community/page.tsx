import type { Metadata } from "next";
import DomainSurfacePage from "@/components/surfaces/DomainSurfacePage";

export const metadata: Metadata = {
  title: "Community",
  description: "Community domain surface for members, resources, and customer narratives.",
};

export default function CommunityDomainPage() {
  return (
    <DomainSurfacePage
      storageKey="surface-community"
      title="Community"
      subtitle="Member-facing surface for education, market communication, and community trust signals."
      filters={["All", "Members", "Resources", "Stories"]}
      kpis={[
        { label: "Member Accounts", value: "3,420", delta: "5.4% monthly growth" },
        { label: "Resource Engagement", value: "71%", delta: "Average completion uplift" },
        { label: "Case Story Pipeline", value: "12", delta: "4 in editorial review" },
      ]}
      cards={[
        {
          title: "Membership Programs",
          summary: "Tiered membership offerings and advisory pathways for enterprise security teams.",
          tag: "Members",
          href: "/membership",
        },
        {
          title: "Resource Library",
          summary: "Operational education and compliance guidance for security and leadership stakeholders.",
          tag: "Resources",
          href: "/resources",
        },
        {
          title: "Case Studies",
          summary: "Outcome-focused narratives from client engagements and security transformation programs.",
          tag: "Stories",
          href: "/case-studies",
        },
      ]}
    />
  );
}
