'use client';

import React, { useMemo } from 'react';
import {
  Brain,
  Cpu,
  MessageSquareText,
  Database,
  Briefcase,
  Scale,
  Workflow,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import MagneticButton from './MagneticButton';

const ROLE_ICONS = [
  Brain,
  Cpu,
  MessageSquareText,
  Database,
  Briefcase,
  Scale,
  Workflow,
] as const;

export default function Expertise() {
  const { t, isLoading } = useLanguage();

  const roles = t?.expertise?.roles;

  const roleRows = useMemo(() => {
    if (!roles?.length) return [[], []] as [typeof roles, typeof roles];
    return [roles.slice(0, 4), roles.slice(4, 7)] as const;
  }, [roles]);

  if (isLoading || !t?.expertise || !roles?.length) {
    return (
      <section id="expertise" className="py-20 relative overflow-hidden cv-auto">
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded w-64 mx-auto mb-4" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const [rowA, rowB] = roleRows;

  return (
    <section id="expertise" className="py-24 lg:py-32 relative overflow-hidden cv-auto">
      <div className="max-w-7xl mx-auto section-padding relative z-10">
        {/* Header — même style que « À propos » */}
        <AnimatedSection animation="fadeUp" className="text-center mb-12 lg:mb-14">
          {t.expertise.badge && (
            <p className="text-sm font-medium text-primary mb-6">{t.expertise.badge}</p>
          )}

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            {t.expertise.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.expertise.subtitle}
          </p>
        </AnimatedSection>

        {/* Schéma épuré — grille dense, pas de grand vide */}
        <AnimatedSection animation="fadeUp" className="mb-14 lg:mb-16">
          <motion.div
            className="relative rounded-2xl border border-white/[0.08] bg-[rgba(255,255,255,0.02)] p-5 md:p-8 lg:p-10 overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
          >
            {/* Fond discret */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35] bg-grid"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 left-0 h-48 w-48 rounded-full bg-primary/5 blur-3xl"
              aria-hidden
            />

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 md:mb-8">
                <div>
                  <h3 className="text-lg md:text-xl font-light text-white tracking-tight">
                    {t.expertise.schemaTitle}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed">
                    {t.expertise.schemaSubtitle}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary/80">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Yapio</span>
                </div>
              </div>

              {/* Ligne de flux décorative (discrète) */}
              <div
                className="mb-6 md:mb-8 h-px w-full bg-gradient-to-r from-transparent via-primary/25 to-transparent"
                aria-hidden
              />

              {/* Rangée 1 : 4 rôles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
                {rowA.map((role, i) => {
                  const Icon = ROLE_ICONS[i];
                  return (
                    <motion.article
                      key={`a-${role.title}`}
                      className="group rounded-xl border border-white/[0.08] bg-black/20 p-4 md:p-5 transition-colors hover:border-primary/30 hover:bg-white/[0.03]"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: 0.05 * i, duration: 0.35 }}
                    >
                      <div className="flex gap-3 md:gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 text-primary">
                          <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm md:text-[15px] font-medium text-white leading-snug">
                            {role.title}
                          </h4>
                          <p className="mt-1.5 text-xs md:text-sm text-gray-400 leading-relaxed">
                            {role.tagline}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              {/* Connecteur visuel entre les deux blocs */}
              <div className="flex justify-center my-5 md:my-6" aria-hidden>
                <div className="flex flex-col items-center gap-1">
                  <div className="h-6 w-px bg-gradient-to-b from-primary/40 to-primary/10" />
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                  <div className="h-6 w-px bg-gradient-to-b from-primary/10 to-primary/40" />
                </div>
              </div>

              {/* Rangée 2 : 3 rôles centrés */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
                {rowB.map((role, j) => {
                  const Icon = ROLE_ICONS[4 + j];
                  return (
                    <motion.article
                      key={`b-${role.title}`}
                      className="group rounded-xl border border-white/[0.08] bg-black/20 p-4 md:p-5 transition-colors hover:border-primary/30 hover:bg-white/[0.03]"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: 0.05 * j, duration: 0.35 }}
                    >
                      <div className="flex gap-3 md:gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 text-primary">
                          <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm md:text-[15px] font-medium text-white leading-snug">
                            {role.title}
                          </h4>
                          <p className="mt-1.5 text-xs md:text-sm text-gray-400 leading-relaxed">
                            {role.tagline}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection animation="fadeUp" className="text-center">
          <motion.div
            className="glass rounded-2xl p-8 lg:p-12 border border-white/10 relative overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-50" />

            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-light text-white mb-4">
                {t.expertise.cta.title}
              </h3>
              <p className="text-gray-400 mb-8 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                {t.expertise.cta.description}
              </p>
              <MagneticButton
                as="a"
                href="#contact"
                className="inline-flex items-center gradient-primary text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-primary/25 group"
                strength={0.2}
              >
                <span>{t.expertise.cta.button}</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
