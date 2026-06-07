'use client'

import { useState, useEffect } from 'react'
import { X, Play } from 'lucide-react'

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('openVideoModal', handleOpen)
    return () => window.removeEventListener('openVideoModal', handleOpen)
  }, [])

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="relative w-full max-w-5xl aspect-video bg-slate-900 rounded-3xl shadow-[0_0_80px_rgba(16,185,129,0.3)] border border-white/10 overflow-hidden flex items-center justify-center group"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/X-o6X37x0g0?autoplay=1&rel=0&modestbranding=1"
              title="Carbon Emissions Explained"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}
