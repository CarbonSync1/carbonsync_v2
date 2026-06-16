'use client'

import {
  FileInput,
  Brain,
  Layers,
  Sigma,
  FileText,
  TrendingDown,
} from 'lucide-react'
import { workflowSteps } from '../data/supplyChainData'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  FileInput,
  Brain,
  Layers,
  Sigma,
  FileText,
  TrendingDown,
}

export default function Workflow() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-50 via-slate-50 to-slate-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            How CarbonSynqEarth Works
          </h2>
          <p className="text-lg md:text-xl text-slate-600">
            From raw data to actionable insights in six seamless steps, powered by intelligent automation.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute top-12 left-6 right-6 h-1 bg-slate-200 rounded-full hidden lg:block overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 rounded-full"
              />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
            {workflowSteps.map((step, index) => {
              const Icon = iconMap[step.icon] || FileInput

              return (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center text-center group cursor-pointer"
                >
                  <div
                    className="relative z-10 w-24 h-24 lg:w-20 lg:h-20 rounded-2xl bg-white border border-slate-200 shadow-xl flex items-center justify-center mb-6 group-hover:border-emerald-300 transition-all duration-300"
                  >
                    <Icon className="w-10 h-10 lg:w-8 lg:h-8 text-emerald-600 group-hover:text-emerald-500 transition-colors" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl lg:text-lg font-semibold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-[220px]">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
