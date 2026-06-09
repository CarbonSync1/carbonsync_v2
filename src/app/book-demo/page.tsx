'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Video, Globe } from 'lucide-react';

export default function BookDemoPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/50 p-4 sm:p-8 font-sans">
      
      <div className="w-full max-w-[1060px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col md:flex-row overflow-hidden border border-gray-200/60 h-[700px]">
        
        {/* Left Column: Event Details */}
        <div className="w-full md:w-[400px] h-full overflow-y-auto bg-[#f2faf5] p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-200/50 flex flex-col shrink-0 custom-scrollbar">
          
          {/* Logo & Name Badge (Centered) */}
          <div className="flex flex-col items-center mb-8">
            <img 
              src="/netzero/carbonsync-logo.webp" 
              alt="CarbonSync Logo" 
              className="h-20 object-contain mb-4 drop-shadow-sm" 
            />
            <div className="bg-emerald-100 text-emerald-700 font-semibold px-4 py-1 rounded-full text-sm">
              Pushkar Singh
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[28px] font-bold text-slate-900 mb-6 leading-[1.2] tracking-tight">
            CarbonSync Net Zero Discovery Call
          </h1>

          {/* Icons & Details */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-start gap-3 text-slate-600 font-medium text-[15px]">
              <Clock className="w-5 h-5 shrink-0 text-slate-400 mt-0.5" strokeWidth={2} />
              <span>30 min</span>
            </div>
            
            <div className="flex items-start gap-3 text-slate-600 font-medium text-[15px]">
              <Video className="w-5 h-5 shrink-0 text-slate-400 mt-0.5" strokeWidth={2} />
              <span>Web conferencing details provided upon confirmation.</span>
            </div>

            <div className="flex items-start gap-3 text-slate-600 font-medium text-[15px]">
              <Globe className="w-5 h-5 shrink-0 text-slate-400 mt-0.5" strokeWidth={2} />
              <span>India Standard Time</span>
            </div>
          </div>

          {/* Description Text */}
          <div className="text-slate-600 text-[14.5px] leading-relaxed space-y-5 font-medium">
            <p>
              Thank you for interest in booking a Net Zero Discovery Call.
            </p>
            <p>
              Whether starting your Net Zero journey or looking to refine your existing strategy, our expert team will provide the insights and guidance you need to drive meaningful change.
            </p>
            <p>
              Book your Discovery Call today and take the first step towards a more sustainable and future-ready future.
            </p>
          </div>

        </div>

        {/* Right Column: Calendly Iframe */}
        <div className="flex-1 relative h-full bg-white">
          {/* Close Button matching the image (Black circle with X) */}
          <button 
            onClick={() => router.back()}
            className="absolute right-4 top-4 bg-black text-white hover:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-sm font-bold z-10 transition-colors shadow-sm"
            aria-label="Close"
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

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 20px;
        }
      `}} />
    </div>
  );
}
