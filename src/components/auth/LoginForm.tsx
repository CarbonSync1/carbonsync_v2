"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { AuthService } from "@/services/auth.service";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = AuthService.login(email, password);

    if (result.success) {
      router.push("/invoices");
    } else {
      setError(result.error || "Login failed.");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-eco-green flex items-center justify-center">
              <span className="text-white text-xs font-bold">CS</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-text-dark">Welcome back</h1>
          <p className="text-text-muted text-sm mt-2">
            Sign in to your CarbonSynqEarth account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-text-dark mb-1.5"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 bg-surface border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-eco-green/30 focus:border-eco-green text-sm text-text-dark placeholder:text-muted transition-all"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-text-dark mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-2.5 bg-surface border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-eco-green/30 focus:border-eco-green text-sm text-text-dark placeholder:text-muted transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text-dark transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm font-medium"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-eco-green hover:bg-eco-hover text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-eco-green/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-outline-variant" />
          <span className="text-xs text-muted">or</span>
          <div className="flex-1 h-px bg-outline-variant" />
        </div>

        <p className="text-center text-sm text-text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-eco-green font-semibold hover:text-emerald-600 transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
