'use client';

import React, { memo } from 'react';
import Image from 'next/image';

interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'default' | 'white' | 'grayscale';
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}

function LogoComponent({ 
  variant = 'full', 
  size = 'md', 
  theme = 'default',
  className = '',
  priority = false,
  onClick
}: LogoProps) {
  // Définition des tailles
  const sizes = {
    sm: { height: 24, width: variant === 'icon' ? 24 : variant === 'text' ? 80 : 120 },
    md: { height: 32, width: variant === 'icon' ? 32 : variant === 'text' ? 100 : 150 },
    lg: { height: 48, width: variant === 'icon' ? 48 : variant === 'text' ? 140 : 200 },
    xl: { height: 64, width: variant === 'icon' ? 64 : variant === 'text' ? 180 : 280 }
  };

  // Sélection du fichier de logo approprié
  const getLogoSrc = () => {
    const basePrefix = theme === 'grayscale' ? 'grayscale' : 'fulllogo';
    const suffix = theme === 'white' ? '_transparent' : '';
    const nobuffer = '_nobuffer';
    
    switch (variant) {
      case 'icon':
        return `/branding/icononly${theme === 'white' ? '_transparent' : ''}${nobuffer}.png`;
      case 'text':
        return `/branding/textonly${nobuffer}.png`;
      case 'full':
      default:
        return `/branding/${basePrefix}${theme === 'white' ? '_transparent' : ''}${nobuffer}.png`;
    }
  };

  const logoSrc = getLogoSrc();
  const { height, width } = sizes[size];

  return (
    <div 
      className={`flex items-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <Image
        src={logoSrc}
        alt="YAPIO Logo"
        height={height}
        width={width}
        priority={priority}
        className="object-contain transition-all duration-300 hover:scale-105"
        style={{ 
          filter: theme === 'white' ? 'brightness(0) invert(1)' : 'none',
          maxHeight: `${height}px`,
          width: 'auto'
        }}
      />
    </div>
  );
}

// Composant spécialisé pour la navigation responsive
export function ResponsiveLogo({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  return (
    <>
      {/* Desktop: Icône seule */}
      <div className="hidden md:block">
        <LogoComponent 
          variant="icon" 
          size="lg" 
          theme="default" 
          className={className}
          onClick={onClick}
          priority
        />
      </div>
      
      {/* Mobile: Icône seule */}
      <div className="md:hidden">
        <LogoComponent 
          variant="icon" 
          size="lg" 
          theme="white" 
          className={className}
          onClick={onClick}
          priority
        />
      </div>
    </>
  );
}

// Composant pour les logos avec effet de brillance
export function GlowLogo({ className = '', ...props }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <LogoComponent {...props} />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-0 hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

// Export du composant mémorisé
export default memo(LogoComponent);

// Export mémorisé pour ResponsiveLogo
export const ResponsiveLogoMemo = memo(ResponsiveLogo);

// Export mémorisé pour GlowLogo  
export const GlowLogoMemo = memo(GlowLogo);
