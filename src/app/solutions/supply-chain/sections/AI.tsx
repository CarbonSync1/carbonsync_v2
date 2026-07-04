'use client'

import { motion } from 'framer-motion'
import {
  ScanEye,
  Tags,
  Wand2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
} from 'lucide-react'
import { aiCapabilities } from '../data/supplyChainData'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  ScanEye,
  Tags,
  Wand2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function AI() {
  return (
    <section className="py-16 md:py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            AI Capabilities
          </h2>
          <p className="text-lg md:text-xl text-slate-500">
            Powered by advanced machine learning models purpose-built for carbon accounting.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {aiCapabilities.map((capability, index) => {
            const Icon = iconMap[capability.icon] || Sparkles

            return (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4 }}
                key={capability.title}
                className="group relative rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-eco-green flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {capability.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {capability.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
