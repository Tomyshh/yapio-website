'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Monitor, Smartphone, ExternalLink, Calendar, Tag, X, ZoomIn } from 'lucide-react';
import ModernBackground from '@/components/ModernBackground';

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
    const getProjectDescription = (projectKey: string) => {
      if (!t?.clients?.projects) return '';
      return (t.clients.projects as any)[projectKey] || '';
    };

    const projectsConfig = [
      {
        id: 'chabbataim',
        name: 'Chabbataim',
        description: getProjectDescription('chabbataim'),
        color: 'from-green-400 to-teal-400',
        bg_color: 'bg-green-500/10',
        border_color: 'border-green-400/20',
        display_order: 0,
        desktop_images: [],
        mobile_images: [
          '/projects/Chabbataim/chimage1_mobile.png',
          '/projects/Chabbataim/chimage2-mobile.png'
        ],
        technologies: ['React Native', 'Node.js', 'MongoDB'],
        year: '2024',
        category: 'Application Mobile'
      },
      {
        id: 'olim-service',
        name: 'Olim Service',
        description: getProjectDescription('olimService'),
        color: 'from-[#0E78FE] to-[#3B8FFF]',
        bg_color: 'bg-[#0E78FE]/10',
        border_color: 'border-[#0E78FE]/20',
        display_order: 1,
        desktop_images: [
          '/projects/Olim Service/image1_desktop.png',
          '/projects/Olim Service/image2_desktop.png'
        ],
        mobile_images: [
          '/projects/Olim Service/olimapp_mobile.png'
        ],
        technologies: ['Next.js', 'React', 'Tailwind CSS'],
        year: '2024',
        category: 'Site Web & Application'
      },
      {
        id: 'aerilux',
        name: 'Aerilux',
        description: getProjectDescription('aerilux'),
        color: 'from-white to-gray-200',
        bg_color: 'bg-white/10',
        border_color: 'border-white/20',
        display_order: 2,
        desktop_images: [
          '/projects/Aerilux/image1-desktop.png'
        ],
        mobile_images: [],
        technologies: ['WordPress', 'PHP', 'JavaScript'],
        year: '2023',
        category: 'Site Web'
      },
      {
        id: 'dtai',
        name: 'DTAI',
        description: getProjectDescription('dtai'),
        color: 'from-red-400 to-pink-400',
        bg_color: 'bg-red-500/10',
        border_color: 'border-red-400/20',
        display_order: 3,
        desktop_images: [],
        mobile_images: [],
        technologies: ['Python', 'TensorFlow', 'React'],
        year: '2024',
        category: 'Intelligence Artificielle'
      },
      {
        id: 'havrouta',
        name: 'Havrouta',
        description: getProjectDescription('havrouta'),
        color: 'from-[#C2A765] to-[#D4B876]',
        bg_color: 'bg-[#C2A765]/10',
        border_color: 'border-[#C2A765]/20',
        display_order: 4,
        desktop_images: [],
        mobile_images: [
          '/projects/Havrouta/happ-mobile.png'
        ],
        technologies: ['Flutter', 'Firebase', 'Node.js'],
        year: '2024',
        category: 'Application Mobile'
      },
      {
        id: 'security-bear',
        name: 'Security Bear',
        description: getProjectDescription('securityBear'),
        color: 'from-orange-400 to-red-500',
        bg_color: 'bg-orange-500/10',
        border_color: 'border-orange-400/20',
        display_order: 5,
        desktop_images: [
          '/projects/Security Bear/image1-desktop.png'
        ],
        mobile_images: [
          '/projects/Security Bear/app-mobile.png'
        ],
        technologies: ['React', 'Node.js', 'IoT'],
        year: '2023',
        category: 'Application Web & Mobile'
      },
      {
        id: 'kolot',
        name: 'Kolot',
        description: getProjectDescription('kolot'),
        color: 'from-purple-400 to-indigo-400',
        bg_color: 'bg-purple-500/10',
        border_color: 'border-purple-400/20',
        display_order: 6,
        desktop_images: [
          '/projects/Kolot/image1-desktop.png'
        ],
        mobile_images: [],
        technologies: ['Vue.js', 'Laravel', 'MySQL'],
        year: '2024',
        category: 'Plateforme Web'
      },
      {
        id: 'oz-leisrael',
        name: 'Oz Leisrael',
        description: getProjectDescription('ozLeisrael'),
        color: 'from-blue-400 to-cyan-400',
        bg_color: 'bg-blue-500/10',
        border_color: 'border-blue-400/20',
        display_order: 7,
        desktop_images: [
          '/projects/Oz Leisrael/image1_desktop.png'
        ],
        mobile_images: [],
        technologies: ['React', 'Express', 'PostgreSQL'],
        year: '2023',
        category: 'Application Web'
      },
      {
        id: 'i24-tv-channel',
        name: 'i24 TV channel',
        description: getProjectDescription('i24TvChannel'),
        color: 'from-red-500 to-blue-600',
        bg_color: 'bg-red-500/10',
        border_color: 'border-red-500/20',
        display_order: 8,
        desktop_images: [
          '/projects/i24 TV channel/chaine-desktop.png',
          '/projects/i24 TV channel/chaine2-desktop.png',
          '/projects/i24 TV channel/chaine3-desktop.png'
        ],
        mobile_images: [],
        technologies: ['React', 'Video.js', 'WebRTC'],
        year: '2024',
        category: 'Plateforme Streaming'
      }
    ];

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

      const logoUrl = `/projects/${config.name}/logo.png`;

      return {
        id: config.id,
        name: config.name,
        description: config.description,
        logo_url: logoUrl,
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
      <main className="pt-20 min-h-screen">
        <ModernBackground />
        <div className="max-w-7xl mx-auto section-padding py-16 relative z-10">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-700 rounded w-64"></div>
            <div className="h-64 bg-gray-700 rounded"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="pt-20 min-h-screen">
        <ModernBackground />
        <div className="max-w-7xl mx-auto section-padding py-16 relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Projet non trouvé</h1>
          <Link 
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen">
      <ModernBackground />
      
      <div className="relative z-10">
        {/* Header avec retour */}
        <div className="max-w-7xl mx-auto section-padding py-8">
          <Link 
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {t.projects?.backToPortfolio || 'Retour au portfolio'}
          </Link>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto section-padding py-12">
          <div className="glass rounded-3xl p-8 md:p-16 backdrop-blur-md border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Logo et Info */}
              <div className="space-y-8">
                <div className="relative group inline-block">
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-20 blur-3xl`} />
                  <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto lg:mx-0">
                    <Image
                      src={project.logo_url}
                      alt={`Logo ${project.name}`}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 768px) 256px, 320px"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Détails */}
              <div className="space-y-6">
                <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent font-overcame-bold`}>
                  {project.name}
                </h1>
                
                <div className={`w-32 h-1 rounded-full bg-gradient-to-r ${project.color}`} />
                
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Métadonnées */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {project.year && (
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="p-2 rounded-lg bg-white/5">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase">{t.projects?.year || 'Année'}</div>
                        <div className="text-white font-semibold">{project.year}</div>
                      </div>
                    </div>
                  )}
                  
                  {project.category && (
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="p-2 rounded-lg bg-white/5">
                        <Tag className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase">{t.projects?.category || 'Catégorie'}</div>
                        <div className="text-white font-semibold">{project.category}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="pt-4">
                    <h3 className="text-sm text-gray-500 uppercase mb-3">{t.projects?.technologies || 'Technologies utilisées'}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className={`px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${project.color} text-black`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Galerie d'images */}
        <div className="max-w-7xl mx-auto section-padding py-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-overcame-bold">
            <span className="gradient-text">{t.projects?.gallery || 'Galerie'}</span>
          </h2>

          <div className="space-y-16">
            {/* Images Desktop */}
            {project.desktop_images && project.desktop_images.length > 0 && (
              <div className="space-y-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">{t.projects?.desktopVersion || 'Version Desktop'}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.desktop_images.map((img, imgIndex) => (
                    <div
                      key={img.id}
                      className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer glass border border-white/10"
                      onClick={() => openLightbox(img.image_url, img.alt_text || `${project.name} - Desktop ${imgIndex + 1}`)}
                    >
                      <Image
                        src={img.image_url}
                        alt={img.alt_text || `${project.name} - Desktop ${imgIndex + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Images Mobile */}
            {project.mobile_images && project.mobile_images.length > 0 && (
              <div className="space-y-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">{t.projects?.mobileVersion || 'Version Mobile'}</h3>
                </div>
                
                <div className="flex flex-wrap gap-8 justify-center">
                  {project.mobile_images.map((img, imgIndex) => (
                    <div
                      key={img.id}
                      className="relative w-48 md:w-56 aspect-[9/16] rounded-[2.5rem] overflow-hidden group cursor-pointer glass border border-white/10"
                      onClick={() => openLightbox(img.image_url, img.alt_text || `${project.name} - Mobile ${imgIndex + 1}`)}
                    >
                      <Image
                        src={img.image_url}
                        alt={img.alt_text || `${project.name} - Mobile ${imgIndex + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 192px, 224px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message si aucune image */}
            {(!project.desktop_images || project.desktop_images.length === 0) && 
             (!project.mobile_images || project.mobile_images.length === 0) && (
              <div className="glass rounded-2xl p-16 text-center border border-white/10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xl text-gray-400">{t.projects?.noImages || 'Visuels à venir prochainement'}</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto section-padding py-16">
          <div className="glass rounded-3xl p-12 md:p-16 text-center border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t.projects?.interestedTitle || 'Intéressé par un projet similaire ?'}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t.projects?.interestedDescription || 'Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider.'}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {t.projects?.contactUs || 'Nous contacter'}
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

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

