'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wind, Trees, Zap, Cpu, TrendingUp } from 'lucide-react';
import MetricCard from '@/components/dashboard/components/MetricCard';

const CHART_DATA = [
  { name: 'Jan', val: 420, val2: 300 },
  { name: 'Feb', val: 380, val2: 320 },
  { name: 'Mar', val: 450, val2: 280 },
  { name: 'Apr', val: 310, val2: 400 },
  { name: 'May', val: 340, val2: 350 },
  { name: 'Jun', val: 290, val2: 410 },
  { name: 'Jul', val: 240, val2: 450 },
];

export default function DashboardView() {
  return (
    <div className="flex flex-col gap-20">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
        <MetricCard label="Total Emissions" val={1242} unit="tCO2" icon={Wind} color="text-rose-500" trend="-12.4%" />
        <MetricCard label="Biomass Flow" val={842} unit="tCO2" icon={Trees} color="text-emerald-500" trend="+18.2%" />
        <MetricCard label="Neural Sync" val={450} unit="kW" icon={Zap} color="text-blue-500" trend="OPTIMAL" />
        <MetricCard label="Data Surge" val={18} unit="%" icon={Cpu} color="text-cyan-500" trend="+24.8%" />
      </div>
      <div className="glass-god rounded-[5rem] p-20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="flex justify-between items-center mb-20 relative z-10">
          <h4 className="text-3xl font-black uppercase tracking-tight flex items-center gap-6 text-iridescent italic">
            <TrendingUp className="text-emerald-500" /> Global Impact Real-Time
          </h4>
          <div className="flex gap-6">
            {['Live', '24H', '7D'].map((t) => (
              <button
                key={t}
                className="px-8 py-3 glass-god rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-slate-950 transition-all"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[550px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CHART_DATA}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip
                cursor={{ stroke: '#10b981', strokeWidth: 2 }}
                contentStyle={{
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '30px',
                  backdropFilter: 'blur(20px)',
                  padding: '20px',
                }}
              />
              <Area type="monotone" dataKey="val" stroke="#10b981" strokeWidth={6} fill="url(#g1)" />
              <Area type="monotone" dataKey="val2" stroke="#06b6d4" strokeWidth={6} fill="url(#g2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
