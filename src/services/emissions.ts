import type { InvoiceEmissionsResponse, EmissionSummaryResponse } from "@/types/report";
import { generateFileHash } from "@/lib/cache";
import { InvoiceCache } from "@/lib/cache";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://carbonsync-backend-mp5h.onrender.com";

let latestInvoiceResult: InvoiceEmissionsResponse | null = null;
let pendingFile: File | null = null;

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

async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  retries = 3,
  delayMs = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;


      if (attempt < retries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, delayMs * Math.pow(2, attempt))
        );
      }
    }

  }

  throw lastError;
}

export class EmissionsService {
  static async uploadInvoice(file: File): Promise<InvoiceEmissionsResponse> {
    const hash = await generateFileHash(file);

    // New upload start hote hi dashboard ka old/stale result clear
    latestInvoiceResult = null;

    // Same file already processed hai to cache se result return karo
    const cachedResult = InvoiceCache.get(hash);
    if (cachedResult) {
      latestInvoiceResult = cachedResult;
      pendingFile = null;
      return cachedResult;
    }

    const formData = new FormData();
    formData.append("invoice", file);

    const response = await retryWithBackoff(
      () =>
        fetch(`${API_BASE_URL}/api/upload-invoice`, {
          method: "POST",
          body: formData,
        }),
      3,
      1000
    );

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

    InvoiceCache.set(hash, result);
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
    InvoiceCache.clear();
  }
}


