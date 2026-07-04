'use client';


import {
  Layers,
  ArrowRight,
  Zap,
  Activity,
  Building2,
  Cpu,
  Settings,
  Globe2,
  Truck,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';

export default function ScopesSection() {
  return (
    <section id="scopes-universe" className="py-28 px-6 bg-white relative overflow-hidden">
      {/* Decorative concentric orbit rings behind everything */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[220, 340, 480].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-emerald-200/30"
            style={{
              width: size,
              height: size,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="absolute w-2 h-2 rounded-full bg-emerald-400/60"
              style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}
            />
          </div>
        ))}
        {/* Core pulsing dot */}
        <div
          className="absolute w-5 h-5 rounded-full bg-emerald-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 mb-6 uppercase tracking-[0.2em]">
            <Layers className="w-3.5 h-3.5" /> GHG Protocol Framework
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight">
            The <span className="text-emerald-600">Three Layers</span> of Carbon Emissions
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Most companies only see the tip of the iceberg. <strong className="text-slate-700">Scope 3 emissions make up 75% of the average enterprise carbon footprint</strong> — yet they're the hardest to measure. Here's how CarbonSynq Zero maps every layer.
          </p>
        </div>

        {/* Top Stats Bar — striking numbers */}
        <div
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16"
        >
          {[
            { value: '75%', label: 'Average share of Scope 3', sub: 'in total enterprise emissions' },
            { value: '90%+', label: 'In tech & finance', sub: 'sectors Scope 3 dominance' },
            { value: '15', label: 'Scope 3 categories', sub: 'defined by GHG Protocol' },
          ].map((stat, i) => (
            <div key={i} className="text-center group cursor-default">
              <span className="text-3xl md:text-4xl font-extrabold stat-number-shimmer">{stat.value}</span>
              <p className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wide">{stat.label}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* ═══ THE ICEBERG — 3 Scope Cards ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch relative">

          {/* Connecting Flow Lines (desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-amber-400/0 flow-line" />
          </div>

          {/* ── SCOPE 1: Direct ── */}
          <div
            className="relative z-10 group flex"
          >
            <div
              className="scope-card-accent rounded-2xl border border-emerald-200 bg-white p-7 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-emerald-300 flex flex-col h-full"
              style={{ '--accent-start': '#10b981', '--accent-end': '#34d399' } as React.CSSProperties}
            >
              <div className="flex flex-col gap-4 md:gap-6">
                <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 self-start">~5-10%</span>

                <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 scope-ring-pulse">
                  <Zap className="w-6 h-6 md:w-7 md:h-7" />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600">Scope 1</span>
                  <p className="text-sm md:text-base font-extrabold text-slate-900">Direct Emissions</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-5 max-w-prose">
                Emissions from sources your company <strong className="text-slate-800">owns or directly controls</strong> — on-site combustion, company vehicles, and fugitive refrigerant leaks from HVAC systems.
              </p>

              {/* Examples */}
              <div className="space-y-2 mb-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Common Sources</p>
                {[
                  { icon: <Truck className="w-3.5 h-3.5" />, text: 'Company-owned fleet vehicles' },
                  { icon: <Zap className="w-3.5 h-3.5" />, text: 'On-site diesel generators & boilers' },
                  { icon: <Settings className="w-3.5 h-3.5" />, text: 'Refrigerant gas leaks (HFCs)' },
                ].map((ex, j) => (
                  <div key={j} className="flex items-center gap-2.5 text-xs text-slate-600 p-2 rounded-lg bg-emerald-50/50 border border-emerald-100/60">
                    <span className="text-emerald-500">{ex.icon}</span>
                    {ex.text}
                  </div>
                ))}
              </div>

              {/* Key insight callout */}
              <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-3 mb-5">
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  <strong>💡 Key Insight:</strong> Electrifying company fleets and replacing on-site fossil fuel boilers can reduce Scope 1 by up to <strong>60%</strong> — the most direct lever under your full operational control.
                </p>
              </div>

              {/* Metric bar — pushed to bottom */}
              <div className="pt-4 border-t border-slate-100 mt-auto">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1.5">
                  <span className="font-bold uppercase tracking-wider">Typical Share</span>
                  <span className="font-mono font-bold text-emerald-600">5-10%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    style={{ width: '10%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── SCOPE 2: Indirect Energy ── */}
          <div
            className="relative z-10 group flex"
          >
            <div
              className="scope-card-accent rounded-2xl border border-sky-200 bg-white p-7 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-sky-300 flex flex-col h-full"
              style={{ '--accent-start': '#0ea5e9', '--accent-end': '#38bdf8' } as React.CSSProperties}
            >
              <div className="flex flex-col gap-4 md:gap-6">
                <span className="text-[10px] px-2 py-1 rounded-full bg-sky-50 text-sky-700 font-bold border border-sky-200 self-start">~10-20%</span>

                <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 scope-ring-pulse">
                  <Activity className="w-6 h-6 md:w-7 md:h-7" />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sky-600">Scope 2</span>
                  <p className="text-sm md:text-base font-extrabold text-slate-900">Purchased Energy</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-5 max-w-prose">
                Indirect emissions from <strong className="text-slate-800">purchased electricity, steam, heating, and cooling</strong> — energy consumed at your facilities but generated off-site by utility providers.
              </p>

              {/* Examples */}
              <div className="space-y-2 mb-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Common Sources</p>
                {[
                  { icon: <Building2 className="w-3.5 h-3.5" />, text: 'Grid electricity for offices & factories' },
                  { icon: <Cpu className="w-3.5 h-3.5" />, text: 'Data center power consumption' },
                  { icon: <Settings className="w-3.5 h-3.5" />, text: 'District heating & cooling systems' },
                ].map((ex, j) => (
                  <div key={j} className="flex items-center gap-2.5 text-xs text-slate-600 p-2 rounded-lg bg-sky-50/50 border border-sky-100/60">
                    <span className="text-sky-500">{ex.icon}</span>
                    {ex.text}
                  </div>
                ))}
              </div>

              {/* Key insight callout — pushed down to align with other cards */}
              <div className="bg-sky-50 border border-sky-200/60 rounded-xl p-3 mb-5 mt-auto">
                <p className="text-[11px] text-sky-800 leading-relaxed">
                  <strong>💡 Key Insight:</strong> Transitioning to renewable energy PPAs can cut Scope 2 by up to <strong>80%</strong> — the quickest decarbonization win for most enterprises.
                </p>
              </div>

              {/* Metric bar — pushed to bottom */}
              <div className="pt-4 border-t border-slate-100 mt-auto">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1.5">
                  <span className="font-bold uppercase tracking-wider">Typical Share</span>
                  <span className="font-mono font-bold text-sky-600">10-20%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-400"
                    style={{ width: '20%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── SCOPE 3: The Hidden Giant ── */}
          <div
            className="relative z-10 group flex"
          >
            <div
              className="scope-card-accent rounded-2xl border border-amber-200 bg-white p-7 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-amber-300 flex flex-col h-full"
              style={{ '--accent-start': '#f59e0b', '--accent-end': '#fbbf24' } as React.CSSProperties}
            >
              <div className="flex flex-col gap-4 md:gap-6">
                <span className="text-[10px] px-2 py-1 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200 self-start">~70-90%</span>

                <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 scope-ring-pulse">
                  <Globe2 className="w-6 h-6 md:w-7 md:h-7" />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-600">Scope 3</span>
                  <p className="text-sm md:text-base font-extrabold text-slate-900">Value Chain</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-5 max-w-prose">
                The <strong className="text-slate-800">invisible giant</strong> — all other indirect emissions across your entire value chain. From raw material extraction to end-user product usage and disposal.
              </p>

              {/* Upstream / Downstream split */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-2 flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 rotate-180" /> Upstream
                  </p>
                  <div className="space-y-1.5">
                    {['Raw material extraction', 'Supplier manufacturing', 'Business travel & commuting'].map((item, k) => (
                      <div key={k} className="text-[11px] text-slate-600 p-1.5 rounded bg-amber-50/60 border border-amber-100/50 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-2 flex items-center gap-1">
                    Downstream <ArrowRight className="w-3 h-3" />
                  </p>
                  <div className="space-y-1.5">
                    {['Product use-phase energy', 'End-of-life processing', 'Distribution & logistics'].map((item, k) => (
                      <div key={k} className="text-[11px] text-slate-600 p-1.5 rounded bg-amber-50/60 border border-amber-100/50 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Warning callout */}
              <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3 mb-5">
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  <strong>⚠️ The Blind Spot:</strong> Only <strong>40% of Fortune 500</strong> companies currently report Scope 3 — yet upcoming CSRD and SEC regulations will make it mandatory.
                </p>
              </div>

              {/* Metric bar — pushed to bottom */}
              <div className="pt-4 border-t border-slate-100 mt-auto">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1.5">
                  <span className="font-bold uppercase tracking-wider">Typical Share</span>
                  <span className="font-mono font-bold text-amber-600">70-90%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                    style={{ width: '80%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM — Visual Iceberg Metaphor Bar ═══ */}
        <div
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="text-center mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">The Emissions Iceberg</p>
            <p className="text-sm text-slate-500">What most companies report vs. their true footprint</p>
          </div>

          {/* Stacked iceberg visualization */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
            {/* Water line label */}
            <div className="absolute top-[28%] left-0 right-0 z-20 flex items-center px-4">
              <div className="flex-1 border-t-2 border-dashed border-sky-400/40" />
              <span className="px-3 text-[10px] font-bold text-sky-600 bg-white/90 rounded-full border border-sky-200 uppercase tracking-wider">Surface Line</span>
              <div className="flex-1 border-t-2 border-dashed border-sky-400/40" />
            </div>

            {/* Scope 1 — above water (smallest) */}
            <div className="iceberg-depth-1 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <span className="text-white text-[10px] font-extrabold">S1</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-800">Scope 1 — Direct</p>
                  <p className="text-[10px] text-emerald-600">Company-owned sources</p>
                </div>
              </div>
              <span className="text-sm font-extrabold font-mono text-emerald-700">5-10%</span>
            </div>

            {/* Scope 2 — at water line */}
            <div className="iceberg-depth-2 px-6 py-6 flex items-center justify-between border-t border-emerald-300/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center">
                  <span className="text-white text-[10px] font-extrabold">S2</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-sky-800">Scope 2 — Purchased Energy</p>
                  <p className="text-[10px] text-sky-600">Grid electricity & utilities</p>
                </div>
              </div>
              <span className="text-sm font-extrabold font-mono text-sky-700">10-20%</span>
            </div>

            {/* Scope 3 — deep underwater (massive) */}
            <div className="bg-gradient-to-b from-amber-50 to-amber-100 px-6 py-10 flex items-center justify-between border-t border-amber-200/50 relative">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                  <span className="text-white text-[10px] font-extrabold">S3</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-800">Scope 3 — Full Value Chain</p>
                  <p className="text-[10px] text-amber-600">15 categories · Upstream + Downstream</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold font-mono text-amber-700">75%</span>
                <p className="text-[10px] text-amber-500 font-bold">avg. of total emissions</p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500 mb-4">
              CarbonSynq Zero maps <strong className="text-slate-700">all 15 Scope 3 categories</strong> automatically — from purchased goods to end-of-life treatment.
            </p>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              See How We Map Every Layer <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
