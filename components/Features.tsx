'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Shield, Zap, HeadphonesIcon, Sparkles, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ModernBackground from './ModernBackground';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

export default function Features() {
  const { t, isLoading } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? sectionRef : undefined,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  // Protection contre les erreurs d'hydratation
  if (isLoading || !t?.features) {
    return (
      <section className="py-20 relative overflow-hidden">
        <ModernBackground />
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const features = [
    {
      icon: Shield,
      title: t.features.quality.title,
      description: t.features.quality.description,
      color: 'from-blue-400 to-cyan-400',
      delay: 0,
    },
    {
      icon: Zap,
      title: t.features.speed.title,
      description: t.features.speed.description,
      color: 'from-yellow-400 to-orange-400',
      delay: 0.15,
    },
    {
      icon: HeadphonesIcon,
      title: t.features.support.title,
      description: t.features.support.description,
      color: 'from-green-400 to-emerald-400',
      delay: 0.3,
    },
    {
      icon: Sparkles,
      title: t.features.innovation.title,
      description: t.features.innovation.description,
      color: 'from-purple-400 to-pink-400',
      delay: 0.45,
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

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
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
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Nos avantages</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-overcame-bold">
            <span className="gradient-text">{t.features.title}</span>
          </h2>
        </AnimatedSection>

        {/* Features grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  className="flex items-start space-x-6 p-6 rounded-2xl transition-all duration-500 hover:bg-white/5"
                  whileHover={{ x: 10 }}
                >
                  {/* Icon avec animation */}
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-3.5 relative`}>
                      <Icon className="w-full h-full text-white" />
                      
                      {/* Animated ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl border-2 border-white/20`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: feature.delay,
                        }}
                      />
                    </div>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <motion.h3 
                      className="text-2xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300"
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-400 text-lg leading-relaxed"
                    >
                      {feature.description}
                    </motion.p>

                    {/* Progress bar animation */}
                    <motion.div 
                      className="mt-4 h-0.5 bg-white/10 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ delay: feature.delay + 0.5, duration: 0.8 }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${feature.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: feature.delay + 0.7, duration: 1 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
