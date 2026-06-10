'use client';

import React, { useState } from 'react';

export default function CalendlyWidget({ onClose }: { onClose: () => void }) {
  const [selectedDate, setSelectedDate] = useState<number | null>(18);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const daysInMonth = 30;
  const firstDayOffset = 0; 
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8 bg-slate-900/60 backdrop-blur-md font-sans"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[1050px] bg-white rounded-[24px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_40px_rgba(5,150,105,0.1)] flex flex-col md:flex-row overflow-hidden border border-white/20 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Column: Event Card */}
        <div className="w-full md:w-[420px] p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col shrink-0 bg-white">
          
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

        {/* Right Column: Calendar Mock UI */}
        <div className="flex-1 relative bg-white p-8 md:p-10 flex flex-col min-h-[550px]">
          <button 
            onClick={onClose}
            className="absolute right-5 top-5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="flex-1 flex flex-col max-w-[420px] w-full mx-auto mt-2 md:mt-0">
            <h2 className="text-[20px] font-bold text-gray-900 mb-8">Select a Date & Time</h2>
            
            <div className="flex items-center justify-between mb-6">
              <button className="text-gray-400 hover:bg-gray-50 p-2 rounded-full transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <span className="text-[15px] font-medium text-gray-900">June 2026</span>
              <button className="text-[#059669] hover:bg-green-50 p-2 rounded-full transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center mb-6">
              {weekdays.map(day => (
                <div key={day} className="text-[11px] font-bold text-gray-400 tracking-wider mb-2">{day}</div>
              ))}
              
              {Array.from({ length: firstDayOffset }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              
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
                      onClose();
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
