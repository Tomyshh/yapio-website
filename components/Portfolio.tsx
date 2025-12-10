'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, X, ZoomIn, Monitor, Smartphone } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import ModernBackground from './ModernBackground';
import AnimatedSection from './AnimatedSection';
import { TiltCard } from './MagneticButton';
import MagneticButton from './MagneticButton';

// Composant pour les particules (rendu uniquement côté client)
function PortfolioParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Valeurs fixes basées sur l'index
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: (i * 67) % 1000,
    y: (i * 53) % 800,
    duration: 2 + (i % 4),
    delay: (i % 5) * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{ left: particle.x, top: particle.y }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; alt: string; type: 'desktop' | 'mobile' } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? sectionRef : undefined,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Gestion du lightbox
  const openLightbox = (url: string, alt: string, type: 'desktop' | 'mobile') => {
    setLightboxImage({ url, alt, type });
    document.body.style.overflow = 'hidden';
    setIsAutoPlaying(false);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'unset';
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Fermeture avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxImage) {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [lightboxImage]);

  // Liste des projets avec images
  const projects = [
    {
      name: 'Chabbataim',
      slug: 'chabbataim',
      logo: '/projects/Chabbataim/logo.png',
      alt: 'Logo Chabbataim',
      color: 'from-green-400 to-teal-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-400/20',
      shadowColor: 'shadow-green-500/20',
      description: t.clients?.projects?.chabbataim || 'Applications web et mobile pour un restaurant en ligne',
      images: {
        desktop: [],
        mobile: ['/projects/Chabbataim/chimage1_mobile.png', '/projects/Chabbataim/chimage2-mobile.png']
      }
    },
    {
      name: 'Olim Service',
      slug: 'olim-service',
      logo: '/projects/Olim Service/logo.png',
      alt: 'Logo Olim Service',
      color: 'from-[#0E78FE] to-[#3B8FFF]',
      bgColor: 'bg-[#0E78FE]/10',
      borderColor: 'border-[#0E78FE]/20',
      shadowColor: 'shadow-[#0E78FE]/20',
      description: t.clients?.projects?.olimService || 'Services d\'accompagnement et conciergerie administrative',
      images: {
        desktop: ['/projects/Olim Service/image1_desktop.png', '/projects/Olim Service/image2_desktop.png'],
        mobile: ['/projects/Olim Service/olimapp_mobile.png']
      }
    },
    {
      name: 'Aerilux',
      slug: 'aerilux',
      logo: '/projects/Aerilux/logo.png',
      alt: 'Logo Aerilux',
      color: 'from-white to-gray-200',
      bgColor: 'bg-white/10',
      borderColor: 'border-white/20',
      shadowColor: 'shadow-white/10',
      description: t.clients?.projects?.aerilux || 'Solutions d\'éloignement de pigeons',
      images: {
        desktop: ['/projects/Aerilux/image1-desktop.png'],
        mobile: []
      }
    },
    {
      name: 'DTAI',
      slug: 'dtai',
      logo: '/projects/DTAI/logo.png',
      alt: 'Logo DTAI',
      color: 'from-red-400 to-pink-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-400/20',
      shadowColor: 'shadow-red-500/20',
      description: t.clients?.projects?.dtai || 'Expertise en intelligence artificielle dans la transcription et traduction',
      images: { desktop: [], mobile: [] }
    },
    {
      name: 'Havrouta',
      slug: 'havrouta',
      logo: '/projects/Havrouta/logo.png',
      alt: 'Logo Havrouta',
      color: 'from-[#C2A765] to-[#D4B876]',
      bgColor: 'bg-[#C2A765]/10',
      borderColor: 'border-[#C2A765]/20',
      shadowColor: 'shadow-[#C2A765]/20',
      description: t.clients?.projects?.havrouta || 'Plateforme éducative moderne et interactive',
      images: {
        desktop: [],
        mobile: ['/projects/Havrouta/happ-mobile.png']
      }
    },
    {
      name: 'Security Bear',
      slug: 'security-bear',
      logo: '/projects/Security Bear/logo.png',
      alt: 'Logo Security Bear',
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-400/20',
      shadowColor: 'shadow-orange-500/20',
      description: t.clients?.projects?.securityBear || 'Solutions de surveillance et caméras de sécurité',
      images: {
        desktop: ['/projects/Security Bear/image1-desktop.png'],
        mobile: ['/projects/Security Bear/app-mobile.png']
      }
    },
    {
      name: 'Kolot',
      slug: 'kolot',
      logo: '/projects/Kolot/logo.png',
      alt: 'Logo Kolot',
      color: 'from-purple-400 to-indigo-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-400/20',
      shadowColor: 'shadow-purple-500/20',
      description: t.clients?.projects?.kolot || 'Site de recherche intelligente d\'enregistrement vocaux',
      images: {
        desktop: ['/projects/Kolot/image1-desktop.png'],
        mobile: []
      }
    },
    {
      name: 'Oz Leisrael',
      slug: 'oz-leisrael',
      logo: '/projects/Oz Leisrael/logo.png',
      alt: 'Logo Oz Leisrael',
      color: 'from-blue-400 to-cyan-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-400/20',
      shadowColor: 'shadow-blue-500/20',
      description: t.clients?.projects?.ozLeisrael || 'Site de présentation du programme Oz Leisrael',
      images: {
        desktop: ['/projects/Oz Leisrael/image1_desktop.png'],
        mobile: []
      }
    },
    {
      name: 'i24 TV channel',
      slug: 'i24-tv-channel',
      logo: '/projects/i24 TV channel/logo.png',
      alt: 'Logo i24 TV channel',
      color: 'from-red-500 to-blue-600',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      shadowColor: 'shadow-red-500/20',
      description: t.clients?.projects?.i24TvChannel || 'Solution de transcription et traduction en temps réel',
      images: {
        desktop: ['/projects/i24 TV channel/chaine-desktop.png', '/projects/i24 TV channel/chaine2-desktop.png', '/projects/i24 TV channel/chaine3-desktop.png'],
        mobile: []
      }
    },
  ];

  // Toutes les images du projet actuel
  const currentProject = projects[currentIndex];
  const allImages = [
    ...currentProject.images.desktop.map(url => ({ url, type: 'desktop' as const })),
    ...currentProject.images.mobile.map(url => ({ url, type: 'mobile' as const }))
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length, isInView]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden min-h-screen"
    >
      {/* Arrière-plan avec effet parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <ModernBackground />
      </motion.div>

      {/* Particules décoratives */}
      <PortfolioParticles />
      
      <motion.div 
        className="max-w-7xl mx-auto section-padding relative z-10"
        style={{ opacity }}
      >
        {/* Section header avec animation */}
        <AnimatedSection animation="fadeUp" className="text-center mb-16 lg:mb-20">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">{t.clients?.trustSection?.title || 'Projets réalisés'}</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-overcame-bold">
            <span className="gradient-text">{t.clients?.title || 'Nos Projets'}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {t.clients?.subtitle || 'Découvrez nos réalisations'}
          </p>
        </AnimatedSection>

        {/* Carousel 3D amélioré */}
        <div className="relative max-w-6xl mx-auto perspective-1000">
          <div className="relative min-h-[550px] md:min-h-[500px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  rotateY: { duration: 0.4 },
                }}
                className="absolute inset-0"
                style={{ perspective: 1000 }}
              >
                <TiltCard
                  className="w-full h-full"
                  maxTilt={5}
                  glareEnable={true}
                >
                  <div className={`
                    w-full h-full p-8 md:p-12 rounded-3xl
                    bg-gradient-to-br from-black/40 via-black/20 to-transparent
                    backdrop-blur-xl border ${currentProject.borderColor}
                    ${currentProject.shadowColor} shadow-2xl
                    transition-all duration-500
                  `}>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 h-full">
                      {/* Logo du projet avec animation */}
                      <motion.div 
                        className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 flex-shrink-0"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {/* Cercle décoratif animé */}
                        <motion.div
                          className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentProject.color} opacity-20 blur-2xl`}
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                        
                        <div className="relative w-full h-full">
                          <Image
                            src={currentProject.logo}
                            alt={currentProject.alt}
                            fill
                            className="object-contain drop-shadow-2xl"
                            sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
                            priority
                          />
                        </div>
                      </motion.div>
                      
                      {/* Informations du projet */}
                      <motion.div 
                        className="text-center md:text-left max-w-md space-y-6"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <div>
                          <motion.h3 
                            className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${currentProject.color} bg-clip-text text-transparent mb-4`}
                            style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                          >
                            {currentProject.name}
                          </motion.h3>
                          
                          <motion.div 
                            className={`h-1 rounded-full bg-gradient-to-r ${currentProject.color} mb-6`}
                            style={{ width: 0 }}
                            animate={{ width: '5rem' }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                          />
                        </div>
                        
                        <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed">
                          {currentProject.description}
                        </p>
                        
                        {/* Miniatures d'images */}
                        {allImages.length > 0 && (
                          <motion.div 
                            className="pt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <ZoomIn className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-400 uppercase tracking-wide">
                                Captures d&apos;écran
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                              {allImages.slice(0, 4).map((img, idx) => (
                                <motion.button
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openLightbox(img.url, `${currentProject.name} - ${img.type}`, img.type);
                                  }}
                                  className={`relative overflow-hidden rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 group/thumb ${
                                    img.type === 'mobile' ? 'w-10 h-16' : 'w-20 h-12'
                                  }`}
                                  whileHover={{ scale: 1.1, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Image
                                    src={img.url}
                                    alt={`${currentProject.name} preview ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                                    <ZoomIn className="w-3 h-3 text-white" />
                                  </div>
                                </motion.button>
                              ))}
                              {allImages.length > 4 && (
                                <Link
                                  href={`/projects/${currentProject.slug}`}
                                  className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
                                >
                                  <span className="text-xs font-bold">+{allImages.length - 4}</span>
                                </Link>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* Bouton amélioré */}
                        <motion.div 
                          className="pt-4"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6, duration: 0.4 }}
                        >
                          <MagneticButton
                            as="a"
                            href={`/projects/${currentProject.slug}`}
                            className={`
                              inline-flex items-center gap-3 px-8 py-4 rounded-full
                              bg-gradient-to-r ${currentProject.color}
                              text-black font-bold text-lg
                              shadow-lg hover:shadow-2xl
                              transition-all duration-300
                              group
                            `}
                            strength={0.2}
                          >
                            <span>{t.clients?.viewMore || 'Découvrir'}</span>
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </MagneticButton>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>
            
          {/* Navigation arrows modernisées */}
          <motion.button
            onClick={goToPrevious}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-20 group"
            aria-label="Previous project"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/40">
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white/70 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10" />
            </div>
          </motion.button>
          
          <motion.button
            onClick={goToNext}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-20 group"
            aria-label="Next project"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/40">
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white/70 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10" />
            </div>
          </motion.button>
          
          {/* Indicateurs de navigation améliorés */}
          <div className="flex justify-center items-center space-x-3 mt-10">
            {projects.map((project, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative group p-1"
                aria-label={`Aller au projet ${project.name}`}
                whileHover={{ scale: 1.2 }}
              >
                <motion.div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? `bg-gradient-to-r ${project.color}`
                      : 'bg-white/30 group-hover:bg-white/50'
                  }`}
                  animate={{
                    scale: index === currentIndex ? 1.3 : 1,
                  }}
                />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30 blur-md -z-10"
                    layoutId="indicator"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Barre de progression auto-play */}
          {isAutoPlaying && isInView && (
            <div className="mt-6 max-w-xs mx-auto">
              <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary-600"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  key={currentIndex}
                />
              </div>
            </div>
          )}
        </div>

        {/* Section statistiques avec animations */}
        <AnimatedSection animation="fadeUp" delay={0.3} className="mt-24 lg:mt-32">
          <div className="relative glass rounded-3xl p-8 md:p-12 lg:p-16 max-w-5xl mx-auto overflow-hidden">
            {/* Décorations animées */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <motion.div 
                className="absolute top-4 right-4 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-4 left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />
            </div>
            
            <div className="relative z-10">
              <motion.h3 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="gradient-text">{t.clients?.trustSection?.title || 'Une expertise reconnue'}</span>
              </motion.h3>
              <motion.p 
                className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {t.clients?.trustSection?.description || 'Chaque projet est unique.'}
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { value: '20+', label: t.clients?.trustSection?.stats?.clients || 'Clients satisfaits', color: 'from-blue-400 to-cyan-400', delay: 0 },
                  { value: '10+', label: t.clients?.trustSection?.stats?.projects || 'Projets réalisés', color: 'from-purple-400 to-pink-400', delay: 0.1 },
                  { value: '100%', label: t.clients?.trustSection?.stats?.satisfaction || 'Satisfaction client', color: 'from-green-400 to-emerald-400', delay: 0.2 },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: stat.delay, duration: 0.5 }}
                  >
                    <TiltCard
                      className={`p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm`}
                      maxTilt={8}
                    >
                      <motion.div 
                        className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}
                        style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: stat.delay + 0.3, type: 'spring', stiffness: 200 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-gray-300 font-medium text-lg">{stat.label}</div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </motion.div>

      {/* Lightbox pour les images */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div 
              className="relative max-w-[90vw] max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              {/* Bouton fermer */}
              <motion.button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 md:-top-10 md:-right-12 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors duration-300 group z-10"
                aria-label="Fermer l'image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
              </motion.button>
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                {lightboxImage.type === 'mobile' ? (
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
                    <div className="relative w-[280px] h-[560px] md:w-[320px] md:h-[640px] rounded-[2.5rem] overflow-hidden border-4 border-gray-700">
                      <Image
                        src={lightboxImage.url}
                        alt={lightboxImage.alt}
                        fill
                        className="object-cover"
                        quality={100}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative bg-gradient-to-br from-gray-900 to-black p-2">
                    <Image
                      src={lightboxImage.url}
                      alt={lightboxImage.alt}
                      width={1920}
                      height={1080}
                      className="object-contain max-h-[80vh] w-auto rounded-lg"
                      quality={100}
                    />
                  </div>
                )}
              </div>
              
              <p className="text-white/60 text-sm mt-4 text-center flex items-center justify-center gap-2">
                <span className="px-2 py-1 rounded bg-white/10 text-xs uppercase">
                  {lightboxImage.type === 'mobile' ? 'Mobile' : 'Desktop'}
                </span>
                <span>{t.projects?.closeLightbox || 'Appuyez sur Échap pour fermer'}</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
