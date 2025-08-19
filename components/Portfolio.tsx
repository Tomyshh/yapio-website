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
                    {/* Client logo avec angles clippés */}
                    <div className="relative group">
                      {/* Glow effect background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${client.color} blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-700 scale-150`} />
                      
                      {/* Image avec clip-path moderne */}
                      <div className="relative w-72 h-72 md:w-80 md:h-80">
                        <div 
                          className="w-full h-full relative overflow-hidden transition-all duration-700 group-hover:scale-105"
                          style={{
                            clipPath: 'polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)'
                          }}
                        >
                          <Image
                            src={client.logo}
                            alt={client.alt}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                            sizes="(max-width: 768px) 288px, 320px"
                            priority={index === 0}
                          />
                          
                          {/* Overlay avec gradient coloré */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${client.color} opacity-20 group-hover:opacity-10 transition-opacity duration-500`} />
                          
                          {/* Effet de brillance au hover */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-0" />
                        </div>
                        
                        {/* Particules flottantes */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className={`absolute top-8 right-8 w-3 h-3 rounded-full bg-gradient-to-r ${client.color} animate-ping`} />
                          <div 
                            className={`absolute bottom-12 left-8 w-2 h-2 rounded-full bg-gradient-to-r ${client.color} animate-ping`} 
                            style={{ animationDelay: '500ms' }} 
                          />
                          <div 
                            className={`absolute top-1/2 right-4 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${client.color} animate-ping`} 
                            style={{ animationDelay: '1000ms' }} 
                          />
                        </div>
                      </div>
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
            
          {/* Navigation arrows modernisées */}
          <button
            onClick={goToPrevious}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center hover:from-primary/20 hover:to-primary/10 hover:border-primary/30 transition-all duration-500 group hover:scale-110 hover:-translate-x-1"
            aria-label="Previous client"
          >
            <ChevronLeft className="w-7 h-7 text-white/80 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center hover:from-primary/20 hover:to-primary/10 hover:border-primary/30 transition-all duration-500 group hover:scale-110 hover:translate-x-1"
            aria-label="Next client"
          >
            <ChevronRight className="w-7 h-7 text-white/80 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          {/* Indicateurs modernisés */}
          <div className="flex flex-col items-center mt-12 space-y-6">
            {/* Dots indicator avec design moderne */}
            <div className="flex justify-center space-x-4">
              {clients.map((client, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative group transition-all duration-500 ${
                    index === currentIndex
                      ? 'scale-110'
                      : 'hover:scale-105'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                    index === currentIndex
                      ? `bg-gradient-to-r ${client.color} border-transparent shadow-lg`
                      : 'bg-transparent border-white/40 hover:border-white/60'
                  }`} />
                  
                  {/* Glow effect pour l'indicateur actif */}
                  {index === currentIndex && (
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${client.color} blur-md opacity-50 animate-pulse`} />
                  )}
                  
                  {/* Nom du client au hover */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 text-white text-xs whitespace-nowrap">
                      {client.name}
                    </div>
                  </div>
                </button>
              ))}
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