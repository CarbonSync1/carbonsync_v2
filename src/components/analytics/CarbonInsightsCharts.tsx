import React from 'react';
import { motion, type Variants } from "framer-motion"; import { Leaf, TrendingDown, Layers, ArrowRight } from 'lucide-react';
import { TuningConfig, MetricDataPoint, baseWeeklyDataPoints } from './analyticsData';

interface CarbonInsightsChartsProps {
  tuning?: TuningConfig;
  dynamicWeeklyData?: MetricDataPoint[];
}

export default function CarbonInsightsCharts({ tuning, dynamicWeeklyData }: CarbonInsightsChartsProps) {
  // Use props if provided, otherwise fallback to defaults
  const activeTuning = tuning || {
    renewablePercent: 35,
    fleetElectrification: 15,
    energyEfficiencyUpgrades: 20,
    supplierAuditParticipation: 40
  };

  const activeWeeklyData = dynamicWeeklyData || baseWeeklyDataPoints;

  // 1. Calculate dynamic emissions breakdown (Scope 1, 2, 3) from activeWeeklyData
  const scope1Sum = activeWeeklyData.reduce((sum, pt) => sum + pt.primaryLineEmissions, 0);
  const scope2Sum = activeWeeklyData.reduce((sum, pt) => sum + pt.assemblyLineEmissions, 0);
  const scope3Sum = activeWeeklyData.reduce((sum, pt) => sum + pt.packagingLineEmissions, 0);
  const totalEmissions = scope1Sum + scope2Sum + scope3Sum;

  const scope1Pct = totalEmissions > 0 ? Math.round((scope1Sum / totalEmissions) * 100) : 32;
  const scope2Pct = totalEmissions > 0 ? Math.round((scope2Sum / totalEmissions) * 100) : 28;
  const scope3Pct = totalEmissions > 0 ? 100 - scope1Pct - scope2Pct : 40;

  // Chart 1: Donut Chart Data
  const donutData = [
    { label: 'Scope 1', value: scope1Pct, color: '#ef4444' }, // red-500
    { label: 'Scope 2', value: scope2Pct, color: '#06b6d4' }, // cyan-500
    { label: 'Scope 3', value: scope3Pct, color: '#f59e0b' }, // amber-500
  ];
  let cumulativePercent = 0;

  function getCoordinatesForPercent(percent: number) {
    const x = Math.cos(2 * Math.PI * percent) * 100;
    const y = Math.sin(2 * Math.PI * percent) * 100;
    return [x, y];
  }

  // Calculate the relative impact factor based on sliders
  const rMult = 1 - (activeTuning.renewablePercent / 130);
  const fMult = 1 - (activeTuning.fleetElectrification / 150);
  const eMult = 1 - (activeTuning.energyEfficiencyUpgrades / 200);
  const sMult = 1 - (activeTuning.supplierAuditParticipation / 250);

  const rDefault = 1 - (35 / 130);
  const fDefault = 1 - (15 / 150);
  const eDefault = 1 - (20 / 200);
  const sDefault = 1 - (40 / 250);

  const currentImpact = rMult * fMult * eMult * sMult;
  const defaultImpact = rDefault * fDefault * eDefault * sDefault;
  const relativeFactor = Math.min(1.25, Math.max(0.2, currentImpact / defaultImpact));

  // Chart 2: Dynamic Area Chart Data
  // Base historical emissions representing a monthly downward curve, dynamically scaled
  const baseMonthly = [420, 395, 380, 360, 345, 330, 310, 295, 280, 265, 250, 235];
  const monthlyData = baseMonthly.map(val => Math.round(val * relativeFactor));
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxMonthly = 500;
  const chartW = 300;
  const chartH = 140;

  // Chart 3: Energy Stack dynamically calculated from activeTuning.renewablePercent
  const renewableShare = activeTuning.renewablePercent;
  const gridVal = 100 - renewableShare;

  // Split renewableShare into Solar (50%), Wind (35%), Hydro (15%)
  const dynamicSolar = Math.round(renewableShare * 0.5);
  const dynamicWind = Math.round(renewableShare * 0.35);
  const dynamicHydro = renewableShare - dynamicSolar - dynamicWind;

  const energyData = [
    { label: 'Solar', value: dynamicSolar, color: '#f59e0b' }, // amber
    { label: 'Wind', value: dynamicWind, color: '#06b6d4' }, // cyan
    { label: 'Grid', value: gridVal, color: '#94a3b8' }, // slate
    { label: 'Hydro', value: dynamicHydro, color: '#3b82f6' }, // blue
  ];

  // Chart 4: Heatmap Data
  const heatRegions = ['AMER', 'EMEA', 'APAC', 'GLOBAL'];
  const heatQuarters = ['Q1', 'Q2', 'Q3'];
  const baseHeatData = [
    [45, 65, 30],
    [80, 50, 40],
    [90, 75, 60],
    [55, 60, 45]
  ];
  const heatData = baseHeatData.map(row =>
    row.map(val => Math.max(10, Math.min(100, Math.round(val * relativeFactor))))
  );

  // Chart 5: Vertical Bars (Offsets dynamic to relativeFactor)
  const offsetsPurchased = [120, 150, 140, 180, 160, 200].map(val => Math.round(val * relativeFactor));
  const offsetsUsed = [100, 130, 120, 170, 140, 190].map(val => Math.round(val * relativeFactor));
  const offsetMax = 250;

  // Chart 6: Radar Data dynamically calculated from sliders
  const radarLabels = ['GRI', 'CSRD', 'CBAM', 'SEC', 'SDG13', 'ISO14001'];
  const auditBonus = (activeTuning.supplierAuditParticipation - 40) / 3;
  const efficiencyBonus = (activeTuning.energyEfficiencyUpgrades - 20) / 4;

  const radarData = [
    Math.min(100, Math.max(40, Math.round(85 + efficiencyBonus))), // GRI
    Math.min(100, Math.max(40, Math.round(78 + auditBonus))),      // CSRD
    Math.min(100, Math.max(40, Math.round(92 + auditBonus * 0.5))), // CBAM
    Math.min(100, Math.max(40, Math.round(70 + efficiencyBonus * 0.8))), // SEC
    Math.min(100, Math.max(40, Math.round(88 + (activeTuning.renewablePercent - 35) / 5))), // SDG13
    Math.min(100, Math.max(40, Math.round(95 + auditBonus * 0.4))), // ISO14001
  ];

  // Chart 7: Target Projection
  const projectionYears = ['2026', '2027', '2028', '2029', '2030'];
  const projectionTarget = [2800, 2400, 1800, 1000, 0];
  const baseActual = [2950, 2600, 2100, 1500, 800];
  const projectionActual = baseActual.map(val => Math.max(0, Math.round(val * relativeFactor)));

  // Dynamic Y axis steps
  const maxValOfAll = Math.max(...projectionActual, ...projectionTarget);
  const yMax = maxValOfAll > 3200 ? 4000 : 3200;
  const ySteps = yMax === 4000 ? [0, 1000, 2000, 3000, 4000] : [0, 800, 1600, 2400, 3200];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };


  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Center display calculation (scaled up to tCO2e levels matching 3,240 at default settings)
  const displayedTotal = Math.round(totalEmissions * 65);

  // Dynamic summary stats calculations
  const finalActual = projectionActual[projectionActual.length - 1];
  const currentGapVal = Math.max(0, finalActual);

  const initialActual = projectionActual[0] || 1;
  const reductionRate = Math.round(((initialActual - finalActual) / initialActual) * 100);

  const zeroIndex = projectionActual.findIndex(v => v <= 0);
  let netZeroEtaStr = '';
  if (zeroIndex !== -1) {
    netZeroEtaStr = projectionYears[zeroIndex];
  } else {
    const slope = (projectionActual[0] - projectionActual[4]) / 4;
    if (slope > 0) {
      const additionalYears = projectionActual[4] / slope;
      const eta = 2030 + additionalYears;
      netZeroEtaStr = Math.round(eta).toString();
    } else {
      netZeroEtaStr = '—';
    }
  }

  return (
    <section id="insights-anchor" className="py-24 bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs uppercase text-[#059669] font-bold tracking-[0.2em] block">
            CARBON INTELLIGENCE METRICS
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
            Comprehensive ESG Analytics
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base font-medium">
            Visualize your real-time carbon footprint, evaluate compliance scores, and track your decarbonization journey across all operational tiers.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* CARD 1: Emissions Breakdown */}
          <motion.div variants={itemVariants} className="bg-white rounded-[20px] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-[#0f172a] text-base">Emissions Breakdown</h3>
            <p className="text-[11px] text-slate-500 mb-6">Distribution across accounting scopes</p>
            <div className="flex justify-center items-center h-[180px] relative">
              <svg viewBox="-110 -110 220 220" className="w-full h-full transform -rotate-90">
                {donutData.map((slice, i) => {
                  const [startX, startY] = getCoordinatesForPercent(cumulativePercent / 100);
                  cumulativePercent += slice.value;
                  const [endX, endY] = getCoordinatesForPercent(cumulativePercent / 100);
                  const largeArcFlag = slice.value > 50 ? 1 : 0;
                  const pathData = [
                    `M ${startX} ${startY}`,
                    `A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY}`
                  ].join(' ');
                  return (
                    <motion.path
                      key={i}
                      d={pathData}
                      fill="none"
                      stroke={slice.color}
                      strokeWidth="20"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total</span>
                <span className="text-lg font-extrabold text-slate-900 font-mono">{displayedTotal.toLocaleString()}</span>
                <span className="text-[10px] text-slate-500 font-medium">tCO2e</span>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              {donutData.map(d => (
                <div key={d.label} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-xs font-semibold text-slate-600">{d.label} <span className="font-mono text-slate-400 ml-0.5">{d.value}%</span></span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CARD 2: Monthly Reduction Trend */}
          <motion.div variants={itemVariants} className="bg-white rounded-[20px] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-[#0f172a] text-base">Reduction Trajectory</h3>
            <p className="text-[11px] text-slate-500 mb-6">12-month historical emissions (tCO2e)</p>
            <div className="h-[180px] w-full relative">
              <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Y Axis Grid */}
                {[0, 1, 2, 3].map(i => {
                  const y = (i * chartH) / 3;
                  return <line key={i} x1="0" y1={y} x2={chartW} y2={y} stroke="#f1f5f9" strokeWidth="1" />;
                })}
                {/* Area & Line */}
                <motion.path
                  d={`M 0 ${chartH} ` + monthlyData.map((val, i) => {
                    const x = (i / (monthlyData.length - 1)) * chartW;
                    const y = chartH - (val / maxMonthly) * chartH;
                    return `L ${x} ${y}`;
                  }).join(' ') + ` L ${chartW} ${chartH} Z`}
                  fill="url(#areaGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.path
                  d={monthlyData.map((val, i) => {
                    const x = (i / (monthlyData.length - 1)) * chartW;
                    const y = chartH - (val / maxMonthly) * chartH;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                {/* X Axis Labels */}
                {months.map((m, i) => {
                  if (i % 2 !== 0) return null;
                  const x = (i / (months.length - 1)) * chartW;
                  return (
                    <text key={m} x={x} y={chartH + 15} textAnchor="middle" fontSize="10" fill="#94a3b8" className="font-mono">
                      {m}
                    </text>
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* CARD 3: Offset Progress */}
          <motion.div variants={itemVariants} className="bg-white rounded-[20px] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-[#0f172a] text-base">Carbon Offsets</h3>
            <p className="text-[11px] text-slate-500 mb-6">Purchased vs Used (Last 6 Months)</p>
            <div className="h-[180px] w-full relative">
              <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-full overflow-visible">
                {[0, 1, 2].map(i => {
                  const y = (i * chartH) / 2;
                  return <line key={i} x1="0" y1={y} x2={chartW} y2={y} stroke="#f1f5f9" strokeWidth="1" />;
                })}
                {offsetsPurchased.map((val, i) => {
                  const numBars = offsetsPurchased.length;
                  const barGroupW = chartW / numBars;
                  const x = i * barGroupW + barGroupW / 2 - 12;
                  const h1 = (val / offsetMax) * chartH;
                  const y1 = chartH - h1;
                  const val2 = offsetsUsed[i];
                  const h2 = (val2 / offsetMax) * chartH;
                  const y2 = chartH - h2;

                  return (
                    <g key={i}>
                      {/* Purchased */}
                      <motion.rect
                        x={x} y={y1} width="8" height={h1} rx="2" fill="#059669"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      />
                      {/* Used */}
                      <motion.rect
                        x={x + 10} y={y2} width="8" height={h2} rx="2" fill="#06b6d4" opacity="0.8"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                      />
                      <text x={x + 9} y={chartH + 15} textAnchor="middle" fontSize="10" fill="#94a3b8" className="font-mono">
                        M{i + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-[#059669]" /><span className="text-[10px] text-slate-500 font-semibold">Purchased</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-[#06b6d4] opacity-80" /><span className="text-[10px] text-slate-500 font-semibold">Allocated</span></div>
            </div>
          </motion.div>

          {/* CARD 4: Energy Mix (Horizontal Stack) */}
          <motion.div variants={itemVariants} className="bg-white rounded-[20px] p-6 lg:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row items-start lg:items-center justify-between lg:col-span-3 gap-8">
            <div className="lg:w-1/4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#0f172a] text-lg">Energy Source Mix</h3>
              <p className="text-xs text-slate-500 mt-1">Current global consumption distribution</p>
            </div>
            <div className="w-full lg:w-3/4 space-y-5">
              <div className="h-8 w-full bg-slate-100 rounded-full flex overflow-hidden shadow-inner relative">
                {energyData.map((d, i) => {
                  let prevWidth = 0;
                  for (let j = 0; j < i; j++) prevWidth += energyData[j].value;
                  return (
                    <motion.div
                      key={d.label}
                      className="h-full border-r border-white/20 last:border-0 relative group"
                      style={{ backgroundColor: d.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${d.value}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-bold text-white drop-shadow-md">{d.value}%</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {energyData.map(d => (
                  <div key={d.label} className="flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200/60 px-4 py-3 rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: d.color }} />
                      <span className="text-xs font-bold text-slate-700">{d.label}</span>
                    </div>
                    <span className="font-mono text-sm font-black text-slate-900">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>



          {/* CARD 7: Net Zero Trajectory — Premium Visualization */}
          <motion.div variants={itemVariants} className="relative bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow lg:col-span-3 overflow-hidden">
            {/* Decorative subtle blurs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#059669]">Net Zero Pathway</span>
                </div>
                <h3 className="font-extrabold text-[#0f172a] text-xl tracking-tight">Decarbonization Trajectory</h3>
                <p className="text-[12px] text-slate-500 mt-1">SBTi-aligned target vs forecasted emissions pathway to 2030</p>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-[3px] rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-semibold text-slate-500">SBTi Target</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-[3px] rounded-full bg-amber-400" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #f59e0b 0, #f59e0b 4px, transparent 4px, transparent 8px)' }} />
                  <span className="text-[11px] font-semibold text-slate-500">Forecasted</span>
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="relative z-10 h-[380px] w-full">
              <svg viewBox="0 0 700 380" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet">
                <defs>
                  {/* Target area gradient */}
                  <linearGradient id="nzTargetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                  </linearGradient>
                  {/* Actual area gradient */}
                  <linearGradient id="nzActualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.01" />
                  </linearGradient>
                  {/* Glow filter for target line */}
                  <filter id="glowGreen" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Glow filter for amber dots */}
                  <filter id="glowAmber" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {(() => {
                  const padL = 55;
                  const padR = 30;
                  const padT = 15;
                  const padB = 50;
                  const cw = 700 - padL - padR;
                  const ch = 380 - padT - padB;

                  const getX = (i: number) => padL + (i / (projectionYears.length - 1)) * cw;
                  const getY = (v: number) => padT + ch - (v / yMax) * ch;

                  const targetPts = projectionTarget.map((v, i) => ({ x: getX(i), y: getY(v), v }));
                  const actualPts = projectionActual.map((v, i) => ({ x: getX(i), y: getY(v), v }));

                  // Build smooth paths
                  const buildLine = (pts: { x: number; y: number }[]) =>
                    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

                  const buildArea = (pts: { x: number; y: number }[]) =>
                    buildLine(pts) + ` L ${pts[pts.length - 1].x} ${getY(0)} L ${pts[0].x} ${getY(0)} Z`;

                  return (
                    <g>
                      {/* Y-Axis grid lines + labels */}
                      {ySteps.map((step) => {
                        const y = getY(step);
                        return (
                          <g key={step}>
                            <line x1={padL} y1={y} x2={700 - padR} y2={y} stroke="rgba(148,163,184,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                            <text x={padL - 10} y={y + 5} textAnchor="end" fontSize="14" fill="#64748b" className="font-mono" fontWeight="600">
                              {step === 0 ? 'Net 0' : `${(step / 1000).toFixed(1)}k`}
                            </text>
                          </g>
                        );
                      })}

                      {/* Gap fill between target and actual (the "miss" zone) */}
                      <motion.path
                        d={
                          buildLine(actualPts) +
                          ` L ${targetPts[targetPts.length - 1].x} ${targetPts[targetPts.length - 1].y}` +
                          targetPts.slice().reverse().map((p) => ` L ${p.x} ${p.y}`).join('') +
                          ' Z'
                        }
                        fill="rgba(239,68,68,0.08)"
                        stroke="none"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.8 }}
                      />

                      {/* Target area fill */}
                      <motion.path
                        d={buildArea(targetPts)}
                        fill="url(#nzTargetGrad)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />

                      {/* Target line */}
                      <motion.path
                        d={buildLine(targetPts)}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glowGreen)"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />

                      {/* Actual area fill */}
                      <motion.path
                        d={buildArea(actualPts)}
                        fill="url(#nzActualGrad)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />

                      {/* Actual dashed line */}
                      <motion.path
                        d={buildLine(actualPts)}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="8 4"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                      />

                      {/* Target milestones with glow */}
                      {targetPts.map((pt, i) => (
                        <g key={`t-${i}`}>
                          <motion.circle
                            cx={pt.x} cy={pt.y} r="7"
                            fill="#fff" stroke="#10b981" strokeWidth="2.5"
                            filter="url(#glowGreen)"
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }}
                          />
                          {/* Value label above dot */}
                          <motion.text
                            x={pt.x} y={pt.y - 18}
                            textAnchor="middle" fontSize="14" fill="#10b981" fontWeight="700" className="font-mono"
                            initial={{ opacity: 0, y: 5 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.8 + i * 0.12 }}
                          >
                            {pt.v === 0 ? 'NET ZERO' : `${(pt.v / 1000).toFixed(1)}k`}
                          </motion.text>
                        </g>
                      ))}

                      {/* Actual milestones */}
                      {actualPts.map((pt, i) => (
                        <g key={`a-${i}`}>
                          <motion.circle
                            cx={pt.x} cy={pt.y} r="5.5"
                            fill="#fff" stroke="#fbbf24" strokeWidth="2"
                            filter="url(#glowAmber)"
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.7 + i * 0.12 }}
                          />
                        </g>
                      ))}

                      {/* Gap delta indicators (vertical dotted lines between target & actual) */}
                      {projectionYears.map((_, i) => {
                        const gap = projectionActual[i] - projectionTarget[i];
                        if (gap <= 0) return null;
                        const x = getX(i);
                        const yTop = actualPts[i].y;
                        const yBot = targetPts[i].y;
                        return (
                          <motion.g
                            key={`gap-${i}`}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                          >
                            <line x1={x} y1={yTop} x2={x} y2={yBot} stroke="rgba(239,68,68,0.4)" strokeWidth="1" strokeDasharray="3 2" />
                            {/* Gap badge */}
                            <rect x={x + 10} y={(yTop + yBot) / 2 - 11} width="46" height="22" rx="11" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.3)" strokeWidth="0.5" />
                            <text x={x + 33} y={(yTop + yBot) / 2 + 4} textAnchor="middle" fontSize="11" fill="#f87171" fontWeight="700" className="font-mono">
                              +{gap}
                            </text>
                          </motion.g>
                        );
                      })}

                      {/* X-axis year labels */}
                      {projectionYears.map((year, i) => {
                        const x = getX(i);
                        const isLast = i === projectionYears.length - 1;
                        return (
                          <g key={`xl-${i}`}>
                            <line x1={x} y1={getY(0)} x2={x} y2={getY(0) + 6} stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
                            <text x={x} y={getY(0) + 24} textAnchor="middle" fontSize="16" fill={isLast ? '#10b981' : '#94a3b8'} fontWeight={isLast ? '800' : '600'} className="font-mono">
                              {year}
                            </text>
                            {isLast && (
                              <text x={x} y={getY(0) + 42} textAnchor="middle" fontSize="11" fill="#10b981" fontWeight="700" className="font-mono" opacity="0.7">
                                TARGET YEAR
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Bottom summary stats */}
            <div className="relative z-10 grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
              <div className="text-center">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Current Gap</div>
                <div className="text-lg font-extrabold text-red-500 font-mono mt-1">
                  {currentGapVal > 0 ? `+${currentGapVal}` : '0'}{' '}
                  <span className="text-[10px] text-slate-400 font-normal">tCO2e</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Reduction Rate</div>
                <div className="text-lg font-extrabold text-emerald-600 font-mono mt-1">
                  {reductionRate}%{' '}
                  <span className="text-[10px] text-slate-400 font-normal">
                    {reductionRate >= 100 ? 'net zero' : reductionRate >= 70 ? 'on track' : 'needs action'}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Net Zero ETA</div>
                <div className="text-lg font-extrabold text-amber-500 font-mono mt-1">
                  {netZeroEtaStr}{' '}
                  <span className="text-[10px] text-slate-400 font-normal">est.</span>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
