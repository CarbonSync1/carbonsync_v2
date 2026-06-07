'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

import {
  Leaf, Search, Sun, LayoutDashboard, Globe, ShieldCheck, FileText, Sparkles, Settings, TrendingUp,
  Activity, MessageSquare, Send, Cpu, Zap, Trees, Wind, Lock, Fingerprint, CheckCircle2, Maximize2,
  Link as LinkIcon, Eye, Key, ShieldAlert, X, ArrowRight, Trophy
} from 'lucide-react';
import ParticleField from '@/components/dashboard/components/ParticleField';

const DashboardView = dynamic(() => import('@/components/dashboard/views/DashboardView'), { ssr: false });
const NodesView = dynamic(() => import('@/components/dashboard/views/NodesView'), { ssr: false });
const VaultView = dynamic(() => import('@/components/dashboard/views/VaultView'), { ssr: false });
const LedgerView = dynamic(() => import('@/components/dashboard/views/LedgerView'), { ssr: false });
const GaiaView = dynamic(() => import('@/components/dashboard/views/GaiaView'), { ssr: false });

const TABS = [
  { id: 'Overview', icon: LayoutDashboard },
  { id: 'Nodes', icon: Globe },
  { id: 'Vault', icon: ShieldCheck },
  { id: 'Ledger', icon: FileText },
  { id: 'Gaia AI', icon: Sparkles },
  { id: 'Settings', icon: Settings },
];

export default function DashboardApp() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState('Overview');

  const springX = 0;
  const springY = 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderView = () => {
    const Fallback = () => (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
    switch (activeTab) {
      case 'Overview': return <Suspense fallback={<Fallback />}><DashboardView /></Suspense>;
      case 'Nodes': return <Suspense fallback={<Fallback />}><NodesView /></Suspense>;
      case 'Vault': return <Suspense fallback={<Fallback />}><VaultView /></Suspense>;
      case 'Ledger': return <Suspense fallback={<Fallback />}><LedgerView /></Suspense>;
      case 'Gaia AI': return <Suspense fallback={<Fallback />}><GaiaView /></Suspense>;
      default: return <Suspense fallback={<Fallback />}><DashboardView /></Suspense>;
    }
  };

  return (
    <div
      className={`dashboard-root relative min-h-screen font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-1000 overflow-x-hidden ${
        theme === 'dark' ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <ParticleField />
      <div
        className="fixed top-0 left-0 w-[1000px] h-[1000px] bg-emerald-500/10 rounded-full blur-[200px] pointer-events-none z-[3] translate-x-[-50%] translate-y-[-50%]"
      />
      <div className="fixed inset-0 z-0 futuristic-grid opacity-40" />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2560"
            alt=""
            className="w-full h-full object-cover opacity-20 blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-transparent to-emerald-950/50" />
        </div>
      </div>

      {!mounted ? (
        <div className="fixed inset-0 z-[1000] bg-slate-950 flex items-center justify-center">
          <p className="text-xs font-black text-emerald-500 uppercase tracking-[1.5em] animate-pulse">
            Establishing God-Tier Link...
          </p>
        </div>
      ) : (
        <>
          <aside className="fixed left-12 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-10 p-8 glass-god rounded-[5rem] shadow-[0_100px_150px_rgba(0,0,0,1)] hidden 2xl:flex">
            <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center text-[#020617] shadow-[0_0_60px_rgba(16,185,129,0.3)] mb-12">
              <Leaf size={32} />
            </div>
            {TABS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-700 ${
                  activeTab === item.id
                    ? 'bg-emerald-500 text-[#020617] shadow-[0_0_40px_rgba(16,185,129,0.2)] scale-125'
                    : 'text-white/10 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={26} />
              </button>
            ))}
          </aside>

          <nav className="fixed top-10 left-12 right-12 2xl:left-52 z-[100] flex items-center justify-between px-16 py-8 glass-god rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-6">
              <h1 className="text-3xl font-black tracking-tighter uppercase text-iridescent">
                Carbon<span className="text-white">Sync</span>
              </h1>
              <div className="px-5 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-6">
                ULTRA V5.0
              </div>
            </div>
            <div className="flex items-center gap-12 px-10 py-4 rounded-[2rem] bg-white/5 border border-white/5 w-[600px] text-white/10 focus-within:text-white focus-within:w-[700px] transition-all">
              <Search size={22} />
              <input
                type="text"
                placeholder={`Consult ${activeTab} Layer...`}
                className="bg-transparent border-none outline-none text-xs font-black tracking-[0.3em] w-full text-white placeholder:text-white/5 uppercase"
              />
            </div>
            <div className="flex items-center gap-10">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-4 bg-white/5 rounded-3xl text-white/30 hover:text-white transition-all"
              >
                <Sun size={24} />
              </button>
              <div className="flex items-center gap-6 pl-10 border-l border-white/10">
                <div className="flex flex-col items-end">
                  <p className="text-[10px] font-black uppercase text-white tracking-widest">Alex Overseer</p>
                  <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Admin 0x42</p>
                </div>
                <div className="w-14 h-14 rounded-2xl border-2 border-emerald-500/40 p-1.5 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                    alt="Alex Overseer"
                    className="w-full h-full rounded-xl bg-slate-800"
                  />
                </div>
              </div>
            </div>
          </nav>

          <main className="relative z-10 pt-60 pb-32 px-12 2xl:pl-56 max-w-[1800px] mx-auto">
            <div className="mb-24">
              <p className="text-[14px] font-black text-emerald-400 uppercase tracking-[1.2em] mb-6">
                Console Protocol // Layer 0{activeTab === 'Overview' ? 1 : 2}
              </p>
              <h2 className="text-8xl font-black tracking-tighter leading-none text-iridescent italic">
                {activeTab === 'Overview' ? 'Operational Command' : activeTab}
              </h2>
            </div>
            <div>
                {renderView()}
              </div>

            <footer className="mt-60 pt-24 border-t border-white/5 flex flex-col items-center gap-12 opacity-30 hover:opacity-100 transition-opacity text-center pb-20">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-2xl">
                  <Leaf size={40} />
                </div>
                <h5 className="text-4xl font-black tracking-tighter uppercase text-iridescent">CarbonSync</h5>
              </div>
              <div className="px-10 py-4 glass-god rounded-full inline-flex items-center gap-6">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[11px] font-black uppercase tracking-[0.8em]">
                  Neural Protocol ULTRA v5.0 &bull; Sync: {activeTab.toUpperCase()}
                </p>
              </div>
            </footer>
          </main>

          <div className="fixed bottom-12 right-12 z-[1002] pointer-events-none">
            <div className="px-10 py-4 bg-emerald-500 text-slate-950 font-black rounded-full text-[11px] uppercase tracking-[0.6em] shadow-[0_50px_100px_rgba(16,185,129,0.4)] border-4 border-slate-950/20">
              God-Tier Immersion Active &#10003;
            </div>
          </div>
        </>
      )}
    </div>
  );
}
