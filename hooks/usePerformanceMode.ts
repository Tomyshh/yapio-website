'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/lib/performance';

/**
 * Mode perf = désactiver effets coûteux (parallax / smooth scroll / blur / animations infinies)
 * sur mobile/tactile et si l'utilisateur préfère réduire les animations.
 */
export function usePerformanceMode(breakpointPx = 900) {
  const [performanceMode, setPerformanceMode] = useState(true);

  useEffect(() => {
    const isCoarsePointer =
      !!window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const isSmallScreen = window.innerWidth < breakpointPx;
    setPerformanceMode(isCoarsePointer || prefersReducedMotion() || isSmallScreen);
  }, [breakpointPx]);

  return performanceMode;
}

