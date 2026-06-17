'use client'

import { useState, useEffect } from 'react'
import { X, CheckCircle2, Loader2, ArrowRight } from 'lucide-react'

export default function ExpertModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('openExpertModal', handleOpen)
    return () => window.removeEventListener('openExpertModal', handleOpen)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/xojyggok', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      })
      if (response.ok) {
        setStatus('success')
        form.reset()
        setTimeout(() => {
          setIsOpen(false)
          setStatus('idle')
        }, 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {status === 'success' ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
            <p className="text-slate-500">Our supply chain experts will contact you shortly.</p>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Talk to an Expert</h3>
              <p className="text-slate-500 text-sm">
                Fill out the form below to connect with our supply chain specialists and discover how CarbonSynq can streamline your scope 3 tracking.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-1">First Name</label>
                  <input required type="text" name="firstName" id="firstName" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow text-sm text-slate-900" placeholder="John" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-1">Last Name</label>
                  <input required type="text" name="lastName" id="lastName" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow text-sm text-slate-900" placeholder="Doe" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Work Email</label>
                <input required type="email" name="email" id="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow text-sm text-slate-900" placeholder="john@company.com" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1">How can we help?</label>
                <textarea required name="message" id="message" rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow text-sm text-slate-900 resize-none" placeholder="Tell us about your supply chain..." />
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : status === 'error' ? (
                  'Error, Try Again'
                ) : (
                  <>
                    Connect with Expert <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
