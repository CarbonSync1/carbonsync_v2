'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Video, Globe, CheckCircle, ArrowLeft } from 'lucide-react';

export default function BookDemoPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex flex-col" style={{ paddingTop: '64px' }}>

      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #f0f7f2 0%, #f5f9f6 50%, #eef6f1 100%)', zIndex: 0 }} />

      {/* Main Card — fills remaining viewport */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6" style={{ zIndex: 1 }}>
        <div
          className="w-full bg-white rounded-2xl overflow-hidden border border-gray-100"
          style={{
            maxWidth: 1020,
            height: '100%',
            maxHeight: 720,
            display: 'flex',
            flexDirection: 'row',
            boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
          }}
        >

          {/* ── LEFT PANEL ── */}
          <div
            style={{
              width: 380,
              minWidth: 340,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              borderRight: '1px solid #f0f0f0',
              background: 'linear-gradient(180deg, #f2fbf6 0%, #ffffff 100%)',
              overflowY: 'auto',
            }}
          >
            {/* Top accent bar */}
            <div style={{ height: 4, background: 'linear-gradient(90deg, #34d399, #10b981, #059669)', borderRadius: '8px 0 0 0', flexShrink: 0 }} />

            <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', flex: 1 }}>

              {/* Logo + Badge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
                <img src="/netzero/carbonsync-logo.webp" alt="CarbonSync" style={{ height: 60, width: 60, objectFit: 'contain', marginBottom: 10 }} />
                <span style={{ fontSize: 18, fontWeight: 700, color: '#1a2e35', letterSpacing: '-0.3px', marginBottom: 8 }}>
                  carbon<span style={{ color: '#10b981' }}>sync</span>
                </span>
                <span style={{ background: '#d1fae5', color: '#065f46', fontWeight: 600, padding: '4px 16px', borderRadius: 999, fontSize: 13 }}>
                  Pushkar Singh
                </span>
              </div>

              {/* Title */}
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111827', lineHeight: 1.3, marginBottom: 20, letterSpacing: '-0.3px' }}>
                CarbonSync Net Zero<br />Discovery Call
              </h1>

              {/* Divider */}
              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #a7f3d0, transparent)', marginBottom: 20 }} />

              {/* Meta */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {[
                  { Icon: Clock, text: '30 min' },
                  { Icon: Video, text: 'Web conferencing details provided upon confirmation.' },
                  { Icon: Globe, text: 'India Standard Time' },
                ].map(({ Icon, text }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <Icon size={15} color="#059669" strokeWidth={2} />
                    </div>
                    <span style={{ fontSize: 13.5, color: '#4b5563', fontWeight: 500, lineHeight: 1.5, paddingTop: 6 }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                <p style={{ fontSize: 13, color: '#374151', fontWeight: 600, margin: 0 }}>Book Your 30-Minute CarbonSync Net Zero Discovery Call.</p>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65, margin: 0 }}>
                  Whether you're just beginning your Net Zero journey or looking to refine your existing strategy, our expert team will provide the insights and guidance you need to drive meaningful change.
                </p>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65, margin: 0 }}>
                  Book your discovery call today and take the first step towards a more sustainable and responsible future.
                </p>
              </div>

              {/* What to expect */}
              <div style={{ marginTop: 'auto', background: 'rgba(236,253,245,0.7)', border: '1px solid #a7f3d0', borderRadius: 12, padding: '18px 20px' }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#059669', margin: '0 0 12px 0' }}>What to expect</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['ESG maturity assessment', 'Personalized Net Zero roadmap', 'Carbon accounting walkthrough'].map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle size={15} color="#10b981" strokeWidth={2} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT PANEL: Calendly ── */}
          <div style={{ flex: 1, position: 'relative', background: '#fff', minWidth: 0 }}>

            {/* Close button */}
            <button
              onClick={() => router.back()}
              style={{
                position: 'absolute', top: 12, right: 12, zIndex: 10,
                width: 32, height: 32, borderRadius: '50%',
                background: '#111', color: '#fff', border: 'none',
                fontSize: 18, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
              aria-label="Close"
            >
              ×
            </button>

            <iframe
              src="https://calendly.com/pushkarsingh-carbonsync/30min?hide_event_type_details=1&primary_color=059669&text_color=0f172a"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              title="Calendly Scheduling"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

