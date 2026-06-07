'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'

export default function ROICalculator() {
  const [revenue, setRevenue] = useState<number>(50)
  
  const manualHoursSaved = Math.round(revenue * 40)
  const complianceRiskAvoided = Math.round(revenue * 10000)
  const totalROI = Math.round((manualHoursSaved * 50 + complianceRiskAvoided) / 1000)

  return (
    <section className="py-20 relative overflow-hidden bg-white border-t border-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 mb-6">
            <Calculator className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Interactive ROI Calculator
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            See how much time and money CarbonSync can save your organization annually.
          </p>
        </div>

        <div 
          className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-2xl"
        >
          <div className="mb-10">
            <label className="block text-slate-700 font-medium mb-4 text-center text-lg">
              Estimated Annual Revenue: <span className="text-emerald-600 font-bold">${revenue}M</span>
            </label>
            <input 
              type="range" 
              min="10" 
              max="500" 
              step="10"
              value={revenue} 
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>$10M</span>
              <span>$500M+</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="text-3xl font-bold text-slate-900 mb-2">{manualHoursSaved.toLocaleString()}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Hours Saved</div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="text-3xl font-bold text-slate-900 mb-2">${(complianceRiskAvoided / 1000).toFixed(0)}k</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Risk Mitigated</div>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-emerald-100/50 blur-xl" />
              <div className="relative z-10">
                <div className="text-4xl font-extrabold text-emerald-600 mb-2">${totalROI}k</div>
                <div className="text-sm text-emerald-800 font-bold uppercase tracking-wider">Total Est. ROI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
