'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Trophy, Clock, Heart, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { TiltCard } from './MagneticButton';
import MagneticButton from './MagneticButton';

export default function About() {
  const { t, language, isLoading } = useLanguage();
  const founderTextDir = language === 'he' ? 'rtl' : 'ltr';
  
  // Vérification de sécurité pour éviter les erreurs pendant l'hydratation
  if (isLoading || !t?.about?.stats) {
    return (
      <section id="about" className="py-20 relative overflow-hidden cv-auto">
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  const stats = [
    { icon: Users, value: '20+', label: t.about.stats.clients, color: 'from-primary to-primary-600' },
    { icon: Trophy, value: '30+', label: t.about.stats.projects, color: 'from-primary to-primary-600' },
    { icon: Clock, value: '8+', label: t.about.stats.experience, color: 'from-primary to-primary-600' },
    { icon: Heart, value: '100%', label: t.about.stats.passion, color: 'from-primary to-primary-600' },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden cv-auto">
      <div className="max-w-7xl mx-auto section-padding relative z-10">
        {/* Header */}
        <AnimatedSection animation="fadeUp" className="text-center mb-16 lg:mb-20">
          {t.about.badge && (
            <p className="text-sm font-medium text-primary mb-6">{t.about.badge}</p>
          )}

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            {t.about.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-28">
          {/* Story Content */}
          <AnimatedSection animation="fadeRight">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-primary to-primary-600 rounded-full" />
                  {t.about.story.title}
                </h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {t.about.story.content}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-primary to-primary-600 rounded-full" />
                  {t.about.mission.title}
                </h3>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  {t.about.mission.content}
                </p>
              </motion.div>

              {/* Signature + Avatar */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="glass rounded-2xl border border-white/10 p-6 lg:p-7">
                  <div className="flex items-start gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-black/40">
                      <Image
                        src="/avatar.jpeg"
                        alt="Photo de profil"
                        fill
                        className="object-cover"
                        sizes="56px"
                        priority
                      />
                    </div>
                    <div className="space-y-2" dir={founderTextDir} lang={language}>
                      <p className="text-white/90 text-base leading-relaxed italic">
                        {t.about.founderQuote}
                      </p>
                      <p className="text-sm text-gray-400 not-italic">
                        {t.about.founderAttribution}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <MagneticButton
                  as="a"
                  href="#contact"
                  className="inline-flex items-center gradient-primary text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-primary/25 group"
                  strength={0.2}
                >
                  <span>{t.about.cta}</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 gap-4 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <TiltCard className="h-full" maxTilt={8}>
                    <motion.div
                      className="glass rounded-2xl p-6 lg:p-8 text-center h-full group"
                      whileHover={{ y: -5 }}
                    >
                      <motion.div 
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} p-4 mx-auto mb-4`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Icon className="w-full h-full text-white" />
                      </motion.div>
                      <motion.div 
                        className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                        style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-gray-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
