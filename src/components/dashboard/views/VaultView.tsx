'use client';

import { useState } from 'react';

import { ShieldCheck, Lock, Fingerprint, CheckCircle2, Maximize2, Link as LinkIcon, Eye, Key, ShieldAlert } from 'lucide-react';

export default function VaultView() {
  const [locked, setLocked] = useState(true);

  return (
    <div
      className="flex flex-col gap-12"
    >
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        <div className="xl:col-span-4 glass-god rounded-[5rem] p-16 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[600px] border-2 border-white/10 shadow-[0_100px_150px_rgba(0,0,0,0.8)]">
          {locked ? (
              <div
                className="flex flex-col items-center"
              >
                <div className="w-40 h-40 bg-rose-500/10 rounded-[4rem] flex items-center justify-center text-rose-500 mb-12 relative overflow-hidden shadow-[0_0_80px_rgba(244,63,94,0.2)]">
                  <Lock size={64} />
                  <div className="scan-line" />
                </div>
                <h4 className="text-4xl font-black uppercase tracking-tighter mb-8 leading-none">
                  Vault <br /> <span className="text-rose-500">Enforced.</span>
                </h4>
                <p className="text-lg text-white/30 mb-16 max-w-xs font-medium">
                  Digital asset encryption active. Biometric audit required.
                </p>
                <button
                  onClick={() => setLocked(false)}
                  className="px-16 py-7 bg-white text-slate-950 rounded-full font-black text-xs uppercase tracking-[0.4em] hover:scale-110 active:scale-95 transition-all flex items-center gap-6 shadow-[0_20px_40px_rgba(255,255,255,0.2)]"
                >
                  <Fingerprint size={28} /> Authorize Sync
                </button>
              </div>
            ) : (
              <div
                className="flex flex-col items-center"
              >
                <div className="w-40 h-40 bg-emerald-500/10 rounded-[4rem] flex items-center justify-center text-emerald-500 mb-12 shadow-[0_0_80px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 size={64} className="animate-bounce" />
                </div>
                <h4 className="text-4xl font-black uppercase tracking-tighter mb-8 leading-none">
                  Access <br /> <span className="text-emerald-500">Granted.</span>
                </h4>
                <p className="text-lg text-white/30 mb-16 font-medium">
                  2 Sequestration Certificates decrypted.
                </p>
                <div className="w-full space-y-6">
                  {[1, 2].map((i) => (
                    <div
                      className="p-8 bg-white/5 rounded-[2.5rem] border border-emerald-500/30 flex justify-between items-center hover:bg-emerald-500/5 cursor-pointer group"
                    >
                      <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                        CERT_ALPHA_00{i}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Maximize2 size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
        <div className="xl:col-span-8 glass-god rounded-[5rem] p-20 flex flex-col justify-between">
          <div className="mb-20">
            <h4 className="text-4xl font-black uppercase tracking-tight flex items-center gap-8 mb-4">
              <ShieldCheck className="text-emerald-500" /> Compliance Core
            </h4>
            <p className="text-xl text-white/30 font-medium">Immutable verification of all carbon transactions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { label: 'Neural Blockchain', status: 'SYNCHRONIZED', icon: LinkIcon, desc: 'Real-time ledger parity active.' },
              { label: 'Deep Audit v4', status: 'VERIFIED', icon: Eye, desc: 'Biometric verification complete.' },
              { label: 'Vault Proxy', status: 'ACTIVE', icon: Key, desc: 'Multi-sig encryption enabled.' },
              { label: 'Ecosystem Risk', status: 'NOMINAL', icon: ShieldAlert, desc: 'Zero threat detected in nodes.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-10 rounded-[3rem] bg-white/5 border border-white/5 flex flex-col gap-8 group hover:bg-white/10 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 group-hover:scale-110 transition-transform">
                      <Icon size={28} />
                    </div>
                    <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-4 py-1.5 rounded-full">
                      {item.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-black uppercase tracking-tight mb-2">{item.label}</p>
                    <p className="text-sm text-white/30 font-medium">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
