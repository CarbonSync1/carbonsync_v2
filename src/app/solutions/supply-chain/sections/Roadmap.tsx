'use client'

import RoadmapTimeline from '../components/RoadmapTimeline'
import { roadmapPhases } from '../data/supplyChainData'

export default function Roadmap() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Product Roadmap
          </h2>
          <p className="text-lg md:text-xl text-slate-500">
            Our journey to transform supply chain carbon intelligence.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
            <RoadmapTimeline phases={roadmapPhases} />
          </div>
        </div>
      </div>
    </section>
  )
}
