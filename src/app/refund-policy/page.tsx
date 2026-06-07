'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { 
  ArrowLeft, Shield, CheckCircle2, FileText, Globe, 
  Zap, Info, Lock, ChevronRight, Scale, Clock, Mail,
  CreditCard, RefreshCcw, AlertCircle, HelpCircle,
  FileSearch, Ban, Landmark, Wallet, ShieldCheck, AlertTriangle
} from 'lucide-react';

/* ---------------- Premium Section Component ---------------- */
const Section = ({ id, title, children, index }: { id: string, title: string, children: React.ReactNode, index: number }) => (
  <section
    id={id}
    className="mb-24 relative"
  >
    <div className="flex items-start gap-10 group">
      <div className="hidden md:flex flex-col items-center pt-2">
        <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-green-600 font-bold group-hover:bg-green-600 group-hover:text-white transition-all duration-500 text-xs shadow-green-100/20">
          {index + 1}
        </div>
        <div className="w-[1px] h-48 bg-gradient-to-b from-green-100 to-transparent mt-6" />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4 tracking-tight">
          <span className="md:hidden text-green-600">0{index + 1}.</span>
          {title}
        </h2>
        <div className="bg-white/40 backdrop-blur-md p-12 rounded-[3.5rem] border border-gray-100 hover:border-green-300 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-700">
          {children}
        </div>
      </div>
    </div>
  </section>
);

export default function RefundPolicy() {
  const [activeSection, setActiveSection] = useState('eligibility');

  const sections = [
    { id: 'eligibility', title: 'Eligibility Framework' },
    { id: 'period', title: 'Refund Windows' },
    { id: 'downgrades', title: 'Subscription Downgrades' },
    { id: 'non-refundable', title: 'Non-Refundable Terms' },
    { id: 'timeline', title: 'Processing Timeline' },
    { id: 'request', title: 'Submission Guide' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfdfc] text-[#1a1a1a] scroll-smooth selection:bg-green-100">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-green-300/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-300/10 blur-[180px] rounded-full animate-pulse [animation-delay:4s]" />
      </div>

      {/* Hero Section */}
      <header className="pt-64 pb-32 px-10 text-center relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border border-green-100 text-green-700 text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-sm">
          <RefreshCcw size={14} className="text-green-500" />
          <span>Financial Integrity v2.4</span>
        </div>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-gray-900 mb-12 leading-[0.9]">
          Refund <span className="text-green-600">Policy.</span>
        </h1>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-10 relative z-10 pb-64">
        <div className="grid grid-cols-12 gap-16">
          
          {/* Premium Sidebar */}
          <aside className="hidden lg:block col-span-3 sticky top-32 h-fit">
            <div className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-xl shadow-green-900/5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-10 px-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Navigation
              </h4>
              <div className="space-y-3">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`flex items-center justify-between group py-4 px-6 rounded-2xl text-[13px] font-black tracking-tight transition-all duration-500 ${
                      activeSection === s.id 
                      ? 'bg-green-600 text-white shadow-2xl scale-[1.05] shadow-green-200' 
                      : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Content Engine */}
          <div className="col-span-12 lg:col-span-9 space-y-4">
            
            <Section id="eligibility" title="Eligibility Framework" index={0}>
              <p className="text-gray-800 leading-relaxed font-black mb-10 text-lg">
                We maintain a structured refund framework to ensure operational sustainability while protecting user investments:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:border-green-200 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-white text-green-600 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform"><CreditCard size={20} /></div>
                  <h4 className="font-black text-sm mb-4">Billing Errors</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">Verified duplicate charges, system glitches, or incorrect tier applications are eligible for 100% immediate refund.</p>
                </div>
                <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:border-green-200 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-white text-green-600 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform"><ShieldCheck size={20} /></div>
                  <h4 className="font-black text-sm mb-4">Service Non-Delivery</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">If core ESG tracking features are unavailable for more than 48 consecutive hours due to internal server failure.</p>
                </div>
              </div>
            </Section>

            <Section id="period" title="Refund Windows & Tiers" index={1}>
              <div className="bg-white border border-gray-100 rounded-[3rem] overflow-hidden shadow-sm">
                {[
                  { t: 'Quarterly Subscription', d: '7-Day Window', p: '100% Refundable' },
                  { t: 'Annual Subscription', d: '14-Day Window', p: '100% Refundable' },
                  { t: 'Enterprise Custom', d: 'Agreement Specific', p: 'As per SLA' }
                ].map((item, i) => (
                  <div key={i} className="p-10 border-b border-gray-50 last:border-0 flex flex-col md:flex-row justify-between md:items-center gap-6 hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-black text-lg text-gray-900 mb-1">{item.t}</h4>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{item.d}</p>
                    </div>
                    <div className="px-6 py-2 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest border border-green-100">{item.p}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="downgrades" title="Subscription Downgrades" index={2}>
              <p className="text-gray-800 leading-relaxed font-black mb-8">
                If you choose to downgrade your plan mid-cycle, we do not provide cash refunds for the difference. Instead, we offer:
              </p>
              <div className="p-10 rounded-[3rem] bg-blue-50 border border-blue-100 flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-sm shrink-0"><RefreshCcw size={20} /></div>
                <div>
                  <h5 className="font-black text-sm text-blue-900 mb-2">Pro-Rated Platform Credit</h5>
                  <p className="text-xs text-blue-700/70 font-medium leading-relaxed">Remaining funds are applied as credits to your future billing cycles, ensuring you only pay for what you use in the next period.</p>
                </div>
              </div>
            </Section>

            <Section id="non-refundable" title="Non-Refundable Terms" index={3}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: <Ban />, t: 'Change of Mind', d: 'Refunds are not granted for lack of usage or change in organizational strategy.' },
                  { icon: <AlertTriangle />, t: 'Policy Violation', d: 'Accounts terminated for security breaches or ToS violations are ineligible.' },
                  { icon: <Landmark />, t: 'Third-Party Fees', d: 'Bank processing fees or currency conversion charges are non-refundable.' },
                  { icon: <Clock />, t: 'Expired Windows', d: 'Requests made outside the specified 7/14 day windows.' }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-gray-100 flex gap-5">
                    <div className="text-red-400 shrink-0">{item.icon}</div>
                    <div>
                      <h5 className="font-black text-sm text-gray-900 mb-1">{item.t}</h5>
                      <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="timeline" title="Processing Timeline" index={4}>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-6">
                  <p className="text-gray-800 leading-relaxed font-black">Once a refund is approved, it undergoes the following lifecycle:</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs font-black text-gray-700"><div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center text-green-600">1</div> Internal Verification (24-48h)</div>
                    <div className="flex items-center gap-4 text-xs font-black text-gray-700"><div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center text-green-600">2</div> Payment Processor Handshake (24h)</div>
                    <div className="flex items-center gap-4 text-xs font-black text-gray-700"><div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center text-green-600">3</div> Bank Processing (3-7 Days)</div>
                  </div>
                </div>
                <div className="w-full md:w-72 p-10 rounded-[3rem] bg-gray-900 text-white text-center shadow-2xl">
                  <Wallet size={40} className="mx-auto mb-6 text-green-400" />
                  <h4 className="text-3xl font-black mb-2">7-14</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Business Days</p>
                </div>
              </div>
            </Section>

            <Section id="request" title="Submission Guide & Checklist" index={5}>
              <div className="bg-gray-900 rounded-[4rem] p-16 text-white shadow-[0_48px_96px_-12px_rgba(0,0,0,0.4)] relative overflow-hidden group/final">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full group-hover/final:scale-150 transition-transform duration-1000" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
                  <div className="flex-1">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-green-600 flex items-center justify-center mb-10 shadow-2xl shadow-green-600/30"><Mail size={32} /></div>
                    <h4 className="text-4xl font-black tracking-tight mb-8 leading-tight">Initialize Your <br/><span className="text-green-500">Refund Request.</span></h4>
                    <div className="space-y-4 mb-10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-4">Required Details Checklist:</p>
                      <div className="flex items-center gap-3 text-xs font-black text-gray-200"><CheckCircle2 size={14} className="text-green-500" /> Original Transaction ID</div>
                      <div className="flex items-center gap-3 text-xs font-black text-gray-200"><CheckCircle2 size={14} className="text-green-500" /> Registered Admin Email</div>
                      <div className="flex items-center gap-3 text-xs font-black text-gray-200"><CheckCircle2 size={14} className="text-green-500" /> Detailed Reason for Request</div>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col gap-6">
                    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                      <p className="text-xs font-bold text-gray-400 mb-1">Direct Contact</p>
                      <p className="text-sm font-black">pushkarsingh.carbonsync@gmail.com</p>
                    </div>
                    <Link 
                      href="/"
                      className="bg-white text-gray-900 px-12 py-6 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-green-600 hover:text-white transition-all shadow-2xl text-center active:scale-95"
                    >
                      Contact Finance Team
                    </Link>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </main>

    </div>
  );
}
