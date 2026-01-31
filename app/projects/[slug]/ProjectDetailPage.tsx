'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Monitor, Smartphone, ExternalLink, Calendar, Tag, X, ZoomIn, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernBackground from '@/components/ModernBackground';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getLocalizedProjects } from '@/lib/projects';

interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  image_type: 'desktop' | 'mobile';
  display_order: number;
  alt_text?: string;
  created_at: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  color?: string;
  bg_color?: string;
  border_color?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images?: ProjectImage[];
  desktop_images?: ProjectImage[];
  mobile_images?: ProjectImage[];
  technologies?: string[];
  year?: string;
  category?: string;
}

interface ProjectDetailPageProps {
  slug: string;
}

export default function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const { t, isLoading: languageLoading } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; alt: string } | null>(null);

  useEffect(() => {
    if (!t?.clients?.projects || languageLoading) return;

    const projects = getProjectsFromConfig();
    const foundProject = projects.find(p => p.id.toLowerCase() === slug);

    if (foundProject) {
      setProject(foundProject);
    }
    setIsLoading(false);
  }, [slug, t?.clients?.projects, languageLoading]);

  function getProjectsFromConfig(): Project[] {
    const projectsConfig = getLocalizedProjects(t).map((p) => ({
      id: p.slug,
      name: p.name,
      description: p.description,
      color: p.color,
      bg_color: p.bgColor,
      border_color: p.borderColor,
      display_order: p.displayOrder ?? 0,
      desktop_images: p.images.desktop,
      mobile_images: p.images.mobile,
      technologies: p.technologies || [],
      year: p.year,
      category: p.categoryLabel || '',
      logo_url: p.logo,
    }));

    return projectsConfig.map((config, index) => {
      const desktopImages = config.desktop_images.map((url, imgIndex) => ({
        id: `${config.name}-desktop-${imgIndex}`,
        project_id: config.name,
        image_url: url,
        image_type: 'desktop' as const,
        display_order: imgIndex,
        alt_text: `${config.name} - Interface desktop`,
        created_at: new Date().toISOString(),
      }));

      const mobileImages = config.mobile_images.map((url, imgIndex) => ({
        id: `${config.name}-mobile-${imgIndex}`,
        project_id: config.name,
        image_url: url,
        image_type: 'mobile' as const,
        display_order: imgIndex,
        alt_text: `${config.name} - Interface mobile`,
        created_at: new Date().toISOString(),
      }));

      return {
        id: config.id,
        name: config.name,
        description: config.description,
        logo_url: config.logo_url,
        color: config.color,
        bg_color: config.bg_color,
        border_color: config.border_color,
        display_order: config.display_order,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: [...desktopImages, ...mobileImages],
        desktop_images: desktopImages,
        mobile_images: mobileImages,
        technologies: config.technologies,
        year: config.year,
        category: config.category,
      };
    });
  }

  const openLightbox = (url: string, alt: string) => {
    setLightboxImage({ url, alt });
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

  if (isLoading || languageLoading || !t?.projects) {
    return (
      <main className="min-h-screen bg-dark">
        <Navigation />
        <ModernBackground />
        <div className="max-w-7xl mx-auto section-padding py-32 relative z-10">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-700/50 rounded-xl w-64"></div>
            <div className="h-64 bg-gray-700/50 rounded-2xl"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-dark">
        <Navigation />
        <ModernBackground />
        <div className="max-w-7xl mx-auto section-padding py-32 relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Projet non trouvé</h1>
          <Link 
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au portfolio
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark">
      <Navigation />
      <ModernBackground />
      
      <div className="relative z-10 pt-24">
        {/* Header avec navigation rapide entre projets */}
        <motion.div 
          className="max-w-7xl mx-auto section-padding py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Bouton retour moderne */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/#portfolio"
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full glass border border-white/15 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                aria-label={t.projects?.backToPortfolio || 'Retour au portfolio'}
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">{t.projects?.backToPortfolio || 'Portfolio'}</span>
              </Link>
            </motion.div>

            {/* Navigation horizontale avec mini-bulles */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1 justify-end py-2">
              {getProjectsFromConfig()
                .filter(p => p.id !== project?.id)
                .map((otherProject, index) => (
                  <motion.div
                    key={otherProject.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/projects/${otherProject.id}`}
                      className="group relative flex-shrink-0"
                      title={otherProject.name}
                    >
                      {/* Mini bulle de projet */}
                      <div className="relative w-10 h-10">
                        {/* Cercle principal (sobre) */}
                        <div className={`relative w-full h-full rounded-full bg-black/40 backdrop-blur-sm border ${otherProject.border_color} overflow-hidden group-hover:scale-105 transition-all duration-300 flex items-center justify-center p-2`}>
                          <Image
                            src={otherProject.logo_url}
                            alt={`Logo ${otherProject.name}`}
                            width={32}
                            height={32}
                            className="object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Tooltip au survol */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                          <div className={`px-2 py-1 rounded-md bg-gradient-to-r ${otherProject.color} text-black text-[10px] font-bold whitespace-nowrap shadow-lg`}>
                            {otherProject.name}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          className="max-w-7xl mx-auto section-padding py-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative glass rounded-2xl p-6 md:p-8 backdrop-blur-md border border-white/10 overflow-hidden">
            {/* Décor discret */}
            <div className={`absolute -top-24 -right-24 w-56 h-56 bg-gradient-to-br ${project.color} opacity-[0.08] blur-[90px]`} />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
              {/* Logo avec animation */}
              <motion.div 
                className="flex justify-center lg:justify-start"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="relative group">
                  <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.10),transparent_60%)]" />
                  <div className="relative w-44 h-44 md:w-52 md:h-52">
                    <Image
                      src={project.logo_url}
                      alt={`Logo ${project.name}`}
                      fill
                      className="object-contain drop-shadow-xl"
                      sizes="(max-width: 768px) 176px, 208px"
                      priority
                    />
                  </div>
                </div>
              </motion.div>

              {/* Détails */}
              <motion.div 
                className="space-y-4 text-center lg:text-left"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent font-overcame-bold leading-tight`}
                  style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {project.name}
                </h1>
                
                <motion.div 
                  className={`h-0.5 rounded-full bg-gradient-to-r ${project.color} mx-auto lg:mx-0`}
                  initial={{ width: 0 }}
                  animate={{ width: '6rem' }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />
                
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Métadonnées */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-1">
                  {project.year && (
                    <motion.div 
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-white/90 text-sm font-medium">{project.year}</span>
                    </motion.div>
                  )}
                  
                  {project.category && (
                    <motion.div 
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-white/90 text-sm font-medium">{project.category}</span>
                    </motion.div>
                  )}
                </div>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <motion.div 
                    className="pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                      {project.technologies.map((tech, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-200"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.9 + index * 0.1, type: 'spring' }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Galerie d'images */}
        <motion.div 
          className="max-w-7xl mx-auto section-padding py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="text-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">{t.projects?.gallery || 'Galerie'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-overcame-bold">
              <span className="gradient-text">Captures d&apos;écran</span>
            </h2>
          </motion.div>

          <div className="space-y-10">
            {/* Images Desktop */}
            {project.desktop_images && project.desktop_images.length > 0 && (
              <motion.div 
                className="space-y-5"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <Monitor className="w-4 h-4 text-gray-200" />
                  </div>
                  <h3 className="text-lg font-semibold">{t.projects?.desktopVersion || 'Version Desktop'}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {project.desktop_images.map((img, imgIndex) => (
                    <motion.div
                      key={img.id}
                      className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer glass border border-white/10"
                      onClick={() => openLightbox(img.image_url, img.alt_text || `${project.name} - Desktop ${imgIndex + 1}`)}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={img.image_url}
                        alt={img.alt_text || `${project.name} - Desktop ${imgIndex + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xs font-medium">Agrandir</span>
                        <div className="w-9 h-9 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <ZoomIn className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Images Mobile */}
            {project.mobile_images && project.mobile_images.length > 0 && (
              <motion.div 
                className="space-y-5"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <Smartphone className="w-4 h-4 text-gray-200" />
                  </div>
                  <h3 className="text-lg font-semibold">{t.projects?.mobileVersion || 'Version Mobile'}</h3>
                </div>
                
                <div className="flex flex-wrap gap-5 justify-center">
                  {project.mobile_images.map((img, imgIndex) => (
                    <motion.div
                      key={img.id}
                      className="relative w-40 md:w-44 aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer glass border border-white/10"
                      onClick={() => openLightbox(img.image_url, img.alt_text || `${project.name} - Mobile ${imgIndex + 1}`)}
                      whileHover={{ scale: 1.03, y: -3 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={img.image_url}
                        alt={img.alt_text || `${project.name} - Mobile ${imgIndex + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 176px, 208px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ZoomIn className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Message si aucune image */}
            {(!project.desktop_images || project.desktop_images.length === 0) && 
             (!project.mobile_images || project.mobile_images.length === 0) && (
              <motion.div 
                className="glass rounded-2xl p-8 md:p-10 text-center border border-white/10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${project.color} bg-opacity-20 flex items-center justify-center`}>
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-400">{t.projects?.noImages || 'Visuels à venir prochainement'}</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Navigation vers d'autres projets */}
        <div className="max-w-7xl mx-auto section-padding py-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 font-overcame-bold">
              <span className="gradient-text">{t.projects?.exploreOtherProjects || 'Découvrez nos autres projets'}</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">{t.projects?.exploreDescription || 'Explorez notre portfolio et découvrez nos réalisations'}</p>
          </div>

          <div className="relative">
            {/* Grid de projets */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8">
              {getProjectsFromConfig()
                .filter(p => p.id !== project?.id)
                .map((otherProject) => (
                  <Link
                    key={otherProject.id}
                    href={`/projects/${otherProject.id}`}
                    className="group relative"
                  >
                    {/* Bulle de projet */}
                    <div className="relative aspect-square">
                      {/* Cercle principal */}
                      <div className={`relative w-full h-full rounded-full glass border ${otherProject.border_color} overflow-hidden backdrop-blur-sm group-hover:scale-105 transition-all duration-300 flex items-center justify-center p-5`}>
                        {/* Logo du projet */}
                        <div className="relative w-full h-full">
                          <Image
                            src={otherProject.logo_url}
                            alt={`Logo ${otherProject.name}`}
                            fill
                            className="object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                        
                        {/* Overlay au survol */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${otherProject.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      </div>

                      {/* Indicateur "Voir le projet" */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${otherProject.color} text-black text-xs font-bold whitespace-nowrap shadow-lg`}>
                          {t.projects?.viewProject || 'Voir le projet'}
                        </div>
                      </div>
                    </div>

                    {/* Nom du projet */}
                    <div className="mt-6 text-center">
                      <h3 className="text-white font-semibold text-base md:text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {otherProject.name}
                      </h3>
                      <p className="text-gray-500 text-xs md:text-sm mt-1 line-clamp-1">
                        {otherProject.category}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>

            {/* Bouton "Voir tous les projets" */}
            <div className="text-center mt-12">
              <Link
                href="/#portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/20 text-white hover:bg-white/10 transition-all duration-300 group"
              >
                <span className="text-sm font-semibold">{t.projects?.viewAllProjects || 'Voir tous nos projets'}</span>
                <svg 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="max-w-7xl mx-auto section-padding py-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative glass rounded-2xl p-8 md:p-10 text-center border border-white/10 overflow-hidden">
            {/* Gradients décoratifs */}
            <div className="absolute -top-24 -right-24 w-56 h-56 bg-primary/15 rounded-full blur-[90px]" />
            <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-blue-500/15 rounded-full blur-[90px]" />
            
            <div className="relative">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                {t.projects?.interestedTitle || 'Intéressé par un projet similaire ?'}
              </h2>
              <p className="text-base md:text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                {t.projects?.interestedDescription || 'Contactez-nous pour discuter de votre projet.'}
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white font-semibold hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                >
                  {t.projects?.contactUs || 'Nous contacter'}
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fadeIn"
          onClick={closeLightbox}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] animate-scaleIn">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 md:-top-10 md:-right-12 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors duration-300 group"
              aria-label="Fermer l'image"
            >
              <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>
            
            <div className="relative rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              {lightboxImage.alt.toLowerCase().includes('mobile') ? (
                <div className="relative flex items-center justify-center">
                  <Image
                    src={lightboxImage.url}
                    alt={lightboxImage.alt}
                    width={400}
                    height={800}
                    className="object-contain max-h-[85vh] w-auto max-w-[400px]"
                    quality={100}
                  />
                </div>
              ) : (
                <Image
                  src={lightboxImage.url}
                  alt={lightboxImage.alt}
                  width={1920}
                  height={1080}
                  className="object-contain max-h-[85vh] w-auto"
                  quality={100}
                />
              )}
            </div>
            
            <p className="text-white/70 text-sm mt-4 text-center">
              {t.projects?.closeLightbox || 'Appuyez sur Échap ou cliquez à l\'extérieur pour fermer'}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

