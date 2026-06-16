'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookDemoClient() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<number | null>(18);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Mock calendar data
  const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const daysInMonth = 30;
  const firstDayOffset = 0; // starts on Monday
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div data-version="2.0" className="flex items-center justify-center min-h-screen p-4 sm:p-8 bg-[#f4fdf8] relative font-sans">
      <div className="w-full max-w-[1050px] bg-white rounded-[24px] shadow-[0_20px_40px_-15px_rgba(5,150,105,0.15)] flex flex-col md:flex-row overflow-hidden border border-green-100/50 relative z-10">
        
        {/* Left Column */}
        <div className="w-full md:w-[380px] h-full overflow-y-auto bg-[#f0faf5] p-8 md:p-10 flex flex-col shrink-0 custom-scrollbar relative z-10 border-r border-gray-100">
          
          {/* Logo & Name Pill */}
          <div className="flex flex-col items-center mb-8">
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
          <h1 className="text-[26px] font-bold text-[#111827] mb-6 leading-[1.25] tracking-tight">
            CarbonSynqEarth Net Zero Discovery Call
          </h1>

          {/* Details List */}
          <div className="flex flex-col gap-4 mb-8">
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
          <div className="text-[#6b7280] text-[13px] leading-[1.6] space-y-4 font-medium">
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

        {/* Right Column: Calendar Mock UI */}
        <div className="flex-1 relative bg-white p-8 md:p-10 flex flex-col min-h-[550px]">
          {/* Close Button */}
          <button 
            onClick={() => router.back()}
            className="absolute right-5 top-5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="flex-1 flex flex-col max-w-[420px] w-full mx-auto mt-2 md:mt-0">
            <h2 className="text-[20px] font-bold text-gray-900 mb-8">Select a Date & Time</h2>
            
            {/* Month Selector */}
            <div className="flex items-center justify-between mb-6">
              <button className="text-gray-400 hover:bg-gray-50 p-2 rounded-full transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <span className="text-[15px] font-medium text-gray-900">June 2026</span>
              <button className="text-[#059669] hover:bg-green-50 p-2 rounded-full transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center mb-6">
              {weekdays.map(day => (
                <div key={day} className="text-[11px] font-bold text-gray-400 tracking-wider mb-2">{day}</div>
              ))}
              
              {/* Empty slots for first day offset */}
              {Array.from({ length: firstDayOffset }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              
              {/* Days */}
              {days.map(day => {
                const isWeekend = (day + firstDayOffset) % 7 === 6 || (day + firstDayOffset) % 7 === 0;
                const isPast = day < 15;
                const isDisabled = isWeekend || isPast || day === 22 || day === 25;
                const isSelected = day === selectedDate;
                
                return (
                  <div key={day} className="flex justify-center">
                    <button 
                      onClick={() => !isDisabled && setSelectedDate(day)}
                      disabled={isDisabled}
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-medium transition-all
                        ${isSelected 
                          ? 'bg-[#059669] text-white shadow-md' 
                          : isDisabled 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-gray-700 hover:bg-green-50 hover:text-[#059669] bg-green-50/40'
                        }
                      `}
                    >
                      {day}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Time Slots (Visible if date selected) */}
            {selectedDate && (
              <div className="mt-auto border-t border-gray-100 pt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-[14px] font-semibold text-gray-800 mb-4">
                  Available times for June {selectedDate}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:00 PM'].map(time => (
                    <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        py-2.5 rounded-lg border text-[13px] font-medium transition-all
                        ${selectedTime === time 
                          ? 'bg-[#059669] border-[#059669] text-white shadow-sm' 
                          : 'bg-white border-gray-200 text-gray-700 hover:border-[#059669] hover:text-[#059669]'
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                
                {selectedTime && (
                  <button 
                    onClick={() => {
                      alert('Demo booking successful!');
                      router.back();
                    }}
                    className="w-full mt-6 bg-[#059669] hover:bg-green-700 text-white font-medium py-3 rounded-xl transition-colors shadow-sm animate-in fade-in zoom-in-95 duration-200"
                  >
                    Confirm Selection
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
