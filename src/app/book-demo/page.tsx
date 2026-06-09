'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function BookDemoPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 bg-[#f4fdf8] relative font-sans">
      <div className="w-full max-w-[1050px] bg-white rounded-[24px] shadow-[0_20px_40px_-15px_rgba(5,150,105,0.15)] flex flex-col md:flex-row overflow-hidden border border-green-100/50 relative z-10">
        
        {/* Left Column: Event Card */}
        <div className="w-full md:w-[420px] p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col shrink-0 bg-white">
          
          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-50/80 w-14 h-14 rounded-2xl border border-green-100/50 flex items-center justify-center shrink-0">
              <img src="/netzero/carbonsync-logo.webp" alt="CarbonSync Logo" className="w-[32px] object-contain" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="text-[17px] font-bold text-gray-900 m-0 leading-none">Pushkar Singh</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.9998 15.1709L19.1928 5.97791L20.6068 7.39191L9.9998 17.9989L3.6358 11.6349L5.0498 10.2209L9.9998 15.1709Z" fill="#059669"/>
                </svg>
              </div>
              <p className="text-[13px] font-medium text-gray-500 m-0 leading-none mt-1">Founder & ESG Strategy Advisor</p>
            </div>
          </div>

          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-2 mb-7">
            <span className="text-[11px] font-bold text-green-800 bg-green-50 px-3 py-1.5 rounded-md uppercase tracking-wide leading-none">ESG Reporting</span>
            <span className="text-[11px] font-bold text-green-800 bg-green-50 px-3 py-1.5 rounded-md uppercase tracking-wide leading-none">Carbon Accounting</span>
          </div>
          
          <h2 className="text-[24px] font-extrabold text-gray-900 leading-[1.2] tracking-tight mb-3">
            CarbonSync Net Zero Discovery Call
          </h2>

          <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
            A strategic consultation to assess your organization's sustainability maturity and define a practical roadmap.
          </p>

          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-3">
              <svg className="text-gray-400 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span className="text-[14px] font-medium text-gray-700 leading-none pt-0.5">30 min</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="text-gray-400 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
              <span className="text-[14px] font-medium text-gray-700 leading-none pt-0.5">Web conferencing details provided.</span>
            </div>
          </div>

          {/* Trust Elements Section */}
          <div className="bg-gray-50/60 p-5 rounded-xl border border-gray-100 mt-auto">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-3">What to expect</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.9998 15.1709L19.1928 5.97791L20.6068 7.39191L9.9998 17.9989L3.6358 11.6349L5.0498 10.2209L9.9998 15.1709Z" fill="#059669"/></svg>
                <span className="text-[13px] font-medium text-gray-700">ESG Experts</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.9998 15.1709L19.1928 5.97791L20.6068 7.39191L9.9998 17.9989L3.6358 11.6349L5.0498 10.2209L9.9998 15.1709Z" fill="#059669"/></svg>
                <span className="text-[13px] font-medium text-gray-700">Carbon Accounting Specialists</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.9998 15.1709L19.1928 5.97791L20.6068 7.39191L9.9998 17.9989L3.6358 11.6349L5.0498 10.2209L9.9998 15.1709Z" fill="#059669"/></svg>
                <span className="text-[13px] font-medium text-gray-700">Sustainability Strategy Guidance</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Calendly Iframe */}
        <div className="flex-1 relative min-h-[600px] md:min-h-[700px] bg-white">
          {/* Close Button */}
          <button 
            onClick={() => router.back()}
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
