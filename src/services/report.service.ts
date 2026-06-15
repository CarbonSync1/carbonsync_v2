import type { EmissionReport } from "@/types/report";

const SERVER_URL = "https://carbonsync-backend.onrender.com";

let latestReport: EmissionReport | null = null;
let pendingFile: File | null = null;

export class ReportService {
  static async estimateEmissions(file: File): Promise<EmissionReport> {
    const formData = new FormData();
    formData.append("document", file);

    const response = await fetch(`${SERVER_URL}/api/v0/estimate`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorMessages: Record<number, string> = {
        400: "No document file uploaded.",
        413: "File too large. Maximum allowed size is 5MB.",
        415: "Unsupported file type. Please upload a valid document.",
        422: "Unable to extract activity data from the document.",
        500: "Internal server error. Please try again later.",
      };
      const message =
        errorMessages[response.status] ??
        "An unexpected error occurred. Please try again.";
      throw new Error(message);
    }

    const result: EmissionReport = await response.json();
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
