import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PremiumFooter from "@/components/PremiumFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarbonSync - Enterprise ESG & Carbon Management Platform",
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
    <html lang="en">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <PremiumFooter />
        </div>
      </body>
    </html>
  );
}
