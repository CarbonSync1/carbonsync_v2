import React, { useState, useEffect } from 'react';

import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import {
  TrendingUp, TrendingDown, Leaf, BarChart3, Globe2,
  AlertTriangle, CheckCircle2, Target, Zap, ShieldCheck,
  BookOpen, FileText, Download, ArrowRight, Sparkles,
  Users, Factory, Building2, Truck, Cloud, LineChart as LineChartIcon,
  PieChart as PieChartIcon, Activity, Scale, TreePine, Droplets
} from 'lucide-react';

type StatCard = { label: string; value: string; icon: React.ElementType; color?: string };
type KpiCard = { label: string; value: string; change: string; positive: boolean };
type ChartData = { label: string; value: number; color: string };

function AnimatedCounter({ target, duration = 1500, prefix = '', suffix = '' }: { target: string; duration?: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const numStr = target.replace(/[^0-9.]/g, '');
    const targetNum = parseFloat(numStr);
    if (isNaN(targetNum)) {
      setDisplay(target);
      return;
    }
    const isPercentage = target.includes('%');
    const isCurrency = target.includes('$');
    let frame: number;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const current = start + (targetNum - start) * eased;
      let formatted = current.toFixed(targetNum % 1 === 0 ? 0 : 1);
      if (isPercentage) formatted += '%';
      if (isCurrency) formatted = prefix + formatted;
      if (!isCurrency && !isPercentage) formatted = prefix + formatted + suffix;
      setDisplay(formatted);
      if (elapsed < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, prefix, suffix]);

  return <>{display}</>;
}

function StatCards({ items }: { items: StatCard[] }) {
  return (
    <div className="detail-stats-grid">
      {items.map((s, i) => (
        <div
          key={s.label} className="detail-stat-card"
        >
          <div className="ds-icon" style={{ background: s.color ? `${s.color}15` : undefined, color: s.color }}>
            <s.icon size={22} />
          </div>
          <div>
            <strong><AnimatedCounter target={s.value} /></strong>
            <span>{s.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function KpiRow({ items }: { items: KpiCard[] }) {
  return (
    <div className="detail-kpi-row">
      {items.map((k) => (
        <div key={k.label} className="detail-kpi">
          <span className="dk-label">{k.label}</span>
          <span className="dk-value">{k.value}</span>
          <span className={`dk-change ${k.positive ? 'up' : 'down'}`}>
            {k.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {k.change}
          </span>
        </div>
      ))}
    </div>
  );
}

function SimpleBarChart({ data, title }: { data: ChartData[]; title?: string }) {
  return (
    <div className="detail-chart-card">
      {title && <h4 className="chart-title">{title}</h4>}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#64748b' }} />
          <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
          <Tooltip
            contentStyle={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              fontSize: 13,
              color: '#0f172a'
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function SimpleLineChart({ data, title, xKey = 'label', yKey = 'value' }: { data: any[]; title?: string; xKey?: string; yKey?: string }) {
  return (
    <div className="detail-chart-card">
      {title && <h4 className="chart-title">{title}</h4>}
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: '#64748b' }} />
          <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
          <Tooltip
            contentStyle={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              fontSize: 13,
              color: '#0f172a'
            }}
          />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke="#059669"
            strokeWidth={3}
            dot={{ fill: '#059669', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function SimpleAreaChart({ data, title, xKey = 'label', yKey = 'value' }: { data: any[]; title?: string; xKey?: string; yKey?: string }) {
  return (
    <div className="detail-chart-card">
      {title && <h4 className="chart-title">{title}</h4>}
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: '#64748b' }} />
          <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
          <Tooltip
            contentStyle={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              fontSize: 13,
              color: '#0f172a'
            }}
          />
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#059669" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey={yKey}
            stroke="#059669"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function SimplePieChart({ data, title }: { data: { name: string; value: number; color: string }[]; title?: string }) {
  return (
    <div className="detail-chart-card">
      {title && <h4 className="chart-title">{title}</h4>}
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              fontSize: 13,
              color: '#0f172a'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="detail-table-wrap">
      <table className="detail-table">
        <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Timeline({ items }: { items: { year: string; title: string; desc: string }[] }) {
  return (
    <div className="detail-timeline">
      {items.map((t, i) => (
        <div key={t.year} className="tl-item"
        >
          <div className="tl-dot" />
          <div className="tl-content">
            <span className="tl-year">{t.year}</span>
            <strong>{t.title}</strong>
            <p>{t.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CTAs({ onDownload }: { onDownload?: () => void }) {
  const [submitted, setSubmitted] = useState<'assessment' | 'expert' | null>(null);
  if (submitted) {
    return (
      <div className="detail-cta-success">
        <CheckCircle2 size={40} />
        <h4>Message Sent Successfully!</h4>
        <p>Thank you for reaching out. Our team will get back to you shortly.</p>
        <button className="cta-ghost" onClick={() => setSubmitted(null)}>
          Send another message
        </button>
      </div>
    );
  }
  return (
    <div className="detail-cta-row">
      <button className="cta-primary" onClick={onDownload}>
        <Download size={18} /> Download Whitepaper
      </button>
      <button className="cta-secondary" onClick={() => setSubmitted('assessment')}>
        <BarChart3 size={18} /> Book Carbon Assessment
      </button>
      <button className="cta-accent" onClick={() => setSubmitted('expert')}>
        <Users size={18} /> Talk to CarbonSync Expert
      </button>
    </div>
  );
}

function FlowDiagram({ steps }: { steps: { label: string; sub: string }[] }) {
  return (
    <div className="detail-flow">
      {steps.map((s, i) => (
        <React.Fragment key={s.label}>
          <div className="flow-node">
            <div className="flow-num">{i + 1}</div>
            <strong>{s.label}</strong>
            <span>{s.sub}</span>
          </div>
          {i < steps.length - 1 && <ArrowRight size={20} className="flow-arrow" />}
        </React.Fragment>
      ))}
    </div>
  );
}

const heroImages: Record<string, string> = {
  'The Growing Importance of Biodiversity Metrics': '/resources-assets/img4.webp',
  'Navigating the SEC Climate Disclosure Rules': '/resources-assets/img5.webp',
  'Green IT: Reducing the Carbon Footprint of Your Software': '/resources-assets/img6.webp',
  'Decarbonizing Logistics and Last-Mile Delivery': '/resources-assets/img7.webp',
  'The Future of Renewable Energy Certificates (RECs)': '/resources-assets/img8.webp',
  'Overcoming Data Silos in ESG Reporting': '/resources-assets/img9.webp',
  'Understanding the Role of the VCMI in Carbon Markets': '/resources-assets/img12.webp',
  'Building Climate Resilience in Commercial Real Estate': '/resources-assets/img13.webp',
  'The Financial Risks of Ignoring Scope 3 Emissions': '/resources-assets/img14.webp',
  'How to Engage Your Board of Directors on ESG Goals': '/resources-assets/img15.webp',
  'Decoding the Latest IPCC Climate Change Report': '/resources-assets/img16.webp',
  'Sustainable Packaging: Beyond the Basics': '/resources-assets/img17.webp',
};

export const sectionImages: Record<string, Record<string, string>> = {
  'The Growing Importance of Biodiversity Metrics': {
    'overview': '/resources-assets/img4.webp',
  },
  'Navigating the SEC Climate Disclosure Rules': {
    'overview': '/resources-assets/img5.webp',
  },
  'Green IT: Reducing the Carbon Footprint of Your Software': {
    'overview': '/resources-assets/img6.webp',
  },
  'Decarbonizing Logistics and Last-Mile Delivery': {
    'overview': '/resources-assets/img7.webp',
    'route-optimization': '/resources-assets/img2.webp',
    'ev-adoption': '/resources-assets/img1.webp',
    'efficiency-dashboard': '/resources-assets/img3.webp',
    'carbon-calculator': '/resources-assets/img10.webp',
    'case-study': '/resources-assets/img5.webp',
  },
  'The Future of Renewable Energy Certificates (RECs)': {
    'overview': '/resources-assets/img8.webp',
    'market-trends': '/resources-assets/img2.webp',
    'market-valuation': '/resources-assets/img11.webp',
    'cert-lifecycle': '/resources-assets/img3.webp',
    'demand-analysis': '/resources-assets/img5.webp',
    'investment-growth': '/resources-assets/img1.webp',
  },
  'Overcoming Data Silos in ESG Reporting': {
    'overview': '/resources-assets/img9.webp',
    'architecture': '/resources-assets/img2.webp',
    'data-accuracy': '/resources-assets/img5.webp',
    'workflow': '/resources-assets/img3.webp',
    'case-study': '/resources-assets/img1.webp',
  },
  'Understanding the Role of the VCMI in Carbon Markets': {
    'overview': '/resources-assets/img12.webp',
    'pricing-trends': '/resources-assets/img11.webp',
    'market-growth': '/resources-assets/img5.webp',
    'verification-flow': '/resources-assets/img3.webp',
    'market-comparison': '/resources-assets/img2.webp',
  },
  'Building Climate Resilience in Commercial Real Estate': {
    'overview': '/resources-assets/img13.webp',
    'risk-heatmap': '/resources-assets/img4.webp',
    'performance': '/resources-assets/img5.webp',
    'cost-benefit': '/resources-assets/img11.webp',
    'risk-zoning': '/resources-assets/img3.webp',
  },
  'The Financial Risks of Ignoring Scope 3 Emissions': {
    'overview': '/resources-assets/img14.webp',
    'risk-exposure': '/resources-assets/img10.webp',
    'financial-loss': '/resources-assets/img5.webp',
    'investor-pressure': '/resources-assets/img1.webp',
    'roi-impact': '/resources-assets/img2.webp',
    'penalties': '/resources-assets/img3.webp',
  },
  'Why Real-Time Tracking Matters': {
    'overview': '/resources-assets/img9.webp',
    'benefits': '/resources-assets/img5.webp',
    'roi': '/resources-assets/img11.webp',
    'accuracy': '/resources-assets/img2.webp',
    'future': '/resources-assets/img3.webp',
  },
  'Greenwashing vs True Sustainability': {
    'overview': '/resources-assets/img15.webp',
    'red-flags': '/resources-assets/img11.webp',
    'transparency': '/resources-assets/img5.webp',
    'trust': '/resources-assets/img2.webp',
    'best-practices': '/resources-assets/img3.webp',
  },
  'The Role of AI in ESG Compliance': {
    'overview': '/resources-assets/img5.webp',
    'ai-applications': '/resources-assets/img13.webp',
    'automation': '/resources-assets/img4.webp',
    'predictive': '/resources-assets/img11.webp',
    'case-study': '/resources-assets/img2.webp',
  },
  'The Impact of Scope 3 Emissions on Global Supply Chains': {
    'overview': '/resources-assets/img3.webp',
    'breakdown': '/resources-assets/img10.webp',
    'supplier-engagement': '/resources-assets/img2.webp',
    'reduction': '/resources-assets/img5.webp',
    'strategy': '/resources-assets/img1.webp',
  },
  'Why Carbon Taxes Are Reshaping the Global Economy': {
    'overview': '/resources-assets/img5.webp',
    'global-rates': '/resources-assets/img11.webp',
    'impact': '/resources-assets/img2.webp',
    'business-response': '/resources-assets/img4.webp',
    'outlook': '/resources-assets/img3.webp',
  },
  '5 Common Pitfalls in ESG Reporting': {
    'overview': '/resources-assets/img7.webp',
    'pitfall-1': '/resources-assets/img5.webp',
    'pitfall-2': '/resources-assets/img4.webp',
    'pitfall-3': '/resources-assets/img2.webp',
    'pitfall-4': '/resources-assets/img3.webp',
    'pitfall-5': '/resources-assets/img6.webp',
  },
  'What is Decarbonization: Action Plan': {
    'overview': '/resources-assets/img10.webp',
    'roadmap': '/resources-assets/img1.webp',
    'milestones': '/resources-assets/img2.webp',
    'sectors': '/resources-assets/img4.webp',
    'action-plan': '/resources-assets/img5.webp',
  },
  'How to Build a Sustainable Procurement Strategy': {
    'overview': '/resources-assets/img2.webp',
    'criteria': '/resources-assets/img4.webp',
    'supplier-scoring': '/resources-assets/img5.webp',
    'integration': '/resources-assets/img3.webp',
    'case-study': '/resources-assets/img1.webp',
  },
  'Understanding the CBAM Regulation': {
    'overview': '/resources-assets/img12.webp',
    'mechanism': '/resources-assets/img3.webp',
    'impact': '/resources-assets/img11.webp',
    'compliance': '/resources-assets/img5.webp',
    'preparation': '/resources-assets/img2.webp',
  },
  'Best Practices for Energy Audits': {
    'overview': '/resources-assets/img15.webp',
    'audit-types': '/resources-assets/img3.webp',
    'methodology': '/resources-assets/img5.webp',
    'savings': '/resources-assets/img11.webp',
    'case-study': '/resources-assets/img2.webp',
  },
  'The Evolution of Green Finance': {
    'overview': '/resources-assets/img17.webp',
    'growth': '/resources-assets/img11.webp',
    'instruments': '/resources-assets/img5.webp',
    'impact': '/resources-assets/img4.webp',
    'outlook': '/resources-assets/img3.webp',
  },
  'Demystifying the SBTi Validation Process': {
    'overview': '/resources-assets/img4.webp',
    'steps': '/resources-assets/img2.webp',
    'timeline': '/resources-assets/img5.webp',
    'readiness': '/resources-assets/img3.webp',
    'case-study': '/resources-assets/img1.webp',
  },
  'The Rise of Circular Economy Business Models': {
    'overview': '/resources-assets/img1.webp',
    'principles': '/resources-assets/img4.webp',
    'value-chains': '/resources-assets/img5.webp',
    'metrics': '/resources-assets/img2.webp',
    'case-study': '/resources-assets/img3.webp',
  },
  'Understanding the EU Corporate Sustainability Reporting Directive (CSRD)': {
    'overview': '/resources-assets/img2.webp',
    'requirements': '/resources-assets/img5.webp',
    'timeline': '/resources-assets/img3.webp',
    'readiness': '/resources-assets/img4.webp',
    'case-study': '/resources-assets/img1.webp',
  },
  'How to Implement Internal Carbon Pricing': {
    'overview': '/resources-assets/img3.webp',
    'methods': '/resources-assets/img5.webp',
    'pricing': '/resources-assets/img11.webp',
    'implementation': '/resources-assets/img4.webp',
    'case-study': '/resources-assets/img2.webp',
  },
  'How to Engage Your Board of Directors on ESG Goals': {
    'overview': '/resources-assets/img15.webp',
  },
  'Decoding the Latest IPCC Climate Change Report': {
    'overview': '/resources-assets/img16.webp',
  },
  'Sustainable Packaging: Beyond the Basics': {
    'overview': '/resources-assets/img17.webp',
  },
};

function HeroSection({ title }: { title: string }) {
  const img = heroImages[title] || '/resources-assets/img5.webp';
  const subtitle: Record<string, string> = {
    'The Growing Importance of Biodiversity Metrics': 'As biodiversity loss accelerates, forward-thinking companies are measuring their impact on nature — not just carbon.',
    'Navigating the SEC Climate Disclosure Rules': 'A comprehensive guide to understanding and preparing for the SEC\u2019s landmark climate disclosure regulations.',
    'Green IT: Reducing the Carbon Footprint of Your Software': 'Learn how optimizing your software stack and cloud architecture can dramatically cut digital carbon emissions.',
    'Decarbonizing Logistics and Last-Mile Delivery': 'Route optimization, EV fleets, and data-driven logistics are reshaping the future of sustainable delivery.',
    'The Future of Renewable Energy Certificates (RECs)': 'Are RECs still credible instruments for claiming renewable energy use? A deep market analysis.',
    'Overcoming Data Silos in ESG Reporting': 'How to unify fragmented data sources into a single source of truth for audit-ready ESG reporting.',
    'Understanding the Role of the VCMI in Carbon Markets': 'The Voluntary Carbon Markets Integrity Initiative is setting new standards for carbon credit claims.',
    'Building Climate Resilience in Commercial Real Estate': 'From flood risk to heat stress, how property owners are future-proofing their portfolios.',
    'The Financial Risks of Ignoring Scope 3 Emissions': 'Investors are increasingly pricing in supply chain carbon risk. Here\u2019s what it means for your bottom line.',
    'How to Engage Your Board of Directors on ESG Goals': 'Proven strategies to secure executive buy-in and transform ESG from a compliance burden into a strategic advantage.',
    'Decoding the Latest IPCC Climate Change Report': 'A breakdown of the most critical findings from the IPCC\u2019s latest assessment and what they mean for business strategy.',
    'Sustainable Packaging: Beyond the Basics': 'Next-generation materials, lifecycle assessment tools, and circular economy models redefining sustainable packaging.',
  };
  return (
    <div className="detail-hero">
      <div className="dh-image" style={{ backgroundImage: `url(${img})` }} />
      <div className="dh-overlay" />
      <div className="dh-content">
        <div className="dh-eyebrow"><Sparkles size={14} /> CarbonSync Research Portal</div>
        <h1>{title}</h1>
        <p>{subtitle[title] || 'An in-depth analysis from CarbonSync\u2019s research team.'}</p>
        <div className="dh-meta">
          <span><BookOpen size={14} /> 12 min read</span>
          <span><BarChart3 size={14} /> Data-driven analysis</span>
          <span><ShieldCheck size={14} /> Peer-reviewed research</span>
        </div>
      </div>
    </div>
  );
}

export function getArticleContent(title: string, onDownload?: () => void): React.ReactNode {
  const base = (content: React.ReactNode) => (
    <div className="detail-article-content">
      {content}
      <div className="detail-section-divider" />
      <CTAs onDownload={onDownload} />
    </div>
  );

  switch (title) {
    case 'The Growing Importance of Biodiversity Metrics':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p className="detail-lede">Biodiversity is emerging as the next frontier in corporate sustainability. While carbon accounting has dominated ESG agendas for the past decade, a growing consensus among scientists, regulators, and investors recognizes that nature loss poses systemic risks to the global economy. Over 50% of the world\u2019s GDP — roughly $44 trillion — is moderately or highly dependent on nature and its services.</p>

          <StatCards items={[
            { label: 'Species Lost Since 1970', value: '69%', icon: TreePine, color: '#ef4444' },
            { label: 'Ecosystems at Tipping Point', value: '75%', icon: Globe2, color: '#f59e0b' },
            { label: 'GDP Dependent on Nature', value: '$44T', icon: BarChart3, color: '#059669' },
            { label: 'Companies Assessing Nature', value: '23%', icon: Target, color: '#0d9488' },
          ]} />

          <h2>Global Biodiversity Decline</h2>
          <p>The Living Planet Index shows a 69% average decline in monitored wildlife populations since 1970. Freshwater species have been hit hardest with an 83% decline. This mass extinction event, the sixth in Earth\u2019s history, is driven primarily by habitat destruction, overexploitation, climate change, and pollution.</p>

          <SimpleBarChart title="Species Decline by Biome (% loss since 1970)" data={[
            { label: 'Freshwater', value: 83, color: '#3b82f6' },
            { label: 'Terrestrial', value: 69, color: '#059669' },
            { label: 'Marine', value: 36, color: '#0d9488' },
            { label: 'Forests', value: 71, color: '#10b981' },
            { label: 'Grasslands', value: 58, color: '#f59e0b' },
            { label: 'Wetlands', value: 85, color: '#06b6d4' },
          ]} />

          <h2>Ecosystem Health Score</h2>
          <p>The Biodiversity Intactness Index (BII) measures how much of a region\u2019s original biodiversity remains. The global average BII has fallen below 75% — the threshold considered safe for long-term ecosystem stability. At current trends, the BII could fall to 60% by 2050, representing a catastrophic loss of ecosystem function.</p>

          <KpiRow items={[
            { label: 'Global BII Score', value: '74.6%', change: '-4.2% YoY', positive: false },
            { label: 'Safe Threshold', value: '90%', change: 'Target', positive: false },
            { label: '2050 Projection', value: '61.2%', change: 'Critical', positive: false },
            { label: 'Protected Areas', value: '15.4%', change: '+1.2% YoY', positive: true },
          ]} />

          <h2>Industry Impact Case Studies</h2>
          <p><strong>Agriculture:</strong> Monoculture farming has reduced pollinator populations by 50%, threatening $235 billion in annual crop production. Regenerative agriculture practices can reverse this trend while sequestering 1.5 GT CO2 annually.</p>
          <p><strong>Pharmaceuticals:</strong> 40% of modern medicines are derived from natural compounds. Biodiversity loss threatens the discovery pipeline for new antibiotics and cancer treatments.</p>
          <p><strong>Financial Services:</strong> 52% of listed companies in emerging markets have significant exposure to biodiversity risks through their supply chains, creating systemic portfolio vulnerability.</p>

          <h2>Restoration Progress & Sustainability Benchmarks</h2>
          <p>The UN Decade on Ecosystem Restoration (2021\u20132030) has galvanized global restoration efforts. Reforestation initiatives have restored 78 million hectares globally, but this is only 20% of the 350 million hectares needed to meet Paris Agreement goals. The TNFD (Taskforce on Nature-related Financial Disclosures) is driving corporate adoption of \u201cLocate, Evaluate, Assess, Prepare\u201d (LEAP) frameworks for nature reporting.</p>

          <ComparisonTable
            headers={['Benchmark', 'Current Score', 'Target 2030', 'Status']}
            rows={[
              ['Forest Cover (% of land)', '31%', '35%', 'In Progress'],
              ['Protected Marine Areas', '8.2%', '30%', 'Behind Target'],
              ['Species Protection Index', '62/100', '85/100', 'Needs Acceleration'],
              ['Corporate TNFD Adopters', '320', '5,000+', 'Growing Fast'],
            ]}
          />

          <Timeline items={[
            { year: '2023', title: 'TNFD Framework Released', desc: 'The Taskforce on Nature-related Financial Disclosures published its final recommendations.' },
            { year: '2024', title: 'Mandatory Nature Reporting (EU)', desc: 'EU adopts nature reporting requirements under CSRD, aligned with TNFD recommendations.' },
            { year: '2025', title: 'Global Biodiversity Framework', desc: '196 nations commit to protecting 30% of land and ocean by 2030 under the Kunming-Montreal agreement.' },
            { year: '2026', title: 'Corporate Adoption Accelerates', desc: 'Over 1,000 companies now publishing nature-related disclosures alongside carbon reports.' },
            { year: '2030', title: '30x30 Target Deadline', desc: 'The landmark agreement to protect 30% of Earth\u2019s land and water reaches its deadline.' },
          ]} />

          <h2>Animated Infographic: Biodiversity & Business Interdependence</h2>
          <div className="detail-infographic">
            <div className="infog-card"><Factory size={32} /><span>Industry</span><small>60% of GDP depends on nature</small></div>
            <div className="infog-arrow"><ArrowRight size={24} /></div>
            <div className="infog-card"><TreePine size={32} /><span>Ecosystem Services</span><small>Pollination, water, raw materials</small></div>
            <div className="infog-arrow"><ArrowRight size={24} /></div>
            <div className="infog-card"><BarChart3 size={32} /><span>Business Value</span><small>Risk mitigation + new markets</small></div>
          </div>
        </div>
      </>);

    case 'Navigating the SEC Climate Disclosure Rules':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p className="detail-lede">The U.S. Securities and Exchange Commission\u2019s climate disclosure rules mark a watershed moment for corporate transparency. With phased compliance starting in 2026 for large filers, companies must now disclose Scope 1 and 2 emissions, climate-related risks, and governance processes. This article provides a roadmap to compliance readiness.</p>

          <StatCards items={[
            { label: 'Affected Companies', value: '5,400+', icon: Building2, color: '#3b82f6' },
            { label: 'Compliance Deadline', value: '2026', icon: ShieldCheck, color: '#ef4444' },
            { label: 'Estimated Compliance Cost', value: '$590K', icon: BarChart3, color: '#f59e0b' },
            { label: 'Non-Compliance Penalty', value: '$500K+', icon: AlertTriangle, color: '#059669' },
          ]} />

          <h2>Compliance Framework Timeline</h2>
          <Timeline items={[
            { year: 'Mar 2024', title: 'SEC Adopts Final Rules', desc: 'SEC issues landmark climate disclosure rules requiring Scope 1 & 2 emissions reporting.' },
            { year: '2024\u20132025', title: 'Legal Challenges', desc: 'Multiple lawsuits filed challenging the rules. Stay issued pending judicial review.' },
            { year: 'Q1 2026', title: 'Phase 1: Large Accelerated Filers', desc: 'Companies with >$700M public float must report Scope 1 & 2 with limited assurance.' },
            { year: '2027', title: 'Phase 2: Accelerated Filers', desc: 'Companies with >$75M public float must comply. Scope 3 phased in for some.' },
            { year: '2028', title: 'Phase 3: All Registrants', desc: 'Smaller reporting companies come into scope. Full assurance required.' },
          ]} />

          <h2>Regulation Compliance Checklist</h2>
          <ComparisonTable
            headers={['Requirement', 'Scope', 'Phase', 'Status']}
            rows={[
              ['Scope 1 GHG Emissions', 'Direct operations', 'Phase 1', 'Mandatory'],
              ['Scope 2 GHG Emissions', 'Purchased energy', 'Phase 1', 'Mandatory'],
              ['Scope 3 GHG Emissions', 'Value chain (material)', 'Phase 2', 'Conditional'],
              ['Climate Risk Governance', 'Board oversight', 'Phase 1', 'Mandatory'],
              ['Scenario Analysis', 'Climate resilience', 'Phase 1', 'Required'],
              ['Attestation Report', 'Limited assurance', 'Phase 1', 'Required'],
            ]}
          />

          <h2>Disclosure Readiness Score</h2>
          <KpiRow items={[
            { label: 'Industry Avg Readiness', value: '42%', change: '+18% YoY', positive: true },
            { label: 'Data Gap (Avg)', value: '37%', change: '-5% YoY', positive: true },
            { label: 'Board Awareness', value: '68%', change: '+22% YoY', positive: true },
            { label: 'Systems Investment', value: '$2.1M', change: '+45% YoY', positive: true },
          ]} />

          <SimpleBarChart title="Readiness Score by Sector (%)" data={[
            { label: 'Tech', value: 65, color: '#059669' },
            { label: 'Finance', value: 58, color: '#0d9488' },
            { label: 'Energy', value: 52, color: '#f59e0b' },
            { label: 'Retail', value: 38, color: '#ef4444' },
            { label: 'Manufacturing', value: 32, color: '#3b82f6' },
          ]} />

          <h2>SEC Reporting Flow Diagram</h2>
          <FlowDiagram steps={[
            { label: 'Data Collection', sub: 'IoT, ERP, Utility APIs' },
            { label: 'Emissions Calc', sub: 'GHG Protocol factors' },
            { label: 'Risk Assessment', sub: 'Scenario analysis' },
            { label: 'Internal Review', sub: 'Audit committee' },
            { label: 'SEC Filing', sub: 'EDGAR submission' },
          ]} />

          <h2>Filing Risk Analytics</h2>
          <p>Our analysis of early adopters reveals common filing pitfalls: 43% of companies underestimated Scope 3 materiality, 28% lacked adequate board-level governance documentation, and 19% failed to map climate risks to financial statements. CarbonSync\u2019s automated compliance engine reduces these risks by providing real-time gap analysis against SEC requirements.</p>

          <h2>Audit Readiness Indicators</h2>
          <p>The SEC requires limited assurance for Scope 1 & 2 emissions starting in 2026, transitioning to reasonable assurance by 2028. Companies must ensure their data pipelines maintain a complete audit trail, with source documents, calculation methodologies, and emission factor versions tracked immutably. CarbonSync provides blockchain-verified audit trails for every data point.</p>
        </div>
      </>);

    case 'Green IT: Reducing the Carbon Footprint of Your Software':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p className="detail-lede">The global IT sector accounts for 3\u20134% of total greenhouse gas emissions — equivalent to the aviation industry. With cloud computing and AI workloads exploding, Green IT has become a critical lever for corporate decarbonization. This analysis covers software energy optimization, cloud efficiency, and measurable benchmarks.</p>

          <StatCards items={[
            { label: 'IT Sector Emissions', value: '1.2 GT', icon: Cloud, color: '#3b82f6' },
            { label: 'Cloud Efficiency Gap', value: '62%', icon: Zap, color: '#f59e0b' },
            { label: 'Avg Server Utilization', value: '18%', icon: BarChart3, color: '#ef4444' },
            { label: 'Optimization Potential', value: '45%', icon: Target, color: '#059669' },
          ]} />

          <h2>Software Energy Usage Analysis</h2>
          <p>Software efficiency varies dramatically. A poorly optimized web application can use 10\u201350x more energy than a well-optimized equivalent for the same business function. Key levers include: efficient algorithms, lazy loading, CDN optimization, and reducing unnecessary JavaScript bundle sizes. Moving from interpreted languages (Python, Ruby) to compiled ones (Rust, Go) for backend services can reduce CPU consumption by 40\u201360%.</p>

          <SimpleBarChart title="Energy Per Transaction (microJoules)" data={[
            { label: 'Optimized Go', value: 25, color: '#059669' },
            { label: 'Node.js', value: 48, color: '#0d9488' },
            { label: 'Python', value: 85, color: '#f59e0b' },
            { label: 'Ruby', value: 112, color: '#ef4444' },
            { label: 'PHP Legacy', value: 145, color: '#dc2626' },
          ]} />

          <h2>Server Optimization Metrics</h2>
          <p>Data center PUE (Power Usage Effectiveness) has improved from an industry average of 1.67 in 2010 to 1.35 in 2026. However, the single biggest lever for Green IT remains server utilization. Most enterprise servers run at 5\u201315% utilization. Containerization and auto-scaling can push this to 50\u201370%, reducing total energy consumption by up to 60% for the same workload.</p>

          <KpiRow items={[
            { label: 'Avg Server Utilization', value: '18%', change: '+3% YoY', positive: true },
            { label: 'Best Practice Target', value: '65%', change: 'Target', positive: true },
            { label: 'PUE (Industry Avg)', value: '1.35', change: '-0.05 YoY', positive: true },
            { label: 'Carbon Per Request', value: '0.52g', change: '-12% YoY', positive: true },
          ]} />

          <h2>Cloud Efficiency Comparison</h2>
          <ComparisonTable
            headers={['Provider', 'Carbon Intensity', 'Renewable %', 'PUE', 'Rating']}
            rows={[
              ['AWS', '289 gCO2/kWh', '85%', '1.25', 'A'],
              ['Azure', '265 gCO2/kWh', '90%', '1.20', 'A+'],
              ['Google Cloud', '210 gCO2/kWh', '100%', '1.10', 'A+'],
              ['OVHcloud', '180 gCO2/kWh', '95%', '1.15', 'A+'],
            ]}
          />

          <h2>Benchmark Dashboard</h2>
          <div className="detail-infographic">
            <div className="infog-card"><Cloud size={32} /><span>Carbon Intensity</span><small>Market avg: 280 gCO2/kWh</small></div>
            <div className="infog-card"><Zap size={32} /><span>Code Efficiency</span><small>40% savings via optimization</small></div>
            <div className="infog-card"><BarChart3 size={32} /><span>Server Utilization</span><small>Target: 65%+ utilization</small></div>
            <div className="infog-card"><Globe2 size={32} /><span>Green Hosting</span><small>100% renewable by 2027</small></div>
          </div>

          <h2>Coding Efficiency Best Practices</h2>
          <p>1. <strong>Algorithmic Efficiency:</strong> Choosing O(n log n) over O(n²) algorithms reduces CPU cycles. A single optimized query can save tons of CO2 at scale.</p>
          <p>2. <strong>Frontend Optimization:</strong> Reduce bundle sizes through code splitting, tree shaking, and modern image formats (WebP, AVIF).</p>
          <p>3. <strong>Database Optimization:</strong> Proper indexing and query optimization can reduce database server CPU load by 70%.</p>
          <p>4. <strong>CDN & Edge Computing:</strong> Moving compute to edge locations reduces latency and central data center load by 30\u201350%.</p>
          <p>5. <strong>Green CI/CD:</strong> Schedule CI/CD pipelines during periods of low grid carbon intensity. Tools like WattTime provide real-time grid data.</p>
        </div>
      </>);

    case 'Decarbonizing Logistics and Last-Mile Delivery':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">Transportation accounts for 24% of global CO2 emissions, with road freight and last-mile delivery representing the fastest-growing segment. As e-commerce continues its explosive growth, decarbonizing logistics has become a critical priority for retailers, carriers, and consumers alike.</p>

          <StatCards items={[
            { label: 'Logistics Emissions', value: '8.5 GT', icon: Truck, color: '#f59e0b' },
            { label: 'Last-Mile Share', value: '41%', icon: Truck, color: '#ef4444' },
            { label: 'EV Adoption Rate', value: '8.6%', icon: Zap, color: '#059669' },
            { label: 'Optimization Savings', value: '30%', icon: Target, color: '#0d9488' },
          ]} />

          <h2 id="route-optimization">Route Optimization & Emission Reduction</h2>
          <p>Advanced route optimization using AI and real-time traffic data can reduce total miles driven by 15–30%, directly cutting fuel consumption and emissions. Machine learning algorithms consider traffic patterns, delivery windows, vehicle capacity, and charging station locations to create optimal routes. A leading APAC logistics provider reduced 22,000 MT CO2 annually after implementing AI-driven route planning.</p>

          <SimpleBarChart title="Emissions by Delivery Type (gCO2/km)" data={[
            { label: 'Diesel Van', value: 320, color: '#ef4444' },
            { label: 'EV Van', value: 85, color: '#059669' },
            { label: 'Cargo Bike', value: 8, color: '#10b981' },
            { label: 'Drone', value: 42, color: '#3b82f6' },
            { label: 'Autonomous Pod', value: 35, color: '#0d9488' },
          ]} />

          <SimplePieChart
            title="Logistics Emission Breakdown (%)"
            data={[
              { name: 'Long-Haul Trucking', value: 45, color: '#ef4444' },
              { name: 'Last-Mile Delivery', value: 35, color: '#f59e0b' },
              { name: 'Warehousing', value: 15, color: '#059669' },
              { name: 'Last-Mile Support', value: 5, color: '#0d9488' },
            ]}
          />

          <h2 id="ev-adoption">EV Adoption Statistics</h2>
          <p>Electric vehicle adoption in commercial fleets is accelerating. By 2026, over 350,000 electric delivery vans are deployed globally, up from 80,000 in 2023. Major logistics players including Amazon, UPS, and DHL have committed to 100% electric last-mile fleets by 2030. However, charging infrastructure remains the primary bottleneck, with only 1 public charger for every 12 EV delivery vans in most markets.</p>

          <SimpleLineChart
            title="Global EV Delivery Van Deployment (in thousands)"
            data={[
              { year: '2021', value: 40 },
              { year: '2022', value: 55 },
              { year: '2023', value: 80 },
              { year: '2024', value: 160 },
              { year: '2025', value: 240 },
              { year: '2026', value: 350 },
            ]}
            xKey="year"
            yKey="value"
          />

          <KpiRow items={[
            { label: 'Global EV Delivery Vans', value: '350K', change: '+340% YoY', positive: true },
            { label: 'Chargers per EV Van', value: '0.08', change: 'Critical Shortage', positive: false },
            { label: 'Avg Cost per km (EV)', value: '$0.08', change: '-65% vs Diesel', positive: true },
            { label: 'Fleet Decarb Target', value: '2030', change: '6 Nations on Track', positive: false },
          ]} />

          <h2 id="efficiency-dashboard">Logistics Efficiency Dashboard</h2>
          <ComparisonTable
            headers={['Metric', 'Traditional', 'Optimized', 'Improvement']}
            rows={[
              ['Avg Delivery Radius', '25 km', '18 km', '28%'],
              ['Stops per Route', '85', '120', '41%'],
              ['Vehicle Utilization', '62%', '88%', '42%'],
              ['On-Time Delivery', '89%', '96%', '8%'],
              ['Emissions per Package', '1.8 kg', '0.95 kg', '47%'],
            ]}
          />

          <h2 id="carbon-calculator">Carbon Reduction Calculator</h2>
          <p>Based on our proprietary model, switching a fleet of 100 diesel delivery vans to EVs and implementing AI route optimization results in:</p>
          <FlowDiagram steps={[
            { label: 'Diesel Baseline', sub: '2,400 MT CO2/year' },
            { label: 'EV Transition', sub: '640 MT CO2/year' },
            { label: 'Route Optimization', sub: '448 MT CO2/year' },
            { label: 'Net Reduction', sub: '81% decrease' },
          ]} />

          <h2 id="case-study">Supply Chain Optimization Case Study</h2>
          <p>Modern multi-echelon inventory optimization (MEIO) reduces overall inventory levels by 25–35% while maintaining service levels. This directly reduces warehousing energy consumption and waste. Blockchain-based provenance tracking enables consumers to verify the carbon footprint of individual deliveries, creating market pressure for low-carbon logistics.</p>
        </div>
      </>);

    case 'The Future of Renewable Energy Certificates (RECs)':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">Renewable Energy Certificates (RECs) have been the primary mechanism for companies to claim renewable energy usage for decades. But with rising scrutiny over market-based instruments and the emergence of 24/7 carbon-free energy (CFE) tracking, the REC market is at a crossroads.</p>

          <StatCards items={[
            { label: 'Global REC Market', value: '$12.8B', icon: TrendingUp, color: '#059669' },
            { label: 'RECs Traded (2025)', value: '980M MWh', icon: Zap, color: '#0d9488' },
            { label: 'Corporate Buyers', value: '1,200+', icon: Building2, color: '#3b82f6' },
            { label: 'Price per REC (Avg)', value: '$4.20', icon: BarChart3, color: '#f59e0b' },
          ]} />

          <h2 id="market-trends">Renewable Adoption Trends</h2>
          <p>Corporate renewable procurement has grown from 5 GW in 2015 to over 75 GW in 2025, representing nearly 30% of all new renewable capacity additions globally. The RE100 initiative now counts 400+ members committed to 100% renewable electricity. However, critics argue that unbundled RECs do not drive additionality — the construction of new renewable capacity — and may simply shift existing green electrons on paper.</p>

          <SimpleAreaChart
            title="Corporate Renewable Procurement (GW/year)"
            data={[
              { year: '2018', value: 12 },
              { year: '2019', value: 18 },
              { year: '2020', value: 24 },
              { year: '2021', value: 32 },
              { year: '2022', value: 45 },
              { year: '2023', value: 54 },
              { year: '2024', value: 62 },
              { year: '2025', value: 85 },
            ]}
            xKey="year"
            yKey="value"
          />

          <SimplePieChart
            title="Renewable Demand by Sector (%)"
            data={[
              { name: 'Technology', value: 35, color: '#059669' },
              { name: 'Finance', value: 25, color: '#0d9488' },
              { name: 'Consumer Goods', value: 20, color: '#3b82f6' },
              { name: 'Manufacturing', value: 12, color: '#f59e0b' },
              { name: 'Other', value: 8, color: '#64748b' },
            ]}
          />

          <h2 id="market-valuation">REC Market Valuation</h2>
          <p>The REC market has grown from $3.2B in 2020 to an estimated $12.8B in 2026. Prices vary dramatically by region: EU Guarantees of Origin trade at \u20ac8\u201312/MWh, while US RECs range from $1\u201350/MWh depending on the renewable resource type and vintage. Solar RECs (SRECs) command premium pricing in compliance markets, often exceeding $200/MWh.</p>

          <SimpleLineChart
            title="Global REC Market Size ($ Billion)"
            data={[
              { year: '2020', value: 3.2 },
              { year: '2021', value: 4.8 },
              { year: '2022', value: 6.5 },
              { year: '2023', value: 8.3 },
              { year: '2024', value: 10.5 },
              { year: '2025', value: 12.8 },
            ]}
            xKey="year"
            yKey="value"
          />

          <KpiRow items={[
            { label: 'Market CAGR', value: '26%', change: '+6% YoY', positive: true },
            { label: 'Avg REC Price (Global)', value: '$4.20', change: '+$1.80 YoY', positive: true },
            { label: 'RE100 Members', value: '420+', change: '+45 YoY', positive: true },
            { label: '24/7 CFE Adopters', value: '85', change: '+60 YoY', positive: true },
          ]} />

          <h2 id="cert-lifecycle">Certificate Lifecycle</h2>
          <FlowDiagram steps={[
            { label: 'Generation', sub: 'MWh from renewable source' },
            { label: 'Certification', sub: 'Green-e / I-REC / GOs' },
            { label: 'Registry', sub: 'APX / M-RETS/tracking' },
            { label: 'Retirement', sub: 'Claimed & retired' },
          ]} />

          <h2 id="demand-analysis">Market Demand Analytics</h2>
          <p>The shift toward 24/7 carbon-free energy (CFE) matching is gaining momentum. Google, Microsoft, and other tech giants have committed to matching every hour of their electricity consumption with carbon-free generation. This requires not just annual REC purchases, but granular, hourly tracking of renewable generation. This creates demand for storage, demand response, and more sophisticated REC products.</p>

          <Timeline items={[
            { year: '2023', title: '24/7 CFE Emerges', desc: 'Google and Microsoft announce hourly carbon-free energy matching commitments.' },
            { year: '2024', title: 'M-RETS Granular Tracking', desc: 'REC registries begin offering hourly certificate tracking capabilities.' },
            { year: '2025', title: 'EU Delegated Act', desc: 'EU requires corporate PPAs to demonstrate additionality for renewable claims.' },
            { year: '2026', title: 'Market Inflection Point', desc: '50% of Fortune 500 companies adopt 24/7 CFE matching strategies.' },
          ]} />

          <h2 id="investment-growth">Investment Growth Statistics</h2>
          <p>Global investment in renewable energy capacity reached $620 billion in 2025, with corporate PPAs accounting for 28% of all new capacity contracts. The rise of \u201csleeved\u201d PPAs and green tariffs has made renewable procurement accessible to mid-market companies, expanding the REC buyer base beyond the Fortune 500.</p>
        </div>
      </>);

    case 'Overcoming Data Silos in ESG Reporting':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">ESG data is notoriously fragmented across enterprises. HR holds workforce data, facilities manages energy consumption, procurement tracks supplier emissions, and finance handles climate risk modeling. Without a unified data architecture, ESG reporting becomes a manual, error-prone, and unsustainable process that cannot scale to meet regulatory demands.</p>

          <StatCards items={[
            { label: 'Avg Data Sources per Firm', value: '18+', icon: Cloud, color: '#3b82f6' },
            { label: 'Report Prep Time (Manual)', value: '6 Months', icon: BarChart3, color: '#ef4444' },
            { label: 'Data Accuracy (Manual)', value: '68%', icon: Target, color: '#f59e0b' },
            { label: 'Cost of Data Fragmentation', value: '$2.4M', icon: AlertTriangle, color: '#059669' },
          ]} />

          <h2 id="architecture">Enterprise Data Integration Architecture</h2>
          <p>The modern ESG data stack consists of four layers: <strong>Source Systems</strong> (ERP, HRIS, IoT, utility APIs, supplier portals), <strong>Integration Layer</strong> (ETL pipelines, API gateways, data lakes), <strong>Calculation Engine</strong> (GHG Protocol, LCA methodologies, emission factor databases), and <strong>Reporting Layer</strong> (CSRD, SEC, TCFD, GRI templates). Leading organizations are adopting modern data platforms like Snowflake or Databricks as their ESG data foundation, enabling real-time integration and auditability.</p>

          <FlowDiagram steps={[
            { label: 'Source Systems', sub: 'ERP, HR, IoT, Utility APIs' },
            { label: 'Data Lake/Lakehouse', sub: 'Unified raw data store' },
            { label: 'Calculation Engine', sub: 'GHG Protocol & LCA' },
            { label: 'Reporting Layer', sub: 'Multi-framework output' },
          ]} />

          <SimpleBarChart title="Data Centralization Efficiency Gains (%)" data={[
            { label: 'Data Collection', value: 92, color: '#059669' },
            { label: 'Validation', value: 78, color: '#0d9488' },
            { label: 'Report Generation', value: 88, color: '#10b981' },
            { label: 'Audit Trail', value: 95, color: '#3b82f6' },
            { label: 'Accuracy', value: 97, color: '#06b6d4' },
          ]} />

          <h2 id="data-accuracy">Data Accuracy KPIs</h2>
          <KpiRow items={[
            { label: 'Manual Data Accuracy', value: '68%', change: 'Baseline', positive: false },
            { label: 'Automated Data Accuracy', value: '97%', change: '+29%', positive: true },
            { label: 'Audit Pass Rate (Automated)', value: '99.2%', change: '+15%', positive: true },
            { label: 'Report Prep Time (Automated)', value: '3 Weeks', change: '-92%', positive: true },
          ]} />

          <h2 id="workflow">Workflow Visualization</h2>
          <p>CarbonSync\u2019s workflow engine automates the entire ESG data pipeline: from automated data collection via 500+ API connectors, through validation and normalization, to collaborative review workflows with role-based access controls. Approvals are tracked immutably, providing auditors with a complete chain of custody for every data point.</p>

          <SimpleAreaChart
            title="Reporting Cycle Duration Reduction (Months)"
            data={[
              { phase: 'Before', value: 9 },
              { phase: 'After', value: 0.75 },
            ]}
            xKey="phase"
            yKey="value"
          />

          <h2 id="case-study">Case Study: Global Manufacturer</h2>
          <p>A multinational manufacturer with operations in 35 countries reduced its ESG reporting cycle from 9 months to 3 weeks after implementing a centralized data architecture. The company had previously relied on 23 separate Excel workbooks maintained by regional sustainability leads. By integrating its SAP ERP, facility management systems, and supplier portals into CarbonSync\u2019s unified platform, it achieved real-time visibility into 96% of its emissions and passed its first CSRD audit without a single material finding.</p>

          <ComparisonTable
            headers={['Capability', 'Before', 'After', 'Improvement']}
            rows={[
              ['Reporting Cycle', '9 months', '3 weeks', '92%'],
              ['Data Accuracy', '68%', '97%', '29%'],
              ['Data Sources Integrated', '23', '500+', '20x'],
              ['Staff Hours per Report', '2,400', '120', '95%'],
            ]}
          />
        </div>
      </>);

    case 'Understanding the Role of the VCMI in Carbon Markets':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">The Voluntary Carbon Market (VCM) has faced intense scrutiny over credit quality, additionality, and greenwashing concerns. The Voluntary Carbon Markets Integrity Initiative (VCMI) has emerged as the leading standard for credible carbon credit claims, providing a framework that separates genuine climate action from marketing.</p>

          <StatCards items={[
            { label: 'VCM Market (2025)', value: '$3.2B', icon: TrendingUp, color: '#059669' },
            { label: 'Credits Retired (2025)', value: '220M tCO2', icon: Globe2, color: '#0d9488' },
            { label: 'Projects Registered', value: '8,500+', icon: TreePine, color: '#10b981' },
            { label: 'Avg Credit Price', value: '$14.50', icon: BarChart3, color: '#f59e0b' },
          ]} />

          <h2 id="pricing-trends">Carbon Credit Pricing Trends</h2>
          <p>Carbon credit prices have experienced significant volatility. Nature-based credits (REDD+, afforestation) trade at $5\u201320/tCO2, while technology-based removals (DAC, biochar) command $100\u2013500+/tCO2. The VCMI\u2019s Claims Code of Practice requires companies to meet three conditions before making claims: meet a baseline of corporate climate action, use high-quality credits, and provide transparent disclosures.</p>

          <SimpleAreaChart
            title="Credit Prices by Category ($/tCO2)"
            data={[
              { category: 'Nature-Based', value: 12 },
              { category: 'Renewable Energy', value: 4 },
              { category: 'Cookstoves', value: 8 },
              { category: 'Tech Removals', value: 250 },
              { category: 'Biochar', value: 150 },
            ]}
            xKey="category"
            yKey="value"
          />

          <SimplePieChart
            title="Carbon Credit Market Distribution (%)"
            data={[
              { name: 'Renewable Energy', value: 35, color: '#059669' },
              { name: 'Forestry', value: 28, color: '#0d9488' },
              { name: 'Energy Efficiency', value: 18, color: '#3b82f6' },
              { name: 'Waste & Agriculture', value: 12, color: '#f59e0b' },
              { name: 'Technology Removal', value: 7, color: '#64748b' },
            ]}
          />

          <h2 id="market-growth">Offset Market Growth</h2>
          <p>The voluntary carbon market grew from $520M in 2020 to $3.2B in 2025, a 44% CAGR. However, this is still a fraction of what analysts project for 2030 ($50\u2013100B). The integrity standards introduced by VCMI, along with the Core Carbon Principles (CCPs) from the Integrity Council for the Voluntary Carbon Market (ICVCM), are expected to unlock institutional capital by ensuring credit quality and fungibility.</p>

          <SimpleLineChart
            title="VCM Market Size Growth ($ Billion)"
            data={[
              { year: '2020', value: 0.52 },
              { year: '2021', value: 1.1 },
              { year: '2022', value: 1.9 },
              { year: '2023', value: 2.1 },
              { year: '2024', value: 2.6 },
              { year: '2025', value: 3.2 },
            ]}
            xKey="year"
            yKey="value"
          />

          <KpiRow items={[
            { label: 'Market Size 2025', value: '$3.2B', change: '+44% CAGR', positive: true },
            { label: 'Projected 2030', value: '$50B', change: 'Conservative', positive: true },
            { label: 'ICVCM Endorsed Credits', value: '35%', change: '+15% YoY', positive: true },
            { label: 'Corporate Offsetters', value: '1,800+', change: '+300 YoY', positive: true },
          ]} />

          <h2 id="verification-flow">Project Verification Flow</h2>
          <FlowDiagram steps={[
            { label: 'Project Design', sub: 'PDD submitted to registry' },
            { label: 'Validation', sub: 'Third-party auditor' },
            { label: 'Verification', sub: 'Periodic emissions monitoring' },
            { label: 'Issuance', sub: 'Credits issued to registry' },
            { label: 'Retirement', sub: 'Claimed by buyer' },
          ]} />

          <h2 id="market-comparison">Market Comparison Analytics</h2>
          <ComparisonTable
            headers={['Standard', 'Credits Issued', 'Avg Price', 'Integrity Score']}
            rows={[
              ['Verra (VCS)', '1.2B', '$12/t', '7/10'],
              ['Gold Standard', '320M', '$18/t', '9/10'],
              ['Plan Vivo', '45M', '$22/t', '9/10'],
              ['ACR', '280M', '$10/t', '7/10'],
              ['CCB (Verra+CCB)', '85M', '$25/t', '10/10'],
            ]}
          />

          <h2>The Path Forward</h2>
          <p>The VCMI\u2019s guidance has crystallized market best practices: companies must first prioritize internal emission reductions, use only high-quality credits for residual emissions, and make transparent disclosures about their credit portfolio. CarbonSync\u2019s credit assessment engine evaluates each credit against VCMI, ICVCM, and CORSIA criteria, providing a quality score and recommendation. As of 2026, over 1,800 companies have established carbon credit portfolios under VCMI-aligned frameworks.</p>
        </div>
      </>);

    case 'Building Climate Resilience in Commercial Real Estate':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">Commercial real estate (CRE) faces unprecedented physical climate risks — from coastal flooding and wildfires to extreme heat and water scarcity. With $1.4 trillion in U.S. commercial property value at risk by 2030, climate resilience is no longer optional for property owners, investors, and tenants.</p>

          <StatCards items={[
            { label: 'Property Value at Risk', value: '$1.4T', icon: Building2, color: '#ef4444' },
            { label: 'Buildings Needing Retrofit', value: '85%', icon: Factory, color: '#f59e0b' },
            { label: 'Avg Energy Savings (Retrofit)', value: '34%', icon: Zap, color: '#059669' },
            { label: 'Green Premium (Rent)', value: '12%', icon: TrendingUp, color: '#0d9488' },
          ]} />

          <h2 id="risk-heatmap">Resilience Score Heatmaps</h2>
          <p>CarbonSync\u2019s Climate Resilience Score integrates 15 physical risk indicators — including flood depth projections, wildfire probability, extreme heat days, and hurricane wind speeds — into a single 0\u2013100 score for any property location. Properties in the top 20% of climate resilience command a 12% rental premium and 8\u201315% higher valuation multiples compared to high-risk assets.</p>

          <SimpleBarChart title="Properties at Risk by Climate Hazard (%)" data={[
            { label: 'Flooding', value: 42, color: '#3b82f6' },
            { label: 'Extreme Heat', value: 38, color: '#ef4444' },
            { label: 'Wildfire', value: 22, color: '#f59e0b' },
            { label: 'Hurricane', value: 18, color: '#06b6d4' },
            { label: 'Drought', value: 31, color: '#dc2626' },
            { label: 'Sea Level Rise', value: 12, color: '#0d9488' },
          ]} />

          <SimplePieChart
            title="CRE Climate Risk Exposure (%)"
            data={[
              { name: 'Coastal Flooding', value: 35, color: '#3b82f6' },
              { name: 'Heat Stress', value: 25, color: '#ef4444' },
              { name: 'Wildfire', value: 20, color: '#f59e0b' },
              { name: 'Wind/Hurricane', value: 15, color: '#06b6d4' },
              { name: 'Other', value: 5, color: '#64748b' },
            ]}
          />

          <h2 id="performance">Building Performance Dashboards</h2>
          <KpiRow items={[
            { label: 'ENERGY STAR Score (Avg)', value: '67', change: '+3 pts YoY', positive: true },
            { label: 'Carbon Intensity (Avg)', value: '8.5 kg/ft²', change: '-5% YoY', positive: true },
            { label: 'Water Use (Avg)', value: '22 gal/ft²', change: '-8% YoY', positive: true },
            { label: 'Green Certification', value: '38%', change: '+6% YoY', positive: true },
          ]} />

          <h2 id="cost-benefit">Adaptation Cost-Benefit Analysis</h2>
          <SimpleAreaChart
            title="Adaptation ROI Timeline (Years)"
            data={[
              { measure: 'Green Roof', value: 9 },
              { measure: 'Flood Barriers', value: 5.1 },
              { measure: 'HVAC Upgrade', value: 5.7 },
              { measure: 'Solar+Battery', value: 8.3 },
              { measure: 'Smart Glass', value: 10.5 },
            ]}
            xKey="measure"
            yKey="value"
          />

          <ComparisonTable
            headers={['Adaptation Measure', 'Cost/ft²', 'Annual Savings/ft²', 'Payback Period']}
            rows={[
              ['Green Roof Installation', '$25', '$2.80', '9 years'],
              ['Flood Barriers', '$18', '$3.50', '5.1 years'],
              ['HVAC Upgrade (High-Efficiency)', '$12', '$2.10', '5.7 years'],
              ['Solar + Battery Storage', '$35', '$4.20', '8.3 years'],
              ['Smart Glass Windows', '$40', '$3.80', '10.5 years'],
            ]}
          />

          <h2 id="risk-zoning">Climate Risk Zone Mapping</h2>
          <p>Using FEMA flood maps, NOAA sea level rise projections, and First Street Foundation wildfire models, CarbonSync maps every commercial property into one of five risk zones: Critical (score 0\u201320), High (21\u201340), Moderate (41\u201360), Low (61\u201380), and Resilient (81\u2013100). Institutional investors now routinely apply a 1\u20133% cap rate adjustment based on resilience scores, directly impacting property valuations.</p>

          <Timeline items={[
            { year: '2023', title: 'SEC Climate Rule (Proposed)', desc: 'Climate risk disclosure requirements proposed for publicly traded companies including CRE exposure.' },
            { year: '2024', title: 'CBAM Expansion', desc: 'EU carbon border adjustment mechanism expands to include embodied carbon in construction materials.' },
            { year: '2025', title: 'Insurance Crisis', desc: 'Major insurers withdraw from high-risk coastal markets. Premiums surge 40\u201360%.' },
            { year: '2026', title: 'Mandatory Resilience Disclosures', desc: 'New York, California, and Florida mandate climate resilience disclosures for commercial properties.' },
          ]} />

          <h2>Future-Proofing Strategy</h2>
          <p>Leading CRE owners are adopting a \u201cresilience-first\u201d investment strategy, allocating 5\u201310% of capital expenditure to climate adaptation measures. Green bonds earmarked for resilience retrofits have grown to $45B annually. CarbonSync\u2019s Resilience Optimizer provides property-specific investment recommendations with ROI projections, helping owners prioritize capital allocation for maximum risk reduction and value preservation.</p>
        </div>
      </>);

    case 'The Financial Risks of Ignoring Scope 3 Emissions':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">Scope 3 emissions — the indirect emissions in a company\u2019s value chain — account for over 80% of most organizations\u2019 total carbon footprint. Yet the majority of companies still struggle to measure, manage, and mitigate these emissions. As investors and regulators increasingly price in Scope 3 risk, ignoring it has become a direct financial liability.</p>

          <StatCards items={[
            { label: 'Scope 3 Share of Total', value: '82%', icon: BarChart3, color: '#059669' },
            { label: 'Financial Exposure', value: '$28B', icon: AlertTriangle, color: '#ef4444' },
            { label: 'Investor Resolutions (2025)', value: '145', icon: Users, color: '#3b82f6' },
            { label: 'CBAM Cost Impact', value: '+23%', icon: Scale, color: '#f59e0b' },
          ]} />

          <SimplePieChart
            title="Scope 3 Emissions Breakdown by Category"
            data={[
              { name: 'Purchased Goods', value: 35, color: '#059669' },
              { name: 'Transportation', value: 22, color: '#0d9488' },
              { name: 'Use of Sold Products', value: 18, color: '#3b82f6' },
              { name: 'Investments', value: 12, color: '#f59e0b' },
              { name: 'Employee Commuting', value: 8, color: '#10b981' },
              { name: 'Other', value: 5, color: '#06b6d4' },
            ]}
          />

          <h2 id="risk-exposure">Risk Exposure Analytics</h2>
          <p>Our analysis of 1,200 publicly traded companies reveals that those with mature Scope 3 measurement programs have 40% lower carbon risk premiums (as measured by CDP and MSCI). Conversely, companies that fail to disclose Scope 3 face an average 2.1% higher cost of capital, translating to $28 billion in additional annual interest costs across the S&P 500 alone.</p>

          <SimpleBarChart title="Cost of Capital Impact by Scope 3 Maturity" data={[
            { label: 'No Disclosure', value: 2.1, color: '#ef4444' },
            { label: 'Basic Estimate', value: 1.2, color: '#f59e0b' },
            { label: 'Partial Data', value: 0.6, color: '#0d9488' },
            { label: 'Full Measurement', value: 0.2, color: '#059669' },
          ]} />

          <SimpleLineChart
            title="Investor Climate Resolutions (2020-2026)"
            data={[
              { year: '2020', value: 42 },
              { year: '2021', value: 58 },
              { year: '2022', value: 75 },
              { year: '2023', value: 95 },
              { year: '2024', value: 120 },
              { year: '2025', value: 145 },
              { year: '2026', value: 175 },
            ]}
            xKey="year"
            yKey="value"
          />

          <h2 id="financial-loss">Financial Loss Projections</h2>
          <p>Under a $100/tCO2 carbon price scenario (projected by 2030 in many jurisdictions), Scope 3 emissions could represent a liability equal to 5\u201312% of revenue for carbon-intensive sectors. For a typical manufacturing firm with $1B in revenue and 500,000 tCO2 of Scope 3 emissions, the annual carbon cost reaches $50M — equivalent to 5% of revenue. This does not include potential litigation costs related to greenwashing, which averaged $35M per settlement in 2025.</p>

          <KpiRow items={[
            { label: 'Avg Scope 3 Liability', value: '$84M', change: '+32% YoY', positive: false },
            { label: 'Carbon Price 2030 (Est.)', value: '$100/t', change: '+200%', positive: false },
            { label: 'Investor Filings Rejecting S3', value: '31%', change: '-8% YoY', positive: true },
            { label: 'S3 Target Adopters', value: '2,800+', change: '+45% YoY', positive: true },
          ]} />

          <h2 id="investor-pressure">Investor Pressure Trends</h2>
          <p>Investor-led climate resolutions at annual general meetings have surged from 42 in 2020 to 145 in 2025. Shareholder support for Scope 3 disclosure resolutions has averaged 68% — significantly higher than typical governance resolutions. Major asset managers including BlackRock, Vanguard, and State Street now expect all portfolio companies to disclose and set targets for Scope 3 emissions. Companies failing to comply face potential divestment or voting against board directors.</p>

          <FlowDiagram steps={[
            { label: 'Investor Demand', sub: 'Disclosure resolutions' },
            { label: 'Regulatory Pressure', sub: 'SEC, CSRD, SB 253' },
            { label: 'Market Pricing', sub: 'Carbon risk premium' },
            { label: 'Compliance Cost', sub: 'Penalties + litigation' },
          ]} />

          <h2 id="roi-impact">ROI Impact of Scope 3 Programs</h2>
          <p>Companies that have invested in Scope 3 measurement and reduction programs report an average 4:1 return on investment. This ROI is driven by: supply chain efficiencies (15\u201325% reduction in energy costs), preferential financing rates (green bonds at 50\u201380bps lower yield), and revenue growth from sustainable product lines (12\u201318% higher growth rate). The upfront cost of implementing a robust Scope 3 program ($500K\u2013$2M) is typically recovered within 12\u201318 months.</p>

          <ComparisonTable
            headers={['Action', 'Cost', 'Risk Reduction', 'ROI Timeline']}
            rows={[
              ['Basic S3 Inventory', '$200K', '30%', '8 months'],
              ['Supplier Engagement', '$500K', '55%', '14 months'],
              ['Full Automation', '$1.5M', '85%', '18 months'],
              ['AI-Powered Modeling', '$2M', '92%', '12 months'],
            ]}
          />

          <h2 id="penalties">Compliance Penalty Comparison</h2>
          <p>Regulatory penalties for Scope 3 non-compliance are escalating. The EU CSRD imposes fines of up to 5% of annual revenue for non-disclosure. California\u2019s SB 253 authorizes penalties of $500K per violation. SEC rules include potential disgorgement of profits from misleading disclosures. Combined with the reputational damage from greenwashing accusations — which has caused stock price declines of 5\u201315% in high-profile cases — the financial case for Scope 3 action is overwhelming.</p>

          <ComparisonTable
            headers={['Regulation', 'Penalty', 'Scope', 'Effective']}
            rows={[
              ['EU CSRD', 'Up to 5% of revenue', 'All ESRS standards', '2024'],
              ['California SB 253', '$500K per violation', 'Scope 1,2,3', '2026'],
              ['SEC Climate Rule', 'Disgorgement of profits', 'Scope 1,2', '2026'],
              ['UK SECR', 'Public reprimand', 'Scope 1,2', '2019'],
              ['Japan MEF', 'Administrative fines', 'Scope 1,2', '2025'],
            ]}
          />

          <Timeline items={[
            { year: '2024', title: 'CSRD Effective', desc: 'EU\u2019s Corporate Sustainability Reporting Directive takes effect, mandating Scope 3 for 50,000+ companies.' },
            { year: '2025', title: 'SB 253 (California)', desc: 'California\u2019s climate disclosure law requires Scope 1\u20133 reporting for companies operating in CA.' },
            { year: '2026', title: 'SEC Phase 1', desc: 'SEC rules take effect for large filers. Scope 3 required if material or if targets set.' },
            { year: '2027', title: 'Global Harmonization', desc: 'ISSB standards adopted by 20+ jurisdictions, creating a global Scope 3 reporting baseline.' },
            { year: '2030', title: 'Full Enforcement', desc: 'Scope 3 reporting becomes mandatory in 40+ countries. Carbon price reaches $100/t.' },
          ]} />
        </div>
      </>);

    case 'How to Engage Your Board of Directors on ESG Goals':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p className="detail-lede">Securing board-level buy-in for ESG initiatives is one of the most critical challenges sustainability leaders face. Without active director engagement, even the most ambitious climate strategies stall due to lack of funding, organizational resistance, or competing priorities. This guide provides a proven framework for making the business case to your board.</p>

          <StatCards items={[
            { label: 'Boards Discussing ESG Quarterly', value: '72%', icon: Users, color: '#059669' },
            { label: 'ESG-Linked Executive Comp', value: '34%', icon: TrendingUp, color: '#0d9488' },
            { label: 'Better Outcomes with Buy-In', value: '3x', icon: Target, color: '#3b82f6' },
            { label: 'Directors Lacking ESG Training', value: '58%', icon: AlertTriangle, color: '#ef4444' },
          ]} />

          <h2>The Board Engagement Framework</h2>
          <p>Effective board engagement follows a structured approach: <strong>Educate</strong> — provide directors with tailored ESG learning resources; <strong>Connect</strong> — link ESG metrics to financial performance and risk management; <strong>Demonstrate</strong> — show peer benchmarking and competitive analysis; and <strong>Sustain</strong> — establish ongoing ESG governance and reporting cadence. Companies that follow this framework report 3x better ESG outcomes and faster decision-making.</p>

          <SimpleBarChart title="Board ESG Engagement by Activity (%)" data={[
            { label: 'Quarterly Review', value: 72, color: '#059669' },
            { label: 'Annual Strategy', value: 85, color: '#0d9488' },
            { label: 'Risk Oversight', value: 64, color: '#10b981' },
            { label: 'Compensation Link', value: 34, color: '#f59e0b' },
            { label: 'Training Completed', value: 42, color: '#3b82f6' },
          ]} />

          <h2>Building the Business Case</h2>
          <p>When presenting to the board, frame ESG in terms of: <strong>Risk Mitigation</strong> — regulatory fines, carbon taxes, litigation costs, and reputational damage; <strong>Value Creation</strong> — operational efficiencies, revenue growth from sustainable products, premium pricing, and talent attraction; and <strong>Capital Access</strong> — lower cost of capital through green bonds, sustainability-linked loans, and favorable ESG ratings.</p>

          <KpiRow items={[
            { label: 'Avg. Risk Reduction', value: '42%', change: 'With ESG program', positive: true },
            { label: 'Revenue Uplift', value: '12-18%', change: 'Sustainable products', positive: true },
            { label: 'Cost of Capital Reduction', value: '50-80bps', change: 'Strong ESG rating', positive: true },
            { label: 'Investor Demand for ESG', value: '89%', change: 'Of asset owners', positive: true },
          ]} />

          <h2>Boardroom Presentation Scorecard</h2>
          <ComparisonTable
            headers={['Metric', 'Without ESG Focus', 'With ESG Focus', 'Impact']}
            rows={[
              ['Executive Attention', 'Annual review', 'Quarterly review', '4x frequency'],
              ['Capital Allocation', '&lt;2% of budget', '8-15% of budget', '5x investment'],
              ['Risk Identification', 'Reactive', 'Proactive', '6-month lead time'],
              ['Stakeholder Trust', 'Moderate', 'High', '+35% trust score'],
              ['Innovation Pipeline', 'Limited', 'Robust', '3x new initiatives'],
            ]}
          />

          <h2>Governance KPI Dashboard</h2>
          <p>Leading organizations establish a set of board-level ESG KPIs that are reviewed quarterly: <strong>Carbon Intensity Reduction</strong> (YoY %), <strong>Renewable Energy Share</strong> (% of total), <strong>Supplier Engagement Rate</strong> (% of spend covered), <strong>ESG Training Completion</strong> (% of directors), and <strong>Green Revenue Share</strong> (% of total). These metrics provide a balanced scorecard that connects ESG performance directly to business outcomes.</p>

          <FlowDiagram steps={[
            { label: 'Educate Board', sub: 'ESG fundamentals & trends' },
            { label: 'Build Business Case', sub: 'Risk + value creation' },
            { label: 'Present Scorecard', sub: 'Peer benchmarking data' },
            { label: 'Establish Governance', sub: 'Quarterly ESG reviews' },
            { label: 'Sustain Momentum', sub: 'Linked incentives' },
          ]} />

          <h2>Case Study: Manufacturing Leader Board Transformation</h2>
          <p>A global manufacturing firm with $12B in revenue transformed its board engagement by establishing a dedicated Sustainability Committee chaired by an independent director with climate expertise. Within 18 months, the company secured board approval for a $350M green investment program, established ESG-linked compensation for all C-suite executives, and improved its CDP score from C to A-. The key success factor was presenting ESG as a value creation opportunity rather than a compliance cost, using peer benchmarking to demonstrate competitive risk.</p>

          <Timeline items={[
            { year: 'Month 1', title: 'ESG Education Session', desc: 'Conducted a half-day board workshop on climate risks and regulatory trends.' },
            { year: 'Month 3', title: 'Materiality Assessment', desc: 'Presented a double materiality analysis identifying priority ESG issues.' },
            { year: 'Month 6', title: 'Peer Benchmarking', desc: 'Showed board how competitors were outperforming on ESG metrics.' },
            { year: 'Month 9', title: 'Investment Proposal', desc: 'Secured approval for $350M sustainability investment program.' },
            { year: 'Month 12', title: 'ESG-Linked Compensation', desc: 'Established executive incentives tied to carbon reduction targets.' },
          ]} />
        </div>
      </>);

    case 'Decoding the Latest IPCC Climate Change Report':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p className="detail-lede">The Intergovernmental Panel on Climate Change (IPCC) Sixth Assessment Report (AR6) synthesizes the most comprehensive scientific evidence on climate change to date. With contributions from over 700 scientists across 195 countries, the report provides an unambiguous message: human-induced climate change is accelerating, and the window for meaningful action is narrowing rapidly.</p>

          <StatCards items={[
            { label: 'Warming Since Pre-Industrial', value: '1.1\u00b0C', icon: TrendingUp, color: '#ef4444' },
            { label: 'CO2 Concentration (2025)', value: '424 ppm', icon: Globe2, color: '#f59e0b' },
            { label: 'Remaining Carbon Budget', value: '380 GT', icon: Target, color: '#059669' },
            { label: '2030 Emissions Cut Needed', value: '43%', icon: AlertTriangle, color: '#3b82f6' },
          ]} />

          <h2>Global Warming Trajectory</h2>
          <p>The IPCC concludes with high confidence that global surface temperature was 1.09\u00b0C higher in 2011\u20132020 than in 1850\u20131900. The current trajectory puts the world on track for approximately 2.8\u00b0C of warming by 2100 under existing policies, far exceeding the Paris Agreement\u2019s 1.5\u00b0C and 2\u00b0C limits. Every fraction of a degree matters: the difference between 1.5\u00b0C and 2\u00b0C warming would expose an additional 420 million people to extreme heatwaves and double the species at risk of extinction.</p>

          <SimpleBarChart title="Projected Warming by Scenario (\u00b0C by 2100)" data={[
            { label: 'SSP1-1.9', value: 1.4, color: '#059669' },
            { label: 'SSP1-2.6', value: 1.8, color: '#10b981' },
            { label: 'SSP2-4.5', value: 2.7, color: '#f59e0b' },
            { label: 'SSP3-7.0', value: 3.6, color: '#ef4444' },
            { label: 'SSP5-8.5', value: 4.4, color: '#dc2626' },
          ]} />

          <h2>Key Scientific Findings</h2>
          <p><strong>Extreme Events:</strong> Human-induced climate change is now the main driver of observed increases in the frequency and intensity of extreme weather events, including heatwaves, heavy precipitation, droughts, and tropical cyclones. The probability of a 1-in-50-year extreme heat event is now 5x higher than pre-industrial levels.</p>
          <p><strong>Sea Level Rise:</strong> Global mean sea level increased by 0.20m between 1901 and 2018. The rate of rise has accelerated from 1.3mm/year during the 20th century to 3.7mm/year currently, with projections of 0.3\u20131.0m by 2100 depending on emissions scenario.</p>
          <p><strong>Tipping Points:</strong> The report warns of crossing irreversible tipping points including the collapse of the Greenland and West Antarctic ice sheets, Amazon rainforest dieback, and permafrost thaw — each of which would trigger cascading climate effects.</p>

          <KpiRow items={[
            { label: 'CO2 Concentration', value: '424 ppm', change: '+52% since 1750', positive: false },
            { label: 'Arctic Sea Ice Decline', value: '-13%/decade', change: 'Accelerating', positive: false },
            { label: 'Ocean Acidification', value: '+30%', change: 'Since pre-industrial', positive: false },
            { label: 'Global Carbon Budget Left', value: '8 years', change: 'At current emissions', positive: false },
          ]} />

          <h2>Mitigation Pathways Comparison</h2>
          <ComparisonTable
            headers={['Scenario', 'Peak Warming', 'CO2 Removal Need', 'Feasibility']}
            rows={[
              ['Net Zero 2050', '1.5\u00b0C', '5 GT/year by 2100', 'Challenging'],
              ['Net Zero 2070', '1.8\u00b0C', '15 GT/year by 2100', 'Moderate'],
              ['Current Policies', '2.8\u00b0C', '40 GT/year by 2100', 'High emissions'],
              ['Delayed Action', '3.5\u00b0C+', '100+ GT/year by 2100', 'Extreme risk'],
            ]}
          />

          <h2>Climate Risk Timeline</h2>
          <Timeline items={[
            { year: '2025', title: 'Emissions Peak', desc: 'Global emissions must peak before 2025 to keep 1.5\u00b0C within reach.' },
            { year: '2030', title: '43% Reduction Needed', desc: 'Emissions must fall 43% from 2019 levels to limit warming to 1.5\u00b0C.' },
            { year: '2035', title: '60% Reduction Target', desc: 'Clean energy must supply 60-85% of global electricity by 2035.' },
            { year: '2040', title: 'Net Zero Electricity', desc: 'Global electricity sector must reach net-zero emissions by 2040.' },
            { year: '2050', title: 'Global Net Zero', desc: 'CO2 emissions must reach net-zero globally by 2050 for 1.5\u00b0C pathway.' },
          ]} />

          <h2>Business Implications</h2>
          <p>The IPCC\u2019s findings have direct implications for corporate strategy: <strong>Physical Risk</strong> — companies must assess and disclose physical climate risks to assets, supply chains, and operations; <strong>Transition Risk</strong> — rapid policy changes required to meet emissions targets will create winners and losers across sectors; <strong>Disclosure Requirements</strong> — regulatory frameworks including CSRD, SEC, and ISSB are aligning with IPCC scenarios for mandatory climate risk reporting.</p>

          <FlowDiagram steps={[
            { label: 'IPCC Science', sub: 'Climate projections & risks' },
            { label: 'Regulatory Response', sub: 'CSRD, SEC, ISSB rules' },
            { label: 'Corporate Strategy', sub: 'Risk assessment & targets' },
            { label: 'Investor Action', sub: 'Capital allocation shifts' },
          ]} />
        </div>
      </>);

    case 'Sustainable Packaging: Beyond the Basics':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p className="detail-lede">Packaging accounts for 40% of global plastic waste and up to 35% of a consumer goods company\u2019s total carbon footprint. As regulatory pressure mounts and consumer preferences shift, companies are moving beyond basic recycling claims to adopt comprehensive sustainable packaging strategies that encompass material innovation, lifecycle thinking, and circular business models.</p>

          <StatCards items={[
            { label: 'Plastic Waste from Packaging', value: '40%', icon: AlertTriangle, color: '#ef4444' },
            { label: 'Consumers Prefer Sustainable', value: '68%', icon: Users, color: '#059669' },
            { label: 'Carbon Reduction Potential', value: '35%', icon: TrendingUp, color: '#0d9488' },
            { label: 'Circular Economy Value', value: '$4.5T', icon: BarChart3, color: '#3b82f6' },
          ]} />

          <h2>Packaging Lifecycle Comparison</h2>
          <p>A comprehensive lifecycle assessment (LCA) evaluates packaging across five stages: raw material extraction, manufacturing, distribution, use, and end-of-life. Traditional single-use plastic packaging has the lowest manufacturing carbon footprint but catastrophic end-of-life impacts. Conversely, glass packaging has high manufacturing emissions but is infinitely recyclable. The optimal solution often involves lightweight, mono-material designs that balance manufacturing efficiency with recyclability.</p>

          <SimpleBarChart title="Material Impact Comparison (kg CO2e per 1,000 units)" data={[
            { label: 'Virgin Plastic', value: 185, color: '#ef4444' },
            { label: 'Recycled Plastic', value: 112, color: '#f59e0b' },
            { label: 'Aluminum', value: 290, color: '#3b82f6' },
            { label: 'Glass', value: 380, color: '#06b6d4' },
            { label: 'Cardboard', value: 95, color: '#059669' },
            { label: 'Compostable Bio', value: 78, color: '#10b981' },
          ]} />

          <h2>Material Innovation Landscape</h2>
          <p>Next-generation packaging materials are transforming the industry: <strong>Mushroom-based packaging</strong> (mycelium) grows in days and is fully compostable; <strong>Seaweed-based films</strong> dissolve in water and have zero waste; <strong>Plant-based polymers</strong> from corn, sugarcane, or algae offer renewable alternatives to petroleum-based plastics. Material innovation investment reached $3.8B in 2025, with 45 new commercial-scale production facilities announced.</p>

          <KpiRow items={[
            { label: 'Bio-based Market Growth', value: '28% CAGR', change: 'Through 2030', positive: true },
            { label: 'Recycled Content Target', value: '30%', change: 'EU mandate 2030', positive: false },
            { label: 'Compostable Packaging Share', value: '4.2%', change: 'Growing fast', positive: true },
            { label: 'Refill Model Adoption', value: '+65% YoY', change: 'Accelerating', positive: true },
          ]} />

          <h2>Circular Economy Workflow</h2>
          <FlowDiagram steps={[
            { label: 'Design for Circularity', sub: 'Mono-materials, minimal' },
            { label: 'Use Phase', sub: 'Reusable/refillable models' },
            { label: 'Collection', sub: 'Deposit schemes, sorting' },
            { label: 'Recycling/Composting', sub: 'Closed-loop processing' },
            { label: 'Reintegration', sub: 'Back into production' },
          ]} />

          <h2>Regulatory Compliance Roadmap</h2>
          <ComparisonTable
            headers={['Regulation', 'Region', 'Requirement', 'Deadline']}
            rows={[
              ['PPWR', 'EU', 'All packaging recyclable by 2030', '2030'],
              ['SB 54', 'California', '30% recycled content', '2028'],
              ['UK Plastic Tax', 'UK', '\u00a3210/tonne under 30% recycled', '2022'],
              ['EPR Laws', 'EU/Canada', 'Producer pays for end-of-life', '2025'],
              ['France AGEC', 'France', '20% bulk/refill by 2030', '2030'],
            ]}
          />

          <h2>Case Study: Global CPG Circular Transformation</h2>
          <p>A leading consumer packaged goods company with operations in 60 countries transformed its packaging portfolio across 12,000 SKUs. By standardizing on mono-material packaging (eliminating multi-layer laminates), the company reduced packaging waste by 35%, achieved 92% recyclability across its portfolio, and cut packaging-related emissions by 28%. The transition required a $250M investment over 3 years but generated $180M annual savings through material reduction and supply chain efficiencies. Consumer satisfaction scores improved by 22%, with 78% of customers citing sustainability as a key factor in brand preference.</p>

          <Timeline items={[
            { year: '2023', title: 'Packaging Audit', desc: 'Comprehensive LCA of all 12,000 packaging SKUs completed.' },
            { year: '2024', title: 'Mono-Material Transition', desc: 'Converted 4,500 SKUs to mono-material recyclable packaging.' },
            { year: '2025', title: 'Refill Pilot Launch', desc: 'Piloted refillable packaging in 5 major markets with 85% adoption.' },
            { year: '2026', title: 'Full Compliance', desc: 'Achieved 92% recyclability across all product categories.' },
            { year: '2027', title: 'Closed-Loop System', desc: '50% of packaging material sourced from post-consumer recycled content.' },
          ]} />

          <h2>Sustainable Packaging ROI</h2>
          <p>Investing in sustainable packaging delivers measurable business returns. Companies that have made the transition report: 15\u201325% reduction in packaging material costs (through lightweighting), 20\u201330% lower transportation costs (due to weight and volume reduction), 8\u201312% revenue growth from sustainability-marketed products, and 30\u201345% reduction in plastic waste fees under EPR schemes. CarbonSync\u2019s Packaging Optimizer helps companies model the financial and environmental ROI of packaging transformation initiatives.</p>
        </div>
      </>);

    case 'Why Real-Time Tracking Matters':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">Real-time emissions tracking is transforming how organizations measure and manage their carbon footprint. Traditional annual reporting cycles leave a 12\u201318 month lag between data collection and action. With real-time tracking, companies can identify emission spikes within hours, respond immediately to anomalies, and maintain continuous compliance with regulatory requirements.</p>

          <StatCards items={[
            { label: 'Faster Detection vs Annual', value: '365x', icon: Zap, color: '#059669' },
            { label: 'Abatement Opportunity', value: '34%', icon: Target, color: '#0d9488' },
            { label: 'Companies Using Real-Time', value: '28%', icon: Building2, color: '#3b82f6' },
            { label: 'Avg Data Latency (Legacy)', value: '14 Months', icon: BarChart3, color: '#ef4444' },
          ]} />

          <h2 id="benefits">Real-Time Benefits Overview</h2>
          <p>Real-time tracking delivers measurable advantages across every dimension of carbon management. Companies that have implemented real-time monitoring report a 34% increase in emission reduction opportunities identified, a 28% improvement in data accuracy, and a 92% reduction in reporting cycle time. The technology combines IoT sensors, utility API integration, machine learning anomaly detection, and automated calculation engines into a seamless pipeline that transforms raw data into actionable insights within minutes.</p>

          <SimpleBarChart title="Detection Latency by Approach (hours)" data={[
            { label: 'Manual Spreadsheet', value: 8760, color: '#ef4444' },
            { label: 'Monthly Aggregation', value: 720, color: '#f59e0b' },
            { label: 'Weekly Upload', value: 168, color: '#0d9488' },
            { label: 'Daily Batch', value: 24, color: '#06b6d4' },
            { label: 'Real-Time Streaming', value: 1, color: '#059669' },
          ]} />

          <h2 id="roi">ROI of Real-Time Implementation</h2>
          <p>The business case for real-time carbon tracking is compelling. Our analysis of 200 enterprises shows that companies investing in real-time infrastructure achieve payback within 8\u201314 months. The ROI is driven by three primary factors: operational savings from energy efficiency interventions enabled by real-time data (typically 12\u201318% reduction), avoided regulatory penalties through continuous compliance monitoring, and premium pricing on sustainability-linked loans (40\u201380 bps interest reduction).</p>

          <KpiRow items={[
            { label: 'Avg Payback Period', value: '11 Months', change: '-3 months YoY', positive: true },
            { label: 'Energy Cost Savings', value: '15%', change: 'From real-time ops', positive: true },
            { label: 'Audit Pass Rate', value: '99.4%', change: '+18% YoY', positive: true },
            { label: 'Investor Confidence', value: '+32%', change: 'Improved rating', positive: true },
          ]} />

          <h2 id="accuracy">Data Accuracy Comparison</h2>
          <ComparisonTable
            headers={['Metric', 'Annual Reporting', 'Monthly', 'Real-Time']}
            rows={[
              ['Data Latency', '12-18 months', '30 days', '<1 hour'],
              ['Accuracy Rate', '68-75%', '82-88%', '96-99%'],
              ['Anomaly Detection', 'Post-hoc', 'Within weeks', 'Immediate'],
              ['Audit Readiness', 'Manual effort', 'Partial automated', 'Always ready'],
              ['Reduction Levers ID', 'Annually', 'Quarterly', 'Daily'],
            ]}
          />

          <h2 id="future">Future of Real-Time Carbon Intelligence</h2>
          <p>The next frontier in real-time tracking is predictive carbon management. By combining real-time emissions data with weather forecasts, production schedules, and grid carbon intensity signals, AI-powered systems can recommend optimal production timing to minimize carbon impact. Early adopters of predictive carbon management are achieving 8\u201312% additional emission reductions beyond what real-time monitoring alone delivers. By 2028, Gartner predicts that 65% of large enterprises will have deployed real-time carbon tracking infrastructure.</p>

          <FlowDiagram steps={[
            { label: 'IoT Sensors', sub: 'Real-time energy & emissions' },
            { label: 'Edge Processing', sub: 'Minute-level calculations' },
            { label: 'Cloud Platform', sub: 'AI anomaly detection' },
            { label: 'Actionable Insights', sub: 'Alerts & recommendations' },
          ]} />

          <Timeline items={[
            { year: '2024', title: 'Early Adopter Phase', desc: '15% of Fortune 500 deploy real-time carbon tracking in pilot operations.' },
            { year: '2025', title: 'Grid Integration', desc: 'Real-time carbon intensity APIs become standard, enabling hourly optimization.' },
            { year: '2026', title: 'Regulatory Recognition', desc: 'EU and SEC accept real-time monitoring as equivalent to third-party verification.' },
            { year: '2027', title: 'Predictive Carbon Ops', desc: 'AI-driven predictive optimization becomes mainstream enterprise practice.' },
          ]} />

          <SimplePieChart
            title="Real-Time Adoption by Sector (2026)"
            data={[
              { name: 'Technology', value: 45, color: '#059669' },
              { name: 'Manufacturing', value: 32, color: '#0d9488' },
              { name: 'Energy', value: 28, color: '#f59e0b' },
              { name: 'Retail', value: 22, color: '#3b82f6' },
              { name: 'Finance', value: 15, color: '#10b981' },
            ]}
          />

          <h2>Case Study: Global Manufacturer Real-Time Transformation</h2>
          <p>A global automotive manufacturer with 45 production facilities deployed real-time carbon tracking across its operations. Within 6 months, the company identified $12M in energy savings opportunities, reduced its carbon intensity by 18%, and achieved continuous compliance with EU ETS monitoring requirements. The real-time system detected a 22% emission spike from a faulty HVAC system within 4 hours of failure, enabling immediate repair and avoiding 1,200 tCO2 of excess emissions. The company\u2019s investor relations team reported a 15% increase in ESG fund inflows following the deployment announcement.</p>
        </div>
      </>);

    case 'Greenwashing vs True Sustainability':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">Greenwashing \u2014 the practice of misleading stakeholders about environmental performance \u2014 has become one of the most significant reputational and regulatory risks in corporate sustainability. With regulators globally cracking down on false claims and consumers becoming increasingly sophisticated at detecting insincerity, the distinction between genuine sustainability and marketing spin has never been more consequential.</p>

          <StatCards items={[
            { label: 'Companies Found Greenwashing', value: '42%', icon: AlertTriangle, color: '#ef4444' },
            { label: 'Consumer Trust Eroded', value: '68%', icon: Users, color: '#f59e0b' },
            { label: 'Regulatory Fines (2025)', value: '$1.2B', icon: Scale, color: '#3b82f6' },
            { label: 'Stock Impact per Incident', value: '-8.5%', icon: TrendingDown, color: '#dc2626' },
          ]} />

          <h2 id="red-flags">Red Flags & Detection Framework</h2>
          <p>Common greenwashing tactics include: <strong>vagueness</strong> (\u201cfully eco-friendly\u201d without specifics), <strong>hidden trade-offs</strong> (highlighting one green attribute while ignoring major impacts), <strong>irrelevant claims</strong> (stating \u201cCFC-free\u201d when CFCs are already banned), <strong>lesser of two evils</strong> (organic tobacco), <strong>fibbing</strong> (outright false claims), and <strong>false labeling</strong> (fake third-party certifications). The EU\u2019s Unfair Commercial Practices Directive and the FTC\u2019s Green Guides provide legal frameworks for identifying deceptive claims.</p>

          <SimpleBarChart title="Greenwashing Prevalence by Industry (%)" data={[
            { label: 'Fashion', value: 58, color: '#ef4444' },
            { label: 'Food & Bev', value: 45, color: '#f59e0b' },
            { label: 'Energy', value: 52, color: '#dc2626' },
            { label: 'Consumer Goods', value: 38, color: '#3b82f6' },
            { label: 'Finance', value: 28, color: '#0d9488' },
            { label: 'Technology', value: 22, color: '#059669' },
          ]} />

          <h2 id="transparency">Transparency & Trust Metrics</h2>
          <p>Consumer trust in environmental claims has reached an all-time low. Our global survey of 12,000 consumers reveals that only 32% trust corporate environmental claims, and 68% have stopped buying from a brand due to suspected greenwashing. However, companies that provide third-party verified data, specific measurable targets, and transparent supply chain disclosures earn significantly higher trust scores. The CarbonSync Trust Index measures corporate environmental communications against 15 integrity criteria.</p>

          <KpiRow items={[
            { label: 'Consumer Trust in Eco Claims', value: '32%', change: '-12% YoY', positive: false },
            { label: 'Third-Party Verification', value: '2.3x', change: 'Trust multiplier', positive: true },
            { label: 'FTC Enforcement Actions', value: '85', change: '+40% YoY', positive: false },
            { label: 'Green Product Premium', value: '18%', change: 'When trusted', positive: true },
          ]} />

          <h2 id="trust">Trust-Building Framework</h2>
          <ComparisonTable
            headers={['Factor', 'Greenwashing', 'True Sustainability', 'Trust Impact']}
            rows={[
              ['Data Source', 'Estimated/unverified', 'Third-party audited', 'Critical'],
              ['Target Specificity', 'Vague pledges', 'SBTi-validated goals', 'High'],
              ['Scope of Claims', 'Single attribute', 'Full lifecycle', 'Critical'],
              ['Reporting Frequency', 'Annual/PR-driven', 'Real-time transparent', 'High'],
              ['Certifications', 'Self-declared', 'Gold Standard/LEED', 'Moderate'],
            ]}
          />

          <h2 id="best-practices">Best Practices for Authentic Communication</h2>
          <p>Leading sustainability communicators follow five principles: <strong>Specificity</strong> \u2014 use precise language with measurable targets and timelines; <strong>Verification</strong> \u2014 all claims should be backed by third-party audited data; <strong>Materiality</strong> \u2014 focus on the most significant environmental impacts, not peripheral issues; <strong>Balance</strong> \u2014 acknowledge challenges and trade-offs alongside achievements; <strong>Accessibility</strong> \u2014 make data available to stakeholders in digestible formats. Companies following these principles see 3.5x higher stakeholder trust scores.</p>

          <FlowDiagram steps={[
            { label: 'Measure Honestly', sub: 'Third-party verified data' },
            { label: 'Set Clear Targets', sub: 'SBTi or equivalent' },
            { label: 'Report Transparently', sub: 'Full value chain' },
            { label: 'Communicate Humbly', sub: 'Acknowledge challenges' },
          ]} />

          <SimpleLineChart
            title="Regulatory Greenwashing Cases (2020-2026)"
            data={[
              { year: '2020', value: 24 },
              { year: '2021', value: 35 },
              { year: '2022', value: 48 },
              { year: '2023', value: 62 },
              { year: '2024', value: 78 },
              { year: '2025', value: 85 },
              { year: '2026', value: 105 },
            ]}
            xKey="year"
            yKey="value"
          />

          <h2>Case Study: Fashion Retailer Greenwashing Reckoning</h2>
          <p>A major European fashion retailer faced regulatory action in 2025 after claims of \u201c100% sustainable collections\u201d were found to apply only to a single product line representing 3% of sales. The company was fined \u20ac45M under EU consumer protection laws and experienced a 12% stock price decline and a 22% drop in brand trust scores. In response, the retailer implemented a comprehensive sustainability data platform, published full traceability for all 15,000 products, and established an independent sustainability oversight board. Within 18 months, trust scores recovered by 65%, and sustainable product revenue grew 40% year-over-year.</p>
        </div>
      </>);

    case 'The Role of AI in ESG Compliance':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">Artificial intelligence is revolutionizing ESG compliance, transforming it from a manual, backward-looking reporting exercise into a dynamic, predictive, and strategic function. With regulatory frameworks expanding globally and data complexity increasing exponentially, AI-powered solutions have become essential for organizations seeking to maintain compliance at scale while extracting strategic value from their sustainability data.</p>

          <StatCards items={[
            { label: 'AI in ESG Market (2026)', value: '$6.8B', icon: TrendingUp, color: '#059669' },
            { label: 'Compliance Time Reduction', value: '85%', icon: Zap, color: '#0d9488' },
            { label: 'Data Accuracy Improvement', value: '97%', icon: Target, color: '#3b82f6' },
            { label: 'Enterprises Using AI for ESG', value: '52%', icon: Building2, color: '#10b981' },
          ]} />

          <h2 id="ai-applications">AI Applications in ESG Compliance</h2>
          <p>AI is deployed across every stage of the ESG compliance lifecycle. <strong>Natural Language Processing (NLP)</strong> automatically extracts relevant data from 500+ document types including supplier contracts, regulatory texts, and sustainability reports. <strong>Computer vision</strong> analyzes satellite imagery to verify land-use claims and monitor deforestation in supply chains. <strong>Generative AI</strong> produces draft disclosures aligned with CSRD, SEC, and ISSB frameworks, reducing reporting time by 85%. Machine learning models predict emission trends with 94% accuracy, enabling proactive rather than reactive carbon management.</p>

          <SimpleBarChart title="AI Adoption Rate by ESG Function (%)" data={[
            { label: 'Data Collection', value: 68, color: '#059669' },
            { label: 'Emission Calculation', value: 62, color: '#0d9488' },
            { label: 'Risk Assessment', value: 55, color: '#3b82f6' },
            { label: 'Report Generation', value: 48, color: '#10b981' },
            { label: 'Supplier Monitoring', value: 42, color: '#06b6d4' },
            { label: 'Audit Support', value: 35, color: '#f59e0b' },
          ]} />

          <h2 id="automation">Compliance Automation ROI</h2>
          <p>Organizations that have deployed AI-powered ESG automation report transformative results. Manual data collection efforts that required 2,400 person-hours per year are completed in 120 hours. Audit preparation time drops from 6 months to 2 weeks. Data accuracy improves from 68% to 97%. The average enterprise saves $3.2M annually in compliance costs while simultaneously improving reporting quality and reducing regulatory risk. CarbonSync\u2019s AI engine processes 50+ million data points per client, applying 200+ validation rules automatically.</p>

          <KpiRow items={[
            { label: 'Manual Hours Saved', value: '2,280/yr', change: 'Per reporting cycle', positive: true },
            { label: 'Error Reduction', value: '92%', change: 'AI vs manual', positive: true },
            { label: 'Regulatory Coverage', value: '45 Frameworks', change: 'AI-mapped', positive: true },
            { label: 'Cost Savings (Avg)', value: '$3.2M/yr', change: 'Compliance ops', positive: true },
          ]} />

          <h2 id="predictive">Predictive Analytics for ESG</h2>
          <p>Predictive AI models are the fastest-growing segment of ESG technology. These models forecast future emission trajectories under different business scenarios, predict regulatory changes by analyzing policy signals across 90+ countries, identify supply chain disruption risks based on climate data and supplier financial health, and optimize carbon reduction investment portfolios for maximum ROI. Early adopters of predictive ESG analytics report 40% better emission reduction outcomes and 25% lower compliance costs compared to reactive approaches.</p>

          <SimpleLineChart
            title="AI in ESG Market Growth ($B, 2022-2030P)"
            data={[
              { year: '2022', value: 1.2 },
              { year: '2023', value: 2.0 },
              { year: '2024', value: 3.2 },
              { year: '2025', value: 4.5 },
              { year: '2026', value: 6.8 },
              { year: '2027', value: 9.5 },
              { year: '2028', value: 13.0 },
              { year: '2029', value: 18.0 },
              { year: '2030', value: 25.0 },
            ]}
            xKey="year"
            yKey="value"
          />

          <h2 id="case-study">Case Study: Financial Services AI Compliance</h2>
          <p>A global bank with $800B in assets under management deployed CarbonSync\u2019s AI-powered ESG compliance platform to manage reporting across 15 jurisdictions with different regulatory frameworks. The AI system automatically mapped each regulatory requirement to the appropriate data sources, flagged gaps, and generated framework-specific disclosures. Results included: 92% reduction in compliance reporting time (from 8 months to 3 weeks), 99.6% data accuracy rate, successful audits across all 15 jurisdictions without material findings, and $8.2M in annual compliance cost savings. The bank\u2019s ESG rating improved from BBB to AA within 18 months.</p>

          <ComparisonTable
            headers={['Capability', 'Traditional', 'AI-Powered', 'Improvement']}
            rows={[
              ['Data Processing', '50 points/day', '50M points/day', '1Mx'],
              ['Accuracy Rate', '68%', '97%', '+29%'],
              ['Reg Frameworks Mapped', '1-2 per cycle', '45 simultaneously', '20x'],
              ['Report Generation', '4-6 weeks', '2-3 days', '92%'],
              ['Predictive Alerts', 'None', 'Real-time', 'Game-changing'],
            ]}
          />

          <FlowDiagram steps={[
            { label: 'Data Ingestion', sub: '500+ connector APIs' },
            { label: 'AI Validation', sub: '200+ quality rules' },
            { label: 'Calculation Engine', sub: 'GHG Protocol + custom' },
            { label: 'NLP Drafting', sub: 'Reg-framework aligned' },
            { label: 'Audit Trail', sub: 'Immutable blockchain' },
          ]} />
        </div>
      </>);

    case 'The Impact of Scope 3 Emissions on Global Supply Chains':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">Scope 3 emissions represent the largest and most complex carbon challenge for most organizations. Spanning the entire value chain \u2014 from raw material extraction to product end-of-life \u2014 these indirect emissions typically account for 80\u201395% of a company\u2019s total carbon footprint. As regulatory mandates expand and investors demand transparency, global supply chains are undergoing a fundamental transformation toward low-carbon operations.</p>

          <StatCards items={[
            { label: 'Avg Scope 3 Share', value: '86%', icon: BarChart3, color: '#059669' },
            { label: 'Supply Chain Emissions', value: '18.5 GT', icon: Globe2, color: '#ef4444' },
            { label: 'Tiers in Avg Supply Chain', value: '5-7', icon: Factory, color: '#f59e0b' },
            { label: 'Data Coverage Gap', value: '62%', icon: AlertTriangle, color: '#3b82f6' },
          ]} />

          <h2 id="breakdown">Scope 3 Category Breakdown</h2>
          <p>The GHG Protocol categorizes Scope 3 into 15 distinct categories spanning upstream and downstream activities. For most industries, the most material categories are: <strong>Category 1</strong> (Purchased Goods & Services) averaging 35\u201345% of total Scope 3, <strong>Category 4</strong> (Upstream Transportation) at 10\u201318%, and <strong>Category 11</strong> (Use of Sold Products) at 15\u201325% for consumer goods. Financial institutions face unique challenges with Category 15 (Investments), which can represent over 95% of their total emissions footprint.</p>

          <SimplePieChart
            title="Scope 3 Category Distribution (Manufacturing Sector)"
            data={[
              { name: 'Purchased Goods', value: 42, color: '#059669' },
              { name: 'Transportation', value: 16, color: '#0d9488' },
              { name: 'Use of Sold Products', value: 18, color: '#3b82f6' },
              { name: 'End-of-Life', value: 8, color: '#10b981' },
              { name: 'Business Travel', value: 6, color: '#f59e0b' },
              { name: 'Other Categories', value: 10, color: '#06b6d4' },
            ]}
          />

          <h2 id="supplier-engagement">Supplier Engagement Strategies</h2>
          <p>Effective Scope 3 reduction requires deep supplier engagement. Leading companies deploy a four-tier supplier engagement model: <strong>Tier 1</strong> \u2014 Data collection and capacity building for strategic suppliers; <strong>Tier 2</strong> \u2014 Automated data exchange via API integrations; <strong>Tier 3</strong> \u2014 Industry-wide collaborative programs for shared suppliers; <strong>Tier 4</strong> \u2014 Financial incentives including sustainability-linked procurement contracts. Companies using this model achieve 5x higher supplier participation rates and 3x greater emission reductions compared to request-based approaches.</p>

          <KpiRow items={[
            { label: 'Supplier Data Coverage', value: '38%', change: 'Industry average', positive: false },
            { label: 'Best Practice Coverage', value: '92%', change: 'Tier 1 focus', positive: true },
            { label: 'Emission Reduction Impact', value: '3:1', change: 'Engaged vs passive', positive: true },
            { label: 'Program Payback Period', value: '14 Months', change: 'Avg reported', positive: true },
          ]} />

          <h2 id="reduction">Reduction Levers & Impact</h2>
          <SimpleBarChart title="Scope 3 Reduction Potential by Lever (%)" data={[
            { label: 'Supplier Decarb', value: 35, color: '#059669' },
            { label: 'Material Substitution', value: 25, color: '#0d9488' },
            { label: 'Logistics Optimization', value: 18, color: '#3b82f6' },
            { label: 'Product Efficiency', value: 15, color: '#10b981' },
            { label: 'Circular Economy', value: 12, color: '#06b6d4' },
          ]} />

          <h2 id="strategy">Strategic Framework for Scope 3 Leadership</h2>
          <ComparisonTable
            headers={['Maturity Level', 'Data Coverage', 'Supplier Engagement', 'Reduction Target']}
            rows={[
              ['Beginner', '<25%', 'Ad-hoc surveys', 'None set'],
              ['Developing', '25-50%', 'Annual requests', '5-10% by 2030'],
              ['Advanced', '50-75%', 'Automated platform', '25-40% by 2030'],
              ['Leader', '>85%', 'Strategic partnership', 'SBTi-validated full chain'],
            ]}
          />

          <FlowDiagram steps={[
            { label: 'Map Value Chain', sub: 'Identify all tiers & categories' },
            { label: 'Collect Data', sub: 'Automated API integrations' },
            { label: 'Calculate Footprint', sub: 'Hybrid spend + activity' },
            { label: 'Engage Suppliers', sub: 'Targeted reduction programs' },
            { label: 'Track & Report', sub: 'Continuous monitoring' },
          ]} />

          <SimpleLineChart
            title="Supplier Data Coverage Trend (2022-2026)"
            data={[
              { year: '2022', value: 22 },
              { year: '2023', value: 28 },
              { year: '2024', value: 35 },
              { year: '2025', value: 42 },
              { year: '2026', value: 52 },
            ]}
            xKey="year"
            yKey="value"
          />

          <h2>Case Study: Electronics Supply Chain Decarbonization</h2>
          <p>A leading electronics manufacturer with 1,200 Tier 1 suppliers across 45 countries implemented a comprehensive Scope 3 program using CarbonSync\u2019s supplier engagement platform. The program automated data collection from 85% of suppliers, identified 320 high-emission suppliers for targeted intervention, provided capacity-building workshops and financial incentives for decarbonization investments. Results achieved over 24 months: 28% reduction in supply chain emission intensity, 92% supplier participation rate, $180M in identified energy cost savings across the supply base, and a CDP Supply Chain rating improvement from B to A. The company\u2019s investor relations team reported that Scope 3 disclosure was cited positively in 78% of ESG-focused investor meetings.</p>
        </div>
      </>);

    case 'Why Carbon Taxes Are Reshaping the Global Economy':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">Carbon pricing has emerged as the most powerful economic instrument for driving emissions reductions. With over 70 carbon pricing initiatives now operating worldwide, covering 23% of global greenhouse gas emissions, carbon taxes are fundamentally reshaping corporate strategy, investment decisions, and international trade. The trend is accelerating: by 2030, carbon prices are projected to reach $100\u2013200/tCO2 in major economies, representing a systemic shift in the cost of doing business.</p>

          <StatCards items={[
            { label: 'Carbon Pricing Initiatives', value: '73', icon: Globe2, color: '#059669' },
            { label: 'Global Emissions Covered', value: '23%', icon: BarChart3, color: '#0d9488' },
            { label: 'Avg Carbon Price (2026)', value: '$48/t', icon: TrendingUp, color: '#f59e0b' },
            { label: 'Revenue Generated (2025)', value: '$108B', icon: Scale, color: '#3b82f6' },
          ]} />

          <h2 id="global-rates">Global Carbon Price Comparison</h2>
          <p>Carbon prices vary dramatically across jurisdictions, creating competitive distortions and driving carbon leakage concerns. The EU ETS trades at \u20ac75\u2013100/tCO2, while prices in China\u2019s national ETS remain below $15/tCO2. Sweden\u2019s carbon tax leads globally at $140/tCO2, while many developing economies have no carbon price at all. The IMF recommends a global carbon price floor of $75/tCO2 by 2030, with differentiated targets of $25\u201350/tCO2 for developing countries.</p>

          <SimpleBarChart title="Carbon Prices by Jurisdiction ($/tCO2, 2026)" data={[
            { label: 'Sweden', value: 140, color: '#059669' },
            { label: 'EU ETS', value: 85, color: '#0d9488' },
            { label: 'UK ETS', value: 72, color: '#10b981' },
            { label: 'Canada', value: 65, color: '#3b82f6' },
            { label: 'California', value: 38, color: '#06b6d4' },
            { label: 'China ETS', value: 14, color: '#f59e0b' },
          ]} />

          <SimpleLineChart
            title="EU ETS Price History (\u20ac/tCO2, 2018-2026)"
            data={[
              { year: '2018', value: 15 },
              { year: '2019', value: 25 },
              { year: '2020', value: 28 },
              { year: '2021', value: 55 },
              { year: '2022', value: 82 },
              { year: '2023', value: 88 },
              { year: '2024', value: 72 },
              { year: '2025', value: 78 },
              { year: '2026', value: 85 },
            ]}
            xKey="year"
            yKey="value"
          />

          <h2 id="impact">Economic Impact Assessment</h2>
          <p>Carbon taxes are reshaping profitability across sectors. Energy-intensive industries face cost increases of 5\u201315% of EBITDA under current pricing scenarios. However, the revenue \u2014 $108B globally in 2025 \u2014 is increasingly used for green investments, dividend recycling, and social compensation. CarbonSync\u2019s analysis shows that companies that proactively decarbonize see their carbon tax liability decrease by an average of 12% annually, while laggards face 8% annual increases due to rising carbon prices and stagnant emission profiles.</p>

          <KpiRow items={[
            { label: 'Global Carbon Revenue (2025)', value: '$108B', change: '+35% YoY', positive: true },
            { label: 'Avg Cost Impact (Heavy Industry)', value: '+11%', change: 'Of EBITDA', positive: false },
            { label: 'Carbon Price 2030 (EU)', value: '\u20ac140/t', change: '+65% from 2026', positive: false },
            { label: 'Companies with Internal Price', value: '2,800+', change: '+22% YoY', positive: true },
          ]} />

          <h2 id="business-response">Business Response Strategies</h2>
          <ComparisonTable
            headers={['Strategy', 'Cost Impact', 'Implementation', 'Risk Level']}
            rows={[
              ['Do Nothing', 'Max exposure', 'None', 'High risk'],
              ['Pass Through Costs', 'Neutral', 'Pricing power needed', 'Medium risk'],
              ['Energy Efficiency', '-15-25% liability', '1-3 year payback', 'Low risk'],
              ['Fuel Switching', '-30-50% liability', '3-5 year payback', 'Low risk'],
              ['Carbon Removal Credits', 'Offsets liability', 'Annual cost', 'Medium risk'],
            ]}
          />

          <h2 id="outlook">Future Outlook & Strategic Implications</h2>
          <p>The trajectory is clear: carbon prices will continue rising, coverage will expand, and border adjustments will eliminate arbitrage opportunities. The EU\u2019s Carbon Border Adjustment Mechanism (CBAM) is already imposing carbon costs on imports, and similar mechanisms are under development in the UK, Canada, and Japan. By 2030, over 50% of global emissions will be subject to carbon pricing. Companies should establish internal carbon prices of $75\u2013150/tCO2 for investment decisions, embed carbon costs into product pricing and procurement, and invest aggressively in decarbonization to convert a growing liability into a competitive advantage.</p>

          <FlowDiagram steps={[
            { label: 'Tax Exposure', sub: 'Carbon price x emissions' },
            { label: 'Cost Pass-Through', sub: 'Price adjustments' },
            { label: 'Decarbonization', sub: 'Efficiency & fuel switch' },
            { label: 'Competitive Position', sub: 'Low-carbon advantage' },
          ]} />

          <Timeline items={[
            { year: '2026', title: 'CBAM Full Implementation', desc: 'EU carbon border tax applies to all covered imports with certificate purchases.' },
            { year: '2027', title: 'UK Carbon Border Tax', desc: 'UK introduces its own CBAM aligned with EU framework.' },
            { year: '2028', title: 'Global Price Floor Talks', desc: 'G20 negotiations on minimum carbon price for major economies.' },
            { year: '2030', title: 'EU ETS Phase 5', desc: 'EU ETS aims for 62% reduction vs 2005, prices projected at \u20ac140+.' },
            { year: '2034', title: 'CBAM Full Scope', desc: 'CBAM extends to all EU ETS sectors including downstream products.' },
          ]} />
        </div>
      </>);

    case '5 Common Pitfalls in ESG Reporting':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">As ESG reporting transitions from voluntary to mandatory across the globe, organizations are discovering that the path to compliant, credible sustainability disclosure is fraught with challenges. Based on CarbonSync\u2019s analysis of 2,500+ corporate ESG reports and 400+ regulatory audit findings, we have identified five critical pitfalls that undermine reporting quality and expose organizations to regulatory, financial, and reputational risk.</p>

          <StatCards items={[
            { label: 'Reports with Material Errors', value: '45%', icon: AlertTriangle, color: '#ef4444' },
            { label: 'Avg Audit Findings per Report', value: '12', icon: FileText, color: '#f59e0b' },
            { label: 'Regulatory Penalties (2025)', value: '$2.8B', icon: Scale, color: '#3b82f6' },
            { label: 'Companies Using Manual Processes', value: '58%', icon: BarChart3, color: '#0d9488' },
          ]} />

          <h2 id="pitfall-1">Pitfall 1: Data Quality & Consistency Gaps</h2>
          <p>The most common pitfall, affecting 68% of reviewed reports, involves inconsistent data across reporting periods and frameworks. Common issues include: changing calculation methodologies without restating prior years, using different emission factors for the same activity across business units, and failing to reconcile operational boundaries across acquisitions and divestitures. The result is data that cannot be meaningfully compared year-over-year or against targets. Solution: establish a centralized data governance framework with immutable methodology documentation and automated cross-validation rules.</p>

          <SimpleBarChart title="Pitfall Prevalence Among 2,500 Reports (%)" data={[
            { label: 'Data Quality Gaps', value: 68, color: '#ef4444' },
            { label: 'Scope Boundaries', value: 55, color: '#f59e0b' },
            { label: 'Assurance Readiness', value: 48, color: '#3b82f6' },
            { label: 'Target Framing', value: 42, color: '#0d9488' },
            { label: 'Stakeholder Alignment', value: 35, color: '#10b981' },
          ]} />

          <h2 id="pitfall-2">Pitfall 2: Incomplete Scope Boundaries</h2>
          <p>55% of reports fail to adequately define or consistently apply organizational and operational boundaries. Common omissions include: excluding acquired entities for the first 1\u20132 years post-acquisition, inconsistent treatment of joint ventures and leased assets, and selectively reporting emissions from high-performing facilities while omitting under-performing ones. The GHG Protocol\u2019s control approach (financial or operational) must be applied consistently, and any changes must be disclosed with restated comparative figures. Automated boundary management systems ensure that all entities are consistently included or excluded based on predefined rules.</p>

          <h2 id="pitfall-3">Pitfall 3: Insufficient Assurance Readiness</h2>
          <p>48% of reports fail to meet the evidence standards required for limited or reasonable assurance. Auditors commonly cite: missing source documentation for emission factors, inadequate audit trails for calculated figures, lack of internal approval records, and insufficient documentation of estimation methodologies. With the SEC requiring limited assurance for Scope 1 & 2 by 2026 and the EU CSRD requiring mandatory assurance, organizations must maintain complete, immutable evidence chains for every reported data point. CarbonSync\u2019s platform automatically captures and preserves all source documents, calculation steps, and approval workflows.</p>

          <KpiRow items={[
            { label: 'Audit Readiness Gap', value: '52%', change: 'Of companies', positive: false },
            { label: 'Source Doc Retention', value: '38%', change: 'Adequate records', positive: false },
            { label: 'Methodology Consistency', value: '45%', change: 'YoY comparable', positive: false },
            { label: 'Internal Approval Process', value: '42%', change: 'Formal sign-off', positive: false },
          ]} />

          <h2 id="pitfall-4">Pitfall 4: Misaligned Target Framing</h2>
          <p>42% of organizations present emission reduction targets in ways that obscure actual progress. Common tactics include: using intensity-based targets that improve while absolute emissions rise, rebaselining without transparent justification, extending target timelines without explanation, and selecting base years that minimize apparent emissions growth. Regulators and investors increasingly require absolute reduction targets with SBTi validation using consistent base years. Transparent target reporting includes: base year, scope coverage, target type (absolute vs intensity), and year-over-year progress clearly displayed.</p>

          <ComparisonTable
            headers={['Target Type', 'Misleading?', 'Regulator Preference', 'Investor Preference']}
            rows={[
              ['Absolute reduction', 'No', 'Preferred', 'Preferred'],
              ['Intensity reduction', 'Can be', 'Secondary', 'Secondary'],
              ['Renewable % increase', 'No', 'Supplementary', 'Preferred'],
              ['Carbon neutrality pledge', 'Often vague', 'Requires detail', 'Skeptical'],
              ['Net zero by 2050', 'If no interim', 'Requires 2030 target', 'Needs pathway'],
            ]}
          />

          <h2 id="pitfall-5">Pitfall 5: Stakeholder Disconnect</h2>
          <p>35% of reports fail to connect ESG performance to financial materiality and stakeholder interests. These reports present environmental data in isolation without linking to financial impacts, business strategy, or stakeholder concerns. The EU CSRD\u2019s double materiality principle requires companies to report both on how sustainability issues affect business performance (financial materiality) and how business activities impact people and the environment (impact materiality). Effective reports use integrated reporting frameworks that connect ESG metrics to financial KPIs, risk management, and strategic decision-making.</p>

          <FlowDiagram steps={[
            { label: 'Data Collection', sub: 'Automated + validated' },
            { label: 'Boundary Verification', sub: 'Consistent control approach' },
            { label: 'Audit Trail', sub: 'Immutable evidence chain' },
            { label: 'Target Framing', sub: 'SBTi-aligned metrics' },
            { label: 'Integrated Reporting', sub: 'Double materiality' },
          ]} />

          <SimplePieChart
            title="Audit Findings by Category"
            data={[
              { name: 'Data Quality', value: 35, color: '#ef4444' },
              { name: 'Boundary Issues', value: 25, color: '#f59e0b' },
              { name: 'Assurance Gaps', value: 20, color: '#3b82f6' },
              { name: 'Target Framing', value: 12, color: '#0d9488' },
              { name: 'Stakeholder Disconnect', value: 8, color: '#10b981' },
            ]}
          />

          <h2>Case Study: Fortune 500 Reporting Transformation</h2>
          <p>A Fortune 500 industrial company faced 22 material findings in its 2024 ESG audit, triggering a 15% stock decline and regulatory inquiry. CarbonSync conducted a comprehensive gap analysis, revealing all five pitfalls across the company\u2019s reporting process. The company implemented a centralized ESG data platform with automated data collection from 45 ERP systems, consistent methodology governance, immutable audit trails, and double materiality reporting aligned with CSRD. Within 12 months, the company achieved its first audit with zero material findings, reduced reporting cycle time from 9 months to 4 weeks, and improved its MSCI ESG rating from BB to A.</p>
        </div>
      </>);

    case 'What is Decarbonization: Action Plan':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">Decarbonization \u2014 the systematic reduction of carbon dioxide emissions across all operations and value chains \u2014 has become the defining corporate imperative of our era. With global emissions needing to fall 43% by 2030 to meet Paris Agreement goals, organizations require a structured, data-driven action plan that moves beyond aspirational pledges to measurable, verifiable emission reductions.</p>

          <StatCards items={[
            { label: 'Global Emissions (2025)', value: '52.5 GT', icon: Globe2, color: '#ef4444' },
            { label: 'Reduction Needed by 2030', value: '43%', icon: Target, color: '#059669' },
            { label: 'Companies with Net Zero Plans', value: '8,200+', icon: Building2, color: '#0d9488' },
            { label: 'SBTi-Validated Targets', value: '6,500+', icon: CheckCircle2, color: '#10b981' },
          ]} />

          <h2 id="roadmap">Strategic Decarbonization Roadmap</h2>
          <p>An effective decarbonization plan follows a structured five-phase approach. <strong>Phase 1: Measure & Baseline</strong> \u2014 establish comprehensive Scope 1, 2, and 3 inventories using consistent methodologies. <strong>Phase 2: Target Setting</strong> \u2014 set SBTi-validated near-term (2030) and long-term (2050) targets aligned with 1.5\u00b0C pathways. <strong>Phase 3: Abatement Planning</strong> \u2014 identify and prioritize reduction levers across operations and value chain. <strong>Phase 4: Implementation</strong> \u2014 deploy energy efficiency, electrification, renewable energy, and supplier engagement programs. <strong>Phase 5: Monitoring & Reporting</strong> \u2014 track progress with real-time dashboards and transparent annual disclosure.</p>

          <FlowDiagram steps={[
            { label: 'Measure', sub: 'Full Scope 1,2,3 inventory' },
            { label: 'Set Targets', sub: 'SBTi 1.5\u00b0C aligned' },
            { label: 'Plan Abatement', sub: 'Prioritized reduction levers' },
            { label: 'Implement', sub: 'Execute programs' },
            { label: 'Monitor & Report', sub: 'Real-time tracking' },
          ]} />

          <h2 id="milestones">Decarbonization Milestones</h2>
          <Timeline items={[
            { year: 'Year 1', title: 'Baseline & Foundation', desc: 'Complete comprehensive carbon footprint. Establish data infrastructure. Set SBTi targets.' },
            { year: 'Year 2-3', title: 'Quick Wins', desc: 'Energy efficiency improvements (10-20% reduction). 100% renewable electricity. Fleet electrification.' },
            { year: 'Year 4-5', title: 'Supply Chain Decarbonization', desc: 'Supplier engagement programs. Low-carbon materials sourcing. Logistics optimization.' },
            { year: 'Year 6-8', title: 'Deep Decarbonization', desc: 'Process electrification. Green hydrogen adoption. CCUS deployment for hard-to-abate.' },
            { year: 'Year 9-10', title: 'Net Zero Achievement', desc: 'Residual emissions neutralized with high-quality removals. Full value chain decarbonization.' },
          ]} />

          <h2 id="sectors">Sector-Specific Decarbonization Pathways</h2>
          <ComparisonTable
            headers={['Sector', 'Primary Levers', 'Reduction by 2030', 'Key Challenge']}
            rows={[
              ['Manufacturing', 'Electrification, efficiency', '35-45%', 'Process heat'],
              ['Transportation', 'EV fleet, route optimization', '30-40%', 'Heavy-duty trucks'],
              ['Real Estate', 'Retrofit, renewables, smart', '40-50%', 'Embodied carbon'],
              ['Agriculture', 'Regenerative practices, methane', '25-35%', 'Land use change'],
              ['Technology', 'Cloud optimization, AI', '50-65%', 'Data center growth'],
              ['Finance', 'Portfolio alignment, green loans', 'Operational only', 'Financed emissions'],
            ]}
          />

          <h2 id="action-plan">Action Plan: Year 1 Priorities</h2>
          <p>CarbonSync\u2019s recommended Year 1 action plan: <strong>Month 1-2</strong>: Complete comprehensive carbon footprint across all scopes with third-party data validation. <strong>Month 3-4</strong>: Establish decarbonization governance including board-level ESG committee and executive compensation linked to carbon targets. <strong>Month 5-6</strong>: Submit SBTi commitment letter and begin target validation process. <strong>Month 7-9</strong>: Deploy energy efficiency measures with highest ROI (lighting, HVAC, compressed air improvements). <strong>Month 10-12</strong>: Execute renewable energy PPA agreements covering 50%+ of electricity consumption. Companies following this timeline achieve an average 18% emission reduction in Year 1.</p>

          <SimpleBarChart title="Average Year 1 Reduction by Action (%)" data={[
            { label: 'Energy Efficiency', value: 12, color: '#059669' },
            { label: 'Renewable Energy', value: 8, color: '#0d9488' },
            { label: 'Fleet Electrification', value: 5, color: '#3b82f6' },
            { label: 'Supply Chain', value: 3, color: '#10b981' },
            { label: 'Travel Reduction', value: 4, color: '#06b6d4' },
          ]} />

          <KpiRow items={[
            { label: 'Year 1 Reduction (Avg)', value: '18%', change: 'With full program', positive: true },
            { label: 'Program Investment (Y1)', value: '$2-5M', change: 'Mid-size firm', positive: false },
            { label: 'Energy Cost Savings (Y1)', value: '12-18%', change: 'ROI positive', positive: true },
            { label: 'Target Payback', value: '2-3 Years', change: 'Total program', positive: true },
          ]} />

          <SimpleLineChart
            title="Global Decarbonization Progress (GT CO2, 2020-2030P)"
            data={[
              { year: '2020', value: 52.8 },
              { year: '2021', value: 55.3 },
              { year: '2022', value: 54.6 },
              { year: '2023', value: 53.2 },
              { year: '2024', value: 52.8 },
              { year: '2025', value: 52.5 },
              { year: '2026', value: 51.8 },
              { year: '2027', value: 50.2 },
              { year: '2028', value: 48.0 },
              { year: '2029', value: 45.5 },
              { year: '2030', value: 43.0 },
            ]}
            xKey="year"
            yKey="value"
          />

          <h2>Case Study: Mid-Size Manufacturer Full Decarbonization</h2>
          <p>A mid-size industrial manufacturer with $800M revenue and 35,000 tCO2e annual emissions implemented the full decarbonization action plan using CarbonSync\u2019s platform. Over 3 years, the company reduced emissions by 52% (from 35,000 to 16,800 tCO2e) through: LED and HVAC upgrades (18% reduction), 8 MW on-site solar installation (22% reduction), fleet electrification of 120 vehicles (8% reduction), and supplier decarbonization program (4% reduction). Total investment of $4.8M generated $1.2M annual energy savings plus $840K in avoided carbon taxes. The company\u2019s CDP score improved from D to A-, and it secured a \u20ac30M sustainability-linked loan at 60 bps below market rate.</p>
        </div>
      </>);

    case 'How to Build a Sustainable Procurement Strategy':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">Sustainable procurement \u2014 the integration of environmental, social, and governance criteria into purchasing decisions \u2014 has emerged as one of the most powerful levers for corporate sustainability. With supply chains accounting for 80\u201390% of most companies\u2019 environmental impact and up to 65% of total operating costs, transforming procurement practices delivers outsized returns for both sustainability and business performance.</p>

          <StatCards items={[
            { label: 'Supply Chain Impact (Scope 3)', value: '80-90%', icon: Globe2, color: '#059669' },
            { label: 'Spend Covered by Leaders', value: '72%', icon: BarChart3, color: '#0d9488' },
            { label: 'Cost Reduction via Sustainability', value: '12-18%', icon: TrendingDown, color: '#f59e0b' },
            { label: 'Suppliers Engaged by Leaders', value: '2,500+', icon: Factory, color: '#3b82f6' },
          ]} />

          <h2 id="criteria">ESG Criteria Framework for Procurement</h2>
          <p>An effective sustainable procurement strategy embeds ESG criteria across five dimensions: <strong>Environmental</strong> \u2014 carbon footprint, water use, waste management, and circularity of supplied materials; <strong>Social</strong> \u2014 labor practices, human rights, diversity, and community impact; <strong>Governance</strong> \u2014 ethical business practices, transparency, and regulatory compliance; <strong>Innovation</strong> \u2014 supplier investment in sustainable technologies and practices; <strong>Resilience</strong> \u2014 climate risk exposure, supply continuity, and adaptability. Leading organizations weight these criteria at 15\u201325% of total supplier evaluation score.</p>

          <SimpleBarChart title="ESG Criteria Adoption in Procurement (%)" data={[
            { label: 'Carbon Footprint', value: 78, color: '#059669' },
            { label: 'Labor Practices', value: 72, color: '#0d9488' },
            { label: 'Ethical Compliance', value: 68, color: '#3b82f6' },
            { label: 'Circular Economy', value: 45, color: '#10b981' },
            { label: 'Biodiversity', value: 28, color: '#06b6d4' },
            { label: 'Human Rights', value: 85, color: '#f59e0b' },
          ]} />

          <h2 id="supplier-scoring">Supplier ESG Scoring Methodology</h2>
          <p>CarbonSync\u2019s supplier ESG scoring model evaluates suppliers across 45 quantitative and qualitative indicators using automated data collection and third-party verification. The scoring framework produces a 0\u2013100 score across E, S, and G dimensions, with an overall ESG tier rating (Platinum 85+, Gold 70\u201384, Silver 55\u201369, Bronze 40\u201354, and Below Threshold {'<40'}). Companies using this methodology report that Platinum and Gold suppliers deliver 22% fewer supply disruptions, 15% higher quality ratings, and 8% lower total cost of ownership compared to Bronze-rated suppliers.</p>

          <ComparisonTable
            headers={['Tier', 'Score Range', '% of Suppliers', 'Risk Level']}
            rows={[
              ['Platinum', '85-100', '12%', 'Very Low'],
              ['Gold', '70-84', '28%', 'Low'],
              ['Silver', '55-69', '32%', 'Moderate'],
              ['Bronze', '40-54', '18%', 'High'],
              ['Below Threshold', '<40', '10%', 'Critical'],
            ]}
          />

          <h2 id="integration">Strategic Integration & Supplier Collaboration</h2>
          <p>Sustainable procurement delivers maximum impact when integrated into core procurement processes. Leading organizations embed ESG criteria into: <strong>RFP/RFQ templates</strong> with mandatory ESG disclosure requirements; <strong>contract terms</strong> including sustainability KPIs with financial incentives and penalties; <strong>supplier development programs</strong> providing capacity building and technology support; <strong>joint innovation initiatives</strong> co-investing in low-carbon materials and processes; and <strong>recognition programs</strong> that reward top-performing suppliers with preferred status and longer contract terms.</p>

          <KpiRow items={[
            { label: 'Cost Reduction (TCO)', value: '8-12%', change: 'High-ESG suppliers', positive: true },
            { label: 'Supply Disruption Rate', value: '-22%', change: 'Platinum vs Bronze', positive: true },
            { label: 'Supplier Innovation Output', value: '+35%', change: 'Engaged suppliers', positive: true },
            { label: 'Program ROI', value: '4:1', change: 'Avg reported', positive: true },
          ]} />

          <FlowDiagram steps={[
            { label: 'Assess Baseline', sub: 'Supplier ESG maturity' },
            { label: 'Embed Criteria', sub: 'RFP, contracts, scoring' },
            { label: 'Engage Suppliers', sub: 'Capacity building programs' },
            { label: 'Monitor Performance', sub: 'Real-time dashboards' },
            { label: 'Continuous Improve', sub: 'Targeted interventions' },
          ]} />

          <SimplePieChart
            title="Sustainable Procurement Budget Allocation"
            data={[
              { name: 'Technology Platform', value: 35, color: '#059669' },
              { name: 'Supplier Training', value: 25, color: '#0d9488' },
              { name: 'Audit & Verification', value: 20, color: '#3b82f6' },
              { name: 'Incentive Programs', value: 15, color: '#10b981' },
              { name: 'Innovation Fund', value: 5, color: '#06b6d4' },
            ]}
          />

          <h2 id="case-study">Case Study: Automotive OEM Sustainable Procurement Transformation</h2>
          <p>A global automotive manufacturer with 3,500+ suppliers and $48B annual procurement spend implemented a comprehensive sustainable procurement strategy using CarbonSync\u2019s platform. Over 24 months, the company: assessed and scored 100% of Tier 1 suppliers against 45 ESG criteria, launched a supplier capacity-building program reaching 850 strategic suppliers, established contractual ESG KPIs with financial incentives covering 72% of procurement spend, and achieved a 28% reduction in supply chain carbon intensity. The program cost $6.2M to implement but generated $42M in annual savings through energy efficiency, waste reduction, and logistics optimization identified through supplier collaboration. The company\u2019s supply chain resilience score improved by 35%, and it achieved an A- rating on CDP Supply Chain for the first time.</p>
        </div>
      </>);

    case 'Understanding the CBAM Regulation':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">The EU Carbon Border Adjustment Mechanism (CBAM) represents one of the most significant developments in international climate policy. Designed to prevent carbon leakage \u2014 where EU producers face carbon costs while foreign competitors do not \u2014 CBAM imposes a carbon price on imported goods equivalent to what domestic producers pay under the EU Emissions Trading System. Its phased implementation is reshaping global trade flows and supply chain strategies.</p>

          <StatCards items={[
            { label: 'Import Value Covered', value: '\u20ac65B', icon: TrendingUp, color: '#059669' },
            { label: 'Sectors Initially Covered', value: '6', icon: Factory, color: '#0d9488' },
            { label: 'CBAM Cert Price (May 2026)', value: '\u20ac82/t', icon: BarChart3, color: '#f59e0b' },
            { label: 'Affected Trading Partners', value: '150+', icon: Globe2, color: '#3b82f6' },
          ]} />

          <h2 id="mechanism">CBAM Mechanism & Scope</h2>
          <p>CBAM applies to imports of six carbon-intensive sectors: cement, iron & steel, aluminum, fertilizers, electricity, and hydrogen. Importers must purchase CBAM certificates at a price linked to the weekly EU ETS auction price, with adjustments for any carbon price already paid in the country of origin. The transitional phase (October 2023\u2013December 2025) required only quarterly reporting without financial adjustments. From January 2026, importers must purchase certificates covering embedded emissions, with full implementation by 2034 when free allowances in the EU ETS are fully phased out.</p>

          <SimpleBarChart title="CBAM Cost Impact by Sector (\u20ac/ton imported)" data={[
            { label: 'Cement', value: 125, color: '#ef4444' },
            { label: 'Steel', value: 98, color: '#f59e0b' },
            { label: 'Aluminum', value: 85, color: '#3b82f6' },
            { label: 'Fertilizers', value: 110, color: '#0d9488' },
            { label: 'Hydrogen', value: 180, color: '#10b981' },
            { label: 'Electricity', value: 65, color: '#06b6d4' },
          ]} />

          <h2 id="impact">Global Trade & Competitive Impact</h2>
          <p>CBAM\u2019s impact extends far beyond EU borders. Our analysis indicates that 150+ countries will be affected, with the heaviest impact on China (18% of covered imports), Turkey (12%), Russia (11%), and the UK (8%). Exporters face an average cost increase of 12\u201325% depending on sector and production carbon intensity. In response, 45 countries are developing their own carbon pricing mechanisms to retain carbon tax revenue domestically. The WTO compatibility of CBAM has been validated through formal consultation, establishing a precedent for carbon border adjustments globally.</p>

          <KpiRow items={[
            { label: 'Affected Export Countries', value: '150+', change: 'Global coverage', positive: false },
            { label: 'Avg Cost Increase', value: '18%', change: 'Per ton imported', positive: false },
            { label: 'Countries Developing Carbon Price', value: '45', change: 'In response to CBAM', positive: true },
            { label: 'EU ETS Free Allowances', value: 'Phase out', change: 'By 2034', positive: true },
          ]} />

          <h2 id="compliance">Compliance Requirements</h2>
          <ComparisonTable
            headers={['Requirement', 'Transitional Phase', 'Full Phase (2026+)', 'Penalty for Non-Compliance']}
            rows={[
              ['Reporting', 'Quarterly', 'Annual', '\u20ac10-50 per ton'],
              ['Certificate Purchase', 'Not required', 'Required', '5x penalty price'],
              ['Verification', 'Self-declared', 'Third-party verified', 'Import suspension'],
              ['Carbon Price Deduction', 'Informational', 'Financial adjustment', 'Double payment risk'],
              ['Authorized Declarant', 'Optional', 'Mandatory', 'Inability to import'],
            ]}
          />

          <h2 id="preparation">Preparation Strategy for Importers</h2>
          <p>Companies importing CBAM-covered goods should take immediate action: <strong>Step 1</strong>: Identify all CBAM-covered products in your import portfolio and assess exposure. <strong>Step 2</strong>: Engage suppliers to collect verified embedded emission data using the EU\u2019s default or actual calculation methodology. <strong>Step 3</strong>: Register as an authorized CBAM declarant with your member state customs authority. <strong>Step 4</strong>: Implement systems for quarterly CBAM reporting with auditable data trails. <strong>Step 5</strong>: Develop a decarbonization roadmap for your supply chain to reduce CBAM liability over time. CarbonSync\u2019s CBAM module automates the entire compliance workflow from data collection through certificate management.</p>

          <FlowDiagram steps={[
            { label: 'Identify Exposure', sub: 'CBAM-covered products' },
            { label: 'Supplier Data', sub: 'Verified embedded emissions' },
            { label: 'Register as Declarant', sub: 'Member state authority' },
            { label: 'Calculate Liability', sub: 'EU ETS-linked pricing' },
            { label: 'Report & Certify', sub: 'Annual compliance cycle' },
          ]} />

          <SimpleLineChart
            title="EU ETS Price Projection (\u20ac/t, 2024-2034)"
            data={[
              { year: '2024', value: 72 },
              { year: '2025', value: 78 },
              { year: '2026', value: 85 },
              { year: '2027', value: 92 },
              { year: '2028', value: 100 },
              { year: '2029', value: 110 },
              { year: '2030', value: 120 },
              { year: '2034', value: 150 },
            ]}
            xKey="year"
            yKey="value"
          />

          <h2>Case Study: Steel Importer CBAM Readiness</h2>
          <p>A European steel importer handling 500,000 tons annually from non-EU suppliers faced a potential \u20ac49M annual CBAM liability at full implementation. Using CarbonSync\u2019s CBAM Readiness Platform, the company: mapped 185 SKUs to CBAM product categories, onboarded 45 supplier facilities onto the platform for automated emission data collection, identified 12 suppliers with significantly lower carbon intensity for preferential sourcing, and developed a 5-year decarbonization partnership program with its top 10 suppliers. Within 18 months, the company reduced its average embedded carbon intensity by 22%, cutting its projected CBAM liability by \u20ac10.8M annually, while the program cost just \u20ac1.2M. The company also secured preferred importer status with customs authorities through its demonstrated compliance system.</p>
        </div>
      </>);

    case 'Best Practices for Energy Audits':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">Energy audits are the cornerstone of any effective decarbonization program. A comprehensive energy audit identifies savings opportunities, quantifies ROI, and establishes the baseline for measurement and verification. With energy costs representing 5\u201320% of operating expenses for most industrial facilities and commercial buildings, systematic energy auditing delivers both environmental and financial returns.</p>

          <StatCards items={[
            { label: 'Avg Energy Savings Identified', value: '15-30%', icon: Zap, color: '#059669' },
            { label: 'Audit Payback Period', value: '<12 Months', icon: TrendingUp, color: '#0d9488' },
            { label: 'Facilities Without Recent Audit', value: '55%', icon: Building2, color: '#ef4444' },
            { label: 'ISO 50001 Certified Sites', value: '22,000+', icon: ShieldCheck, color: '#3b82f6' },
          ]} />

          <h2 id="audit-types">Energy Audit Types & Depth Levels</h2>
          <p>Energy audits are classified into three levels by ASHRAE standards. <strong>Level 1 (Walk-Through)</strong> provides a preliminary assessment with 5\u201310% savings estimates at minimal cost. <strong>Level 2 (Detailed)</strong> includes energy balance analysis, end-use breakdown, and financial analysis with 10\u201320% accuracy. <strong>Level 3 (Investment-Grade)</strong> involves sub-metering, simulation modeling, and detailed ROI projections with 5\u201310% uncertainty. Most organizations should progress through all three levels, starting with Level 1 to identify quick wins and progressing to Level 3 for capital project justification.</p>

          <SimpleBarChart title="Energy Savings Potential by Audit Level (%)" data={[
            { label: 'Level 1: Walk-Through', value: 8, color: '#3b82f6' },
            { label: 'Level 2: Detailed', value: 18, color: '#0d9488' },
            { label: 'Level 3: Investment Grade', value: 28, color: '#059669' },
            { label: 'Continuous Monitoring', value: 35, color: '#10b981' },
          ]} />

          <h2 id="methodology">Audit Methodology & Key Metrics</h2>
          <p>A best-practice energy audit follows a rigorous methodology: <strong>Pre-Audit</strong>: collect 12\u201324 months of utility bills, establish facility baseline, and prepare energy-use profiles; <strong>Site Assessment</strong>: inspect all energy-consuming systems including HVAC, lighting, compressed air, motors, boilers, and process equipment; <strong>Data Analysis</strong>: perform regression analysis against weather and production data, benchmark against industry peers, and identify energy performance indicators; <strong>Opportunity Assessment</strong>: develop prioritized list of ECMs (Energy Conservation Measures) with technical feasibility, cost estimates, and financial metrics.</p>

          <KpiRow items={[
            { label: 'Avg ECMs Identified', value: '15-25', change: 'Per facility audit', positive: true },
            { label: 'Quick Wins (ROI<1 yr)', value: '8-12', change: 'Of total ECMs', positive: true },
            { label: 'Audit Cost as % of Savings', value: '3-5%', change: 'First year savings', positive: true },
            { label: 'Implementation Rate', value: '62%', change: 'Of recommended ECMs', positive: false },
          ]} />

          <h2 id="savings">Energy Savings Case Studies</h2>
          <ComparisonTable
            headers={['ECM Category', 'Avg Savings', 'Payback', 'Implementation Complexity']}
            rows={[
              ['LED Lighting Upgrade', '15-25%', '1-2 years', 'Low'],
              ['HVAC Optimization', '10-20%', '2-4 years', 'Medium'],
              ['Compressed Air Fix (Leaks)', '20-35%', '<6 months', 'Low'],
              ['VFD Installation (Motors)', '15-30%', '1-3 years', 'Medium'],
              ['Building Automation', '10-15%', '2-5 years', 'High'],
              ['Heat Recovery Systems', '10-25%', '2-4 years', 'High'],
            ]}
          />

          <FlowDiagram steps={[
            { label: 'Pre-Audit Data', sub: 'Utility bills, baselines' },
            { label: 'Site Assessment', sub: 'System-by-system inspection' },
            { label: 'Data Analysis', sub: 'Regression & benchmarking' },
            { label: 'ECM Prioritization', sub: 'ROI & feasibility ranking' },
            { label: 'Implementation Plan', sub: 'Phased deployment' },
          ]} />

          <SimplePieChart
            title="Energy End-Use Distribution (Commercial Buildings)"
            data={[
              { name: 'HVAC', value: 38, color: '#059669' },
              { name: 'Lighting', value: 18, color: '#0d9488' },
              { name: 'Plug Loads', value: 14, color: '#3b82f6' },
              { name: 'Water Heating', value: 12, color: '#f59e0b' },
              { name: 'Refrigeration', value: 8, color: '#10b981' },
              { name: 'Other', value: 10, color: '#06b6d4' },
            ]}
          />

          <h2 id="case-study">Case Study: Industrial Facility Comprehensive Audit</h2>
          <p>A food processing facility with 85,000 m² of production space and annual energy costs of $4.2M underwent a Level 3 investment-grade audit using CarbonSync\u2019s energy audit platform. The audit identified 22 ECMs with total investment of $3.8M and annual savings of $1.2M (28% reduction). Key findings included: compressed air leak repair ($180K savings, 3-month payback), ammonia refrigeration VFD controls ($320K savings, 18-month payback), waste heat recovery from ovens ($240K savings, 30-month payback), and solar PV installation on 40,000 m² of roof space ($460K savings, 7-year payback). The company implemented the first 14 ECMs within 12 months at $1.5M investment, achieving $780K annual savings and validating the audit methodology. The remaining ECMs were phased into a 3-year capital plan with combined payback of 3.2 years.</p>
        </div>
      </>);

    case 'The Evolution of Green Finance':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">Green finance has evolved from a niche investment strategy to a mainstream force reshaping global capital markets. With sustainable assets under management exceeding $35 trillion and green bond issuance on track to surpass $1 trillion annually, the integration of environmental criteria into financial decision-making represents one of the most significant transformations in modern finance. This evolution is being driven by regulatory mandates, investor demand, and mounting evidence that sustainability factors materially impact financial performance.</p>

          <StatCards items={[
            { label: 'Sustainable AUM (Global)', value: '$35T+', icon: TrendingUp, color: '#059669' },
            { label: 'Green Bond Issuance (2025)', value: '$920B', icon: BarChart3, color: '#0d9488' },
            { label: 'ESG-Linked Loans (2025)', value: '$680B', icon: Scale, color: '#3b82f6' },
            { label: 'SFDR Article 8/9 Funds', value: '6,500+', icon: Building2, color: '#10b981' },
          ]} />

          <h2 id="growth">Green Finance Market Growth Trajectory</h2>
          <p>The green finance market has grown at a compound annual growth rate of 28% since 2019. Green bonds, pioneered by the European Investment Bank in 2007, have grown from $2.5B in annual issuance to $920B in 2025. Sustainability-linked loans (SLLs), which tie borrowing costs to ESG performance targets, have emerged as the fastest-growing segment at $680B annually. The EU\u2019s Sustainable Finance Disclosure Regulation (SFDR) has been a major catalyst, requiring fund managers to classify products as Article 6 (no ESG focus), Article 8 (promoting ESG), or Article 9 (sustainable investment objective).</p>

          <SimpleBarChart title="Green Bond Issuance by Region ($B, 2025)" data={[
            { label: 'Europe', value: 420, color: '#059669' },
            { label: 'Asia-Pacific', value: 260, color: '#0d9488' },
            { label: 'North America', value: 180, color: '#3b82f6' },
            { label: 'Latin America', value: 35, color: '#10b981' },
            { label: 'Africa/Middle East', value: 25, color: '#06b6d4' },
          ]} />

          <SimpleLineChart
            title="Global Green Bond Issuance ($B, 2015-2026)"
            data={[
              { year: '2015', value: 42 },
              { year: '2016', value: 86 },
              { year: '2017', value: 155 },
              { year: '2018', value: 180 },
              { year: '2019', value: 257 },
              { year: '2020', value: 305 },
              { year: '2021', value: 522 },
              { year: '2022', value: 487 },
              { year: '2023', value: 575 },
              { year: '2024', value: 710 },
              { year: '2025', value: 920 },
              { year: '2026', value: 1050 },
            ]}
            xKey="year"
            yKey="value"
          />

          <h2 id="instruments">Financial Instruments & Structures</h2>
          <p>Green finance encompasses a diverse range of instruments. <strong>Green Bonds</strong>: Use-of-proceeds instruments financing specific environmental projects, verified by external reviewers (CBI, Climate Bonds Standard). <strong>Sustainability-Linked Bonds/Loans</strong>: General-purpose instruments with coupon rates tied to issuer achievement of predefined ESG KPIs. <strong>Transition Bonds</strong>: Designed for high-carbon industries financing the transition to lower emissions. <strong>Social & Sustainability Bonds</strong>: Address social issues or combine environmental and social objectives. <strong>Green Securitizations</strong>: Pooled green assets such as renewable energy loans or EV lease portfolios.</p>

          <KpiRow items={[
            { label: 'Green Premium (Greenium)', value: '3-5 bps', change: 'Lower yield vs conventional', positive: true },
            { label: 'SLL KPI Achievement Rate', value: '82%', change: 'Of borrowers met targets', positive: true },
            { label: 'Green Bond Default Rate', value: '0.15%', change: 'vs 2.1% conventional', positive: true },
            { label: 'SFDR Article 9 Fund Growth', value: '+45% YoY', change: '2025 vs 2024', positive: true },
          ]} />

          <h2 id="impact">Impact Measurement & Reporting Standards</h2>
          <p>Credible impact reporting is essential for green finance integrity. The International Capital Market Association (ICMA) provides Green Bond Principles requiring issuers to report on: allocation of proceeds to eligible projects, environmental impact metrics (tCO2 avoided, MW renewable capacity, MWh energy saved), and methodology documentation. Third-party verification by approved verifiers (CBI, DNV, Sustainalytics) is now standard practice for over 90% of green bond issuances. Emerging frameworks are moving toward harmonized impact metrics through the EU Green Bond Standard and the International Sustainability Standards Board.</p>

          <ComparisonTable
            headers={['Instrument', '2025 Volume', 'Growth Rate', 'Typical Use']}
            rows={[
              ['Green Bonds', '$920B', '+30%', 'Renewable energy, efficiency'],
              ['Sustainability-Linked Loans', '$680B', '+42%', 'Corporate ESG targets'],
              ['Transition Bonds', '$45B', '+65%', 'Industrial decarbonization'],
              ['Social Bonds', '$280B', '+18%', 'Healthcare, education'],
              ['Green Securitization', '$120B', '+38%', 'EV loans, solar leases'],
            ]}
          />

          <h2 id="outlook">Future Outlook & Regulatory Trajectory</h2>
          <p>The green finance market is projected to exceed $100 trillion in cumulative sustainable AUM by 2030. Key trends shaping the future include: <strong>regulatory harmonization</strong> through the ISSB and global sustainability disclosure standards; <strong>nature-based finance</strong> with biodiversity credits and ecosystem service markets; <strong>transition finance</strong> frameworks enabling credible high-carbon sector decarbonization; <strong>AI-enhanced impact measurement</strong> using satellite data and machine learning; and <strong>green taxonomies</strong> expanding beyond the EU to 30+ jurisdictions, creating a common language for sustainable investment.</p>

          <Timeline items={[
            { year: '2024', title: 'EU Green Bond Standard Effective', desc: 'Voluntary standard for green bonds requiring full alignment with EU Taxonomy.' },
            { year: '2025', title: 'ISSB Disclosure Standards', desc: 'Global baseline for sustainability disclosures adopted by 20+ jurisdictions.' },
            { year: '2026', title: 'FCA Anti-Greenwashing Rule', desc: 'UK Financial Conduct Authority enforces strict rules on sustainable investment labels.' },
            { year: '2028', title: 'Taxonomy Expansion', desc: '30 countries with active green taxonomies, enabling cross-border green investment.' },
            { year: '2030', title: '$1.5T Annual Green Bond', desc: 'Green bond market reaches $1.5T annual issuance as mainstream capital market.' },
          ]} />

          <h2>Case Study: Corporate Green Bond Program</h2>
          <p>A multinational utility company issued a \u20ac1.5B green bond in 2025 to finance 3.2 GW of new renewable energy capacity across 12 countries. The bond, certified under the EU Green Bond Standard and Climate Bonds Standard, was 4.5x oversubscribed with a greenium of 4 bps compared to conventional bonds. Impact reporting verified by a third party showed the financed projects generated 6,800 GWh of renewable electricity in Year 1, avoiding 2.9 million tCO2 annually. The company established a Green Bond Framework overseen by a sustainability committee, with semi-annual impact reporting and annual external verification. Investor feedback highlighted the transparency and rigor of the impact reporting as a key factor in the oversubscription. The successful issuance reduced the company\u2019s weighted average cost of capital by 12 bps and established a benchmark for green bond issuances in the sector.</p>
        </div>
      </>);

    case 'Demystifying the SBTi Validation Process':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">The Science Based Targets initiative (SBTi) has become the gold standard for corporate climate target validation. With over 8,200 companies committed and 6,500+ with approved targets, SBTi validation provides investors, customers, and regulators with confidence that a company\u2019s climate targets are aligned with the latest climate science. However, the validation process is rigorous and resource-intensive, requiring careful preparation and commitment.</p>

          <StatCards items={[
            { label: 'Companies Committed to SBTi', value: '8,200+', icon: Building2, color: '#059669' },
            { label: 'Approved Targets', value: '6,500+', icon: CheckCircle2, color: '#0d9488' },
            { label: 'Validation Timeline (Avg)', value: '8-14 Months', icon: BarChart3, color: '#f59e0b' },
            { label: 'Targets Aligned with 1.5\u00b0C', value: '78%', icon: Target, color: '#3b82f6' },
          ]} />

          <h2 id="steps">SBTi Validation Process Steps</h2>
          <p>The SBTi validation process follows five structured stages: <strong>1. Commitment</strong>: Submit a commitment letter signed by CEO, indicating intent to set SBTs within 24 months. <strong>2. Develop</strong>: Calculate complete GHG inventory, model reduction pathways, and draft target language. <strong>3. Submit</strong>: Submit targets through SBTi portal with all supporting documentation. <strong>4. Validation</strong>: SBTi analysts review targets against criteria, requiring 8\u201312 weeks with possible clarification rounds. <strong>5. Communicate</strong>: Announce approved targets publicly and report progress annually.</p>

          <FlowDiagram steps={[
            { label: 'Commit', sub: 'CEO letter, 24-month timeline' },
            { label: 'Develop', sub: 'Inventory, pathways, targets' },
            { label: 'Submit', sub: 'Portal with documentation' },
            { label: 'Validate', sub: 'Analyst review, 8-12 weeks' },
            { label: 'Communicate', sub: 'Public announcement' },
          ]} />

          <h2 id="timeline">Validation Timeline & Milestones</h2>
          <Timeline items={[
            { year: 'Month 1-2', title: 'Commitment & Foundation', desc: 'Submit commitment letter. Select target boundary. Build internal governance structure.' },
            { year: 'Month 3-6', title: 'Data Collection & Modeling', desc: 'Complete Scope 1,2,3 inventory. Model emission pathways using SBTi resources.' },
            { year: 'Month 7-8', title: 'Target Formulation', desc: 'Draft near-term and long-term targets. Secure internal approval from board.' },
            { year: 'Month 9-12', title: 'Submission & Review', desc: 'Submit targets. Respond to SBTi clarification requests (typically 1-3 rounds).' },
            { year: 'Month 13-14', title: 'Validation & Announcement', desc: 'Receive official validation. Prepare external announcement and investor communications.' },
          ]} />

          <h2 id="readiness">Readiness Assessment Criteria</h2>
          <p>SBTi evaluates targets against five main criteria: <strong>Boundary</strong>: Must cover at least 95% of Scope 1 and 2 emissions and 67% of Scope 3 if material. <strong>Ambition</strong>: Near-term targets must achieve 42% reduction in Scope 1&2 and 25% reduction in Scope 3 by 2030 (from base year). <strong>Long-term:</strong> Must achieve at least 90% reduction in Scope 1&2 and 97% in Scope 3 by 2050. <strong>Pathway:</strong> Targets must follow a science-based linear or S-curve trajectory. <strong>Reporting:</strong> Annual progress disclosure required against all target metrics.</p>

          <ComparisonTable
            headers={['Criterion', 'Requirement', 'Common Pitfall', 'Success Tip']}
            rows={[
              ['Boundary', '95% S1, 67% S3', 'Excluding material categories', 'Use spend-based method initially'],
              ['Scope 1&2 Target', '-42% by 2030', 'Using intensity vs absolute', 'Set absolute reduction targets'],
              ['Scope 3 Target', '-25% by 2030', 'Insufficient supplier data', 'Engage suppliers early'],
              ['Base Year', 'Must be recent (2015+)', 'Choosing favorable base year', 'Use most recent complete year'],
              ['Progress Reporting', 'Annual disclosure', 'Gaps in data collection', 'Automate data pipeline'],
            ]}
          />

          <h2 id="case-study">Case Study: Manufacturer SBTi Validation Journey</h2>
          <p>A European manufacturer with 28 production facilities across 12 countries embarked on the SBTi validation process using CarbonSync\u2019s SBTi Readiness Platform. The company\u2019s base year emissions were 285,000 tCO2e (Scope 1 & 2: 95,000 tCO2e; Scope 3: 190,000 tCO2e). The SBTi validation process required: 8 months from commitment to submission, 12 weeks for validation review with two clarification rounds, and a total investment of $380K in data systems and consultant support. The approved targets were: 46.2% reduction in Scope 1 & 2 by 2030 (from 2023 base) and 30% reduction in Scope 3 by 2030. To achieve these targets, the company deployed a comprehensive decarbonization plan including: 25 MW on-site solar, 40% fleet EV transition, and a supplier engagement program covering 75% of Scope 3 emissions. Progress tracking showed 18% Scope 1&2 reduction and 12% Scope 3 reduction in Year 1, on track for 2030 targets.</p>

          <SimpleBarChart title="SBTi Rejection Reasons (% of submissions)" data={[
            { label: 'Insufficient Ambition', value: 32, color: '#ef4444' },
            { label: 'Boundary Issues', value: 25, color: '#f59e0b' },
            { label: 'Scope 3 Coverage', value: 22, color: '#3b82f6' },
            { label: 'Methodology Errors', value: 15, color: '#0d9488' },
            { label: 'Base Year Problems', value: 6, color: '#10b981' },
          ]} />

          <KpiRow items={[
            { label: 'Avg Validation Success Rate', value: '68%', change: 'First-time approval', positive: true },
            { label: 'Avg Time from Commitment', value: '11 Months', change: 'To validation', positive: false },
            { label: 'Clarification Rounds (Avg)', value: '2.3', change: 'Per submission', positive: false },
            { label: 'Annual Progress Reporting', value: 'Required', change: 'Mandatory', positive: false },
          ]} />
        </div>
      </>);

    case 'The Rise of Circular Economy Business Models':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">The circular economy represents a fundamental shift from the traditional linear \u201ctake-make-dispose\u201d model to a regenerative system where waste is eliminated, resources are kept in use, and natural systems are restored. With circular business models projected to generate $4.5 trillion in economic value by 2030, forward-thinking companies are reimagining their products, supply chains, and customer relationships around circularity principles.</p>

          <StatCards items={[
            { label: 'Circular Economy Value (2030P)', value: '$4.5T', icon: TrendingUp, color: '#059669' },
            { label: 'Global Circularity Rate (2025)', value: '7.2%', icon: Globe2, color: '#ef4444' },
            { label: 'Companies with Circular Strategies', value: '38%', icon: Building2, color: '#0d9488' },
            { label: 'Waste Reduction Potential', value: '80-90%', icon: Target, color: '#3b82f6' },
          ]} />

          <h2 id="principles">Core Circular Economy Principles</h2>
          <p>The circular economy is built on three core principles: <strong>Eliminate Waste and Pollution</strong> \u2014 design out waste from the beginning through material selection, modular design, and biodegradability; <strong>Circulate Products and Materials</strong> \u2014 keep materials in use at their highest value through sharing, reusing, repairing, remanufacturing, and recycling; <strong>Regenerate Nature</strong> \u2014 shift from extraction to regeneration, supporting natural systems through regenerative agriculture, forest restoration, and biodiversity enhancement. These principles apply across all sectors from electronics to fashion to construction.</p>

          <SimpleBarChart title="Circular Economy Adoption by Sector (%)" data={[
            { label: 'Automotive', value: 52, color: '#059669' },
            { label: 'Electronics', value: 42, color: '#0d9488' },
            { label: 'Fashion', value: 38, color: '#3b82f6' },
            { label: 'Packaging', value: 35, color: '#10b981' },
            { label: 'Construction', value: 28, color: '#f59e0b' },
            { label: 'Food & Bev', value: 22, color: '#06b6d4' },
          ]} />

          <h2 id="value-chains">Circular Value Chain Business Models</h2>
          <p>Five primary circular business models are reshaping industries: <strong>Product-as-a-Service (PaaS)</strong> \u2014 customers pay for outcomes rather than ownership, incentivizing durability and repairability (e.g., Rolls-Royce \u201cPower by the Hour\u201d); <strong>Sharing Platforms</strong> \u2014 maximize asset utilization through shared access; <strong>Product Life Extension</strong> \u2014 repair, upgrade, and remanufacturing services; <strong>Circular Supply Chains</strong> \u2014 using renewable, recycled, or bio-based inputs; <strong>Resource Recovery</strong> \u2014 extracting value from waste streams through advanced recycling and industrial symbiosis.</p>

          <ComparisonTable
            headers={['Model', 'Revenue Model', 'Resource Impact', 'Example']}
            rows={[
              ['Product-as-a-Service', 'Subscription/outcome', '-70% material use', 'Philips \u2018Light as a Service\u2019'],
              ['Sharing Platform', 'Usage fee', '-40% asset production', 'Zipcar, Tool libraries'],
              ['Life Extension', 'Service/parts', '-50% new production', 'Patagonia Worn Wear'],
              ['Circular Inputs', 'Premium pricing', '-60% virgin material', 'Adidas x Parley ocean plastic'],
              ['Resource Recovery', 'Material sales', '-80% waste to landfill', 'Veolia industrial symbiosis'],
            ]}
          />

          <h2 id="metrics">Circular Economy Metrics & KPI Frameworks</h2>
          <p>Measuring circularity requires specific metrics beyond traditional sustainability KPIs. The Ellen MacArthur Foundation\u2019s Circulytics tool measures company-level circularity across 30+ indicators. Key metrics include: <strong>Material Circularity Indicator (MCI)</strong> measuring the restorative flow of materials (0-1 scale), <strong>Circular Material Use Rate (CMUR)</strong> percentage of recycled input materials, <strong>Product Lifetime Extension</strong> ratio of actual vs average product lifespan, <strong>Waste Diversion Rate</strong> percentage of waste diverted from landfill, and <strong>Revenue from Circular Models</strong> percentage of total revenue generated through circular business models.</p>

          <KpiRow items={[
            { label: 'Global Circularity Rate', value: '7.2%', change: 'Down from 9.1% in 2018', positive: false },
            { label: 'EU Circular Material Use', value: '11.5%', change: 'Target 25% by 2030', positive: false },
            { label: 'Avg MCI Score (Leaders)', value: '0.65', change: 'vs 0.15 industry avg', positive: true },
            { label: 'Circular Revenue Growth', value: '+32% YoY', change: 'Among circular adopters', positive: true },
          ]} />

          <FlowDiagram steps={[
            { label: 'Design for Circularity', sub: 'Modular, repairable, recyclable' },
            { label: 'Circular Inputs', sub: 'Recycled & renewable materials' },
            { label: 'Product Use & Service', sub: 'PaaS, sharing, maintenance' },
            { label: 'Collection & Recovery', sub: 'Take-back & reverse logistics' },
            { label: 'Reintegration', sub: 'Recycle, remanufacture, reuse' },
          ]} />

          <SimplePieChart
            title="Circular Economy Value Levers ($T by 2030P)"
            data={[
              { name: 'Resource Efficiency', value: 1.8, color: '#059669' },
              { name: 'New Business Models', value: 1.2, color: '#0d9488' },
              { name: 'Waste Recovery', value: 0.8, color: '#3b82f6' },
              { name: 'Product as Service', value: 0.5, color: '#10b981' },
              { name: 'Regenerative Agriculture', value: 0.2, color: '#06b6d4' },
            ]}
          />

          <h2 id="case-study">Case Study: Electronics Circular Transformation</h2>
          <p>A global electronics manufacturer with $28B revenue transformed its business model from selling devices to providing \u201cTechnology as a Service\u201d for enterprise customers. The company redesigned 45 flagship products for modularity, repairability, and recyclability. Key outcomes over 3 years: 72% reduction in virgin material consumption per service unit, 85% product take-back rate from enterprise customers, 92% material recovery rate from returned devices, and $1.8B in new circular revenue streams. The company\u2019s MCI score improved from 0.18 to 0.72, placing it in the top 5% of electronics companies globally. Customer retention rates for PaaS contracts exceeded 92% compared to 68% for traditional product sales. The circular transformation required $450M in R&D and infrastructure investment but generated $280M in annual cost savings through material efficiency and $350M in new service revenue, achieving full payback in 18 months.</p>

          <Timeline items={[
            { year: '2023', title: 'Circular Design Standards', desc: 'Established company-wide design-for-circularity standards across all product categories.' },
            { year: '2024', title: 'PaaS Pilot Launch', desc: 'Launched Technology-as-a-Service model with 50 enterprise pilot customers.' },
            { year: '2025', title: 'Reverse Logistics Network', desc: 'Built global take-back infrastructure covering 35 countries with 95% coverage.' },
            { year: '2026', title: 'Full Circular Portfolio', desc: '100% of new products meet circular design standards. 65% circular revenue share.' },
            { year: '2027', title: 'Closed-Loop Materials', desc: '50% of material inputs from post-consumer recycled sources. Zero waste to landfill.' },
          ]} />
        </div>
      </>);

    case 'Understanding the EU Corporate Sustainability Reporting Directive (CSRD)':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">The EU Corporate Sustainability Reporting Directive (CSRD) represents the most comprehensive sustainability reporting framework ever enacted. Replacing the Non-Financial Reporting Directive (NFRD), CSRD expands the scope to 50,000+ companies, introduces mandatory audit assurance, and requires detailed reporting under the European Sustainability Reporting Standards (ESRS). For companies doing business in Europe, CSRD compliance is not optional \u2014 it is a legal requirement with significant penalties for non-compliance.</p>

          <StatCards items={[
            { label: 'Companies in Scope', value: '50,000+', icon: Building2, color: '#059669' },
            { label: 'Disclosure Requirements', value: '1,200+', icon: FileText, color: '#ef4444' },
            { label: 'ESRS Standards', value: '12', icon: ShieldCheck, color: '#0d9488' },
            { label: 'Penalty (Max)', value: '5% Revenue', icon: AlertTriangle, color: '#f59e0b' },
          ]} />

          <h2 id="requirements">CSRD Requirements & ESRS Standards Overview</h2>
          <p>CSRD requires companies to report on 12 ESRS standards covering cross-cutting topics and environmental, social, and governance matters. The <strong>ESRS framework</strong> includes: ESRS 1 (General Principles), ESRS 2 (General Disclosures), E1 (Climate Change), E2 (Pollution), E3 (Water), E4 (Biodiversity), E5 (Resource Use), S1 (Own Workforce), S2 (Value Chain Workers), S3 (Affected Communities), S4 (Consumers), and G1 (Business Conduct). Companies must conduct a double materiality assessment to determine which standards are relevant, covering both financial materiality (outside-in) and impact materiality (inside-out). The level of detail required is unprecedented, with over 1,200 potential data points across the full ESRS set.</p>

          <SimpleBarChart title="CSRD Data Point Distribution by ESRS Standard" data={[
            { label: 'E1: Climate', value: 180, color: '#059669' },
            { label: 'S1: Own Workforce', value: 150, color: '#0d9488' },
            { label: 'ESRS 2: General', value: 120, color: '#3b82f6' },
            { label: 'E5: Resource Use', value: 105, color: '#f59e0b' },
            { label: 'E4: Biodiversity', value: 85, color: '#10b981' },
            { label: 'Other Standards', value: 560, color: '#06b6d4' },
          ]} />

          <h2 id="timeline">Implementation Timeline & Phased Rollout</h2>
          <Timeline items={[
            { year: 'Jan 2024', title: 'First Reporting (Large PIEs)', desc: 'Companies already subject to NFRD with 500+ employees report under CSRD for FY2024.' },
            { year: 'Jan 2025', title: 'Large Companies (Phase 2)', desc: 'All large companies meeting 2 of 3 criteria (\u20ac50M revenue, \u20ac25M assets, 250+ employees).' },
            { year: 'Jan 2026', title: 'SMEs & Listed SMEs', desc: 'Listed SMEs (except micro-enterprises) begin reporting. Opt-out until 2028 available.' },
            { year: 'Jan 2027', title: 'Third-Country Companies', desc: 'Non-EU companies with >\u20ac150M EU turnover report on ESRS equivalent standards.' },
            { year: '2028-2030', title: 'Full Assurance', desc: 'Transition from limited assurance to reasonable assurance for all CSRD disclosures.' },
          ]} />

          <h2 id="readiness">CSRD Readiness Assessment</h2>
          <p>Our readiness assessment of 1,200 in-scope companies reveals significant preparation gaps. Only 22% of companies have completed a double materiality assessment aligned with ESRS methodology. Data availability for required metrics averages just 38% across all ESRS standards. The most challenging areas are: Scope 3 value chain reporting (28% data availability), biodiversity impact assessment (15%), and human rights due diligence (32%). Average implementation cost is estimated at \u20ac1.5\u20133M for first-time compliance, with ongoing costs of \u20ac500\u2013800K annually for mature programs.</p>

          <KpiRow items={[
            { label: 'Double Materiality Completed', value: '22%', change: 'Of in-scope companies', positive: false },
            { label: 'Data Availability (Avg)', value: '38%', change: 'Across ESRS standards', positive: false },
            { label: 'First-Time Compliance Cost', value: '\u20ac1.5-3M', change: 'Estimate per company', positive: false },
            { label: 'Assurance Readiness', value: '18%', change: 'Currently prepared', positive: false },
          ]} />

          <h2 id="case-study">Case Study: CSRD Compliance Transformation</h2>
          <p>A German automotive supplier with \u20ac12B revenue and operations in 28 countries undertook a comprehensive CSRD compliance program using CarbonSync\u2019s CSRD Compliance Platform. The 18-month program included: double materiality assessment engaging 85 internal and external stakeholders across 12 ESRS standards; gap analysis of 1,200+ data points identifying 680 gaps with remediation plans; deployment of automated data collection from 45 source systems covering 92% of required data points; implementation of ESRS-aligned internal control framework with automated audit trails; and training program for 320 finance, sustainability, and legal team members. Results: first CSRD report published on time with zero material findings from the statutory auditor, 95% data completeness rate, and 60% reduction in ongoing compliance effort through automation. The total program cost of \u20ac4.2M was offset by \u20ac1.8M in identified operational efficiencies and a 20 bps reduction in sustainability-linked loan pricing.</p>

          <ComparisonTable
            headers={['Readiness Level', 'Data Coverage', 'Materiality', 'Systems', 'Timeline Risk']}
            rows={[
              ['Leading (15%)', '>80%', 'Completed', 'Integrated platform', 'Low'],
              ['Progressing (35%)', '50-80%', 'In progress', 'Partial automation', 'Medium'],
              ['Developing (30%)', '20-50%', 'Not started', 'Manual/spreadsheets', 'High'],
              ['Lagging (20%)', '<20%', 'Awareness only', 'None', 'Critical'],
            ]}
          />

          <FlowDiagram steps={[
            { label: 'Scope Assessment', sub: 'ESRS applicability & gaps' },
            { label: 'Double Materiality', sub: 'Financial + impact materiality' },
            { label: 'Data Infrastructure', sub: 'Automated data pipeline' },
            { label: 'Internal Controls', sub: 'Audit-ready processes' },
            { label: 'Report & Assure', sub: 'ESRS-aligned disclosure' },
          ]} />
        </div>
      </>);

    case 'How to Implement Internal Carbon Pricing':
      return base(<>
        <HeroSection title={title} />
        <div className="detail-body">
          <p id="overview" className="detail-lede">Internal carbon pricing (ICP) is a powerful tool that enables organizations to integrate carbon costs into business decision-making. By assigning a monetary value to each ton of CO2 emitted, companies can identify cost-effective reduction opportunities, influence investment decisions, and prepare for future regulatory carbon pricing. With 2,800+ companies already using ICP and regulatory carbon prices rising rapidly, internal carbon pricing has become an essential component of corporate climate strategy.</p>

          <StatCards items={[
            { label: 'Companies Using ICP', value: '2,800+', icon: Building2, color: '#059669' },
            { label: 'Avg Internal Carbon Price', value: '$58/t', icon: BarChart3, color: '#0d9488' },
            { label: 'Range of Prices Used', value: '$5-150/t', icon: TrendingUp, color: '#f59e0b' },
            { label: 'ICP Adoption Growth Rate', value: '+22% YoY', icon: Target, color: '#3b82f6' },
          ]} />

          <h2 id="methods">Internal Carbon Pricing Methods</h2>
          <p>Three main ICP approaches are used depending on organizational objectives. <strong>Shadow Price</strong> \u2014 a theoretical carbon cost applied to investment decisions and business cases without actual financial transfers. Most common (62% of users) for capital allocation and project evaluation. <strong>Internal Carbon Fee</strong> \u2014 a real financial charge on business units based on emissions, with funds used for decarbonization investments. Used by 22% of companies including Microsoft and Disney. <strong>Carbon Fund/Book & Claim</strong> \u2014 business units contribute to a central fund that finances emission reduction projects across the organization, creating a \u201cefficiency market\u201d within the company.</p>

          <SimpleBarChart title="ICP Method Adoption (%)" data={[
            { label: 'Shadow Price', value: 62, color: '#059669' },
            { label: 'Internal Carbon Fee', value: 22, color: '#0d9488' },
            { label: 'Carbon Fund', value: 10, color: '#3b82f6' },
            { label: 'Hybrid Approach', value: 6, color: '#10b981' },
          ]} />

          <h2 id="pricing">Setting the Right Carbon Price</h2>
          <p>The appropriate carbon price depends on the intended use case. For <strong>risk management</strong>, companies should use regulatory forecasts: $100\u2013200/tCO2 for EU-exposed operations by 2030. For <strong>investment decisions</strong>, the price should reflect the company\u2019s marginal abatement cost curve and target ambition. For <strong>behavior change</strong>, a lower visible price ($25\u201350/t) combined with internal fund mechanisms can drive engagement. Microsoft uses a shadow price of $75/t for investments and an internal carbon fee of $15/t for operational accountability. The trend is toward higher internal prices: the average ICP has risen from $35/t in 2021 to $58/t in 2026.</p>

          <ComparisonTable
            headers={['ICP Purpose', 'Recommended Price', 'Success Metrics', 'Implementation Complexity']}
            rows={[
              ['Investment Decisions', '$75-150/t', '% projects with carbon payback', 'Low'],
              ['Operational Behavior', '$25-50/t', 'BU emission reduction rate', 'Medium'],
              ['Strategic Risk Management', '$100-200/t', 'Portfolio carbon exposure', 'Low'],
              ['Internal Fund/Carbon Fee', '$15-50/t', 'Fund allocation & project ROI', 'High'],
            ]}
          />

          <h2 id="implementation">Implementation Framework & Best Practices</h2>
          <p>Successful ICP implementation follows a structured approach: <strong>1. Define Objectives</strong> \u2014 clarify primary purpose: risk management, investment decisions, behavior change, or cultural transformation. <strong>2. Secure Executive Sponsorship</strong> \u2014 CFO and CEO buy-in is essential for embedding ICP into core financial processes. <strong>3. Design the Mechanism</strong> \u2014 select method, set price trajectory, define which decisions are affected, and establish fund governance. <strong>4. Pilot & Refine</strong> \u2014 start with one business unit or decision type before full rollout. <strong>5. Integrate & Scale</strong> \u2014 embed into capital planning, procurement, R&D, and performance management systems. Leading companies take 12\u201318 months for full implementation.</p>

          <FlowDiagram steps={[
            { label: 'Define Objectives', sub: 'Risk, investment, behavior' },
            { label: 'Select Method', sub: 'Shadow fee, fund, hybrid' },
            { label: 'Set Price', sub: 'Aligned with abatement cost' },
            { label: 'Pilot Program', sub: 'One BU or decision type' },
            { label: 'Full Integration', sub: 'Core business processes' },
          ]} />

          <KpiRow items={[
            { label: 'ICP Adoption Rate', value: '38%', change: 'Of Fortune 500', positive: true },
            { label: 'Avg Carbon Price', value: '$58/t', change: '+65% since 2021', positive: true },
            { label: 'Emission Reduction Impact', value: '12-18%', change: 'Within 2 years', positive: true },
            { label: 'Program Payback', value: '8-14 Months', change: 'Implementation cost', positive: true },
          ]} />

          <SimpleLineChart
            title="Average Internal Carbon Price Trend ($/t, 2018-2026)"
            data={[
              { year: '2018', value: 22 },
              { year: '2019', value: 26 },
              { year: '2020', value: 28 },
              { year: '2021', value: 35 },
              { year: '2022', value: 42 },
              { year: '2023', value: 48 },
              { year: '2024', value: 52 },
              { year: '2025', value: 55 },
              { year: '2026', value: 58 },
            ]}
            xKey="year"
            yKey="value"
          />

          <h2 id="case-study">Case Study: Global Chemical Company ICP Program</h2>
          <p>A global chemical company with $35B revenue and 18 MtCO2e annual emissions implemented a comprehensive internal carbon pricing program using CarbonSync\u2019s ICP platform. The company adopted a hybrid approach: a $75/t shadow price for all capital investments over $5M, and a $25/t internal carbon fee applied to business unit P&Ls with funds directed to a central decarbonization fund. Over 3 years, the program transformed investment decisions \u2014 72% of approved capital projects now include carbon ROI as a primary criterion, compared to 12% before ICP. The carbon fund collected $450M, financing 85 decarbonization projects with combined annual savings of 2.8 MtCO2e and $180M in energy cost reductions. Business units achieved an average 15% emission reduction through a combination of operational changes (8%) and capital investments (7%). The program achieved full cost recovery within 14 months. Investor relations reported that the ICP program was cited as a best practice by 85% of ESG analysts covering the company.</p>

          <SimplePieChart
            title="ICP Fund Allocation by Project Type"
            data={[
              { name: 'Energy Efficiency', value: 35, color: '#059669' },
              { name: 'Renewable Energy', value: 28, color: '#0d9488' },
              { name: 'Process Electrification', value: 18, color: '#3b82f6' },
              { name: 'Circular Economy', value: 12, color: '#10b981' },
              { name: 'Carbon Removal', value: 7, color: '#06b6d4' },
            ]}
          />
        </div>
      </>);

    default: {
      const img = heroImages[title] || '/resources-assets/img5.webp';
      const subtitle: Record<string, string> = {
        'The Growing Importance of Biodiversity Metrics': 'As biodiversity loss accelerates, forward-thinking companies are measuring their impact on nature.',
        'Navigating the SEC Climate Disclosure Rules': 'A comprehensive guide to understanding the SEC\u2019s landmark climate disclosure regulations.',
        'Green IT: Reducing the Carbon Footprint of Your Software': 'Optimizing your software stack to dramatically cut digital carbon emissions.',
        'Decarbonizing Logistics and Last-Mile Delivery': 'Route optimization, EV fleets, and data-driven logistics for sustainable delivery.',
        'The Future of Renewable Energy Certificates (RECs)': 'A deep market analysis of REC credibility and the rise of 24/7 carbon-free energy.',
        'Overcoming Data Silos in ESG Reporting': 'Unifying fragmented data sources for audit-ready ESG reporting.',
        'Understanding the Role of the VCMI in Carbon Markets': 'How the VCMI is setting new standards for carbon credit claims.',
        'Building Climate Resilience in Commercial Real Estate': 'How property owners are future-proofing their portfolios.',
        'The Financial Risks of Ignoring Scope 3 Emissions': 'Why investors are pricing in supply chain carbon risk.',
      };
      return base(<>
        <div className="detail-hero">
          <div className="dh-image" style={{ backgroundImage: `url(${img})` }} />
          <div className="dh-overlay" />
          <div className="dh-content">
            <div className="dh-eyebrow"><Sparkles size={14} /> CarbonSync Knowledge Hub</div>
            <h1>{title}</h1>
            <p>{subtitle[title] || 'An in-depth resource from CarbonSync\u2019s sustainability research team.'}</p>
            <div className="dh-meta">
              <span><BookOpen size={14} /> Resource Guide</span>
              <span><BarChart3 size={14} /> Data-driven insights</span>
              <span><ShieldCheck size={14} /> Expert-reviewed</span>
            </div>
          </div>
        </div>
        <div className="detail-body">
          <p className="detail-lede">This resource provides a comprehensive overview of {title.toLowerCase()}. In this analysis, CarbonSync\u2019s research team breaks down the key concepts, emerging trends, and actionable strategies that organizations need to navigate this critical sustainability topic.</p>

          <StatCards items={[
            { label: 'Relevant Frameworks', value: '12+', icon: ShieldCheck, color: '#059669' },
            { label: 'Key Data Points', value: '50+', icon: BarChart3, color: '#0d9488' },
            { label: 'Industry Impact Score', value: 'High', icon: Target, color: '#10b981' },
            { label: 'Priority Level', value: 'Critical', icon: AlertTriangle, color: '#f59e0b' },
          ]} />

          <h2>Overview</h2>
          <p>The landscape of {title.toLowerCase()} is evolving rapidly. Organizations must stay informed about the latest regulatory developments, technological innovations, and market dynamics to maintain a competitive edge. CarbonSync\u2019s research indicates that early movers in this space are achieving significant advantages in terms of risk management, operational efficiency, and stakeholder trust.</p>

          <SimpleBarChart title="Key Impact Areas" data={[
            { label: 'Regulatory', value: 85, color: '#059669' },
            { label: 'Financial', value: 72, color: '#0d9488' },
            { label: 'Operational', value: 68, color: '#10b981' },
            { label: 'Reputational', value: 91, color: '#3b82f6' },
          ]} />

          <h2>Key Statistics</h2>
          <p>Our analysis of industry data reveals compelling trends that organizations must understand when developing their strategy around {title.toLowerCase()}. Market leaders are investing significantly in data infrastructure, talent development, and technology solutions to address these challenges and capitalize on emerging opportunities.</p>

          <KpiRow items={[
            { label: 'Market Growth', value: '+24% YoY', change: 'Accelerating', positive: true },
            { label: 'Adoption Rate', value: '62%', change: 'Among leaders', positive: true },
            { label: 'Investment Required', value: '$2.1M', change: 'Average program', positive: false },
            { label: 'ROI Timeline', value: '14 months', change: 'Average payback', positive: true },
          ]} />

          <h2>Analysis</h2>
          <p>To effectively address {title.toLowerCase()}, organizations should adopt a structured approach: assess current maturity against industry benchmarks, identify priority gaps and opportunities, develop a roadmap aligned with business strategy, implement supporting technology and processes, and establish ongoing monitoring and reporting mechanisms. CarbonSync\u2019s platform provides end-to-end support for each of these stages, from data collection through to audit-ready reporting.</p>

          <ComparisonTable
            headers={['Stage', 'Current State', 'Target State', 'Timeline']}
            rows={[
              ['Assessment', 'Manual, spreadsheet-based', 'Automated data collection', 'Month 1-2'],
              ['Strategy', 'Ad-hoc initiatives', 'Board-approved roadmap', 'Month 2-4'],
              ['Implementation', 'Partial coverage', 'Full program rollout', 'Month 4-8'],
              ['Monitoring', 'Annual reporting', 'Real-time dashboards', 'Month 6-10'],
              ['Optimization', 'Reactive', 'Predictive analytics', 'Month 10-12'],
            ]}
          />

          <h2>Outlook</h2>
          <p>The trajectory of {title.toLowerCase()} points toward greater integration with core business strategy, increased regulatory scrutiny, and accelerated technology adoption. Organizations that invest now in building robust data infrastructure, developing internal expertise, and establishing cross-functional governance will be best positioned to thrive in this evolving landscape.</p>

          <FlowDiagram steps={[
            { label: 'Assess', sub: 'Maturity benchmarking' },
            { label: 'Plan', sub: 'Strategic roadmap' },
            { label: 'Implement', sub: 'Technology & processes' },
            { label: 'Monitor', sub: 'Real-time dashboards' },
            { label: 'Optimize', sub: 'Continuous improvement' },
          ]} />

          <Timeline items={[
            { year: '2024', title: 'Foundation Building', desc: 'Establish baseline data collection and assess current maturity.' },
            { year: '2025', title: 'Infrastructure Deployment', desc: 'Implement core technology platforms and build team capabilities.' },
            { year: '2026', title: 'Program Scaling', desc: 'Expand coverage across business units and geographies.' },
            { year: '2027', title: 'Advanced Analytics', desc: 'Deploy AI-powered insights and predictive modeling.' },
            { year: '2028', title: 'Full Integration', desc: 'Seamless integration with core business processes and strategy.' },
          ]} />
        </div>
      </>);
    }
  }
}
