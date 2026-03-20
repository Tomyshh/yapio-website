'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, ZoomIn, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { TiltCard } from './MagneticButton';
import { OptimizedImage } from './OptimizedImage';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    color: string;
    borderColor: string;
    category: string;
    year: string;
    images: {
      desktop: string[];
      mobile: string[];
    };
    logo: string;
    alt: string;
    externalUrl?: string;
  };
  index: number;
  onImageClick: (url: string, alt: string, type: 'desktop' | 'mobile') => void;
}

/**
 * Composant ProjectCard mémorisé pour éviter les re-renders inutiles
 */
export const ProjectCard = React.memo(function ProjectCard({
  project,
  index,
  onImageClick,
}: ProjectCardProps) {
  const router = useRouter();
  const { t } = useLanguage();
  
  const allImages = React.useMemo(() => [
    ...project.images.desktop.map(url => ({ url, type: 'desktop' as const })),
    ...project.images.mobile.map(url => ({ url, type: 'mobile' as const }))
  ], [project.images]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.15) }}
    >
      <TiltCard className="h-full" maxTilt={8} glareEnable={true}>
        <div
          className={`
            h-full rounded-2xl overflow-hidden
            bg-gradient-to-br from-black/40 via-black/20 to-transparent
            backdrop-blur-xl border border-white/10 hover:border-white/15
            hover:shadow-xl transition-all duration-500
            group
          `}
          role="link"
          tabIndex={0}
          aria-label={`${t.projects.viewProject} — ${project.name}`}
          onClick={() => router.push(`/projects/${project.id}`)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              router.push(`/projects/${project.id}`);
            }
          }}
        >
          {/* Preview: logo sur fond noir */}
          <div className="relative h-48 overflow-hidden bg-black">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-black/85 to-black/70" />
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.12),transparent_55%)]" />
            <OptimizedImage
              src={project.logo}
              alt={project.alt || project.name}
              fill
              className="object-contain p-10 opacity-95 drop-shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
              quality={90}
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
                  <OptimizedImage
                    src={project.logo}
                    alt={t.projects.logoAlt.replace('{name}', project.name)}
                    fill
                    className="object-contain"
                    sizes="40px"
                    quality={75}
                  />
                </div>
                <h3
                  className={`text-lg font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
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
                      onImageClick(
                        img.url,
                        `${project.name} — ${
                          img.type === 'mobile'
                            ? t.projects.lightboxMobile
                            : t.projects.lightboxDesktop
                        }`,
                        img.type,
                      );
                    }}
                    className={`relative overflow-hidden rounded-lg border border-white/12 hover:border-white/20 transition-all ${img.type === 'mobile' ? 'w-8 h-12' : 'w-16 h-10'
                      }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <OptimizedImage
                      src={img.url}
                      alt={t.projects.imagePreviewAlt.replace('{name}', project.name)}
                      fill
                      className="object-cover"
                      sizes="64px"
                      quality={70}
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
                <span>{t.projects.viewProject}</span>
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
                  aria-label={t.projects.externalSiteAria.replace('{name}', project.name)}
                  title={t.projects.externalLinkTitle}
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
});
