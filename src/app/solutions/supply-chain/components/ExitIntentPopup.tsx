'use client'

import { useState, useEffect } from 'react'
import { X, ArrowRight } from 'lucide-react'

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true)
        setHasTriggered(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasTriggered])

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="relative w-full max-w-lg bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.3)] border border-white/10 p-8 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 mb-6">
                <span className="text-3xl">🌱</span>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                Start Your Net Zero Journey Today
              </h3>
              
              <p className="text-emerald-100/70 mb-8 text-lg">
                Don't let complex emissions data hold you back. Join industry leaders who trust CarbonSynqEarth.
              </p>

              <div className="space-y-3">
                <button 
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:bg-emerald-500 transition-colors cursor-pointer"
                  onClick={() => {
                    setIsVisible(false);
                    window.dispatchEvent(new CustomEvent('openDemoModal'));
                  }}
                >
                  Book a Free Demo
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="w-full px-6 py-3 text-emerald-100/60 font-medium hover:text-white transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
