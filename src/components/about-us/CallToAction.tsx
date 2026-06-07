'use client';
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import CalendlyWidget from './CalendlyWidget'


const CallToAction = () => {
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <section className="cta-section">
      <div className="cta-container">
        <div
          className="cta-flex"
        >
          <div className="cta-text-side">
            <h2 className="cta-title">
              Can't wait to <span className="highlight">get started</span> ?
            </h2>
            <p className="cta-desc">
              Book a consultation with us today and let us take you through a detailed demo of our
              offerings so together we can find a solution that works best for your organization!
            </p>
          </div>
          <div className="cta-button-side">
            <button className="cta-button" onClick={() => setShowCalendly(true)}>
              Book a demo <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>

      
        {showCalendly && (
          <CalendlyWidget onClose={() => setShowCalendly(false)} />
        )}
      
    </section>

  )
}

export default CallToAction
