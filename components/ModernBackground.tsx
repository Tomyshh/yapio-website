'use client';

import React, { memo } from 'react';

// Version ultra-optimisée du background moderne
function ModernBackgroundComponent() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base (neutre, pro) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#07070A] to-black" />

      {/* Grain très subtil (évite l'effet "gris" entre sections) */}
      <div className="absolute inset-0 bg-noise opacity-[0.18]" />
      {/* Légère couche noire pour garder un fond uniforme */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Accent unique (primary) - très discret */}
      <div
        className="absolute -top-[35%] -left-[25%] w-[70%] h-[70%] blur-[60px] opacity-60 will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(119,55,233,0.20) 0%, rgba(119,55,233,0.06) 35%, transparent 70%)',
          animation: 'modernFlow 22s ease-in-out infinite alternate',
          transform: 'translateZ(0)',
        }}
      />

      {/* Fill neutre pour la profondeur */}
      <div
        className="absolute -bottom-[40%] -right-[30%] w-[80%] h-[80%] blur-[70px] opacity-50"
        style={{
          background:
            'radial-gradient(circle at 60% 60%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 35%, transparent 70%)',
        }}
      />

      {/* Vignette finale */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(0,0,0,0.82)_100%)]" />
    </div>
  );
}

// Mémorisation pour éviter les re-renders inutiles
export default memo(ModernBackgroundComponent);
