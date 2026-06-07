'use client';
import { useState } from 'react'
const heroBg = "/about-assets/hero-bg.webp";

const Hero = () => {
  const [showStory, setShowStory] = useState(false);

  return (
    <section className="hero" id="hero">
      {/* Background Image */}
      <div className="hero-bg">
        <img src={heroBg} alt="Modern skyscrapers" />
      </div>

      {/* Dark Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div
        className="hero-content"
      >
        {/* Badge */}
        <div
          className="hero-badge"
        >
          <span className="diamond">✦</span>
          ESTABLISHED 2024
        </div>

        {/* Title */}
        <h1
          className="hero-title"
        >
          Culture <em>of</em><br />
          Confidence.
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle"
        >
          We believe in creating a culture of confidence for our customers,
          our organizations, and those whom you serve — where certainty in
          managing and securing your net-zero transition is met.
        </p>

        {/* CTA Button */}
        <button
          className="hero-cta"
          onClick={() => setShowStory(true)}
        >
          DISCOVER OUR STORY
        </button>
      </div>

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
                    Founded in 2024, CarbonSync began with a simple yet profound realization: 
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
                      <span className="val">2024</span>
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
      
    </section>
  )
}

export default Hero
