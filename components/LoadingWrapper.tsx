'use client';

import React, { useState, useEffect, ReactNode, memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoadingWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  fallback?: ReactNode;
  animationType?: 'fade' | 'fade-blur' | 'scale-blur' | 'slide-up-blur';
  preserveSpace?: boolean;
}

// Version optimisée du LoadingWrapper
function LoadingWrapperComponent({ 
  children, 
  className = '', 
  delay = 0,
  fallback,
  animationType = 'fade',
  preserveSpace = true
}: LoadingWrapperProps) {
  const [isReady, setIsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isLoading: languageLoading } = useLanguage();

  useEffect(() => {
    setIsMounted(true);
    if (!languageLoading) {
      const timer = setTimeout(() => setIsReady(true), delay);
      return () => clearTimeout(timer);
    }
  }, [languageLoading, delay]);

  // Éviter les différences d'hydratation en attendant le montage côté client
  if (!isMounted) {
    return preserveSpace ? (
      <div className={`${className} opacity-0`}>
        {children}
      </div>
    ) : (
      fallback || <div className={`loading-skeleton h-8 w-full ${className}`} />
    );
  }

  // Simplification des animations - utilise des classes CSS plus performantes
  const animationClass = isReady ? 'opacity-100 transition-opacity duration-500' : 'opacity-0';

  if (preserveSpace) {
    return (
      <div className={`${className} ${animationClass}`}>
        {children}
      </div>
    );
  }

  if (!isReady || languageLoading) {
    return fallback || (
      <div className={`loading-skeleton h-8 w-full ${className}`} />
    );
  }

  return (
    <div className={`${animationClass} ${className}`}>
      {children}
    </div>
  );
}

// Mémorisation pour éviter les re-renders
export const LoadingWrapper = memo(LoadingWrapperComponent);

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 1, className = '' }: SkeletonTextProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`loading-skeleton h-4 ${
            index === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}

interface SkeletonButtonProps {
  className?: string;
}

export function SkeletonButton({ className = '' }: SkeletonButtonProps) {
  return (
    <div className={`loading-skeleton h-12 w-32 rounded-full ${className}`} />
  );
}

interface SkeletonImageProps {
  className?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
}

export function SkeletonImage({ 
  className = '', 
  aspectRatio = 'auto' 
}: SkeletonImageProps) {
  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: ''
  }[aspectRatio];

  return (
    <div className={`loading-skeleton ${aspectClass} ${className}`} />
  );
}
