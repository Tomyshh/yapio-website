'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * observe() s'exécute quand `connectRef` reçoit un nœud DOM — évite la course entre
 * deux useEffect (ref non encore posée au premier passage).
 */
export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
}: UseIntersectionObserverOptions = {}) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const connectRef = useCallback((node: HTMLElement | null) => {
    setTarget(node);
  }, []);

  const observer = useMemo(() => {
    if (typeof window === 'undefined') return null;

    return new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
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
    if (!target || !observer) return;
    observer.observe(target);
    return () => observer.disconnect();
  }, [observer, target]);

  return { connectRef, isIntersecting };
}

export function useStaggeredAnimation(itemCount: number, delay: number = 50) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() =>
    new Array(itemCount).fill(false)
  );
  const { connectRef, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setVisibleItems(new Array(itemCount).fill(true));
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, itemCount, delay]);

  return { connectRef, visibleItems };
}
