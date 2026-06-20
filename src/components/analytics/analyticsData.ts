/**
 * Analytics data constants for CarbonSync ESG Console
 * Sourced from carbonsync2-analysis-google app
 */

export type ScopeType = 'GLOBAL' | 'SCOPE1' | 'SCOPE2' | 'SCOPE3';
export type MainCategoryType = 'Production' | 'Supply Chain' | 'Financials' | 'Maintenance' | 'HR';
export type MetricViewType = 'Yield Rate' | 'Cycle Time' | 'Downtime' | 'OEE';

export interface TuningConfig {
  renewablePercent: number;
  fleetElectrification: number;
  energyEfficiencyUpgrades: number;
  supplierAuditParticipation: number;
}

export interface MetricDataPoint {
  week: number;
  primaryLineYield: number;
  assemblyLineYield: number;
  packagingLineYield: number;
  primaryLineEmissions: number;
  assemblyLineEmissions: number;
  packagingLineEmissions: number;
  carbonTaxAccrual: number;
}

export interface Pillar {
  id: string;
  title: string;
  summary: string;
  details: string[];
  metricLabel: string;
  metricValue: string;
  trend: string;
  iconName: 'pulse' | 'trending-down' | 'checklist';
}

export interface FeatureGridItem {
  title: string;
  description: string;
  iconName: 'database' | 'stack' | 'users' | 'pulse';
  badge?: string;
  frameworks?: string[];
}

export const baseWeeklyDataPoints: MetricDataPoint[] = [
  { week: 1, primaryLineYield: 82.5, assemblyLineYield: 78.2, packagingLineYield: 85.1, primaryLineEmissions: 4.8, assemblyLineEmissions: 3.2, packagingLineEmissions: 2.1, carbonTaxAccrual: 1450 },
  { week: 2, primaryLineYield: 83.1, assemblyLineYield: 79.0, packagingLineYield: 86.0, primaryLineEmissions: 4.7, assemblyLineEmissions: 3.1, packagingLineEmissions: 2.0, carbonTaxAccrual: 1420 },
  { week: 4, primaryLineYield: 84.6, assemblyLineYield: 80.5, packagingLineYield: 87.2, primaryLineEmissions: 4.5, assemblyLineEmissions: 2.9, packagingLineEmissions: 1.9, carbonTaxAccrual: 1350 },
  { week: 6, primaryLineYield: 85.2, assemblyLineYield: 81.3, packagingLineYield: 87.9, primaryLineEmissions: 4.4, assemblyLineEmissions: 2.8, packagingLineEmissions: 1.8, carbonTaxAccrual: 1300 },
  { week: 8, primaryLineYield: 86.8, assemblyLineYield: 82.9, packagingLineYield: 88.4, primaryLineEmissions: 4.2, assemblyLineEmissions: 2.6, packagingLineEmissions: 1.7, carbonTaxAccrual: 1220 },
  { week: 10, primaryLineYield: 88.0, assemblyLineYield: 84.1, packagingLineYield: 89.2, primaryLineEmissions: 4.0, assemblyLineEmissions: 2.5, packagingLineEmissions: 1.6, carbonTaxAccrual: 1150 },
  { week: 12, primaryLineYield: 91.1, assemblyLineYield: 86.4, packagingLineYield: 89.9, primaryLineEmissions: 3.2, assemblyLineEmissions: 2.2, packagingLineEmissions: 1.4, carbonTaxAccrual: 980 },
  { week: 14, primaryLineYield: 92.4, assemblyLineYield: 88.0, packagingLineYield: 90.5, primaryLineEmissions: 2.8, assemblyLineEmissions: 2.0, packagingLineEmissions: 1.3, carbonTaxAccrual: 890 },
  { week: 16, primaryLineYield: 93.2, assemblyLineYield: 89.1, packagingLineYield: 91.0, primaryLineEmissions: 2.5, assemblyLineEmissions: 1.8, packagingLineEmissions: 1.2, carbonTaxAccrual: 810 },
  { week: 18, primaryLineYield: 93.8, assemblyLineYield: 89.9, packagingLineYield: 91.6, primaryLineEmissions: 2.3, assemblyLineEmissions: 1.7, packagingLineEmissions: 1.1, carbonTaxAccrual: 750 },
  { week: 21, primaryLineYield: 94.2, assemblyLineYield: 90.8, packagingLineYield: 92.2, primaryLineEmissions: 2.1, assemblyLineEmissions: 1.5, packagingLineEmissions: 1.0, carbonTaxAccrual: 680 },
  { week: 23, primaryLineYield: 94.8, assemblyLineYield: 91.5, packagingLineYield: 93.0, primaryLineEmissions: 1.9, assemblyLineEmissions: 1.4, packagingLineEmissions: 0.9, carbonTaxAccrual: 620 },
  { week: 24, primaryLineYield: 95.2, assemblyLineYield: 92.1, packagingLineYield: 93.5, primaryLineEmissions: 1.8, assemblyLineEmissions: 1.3, packagingLineEmissions: 0.8, carbonTaxAccrual: 580 }
];

export const strategicPillars: Pillar[] = [
  {
    id: 'emissions-visibility',
    title: 'Emissions Visibility',
    summary: 'Comprehensive tracking across all scopes and supply chain tiers.',
    details: [
      'Full ledger tracking for Scope 1, Scope 2, and material Scope 3 source items.',
      'Sub-meter asset synchronization and telemetry ingesters.',
      'Real-time greenhouse gas equivalency mapping based on updated grid mix factors.'
    ],
    metricLabel: 'Asset Tracker Acc.',
    metricValue: '99.8%',
    trend: '+1.4% yoy',
    iconName: 'pulse'
  },
  {
    id: 'data-driven-strategies',
    title: 'Data-Driven Strategies',
    summary: 'Actionable insights to optimize reduction and accelerate impact.',
    details: [
      'Continuous process mining of OEE and line thermal factors.',
      'Optimizing machine speed parameters to reduce overall electrical idle load.',
      'Intelligent power scheduling suggestions correlating shift times with solar peaks.'
    ],
    metricLabel: 'Reduction Target Reach',
    metricValue: '92.4%',
    trend: '+4.2% rate',
    iconName: 'trending-down'
  },
  {
    id: 'automated-reporting',
    title: 'Automated Reporting',
    summary: 'Seamless, audit-ready compliance for CSRD, SEC, and global standards.',
    details: [
      'Fully automated report building with GRI, SEC-Climate rules, and state mandates.',
      'Single-click auditor-ready secure ledgers.',
      'Carbon tax forecasting matching future energy prices and carbon caps.'
    ],
    metricLabel: 'Form Accreditations',
    metricValue: '12+',
    trend: 'Global Standards',
    iconName: 'checklist'
  }
];

export const smartEsgFeatures: FeatureGridItem[] = [
  {
    title: 'Single Source of Truth',
    description: 'Centralize all ESG metrics across departments into one secure, audit-ready database.',
    iconName: 'database',
    badge: 'Core Ledger'
  },
  {
    title: 'Multi-Framework Support',
    description: 'Generate reports aligned with GRI, CSRD, BRSR, and custom framework requirements effortlessly.',
    iconName: 'stack',
    badge: 'Frameworks Ready',
    frameworks: ['GRI', 'CSRD', 'BRSR', 'SEC Climate', 'SDG 13']
  },
  {
    title: 'Supplier Assessment',
    description: 'Engage and assess your supply chain emissions with automated vendor surveys and data collection.',
    iconName: 'users',
    badge: 'Scope 3 Focus'
  },
  {
    title: 'Materiality Matrix',
    description: 'Define and visualize key environmental and social issues that matter most to your stakeholders.',
    iconName: 'pulse',
    badge: 'Stakeholder Portal'
  }
];

export const mockAiSuggestions: Record<string, string[]> = {
  Production: [
    "AI Suggestion: Plant sub-system thermal factor is running +4% hot. Adjust vacuum pressure loops on Assembly Line B to reduce continuous draw by 12 kW.",
    "AI Suggestion: Correlating Shift B production with current solar capacity. Scheduled high-density extruder runs during Peak Green Hours (11:00 - 14:00) to maximize solar usage.",
    "AI Suggestion: Primary Line 1 compressed air system leaks detected during idle hours. Resolving these leaks would decrease electrical load by 8% next week."
  ],
  'Supply Chain': [
    "AI Suggestion: Optimize Scope 3 logistics by shifting 15% of regional freight allocation to regional electric cargo carriers, yielding a 22.4 MT of CO2e saving.",
    "AI Suggestion: Active Supplier audits show Packaging Vendor #3 is sourcing material from non-accredited forestry. Switch to certified composite fibers to avoid ESG downgrade.",
    "AI Suggestion: Implement inbound delivery bundling for Line 1 assembly items to decrease overall heavy duty truck loops by 34 loops/month."
  ],
  Financials: [
    "AI Suggestion: Projected carbon border tax rate is increasing by $14/ton next quarter. Securing virtual power purchase agreements (VPPAs) now mitigates 84% of tax variance risk.",
    "AI Suggestion: Marginal Abatement Cost Curve (MACC) indicates that switching to smart pneumatic controllers has a payback cycle under 11 months based on direct fuel tax rebates.",
    "AI Suggestion: Current tax deduction pool values Scope 2 offsets at high efficiency. Reinvest $45k in Smart HVAC scheduling to secure $12k in credits."
  ],
  Maintenance: [
    "AI Suggestion: Predictive health logs indicate wear on Assembly Line B primary gear bearings, increasing friction load by 9%. Schedule immediate lubrication service.",
    "AI Suggestion: Re-calibrate thermal sealers on Packaging Line 3. Temperature variance of +6°C is leading to minor material wastage and continuous energy overshoot.",
    "AI Suggestion: Schedule routine filters replacement on chiller units. Airflow restriction is causing compressors to idle longer, adding 3.2 MW of waste electricity monthly."
  ],
  HR: [
    "AI Suggestion: Promote energy awareness shift guidelines. Engaging crew teams on efficient shutdown checklists during shift handoff saves average 45 kWh per night.",
    "AI Suggestion: Launch 'Green Commuting' credits for off-duty team transportation audits. Electrified carpooling reduces corporate indirect footprint by 4.2%.",
    "AI Suggestion: Sponsor Net Zero operations training certification programs for operators. Shift leads certified in ESG compliance observe 12% lower machine idle cycles."
  ]
};
