"use client";

import { motion } from "framer-motion";
import type { EmissionFactor } from "@/types/report";

const NA = "\u2014";

interface EmissionFactorCardProps {
  factor?: EmissionFactor | null;
  index?: number;
}

const factorItems = (factor?: EmissionFactor | null) => [
  { label: "Name", value: factor?.name ?? NA },
  { label: "Activity ID", value: factor?.activity_id ?? NA, mono: true },
  { label: "Access Type", value: factor?.access_type ?? NA },
  { label: "Source LCA Activity", value: factor?.source_lca_activity ?? NA },
];

export function EmissionFactorCard({ factor, index = 0 }: EmissionFactorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
      className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-6"
    >
      <h3 className="text-base font-bold text-text-dark mb-5">
        Emission Factor
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {factorItems(factor).map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 p-3 rounded-xl bg-surface-alt/50"
          >
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              {item.label}
            </span>
            <span
              className={`text-sm font-semibold text-text-dark break-all ${
                item.mono ? "font-mono text-xs" : ""
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
