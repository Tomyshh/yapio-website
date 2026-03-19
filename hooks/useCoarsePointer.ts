'use client';

import { useEffect, useState } from 'react';

/**
 * true sur mobile / tactile — pour désactiver effets coûteux (magnétique, suivi souris canvas).
 */
export function useCoarsePointer(breakpointPx = 768): boolean {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const update = () => {
      setCoarse(mq.matches || window.innerWidth < breakpointPx);
    };
    update();
    mq.addEventListener('change', update);
    window.addEventListener('resize', update, { passive: true });
    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, [breakpointPx]);

  return coarse;
}
