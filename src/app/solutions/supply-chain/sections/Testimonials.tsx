'use client'

import TrustBadges from '../components/TrustBadges'

const testimonials = [
  {
    quote: "CarbonSync transformed our supply chain transparency and saved us millions.",
    author: "Ayush Chaudhary",
    role: "COO, CarbonSync",
  },
  {
    quote: "The sustainability insights are game‑changing for our ESG reporting.",
    author: "Rohan Patel",
    role: "VP Operations, EcoSupply",
  },
  {
    quote: "A premium platform that turned climate data into actionable strategy.",
    author: "Sneha Rao",
    role: "Head of Procurement, PureMaterials",
  },
];

const metrics = [
  { value: '500+', label: 'Datasets Processed Daily' },
  { value: '$2M+', label: 'In Compliance Savings' },
  { value: '99.9%', label: 'AI Data Accuracy' },
]

export default function Testimonials() {
  return (
    <section className="py-20 relative overflow-hidden bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {metrics.map((m, i) => (
            <div 
              key={i}
              className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm"
            >
              <div className="text-4xl font-bold text-emerald-600 mb-2">{m.value}</div>
              <div className="text-slate-500 uppercase tracking-widest text-xs font-semibold">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Trusted by Industry Leaders</h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Global enterprises rely on CarbonSync for real-time emissions tracking, continuous compliance, and supply chain decarbonization.
            </p>
            <div className="bg-white p-4 rounded-xl border border-slate-200 inline-block shadow-sm">
              <div className="text-sm text-slate-500 mb-2 uppercase tracking-wider font-semibold">Enterprise Grade Compliance</div>
              <TrustBadges className="[&_span]:text-slate-700 [&_svg]:text-emerald-500" />
            </div>
          </div>

          <div
            className="relative"
          >
            <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-2xl transform rotate-3" />
            
            <div className="relative bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-2xl">
              <div className="absolute top-8 left-8 text-6xl text-emerald-500/20 font-serif leading-none">"</div>
              <div className="relative z-10 overflow-hidden h-40">
                <div className="flex space-x-12 animate-carousel w-[300%]">
                  {testimonials.concat(testimonials).map((t, i) => (
                    <div key={i} className="w-1/3 flex-shrink-0 pt-4">
                      <p className="text-lg md:text-xl text-slate-800 italic mb-6 leading-relaxed font-medium">
                        {t.quote}
                      </p>
                      <div>
                        <div className="font-bold text-slate-900">{t.author}</div>
                        <div className="text-sm text-emerald-600 font-semibold">{t.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
