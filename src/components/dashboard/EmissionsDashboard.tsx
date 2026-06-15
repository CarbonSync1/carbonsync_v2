"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart3,
  Globe2,
  DollarSign,
  ArrowRight,
  Download,
  Share2,
  Tag,
  Upload,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { ReportService } from "@/services/report.service";
import { DashboardMetricCard } from "./DashboardMetricCard";
import { EmissionDetails } from "./EmissionDetails";
import { EmissionFactorCard } from "./EmissionFactorCard";
import { ConstituentGases } from "./ConstituentGases";
import { NoticesSection } from "./NoticesSection";
import type { EmissionReport } from "@/types/report";

const NA = "\u2014";

export function EmissionsDashboard() {
  const router = useRouter();
  const [report, setReport] = useState<EmissionReport | null>(
    ReportService.getLatestReport()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pendingFile = ReportService.getPendingFile();
    if (!pendingFile || report) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await ReportService.estimateEmissions(pendingFile);
        setReport(result);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred.";
        setError(message);
      } finally {
        setLoading(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [report]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-6 py-20"
        >
          <div className="w-16 h-16 rounded-2xl bg-eco-green/10 flex items-center justify-center">
            <Loader2 className="w-7 h-7 text-eco-green animate-spin" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-heading font-extrabold text-text-dark tracking-tight">
              Processing Document
            </h1>
            <p className="text-text-muted text-sm mt-2 max-w-md">
              Analyzing your document to estimate carbon emissions...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-6 py-20"
        >
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
            <AlertCircle className="w-7 h-7 text-red-500" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-heading font-extrabold text-text-dark tracking-tight">
              Estimation Failed
            </h1>
            <p className="text-text-muted text-sm mt-2 max-w-md">{error}</p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/invoices")}
            className="inline-flex items-center gap-2 bg-eco-green hover:bg-eco-hover text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-eco-green/20 transition-all hover:shadow-xl hover:shadow-eco-green/30 active:scale-[0.98]"
          >
            <ArrowRight className="w-4 h-4" />
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-6 py-20"
        >
          <div className="w-16 h-16 rounded-2xl bg-eco-green/10 flex items-center justify-center">
            <Upload className="w-7 h-7 text-eco-green" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-heading font-extrabold text-text-dark tracking-tight">
              No Report Yet
            </h1>
            <p className="text-text-muted text-sm mt-2 max-w-md">
              Upload a document on the Estimate Emissions page to generate a
              carbon emissions report.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/invoices")}
            className="inline-flex items-center gap-2 bg-eco-green hover:bg-eco-hover text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-eco-green/20 transition-all hover:shadow-xl hover:shadow-eco-green/30 active:scale-[0.98]"
          >
            <ArrowRight className="w-4 h-4" />
            Go to Estimate Emissions
          </button>
        </motion.div>
      </div>
    );
  }

  const { data } = report;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-dark tracking-tight">
            Emissions Intelligence Dashboard
          </h1>
          <p className="text-text-muted text-sm sm:text-base mt-2">
            Real-time carbon insights generated from uploaded activity records.
          </p>
          <div className="h-px bg-gradient-to-r from-eco-green/20 via-emerald-light/10 to-transparent mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardMetricCard
            label="Total CO\u2082e"
            value={data.co2e}
            unit={data.co2e_unit}
            decimals={2}
            icon={<BarChart3 className="w-5 h-5" />}
            color="text-eco-green"
            index={0}
          />
          <DashboardMetricCard
            label="Category"
            value={0}
            decimals={0}
            unit=""
            displayText={data.emission_factor?.category ?? NA}
            icon={<Tag className="w-5 h-5" />}
            color="text-blue-600"
            index={1}
          />
          <DashboardMetricCard
            label="Region"
            value={0}
            decimals={0}
            unit=""
            displayText={data.emission_factor?.region ?? NA}
            icon={<Globe2 className="w-5 h-5" />}
            color="text-purple-600"
            index={2}
          />
          <DashboardMetricCard
            label="Activity Value"
            value={data.activity_data?.activity_value ?? 0}
            unit={data.activity_data?.activity_unit?.toUpperCase() ?? NA}
            decimals={2}
            icon={<DollarSign className="w-5 h-5" />}
            color="text-amber-600"
            index={3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <EmissionDetails data={data} index={0} />
          <EmissionFactorCard factor={data.emission_factor} index={1} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ConstituentGases gases={data.constituent_gases} index={2} />
          <NoticesSection notices={data.notices ?? []} index={3} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center gap-3 pt-4"
        >
          <button
            type="button"
            onClick={() => router.push("/invoices")}
            className="inline-flex items-center gap-2 bg-eco-green hover:bg-eco-hover text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-eco-green/20 transition-all hover:shadow-xl hover:shadow-eco-green/30 active:scale-[0.98]"
          >
            <ArrowRight className="w-4 h-4" />
            Upload New Invoice
          </button>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-text-muted font-semibold px-6 py-3 rounded-xl transition-all cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-text-muted font-semibold px-6 py-3 rounded-xl transition-all cursor-not-allowed"
          >
            <Share2 className="w-4 h-4" />
            Share Report
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
