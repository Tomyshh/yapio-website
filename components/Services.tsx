'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Smartphone, Globe, Sparkles, Code, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ModernBackground from './ModernBackground';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { TiltCard } from './MagneticButton';

export default function Services() {
  const { t, isLoading } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? sectionRef : undefined,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Protection contre les erreurs d'hydratation
  if (isLoading || !t?.services) {
    return (
      <section id="services" className="py-20 relative overflow-hidden">
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
      gradient: 'from-blue-500 to-purple-500',
      iconBg: 'bg-blue-500/10',
      delay: 0,
    },
    {
      icon: Globe,
      title: t.services.desktop.title,
      description: t.services.desktop.description,
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-500/10',
      delay: 0.1,
    },
    {
      icon: Sparkles,
      title: t.services.web.title,
      description: t.services.web.description,
      gradient: 'from-pink-500 to-red-500',
      iconBg: 'bg-pink-500/10',
      delay: 0.2,
    },
    {
      icon: Code,
      title: t.services.consulting.title,
      description: t.services.consulting.description,
      gradient: 'from-yellow-500 to-orange-500',
      iconBg: 'bg-yellow-500/10',
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
    <section id="services" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Arrière-plan moderne avec parallax */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <ModernBackground />
      </motion.div>
      
      <div className="max-w-7xl mx-auto section-padding relative z-10">
        {/* Section header */}
        <AnimatedSection animation="fadeUp" className="text-center mb-16 lg:mb-20">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Code className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Ce que nous faisons</span>
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
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
              >
                <TiltCard
                  className="h-full"
                  maxTilt={8}
                  glareEnable={true}
                >
                  <motion.div
                    className="glass rounded-2xl p-8 h-full group cursor-pointer relative overflow-hidden"
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Fond gradient au hover */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    {/* Icon avec animation */}
                    <motion.div 
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} p-3 mb-6 relative`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-full h-full text-white" />
                      
                      {/* Glow effect */}
                      <motion.div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.gradient} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10`}
                      />
                    </motion.div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Link indicator */}
                    <motion.div 
                      className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <span className="text-sm font-medium mr-2">En savoir plus</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
