export interface Problem {
  icon: string
  title: string
  description: string
}

export interface WorkflowStep {
  icon: string
  title: string
  description: string
}

export interface ScopeFeature {
  label: string
}

export interface ScopeData {
  title: string
  subtitle: string
  description: string
  dataInputs: string[]
  formula?: string
  features: string[]
  badges?: string[]
  prominent?: boolean
}

export interface OperationCard {
  title: string
  description: string
  gradient: string
  icon: string
  image: string
}

export interface ArchitectureLayer {
  name: string
  items: string[]
}

export interface AICapability {
  title: string
  description: string
  gradient: string
  icon: string
}

export interface Integration {
  category: string
  items: string[]
  future?: boolean
}

export interface RoadmapPhase {
  phase: string
  items: string[]
  status: 'completed' | 'current' | 'upcoming'
}

export interface ComplianceFeature {
  label: string
}
