"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";

interface NoticesSectionProps {
  notices: string[];
  index?: number;
}

export function NoticesSection({ notices, index = 0 }: NoticesSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
      className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-6"
    >
      <h3 className="text-base font-bold text-text-dark mb-5">Notices</h3>
      {notices.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center justify-center py-10 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 rounded-2xl bg-eco-green/10 flex items-center justify-center mb-4"
          >
            <Bell className="w-6 h-6 text-eco-green" />
          </motion.div>
          <p className="text-base font-semibold text-text-dark mb-1">
            All clear
          </p>
          <p className="text-sm text-text-muted max-w-xs">
            No notices were returned for this report.
          </p>
        </motion.div>
      ) : (
        <ul className="space-y-3">
          {notices.map((notice, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 text-amber-800 text-sm"
            >
              <Bell className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{notice}</span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
