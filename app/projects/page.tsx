'use client';

import React, { useState, useEffect } from 'react';
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

const categories = [
  { id: 'all', label: 'Tous', icon: Sparkles },
  { id: 'web', label: 'Web', icon: Monitor },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
  { id: 'ia', label: 'IA', icon: Sparkles },
];

export default function ProjectsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; alt: string; type: 'desktop' | 'mobile' } | null>(null);

  const projectsConfig = PROJECTS.map((p) => ({
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
  }));

  const filteredProjects = activeFilter === 'all' 
    ? projectsConfig 
    : projectsConfig.filter(p => p.category === activeFilter);

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

  return (
    <main className="min-h-screen bg-dark">
      <Navigation />
      <ModernBackground />

      <div className="relative z-10 pt-24 pb-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto section-padding">
          <AnimatedSection animation="fadeUp" className="text-center mb-12">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Portfolio</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-overcame-bold">
              <span className="gradient-text">{t.clients?.title || 'Nos Projets'}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
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
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeFilter === cat.id
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
              {filteredProjects.map((project, index) => {
                const allImages = [
                  ...project.images.desktop.map(url => ({ url, type: 'desktop' as const })),
                  ...project.images.mobile.map(url => ({ url, type: 'mobile' as const }))
                ];

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <TiltCard className="h-full" maxTilt={8} glareEnable={true}>
                      <div className={`
                        h-full rounded-2xl overflow-hidden
                        bg-gradient-to-br from-black/40 via-black/20 to-transparent
                        backdrop-blur-xl border border-white/10 hover:border-white/15
                        hover:shadow-xl transition-all duration-500
                        group
                      `}
                      role="link"
                      tabIndex={0}
                      aria-label={`Voir le projet ${project.name}`}
                      onClick={() => router.push(`/projects/${project.id}`)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          router.push(`/projects/${project.id}`);
                        }
                      }}
                      >
                        {/* Preview: logo sur fond noir (plus épuré) */}
                        <div className="relative h-48 overflow-hidden bg-black">
                          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/85 to-black/70" />
                          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.12),transparent_55%)]" />
                          <Image
                            src={project.logo}
                            alt={project.alt || project.name}
                            fill
                            className="object-contain p-10 opacity-95 drop-shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={index < 3}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          
                          {/* Badge catégorie */}
                          <div className="absolute top-3 right-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.color} text-black`}>
                              {project.year}
                            </span>
                          </div>
                        </div>

                        {/* Contenu */}
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 flex-shrink-0">
                                <Image
                                  src={project.logo}
                                  alt={`Logo ${project.name}`}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <h3 className={`text-lg font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
                                style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                              >
                                {project.name}
                              </h3>
                            </div>
                          </div>

                          {/* Miniatures */}
                          {allImages.length > 0 && (
                            <div className="flex gap-2 mb-4">
                              {allImages.slice(0, 3).map((img, idx) => (
                                <motion.button
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openLightbox(img.url, `${project.name} - ${img.type}`, img.type);
                                  }}
                                  className={`relative overflow-hidden rounded-lg border border-white/12 hover:border-white/20 transition-all ${
                                    img.type === 'mobile' ? 'w-8 h-12' : 'w-16 h-10'
                                  }`}
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <Image
                                    src={img.url}
                                    alt={`${project.name} preview`}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <ZoomIn className="w-3 h-3 text-white" />
                                  </div>
                                </motion.button>
                              ))}
                              {allImages.length > 3 && (
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white/60 text-xs">
                                  +{allImages.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Bouton voir */}
                          <div className="flex items-stretch gap-2">
                            <Link
                              href={`/projects/${project.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className={`
                                flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                                bg-white/5 hover:bg-white/10
                                border border-white/12 hover:border-white/18
                                text-white font-semibold text-sm
                                hover:shadow-lg hover:shadow-black/30
                                transition-all duration-300
                                group/btn
                              `}
                            >
                              <span>Voir le projet</span>
                              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </Link>

                            {project.externalUrl && (
                              <a
                                href={project.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`
                                  w-11 rounded-xl
                                  bg-white/5 hover:bg-white/10
                                  border border-white/12 hover:border-white/18
                                  text-white/90 hover:text-white
                                  flex items-center justify-center
                                  transition-all duration-300
                                `}
                                aria-label={`Ouvrir ${project.name} (lien externe)`}
                                title="Ouvrir le lien externe"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Stats */}
          <AnimatedSection animation="fadeUp" delay={0.4} className="mt-20">
            <div className="glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-8 text-center">
                {[
                  { value: '20+', label: 'Clients satisfaits', color: 'from-blue-400 to-cyan-400' },
                  { value: '10+', label: 'Projets réalisés', color: 'from-purple-400 to-pink-400' },
                  { value: '100%', label: 'Satisfaction', color: 'from-green-400 to-emerald-400' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
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
