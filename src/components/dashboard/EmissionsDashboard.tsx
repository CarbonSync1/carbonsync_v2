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
  EmissionResultDetail,
} from "@/types/report";
import { EngagingLoader } from "@/components/shared/EngagingLoader";

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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://carbonsync-backend-mp5h.onrender.com";

function toNumber(value: unknown) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getResult(entry: any) {
  return entry?.result ?? entry ?? {};
}

function isCalculated(entry: any) {
  return entry?.status === "calculated" || entry?.success === true;
}

function getCo2e(entry: any) {
  const result = getResult(entry);
  return toNumber(result?.co2e ?? result?.co2e_total ?? entry?.co2e);
}

function getTco2e(entry: any) {
  const result = getResult(entry);
  const direct = toNumber(result?.total_tco2e ?? entry?.total_tco2e);

  return direct > 0 ? direct : getCo2e(entry) / 1000;
}

function getCategory(entry: any) {
  return String(entry?.category ?? getResult(entry)?.category ?? "").trim();
}

function getFullReportUrl(url?: string) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
}

const REGION_LABELS: Record<string, string> = {
  GB: "United Kingdom",
  IN: "India",
  US: "United States",
  DE: "Germany",
  FR: "France",
  CN: "China",
  JP: "Japan",
  AU: "Australia",
  CA: "Canada",
  BR: "Brazil",
  GLOBAL: "Global",
};

function formatRegion(code: string): string {
  if (!code || code === "N/A") return "N/A";
  return REGION_LABELS[code.toUpperCase()] ?? code;
}

function filterRailTicketResults(results: any[]) {
  const hasPassengerRail = results.some((item: any) =>
    String(item?.item_name ?? item?.result?.item_name ?? "")
      .toLowerCase()
      .includes("passenger rail")
  );

  if (!hasPassengerRail) {
    return results;
  }

  return results.filter((item: any) =>
    String(item?.item_name ?? item?.result?.item_name ?? "")
      .toLowerCase()
      .includes("passenger rail")
  );
}


export function EmissionsDashboard() {
  const router = useRouter();
  const [data, setData] = useState<InvoiceEmissionsResponse | null>(
    EmissionsService.getLatestResult()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportGenerating, setReportGenerating] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const [generatedReportUrls, setGeneratedReportUrls] = useState<{
    brsr?: string;
    cbam?: string;
  } | null>(null);
  const [reportAutoStarted, setReportAutoStarted] = useState(false);
  useEffect(() => {
    const pendingFile = EmissionsService.getPendingFile();
    if (!pendingFile || data) return;

    // Clear pending file immediately to prevent StrictMode double execution
    EmissionsService.clearPendingFile();

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

  const summaryCards = useMemo(() => {
    if (!data) return null;

    const results = filterRailTicketResults(data.results ?? []);

    // Prefer root-level total_co2e from backend (most accurate)
    const backendTotal = toNumber((data as any)?.total_co2e ?? (data as any)?.emission?.total_co2e);
    const totalCO2e = backendTotal > 0
      ? backendTotal
      : results.reduce((sum, item) => sum + getCo2e(item), 0);

    const backendTotalT = toNumber((data as any)?.total_tco2e ?? (data as any)?.emission?.total_tco2e);
    const totalTCO2e = backendTotalT > 0
      ? backendTotalT
      : results.reduce((sum, item) => sum + getTco2e(item), 0);

    const categories = [
      ...new Set(results.map((item) => getCategory(item)).filter(Boolean)),
    ];

    const successfulItems = results.filter((r: any) => isCalculated(r)).length;
    const totalItems = results.length || (data as any)?.extraction?.item_count || 0;
    const matchRate = totalItems > 0 ? Math.round((successfulItems / totalItems) * 100) : 0;

    const categoryTotals = results.reduce((acc, item: any) => {
      if (isCalculated(item)) {
        const cat = getCategory(item);
        if (cat) {
          acc[cat] = (acc[cat] || 0) + getCo2e(item);
        }
      }
      return acc;
    }, {} as Record<string, number>);

    let topCategory = "N/A";
    let maxCo2e = -1;
    for (const [cat, val] of Object.entries(categoryTotals) as [string, number][]) {
      if (val > maxCo2e) {
        maxCo2e = val;
        topCategory = cat;
      }
    }

    return { totalCO2e, totalTCO2e, categories, matchRate, topCategory };
  }, [data]);

  useEffect(() => {
    if (!data || reportAutoStarted || reportGenerating) return;

    const existingBRSR = getFullReportUrl((data as any)?.report_download_urls?.brsr);
    const existingCBAM = getFullReportUrl((data as any)?.report_download_urls?.cbam);

    if (existingBRSR || existingCBAM) {
      setGeneratedReportUrls({
        brsr: existingBRSR,
        cbam: existingCBAM,
      });
      setReportAutoStarted(true);
      return;
    }

    const file = (data as any).file;
    const extractedItems = data.extracted_items ?? [];
    const calculationResults =
      (data as any).calculation_results ??
      (data as any).results ??
      data.results ??
      [];

    if (!file || extractedItems.length === 0 || calculationResults.length === 0) {
      return;
    }

    const generateReportInBackground = async () => {
      setReportAutoStarted(true);
      setReportGenerating(true);
      setReportError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/api/generate-invoice-report`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file,
            extracted_items: extractedItems,
            calculation_results: calculationResults,
            total_kgco2e:
              (data as any).total_kgco2e ?? summaryCards?.totalCO2e ?? 0,
            total_tco2e:
              (data as any).total_tco2e ?? summaryCards?.totalTCO2e ?? 0,
          }),
        });

        const reportData = await response.json();

        if (!response.ok || !reportData?.success) {
          throw new Error(reportData?.message || "Report generation failed.");
        }

        const urls = {
          brsr: getFullReportUrl(reportData.reportUrls?.brsr ?? reportData.report_download_urls?.brsr),
          cbam: getFullReportUrl(reportData.reportUrls?.cbam ?? reportData.report_download_urls?.cbam),
        };

        setGeneratedReportUrls(urls);
        setData((current: any) =>
          current
            ? {
              ...current,
              report_download_urls: urls,
              reports: reportData.reports,
            }
            : current
        );
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Report generation failed.";
        setReportError(message);
      } finally {
        setReportGenerating(false);
      }
    };

    generateReportInBackground();
  }, [data, reportAutoStarted, reportGenerating, summaryCards]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="w-full max-w-lg">
            <EngagingLoader
              title="Processing Invoice"
              subtitle="Extracting items and calculating carbon emissions..."
            />
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

  const results = filterRailTicketResults(data.results ?? []);
  const rawExtractedItems = data.extracted_items ?? [];

  const resultBasedItems = results
    .filter((entry: any) => entry?.success !== false)
    .map((entry: any, index: number) => {
      const result = getResult(entry);
      const params = result?.parameters ?? {};
      const converted = entry?.converted ?? {};
      const rawItem = rawExtractedItems[index];

      return {
        item_name: String(
          rawItem?.item_name ??
          entry?.item_name ??
          result?.item_name ??
          "Emission Item"
        ),

        // Display backend normalized quantity first
        quantity:
          entry?.value ??
          rawItem?.quantity ??
          params?.original_quantity ??
          params?.extracted_quantity ??
          converted?.original_value ??
          converted?.value ??
          params?.quantity ??
          0,

        // Display backend normalized unit first
        unit:
          entry?.unit ??
          rawItem?.unit ??
          params?.original_unit ??
          params?.extracted_unit ??
          converted?.original_unit ??
          converted?.unit ??
          params?.quantity_unit ??
          "",
      };
    });

  const extractedItems =
    resultBasedItems.length > 0 ? resultBasedItems : rawExtractedItems;
  const reportUrls = {
    brsr: generatedReportUrls?.brsr || getFullReportUrl(data.report_download_urls?.brsr),
    cbam: generatedReportUrls?.cbam || getFullReportUrl(data.report_download_urls?.cbam),
  };

  const hasGeneratedReport = Boolean(reportUrls.brsr || reportUrls.cbam);

  // ── Region detection ──
  // Backend returns country as an object: { region: "GB", country_name: "United Kingdom", currency: "GBP" }
  const firstResult = results.length > 0 ? results[0] : null;
  const currentRegion = String(
    (data as any)?.country?.region ||
    (data as any)?.country?.country_name ||
    (data as any)?.country ||
    ""
  ).toUpperCase().trim();

  const isUK = ["GB", "UK", "UNITED KINGDOM"].includes(currentRegion);

  const handleGenerateReport = async () => {
    if (!data || reportGenerating) return;

    if (reportUrls.brsr) {
      window.open(reportUrls.brsr, "_blank");
      return;
    }

    setReportError(null);
    setReportGenerating(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-invoice-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: (data as any).file ?? { originalname: (data as any).file_name ?? "invoice.pdf" },
          extractedItems: data.extracted_items ?? [],
          calculationResults:
            (data as any).calculation_results ??
            (data as any).results ??
            data.results ??
            (data as any).emission?.results ??
            [],
          totalKgCO2e:
            (data as any).total_kgco2e ?? summaryCards?.totalCO2e ?? 0,
          totalTCO2e:
            (data as any).total_tco2e ?? summaryCards?.totalTCO2e ?? 0,
        }),
      });

      const reportData = await response.json();

      if (!response.ok || !reportData?.success) {
        throw new Error(reportData?.message || "Report generation failed.");
      }

      const urls = {
        brsr: getFullReportUrl(reportData.reportUrls?.brsr ?? reportData.report_download_urls?.brsr),
        cbam: getFullReportUrl(reportData.reportUrls?.cbam ?? reportData.report_download_urls?.cbam),
      };

      setGeneratedReportUrls(urls);
      setData((current: any) =>
        current
          ? {
            ...current,
            report_download_urls: urls,
            reports: reportData.reports,
          }
          : current
      );

      if (urls.brsr) {
        window.open(urls.brsr, "_blank");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Report generation failed.";
      setReportError(message);
    } finally {
      setReportGenerating(false);
    }
  };

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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => router.push("/analytics")}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-slate-900/15 transition-all hover:shadow-xl hover:shadow-slate-900/20 active:scale-[0.98] text-sm"
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </button>

              <button
                type="button"
                onClick={() => router.push("/invoices")}
                className="inline-flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-hover text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-eco-green/20 transition-all hover:shadow-xl hover:shadow-eco-green/30 active:scale-[0.98] text-sm"
              >
                <Upload className="w-4 h-4" />
                Upload New Invoice
              </button>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-eco-green/20 via-emerald-light/10 to-transparent mt-6" />
        </motion.div>

        {/* ── Invoice Processing Summary Widget ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
              <h2 className="text-sm font-bold text-text-dark uppercase tracking-wider">
                Document Analysis Overview
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <div className="bg-eco-green/5 rounded-xl px-4 py-3 border border-eco-green/10">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Uploaded File
                </p>
                <p className="text-lg font-bold text-text-dark mt-1 truncate" title={(data as any)?.file_name || (data as any)?.filename || "Latest Invoice"}>
                  {(data as any)?.file_name || (data as any)?.filename || "Latest Invoice"}
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl px-4 py-3 border border-blue-100">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Document Type
                </p>
                <p className="text-lg font-bold text-text-dark mt-1 truncate">
                  {(data as any)?.document_type || "Invoice"}
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl px-4 py-3 border border-purple-100">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Processing Status
                </p>
                <p className="text-lg font-bold text-text-dark mt-1">
                  Processed
                </p>
              </div>
              <div className="bg-indigo-50 rounded-xl px-4 py-3 border border-indigo-100">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Data Quality
                </p>
                <p className="text-lg font-bold text-text-dark mt-1">
                  {(data as any)?.data_quality || "High"}
                </p>
              </div>
              <div className="bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Report Status
                </p>
                <p className="text-lg font-bold text-text-dark mt-1">
                  {reportGenerating ? "Preparing" : hasGeneratedReport ? "Generated" : "Ready"}
                </p>
              </div>
              <div className="bg-rose-50 rounded-xl px-4 py-3 border border-rose-100">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Source Type
                </p>
                <p className="text-lg font-bold text-text-dark mt-1 truncate">
                  Uploaded Document
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Top Summary Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardMetricCard
            label="Total CO₂e"
            value={summaryCards?.totalCO2e ?? 0}
            unit="kg"
            decimals={2}
            icon={<BarChart3 className="w-5 h-5" />}
            color="text-eco-green"
            index={0}
          />
          <DashboardMetricCard
            label="Total tCO₂e"
            value={summaryCards?.totalTCO2e ?? 0}
            unit="tCO₂e"
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
                <Receipt className="w-5 h-5 text-emerald-500" />
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
            <Beaker className="w-5 h-5 text-emerald-500" />
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

        {/* ── Generate / Download Reports ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-6">
            {reportGenerating ? (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                <EngagingLoader
                  title="Generating Reports"
                  subtitle={isUK ? "Compiling your data into UK SECR compliant format..." : "Compiling your data into BRSR and CBAM compliant formats..."}
                />
              </motion.div>
            ) : (
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="w-5 h-5 text-emerald-500" />
                    <h2 className="text-sm font-bold text-text-dark uppercase tracking-wider">
                      Report Generation
                    </h2>
                  </div>
                  <p className="text-sm text-text-muted max-w-2xl">
                    {isUK
                      ? "Generate a downloadable UK SECR PDF report for this uploaded invoice."
                      : "Generate downloadable BRSR and CBAM PDF reports for this uploaded invoice."}
                  </p>
                  {reportError && (
                    <p className="text-sm text-red-600 font-semibold mt-3">
                      {reportError}
                    </p>
                  )}
                </div>

                {!hasGeneratedReport && (
                  <button
                    type="button"
                    onClick={handleGenerateReport}
                    disabled={reportGenerating}
                    className="inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-slate-900/15 transition-all hover:shadow-xl hover:shadow-slate-900/20 active:scale-[0.98] text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    Generate PDF Report
                  </button>
                )}
              </div>
            )}

            {hasGeneratedReport && (
              <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-gray-100">
                {isUK ? (
                  /* UK Region: Single "Download UK Report" button */
                  reportUrls.brsr && (
                    <a
                      href={reportUrls.brsr}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 bg-eco-green hover:bg-eco-hover text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-eco-green/20 transition-all hover:shadow-xl hover:shadow-eco-green/30 active:scale-[0.98] text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download UK Report
                      <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                    </a>
                  )
                ) : (
                  /* India / Other Regions: BRSR + CBAM buttons */
                  <>
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
                        className="inline-flex items-center gap-2.5 bg-white border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white font-semibold px-5 py-3 rounded-xl shadow-sm transition-all active:scale-[0.98] text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download CBAM Report
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </a>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── Emission Result Card ──

function EmissionResultCard({
  entry,
  index,
}: {
  entry: any;
  index: number;
}) {
  const result = entry?.result ?? entry ?? {};

  const isSuccess = entry.success === true || entry.status === "calculated";

  if (!isSuccess) {
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
      <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-eco-green" />

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
              CO₂e
            </p>
            <p className="text-lg font-extrabold text-text-dark font-heading tabular-nums">
              {Number(result?.co2e ?? result?.co2e_total ?? entry?.co2e ?? 0).toLocaleString()}
            </p>
            <p className="text-[10px] text-text-muted font-medium">
              {result?.co2e_unit ?? entry?.co2e_unit ?? "kg"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl px-3 py-3">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">
              Total tCO₂e
            </p>
            <p className="text-lg font-extrabold text-text-dark font-heading tabular-nums">
              {Number(result?.total_tco2e ?? entry?.total_tco2e ?? 0).toLocaleString(undefined, {
                maximumFractionDigits: 3,
              })}
            </p>
            <p className="text-[10px] text-text-muted font-medium">tCO₂e</p>
          </div>
          <div className="bg-gray-50 rounded-xl px-3 py-3">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">
              Factor Region
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-text-muted" />
              <p className="text-lg font-extrabold text-text-dark font-heading">
                {formatRegion(entry?.region ?? result?.region ?? entry?.factor_region ?? result?.factor_region ?? "N/A")}
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
                  {result?.factor_name ?? result?.name ?? entry?.factor_name ?? "Unknown Factor"}
                </span>
                <span className="text-[10px] text-text-muted ml-2">
                  ({result?.activity_id ?? entry?.activity_id ?? "N/A"})
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Beaker className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <span className="text-xs text-text-muted">
                {result?.source_lca_activity ?? result?.source ?? entry?.source_lca_activity ?? "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

