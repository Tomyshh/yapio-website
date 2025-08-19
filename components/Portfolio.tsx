'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Portfolio() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const clients = [
    {
      name: 'Aerilux',
      logo: '/logo/aerilux_logo.jpg',
      alt: 'Logo Aerilux',
      color: 'from-blue-400 to-cyan-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-400/20',
    },
    {
      name: 'DTAI',
      logo: '/logo/dtai_logo.jpg',
      alt: 'Logo DTAI',
      color: 'from-purple-400 to-pink-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-400/20',
    },
    {
      name: 'Havrouta',
      logo: '/logo/havrouta_logo.jpg',
      alt: 'Logo Havrouta',
      color: 'from-green-400 to-emerald-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-400/20',
    },
    {
      name: 'Olim',
      logo: '/logo/olim_logo.png',
      alt: 'Logo Olim',
      color: 'from-orange-400 to-red-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-400/20',
    },
    {
      name: 'Taim',
      logo: '/logo/taim_logo.jpg',
      alt: 'Logo Taim',
      color: 'from-indigo-400 to-blue-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-400/20',
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, clients.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + clients.length) % clients.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t.clients.title}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t.clients.subtitle}
          </p>
        </div>

        {/* Modern Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main carousel container */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-white/10 p-8 md:p-12">
            {/* Carousel track */}
            <div className="relative h-64 md:h-80">
              <div 
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {clients.map((client, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 flex items-center justify-center px-8"
                  >
                    <div className="flex items-center justify-center space-x-8 md:space-x-16">
                      {/* Client logo */}
                      <div className={`
                        relative group
                        w-48 h-48 md:w-64 md:h-64
                        ${client.bgColor} ${client.borderColor}
                        border-2 rounded-3xl
                        backdrop-blur-sm
                        transform transition-all duration-500
                        hover:scale-105 hover:rotate-1
                        shadow-2xl
                      `}>
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${client.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                        
                        {/* Glow effect */}
                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${client.color} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 -z-10`} />
                        
                        {/* Logo */}
                        <div className="relative w-full h-full p-8 md:p-12 flex items-center justify-center">
                          <div className="relative w-full h-full">
                            <Image
                              src={client.logo}
                              alt={client.alt}
                              fill
                              className="object-contain rounded-2xl transition-all duration-500 group-hover:scale-110"
                              sizes="(max-width: 768px) 192px, 256px"
                            />
                          </div>
                        </div>
                        
                        {/* Floating elements */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r ${client.color} animate-ping`} />
                          <div className={`absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${client.color} animate-ping`} style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                      
                      {/* Client info */}
                      <div className="text-center">
                        <h3 className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r ${client.color} bg-clip-text text-transparent`}>
                          {client.name}
                        </h3>
                        <div className={`w-16 h-1 mx-auto rounded-full bg-gradient-to-r ${client.color} mb-4`} />
                        <p className="text-gray-300 text-lg max-w-xs">
                          Client de confiance depuis plusieurs années
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
              aria-label="Previous client"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
              aria-label="Next client"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
            </button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {clients.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
              <span>{isAutoPlaying ? 'Défilement automatique' : 'Pause'}</span>
            </div>
          </div>
        </div>

        {/* Trust section */}
        <div className="text-center mt-24">
          <div className="relative glass rounded-3xl p-8 md:p-12 max-w-5xl mx-auto overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-4 right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                <span className="gradient-text">{t.clients.trustSection.title}</span>
              </h3>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
                {t.clients.trustSection.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group">
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 backdrop-blur-sm hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3 animate-pulse-slow">
                      5+
                    </div>
                    <div className="text-gray-300 font-medium">{t.clients.trustSection.stats.clients}</div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 backdrop-blur-sm hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 animate-pulse-slow" style={{ animationDelay: '200ms' }}>
                      10+
                    </div>
                    <div className="text-gray-300 font-medium">{t.clients.trustSection.stats.projects}</div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 backdrop-blur-sm hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-3 animate-pulse-slow" style={{ animationDelay: '400ms' }}>
                      100%
                    </div>
                    <div className="text-gray-300 font-medium">{t.clients.trustSection.stats.satisfaction}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
