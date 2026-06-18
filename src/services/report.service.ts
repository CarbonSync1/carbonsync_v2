import type { EmissionReport } from "@/types/report";

const SERVER_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://carbonsync-backend-mp5h.onrender.com";

let latestReport: EmissionReport | null = null;
let pendingFile: File | null = null;

function normalizeReportUrl(url?: string | null) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${SERVER_URL}${url}`;
}

function normalizeReportResponse(raw: any): EmissionReport {
  const reportUrls = raw?.report_download_urls ?? raw?.reports ?? {};

  return {
    ...raw,
    report_download_urls: {
      brsr: normalizeReportUrl(
        reportUrls?.brsr ?? raw?.brsrReportUrl ?? raw?.brsr_report_url
      ),
      cbam: normalizeReportUrl(
        reportUrls?.cbam ?? raw?.cbamReportUrl ?? raw?.cbam_report_url
      ),
    },
  };
}

export class ReportService {
  static async estimateEmissions(file: File): Promise<EmissionReport> {
    const formData = new FormData();

    // Current backend expects "invoice", not "document"
    formData.append("invoice", file);

    const response = await fetch(`${SERVER_URL}/api/upload-invoice`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorMessages: Record<number, string> = {
        400: "No invoice file uploaded.",
        413: "File too large. Maximum allowed size is 5MB.",
        415: "Unsupported file type. Please upload a valid document.",
        422: "Unable to extract invoice items from the document.",
        500: "Internal server error. Please try again later.",
      };

      const message =
        errorMessages[response.status] ??
        "An unexpected error occurred. Please try again.";

      throw new Error(message);
    }

    const result = normalizeReportResponse(await response.json());

    latestReport = result;
    pendingFile = null;

    return result;


  }

  static getLatestReport(): EmissionReport | null {
    return latestReport;
  }

  static clearLatestReport(): void {
    latestReport = null;
  }

  static setPendingFile(file: File): void {
    pendingFile = file;
  }

  static getPendingFile(): File | null {
    return pendingFile;
  }

  static clearPendingFile(): void {
    pendingFile = null;
  }
}
