'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Monitor, Calendar, Globe } from 'lucide-react';

export default function BookDemoPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 bg-[#e8ecef] relative font-sans">
      <div className="w-full max-w-[1050px] bg-white rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-200 relative z-10 min-h-[700px]">
        
        {/* Left Column: Event Details */}
        <div className="w-full md:w-[420px] p-8 md:p-10 flex flex-col shrink-0 bg-[#f4faf6] border-r border-gray-200">
          
          <div className="flex flex-col items-center mb-8 mt-2">
            <img src="/calendly-assets-logo.webp" alt="CarbonSync Logo" className="h-28 object-contain mb-5" />
            <div className="bg-[#ccf0dd] text-[#059669] font-bold px-5 py-1.5 rounded-full text-[15px]">
              Pushkar Singh
            </div>
          </div>
          
          <h1 className="text-[28px] font-bold text-[#0f172a] leading-[1.3] mb-8">
            CarbonSync Net Zero Discovery Call
          </h1>

          <div className="flex flex-col gap-4 mb-10 text-[15px] text-[#475569]">
            <div className="flex gap-4 items-start">
              <Clock size={20} className="text-gray-400 shrink-0 mt-0.5" />
              <span className="font-medium">30 min</span>
            </div>
            <div className="flex gap-4 items-start">
              <Monitor size={20} className="text-gray-400 shrink-0 mt-0.5" />
              <span className="font-medium text-[#475569]">Web conferencing details provided upon confirmation.</span>
            </div>
            <div className="flex gap-4 items-start">
              <Calendar size={20} className="text-[#3b82f6] shrink-0 mt-0.5" />
              <span className="font-medium text-[#475569]">10:30am - 11:00am, Tuesday, May 5, 2026</span>
            </div>
            <div className="flex gap-4 items-start">
              <Globe size={20} className="text-[#3b82f6] shrink-0 mt-0.5" />
              <span className="font-medium text-[#475569]">India Standard Time</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 text-[15px] text-[#475569] leading-relaxed">
            <p>
              Book Your 30-Minute CarbonSync Net Zero Discovery Call.
            </p>
            <p>
              Whether you're just beginning your Net Zero journey or looking to refine your existing strategy, our expert team will provide the insights and guidance you need to drive meaningful change.
            </p>
            <p>
              Book your discovery call today and take the first step towards a more sustainable and responsible future.
            </p>
          </div>

        </div>

        {/* Right Column: Calendly Iframe */}
        <div className="flex-1 relative bg-white min-h-[600px] md:min-h-[700px]">
          {/* Close Button */}
          <button 
            onClick={() => router.back()}
            className="absolute right-4 top-4 md:right-6 md:top-6 bg-black text-white hover:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-lg font-bold z-10 transition-colors shadow-md"
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
