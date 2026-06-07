'use client';

const brands = [
  'STRIPE',
  'BLACKROCK',
  'SALESFORCE',
  'MICROSOFT',
  'UNILEVER',
  'GOLDMAN SACHS',
  'ACCENTURE',
  'MORGAN STANLEY',
]

const Logos = () => {
  return (
    <div className="logos-section">
      <div className="logos-wrapper">
        <div
          className="logos-track"
        >
          {/* First set of brands */}
          {brands.map((brand, index) => (
            <div key={index} className="logo-item">
              {brand}
            </div>
          ))}
          {/* Duplicated set for seamless loop */}
          {brands.map((brand, index) => (
            <div key={`dup-${index}`} className="logo-item">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Logos
