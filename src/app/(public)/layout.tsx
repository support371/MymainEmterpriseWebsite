import { PublicFooter } from "@/components/navigation/PublicFooter";
import { PublicNav } from "@/components/navigation/PublicNav";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <PublicNav />
      <main className="container-shell py-10">{children}</main>
      <PublicFooter />
    </div>
  );
}
