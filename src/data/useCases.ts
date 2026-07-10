export interface UseCaseData {
  id: string;
  name: string;
  subtitle: string;
  iconName: 'Factory' | 'Landmark' | 'GraduationCap' | 'Globe';
  primaryUsers: string[];
  description: string;
  businessChallenges: string[];
  carbonsyncSolution: string[];
  keyBenefits: string[];
}

export const useCases: UseCaseData[] = [
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    subtitle: 'Supply chain & emissions tracking',
    iconName: 'Factory',
    primaryUsers: [
      'Sustainability Managers',
      'Plant Managers',
      'Operations Team'
    ],
    description: 'Manufacturing companies generate emissions from electricity, fuel, logistics, production, and purchased materials. CarbonSync automatically centralizes this data, calculates Scope 1, 2, and 3 emissions, and generates compliance-ready reports.',
    businessChallenges: [
      'Manual invoice collection',
      'Difficult carbon calculations',
      'Lack of centralized data',
      'Slow ESG reporting',
      'Compliance complexity'
    ],
    carbonsyncSolution: [
      'AI-powered invoice processing',
      'Automatic Scope 1, 2 & 3 calculations',
      'Real-time emissions dashboard',
      'ESG & BRSR reporting',
      'Multi-plant monitoring'
    ],
    keyBenefits: [
      'Save 90% manual effort',
      'Real-time visibility',
      'Audit-ready reports',
      'Faster sustainability reporting'
    ]
  },
  {
    id: 'banking-finance',
    name: 'Banking & Finance',
    subtitle: 'Financed emissions & ESG alignment',
    iconName: 'Landmark',
    primaryUsers: [
      'Sustainability Officers',
      'Risk Assessment Teams',
      'Investment Managers'
    ],
    description: 'Financial institutions must track energy usage across branch networks and calculate complex financed emissions (Scope 3 Category 15) to align investment portfolios with net-zero targets and regulatory disclosures.',
    businessChallenges: [
      'Tracking financed emissions (Scope 3 Category 15)',
      'Data collection across massive branch networks',
      'Complex ESG compliance and disclosures',
      'Assessing portfolio carbon exposure risks',
      'Integrating green finance taxonomy'
    ],
    carbonsyncSolution: [
      'Automated portfolio financed emissions calculations',
      'Unified branch energy tracking and utility sync',
      'CSRD, PCAF, and SEC climate-ready reporting',
      'Green finance initiative tracking and scenario modeling',
      'Real-time ESG risk scorecards for investments'
    ],
    keyBenefits: [
      'Audit-ready financed emissions reporting',
      'Streamlined branch data auditing',
      'Mitigated investment carbon risks',
      'Enhanced stakeholder and investor trust'
    ]
  },
  {
    id: 'universities',
    name: 'Universities',
    subtitle: 'Campus footprint & student initiatives',
    iconName: 'GraduationCap',
    primaryUsers: [
      'Campus Sustainability Directors',
      'Facilities & Energy Managers',
      'Student Affairs & Operations Teams'
    ],
    description: 'Universities manage vast campuses with complex footprints spanning electricity consumption, commuter transportation, waste disposal, and water usage. CarbonSync unifies these inputs to drive campus-wide sustainability and education.',
    businessChallenges: [
      'Fragmented utility data across campus buildings',
      'Tracking student, faculty, and staff commuting patterns',
      'Vast waste production and water consumption tracking',
      'Meeting rising student demands for climate action',
      'Manual, time-consuming yearly reporting cycles'
    ],
    carbonsyncSolution: [
      'Campus-wide utility automation & IoT hub',
      'AI-based commuter travel survey analysis',
      'Waste, water, and recycling metrics dashboards',
      'Public-facing sustainability progress dashboards',
      'Student-accessible portals for carbon awareness'
    ],
    keyBenefits: [
      '50% faster campus sustainability auditing',
      'Improved university sustainability rankings (AASHE STARS)',
      'Increased student and faculty engagement',
      'Reduced campus operational and utility costs'
    ]
  },
  {
    id: 'exporters',
    name: 'Exporters',
    subtitle: 'CBAM compliance & global shipping',
    iconName: 'Globe',
    primaryUsers: [
      'Trade Compliance Managers',
      'Supply Chain Directors',
      'Export Logistics Teams'
    ],
    description: 'Exporters face strict international mandates like the Carbon Border Adjustment Mechanism (CBAM). CarbonSync tracks product-level carbon footprints, shipping logistics, and supply chain impacts to ensure seamless international trade.',
    businessChallenges: [
      'Strict CBAM border tax regulation compliance',
      'Calculating precise Product Carbon Footprints (PCF)',
      'Tracking international shipping and logistics emissions',
      'Fragmented supplier and contractor carbon data',
      'Customs clearance delays due to incomplete carbon reporting'
    ],
    carbonsyncSolution: [
      'Automated CBAM reporting and documentation modules',
      'Product Carbon Footprint (PCF) calculation engines',
      'Multi-modal logistics emission trackers',
      'Supplier portal integration for Scope 3 visibility',
      'One-click export customs compliance forms'
    ],
    keyBenefits: [
      'Zero customs clearance delays at borders',
      'Accurate product-level carbon tax declarations',
      'Optimized freight routes for lower logistics footprint',
      'Unrestricted entry to international carbon-regulated markets'
    ]
  }
];
