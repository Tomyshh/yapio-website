'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
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

/** Encode les segments de chemin (espaces, etc.) pour les fichiers dans /public */
function safeImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  if (!src.startsWith('/')) return src;
  const segments = src.split('/').filter(Boolean);
  return '/' + segments.map((s) => encodeURIComponent(s)).join('/');
}

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
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { connectRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.01,
    rootMargin: '100px',
    triggerOnce: true,
  });

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (!priority) {
        connectRef(node);
      } else {
        connectRef(null);
      }
    },
    [priority, connectRef]
  );

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

  const resolvedSrc = safeImageSrc(src);

  if (!shouldLoad) {
    return (
      <div
        ref={setContainerRef}
        className={`bg-gray-800/30 ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
        aria-label={alt}
        role="img"
      />
    );
  }

  if (hasError) {
    return (
      <div
        ref={setContainerRef}
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
    src: resolvedSrc,
    alt,
    className: `${className} transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`,
    onLoad: handleLoad,
    onError: handleError,
    quality,
    ...(fill ? { fill: true, sizes } : { width, height }),
    ...(placeholder === 'blur' && blurDataURL ? { placeholder: 'blur' as const, blurDataURL } : {}),
    loading: priority ? ('eager' as const) : ('lazy' as const),
    decoding: 'async' as const,
    fetchPriority: priority ? ('high' as const) : ('auto' as const),
  };

  return (
    <div
      ref={setContainerRef}
      className="relative"
      style={fill ? { position: 'absolute', inset: 0, willChange: 'contents' } : { willChange: 'contents' }}
    >
      <Image {...imageProps} />
      {!isLoaded && <div className="absolute inset-0 bg-gray-800/30" />}
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.src === nextProps.src &&
    prevProps.alt === nextProps.alt &&
    prevProps.priority === nextProps.priority &&
    prevProps.className === nextProps.className
  );
});
