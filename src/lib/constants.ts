export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://carbonsync-backend-mp5h.onrender.com";

export const APP_NAME = "CarbonSync";

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  INVOICES: "/invoices",
  DASHBOARD: "/dashboard",
} as const;

export const NON_MARKETING_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.INVOICES,
  ROUTES.DASHBOARD,
] as const;

export const SUPPORTED_FILE_TYPES = [
  { ext: "PDF", mime: "application/pdf", icon: "FileText" },
  { ext: "CSV", mime: "text/csv", icon: "FileSpreadsheet" },
  { ext: "XLSX", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", icon: "FileSpreadsheet" },
] as const;
