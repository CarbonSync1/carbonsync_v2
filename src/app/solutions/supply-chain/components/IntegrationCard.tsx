'use client'

interface IntegrationCardProps {
  name: string
  index: number
  future?: boolean
}

export default function IntegrationCard({ name, index, future }: IntegrationCardProps) {
  return (
    <div
      className={`px-4 py-3 rounded-2xl border text-center font-medium transition-all duration-300 ${
        future
          ? 'bg-slate-50 border-dashed border-slate-300 text-slate-400'
          : 'bg-white border-slate-200 text-slate-800 shadow-sm hover:shadow-md hover:border-emerald-200'
      }`}
    >
      <span className="text-sm">{name}</span>
    </div>
  )
}
