export interface EmissionFactor {
  name: string;
  activity_id: string;
  id: string;
  access_type: string;
  source: string;
  source_dataset: string;
  year: number;
  region: string;
  category: string;
  source_lca_activity: string;
  data_quality_flags: string[];
}

export interface ConstituentGases {
  co2e_total: number;
  co2e_other: number | null;
  co2: number | null;
  ch4: number | null;
  ch4_fossil: number | null;
  ch4_biogenic: number | null;
  n2o: number | null;
}

export interface ActivityData {
  activity_value: number;
  activity_unit: string;
}

export type EmissionReportData = {
  co2e: number;
  co2e_unit: string;
  co2e_calculation_method: string;
  constituent_gases: ConstituentGases;
} & Partial<{
  co2e_calculation_origin: string;
  emission_factor: EmissionFactor;
  additional_indicators: Record<string, unknown>;
  activity_data: ActivityData;
  audit_trail: string;
  notices: string[];
}>;

export interface EmissionReport {
  success: boolean;
  data: EmissionReportData;
}

// ── Invoice Emissions API types ──

export interface ExtractedItem {
  item_name: string;
  quantity: number;
  unit: string;
}

export interface EmissionResultDetail {
  co2e: number;
  co2e_unit: string;
  total_tco2e: number;
  factor_name: string;
  activity_id: string;
  factor_region: string;
  category: string;
  source_lca_activity: string;
}

export interface EmissionResultEntry {
  success: boolean;
  item_name: string;
  result: EmissionResultDetail;
}

export interface ReportDownloadUrls {
  brsr: string;
  cbam: string;
}

export interface InvoiceEmissionsResponse {
  success: boolean;
  message: string;
  extracted_items: ExtractedItem[];
  results: EmissionResultEntry[];
  report_download_urls: ReportDownloadUrls;
}

export interface EmissionSummary {
  total_records: string;
  total_kgco2e: string;
  total_tco2e: string;
}

export interface EmissionSummaryResponse {
  success: boolean;
  summary: EmissionSummary;
}
