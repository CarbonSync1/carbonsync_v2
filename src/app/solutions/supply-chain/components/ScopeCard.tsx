'use client'

import { CheckCircle2, Factory, Zap, Globe, TrendingDown } from 'lucide-react'
import type { ScopeData } from '../types'
import type { LucideIcon } from 'lucide-react'

const scopeIcons: LucideIcon[] = [Factory, Zap, Globe]
const roiData = ['25% Cost Reduction', '15% Energy Savings', '40% Supplier ESG Boost']

interface ScopeCardProps {
  data: ScopeData
  index: number
}

export default function ScopeCard({ data, index }: ScopeCardProps) {
  const Icon = scopeIcons[index] ?? Factory
  const roi = roiData[index]

  return (
    <div
      className={`relative flex flex-col h-full bg-white rounded-3xl transition-all duration-500 overflow-hidden group min-w-0 ${
        data.prominent
          ? 'shadow-2xl border-emerald-200 ring-2 ring-emerald-100'
          : 'shadow-lg border border-slate-100 hover:shadow-xl hover:border-emerald-100'
      }`}
    >
      {data.prominent && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500" />
      )}

      <div className="flex flex-col gap-4 md:gap-6 p-6 md:p-8">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-xs font-semibold self-start">
          <TrendingDown className="w-3.5 h-3.5" />
          {roi}
        </div>

        <div
          className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden ${
            data.prominent
              ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md'
              : 'bg-emerald-50 border border-emerald-100 group-hover:bg-emerald-100 transition-colors'
          }`}
        >
          <Icon className={`w-6 h-6 md:w-7 md:h-7 ${data.prominent ? 'text-white' : 'text-emerald-600'}`} />
        </div>

        <div>
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{data.title}</h3>
            {data.prominent && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white">
                Most Comprehensive
              </span>
            )}
          </div>
          <p className="text-sm md:text-base font-semibold text-slate-500">{data.subtitle}</p>
        </div>

        <p className="text-slate-600 leading-relaxed text-sm md:text-base max-w-prose">{data.description}</p>
      </div>

      <div className="flex flex-col gap-5 p-6 md:p-8 pt-0 flex-1">

        <div className="h-16 flex items-end gap-1.5 mt-2">
          {[40, 70, 45, 90, 65, 80, 50, 100].map((height, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-sm ${data.prominent ? 'bg-emerald-500' : 'bg-emerald-200 group-hover:bg-emerald-300 transition-colors'}`}
            />
          ))}
        </div>

        {data.badges && (
          <div className="flex flex-wrap gap-2 mt-2">
            {data.badges.map((badge) => (
              <span
                key={badge}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        <div className="mt-2">
          <h4 className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">
            Data Inputs
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.dataInputs.map((input) => (
              <span
                key={input}
                className="px-2.5 py-1 text-xs bg-slate-50 text-slate-600 rounded-lg border border-slate-200"
              >
                {input}
              </span>
            ))}
          </div>
        </div>

        {data.formula && (
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">
              Calculation
            </h4>
            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <span className="text-xs font-mono font-medium text-emerald-800">
                {data.formula}
              </span>
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-slate-100">
          <h4 className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">
            Features
          </h4>
          <div className="grid grid-cols-1 gap-2.5">
            {data.features.map((feature) => (
              <div key={feature} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-600 leading-snug">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
