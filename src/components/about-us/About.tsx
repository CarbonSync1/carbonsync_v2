'use client';
import { useState } from 'react'
const visionBg = "/about-assets/vision-bg.webp";
const missionBg = "/about-assets/mission-bg.webp";
const storyBg = "/about-assets/story-bg.webp";
import CalendlyWidget from './CalendlyWidget'


const About = () => {
  const [showVision, setShowVision] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);


  const rows = [
    {
      id: 'vision',
      tag: 'OUR VISION',
      title: 'To empower every organization for a liveable planet.',
      desc: 'At CarbonSync, we believe that sustainability data should be as accurate, accessible, and actionable as financial data. Our vision is a world where every enterprise, regardless of size, has the clarity to thrive in a circular economy.',
      image: visionBg,
      cta: 'SEE OUR VISION',
      reverse: false,
    },
    {
      id: 'mission',
      tag: 'OUR MISSION',
      title: 'Simplifying the path to net-zero through intelligent automation.',
      desc: 'We protect the future by providing a real-time platform that automates emissions tracking across complex supply chains. By eliminating manual entry and providing predictive insights, we enable organizations to focus on strategy.',
      image: missionBg,
      cta: 'LOG IN TO THE PLATFORM',
      reverse: true,
    },
    {
      id: 'story',
      tag: 'OUR STORY',
      title: 'From a single seed of frustration to a global canopy.',
      desc: 'CarbonSync was born from the realization that while the climate crisis was accelerating, the tools to manage it were stuck in the past. Today, we are transforming how leading organizations manage their environmental footprint.',
      image: storyBg,
      cta: 'READ OUR FULL STORY',
      reverse: false,
    },
  ]

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {rows.map((row, index) => (
          <div
            key={index}
            className={`about-row ${row.reverse ? 'reverse' : ''}`}
          >
            <div className="about-image">
              <img src={row.image} alt={row.tag} />
            </div>
            <div className="about-content">
              <div className="about-tag">
                <span className="tag-dot" />
                {row.tag}
              </div>
              <h2 className="about-title">{row.title}</h2>
              <p className="about-desc">{row.desc}</p>
              <a 
                href="#" 
                className="about-cta"
                onClick={(e) => {
                  e.preventDefault();
                  if (row.id === 'vision') setShowVision(true);
                  if (row.id === 'story') setShowStory(true);
                  if (row.id === 'mission') setShowCalendly(true);
                }}

              >
                {row.cta} <span>→</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Vision Modal */}
      
        {showVision && (
          <div className="vision-modal-overlay" onClick={() => setShowVision(false)}>
            <div 
              className="vision-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="vision-modal-close" onClick={() => setShowVision(false)}>×</button>
              <div className="vision-modal-header">
                <div className="vision-modal-tag">2030 STRATEGY</div>
                <h2 className="vision-modal-title">Our Pillars for <span>Impact.</span></h2>
              </div>
              
              <div className="vision-pillars">
                <div className="pillar">
                  <div className="pillar-num">01</div>
                  <div className="pillar-info">
                    <h3>Precision at Scale</h3>
                    <p>We're moving the world beyond carbon estimates. Our vision is 100% primary data coverage across every global supply chain tier.</p>
                  </div>
                </div>
                <div className="pillar">
                  <div className="pillar-num">02</div>
                  <div className="pillar-info">
                    <h3>Zero-Touch Audits</h3>
                    <p>We envision a future where carbon compliance is a background process—automated, verified, and always audit-ready.</p>
                  </div>
                </div>
                <div className="pillar">
                  <div className="pillar-num">03</div>
                  <div className="pillar-info">
                    <h3>Actionable ROI</h3>
                    <p>Sustainability shouldn't be a cost center. We provide the intelligence to turn reduction efforts into operational efficiency.</p>
                  </div>
                </div>
              </div>

              <div className="vision-modal-footer">
                <button className="vision-cta-btn" onClick={() => setShowVision(false)}>ENVISION THE FUTURE</button>
              </div>
            </div>
          </div>
        )}
      

      {/* Story Modal */}
      
        {showStory && (
          <div className="story-modal-overlay" onClick={() => setShowStory(false)}>
            <div 
              className="story-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="story-modal-close" onClick={() => setShowStory(false)}>×</button>
              <div className="story-modal-grid">
                <div className="story-modal-image">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" alt="Our Office" />
                </div>
                <div className="story-modal-text">
                  <div className="story-tag">OUR JOURNEY</div>
                  <h2 className="story-title">A Vision for <span>Certainty.</span></h2>
                  <p className="story-body">
                    Founded in November 2025, CarbonSync began with a simple yet profound realization: 
                    the transition to net-zero is the greatest challenge of our generation, 
                    but the tools to manage it were fragmented and manual.
                  </p>
                  <p className="story-body">
                    We built the world's first autonomous carbon intelligence platform to 
                    bring absolute clarity to complex supply chains. Today, we empower 
                    global leaders to move beyond estimates and lead with confidence.
                  </p>
                  <div className="story-stats">
                    <div className="stat">
                      <span className="val">2025</span>
                      <span className="lbl">FOUNDED</span>
                    </div>
                    <div className="stat">
                      <span className="val">500+</span>
                      <span className="lbl">PARTNERS</span>
                    </div>
                    <div className="stat">
                      <span className="val">10M+</span>
                      <span className="lbl">TONS TRACKED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      


      {/* Calendly Modal */}
      
        {showCalendly && (
          <CalendlyWidget onClose={() => setShowCalendly(false)} />
        )}
      
    </section>

  )
}

export default About
