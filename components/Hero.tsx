'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlowLogo } from './Logo';
import ModernBackground from './ModernBackground';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { AnimatedText } from './AnimatedSection';

// Composant pour les éléments décoratifs (rendu uniquement côté client)
function ClientOnlyDecorations() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Générer les particules avec des valeurs fixes basées sur l'index
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    width: 2 + (i % 4),
    height: 2 + ((i + 2) % 4),
    opacity: 0.2 + (i % 5) * 0.1,
    left: (i * 5) % 100,
    top: (i * 7) % 100,
    duration: 3 + (i % 4),
    delay: (i % 5) * 0.4,
    xOffset: ((i % 20) - 10),
  }));

  return (
    <>
      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/30"
            style={{
              width: particle.width,
              height: particle.height,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, particle.xOffset, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Lignes décoratives animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{ x: [-1000, 1000] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          animate={{ x: [1000, -1000] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </>
  );
}

export default function Hero() {
  const { t, isLoading } = useLanguage();
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Fond avec effet parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <ModernBackground />
      </motion.div>

      {/* Décorations client-only */}
      <ClientOnlyDecorations />

      <motion.div 
        className="max-w-7xl mx-auto section-padding relative z-10 flex flex-col justify-center min-h-[90vh] py-20"
        style={{ y: textY, opacity, scale }}
      >
        <motion.div 
          className="text-center space-y-8 md:space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate={isMounted ? 'visible' : 'hidden'}
        >
          {/* Logo avec effet brillant */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8 md:mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <GlowLogo 
                variant="full" 
                size="xl" 
                theme="white" 
                className="opacity-90 hover:opacity-100 transition-opacity duration-500" 
              />
            </motion.div>
          </motion.div>
          
          {/* Badge animé */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
              whileHover={{ scale: 1.05, borderColor: 'rgba(119, 55, 233, 0.5)' }}
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">Innovation & Excellence</span>
            </motion.div>
          </motion.div>
          
          {/* Titre principal avec animation de texte */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-overcame-bold leading-tight">
              <span className="gradient-text block">
                {t.hero?.title || 'Services Numériques sur Mesure'}
              </span>
            </h1>
          </motion.div>
          
          {/* Sous-titre avec effet de révélation */}
          <motion.div variants={itemVariants}>
            <motion.h2 
              className="text-2xl md:text-4xl lg:text-5xl text-gray-300 leading-relaxed"
            >
              {t.hero?.subtitle || 'Applications • IA • Logiciels'}
            </motion.h2>
          </motion.div>
          
          {/* Description avec animation */}
          <motion.div variants={itemVariants} className="mb-12 md:mb-16">
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
            >
              {t.hero?.description || 'Nous transformons vos idées en solutions digitales performantes.'}
            </motion.p>
          </motion.div>
          
          {/* Boutons CTA avec effet magnétique */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16 md:mb-20"
            variants={containerVariants}
          >
            <motion.div variants={buttonVariants}>
              <MagneticButton
                as="a"
                href="#contact"
                className="gradient-primary text-white px-10 py-5 rounded-full text-lg md:text-xl font-semibold shadow-lg shadow-primary/25 flex items-center justify-center group"
                strength={0.25}
              >
                <span>{t.hero?.cta || 'Démarrer votre projet'}</span>
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-200" />
              </MagneticButton>
            </motion.div>
            
            <motion.div variants={buttonVariants}>
              <MagneticButton
                as="a"
                href="#services"
                className="glass text-white px-10 py-5 rounded-full text-lg md:text-xl font-semibold hover:bg-white/10 flex items-center justify-center border border-white/10"
                strength={0.25}
              >
                <span>{t.hero?.learnMore || 'En savoir plus'}</span>
              </MagneticButton>
            </motion.div>
          </motion.div>
          
          {/* Indicateur de scroll animé */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <motion.a
              href="#services"
              className="group"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.div 
                className="bg-black/20 backdrop-blur-sm rounded-full p-4 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronDown size={32} className="text-gray-300 group-hover:text-primary transition-colors duration-300" />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Gradient de transition vers la section suivante */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none" />
    </section>
  );
}
