'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from '@/lib/performance';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Sur mobile/tactile ou si l'utilisateur préfère réduire les animations,
    // on désactive le smooth scroll (évite le "vibre/clignote" + surconsommation CPU/GPU).
    const isCoarsePointer =
      typeof window !== 'undefined' &&
      !!window.matchMedia &&
      window.matchMedia('(pointer: coarse)').matches;

    const hasTouch =
      typeof navigator !== 'undefined' &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (('maxTouchPoints' in navigator && (navigator as any).maxTouchPoints > 0) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ('msMaxTouchPoints' in navigator && (navigator as any).msMaxTouchPoints > 0));

    if (isCoarsePointer || hasTouch || prefersReducedMotion()) {
      return;
    }

    // Initialiser Lenis
    lenisRef.current = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Animation frame loop
    let rafId = 0;
    let isActive = true;
    function raf(time: number) {
      if (!isActive) return;
      lenisRef.current?.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      isActive = false;
      if (rafId) cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
