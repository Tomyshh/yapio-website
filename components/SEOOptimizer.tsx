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

    // Exécution différée pour ne pas bloquer le rendu
    const timer = setTimeout(optimizeCore, 1000);
    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}

export default memo(SEOOptimizerComponent);
