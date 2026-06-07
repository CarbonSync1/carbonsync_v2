'use client'

const logo = '/supply-chain/logo.webp';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  return (
    <>
      {isOpen && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '1100px',
              height: '90vh',
              background: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.6), 0 0 60px rgba(16, 185, 129, 0.15)',
              display: 'flex',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '420px',
                padding: '40px',
                borderRight: '1px solid #f1f5f9',
                overflowY: 'auto',
                fontFamily: "'Inter', Arial, sans-serif",
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo}
                alt="CarbonSync Logo"
                style={{ width: '60px', marginBottom: '10px' }}
              />

              <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>
                Pushkar Singh
              </p>

              <h2
                style={{
                  fontSize: '28px',
                  margin: '5px 0 15px',
                  color: '#1f2937',
                  fontWeight: '700',
                }}
              >
                CarbonSync Net Zero Discovery Call
              </h2>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <p
                  style={{
                    margin: '6px 0',
                    color: '#374151',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>⏱</span> 30 min
                </p>
                <p
                  style={{
                    margin: '6px 0',
                    color: '#374151',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>💻</span> Web conferencing details provided upon
                  confirmation.
                </p>
                <p
                  style={{
                    margin: '6px 0',
                    color: '#374151',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>📅</span> 10:30am - 11:00am, Tuesday, May 5, 2026
                </p>
                <p
                  style={{
                    margin: '6px 0',
                    color: '#374151',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>🌍</span> India Standard Time
                </p>
              </div>

              <p
                style={{
                  marginTop: '25px',
                  color: '#374151',
                  lineHeight: '1.6',
                  fontSize: '15px',
                }}
              >
                Book Your 30-Minute CarbonSync Net Zero Discovery Call.
              </p>

              <p
                style={{
                  marginTop: '15px',
                  color: '#374151',
                  lineHeight: '1.6',
                  fontSize: '15px',
                }}
              >
                Whether you're just beginning your Net Zero journey or looking
                to refine your existing strategy, our expert team will provide
                the insights and guidance you need to drive meaningful change.
              </p>

              <p
                style={{
                  marginTop: '15px',
                  color: '#374151',
                  lineHeight: '1.6',
                  fontSize: '15px',
                }}
              >
                Book your discovery call today and take the first step towards a
                more sustainable and responsible future.
              </p>
            </div>

            <div style={{ flex: 1, background: '#fff', position: 'relative' }}>
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  right: '24px',
                  top: '24px',
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  zIndex: 10,
                  transition: 'transform 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
                  (e.currentTarget as HTMLButtonElement).style.background = '#374151';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLButtonElement).style.background = '#000';
                }}
              >
                ×
              </button>

              <iframe
                src="https://calendly.com/pushkarsingh-carbonsync/30min?hide_event_type_details=1"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Calendly Scheduling"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>
        )}
    </>
  );
}
