'use client';

import React from 'react';


export default function CalendlyWidget({ onClose }: { onClose: () => void }) {
  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8 bg-slate-900/60 backdrop-blur-md font-sans"
    >
      <div
        className="w-full max-w-[1150px] h-[90vh] min-h-[650px] bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_40px_rgba(5,150,105,0.1)] flex flex-col md:flex-row overflow-hidden border border-white/20 relative"
      >
        {/* Left Column: Event Card */}
        <div className="w-full md:w-[460px] p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col shrink-0 bg-white overflow-y-auto">
          
          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-green-50/80 p-3 rounded-2xl border border-green-100/50 flex items-center justify-center shrink-0">
              <img src="/netzero/carbonsync-logo.webp" alt="CarbonSync Logo" className="w-[45px] object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="text-xl font-bold text-gray-900 m-0">Pushkar Singh</h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.9998 15.1709L19.1928 5.97791L20.6068 7.39191L9.9998 17.9989L3.6358 11.6349L5.0498 10.2209L9.9998 15.1709Z" fill="#059669"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-500 m-0">Founder & ESG Strategy Advisor</p>
            </div>
          </div>

          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-[11px] font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-wide">ESG Reporting</span>
            <span className="text-[11px] font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-wide">Carbon Accounting</span>
            <span className="text-[11px] font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-wide">Net Zero Strategy</span>
          </div>
          
          <h2 className="text-[28px] font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
            CarbonSync Net Zero Discovery Call
          </h2>

          <p className="text-[15px] text-gray-600 leading-relaxed mb-8">
            A strategic consultation to assess your organization's sustainability maturity and define a practical Net Zero roadmap.
          </p>

          <div className="flex flex-col gap-5 mb-10">
            <div className="flex items-start gap-3">
              <svg className="text-gray-400 mt-0.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span className="text-[15px] font-medium text-gray-700">30 min</span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="text-gray-400 mt-0.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
              <span className="text-[15px] font-medium text-gray-700">Web conferencing details provided upon confirmation.</span>
            </div>
          </div>

          {/* Trust Elements Section */}
          <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 mt-auto">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">What to expect</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.9998 15.1709L19.1928 5.97791L20.6068 7.39191L9.9998 17.9989L3.6358 11.6349L5.0498 10.2209L9.9998 15.1709Z" fill="#059669"/></svg>
                <span className="text-sm font-medium text-gray-700">ESG Experts</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.9998 15.1709L19.1928 5.97791L20.6068 7.39191L9.9998 17.9989L3.6358 11.6349L5.0498 10.2209L9.9998 15.1709Z" fill="#059669"/></svg>
                <span className="text-sm font-medium text-gray-700">Carbon Accounting Specialists</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.9998 15.1709L19.1928 5.97791L20.6068 7.39191L9.9998 17.9989L3.6358 11.6349L5.0498 10.2209L9.9998 15.1709Z" fill="#059669"/></svg>
                <span className="text-sm font-medium text-gray-700">Sustainability Strategy Guidance</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Calendly Iframe */}
        <div className="flex-1 relative min-h-[600px] bg-white">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 md:right-6 md:top-6 bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-xl font-bold z-10 transition-colors"
          >
            ×
          </button>

          <iframe 
            src="https://calendly.com/pushkarsingh-carbonsync/30min?hide_event_type_details=1&primary_color=059669&text_color=0f172a"
            className="absolute inset-0 w-full h-full border-0"
            title="Calendly Scheduling"
          />
        </div>
      </div>
    </div>
  );
}
