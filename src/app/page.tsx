'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import {
  ArrowRight, Upload, LineChart, FileCheck, Zap, ShieldCheck, Award, Activity,
  TrendingDown, Leaf, BarChart3, Globe2, HelpCircle, ChevronDown, Send,
  CheckCircle, Users, Layers, Database,
} from 'lucide-react';
import { faqs } from '@/data/faqs';
import { testimonials } from '@/data/testimonials';

const Analytics = dynamic(() => import('@/components/AnalyticsSection').then(m => ({ default: m.Analytics })), { ssr: false });

function HeroSection() {
  const heroBgY = 0;
  const heroOpacity = 1;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-[-15%] z-0 will-change-transform">
        <img src="/hero_forest.webp" alt="" className="w-full h-full object-cover" style={{ filter: 'hue-rotate(45deg) saturate(1.2)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-forest-deep/50 to-forest-deep/80" />
      </div>

      <div className="relative z-10 text-center max-w-[900px] px-[5%]">
        <div>
          <span className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold tracking-widest uppercase mb-6">
            Intelligence for a Greener Future
          </span>
          <h1 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-white leading-[1.08] tracking-tight mb-4">
            Powering a <span className="text-eco-green">Greener Future</span> with Intelligent Insights
          </h1>
          <div className="inline-block bg-gradient-to-r from-eco-green to-eco-hover text-white px-6 py-2 rounded-lg font-heading font-extrabold tracking-wide mb-4 shadow-lg shadow-eco-green/40">
            FROM CARBON ACCOUNTING TO OFFSETTING ALL AT ONE PLATFORM
          </div>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-white/75 leading-relaxed max-w-[650px] mx-auto mb-6">
            AI-driven sustainability analytics and carbon accounting platform for the modern enterprise.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 max-sm:flex-col max-sm:items-stretch">
            <button className="bg-eco-green text-white border-none rounded-full font-bold text-base px-9 py-4 cursor-pointer inline-flex items-center gap-2 transition-all hover:bg-eco-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-eco-green/35 active:scale-95">
              Get Started <ArrowRight size={18} />
            </button>
            <div className="hidden md:flex items-center justify-center">
              <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1.5">
                <div className="w-[2.5px] h-1.5 bg-white/70 rounded-full" />
              </div>
            </div>
            <button className="bg-white/12 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-base px-9 py-4 cursor-pointer inline-flex items-center gap-2 transition-all hover:bg-white/20 hover:-translate-y-0.5">
              Explore Dashboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="bg-white py-[60px] px-[5%]"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 max-md:gap-6 items-center">
        <div>
          <span className="block text-xs font-extrabold uppercase tracking-widest text-eco-green mb-3">
            Our Mission
          </span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-text-dark leading-tight tracking-tight mb-4">
            Transforming Sustainability into a Competitive Advantage
          </h2>
          <p className="text-base text-text-muted leading-relaxed mb-4">
            At CarbonSync, sustainability isn't a burden — it's an opportunity. Our platform simplifies the complex landscape of carbon accounting, enabling organizations to measure, report, and reduce their environmental footprint with unparalleled precision.
          </p>
          <p className="text-base text-text-muted leading-relaxed mb-3">
            Founded on principles of transparency and innovation, we empower businesses to turn ESG compliance into strategic value creation.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div>
              <div className="font-heading text-[1.75rem] font-extrabold text-text-dark mb-1">100%</div>
              <div className="text-xs font-bold uppercase tracking-widest text-text-muted">Audit Ready</div>
            </div>
            <div>
              <div className="font-heading text-[1.75rem] font-extrabold text-text-dark mb-1">AI-Powered</div>
              <div className="text-xs font-bold uppercase tracking-widest text-text-muted">Reduction Insights</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-[-16px] bg-eco-green/10 rounded-[20px] -rotate-3" />
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
            alt="Sustainable Technology"
            className="relative w-full rounded-[20px] shadow-[0_30px_60px_rgba(0,0,0,0.12)] z-10"
          />
        </div>
      </div>
    </section>
  );
}

function ImpactStrip() {
  return (
    <section className="bg-forest-mid py-[40px] px-[5%] border-t border-b border-white/10">
      <div className="max-w-[1200px] mx-auto flex justify-around items-center text-center flex-wrap gap-8">
        {[
          { val: '50%', lbl: 'Faster ESG Reporting' },
          { val: '1000+', lbl: 'Curated ESG KPIs' },
          { val: 'Unlimited', lbl: 'Collaborator Access' },
        ].map((item, i) => (
          <div
            key={item.lbl}
            className="flex flex-col gap-2"
          >
            <span className="font-heading text-4xl font-extrabold text-eco-green">{item.val}</span>
            <span className="text-base font-semibold text-white/70 uppercase tracking-wide">{item.lbl}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const badges = [
  { icon: <Award size={22} />, label: 'SOC 2 Certified' },
  { icon: <ShieldCheck size={22} />, label: 'GDPR Compliant' },
  { icon: <FileCheck size={22} />, label: 'BRSR Aligned' },
  { icon: <CheckCircle size={22} />, label: 'CSRD Ready' },
  { icon: <Globe2 size={22} />, label: 'GHG Protocol' },
  { icon: <Users size={22} />, label: '500+ Enterprises' },
  { icon: <Layers size={22} />, label: 'ISO 14001' },
  { icon: <Database size={22} />, label: 'ISSB Standards' },
  { icon: <ShieldCheck size={22} />, label: 'SEC Climate' },
  { icon: <Award size={22} />, label: 'SBTi Verified' },
];

function TrustedMarquee() {
  return (
    <section className="overflow-hidden bg-white py-[40px]">
      <div className="mx-auto mb-4 max-w-[1200px] px-[5%] text-center">
        <span className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-eco-green">
          Trusted & Certified
        </span>
        <h2 className="font-heading text-[1.3rem] font-extrabold text-text-dark">CarbonSync is trusted by</h2>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-[2] w-[120px] bg-gradient-to-r from-white to-transparent max-md:w-10" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-[2] w-[120px] bg-gradient-to-l from-white to-transparent max-md:w-10" />
        <div className="flex w-max animate-marquee-scroll">
          {[...Array(2)].map((_, setIdx) => (
            <div className="flex flex-shrink-0 gap-9 pr-9 max-md:gap-5 max-md:pr-5" key={setIdx} aria-hidden={setIdx === 1}>
              {badges.map((b, i) => (
                <div key={`${setIdx}-${i}`}
                     className="flex cursor-default items-center gap-2.5 rounded-full border border-eco-green/10 bg-beige-soft px-6 py-3 whitespace-nowrap transition-all hover:-translate-y-0.5 hover:border-eco-green/30 hover:bg-eco-green/5 hover:shadow-md hover:shadow-eco-green/10">
                  <span className="flex text-eco-green opacity-70">{b.icon}</span>
                  <span className="text-sm font-medium text-text-muted">{b.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { step: '01', icon: <Upload size={28} />, title: 'Upload Your Data',
      desc: 'Upload invoices, fuel records, and energy bills — or connect systems directly via API.' },
    { step: '02', icon: <LineChart size={28} />, title: 'Calculate Emissions',
      desc: 'Our AI converts your data into certified Scope 1, 2 & 3 emissions using approved factors.' },
    { step: '03', icon: <FileCheck size={28} />, title: 'Get Reports & Act',
      desc: 'Receive audit-ready reports and actionable AI recommendations to reduce carbon risk.' },
  ];

  return (
    <section id="how-it-works" className="bg-beige-soft py-[60px] px-[5%]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[700px] mx-auto mb-8">
          <span className="block text-xs font-extrabold uppercase tracking-widest text-eco-green mb-4">Simple Process</span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-text-dark leading-tight tracking-tight mb-5">
            How CarbonSync Works
          </h2>
          <p className="text-base text-text-muted leading-relaxed">From raw business data to measurable impact in three steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="bg-white border border-forest-mid/5 rounded-2xl p-6 text-center shadow-lg shadow-black/5 transition-all hover:-translate-y-1 hover:shadow-xl cursor-default"
            >
              <div className="font-heading text-4xl font-extrabold text-eco-green/25 leading-none mb-1">{s.step}</div>
              <div className="text-eco-green mb-3">{s.icon}</div>
              <h3 className="font-heading text-base font-bold text-text-dark mb-2">{s.title}</h3>
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
    title: 'Quantify Footprint',
    desc: 'Automate the ingestion of raw operational data to precisely map your <span class="text-eco-green font-semibold">full organizational emissions</span>. Our engine instantly categorizes activities across Scopes 1, 2, and 3 with audit-grade accuracy.',
  },
  {
    title: 'Streamline Compliance',
    desc: 'Generate dynamic, <span class="text-eco-green font-semibold">board-ready disclosures</span> in minutes. CarbonSync instantly aligns your raw metrics with evolving global mandates like CSRD and ISSB, ensuring you stay ahead of regulatory curves.',
  },
  {
    title: 'Uncover Intelligence',
    desc: 'Move beyond static numbers with <span class="text-eco-green font-semibold">predictive carbon analytics</span>. Identify underlying inefficiencies in your supply chain and forecast the financial impact of your environmental risks in real-time.',
  },
  {
    title: 'Drive Net-Zero',
    desc: 'Transition from measurement to meaningful action. Deploy targeted <span class="text-eco-green font-semibold">carbon reduction initiatives</span> and model abatement scenarios to reach your climate goals faster and more cost-effectively.',
  },
];

function CorePillars() {
  return (
    <section id="benefits" className="relative overflow-hidden py-[60px] px-[5%] text-white">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1920" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 to-forest-deep/75" />
      </div>
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center max-w-[700px] mx-auto mb-8">
          <span className="block text-xs font-extrabold uppercase tracking-widest text-white/60 mb-4">Core Pillars</span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-white leading-tight tracking-tight">
            A Complete Operating System for Sustainability
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="font-heading text-[1.2rem] font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: p.desc }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  { title: 'Cost Efficiency', icon: <Zap size={32} />, desc: 'Reduce operational costs through optimized resource management.' },
  { title: 'Regulatory Readiness', icon: <ShieldCheck size={32} />, desc: 'Stay ahead of global ESG mandates effortlessly.' },
  { title: 'Brand Reputation', icon: <Award size={32} />, desc: 'Build trust with transparent, verifiable climate action.' },
  { title: 'Operational Agility', icon: <Activity size={32} />, desc: 'Make data-driven decisions faster.' },
];

function ImpactBenefits() {
  return (
    <section className="bg-beige-soft py-[60px] px-[5%]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[700px] mx-auto mb-8">
          <span className="block text-xs font-extrabold uppercase tracking-widest text-eco-green mb-4">Value Delivered</span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-text-dark leading-tight tracking-tight mb-5">
            Impact & Benefits
          </h2>
          <p className="text-base text-text-muted leading-relaxed">
            Transforming sustainability into a measurable competitive advantage.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="bg-white rounded-2xl border border-forest-mid/5 shadow-sm p-5 h-full flex flex-col items-center text-center cursor-pointer transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-eco-green/10 text-eco-green flex items-center justify-center mb-3">
                {b.icon}
              </div>
              <h3 className="font-heading text-[1.1rem] font-bold text-text-dark mb-1">{b.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed m-0">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section id="ecosystem" className="relative overflow-hidden py-[60px] px-[5%] text-white">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1920" alt="Dense Forest" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 to-forest-deep/75" />
      </div>
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center max-w-[700px] mx-auto mb-8">
          <span className="block text-xs font-extrabold uppercase tracking-widest text-white/60 mb-4">The Ecosystem</span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-white leading-tight tracking-tight">
            An Integrated ESG & Sustainability Platform
          </h2>
          <p className="text-base text-white/70 leading-relaxed">
            A comprehensive suite of modules designed to handle every stage of your sustainability journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="font-heading text-base font-bold text-text-dark mb-6">CarbonSync Core Modules</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <ShieldCheck size={20} />, title: 'CarbonSync ESG',
                  items: ['Unified ESG Data Hub', 'Multi-Framework Compliance (BRSR, CSRD, GRI)', 'Dynamic Materiality Assessment', 'Supplier Sustainability Scoring', 'Automated ESG Disclosure Generation', 'Enterprise Risk Intelligence'] },
                { icon: <Zap size={20} />, title: 'CarbonSync Net-Zero',
                  items: ['Real-time GHGP Aligned Calculations', 'Emissions Hotspot Identification', 'AI-Driven Decarbonization Pathways', 'Simulation Sandbox for Net-Zero', 'Automated Scope 3 Mapping', 'Carbon Credit & Offset Integration'] },
              ].map((product) => (
                <div key={product.title} className="bg-white rounded-xl border border-black/5 overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="bg-[#f1f8e9] px-5 py-4 border-b border-black/5 flex items-center gap-3">
                    <span className="text-eco-green">{product.icon}</span>
                    <h3 className="font-heading text-base font-bold text-text-dark">{product.title}</h3>
                  </div>
                  <ul className="p-5 flex-1 flex flex-col gap-2.5">
                    {product.items.map((item) => (
                      <li key={item} className="text-sm text-text-muted flex items-center gap-2.5 before:content-['✓'] before:text-eco-green before:text-xs">{item}</li>
                    ))}
                  </ul>
                  <div className="px-5 py-3 border-t border-black/5">
                    <a href="#" className="text-sm font-bold text-eco-green no-underline flex items-center gap-1.5 transition-all hover:gap-2.5">
                      Learn more <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#f1f8e9] rounded-2xl p-6 shadow-sm">
              <div className="font-heading text-base font-bold text-text-dark mb-4">Add ons</div>
              <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
                <h4 className="font-heading text-sm font-bold text-text-dark mb-3">Strategic Ecosystem</h4>
                <ul className="flex flex-col gap-2.5">
                  {['IoT & Sensor Integration', 'Sustainability Advisory', 'Carbon Finance Networking', 'Third-Party Assurance Support'].map((item) => (
                    <li key={item} className="text-sm text-text-muted flex items-center gap-2.5 before:content-['✓'] before:text-eco-green before:text-xs">{item}</li>
                  ))}
                </ul>
                <div className="mt-3">
                  <a href="#" className="text-sm font-bold text-eco-green no-underline flex items-center gap-1.5 transition-all hover:gap-2.5">
                    Explore Partnerships <ArrowRight size={14} />
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h4 className="font-heading text-sm font-bold text-text-dark mb-3">Bespoke Solutions</h4>
                <ul className="flex flex-col gap-2.5">
                  {['Custom Metric Development', 'Dedicated On-Premise Support', 'Specialized Industry Modules', 'API & Legacy System Hooks'].map((item) => (
                    <li key={item} className="text-sm text-text-muted flex items-center gap-2.5 before:content-['✓'] before:text-eco-green before:text-xs">{item}</li>
                  ))}
                </ul>
                <div className="mt-3">
                  <a href="#" className="text-sm font-bold text-eco-green no-underline flex items-center gap-1.5 transition-all hover:gap-2.5">
                    Request Customization <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-black/5 p-4 shadow-sm flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`} style={{ background: `${color}15` }}>
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
    <section className="bg-white py-[60px] px-[5%]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="block text-xs font-extrabold uppercase tracking-widest text-eco-green mb-3">Platform Preview</span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-text-dark leading-tight tracking-tight mb-4">
            Smart Monitoring & Automation
          </h2>
          <p className="text-base text-text-muted leading-relaxed mb-4">
            Experience the most advanced sustainability dashboard. Integrate operational data seamlessly and watch as AI translates it into actionable carbon metrics.
          </p>
          <ul className="flex flex-col gap-3 mt-6">
            {['Automated Data Ingestion', 'Predictive Emission Modeling', 'Scenario Analysis Tools', 'Custom Compliance Reports'].map((item) => (
              <li key={item} className="flex items-center gap-3 font-semibold text-text-dark text-sm">
                <div className="w-6 h-6 rounded-full bg-eco-green flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={14} color="#fff" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-black/5">
            <div className="bg-[#1a3a28] px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 mx-3">
                <div className="bg-white/10 rounded-md px-3 py-1.5 text-xs text-white/50 text-center">app.carbonsync.io/dashboard</div>
              </div>
            </div>
            <div className="bg-[#f8f9f5] p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-text-dark">Carbon Overview</div>
                  <div className="text-[11px] text-text-muted">Last updated 2h ago</div>
                </div>
                <div className="flex items-center gap-1.5 bg-eco-green/10 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-eco-green animate-pulse" />
                  <span className="text-[11px] font-bold text-eco-green">Live</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <MetricCard icon={<TrendingDown size={18} />} label="Total Emissions" value="12.4k tCO₂e" color="#4caf50" />
                <MetricCard icon={<Leaf size={18} />} label="Offset This Year" value="3.2k tCO₂e" color="#00bcd4" />
                <MetricCard icon={<BarChart3 size={18} />} label="Scope 1 & 2" value="6.8k tCO₂e" color="#66bb6a" />
                <MetricCard icon={<Activity size={18} />} label="Reduction vs LY" value="18.3%" color="#4caf50" />
              </div>
              <div className="bg-white rounded-xl border border-black/5 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-text-dark">Monthly Trend</span>
                  <span className="text-[10px] text-eco-green font-bold">+8.2% efficiency</span>
                </div>
                <div className="flex items-end gap-1.5 h-[60px]">
                  {[35, 50, 42, 65, 48, 55, 70, 62, 78, 68, 82, 75].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t relative group cursor-pointer">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1a3a28] text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">{h}%</div>
                      <div className="w-full rounded-t transition-all hover:opacity-80" style={{ height: `${h}%`, background: i > 6 ? '#4caf50' : 'rgba(76,175,80,0.25)' }} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1.5">
                  {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m, i) => (
                    <span key={i} className="text-[9px] font-medium text-text-muted">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-eco-green/10 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="bg-beige-soft py-[60px] px-[5%]">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center max-w-[700px] mx-auto mb-8">
          <span className="block text-xs font-extrabold uppercase tracking-widest text-eco-green mb-4">Testimonials</span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-text-dark">What our customers say</h2>
        </div>

        <div className="bg-white rounded-2xl p-8 max-md:p-6 text-center shadow-lg shadow-forest-mid/5 mb-8 relative">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[5rem] font-heading text-eco-green/20 leading-none pointer-events-none">&quot;</div>
          <div className="text-base leading-relaxed text-text-dark font-medium mb-6 relative z-10">
            {testimonials[activeTestimonial].quote}
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-bold text-text-dark">{testimonials[activeTestimonial].name}</span>
            <span className="text-sm text-text-muted">{testimonials[activeTestimonial].position}</span>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              className="w-12 h-12 rounded-full bg-forest-deep text-white flex items-center justify-center cursor-pointer border-none transition-all hover:bg-eco-green hover:scale-105"
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full border-none transition-all cursor-pointer ${
                    i === activeTestimonial ? 'bg-eco-green scale-110' : 'bg-forest-mid/10'
                  }`}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              className="w-12 h-12 rounded-full bg-forest-deep text-white flex items-center justify-center cursor-pointer border-none transition-all hover:bg-eco-green hover:scale-105"
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SustainabilityCta() {
  return (
    <section className="relative overflow-hidden py-[60px] px-[5%] text-white">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1920" alt="Forest Path" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 to-forest-deep/75" />
      </div>
      <div className="max-w-[900px] mx-auto text-center relative z-10">
        <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-white leading-tight tracking-tight mb-3">
          Ready to Start Your Sustainability Journey?
        </h2>
        <p className="text-base text-white/70 leading-relaxed max-w-[700px] mx-auto mb-6">
          Join hundreds of forward-thinking companies using CarbonSync to drive real environmental change.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-eco-green text-white border-none rounded-full font-bold text-base px-9 py-4 cursor-pointer inline-flex items-center gap-2 transition-all hover:bg-eco-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-eco-green/35 active:scale-95">
            Get Started Now
          </button>
          <button className="bg-white/12 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-base px-9 py-4 cursor-pointer inline-flex items-center gap-2 transition-all hover:bg-white/20 hover:-translate-y-0.5">
            Request a Demo
          </button>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-beige-soft py-[60px] px-[5%]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[700px] mx-auto mb-8">
          <span className="block text-xs font-extrabold uppercase tracking-widest text-eco-green mb-4">FAQ</span>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-text-dark">Common Questions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-black/5 transition-all cursor-pointer h-full ${
                  isOpen ? 'shadow-md border-eco-green/20' : ''
                }`}
                onMouseEnter={() => setOpenFaqIndex(i)}
                onMouseLeave={() => setOpenFaqIndex(null)}
                onClick={() => setOpenFaqIndex(isOpen ? null : i)}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-0.5 text-eco-green bg-eco-green/10 p-1 rounded-full flex items-center justify-center">
                      <HelpCircle size={20} strokeWidth={2.5} />
                    </div>
                    <div className="font-heading font-bold text-sm md:text-base text-text-dark leading-relaxed">
                      {faq.q}
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-eco-green/10 flex items-center justify-center">
                    <ChevronDown size={20} color="#4caf50" />
                  </div>
                </div>
                {isOpen && (
                  <div>
                    <div className="text-sm text-text-muted leading-relaxed pt-4 pl-14">
                      {faq.a}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section id="contact-forms" className="bg-[#10141a] py-8 px-[5%]">
      <div className="max-w-[1200px] mx-auto flex justify-center items-center gap-6 max-md:flex-col max-md:text-center max-md:gap-4">
        <h2 className="font-heading text-[1.6rem] font-medium text-white m-0 leading-relaxed">
          Ready to take meaningful action on your<br />
          <span className="text-eco-green font-semibold">ESG</span> journey?
        </h2>
        <button className="bg-eco-green text-white border-none rounded-full font-bold text-base px-9 py-4 cursor-pointer inline-flex items-center gap-2 transition-all hover:bg-eco-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-eco-green/35 active:scale-95 flex-shrink-0">
          Contact us <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="relative overflow-hidden py-[60px] px-[5%] text-white">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1920" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 to-forest-deep/75" />
      </div>
      <div className="max-w-[700px] mx-auto text-center relative z-10">
        <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-white mb-4">
          Stay Ahead on Sustainability
        </h2>
        <p className="text-base text-white/70 leading-relaxed max-w-[600px] mx-auto mb-6">
          Get weekly insights on carbon regulations, ESG trends, and platform updates.
        </p>
        <form className="flex justify-center gap-3 max-w-[520px] mx-auto max-sm:flex-col"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your work email"
            required
            className="flex-1 px-5 py-3.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-body text-base outline-none transition-all placeholder:text-white/50 focus:border-eco-green focus:shadow-[0_0_0_4px_rgba(76,175,80,0.2)]"
          />
          <button type="submit" className="bg-eco-green text-white border-none rounded-full font-bold text-base px-7 py-3.5 cursor-pointer inline-flex items-center gap-2 transition-all hover:bg-eco-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-eco-green/35 active:scale-95 whitespace-nowrap">
            <Send size={18} /> Subscribe
          </button>
        </form>
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
      <Testimonials />
      <SustainabilityCta />
      <Faq />
      <ContactCta />
      <Newsletter />
    </div>
  );
}
