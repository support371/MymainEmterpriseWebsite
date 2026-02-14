import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LiveSupport from "@/components/layout/LiveSupport";

export const metadata: Metadata = {
  title: {
    default: "GEM Cyber | Enterprise Security & Physical Asset Protection",
    template: "%s | GEM Cyber"
  },
  description: "Unified Operations Center for global threat detection, federal compliance, and high-value physical asset protection. Security for the modern Hybrid Enterprise.",
  keywords: ["cybersecurity", "asset recovery", "federal compliance", "threat monitoring", "GEM Cyber", "Hybrid Enterprise"],
  authors: [{ name: "GEM Cyber" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-950 text-white min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <LiveSupport />
      </body>
    </html>
  );
}
