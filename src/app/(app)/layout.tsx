import { AppNav } from "@/components/navigation/AppNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppNav />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
