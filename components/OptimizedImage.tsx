'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
}

/**
 * Composant Image optimisé avec lazy loading et placeholder
 * Charge les images uniquement quand elles sont visibles dans le viewport
 * Optimisé pour les performances avec will-change et gestion d'erreurs
 */
export const OptimizedImage = React.memo(function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  sizes,
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Utiliser Intersection Observer uniquement si pas priority
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.01,
    rootMargin: '100px', // Commencer à charger 100px avant d'être visible
    triggerOnce: true,
  });

  // Combiner les refs
  useEffect(() => {
    if (containerRef.current && !priority) {
      (elementRef as React.MutableRefObject<HTMLElement | null>).current = containerRef.current;
    }
  }, [elementRef, priority]);

  // Déclencher le chargement quand visible
  useEffect(() => {
    if (!priority && isIntersecting && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [isIntersecting, priority, shouldLoad]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  // Placeholder simple pendant le chargement
  if (!shouldLoad) {
    return (
      <div
        ref={containerRef}
        className={`bg-gray-800/30 ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
        aria-label={alt}
        role="img"
      />
    );
  }

  // Gestion d'erreur
  if (hasError) {
    return (
      <div
        className={`bg-gray-800/50 flex items-center justify-center ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
        aria-label={alt}
        role="img"
      >
        <span className="text-gray-500 text-xs">Image non disponible</span>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    className: `${className} transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`,
    onLoad: handleLoad,
    onError: handleError,
    quality,
    ...(fill ? { fill: true, sizes } : { width, height }),
    ...(placeholder === 'blur' && blurDataURL ? { placeholder: 'blur' as const, blurDataURL } : {}),
    loading: priority ? ('eager' as const) : ('lazy' as const),
    // Optimisations de performance
    decoding: 'async' as const,
    fetchPriority: priority ? ('high' as const) : ('auto' as const),
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={fill ? { position: 'absolute', inset: 0, willChange: 'contents' } : { willChange: 'contents' }}
    >
      <Image {...imageProps} />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800/30" />
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  // Comparaison optimisée pour éviter les re-renders
  return (
    prevProps.src === nextProps.src &&
    prevProps.alt === nextProps.alt &&
    prevProps.priority === nextProps.priority &&
    prevProps.className === nextProps.className
  );
});
