'use client'

import IntegrationCard from '../components/IntegrationCard'
import { integrations } from '../data/supplyChainData'

export default function Integrations() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Enterprise Integrations
          </h2>
          <p className="text-lg md:text-xl text-slate-500">
            Connect with your existing enterprise systems seamlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrations.map((integration) => (
            <div key={integration.category}>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                {integration.category}
              </h3>
              <div className="space-y-2">
                {integration.items.map((item, index) => (
                  <IntegrationCard
                    key={item}
                    name={item}
                    index={index}
                    future={integration.future}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
