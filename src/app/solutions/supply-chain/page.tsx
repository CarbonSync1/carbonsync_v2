'use client'

import { Suspense, useRef, useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
const CalendlyModal = dynamic(() => import('./components/CalendlyModal'))
const Hero = dynamic(() => import('./sections/Hero'))
const Problems = dynamic(() => import('./sections/Problems'))
const Workflow = dynamic(() => import('./sections/Workflow'))
const Scopes = dynamic(() => import('./sections/Scopes'))
const Operations = dynamic(() => import('./sections/Operations'))
const Architecture = dynamic(() => import('./sections/Architecture'))
const AI = dynamic(() => import('./sections/AI'))
const Integrations = dynamic(() => import('./sections/Integrations'))
const Compliance = dynamic(() => import('./sections/Compliance'))
const Roadmap = dynamic(() => import('./sections/Roadmap'))
const WaveDivider = dynamic(() => import('./components/WaveDivider'))
const StickyCTA = dynamic(() => import('./components/StickyCTA'))
const ExitIntentPopup = dynamic(() => import('./components/ExitIntentPopup'))
const VideoModal = dynamic(() => import('./components/VideoModal'))
const ExpertModal = dynamic(() => import('./components/ExpertModal'))

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
    </div>
  )
}

export default function SupplyChainPage() {
  const problemsRef = useRef<HTMLDivElement>(null)
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  const openDemo = useCallback(() => setIsDemoOpen(true), [])
  const closeDemo = useCallback(() => setIsDemoOpen(false), [])

  useEffect(() => {
    const handler = () => openDemo()
    window.addEventListener('openDemoModal', handler)
    return () => window.removeEventListener('openDemoModal', handler)
  }, [openDemo])

  useEffect(() => {
    document.body.style.overflow = isDemoOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isDemoOpen])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.2 })
    const sections = document.querySelectorAll('.section')
    sections.forEach(sec => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative pt-20">
      <CalendlyModal isOpen={isDemoOpen} onClose={closeDemo} />

          <Suspense fallback={<SectionFallback />}>
            <StickyCTA />
            <ExitIntentPopup />
            <VideoModal />
            <ExpertModal />
            <Hero />
            <WaveDivider />
            <div className="flex items-center justify-center pb-12 pt-6">
              <button
                onClick={() => problemsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-emerald-800 transition-colors duration-300 shadow-xl hover:shadow-emerald-500/20"
              >
                Explore Our Solutions
              </button>
            </div>
          </Suspense>

          <div className="px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
            <div ref={problemsRef} className="section glass-card">
              <Suspense fallback={<SectionFallback />}>
                <Problems />
              </Suspense>
            </div>

            <div className="section glass-card">
              <Suspense fallback={<SectionFallback />}>
                <Workflow />
              </Suspense>
            </div>

            <div className="section glass-card">
              <Suspense fallback={<SectionFallback />}>
                <Scopes />
              </Suspense>
            </div>

            <div className="section glass-card">
              <Suspense fallback={<SectionFallback />}>
                <Operations />
              </Suspense>
            </div>

            <div className="section glass-card">
              <Suspense fallback={<SectionFallback />}>
                <Architecture />
              </Suspense>
            </div>

            <div className="section glass-card">
              <Suspense fallback={<SectionFallback />}>
                <AI />
              </Suspense>
            </div>

            <div className="section glass-card">
              <Suspense fallback={<SectionFallback />}>
                <Integrations />
              </Suspense>
            </div>

            <div className="section glass-card">
              <Suspense fallback={<SectionFallback />}>
                <Compliance />
              </Suspense>
            </div>

            <div className="section glass-card">
              <Suspense fallback={<SectionFallback />}>
                <Roadmap />
              </Suspense>
            </div>
          </div>
    </div>
  )
}
