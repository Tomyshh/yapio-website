'use client';

import React, { ReactNode, RefObject } from 'react';

interface ParallaxBackgroundProps {
  targetRef: RefObject<HTMLElement | null>;
  className?: string;
  /**
   * Conservé pour compatibilité API ; le défilement parallaxe a été retiré (perfs scroll).
   */
  yRange?: [string, string];
  children: ReactNode;
}

/**
 * Conteneur d’arrière-plan statique. Le parallax lié au scroll a été retiré pour éviter
 * saccades / lag (Framer useScroll + couches floues sur Windows).
 */
export default function ParallaxBackground({
  targetRef: _targetRef,
  className = '',
  yRange: _yRange,
  children,
}: ParallaxBackgroundProps) {
  void _targetRef;
  void _yRange;
  return <div className={className}>{children}</div>;
}
