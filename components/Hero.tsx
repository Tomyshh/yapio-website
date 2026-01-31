'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlowLogo } from './Logo';
import ModernBackground from './ModernBackground';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Utiliser le scroll global sans ref pour éviter les erreurs d'hydratation
  const { scrollYProgress } = useScroll();

  // Effets Parallax basés sur le scroll global
  const backgroundY = useTransform(scrollYProgress, [0, 0.3], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 0.3], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);

  // Variants pour les animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
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
    <section 
      id="home" 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Fond avec effet parallax */}
      <motion.div 
        className="absolute -inset-[30%]"
        style={{ y: backgroundY }}
      >
        <ModernBackground />
      </motion.div>

      <motion.div 
        className="max-w-7xl mx-auto section-padding relative z-10 pt-28 md:pt-32 pb-16 md:pb-20"
        style={{ y: textY, opacity, scale }}
      >
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isMounted ? 'visible' : 'hidden'}
        >
          {/* Colonne éditoriale */}
          <div className="lg:col-span-7">
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <GlowLogo
                variant="full"
                size="lg"
                theme="white"
                className="opacity-95"
              />
              <span className="hidden md:inline-block text-xs tracking-[0.2em] uppercase text-gray-500">
                {t.hero.studio}
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <div className="eyebrow w-fit">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>{t.hero.eyebrow}</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-overcame-bold leading-[1.05] text-white">
                <span className="block">{t.hero?.title || 'Services Numériques sur Mesure'}</span>
              </h1>
              <div className="mt-6 h-px hairline" />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6">
              <p className="text-lg md:text-2xl text-gray-300 leading-relaxed">
                {t.hero?.subtitle || 'Applications • IA • Logiciels'}
              </p>
              <p className="mt-4 text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed">
                {t.hero?.description || 'Nous transformons vos idées en solutions digitales performantes.'}
              </p>
            </motion.div>

            <motion.div className="mt-10 flex flex-col sm:flex-row gap-4" variants={containerVariants}>
              <motion.div variants={buttonVariants}>
                <MagneticButton
                  as="a"
                  href="#contact"
                  className="bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-full text-base md:text-lg font-semibold shadow-lg shadow-primary/25 flex items-center justify-center group border border-primary/30"
                  strength={0.22}
                >
                  <span>{t.hero?.cta || 'Démarrer votre projet'}</span>
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                </MagneticButton>
              </motion.div>

              <motion.div variants={buttonVariants}>
                <MagneticButton
                  as="a"
                  href="#services"
                  className="glass text-white px-8 py-4 rounded-full text-base md:text-lg font-semibold hover:bg-white/10 flex items-center justify-center border border-white/10"
                  strength={0.22}
                >
                  <span>{t.hero.secondaryCta}</span>
                </MagneticButton>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
              <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/30" /> {t.hero.pills.deadlines}</span>
              <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/30" /> {t.hero.pills.maintainable}</span>
              <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/30" /> {t.hero.pills.support}</span>
            </motion.div>
          </div>

          {/* Colonne “proof / offre” */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <div className="glass rounded-3xl p-7 md:p-8 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl" />
              </div>
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{t.hero.offer.kicker}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{t.hero.offer.title}</h3>
                <p className="mt-3 text-gray-400 leading-relaxed">
                  {t.hero.offer.description}
                </p>

                <div className="mt-6 space-y-3">
                  {t.hero.offer.items.map((txt) => (
                    <div key={txt} className="flex items-start gap-3">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-gray-300">{txt}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {t.hero.metrics.map((s) => (
                    <div key={s.v} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-xl font-semibold text-white">{s.k}</div>
                      <div className="text-xs text-gray-400 mt-1">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Gradient de transition vers la section suivante */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none" />

      {/* Indicateur de scroll (discret) */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
        <motion.a
          href="#services"
          className="pointer-events-auto"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="bg-black/20 backdrop-blur-sm rounded-full p-3 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronDown size={22} className="text-gray-300" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
