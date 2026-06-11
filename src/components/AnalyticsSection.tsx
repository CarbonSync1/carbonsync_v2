'use client';

import { useState } from 'react';

import { chartData } from '@/data/chartData';
import { ArrowRight, ShieldCheck, TrendingDown, Leaf, BarChart3, Activity, Zap, Award, HelpCircle, ChevronDown, Send, Upload, LineChart, FileCheck, Globe2, Users, Layers, Database, CheckCircle } from 'lucide-react';

export function Analytics() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  return (
    <section id="analytics" className="bg-white py-24 px-[5%]">
      <div className="mx-auto max-w-[1200px]">
        <div
          className="mx-auto mb-8 max-w-[700px] text-center"
        >
          <span className="mb-4 block text-xs font-extrabold uppercase tracking-widest text-eco-green">Live Analytics</span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-tight tracking-tight text-text-dark mb-5">
            Emissions Intelligence at a Glance
          </h2>
          <p className="text-base leading-relaxed text-text-muted">
            Real-time carbon data visualised for faster, smarter decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div
            className="rounded-2xl border border-forest-mid/5 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex flex-col items-start gap-3 md:flex-row md:justify-between">
              <div>
                <div className="font-heading text-base font-bold text-text-dark mb-1">
                  Monthly CO₂ Emissions & Scope Breakdown
                </div>
                <div className="text-xs text-text-muted">
                  {selectedMonth !== null
                    ? `${chartData[selectedYear].months[selectedMonth].m} ${selectedYear} · Click a bar to change month`
                    : `Full year ${selectedYear} · Click a bar to see Scope Breakdown`}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-eco-green/10 px-3 py-1.5 text-xs font-bold text-eco-green">
                  {chartData[selectedYear].trend}
                </span>
                <div className="flex gap-1 rounded-xl bg-[#f1f8e9] p-1">
                  {[2025, 2026].map((y) => (
                    <button
                      key={y}
                      className={`cursor-pointer rounded-lg border-none px-3 py-1 text-xs font-bold transition-all ${
                        selectedYear === y
                          ? 'bg-white text-eco-green shadow-sm'
                          : 'bg-none text-text-muted'
                      }`}
                      onClick={() => { setSelectedYear(y); setSelectedMonth(null); }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 md:flex-row max-md:gap-6">
              <div className="flex h-[180px] w-full flex-1 items-end gap-2">
                {chartData[selectedYear].months.map((d, i) => {
                  const maxVal = Math.max(...chartData[selectedYear].months.map((m) => m.val));
                  const heightPct = Math.round((d.val / maxVal) * 100);
                  const isSelected = selectedMonth === i;
                  return (
                    <div
                      key={i}
                      className="relative flex h-full flex-1 cursor-pointer flex-col items-center justify-end gap-1.5"
                      onClick={() => setSelectedMonth(isSelected ? null : i)}
                    >
                      <div className="text-[0.7rem] font-bold text-text-muted">{d.val}k</div>
                      <div
                        className="min-h-[4px] w-full rounded-t"
                        style={{
                          height: `${heightPct}%`,
                          background: isSelected ? '#4caf50' : selectedMonth === null ? 'rgba(76,175,80,0.3)' : 'rgba(76,175,80,0.15)',
                          boxShadow: isSelected ? '0 0 12px rgba(76,175,80,0.5)' : 'none',
                        }}
                      />
                      <div className="text-[0.72rem] font-semibold text-text-muted"
                           style={{ fontWeight: isSelected ? 700 : 400, color: isSelected ? '#4caf50' : undefined }}>
                        {d.m}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="h-px w-full bg-black/5 md:h-[120px] md:w-px max-md:w-full max-md:h-px" />

              {(() => {
                const scope = selectedMonth !== null
                  ? chartData[selectedYear].months[selectedMonth]
                  : {
                      s1: Math.round(chartData[selectedYear].months.reduce((a, m) => a + m.s1, 0) / 12),
                      s2: Math.round(chartData[selectedYear].months.reduce((a, m) => a + m.s2, 0) / 12),
                      s3: Math.round(chartData[selectedYear].months.reduce((a, m) => a + m.s3, 0) / 12),
                    };
                const circ = 2 * Math.PI * 48;
                const s1dash = (scope.s1 / 100) * circ;
                const s2dash = (scope.s2 / 100) * circ;
                const s3dash = (scope.s3 / 100) * circ;
                const s2offset = -s1dash;
                const s3offset = -(s1dash + s2dash);
                return (
                  <div className="flex w-full items-center justify-center gap-5 md:w-auto">
                    <div className="relative">
                      <svg viewBox="0 0 120 120" className="w-[120px] flex-shrink-0 -rotate-90">
                        <circle cx="60" cy="60" r="48" fill="none" stroke="#e8f5e9" strokeWidth="18" />
                        <circle cx="60" cy="60" r="48" fill="none" stroke="#4caf50"
                          strokeWidth={18}
                          strokeDasharray={`${s1dash} ${circ - s1dash}`} strokeDashoffset="0" strokeLinecap="round" />
                        <circle cx="60" cy="60" r="48" fill="none" stroke="#81c784"
                          strokeWidth={18}
                          strokeDasharray={`${s2dash} ${circ - s2dash}`} strokeDashoffset={s2offset} strokeLinecap="round" />
                        <circle cx="60" cy="60" r="48" fill="none" stroke="#c8e6c9"
                          strokeWidth={18}
                          strokeDasharray={`${s3dash} ${circ - s3dash}`} strokeDashoffset={s3offset} strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="font-heading text-sm font-bold text-text-dark mb-3">
                        {selectedMonth !== null ? `${chartData[selectedYear].months[selectedMonth].m} Breakdown` : `Avg ${selectedYear}`}
                      </div>
                      {[
                        { label: 'Scope 1', pct: scope.s1, color: '#4caf50' },
                        { label: 'Scope 2', pct: scope.s2, color: '#81c784' },
                        { label: 'Scope 3', pct: scope.s3, color: '#c8e6c9' },
                      ].map((item) => (
                        <div key={item.label}
                          className="flex items-center gap-2.5 rounded px-2 py-1 text-sm font-semibold text-text-dark"
                        >
                          <span className="h-3 w-3 flex-shrink-0 rounded" style={{ background: item.color }} />
                          {item.label} - {item.pct}%
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          <div
            className="rounded-2xl border border-forest-mid/5 bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex flex-col items-start gap-3 md:flex-row md:justify-between">
              <div>
                <div className="font-heading text-base font-bold text-text-dark mb-1">Net-Zero Progress Tracker</div>
                <div className="text-xs text-text-muted">Emission intensity (tCO₂e) vs. reduction target</div>
              </div>
              <span className="rounded-full bg-eco-green/10 px-3.5 py-1.5 text-xs font-bold text-eco-green flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-eco-green inline-block animate-pulse" />
                On Track
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <svg viewBox="0 0 600 180" className="w-full h-[180px] overflow-visible">
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4caf50" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#4caf50" stopOpacity="0.02" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>

                  <text x="-8" y="22" className="text-[10px] fill-text-muted" textAnchor="end" fontSize="10">16</text>
                  <text x="-8" y="62" className="text-[10px] fill-text-muted" textAnchor="end" fontSize="10">12</text>
                  <text x="-8" y="102" className="text-[10px] fill-text-muted" textAnchor="end" fontSize="10">8</text>
                  <text x="-8" y="142" className="text-[10px] fill-text-muted" textAnchor="end" fontSize="10">4</text>
                  <text x="-8" y="180" className="text-[10px] fill-text-muted" textAnchor="end" fontSize="10">0</text>

                  {[20, 60, 100, 140, 178].map((y) => (
                    <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                  ))}

                  <polyline points="0,20 150,52 300,84 450,116 600,148"
                    fill="none" stroke="#4caf50" strokeWidth="2" strokeDasharray="6,4" strokeOpacity="0.3" />

                  <polygon points="0,40 150,60 300,85 450,95 600,120 600,178 0,178"
                    fill="url(#areaGrad)" />

                  <polyline
                    points="0,40 150,60 300,85 450,95 600,120"
                    fill="none" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    filter="url(#glow)"
                  />

                  {[
                    { x: 0, y: 40, year: '2022', val: '12.4' },
                    { x: 150, y: 60, year: '2023', val: '10.8' },
                    { x: 300, y: 85, year: '2024', val: '8.5' },
                    { x: 450, y: 95, year: 'Q1 25', val: '7.2' },
                    { x: 600, y: 120, year: 'Q2 25', val: '4.2' },
                  ].map((d, i) => (
                    <g key={i} className="group">
                      <circle cx={d.x} cy={d.y} r="18" fill="transparent" className="cursor-pointer" />
                      <circle cx={d.x} cy={d.y} r="4.5" fill="#fff" stroke="#4caf50" strokeWidth="2.5"
                        className="cursor-pointer drop-shadow-sm" />
                      <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x={d.x - 28} y={d.y - 42} width="56" height="28" rx="6" fill="#1a3a28" />
                        <text x={d.x} y={d.y - 24} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">{d.val}</text>
                      </g>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="flex justify-between px-0 -mt-1">
                {['2022', '2023', '2024', 'Q1 25', 'Q2 25'].map((l) => (
                  <span key={l} className="text-[11px] font-semibold text-text-muted">{l}</span>
                ))}
              </div>

              <div className="flex items-center gap-5 text-xs text-text-muted pt-1 border-t border-black/5 mt-1">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-[2.5px] rounded bg-eco-green inline-block" />
                  Actual Intensity
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-5 h-[2.5px] rounded bg-eco-green/30 inline-block" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #4caf50 0, #4caf50 4px, transparent 4px, transparent 7px)' }} />
                  Target Trajectory
                </span>
                <span className="flex items-center gap-1.5 ml-auto font-semibold text-text-dark">
                  ↓ <span className="text-eco-green">62%</span> reduction
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
