'use client'

export default function WaveDivider() {
  return (
    <svg
      className="w-full h-24"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="url(#gradient)"
        d="M0,160 C360,260 720,0 1080,160 C1440,320 1440,320 1440,320 L0,320 Z"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
