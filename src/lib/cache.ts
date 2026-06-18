import type { InvoiceEmissionsResponse } from "@/types/report";

export class InvoiceCache {
  private static readonly MAX_CACHE_SIZE = 10;
  private static cache = new Map<
    string,
    InvoiceEmissionsResponse
  >();

  static get(hash: string): InvoiceEmissionsResponse | undefined {
    return this.cache.get(hash);
  }

  static set(hash: string, data: InvoiceEmissionsResponse): void {
    // Evict oldest entry (FIFO) if cache is at max size and entry is new
    if (this.cache.size >= this.MAX_CACHE_SIZE && !this.cache.has(hash)) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey!);
    }
    this.cache.set(hash, data);
  }

  static has(hash: string): boolean {
    return this.cache.has(hash);
  }
}

export async function generateFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();

  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);

  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}