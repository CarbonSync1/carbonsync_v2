'use client'

import { ArrowRight, Phone } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Transform Sustainability Into{' '}
            <span className="text-emerald-200">Competitive Advantage</span>
          </h2>
          <p className="text-lg md:text-xl text-emerald-100/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Automate carbon accounting, improve supplier transparency, and stay ahead of
            global sustainability regulations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 font-semibold rounded-2xl shadow-xl hover:bg-emerald-50 transition-colors duration-200"
            >
              Schedule Demo
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500/20 text-white font-semibold rounded-2xl border border-emerald-400/30 hover:bg-emerald-500/30 transition-colors duration-200 backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
