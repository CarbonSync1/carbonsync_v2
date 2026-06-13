'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  ArrowRight, Upload, LineChart, FileCheck, Zap, ShieldCheck, Award, Activity,
  TrendingDown, Leaf, BarChart3, Globe2, HelpCircle, ChevronDown,
  CheckCircle, Users, Layers, Database, X,
} from 'lucide-react';
import { faqs } from '@/data/faqs';
const Analytics = dynamic(() => import('@/components/AnalyticsSection').then(m => ({ default: m.Analytics })), { ssr: false });

function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/hero_forest.webp" alt="" className="w-full h-full object-cover scale-105" style={{ filter: 'hue-rotate(45deg) saturate(1.2)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/85 via-forest-deep/60 to-forest-deep/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(22,163,74,0.15),transparent_70%)]" />
      </div>

      <div className="relative z-10 text-center max-w-[960px] px-[5%]">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/8 backdrop-blur-md border border-white/15 text-white/80 text-xs font-bold tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-eco-green animate-pulse-soft" />
          Intelligence for a Greener Future
        </div>

        <h1 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-white leading-[1.08] tracking-tight mb-6">
          Powering a{' '}
          <span className="text-gradient-emerald">Greener Future</span>
          {' '}with Intelligent Insights
        </h1>

        <div className="inline-block bg-gradient-to-r from-eco-green/90 to-emerald-light/90 text-white px-6 py-2.5 rounded-xl font-heading font-extrabold tracking-wide mb-6 shadow-lg shadow-eco-green/25 backdrop-blur-sm border border-white/10">
          FROM CARBON ACCOUNTING TO OFFSETTING — ALL AT ONE PLATFORM
        </div>

        <p className="text-[clamp(1rem,2vw,1.25rem)] text-white/70 leading-relaxed max-w-[680px] mx-auto mb-10">
          AI-driven sustainability analytics and carbon accounting platform for the modern enterprise.
        </p>

        <div className="flex justify-center">
          <Link href="/book-demo" className="btn-primary text-base px-10 py-4 text-[15px] shadow-lg shadow-eco-green/30 hover:shadow-xl hover:shadow-eco-green/40 inline-flex items-center gap-2">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative bg-white py-24 px-[5%] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-eco-green/20 to-transparent" />
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-eco-green/10 text-eco-green text-[11px] font-extrabold uppercase tracking-widest mb-5">
            Our Mission
          </span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-text-dark leading-tight tracking-tight mb-5">
            Transforming Sustainability into a{' '}
            <span className="text-gradient-emerald">Competitive Advantage</span>
          </h2>
          <p className="text-base text-text-muted leading-relaxed mb-5">
            At CarbonSync, sustainability isn&apos;t a burden — it&apos;s an opportunity. Our platform simplifies the complex landscape of carbon accounting, enabling organizations to measure, report, and reduce their environmental footprint with unparalleled precision.
          </p>
          <p className="text-base text-text-muted leading-relaxed mb-8">
            Founded on principles of transparency and innovation, we empower businesses to turn ESG compliance into strategic value creation.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-5 rounded-xl bg-gradient-to-br from-eco-green/5 to-transparent border border-eco-green/10">
              <div className="font-heading text-[2rem] font-extrabold text-text-dark mb-1">100%</div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Audit Ready</div>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-eco-green/5 to-transparent border border-eco-green/10">
              <div className="font-heading text-[2rem] font-extrabold text-text-dark mb-1">AI-Powered</div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Reduction Insights</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-eco-green/15 to-emerald-light/10 rounded-[24px] -rotate-2" />
          <div className="relative w-full rounded-[20px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
              alt="Sustainable Technology"
              className="w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-forest-deep/20 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-eco-green/10 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  );
}

function ImpactStrip() {
  return (
    <section className="relative premium-gradient py-16 px-[5%] overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(22,163,74,0.08),transparent_70%)]" />
      <div className="max-w-[1200px] mx-auto flex justify-around items-center text-center flex-wrap gap-8 relative z-10">
        {[
          { end: 50, suffix: '%', lbl: 'Faster ESG Reporting' },
          { end: 1000, suffix: '+', lbl: 'Curated ESG KPIs' },
          { end: 0, suffix: '', lbl: 'Unlimited', isUnlimited: true },
        ].map((item, i) => (
          <div className="flex flex-col gap-2" key={item.lbl}>
            {item.isUnlimited ? (
              <span className="font-heading text-4xl font-extrabold text-eco-green">Unlimited</span>
            ) : (
              <span className="tabular-nums font-heading text-4xl font-extrabold text-eco-green">{item.end}{item.suffix}</span>
            )}
            <span className="text-sm font-semibold text-white/60 uppercase tracking-wide">{item.lbl}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const badges = [
  { icon: <Award size={20} />, label: 'SOC 2 Certified' },
  { icon: <ShieldCheck size={20} />, label: 'GDPR Compliant' },
  { icon: <FileCheck size={20} />, label: 'BRSR Aligned' },
  { icon: <CheckCircle size={20} />, label: 'CSRD Ready' },
  { icon: <Globe2 size={20} />, label: 'GHG Protocol' },
  { icon: <Users size={20} />, label: '500+ Enterprises' },
  { icon: <Layers size={20} />, label: 'ISO 14001' },
  { icon: <Database size={20} />, label: 'ISSB Standards' },
  { icon: <ShieldCheck size={20} />, label: 'SEC Climate' },
  { icon: <Award size={20} />, label: 'SBTi Verified' },
];

function TrustedMarquee() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto mb-6 max-w-[1200px] px-[5%] text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-eco-green/10 text-eco-green text-[11px] font-extrabold uppercase tracking-widest mb-4">
          Trusted & Certified
        </span>
        <h2 className="font-heading text-[1.5rem] font-extrabold text-text-dark">CarbonSync is trusted by leading enterprises worldwide</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {badges.map((b, i) => (
          <div
            key={i}
            className="flex cursor-default items-center gap-2.5 rounded-full border border-eco-green/15 bg-gradient-to-r from-beige-soft/50 to-white px-6 py-3 whitespace-nowrap transition-all hover:-translate-y-0.5 hover:border-eco-green/30 hover:shadow-lg hover:shadow-eco-green/10 hover:bg-eco-green/5"
          >
            <span className="flex text-eco-green">{b.icon}</span>
            <span className="text-sm font-semibold text-text-muted">{b.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { step: '01', icon: <Upload size={24} />, title: 'Upload Your Data',
      desc: 'Upload invoices, fuel records, and energy bills — or connect systems directly via API.' },
    { step: '02', icon: <LineChart size={24} />, title: 'Calculate Emissions',
      desc: 'Our AI converts your data into certified Scope 1, 2 & 3 emissions using approved factors.' },
    { step: '03', icon: <FileCheck size={24} />, title: 'Get Reports & Act',
      desc: 'Receive audit-ready reports and actionable AI recommendations to reduce carbon risk.' },
  ];

  return (
    <section id="how-it-works" className="relative bg-beige-soft py-24 px-[5%] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-eco-green/20 to-transparent" />
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-eco-green/10 text-eco-green text-[11px] font-extrabold uppercase tracking-widest mb-5">
            Simple Process
          </span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-text-dark leading-tight tracking-tight mb-5">
            How CarbonSync Works
          </h2>
          <p className="text-base text-text-muted leading-relaxed">From raw business data to measurable impact in three simple steps.</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={s.step} className="group relative bg-white rounded-2xl p-8 text-center shadow-sm border border-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-eco-green/5 hover:border-eco-green/20 cursor-default">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-eco-green text-white text-xs font-extrabold flex items-center justify-center shadow-lg shadow-eco-green/30">
                {s.step}
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-eco-green/10 to-emerald-light/10 text-eco-green flex items-center justify-center mx-auto mb-5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-eco-green/20">
                {s.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-3">{s.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const pillars = [
  {
    icon: <BarChart3 size={28} />,
    title: 'Quantify Footprint',
    desc: 'Automate the ingestion of raw operational data to precisely map your <a href="/solutions/net-zero" class="text-eco-green font-semibold underline decoration-2 underline-offset-2 hover:text-emerald-400 transition-colors">full organizational emissions</a>. Our engine instantly categorizes activities across Scopes 1, 2, and 3 with audit-grade accuracy.',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Streamline Compliance',
    desc: 'Generate dynamic, <a href="/solutions/supply-chain" class="text-eco-green font-semibold underline decoration-2 underline-offset-2 hover:text-emerald-400 transition-colors">board-ready disclosures</a> in minutes. CarbonSync instantly aligns your raw metrics with evolving global mandates like CSRD and ISSB, ensuring you stay ahead of regulatory curves.',
  },
  {
    icon: <Activity size={28} />,
    title: 'Uncover Intelligence',
    desc: 'Move beyond static numbers with <a href="/solutions/net-zero" class="text-eco-green font-semibold underline decoration-2 underline-offset-2 hover:text-emerald-400 transition-colors">predictive carbon analytics</a>. Identify underlying inefficiencies in your supply chain and forecast the financial impact of your environmental risks in real-time.',
  },
  {
    icon: <Leaf size={28} />,
    title: 'Drive Net-Zero',
    desc: 'Transition from measurement to meaningful action. Deploy targeted <a href="/solutions/net-zero" class="text-eco-green font-semibold underline decoration-2 underline-offset-2 hover:text-emerald-400 transition-colors">carbon reduction initiatives</a> and model abatement scenarios to reach your climate goals faster and more cost-effectively.',
  },
];

function CorePillars() {
  return (
    <section id="benefits" className="relative overflow-hidden py-24 px-[5%] text-white">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1920" alt="" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/85 via-forest-deep/70 to-forest-deep/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(22,163,74,0.12),transparent_70%)]" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/80 text-[11px] font-extrabold uppercase tracking-widest mb-5">
            Core Pillars
          </span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-white leading-tight tracking-tight">
            A Complete Operating System for{' '}
            <span className="text-gradient-emerald">Sustainability</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <div key={p.title} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-eco-green/30 to-emerald-light/20 text-eco-green flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-eco-green/20">
                {p.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed" dangerouslySetInnerHTML={{ __html: p.desc }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  { title: 'Cost Efficiency', icon: <Zap size={28} />, desc: 'Reduce operational costs through optimized resource management and waste reduction across your entire value chain.' },
  { title: 'Regulatory Readiness', icon: <ShieldCheck size={28} />, desc: 'Stay ahead of global ESG mandates effortlessly with automated compliance updates across 40+ jurisdictions.' },
  { title: 'Brand Reputation', icon: <Award size={28} />, desc: 'Build trust with transparent, verifiable climate action and data-driven sustainability reporting.' },
  { title: 'Operational Agility', icon: <Activity size={28} />, desc: 'Make data-driven decisions faster with real-time carbon intelligence and predictive scenario modeling.' },
];

function ImpactBenefits() {
  return (
    <section className="relative bg-white py-24 px-[5%] overflow-hidden">
      <div className="section-divider absolute top-0 left-0" />
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-eco-green/10 text-eco-green text-[11px] font-extrabold uppercase tracking-widest mb-5">
            Value Delivered
          </span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-text-dark leading-tight tracking-tight mb-5">
            Impact & Benefits
          </h2>
          <p className="text-base text-text-muted leading-relaxed">Transforming sustainability into a measurable competitive advantage across your organization.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div key={b.title} className="group bg-white rounded-2xl border border-black/5 shadow-sm p-7 h-full flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-eco-green/5 hover:border-eco-green/20">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-eco-green/10 to-emerald-light/5 text-eco-green flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-eco-green/15">
                {b.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-2">{b.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  const [modalContent, setModalContent] = useState<{title: string, desc: string, features: string[], hasForm?: boolean} | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append('context', modalContent?.title || 'General');

    try {
      const response = await fetch('https://formspree.io/f/xojyggok', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => {
          setModalContent(null);
          setFormStatus('idle');
        }, 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const modalData: Record<string, {title: string, desc: string, features: string[], hasForm?: boolean}> = {
    'CarbonSync ESG': {
      title: 'CarbonSync ESG',
      desc: 'Our Enterprise ESG platform is built for modern compliance and risk management. With automated data pipelines, you can generate BRSR, CSRD, and GRI disclosures in a fraction of the time. Transform your supplier data into actionable risk intelligence.',
      features: ['Unified Data Hub', 'Audit-Ready Disclosures', 'Supplier Risk Scoring', 'Dynamic Materiality']
    },
    'CarbonSync Net-Zero': {
      title: 'CarbonSync Net-Zero',
      desc: 'Accelerate your decarbonization journey with real-time GHGP-aligned calculations. Our Net-Zero engine identifies emission hotspots across your value chain and uses AI to simulate the most cost-effective reduction pathways.',
      features: ['Real-time GHG Calculations', 'AI Reduction Pathways', 'Scope 3 Automation', 'Offset Integration']
    },
    'Strategic Ecosystem': {
      title: 'Strategic Ecosystem Partnerships',
      desc: 'CarbonSync integrates seamlessly with leading IoT providers, sensor networks, and sustainability advisory firms. Join our partner network to deliver end-to-end assurance and carbon finance solutions to enterprise clients.',
      features: ['IoT & API Integration', 'Advisory Networks', 'Assurance Support', 'Carbon Finance'],
      hasForm: true
    },
    'Bespoke Solutions': {
      title: 'Bespoke Enterprise Solutions',
      desc: 'Every enterprise has unique operational complexities. Our engineering team works directly with you to build custom metrics, specialized industry modules, and dedicated on-premise hooks for legacy systems.',
      features: ['Custom Metric Engines', 'Legacy System Hooks', 'Industry-Specific Logic', 'On-Premise Deployments'],
      hasForm: true
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="ecosystem" className="relative overflow-hidden py-24 px-[5%]">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1920" alt="" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/90 via-forest-deep/80 to-forest-deep/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(22,163,74,0.08),transparent_70%)]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1200px] mx-auto relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center max-w-[700px] mx-auto mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] font-extrabold uppercase tracking-widest mb-5">
            The Ecosystem
          </span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-white leading-tight tracking-tight">
            An Integrated ESG & Sustainability{' '}
            <span className="text-gradient-emerald">Platform</span>
          </h2>
          <p className="text-base text-white/70 leading-relaxed max-w-[640px] mx-auto mt-4">
            A comprehensive suite of modules designed to handle every stage of your sustainability journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden transition-all duration-500 hover:shadow-2xl">
            <div className="px-8 py-5 border-b border-gray-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-eco-green" />
              <span className="font-heading text-base font-bold text-text-dark">CarbonSync Core Modules</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {[
                { icon: <ShieldCheck size={20} />, title: 'CarbonSync ESG',
                  items: ['Unified ESG Data Hub', 'Multi-Framework Compliance (BRSR, CSRD, GRI)', 'Dynamic Materiality Assessment', 'Supplier Sustainability Scoring', 'Automated ESG Disclosure Generation', 'Enterprise Risk Intelligence'] },
                { icon: <Zap size={20} />, title: 'CarbonSync Net-Zero',
                  items: ['Real-time GHGP Aligned Calculations', 'Emissions Hotspot Identification', 'AI-Driven Decarbonization Pathways', 'Simulation Sandbox for Net-Zero', 'Automated Scope 3 Mapping', 'Carbon Credit & Offset Integration'] },
              ].map((product, i) => (
                <motion.div 
                  whileHover={{ scale: 1.01, backgroundColor: 'rgba(249, 250, 251, 1)' }}
                  key={product.title} 
                  className="border-r border-gray-100 last:border-r-0 h-full flex flex-col transition-all duration-300 relative group"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-eco-green to-emerald-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-eco-green/10 to-emerald-light/5 text-eco-green flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {product.icon}
                      </span>
                      <h3 className="font-heading text-sm font-bold text-text-dark">{product.title}</h3>
                    </div>
                    <ul className="p-6 flex-1 flex flex-col gap-3">
                      {product.items.map((item) => (
                        <li key={item} className="text-sm text-text-muted flex items-start gap-3 leading-relaxed group/item hover:text-text-dark transition-colors">
                          <span className="w-5 h-5 rounded-full bg-eco-green text-white flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                            <span className="text-[10px] font-bold">✓</span>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="px-6 py-4 border-t border-gray-100 mt-auto">
                      <button type="button" onClick={() => setModalContent(modalData[product.title])} className="text-sm font-bold text-eco-green no-underline flex items-center gap-1.5 transition-all hover:gap-2.5 group/link bg-transparent border-none cursor-pointer p-0">
                        Learn more <ArrowRight size={14} className="transition-all group-hover/link:translate-x-0.5" />
                      </button>
                    </div>
                  </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl overflow-hidden shadow-lg h-full transition-all duration-500 hover:bg-white/15 hover:border-white/25">
                <div className="px-6 py-5 border-b border-white/10">
                  <h3 className="font-heading text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-eco-green animate-pulse-soft" />
                    Add-ons & Ecosystem
                  </h3>
                </div>
                <div className="p-6 space-y-5">
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 rounded-xl p-5 border border-white/5 transition-all duration-300 hover:border-emerald-light/30 hover:bg-white/20 hover:shadow-lg"
                  >
                    <h4 className="font-heading text-sm font-bold text-white mb-4 flex items-center gap-2.5">
                      <Globe2 size={16} className="text-emerald-light" />
                      Strategic Ecosystem
                    </h4>
                    <ul className="space-y-3">
                      {['IoT & Sensor Integration', 'Sustainability Advisory', 'Carbon Finance Networking', 'Third-Party Assurance Support'].map((item) => (
                        <li key={item} className="text-sm text-white/80 flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-light/70 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 pt-4 border-t border-white/10">
                      <button type="button" onClick={() => setModalContent(modalData['Strategic Ecosystem'])} className="text-sm font-bold text-emerald-light no-underline flex items-center gap-1.5 transition-all hover:gap-2.5 group/link bg-transparent border-none cursor-pointer p-0">
                        Explore Partnerships <ArrowRight size={14} className="transition-all group-hover/link:translate-x-0.5" />
                      </button>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 rounded-xl p-5 border border-white/5 transition-all duration-300 hover:border-emerald-light/30 hover:bg-white/20 hover:shadow-lg"
                  >
                    <h4 className="font-heading text-sm font-bold text-white mb-4 flex items-center gap-2.5">
                      <Zap size={16} className="text-emerald-light" />
                      Bespoke Solutions
                    </h4>
                    <ul className="space-y-3">
                      {['Custom Metric Development', 'Dedicated On-Premise Support', 'Specialized Industry Modules', 'API & Legacy System Hooks'].map((item) => (
                        <li key={item} className="text-sm text-white/80 flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-light/70 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 pt-4 border-t border-white/10">
                      <button type="button" onClick={() => setModalContent(modalData['Bespoke Solutions'])} className="text-sm font-bold text-emerald-light no-underline flex items-center gap-1.5 transition-all hover:gap-2.5 group/link bg-transparent border-none cursor-pointer p-0">
                        Request Customization <ArrowRight size={14} className="transition-all group-hover/link:translate-x-0.5" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
          </div>
        </div>
      </motion.div>

      {modalContent && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setModalContent(null)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden p-8"
          >
            <button 
              onClick={() => { setModalContent(null); setFormStatus('idle'); }}
              className="absolute top-6 right-6 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            {formStatus === 'success' ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-500">Our team will contact you shortly.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold text-slate-900 mb-3">{modalContent.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {modalContent.desc}
                  </p>
                </div>

                {!modalContent.hasForm && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Key Features</h4>
                    <ul className="space-y-3">
                      {modalContent.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                          <CheckCircle className="w-4 h-4 text-eco-green flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {modalContent.hasForm ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4 mt-6 border-t border-slate-100 pt-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Work Email</label>
                      <input required type="email" name="email" id="email" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-eco-green transition-shadow text-sm text-slate-900" placeholder="name@company.com" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
                      <textarea required name="message" id="message" rows={2} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-eco-green transition-shadow text-sm text-slate-900 resize-none" placeholder="How can we help?" />
                    </div>
                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-eco-green hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-eco-green/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formStatus === 'submitting' ? 'Sending...' : formStatus === 'error' ? 'Error, Try Again' : 'Submit Request'}
                    </button>
                  </form>
                ) : (
                  <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                    <button onClick={() => setModalContent(null)} className="px-6 py-2.5 bg-eco-green hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-eco-green/20">
                      Got it
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}

function MetricCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-black/5 p-4 shadow-sm flex items-center gap-3 transition-all duration-300 hover:shadow-md hover:border-eco-green/20 hover:-translate-y-0.5">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium text-text-muted truncate">{label}</div>
        <div className="text-lg font-extrabold text-text-dark leading-tight">{value}</div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <section className="relative bg-white py-24 px-[5%]">
      <div className="section-divider absolute top-0 left-0" />
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-eco-green/10 text-eco-green text-[11px] font-extrabold uppercase tracking-widest mb-5">
            Platform Preview
          </span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-text-dark leading-tight tracking-tight mb-5">
            Smart Monitoring &{' '}
            <span className="text-gradient-emerald">Automation</span>
          </h2>
          <p className="text-base text-text-muted leading-relaxed mb-6">
            Experience the most advanced sustainability dashboard. Integrate operational data seamlessly and watch as AI translates it into actionable carbon metrics.
          </p>
          <ul className="flex flex-col gap-4">
            {['Automated Data Ingestion', 'Predictive Emission Modeling', 'Scenario Analysis Tools', 'Custom Compliance Reports'].map((item) => (
              <li key={item} className="flex items-center gap-3 font-semibold text-text-dark text-sm">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-eco-green to-emerald-light flex items-center justify-center flex-shrink-0 shadow-sm shadow-eco-green/30">
                  <CheckCircle size={14} color="#fff" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
            <div className="rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-black/5 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
              <div className="bg-[#1a3a28] px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-white/10 rounded-md px-3 py-1.5 text-xs text-white/50 text-center">app.carbonsync.io/dashboard</div>
                </div>
                <div className="flex items-center gap-1.5 bg-eco-green/20 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-eco-green animate-pulse" />
                  <span className="text-[10px] font-bold text-eco-green">Live</span>
                </div>
              </div>
              <div className="bg-[#f8f9f5] p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-text-dark">Carbon Overview</div>
                    <div className="text-[11px] text-text-muted">Last updated 2h ago</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <MetricCard icon={<TrendingDown size={18} />} label="Total Emissions" value="12.4k tCO₂e" color="#16a34a" />
                  <MetricCard icon={<Leaf size={18} />} label="Offset This Year" value="3.2k tCO₂e" color="#0d9488" />
                  <MetricCard icon={<BarChart3 size={18} />} label="Scope 1 & 2" value="6.8k tCO₂e" color="#22c55e" />
                  <MetricCard icon={<Activity size={18} />} label="Reduction vs LY" value="18.3%" color="#16a34a" />
                </div>
                <div className="bg-white rounded-xl border border-black/5 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-text-dark">Monthly Trend</span>
                    <span className="text-[10px] text-eco-green font-bold bg-eco-green/10 rounded-full px-2 py-0.5">+8.2% efficiency</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-[60px]">
                    {[35, 50, 42, 65, 48, 55, 70, 62, 78, 68, 82, 75].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t relative group cursor-pointer">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1a3a28] text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">{h}%</div>
                        <div className="w-full rounded-t transition-all duration-300 hover:opacity-80" style={{ height: `${h}%`, background: h > 60 ? 'linear-gradient(to top, #16a34a, #22c55e)' : 'rgba(22,163,74,0.2)', borderRadius: h > 0 ? '4px 4px 0 0' : 0 }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m, i) => (
                      <span key={i} className="text-[9px] font-semibold text-text-muted">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-eco-green/8 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-light/8 rounded-full blur-3xl -z-10" />
          </div>
      </div>
    </section>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative bg-beige-soft py-24 px-[5%]">
      <div className="section-divider absolute top-0 left-0" />
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-eco-green/10 text-eco-green text-[11px] font-extrabold uppercase tracking-widest mb-5">
            FAQ
          </span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-text-dark">Common Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isOpen ? 'shadow-lg border-eco-green/20' : 'shadow-sm border-black/5 hover:border-eco-green/10 hover:shadow-md'
                }`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <div className="p-5 md:p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4 items-start">
                      <div className={`flex-shrink-0 mt-0.5 p-2 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen ? 'bg-eco-green text-white' : 'bg-eco-green/10 text-eco-green'
                      }`}>
                        <HelpCircle size={18} strokeWidth={2.5} />
                      </div>
                      <div className="font-heading font-bold text-sm md:text-base text-text-dark leading-relaxed pt-1">
                        {faq.q}
                      </div>
                    </div>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-eco-green text-white rotate-180' : 'bg-eco-green/10 text-eco-green'
                    }`}>
                      <ChevronDown size={18} />
                    </div>
                  </div>
                  <div className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                  }`}>
                    <div className="overflow-hidden">
                      <div className="text-sm text-text-muted leading-relaxed pl-14">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="font-body text-text-dark bg-beige-soft overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ImpactStrip />
      <TrustedMarquee />
      <HowItWorks />
      <CorePillars />
      <ImpactBenefits />
      <Suspense fallback={<div className="h-[600px] bg-white animate-pulse" />}>
        <Analytics />
      </Suspense>
      <Ecosystem />
      <DashboardPreview />
      <Faq />
    </div>
  );
}
