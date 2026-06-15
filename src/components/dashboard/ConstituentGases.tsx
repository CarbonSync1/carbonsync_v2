"use client";

import { motion } from "framer-motion";
import { Wind, Activity, Flame, Cloud } from "lucide-react";
import type { ConstituentGases as ConstituentGasesType } from "@/types/report";

interface ConstituentGasesProps {
  gases: ConstituentGasesType;
  index?: number;
}

const gasConfig = (gases: ConstituentGasesType) => [
  {
    label: "CO₂e Total",
    value: gases.co2e_total,
    unit: "kg",
    icon: <Activity className="w-4 h-4" />,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "CO₂",
    value: gases.co2,
    unit: "kg",
    icon: <Cloud className="w-4 h-4" />,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "CH₄",
    value: gases.ch4,
    unit: "kg",
    icon: <Flame className="w-4 h-4" />,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "N₂O",
    value: gases.n2o,
    unit: "kg",
    icon: <Wind className="w-4 h-4" />,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

function formatGasValue(value: number | null): string {
  if (value === null) return "No data available";
  return `${value.toLocaleString("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  })} kg`;
}

export function ConstituentGases({ gases, index = 0 }: ConstituentGasesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 + index * 0.05 }}
      className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-6"
    >
      <h3 className="text-base font-bold text-text-dark mb-5">
        Constituent Gases
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gasConfig(gases).map((gas) => (
          <div
            key={gas.label}
            className="flex items-start gap-3 p-3 rounded-xl bg-surface-alt/50"
          >
            <div
              className={`w-9 h-9 rounded-lg ${gas.bg} ${gas.color} flex items-center justify-center flex-shrink-0`}
            >
              {gas.icon}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
                {gas.label}
              </span>
              <span className="text-sm font-semibold text-text-dark">
                {formatGasValue(gas.value)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
