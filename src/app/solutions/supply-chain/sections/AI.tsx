'use client'

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

export default function AI() {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            AI Capabilities
          </h2>
          <p className="text-lg md:text-xl text-slate-500">
            Powered by advanced machine learning models purpose-built for carbon accounting.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiCapabilities.map((capability, index) => {
            const Icon = iconMap[capability.icon] || Sparkles

            return (
              <div
                key={capability.title}
                className="group relative overflow-hidden rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-br ${capability.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-br ${capability.gradient} flex items-center justify-center mb-3 shadow-sm`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  {capability.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {capability.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
