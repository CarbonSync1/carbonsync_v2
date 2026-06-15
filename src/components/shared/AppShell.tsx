"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import PremiumFooter from "@/components/PremiumFooter";
import { NON_MARKETING_ROUTES } from "@/lib/constants";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isMarketing = !NON_MARKETING_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isMarketing) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <PremiumFooter />
      </div>
    );
  }

  return <>{children}</>;
}
