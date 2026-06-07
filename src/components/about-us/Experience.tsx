'use client';

const Experience = () => {
  const logos = [
    {
      name: 'KPMG',
      svg: (
        <svg viewBox="0 0 100 40" fill="#00338d">
          <path d="M0 0h12v40H0V0zm18 0h12v15l15-15h15L42 18l18 22H45L30 22v18h-12V0z" />
        </svg>
      ),
    },
    {
      name: 'Google',
      svg: (
        <svg viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      ),
    },
    {
      name: 'Accenture',
      svg: (
        <svg viewBox="0 0 100 30" fill="#000">
          <text x="0" y="22" fontFamily="Arial" fontWeight="bold" fontSize="20">accenture</text>
        </svg>
      ),
    },
    {
      name: 'Meta',
      svg: (
        <svg viewBox="0 0 24 24" fill="#0668E1">
          <path d="M16.145 5.568c-2.31 0-4.478 1.488-6.145 3.155-1.667-1.667-3.835-3.155-6.145-3.155-3.717 0-6.855 3.033-6.855 6.432 0 3.399 3.138 6.432 6.855 6.432 2.31 0 4.478-1.488 6.145-3.155 1.667 1.667 3.835 3.155 6.145 3.155 3.717 0 6.855-3.033 6.855-6.432 0-3.399-3.138-6.432-6.855-6.432zm-10 10.432c-2.43 0-4.423-1.802-4.423-4s1.993-4 4.423-4c1.848 0 3.472 1.2 4.423 2.568-1.442 2.318-2.575 5.432-4.423 5.432zm10 0c-1.848 0-2.981-3.114-4.423-5.432.951-1.368 2.575-2.568 4.423-2.568 2.43 0 4.423 1.802 4.423 4s-1.993 4-4.423 4z" />
        </svg>
      ),
    },
    {
      name: 'Tesla',
      svg: (
        <svg viewBox="0 0 24 24" fill="#E81D23">
          <path d="M18.57 3.17c-2.26.54-4.32.98-6.57 1.25V2.31c-.13-.02-.27-.04-.4-.06-.13.02-.27.04-.4.06v2.11c-2.25-.27-4.31-.71-6.57-1.25-.32-.08-.57.17-.5.45.31.64.67 1.25 1.08 1.83l.11.13c1.78.38 3.52.61 5.34.73l.94 1.43v5.6c0 1.26-.01 2.52-.03 3.78-.36.31-.72.63-1.07.96-.34.33-.67.66-.99 1.01-.22.25-.09.4.21.36h.88c.19 0 .34-.1.44-.26.3-.47.66-.9 1.06-1.28.09-.08.21-.08.3 0 .4.38.76.81 1.06 1.28.1.16.25.26.44.26h.88c.3.04.43-.11.21-.36-.32-.35-.65-.68-.99-1.01-.35-.33-.71-.65-1.07-.96-.02-1.26-.03-2.52-.03-3.78V9.12l.94-1.43c1.82-.12 3.56-.35 5.34-.73.04-.04.08-.09.11-.13.41-.58.77-1.19 1.08-1.83.07-.28-.18-.53-.5-.45z" />
        </svg>
      ),
    },
    {
      name: 'Microsoft',
      svg: (
        <svg viewBox="0 0 23 23">
          <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
          <path fill="#f25022" d="M1 1h10v10H1z"/>
          <path fill="#7fba00" d="M12 1h10v10H12z"/>
          <path fill="#00a4ef" d="M1 12h10v10H1z"/>
          <path fill="#ffb900" d="M12 12h10v10H12z"/>
        </svg>
      ),
    },
    {
      name: 'Tata Steel',
      svg: (
        <svg viewBox="0 0 130 40" fill="#005a9c">
          <text x="0" y="28" fontFamily="Arial" fontWeight="900" fontSize="20">TATA STEEL</text>
        </svg>
      ),
    },
    {
      name: 'Biocon',
      svg: (
        <svg viewBox="0 0 100 40" fill="#00a3e0">
          <text x="0" y="28" fontFamily="Arial" fontWeight="bold" fontSize="22" fontStyle="italic">Biocon</text>
        </svg>
      ),
    },
    {
      name: 'SaaS Labs',
      svg: (
        <svg viewBox="0 0 120 40" fill="#2e7d32">
          <text x="0" y="28" fontFamily="Arial" fontWeight="bold" fontSize="18">SaaS Labs</text>
        </svg>
      ),
    },
  ]

  return (
    <section className="experience-section">
      <div 
        className="experience-card"
      >
        <h2 className="experience-title">
          We come from a wide range of global technology<br />
          leaders and fast-paced startups.
        </h2>

        <div className="experience-grid">
          {logos.map((company, index) => (
            <div
              key={index}
              className="experience-logo-item"
            >
              <div className="logo-svg-wrapper">
                {company.svg}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
