"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    const session = AuthService.getSession();
    if (session) {
      router.replace("/invoices");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface to-surface-alt p-4">
      <RegisterForm />
    </div>
  );
}
