import type {
  Problem,
  WorkflowStep,
  ScopeData,
  OperationCard,
  ArchitectureLayer,
  AICapability,
  Integration,
  RoadmapPhase,
} from '../types'

export const problems: Problem[] = [
  {
    icon: 'Database',
    title: 'Fragmented Data',
    description:
      'Carbon information exists across invoices, spreadsheets, ERP systems, suppliers, and logistics partners.',
  },
  {
    icon: 'Calculator',
    title: 'Manual Calculations',
    description:
      'Sustainability teams spend weeks manually calculating emissions across the value chain.',
  },
  {
    icon: 'Clock',
    title: 'No Real-Time Tracking',
    description:
      'Organizations lack continuous visibility into carbon performance and emission trends.',
  },
  {
    icon: 'ShieldAlert',
    title: 'Compliance Pressure',
    description:
      'Increasing ESG, BRSR, CBAM, and regulatory reporting requirements demand accurate data.',
  },
]

export const workflowSteps: WorkflowStep[] = [
  {
    icon: 'FileInput',
    title: 'Data Collection',
    description: 'Ingest emissions data from invoices, ERP, IoT, and supplier systems.',
  },
  {
    icon: 'Brain',
    title: 'AI Processing',
    description: 'Our AI cleans, classifies, and enriches raw carbon data automatically.',
  },
  {
    icon: 'Layers',
    title: 'Scope Classification',
    description: 'Emissions are auto-classified into Scope 1, 2, or 3 categories.',
  },
  {
    icon: 'Sigma',
    title: 'Emission Calculation',
    description: 'Apply emission factors and calculate carbon footprint across sources.',
  },
  {
    icon: 'FileText',
    title: 'Compliance Reporting',
    description: 'Generate ESG, BRSR, CBAM, GRI, and CDP compliant reports instantly.',
  },
  {
    icon: 'TrendingDown',
    title: 'Reduction Insights',
    description: 'AI recommends actionable strategies to reduce carbon emissions.',
  },
]

export const scopeData: Record<string, ScopeData> = {
  scope1: {
    title: 'Scope 1',
    subtitle: 'Direct Emissions',
    description: 'Owned or controlled emission sources including company vehicles, fuel combustion, generators, and refrigerants.',
    dataInputs: ['Fuel logs', 'Invoices', 'IoT sensors', 'Manual records'],
    formula: 'Emission = Activity Data × Emission Factor',
    features: ['Asset-level tracking', 'Time-series analytics', 'Real-time monitoring', 'Anomaly alerts'],
  },
  scope2: {
    title: 'Scope 2',
    subtitle: 'Indirect Energy Emissions',
    description: 'Purchased electricity, steam, heating, and cooling from utility providers.',
    dataInputs: ['Utility bills', 'Smart meters'],
    formula: 'kWh × Grid Emission Factor',
    features: ['Bill parsing', 'Renewable adjustments', 'Multi-location tracking', 'Utility analytics'],
    badges: ['Location-Based', 'Market-Based'],
  },
  scope3: {
    title: 'Scope 3',
    subtitle: 'Value Chain Emissions',
    description: 'Covers all major value chain categories including purchased goods, transportation, and business travel.',
    dataInputs: ['Supplier data', 'Spend data', 'Logistics APIs', 'Travel systems'],
    features: [
      'Supplier Portal',
      'Vendor Data Collection',
      'Spend-Based Estimation',
      'Logistics Tracking',
      'Travel Integrations',
      'Lifecycle Assessment',
    ],
    prominent: true,
  },
}

export const operationCards: OperationCard[] = [
  {
    title: 'Supplier Intelligence Hub',
    description: 'Monitor supplier sustainability performance and emissions data in real time.',
    gradient: 'from-emerald-600 to-teal-600',
    icon: 'Network',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  },
  {
    title: 'Logistics Carbon Tracking',
    description: 'Track transportation emissions through distance-based models and logistics integrations.',
    gradient: 'from-teal-600 to-cyan-600',
    icon: 'Truck',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
  },
  {
    title: 'Procurement Insights',
    description: 'Understand carbon impact of purchasing decisions across your supply chain.',
    gradient: 'from-emerald-500 to-green-600',
    icon: 'ShoppingCart',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
  },
]

export const architectureLayers: ArchitectureLayer[] = [
  {
    name: 'Data Ingestion Layer',
    items: ['ERP', 'Invoices', 'IoT', 'Utility Bills', 'Logistics APIs'],
  },
  {
    name: 'Emission Calculation Engine',
    items: ['Activity Data × Emission Factor'],
  },
  {
    name: 'Emission Factor Database',
    items: ['DEFRA', 'EPA', 'GHG Protocol', 'Regional Factors'],
  },
  {
    name: 'Scope Classification Engine',
    items: ['Scope 1', 'Scope 2', 'Scope 3'],
  },
  {
    name: 'Reporting Engine',
    items: ['ESG', 'BRSR', 'CBAM', 'GRI', 'CDP'],
  },
  {
    name: 'Dashboard Layer',
    items: ['Analytics', 'Alerts', 'Reports', 'API Access'],
  },
]

export const aiCapabilities: AICapability[] = [
  {
    title: 'OCR Invoice Extraction',
    description: 'Automatically extract carbon data from invoices and purchase orders.',
    gradient: 'from-violet-600 to-purple-600',
    icon: 'ScanEye',
  },
  {
    title: 'Auto Classification',
    description: 'AI classifies emission sources into correct scope categories.',
    gradient: 'from-blue-600 to-indigo-600',
    icon: 'Tags',
  },
  {
    title: 'Missing Data Prediction',
    description: 'Intelligently predicts missing emission data using historical patterns.',
    gradient: 'from-amber-500 to-orange-600',
    icon: 'Wand2',
  },
  {
    title: 'Anomaly Detection',
    description: 'Detect unusual emission patterns and potential data errors instantly.',
    gradient: 'from-rose-600 to-pink-600',
    icon: 'AlertTriangle',
  },
  {
    title: 'Emission Recommendations',
    description: 'AI suggests reduction strategies based on your emission profile.',
    gradient: 'from-emerald-600 to-green-600',
    icon: 'Lightbulb',
  },
  {
    title: 'AI Insights Engine',
    description: 'Natural language queries for instant carbon intelligence.',
    gradient: 'from-cyan-600 to-teal-600',
    icon: 'Sparkles',
  },
]

export const integrations: Integration[] = [
  {
    category: 'ERP Systems',
    items: ['SAP', 'Oracle', 'Tally'],
  },
  {
    category: 'Logistics APIs',
    items: ['DHL', 'FedEx', 'UPS'],
  },
  {
    category: 'Expense Platforms',
    items: ['Concur', 'Zoho Expense'],
  },
  {
    category: 'Coming Soon',
    items: ['Satellite Verification', 'IoT Monitoring', 'Supplier APIs'],
    future: true,
  },
]

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: 'Phase 1',
    items: ['Scope 1', 'Scope 2', 'Basic Scope 3'],
    status: 'completed',
  },
  {
    phase: 'Phase 2',
    items: ['Supplier Portal', 'Advanced Vendor Collaboration'],
    status: 'current',
  },
  {
    phase: 'Phase 3',
    items: ['Full Scope 3 Intelligence', 'Open APIs'],
    status: 'upcoming',
  },
  {
    phase: 'Phase 4',
    items: ['Carbon Marketplace', 'Advanced AI Optimization'],
    status: 'upcoming',
  },
]

export const complianceFeatures: string[] = [
  'Audit Trail',
  'Traceability',
  'PDF Export',
  'Excel Export',
  'Automated Reports',
  'Dashboard Analytics',
]
