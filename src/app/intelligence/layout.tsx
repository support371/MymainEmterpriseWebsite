import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Intelligence Hub",
  description: "Global threat intelligence, regulatory updates, and hybrid enterprise security insights from GEM Cyber.",
};

export default function IntelligenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
