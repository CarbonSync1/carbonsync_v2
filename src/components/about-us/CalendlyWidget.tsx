'use client';

import React from 'react';
import { Clock, Video, Globe, Calendar } from 'lucide-react';

export default function CalendlyWidget({ onClose }: { onClose: () => void }) {
  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm font-sans"
      onClick={onClose}
    >
      {/* Main Card */}
      <div 
        className="w-full max-w-[1060px] h-[700px] bg-white rounded-[10px] shadow-2xl flex flex-col md:flex-row overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button (Matching Image) */}
        <button 
          onClick={onClose}
          className="absolute right-0 top-0 bg-black text-white hover:bg-gray-800 rounded-bl-[10px] w-10 h-10 flex items-center justify-center cursor-pointer text-xl font-bold z-20"
          aria-label="Close"
        >
          ×
        </button>

        {/* Left Column */}
        <div className="w-full md:w-[380px] h-full overflow-y-auto bg-[#f0faf5] p-8 md:p-10 flex flex-col shrink-0 custom-scrollbar relative z-10 border-r border-gray-100">
          
          {/* Logo & Name Pill */}
          <div className="flex flex-col items-center mb-8">
            <img 
              src="/netzero/carbonsync-logo.webp" 
              alt="CarbonSync Logo" 
              className="w-[140px] object-contain mb-3" 
            />
            <div className="bg-[#e0f8ea] text-[#15803d] font-bold px-3 py-1 rounded-full text-[12px] tracking-wide">
              Pushkar Singh
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[26px] font-bold text-[#111827] mb-6 leading-[1.25] tracking-tight">
            CarbonSync Net Zero Discovery Call
          </h1>

          {/* Details List */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-start gap-3 text-[#4b5563] font-medium text-[14px]">
              <Clock className="w-[18px] h-[18px] shrink-0 text-[#9ca3af] mt-0.5" strokeWidth={2} />
              <span>30 min</span>
            </div>
            
            <div className="flex items-start gap-3 text-[#4b5563] font-medium text-[14px]">
              <Video className="w-[18px] h-[18px] shrink-0 text-[#9ca3af] mt-0.5" strokeWidth={2} />
              <span className="leading-snug">Web conferencing details provided upon confirmation.</span>
            </div>

            <div className="flex items-start gap-3 text-[#4b5563] font-medium text-[14px]">
              <Calendar className="w-[18px] h-[18px] shrink-0 text-[#9ca3af] mt-0.5" strokeWidth={2} />
              <span className="leading-snug">12:30pm - 1:00pm, Tuesday, May 9, 2023</span>
            </div>

            <div className="flex items-start gap-3 text-[#4b5563] font-medium text-[14px]">
              <Globe className="w-[18px] h-[18px] shrink-0 text-[#9ca3af] mt-0.5" strokeWidth={2} />
              <span>India Standard Time</span>
            </div>
          </div>

          {/* Paragraphs */}
          <div className="text-[#6b7280] text-[13px] leading-[1.6] space-y-4 font-medium">
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

        {/* Right Column (Calendly) */}
        <div className="flex-1 relative h-full bg-white z-0">
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
