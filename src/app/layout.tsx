import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

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
      <head>
        {/* Google Analytics — gemcybersecurityassist.com */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5MJXJ5FYG8"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-5MJXJ5FYG8');`}
        </Script>
      </head>
      <body className="font-sans antialiased bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}
