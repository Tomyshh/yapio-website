'use client';

import React from 'react';
import { Users, Trophy, Clock, Heart, Target, Lightbulb, Handshake, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ModernBackground from './ModernBackground';

export default function About() {
  const { t } = useLanguage();
  
  const stats = [
    { icon: Users, value: '50+', label: 'Clients satisfaits' },
    { icon: Trophy, value: '100+', label: 'Projets réalisés' },
    { icon: Clock, value: '5+', label: 'Années d\'expérience' },
    { icon: Heart, value: '100%', label: 'Passion' },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Arrière-plan moderne unifié */}
      <ModernBackground />

      <div className="max-w-7xl mx-auto section-padding relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-overcame-bold">
            <span className="gradient-text">{t.about.title}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Story Content */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {t.about.story.title}
            </h3>
            <p className="text-lg text-gray-400 mb-6">
              {t.about.story.content}
            </p>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              {t.about.mission.title}
            </h3>
            <p className="text-lg text-gray-400 mb-8">
              {t.about.mission.content}
            </p>
            
            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              Travaillons ensemble
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-full gradient-primary p-4 mx-auto mb-4">
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            {t.about.values.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 rounded-full gradient-primary p-4 mx-auto mb-4">
                <Lightbulb className="w-full h-full text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                {t.about.values.innovation.title}
              </h4>
              <p className="text-gray-400 text-sm">
                {t.about.values.innovation.description}
              </p>
            </div>
            
            <div className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 rounded-full gradient-primary p-4 mx-auto mb-4">
                <Shield className="w-full h-full text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                {t.about.values.quality.title}
              </h4>
              <p className="text-gray-400 text-sm">
                {t.about.values.quality.description}
              </p>
            </div>
            
            <div className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 rounded-full gradient-primary p-4 mx-auto mb-4">
                <Handshake className="w-full h-full text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                {t.about.values.collaboration.title}
              </h4>
              <p className="text-gray-400 text-sm">
                {t.about.values.collaboration.description}
              </p>
            </div>
            
            <div className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 rounded-full gradient-primary p-4 mx-auto mb-4">
                <Target className="w-full h-full text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                {t.about.values.reliability.title}
              </h4>
              <p className="text-gray-400 text-sm">
                {t.about.values.reliability.description}
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            {t.about.team.title}
          </h3>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t.about.team.description}
          </p>
        </div>
      </div>
    </section>
  );
}
