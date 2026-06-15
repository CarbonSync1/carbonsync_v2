"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import type { Session } from "@/types/auth";

export function useProtectedRoute() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = AuthService.getSession();
    if (!s) {
      router.replace("/login");
    } else {
      setSession(s);
      setLoading(false);
    }
  }, [router]);

  return { session, loading, isAuthenticated: !loading && session !== null };
}
