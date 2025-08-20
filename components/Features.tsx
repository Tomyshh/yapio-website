'use client';

import React from 'react';
import { Shield, Zap, HeadphonesIcon, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ModernBackground from './ModernBackground';

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t.features.quality.title,
      description: t.features.quality.description,
    },
    {
      icon: Zap,
      title: t.features.speed.title,
      description: t.features.speed.description,
    },
    {
      icon: HeadphonesIcon,
      title: t.features.support.title,
      description: t.features.support.description,
    },
    {
      icon: Sparkles,
      title: t.features.innovation.title,
      description: t.features.innovation.description,
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Arrière-plan moderne unifié */}
      <ModernBackground />

      <div className="max-w-7xl mx-auto section-padding relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-overcame-bold">
            <span className="gradient-text">{t.features.title}</span>
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-6 group"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full gradient-primary p-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-full h-full text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
