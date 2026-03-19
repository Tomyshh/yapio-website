'use client';

import { useEffect, memo } from 'react';

interface SEOOptimizerProps {
  children: React.ReactNode;
}

// Version ultra-légère du SEOOptimizer - garde seulement l'essentiel
function SEOOptimizerComponent({ children }: SEOOptimizerProps) {
  useEffect(() => {
    // Optimisation minimaliste - seulement les fonctions critiques
    const optimizeCore = () => {
      // Lazy loading des images uniquement
      const images = document.querySelectorAll('img[data-src]');
      if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        }, { rootMargin: '50px' });

        images.forEach((img) => imageObserver.observe(img));
      }

      // Web Vitals tracking seulement si nécessaire
      if (process.env.NODE_ENV === 'production') {
        import('web-vitals').then(({ onLCP, onFID, onCLS }) => {
          onLCP(console.log);
          onFID(console.log);
          onCLS(console.log);
        }).catch(() => {});
      }
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(optimizeCore, { timeout: 2500 });
    } else if (typeof window !== 'undefined') {
      timeoutId = setTimeout(optimizeCore, 800);
    }

    return () => {
      if (idleId !== undefined && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return <>{children}</>;
}

export default memo(SEOOptimizerComponent);
