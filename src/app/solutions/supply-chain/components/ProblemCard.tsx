'use client'

import {
  Database,
  Calculator,
  Clock,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react'
import type { Problem } from '../types'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Database,
  Calculator,
  Clock,
  ShieldAlert,
}

const impactMap = [
  "Reduces manual data entry by 80%",
  "Avoids $500k+ in non-compliance fines",
  "Accelerates reporting cycles by 3x",
  "Improves supplier engagement by 60%",
]

interface ProblemCardProps {
  problem: Problem
  index: number
}

export default function ProblemCard({ problem, index }: ProblemCardProps) {
  const Icon = iconMap[problem.icon] || Database
  const impactText = impactMap[index % impactMap.length]

  return (
    <div
      className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 border border-slate-100 hover:border-emerald-100 overflow-hidden cursor-pointer h-full flex flex-col"
    >
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <ArrowUpRight className="w-5 h-5 text-emerald-500" />
      </div>
      
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors duration-300 border border-emerald-100">
        <Icon className="w-6 h-6 text-emerald-600" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3 tracking-wide">
        {problem.title}
      </h3>
      <p className="text-slate-600 leading-relaxed mb-4 flex-grow">
        {problem.description}
      </p>
      
      <div className="pt-4 border-t border-slate-100 mt-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2 text-sm text-emerald-700 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Business Impact: {impactText}
        </div>
      </div>
    </div>
  )
}
