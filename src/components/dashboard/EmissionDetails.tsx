"use client";

import { motion } from "framer-motion";
import type { EmissionReportData } from "@/types/report";

interface EmissionDetailsProps {
  data: EmissionReportData;
  index?: number;
}

const NA = "\u2014";

const detailItems = (data: EmissionReportData) => [
  { label: "Calculation Method", value: data.co2e_calculation_method.toUpperCase() },
  { label: "Calculation Origin", value: data.co2e_calculation_origin ?? NA },
  { label: "Audit Trail", value: data.audit_trail ?? NA },
  { label: "Emission Factor Source", value: data.emission_factor?.source ?? NA },
  { label: "Dataset", value: data.emission_factor?.source_dataset ?? NA },
  { label: "Year", value: data.emission_factor?.year != null ? String(data.emission_factor.year) : NA },
];

export function EmissionDetails({ data, index = 0 }: EmissionDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
      className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-6"
    >
      <h3 className="text-base font-bold text-text-dark mb-5">
        Emission Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {detailItems(data).map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 p-3 rounded-xl bg-surface-alt/50"
          >
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              {item.label}
            </span>
            <span className="text-sm font-semibold text-text-dark break-all">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
