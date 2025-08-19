'use client';

import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlowLogo } from './Logo';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto section-padding relative z-10">
        <div className="text-center">
          {/* Logo avec effet brillant */}
          <div className="mb-8 animate-slide-up flex justify-center">
            <GlowLogo 
              variant="full" 
              size="xl" 
              theme="white" 
              className="opacity-90 hover:opacity-100 transition-opacity duration-500" 
            />
          </div>
          
          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <span className="gradient-text">{t.hero.title}</span>
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-2xl md:text-4xl text-gray-300 mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {t.hero.subtitle}
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            {t.hero.description}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <a
              href="#contact"
              className="gradient-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center group"
            >
              {t.hero.cta}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="glass text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
            >
              {t.hero.learnMore}
            </a>
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center animate-slide-up" style={{ animationDelay: '1s' }}>
            <div className="bg-black/20 backdrop-blur-sm rounded-full p-3 border border-white/10 hover:bg-white/10 transition-all duration-300 animate-bounce">
              <ChevronDown size={28} className="text-gray-300 hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
