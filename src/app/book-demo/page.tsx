'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Monitor, Calendar, Globe } from 'lucide-react';

export default function BookDemoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 flex items-center justify-center font-sans">
      <div className="w-full max-w-[1000px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col md:flex-row overflow-hidden border border-gray-200 min-h-[650px] relative">
        
        {/* Left Column: Event Details */}
        <div className="w-full md:w-[420px] p-8 md:p-10 flex flex-col shrink-0 bg-[#f4faf6] border-b md:border-b-0 md:border-r border-gray-200">
          
          <div className="flex flex-col items-center mb-8">
            <img src="/calendly-assets-logo.webp" alt="CarbonSync Logo" className="h-24 object-contain mb-5 drop-shadow-sm" />
            <div className="bg-green-100 text-green-800 font-bold px-4 py-1.5 rounded-full text-[14px] shadow-sm border border-green-200/60">
              Pushkar Singh
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-8 text-center md:text-left">
            CarbonSync Net Zero Discovery Call
          </h1>

          <div className="flex flex-col gap-4 mb-10 text-[15px]">
            <div className="flex gap-4 items-start">
              <Clock size={20} className="text-gray-500 shrink-0 mt-0.5" />
              <span className="font-semibold text-gray-700">30 min</span>
            </div>
            <div className="flex gap-4 items-start">
              <Monitor size={20} className="text-gray-500 shrink-0 mt-0.5" />
              <span className="font-semibold text-gray-700">Web conferencing details provided upon confirmation.</span>
            </div>
            <div className="flex gap-4 items-start">
              <Calendar size={20} className="text-[#3b82f6] shrink-0 mt-0.5" />
              <span className="font-semibold text-gray-700">10:30am - 11:00am, Tuesday, May 5, 2026</span>
            </div>
            <div className="flex gap-4 items-start">
              <Globe size={20} className="text-[#3b82f6] shrink-0 mt-0.5" />
              <span className="font-semibold text-gray-700">India Standard Time</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 text-[14px] text-gray-600 leading-relaxed font-medium">
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
        <div className="flex-1 relative bg-white min-h-[600px] md:min-h-auto w-full">
          {/* Close Button */}
          <button 
            onClick={() => router.back()}
            className="absolute right-4 top-4 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-lg font-bold z-10 transition-colors"
          >
            ×
          </button>

          <iframe 
            src="https://calendly.com/pushkarsingh-carbonsync/30min?hide_event_type_details=1&primary_color=059669&text_color=0f172a"
            className="absolute inset-0 w-full h-full border-0 rounded-b-2xl md:rounded-b-none md:rounded-r-2xl"
            title="Calendly Scheduling"
          />
        </div>
      </div>
    </div>
  );
}
