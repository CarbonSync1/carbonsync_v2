"use client";

import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { AuthenticatedLayout } from "@/components/layout/AuthenticatedLayout";
import { EmissionsDashboard } from "@/components/dashboard/EmissionsDashboard";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AuthenticatedLayout>
        <EmissionsDashboard />
      </AuthenticatedLayout>
    </ProtectedRoute>
  );
}
