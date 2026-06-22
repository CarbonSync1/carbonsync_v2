'use client';

import { useState, useEffect } from 'react';

export function LaunchTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(`June 22, ${currentYear} 11:00:00`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setIsLaunched(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#020604] py-24 md:py-32">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className={`w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full blur-[100px] md:blur-[150px] transition-colors duration-1000 ${isLaunched ? 'bg-eco-green/30' : 'bg-emerald-500/15'}`} />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-[5%] text-center">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <span className={`w-2 h-2 rounded-full ${isLaunched ? 'bg-eco-green' : 'bg-emerald-400 animate-pulse'}`} />
          <span className="text-white/80 text-[10px] md:text-xs font-semibold tracking-widest uppercase">
            {isLaunched ? 'Live Now' : 'Global Launch'}
          </span>
        </div>

        <h2 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
          {isLaunched ? 'The Future is Here' : 'Arriving June 22'}
        </h2>

        <p className="text-lg md:text-xl text-white/50 font-medium mb-20 max-w-2xl mx-auto">
          {isLaunched
            ? 'CarbonSynqEarth Enterprise Edition is now globally available.'
            : 'CarbonSynqEarth Enterprise Edition goes live globally at 11:00 AM IST.'}
        </p>

        {isLaunched ? (
          <div className="flex justify-center items-center py-4">
            <div className="animate-pulse bg-gradient-to-r from-emerald-500/10 to-eco-green/10 border border-emerald-500/20 px-8 py-5 md:px-12 md:py-6 rounded-3xl backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.2)]">
              <h3 className="font-heading text-3xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-white tracking-[0.2em] md:tracking-[0.4em] uppercase">
                LAUNCHED
              </h3>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-baseline gap-2 md:gap-8">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, idx, arr) => (
              <div key={idx} className="flex items-baseline">
                <div className="flex flex-col items-center w-16 md:w-32">
                  <span className="text-5xl md:text-[6rem] font-light text-white tabular-nums tracking-tighter leading-none">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] md:text-sm font-medium text-white/40 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-6">
                    {item.label}
                  </span>
                </div>

                {idx !== arr.length - 1 && (
                  <span className="text-4xl md:text-7xl font-light text-white/20 mx-2 md:mx-4 -translate-y-10 md:-translate-y-12">
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
