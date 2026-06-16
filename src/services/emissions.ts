import type { InvoiceEmissionsResponse, EmissionSummaryResponse } from "@/types/report";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://carbonsynqearth-backend-mp5h.onrender.com";

let latestInvoiceResult: InvoiceEmissionsResponse | null = null;
let pendingFile: File | null = null;

export class EmissionsService {
  static async uploadInvoice(file: File): Promise<InvoiceEmissionsResponse> {
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

    const result: InvoiceEmissionsResponse = await response.json();
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
