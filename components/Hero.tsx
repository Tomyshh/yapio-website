'use client';

import React from 'react';
import { ArrowRight, ChevronDown, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlowLogo } from './Logo';
import GlowyWavesHeroBackground from '@/components/ui/glowy-waves-hero-background';
import MagneticButton from './MagneticButton';
import { YAPIO_PHONE_DISPLAY, YAPIO_PHONE_E164 } from '@/lib/contact';

/**
 * Hero sans parallax ni useScroll : même rendu qu’avant (fond animé + contenu),
 * mais sans translation du fond au scroll (meilleures perfs Windows / scroll natif).
 */
export default function Hero() {
  const { t, dir } = useLanguage();
  const isRtl = dir === 'rtl';

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      <div className="absolute -inset-[30%]">
        <GlowyWavesHeroBackground />
      </div>

      <div className="max-w-7xl mx-auto section-padding relative z-10 pt-[max(7rem,calc(env(safe-area-inset-top,0px)+5.5rem))] md:pt-32 pb-24 max-md:pb-32 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center">
          <div
            className={`lg:col-span-7 max-md:max-w-[min(100%,24rem)] max-md:mx-auto md:max-w-none md:mx-0 md:text-start ${
              isRtl ? 'max-md:text-center' : 'max-md:text-start'
            }`}
          >
            {/* Desktop seulement : logo hero (mobile = doublon visuel + PNG lourd) */}
            <div className="hidden md:flex items-center gap-4">
              <GlowLogo
                variant="full"
                size="lg"
                theme="white"
                className="opacity-95"
              />
              <span className="text-xs tracking-[0.2em] uppercase text-gray-500">
                {t.hero.studio}
              </span>
            </div>

            <div className="mt-6 md:mt-8">
              <div className={`eyebrow w-fit ${isRtl ? 'max-md:mx-auto' : ''}`}>
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <span>{t.hero.eyebrow}</span>
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-[1.65rem] sm:text-3xl md:text-6xl lg:text-7xl font-overcame-bold leading-[1.08] sm:leading-[1.05] text-white text-balance">
                <span className="block">{t.hero?.title || 'Services Numériques sur Mesure'}</span>
              </h1>
              <div className="mt-6 h-px hairline" />
            </div>

            <div className="mt-6">
              <p className="text-base sm:text-lg md:text-2xl text-gray-300 leading-relaxed text-pretty">
                {t.hero?.subtitle || 'Applications • IA • Logiciels'}
              </p>
              <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed text-pretty">
                {t.hero?.description || 'Nous transformons vos idées en solutions digitales performantes.'}
              </p>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-4 max-md:items-stretch">
              <MagneticButton
                as="a"
                href="#contact"
                className="bg-primary hover:bg-primary-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base md:text-lg font-semibold shadow-lg shadow-primary/25 w-full md:w-auto inline-flex items-center justify-center gap-3 group border border-primary/30 min-h-[48px]"
                strength={0.22}
              >
                <span>{t.hero?.cta || 'Démarrer votre projet'}</span>
                <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
              </MagneticButton>

              <div className="grid grid-cols-2 md:contents gap-3 md:gap-0 w-full md:w-auto">
                <MagneticButton
                  as="a"
                  href="#services"
                  className="glass text-white px-4 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-white/10 flex items-center justify-center border border-white/10 min-h-[48px] w-full"
                  strength={0.22}
                >
                  <span className="text-center leading-tight">{t.hero.secondaryCta}</span>
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href={`tel:${YAPIO_PHONE_E164}`}
                  className="glass text-white px-4 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-white/10 flex items-center justify-center border border-white/10 min-h-[48px] w-full"
                  strength={0.22}
                  aria-label={`Appeler ${YAPIO_PHONE_DISPLAY}`}
                >
                  <span>{t.hero.callCta || 'Appeler'}</span>
                </MagneticButton>
              </div>
            </div>

            <div
              className={`mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400 ${
                isRtl ? 'max-md:justify-center' : ''
              }`}
            >
              <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/30" /> {t.hero.pills.deadlines}</span>
              <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/30" /> {t.hero.pills.maintainable}</span>
              <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/30" /> {t.hero.pills.support}</span>
            </div>
          </div>

          <div className="lg:col-span-5 max-lg:mt-4">
            <div
              className={`glass rounded-3xl p-6 sm:p-7 md:p-8 border border-white/10 relative overflow-hidden max-md:max-w-[min(100%,24rem)] md:mx-0 ${
                isRtl ? 'max-md:mx-auto' : 'max-md:mx-0'
              }`}
            >
              <div className="absolute inset-0 pointer-events-none hidden md:block">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl" />
              </div>
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{t.hero.offer.kicker}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{t.hero.offer.title}</h3>
                <p className="mt-3 text-gray-400 leading-relaxed">
                  {t.hero.offer.description}
                </p>

                <div className="mt-6 space-y-3">
                  {t.hero.offer.items.map((txt) => (
                    <div key={txt} className="flex items-start gap-3">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-gray-300">{txt}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {t.hero.metrics.map((s) => (
                    <div key={s.v} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-xl font-semibold text-white">{s.k}</div>
                      <div className="text-xs text-gray-400 mt-1">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none" />

      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
        <a
          href="#services"
          className="pointer-events-auto bg-black/55 rounded-full p-3 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-colors duration-200"
          aria-label={t.hero.secondaryCta}
        >
          <ChevronDown size={22} className="text-gray-300" />
        </a>
      </div>
    </section>
  );
}
