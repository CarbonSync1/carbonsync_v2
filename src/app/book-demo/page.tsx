'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

export default function BookDemoPage() {
  const router = useRouter();

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh",
      padding: "20px",
      background: "#020617", 
      position: "relative",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          height: "90vh",
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          display: "flex",
          overflow: "hidden",
          position: "relative"
        }}
      >
        {/* Left Column: Event Card */}
        <div className="event-card" style={{
          width: "420px",
          padding: "40px",
          borderRight: "1px solid #f1f5f9",
          overflowY: "auto"
        }}>
          <img src="/calendly-assets-logo.webp" className="logo" alt="Logo" style={{ width: "60px", marginBottom: "10px" }} />
          
          <p className="host" style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
            Pushkar Singh
          </p>
          
          <h2 className="title" style={{ fontSize: "28px", margin: "5px 0 15px", color: "#1f2937", fontWeight: "700" }}>
            CarbonSync Net Zero Discovery Call
          </h2>

          <div className="meta" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <p style={{ margin: "6px 0", color: "#374151", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⏱</span> 30 min
            </p>
            <p style={{ margin: "6px 0", color: "#374151", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>💻</span> Web conferencing details provided upon confirmation.
            </p>
            <p style={{ margin: "6px 0", color: "#374151", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>📅</span> 10:30am - 11:00am, Tuesday, May 5, 2026
            </p>
            <p style={{ margin: "6px 0", color: "#374151", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🌍</span> India Standard Time
            </p>
          </div>

          <p className="desc" style={{ marginTop: "25px", color: "#374151", lineHeight: "1.6", fontSize: "15px" }}>
            Book Your 30-Minute CarbonSync Net Zero Discovery Call.
          </p>

          <p className="desc" style={{ marginTop: "15px", color: "#374151", lineHeight: "1.6", fontSize: "15px" }}>
            Whether you're just beginning your Net Zero journey or looking to refine your existing strategy, 
            our expert team will provide the insights and guidance you need to drive meaningful change.
          </p>

          <p className="desc" style={{ marginTop: "15px", color: "#374151", lineHeight: "1.6", fontSize: "15px" }}>
            Book your discovery call today and take the first step towards a more sustainable and responsible future.
          </p>
        </div>

        {/* Right Column: Calendly Iframe */}
        <div style={{ flex: 1, background: "#fff", position: "relative" }}>
          {/* Close Button */}
          <button 
            onClick={() => router.back()}
            style={{
              position: "absolute",
              right: "24px",
              top: "24px",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              fontSize: "20px",
              fontWeight: "bold",
              zIndex: 10
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
          />
        </div>
      </div>
    </div>
  );
}
