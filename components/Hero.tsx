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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Ultra modern abstract background */}
      <ModernBackground />

      <div className="max-w-7xl mx-auto section-padding relative z-10">
        <div className="text-center">
          {/* Logo avec effet brillant */}
          <LoadingWrapper 
            delay={0}
            className="mb-8 flex justify-center"
            animationType="scale-blur"
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
            delay={200}
            className=""
            animationType="fade-blur"
            preserveSpace={true}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text smooth-transition">{t.hero.title}</span>
            </h1>
          </LoadingWrapper>
          
          {/* Subtitle */}
          <LoadingWrapper 
            delay={400}
            className=""
            animationType="slide-up-blur"
            preserveSpace={true}
          >
            <h2 className="text-2xl md:text-4xl text-gray-300 mb-8 smooth-transition">
              {t.hero.subtitle}
            </h2>
          </LoadingWrapper>
          
          {/* Description */}
          <LoadingWrapper 
            delay={600}
            className=""
            animationType="fade-blur"
            preserveSpace={true}
          >
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 smooth-transition">
              {t.hero.description}
            </p>
          </LoadingWrapper>
          
          {/* CTA Buttons Container - Fixed height to prevent jumping */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 min-h-[64px]">
            <LoadingWrapper 
              delay={800}
              className=""
              animationType="fade-blur"
              preserveSpace={true}
            >
              <a
                href="#contact"
                className="gradient-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-primary/25 smooth-transition flex items-center justify-center group"
              >
                <span className="smooth-transition">{t.hero.cta}</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 smooth-transition-fast" />
              </a>
            </LoadingWrapper>
            
            <LoadingWrapper 
              delay={1000}
              className=""
              animationType="fade-blur"
              preserveSpace={true}
            >
              <a
                href="#services"
                className="glass text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 smooth-transition flex items-center justify-center"
              >
                <span className="smooth-transition">{t.hero.learnMore}</span>
              </a>
            </LoadingWrapper>
          </div>
          
          {/* Scroll indicator */}
          <LoadingWrapper 
            delay={1000}
            className=""
            animationType="fade-blur"
            preserveSpace={true}
          >
            <div className="flex justify-center">
              <div className="bg-black/20 backdrop-blur-sm rounded-full p-3 border border-white/10 hover:bg-white/10 smooth-transition animate-bounce">
                <ChevronDown size={28} className="text-gray-300 hover:text-primary smooth-transition" />
              </div>
            </div>
          </LoadingWrapper>
        </div>
      </div>
    </section>
  );
}
