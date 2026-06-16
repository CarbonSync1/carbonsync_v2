'use client';

import React, { useEffect, useState, useRef } from 'react';

import { X, ArrowRight, BookOpen, FileText, Leaf, Globe2, TrendingUp, BarChart3, Users, Download, ShieldCheck, Search, PlayCircle, Mail, CheckCircle2, FileSearch } from 'lucide-react';
import { getArticleContent, sectionImages } from './data/articleContent';

type Resource = {
  type: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  tag: string;
  read: string;
  accent: string;
  image?: string;
  logoText?: string;
  logoColor?: string;
  hideFromAll?: boolean;
};

const allResources: Resource[] = [
  { type: 'Article', title: 'The Growing Importance of Biodiversity Metrics', desc: 'Why companies are moving beyond just carbon to track their impact on nature and biodiversity.', icon: Leaf, tag: 'Net Zero', read: '8 min read', accent: 'accent-teal', image: '/resources-assets/img4.webp' },
  { type: 'Article', title: 'Navigating the SEC Climate Disclosure Rules', desc: 'What US companies need to know to stay compliant with the latest SEC mandates.', icon: Leaf, tag: 'Carbon Data', read: '9 min read', accent: 'accent-teal', image: '/resources-assets/img5.webp' },
  { type: 'Article', title: 'Green IT: Reducing the Carbon Footprint of Your Software', desc: 'Tips and strategies for optimizing server usage, code efficiency, and cloud architecture.', icon: Leaf, tag: 'Analytics', read: '5 min read', accent: 'accent-teal', image: '/resources-assets/img6.webp' },
  { type: 'Article', title: 'Decarbonizing Logistics and Last-Mile Delivery', desc: 'How e-commerce and retail companies are rethinking their supply chains for a low-carbon future.', icon: Leaf, tag: 'Net Zero', read: '10 min read', accent: 'accent-teal', image: '/resources-assets/img7.webp' },
  { type: 'Article', title: 'The Future of Renewable Energy Certificates (RECs)', desc: 'Are RECs still a viable way to claim zero emissions? A critical look at the market.', icon: Leaf, tag: 'Carbon Data', read: '7 min read', accent: 'accent-teal', image: '/resources-assets/img8.webp' },
  { type: 'Article', title: 'Overcoming Data Silos in ESG Reporting', desc: 'How to centralize your sustainability data to improve accuracy and auditability.', icon: Leaf, tag: 'Analytics', read: '6 min read', accent: 'accent-teal', image: '/resources-assets/img9.webp' },
  { type: 'Article', title: 'Understanding the Role of the VCMI in Carbon Markets', desc: 'How the Voluntary Carbon Markets Integrity Initiative is standardizing claims.', icon: Leaf, tag: 'Carbon Data', read: '8 min read', accent: 'accent-teal', image: '/resources-assets/img12.webp' },
  { type: 'Article', title: 'Building Climate Resilience in Commercial Real Estate', desc: 'Strategies for retrofitting properties and managing physical climate risks.', icon: Leaf, tag: 'Net Zero', read: '10 min read', accent: 'accent-teal', image: '/resources-assets/img13.webp' },
  { type: 'Article', title: 'The Financial Risks of Ignoring Scope 3 Emissions', desc: 'Why investors are increasingly demanding full value chain transparency.', icon: Leaf, tag: 'Analytics', read: '6 min read', accent: 'accent-teal', image: '/resources-assets/img14.webp' },
  { type: 'Article', title: 'Why Real-Time Tracking Matters', desc: 'Explore how live dashboards help teams avoid spreadsheet errors and make faster sustainability decisions.', icon: Leaf, tag: 'Analytics', read: '5 min read', accent: 'accent-teal', image: '/resources-assets/img9.webp' },
  { type: 'Article', title: 'Greenwashing vs True Sustainability', desc: 'How to communicate your sustainability efforts transparently and avoid greenwashing traps.', icon: Leaf, tag: 'Analytics', read: '7 min read', accent: 'accent-teal', image: '/resources-assets/img15.webp' },
  { type: 'Article', title: 'The Role of AI in ESG Compliance', desc: 'Discover how AI is transforming ESG reporting and compliance for modern enterprises.', icon: Leaf, tag: 'Analytics', read: '6 min read', accent: 'accent-teal', image: '/resources-assets/img5.webp' },
  { type: 'Article', title: 'The Impact of Scope 3 Emissions on Global Supply Chains', desc: 'Why indirect emissions matter and how to start tracking them across your value chain.', icon: Leaf, tag: 'Net Zero', read: '8 min read', accent: 'accent-teal', image: '/resources-assets/img3.webp' },
  { type: 'Article', title: 'Why Carbon Taxes Are Reshaping the Global Economy', desc: 'An overview of new carbon tax policies and their financial implications for enterprises.', icon: Leaf, tag: 'Carbon Data', read: '6 min read', accent: 'accent-teal', image: '/resources-assets/img5.webp' },
  { type: 'Article', title: '5 Common Pitfalls in ESG Reporting', desc: 'Avoid these frequent mistakes to ensure your sustainability reports are accurate and compliant.', icon: Leaf, tag: 'Analytics', read: '5 min read', accent: 'accent-teal', image: '/resources-assets/img7.webp' },
  { type: 'Article', title: 'What is Decarbonization: Action Plan', desc: 'A comprehensive overview of decarbonization strategies for businesses.', icon: Leaf, tag: 'Analytics', read: '5 min read', accent: 'accent-teal', image: '/resources-assets/img10.webp' },
  { type: 'Article', title: 'How to Build a Sustainable Procurement Strategy', desc: 'Learn how to integrate ESG criteria into your purchasing decisions and supplier evaluations.', icon: Leaf, tag: 'Net Zero', read: '7 min read', accent: 'accent-teal', image: '/resources-assets/img2.webp' },
  { type: 'Article', title: 'Understanding the CBAM Regulation', desc: 'A breakdown of the Carbon Border Adjustment Mechanism and its impact on international trade.', icon: Leaf, tag: 'Analytics', read: '9 min read', accent: 'accent-teal', image: '/resources-assets/img12.webp' },
  { type: 'Article', title: 'Best Practices for Energy Audits', desc: 'How to conduct an effective energy audit to identify immediate cost and carbon savings.', icon: Leaf, tag: 'Carbon Data', read: '6 min read', accent: 'accent-teal', image: '/resources-assets/img15.webp' },
  { type: 'Article', title: 'The Evolution of Green Finance', desc: 'How green bonds and sustainability-linked loans are changing the funding landscape.', icon: Leaf, tag: 'Analytics', read: '8 min read', accent: 'accent-teal', image: '/resources-assets/img17.webp' },
  { type: 'Article', title: 'Demystifying the SBTi Validation Process', desc: 'A clear guide to setting Science Based Targets and getting them validated successfully.', icon: Leaf, tag: 'Net Zero', read: '10 min read', accent: 'accent-teal', image: '/resources-assets/img4.webp' },
  { type: 'Article', title: 'The Rise of Circular Economy Business Models', desc: 'How moving away from the take-make-dispose model is driving sustainable innovation.', icon: Leaf, tag: 'Net Zero', read: '7 min read', accent: 'accent-teal', image: '/resources-assets/img1.webp' },
  { type: 'Article', title: 'Understanding the EU Corporate Sustainability Reporting Directive (CSRD)', desc: 'Key takeaways from the new EU reporting standards and what they mean for your business.', icon: Leaf, tag: 'Carbon Data', read: '11 min read', accent: 'accent-teal', image: '/resources-assets/img2.webp' },
  { type: 'Article', title: 'How to Implement Internal Carbon Pricing', desc: 'A practical guide to setting and managing an internal price on carbon emissions.', icon: Leaf, tag: 'Analytics', read: '6 min read', accent: 'accent-teal', image: '/resources-assets/img3.webp' },
  { type: 'Article', title: 'How to Engage Your Board of Directors on ESG Goals', desc: 'Communication strategies to secure executive buy-in for decarbonization.', icon: Leaf, tag: 'Company News', read: '7 min read', accent: 'accent-teal', image: '/resources-assets/img15.webp' },
  { type: 'Article', title: 'Decoding the Latest IPCC Climate Change Report', desc: 'Key scientific takeaways and their direct implications for global industries.', icon: Leaf, tag: 'Analytics', read: '15 min read', accent: 'accent-teal', image: '/resources-assets/img16.webp' },
  { type: 'Article', title: 'Sustainable Packaging: Beyond the Basics', desc: 'Exploring next-generation materials and lifecycle assessment tools.', icon: Leaf, tag: 'Net Zero', read: '8 min read', accent: 'accent-teal', image: '/resources-assets/img17.webp' },
  { type: 'Guide', title: 'CarbonSynqEarth Net Zero Planning Guide', desc: 'A practical step-by-step guide to help teams measure emissions, set targets, and move from planning to action with CarbonSynqEarth.', icon: BookOpen, tag: 'Net Zero', read: '8 min read', accent: 'accent-emerald', image: '/resources-assets/img5.webp' },
  { type: 'Guide', title: 'Advanced Scope 3 Emissions Modeling', desc: 'Deep dive into supply chain emissions modeling and data collection strategies with CarbonSynqEarth.', icon: BookOpen, tag: 'Net Zero', read: '12 min read', accent: 'accent-emerald', image: '/resources-assets/img10.webp' },
  { type: 'Guide', title: 'CarbonSynqEarth Decarbonization Guide', desc: 'Learn how to implement decarbonization strategies across your supply chain effectively.', icon: BookOpen, tag: 'Net Zero', read: '15 min read', accent: 'accent-emerald', image: '/resources-assets/img16.webp' },
  { type: 'Guide', title: 'Executive Guide to Decarbonization', desc: 'A high-level view for C-suite leaders on why sustainability matters right now.', icon: BookOpen, tag: 'Net Zero', read: '10 min read', accent: 'accent-emerald', image: '/resources-assets/img1.webp' },
  { type: 'Guide', title: 'The Blueprint for Scope 3 Data Collection', desc: 'How to engage suppliers and gather accurate scope 3 emissions data effectively.', icon: BookOpen, tag: 'Carbon Data', read: '15 min read', accent: 'accent-lime', image: '/resources-assets/img2.webp' },
  { type: 'Guide', title: 'Regulatory Compliance Playbook 2026', desc: 'A comprehensive playbook for managing carbon compliance across global frameworks.', icon: ShieldCheck, tag: 'Net Zero', read: '12 min read', accent: 'accent-teal', image: '/resources-assets/img3.webp' },
  { type: 'Guide', title: 'Top 7 Scope 3 Software Platforms in 2026', desc: 'A review of the best software for tracking Scope 3 emissions in 2026.', icon: BookOpen, tag: 'Net Zero', read: '10 min read', accent: 'accent-emerald', image: '/resources-assets/img4.webp' },
  { type: 'Whitepaper', title: 'Carbon Accounting for Supply Chains', desc: 'Understand how real-time carbon data improves Scope 1, Scope 2, and Scope 3 visibility across operations.', icon: FileText, tag: 'Carbon Data', read: 'Download PDF', accent: 'accent-lime', image: '/resources-assets/img4.webp' },
  { type: 'Whitepaper', title: 'The Future of ESG Reporting with CarbonSynqEarth', desc: 'An analysis of upcoming regulatory changes and how companies can prepare their data infrastructure.', icon: FileText, tag: 'Carbon Data', read: 'Download PDF', accent: 'accent-lime', image: '/resources-assets/img11.webp' },
  { type: 'Whitepaper', title: 'Data-Driven Sustainability Insights', desc: 'How to use data to drive sustainability initiatives and report accurately to stakeholders.', icon: FileText, tag: 'Carbon Data', read: 'Download PDF', accent: 'accent-lime', image: '/resources-assets/img17.webp' },
  { type: 'Whitepaper', title: 'What is Australian Sustainability Reporting', desc: 'A guide to the new sustainability reporting standards in Australia.', icon: FileText, tag: 'Carbon Data', read: 'Download PDF', accent: 'accent-lime', image: '/resources-assets/img6.webp' },
  { type: 'Whitepaper', title: 'The Future of Carbon Pricing', desc: 'An in-depth analysis of global carbon pricing mechanisms and how they affect businesses.', icon: FileText, tag: 'Carbon Data', read: 'Download PDF', accent: 'accent-lime', image: '/resources-assets/img5.webp' },
  { type: 'Whitepaper', title: 'Decarbonizing Heavy Industry', desc: 'Strategies for reducing emissions in steel, cement, and chemical manufacturing sectors.', icon: FileText, tag: 'Net Zero', read: 'Download PDF', accent: 'accent-lime', image: '/resources-assets/img7.webp' },
  { type: 'Whitepaper', title: 'Innovations in Carbon Capture', desc: 'Exploring the latest technologies in carbon capture, utilization, and storage (CCUS).', icon: FileText, tag: 'Analytics', read: 'Download PDF', accent: 'accent-lime', image: '/resources-assets/img8.webp' },
  { type: 'Whitepaper', title: 'Understanding Carbon Credits and Offsets', desc: 'A complete guide to navigating the voluntary carbon market and ensuring offset quality.', icon: FileText, tag: 'Net Zero', read: 'Download PDF', accent: 'accent-lime', image: '/resources-assets/img11.webp' },
  { type: 'Whitepaper', title: 'The Role of AI in Net Zero Planning', desc: 'How machine learning algorithms are optimizing emission reduction pathways.', icon: FileText, tag: 'Analytics', read: 'Download PDF', accent: 'accent-lime', image: '/resources-assets/img13.webp' },
];



const defaultTocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'key-statistics', label: 'Key Statistics' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'outlook', label: 'Outlook' },
];

function getAllTocItems(title: string) {
  const customToc: Record<string, { id: string; label: string }[]> = {
    'Decarbonizing Logistics and Last-Mile Delivery': [
      { id: 'overview', label: 'Overview' },
      { id: 'route-optimization', label: 'Route Optimization' },
      { id: 'ev-adoption', label: 'EV Adoption Stats' },
      { id: 'efficiency-dashboard', label: 'Efficiency Dashboard' },
      { id: 'carbon-calculator', label: 'Carbon Calculator' },
      { id: 'case-study', label: 'Case Study' },
    ],
    'The Future of Renewable Energy Certificates (RECs)': [
      { id: 'overview', label: 'Overview' },
      { id: 'market-trends', label: 'Market Trends' },
      { id: 'market-valuation', label: 'Market Valuation' },
      { id: 'cert-lifecycle', label: 'Certificate Lifecycle' },
      { id: 'demand-analysis', label: 'Demand Analysis' },
      { id: 'investment-growth', label: 'Investment Growth' },
    ],
    'Overcoming Data Silos in ESG Reporting': [
      { id: 'overview', label: 'Overview' },
      { id: 'architecture', label: 'Data Architecture' },
      { id: 'data-accuracy', label: 'Data Accuracy' },
      { id: 'workflow', label: 'Workflow' },
      { id: 'case-study', label: 'Enterprise Case Study' },
    ],
    'Understanding the Role of the VCMI in Carbon Markets': [
      { id: 'overview', label: 'Overview' },
      { id: 'pricing-trends', label: 'Pricing Trends' },
      { id: 'market-growth', label: 'Market Growth' },
      { id: 'verification-flow', label: 'Verification Flow' },
      { id: 'market-comparison', label: 'Market Comparison' },
    ],
    'Building Climate Resilience in Commercial Real Estate': [
      { id: 'overview', label: 'Overview' },
      { id: 'risk-heatmap', label: 'Risk Heatmap' },
      { id: 'performance', label: 'Building Performance' },
      { id: 'cost-benefit', label: 'Cost-Benefit Analysis' },
      { id: 'risk-zoning', label: 'Risk Zone Mapping' },
    ],
    'The Financial Risks of Ignoring Scope 3 Emissions': [
      { id: 'overview', label: 'Overview' },
      { id: 'risk-exposure', label: 'Risk Exposure' },
      { id: 'financial-loss', label: 'Financial Loss' },
      { id: 'investor-pressure', label: 'Investor Pressure' },
      { id: 'roi-impact', label: 'ROI Impact' },
      { id: 'penalties', label: 'Compliance Penalties' },
    ],
    'Why Real-Time Tracking Matters': [
      { id: 'overview', label: 'Overview' },
      { id: 'benefits', label: 'Benefits' },
      { id: 'roi', label: 'ROI' },
      { id: 'accuracy', label: 'Accuracy' },
      { id: 'future', label: 'Future Outlook' },
    ],
    'Greenwashing vs True Sustainability': [
      { id: 'overview', label: 'Overview' },
      { id: 'red-flags', label: 'Red Flags' },
      { id: 'transparency', label: 'Transparency' },
      { id: 'trust', label: 'Trust' },
      { id: 'best-practices', label: 'Best Practices' },
    ],
    'The Role of AI in ESG Compliance': [
      { id: 'overview', label: 'Overview' },
      { id: 'ai-applications', label: 'AI Applications' },
      { id: 'automation', label: 'Automation ROI' },
      { id: 'predictive', label: 'Predictive Analytics' },
      { id: 'case-study', label: 'Case Study' },
    ],
    'The Impact of Scope 3 Emissions on Global Supply Chains': [
      { id: 'overview', label: 'Overview' },
      { id: 'breakdown', label: 'Category Breakdown' },
      { id: 'supplier-engagement', label: 'Supplier Engagement' },
      { id: 'reduction', label: 'Reduction Levers' },
      { id: 'strategy', label: 'Strategic Framework' },
    ],
    'Why Carbon Taxes Are Reshaping the Global Economy': [
      { id: 'overview', label: 'Overview' },
      { id: 'global-rates', label: 'Global Rates' },
      { id: 'impact', label: 'Economic Impact' },
      { id: 'business-response', label: 'Business Response' },
      { id: 'outlook', label: 'Outlook' },
    ],
    '5 Common Pitfalls in ESG Reporting': [
      { id: 'overview', label: 'Overview' },
      { id: 'pitfall-1', label: 'Pitfall 1: Data Quality' },
      { id: 'pitfall-2', label: 'Pitfall 2: Boundaries' },
      { id: 'pitfall-3', label: 'Pitfall 3: Assurance' },
      { id: 'pitfall-4', label: 'Pitfall 4: Targets' },
      { id: 'pitfall-5', label: 'Pitfall 5: Stakeholders' },
    ],
    'What is Decarbonization: Action Plan': [
      { id: 'overview', label: 'Overview' },
      { id: 'roadmap', label: 'Roadmap' },
      { id: 'milestones', label: 'Milestones' },
      { id: 'sectors', label: 'Sector Pathways' },
      { id: 'action-plan', label: 'Action Plan' },
    ],
    'How to Build a Sustainable Procurement Strategy': [
      { id: 'overview', label: 'Overview' },
      { id: 'criteria', label: 'ESG Criteria' },
      { id: 'supplier-scoring', label: 'Supplier Scoring' },
      { id: 'integration', label: 'Integration' },
      { id: 'case-study', label: 'Case Study' },
    ],
    'Understanding the CBAM Regulation': [
      { id: 'overview', label: 'Overview' },
      { id: 'mechanism', label: 'CBAM Mechanism' },
      { id: 'impact', label: 'Trade Impact' },
      { id: 'compliance', label: 'Compliance' },
      { id: 'preparation', label: 'Preparation' },
    ],
    'Best Practices for Energy Audits': [
      { id: 'overview', label: 'Overview' },
      { id: 'audit-types', label: 'Audit Types' },
      { id: 'methodology', label: 'Methodology' },
      { id: 'savings', label: 'Savings Analysis' },
      { id: 'case-study', label: 'Case Study' },
    ],
    'The Evolution of Green Finance': [
      { id: 'overview', label: 'Overview' },
      { id: 'growth', label: 'Market Growth' },
      { id: 'instruments', label: 'Instruments' },
      { id: 'impact', label: 'Impact Measurement' },
      { id: 'outlook', label: 'Future Outlook' },
    ],
    'Demystifying the SBTi Validation Process': [
      { id: 'overview', label: 'Overview' },
      { id: 'steps', label: 'Process Steps' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'readiness', label: 'Readiness' },
      { id: 'case-study', label: 'Case Study' },
    ],
    'The Rise of Circular Economy Business Models': [
      { id: 'overview', label: 'Overview' },
      { id: 'principles', label: 'Principles' },
      { id: 'value-chains', label: 'Value Chains' },
      { id: 'metrics', label: 'Metrics & KPIs' },
      { id: 'case-study', label: 'Case Study' },
    ],
    'Understanding the EU Corporate Sustainability Reporting Directive (CSRD)': [
      { id: 'overview', label: 'Overview' },
      { id: 'requirements', label: 'Requirements' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'readiness', label: 'Readiness' },
      { id: 'case-study', label: 'Case Study' },
    ],
    'How to Implement Internal Carbon Pricing': [
      { id: 'overview', label: 'Overview' },
      { id: 'methods', label: 'Methods' },
      { id: 'pricing', label: 'Setting Price' },
      { id: 'implementation', label: 'Implementation' },
      { id: 'case-study', label: 'Case Study' },
    ],
  };
  return customToc[title] || [
    { id: 'overview', label: 'Overview' },
    { id: 'key-statistics', label: 'Key Statistics' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'outlook', label: 'Outlook' },
  ];
}

export default function ArticleDetail({
  resource,
  onClose,
  onDownload,
}: {
  resource: Resource;
  onClose: () => void;
  onDownload?: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const progress = scrollTop / (scrollHeight - clientHeight);
      setScrollProgress(Math.min(progress, 1));

      const sections = contentRef.current.querySelectorAll('h2[id]');
      let current = '';
      sections.forEach(s => {
        const rect = s.getBoundingClientRect();
        if (rect.top <= 150) current = s.getAttribute('id') || '';
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    const h2s = contentRef.current.querySelectorAll('h2[id]');
    const palette = [
      '#059669', '#0d9488', '#3b82f6', '#10b981', '#f59e0b',
      '#ef4444', '#06b6d4', '#8b5cf6', '#ec4899', '#f97316',
      '#14b8a6', '#6366f1', '#d946ef', '#e11d48', '#84cc16',
      '#0ea5e9', '#a855f7', '#22c55e', '#eab308', '#f43f5e',
    ];
    function hashColor(str: string) {
      let h = 0;
      for (let i = 0; i < str.length; i++) h = ((h << 5) - h) + str.charCodeAt(i);
      return palette[Math.abs(h) % palette.length];
    }
    h2s.forEach(h2 => {
      const id = h2.getAttribute('id');
      if (!id) return;
      if (h2.previousElementSibling?.classList.contains('section-frame-image')) return;
      const imgSrc = sectionImages[resource.title]?.[id];
      const label = h2.textContent || id;
      const div = document.createElement('div');
      div.className = 'section-frame-image';
      if (imgSrc) {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = label;
        div.appendChild(img);
      } else {
        const color = hashColor(resource.title + ':' + id);
        const bg = document.createElement('div');
        bg.className = 'section-frame-bg';
        bg.style.background = `linear-gradient(135deg, ${color}, ${color}cc)`;
        const txt = document.createElement('span');
        txt.className = 'section-frame-text';
        txt.textContent = label;
        bg.appendChild(txt);
        div.appendChild(bg);
      }
      h2.parentNode?.insertBefore(div, h2);
    });
  }, [resource.title]);

  const articleContent = getArticleContent(resource.title, onDownload);
  if (!articleContent) return null;

  return (
    <div
      className="article-detail-overlay"
    >
      <div className="ad-progress-bar" style={{ transform: `scaleX(${scrollProgress})` }} />

      <button className="ad-close" onClick={onClose}>
        <X size={24} />
      </button>

      <div className="ad-scroll-container" ref={contentRef}>
        {/* Sticky TOC */}
        <nav className="ad-toc">
          <div className="ad-toc-inner">
            <span className="ad-toc-title">On this page</span>
            {getAllTocItems(resource.title).map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`ad-toc-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="ad-main-content">
          {articleContent}
        </div>
      </div>
    </div>
  );
}
