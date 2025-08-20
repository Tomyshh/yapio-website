'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ModernBackground from './ModernBackground';

export default function Portfolio() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const clients = [
    {
      name: 'Aerilux',
      logo: '/logo/aerilux_logo.png',
      alt: 'Logo Aerilux',
      color: 'from-white to-gray-200',
      bgColor: 'bg-white/10',
      borderColor: 'border-white/20',
    },
    {
      name: 'DTAI',
      logo: '/logo/dtai_logo.png',
      alt: 'Logo DTAI',
      color: 'from-red-400 to-pink-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-400/20',
    },
    {
      name: 'Havrouta',
      logo: '/logo/havrouta_logo.png',
      alt: 'Logo Havrouta',
      color: 'from-[#C2A765] to-[#D4B876]',
      bgColor: 'bg-[#C2A765]/10',
      borderColor: 'border-[#C2A765]/20',
    },
    {
      name: 'Olim',
      logo: '/logo/olim_logo.png',
      alt: 'Logo Olim',
      color: 'from-[#0E78FE] to-[#3B8FFF]',
      bgColor: 'bg-[#0E78FE]/10',
      borderColor: 'border-[#0E78FE]/20',
    },
    {
      name: 'Taim',
      logo: '/logo/taim_logo.png',
      alt: 'Logo Taim',
      color: 'from-green-400 to-teal-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-400/20',
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
    <section id="portfolio" className="py-20 relative overflow-hidden">
      {/* Arrière-plan moderne unifié */}
      <ModernBackground />
      
      <div className="max-w-7xl mx-auto section-padding relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-overcame-bold">
            <span className="gradient-text">{t.clients.title}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t.clients.subtitle}
          </p>
        </div>

        {/* Modern Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Carousel track */}
          <div className="relative h-96 md:h-[28rem] overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 flex items-center justify-center"
                >
                  <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
                    {/* Client logo simple */}
                    <div className={`relative ${
                      client.name === 'Havrouta' ? 'w-56 h-56 md:w-64 md:h-64' :
                      client.name === 'Olim' ? 'w-60 h-60 md:w-72 md:h-72' :
                      'w-72 h-72 md:w-80 md:h-80'
                    }`}>
                      <Image
                        src={client.logo}
                        alt={client.alt}
                        fill
                        className="object-contain"
                        sizes={
                          client.name === 'Havrouta' ? "(max-width: 768px) 224px, 256px" :
                          client.name === 'Olim' ? "(max-width: 768px) 240px, 288px" :
                          "(max-width: 768px) 288px, 320px"
                        }
                        priority={index === 0}
                      />
                    </div>
                    
                    {/* Client info modernisée */}
                    <div className="text-center md:text-left max-w-md">
                      <h3 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${client.color} bg-clip-text text-transparent animate-pulse-slow`}>
                        {client.name}
                      </h3>
                      <div className={`w-20 h-1.5 mx-auto md:mx-0 rounded-full bg-gradient-to-r ${client.color} mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-500`} />
                      <p className="text-gray-300 text-xl leading-relaxed">
                        Client de confiance depuis plusieurs années
                      </p>
                      
                      {/* Badge de confiance */}
                      <div className="mt-6 inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                        <span className="text-sm text-gray-400">Partenaire vérifié</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
            
          {/* Navigation arrows ultra-modernes */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 group"
            aria-label="Previous client"
          >
            <div className="relative">
              {/* Cercle principal avec effet glassmorphism */}
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/30 group-hover:border-white/20 group-hover:scale-110">
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-white transition-all duration-300 group-hover:-translate-x-0.5" />
              </div>
              {/* Effet de glow au hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10" />
              {/* Ring animé */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-primary/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-spin-slow" style={{maskImage: 'conic-gradient(transparent 270deg, white 360deg)', WebkitMaskImage: 'conic-gradient(transparent 270deg, white 360deg)'}} />
            </div>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 group"
            aria-label="Next client"
          >
            <div className="relative">
              {/* Cercle principal avec effet glassmorphism */}
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/30 group-hover:border-white/20 group-hover:scale-110">
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5" />
              </div>
              {/* Effet de glow au hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10" />
              {/* Ring animé */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500/30 to-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-spin-slow" style={{maskImage: 'conic-gradient(transparent 270deg, white 360deg)', WebkitMaskImage: 'conic-gradient(transparent 270deg, white 360deg)'}} />
            </div>
          </button>
          

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
                      20+
                    </div>
                    <div className="text-gray-300 font-medium">{t.clients.trustSection.stats.clients}</div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 backdrop-blur-sm hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300">
                    <div 
                      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 animate-pulse-slow" 
                      style={{ animationDelay: '200ms' }}
                    >
                      10+
                    </div>
                    <div className="text-gray-300 font-medium">{t.clients.trustSection.stats.projects}</div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 backdrop-blur-sm hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300">
                    <div 
                      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-3 animate-pulse-slow" 
                      style={{ animationDelay: '400ms' }}
                    >
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