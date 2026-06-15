"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, User } from "lucide-react";
import { AuthService } from "@/services/auth.service";
import { getInitials } from "@/lib/utils";
import type { Session } from "@/types/auth";

export function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const s = AuthService.getSession();
    if (!s) {
      router.replace("/login");
    } else {
      setSession(s);
      setChecked(true);
    }
  }, [router]);

  const handleLogout = () => {
    AuthService.logout();
    router.replace("/login");
  };

  if (!checked || !session) return null;

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/invoices"
              className="flex items-center gap-2.5"
            >
              <Image
                src="/netzero/carbonsync-logo.webp"
                alt="CarbonSync"
                width={40}
                height={40}
                unoptimized
                className="w-9 h-9 object-contain"
              />
              <span className="text-lg font-bold tracking-tight text-[#1a2e35]">
                Carbon<span className="text-[#10b981]">Sync</span>
              </span>
            </Link>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-eco-green text-white flex items-center justify-center text-sm font-bold">
                  {getInitials(session.name)}
                </div>
                <span className="text-sm font-semibold text-text-dark hidden sm:block">
                  {session.name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-gray-200/50 shadow-xl z-50 py-1.5"
                    >
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-dark hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-muted" />
                        Profile
                      </Link>
                      <div className="h-px bg-gray-100 my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
