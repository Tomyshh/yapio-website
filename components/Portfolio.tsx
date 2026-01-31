'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import ModernBackground from './ModernBackground';
import AnimatedSection from './AnimatedSection';
import MagneticButton from './MagneticButton';
import { getLocalizedProjects } from '@/lib/projects';

export default function Portfolio() {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [scrollTargetReady, setScrollTargetReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useInView(sectionRef, { once: false, amount: 0.3 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // N'attacher la ref à useScroll qu'après hydratation (évite "Target ref is defined but not hydrated")
  useLayoutEffect(() => {
    if (!isMounted) return;
    const id = requestAnimationFrame(() => {
      setScrollTargetReady(!!sectionRef.current);
    });
    return () => cancelAnimationFrame(id);
  }, [isMounted]);

  const { scrollYProgress } = useScroll({
    target: scrollTargetReady ? sectionRef : undefined,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Liste des projets (source unique: lib/projects.ts)
  const projects = getLocalizedProjects(t);

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden min-h-screen"
    >
      {/* Arrière-plan avec effet parallax */}
      <motion.div 
        className="absolute -inset-[30%]"
        style={{ y: backgroundY }}
      >
        <ModernBackground />
      </motion.div>

      {/* Particules décoratives (retirées pour un rendu plus pro) */}
      
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

        {/* Grille de projets (plus simple / épurée) */}
        <AnimatedSection animation="fadeUp" delay={0.1} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.2) }}
              >
                <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/15 transition-colors duration-300">
                  {/* Preview logo sur fond noir */}
                  <div className="relative h-44 bg-black overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-black/85 to-black/70" />
                    <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.12),transparent_55%)]" />
                    <Image
                      src={project.logo}
                      alt={project.alt}
                      fill
                      className="object-contain p-10 opacity-95 drop-shadow-2xl"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={idx < 3}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-5 flex items-stretch gap-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/12 hover:border-white/18 text-white font-semibold text-sm transition-all duration-300"
                      >
                        <span>{t.clients?.viewMore || 'Voir le projet'}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>

                      {project.externalUrl ? (
                        <a
                          href={project.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/12 hover:border-white/18 text-white/90 hover:text-white flex items-center justify-center transition-all duration-300"
                          aria-label={`Ouvrir ${project.name} (lien externe)`}
                          title="Ouvrir le lien externe"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <div
                          aria-disabled="true"
                          className="w-11 rounded-xl bg-white/5 border border-white/10 text-gray-500 flex items-center justify-center opacity-60 cursor-not-allowed select-none"
                          title="Lien externe indisponible"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <MagneticButton
              as="a"
              href="/projects"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary hover:bg-primary-600 text-white font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 border border-primary/30"
              strength={0.15}
            >
              <span>Voir tous les projets</span>
              <ArrowUpRight className="w-5 h-5" />
            </MagneticButton>
          </div>
        </AnimatedSection>
      </motion.div>
    </section>
  );
}
