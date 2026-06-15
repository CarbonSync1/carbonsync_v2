"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/shared/CountUp";

interface DashboardMetricCardProps {
  label: string;
  value: number;
  unit?: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  icon: React.ReactNode;
  color?: string;
  index?: number;
  displayText?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export function DashboardMetricCard({
  label,
  value,
  unit,
  suffix = "",
  prefix = "",
  decimals = 2,
  icon,
  color = "text-eco-green",
  index = 0,
  displayText,
}: DashboardMetricCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-6 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          {label}
        </span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} bg-opacity-10`}
          style={{ backgroundColor: `color-mix(in srgb, currentColor 10%, transparent)` }}>
          {icon}
        </div>
      </div>
      <div className="font-heading text-2xl font-extrabold text-text-dark tracking-tight">
        {displayText ? (
          <span>{displayText}</span>
        ) : (
          <CountUp
            to={value}
            decimals={decimals}
            suffix={suffix || ` ${unit ?? ""}`}
            prefix={prefix}
            duration={2}
          />
        )}
      </div>
    </motion.div>
  );
}
