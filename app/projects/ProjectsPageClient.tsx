'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowUpRight, Sparkles, Monitor, Smartphone, X, ZoomIn, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ModernBackground from '@/components/ModernBackground';
import AnimatedSection from '@/components/AnimatedSection';
import { TiltCard } from '@/components/MagneticButton';
import { PROJECTS } from '@/lib/projects';
import { OptimizedImage } from '@/components/OptimizedImage';
import { ProjectCard } from '@/components/ProjectCard';
import { preloadProjectLogos } from '@/lib/imagePreloader';

const categories = [
  { id: 'all', label: 'Tous', icon: Sparkles },
  { id: 'web', label: 'Web', icon: Monitor },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
  { id: 'ia', label: 'IA', icon: Sparkles },
];

export default function ProjectsPageClient() {
  const { t } = useLanguage();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; alt: string; type: 'desktop' | 'mobile' } | null>(null);

  // Mémoriser la configuration des projets pour éviter les recalculs
  const projectsConfig = useMemo(() => PROJECTS.map((p) => ({
    id: p.slug,
    name: p.name,
    color: p.color,
    bgColor: p.bgColor,
    borderColor: p.borderColor,
    category: p.category,
    year: p.year,
    images: p.images,
    logo: p.logo,
    alt: p.alt,
    externalUrl: p.externalUrl,
  })), []);

  // Mémoriser les projets filtrés
  const filteredProjects = useMemo(() => 
    activeFilter === 'all'
      ? projectsConfig
      : projectsConfig.filter(p => p.category === activeFilter),
    [activeFilter, projectsConfig]
  );

  const openLightbox = (url: string, alt: string, type: 'desktop' | 'mobile') => {
    setLightboxImage({ url, alt, type });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxImage) {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [lightboxImage]);

  // Précharger les logos des projets critiques
  useEffect(() => {
    if (projectsConfig.length > 0) {
      preloadProjectLogos(projectsConfig);
    }
  }, [projectsConfig]);

  return (
    <main className="min-h-screen bg-dark">
      <Navigation />
      <ModernBackground />

      <div className="relative z-10 pt-24 pb-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto section-padding">
          <AnimatedSection animation="fadeUp" className="text-center mb-12">
            <p className="text-sm font-medium text-primary mb-6">Portfolio</p>

            <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
              {t.clients?.title || 'Nos Projets'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t.clients?.subtitle || 'Découvrez nos réalisations et projets digitaux'}
            </p>
          </AnimatedSection>

          {/* Filtres */}
          <AnimatedSection animation="fadeUp" delay={0.2} className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === cat.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </motion.button>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Grille de projets */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onImageClick={openLightbox}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Stats */}
          <AnimatedSection animation="fadeUp" delay={0.4} className="mt-20">
            <div className="glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-8 text-center">
                {[
                  { value: '20+', label: 'Clients satisfaits', color: 'from-blue-400 to-cyan-400' },
                  { value: '30+', label: 'Projets réalisés', color: 'from-purple-400 to-pink-400' },
                  { value: '100%', label: 'Satisfaction', color: 'from-green-400 to-emerald-400' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <Footer />

      {/* Lightbox */}
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
            >
              <motion.button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              <div className="rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {lightboxImage.type === 'mobile' ? (
                  <div className="bg-gradient-to-br from-gray-900 to-black p-4">
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
                  <Image
                    src={lightboxImage.url}
                    alt={lightboxImage.alt}
                    width={1920}
                    height={1080}
                    className="object-contain max-h-[80vh] w-auto rounded-lg"
                    quality={100}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

