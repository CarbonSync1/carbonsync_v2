'use client'

import { CheckCircle2, FileText } from 'lucide-react'
import { complianceFeatures } from '../data/supplyChainData'

const complianceStandards = ['ESG', 'BRSR', 'CBAM', 'GRI', 'CDP']

export default function Compliance() {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Compliance Ready Reporting
          </h2>
          <p className="text-lg md:text-xl text-slate-500">
            Generate audit-ready reports for every major sustainability framework.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <div
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {complianceStandards.map((standard) => (
                <span
                  key={standard}
                  className="px-5 py-2.5 bg-emerald-50 text-emerald-800 font-semibold rounded-xl border border-emerald-200 text-sm"
                >
                  {standard}
                </span>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {complianceFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative hidden md:block"
          >
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl overflow-hidden p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-emerald-400" />
                  <span className="text-white font-semibold">ESG Report 2026</span>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
                  Audit Ready
                </span>
              </div>
              <div className="space-y-3">
                {['Scope 1 Emissions', 'Scope 2 Emissions', 'Scope 3 Emissions', 'Total Footprint'].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <span className="text-white/70 text-sm">{item}</span>
                      <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
