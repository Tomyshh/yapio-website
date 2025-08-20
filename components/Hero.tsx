'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlowLogo } from './Logo';
import { LoadingWrapper, SkeletonText, SkeletonButton } from './LoadingWrapper';
import ModernBackground from './ModernBackground';

export default function Hero() {
  const { t, isLoading } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-8 md:py-16">
      {/* Ultra modern abstract background */}
      <ModernBackground />

      <div className="max-w-7xl mx-auto section-padding relative z-10 flex flex-col justify-center min-h-[90vh]">
        <div className="text-center space-y-8 md:space-y-12">
          {/* Logo avec effet brillant */}
          <LoadingWrapper 
            delay={0}
            className="flex justify-center mb-8 md:mb-12"
            animationType="fade"
            preserveSpace={true}
          >
            <GlowLogo 
              variant="full" 
              size="xl" 
              theme="white" 
              className="opacity-90 hover:opacity-100 smooth-transition-slow" 
            />
          </LoadingWrapper>
          
          {/* Main title */}
          <LoadingWrapper 
            delay={100}
            className="mb-8 md:mb-12"
            animationType="fade"
            preserveSpace={true}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-overcame-bold leading-tight">
              <span className="gradient-text smooth-transition">{t.hero.title}</span>
            </h1>
          </LoadingWrapper>
          
          {/* Subtitle */}
          <LoadingWrapper 
            delay={200}
            className="mb-8 md:mb-12"
            animationType="fade"
            preserveSpace={true}
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl text-gray-300 transition-opacity duration-300 leading-relaxed">
              {t.hero.subtitle}
            </h2>
          </LoadingWrapper>
          
          {/* Description */}
          <LoadingWrapper 
            delay={300}
            className="mb-12 md:mb-16"
            animationType="fade"
            preserveSpace={true}
          >
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto transition-opacity duration-300 leading-relaxed">
              {t.hero.description}
            </p>
          </LoadingWrapper>
          
          {/* CTA Buttons Container */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 md:mb-20 min-h-[80px]">
            <LoadingWrapper 
              delay={400}
              className=""
              animationType="fade"
              preserveSpace={true}
            >
              <a
                href="#contact"
                className="gradient-primary text-white px-10 py-5 rounded-full text-lg md:text-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center group"
              >
                <span className="transition-transform duration-200">{t.hero.cta}</span>
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </LoadingWrapper>
            
            <LoadingWrapper 
              delay={500}
              className=""
              animationType="fade"
              preserveSpace={true}
            >
              <a
                href="#services"
                className="glass text-white px-10 py-5 rounded-full text-lg md:text-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                <span className="transition-transform duration-200">{t.hero.learnMore}</span>
              </a>
            </LoadingWrapper>
          </div>
          
          {/* Scroll indicator */}
          <LoadingWrapper 
            delay={600}
            className=""
            animationType="fade"
            preserveSpace={true}
          >
            <div className="flex justify-center">
              <div className="bg-black/20 backdrop-blur-sm rounded-full p-4 border border-white/10 hover:bg-white/10 smooth-transition animate-bounce">
                <ChevronDown size={32} className="text-gray-300 hover:text-primary smooth-transition" />
              </div>
            </div>
          </LoadingWrapper>
        </div>
      </div>
    </section>
  );
}
