'use client';

import React, { useRef, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import ModernBackground from './ModernBackground';
import AnimatedSection from './AnimatedSection';
import MagneticButton from './MagneticButton';
import { getLocalizedProjects } from '@/lib/projects';
import ParallaxBackground from './ParallaxBackground';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';
import { OptimizedImage } from './OptimizedImage';

export default function Portfolio() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const performanceMode = usePerformanceMode();
  useInView(sectionRef, { once: false, amount: 0.3 });

  const projects = useMemo(() => {
    const list = getLocalizedProjects(t);
    return [...list]
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      .slice(0, 5);
  }, [t]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden min-h-screen cv-auto"
    >
      {performanceMode ? (
        <div className="absolute -inset-[30%]">
          <ModernBackground />
        </div>
      ) : (
        <ParallaxBackground targetRef={sectionRef} className="absolute -inset-[30%]" yRange={['0%', '30%']}>
          <ModernBackground />
        </ParallaxBackground>
      )}

      <div className="max-w-7xl mx-auto section-padding relative z-10">
        <AnimatedSection animation="fadeUp" className="text-center mb-12 lg:mb-16">
          {t.clients?.trustSection?.title && (
            <p className="text-sm font-medium text-primary mb-6">{t.clients.trustSection.title}</p>
          )}

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            {t.clients?.title || 'Nos Projets'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {t.clients?.subtitle}
          </p>
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed text-pretty">
            {t.clients?.homeSummary}
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.08} className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 md:gap-5 py-4">
            {projects.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.28) }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                  aria-label={`${t.projects?.viewProject || 'Voir le projet'} — ${project.name}`}
                >
                  <div
                    className="relative w-[4.5rem] h-[4.5rem] md:w-[5.25rem] md:h-[5.25rem] rounded-full overflow-hidden
                      bg-gradient-to-br from-white/[0.12] to-white/[0.03] border border-white/15
                      shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm
                      transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_12px_40px_rgba(138,92,246,0.2)] group-hover:scale-[1.05]"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.2),transparent_55%)] opacity-80 pointer-events-none" />
                    <OptimizedImage
                      src={project.logo}
                      alt=""
                      fill
                      className="object-contain p-3 md:p-3.5 opacity-[0.98] drop-shadow-lg transition-opacity duration-300 group-hover:opacity-100"
                      sizes="(max-width: 768px) 4.5rem, 5.25rem"
                      priority
                      quality={90}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <MagneticButton
              as="a"
              href="/projects"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary hover:bg-primary-600 text-white font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 border border-primary/30"
              strength={0.15}
            >
              <span>{t.clients?.viewOtherProjects || 'Voir d\'autres projets'}</span>
              <ArrowUpRight className="w-5 h-5" />
            </MagneticButton>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
