/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Leaf,
  Activity,
  TrendingDown,
  Layers,
  Database,
  Users,
  CheckCircle,
  Download,
  Search,
  Settings,
  Globe,
  ChevronRight,
  Sparkles,
  Calculator,
  AlertTriangle,
  RefreshCcw,
  FileText,
  Check,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Info,
  X,
  Gauge,
  Factory,
  Zap,
  Droplets,
  Trash2,
  Sliders,
  TrendingUp,
  Filter,
  PieChart,
  Clock,
  HelpCircle,
  Send,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCompliancePDF } from './analyticsUtils/pdfGenerator';

// Shared interfaces for our advanced features
export interface SaaSAdvancedDashboardProps {
  externalTuning?: {
    renewablePercent: number;
    fleetElectrification: number;
    energyEfficiencyUpgrades: number;
    supplierAuditParticipation: number;
  };
  onTuningChange?: (tuning: any) => void;
  invoiceAnalytics?: any;
}

export default function SaaSAdvancedDashboard({ externalTuning, onTuningChange, invoiceAnalytics }: SaaSAdvancedDashboardProps) {
  // ----------------------------------------------------
  // Inner local state to serve as a high-fidelity sandbox
  // ----------------------------------------------------
  const [tuning, setLocalTuning] = useState({
    renewablePercent: externalTuning?.renewablePercent ?? 42,
    fleetElectrification: externalTuning?.fleetElectrification ?? 28,
    energyEfficiencyUpgrades: externalTuning?.energyEfficiencyUpgrades ?? 35,
    supplierAuditParticipation: externalTuning?.supplierAuditParticipation ?? 60
  });

  // Sync back to parent if requested
  const registerTuneChange = (key: string, value: number) => {
    const updated = { ...tuning, [key]: value };
    setLocalTuning(updated);
    if (onTuningChange) {
      onTuningChange(updated);
    }
  };

  // UI state filters and selections
  const [activeTab, setActiveTab] = useState<'analytics' | 'compliance' | 'predictive'>('analytics');
  const [selectedRegion, setSelectedRegion] = useState<'GLOBAL' | 'AMER' | 'EMEA' | 'APAC'>('GLOBAL');
  const [scopeFilter, setScopeFilter] = useState<'ALL' | 'SCOPE1' | 'SCOPE2' | 'SCOPE3'>('ALL');
  const [forecastTargetYear, setForecastTargetYear] = useState<number>(2030);
  const [isScenarioRiseActive, setIsScenarioRiseActive] = useState<boolean>(false); // 12% rise scenario trigger
  const [hoveredMaccLever, setHoveredMaccLever] = useState<any | null>(null);

  // Interactive Checklist states
  const [auditList, setAuditList] = useState([
    { id: 't1', task: 'Direct Scope 1 natural gas boiler venting audit', standard: 'CSRD Sec 14.2', completed: true },
    { id: 't2', task: 'Review grid-mix utility factor for Frankfurt campus', standard: 'GRI 302-1', completed: true },
    { id: 't3', task: 'Map third-party supplier transport fuel telematics', standard: 'GHG Protocol Scope 3', completed: false },
    { id: 't4', task: 'Run materiality matrix survey across stakeholder panel', standard: 'CSRD Mandate 1', completed: false },
    { id: 't5', task: 'Formally submit SEC Climate Risk prospectus draft', standard: 'SEC Part 229', completed: false },
    { id: 't6', task: 'Establish water-recycling volumetric log registry', standard: 'BRSR Pillar 3', completed: true }
  ]);

  // AI assistant chat state
  const [chatMessages, setChatMessages] = useState([
    { id: 'm1', role: 'assistant', text: 'Hello! I am CarbonSynqEarths regulatory auditor model. I analyze sub-meter machine telemetry for anomaly detections, check GRI standards, and run abatement forecast curves. Ask me anything about your current data!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatTyping, setIsChatTyping] = useState(false);

  // Report Generator triggers
  const [selectedReportFramework, setSelectedReportFramework] = useState<'GRI' | 'CSRD' | 'BRSR' | 'SEC'>('CSRD');
  const [isGeneratingTargetReport, setIsGeneratingTargetReport] = useState(false);
  const [generatedReportResult, setGeneratedReportResult] = useState<any | null>(null);

  // ----------------------------------------------------
  // Dynamic Analytical Calculations based on interactive states
  // ----------------------------------------------------
  const calculatedMetrics = useMemo(() => {
    // Emissions calculations based on renewable tuning, regional coefficients, and scenario parameters
    let baseProductionEmissions = invoiceAnalytics?.hasData ? invoiceAnalytics.scope1KgCO2e : 0;
    let baseEnergyEmissions = invoiceAnalytics?.hasData ? invoiceAnalytics.scope2KgCO2e : 0;
    let baseLogisticsEmissions = invoiceAnalytics?.hasData ? invoiceAnalytics.scope3KgCO2e : 0;

    // Fallback if scopes failed to categorize but total exists
    if (invoiceAnalytics?.hasData && baseProductionEmissions === 0 && baseEnergyEmissions === 0 && baseLogisticsEmissions === 0 && invoiceAnalytics.totalKgCO2e > 0) {
      baseLogisticsEmissions = invoiceAnalytics.totalKgCO2e;
    }

    // Apply scenario modifier (+12% emissions rise if toggled)
    const scenarioModifier = isScenarioRiseActive ? 1.12 : 1.0;

    // Apply regional factors
    let regionalCoeff = 1.0;
    if (selectedRegion === 'AMER') regionalCoeff = 1.15;
    else if (selectedRegion === 'EMEA') regionalCoeff = 0.78;
    else if (selectedRegion === 'APAC') regionalCoeff = 1.38;

    // Abatement calculations from tuning parameters
    const renewableOffset = (tuning.renewablePercent / 100) * 0.45;
    const efficiencyOffset = (tuning.energyEfficiencyUpgrades / 100) * 0.35;
    const fleetElectrificationOffset = (tuning.fleetElectrification / 100) * 0.28;

    const currentScope1 = Math.round(baseProductionEmissions * (1 - efficiencyOffset) * regionalCoeff * scenarioModifier);
    const currentScope2 = Math.round(baseEnergyEmissions * (1 - renewableOffset) * (1 - efficiencyOffset) * regionalCoeff * scenarioModifier);
    const currentScope3 = Math.round(baseLogisticsEmissions * (1 - fleetElectrificationOffset) * (1 - (tuning.supplierAuditParticipation / 185)) * regionalCoeff * scenarioModifier);

    const totalEmissions = currentScope1 + currentScope2 + currentScope3;

    // Resource metrics derived proportionally from the invoice footprint to maintain realism
    let baseMWh = 0;
    if (invoiceAnalytics?.hasData) {
      // Check if we have exact kWh/MWh in the items
      baseMWh = (invoiceAnalytics.itemRows || []).reduce((sum: number, row: any) => {
        const u = (row.unit || '').toLowerCase();
        if (u.includes('kwh')) return sum + (row.quantity / 1000);
        if (u.includes('mwh')) return sum + row.quantity;
        return sum;
      }, 0);
      
      // If no explicit electricity unit, estimate from Scope 2 (approx 400 kgCO2e per MWh) or Total
      if (baseMWh === 0 && invoiceAnalytics.scope2KgCO2e > 0) {
        baseMWh = invoiceAnalytics.scope2KgCO2e / 400;
      } else if (baseMWh === 0 && invoiceAnalytics.totalKgCO2e > 0) {
        baseMWh = invoiceAnalytics.totalKgCO2e / 2000; // rough proxy for general footprint
      }
    }

    const totalPowerMWh = invoiceAnalytics?.hasData ? Math.max(0, Math.round((baseMWh * (1 - (tuning.energyEfficiencyUpgrades * 0.005))) * regionalCoeff)) : 0;
    
    // Estimate water and waste proportionally to the total carbon footprint (Manufacturing proxies)
    const baseWater = invoiceAnalytics?.hasData ? (invoiceAnalytics.totalKgCO2e * 1.8) : 0; // ~1.8m3 per ton
    const baseWaste = invoiceAnalytics?.hasData ? (invoiceAnalytics.totalKgCO2e * 0.002) : 0; // ~2kg waste per ton

    const waterRecycledM3 = invoiceAnalytics?.hasData ? Math.round(baseWater * (1 + (tuning.energyEfficiencyUpgrades * 0.005))) : 0;
    const wasteDivertedTons = invoiceAnalytics?.hasData ? Math.round(baseWaste * (1 + (tuning.supplierAuditParticipation * 0.008))) : 0;

    // Calculate score out of 100
    // Base 74, scales with all 4 sliders
    const completedTasksCount = auditList.filter(t => t.completed).length;
    const baseScore = 70 + (tuning.renewablePercent * 0.1) + (tuning.fleetElectrification * 0.08) + (tuning.energyEfficiencyUpgrades * 0.08) + (tuning.supplierAuditParticipation * 0.06) + (completedTasksCount * 1.5);
    const score = Math.min(100, Math.round(baseScore));

    // Framework compliance percentages
    const csrdProgress = Math.round(45 + (tuning.energyEfficiencyUpgrades * 0.4) + (completedTasksCount * 6));
    const brsrProgress = Math.round(52 + (tuning.renewablePercent * 0.3) + (completedTasksCount * 5));
    const griProgress = Math.round(60 + (tuning.supplierAuditParticipation * 0.2) + (completedTasksCount * 4));
    const secStatus = score >= 90 ? 'Compliant' : score >= 80 ? 'Ready' : 'Under Review';

    return {
      scope1: currentScope1,
      scope2: currentScope2,
      scope3: currentScope3,
      totalEmissions,
      powerMWh: totalPowerMWh,
      waterRecycled: waterRecycledM3,
      wasteTons: wasteDivertedTons,
      score,
      csrdProgress: Math.min(100, csrdProgress),
      brsrProgress: Math.min(100, brsrProgress),
      griProgress: Math.min(100, griProgress),
      secStatus
    };
  }, [tuning, selectedRegion, isScenarioRiseActive, auditList, invoiceAnalytics]);

  // Marginal Abatement Cost Curve (MACC) calculations for the predictive tab
  const maccData = useMemo(() => {
    const ledAbate = Math.round(60 + tuning.energyEfficiencyUpgrades * 1.8);
    const ledCost = Math.round(-48 - (tuning.energyEfficiencyUpgrades * 0.15)); // values are negative for savings

    const hvacAbate = Math.round(95 + tuning.energyEfficiencyUpgrades * 2.8);
    const hvacCost = Math.round(-24 - (tuning.energyEfficiencyUpgrades * 0.1));

    const solarAbate = Math.round(140 + tuning.renewablePercent * 3.4);
    const solarCost = Math.round(15 - (tuning.renewablePercent * 0.18));

    const fleetAbate = Math.round(85 + tuning.fleetElectrification * 3.9);
    const fleetCost = Math.round(52 - (tuning.fleetElectrification * 0.35));

    const items = [
      { id: 'm1', name: 'Smart LED & Sensor Networks', abate: ledAbate, cost: ledCost, color: '#10b981', hoverColor: '#059669', desc: 'Fitted smart submeters on low-ampage loops.' },
      { id: 'm2', name: 'Furnace Vacuum Casing Seal Loops', abate: hvacAbate, cost: hvacCost, color: '#34d399', hoverColor: '#0aa470', desc: 'Optimized pneumatic heat seal loop vacuums.' },
      { id: 'm3', name: 'Virtual Solar Purchase Agreement', abate: solarAbate, cost: solarCost, color: '#06b6d4', hoverColor: '#0891b2', desc: 'Power contracts yielding carbon equivalence offset.' },
      { id: 'm4', name: 'Heavy Logistics EV Distribution', abate: fleetAbate, cost: fleetCost, color: '#f5a623', hoverColor: '#d97706', desc: 'Electrified long-haul supply delivery fleet trucks.' }
    ];

    let cumulative = 0;
    const finalItems = items.map(d => {
      const start = cumulative;
      cumulative += d.abate;
      return {
        ...d,
        start,
        end: cumulative
      };
    });

    return {
      levers: finalItems,
      totalAbatement: cumulative
    };
  }, [tuning]);

  // Handle preset quick responses from AI Assistant chatbot
  const handleAiQueryPreset = (queryText: string) => {
    setChatMessages(prev => [...prev, { id: `u-${Date.now()}`, role: 'user', text: queryText }]);
    setIsChatTyping(true);

    setTimeout(() => {
      let reply = '';
      if (queryText.includes('Scope 3')) {
        reply = `To optimize aggregate Scope 3 logistics: Current vendor audit coverage stands at ${tuning.supplierAuditParticipation}%. By lifting supplier certifications by 15%, we project a direct reduction of ${Math.round(calculatedMetrics.scope3 * 0.12)} tCO2e. Austin fabrication partners represent the single largest logistical leverage point.`;
      } else if (queryText.includes('Tax Variance')) {
        reply = `Current projected carbon tax bill is based on cumulative offset coefficients. Implementing an additional 10% thermal efficiency upgrade mitigates compliance penalty risks across EMEA regions by a further $14,900 USD per quarter.`;
      } else if (queryText.includes('Audit')) {
        reply = `Compliance Checklist review: ${auditList.filter(t => t.completed).length} of ${auditList.length} legal frameworks satisfied. Critical path item: "Map third-party supplier transport fuel telematics" (GRI 302/GHG Scope 3). Resolving this increases your automated corporate ESG rating by +4.5 points instantly.`;
      } else {
        reply = `Applying simulation forecast model targets: Achieving 100% renewable grid match by the year ${forecastTargetYear} lowers scope 2 electrical liability to zero, yielding a net savings score of ${Math.round(calculatedMetrics.totalEmissions * 0.32)} kg CO2e/h globally.`;
      }

      setChatMessages(prev => [...prev, { id: `a-${Date.now()}`, role: 'assistant', text: reply }]);
      setIsChatTyping(false);
    }, 1000);
  };

  const handleCustomChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const text = chatInput;
    setChatMessages(prev => [...prev, { id: `u-${Date.now()}`, role: 'user', text }]);
    setChatInput('');
    setIsChatTyping(true);

    setTimeout(() => {
      const responseText = `My models processed the query regarding "${text}". Correlating current parameters shows that a continuous ${tuning.renewablePercent}% solar match offers substantial grid hedging benefits. Let me know if you would like me to compile an audit report covering these findings.`;
      setChatMessages(prev => [...prev, { id: `a-${Date.now()}`, role: 'assistant', text: responseText }]);
      setIsChatTyping(false);
    }, 1200);
  };

  // Compile compliance report generator trigger
  const runReportCompilation = () => {
    setIsGeneratingTargetReport(true);
    setTimeout(() => {
      const generatedId = `CS-${selectedReportFramework}-0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase()}`;
      const timestampStr = new Date().toISOString().replace('T', ' ').slice(0, 19);

      setGeneratedReportResult({
        timestamp: timestampStr,
        framework: selectedReportFramework,
        complianceScore: calculatedMetrics.score,
        targetEmissions: calculatedMetrics.totalEmissions,
        certId: generatedId,
        signOff: "CarbonSynqEarth ESG Compliance Registry Verification Board"
      });

      // Trigger the real browser PDF generator and downloader
      generateCompliancePDF({
        framework: selectedReportFramework,
        metrics: {
          scope1: calculatedMetrics.scope1,
          scope2: calculatedMetrics.scope2,
          scope3: calculatedMetrics.scope3,
          totalEmissions: calculatedMetrics.totalEmissions,
          powerMWh: calculatedMetrics.powerMWh,
          waterRecycled: calculatedMetrics.waterRecycled,
          wasteTons: calculatedMetrics.wasteTons,
          score: calculatedMetrics.score,
        },
        tuning,
        region: selectedRegion || 'GLOBAL',
        certId: generatedId,
        timestamp: timestampStr,
      });

      setIsGeneratingTargetReport(false);
    }, 1500);
  };

  // Simulated live emissions data for visualizer chart
  const weeklyScatterPoints = [
    { label: 'Jan', scope1: 1200, scope2: 800, scope3: 1400 },
    { label: 'Feb', scope1: 1150, scope2: 780, scope3: 1380 },
    { label: 'Mar', scope1: 1100, scope2: 720, scope3: 1350 },
    { label: 'Apr', scope1: 1040, scope2: 680, scope3: 1290 },
    { label: 'May', scope1: 990, scope2: 610, scope3: 1250 },
    { label: 'Jun', scope1: calculatedMetrics.scope1, scope2: calculatedMetrics.scope2, scope3: calculatedMetrics.scope3 }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 space-y-8 text-slate-800 relative overflow-hidden shadow-xl mt-12 font-sans">
      
      {/* Background visual grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      {/* TOP BAR / THEMATIC BRANDING GREETING */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-mono font-bold mb-3 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Continuous Carbon Intelligence Portal
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
            Climate Diagnostics &amp; Telemetry
          </h2>
          <p className="text-slate-550 text-slate-500 text-xs mt-1 max-w-xl">
            Audit-ready ESG analytics dashboard with custom interactive control loops matching global GRI, SEC, and CSRD compliance protocols.
          </p>
        </div>

        {/* Global Parameter Controls Toggle strip */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Selected Region Dropdown */}
          {/* Scenario Trigger Option */}
          <div className="flex flex-col">
            <label className="text-[9px] text-amber-600 font-mono font-bold uppercase tracking-wider mb-1">Stress Test Simulate</label>
            <button
              onClick={() => setIsScenarioRiseActive(prev => !prev)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold font-mono tracking-tight transition duration-350 cursor-pointer flex items-center gap-2 border ${
                isScenarioRiseActive
                ? 'bg-amber-50 text-amber-700 border-amber-300'
                : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{isScenarioRiseActive ? '12% Emissions Spike Active' : 'Normalize Stress Tests'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* CORE TUNING SLIDERS WORKSPACE (INTEGRATING LIVE DYNAMIC INPUT) */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {/* Slider 1: Renewable percent offset */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-700 font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-605 text-emerald-600" />
              Renewable Energy
            </span>
            <span className="font-mono font-bold text-emerald-605 text-emerald-700">{tuning.renewablePercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={tuning.renewablePercent}
            onChange={(e) => registerTuneChange('renewablePercent', Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#10b981]"
          />
          <span className="text-[9px] text-slate-500 block leading-tight">Offsets base electrical Scope 2 demand.</span>
        </div>

        {/* Slider 2: Fleet electrification */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-700 font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-600" />
              Fleet Electrified
            </span>
            <span className="font-mono font-bold text-cyan-700">{tuning.fleetElectrification}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={tuning.fleetElectrification}
            onChange={(e) => registerTuneChange('fleetElectrification', Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <span className="text-[9px] text-slate-500 block leading-tight">Alleviates intermodal outbound diesel cargo coefficients.</span>
        </div>

        {/* Slider 3: Thermal and general efficiency upgrades */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-700 font-bold flex items-center gap-1.5">
              <Factory className="w-3.5 h-3.5 text-amber-600" />
              Thermal Efficiency
            </span>
            <span className="font-mono font-bold text-amber-700">{tuning.energyEfficiencyUpgrades}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            step="1"
            value={tuning.energyEfficiencyUpgrades}
            onChange={(e) => registerTuneChange('energyEfficiencyUpgrades', Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <span className="text-[9px] text-slate-500 block leading-tight">Diminishes furnace baseline combustion overhead cycles.</span>
        </div>

        {/* Slider 4: Supplier audit participation */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-700 font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-pink-600" />
              Supplier Audit Rate
            </span>
            <span className="font-mono font-bold text-pink-700">{tuning.supplierAuditParticipation}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="1"
            value={tuning.supplierAuditParticipation}
            onChange={(e) => registerTuneChange('supplierAuditParticipation', Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
          <span className="text-[9px] text-slate-500 block leading-tight">Drives compliance indexes across certified subcontractors.</span>
        </div>
      </div>

      {/* 2. REAL-TIME KPI DASHBOARD (STUNNING LIGHT GLASS CARDS WITH INTERACTION) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
        
        {/* Card 1: Total Emissions */}
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 flex flex-col justify-between hover:scale-[1.03] transition duration-300 group shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider font-extrabold uppercase">Total Emissions</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </div>
          <div className="mt-3">
            <span className="block text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
              {calculatedMetrics.totalEmissions.toLocaleString()}
            </span>
            <span className="block text-[10px] text-slate-550 text-slate-500 font-bold font-sans">kg CO2e / hour</span>
          </div>
          <div className="mt-2 pt-2 border-t border-emerald-100 flex items-center gap-1 text-[9px] text-[#059669]">
            <TrendingDown className="w-3 h-3" />
            <span>Real-time Sync</span>
          </div>
        </div>

        {/* Card 2: Power Demand */}
        <div className="bg-cyan-50/70 border border-cyan-100 rounded-2xl p-4 flex flex-col justify-between hover:scale-[1.03] transition duration-300 group shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider font-extrabold uppercase">Power Grid</span>
            <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)]" />
          </div>
          <div className="mt-3">
            <span className="block text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
              {calculatedMetrics.powerMWh.toLocaleString()}
            </span>
            <span className="block text-[10px] text-slate-550 text-slate-500 font-bold font-sans">MWh electrical</span>
          </div>
          <div className="mt-2 pt-2 border-t border-cyan-100 flex items-center gap-1 text-[9px] text-cyan-600">
            <Zap className="w-3 h-3" />
            <span>-{tuning.energyEfficiencyUpgrades}% efficient</span>
          </div>
        </div>

        {/* Card 3: Water Recycled */}
        <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 flex flex-col justify-between hover:scale-[1.03] transition duration-300 group shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider font-extrabold uppercase">Water Usage</span>
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]" />
          </div>
          <div className="mt-3">
            <span className="block text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
              {(calculatedMetrics.waterRecycled).toLocaleString()}
            </span>
            <span className="block text-[10px] text-slate-550 text-slate-500 font-bold font-sans">m³ Volumetric</span>
          </div>
          <div className="mt-2 pt-2 border-t border-blue-100 flex items-center gap-1 text-[9px] text-blue-600">
            <Droplets className="w-3 h-3" />
            <span>Closed-loop grid</span>
          </div>
        </div>

        {/* Card 4: Waste Diverted */}
        <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex flex-col justify-between hover:scale-[1.03] transition duration-300 group shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider font-extrabold uppercase">Waste Diversion</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,1)]" />
          </div>
          <div className="mt-3">
            <span className="block text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
              {calculatedMetrics.wasteTons}
            </span>
            <span className="block text-[10px] text-slate-550 text-slate-500 font-bold font-sans">Metric Tons</span>
          </div>
          <div className="mt-2 pt-2 border-t border-amber-100 flex items-center gap-1 text-[9px] text-amber-600">
            <Trash2 className="w-3 h-3" />
            <span>94.8% circularity</span>
          </div>
        </div>

        {/* Card 5: Renewable Match */}
        <div className="bg-indigo-50/75 border border-indigo-100 rounded-2xl p-4 flex flex-col justify-between hover:scale-[1.03] transition duration-300 group shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider font-extrabold uppercase">Renewable Matches</span>
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,1)]" />
          </div>
          <div className="mt-3">
            <span className="block text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
              {tuning.renewablePercent}%
            </span>
            <span className="block text-[10px] text-slate-550 text-slate-500 font-bold font-sans">Offset Coverage</span>
          </div>
          <div className="mt-2 pt-2 border-t border-indigo-100 flex items-center gap-1 text-[9px] text-indigo-600">
            <Layers className="w-3 h-3" />
            <span>VPPA signed</span>
          </div>
        </div>

        {/* Card 6: Carbon Score (The circular index mockup) */}
        <div className="bg-pink-50/75 border border-pink-100 rounded-2xl p-4 flex flex-col justify-between hover:scale-[1.03] transition duration-300 group shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider font-extrabold uppercase">Sustain Rating</span>
            <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,1)]" />
          </div>
          <div className="mt-3">
            <span className="block text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
              {calculatedMetrics.score}
            </span>
            <span className="block text-[10px] text-slate-550 text-slate-500 font-bold font-sans">/ 100 ESG Index</span>
          </div>
          <div className="mt-2 pt-2 border-t border-pink-100 flex items-center gap-1 text-[9px] text-pink-600">
            <ShieldCheck className="w-3 h-3" />
            <span>AAA Prime Tier</span>
          </div>
        </div>

      </div>
      {/* CORE NAVIGATION SECTIONS TABS */}
      <div className="border-b border-slate-200 flex flex-wrap gap-1 relative z-10">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-5 py-3 text-xs font-bold tracking-tight border-b-2 transition duration-200 cursor-pointer flex items-center gap-2 ${
            activeTab === 'analytics'
            ? 'border-emerald-600 text-emerald-700 bg-emerald-50/40'
            : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-55'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-600" />
          3. Emissions Analytics
        </button>


        <button
          onClick={() => setActiveTab('predictive')}
          className={`px-5 py-3 text-xs font-bold tracking-tight border-b-2 transition duration-200 cursor-pointer flex items-center gap-2 ${
            activeTab === 'predictive'
            ? 'border-[#10b981] text-white bg-emerald-950/15'
            : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4 text-emerald-400" />
          6. Scenario Simulation &amp; Forecast
        </button>
      </div>

      {/* CORE RENDER SPACES FOR EACH TAB */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: EMISSIONS ANALYTICS */}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* 3 Scope Breakdown area chart */}
                <div className="lg:col-span-8 bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="text-sm font-bold font-display text-slate-900">Monthly Scope 1 / 2 / 3 Emissions Trends</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Continuous telemetry readings (expressed in metric tons target equivalents over continuous periods).</p>
                    </div>

                    <div className="inline-flex bg-slate-200/60 border border-slate-350 border-slate-200 rounded-lg p-0.5 text-[11px] font-mono">
                      {(['ALL', 'SCOPE1', 'SCOPE2', 'SCOPE3'] as const).map((sc) => (
                        <button
                          key={sc}
                          onClick={() => setScopeFilter(sc)}
                          className={`px-2.5 py-1 rounded transition cursor-pointer font-bold ${
                            scopeFilter === sc
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-slate-550 hover:text-slate-800'
                          }`}
                        >
                          {sc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* PREMIUM CUSTOM SVG INFOMETRIC AREA CHART */}
                  <div className="relative h-64 w-full bg-white rounded-xl border border-slate-200 p-4">
                    <svg viewBox="0 0 500 200" className="w-full h-full text-slate-400" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="scope1Grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="scope2Grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="scope3Grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f5a623" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#f5a623" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid Lines Horizontal */}
                      <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="0.8" />
                      <line x1="0" y1="90" x2="500" y2="90" stroke="#f1f5f9" strokeWidth="0.8" />
                      <line x1="0" y1="140" x2="500" y2="140" stroke="#f1f5f9" strokeWidth="0.8" />
                      
                      {/* SCOPE 1 PLOTS (Red) */}
                      {(scopeFilter === 'ALL' || scopeFilter === 'SCOPE1') && (
                        <>
                          <path
                            d={`M0,130 Q100,120 200,110 T400,90 L500,${200 - calculatedMetrics.scope1/10} L500,200 L0,200 Z`}
                            fill="url(#scope1Grad)"
                          />
                          <path
                            d={`M0,130 Q100,120 200,110 T400,90 L500,${200 - calculatedMetrics.scope1/10}`}
                            stroke="#ef4444"
                            strokeWidth="2.5"
                            fill="none"
                            strokeLinecap="round"
                          />
                        </>
                      )}

                      {/* SCOPE 2 PLOTS (Cyan) */}
                      {(scopeFilter === 'ALL' || scopeFilter === 'SCOPE2') && (
                        <>
                          <path
                            d={`M0,150 Q100,130 200,120 T400,100 L500,${200 - calculatedMetrics.scope2/10} L500,200 L0,200 Z`}
                            fill="url(#scope2Grad)"
                          />
                          <path
                            d={`M0,150 Q100,130 200,120 T400,100 L500,${200 - calculatedMetrics.scope2/10}`}
                            stroke="#06b6d4"
                            strokeWidth="2.5"
                            fill="none"
                            strokeLinecap="round"
                          />
                        </>
                      )}

                      {/* SCOPE 3 PLOTS (Amber) */}
                      {(scopeFilter === 'ALL' || scopeFilter === 'SCOPE3') && (
                        <>
                          <path
                            d={`M0,170 Q100,160 200,150 T400,120 L500,${200 - calculatedMetrics.scope3/10} L500,200 L0,200 Z`}
                            fill="url(#scope3Grad)"
                          />
                          <path
                            d={`M0,170 Q100,160 200,150 T400,120 L500,${200 - calculatedMetrics.scope3/10}`}
                            stroke="#f5a623"
                            strokeWidth="2.5"
                            fill="none"
                            strokeLinecap="round"
                          />
                        </>
                      )}

                      {/* Moving live cursor highlight */}
                      <line x1="499" y1="10" x2="499" y2="190" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
                      <circle cx="499" cy="80" r="4.5" fill="#10b981" />
                    </svg>

                    {/* Timeline Labels on axis */}
                    <div className="flex justify-between text-[9px] text-zinc-400 font-mono mt-2 pt-1 border-t border-slate-100">
                      <span>JANUARY</span>
                      <span>FEBRUARY</span>
                      <span>MARCH</span>
                      <span>APRIL</span>
                      <span>MAY</span>
                      <span className="text-emerald-600 font-bold">JUNE (CURRENT TELEMETRY)</span>
                    </div>
                  </div>

                  {/* High visual key overlays */}
                  <div className="flex flex-wrap items-center gap-6 text-xs justify-center pt-2">
                    <span className="flex items-center gap-1.5 font-semibold text-[#ef4444]">
                      <span className="w-2.5 h-2.5 rounded bg-[#ef4444]" />
                      Direct Boiler Venting (Scope 1): {calculatedMetrics.scope1} kg/h
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-[#06b6d4]">
                      <span className="w-2.5 h-2.5 rounded bg-[#06b6d4]" />
                      Purchased Grid Power (Scope 2): {calculatedMetrics.scope2} kg/h
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-[#f5a623]">
                      <span className="w-2.5 h-2.5 rounded bg-[#f5a623]" />
                      Logistical Supply Chain (Scope 3): {calculatedMetrics.scope3} kg/h
                    </span>
                  </div>
                </div>

                {/* 10. AI Sustainability Score glowing circular metric widget */}
                <div className="lg:col-span-4 bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between items-center text-center">
                  <div className="w-full text-left">
                    <h4 className="text-sm font-bold font-display text-slate-900">Sustainability Scoring Ring</h4>
                    <p className="text-[10px] text-slate-500">Dynamic AI rating linked to oncheck audit completion rate and carbon mitigation ratios.</p>
                  </div>

                  {/* GLOWING INDEX CIRCLE GRAPH */}
                  <div className="relative w-44 h-44 my-4 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="88"
                        cy="88"
                        r="74"
                        className="stroke-slate-200"
                        strokeWidth="11"
                        fill="transparent"
                      />
                      <circle
                        cx="88"
                        cy="88"
                        r="74"
                        className="stroke-emerald-400 transition-all duration-500 ease-out"
                        strokeWidth="11"
                        fill="transparent"
                        strokeDasharray={464}
                        strokeDashoffset={464 - (464 * calculatedMetrics.score) / 100}
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 12px rgba(16,185,129,0.35))' }}
                      />
                    </svg>
                    
                    {/* Inner content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0.5">
                      <span className="text-3xl font-black font-mono text-slate-900 tracking-tighter">
                        {calculatedMetrics.score}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-mono tracking-widest font-extrabold">AAA RANK</span>
                      <span className="text-[9px] text-slate-500 font-semibold uppercase">Sector Benchmark: 78.4</span>
                    </div>
                  </div>

                  {/* Submeter ratings bar indicator breakdown */}
                  <div className="w-full space-y-2 pt-2 border-t border-slate-200">
                    <div className="flex justify-between items-center text-[10px] text-slate-500">
                      <span>Compliance Checklist Completion</span>
                      <span className="font-mono text-slate-800 font-bold">
                        {auditList.filter(t => t.completed).length} / {auditList.length} Tasks
                      </span>
                    </div>
                    <div className="h-1 w-full bg-slate-200 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${(auditList.filter(t => t.completed).length / auditList.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Facility Wise Comparison Bar Charts & Country breakdown */}
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                
                {/* Facility Bar Chart Comparison */}
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                  <div>
                    <h4 className="text-sm font-bold font-display text-slate-900">Facility Hub Emissions Benchmark</h4>
                    <p className="text-[11px] text-slate-500">Comparing real-time hourly load across registered corporate complexes.</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Hub A */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
                          Austin Fabrication Hub (AMER)
                        </span>
                        <span className="font-mono text-slate-550 text-slate-500 font-extrabold">
                          {Math.round(410 * (selectedRegion === 'AMER' ? 1.4 : 1.0))} kg CO2e /h
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-lg overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-lg"
                          style={{ width: `${selectedRegion === 'AMER' ? 84 : 58}%` }}
                        />
                      </div>
                    </div>

                    {/* Hub B */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
                          Rotterdam Logistics Center (EMEA)
                        </span>
                        <span className="font-mono text-slate-550 text-slate-500 font-extrabold">
                          {Math.round(230 * (selectedRegion === 'EMEA' ? 0.6 : 1.0))} kg CO2e /h
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-lg overflow-hidden">
                        <div 
                          className="h-full bg-[#10b981] rounded-lg"
                          style={{ width: `${selectedRegion === 'EMEA' ? 24 : 32}%` }}
                        />
                      </div>
                    </div>

                    {/* Hub C */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
                          Shenzhen Casting Hub (APAC)
                        </span>
                        <span className="font-mono text-slate-550 text-slate-500 font-extrabold">
                          {Math.round(620 * (selectedRegion === 'APAC' ? 1.5 : 1.0))} kg CO2e /h
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-lg overflow-hidden">
                        <div 
                          className="h-full bg-[#0aa470] rounded-lg"
                          style={{ width: `${selectedRegion === 'APAC' ? 98 : 72}%` }}
                        />
                      </div>
                    </div>

                    {/* Hub D */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
                          Frankfurt Server Complex (EMEA)
                        </span>
                        <span className="font-mono text-slate-550 text-slate-500 font-extrabold">
                          {Math.round(180 * (selectedRegion === 'EMEA' ? 0.8 : 1.0))} kg CO2e /h
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-lg overflow-hidden">
                        <div 
                          className="h-full bg-teal-400 rounded-lg"
                          style={{ width: `${selectedRegion === 'EMEA' ? 11 : 18}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carbon Share By Scope Category Donut Chart */}
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-sm font-bold font-display text-slate-900">Carbon Share By Scope</h4>
                    <p className="text-[11px] text-slate-500">Relative allocation percentages across Scope 1-3 carbon categories.</p>
                  </div>

                  {/* SVG Donut */}
                  <div className="flex-1 flex flex-col items-center justify-center my-2 relative">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                        {/* Define dimensions: Center cx=60, cy=60, r=40. Circumference = 2 * PI * 40 = 251.32 */}
                        <circle
                          cx="60"
                          cy="60"
                          r="40"
                          className="stroke-slate-100/70"
                          strokeWidth="11"
                          fill="transparent"
                        />
                        {/* Scope 1: Red */}
                        <circle
                          cx="60"
                          cy="60"
                          r="40"
                          className="stroke-red-500 transition-all duration-300"
                          strokeWidth="11"
                          fill="transparent"
                          strokeDasharray={251.32}
                          strokeDashoffset={251.32 - (251.32 * (calculatedMetrics.scope1 / (calculatedMetrics.totalEmissions || 1)))}
                        />
                        {/* Scope 2: Cyan */}
                        <circle
                          cx="60"
                          cy="60"
                          r="40"
                          className="stroke-cyan-500 transition-all duration-300"
                          strokeWidth="11"
                          fill="transparent"
                          strokeDasharray={251.32}
                          strokeDashoffset={251.32 - (251.32 * (calculatedMetrics.scope2 / (calculatedMetrics.totalEmissions || 1)))}
                          transform={`rotate(${(calculatedMetrics.scope1 / (calculatedMetrics.totalEmissions || 1)) * 360} 60 60)`}
                        />
                        {/* Scope 3: Amber */}
                        <circle
                          cx="60"
                          cy="60"
                          r="40"
                          className="stroke-amber-500 transition-all duration-300"
                          strokeWidth="11"
                          fill="transparent"
                          strokeDasharray={251.32}
                          strokeDashoffset={251.32 - (251.32 * (calculatedMetrics.scope3 / (calculatedMetrics.totalEmissions || 1)))}
                          transform={`rotate(${((calculatedMetrics.scope1 + calculatedMetrics.scope2) / (calculatedMetrics.totalEmissions || 1)) * 360} 60 60)`}
                        />
                      </svg>
                      {/* Centered label */}
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-[8px] text-slate-400 font-mono tracking-wider font-extrabold uppercase">Total Load</span>
                        <span className="text-sm font-black font-mono text-slate-900 leading-none">
                          {calculatedMetrics.totalEmissions}
                        </span>
                        <span className="text-[9px] text-slate-500 font-bold font-mono">kg/h</span>
                      </div>
                    </div>
                  </div>

                  {/* Micro Indicators */}
                  <div className="text-[10px] space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5 font-bold text-slate-600">
                        <span className="w-2 h-2 rounded bg-red-500" />
                        Scope 1 (Direct Boiler)
                      </span>
                      <span className="font-mono text-slate-700 font-bold">
                        {((calculatedMetrics.scope1 / (calculatedMetrics.totalEmissions || 1)) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5 font-bold text-slate-600">
                        <span className="w-2 h-2 rounded bg-cyan-500" />
                        Scope 2 (Indirect Grid)
                      </span>
                      <span className="font-mono text-slate-700 font-bold">
                        {((calculatedMetrics.scope2 / (calculatedMetrics.totalEmissions || 1)) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5 font-bold text-slate-600">
                        <span className="w-2 h-2 rounded bg-amber-500" />
                        Scope 3 (Supply Chain)
                      </span>
                      <span className="font-mono text-slate-700 font-bold">
                        {((calculatedMetrics.scope3 / (calculatedMetrics.totalEmissions || 1)) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4. AI INSIGHTS & RECOMMENDATIONS CARDS SECTION */}
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold font-display text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-600/15 animate-pulse" />
                      Cognitive Decarbonization Advices
                    </h4>
                    <p className="text-[11px] text-slate-500">Automated machine learning models scanning for Scope reductions and efficiency gains.</p>
                  </div>

                  <div className="space-y-3.5 my-4">
                    {/* Energy Inefficiency Advise */}
                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-xs">
                      <span className="p-1 px-1.5 bg-rose-50 text-rose-600 text-[10px] font-mono font-bold rounded">SCOPE 1</span>
                      <div className="text-xs space-y-0.5">
                        <span className="font-bold text-slate-800 block">Energy Inefficiency Detected</span>
                        <span className="text-slate-500 block font-medium leading-normal">
                          Furnace baseline combustion on heavy extrusion runs is leaking heat. Optimize seal vacuum pressure loops.
                        </span>
                      </div>
                    </div>

                    {/* Supplier Inefficiency Advise */}
                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-xs">
                      <span className="p-1 px-1.5 bg-amber-50 text-amber-700 text-[10px] font-mono font-bold rounded">SCOPE 3</span>
                      <div className="text-xs space-y-0.5">
                        <span className="font-bold text-slate-800 block">High Supplier Volatility Index</span>
                        <span className="text-slate-500 block font-medium leading-normal">
                          Packaging Vendor #3 has sourced pulp from non-certified sectors. Direct risk to corporate GRI goals.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => alert("Simulation recommendation model updated! View live trends on charts.")}
                      className="text-[11px] px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 rounded-lg font-bold text-emerald-700 transition duration-200"
                    >
                      Mitigate Highlighted Risks
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: FORECAST & PREDICTIVE SIMULATION */}
          {activeTab === 'predictive' && (
            <motion.div
              key="predictive"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Visual line chart rendering predictive path */}
                <div className="lg:col-span-12 bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-6">
                  <div>
                    <h4 className="text-sm font-bold font-display text-slate-900">Corporate Net-Zero timeline forecast target</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Dragging the forecasting slider changes target year goals and realigns necessary abatement curves.</p>
                  </div>

                  {/* PREDICTIVE PATH LINE GRAPH */}
                  <div className="relative h-60 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                    <svg viewBox="0 0 500 180" className="w-full h-full text-slate-500" preserveAspectRatio="none">
                      {/* Grid background */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="90" x2="500" y2="90" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" />

                      {/* Current Point marker */}
                      <line x1="150" y1="0" x2="150" y2="180" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2,2" />

                      {/* Path 1: Baseline Trajectory (Dashed gray, slowly rising or flat) */}
                      <path
                        d="M0,130 L150,110 L300,105 L450,110 L500,115"
                        stroke="#94a3b8"
                        strokeWidth="1.8"
                        strokeDasharray="4,4"
                        fill="none"
                      />

                      {/* Path 2: Abatement Pathway (Dynamic, slopes down to target year) */}
                      <path
                        d={`M0,130 L150,110 L300,${90 - (tuning.renewablePercent/3.5)} L400,${120 - ((forecastTargetYear - 2026) * 8)} L500,${Math.max(10, 180 - ((forecastTargetYear - 2026) * 19) - (tuning.renewablePercent * 0.5))}`}
                        stroke="#10b981"
                        strokeWidth="2.5"
                        fill="none"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.4))' }}
                      />

                      {/* Glowing forecasting point */}
                      <circle 
                        cx="500" 
                        cy={Math.max(10, 180 - ((forecastTargetYear - 2026) * 19) - (tuning.renewablePercent * 0.5))} 
                        r="5" 
                        fill="#10b981" 
                      />
                    </svg>

                    <div className="flex justify-between text-[9px] text-zinc-400 font-mono mt-2 pt-1 border-t border-slate-100">
                      <span>2024 (HISTORIC)</span>
                      <span className="text-emerald-600 font-bold">2026 (CURRENT)</span>
                      <span>2028 (PROJECTED)</span>
                      <span>{forecastTargetYear} (TARGET GOAL)</span>
                      <span>2035 (NET ZERO COMPLIANCE DEADLINE)</span>
                    </div>
                  </div>

                  {/* Horizontal slider targeting target timeline */}
                  <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="space-y-1 text-left w-full md:w-auto">
                      <span className="text-xs font-bold text-slate-800 block">Project Target Target Climate Year</span>
                      <span className="text-[10px] text-slate-500 block font-medium">Evaluate the mitigation gradient required to achieve statutory carbon neutralities.</span>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <span className="text-xs text-slate-400 font-bold">2027</span>
                      <input
                        type="range"
                        min="2027"
                        max="2040"
                        step="1"
                        value={forecastTargetYear}
                        onChange={(e) => setForecastTargetYear(Number(e.target.value))}
                        className="h-1.5 bg-slate-200 rounded cursor-pointer accent-[#10b981] w-48 sm:w-64"
                      />
                      <span className="text-xs text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                        {forecastTargetYear} Target
                      </span>
                    </div>
                  </div>
                </div>


              </div>

              {/* MAGNIFICENT CUSTOM INTERACTIVE MACC (MARGINAL ABATEMENT COST CURVE) */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-6 z-10 relative">
                <div>
                  <div className="flex justify-between items-start sm:items-center gap-4 flex-col sm:flex-row">
                    <div>
                      <h4 className="text-sm font-bold font-display text-slate-900">Marginal Abatement Cost Curve (MACC) Simulation</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Interactive feasibility curve. Bar width shows annual abatement potential (tCO2e); height indicates cost efficiency ($/tCO2e).
                      </p>
                    </div>
                    <span className="text-[10px] bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-emerald-800 font-bold font-mono rounded-lg">
                      COGNITIVE DECISION LAYER READY
                    </span>
                  </div>
                </div>

                {/* MACC interactive SVG Graphic */}
                <div className="bg-white border border-slate-200 p-5 rounded-xl text-left relative overflow-hidden">
                  <div className="relative h-64 w-full">
                    <svg viewBox="0 0 720 220" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      {/* Grid Y Lines for costs: -60, -30, 0, 30, 60 $/t */}
                      <line x1="40" y1="40" x2="680" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="40" y1="80" x2="680" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="40" y1="120" x2="680" y2="120" stroke="#cbd5e1" strokeWidth="1.5" /> {/* Baseline 0 */}
                      <line x1="40" y1="160" x2="680" y2="160" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="40" y1="200" x2="680" y2="200" stroke="#f1f5f9" strokeWidth="1" />

                      {/* Cost axis labels */}
                      <text x="32" y="44" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end" fontWeight="bold">+$60/t</text>
                      <text x="32" y="84" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end" fontWeight="bold">+$30/t</text>
                      <text x="32" y="124" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="end" fontWeight="bold">$0</text>
                      <text x="32" y="164" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end" fontWeight="bold">-$30/t</text>
                      <text x="32" y="204" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end" fontWeight="bold">-$60/t</text>

                      {/* Abatement path lines */}
                      {maccData.levers.map((lever, i) => {
                        const totalXWidth = 640; // from 40 to 680
                        const xStart = 40 + (lever.start / (maccData.totalAbatement || 1)) * totalXWidth;
                        const xEnd = 40 + (lever.end / (maccData.totalAbatement || 1)) * totalXWidth;
                        const barWidth = xEnd - xStart;
                        
                        // Height scales: 60 $/t maps to 80px
                        const cost = lever.cost;
                        const valHeight = Math.abs((cost / 60) * 80);
                        const yStart = cost >= 0 ? 120 - valHeight : 120;

                        const isHovered = hoveredMaccLever?.id === lever.id;

                        return (
                          <g key={lever.id}>
                            <motion.rect
                              x={xStart}
                              y={yStart}
                              width={Math.max(1, barWidth)}
                              height={Math.max(1, valHeight)}
                              fill={isHovered ? lever.hoverColor : lever.color}
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              opacity={hoveredMaccLever === null || isHovered ? 0.9 : 0.45}
                              className="cursor-pointer transition-colors duration-150"
                              onMouseEnter={() => setHoveredMaccLever(lever)}
                              onMouseLeave={() => setHoveredMaccLever(null)}
                              whileHover={{ scaleY: 1.02 }}
                              style={{ transformOrigin: 'bottom' }}
                            />
                            {/* Tick on X axis */}
                            <line x1={xEnd} y1="117" x2={xEnd} y2="123" stroke="#475569" strokeWidth="1" />
                            {/* Short label overlay if wide enough */}
                            {barWidth > 70 && (
                              <text
                                x={xStart + barWidth / 2}
                                y={cost >= 0 ? yStart - 6 : yStart + valHeight + 11}
                                fill="#475569"
                                fontSize="8"
                                fontFamily="sans-serif"
                                fontWeight="black"
                                textAnchor="middle"
                                opacity={hoveredMaccLever === null || isHovered ? 1 : 0.5}
                                className="pointer-events-none uppercase tracking-wider text-[8px]"
                              >
                                {lever.id.toUpperCase()}
                              </text>
                            )}
                          </g>
                        );
                      })}

                      {/* Label on X-Axis ticks */}
                      <text x="680" y="114" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="end" fontWeight="bold">MT CO2e/yr</text>
                    </svg>
                  </div>

                  {/* Dynamic interactive legend and info readout */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-4">
                    {/* Multi-item Legend */}
                    <div className="flex flex-wrap items-center gap-4 text-[10px]">
                      {maccData.levers.map((lever) => (
                        <div 
                          key={lever.id}
                          onMouseEnter={() => setHoveredMaccLever(lever)}
                          onMouseLeave={() => setHoveredMaccLever(null)}
                          className={`flex items-center gap-1.5 font-bold cursor-pointer transition ${
                            hoveredMaccLever && hoveredMaccLever.id !== lever.id ? 'opacity-40' : 'opacity-100'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: lever.color }} />
                          <span className="text-slate-700">{lever.name} ({lever.id.toUpperCase()})</span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive tooltips details display */}
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex-1 md:max-w-xs text-xs">
                      {hoveredMaccLever ? (
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-extrabold text-slate-900">{hoveredMaccLever.name}</span>
                            <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 font-mono font-bold rounded uppercase">
                              {hoveredMaccLever.id}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500">{hoveredMaccLever.desc}</p>
                          <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-slate-200/60 font-mono text-[10px] font-bold">
                            <div>
                              <span className="text-slate-400 block uppercase text-[8px]">Abatement Potential</span>
                              <span className="text-slate-800">{hoveredMaccLever.abate} tCO2e/yr</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block uppercase text-[8px]">Marginal Efficiency</span>
                              <span className={hoveredMaccLever.cost < 0 ? 'text-emerald-600' : 'text-amber-600'}>
                                {hoveredMaccLever.cost < 0 ? `-$${Math.abs(hoveredMaccLever.cost)}/t (Net Saver)` : `+$${hoveredMaccLever.cost}/t (Cost)`}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 italic font-medium py-2 text-center text-[10px]">
                          Hover over any bar or legend indicator to inspect individual decarbonization asset calculations.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}



        </AnimatePresence>
      </div>



    </div>
  );
}
