'use client';

import { memo } from 'react';

/**
 * Fond global fixe : une seule surface visuelle sous tout le défilement,
 * sans recomposition par section (plus de « lignes » entre blocs).
 */
function ContinuousPageBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(168deg, #040406 0%, #06060d 24%, #080812 48%, #06060a 72%, #050508 100%)',
        }}
      />

      <div className="absolute -top-[18%] left-1/2 h-[min(130vw,100vh)] w-[min(130vw,100vh)] -translate-x-1/2 rounded-full bg-[#7737E9]/[0.065] blur-[min(28vw,140px)]" />
      <div className="absolute bottom-[-22%] right-[-12%] h-[min(95vw,80vh)] w-[min(95vw,80vh)] rounded-full bg-[#5E1FD4]/[0.055] blur-[min(24vw,120px)]" />
      <div className="absolute top-[42%] -left-[18%] h-[min(75vh,720px)] w-[min(75vh,720px)] rounded-full bg-[#7737E9]/[0.035] blur-[80px]" />

      <div className="absolute inset-0 bg-noise opacity-[0.11]" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.42) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.42) 100%)',
        }}
      />
    </div>
  );
}

export default memo(ContinuousPageBackdrop);
