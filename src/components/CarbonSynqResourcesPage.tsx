'use client';

import React, { useMemo, useState, useEffect } from 'react';
import '@/components/resources/resources-styles.css';
import {
  Search,
  BookOpen,
  FileText,
  Video,
  ArrowRight,
  Download,
  Share2,
  Sparkles,
  BarChart3,
  ShieldCheck,
  PlayCircle,
  Mail,
  TrendingUp,
  Globe2,
  CheckCircle2,
  Users,
  FileSearch,
  Leaf,
} from 'lucide-react';

const CarbonSynqLogoSticker = ({ size = 24, className = '', ...rest }: any) => (
  <img
    src="/netzero/unnamed.webp"
    alt="CarbonSynq"
    style={{ height: size, width: 'auto', objectFit: 'contain' }}
    className={className}
    {...Object.keys(rest).reduce((acc: any, key) => {
      if (key.startsWith('data-') || key.startsWith('aria-')) acc[key] = rest[key];
      return acc;
    }, {})}
  />
);
import ArticleDetail from './resources/ArticleDetail';

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

const resources: Resource[] = [
  {
    type: 'Guide',
    title: 'CarbonSynq Net Zero Planning Guide',
    desc: 'A practical step-by-step guide to help teams measure emissions, set targets, and move from planning to action with CarbonSynq.',
    icon: BookOpen,
    tag: 'Net Zero',
    read: '8 min read',
    accent: 'accent-emerald',
    image: '/resources-assets/img5.webp',
  },
  {
    type: 'Whitepaper',
    title: 'Carbon Accounting for Supply Chains',
    desc: 'Understand how real-time carbon data improves Scope 1, Scope 2, and Scope 3 visibility across operations.',
    icon: FileText,
    tag: 'Carbon Data',
    read: 'Download PDF',
    accent: 'accent-lime',
    image: '/resources-assets/img4.webp',
  },


  {
    type: 'Article',
    title: 'Why Real-Time Tracking Matters',
    desc: 'Explore how live dashboards help teams avoid spreadsheet errors and make faster sustainability decisions.',
    icon: Globe2,
    tag: 'Analytics',
    read: '5 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img9.webp',
  },
  {
    type: 'Guide',
    title: 'Advanced Scope 3 Emissions Modeling',
    desc: 'Deep dive into supply chain emissions modeling and data collection strategies with CarbonSynq.',
    icon: BookOpen,
    tag: 'Net Zero',
    read: '12 min read',
    accent: 'accent-emerald',
    image: '/resources-assets/img10.webp',
  },
  {
    type: 'Whitepaper',
    title: 'The Future of ESG Reporting with CarbonSynq',
    desc: 'An analysis of upcoming regulatory changes and how companies can prepare their data infrastructure.',
    icon: FileText,
    tag: 'Carbon Data',
    read: 'Download PDF',
    accent: 'accent-lime',
    image: '/resources-assets/img11.webp',
  },


  {
    type: 'Article',
    title: 'Greenwashing vs True Sustainability',
    desc: 'How to communicate your sustainability efforts transparently and avoid greenwashing traps.',
    icon: Globe2,
    tag: 'Analytics',
    read: '7 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img15.webp',
  },
  {
    type: 'Guide',
    title: 'CarbonSynq Decarbonization Guide',
    desc: 'Learn how to implement decarbonization strategies across your supply chain effectively.',
    icon: BookOpen,
    tag: 'Net Zero',
    read: '15 min read',
    accent: 'accent-emerald',
    image: '/resources-assets/img16.webp',
  },
  {
    type: 'Whitepaper',
    title: 'Data-Driven Sustainability Insights',
    desc: 'How to use data to drive sustainability initiatives and report accurately to stakeholders.',
    icon: FileText,
    tag: 'Carbon Data',
    read: 'Download PDF',
    accent: 'accent-lime',
    image: '/resources-assets/img17.webp',
  },
  {
    type: 'Article',
    title: 'The Role of AI in ESG Compliance',
    desc: 'Discover how AI is transforming ESG reporting and compliance for modern enterprises.',
    icon: Globe2,
    tag: 'Analytics',
    read: '6 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img5.webp',
  },
  {
    type: 'Guide',
    title: 'Top 7 Scope 3 Software Platforms in 2026',
    desc: 'A review of the best software for tracking Scope 3 emissions in 2026.',
    icon: BookOpen,
    tag: 'Net Zero',
    read: '10 min read',
    accent: 'accent-emerald',
    image: '/resources-assets/img4.webp',
  },
  {
    type: 'Whitepaper',
    title: 'What is Australian Sustainability Reporting',
    desc: 'A guide to the new sustainability reporting standards in Australia.',
    icon: FileText,
    tag: 'Carbon Data',
    read: 'Download PDF',
    accent: 'accent-lime',
    image: '/resources-assets/img6.webp',
  },


  {
    type: 'Article',
    title: 'What is Decarbonization: Action Plan',
    desc: 'A comprehensive overview of decarbonization strategies for businesses.',
    icon: Globe2,
    tag: 'Analytics',
    read: '5 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img10.webp',
  },
  {
    type: 'Guide',
    title: 'Executive Guide to Decarbonization',
    desc: 'A high-level view for C-suite leaders on why sustainability matters right now.',
    icon: BookOpen,
    tag: 'Net Zero',
    read: '10 min read',
    accent: 'accent-emerald',
    image: '/resources-assets/img1.webp',
    hideFromAll: true,
  },
  {
    type: 'Guide',
    title: 'The Blueprint for Scope 3 Data Collection',
    desc: 'How to engage suppliers and gather accurate scope 3 emissions data effectively.',
    icon: BookOpen,
    tag: 'Carbon Data',
    read: '15 min read',
    accent: 'accent-lime',
    image: '/resources-assets/img2.webp',
    hideFromAll: true,
  },
  {
    type: 'Guide',
    title: 'Regulatory Compliance Playbook 2026',
    desc: 'A comprehensive playbook for managing carbon compliance across global frameworks.',
    icon: ShieldCheck,
    tag: 'Net Zero',
    read: '12 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img3.webp',
    hideFromAll: true,
  },
  {
    type: 'Whitepaper',
    title: 'The Future of Carbon Pricing',
    desc: 'An in-depth analysis of global carbon pricing mechanisms and how they affect businesses.',
    icon: FileText,
    tag: 'Carbon Data',
    read: 'Download PDF',
    accent: 'accent-lime',
    image: '/resources-assets/img5.webp',
  },
  {
    type: 'Whitepaper',
    title: 'Decarbonizing Heavy Industry',
    desc: 'Strategies for reducing emissions in steel, cement, and chemical manufacturing sectors.',
    icon: FileText,
    tag: 'Net Zero',
    read: 'Download PDF',
    accent: 'accent-lime',
    image: '/resources-assets/img7.webp',
  },
  {
    type: 'Whitepaper',
    title: 'Innovations in Carbon Capture',
    desc: 'Exploring the latest technologies in carbon capture, utilization, and storage (CCUS).',
    icon: FileText,
    tag: 'Analytics',
    read: 'Download PDF',
    accent: 'accent-lime',
    image: '/resources-assets/img8.webp',
  },
  {
    type: 'Whitepaper',
    title: 'Understanding Carbon Credits and Offsets',
    desc: 'A complete guide to navigating the voluntary carbon market and ensuring offset quality.',
    icon: FileText,
    tag: 'Net Zero',
    read: 'Download PDF',
    accent: 'accent-lime',
    image: '/resources-assets/img11.webp',
  },
  {
    type: 'Whitepaper',
    title: 'The Role of AI in Net Zero Planning',
    desc: 'How machine learning algorithms are optimizing emission reduction pathways.',
    icon: FileText,
    tag: 'Analytics',
    read: 'Download PDF',
    accent: 'accent-lime',
    image: '/resources-assets/img13.webp',
  },
  {
    type: 'Article',
    title: 'Why Real-Time Tracking Matters',
    desc: 'Why real-time carbon data is essential for modern sustainability reporting and action.',
    icon: Globe2,
    tag: 'Carbon Data',
    read: '8 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img10.webp',
  },
  {
    type: 'Article',
    title: 'Greenwashing vs True Sustainability',
    desc: 'How to distinguish genuine corporate sustainability from superficial greenwashing.',
    icon: Globe2,
    tag: 'Net Zero',
    read: '10 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img3.webp',
  },
  {
    type: 'Article',
    title: 'The Role of AI in ESG Compliance',
    desc: 'How artificial intelligence is automating data collection, analysis, and reporting for ESG.',
    icon: FileText,
    tag: 'Analytics',
    read: '12 min read',
    accent: 'accent-lime',
    image: '/resources-assets/img12.webp',
  },
  {
    type: 'Article',
    title: 'The Impact of Scope 3 Emissions on Global Supply Chains',
    desc: 'Why indirect emissions matter and how to start tracking them across your value chain.',
    icon: Globe2,
    tag: 'Net Zero',
    read: '8 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img3.webp',
  },
  {
    type: 'Article',
    title: 'Why Carbon Taxes Are Reshaping the Global Economy',
    desc: 'An overview of new carbon tax policies and their financial implications for enterprises.',
    icon: Globe2,
    tag: 'Carbon Data',
    read: '6 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img5.webp',
  },
  {
    type: 'Article',
    title: '5 Common Pitfalls in ESG Reporting',
    desc: 'Avoid these frequent mistakes to ensure your sustainability reports are accurate and compliant.',
    icon: Globe2,
    tag: 'Analytics',
    read: '5 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img7.webp',
  },
  {
    type: 'Newsroom',
    title: '100X.VC Fuels 22 Start-ups with $3.4M Funding...',
    desc: 'CarbonSynq part of the new cohort receiving strategic investment.',
    icon: Globe2,
    tag: 'Company News',
    read: 'Jun 24, 2026',
    accent: 'accent-emerald',
    logoText: 'Inc42',
    logoColor: '#e11d48',
  },
  {
    type: 'Newsroom',
    title: '100X.VC Funds 22 Start-ups with Innovative iSAF...',
    desc: 'Innovative SAFE notes used for latest funding round including CarbonSynq.',
    icon: Globe2,
    tag: 'Company News',
    read: 'Jun 26, 2026',
    accent: 'accent-emerald',
    logoText: 'Outlook Start-Up',
    logoColor: '#ea580c',
  },
  {
    type: 'Newsroom',
    title: 'Chrysalis Services and Breathe ESG Join Forces...',
    desc: 'CarbonSynq acquires new sustainability services firm to expand reach.',
    icon: Globe2,
    tag: 'Partnerships',
    read: 'Jun 20, 2026',
    accent: 'accent-emerald',
    logoText: 'ThePrint',
    logoColor: '#c2410c',
  },
  {
    type: 'Newsroom',
    title: 'Gruhas Aspire Onboards Six Startups For Its...',
    desc: 'Proptech accelerator selects CarbonSynq for its new cohort.',
    icon: Globe2,
    tag: 'Company News',
    read: 'Oct 4, 2026',
    accent: 'accent-emerald',
    logoText: 'BW BUSINESSWORLD',
    logoColor: '#0284c7',
  },
  {
    type: 'Newsroom',
    title: '100X.VC Invests $3.4 Million in 22 Startups...',
    desc: 'Entrepreneur India covers the latest massive investment in climate tech.',
    icon: Globe2,
    tag: 'Company News',
    read: 'Jun 24, 2026',
    accent: 'accent-emerald',
    logoText: 'Entrepreneur INDIA',
    logoColor: '#1e293b',
  },
  {
    type: 'Newsroom',
    title: 'Here Are The Six Startups That Made It To Gruhas...',
    desc: 'Inc42 highlights CarbonSynq as a top pick for real estate decarbonization.',
    icon: Globe2,
    tag: 'Awards',
    read: 'Oct 5, 2026',
    accent: 'accent-emerald',
    logoText: 'Inc42',
    logoColor: '#e11d48',
  },
  {
    type: 'Article',
    title: 'How to Build a Sustainable Procurement Strategy',
    desc: 'Learn how to integrate ESG criteria into your purchasing decisions and supplier evaluations.',
    icon: Globe2,
    tag: 'Net Zero',
    read: '7 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img2.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'Understanding the CBAM Regulation',
    desc: 'A breakdown of the Carbon Border Adjustment Mechanism and its impact on international trade.',
    icon: Globe2,
    tag: 'Analytics',
    read: '9 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img12.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'Best Practices for Energy Audits',
    desc: 'How to conduct an effective energy audit to identify immediate cost and carbon savings.',
    icon: Globe2,
    tag: 'Carbon Data',
    read: '6 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img15.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'The Evolution of Green Finance',
    desc: 'How green bonds and sustainability-linked loans are changing the funding landscape.',
    icon: Globe2,
    tag: 'Analytics',
    read: '8 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img17.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'Demystifying the SBTi Validation Process',
    desc: 'A clear guide to setting Science Based Targets and getting them validated successfully.',
    icon: Globe2,
    tag: 'Net Zero',
    read: '10 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img4.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'The Rise of Circular Economy Business Models',
    desc: 'How moving away from the take-make-dispose model is driving sustainable innovation.',
    icon: Globe2,
    tag: 'Net Zero',
    read: '7 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img1.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'Understanding the EU Corporate Sustainability Reporting Directive (CSRD)',
    desc: 'Key takeaways from the new EU reporting standards and what they mean for your business.',
    icon: Globe2,
    tag: 'Carbon Data',
    read: '11 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img2.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'How to Implement Internal Carbon Pricing',
    desc: 'A practical guide to setting and managing an internal price on carbon emissions.',
    icon: Globe2,
    tag: 'Analytics',
    read: '6 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img3.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'The Growing Importance of Biodiversity Metrics',
    desc: 'Why companies are moving beyond just carbon to track their impact on nature and biodiversity.',
    icon: Globe2,
    tag: 'Net Zero',
    read: '8 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img4.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'Navigating the SEC Climate Disclosure Rules',
    desc: 'What US companies need to know to stay compliant with the latest SEC mandates.',
    icon: Globe2,
    tag: 'Carbon Data',
    read: '9 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img5.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'Green IT: Reducing the Carbon Footprint of Your Software',
    desc: 'Tips and strategies for optimizing server usage, code efficiency, and cloud architecture.',
    icon: Globe2,
    tag: 'Analytics',
    read: '5 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img6.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'Decarbonizing Logistics and Last-Mile Delivery',
    desc: 'How e-commerce and retail companies are rethinking their supply chains for a low-carbon future.',
    icon: Globe2,
    tag: 'Net Zero',
    read: '10 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img7.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'The Future of Renewable Energy Certificates (RECs)',
    desc: 'Are RECs still a viable way to claim zero emissions? A critical look at the market.',
    icon: Globe2,
    tag: 'Carbon Data',
    read: '7 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img8.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'Overcoming Data Silos in ESG Reporting',
    desc: 'How to centralize your sustainability data to improve accuracy and auditability.',
    icon: Globe2,
    tag: 'Analytics',
    read: '6 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img9.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'Understanding the Role of the VCMI in Carbon Markets',
    desc: 'How the Voluntary Carbon Markets Integrity Initiative is standardizing claims.',
    icon: Globe2,
    tag: 'Carbon Data',
    read: '8 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img12.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'Building Climate Resilience in Commercial Real Estate',
    desc: 'Strategies for retrofitting properties and managing physical climate risks.',
    icon: Globe2,
    tag: 'Net Zero',
    read: '10 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img13.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'The Financial Risks of Ignoring Scope 3 Emissions',
    desc: 'Why investors are increasingly demanding full value chain transparency.',
    icon: Globe2,
    tag: 'Analytics',
    read: '6 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img14.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'How to Engage Your Board of Directors on ESG Goals',
    desc: 'Communication strategies to secure executive buy-in for decarbonization.',
    icon: Globe2,
    tag: 'Company News',
    read: '7 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img15.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'Decoding the Latest IPCC Climate Change Report',
    desc: 'Key scientific takeaways and their direct implications for global industries.',
    icon: Globe2,
    tag: 'Analytics',
    read: '15 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img16.webp',
    hideFromAll: true,
  },
  {
    type: 'Article',
    title: 'Sustainable Packaging: Beyond the Basics',
    desc: 'Exploring next-generation materials and lifecycle assessment tools.',
    icon: Globe2,
    tag: 'Net Zero',
    read: '8 min read',
    accent: 'accent-teal',
    image: '/resources-assets/img17.webp',
    hideFromAll: true,
  },
];

const categories = ['All', 'Guide', 'Whitepaper', 'Article', 'Newsroom'];

const stats = [
  { label: 'Resource Templates', value: '35+', icon: FileText },
  { label: 'Net Zero Playbooks', value: '12+', icon: Globe2 },
  { label: 'Action Frameworks', value: '20+', icon: TrendingUp },
];

const InlineCTAs = ({ onDownload, type }: { onDownload?: () => void, type: string }) => {
  const [formType, setFormType] = useState<'assessment' | 'expert' | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append('Source', formType === 'assessment' ? 'Book Carbon Assessment' : 'Talk to Expert');

    try {
      const response = await fetch('https://formspree.io/f/xojyggok', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="detail-cta-success" style={{ marginTop: '40px' }}>
        <CheckCircle2 size={40} />
        <h4>Message Sent Successfully!</h4>
        <p>Thank you for reaching out. Our team will get back to you shortly.</p>
        <button className="cta-ghost" onClick={() => { setFormStatus('idle'); setFormType(null); }}>
          Send another message
        </button>
      </div>
    );
  }

  if (formType) {
    return (
      <form onSubmit={handleSubmit} className="detail-cta-form" style={{ marginTop: '40px', padding: '24px', backgroundColor: '#f8f9fa', borderRadius: '16px', border: '1px solid #e9ecef' }}>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>
          {formType === 'assessment' ? 'Book Carbon Assessment' : 'Talk to CarbonSynq Expert'}
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input 
            type="email" 
            name="Client Email" 
            placeholder="Your work email address" 
            required 
            style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #dee2e6', width: '100%', outline: 'none', color: '#1a1a1a' }}
          />
          <textarea 
            name="Message" 
            placeholder="How can we help?" 
            rows={3}
            required
            style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #dee2e6', width: '100%', outline: 'none', resize: 'vertical', color: '#1a1a1a' }}
          />
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button 
              type="submit" 
              disabled={formStatus === 'submitting'}
              style={{ padding: '12px 24px', backgroundColor: '#00d053', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', opacity: formStatus === 'submitting' ? 0.7 : 1 }}
            >
              {formStatus === 'submitting' ? 'Submitting...' : 'Submit Request'}
            </button>
            <button 
              type="button"
              onClick={() => setFormType(null)}
              style={{ padding: '12px 24px', backgroundColor: 'transparent', color: '#6c757d', border: '1px solid #dee2e6', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
          {formStatus === 'error' && <p style={{ color: 'red', fontSize: '14px' }}>Failed to send. Please try again.</p>}
        </div>
      </form>
    );
  }

  return (
    <div className="detail-cta-row" style={{ marginTop: '40px' }}>
      <button className="cta-primary" onClick={onDownload}>
        <Download size={18} /> Download {type || 'Resource'}
      </button>
      <button className="cta-secondary" onClick={() => setFormType('assessment')}>
        <BarChart3 size={18} /> Book Carbon Assessment
      </button>
      <button className="cta-accent" onClick={() => setFormType('expert')}>
        <Users size={18} /> Talk to CarbonSynq Expert
      </button>
    </div>
  );
};

export default function CarbonSynqResourcesPage() {
  const slugify = (text: string) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

  const [activeResource, setActiveResource] = useState<typeof resources[0] | null>(null);
  const [active, setActive] = useState('All');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path.startsWith('/platform/resources/') && path.split('/').length > 3) {
        const parts = path.split('/');
        const type = parts[3];
        const slug = parts[4];
        const found = resources.find(r => {
          const rType = r.type.toLowerCase() === 'newsroom' ? 'press' : r.type.toLowerCase() + 's';
          return rType === type && slugify(r.title) === slug;
        });
        if (found) {
          setActiveResource(found);
          setActive(found.type);
        } else {
          setActiveResource(null);
        }
      } else {
        setActiveResource(null);
        const cleanPath = path.replace('/platform/resources', '').replace(/\//g, '').toLowerCase();
        if (cleanPath === 'articles') setActive('Article');
        else if (cleanPath === 'whitepapers') setActive('Whitepaper');
        else if (cleanPath === 'guides') setActive('Guide');
        else if (cleanPath === 'press' || cleanPath === 'newsroom') setActive('Newsroom');
        else setActive('All');
      }
    } else {
      setActiveResource(null);
    }
  }, []);
  const [activeTag, setActiveTag] = useState('All');
  const [query, setQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [articleDetailResource, setArticleDetailResource] = useState<typeof resources[0] | null>(null);
  const [showArticleDetail, setShowArticleDetail] = useState(false);
  const [mainActiveSection, setMainActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const mainSections = ['featured', 'library'];
      let current = '';
      mainSections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = id;
        }
      });

      if (activeResource) {
        const detailSections = getSidebarItems(activeResource.title).map(i => i.id);
        detailSections.forEach(id => {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 150) current = id;
          }
        });
      }

      setMainActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeResource]);

  const handleDownloadResource = (resource: typeof resources[0]) => {
    // Simulate working download
    const element = document.createElement("a");
    const file = new Blob([`Resource: ${resource.title}\n\nContent would go here.`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${resource.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const handleShareResource = (resource: typeof resources[0], platform: string) => {
    const url = window.location.href;
    const text = `Check out this resource: ${resource.title}`;
    let shareUrl = '';

    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(resource.title)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
    setShowShareDropdown(false);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);

      // Trigger a real download of a dummy file
      const element = document.createElement("a");
      const file = new Blob([
        "Net Zero Action Playbook 2026\n\n" +
        "1. Measure your carbon footprint\n" +
        "2. Find operational emission hotspots\n" +
        "3. Build reduction initiatives\n" +
        "4. Track progress through dashboards\n\n" +
        "Thank you for downloading the CarbonSynq Playbook!"
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "Net-Zero-Action-Playbook-2026.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      alert('Your download has started!');
    }, 2000);
  };

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.startsWith('/platform/resources/') && path.split('/').length > 3) {
        const parts = path.split('/');
        const type = parts[3];
        const slug = parts[4];
        const res = resources.find(r => {
          const rType = r.type.toLowerCase() === 'newsroom' ? 'press' : r.type.toLowerCase() + 's';
          return rType === type && slugify(r.title) === slug;
        });
        if (res) {
          setActiveResource(res);
          setActive(res.type);
          return;
        }
      }
      setActiveResource(null);
      const cleanPath = path.replace('/platform/resources', '').replace(/\//g, '').toLowerCase();
      if (cleanPath === 'articles') setActive('Article');
      else if (cleanPath === 'whitepapers') setActive('Whitepaper');
      else if (cleanPath === 'guides') setActive('Guide');
      else if (cleanPath === 'press' || cleanPath === 'newsroom') setActive('Newsroom');
      else setActive('All');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleCategoryChange = (newCategory: string) => {
    setActive(newCategory);
    setActiveResource(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let path = '/platform/resources';
    if (newCategory !== 'All') {
      if (newCategory === 'Newsroom') path = '/platform/resources/press';
      else path = `/platform/resources/${newCategory.toLowerCase()}s`;
    }
    window.history.pushState({}, '', path);
  };

  const getSidebarItems = (title: string) => {
    if (title === 'The Role of AI in ESG Compliance') {
      return [
        { id: 'introduction', label: 'Introduction' },
        { id: 'india-brsr', label: 'India: BRSR & Core' },
        { id: 'europe-csrd', label: 'Europe: CSRD & ESRS' },
        { id: 'us-sec', label: 'United States: SEC Rules' },
        { id: 'ai-role', label: 'The Role of AI' },
        { id: 'conclusion', label: 'Conclusion' }
      ];
    }
    if (title.startsWith('100X.VC')) {
      return [
        { id: 'introduction', label: 'Introduction' },
        { id: 'isafe-innovation', label: 'iSAFE Innovation' },
        { id: 'sector-breakdown', label: 'Sector Breakdown' },
        { id: 'cohort-growth', label: 'Cohort Growth' },
        { id: 'future-outlook', label: 'Future Outlook' },
        { id: 'conclusion', label: 'Conclusion' }
      ];
    }
    if (title === 'Top 7 Scope 3 Software Platforms in 2026') {
      return [
        { id: 'introduction', label: 'The Scope 3 Challenge' },
        { id: 'core-principles', label: 'Supplier Engagement' },
        { id: 'implementation', label: 'Platform Comparison' },
        { id: 'ai-platforms', label: 'Role of AI' },
        { id: 'measuring-success', label: 'Onboarding Rate' },
        { id: 'evaluation-criteria', label: 'Evaluation Criteria' },
        { id: 'future-trends', label: 'Future Trends' }
      ];
    }
    if (title === 'Executive Guide to Decarbonization') {
      return [
        { id: 'introduction', label: 'The C-Suite Mandate' },
        { id: 'roi-flow', label: 'Value Creation' },
        { id: 'cost-comparison', label: 'Cost vs Action' },
        { id: 'leadership', label: 'Leadership' },
        { id: 'double-materiality', label: 'Double Materiality' },
        { id: 'tech-enabler', label: 'Tech as Enabler' }
      ];
    }
    if (title === 'The Blueprint for Scope 3 Data Collection') {
      return [
        { id: 'introduction', label: 'Scale of Challenge' },
        { id: 'data-funnel', label: 'Data Funnel' },
        { id: 'collection-methods', label: 'Collection Methods' },
        { id: 'supplier-engagement', label: 'Supplier Engagement' },
        { id: 'data-quality-tiers', label: 'Data Quality Tiers' },
        { id: 'conclusion', label: 'Conclusion' }
      ];
    }
    if (title === 'Regulatory Compliance Playbook 2026') {
      return [
        { id: 'introduction', label: 'The Regulatory Maze' },
        { id: 'compliance-lifecycle', label: 'Compliance Lifecycle' },
        { id: 'regulation-comparison', label: 'Regulations Comparison' },
        { id: 'penalties', label: 'Cost of Non-Compliance' },
        { id: 'best-practices', label: 'Best Practices' }
      ];
    }
    if (title === 'The Future of ESG Reporting with CarbonSynq') {
      return [
        { id: 'introduction', label: 'Regulatory Shift' },
        { id: 'frameworks', label: 'Frameworks' },
        { id: 'future-proofing', label: 'Future-Proofing' }
      ];
    }
    if (title === 'Advanced Scope 3 Emissions Modeling') {
      return [
        { id: 'introduction', label: 'Complexity' },
        { id: 'methodologies', label: 'Methodologies' },
        { id: 'emissions-breakdown', label: 'Category Breakdown' },
        { id: 'advanced-techniques', label: 'AI & ML Integration' },
        { id: 'regulatory-landscape', label: 'Regulatory Landscape' },
        { id: 'conclusion', label: 'Conclusion' }
      ];
    }
    if (title === 'CarbonSynq Decarbonization Guide') {
      return [
        { id: 'introduction', label: 'Introduction' },
        { id: 'core-principles', label: 'Reduction Pillars' },
        { id: 'implementation', label: 'Action Plan' },
        { id: 'challenges', label: 'Challenges' },
        { id: 'measuring-success', label: 'Progress' },
        { id: 'scope-strategies', label: 'Scope Strategies' },
        { id: 'long-term-vision', label: 'Net Zero Vision' }
      ];
    }
    if (title === 'Data-Driven Sustainability Insights') {
      return [
        { id: 'introduction', label: 'Data Culture' },
        { id: 'core-principles', label: 'Data Lifecycle' },
        { id: 'implementation', label: 'Metrics Matrix' }
      ];
    }
    return [
      { id: 'introduction', label: 'Introduction' },
      { id: 'core-principles', label: 'Core Principles' },
      { id: 'implementation', label: 'Implementation' },
      { id: 'measuring-success', label: 'Measuring Success' },
      { id: 'future-outlook', label: 'Future Outlook' },
      { id: 'conclusion', label: 'Conclusion' }
    ];
  };

  const handleResourceClick = (item: typeof resources[0]) => {
    if (item.type === 'Newsroom') {
      const channelUrls: Record<string, string> = {
        'Inc42': 'https://inc42.com/',
        'Outlook Start-Up': 'https://startup.outlookindia.com/',
        'ThePrint': 'https://theprint.in/',
        'BW BUSINESSWORLD': 'https://businessworld.in/',
        'Entrepreneur INDIA': 'https://www.entrepreneur.com/in'
      };

      // Use fallback to Google search if channel not mapped
      const url = (item.logoText && channelUrls[item.logoText]) || `https://www.google.com/search?q=${encodeURIComponent(item.title)}`;
      window.open(url, '_blank');
      return;
    }

    setArticleDetailResource(item);
    setShowArticleDetail(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let typePath = item.type.toLowerCase() === 'newsroom' ? 'press' : item.type.toLowerCase() + 's';
    const slug = slugify(item.title);
    window.history.pushState({}, '', `/platform/resources/${typePath}/${slug}`);
  };

  const renderResourceContent = (item: typeof resources[0]) => {
    const getVariation = (title: string, section: string) => {
      const hash = title.length % 3;
      const variations: Record<string, string[]> = {
        introduction: [
          `The landscape of corporate sustainability is undergoing a massive transformation. As organizations worldwide commit to net-zero goals, understanding the specific impacts and methodologies related to ${title} becomes paramount.`,
          `Recent regulatory shifts have placed a spotlight on ${title}. Organizations must now adapt quickly to ensure compliance and maintain their competitive edge in a rapidly changing market.`,
          `Effective carbon management begins with understanding the specific challenges of ${title}. This resource breaks down the key concepts and provides a framework for action.`
        ],
        corePrinciples: [
          `To successfully navigate the complexities of ${title}, we must adhere to three foundational principles: transparency, data quality, and stakeholder engagement.`,
          `The core of any successful ${title} initiative lies in robust data collection and cross-functional collaboration across the organization.`,
          `We have identified three critical success factors for ${title}: automating reporting, engaging suppliers, and setting clear reduction targets.`
        ],
        implementation: [
          `Implementation of ${title} requires a phased approach. The table below outlines the recommended timeline and key deliverables for your team.`,
          `Deploying these strategies for ${title} involves a 3-step process: baseline assessment, system integration, and continuous monitoring.`,
          `We recommend starting with a pilot project for ${title} to test the methodology before rolling it out across all facilities.`
        ],
        measuringSuccess: [
          `Success in ${title} initiatives must be measurable. Organizations should establish key performance indicators (KPIs) that track progress.`,
          `Tracking progress in ${title} requires a dedicated dashboard and regular reporting to stakeholders.`,
          `The most successful companies in ${title} are those that set ambitious targets and measure results in real-time.`
        ],
        futureOutlook: [
          `Looking ahead, the landscape of ${title} will continue to evolve rapidly with new technologies and regulations.`,
          `The future of ${title} will likely involve AI-driven automated reporting and satellite data verification.`,
          `We expect to see stricter enforcement and higher transparency requirements in the field of ${title} over the next 5 years.`
        ],
        conclusion: [
          `In conclusion, ${title} requires a dedicated approach. By following these guidelines, teams can make meaningful progress.`,
          `Ultimately, ${title} is not just a compliance checkbox but a strategic opportunity to drive efficiency and value.`,
          `We hope this resource provides a useful starting point for your journey in mastering ${title}.`
        ]
      };

      return variations[section][hash];
    };

    // Specific content for "CarbonSynq Net Zero Planning Guide"
    if (item.title === 'CarbonSynq Net Zero Planning Guide') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            A comprehensive, multi-phase roadmap for organizations to transition from high-level climate ambition to concrete, measurable action in their net-zero journey.
          </p>

          <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Introduction</h3>
          <p>The journey to net-zero is perhaps the most significant strategic challenge modern enterprises will face in this decade. It begins not with grand statements, but with a clear, uncompromising understanding of your organization's current carbon footprint. This guide provides a step-by-step framework to help you measure emissions across all scopes (Scope 1, 2, and 3), set science-based targets aligned with global standards like the SBTI, and implement effective reduction strategies. By following this structured approach, businesses can navigate the complexities of climate action with confidence, avoiding greenwashing risks and ensuring long-term resilience.</p>
          <p>Furthermore, climate compliance is no longer voluntary. With frameworks like Europe's CSRD and India's BRSR becoming mandatory, having a solid planning guide is essential for regulatory survival. This document outlines the exact steps required to build a compliant and effective carbon reduction strategy.</p>

          <h3 id="core-principles" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Setting the Baseline</h3>
          <p>The first critical step in any net-zero plan is establishing a robust emissions baseline. This involves collecting granular data from all operational activities, including direct energy consumption from owned facilities (Scope 1), indirect emissions from purchased electricity (Scope 2), and the vast network of value chain emissions (Scope 3). Accurate data collection is the foundation of any credible climate strategy. Without a precise baseline, it is impossible to set realistic targets, identify emission hotspots, or measure progress effectively over time.</p>
          <p>To achieve this, organizations must look beyond utility bills. They need to integrate IoT sensors for real-time energy tracking, pull data from ERP systems for supply chain logistics, and use specialized software to calculate emissions factors. This detailed approach ensures that the baseline reflects the true operational reality, providing a solid foundation for all future reduction initiatives.</p>

          <h3 id="implementation" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Developing Reduction Initiatives</h3>
          <p>Once the baseline is established and hotspots are identified, organizations must develop and prioritize specific reduction opportunities. This is where the strategy becomes actionable. Key initiatives often include transitioning to renewable energy sources through Power Purchase Agreements (PPAs), investing in energy efficiency upgrades across facilities, and redesigning products to minimize material waste. Each initiative should be evaluated based on its potential carbon impact, financial return on investment (ROI), and alignment with broader business goals.</p>

          {/* Table */}
          <div style={{ margin: '24px 0', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>Initiative</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>Scope Impact</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>Typical ROI</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', color: '#334155', fontWeight: 600 }}>LED Retrofitting</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Scope 2</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>12-18 Months</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Low</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', color: '#334155', fontWeight: 600 }}>On-site Solar</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Scope 2</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>5-7 Years</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Medium</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', color: '#334155', fontWeight: 600 }}>EV Fleet Transition</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Scope 1</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>3-5 Years</td>
                  <td style={{ padding: '12px 16px', color: '#ef4444', fontWeight: 600 }}>High</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', color: '#334155', fontWeight: 600 }}>Supplier Engagement</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Scope 3</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Varies</td>
                  <td style={{ padding: '12px 16px', color: '#ef4444', fontWeight: 600 }}>High</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>Special attention must be paid to Scope 3 emissions, which often account for over 80% of a company's total footprint. Engaging with suppliers is critical here. Organizations should work with their supply chain partners to set shared reduction goals, provide training on sustainable practices, and co-invest in low-carbon technologies. This collaborative approach multiplies the impact of reduction efforts.</p>

          <h3 id="measuring-success" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Tracking and Reporting</h3>
          <p>Continuous monitoring is essential to ensure that reduction initiatives are delivering the expected results and that the organization remains on track. Organizations should implement digital platforms to track emissions in real-time, moving away from annual spreadsheet calculations. This allows for proactive course correction if initiatives fall short of targets. Transparent reporting builds trust with investors, customers, and employees, demonstrating a genuine commitment to sustainability rather than mere marketing rhetoric.</p>

          {/* Chart */}
          <div style={{ margin: '32px 0', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', textAlign: 'center' }}>Projected Emission Reduction Trajectory</h4>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '30px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '140px', background: '#cbd5e1', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Year 1</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '100px', background: '#94a3b8', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Year 2</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '60px', background: '#059669', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Year 3</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '30px', background: '#0d9488', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Year 4</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '16px', margin: '16px 0 0' }}>Fig: Target trajectory to reach 20% of baseline emissions by Year 4.</p>
          </div>

          <p>Regular reporting should follow recognized frameworks such as the GRI or SASB. By standardizing disclosures, companies make it easier for rating agencies and investors to assess their ESG performance. This can lead to lower capital costs and a stronger brand reputation in a market that increasingly values transparency.</p>

          <h3 id="future-outlook" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Continuous Improvement</h3>
          <p>Net-zero planning is not a one-time project but an ongoing process of improvement and adaptation. As new technologies emerge, such as advanced carbon capture or green hydrogen, and as global regulations become stricter, organizations must adapt their strategies. Regularly reviewing performance against targets and updating the action plan ensures that the business remains resilient and continues to lead in sustainability.</p>

          <h3 id="conclusion" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Conclusion</h3>
          <p>Achieving net-zero is a challenging but necessary endeavor for modern businesses. By leveraging the framework outlined in this guide, organizations can transform their sustainability ambitions into measurable impact. The path to a low-carbon future requires dedication, innovation, and a willingness to embrace change at every level of the enterprise, ultimately driving both environmental and economic value.</p>
        </div>
      );
    }

    // Specific content for "The Role of AI in ESG Compliance"
    if (item.title === 'The Role of AI in ESG Compliance') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            Discover how Artificial Intelligence is transforming ESG reporting and compliance for modern enterprises.
          </p>

          <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Introduction</h3>
          <p>Artificial Intelligence (AI) and Machine Learning (ML) are revolutionizing how companies collect, analyze, and report ESG data. By automating data ingestion from disparate sources, AI minimizes human error and provides real-time insights into sustainability performance.</p>

          <h3 id="india-brsr" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>India: BRSR & Core</h3>
          <p>India's ESG compliance framework centers on the Business Responsibility and Sustainability Report (BRSR). AI helps companies automate the collection of the 9 principles required by SEBI.</p>

          <h3 id="europe-csrd" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Europe: CSRD & ESRS</h3>
          <p>The Corporate Sustainability Reporting Directive (CSRD) requires detailed disclosures. AI can map existing data to ESRS standards automatically.</p>

          <h3 id="us-sec" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>United States: SEC Rules</h3>
          <p>The SEC's climate disclosure rules demand climate-related risk analysis. AI models can predict climate risks based on historical data.</p>

          <h3 id="ai-role" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Role of AI</h3>
          <p>The diagram below illustrates the typical flow of ESG data through an AI-powered compliance system.</p>

          <div className="diagram-container" style={{ margin: '32px 0', display: 'flex', gap: 15, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '140px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>Data Ingestion</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>IoT & ERP Integration</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '140px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>ML Processing</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Anomaly Detection</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#059669', padding: '16px 20px', borderRadius: '8px', color: '#fff', textAlign: 'center', minWidth: '140px' }}>
              <div style={{ fontWeight: 700 }}>Smart Report</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Automated Filing</div>
            </div>
          </div>

          <h3 id="implementation" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Efficiency Gains</h3>
          <p>The table below compares traditional manual ESG reporting with AI-driven reporting systems.</p>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Metric</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Manual Process</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>AI-Driven Process</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Data Collection Time</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>4-6 Weeks</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Real-time / Instant</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Error Rate</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>12% (Average)</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>&lt; 1%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="measuring-success" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Cost Reduction Trajectory</h3>
          <p>Implementing AI for ESG reporting leads to significant cost savings over time, as shown in the chart below.</p>

          <div style={{ margin: '32px 0', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '30px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '140px', background: '#cbd5e1', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Manual</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '40px', background: '#10b981', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>AI-First</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '16px', margin: '16px 0 0' }}>Fig 1: Operational cost comparison (Relative scale).</p>
          </div>
        </div>
      );
    }

    // Specific content for "Advanced Scope 3 Emissions Modeling"
    if (item.title === 'Advanced Scope 3 Emissions Modeling') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            A deep dive into advanced techniques for measuring, modeling, and reducing value chain emissions (Scope 3).
          </p>

          <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Introduction to Scope 3 Complexity</h3>
          <p>Scope 3 emissions often account for more than 70% of a company's total carbon footprint. They encompass 15 distinct categories ranging from purchased goods and services to end-of-life treatment of sold products. Modeling these emissions is inherently complex due to data fragmentation, reliance on secondary data, and lack of direct operational control. Advanced modeling moves beyond simple spend-based estimates to high-fidelity, activity-based modeling.</p>
          <p>The challenge lies in the fact that Scope 3 emissions occur outside of your organization's direct control. This means you must rely on data provided by suppliers, customers, and other partners across the value chain. Often, these partners do not have the resources or expertise to calculate their own emissions, leading to massive data gaps. To overcome this, organizations must adopt a phased approach, starting with estimates and gradually moving towards primary, verified data as their supply chain network matures in carbon accounting capabilities.</p>

          <h3 id="methodologies" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Scope 3 Modeling Methodologies</h3>
          <p>The table below compares the primary methodologies used in Scope 3 modeling, highlighting their data requirements and accuracy levels.</p>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Methodology</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Data Required</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Accuracy</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Typical Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Spend-Based</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Financial spend data</td>
                  <td style={{ padding: '12px 16px', color: '#ef4444', fontWeight: 600 }}>Low</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>Initial screening & non-critical categories.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Average-Data</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Mass or physical units</td>
                  <td style={{ padding: '12px 16px', color: '#eab308', fontWeight: 600 }}>Medium</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>When supplier data is unavailable but volumes are known.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Supplier-Specific</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Primary data from suppliers</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>High</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>Critical suppliers & high-impact categories.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>When starting a Scope 3 inventory, most organizations begin with the spend-based method. This approach uses the amount of money spent on goods and services and multiplies it by an industry-average emissions factor (e.g., kg CO2e per dollar spent). While this is excellent for identifying "hotspots" or areas of high impact, it cannot reflect improvements made by specific suppliers. For example, if you spend $1M on steel, the spend-based method assumes standard emissions, even if your supplier uses green hydrogen. Therefore, as organizations mature, they must transition to activity-based and supplier-specific data to track real progress and reduction efforts accurately.</p>

          <h3 id="emissions-breakdown" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Typical Scope 3 Category Breakdown</h3>
          <p>While the breakdown varies by industry, Purchased Goods and Services often dominate. The chart below illustrates a typical distribution across key Scope 3 categories.</p>

          <div style={{ margin: '32px 0', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '180px', gap: '20px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '80px' }}>
                <div style={{ width: '100%', height: '140px', background: '#059669', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '11px', color: '#64748b', textAlign: 'center' }}>Purchased<br />Goods</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '80px' }}>
                <div style={{ width: '100%', height: '60px', background: '#10b981', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '11px', color: '#64748b', textAlign: 'center' }}>Use of Sold<br />Products</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '80px' }}>
                <div style={{ width: '100%', height: '40px', background: '#34d399', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '11px', color: '#64748b', textAlign: 'center' }}>Transpor-<br />tation</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '80px' }}>
                <div style={{ width: '100%', height: '20px', background: '#a7f3d0', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '11px', color: '#64748b', textAlign: 'center' }}>Waste &<br />Others</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '16px', margin: '16px 0 0' }}>Fig: Illustrative breakdown of Scope 3 emissions by category.</p>
          </div>

          <p>It is important to note that the distribution of Scope 3 emissions is highly industry-dependent. For instance, in the financial services sector, Category 15 (Investments) often accounts for the vast majority of emissions, representing the carbon footprint of the companies they fund. In contrast, for an automobile manufacturer, the use phase of the vehicles sold (Category 11) is typically the largest contributor. Understanding your specific industry's breakdown is the first step in focusing reduction efforts where they will have the most significant impact, rather than wasting resources on low-impact categories.</p>

          <h3 id="advanced-techniques" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Advanced AI & ML Integration</h3>
          <p>To bridge data gaps, CarbonSynq leverages Machine Learning (ML) algorithms. These models predict emissions factors for suppliers who do not yet report their data, based on industry averages, location, and spend profiles. This hybrid approach ensures that organizations can maintain a comprehensive inventory even with incomplete primary data.</p>
          <p>Furthermore, machine learning can assist in anomaly detection within supplier-submitted data. Often, suppliers may submit data with errors due to misunderstanding of reporting boundaries or unit conversions. AI algorithms trained on historical data and industry benchmarks can flag these anomalies for review, ensuring the integrity of the overall corporate carbon inventory. This reduces the manual audit burden on sustainability teams and increases trust in the reported numbers among stakeholders and regulators.</p>

          <h3 id="regulatory-landscape" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Evolving Regulatory Landscape</h3>
          <p>Regulatory pressures are mounting globally, making advanced Scope 3 modeling a compliance necessity rather than a voluntary practice. In the European Union, the Corporate Sustainability Reporting Directive (CSRD) mandates detailed Scope 3 reporting for large companies, with assurance requirements. Similarly, the SEC in the United States and reporting frameworks in other jurisdictions are increasingly moving towards mandatory value chain disclosures. Companies that fail to establish robust modeling frameworks risk non-compliance, financial penalties, and reputational damage as greenwashing scrutiny intensifies.</p>

          <h3 id="conclusion" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Conclusion</h3>
          <p>Advanced Scope 3 modeling is critical for setting Science-Based Targets (SBTi) and complying with emerging regulations like CSRD. By combining primary data with advanced modeling techniques, enterprises can unlock actionable insights and drive real reduction across their value chain.</p>
        </div>
      );
    }

    // Specific content for "Here Are The Six Startups That Made It To Gruhas..."
    if (item.title === 'Here Are The Six Startups That Made It To Gruhas...') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            An overview of the six innovative startups selected for the Gruhas Aspire accelerator program.
          </p>

          <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Introduction</h3>
          <p>Gruhas Aspire is a leading accelerator program focused on proptech and clean technologies. In its latest cohort, six startups were selected from hundreds of applicants for their potential to revolutionize the built environment. CarbonSynq is proud to be among them.</p>

          <h3 id="core-principles" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Cohort Startups</h3>
          <p>Here is a list of the six startups and their core focus areas:</p>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Startup</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Focus Area</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Impact Goal</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>CarbonSynq</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Carbon Accounting & ESG</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Zero Carbon Hubs</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>PropAI</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Real Estate Analytics</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Energy Optimization</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>GreenBrick</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Sustainable Materials</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Low Carbon Cement</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>AquaSmart</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Water Management</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Zero Waste Water</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>SolarGrid</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Distributed Energy</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Grid Independence</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>WasteLoop</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Circular Economy</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Zero Waste Sites</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="implementation" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Accelerator Journey</h3>
          <p>The diagram below shows the typical journey of a startup through the Gruhas Aspire program.</p>

          <div className="diagram-container" style={{ margin: '32px 0', display: 'flex', gap: 15, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '140px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>Selection</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Top 6 picked</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '140px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>Mentorship</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Industry experts</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#059669', padding: '16px 20px', borderRadius: '8px', color: '#fff', textAlign: 'center', minWidth: '140px' }}>
              <div style={{ fontWeight: 700 }}>Demo Day</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Investor pitches</div>
            </div>
          </div>

          <h3 id="measuring-success" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Impact Growth</h3>
          <p>The chart below shows the projected combined impact of these startups on real estate emissions reduction.</p>

          <div style={{ margin: '32px 0', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '30px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '50px', background: '#cbd5e1', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Year 1</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '120px', background: '#059669', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Year 2</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '16px', margin: '16px 0 0' }}>Fig 1: Projected emissions reduction impact.</p>
          </div>

          <h3 id="future-outlook" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Future Outlook</h3>
          <p>The success of this cohort will pave the way for future climate tech investments in India. Gruhas plans to double down on its commitment to sustainability by launching a dedicated climate fund in 2027. This will provide follow-on funding for startups like CarbonSynq to scale their solutions globally.</p>

          <h3 id="conclusion" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Conclusion</h3>
          <p>Being part of the Gruhas Aspire cohort is a significant milestone for CarbonSynq. The mentorship and network provided by the program will accelerate our mission to make carbon accounting accessible to every business. We are excited for the journey ahead and the impact we will create together.</p>
        </div>
      );
    }

    // Specific content for "100X.VC Funds 22 Start-ups with Innovative iSAF..."
    if (item.title === '100X.VC Funds 22 Start-ups with Innovative iSAF...') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            Focusing on the revolutionary iSAFE notes used by 100X.VC to fund 22 startups.
          </p>

          <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The iSAFE Innovation</h3>
          <p>iSAFE stands for India Simple Agreement for Future Equity. It is a contract that allows startups to receive funding without having to determine a valuation immediately. 100X.VC has pioneered this instrument in India.</p>

          <h3 id="core-principles" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>How iSAFE Works</h3>
          <p>Unlike traditional convertible notes, iSAFE notes are not debt. They do not carry interest and have no maturity date. This makes them highly founder-friendly.</p>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Feature</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Traditional Equity</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>iSAFE Note</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Valuation</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Required immediately</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Deferred to next round</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Documentation</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Complex, time-consuming</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Simple, fast</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="implementation" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Benefits for Founders</h3>
          <p>Founders retain control and avoid dilution at the earliest stages, allowing them to build value before setting a price on their equity.</p>

          <h3 id="measuring-success" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Measuring Success</h3>
          <p>The success of the iSAFE model is reflected in the speed of transactions. Deals that used to take months are now closed in weeks, allowing startups to deploy capital immediately. 100X.VC has successfully funded over 100 startups using this model.</p>

          <h3 id="future-outlook" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Future Outlook</h3>
          <p>As more VCs in India adopt the iSAFE model, we expect to see a surge in early-stage funding. This democratization of capital will allow more innovative ideas to get off the ground without the friction of complex legal negotiations.</p>

          <h3 id="conclusion" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Conclusion</h3>
          <p>The iSAFE note is truly an innovative instrument that has transformed the Indian startup ecosystem. By removing valuation hurdles, it empowers founders to focus on what matters most: building a great product and scaling their business.</p>
        </div>
      );
    }

    // Specific content for "Chrysalis Services and Breathe ESG Join Forces..."
    if (item.title === 'Chrysalis Services and Breathe ESG Join Forces...') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            CarbonSynq has joined forces with Chrysalis Services to expand its sustainability offerings.
          </p>

          <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Introduction</h3>
          <p>In a strategic move to expand its market reach and service capabilities, CarbonSynq has announced a partnership with Chrysalis Services. This collaboration brings together CarbonSynq's advanced technology platform with Chrysalis's deep expertise in sustainability consulting.</p>

          <h3 id="core-principles" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Synergies & Strategy</h3>
          <p>The joint forces will focus on providing end-to-end ESG solutions, from data collection and carbon accounting to strategic advisory and reporting.</p>

          <h3 id="implementation" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Integration Roadmap</h3>
          <p>The integration will take place over the next quarter, ensuring a seamless experience for existing clients of both firms.</p>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Phase</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Objective</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Timeline</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Phase 1</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Platform integration</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Month 1</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Phase 2</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Client onboarding</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Month 2-3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Specific content for 100X.VC cards
    if (item.title.startsWith('100X.VC')) {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            100X.VC has invested $3.4 Million in 22 startups in its latest cohort using iSAFE notes.
          </p>

          <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Introduction</h3>
          <p>100X.VC is the first VC to invest in early-stage startups using iSAFE (India Simple Agreement for Future Equity) notes. In its latest Class 09 cohort, it funded 22 promising startups across various sectors including climate tech, AI, and SaaS.</p>

          <h3 id="core-principles" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>iSAFE Innovation</h3>
          <p>The iSAFE note is a founder-friendly instrument that avoids the need for valuation at the seed stage, allowing founders to focus on growth.</p>

          <h3 id="implementation" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Sector Breakdown</h3>
          <p>The table below shows the distribution of funding across sectors in the latest cohort.</p>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Sector</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>No. of Startups</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Key Focus</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Climate Tech</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>5</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>Decarbonization, EV</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>AI & SaaS</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>10</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>Enterprise automation</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Others</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>7</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>Fintech, Healthtech</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="measuring-success" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Cohort Growth</h3>
          <p>The chart below shows the growth in cohort size over the last few batches.</p>

          <div style={{ margin: '32px 0', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '30px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '80px', background: '#cbd5e1', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Class 07</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '100px', background: '#cbd5e1', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Class 08</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '140px', background: '#059669', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Class 09</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '16px', margin: '16px 0 0' }}>Fig 1: Cohort size comparison.</p>
          </div>

          <h3 id="future-outlook" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Future Outlook</h3>
          <p>Looking ahead, 100X.VC aims to fund 100 startups every year. This massive scale will create a pipeline of high-growth companies that will drive India's economy forward. The focus on climate tech will likely increase as global demand for sustainability solutions grows.</p>

          <h3 id="conclusion" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Conclusion</h3>
          <p>The investment in these 22 startups is a testament to the vibrant startup ecosystem in India. 100X.VC's unique approach with iSAFE notes continues to lower barriers for founders, paving the way for the next wave of innovation.</p>
        </div>
      );
    }

    // Specific content for Gruhas card (Card 3 in image)
    if (item.title.startsWith('Gruhas Aspire Onboards')) {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            Gruhas Aspire has onboarded six startups for its latest proptech cohort.
          </p>

          <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Introduction</h3>
          <p>Gruhas Aspire is a leading accelerator program focused on proptech and clean technologies. In its latest cohort, six startups were selected from hundreds of applicants for their potential to revolutionize the built environment.</p>

          <h3 id="core-principles" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Cohort</h3>
          <p>The cohort includes startups working on carbon accounting, sustainable materials, and smart building solutions.</p>

          <h3 id="implementation" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Focus Areas</h3>
          <p>The main focus areas for this cohort are reducing embodied carbon in construction and improving operational efficiency in commercial real estate.</p>
        </div>
      );
    }

    // Specific content for "CarbonSynq Decarbonization Guide"
    if (item.title === 'CarbonSynq Decarbonization Guide') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            Learn how to implement decarbonization strategies across your supply chain effectively.
          </p>

          <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Introduction to Decarbonization</h3>
          <p>Decarbonization is the process of reducing carbon emissions across all operations. This guide provides a roadmap for businesses to transition to a low-carbon model, focusing on energy efficiency and renewable energy adoption.</p>
          <p>Achieving deep decarbonization requires a fundamental shift in how businesses operate. It is no longer sufficient to simply purchase carbon offsets to claim neutrality; stakeholders, including investors and customers, are demanding real, verifiable reductions in absolute emissions. This guide outlines a structured approach to identifying emission sources, implementing reduction strategies, and tracking progress over time, ensuring that your organization's transition is both economically viable and environmentally impactful.</p>

          <h3 id="core-principles" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Reduction Pillars</h3>
          <p>The diagram below shows the three main pillars of a successful decarbonization strategy.</p>

          <div className="diagram-container" style={{ margin: '32px 0', display: 'flex', gap: 15, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '140px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>Efficiency</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Reduce energy waste</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '140px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>Renewables</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Transition to green energy</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#059669', padding: '16px 20px', borderRadius: '8px', color: '#fff', textAlign: 'center', minWidth: '140px' }}>
              <div style={{ fontWeight: 700 }}>Offsets</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Neutralize residue</div>
            </div>
          </div>

          <p>The hierarchy of these pillars is critical. Organizations must first focus on **Energy Efficiency** to reduce the total amount of energy required. This includes upgrading lighting, optimizing HVAC systems, and improving manufacturing processes. Once demand is minimized, the remaining energy needs should be met through **Renewables**, either via on-site generation (like solar panels) or green power purchase agreements (PPAs). Finally, for residual emissions that cannot be eliminated with current technology, high-quality **Offsets** should be used as a last resort to achieve net-zero goals.</p>

          <h3 id="implementation" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Action Plan</h3>
          <p>The table below outlines the specific actions required in each phase of the guide.</p>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Action</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Target</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Energy Audit</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>All Facilities</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>High</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Solar Install</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Main Hubs</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Medium</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>Implementing this action plan requires cross-functional collaboration. The facilities team must drive energy audits, while the procurement team handles renewable energy contracts. It is recommended to start with "low-hanging fruit"—initiatives that have low capital requirements and fast payback periods, such as LED retrofits. The savings generated from these early wins can then be reinvested into more complex, capital-intensive projects like fleet electrification or deep process redesigns.</p>

          <h3 id="challenges" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Overcoming Implementation Challenges</h3>
          <p>The path to decarbonization is not without challenges. High upfront capital expenditure (CapEx) is often cited as the primary barrier to entry for sustainability projects. To overcome this, organizations should explore alternative financing models such as Energy Savings Performance Contracts (ESPCs) or green bonds. Additionally, engaging employees at all levels is crucial; a culture of sustainability can drive behavioral changes that significantly reduce energy waste without requiring any capital investment at all.</p>

          <h3 id="measuring-success" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Decarbonization Progress</h3>
          <p>The chart below shows the projected reduction in emissions after following this guide.</p>

          <div style={{ margin: '32px 0', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '30px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '120px', background: '#cbd5e1', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Baseline</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '50px', background: '#059669', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Target</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '16px', margin: '16px 0 0' }}>Fig 1: Emission reduction goal.</p>
          </div>

          <h3 id="scope-strategies" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Deep Dive: Scope-Specific Strategies</h3>
          <p>A comprehensive decarbonization guide must address all three scopes of emissions as defined by the GHG Protocol. For **Scope 1** (direct emissions), companies should focus on transitioning their vehicle fleets to electric vehicles and replacing gas-fired boilers with heat pumps or other electric alternatives. These are often the most visible changes and can demonstrate a strong commitment to sustainability to employees and the local community.</p>
          <p>For **Scope 2** (indirect emissions from purchased energy), the focus is primarily on sourcing. Companies can enter into virtual power purchase agreements (vPPAs) with renewable energy developers, ensuring that for every megawatt-hour of electricity they consume, an equivalent amount of green energy is generated elsewhere on the grid. This not only reduces emissions but can also provide a hedge against volatile energy prices.</p>
          <p>Finally, **Scope 3** (value chain emissions) requires the most collaborative approach. Since these emissions occur upstream and downstream, companies must work with their suppliers to encourage them to set their own science-based targets. This might involve providing training on carbon accounting to smaller suppliers or even co-investing in clean technology projects with critical supply chain partners.</p>

          <h3 id="long-term-vision" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Long-Term Vision: Net Zero</h3>
          <p>The ultimate goal of any decarbonization guide is to set the organization on a path to Net Zero emissions. This means reducing emissions by at least 90% by 2050 (or earlier), with any residual emissions being neutralized through permanent carbon removal technologies, rather than simple avoidance offsets. Setting interim targets (e.g., 50% reduction by 2030) is crucial for maintaining momentum and ensuring accountability across leadership teams.</p>
        </div>
      );
    }    // Specific content for "Data-Driven Sustainability Insights"
    if (item.title === 'Data-Driven Sustainability Insights') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            How to use data to drive sustainability initiatives and report accurately to stakeholders.
          </p>

          <p>Data is the foundation of sustainability. Without accurate data, it's impossible to measure progress or identify areas for improvement. This whitepaper explores how to build a data-driven sustainability culture.</p>

          <h3 id="key-highlights" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Key Highlights</h3>

          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <li>
              <strong>Continuous Monitoring</strong>: Shift from annual reporting to real-time or near-real-time data collection for proactive decision-making.
            </li>
            <li>
              <strong>Break Down Silos</strong>: Centralize data from HR, Facilities, and Procurement to get a complete view of emissions.
            </li>
            <li>
              <strong>Predictive Insights</strong>: Leverage AI and machine learning to forecast future emissions and optimize operations.
            </li>
          </ul>

          <p style={{ marginTop: '32px' }}>In many organizations, sustainability data is collected manually on an annual basis, often using complex spreadsheets that are prone to errors. This reactive approach makes it impossible to make timely adjustments to strategy. A truly data-driven culture requires shifting from annual reporting to continuous monitoring, where data is collected in real-time or near-real-time. This allows sustainability teams to act more like operational teams, making data-backed decisions daily rather than once a year.</p>

          <p>By expanding the scope of data collection and leveraging advanced analytics, companies can uncover hidden hotspots that were previously ignored. This includes tracking the carbon intensity of cloud computing usage, employee commuting patterns, and even the lifecycle emissions of office supplies. With these insights, organizations can target reduction initiatives where they will have the greatest impact.</p>

          <p>Ultimately, a data-driven approach builds trust with stakeholders. Investors, customers, and regulators are increasingly skeptical of high-level sustainability claims. By providing granular, verifiable data, companies can demonstrate the authenticity of their efforts and stand out as leaders in the transition to a sustainable economy.</p>
        </div>
      );
    }

    // Specific content for "Why Real-Time Tracking Matters"
    if (item.title === 'Why Real-Time Tracking Matters') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            Discover why transitioning from annual estimates to real-time carbon tracking is critical for accurate reporting and effective decarbonization.
          </p>

          <p>In the past, carbon accounting was a retrospective exercise, often done once a year for the annual report. Companies would gather data on energy use, travel, and supply chain activities, apply emission factors, and produce a number. While this was sufficient for compliance in the early days of sustainability reporting, it is no longer enough. Today, stakeholders demand accuracy, transparency, and action. Real-time tracking provides the foundation for all three.</p>

          <p>The core problem with annual reporting is that it is reactive. By the time the report is published, the data is months old. If emissions spiked in a particular quarter due to operational inefficiencies, that opportunity to correct course is lost. Real-time tracking, on the other hand, allows organizations to monitor their carbon footprint continuously, identify anomalies as they happen, and take corrective action immediately.</p>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Benefits of Real-Time Tracking</h3>

          <p>Moving to a real-time data model unlocks several strategic advantages:</p>

          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <li><strong>Operational Agility</strong>: Identify and fix emission spikes in days rather than waiting for the end of the year.</li>
            <li><strong>Audit Readiness</strong>: Maintain a continuous, verifiable audit trail that simplifies compliance with regulations like CSRD.</li>
            <li><strong>Stakeholder Trust</strong>: Provide investors and customers with real-time, verifiable data rather than high-level estimates.</li>
          </ul>

          <div style={{ width: '100%', height: 300, borderRadius: 16, overflow: 'hidden', margin: '32px 0' }}>
            <img src="/resources-assets/img5.webp" alt="Real-Time Dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '8px' }}>Fig 1: Real-time carbon tracking dashboard interface.</p>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Comparison: Annual vs. Real-Time</h3>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Feature</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Annual Reporting</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Real-Time Tracking</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Data Frequency</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Once a Year</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Continuous</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Actionability</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Low (Reactive)</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>High (Proactive)</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Data Accuracy</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Estimates & Averages</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Primary Data</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Technological Enablers</h3>
          <p>The shift to real-time tracking is made possible by several key technologies. IoT sensors installed on equipment and in facilities provide direct telemetry on energy consumption. Automated API integrations with utility providers and ERP systems eliminate manual data entry and ensure that data flows seamlessly into the carbon accounting platform. Advanced machine learning algorithms can then process this data in real-time, applying dynamic emission factors that account for variations in grid intensity throughout the day.</p>

          <div style={{ width: '100%', height: 300, borderRadius: 16, overflow: 'hidden', margin: '32px 0' }}>
            <img src="/resources-assets/img6.webp" alt="IoT Sensors and Data Flow" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '8px' }}>Fig 2: IoT integration for real-time carbon telemetry.</p>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Key Metrics Monitored in Real-Time</h3>
          <p>Here are some of the critical metrics that organizations track on a continuous basis to drive their decarbonization strategies:</p>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Metric</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Data Source</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Update Frequency</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Grid Carbon Intensity</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Grid APIs</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Every 15 mins</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Building Energy Use</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Smart Meters</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Real-time</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Fleet Fuel Consumption</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Telematics Systems</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Daily</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Case Study: Global Logistics Firm</h3>
          <p>To understand the impact of real-time tracking, consider the case of a global logistics firm that transitioned from quarterly manual reporting to real-time carbon telemetry across its fleet and warehouses.</p>
          <p>Before the transition, the company relied on fuel receipts and utility bills to calculate its carbon footprint. This data was often delayed by 45 to 60 days, making it impossible to identify inefficient routes or equipment failures that caused emission spikes. After implementing CarbonSynq's real-time tracking solution, which integrated directly with vehicle telematics and smart meters, the company gained instant visibility.</p>
          <p>Within the first month, the system identified a specific regional warehouse where emissions from refrigeration units were 30% higher than the baseline. An investigation revealed a faulty seal in one of the units. Because the issue was detected in real-time, it was fixed within 48 hours, saving an estimated 50 tons of CO2e that would have gone unnoticed until the next quarterly report.</p>

          <div style={{ width: '100%', height: 300, borderRadius: 16, overflow: 'hidden', margin: '32px 0' }}>
            <img src="/resources-assets/img8.webp" alt="Logistics Case Study" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '8px' }}>Fig 3: Real-time route optimization for emission reduction.</p>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Steps to Implement Real-Time Tracking</h3>
          <p>Transitioning to a real-time model requires a structured approach. Here are the five key steps to successful implementation:</p>

          <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <li><strong>Audit Existing Data Sources</strong>: Identify which data streams are already digital (e.g., smart meters, fleet telematics) and which are manual.</li>
            <li><strong>Select the Right Platform</strong>: Choose a carbon accounting platform that supports high-frequency data ingestion and API integrations.</li>
            <li><strong>Deploy IoT Sensors</strong>: Install hardware where direct data streams are missing, particularly in manufacturing or large facilities.</li>
            <li><strong>Automate Emission Factor Mapping</strong>: Ensure your platform can apply location-based and market-based emission factors dynamically.</li>
            <li><strong>Train Operational Teams</strong>: Empower facility managers and logistics coordinators to use the real-time dashboard to make daily decisions.</li>
          </ol>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Future Outlook: Predictive Decarbonization</h3>
          <p>The future of real-time tracking lies in predictive analytics. By combining real-time data with machine learning models, companies can forecast their emissions based on production schedules, weather patterns, and grid conditions. This allows for "predictive decarbonization"—adjusting operations *before* emissions occur. For example, a manufacturer could shift high-energy processes to hours when the local grid is powered primarily by renewable energy, drastically reducing Scope 2 emissions without reducing output.</p>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Emission Reduction Trajectory</h3>
          <p>Organizations that implement real-time tracking consistently achieve faster emission reductions due to their ability to act quickly on data insights. The chart below illustrates the typical reduction curve compared to traditional annual reporting methods.</p>

          <div style={{ margin: '32px 0', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '30px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '140px', background: '#cbd5e1', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Year 1</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '80px', background: '#10b981', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Year 2</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '40px', background: '#059669', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Year 3</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '16px', margin: '16px 0 0' }}>Fig 4: Accelerated emission reduction with real-time tracking.</p>
          </div>

          <p>Ultimately, real-time tracking is not just about compliance; it is about competitive advantage. Companies that can demonstrate real, verifiable reductions will be preferred by investors, customers, and talent. This guide provides the blueprint for transitioning your organization to a real-time carbon data model.</p>
        </div>
      );
    }

    // Specific content for "Greenwashing vs True Sustainability"
    if (item.title === 'Greenwashing vs True Sustainability') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            Learn how to distinguish between superficial green claims and genuine, impactful sustainability practices in the corporate world.
          </p>

          <p>As sustainability becomes a core driver of consumer choice and investor decision-making, the temptation for companies to appear "greener" than they actually are has never been higher. This phenomenon, known as greenwashing, involves making unsubstantiated or misleading claims about the environmental benefits of a product, service, or company practice. True sustainability, by contrast, requires deep, verifiable, and systemic changes to business operations.</p>

          <p>Greenwashing not only misleads stakeholders but also undermines the efforts of truly sustainable companies by creating skepticism and confusion in the market. To build a truly sustainable future, we must learn to identify and call out greenwashing while championing genuine sustainability efforts.</p>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The 7 Sins of Greenwashing</h3>
          <p>Environmental marketing firm TerraChoice identified the "Seven Sins of Greenwashing" to help consumers and businesses spot misleading claims:</p>

          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <li><strong>Sin of the Hidden Trade-off</strong>: Suggesting a product is green based on a narrow set of attributes without attention to other important environmental issues.</li>
            <li><strong>Sin of No Proof</strong>: Making an environmental claim that cannot be substantiated by easily accessible supporting information.</li>
            <li><strong>Sin of Vagueness</strong>: Using terms that are so broad or poorly defined that their real meaning is likely to be misunderstood (e.g., "all-natural").</li>
            <li><strong>Sin of Irrelevance</strong>: Making a claim that may be true but is unimportant or unhelpful for consumers seeking environmentally preferable products.</li>
            <li><strong>Sin of Lesser of Two Evils</strong>: Making a claim that may be true within the product category but that risks distracting the consumer from the greater environmental impacts of the category as a whole.</li>
            <li><strong>Sin of Fibbing</strong>: Making environmental claims that are simply false.</li>
            <li><strong>Sin of Worshiping False Labels</strong>: Creating false certifications or labels to mislead consumers into believing a product has been independently verified.</li>
          </ul>

          <div style={{ width: '100%', height: 300, borderRadius: 16, overflow: 'hidden', margin: '32px 0' }}>
            <img src="/resources-assets/img11.webp" alt="Greenwashing vs Sustainability" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '8px' }}>Fig 1: Distinguishing greenwashing from authentic sustainability.</p>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Comparison: Greenwashing vs. True Sustainability</h3>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Attribute</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Greenwashing</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>True Sustainability</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Focus</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Marketing & Image</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Operations & Impact</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Transparency</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Selective Disclosure</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Full Disclosure (Scope 1-3)</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Data Source</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Estimates & Broad Claims</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Verified Primary Data</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Case Study: Fast Fashion vs. Circular Apparel</h3>
          <p>The fashion industry provides a clear contrast between greenwashing and true sustainability. Many fast fashion brands have launched "conscious" collections, claiming to use recycled materials. However, these collections often represent a tiny fraction of their total output, while the core business model remains predicated on overproduction and waste. This is a classic example of the Sin of the Hidden Trade-off.</p>
          <p>In contrast, a truly sustainable apparel brand might implement a circular business model. This involves designing products for durability, using 100% recycled or organic materials across all lines, and offering a take-back program to recycle old garments. They would provide full visibility into their supply chain emissions (Scope 3) and share verifiable data on the water and carbon savings of their products. This holistic approach represents true sustainability.</p>

          <div style={{ width: '100%', height: 300, borderRadius: 16, overflow: 'hidden', margin: '32px 0' }}>
            <img src="/resources-assets/img2.webp" alt="Circular Economy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '8px' }}>Fig 2: Circular economy model vs linear model.</p>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>5 Steps to Ensure True Sustainability</h3>
          <p>To avoid greenwashing and practice authentic sustainability, companies should follow these steps:</p>

          <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <li><strong>Base Claims on Data</strong>: Never make an environmental claim without primary, verifiable data to back it up.</li>
            <li><strong>Be Transparent About Scopes</strong>: Report on Scope 1, 2, and 3 emissions. Don't hide supply chain impacts.</li>
            <li><strong>Set Science-Based Targets</strong>: Align your reduction goals with the Paris Agreement and get them verified by the SBTi.</li>
            <li><strong>Avoid Vague Language</strong>: Stop using terms like "eco-friendly" or "sustainable" without specific context or metrics.</li>
            <li><strong>Third-Party Verification</strong>: Have your data and reports audited by independent third parties to build trust.</li>
          </ol>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Rise of Anti-Greenwashing Regulations</h3>
          <p>Regulators around the world are cracking down on greenwashing. The EU's Green Claims Directive and the SEC's proposed climate disclosure rules are designed to ensure that companies can back up their environmental claims with verifiable data. Companies that fail to comply face significant financial penalties and reputational damage.</p>

          <div style={{ margin: '32px 0', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontWeight: 700, color: '#0f172a', marginBottom: '16px', textAlign: 'center' }}>Global Increase in Greenwashing Litigation</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '30px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '30px', background: '#cbd5e1', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>2023</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '70px', background: '#10b981', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>2024</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '130px', background: '#059669', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>2025 (Est)</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '16px', margin: '16px 0 0' }}>Fig 3: Growth in legal challenges against misleading green claims.</p>
          </div>

          <p>Ultimately, the best defense against greenwashing is transparency. Companies that use platforms like CarbonSynq to track their emissions in real-time and share verifiable data with stakeholders can demonstrate their commitment to true sustainability and build lasting trust.</p>
        </div>
      );
    }

    // Specific content for "The Role of AI in ESG Compliance"
    if (item.title === 'The Role of AI in ESG Compliance') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            Explore how artificial intelligence and machine learning are revolutionizing environmental, social, and governance (ESG) compliance.
          </p>

          <p>The landscape of ESG compliance is growing increasingly complex. With new regulations like the EU's CSRD, California's climate disclosure laws, and evolving SEC guidelines, companies are required to collect, verify, and report on thousands of data points across their operations and supply chains. Manual processes are no longer sufficient. This is where Artificial Intelligence (AI) steps in, offering the scale, speed, and accuracy needed to navigate modern ESG demands.</p>

          <p>AI is not just a tool for automation; it is a transformative technology that enables companies to move from reactive compliance to proactive sustainability management. By processing vast amounts of unstructured data, identifying patterns, and predicting future trends, AI empowers organizations to make data-driven decisions that reduce risk and create long-term value.</p>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Key Applications of AI in ESG</h3>

          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <li><strong>Automated Data Collection</strong>: Natural Language Processing (NLP) algorithms can read invoices, utility bills, and supplier reports to extract relevant ESG data automatically, eliminating manual entry errors.</li>
            <li><strong>Predictive Analytics</strong>: Machine learning models can forecast emission trajectories based on production plans and weather data, allowing companies to adjust operations to meet reduction targets.</li>
            <li><strong>Supply Chain Risk Assessment</strong>: AI can analyze news reports, satellite imagery, and social media to identify potential ESG violations (e.g., deforestation, labor issues) in the supply chain before they become major liabilities.</li>
            <li><strong>Dynamic Materiality Assessment</strong>: AI can monitor stakeholder sentiment and regulatory changes in real-time to help companies understand which ESG issues are most material to their business.</li>
          </ul>

          <div style={{ width: '100%', height: 300, borderRadius: 16, overflow: 'hidden', margin: '32px 0' }}>
            <img src="/resources-assets/img13.webp" alt="AI in ESG" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '8px' }}>Fig 1: AI-driven ESG data analysis dashboard.</p>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>AI Capabilities vs. Manual Processes</h3>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Capability</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Manual Processes</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>AI-Powered System</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Data Processing Speed</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Weeks or Months</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Real-Time / Seconds</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Error Rate</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>High (Human Error)</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>{"Low (< 1% with training)"}</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Insight Generation</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Descriptive (What happened)</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Prescriptive (What to do)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Case Study: AI in Scope 3 Decarbonization</h3>
          <p>A multinational consumer goods company used AI to tackle its Scope 3 emissions, which accounted for 90% of its total carbon footprint. With over 10,000 suppliers, manually collecting and verifying emission data was impossible.</p>
          <p>The company deployed an AI system that analyzed supplier procurement data, product specifications, and shipping routes. The AI identified that 40% of supply chain emissions came from just 5% of suppliers, primarily due to inefficient manufacturing processes and long-distance transport. Armed with this insight, the company worked with those specific suppliers to optimize operations, resulting in a 15% reduction in Scope 3 emissions within 18 months—a result that would have taken years to achieve manually.</p>

          <div style={{ width: '100%', height: 300, borderRadius: 16, overflow: 'hidden', margin: '32px 0' }}>
            <img src="/resources-assets/img4.webp" alt="Supply Chain AI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '8px' }}>Fig 2: Supplier emission mapping using machine learning.</p>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Steps to Implement AI in ESG Compliance</h3>
          <p>Transitioning to an AI-powered ESG model requires a structured approach. Here are the five key steps to successful implementation:</p>

          <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <li><strong>Identify Use Cases</strong>: Determine where AI can add the most value (e.g., data extraction, risk prediction).</li>
            <li><strong>Ensure Data Quality</strong>: Clean and structure your existing data before feeding it into AI models.</li>
            <li><strong>Select the Right Tools</strong>: Choose AI platforms that integrate with your existing ERP and sustainability software.</li>
            <li><strong>Train the Models</strong>: Work with data scientists to train machine learning models on your specific industry context.</li>
            <li><strong>Maintain Human-in-the-Loop</strong>: Ensure that AI-generated insights and reports are reviewed by sustainability experts.</li>
          </ol>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Future: Generative AI for ESG Reporting</h3>
          <p>The next frontier in ESG compliance is the use of Generative AI (like LLMs) to draft sustainability reports. These models can take verified data and automatically generate draft text for CSRD or GRI disclosures, ensuring that the tone is appropriate and all regulatory requirements are met. This will further reduce the reporting burden, allowing sustainability teams to focus on strategy and action rather than paperwork.</p>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>AI Technologies and Their ESG Use Cases</h3>
          <p>Different AI technologies are suited for different aspects of ESG compliance. The table below maps common AI technologies to their specific use cases.</p>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>AI Technology</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>ESG Use Case</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Natural Language Processing (NLP)</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Analyzing news, reports, and policies for ESG sentiment.</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Rapid risk identification</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Computer Vision</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Monitoring satellite imagery for deforestation or oil spills.</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Independent verification</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Predictive Modeling</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Forecasting future carbon emissions based on growth plans.</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>Proactive planning</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Challenges in Implementing AI for ESG</h3>
          <p>While the benefits are clear, organizations face several challenges when deploying AI for ESG compliance:</p>

          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <li><strong>Data Silos</strong>: ESG data is often spread across HR, facilities, procurement, and finance systems, making it hard to feed into a central AI model.</li>
            <li><strong>Model Bias</strong>: If AI models are trained on biased or incomplete data, they may produce inaccurate risk assessments or favor certain suppliers unfairly.</li>
            <li><strong>The "Black Box" Problem</strong>: Complex AI models can be difficult to audit, making it hard to explain to regulators *how* a specific insight or calculation was derived.</li>
            <li><strong>High Initial Cost</strong>: Custom AI development and data cleaning require significant upfront investment in talent and infrastructure.</li>
          </ul>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Efficiency Gains from AI Adoption</h3>
          <p>Companies adopting AI for ESG compliance consistently report significant reductions in reporting time and costs. The chart below illustrates the average reduction in hours spent on annual ESG report preparation after implementing AI tools.</p>

          <div style={{ margin: '32px 0', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontWeight: 700, color: '#0f172a', marginBottom: '16px', textAlign: 'center' }}>Hours Spent on Annual ESG Reporting</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '30px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '80px' }}>
                <div style={{ width: '100%', height: '140px', background: '#cbd5e1', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Before AI</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '80px' }}>
                <div style={{ width: '100%', height: '40px', background: '#059669', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>After AI</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '16px', margin: '16px 0 0' }}>Fig 3: Reduction in reporting burden with AI automation.</p>
          </div>

          <p>While AI offers immense potential, it is important to remember that it is not a silver bullet. The quality of AI insights depends on the quality of the data it is trained on. Companies must ensure they have robust data governance frameworks in place to avoid "garbage in, garbage out" scenarios. When combined with human expertise, AI becomes the most powerful tool available for achieving true ESG compliance and driving sustainable transformation.</p>
        </div>
      );
    }

    // Specific content for "Top 7 Scope 3 Software Platforms in 2026"
    if (item.title === 'Top 7 Scope 3 Software Platforms in 2026') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            A comparative review of the leading Scope 3 carbon accounting platforms in 2026.
          </p>

          <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Scope 3 Challenge</h3>
          <p>Tracking indirect emissions across the supply chain (Scope 3) is the most challenging part of carbon accounting. This guide reviews the top software platforms that help enterprises solve this problem.</p>
          <p>As we move into 2026, the landscape of Scope 3 software has matured significantly, driven by stringent global regulations like the EU's CSRD and California's climate disclosure laws. Enterprises are no longer satisfied with annual, estimate-based calculations. They demand platforms that can provide continuous, granular visibility into their value chain. The challenge is not just collecting data, but doing so without causing "supplier fatigue"—overwhelming supply chain partners with complex data requests.</p>

          <h3 id="core-principles" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Supplier Engagement Flow</h3>
          <p>The diagram below shows how these platforms typically handle data collection from supply chain partners.</p>

          <div className="diagram-container" style={{ margin: '32px 0', display: 'flex', gap: 15, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '140px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>1. Invite</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Onboard Suppliers</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '140px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>2. Collect</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Survey & ERP Sync</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#059669', padding: '16px 20px', borderRadius: '8px', color: '#fff', textAlign: 'center', minWidth: '140px' }}>
              <div style={{ fontWeight: 700 }}>3. Verify</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Audit & Certify</div>
            </div>
          </div>

          <p>The success of any Scope 3 initiative hinges on the **Invite** and **Collect** phases. Top platforms in 2026 offer localized, multi-language portals that make it easy for small and medium-sized suppliers to enter data, even if they don't have dedicated sustainability teams. Furthermore, leading solutions are moving away from flat surveys to direct API integrations with suppliers' ERP systems, enabling automated, high-frequency data transfer that reduces manual errors and improves data freshment.</p>

          <h3 id="implementation" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Platform Comparison</h3>
          <p>Here is a summary comparison of the top 3 platforms featured in our review.</p>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Platform</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Key Strength</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>CarbonSynq</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>Supply chain automation and deep tier mapping.</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>9.5 / 10</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>EcoTrack</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>Broad database of emission factors.</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>8.2 / 10</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>GreenChain</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>Strong focus on supplier surveys.</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>7.8 / 10</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>While CarbonSynq leads in supply chain automation, the "best" platform depends heavily on an organization's specific industry and supply chain structure. For example, a company with a high number of Tier 2 and Tier 3 suppliers will benefit more from CarbonSynq's deep tier mapping capabilities. Conversely, a company with a simpler supply chain but a high volume of transactions might prefer a platform that specializes in spend-based, spend-to-emission factor mapping with a vast database.</p>

          <h3 id="ai-platforms" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Role of AI in 2026 Platforms</h3>
          <p>The defining feature of top platforms in 2026 is the integration of generative AI and predictive analytics. AI is being used to read and extract data from unstructured supplier invoices, predict emissions for non-reporting suppliers based on peer benchmarks, and suggest specific reduction initiatives to suppliers. This reduces the burden on both the reporting enterprise and its supply chain partners, making large-scale Scope 3 tracking finally feasible for global organizations.</p>

          <h3 id="measuring-success" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Supplier Onboarding Rate</h3>
          <p>A key metric for Scope 3 success is the percentage of suppliers onboarded over time.</p>

          <div style={{ margin: '32px 0', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '30px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '40px', background: '#cbd5e1', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Month 1</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '90px', background: '#10b981', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Month 3</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                <div style={{ width: '100%', height: '130px', background: '#059669', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Month 6</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '16px', margin: '16px 0 0' }}>Fig 2: Average supplier onboarding curve.</p>
          </div>

          <h3 id="evaluation-criteria" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Key Evaluation Criteria for Enterprises</h3>
          <p>When evaluating Scope 3 platforms in 2026, enterprises should look beyond basic feature checklists. The most critical factor is **Data Verifiability**. As greenwashing penalties increase, platforms must provide a clear audit trail for every data point collected from suppliers. This means tracking the source of the data, the emission factors used, and any overrides made by users, ensuring that the final report can withstand a third-party assurance audit.</p>
          <p>Another crucial criterion is **Interoperability**. A standalone carbon accounting tool that does not talk to your ERP (like SAP or Oracle) or your Supply Chain Management (SCM) system will quickly become a data silo. The top platforms excel at bidirectional data flow, pulling procurement volumes automatically and pushing emission metrics back into product design tools, enabling engineers to make carbon-conscious material choices during the design phase.</p>

          <h3 id="future-trends" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Future Trends: Beyond 2026</h3>
          <p>Looking past 2026, we expect Scope 3 platforms to evolve from reporting tools into **Active Reduction Platforms**. Instead of just telling you what your emissions were last quarter, they will use predictive models to suggest specific actions, such as "Switching Supplier X to Supplier Y for item Z will reduce your Scope 3 emissions by 15% at a 5% cost increase." This shift from descriptive to prescriptive analytics will be the next frontier in carbon accounting software.</p>
        </div>
      );
    }

    // Specific content for "Carbon Accounting for Supply Chains"
    if (item.title === 'Carbon Accounting for Supply Chains') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            Understand how real-time carbon data improves Scope 1, Scope 2, and Scope 3 visibility across operations.
          </p>

          <p>Supply chains are often the largest source of an organization's carbon footprint, yet they are the hardest to measure. Traditional carbon accounting relies on annual estimates, which are insufficient for driving real reduction. This guide explores how to implement real-time carbon accounting across your supply chain.</p>

          <h3 id="key-highlights" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Key Highlights</h3>

          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <li>
              <strong>Scope 3 Visibility</strong>: Gaining insight into indirect emissions from suppliers and the product lifecycle.
            </li>
            <li>
              <strong>Primary Data Collection</strong>: Moving from spend-based estimates to actual activity data from suppliers.
            </li>
            <li>
              <strong>Collaborative Decarbonization</strong>: Working with suppliers to set targets and reduce emissions together.
            </li>
          </ul>

          <p style={{ marginTop: '32px' }}>The complexity of modern supply chains often obscures the true environmental impact of a company's operations. Most organizations find that over 70% of their total carbon footprint lies within Scope 3 emissions—those produced by suppliers, distributors, and the lifecycle of products. To address this, companies must move beyond high-level estimates and begin collecting primary data from their tier-one and tier-two suppliers. This requires building collaborative relationships and providing suppliers with the tools and training necessary to measure their own emissions accurately.</p>

          <p>Furthermore, integrating carbon accounting into procurement decisions is becoming a best practice. By evaluating suppliers not just on cost and quality, but also on their carbon intensity, companies can drive reductions throughout the value chain. This shift towards 'green procurement' incentivizes suppliers to invest in renewable energy and efficiency measures, creating a ripple effect of decarbonization across industries.</p>

          <p>To tackle the high difficulty of collecting data from deeper tiers, organizations are increasingly turning to shared data utilities and industry-specific consortia. By agreeing on common data standards and sharing protocols, companies can reduce the burden on small suppliers who are asked to provide data to multiple customers. This collaborative approach is essential for achieving a complete and accurate supply chain carbon inventory.</p>
        </div>
      );
    }

    // Specific content for "Executive Guide to Decarbonization"
    if (item.title === 'Executive Guide to Decarbonization') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            A high-level view for C-suite leaders on why sustainability matters right now.
          </p>

          <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The C-Suite Mandate</h3>
          <p>Decarbonization is no longer just a corporate social responsibility (CSR) initiative; it is a core business strategy. This guide provides executives with the framework to understand the financial and operational implications of the transition to a low-carbon economy.</p>
          <p>For modern CEOs and CFOs, the question is no longer "Why should we decarbonize?" but "How fast can we do it?" Stakeholders—from institutional investors to Gen Z consumers—are scrutinizing corporate climate commitments like never before. Leaders who fail to act risk asset stranding, higher capital costs, and loss of market share to more agile, sustainable competitors. This guide cuts through the technical jargon to deliver actionable insights for the boardroom.</p>

          <h3 id="roi-flow" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Value Creation Flow</h3>
          <p>The diagram below shows how sustainability initiatives drive direct business value.</p>

          <div className="diagram-container" style={{ margin: '32px 0', display: 'flex', gap: 15, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '120px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>Risk Mitigation</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Avoid Penalties</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '120px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>Cost Savings</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Energy Efficiency</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#059669', padding: '16px 20px', borderRadius: '8px', color: '#fff', textAlign: 'center', minWidth: '120px' }}>
              <div style={{ fontWeight: 700 }}>Brand Value</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Market Leadership</div>
            </div>
          </div>

          <h3 id="cost-comparison" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Cost of Inaction vs. Action</h3>
          <p>The table below summarizes the financial trade-offs between delaying decarbonization and acting now.</p>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Scenario</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Short-Term Impact</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Long-Term ROI</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Early Action</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Moderate CapEx increase</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>High (Resilience & Growth)</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Delayed Action</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Low initial cost</td>
                  <td style={{ padding: '12px 16px', color: '#ef4444', fontWeight: 600 }}>Negative (Risk & Compliance Costs)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>The table highlights a critical truth: the "low initial cost" of delayed action is an illusion. As carbon taxes increase and supply chains demand lower-carbon inputs, late movers will face a compressed, chaotic transition period with much higher costs and fewer options. Early action, while requiring capital up front, allows organizations to execute a planned, strategic transition that maximizes ROI.</p>

          <h3 id="leadership" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Leadership in the Green Transition</h3>
          <p>Successful decarbonization requires leadership from the top. It cannot be delegated solely to a Chief Sustainability Officer (CSO) operating in a silo. The CEO must integrate carbon metrics into executive compensation, the CFO must embed carbon pricing into capital allocation decisions, and the COO must redesign supply chains for resilience. When leadership treats carbon as a core operational constraint, the entire organization aligns to solve it.</p>
          <p>Furthermore, transparent communication about both successes and challenges is key. Stakeholders are forgiving of organizations that are honest about the difficulty of the transition, provided they show continuous progress. Authentic leadership in sustainability builds trust, which is the most valuable currency in the modern business landscape.</p>

          <h3 id="double-materiality" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Concept of Double Materiality</h3>
          <p>A key concept for executives to understand in 2026 is **Double Materiality**. This principle, central to frameworks like the EU's CSRD, requires companies to report not just on how sustainability issues affect their business financially (financial materiality), but also on how their business impacts the environment and society (impact materiality).</p>
          <p>For a long time, companies only cared about the former. They asked, "How will climate change affect our factories?" Now, they must also answer, "How do our factories affect climate change?" Understanding this dual perspective is crucial for strategy formulation. It forces leaders to consider the long-term sustainability of their business model in a world that increasingly values positive impact as much as profit.</p>

          <h3 id="tech-enabler" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Technology as a Strategic Enabler</h3>
          <p>Decarbonization at scale is impossible without technology. Manual spreadsheets are no longer sufficient for tracking complex supply chain emissions. Executives must view sustainability software not as a cost center, but as a strategic enabler. Platforms that leverage AI and IoT (Internet of Things) can automate data collection, provide predictive insights, and help optimize operations in real-time. By investing in the right digital infrastructure, leaders can turn compliance data into a source of competitive advantage, identifying efficiencies that others miss.</p>
        </div>
      );
    }

    // Specific content for "The Future of ESG Reporting with CarbonSynq"
    if (item.title === 'The Future of ESG Reporting with CarbonSynq') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            An analysis of upcoming regulatory changes and how companies can prepare their data infrastructure.
          </p>

          <p>The landscape of ESG (Environmental, Social, and Governance) reporting is shifting from voluntary disclosures to mandatory, regulated reporting. This shift requires companies to treat ESG data with the same level of scrutiny as financial data.</p>

          <h3 id="key-highlights" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Key Highlights</h3>

          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <li>
              <strong>Mandatory Compliance</strong>: Regulations like EU CSRD are making ESG disclosures mandatory and subject to audit assurance.
            </li>
            <li>
              <strong>Scope 3 Inclusion</strong>: Most frameworks now require reporting on value chain emissions, increasing data complexity.
            </li>
            <li>
              <strong>Audit-Ready Data</strong>: Companies must transition from annual PDF reports to continuous, verifiable data pipelines.
            </li>
          </ul>

          <p style={{ marginTop: '32px' }}>The transition to mandatory ESG reporting is driven by investors and regulators demanding the same level of rigor and transparency for sustainability data as they do for financial data. This means that data must be traceable back to its source, with clear audit trails and robust internal controls. CarbonSynq addresses this need by providing a centralized platform that automates data collection from utility bills, IoT sensors, and supplier disclosures, minimizing the risk of human error.</p>

          <p>Moreover, the platform enables real-time tracking against science-based targets. Rather than waiting for the annual report to see if goals were met, sustainability teams can monitor progress daily and adjust strategies proactively. This shift from backward-looking reporting to forward-looking management is the hallmark of a mature sustainability program.</p>

          <p>Finally, as regulations harmonize globally, companies operating in multiple jurisdictions will benefit from a unified data model. CarbonSynq's platform is designed to map data to multiple frameworks simultaneously, reducing the burden of reporting and ensuring consistency across all disclosures.</p>
        </div>
      );
    }

    // Specific content for "The Blueprint for Scope 3 Data Collection"
    if (item.title === 'The Blueprint for Scope 3 Data Collection') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            How to engage suppliers and gather accurate scope 3 emissions data effectively.
          </p>

          <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Scale of the Challenge</h3>
          <p>Scope 3 emissions often account for more than 70% of a company's total carbon footprint. Gathering accurate data across a complex supply chain is the single biggest challenge in carbon accounting. This blueprint provides a structured approach to solving it.</p>
          <p>The sheer volume of suppliers and the variety of data formats make this a Herculean task. Most companies start with spend-based estimates, which multiply financial spend with industry-average emission factors. While this provides a baseline, it is too imprecise for tracking real reduction. The goal of this blueprint is to help you transition from estimates to primary, activity-based data collected directly from your suppliers.</p>

          <h3 id="data-funnel" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Data Collection Funnel</h3>
          <p>The diagram below shows the 4-step funnel for successful supplier data collection.</p>

          <div className="diagram-container" style={{ margin: '32px 0', display: 'flex', gap: 15, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '110px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>1. Identify</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Map Suppliers</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '110px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>2. Engage</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Communicate</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '110px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>3. Collect</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Gather Data</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#059669', padding: '16px 20px', borderRadius: '8px', color: '#fff', textAlign: 'center', minWidth: '110px' }}>
              <div style={{ fontWeight: 700 }}>4. Verify</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Audit Data</div>
            </div>
          </div>

          <h3 id="collection-methods" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Data Collection Methods</h3>
          <p>The table below compares the two primary methods for calculating Scope 3 emissions.</p>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Method</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Data Source</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Accuracy</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Spend-Based</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Procurement records (financial)</td>
                  <td style={{ padding: '12px 16px', color: '#ef4444', fontWeight: 600 }}>Low</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Activity-Based</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Actual quantities (kg, kWh, etc.)</td>
                  <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>High</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>Transitioning from spend-based to activity-based methods is the core of this blueprint. Spend-based methods are useful for identifying "hotspots"—areas of high spend and likely high emissions. Once these hotspots are identified, companies must focus their engagement efforts on the suppliers in those categories to collect actual activity data. This targeted approach ensures that resources are not wasted on low-impact suppliers.</p>

          <h3 id="supplier-engagement" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Supplier Engagement Challenge</h3>
          <p>The success of data collection depends heavily on how well you engage your suppliers. Many suppliers, especially small and medium-sized enterprises (SMEs), do not have dedicated sustainability teams and may view data requests as an administrative burden. To overcome this, organizations must provide support. This can include training sessions, simplified data entry templates, and explaining the benefit to the supplier (e.g., helping them win more business by being low-carbon).</p>
          <p>Furthermore, leading companies are moving away from annual surveys to continuous data sharing via APIs. This reduces the manual workload for both parties and ensures that data is fresh and actionable. CarbonSynq facilitates this by providing automated connectors to common ERP systems, making data sharing as seamless as possible.</p>

          <h3 id="data-quality-tiers" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Data Quality Tiers</h3>
          <p>As you collect data, it is important to categorize it by quality. **Tier 1 Data** is supplier-specific primary data, verified by a third party. This is the gold standard. **Tier 2 Data** is supplier-specific primary data but unverified. **Tier 3 Data** is secondary data based on industry averages. The blueprint recommends starting with Tier 3 to get a baseline, and then systematically working to replace it with Tier 1 data for your most critical suppliers.</p>

          <h3 id="conclusion" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Conclusion: The Path Forward</h3>
          <p>Building a robust Scope 3 data collection system is a multi-year journey. It requires patience, collaboration, and the right technology. By following this blueprint, organizations can build a defensible, audit-ready carbon inventory that not only satisfies regulators but also identifies real opportunities for emission reduction across the value chain.</p>
        </div>
      );
    }

    // Specific content for "Regulatory Compliance Playbook 2026"
    if (item.title === 'Regulatory Compliance Playbook 2026') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            A comprehensive playbook for managing carbon compliance across global frameworks.
          </p>

          <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Regulatory Maze of 2026</h3>
          <p>Navigating the global regulatory landscape in 2026 requires more than just a checklist. This playbook outlines a strategic approach to managing compliance across multiple jurisdictions without duplicating effort.</p>
          <p>With the simultaneous rollout of the EU's CSRD, California's SB 253, and Australia's ASRS, multinational corporations face a fragmented landscape. Each regulation has its own specific reporting timelines, materiality definitions, and assurance requirements. Attempting to manage these in silos will lead to inefficiency and increased risk of error. The playbook advocates for a "comply once, report many" strategy, centered on a unified data model.</p>

          <h3 id="compliance-lifecycle" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Compliance Lifecycle</h3>
          <p>The diagram below shows the continuous lifecycle of regulatory compliance management.</p>

          <div className="diagram-container" style={{ margin: '32px 0', display: 'flex', gap: 15, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '110px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>1. Assess</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Identify Gaps</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '110px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>2. Implement</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Data Controls</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '110px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>3. Report</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Generate Disclosures</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ background: '#059669', padding: '16px 20px', borderRadius: '8px', color: '#fff', textAlign: 'center', minWidth: '110px' }}>
              <div style={{ fontWeight: 700 }}>4. Audit</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Verify & Certify</div>
            </div>
          </div>

          <h3 id="regulation-comparison" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Global Regulations Comparison</h3>
          <p>The table below summarizes the key differences between the major regulations coming into effect or expanding in 2026.</p>

          <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Regulation</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Jurisdiction</th>
                  <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Key Focus</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>EU CSRD</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>European Union</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>Double materiality, value chain emissions.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>SB 253</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>California, USA</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>Mandatory Scope 1-3 disclosures for large companies.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>ASRS</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>Australia</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>Climate-related financial disclosures aligned with ISSB.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>The core of the "comply once, report many" strategy is identifying the **Common Data Set**. While Australia's ASRS might require different report formatting than Europe's CSRD, the underlying carbon accounting principles (based on the GHG Protocol) are largely the same. By building a single, high-integrity data warehouse that tracks emissions at the activity level, companies can automatically populate various disclosure templates, reducing manual effort and ensuring consistency across reports.</p>

          <h3 id="penalties" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>The Cost of Non-Compliance</h3>
          <p>In 2026, the penalties for non-compliance are becoming severe. Regulators are moving beyond simple fines to enforcement actions that can include public censure, restrictions on operating licenses, and even personal liability for directors in some jurisdictions. Furthermore, the reputational damage from being labeled a "laggard" or accused of greenwashing can have a direct impact on share price and customer loyalty. Compliance is no longer optional; it is a license to operate.</p>

          <h3 id="best-practices" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Best Practices for 2026</h3>
          <p>To stay ahead, companies must move from periodic reporting to **Continuous Compliance**. This means implementing automated data pipelines that flag potential non-compliance issues in real-time, rather than waiting for the annual audit. It also involves training cross-functional teams (including finance, legal, and operations) on the specific requirements of the regulations affecting your business, ensuring that compliance is embedded in daily decision-making.</p>
        </div>
      );
    }

    // Specific content for "What is Australian Sustainability Reporting"
    if (item.title === 'What is Australian Sustainability Reporting') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            A guide to the new sustainability reporting standards in Australia.
          </p>
          <p>Australia is introducing mandatory climate-related financial disclosures, aligning with the international standards set by the ISSB (International Sustainability Standards Board). This shift aims to provide investors with transparent, comparable, and reliable information about climate-related risks and opportunities.</p>

          <h3 id="key-highlights" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Key Highlights</h3>

          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <li>
              <strong>Mandatory Disclosures</strong>: Large companies and emitters will be required to disclose climate-related financial information, including Scope 1, 2, and 3 emissions.
            </li>
            <li>
              <strong>Phased Approach</strong>: The requirements will be phased in, starting with the largest entities from 2024-2025, moving to medium and smaller entities in subsequent years.
            </li>
            <li>
              <strong>Assurance Requirements</strong>: Disclosures will be subject to mandatory assurance, ensuring the data is verified and reliable for investors.
            </li>
          </ul>

          <p style={{ marginTop: '32px' }}>The new Australian Sustainability Reporting Standards (ASRS) represent a significant shift in the regulatory landscape. Based on the International Sustainability Standards Board (ISSB) frameworks, these rules will require large companies and financial institutions to disclose their climate-related risks, opportunities, and emissions data. The goal is to provide investors with consistent, comparable, and reliable information to inform their capital allocation decisions.</p>

          <p>Preparation is key to compliance. Companies must begin by assessing their current data collection capabilities and identifying gaps. This often involves upgrading accounting systems to track carbon data alongside financial data and establishing rigorous governance processes. Those that act early will not only ensure compliance but also gain a competitive advantage by demonstrating their commitment to sustainability to investors and customers.</p>

          <p>Furthermore, the ASRS framework emphasizes the need for forward-looking scenarios. Companies must analyze how different climate futures (e.g., a 1.5°C scenario vs a 2°C+ scenario) would impact their business model and financial performance. This forces organizations to think strategically about climate risk and build resilience into their long-term planning.</p>
        </div>
      );
    }

    // Specific content for "The Future of Carbon Pricing"
    if (item.title === 'The Future of Carbon Pricing') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            An in-depth analysis of global carbon pricing mechanisms and how they affect businesses.
          </p>
          <p>Carbon pricing is emerging as a key tool for governments to incentivize emission reductions. This analysis explores the different mechanisms being deployed globally and their implications for corporate strategy.</p>

          <h3 id="key-highlights" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Key Highlights</h3>

          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <li>
              <strong>ETS vs Carbon Tax</strong>: Understanding the difference between cap-and-trade systems (ETS) and direct carbon taxes.
            </li>
            <li>
              <strong>Border Adjustments</strong>: How mechanisms like the EU's CBAM (Carbon Border Adjustment Mechanism) affect global supply chains.
            </li>
            <li>
              <strong>Internal Carbon Pricing</strong>: How leading companies are using shadow pricing to future-proof investments.
            </li>
          </ul>

          <p style={{ marginTop: '32px' }}>The global landscape of carbon pricing is expanding rapidly, with more countries and regions implementing Emissions Trading Systems (ETS) or direct carbon taxes. This creates a financial liability for companies with high emissions, making decarbonization a core business imperative rather than just a corporate social responsibility goal. Understanding the specific mechanisms in the regions where you operate is crucial for risk management.</p>

          <p>Furthermore, leading companies are not waiting for regulation; they are implementing internal carbon pricing (shadow pricing) to guide investment decisions. By factoring a hypothetical cost of carbon into capital expenditure requests, they can ensure that new projects are viable in a low-carbon economy. This future-proofs the business and accelerates the transition to cleaner technologies.</p>

          <p>As carbon prices continue to rise, businesses must integrate carbon costs into their financial planning. This guide helps organizations navigate the complex landscape of carbon pricing and identify opportunities for competitive advantage by being more carbon-efficient than their peers.</p>
        </div>
      );
    }

    // Specific content for "Decarbonizing Heavy Industry"
    if (item.title === 'Decarbonizing Heavy Industry') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            A deep dive into the challenges and solutions for reducing emissions in hard-to-abate sectors.
          </p>
          <p>Heavy industries like steel, cement, and chemicals are responsible for a significant portion of global emissions. Decarbonizing these sectors is challenging due to high-temperature heat requirements and process emissions.</p>

          <h3 id="key-highlights" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Key Highlights</h3>

          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <li>
              <strong>Green Hydrogen</strong>: The role of green hydrogen as a reducing agent in steelmaking and a fuel source.
            </li>
            <li>
              <strong>Carbon Capture & Storage (CCS)</strong>: How CCS can capture unavoidable process emissions in cement production.
            </li>
            <li>
              <strong>Electrification of Heat</strong>: Transitioning from fossil fuels to renewable electricity for industrial heat.
            </li>
          </ul>

          <p style={{ marginTop: '32px' }}>The challenge of decarbonizing heavy industry lies in the high-temperature heat required for processes and the inherent chemical reactions that release CO2. For example, in cement production, the majority of emissions come from the calcination process itself, not just the energy used. Therefore, simply switching to renewable electricity is not enough; process innovations are required.</p>

          <p>Technologies like green hydrogen and Carbon Capture, Utilization, and Storage (CCUS) are critical to this transition. Green hydrogen can replace fossil fuels in steelmaking, while CCUS can capture emissions from cement kilns. However, these technologies are still scaling up and require significant investment and policy support to become commercially viable. Collaborative efforts between industry and government are essential to accelerate their deployment.</p>

          <p>While the transition is difficult, it is essential for meeting climate goals. This guide explores the technologies and policies that can enable heavy industry to transition to a low-carbon future, highlighting case studies of early adopters who are proving that zero-carbon steel and cement are possible.</p>
        </div>
      );
    }

    // Specific content for "Innovations in Carbon Capture"
    if (item.title === 'Innovations in Carbon Capture') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            An overview of the latest technologies in carbon capture, utilization, and storage.
          </p>
          <p>Carbon capture technology is advancing rapidly, offering new ways to remove CO2 from industrial processes and even directly from the air. This guide explores the most promising innovations in this field.</p>

          <h3 id="key-highlights" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Key Highlights</h3>

          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <li>
              <strong>Direct Air Capture (DAC)</strong>: Technologies that capture CO2 directly from the atmosphere, enabling negative emissions.
            </li>
            <li>
              <strong>Carbon Utilization</strong>: Turning captured CO2 into useful products like synthetic fuels, building materials, and plastics.
            </li>
            <li>
              <strong>Next-Gen Sorbents</strong>: Advanced materials that make the capture process more energy-efficient and cost-effective.
            </li>
          </ul>

          <p style={{ marginTop: '32px' }}>Direct Air Capture (DAC) is one of the most exciting innovations in this space. Unlike traditional carbon capture, which is installed at point sources like power plants, DAC systems can remove CO2 directly from the ambient air. This allows them to address legacy emissions and emissions from diffuse sources like transportation. While currently expensive, costs are expected to fall as the technology scales.</p>

          <p>In addition to capture, focus is shifting to utilization—finding ways to use captured CO2 as a feedstock for valuable products. This creates a circular economy for carbon. From producing synthetic aviation fuels to curing concrete, innovations in carbon utilization are creating economic incentives for capture and storage, making the transition more financially viable.</p>

          <p>As these technologies scale, they will play a critical role in balancing residual emissions and achieving global climate goals. This guide provides a look at the cutting edge of carbon capture innovation and the companies leading the charge.</p>
        </div>
      );
    }

    // Specific content for "Understanding Carbon Credits and Offsets"
    if (item.title === 'Understanding Carbon Credits and Offsets') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            A comprehensive guide to the voluntary and compliance carbon markets.
          </p>
          <p>Carbon credits and offsets are complex instruments used to compensate for emissions. This guide demystifies the market and explains how businesses can use them effectively.</p>

          <h3 id="key-highlights" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Key Highlights</h3>

          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <li>
              <strong>Credits vs Offsets</strong>: Understanding the distinction between avoidance credits and removal offsets.
            </li>
            <li>
              <strong>Quality Criteria</strong>: How to assess the additionality, permanence, and verifiability of carbon projects.
            </li>
            <li>
              <strong>Strategic Use</strong>: Integrating offsets into a broader science-based reduction strategy.
            </li>
          </ul>

          <p style={{ marginTop: '32px' }}>The voluntary carbon market has faced scrutiny regarding the quality and integrity of credits. To ensure that offsets represent real, additional, and permanent emission reductions, buyers must conduct thorough due diligence. This includes looking for projects certified by reputable standards like Gold Standard or Verra and understanding the methodology used to calculate reductions.</p>

          <p>It is also important to recognize that offsets are not a replacement for internal reductions. The mitigation hierarchy dictates that companies should first measure emissions, then avoid and reduce as much as possible, and only use offsets for the residual emissions that cannot be eliminated. Used correctly, high-quality offsets can accelerate global climate action by funding projects in developing regions.</p>

          <p>While reduction should always come first, high-quality offsets play a role in addressing residual emissions. This guide provides the knowledge needed to navigate the carbon market with confidence and integrity.</p>
        </div>
      );
    }

    // Specific content for "The Role of AI in Net Zero Planning"
    if (item.title === 'The Role of AI in Net Zero Planning') {
      return (
        <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
            How artificial intelligence is accelerating the transition to net-zero emissions.
          </p>
          <p>Artificial Intelligence (AI) is proving to be a powerful tool in the fight against climate change. This paper explores how AI can optimize energy systems, predict emissions, and accelerate innovation.</p>

          <h3 id="key-highlights" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Key Highlights</h3>

          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <li>
              <strong>Predictive Analytics</strong>: Using AI to forecast energy demand and optimize renewable energy integration.
            </li>
            <li>
              <strong>Emissions Modeling</strong>: Simulating the impact of different reduction strategies to identify the most effective path.
            </li>
            <li>
              <strong>Supply Chain Optimization</strong>: Leveraging AI to reduce waste and emissions across complex global supply chains.
            </li>
          </ul>

          <p style={{ marginTop: '32px' }}>AI's ability to process vast amounts of data and identify complex patterns makes it ideal for optimizing complex systems. In energy management, AI can predict energy demand based on weather patterns and historical usage, allowing for more efficient integration of renewable energy sources like wind and solar. This reduces reliance on fossil-fuel-powered 'peaker' plants.</p>

          <p>In addition, AI can accelerate material science innovation. For example, machine learning models can simulate millions of chemical compounds to identify new materials for more efficient batteries or carbon capture sorbents. This drastically reduces the time and cost of research and development, bringing critical climate technologies to market faster.</p>

          <p>By combining AI with domain expertise, organizations can make faster, more informed decisions on their journey to net zero. This guide outlines the key applications and considerations for AI in sustainability.</p>
        </div>
      );
    }

    switch (item.type) {
      case 'Guide':
        return (
          <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
            <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
              This guide provides a practical, step-by-step framework for implementing <strong>{item.title}</strong> in your organization.
            </p>

            <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Introduction</h3>
            <p>The landscape of corporate sustainability is undergoing a massive transformation. As organizations worldwide commit to net-zero goals, understanding the specific impacts and methodologies related to {item.title.toLowerCase()} becomes paramount.</p>

            {/* Flowchart/Diagram */}
            <h3 id="core-principles" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Operational Flowchart</h3>
            <div className="diagram-container" style={{ margin: '32px 0', display: 'flex', gap: 15, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '140px' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>1. Collection</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Automated telemetry</div>
              </div>
              <ArrowRight size={20} color="#94a3b8" />
              <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '140px' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>2. Analysis</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>AI-driven insights</div>
              </div>
              <ArrowRight size={20} color="#94a3b8" />
              <div style={{ background: '#059669', padding: '16px 20px', borderRadius: '8px', color: '#fff', textAlign: 'center', minWidth: '140px' }}>
                <div style={{ fontWeight: 700 }}>3. Action</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Reduction initiatives</div>
              </div>
            </div>

            <h3 id="implementation" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Implementation Strategy</h3>
            <p>Implementation requires a phased approach. The table below outlines the recommended timeline and key deliverables for integrating these frameworks into your existing operations.</p>

            {/* Table */}
            <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Phase</th>
                    <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Timeline</th>
                    <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Key Deliverable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Phase 1</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>Months 1-3</td>
                    <td style={{ padding: '12px 16px', color: '#334155' }}>Baseline assessment and stakeholder alignment.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Phase 2</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>Months 4-6</td>
                    <td style={{ padding: '12px 16px', color: '#334155' }}>System integration and automated data pipelines.</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Phase 3</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>Ongoing</td>
                    <td style={{ padding: '12px 16px', color: '#334155' }}>Continuous optimization and public disclosure.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 id="measuring-success" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Measuring Success</h3>
            <p>Success in carbon reduction initiatives must be measurable. Organizations should establish key performance indicators (KPIs) that track progress against their specific goals.</p>

            {/* Chart */}
            <div style={{ margin: '32px 0', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '30px', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                  <div style={{ width: '100%', height: '120px', background: '#cbd5e1', borderRadius: '4px' }}></div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Year 1</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                  <div style={{ width: '100%', height: '70px', background: '#10b981', borderRadius: '4px' }}></div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Year 2</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                  <div style={{ width: '100%', height: '30px', background: '#059669', borderRadius: '4px' }}></div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Year 3</span>
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '16px', margin: '16px 0 0' }}>Fig 1: Typical emission reduction trajectory over 3 years.</p>
            </div>
          </div>
        );
      case 'Whitepaper':
        return (
          <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
            <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
              Technical research and deep-dive analysis on <strong>{item.title}</strong>.
            </p>

            <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Abstract</h3>
            <p>This whitepaper explores the technical challenges and solutions associated with {item.title.toLowerCase()}. We analyze data from over 100 enterprise deployments to identify best practices and emerging trends.</p>

            {/* Table */}
            <h3 id="core-principles" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Data Matrix</h3>
            <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Metric</th>
                    <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Before</th>
                    <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>After</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Carbon Intensity</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>120 g/kWh</td>
                    <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>45 g/kWh</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Data Accuracy</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>75%</td>
                    <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 600 }}>98%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Diagram */}
            <h3 id="implementation" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>System Architecture</h3>
            <div style={{ margin: '32px 0', display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0', width: '120px', textAlign: 'center' }}>
                <div style={{ fontWeight: 700 }}>Sensors</div>
              </div>
              <ArrowRight size={20} color="#94a3b8" />
              <div style={{ background: '#0f172a', padding: 20, borderRadius: 12, color: '#fff', width: '120px', textAlign: 'center' }}>
                <div style={{ fontWeight: 700 }}>Hub</div>
              </div>
              <ArrowRight size={20} color="#94a3b8" />
              <div style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0', width: '120px', textAlign: 'center' }}>
                <div style={{ fontWeight: 700 }}>Analytics</div>
              </div>
            </div>

            <h3 id="measuring-success" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Impact Analysis</h3>
            <p>The research concludes that implementing advanced analytics can reduce carbon footprint by up to 30% within the first year.</p>

            {/* Chart */}
            <div style={{ margin: '32px 0', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '30px', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                  <div style={{ width: '100%', height: '100px', background: '#3b82f6', borderRadius: '4px' }}></div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Base</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                  <div style={{ width: '100%', height: '40px', background: '#ef4444', borderRadius: '4px' }}></div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Optimized</span>
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '16px', margin: '16px 0 0' }}>Fig 2: Cost comparison before and after optimization.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="detail-content" style={{ fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
            <p style={{ fontSize: 18, color: '#1e293b', marginBottom: 20, fontWeight: 500 }}>
              An in-depth analysis of how <strong>{item.title}</strong> is shaping the future of sustainability and carbon management.
            </p>

            <h3 id="introduction" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Introduction</h3>
            <p>{getVariation(item.title, 'introduction')}</p>
            <p>In today's rapidly evolving corporate landscape, understanding these dynamics is no longer optional. It is a critical component of strategic planning and risk management.</p>

            <h3 id="core-principles" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Core Principles</h3>
            <p>{getVariation(item.title, 'corePrinciples')}</p>

            {/* Flowchart/Diagram */}
            <div className="diagram-container" style={{ margin: '32px 0', display: 'flex', gap: 15, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '140px' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>1. Collection</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Automated telemetry</div>
              </div>
              <ArrowRight size={20} color="#94a3b8" />
              <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', minWidth: '140px' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>2. Analysis</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>AI-driven insights</div>
              </div>
              <ArrowRight size={20} color="#94a3b8" />
              <div style={{ background: '#059669', padding: '16px 20px', borderRadius: '8px', color: '#fff', textAlign: 'center', minWidth: '140px' }}>
                <div style={{ fontWeight: 700 }}>3. Action</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Reduction initiatives</div>
              </div>
            </div>

            <h3 id="implementation" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Implementation Strategy</h3>
            <p>{getVariation(item.title, 'implementation')}</p>

            {/* Table */}
            <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Phase</th>
                    <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Timeline</th>
                    <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 600 }}>Key Deliverable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Phase 1</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>Months 1-3</td>
                    <td style={{ padding: '12px 16px', color: '#334155' }}>Baseline assessment and stakeholder alignment.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Phase 2</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>Months 4-6</td>
                    <td style={{ padding: '12px 16px', color: '#334155' }}>System integration and automated data pipelines.</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>Phase 3</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>Ongoing</td>
                    <td style={{ padding: '12px 16px', color: '#334155' }}>Continuous optimization and public disclosure.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 id="measuring-success" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Measuring Success</h3>
            <p>{getVariation(item.title, 'measuringSuccess')}</p>

            {/* Chart */}
            <div style={{ margin: '32px 0', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '30px', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                  <div style={{ width: '100%', height: '120px', background: '#cbd5e1', borderRadius: '4px' }}></div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Year 1</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                  <div style={{ width: '100%', height: '70px', background: '#10b981', borderRadius: '4px' }}></div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Year 2</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '60px' }}>
                  <div style={{ width: '100%', height: '30px', background: '#059669', borderRadius: '4px' }}></div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Year 3</span>
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '16px', margin: '16px 0 0' }}>Fig 1: Typical emission reduction (MT CO2e) trajectory over 3 years.</p>
            </div>

            <h3 id="future-outlook" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Future Outlook</h3>
            <p>{getVariation(item.title, 'futureOutlook')}</p>

            <h3 id="conclusion" style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 32, marginBottom: 16 }}>Conclusion</h3>
            <p>{getVariation(item.title, 'conclusion')}</p>
          </div>
        );
    }
  };

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      if (active === 'All' && item.hideFromAll) return false;
      const matchesCategory = active === 'All' || item.type === active;
      const matchesTag = activeTag === 'All' || item.tag === activeTag;
      const matchesSearch = `${item.title} ${item.desc} ${item.tag}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [active, activeTag, query]);

  const groupedResources = useMemo(() => {
    if (active !== 'All') return { [active]: filteredResources };

    const groups: Record<string, Resource[]> = {};
    categories.forEach(cat => {
      if (cat !== 'All') groups[cat] = [];
    });

    filteredResources.forEach((item) => {
      if (groups[item.type]) {
        groups[item.type].push(item);
      }
    });

    return Object.fromEntries(Object.entries(groups).filter(([_, items]) => items.length > 0));
  }, [filteredResources, active]);

  return (
    <main className="page-shell">
      {active === 'All' && (
        <>
          <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
            <style>{`
              .stat-card {
                background: rgba(255, 255, 255, 0.75) !important;
                backdrop-filter: blur(16px) !important;
                -webkit-backdrop-filter: blur(16px) !important;
                border: 1px solid rgba(226, 232, 240, 0.6) !important;
                border-radius: 20px !important;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
              }
              .stat-card:hover {
                transform: translateY(-6px) !important;
                box-shadow: 0 20px 40px -12px rgba(5, 150, 105, 0.12), 0 8px 16px -4px rgba(0,0,0,0.04) !important;
                border-color: rgba(16, 185, 129, 0.25) !important;
              }
            `}</style>
            <div className="hero-bg" />
            <div className="glow-orb" style={{ position: 'absolute', top: '-80px', right: '-60px', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div className="glow-orb" style={{ position: 'absolute', top: '120px', left: '-80px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', animationDelay: '2s' }} />
            <div className="glow-orb" style={{ position: 'absolute', bottom: '-40px', left: '50%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', animationDelay: '4s' }} />

            <div className="container hero-content" style={{ position: 'relative', zIndex: 1, padding: '20px 20px 60px' }}>
              <div
                className="hero-copy"
                style={{ textAlign: 'center', marginBottom: '50px' }}
              >
                <div className="eyebrow" style={{ background: 'rgba(5, 150, 105, 0.08)', border: '1px solid rgba(5, 150, 105, 0.18)', backdropFilter: 'blur(8px)', color: '#047857', padding: '8px 20px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, marginBottom: '24px', letterSpacing: '0.02em' }}>
                  <Sparkles size={15} /> CarbonSynq Knowledge Hub
                </div>
                <h1 style={{ fontSize: '52px', fontWeight: 800, color: '#0f172a', marginBottom: '18px', lineHeight: 1.08, letterSpacing: '-0.03em' }}>Resources for a smarter <span style={{ background: 'linear-gradient(135deg, #059669, #0d9488, #0891b2)', backgroundSize: '200% 200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>net zero journey.</span></h1>
                <p style={{ fontSize: '17px', color: '#64748b', maxWidth: '620px', margin: '0 auto 32px', lineHeight: 1.7, letterSpacing: '0.01em' }}>
                  Premium guides, whitepapers, templates, and case studies to help your business measure emissions,
                  reduce carbon impact, and report progress with confidence.
                </p>
                <div className="hero-actions" style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
                  <a className="btn btn-dark" href="#library" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', padding: '14px 28px', borderRadius: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.35s', boxShadow: '0 4px 14px rgba(15, 23, 42, 0.2)' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(15, 23, 42, 0.25)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(15, 23, 42, 0.2)'; }}>Explore Library <ArrowRight size={18} /></a>
                  <a className="btn btn-light" href="/book-demo" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(226, 232, 240, 0.8)', color: '#0f172a', padding: '14px 28px', borderRadius: '14px', fontWeight: 600, cursor: 'pointer', textDecoration: 'none', transition: 'all 0.35s', backdropFilter: 'blur(8px)' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.06)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)'; e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>Book a Demo</a>
                </div>
              </div>

              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="stat-card"
                      style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(226, 232, 240, 0.6)', borderRadius: '20px', padding: '26px', display: 'flex', alignItems: 'center', gap: '16px', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    >
                      <div className="icon-box" style={{ background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.12), rgba(20, 184, 166, 0.08))', color: '#059669', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}><Icon size={24} /></div>
                      <div>
                        <strong style={{ fontSize: '28px', color: '#0f172a', fontWeight: 800, display: 'block', letterSpacing: '-0.02em' }}>{stat.value}</strong>
                        <p style={{ fontSize: '14px', color: '#64748b', margin: 0, fontWeight: 500 }}>{stat.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

        </>
      )}

      <section id="library" className="library-section">
        <div className={`container library-shell ${active !== 'All' ? 'category-page' : ''} ${(activeResource?.title === 'What is Australian Sustainability Reporting' || activeResource?.title === 'The Future of ESG Reporting with CarbonSynq' || activeResource?.title === 'Data-Driven Sustainability Insights' || activeResource?.title === 'The Future of Carbon Pricing' || activeResource?.title === 'Decarbonizing Heavy Industry' || activeResource?.title === 'Innovations in Carbon Capture' || activeResource?.title === 'Understanding Carbon Credits and Offsets' || activeResource?.title === 'The Role of AI in Net Zero Planning') ? 'no-sidebar' : ''}`}>
          {activeResource?.title !== 'What is Australian Sustainability Reporting' && activeResource?.title !== 'The Future of ESG Reporting with CarbonSynq' && activeResource?.title !== 'Data-Driven Sustainability Insights' && activeResource?.title !== 'The Future of Carbon Pricing' && activeResource?.title !== 'Decarbonizing Heavy Industry' && activeResource?.title !== 'Innovations in Carbon Capture' && activeResource?.title !== 'Understanding Carbon Credits and Offsets' && activeResource?.title !== 'The Role of AI in Net Zero Planning' && (
            <aside className="sidebar" style={{
              marginTop: activeResource?.title === 'Regulatory Compliance Playbook 2026' ? '150px' : '80px',
              alignSelf: 'stretch'
            }}>
              {activeResource ? (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <button
                      onClick={() => handleCategoryChange('All')}
                      style={{ background: 'transparent', border: 'none', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '14px' }}
                    >
                      ← Back to Library
                    </button>
                  </div>
                  <div className="filter-section" style={{ background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', position: 'sticky', top: '100px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>ON THIS PAGE</span>
                    </div>

                    <nav className="sidebar-nav" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {getSidebarItems(activeResource.title).map((item, index) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setMainActiveSection(item.id);
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          style={{
                            fontSize: '14px',
                            fontWeight: mainActiveSection === item.id ? 700 : 500,
                            color: mainActiveSection === item.id ? '#0f172a' : '#64748b',
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 16px',
                            background: mainActiveSection === item.id ? '#f1f5f9' : 'transparent',
                            borderRadius: '12px',
                            borderLeft: mainActiveSection === item.id ? '3px solid #059669' : '3px solid transparent',
                          }}
                          onMouseOver={(e) => {
                            if (mainActiveSection !== item.id) {
                              e.currentTarget.style.color = '#0f172a';
                              e.currentTarget.style.background = '#f8fafc';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (mainActiveSection !== item.id) {
                              e.currentTarget.style.color = '#64748b';
                              e.currentTarget.style.background = 'transparent';
                            }
                          }}
                        >
                          <span>{item.label}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </>
              ) : (
                <>
                  <div className="filter-section" style={{ background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>ON THIS PAGE</span>
                    </div>
                    <nav className="sidebar-nav" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {[
                        { id: 'featured', label: 'Featured Resource' },
                        { id: 'library', label: 'Resource Library' },
                      ].map(item => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => { e.preventDefault(); setMainActiveSection(item.id); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                          style={{
                            fontSize: '14px',
                            fontWeight: mainActiveSection === item.id ? 700 : 500,
                            color: mainActiveSection === item.id ? '#0f172a' : '#64748b',
                            textDecoration: 'none',
                            padding: '8px 16px',
                            borderRadius: '12px',
                            background: mainActiveSection === item.id ? '#f1f5f9' : 'transparent',
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                            borderLeft: mainActiveSection === item.id ? '3px solid #059669' : '3px solid transparent',
                          }}
                          onMouseOver={(e) => { if (mainActiveSection !== item.id) { e.currentTarget.style.color = '#0f172a'; e.currentTarget.style.background = '#f8fafc'; } }}
                          onMouseOut={(e) => { if (mainActiveSection !== item.id) { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent'; } }}
                        >
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="search-box sidebar-search">
                    <Search size={20} />
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search resources..." />
                  </div>

                  <nav className="sidebar-nav">
                    {categories.map((category) => {
                      const Icon = category === 'All' ? Globe2 :
                        category === 'Guide' ? BookOpen :
                          category === 'Whitepaper' ? FileText :
                            category === 'Article' ? FileSearch : Video;
                      return (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={active === category ? 'active' : ''}
                          style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                        >
                          <Icon size={16} />
                          {category}
                        </button>
                      );
                    })}
                  </nav>

                  <div className="sidebar-separator" />

                  <div className="filter-section">
                    <h3>FILTER BY</h3>
                    <div className="filter-chips">
                      {['All', 'Net Zero', 'Carbon Data', 'Analytics', 'Company News', 'Partnerships', 'Awards'].map((tag) => (
                        <button key={tag} onClick={() => setActiveTag(tag)} className={activeTag === tag ? 'active' : ''}>
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </aside>
          )}

          <div className="library-content">
            {activeResource ? (
              <div className="resource-detail" style={{ padding: '20px 0' }}>
                {(activeResource.title === 'What is Australian Sustainability Reporting' || activeResource.title === 'The Future of ESG Reporting with CarbonSynq' || activeResource.title === 'Data-Driven Sustainability Insights' || activeResource.title === 'The Future of Carbon Pricing' || activeResource.title === 'Decarbonizing Heavy Industry' || activeResource.title === 'Innovations in Carbon Capture' || activeResource.title === 'Understanding Carbon Credits and Offsets' || activeResource.title === 'The Role of AI in Net Zero Planning') && (
                  <div style={{ marginBottom: 24 }}>
                    <button
                      onClick={() => handleCategoryChange('All')}
                      style={{ background: 'transparent', border: 'none', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '14px' }}
                    >
                      ← Back to Library
                    </button>
                  </div>
                )}
                <div className="breadcrumbs" style={{ marginBottom: 16 }}>
                  <span style={{ color: '#059669', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>RESOURCES / {activeResource.type.toUpperCase() === 'NEWSROOM' ? 'NEWSROOM' : activeResource.type.toUpperCase() + 'S'}</span>
                </div>

                {/* Download and Share Options */}
                {/* Download and Share Options */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
                  <button
                    onClick={() => handleDownloadResource(activeResource)}
                    style={{
                      background: 'rgba(5, 150, 105, 0.1)',
                      border: '1px solid rgba(5, 150, 105, 0.2)',
                      color: '#047857',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                      fontSize: '13px',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(5, 150, 105, 0.15)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(5, 150, 105, 0.1)'; }}
                  >
                    <Download size={14} /> Download
                  </button>

                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setShowShareDropdown(!showShareDropdown)}
                      style={{
                        background: '#f1f5f9',
                        border: '1px solid #e2e8f0',
                        color: '#475569',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        cursor: 'pointer',
                        fontSize: '13px',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.background = '#e2e8f0'; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
                    >
                      <Share2 size={14} /> Share
                    </button>
                    {showShareDropdown && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', zIndex: 10, minWidth: '140px', marginTop: '8px', overflow: 'hidden' }}>
                        <button onClick={() => handleShareResource(activeResource, 'twitter')} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 16px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#334155', textAlign: 'left', fontWeight: 600 }}>
                          <span style={{ fontWeight: 700 }}>𝕏</span> Twitter
                        </button>
                        <button onClick={() => handleShareResource(activeResource, 'linkedin')} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 16px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#334155', textAlign: 'left', fontWeight: 600 }}>
                          <span style={{ fontWeight: 700, color: '#0077b5' }}>in</span> LinkedIn
                        </button>
                        <button onClick={() => handleShareResource(activeResource, 'facebook')} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 16px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', color: '#334155', textAlign: 'left', fontWeight: 600 }}>
                          <span style={{ fontWeight: 700, color: '#1877f2' }}>f</span> Facebook
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 16, textAlign: 'left' }}>{activeResource.title}</h1>
                <div className="meta" style={{ display: 'flex', gap: 16, color: '#64748b', fontSize: 14, marginBottom: 32 }}>
                  <span>{activeResource.read || '5 min read'}</span>
                  <span>{activeResource.tag}</span>
                  <span>{(activeResource as any).date || 'May 8, 2026'}</span>
                </div>
                {activeResource.image && (
                  <div className="detail-image" style={{ width: '100%', height: 350, borderRadius: 16, overflow: 'hidden', marginBottom: 32 }}>
                    <img src={activeResource.image} alt={activeResource.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                {renderResourceContent(activeResource)}
                <div className="detail-section-divider" style={{ margin: '40px 0', height: '1px', background: '#e2e8f0' }} />
                <InlineCTAs onDownload={() => handleDownloadResource(activeResource)} type={activeResource.type} />
              </div>
            ) : (
              <>
                {active === 'All' && (
                  <>
                    <div id="featured" className="featured-section" style={{ marginBottom: 60 }}>
                      <div className="section-heading" style={{ marginBottom: 30, paddingBottom: 16, borderBottom: '1px solid #e2e8f0' }}>
                        <div>
                          <h2 style={{ fontSize: 28, margin: 0 }}>Featured Resource</h2>
                        </div>
                      </div>
                      
                      {(() => {
                        const featuredItem = resources.find(r => r.title === 'The Blueprint for Scope 3 Data Collection') || resources[0];
                        return (
                          <article 
                            className={`resource-card ${featuredItem.accent || 'accent-emerald'}`} 
                            onClick={() => handleResourceClick(featuredItem)}
                            style={{ 
                              cursor: 'pointer', 
                              display: 'flex', 
                              flexDirection: 'row', 
                              alignItems: 'stretch',
                              gap: '0',
                              padding: '0',
                              background: '#fff',
                              borderRadius: '24px',
                              boxShadow: '0 20px 40px -12px rgba(0,0,0,0.1)',
                              border: '1px solid #e2e8f0',
                              transition: 'transform 0.3s, box-shadow 0.3s',
                              overflow: 'hidden'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = 'translateY(-4px)';
                              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.15)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(0,0,0,0.1)';
                            }}
                          >
                            {featuredItem.image && (
                              <div style={{ flex: '1', minHeight: '320px', minWidth: '300px' }}>
                                <img src={featuredItem.image} alt={featuredItem.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                            )}
                            <div style={{ flex: '1.2', display: 'flex', flexDirection: 'column', gap: '16px', padding: '40px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ background: '#ecfdf5', color: '#059669', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                                  {featuredItem.type}
                                </span>
                                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{featuredItem.tag}</span>
                              </div>
                              <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>{featuredItem.title}</h3>
                              <p style={{ fontSize: '16px', color: '#475569', margin: 0, lineHeight: 1.6 }}>{featuredItem.desc}</p>
                              
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto', paddingTop: '16px' }}>
                                <CarbonSynqLogoSticker size={32} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>CarbonSynq</span>
                                  <span style={{ fontSize: '12px', color: '#64748b' }}>{featuredItem.read || '5 min read'}</span>
                                </div>
                              </div>
                            </div>
                          </article>
                        );
                      })()}
                    </div>

                    <div id="library" className="section-heading" style={{ marginBottom: 40, textAlign: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '100%' }}>
                        <small style={{ display: 'block', marginBottom: 8 }}>Resource Library</small>
                        <h2 style={{ margin: 0 }}>Curated insights for carbon teams</h2>
                      </div>
                    </div>
                  </>
                )}

                {active !== 'All' && (
                  <>
                    <div className="breadcrumbs" style={{ textAlign: 'center', marginBottom: 8 }}>
                      <span style={{ color: '#059669', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>RESOURCES / {active.toUpperCase() === 'NEWSROOM' ? 'NEWSROOM' : active.toUpperCase() + 'S'}</span>
                    </div>
                    <h1 style={{ textAlign: 'center', fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 32 }}>
                      {active === 'Newsroom' ? 'Newsroom' : active + 's'}
                    </h1>
                  </>
                )}

                {/* Mobile filter trigger */}
                <button
                  className="mobile-filter-trigger"
                  onClick={() => setShowMobileFilters(true)}
                >
                  <Search size={16} />
                  {query || 'Search and filter resources...'}
                  <span style={{ marginLeft: 'auto', fontSize: 12, color: '#94a3b8' }}>
                    {active !== 'All' ? active : activeTag !== 'All' ? activeTag : ''}
                  </span>
                </button>

                {/* Mobile filter drawer */}
                <div className={`mobile-filter-overlay ${showMobileFilters ? 'open' : ''}`} onClick={() => setShowMobileFilters(false)} />
                <div className={`mobile-filter-drawer ${showMobileFilters ? 'open' : ''}`}>
                  <div className="drawer-handle" />
                  <div className="search-box" style={{ width: '100%', marginBottom: 20 }}>
                    <Search size={20} />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search resources..."
                      style={{ padding: '12px 0' }}
                    />
                  </div>
                  <h3>Categories</h3>
                  <div className="filter-chips" style={{ marginBottom: 24 }}>
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={active === category ? 'active' : ''}
                        onClick={() => { handleCategoryChange(category); setShowMobileFilters(false); }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <h3>Filter by Tag</h3>
                  <div className="filter-chips">
                    {['All', 'Net Zero', 'Carbon Data', 'Analytics', 'Company News', 'Partnerships', 'Awards'].map((tag) => (
                      <button
                        key={tag}
                        className={activeTag === tag ? 'active' : ''}
                        onClick={() => { setActiveTag(tag); }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <button className="apply-btn" onClick={() => setShowMobileFilters(false)} style={{ marginTop: 20 }}>
                    Apply Filters
                  </button>
                </div>

                {Object.entries(groupedResources).map(([type, items]) => (
                  <div key={type} className="resource-group" style={{ marginBottom: active === 'All' ? 80 : 0 }}>
                    {active === 'All' && (
                      <div className="section-heading" style={{ marginBottom: 30, paddingBottom: 16, borderBottom: '1px solid #e2e8f0' }}>
                        <div>
                          <h2 style={{ fontSize: 28, margin: 0 }}>
                            {type === 'Newsroom' ? 'Newsroom' : type + 's'}
                          </h2>
                        </div>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleCategoryChange(type);
                          }}
                          className="view-all"
                        >
                          View all
                        </a>
                      </div>
                    )}

                    <div className="resource-grid">
                      {items.map((item, index) => (
                        item.logoText ? (
                          <article
                            key={`${item.title}-${index}`}
                            className={`resource-card ${item.accent}`}
                            onClick={() => handleResourceClick(item)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="card-logo-text" style={{ color: item.logoColor || '#333' }}>
                              {item.logoText}
                            </div>
                            <div className="card-content">
                              <div className="card-line" />
                              <div className="resource-top">
                                <div className="resource-icon">{React.createElement(item.icon, { size: 25 })}</div>
                              </div>
                              <small>{item.tag}</small>
                              <h3>{item.title}</h3>
                              <p>{item.desc}</p>
                              <div className="resource-bottom">
                                <div className="author-info">
                                  <CarbonSynqLogoSticker size={30} className="author-icon" />
                                  <span className="author-name">CarbonSynq</span>
                                  <span className="dot">•</span>
                                  <span className="date">{item.type === 'Newsroom' && item.read && !item.read.includes('Read') ? item.read : 'May 8, 2026'}</span>
                                </div>
                              </div>
                            </div>
                          </article>
                        ) : (
                          <article
                            key={`${item.title}-${index}`}
                            className={`resource-card ${item.accent}`}
                            onClick={() => handleResourceClick(item)}
                            style={{ cursor: 'pointer' }}
                          >
                            {item.image && (
                              <div className="card-image">
                                <img src={item.image} alt={item.title} />
                              </div>
                            )}
                            <div className="card-content">
                              <div className="card-line" />
                              <div className="resource-top">
                                <div className="resource-icon">{React.createElement(item.icon, { size: 25 })}</div>
                                <span>{item.type}</span>
                              </div>
                              <small>{item.tag}</small>
                              <h3>{item.title}</h3>
                              <p>{item.desc}</p>
                              <div className="resource-bottom">
                                <div className="author-info">
                                  <CarbonSynqLogoSticker size={30} className="author-icon" />
                                  <span className="author-name">CarbonSynq</span>
                                  <span className="dot">•</span>
                                  <span className="date">{item.read}</span>
                                </div>
                              </div>
                            </div>
                          </article>
                        )
                      ))}
                    </div>
                  </div>
                ))}

                {Object.keys(groupedResources).length === 0 && (
                  <div className="empty-state">
                    <FileSearch size={54} strokeWidth={1.5} className="empty-icon" />
                    <h3>No {active === 'All' ? 'resources' : active === 'Newsroom' ? 'news' : active.toLowerCase() + 's'} found</h3>
                    <p>Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>


      {showArticleDetail && articleDetailResource && (
        <ArticleDetail
          resource={articleDetailResource}
          onClose={() => {
            setShowArticleDetail(false);
            setArticleDetailResource(null);
            window.history.pushState({}, '', '/platform/resources');
          }}
          onDownload={() => handleDownloadResource(articleDetailResource)}
        />
      )}
    </main>
  );
}
