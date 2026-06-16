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
            className="w-full max-w-[1060px] h-[700px] bg-white rounded-[10px] shadow-2xl flex flex-col md:flex-row overflow-hidden relative"
            style={{
              boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.6), 0 0 60px rgba(16, 185, 129, 0.15)',
            }}
          >
            {/* Left Column */}
            <div className="w-full md:w-[380px] h-full overflow-y-auto bg-[#f0faf5] p-8 md:p-10 flex flex-col shrink-0 custom-scrollbar relative z-10 border-r border-gray-100">
              
              {/* Logo & Name Pill */}
              <div className="flex flex-col items-center mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/netzero/carbonsynqearth-logo.webp" 
                  alt="CarbonSynqEarth Logo" 
                  className="w-[140px] object-contain mb-3" 
                />
                <div className="bg-[#e0f8ea] text-[#15803d] font-bold px-3 py-1 rounded-full text-[13px] tracking-wide">
                  Pushkar Singh
                </div>
              </div>

              {/* Title */}
              <h1 className="text-[26px] font-bold text-[#111827] mb-6 leading-[1.25] tracking-tight font-sans">
                CarbonSynqEarth Net Zero Discovery Call
              </h1>

              {/* Details List */}
              <div className="flex flex-col gap-4 mb-8 font-sans">
                <div className="flex items-start gap-3 text-[#4b5563] font-medium text-[14px]">
                  <svg className="w-[18px] h-[18px] shrink-0 text-[#9ca3af] mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span>30 min</span>
                </div>
                
                <div className="flex items-start gap-3 text-[#4b5563] font-medium text-[14px]">
                  <svg className="w-[18px] h-[18px] shrink-0 text-[#9ca3af] mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                  <span className="leading-snug">Web conferencing details provided upon confirmation.</span>
                </div>

                <div className="flex items-start gap-3 text-[#4b5563] font-medium text-[14px]">
                  <svg className="w-[18px] h-[18px] shrink-0 text-[#9ca3af] mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span className="leading-snug">10:30am - 11:00am, Tuesday, May 5, 2026</span>
                </div>

                <div className="flex items-start gap-3 text-[#4b5563] font-medium text-[14px]">
                  <svg className="w-[18px] h-[18px] shrink-0 text-[#9ca3af] mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  <span>India Standard Time</span>
                </div>
              </div>

              {/* Paragraphs */}
              <div className="text-[#6b7280] text-[13px] leading-[1.6] space-y-4 font-medium font-sans">
                <p>
                  Book Your 30-Minute CarbonSynqEarth Net Zero Discovery Call.
                </p>
                <p>
                  Whether you're just beginning your Net Zero journey or looking to refine your existing strategy, our expert team will provide the insights and guidance you need to drive meaningful change.
                </p>
                <p>
                  Book your discovery call today and take the first step towards a more sustainable and responsible future.
                </p>
              </div>

            </div>

            {/* Right Column (Calendly) */}
            <div className="flex-1 relative h-full bg-white z-0">
              <button
                onClick={onClose}
                className="absolute right-0 top-0 bg-black text-white hover:bg-gray-800 rounded-bl-[10px] w-10 h-10 flex items-center justify-center cursor-pointer text-xl font-bold z-20 transition-colors"
                aria-label="Close modal"
              >
                ×
              </button>

              <iframe
                src="https://calendly.com/pushkarsingh-carbonsynqearth/30min?hide_event_type_details=1&primary_color=059669&text_color=0f172a"
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
