'use client';

import React, { useRef } from 'react';
import { Smartphone, Globe, Sparkles, Code } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ModernBackground from './ModernBackground';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import ParallaxBackground from './ParallaxBackground';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

export default function Services() {
  const { t, isLoading } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const performanceMode = usePerformanceMode();

  // Protection contre les erreurs d'hydratation
  if (isLoading || !t?.services) {
    return (
      <section id="services" className="py-20 relative overflow-hidden cv-auto">
        <ModernBackground />
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const services = [
    {
      icon: Smartphone,
      title: t.services.mobile.title,
      description: t.services.mobile.description,
      gradient: 'from-primary to-primary-600',
      iconBg: 'bg-primary/10',
      delay: 0,
    },
    {
      icon: Globe,
      title: t.services.desktop.title,
      description: t.services.desktop.description,
      gradient: 'from-primary to-primary-600',
      iconBg: 'bg-primary/10',
      delay: 0.1,
    },
    {
      icon: Sparkles,
      title: t.services.web.title,
      description: t.services.web.description,
      gradient: 'from-primary to-primary-600',
      iconBg: 'bg-primary/10',
      delay: 0.2,
    },
    {
      icon: Code,
      title: t.services.consulting.title,
      description: t.services.consulting.description,
      gradient: 'from-primary to-primary-600',
      iconBg: 'bg-primary/10',
      delay: 0.3,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="services" ref={sectionRef} className="py-20 lg:py-28 relative overflow-hidden cv-auto">
      {/* Arrière-plan moderne avec parallax */}
      {performanceMode ? (
        <div className="absolute -inset-[30%]">
          <ModernBackground />
        </div>
      ) : (
        <ParallaxBackground targetRef={sectionRef} className="absolute -inset-[30%]" yRange={['0%', '20%']}>
          <ModernBackground />
        </ParallaxBackground>
      )}
      
      <div className="max-w-7xl mx-auto section-padding relative z-10">
        {/* Section header */}
        <AnimatedSection animation="fadeUp" className="text-center mb-12 lg:mb-16">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Code className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">{t.services.badge}</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-overcame-bold">
            <span className="gradient-text">{t.services.title}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </AnimatedSection>

        {/* Services grid avec animations */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
              >
                <div className="glass rounded-2xl p-8 h-full relative overflow-hidden border border-white/10">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-3 mb-6`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
