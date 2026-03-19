'use client';

import React, { useState, useEffect, CSSProperties } from 'react';

export interface HeroAuroraBackgroundProps {
  /** Number of animated light beams */
  beamCount?: number;
}

const DEFAULT_BEAM_COUNT = 60;

const HeroAuroraBackground: React.FC<HeroAuroraBackgroundProps> = ({
  beamCount = DEFAULT_BEAM_COUNT,
}) => {
  const [beams, setBeams] = useState<
    Array<{ id: number; style: CSSProperties }>
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: beamCount }).map((_, i) => {
      const riseDur = Math.random() * 2 + 4; // 4–6s rise
      const fadeDur = riseDur;
      const dropDur = Math.random() * 3 + 3; // 3–6s drop

      return {
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 3) + 1}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${riseDur}s, ${fadeDur}s, ${dropDur}s`,
        },
      };
    });
    setBeams(generated);
  }, [beamCount]);

  return (
    <div
      className="hero-aurora-scene"
      role="img"
      aria-label="Animated digital data background"
    >
      <div className="hero-aurora-floor" />
      <div className="hero-aurora-main-column" />
      <div className="hero-aurora-light-stream-container">
        {beams.map((beam) => (
          <div
            key={beam.id}
            className="hero-aurora-light-beam"
            style={beam.style}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroAuroraBackground;
