'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoadingWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  fallback?: ReactNode;
  animationType?: 'fade' | 'fade-blur' | 'scale-blur' | 'slide-up-blur';
  preserveSpace?: boolean;
}

export function LoadingWrapper({ 
  children, 
  className = '', 
  delay = 0,
  fallback,
  animationType = 'fade-blur',
  preserveSpace = true
}: LoadingWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { isLoading: languageLoading } = useLanguage();

  useEffect(() => {
    if (!languageLoading) {
      const timer = setTimeout(() => {
        setIsReady(true);
        // Délai pour déclencher l'animation
        setTimeout(() => setIsVisible(true), 50);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [languageLoading, delay]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    switch (animationType) {
      case 'fade':
        return 'animate-fade-in';
      case 'fade-blur':
        return 'animate-fade-in-blur';
      case 'scale-blur':
        return 'animate-scale-in-blur';
      case 'slide-up-blur':
        return 'animate-slide-up-blur';
      default:
        return 'animate-fade-in-blur';
    }
  };

  // Si on veut préserver l'espace, on affiche toujours le contenu mais invisible
  if (preserveSpace) {
    return (
      <div className={`${className} ${isReady ? getAnimationClass() : 'opacity-0'}`}>
        {isReady ? children : (
          <div className="invisible">
            {children}
          </div>
        )}
      </div>
    );
  }

  // Mode classique avec fallback
  if (!isReady || languageLoading) {
    return fallback || (
      <div className={`loading-skeleton h-8 w-full ${className}`} />
    );
  }

  return (
    <div className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  );
}

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
