'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function BookDemoPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 bg-[#f4fdf8] relative font-sans">
      <div className="w-full max-w-[1050px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden relative z-10 min-h-[700px]">
        
        {/* Close Button overlaying Calendly */}
        <button 
          onClick={() => router.back()}
          className="absolute right-4 top-4 md:right-6 md:top-6 bg-gray-900 text-white hover:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-lg font-bold z-20 transition-colors shadow-md"
        >
          ×
        </button>

        {/* Full Width Native Calendly Iframe */}
        <div className="flex-1 w-full relative">
          <iframe 
            src="https://calendly.com/pushkarsingh-carbonsync/30min?primary_color=059669&text_color=0f172a"
            className="absolute inset-0 w-full h-full border-0"
            title="Calendly Scheduling"
          />
        </div>

      </div>
    </div>
  );
}
