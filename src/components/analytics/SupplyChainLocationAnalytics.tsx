/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Search,
  Users,
  Globe,
  Info,
  Check,
  AlertTriangle,
  Layers,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Building2,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SupplyChainLocationAnalyticsProps {
  tuning: {
    renewablePercent: number;
    fleetElectrification: number;
    energyEfficiencyUpgrades: number;
    supplierAuditParticipation: number;
  };
  selectedRegion: string;
  onRegionChange?: (region: string) => void;
  invoiceAnalytics?: any;
}


type SupplierLocation = {
  id: string;
  name: string;
  material: string;
  scope3Index: number;
  rating: string;
  auditStatus: 'Verified' | 'Pending' | 'Audited' | string;
  actionAudits: number;
  location: string;
  scope3IndexOriginal?: number;
};

export default function SupplyChainLocationAnalytics({
  tuning,
  selectedRegion: parentRegion,
  onRegionChange,
  invoiceAnalytics
}: SupplyChainLocationAnalyticsProps) {
  // Local state fallbacks if needed
  const [localRegion, setLocalRegion] = useState<'GLOBAL' | 'AMER' | 'EMEA' | 'APAC'>('GLOBAL');
  const activeRegion = (parentRegion as 'GLOBAL' | 'AMER' | 'EMEA' | 'APAC') || localRegion;

  const handleRegionClick = (region: 'GLOBAL' | 'AMER' | 'EMEA' | 'APAC') => {
    setLocalRegion(region);
    if (onRegionChange) {
      onRegionChange(region);
    }
  };

  const [supplierSearchText, setSupplierSearchText] = useState('');
  const [expandedSupplierRow, setExpandedSupplierRow] = useState<string | null>(null);

  // Dynamically load invoice items as "Vendor Operations"
  const rawSuppliers = useMemo<SupplierLocation[]>(() => {
    if (invoiceAnalytics?.hasData && invoiceAnalytics.itemRows?.length > 0) {
      const ratingMatch = ["A", "B", "C", "AA", "B+"];
      return invoiceAnalytics.itemRows.map((item: any, idx: number) => ({
        id: `INV-${idx}`,
        name: item.source || item.factorName?.split(" ")[0] || `Operational Node ${idx + 1}`,
        material: item.itemName,
        scope3Index: item.kgCO2e,
        rating: ratingMatch[idx % ratingMatch.length],
        auditStatus: idx % 2 === 0 ? 'Verified' : 'Pending',
        actionAudits: (idx % 3) + 1,
        location: item.category || 'Global Operations'
      }));
    }
    return [
      { id: 'S1', name: 'Alcan Foundry Corp', material: 'Primary Cast Aluminum', scope3Index: 850, rating: 'A', auditStatus: 'Verified', actionAudits: 3, location: 'Austin, TX' },
      { id: 'S2', name: 'Shenzhen Petrochemical Wing', material: 'Polymers & Plastic Extrusions', scope3Index: 1240, rating: 'C', auditStatus: 'Pending', actionAudits: 5, location: 'Shenzhen, CN' },
      { id: 'S3', name: 'Logix Continental Transport', material: 'Intermodal Freight & Courier Services', scope3Index: 920, rating: 'B', auditStatus: 'Verified', actionAudits: 2, location: 'Rotterdam, NL' },
      { id: 'S4', name: 'Odin Steel Manufacturing', material: 'Fossil-reduced Heavy Plate', scope3Index: 410, rating: 'AA', auditStatus: 'Audited', actionAudits: 1, location: 'Stockholm, SE' },
      { id: 'S5', name: 'Nippon Circuit Assemblies', material: 'Semiconductor Fabrication Arrays', scope3Index: 1120, rating: 'B', auditStatus: 'Pending', actionAudits: 4, location: 'Osaka, JP' }
    ];
  }, [invoiceAnalytics]);

  // Dynamically scale emissions using the Supplier Audit Slider
  const filteredSuppliers = useMemo(() => {
    const scale = invoiceAnalytics?.hasData ? 1 : 0;

    return rawSuppliers.map((sup: SupplierLocation) => {
      // Offset supplier footprint based on audit rate slider
      const auditReductionCoeff = 1 - (tuning.supplierAuditParticipation / 220);
      const computedScope3 = Math.round((sup.scope3Index * scale) * auditReductionCoeff);
      return {
        ...sup,
        scope3IndexOriginal: Math.round(sup.scope3Index * scale),
        scope3Index: computedScope3
      };
    }).filter((sup: SupplierLocation) =>
      sup.name.toLowerCase().includes(supplierSearchText.toLowerCase()) ||
      sup.material.toLowerCase().includes(supplierSearchText.toLowerCase()) ||
      sup.location.toLowerCase().includes(supplierSearchText.toLowerCase())
    );
  }, [supplierSearchText, tuning.supplierAuditParticipation, invoiceAnalytics]);

  // Aggregate local metrics of the supply chain
  const supplyChainAggregates = useMemo(() => {
    const totalScope3Emissions = filteredSuppliers.reduce((acc: number, curr: SupplierLocation) => acc + curr.scope3Index, 0);
    const averageRating = 'B+';
    const pendingAudits = filteredSuppliers.filter((s: SupplierLocation) => s.auditStatus === 'Pending').length;
    return {
      totalScope3Emissions,
      averageRating,
      pendingAudits
    };
  }, [filteredSuppliers]);

  // Handle corrective audit click demonstration
  const [leveragedAudits, setLeveragedAudits] = useState<Record<string, boolean>>({});
  const handleLeverageAudit = (supplierId: string, supplierName: string) => {
    setLeveragedAudits(prev => ({ ...prev, [supplierId]: true }));
  };

  return (
    <div id="supply-chain-analytics-section" className="bg-slate-50 border border-slate-200 rounded-2xl p-6 lg:p-8 space-y-8 text-slate-800 relative overflow-hidden shadow-sm mt-12 font-sans">
      {/* Mesh and light background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.005)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/[0.01] blur-3xl rounded-full pointer-events-none" />

      {/* Title block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold mb-2 uppercase tracking-wide">
            <Layers className="w-3 h-3 text-emerald-605 text-emerald-600" />
            Supply Chain &amp; Operations Telemetry
          </div>
          <h2 className="text-2xl font-display font-extrabold tracking-tight text-slate-900">
            Global Supply Chain &amp; Decarbonization Nodes
          </h2>
          <p className="text-slate-500 text-xs mt-1 max-w-2xl">
            Audit logs and carbon footprint mapping of certified third-party vendor operations. Track corrective audit statuses and geographic edge diagnostics in real-time.
          </p>
        </div>

        {/* Global state widget */}
        <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-left flex items-center gap-3 shadow-3xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <span className="text-[9px] text-emerald-600 font-mono leading-none block uppercase font-bold tracking-wider">Active Region filter</span>
            <span className="text-xs text-slate-900 font-extrabold uppercase mt-0.5 block">{activeRegion === 'GLOBAL' ? 'Global Multi-Sites' : `${activeRegion} Operations`}</span>
          </div>
        </div>
      </div>

      {/* Secondary Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col justify-between shadow-3xs">
          <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block tracking-wider">Vendor Quality Index</span>
          <div className="mt-2.5">
            <span className="text-lg sm:text-xl font-bold font-mono text-cyan-600">{supplyChainAggregates.averageRating} Grade</span>
          </div>
          <span className="text-[9px] text-slate-400 block mt-1">94% Certified carbon-free steel match</span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col justify-between shadow-3xs">
          <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block tracking-wider">Outstanding Audits</span>
          <div className="mt-2.5">
            <span className="text-lg sm:text-xl font-bold font-mono text-amber-600">{supplyChainAggregates.pendingAudits} Pending</span>
          </div>
          <span className="text-[9px] text-amber-600 block mt-1">Requires corrective action dispatch</span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col justify-between shadow-3xs">
          <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block tracking-wider">Audit Audit Rate</span>
          <div className="mt-2.5">
            <span className="text-lg sm:text-xl font-bold font-mono text-fuchsia-600">{tuning.supplierAuditParticipation}%</span>
          </div>
          <span className="text-[9px] text-slate-400 block mt-1">Dynamic reduction offset modifier</span>
        </div>
      </div>

      {/* TWO PANEL GRID: MAP AND LIST */}
      <div className="grid lg:grid-cols-1 gap-6 relative z-10">

        {/* PANEL 1: GEOGRAPHIC INTERACTIVE SCHEMATIC */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-3xs">
          <div>
            <h3 className="text-sm font-bold font-display text-slate-900">Edge Location Registers</h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Select or click active geographical telemetry ports to simulate regional carbon audits.
            </p>
          </div>

          {/* Dotted schematic interactive map */}
          <div className="relative h-64 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center">

            {/* Cyber world map lines */}
            <svg className="w-full h-full text-slate-300" viewBox="0 0 500 250" fill="none">
              {/* Fake outline/connections */}
              <path d="M50,110 Q90,70 180,90 T350,60 T450,140" stroke="currentColor" strokeWidth="1" strokeDasharray="3,8" />
              <path d="M40,180 Q120,200 220,180 T420,170" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3,8" />

              {/* Houston/Austin Node */}
              <g className="cursor-pointer group" onClick={() => handleRegionClick('AMER')}>
                <circle cx="120" cy="110" r="10" fill="none" stroke="#ef4444" strokeWidth="1" className={activeRegion === 'AMER' ? 'animate-ping' : 'group-hover:animate-pulse'} />
                <circle cx="120" cy="110" r="4.5" fill={activeRegion === 'AMER' ? '#ef4444' : '#b91c1c'} />
                <text x="120" y="125" fill={activeRegion === 'AMER' ? '#0f172a' : '#64748b'} fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">AMER (Austin)</text>
              </g>

              {/* Rotterdam Node */}
              <g className="cursor-pointer group" onClick={() => handleRegionClick('EMEA')}>
                <circle cx="260" cy="80" r="10" fill="none" stroke="#10b981" strokeWidth="1" className={activeRegion === 'EMEA' ? 'animate-ping' : 'group-hover:animate-pulse'} />
                <circle cx="260" cy="80" r="4.5" fill={activeRegion === 'EMEA' ? '#10b981' : '#047857'} />
                <text x="260" y="95" fill={activeRegion === 'EMEA' ? '#0f172a' : '#64748b'} fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">EMEA (Rotterdam)</text>
              </g>

              {/* Shenzhen Node */}
              <g className="cursor-pointer group" onClick={() => handleRegionClick('APAC')}>
                <circle cx="390" cy="140" r="10" fill="none" stroke="#fa5555" strokeWidth="1" className={activeRegion === 'APAC' ? 'animate-ping' : 'group-hover:animate-pulse'} />
                <circle cx="390" cy="140" r="4.5" fill={activeRegion === 'APAC' ? '#f97316' : '#ea580c'} />
                <text x="390" y="155" fill={activeRegion === 'APAC' ? '#0f172a' : '#64748b'} fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">APAC (Shenzhen)</text>
              </g>
            </svg>

            {/* Micro details panel in map */}
            <div className="absolute top-3 left-3 bg-white border border-slate-200 px-2 py-1.5 rounded-lg text-left font-mono text-[8px] text-slate-500 space-y-0.5 shadow-2xs">
              <span className="text-emerald-600 font-bold block">EDGE DIAGNOSTICS</span>
              <span>Reconciled: {(100 - supplyChainAggregates.pendingAudits * 4).toFixed(1)}%</span>
            </div>

            {/* Quick regional filter controls */}
            <div className="absolute bottom-3 left-3 flex gap-1 bg-white border border-slate-200 p-0.5 rounded-lg scale-90 origin-bottom-left shadow-2xs">
              {(['GLOBAL', 'AMER', 'EMEA', 'APAC'] as const).map(reg => (
                <button
                  key={reg}
                  onClick={() => handleRegionClick(reg)}
                  className={`px-2 py-1 rounded text-[9px] font-mono font-bold transition cursor-pointer ${activeRegion === reg
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 px-3.5 py-3 rounded-xl flex items-start gap-2.5 text-xs text-slate-700">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5 leading-normal">
              <span className="font-bold text-emerald-990 text-emerald-900 block">Active Region Focus</span>
              {activeRegion === 'GLOBAL' ? (
                <span>All corporate manufacturing yards and outbound logistics lines are compiling their respective telemetry maps in centralized operational indexes.</span>
              ) : activeRegion === 'AMER' ? (
                <span>Filtering AMER coordinates: Directing focused sub-meters on Alcan Foundry Corp in Austin, Texas. Operational load accounts for carbon offset variables.</span>
              ) : activeRegion === 'EMEA' ? (
                <span>Filtering EMEA coordinates: Auditing Rotterdam Gate freight terminals and Rotterdam Logix operations. Excellent standard compliance.</span>
              ) : (
                <span>Filtering APAC coordinates: Tracking Shenzhen Casting Hub. High carbon indices reported, mitigating pending vendor audit reviews.</span>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
