'use client';

import { useEffect, useState } from 'react';

interface Particle {
  left: string;
  top: string;
  delay: string;
  duration: string;
}

const PLACEHOLDER: Particle = { left: '0%', top: '0%', delay: '0s', duration: '10s' };

function createParticles(): Particle[] {
  return Array.from({ length: 80 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${10 + Math.random() * 20}s`,
  }));
}

export default function ParticleField() {
  const [particles, setParticles] = useState<Particle[] | null>(null);

  useEffect(() => {
    setParticles(createParticles());
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {(particles ?? Array(80).fill(PLACEHOLDER)).map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
