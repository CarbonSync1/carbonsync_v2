'use client';
import { useState } from 'react'

const timelineData = [
  {
    date: 'Jul 2024',
    fullDate: 'JULY, 2024',
    title: 'Founded',
    desc: 'CarbonSync was incorporated with a vision to transform the sustainability landscape by leveraging cutting-edge technology.'
  },
  {
    date: 'Oct 2024',
    fullDate: 'OCTOBER, 2024',
    title: 'AI Core Development',
    desc: 'Completed the integration of our proprietary LLM-driven carbon analysis engine, enabling autonomous supplier data verification.'
  },
  {
    date: 'Apr 2025',
    fullDate: 'APRIL, 2025',
    title: 'Supply Chain Protocol',
    desc: 'Deployed our decentralized ledger protocol to over 10,000 tier-2 and tier-3 suppliers, ensuring unprecedented data integrity across the value chain.'
  },
  {
    date: 'Dec 2025',
    fullDate: 'DECEMBER, 2025',
    title: 'Autonomous Audit',
    desc: 'Launched our AI-driven "Self-Healing" audit engine that automatically detects and resolves data discrepancies in real-time without human intervention.'
  },
  {
    date: 'Mar 2026',
    fullDate: 'MARCH, 2026',
    title: 'Credit Exchange',
    desc: 'Launched our integrated carbon credit exchange, allowing partners to offset residual emissions with verified, high-impact climate projects directly through the platform.'
  },
  {
    date: 'Jul 2026',
    fullDate: 'JULY, 2026',
    title: 'Global Launch',
    desc: 'CarbonSync is now fully operational and ready for global adoption. Our platform and website are open for organizations worldwide to begin their journey toward a liveable planet.'
  }
]

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="timeline-section">
      <div className="timeline-container">
        {/* Timeline Track */}
        <div className="timeline-track-wrapper">
          <div className="timeline-line" />
          <div className="timeline-points">
            {timelineData.map((item, index) => (
              <div 
                key={index} 
                className={`timeline-point-item ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="point-date">{item.date}</span>
                <div className="point-dot" />
              </div>
            ))}
          </div>
        </div>

        {/* Selected Content */}
        <div className="timeline-content-area">
          
            <div
              key={activeIndex}
              className="selected-timeline-item"
            >
              <div className="selected-full-date">{timelineData[activeIndex].fullDate}</div>
              <h2 className="selected-title">{timelineData[activeIndex].title}</h2>
              <p className="selected-desc">{timelineData[activeIndex].desc}</p>
            </div>
          
        </div>
      </div>
    </section>
  )
}

export default Timeline
