"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart3,
  Globe2,
  Package,
  Layers,
  Upload,
  ArrowRight,
  Download,
  ExternalLink,
  Loader2,
  AlertCircle,
  FileText,
  MapPin,
  Tag,
  Beaker,
  Hash,
  FileSpreadsheet,
  Receipt,
} from "lucide-react";
import { EmissionsService } from "@/services/emissions";
import { DashboardMetricCard } from "./DashboardMetricCard";
import type {
  InvoiceEmissionsResponse,
  EmissionSummary,
  EmissionResultDetail,
} from "@/types/report";

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200/50 p-6 animate-pulse ${className ?? ""}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="w-10 h-10 rounded-xl bg-gray-200" />
      </div>
      <div className="h-8 w-32 bg-gray-200 rounded mb-1" />
      <div className="h-4 w-20 bg-gray-200 rounded mt-2" />
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="h-12 bg-gray-100 rounded-lg animate-pulse" />
  );
}

export function EmissionsDashboard() {
  const router = useRouter();
  const [data, setData] = useState<InvoiceEmissionsResponse | null>(
    EmissionsService.getLatestResult()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<EmissionSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    const pendingFile = EmissionsService.getPendingFile();
    if (!pendingFile || data) return;

    const processPending = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await EmissionsService.uploadInvoice(pendingFile);
        setData(result);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    processPending();
  }, [data]);

  useEffect(() => {
    const fetchSummary = async () => {
      setSummaryLoading(true);
      try {
        const result = await EmissionsService.getEmissionSummary();
        if (result.success) {
          setSummary(result.summary);
        }
      } catch {
        // silently fail — summary is auxiliary
      } finally {
        setSummaryLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const summaryCards = useMemo(() => {
    if (!data) return null;

    const results = data.results ?? [];
    const totalCO2e = results.reduce(
      (sum, item) => sum + item.result.co2e,
      0
    );
    const totalTCO2e = results.reduce(
      (sum, item) => sum + item.result.total_tco2e,
      0
    );
    const categories = [
      ...new Set(results.map((item) => item.result.category)),
    ];

    return { totalCO2e, totalTCO2e, categories };
  }, [data]);

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
              Processing Invoice
            </h1>
            <p className="text-text-muted text-sm mt-2 max-w-md">
              Extracting items and calculating carbon emissions...
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
              Processing Failed
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

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-6 py-20"
        >
          <div className="w-16 h-16 rounded-2xl bg-eco-green/10 flex items-center justify-center">
            <Receipt className="w-7 h-7 text-eco-green" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-heading font-extrabold text-text-dark tracking-tight">
              No Data Yet
            </h1>
            <p className="text-text-muted text-sm mt-2 max-w-md">
              Upload an invoice to view emissions insights and downloadable
              reports.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/invoices")}
            className="inline-flex items-center gap-2 bg-eco-green hover:bg-eco-hover text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-eco-green/20 transition-all hover:shadow-xl hover:shadow-eco-green/30 active:scale-[0.98]"
          >
            <Upload className="w-4 h-4" />
            Upload Invoice
          </button>
        </motion.div>
      </div>
    );
  }

  const results = data.results ?? [];
  const extractedItems = data.extracted_items ?? [];
  const reportUrls = data.report_download_urls ?? { brsr: "", cbam: "" };

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
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-dark tracking-tight">
                Invoice Emissions Dashboard
              </h1>
              <p className="text-text-muted text-sm sm:text-base mt-1">
                Real-time carbon insights generated from uploaded invoices and
                activity records.
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/invoices")}
              className="inline-flex items-center gap-2 bg-eco-green hover:bg-eco-hover text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-eco-green/20 transition-all hover:shadow-xl hover:shadow-eco-green/30 active:scale-[0.98] text-sm shrink-0"
            >
              <Upload className="w-4 h-4" />
              Upload New Invoice
            </button>
          </div>
          <div className="h-px bg-gradient-to-r from-eco-green/20 via-emerald-light/10 to-transparent mt-6" />
        </motion.div>

        {/* ── Emission Summary Widget ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileSpreadsheet className="w-5 h-5 text-emerald-accent" />
              <h2 className="text-sm font-bold text-text-dark uppercase tracking-wider">
                Platform Summary
              </h2>
            </div>
            {summaryLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : summary ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-eco-green/5 rounded-xl px-4 py-3 border border-eco-green/10">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Total Records
                  </p>
                  <p className="text-xl font-extrabold text-text-dark mt-1 font-heading">
                    {Number(summary.total_records).toLocaleString()}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl px-4 py-3 border border-blue-100">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Total kgCO₂e
                  </p>
                  <p className="text-xl font-extrabold text-text-dark mt-1 font-heading">
                    {Number(summary.total_kgco2e).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-xl px-4 py-3 border border-purple-100">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Total tCO₂e
                  </p>
                  <p className="text-xl font-extrabold text-text-dark mt-1 font-heading">
                    {Number(summary.total_tco2e).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>

        {/* ── Top Summary Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardMetricCard
            label="Total CO\u2082e"
            value={summaryCards?.totalCO2e ?? 0}
            unit="kg"
            decimals={2}
            icon={<BarChart3 className="w-5 h-5" />}
            color="text-eco-green"
            index={0}
          />
          <DashboardMetricCard
            label="Total tCO\u2082e"
            value={summaryCards?.totalTCO2e ?? 0}
            unit="tCO\u2082e"
            decimals={2}
            icon={<Globe2 className="w-5 h-5" />}
            color="text-blue-600"
            index={1}
          />
          <DashboardMetricCard
            label="Extracted Items"
            value={extractedItems.length}
            decimals={0}
            icon={<Package className="w-5 h-5" />}
            color="text-amber-600"
            index={2}
          />
          <motion.div
            custom={3}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: (i: number) => ({
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
              }),
            }}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Categories
              </span>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-purple-600"
                style={{
                  backgroundColor: "color-mix(in srgb, #9333ea 10%, transparent)",
                }}
              >
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1.5">
              {(summaryCards?.categories.length ?? 0) > 0 ? (
                summaryCards?.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-semibold"
                  >
                    <Tag className="w-3 h-3" />
                    {cat}
                  </span>
                ))
              ) : (
                <span className="text-sm text-text-muted">&mdash;</span>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Extracted Items Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-accent" />
                <h2 className="text-sm font-bold text-text-dark uppercase tracking-wider">
                  Extracted Items
                </h2>
              </div>
            </div>
            {extractedItems.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left px-6 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider">
                        Item Name
                      </th>
                      <th className="text-right px-6 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="text-left px-6 py-3.5 text-xs font-bold text-text-muted uppercase tracking-wider">
                        Unit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractedItems.map((item, idx) => (
                      <tr
                        key={`${item.item_name}-${idx}`}
                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-text-dark">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-eco-green/10 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-eco-green" />
                            </div>
                            {item.item_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-text-dark tabular-nums">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-text-dark rounded-md text-xs font-semibold">
                            {item.unit}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-8 text-center text-sm text-text-muted">
                No items extracted from this invoice.
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Emission Results ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-5">
            <Beaker className="w-5 h-5 text-emerald-accent" />
            <h2 className="text-sm font-bold text-text-dark uppercase tracking-wider">
              Emission Results
            </h2>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {results.map((entry, idx) => (
                <EmissionResultCard
                  key={`${entry.item_name}-${idx}`}
                  entry={entry}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm px-6 py-8 text-center text-sm text-text-muted">
              No emission results available.
            </div>
          )}
        </motion.div>

        {/* ── Download Reports ── */}
        {(reportUrls?.brsr || reportUrls?.cbam) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <Download className="w-5 h-5 text-emerald-accent" />
                <h2 className="text-sm font-bold text-text-dark uppercase tracking-wider">
                  Generated Reports
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {reportUrls.brsr && (
                  <a
                    href={reportUrls.brsr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-eco-green hover:bg-eco-hover text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-eco-green/20 transition-all hover:shadow-xl hover:shadow-eco-green/30 active:scale-[0.98] text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download BRSR Report
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                )}
                {reportUrls.cbam && (
                  <a
                    href={reportUrls.cbam}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-white border border-emerald-accent text-emerald-accent hover:bg-emerald-accent hover:text-white font-semibold px-5 py-3 rounded-xl shadow-sm transition-all active:scale-[0.98] text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download CBAM Report
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// ── Emission Result Card ──

function EmissionResultCard({
  entry,
  index,
}: {
  entry: { success: boolean; item_name: string; result: EmissionResultDetail };
  index: number;
}) {
  const { result } = entry;

  if (!entry.success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index }}
        className="bg-white rounded-2xl border border-red-200/50 shadow-sm p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-dark">{entry.item_name}</p>
            <p className="text-xs text-red-500 font-medium">Processing failed</p>
          </div>
        </div>
      </motion.div>
    );
  }

  const badgeColors: Record<string, string> = {
    "Purchased Goods and Services": "bg-blue-50 text-blue-700 border-blue-200",
    Electricity: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Travel: "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  const categoryColor =
    badgeColors[result.category] ??
    "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
    >
      {/* Header accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-emerald-accent to-eco-green" />

      <div className="p-6">
        {/* Item name & badges */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-eco-green/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-eco-green" />
            </div>
            <div>
              <p className="text-base font-bold text-text-dark">
                {entry.item_name}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${categoryColor}`}
          >
            <Tag className="w-3 h-3" />
            {result.category}
          </span>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="bg-gray-50 rounded-xl px-3 py-3">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">
              CO\u2082e
            </p>
            <p className="text-lg font-extrabold text-text-dark font-heading tabular-nums">
              {result.co2e.toLocaleString()}
            </p>
            <p className="text-[10px] text-text-muted font-medium">
              {result.co2e_unit}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl px-3 py-3">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">
              Total tCO\u2082e
            </p>
            <p className="text-lg font-extrabold text-text-dark font-heading tabular-nums">
              {result.total_tco2e.toLocaleString(undefined, {
                maximumFractionDigits: 3,
              })}
            </p>
            <p className="text-[10px] text-text-muted font-medium">tCO\u2082e</p>
          </div>
          <div className="bg-gray-50 rounded-xl px-3 py-3">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">
              Region
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-text-muted" />
              <p className="text-lg font-extrabold text-text-dark font-heading">
                {result.factor_region}
              </p>
            </div>
          </div>
        </div>

        {/* Factor information */}
        <div className="bg-eco-green/[0.03] border border-eco-green/10 rounded-xl px-4 py-3">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">
            Emission Factor
          </p>
          <div className="space-y-1.5">
            <div className="flex items-start gap-2">
              <Hash className="w-3.5 h-3.5 text-text-muted mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-medium text-text-dark">
                  {result.factor_name}
                </span>
                <span className="text-[10px] text-text-muted ml-2">
                  ({result.activity_id})
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Beaker className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <span className="text-xs text-text-muted">
                {result.source_lca_activity}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
