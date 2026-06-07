'use client'

import { Network, Truck, ShoppingCart } from 'lucide-react'
import type { OperationCard } from '../types'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Network,
  Truck,
  ShoppingCart,
}

interface FeatureCardProps {
  card: OperationCard
  index: number
}

export default function FeatureCard({ card, index }: FeatureCardProps) {
  const Icon = iconMap[card.icon] || Network

  return (
    <div
      className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[320px]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${card.image})` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-500`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="relative h-full min-h-[320px] p-6 md:p-8 flex flex-col justify-end">
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 border border-white/10">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
        <p className="text-white/80 leading-relaxed max-w-md">{card.description}</p>
      </div>
    </div>
  )
}
