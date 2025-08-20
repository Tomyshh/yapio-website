'use client';

import React, { memo } from 'react';

// Version ultra-optimisée du background moderne
function ModernBackgroundComponent() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark gradient - simplifié */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
      
      {/* Gradient principal optimisé - réduit le nombre d'éléments */}
      <div className="absolute inset-0">
        {/* Gradient principal unifié */}
        <div className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] bg-gradient-to-br from-primary/20 via-purple-600/15 to-blue-600/15 blur-[100px] opacity-50 will-change-transform" 
             style={{ 
               animation: 'modernFlow 20s ease-in-out infinite alternate',
               transform: 'translateZ(0)' // Force GPU acceleration
             }} />
      </div>
      
      {/* Vignette finale optimisée */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
}

// Mémorisation pour éviter les re-renders inutiles
export default memo(ModernBackgroundComponent);
