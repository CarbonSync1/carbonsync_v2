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
            EXECUTIVE ADVISORY
          </div>
          <h2 className="mentors-title">
            Guided by Industry Experts
          </h2>
          <p className="mentors-subtitle">
            CarbonSync is supported by experienced mentors across sustainability, enterprise architecture, and deep technology — helping us build a reliable and future-ready carbon intelligence platform.
          </p>
        </div>

        {/* Mentor Cards */}
        <div className="mentors-grid">
          {mentors.map((mentor, index) => (
            <div key={index} className="mentor-card">
              <div className="mentor-card-header">
                <div className="mentor-avatar">
                  <img src={mentor.image} alt={mentor.name} />
                </div>
                <div className="mentor-info">
                  <h3 className="mentor-name">{mentor.name}</h3>
                  <span className="mentor-role">{mentor.role}</span>
                </div>
              </div>
              <div className="mentor-quote">
                <p className="mentor-quote-text">"{mentor.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;

