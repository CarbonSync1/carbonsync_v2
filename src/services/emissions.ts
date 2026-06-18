import type { InvoiceEmissionsResponse, EmissionSummaryResponse } from "@/types/report";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://carbonsync-backend-mp5h.onrender.com";

let latestInvoiceResult: InvoiceEmissionsResponse | null = null;
let pendingFile: File | null = null;

// Real cache: same file upload ho to cache use ho sakta hai
const invoiceCache = new Map<string, InvoiceEmissionsResponse>();

function getFileCacheKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

function normalizeReportUrl(url?: string | null) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
}

function normalizeInvoiceResponse(raw: any): InvoiceEmissionsResponse {
  const extractedItems =
    raw?.extracted_items ??
    raw?.line_items ??
    raw?.items ??
    [];

  const results =
    raw?.results ??
    raw?.emission_results ??
    raw?.calculation_results ??
    [];

  const reportUrls = raw?.report_download_urls ?? raw?.reports ?? {};

  return {
    ...raw,
    success: Boolean(raw?.success),
    message: raw?.message ?? "Invoice processed successfully.",
    extracted_items: Array.isArray(extractedItems) ? extractedItems : [],
    results: Array.isArray(results) ? results : [],
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

export class EmissionsService {
  static async uploadInvoice(file: File): Promise<InvoiceEmissionsResponse> {
    const cacheKey = getFileCacheKey(file);


    // New upload start hote hi dashboard ka old/stale result clear
    latestInvoiceResult = null;

    // Same file already processed hai to cache se result return karo
    const cachedResult = invoiceCache.get(cacheKey);
    if (cachedResult) {
      latestInvoiceResult = cachedResult;
      pendingFile = null;
      return cachedResult;
    }

    const formData = new FormData();
    formData.append("invoice", file);

    const response = await fetch(`${API_BASE_URL}/api/upload-invoice`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorMessages: Record<number, string> = {
        400: "No invoice file uploaded.",
        413: "File too large. Maximum allowed size is 5MB.",
        415: "Unsupported file type.",
        422: "Unable to extract invoice items from the document.",
        500: "Internal server error.",
      };

      const message =
        errorMessages[response.status] ??
        "An unexpected error occurred. Please try again.";

      throw new Error(message);
    }

    const result = normalizeInvoiceResponse(await response.json());

    invoiceCache.set(cacheKey, result);
    latestInvoiceResult = result;
    pendingFile = null;

    return result;


  }

  static async getEmissionSummary(): Promise<EmissionSummaryResponse> {
    const response = await fetch(`${API_BASE_URL}/api/emissions/summary`);


    if (!response.ok) {
      throw new Error("Failed to fetch emission summary.");
    }

    return response.json();


  }

  static getLatestResult(): InvoiceEmissionsResponse | null {
    return latestInvoiceResult;
  }

  static clearLatestResult(): void {
    latestInvoiceResult = null;
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

  static clearCache(): void {
    invoiceCache.clear();
  }
}
