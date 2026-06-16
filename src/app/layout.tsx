import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/shared/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarbonSynqEarth - Enterprise ESG & Carbon Management Platform",
  description:
    "The intelligent ESG layer for modern enterprise. Track, manage, and reduce your carbon footprint with AI-powered analytics and supply chain insights.",
  keywords:
    "ESG, carbon tracking, net zero, sustainability, supply chain, carbon footprint",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

