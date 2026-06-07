'use client'

import ProblemCard from '../components/ProblemCard'
import { problems } from '../data/supplyChainData'

export default function Problems() {
  return (
    <section className="py-16 md:py-20 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            The Hidden Carbon Challenge
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Most organizations struggle to obtain accurate supply chain emissions data because
            information is fragmented across multiple systems and stakeholders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {problems.map((problem, index) => (
            <ProblemCard key={problem.title} problem={problem} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
