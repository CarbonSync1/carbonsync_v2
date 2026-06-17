'use client'

import { useState, useEffect } from 'react'
import { Calendar, ArrowRight } from 'lucide-react'

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBookDemo = () => {
    window.dispatchEvent(new Event('openDemoModal'))
  }

  return (
    <div 
      className={`md:hidden fixed bottom-6 left-0 right-0 z-[100] px-4 transition-all duration-500 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative mx-auto max-w-sm group">
        <button
          onClick={handleBookDemo}
          className="relative w-full flex items-center justify-between gap-3 bg-slate-900/95 backdrop-blur-md text-white shadow-[0_8px_30px_rgba(16,185,129,0.3)] font-bold py-3.5 px-5 rounded-full transition-all duration-300 active:scale-[0.98] border border-emerald-500/30 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-500/20 pointer-events-none" />
          
          <div className="flex items-center gap-3 z-10">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-400">
              <Calendar size={16} />
            </div>
            <span className="tracking-wide text-sm font-semibold">Book a Demo</span>
          </div>
          
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-md transition-colors z-10">
             <ArrowRight size={16} />
          </div>
        </button>
      </div>
    </div>
  )
}
