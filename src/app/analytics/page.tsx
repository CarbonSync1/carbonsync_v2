import { InvoiceAnalyticsDashboard } from "@/components/analytics/InvoiceAnalyticsDashboard";
import { AnalyticsNavbar } from "@/components/analytics/AnalyticsNavbar";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <AnalyticsNavbar />
      <InvoiceAnalyticsDashboard />
    </div>
  );
}