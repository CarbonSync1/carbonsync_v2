'use client'

import ScopeCard from '../components/ScopeCard'
import { scopeData } from '../data/supplyChainData'

export default function Scopes() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Scope Emissions Management
          </h2>
          <p className="text-lg md:text-xl text-slate-600">
            Comprehensive tracking across all three emission scopes with AI-powered accuracy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {(['scope1', 'scope2', 'scope3'] as const).map((key, index) => (
            <ScopeCard key={key} data={scopeData[key]} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
