'use client'

import FeatureCard from '../components/FeatureCard'
import { operationCards } from '../data/supplyChainData'

export default function Operations() {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Supply Chain Operations
          </h2>
          <p className="text-lg md:text-xl text-slate-500">
            Real-time carbon intelligence across your entire supply chain operations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 items-stretch">
          {operationCards.map((card, index) => (
            <FeatureCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
