"use client";

import { useState, useEffect, useCallback } from "react";
import { AuthService } from "@/services/auth.service";
import type { Session } from "@/types/auth";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSession(AuthService.getSession());
    setLoading(false);
  }, []);

  const refresh = useCallback(() => {
    setSession(AuthService.getSession());
  }, []);

  return { session, loading, refresh };
}
