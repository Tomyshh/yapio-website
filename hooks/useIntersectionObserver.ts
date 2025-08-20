'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Version ultra-optimisée de l'intersection observer
export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  
  // Mémorisation de l'observer pour éviter les re-créations
  const observer = useMemo(() => {
    if (typeof window === 'undefined') return null;
    
    return new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Si triggerOnce, on disconnecte immédiatement
          if (triggerOnce) {
            observer?.disconnect();
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );
  }, [threshold, rootMargin, triggerOnce]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !observer) return;

    observer.observe(element);

    return () => observer.disconnect();
  }, [observer]);

  return { elementRef, isIntersecting };
}

// Hook simplifié pour les animations échelonnées
export function useStaggeredAnimation(itemCount: number, delay: number = 50) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() => 
    new Array(itemCount).fill(false)
  );
  const { elementRef, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting) {
      // Animation plus rapide et plus fluide
      const timer = setTimeout(() => {
        setVisibleItems(new Array(itemCount).fill(true));
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isIntersecting, itemCount, delay]);

  return { elementRef, visibleItems };
}
