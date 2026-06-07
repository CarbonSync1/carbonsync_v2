'use client';
const innovationBg = "/about-assets/innovation-bg.webp";

const Innovation = () => {
  return (
    <section className="innovation-section" id="innovation">
      <div className="innovation-container">
        {/* Left: Image with large rounded corners */}
        <div
          className="innovation-image"
        >
          <img src={innovationBg} alt="Advanced Circuitry" />
        </div>

        {/* Right: Content */}
        <div
          className="innovation-content"
        >
          <div className="innovation-tag">
            INNOVATION CENTRES
          </div>

          <h2 className="innovation-title">
            Engineering a <span>precise legacy.</span>
          </h2>

          <p className="innovation-desc">
            At our Innovation Lab, we merge climate science with cutting-edge AI. 
            Our STEWARDS are focused on reducing uncertainty in Scope 3 emissions 
            using planetary-scale sensor data and predictive modeling.
          </p>

          <div className="innovation-features">
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <div className="feature-text">
                <h3>Sensor Fusion Technology</h3>
                <p>Aggregating 1B+ data points from IoT devices globally.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚙️</div>
              <div className="feature-text">
                <h3>Real-time Remittance</h3>
                <p>Automated carbon remittance based on smart contracts.</p>
              </div>
            </div>
          </div>

          <a
            href="#team"
            className="innovation-cta"
          >
            MEET THE STEWARDS <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Innovation
