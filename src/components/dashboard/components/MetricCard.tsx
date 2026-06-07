'use client';


import CountUp from '@/components/dashboard/components/CountUp';

interface MetricCardProps {
  label: string;
  val: number;
  unit: string;
  icon: React.ComponentType<{ size?: number | string }>;
  trend: string;
  color: string;
}

export default function MetricCard({ label, val, unit, icon: Icon, trend, color }: MetricCardProps) {
  return (
    <div
      className="glass-god rounded-[4rem] p-12 flex flex-col justify-between group h-full relative overflow-hidden"
    >
      <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] group-hover:blur-[120px] transition-all duration-700" />
      <div className="flex justify-between items-start mb-16 relative z-10">
        <div className={`w-20 h-20 rounded-[2.5rem] bg-white/5 flex items-center justify-center ${color} shadow-inner group-hover:scale-110 transition-transform duration-500`}>
          <Icon size={32} />
        </div>
        <div className="px-6 py-2.5 bg-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white/40 border border-white/10">
          {trend}
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-[12px] text-white/30 font-black uppercase tracking-[0.5em] mb-4">{label}</p>
        <div className="flex items-baseline gap-3">
          <h3 className="text-7xl font-black text-white tracking-tighter leading-none">
            <CountUp end={val} />
          </h3>
          <span className="text-sm font-black text-white/20 uppercase tracking-widest">{unit}</span>
        </div>
      </div>
    </div>
  );
}
