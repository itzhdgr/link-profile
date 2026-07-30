import React, { useEffect, useState } from 'react';

export const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate 25 soft floating particles
    const generatedParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 6 + 2, // 2px to 8px
      duration: Math.random() * 15 + 15, // 15s to 30s
      delay: Math.random() * 10,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
};
