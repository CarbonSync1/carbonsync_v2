'use client'

export default function ClientLogos({ className = '' }: { className?: string }) {
  const logos = [
    '🟢',
    '🔵',
    '🟣',
    '🟠',
    '🟡',
  ];
  return (
    <div className={`flex flex-wrap items-center gap-4 justify-center ${className}`}>
      {logos.map((logo, i) => (
        <div key={i} className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-2xl">
          {logo}
        </div>
      ))}
    </div>
  );
}
