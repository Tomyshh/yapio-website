'use client';

import React from 'react';

export default function ModernBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
      
      {/* Animated gradient meshes - Ultra modern */}
      <div className="absolute inset-0">
        {/* Primary flowing gradient */}
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-purple-600/20 blur-[150px] animate-modern-flow opacity-60" />
        </div>
        
        {/* Secondary flowing gradient */}
        <div className="absolute -bottom-[40%] -right-[20%] w-[70%] h-[70%]">
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-600/20 via-transparent to-primary/25 blur-[130px] animate-modern-flow-reverse opacity-50" />
        </div>
        
        {/* Dynamic center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent blur-[100px] animate-gradient-shift opacity-40" />
        </div>
        
        {/* Accent gradients */}
        <div className="absolute top-[20%] right-[30%] w-[300px] h-[300px]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 to-transparent blur-[80px] animate-float-slow opacity-60" />
        </div>
        
        <div className="absolute bottom-[30%] left-[25%] w-[250px] h-[250px]">
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/15 to-transparent blur-[70px] animate-float-slow opacity-50" style={{ animationDelay: '5s' }} />
        </div>
      </div>
      
      {/* Subtle animated light rays */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-[40%] w-[1px] h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent blur-sm animate-slide-down" />
        <div className="absolute left-0 top-[45%] w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-sm animate-slide-right" style={{ animationDelay: '7s' }} />
      </div>
      
      {/* Mesh pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="modernNoise">
            <feTurbulence type="fractalNoise" baseFrequency="2" numOctaves="1" />
          </filter>
          <rect width="100%" height="100%" filter="url(#modernNoise)" />
        </svg>
      </div>
      
      {/* Final vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
}
