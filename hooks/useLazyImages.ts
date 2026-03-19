'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Hook pour charger les images de manière paresseuse
 * Améliore les performances en ne chargeant que les images visibles
 */
export function useLazyImages<T extends { url: string }>(
  images: T[],
  options: {
    threshold?: number;
    rootMargin?: string;
    enabled?: boolean;
  } = {}
) {
  const { threshold = 0.1, rootMargin = '100px', enabled = true } = options;
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const imageRefs = useRef<Map<string, HTMLImageElement>>(new Map());

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src) {
              setLoadedImages((prev) => new Set([...prev, src]));
              observer.unobserve(img);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observer toutes les images
    imageRefs.current.forEach((img) => {
      if (img.dataset.src && !loadedImages.has(img.dataset.src)) {
        observer.observe(img);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, enabled, loadedImages]);

  const registerImage = (url: string, element: HTMLImageElement | null) => {
    if (element) {
      imageRefs.current.set(url, element);
    }
  };

  const shouldLoad = (url: string) => {
    return loadedImages.has(url);
  };

  return { registerImage, shouldLoad };
}
