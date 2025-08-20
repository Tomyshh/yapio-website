'use client';

import React from 'react';
import { Smartphone, Monitor, Globe, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ModernBackground from './ModernBackground';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Smartphone,
      title: t.services.mobile.title,
      description: t.services.mobile.description,
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      icon: Monitor,
      title: t.services.desktop.title,
      description: t.services.desktop.description,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Globe,
      title: t.services.web.title,
      description: t.services.web.description,
      gradient: 'from-pink-500 to-red-500',
    },
    {
      icon: Lightbulb,
      title: t.services.consulting.title,
      description: t.services.consulting.description,
      gradient: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Arrière-plan moderne unifié */}
      <ModernBackground />
      
      <div className="max-w-7xl mx-auto section-padding relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-overcame-bold">
            <span className="gradient-text">{t.services.title}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} p-3 mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
