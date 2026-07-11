"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Leaf, Recycle, Globe2, Wind, Droplets } from "lucide-react";

const TIPS = [
  { text: "Did you know? Switching to renewable energy can reduce emissions by up to 80%.", icon: Wind },
  { text: "Analyzing your data with AI for maximum accuracy...", icon: Sparkles },
  { text: "Fun Fact: Recycling one ton of paper saves 17 trees.", icon: Recycle },
  { text: "Cross-referencing thousands of global emission factors...", icon: Globe2 },
  { text: "Small changes in logistics can lead to massive carbon reductions.", icon: Leaf },
  { text: "Conserving water also saves the energy used to process it.", icon: Droplets },
];

interface EngagingLoaderProps {
  title: string;
  subtitle?: string;
}

export function EngagingLoader({ title, subtitle }: EngagingLoaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TIPS.length);
    }, 4000); // Change tip every 4 seconds
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = TIPS[currentIndex].icon;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-eco-green/20 shadow-lg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-eco-green/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-20 h-20 flex items-center justify-center mb-6">
          {/* Spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="w-full h-full rounded-full border-4 border-eco-green/20 border-t-eco-green" />
          </motion.div>
          {/* Static logo icon in center - fills the circle */}
          <img
            src="/icon-192x192.png"
            alt="CarbonSynq"
            className="w-16 h-16 object-contain"
          />
        </div>
        
        <h3 className="text-xl font-bold text-text-dark mb-2">{title}</h3>
        {subtitle && <p className="text-text-muted text-sm mb-8 text-center">{subtitle}</p>}

        <div className="h-20 flex items-center justify-center max-w-md text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-eco-green/10 flex items-center justify-center">
                <CurrentIcon className="w-4 h-4 text-eco-green" />
              </div>
              <p className="text-sm font-medium text-text-dark/80">
                {TIPS[currentIndex].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
