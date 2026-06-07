'use client';

const reasons = [
  { 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ), 
    title: 'AI-Powered Precision', 
    desc: 'Proprietary models delivering 99.9% accuracy.' 
  },
  { 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ), 
    title: 'Global Transparency', 
    desc: 'Real-time multi-tier vendor tracking.' 
  },
  { 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7-3 5 3 5"/><path d="m19 7 3 5-3 5"/>
      </svg>
    ), 
    title: 'Compliance-First', 
    desc: 'Audit-ready for global ESG mandates.' 
  },
]

const services = [
  { 
    icon: '🛡️', 
    title: 'Risk Management', 
    desc: 'Comprehensive protection.',
    details: 'Our Risk Management solutions provide end-to-end visibility into your supply chain vulnerabilities. We utilize predictive AI to foresee regulatory shifts and environmental risks.'
  },
  { 
    icon: '📋', 
    title: 'Compliance & Audit', 
    desc: 'Meeting global standards.',
    details: 'We automate the collection of your ESG data to comply perfectly with SEC climate disclosure rules, CSRD in Europe, and BRSR in India, eliminating audit anxiety.'
  },
  { 
    icon: '🔒', 
    title: 'Cybersecurity', 
    desc: 'Advanced threat detection.',
    details: 'Our military-grade encryption and decentralized data architecture ensure that your proprietary supply chain information and carbon ledgers are protected from bad actors.'
  },
  { 
    icon: '🚀', 
    title: 'Transformation', 
    desc: 'Modernizing with speed.',
    details: 'We help you reduce carbon by integrating APIs directly into your ERP systems (SAP, Oracle) to trigger automated, low-carbon procurement decisions in real-time.'
  },
  { 
    icon: '🌱', 
    title: 'ESG Advisory', 
    desc: 'Guiding net-zero transition.',
    details: 'Work alongside our climate scientists to establish science-based targets (SBTi) and build a realistic, ROI-positive roadmap to absolute zero emissions.'
  },
  { 
    icon: '📈', 
    title: 'Strategic Growth', 
    desc: 'Scaling across markets.',
    details: 'Turn compliance into a competitive advantage. Leverage your sustainability credentials to unlock green financing and win environmentally-conscious enterprise contracts.'
  },
]

const Offerings = () => {
  return (
    <section className="offerings-section" id="offerings">
      <div className="offerings-container">
        {/* Why Us Column */}
        <div className="why-us-column">
          <div
          >
            <div className="tag-premium">WHY CARBONSYNC?</div>
            <h2 className="title-premium">
              The precision for a <br />
              <span>circular future.</span>
            </h2>
          </div>

          <div className="reasons-stack">
            {reasons.map((item, i) => (
              <div 
                key={i} 
                className="reason-item"
              >
                <div className="icon-box-accent">{item.icon}</div>
                <div className="reason-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-grid-column">
          <div className="grid-3x2">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="service-card-premium"
              >
                <div className="card-front">
                  <div className="card-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <span className="link-arrow">HOVER FOR DETAILS →</span>
                </div>
                
                <div className="card-overlay">
                  <h4>{service.title}</h4>
                  <div className="overlay-divider"></div>
                  <p>{service.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Offerings
