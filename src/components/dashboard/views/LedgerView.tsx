'use client';

import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

const LEDGER_ROWS = [
  { t: 'Tokenization Cycle #842', s: 'Amazon Sector Alpha', v: '+124.2 tCO2', c: 'text-emerald-500' },
  { t: 'Biomass Offset Verification', s: 'Borneo Canopy Hub', v: '+84.2 tCO2', c: 'text-emerald-500' },
  { t: 'Industrial Surge Sync', s: 'Sector 7B Grid', v: '-12.0 tCO2', c: 'text-rose-500' },
  { t: 'Neural Sequestration Phase', s: 'Gaia Central Core', v: 'Verified', c: 'text-cyan-400' },
  { t: 'Soil Carbon Injection', s: 'Congo Basin Node', v: '+45.8 tCO2', c: 'text-emerald-500' },
  { t: 'Atmospheric Capture v8', s: 'Global Resonance', v: '+310.2 tCO2', c: 'text-emerald-500' },
];

function makeId() {
  return Math.random().toString(36).substring(2, 12).toUpperCase();
}

export default function LedgerView() {
  const [txIds] = useState(() => LEDGER_ROWS.map(() => makeId()));
  return (
    <div
      className="glass-god rounded-[5rem] p-20 flex flex-col overflow-hidden min-h-[80vh]"
    >
      <div className="flex justify-between items-center mb-20">
        <div>
          <h4 className="text-4xl font-black uppercase tracking-tight flex items-center gap-8 mb-4">
            <FileText className="text-emerald-500" /> Sequestration Ledger
          </h4>
          <p className="text-xl text-white/30 font-medium italic">Immutable source of truth for global restoration.</p>
        </div>
        <button className="px-12 py-5 bg-emerald-500 text-slate-950 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:scale-110 active:scale-95 transition-all shadow-[0_15px_30px_rgba(16,185,129,0.3)]">
          Export Ledger
        </button>
      </div>
      <div className="overflow-x-auto no-scrollbar flex-1">
        <table className="w-full text-left">
          <thead className="border-b border-white/5">
            <tr className="text-[12px] font-black uppercase tracking-[0.4em] text-white/20">
              <th className="pb-12 pl-8">Restoration Transaction</th>
              <th>Node Source</th>
              <th className="text-right pr-8">Audit Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {LEDGER_ROWS.map((row, i) => (
              <tr key={i} className="group hover:bg-white/5 transition-all cursor-pointer">
                <td className="py-12 pl-8">
                  <p className="text-lg font-black tracking-tight">{row.t}</p>
                  <p className="text-[10px] font-bold text-white/20 uppercase mt-2">
                    TX_ID: {txIds[i]}
                  </p>
                </td>
                <td className="py-12 text-sm font-black text-white/40 uppercase tracking-widest">{row.s}</td>
                <td className={`py-12 pr-8 text-2xl font-black text-right ${row.c}`}>{row.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
