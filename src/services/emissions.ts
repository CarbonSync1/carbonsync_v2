import type { InvoiceEmissionsResponse, EmissionSummaryResponse } from "@/types/report";
import { generateFileHash } from "@/lib/cache";
import { InvoiceCache } from "@/lib/cache";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://carbonsync-backend-mp5h.onrender.com";

let latestInvoiceResult: InvoiceEmissionsResponse | null = null;
let pendingFile: File | null = null;

/**
 * Retry a fetch request with exponential backoff
 * @param fn - The fetch function to retry
 * @param maxAttempts - Maximum number of attempts (default: 3)
 * @param initialDelayMs - Initial delay in milliseconds (default: 1000)
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  initialDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on last attempt
      if (attempt === maxAttempts - 1) {
        break;
      }

      // Calculate exponential backoff delay
      const delay = initialDelayMs * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error("Failed after retries");
}

export class EmissionsService {

  static async uploadInvoice(file: File): Promise<InvoiceEmissionsResponse> {

    //try cache
    const hash = await generateFileHash(file);
    if (InvoiceCache.has(hash)) {
      const cachedResult = InvoiceCache.get(hash)!;
      //update latest result and pending file
      latestInvoiceResult = cachedResult;
      pendingFile = null;
      return cachedResult;
    }

    //cache miss - hit server
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

    const result: InvoiceEmissionsResponse = await response.json();
    //update cache
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
}


