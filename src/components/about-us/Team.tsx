'use client';

const team = [
  {
    name: 'Pushkar Singh',
    role: 'Founder & CEO',
    image: '/about-assets/team-1-new.jpg',
    linkedin: 'https://www.linkedin.com/in/pushkar-singh-87563433b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    name: 'Ayush Chaudhary',
    role: 'Chief Operation Officer (COO)',
    image: '/about-assets/team-2.jpg',
    linkedin: 'https://www.linkedin.com/in/ayush-chaudhary-a01182329?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    name: 'Sarwang Agarwal',
    role: 'Full-Stack Engineer',
    image: '/about-assets/team-3.jpg',
    linkedin: 'https://www.linkedin.com/in/sarwang-agarwal-220aa62a3?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    name: 'Priyanshu Barai',
    role: 'Backend Engineer',
    image: '/about-assets/team-4.jpg',
    linkedin: 'https://www.linkedin.com/in/priyanshubarai?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
]

const Team = () => {
  return (
    <section className="team-section" id="team">
      <div className="team-container">
        <div 
          className="team-header"
        >
          <div className="team-tag">THE STEWARDS</div>
          <h2 className="team-title">
            The team behind the <span>intelligence.</span>
          </h2>
          <a href="#" className="team-link">
            EXPLORE GLOBAL NETWORK <span>→</span>
          </a>
        </div>

        <div className="team-grid">
          {team.map((member, index) => (
            <a
              key={index}
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                className="team-card"
              >
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
