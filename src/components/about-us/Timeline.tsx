'use client';
import { useState } from 'react'

const timelineData = [
  {
    date: 'Nov 2025',
    fullDate: 'NOVEMBER, 2025',
    title: 'CarbonSynq Earth Founded',
    desc: 'CarbonSynq Earth was founded with a vision to simplify carbon accounting and make sustainability reporting accessible to every firm easily.'
  },
  {
    date: 'Dec 2025',
    fullDate: 'DECEMBER, 2025',
    title: 'Building the Right Team',
    desc: 'Assembled a multidisciplinary team of engineers, sustainability researchers, and product designers dedicated to creating a scalable platform.'
  },
  {
    date: 'Feb 2026',
    fullDate: 'FEBRUARY, 2026',
    title: 'ESG & Emissions Research',
    desc: 'Conducted extensive research on ESG reporting frameworks, carbon accounting methodologies, and globally recognized emission factors to establish the platform.'
  },
  {
    date: 'Apr 2026',
    fullDate: 'APRIL, 2026',
    title: 'Phase One Platform Launch',
    desc: 'Completed the first production-ready version of CarbonSynq Earth, introducing AI-powered invoice processing, automated emissions calculations, and a modern sustainability dashboard.'
  },
  {
    date: 'May 2026',
    fullDate: 'MAY, 2026',
    title: 'Recognized for Innovation',
    desc: 'CarbonSynq Earth was featured by Republic Bharat, highlighting our innovation and vision for transforming carbon accounting and sustainability reporting through technology.'
  },
  {
    date: 'Jul 2026',
    fullDate: 'JULY, 2026',
    title: 'Global Product Launch — Indonesia',
    desc: 'Officially introduced CarbonSynq Earth during our Indonesia visit, sharing our platform with a global audience and marking an important milestone in our journey toward enabling smarter climate action.'
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
