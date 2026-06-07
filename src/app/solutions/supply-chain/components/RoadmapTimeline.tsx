'use client'

import { CheckCircle2, Circle, LucideRadio } from 'lucide-react'
import type { RoadmapPhase } from '../types'

const statusIcon = {
  completed: CheckCircle2,
  current: LucideRadio,
  upcoming: Circle,
}

const statusStyles = {
  completed: 'text-emerald-600',
  current: 'text-amber-500',
  upcoming: 'text-slate-300',
}

const lineStyles = {
  completed: 'bg-emerald-600',
  current: 'bg-gradient-to-b from-emerald-600 to-amber-500',
  upcoming: 'bg-slate-200',
}

interface RoadmapTimelineProps {
  phases: RoadmapPhase[]
}

export default function RoadmapTimeline({ phases }: RoadmapTimelineProps) {
  return (
    <div className="relative">
      {phases.map((phase, index) => {
        const Icon = statusIcon[phase.status]
        const isLast = index === phases.length - 1

        return (
          <div
            key={phase.phase}
            className="relative flex gap-6 pb-8 last:pb-0"
          >
            <div className="flex flex-col items-center">
              <div className={`relative z-10 ${statusStyles[phase.status]}`}>
                <Icon className="w-8 h-8" />
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 mt-2 ${lineStyles[phase.status]}`}
                  style={{ minHeight: '60px' }}
                />
              )}
            </div>
            <div className="flex-1 pt-1">
              <h4 className="text-lg font-bold text-slate-900 mb-3">
                {phase.phase}
              </h4>
              <div className="flex flex-wrap gap-2">
                {phase.items.map((item) => (
                  <span
                    key={item}
                    className={`px-3 py-1.5 text-sm rounded-lg ${
                      phase.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : phase.status === 'current'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-slate-50 text-slate-400'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
