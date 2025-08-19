'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Portfolio() {
  const { t } = useLanguage();
  const clients = [
    {
      name: 'Aerilux',
      logo: '/logo/aerilux_logo.jpg',
      alt: 'Logo Aerilux',
    },
    {
      name: 'DTAI',
      logo: '/logo/dtai_logo.jpg',
      alt: 'Logo DTAI',
    },
    {
      name: 'Havrouta',
      logo: '/logo/havrouta_logo.jpg',
      alt: 'Logo Havrouta',
    },
    {
      name: 'Olim',
      logo: '/logo/olim_logo.png',
      alt: 'Logo Olim',
    },
    {
      name: 'Taim',
      logo: '/logo/taim_logo.jpg',
      alt: 'Logo Taim',
    },
  ];

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

        {/* Clients grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {clients.map((client, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300 aspect-square flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src={client.logo}
                  alt={client.alt}
                  fill
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Trust section */}
        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              {t.clients.trustSection.title}
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t.clients.trustSection.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-gray-400">{t.clients.trustSection.stats.clients}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10+</div>
                <div className="text-gray-400">{t.clients.trustSection.stats.projects}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-gray-400">{t.clients.trustSection.stats.satisfaction}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
