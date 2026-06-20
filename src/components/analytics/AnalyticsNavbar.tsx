"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut } from "lucide-react";
import { AuthService } from "@/services/auth.service";
import { getInitials } from "@/lib/utils";
import type { Session } from "@/types/auth";

export function AnalyticsNavbar() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // If user is not logged in, it will just remain null (no redirect for analytics page)
    const s = AuthService.getSession();
    if (s) {
      setSession(s);
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setDropdownOpen(false);
    setSession(null);
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5"
          >
            <Image
              src="/netzero/unnamed.webp"
              alt="CarbonSynq"
              width={40}
              height={40}
              unoptimized
              className="w-9 h-9 object-contain"
            />
            <span className="text-lg font-bold tracking-tight text-[#1a2e35]">
              CarbonSynq<span className="text-[#10b981]">Earth</span>
            </span>
          </Link>

          {session ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                  {getInitials(session.name)}
                </div>
                <span className="text-sm font-semibold text-gray-900 hidden sm:block">
                  {session.name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
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
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors"
              >
                Log in
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
