'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { 
  ArrowLeft, Shield, CheckCircle2, FileText, Globe, 
  Zap, Info, Lock, ChevronRight, Scale, Clock, Mail 
} from 'lucide-react';

/* ---------------- Premium Section Component ---------------- */
const Section = ({ id, title, children, index }: { id: string, title: string, children: React.ReactNode, index: number }) => (
  <section
    id={id}
    className="mb-24 relative"
  >
    <div className="flex items-start gap-6 group">
      <div className="hidden md:flex flex-col items-center pt-2">
        <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-green-600 font-bold group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
          {index + 1}
        </div>
        <div className="w-[1px] h-32 bg-gradient-to-b from-green-100 to-transparent mt-4" />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="md:hidden text-green-600">0{index + 1}.</span>
          {title}
        </h2>
        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-gray-100 hover:border-green-200 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-500">
          {children}
        </div>
      </div>
    </div>
  </section>
);

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('acceptance');
  const [legalFormStatus, setLegalFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleLegalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLegalFormStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xojyggok', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setLegalFormStatus('success');
        form.reset();
        setTimeout(() => setLegalFormStatus('idle'), 3000);
      } else {
        setLegalFormStatus('error');
        setTimeout(() => setLegalFormStatus('idle'), 3000);
      }
    } catch (error) {
      setLegalFormStatus('error');
      setTimeout(() => setLegalFormStatus('idle'), 3000);
    }
  };

  const sections = [
    { id: 'acceptance', title: 'Acceptance of terms' },
    { id: 'eligibility', title: 'Eligibility & ESG Responsibility' },
    { id: 'governance', title: 'Account Governance' },
    { id: 'ai-ethics', title: 'AI Usage & Ethical Boundaries' },
    { id: 'proprietary', title: 'Content & Carbon Credits' },
    { id: 'security', title: 'Security & Data Governance' },
    { id: 'billing', title: 'Subscription & Carbon-Neutral Billing' },
    { id: 'termination', title: 'Termination' },
    { id: 'disputes', title: 'Disputes & Governing Law' },
    { id: 'changes', title: 'Changes of Terms' },
    { id: 'contact', title: 'Contact Us' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
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
    <div className="min-h-screen bg-[#fcfcfc] selection:bg-green-100 text-[#1a1a1a] scroll-smooth">
      {/* 🔮 Animated Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-200/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/20 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      {/* HERO SECTION */}
      <header className="pt-32 pb-24 px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest mb-8">
          <Scale size={12} />
          <span>Legal Framework v3.2</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8">
          Terms of <span className="text-green-600">Service.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Our commitment to transparency and sustainable growth. Everything you need to know about partnering with CarbonSync.
        </p>
      </header>

      {/* MAIN CONTENT GRID */}
      <main className="max-w-6xl mx-auto px-6 relative z-10 pb-32">
        <div className="grid grid-cols-12 gap-12 xl:gap-20">
          
          {/* SIDEBAR NAVIGATION (3 Columns) */}
          <aside className="hidden lg:block col-span-3 sticky top-32 h-fit">
            <div className="space-y-8">
              <div className="p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 px-2">Quick Jump</h4>
                <div className="space-y-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`flex items-center justify-between group py-2.5 px-4 rounded-xl text-[13px] font-bold transition-all ${
                        activeSection === s.id 
                        ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {s.title}
                      <ChevronRight size={14} className={`transition-transform duration-300 ${activeSection === s.id ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* CONTENT SECTIONS (9 Columns) */}
          <div className="col-span-12 lg:col-span-9 space-y-4">
            <Section id="acceptance" title="Acceptance of terms" index={0}>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                By initializing your CarbonSync account or deploying our tracking SDKs, you agree to comply with these terms, all applicable environmental laws, and international reporting standards.
              </p>
              <p className="text-gray-600 leading-relaxed font-medium">
                If you do not agree with any of these terms, your license to access our proprietary AI modules is automatically revoked.
              </p>
            </Section>

            <Section id="eligibility" title="Eligibility & ESG Responsibility" index={1}>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                The Platform is intended for use by corporate entities and authorized representatives aged 18 or older. Users represent that they possess the legal authority to commit their organization to targets.
              </p>
              <div className="bg-green-50 p-5 rounded-2xl text-green-700 border border-green-100 flex items-start gap-3">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                <p className="text-sm font-medium"><strong>Verification:</strong> Access to "Net-Zero Alpha" requires corporate sustainability credential verification to ensure data integrity.</p>
              </div>
            </Section>

            <Section id="governance" title="Account Governance" index={2}>
              <p className="text-gray-600 leading-relaxed font-medium mb-6">
                You are responsible for maintaining the confidentiality of your ESG credentials. CarbonSync utilizes <strong>AES-256 encryption</strong> for all data at rest.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Multi-Factor Authentication (MFA) required.',
                  'Raw data accuracy is user responsibility.',
                  'Scope 1, 2, and 3 emissions reporting.',
                  'Regular security audits and logs.'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm font-bold text-gray-500">
                    <CheckCircle2 size={16} className="text-green-500" />
                    {item}
                  </div>
                ))}
              </div>
            </Section>

            <Section id="ai-ethics" title="AI Usage & Ethical Boundaries" index={3}>
              <p className="text-gray-600 leading-relaxed font-medium">
                You agree to use the CarbonSync AI engine solely for legitimate carbon footprint analysis. Reverse-engineering our <strong>CarbonPulse™</strong> algorithms or using our data to train competing models is strictly prohibited. AI-generated insights are provided as recommendations and should be verified by sustainability professionals.
              </p>
            </Section>

            <Section id="proprietary" title="Content & Carbon Credits" index={4}>
              <p className="text-gray-600 leading-relaxed font-medium mb-6">
                All reporting templates, ESG frameworks, and dynamic visualizations generated by CarbonSync are the sole intellectual property of the Company.
              </p>
              <div className="bg-blue-50 p-5 rounded-2xl text-blue-700 border border-blue-100 flex items-start gap-3">
                <Info size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm font-medium">Carbon credits purchased via our integrated marketplace are subject to global market fluctuations and regulatory changes.</p>
              </div>
            </Section>

            <Section id="security" title="Security & Data Governance" index={5}>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                CarbonSync adheres to <strong>SOC2 and GDPR</strong> compliance standards. Your operational data is siloed and never utilized for cross-tenant analytics without anonymization.
              </p>
              <p className="text-gray-600 leading-relaxed font-medium">
                We reserve the right to audit the data pipeline connected to our Platform to ensure certification veracity and prevent greenwashing.
              </p>
            </Section>

            <Section id="billing" title="Subscription & Carbon-Neutral Billing" index={6}>
              <p className="text-gray-600 leading-relaxed font-medium mb-6">
                Fees for Enterprise and Pro tiers are billed monthly. Failure to maintain an active subscription results in tracking suspension.
              </p>
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <Zap size={24} className="text-yellow-500 shrink-0" />
                <p className="text-sm font-bold text-gray-700 leading-snug">Digital-only billing to maintain 0.02kg carbon efficiency target per transaction.</p>
              </div>
            </Section>

            <Section id="termination" title="Termination" index={7}>
              <p className="text-gray-600 leading-relaxed font-medium">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever including breach of terms.
              </p>
            </Section>

            <Section id="disputes" title="Disputes & Governing Law" index={8}>
              <p className="text-gray-600 leading-relaxed font-medium">
                This Agreement is governed by the laws of the <strong>Republic of India</strong> and is subject to the exclusive jurisdiction of the courts in <strong>Bangalore, India</strong>.
              </p>
            </Section>

            <Section id="changes" title="Changes of Terms" index={9}>
              <p className="text-gray-600 leading-relaxed font-medium">
                We reserve the right to modify these Terms at any time. Material revisions will be provided with at least <strong>30 days' notice</strong> prior to new terms taking effect.
              </p>
            </Section>

            <Section id="contact" title="Contact Us" index={10}>
              <div className="bg-gray-900 rounded-[2.5rem] p-10 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 group shadow-2xl shadow-green-900/20">
                <div className="max-w-xs text-center md:text-left">
                  <Mail className="text-green-400 mb-4 mx-auto md:mx-0" size={32} />
                  <h4 className="text-2xl font-bold mb-2">Legal Inquiries</h4>
                  <p className="text-gray-400 text-sm font-medium">Have questions about our terms? Our legal team is here to help.</p>
                </div>
                <form onSubmit={handleLegalSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full md:max-w-md">
                  <input type="hidden" name="Subject" value="Legal Inquiry from Terms of Service" />
                  {legalFormStatus === 'success' ? (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-6 py-4 rounded-2xl flex items-center gap-3 w-full">
                      <CheckCircle2 size={20} />
                      <span className="font-bold text-sm">Request received!</span>
                    </div>
                  ) : (
                    <>
                      <input 
                        name="Client Email" 
                        type="email" 
                        placeholder="Your work email address" 
                        required 
                        className="w-full bg-white/10 border border-white/20 px-6 py-4 rounded-2xl font-bold text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all placeholder:text-gray-400 text-sm"
                      />
                      <button 
                        disabled={legalFormStatus === 'submitting'}
                        type="submit"
                        className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-green-600 hover:text-white transition-all duration-300 shadow-xl whitespace-nowrap active:scale-95 disabled:opacity-50 text-sm"
                      >
                        {legalFormStatus === 'submitting' ? 'Sending...' : 'Contact Us'}
                      </button>
                    </>
                  )}
                </form>
              </div>
            </Section>
          </div>
        </div>
      </main>


    </div>
  );
}
