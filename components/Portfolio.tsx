'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ModernBackground from './ModernBackground';

export default function Portfolio() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  // Liste des clients - Utilisation des logos depuis /projects/
  const clients = [
    {
      name: 'Chabbataim',
      slug: 'chabbataim',
      logo: '/projects/Chabbataim/logo.png',
      alt: 'Logo Chabbataim',
      color: 'from-green-400 to-teal-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-400/20',
      description: t.clients?.projects?.chabbataim || 'Applications web et mobile pour un restaurant en ligne',
    },
    {
      name: 'Olim Service',
      slug: 'olim-service',
      logo: '/projects/Olim Service/logo.png',
      alt: 'Logo Olim Service',
      color: 'from-[#0E78FE] to-[#3B8FFF]',
      bgColor: 'bg-[#0E78FE]/10',
      borderColor: 'border-[#0E78FE]/20',
      description: t.clients?.projects?.olimService || 'Services d\'accompagnement et conciergerie administrative',
    },
    {
      name: 'Aerilux',
      slug: 'aerilux',
      logo: '/projects/Aerilux/logo.png',
      alt: 'Logo Aerilux',
      color: 'from-white to-gray-200',
      bgColor: 'bg-white/10',
      borderColor: 'border-white/20',
      description: t.clients?.projects?.aerilux || 'Solutions d\'éloignement de pigeons',
    },
    {
      name: 'DTAI',
      slug: 'dtai',
      logo: '/projects/DTAI/logo.png',
      alt: 'Logo DTAI',
      color: 'from-red-400 to-pink-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-400/20',
      description: t.clients?.projects?.dtai || 'Expertise en intelligence artificielle dans la transcription et traduction',
    },
    {
      name: 'Havrouta',
      slug: 'havrouta',
      logo: '/projects/Havrouta/logo.png',
      alt: 'Logo Havrouta',
      color: 'from-[#C2A765] to-[#D4B876]',
      bgColor: 'bg-[#C2A765]/10',
      borderColor: 'border-[#C2A765]/20',
      description: t.clients?.projects?.havrouta || 'Plateforme éducative moderne et interactive',
    },
    {
      name: 'Security Bear',
      slug: 'security-bear',
      logo: '/projects/Security Bear/logo.png',
      alt: 'Logo Security Bear',
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-400/20',
      description: t.clients?.projects?.securityBear || 'Solutions de surveillance et caméras de sécurité',
    },
    {
      name: 'Kolot',
      slug: 'kolot',
      logo: '/projects/Kolot/logo.png',
      alt: 'Logo Kolot',
      color: 'from-purple-400 to-indigo-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-400/20',
      description: t.clients?.projects?.kolot || 'Site de recherche intelligente d\'enregistrement vocaux',
    },
    {
      name: 'Oz Leisrael',
      slug: 'oz-leisrael',
      logo: '/projects/Oz Leisrael/logo.png',
      alt: 'Logo Oz Leisrael',
      color: 'from-blue-400 to-cyan-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-400/20',
      description: t.clients?.projects?.ozLeisrael || 'Site de présentation du programme Oz Leisrael',
    },
    {
      name: 'i24 TV channel',
      slug: 'i24-tv-channel',
      logo: '/projects/i24 TV channel/logo.png',
      alt: 'Logo i24 TV channel',
      color: 'from-red-500 to-blue-600',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      description: t.clients?.projects?.i24TvChannel || 'Solution de transcription et traduction en temps réel',
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
                    {/* Client logo - Taille uniforme */}
                    <div className="relative w-64 h-64 md:w-72 md:h-72">
                      <Image
                        src={client.logo}
                        alt={client.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 256px, 288px"
                        priority={index === 0}
                      />
                    </div>
                    
                    {/* Client info modernisée */}
                    <div className="text-center md:text-left max-w-md space-y-6">
                      <h3 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${client.color} bg-clip-text text-transparent animate-pulse-slow`} style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                        {client.name}
                      </h3>
                      <div className={`w-20 h-1.5 mx-auto md:mx-0 rounded-full bg-gradient-to-r ${client.color} transform origin-left transition-transform duration-500`} />
                      <p className="text-gray-300 text-xl leading-relaxed">
                        {client.description}
                      </p>
                      
                      {/* Bouton Voir plus */}
                      <div className="pt-4">
                        <Link
                          href={`/projects/${client.slug}`}
                          className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r ${client.color} text-black font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                        >
                          <span>{t.clients?.viewMore || 'Voir plus'}</span>
                          <svg 
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
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
          
          {/* Indicateurs de navigation */}
          <div className="flex justify-center space-x-3 mt-8">
            {clients.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Aller au client ${index + 1}`}
              />
            ))}
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