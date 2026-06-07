'use client'

import { useEffect, useState } from 'react';

interface LiveCounterProps {
  count?: number;
  label?: string;
}

export default function LiveCounter({ count = 500, label = 'emissions datasets processed today' }: LiveCounterProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = count / (duration / 16);
    const step = () => {
      start += increment;
      if (start >= count) {
        setDisplay(count);
        return;
      }
      setDisplay(Math.floor(start));
      requestAnimationFrame(step);
    };
    step();
  }, [count]);

  return (
    <div
      className="flex items-center gap-2 text-emerald-200 text-lg md:text-xl"
    >
      <span className="font-mono font-semibold">{display.toLocaleString()}+</span>
      <span>{label}</span>
    </div>
  );
}
