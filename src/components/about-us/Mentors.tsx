'use client';

const mentors = [
  {
    name: 'Dr. Narendra Teotia',
    role: 'Mentor',
    image: '/about-assets/mentor-1.jpg',
    quote:
      'True innovation lies at the intersection of technology and purpose. CarbonSync represents a generation of builders who refuse to accept the status quo — they are engineering a future where sustainability is not optional, but inevitable.',
  },
  {
    name: 'Rachit Mathur',
    role: 'Technical Mentor',
    image: '/about-assets/mentor-2.jpg',
    quote:
      'What excites me most about CarbonSync is the relentless pursuit of precision. Building an autonomous carbon intelligence platform demands not just technical excellence, but the courage to solve problems no one else is willing to tackle.',
  },
];

const Mentors = () => {
  return (
    <section className="mentors-section">
      <div className="mentors-container">
        {/* Header */}
        <div className="mentors-header">
          <div className="mentors-tag">
            <span className="mentors-tag-dot" />
            GUIDED BY THE BEST
          </div>
          <h2 className="mentors-title">
            The minds that <span>inspire us.</span>
          </h2>
          <p className="mentors-subtitle">
            Our mentors bring decades of experience in technology, academia, and
            industry — shaping the vision and technical foundation of CarbonSync.
          </p>
        </div>

        {/* Mentor Cards */}
        <div className="mentors-grid">
          {mentors.map((mentor, index) => (
            <div key={index} className="mentor-card">
              <div className="mentor-portrait">
                <img src={mentor.image} alt={mentor.name} />
                <div className="mentor-portrait-overlay" />
              </div>
              <div className="mentor-details">
                <div className="mentor-name-block">
                  <h3 className="mentor-name">{mentor.name}</h3>
                  <span className="mentor-role">{mentor.role}</span>
                </div>
                <div className="mentor-quote-block">
                  <svg
                    className="mentor-quote-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="36"
                    height="36"
                    style={{ width: '36px', height: '36px', minWidth: '36px' }}
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <p className="mentor-quote-text">{mentor.quote}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;
