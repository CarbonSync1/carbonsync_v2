"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Activity, TrendingDown, Layers, Database, Users, CheckCircle,
  Download, Search, Settings, Globe, Sparkles, Calculator,
  RefreshCcw, FileText, ArrowRight, ShieldCheck, BarChart3, X, Gauge, Factory
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CarbonInsightsCharts from './CarbonInsightsCharts';
import SaaSAdvancedDashboard from './SaaSAdvancedDashboard';
import SupplyChainLocationAnalytics from './SupplyChainLocationAnalytics';
import { generateCertificatePDF } from './analyticsUtils/pdfGenerator';
import {
  baseWeeklyDataPoints, strategicPillars, smartEsgFeatures, mockAiSuggestions,
  TuningConfig, MetricDataPoint
} from './analyticsData';

function LoaderIcon({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} {...props}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export default function CarbonSyncESGConsole({ invoiceAnalytics }: { invoiceAnalytics?: any }) {
  const [activeCategory, setActiveCategory] = useState('Production');
  const [activeScope, setActiveScope] = useState('GLOBAL');
  const [selectedRegion, setSelectedRegion] = useState('GLOBAL');
  const [selectedFiscalYear, setSelectedFiscalYear] = useState('FY 2023-24');
  const [tuning, setTuning] = useState<TuningConfig>({
    renewablePercent: 35,
    fleetElectrification: 15,
    energyEfficiencyUpgrades: 20,
    supplierAuditParticipation: 40
  });
  const [expandedPillarId, setExpandedPillarId] = useState('data-driven-strategies');
  const [calcElectricity, setCalcElectricity] = useState(3400);
  const [calcFuel, setCalcFuel] = useState(450);
  const [calcFreight, setCalcFreight] = useState(12000);
  const [calculatorImpact, setCalculatorImpact] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [aiResponseText, setAiResponseText] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeAiGuideline, setActiveAiGuideline] = useState<'conservative' | 'aggressive' | 'cost-focused'>('aggressive');

  const dynamicWeeklyData = useMemo<MetricDataPoint[]>(() => {
    let emissionsScale = 1.0, yieldScale = 1.0, taxScale = 1.0;
    if (selectedRegion === 'APAC') { emissionsScale = 1.35; yieldScale = 1.02; taxScale = 1.15; }
    else if (selectedRegion === 'EMEA') { emissionsScale = 0.72; yieldScale = 0.95; taxScale = 0.85; }
    else if (selectedRegion === 'AMER') { emissionsScale = 1.15; taxScale = 1.05; }
    return baseWeeklyDataPoints.map(pt => {
      const rr = 1 - (tuning.renewablePercent / 130);
      const fr = 1 - (tuning.fleetElectrification / 150);
      const er = 1 - (tuning.energyEfficiencyUpgrades / 200);
      const yl = tuning.energyEfficiencyUpgrades / 25;
      return {
        ...pt,
        primaryLineYield: Math.min(99.6, (pt.primaryLineYield + yl * 0.8) * yieldScale),
        assemblyLineYield: Math.min(99.2, (pt.assemblyLineYield + yl * 1.1) * yieldScale),
        packagingLineYield: Math.min(99.8, (pt.packagingLineYield + yl * 0.4) * yieldScale),
        primaryLineEmissions: invoiceAnalytics?.hasData ? (pt.primaryLineEmissions * rr * er * emissionsScale * ((invoiceAnalytics.scope1KgCO2e || (invoiceAnalytics.totalKgCO2e * 0.2)) / 1000)) : 0,
        assemblyLineEmissions: invoiceAnalytics?.hasData ? (pt.assemblyLineEmissions * rr * er * emissionsScale * ((invoiceAnalytics.scope2KgCO2e || (invoiceAnalytics.totalKgCO2e * 0.3)) / 1000)) : 0,
        packagingLineEmissions: invoiceAnalytics?.hasData ? (pt.packagingLineEmissions * fr * emissionsScale * ((invoiceAnalytics.scope3KgCO2e || (invoiceAnalytics.totalKgCO2e * 0.5)) / 1000)) : 0,
        carbonTaxAccrual: invoiceAnalytics?.hasData ? Math.round(pt.carbonTaxAccrual * rr * fr * er * taxScale * (invoiceAnalytics.totalKgCO2e / 3000)) : 0
      };
    });
  }, [tuning, selectedRegion, invoiceAnalytics]);

  const aggregateStats = useMemo(() => {
    const last = dynamicWeeklyData[dynamicWeeklyData.length - 1];
    const avgYield = ((last.primaryLineYield + last.assemblyLineYield + last.packagingLineYield) / 3).toFixed(1);
    let base = 0;
    if (activeScope === 'GLOBAL') base = dynamicWeeklyData.reduce((s, p) => s + p.primaryLineEmissions + p.assemblyLineEmissions + p.packagingLineEmissions, 0);
    else if (activeScope === 'SCOPE1') base = dynamicWeeklyData.reduce((s, p) => s + p.primaryLineEmissions * 1.1, 0);
    else if (activeScope === 'SCOPE2') base = dynamicWeeklyData.reduce((s, p) => s + p.assemblyLineEmissions * 1.3, 0);
    else base = dynamicWeeklyData.reduce((s, p) => s + p.packagingLineEmissions * 1.6, 0);
    const rawScore = 80 + tuning.renewablePercent * 0.12 + tuning.fleetElectrification * 0.1 + tuning.energyEfficiencyUpgrades * 0.08 + tuning.supplierAuditParticipation * 0.04;
    const sustainScore = Math.min(100, Math.max(72, rawScore)).toFixed(1);
    const totalTax = Math.round(dynamicWeeklyData.reduce((s, p) => s + p.carbonTaxAccrual, 0) / 4);
    return { averageYield: avgYield, sustainScore, totalEmissionsMetric: base.toFixed(2), remainingTaxBill: totalTax.toLocaleString() };
  }, [dynamicWeeklyData, activeScope, tuning]);

  const suggestionTextList = useMemo(() => mockAiSuggestions[activeCategory] || mockAiSuggestions['Production'], [activeCategory]);

  useEffect(() => {
    const raw = (calcElectricity * 0.38 + calcFuel * 10.1 + calcFreight * 0.42) / 1000;
    let rank = 'EXCELLENT', label = 'Aligns fully with corporate Net Zero 2030 pathways.';
    if (raw > 4.5) { rank = 'AVERAGE ADVERSE'; label = 'Exceeds standard Scope target thresholds.'; }
    else if (raw > 2.0) { rank = 'MODERATE'; label = 'Meets baselines, but has optimization potential.'; }
    setCalculatorImpact(`Footprint: ${raw.toFixed(2)} MT CO2e/Year. Rating: [ ${rank} ] - ${label}`);
  }, [calcElectricity, calcFuel, calcFreight]);

  const handleTriggerCustomAiRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    setIsAiLoading(true);
    setTimeout(() => {
      const pl = customPrompt.toLowerCase();
      let resp = `CarbonSynqEarth ESG Assistant: Grounded with existing parameters under ${activeAiGuideline.toUpperCase()} guidelines. `;
      if (pl.includes('tax') || pl.includes('cost')) resp += `Reducing carbon tax from $${aggregateStats.remainingTaxBill} requires shifting electricity contracts. Increasing renewables to 85% neutralizes up to 34% of compliance costs.`;
      else if (pl.includes('scope 3') || pl.includes('supply')) resp += `Scope 3 footprint: Electrifying logistics from ${tuning.fleetElectrification}% to 60% yields deep abatement. Engaging suppliers (${tuning.supplierAuditParticipation}% active) saves 110 MT of offsets.`;
      else resp += `To maximize Net Zero alignment, increase renewable share beyond ${tuning.renewablePercent}% and update sensor telemetry across all locations.`;
      setAiResponseText(resp);
      setIsAiLoading(false);
    }, 1200);
  };

  const handleDownloadReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => { setIsGeneratingReport(false); setShowReportModal(true); }, 1500);
  };

  return (
    <div className="bg-[#F8FAFC] text-[#1E293B] font-sans">

      {/* ── SIMULATION CONSOLE SECTION ── */}
      <section id="cs-dashboard" className="py-16 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase text-[#059669] font-bold tracking-[0.2em] block mb-3">Interactive Simulation Console</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0f172a] mb-4">Global Manufacturing ESG Analysis</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm font-medium">Review live carbon emissions models, tune parameters, and generate simulated ESG reports.</p>
        </div>
        <SaaSAdvancedDashboard externalTuning={tuning} onTuningChange={(t) => setTuning(t)} invoiceAnalytics={invoiceAnalytics} />
      </section>

      {/* ── SUPPLY CHAIN SECTION ── */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase text-[#059669] font-bold tracking-[0.2em] block mb-3">Decentralized Supply Chain Operations</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0f172a] mb-4">Supply Chain & Scope 3 Decarbonization</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm font-medium">Audit third-party contractor emissions, map regional networks, and manage audit registries.</p>
        </div>
        <SupplyChainLocationAnalytics tuning={tuning} selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} invoiceAnalytics={invoiceAnalytics} />
      </section>

      {/* ── CARBON INSIGHTS CHARTS ── */}
      <CarbonInsightsCharts tuning={tuning} dynamicWeeklyData={dynamicWeeklyData} />

      {/* ── STRATEGIC PILLARS ── */}
      <section id="pillars-anchor" className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs uppercase font-mono text-emerald-600 font-bold tracking-widest block">Strategic Overview</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Command Your Carbon Lifecycle</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm">Select a strategic pillar to explore how CarbonSynqEarth transforms raw data into actionable enterprise value.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {strategicPillars.map(pillar => {
              const isSelected = expandedPillarId === pillar.id;
              return (
                <div key={pillar.id} onClick={() => setExpandedPillarId(pillar.id)}
                  className={`bg-white rounded-2xl p-6 border-2 transition duration-300 cursor-pointer shadow-sm ${isSelected ? 'border-emerald-500' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className="w-12 h-12 bg-emerald-50 border border-emerald-200/50 rounded-full flex items-center justify-center mb-5">
                    {pillar.iconName === 'pulse' && <Activity className="w-5 h-5 text-emerald-600" />}
                    {pillar.iconName === 'trending-down' && <TrendingDown className="w-5 h-5 text-emerald-600" />}
                    {pillar.iconName === 'checklist' && <Layers className="w-5 h-5 text-cyan-600" />}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{pillar.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-5">{pillar.summary}</p>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono font-bold">{pillar.metricLabel}</span>
                      <span className="text-sm font-bold font-mono text-slate-900">{pillar.metricValue}</span>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-mono font-bold">{pillar.trend}</span>
                  </div>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden mt-5 pt-4 border-t border-slate-100 space-y-2">
                        <span className="text-[10px] uppercase font-mono text-emerald-600 tracking-wider font-bold block">Integration Strategy</span>
                        <ul className="space-y-2 text-xs text-slate-600">
                          {pillar.details.map((d, i) => (
                            <li key={i} className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /><span>{d}</span></li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SMART ESG FEATURES ── */}
      <section id="features-anchor" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs uppercase font-mono text-emerald-600 font-bold tracking-widest block">Smart ESG Platform</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Built For Real-World Impact</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm">Eliminate data silos and streamline your sustainability workflow with our comprehensive suite of tools.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {smartEsgFeatures.map(feat => (
            <div key={feat.title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-emerald-200 hover:shadow-md transition duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-emerald-50 border border-emerald-200/50 rounded-xl flex items-center justify-center">
                  {feat.iconName === 'database' && <Database className="w-4 h-4 text-emerald-600" />}
                  {feat.iconName === 'stack' && <Layers className="w-4 h-4 text-cyan-600" />}
                  {feat.iconName === 'users' && <Users className="w-4 h-4 text-amber-600" />}
                  {feat.iconName === 'pulse' && <Activity className="w-4 h-4 text-emerald-600" />}
                </div>
                <div>
                  <span className="text-[10px] bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full font-mono inline-block font-bold">{feat.badge}</span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{feat.title}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.description}</p>
              </div>
              {feat.frameworks && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {feat.frameworks.map(f => <span key={f} className="text-[9px] bg-cyan-50 text-cyan-700 border border-cyan-200 px-1.5 rounded font-mono font-bold">{f}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>



      {/* ── AI SANDBOX ── */}
      <section className="py-16 max-w-4xl mx-auto px-6">
        <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            <h4 className="text-sm uppercase font-mono font-bold tracking-wider text-emerald-900">AI Decarbonization Sandbox</h4>
          </div>
          <p className="text-xs text-slate-600 italic mb-4">
            "With energy efficiency at <strong>{tuning.energyEfficiencyUpgrades}%</strong>, electrifying logistics by <strong>{tuning.fleetElectrification}%</strong> reduces Scope 3 emissions by up to 21%."
          </p>
          <form onSubmit={handleTriggerCustomAiRule} className="flex gap-2">
            <input type="text" placeholder="e.g. Reduce Scope 3 tax..." value={customPrompt}
              onChange={e => setCustomPrompt(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none placeholder-slate-400 w-full focus:border-emerald-500/50" />
            <button type="submit" disabled={isAiLoading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition">
              <RefreshCcw className={`w-3.5 h-3.5 ${isAiLoading ? 'animate-spin' : ''}`} />
              Run
            </button>
          </form>
          {aiResponseText && (
            <div className="mt-3 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-xs text-emerald-950 relative leading-relaxed">
              <p>{aiResponseText}</p>
              <button onClick={() => setAiResponseText('')} className="absolute top-2 right-2 text-slate-400 hover:text-slate-800"><X className="w-3 h-3" /></button>
            </div>
          )}
        </div>
      </section>

      {/* ── COMPLIANCE REPORT MODAL ── */}
      <AnimatePresence>
        {showReportModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 p-6 rounded-2xl max-w-lg w-full space-y-6 shadow-2xl relative">
              <button onClick={() => setShowReportModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"><X className="w-4 h-4" /></button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">CarbonSynqEarth Audit Package Saved</h3>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">REGULATORY COMPLIANT CSRD REGISTRY</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 font-mono text-xs">
                {[
                  ['Report Code', 'CS-AUD-APAC-2026-X1'],
                  ['Fiscal Year', selectedFiscalYear],
                  ['Corporate Rating', `AAA Rating (${aggregateStats.sustainScore}/100)`],
                  ['Offset Abatement', `-${((tuning.renewablePercent * 0.45) + (tuning.energyEfficiencyUpgrades * 0.3)).toFixed(1)} MT CO2e`],
                  ['Taxes Due', `$${aggregateStats.remainingTaxBill} USD`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-slate-400 font-bold">{k}:</span>
                    <span className="text-slate-700 font-bold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowReportModal(false)} className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-semibold">Close</button>
                <button onClick={() => {
                  generateCertificatePDF({ fiscalYear: selectedFiscalYear, sustainScore: Number(aggregateStats.sustainScore), remainingTaxBill: aggregateStats.remainingTaxBill, tuning, userEmail: 'user@carbonsynqearth.io' });
                  setShowReportModal(false);
                }} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-sm">
                  <Download className="w-3.5 h-3.5" /> Download PDF Certificate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
