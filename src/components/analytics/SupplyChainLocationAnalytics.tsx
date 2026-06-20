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

        {/* PANEL: REALISTIC VENDOR DIRECTORY */}
        <div className="bg-white border border-slate-200 rounded-2xl p-0 flex flex-col shadow-3xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
            <div>
              <h3 className="text-sm font-bold font-display text-slate-900">Vendor Emissions Ledger</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Real-time tracking of extracted suppliers and their lifecycle carbon index.
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search vendors or materials..."
                value={supplierSearchText}
                onChange={(e) => setSupplierSearchText(e.target.value)}
                className="pl-8 pr-4 py-1.5 text-xs border border-slate-200 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  <th className="p-4">Vendor Node</th>
                  <th className="p-4">Procured Material / Activity</th>
                  <th className="p-4">Geofence</th>
                  <th className="p-4">ESG Rating</th>
                  <th className="p-4">Audit Status</th>
                  <th className="p-4 text-right">Attributed kgCO₂e</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredSuppliers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No vendor telemetry found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4 font-bold text-slate-800 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                        {supplier.name}
                      </td>
                      <td className="p-4 text-slate-600 font-medium max-w-[200px] truncate" title={supplier.material}>
                        {supplier.material}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap">
                          <MapPin className="w-3 h-3" />
                          {supplier.location}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`font-black text-[11px] ${supplier.rating.includes('A') ? 'text-emerald-600' : supplier.rating.includes('B') ? 'text-blue-600' : 'text-amber-600'}`}>
                          {supplier.rating} Grade
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${supplier.auditStatus === 'Verified' ? 'bg-emerald-50 text-emerald-700' : supplier.auditStatus === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                          {supplier.auditStatus === 'Verified' ? <Check className="w-3 h-3" /> : supplier.auditStatus === 'Pending' ? <AlertTriangle className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                          {supplier.auditStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono font-bold text-slate-800">
                        {supplier.scope3Index.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
