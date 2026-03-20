'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getServiceKeyFromSlug, SERVICE_SLUGS, type ServiceSlug } from '@/lib/services';
import { SERVICE_PAGE_IMAGES } from '@/lib/service-page-media';
import {
  getServicePageDetail,
  type ServiceContentKey,
} from '@/lib/service-pages-content';

export default function ServiceDetail() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : null;
  const { t, language, isLoading } = useLanguage();

  const serviceKey = slug ? getServiceKeyFromSlug(slug) : null;
  const isValidSlug = Boolean(slug && SERVICE_SLUGS.includes(slug as ServiceSlug));

  useEffect(() => {
    if (!slug || !isValidSlug) return;
    window.scrollTo(0, 0);
  }, [slug, isValidSlug]);

  if (!slug || !serviceKey || !isValidSlug) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <p className="text-gray-400 mb-6">{t.servicePage.notFound}</p>
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.servicePage.backToServices}
        </Link>
      </main>
    );
  }

  if (isLoading || !t?.services) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-gray-500">{t.servicePage.loading}</div>
      </main>
    );
  }

  const servicesRecord = t.services as unknown as Record<
    string,
    { title: string; description: string; intro?: string; points?: string[] }
  >;
  const service = servicesRecord[serviceKey];
  if (!service) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <p className="text-gray-400 mb-6">{t.servicePage.notFound}</p>
        <Link href="/#services" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" />
          {t.servicePage.backToServices}
        </Link>
      </main>
    );
  }

  const { labels, page } = getServicePageDetail(language, serviceKey as ServiceContentKey);
  const media = SERVICE_PAGE_IMAGES[slug as ServiceSlug];
  const hasWildcardMetric = page.metrics.some((m) => m.value.includes('*') || m.value.includes('−'));

  return (
    <main className="min-h-screen bg-dark">
      {/* Hero plein écran avec image */}
      <section className="relative min-h-[78vh] flex flex-col justify-end pb-16 md:pb-24 pt-28 md:pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={media.hero}
            alt={page.imageAltHero}
            fill
            className="object-cover object-center scale-105"
            sizes="100vw"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/85 to-dark/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-transparent to-dark/50" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.nav.services}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              {page.eyebrow}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight max-w-4xl mb-5">
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mb-6">
            {page.lead}
          </p>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl border-l-2 border-primary/50 pl-5">
            {page.narrative}
          </p>
        </div>
      </section>

      {/* Métriques — bandeau minimal, sans bloc gris (fusion avec le hero) */}
      <section
        className="relative z-20 -mt-10 md:-mt-14 px-4 pb-4 md:pb-6 bg-dark"
        aria-label={t.servicePage.metricsAria}
      >
        <div className="relative max-w-3xl mx-auto pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-5 sm:gap-0 sm:py-3 border-t border-white/[0.07]">
            {page.metrics.map((m, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div
                    className="hidden sm:block w-px h-9 self-center bg-gradient-to-b from-transparent via-white/15 to-transparent shrink-0"
                    aria-hidden
                  />
                )}
                <div className="flex-1 text-center px-4 sm:px-8 min-w-0">
                  <p className="text-2xl md:text-3xl font-extralight text-white tracking-tight tabular-nums">
                    {m.value}
                  </p>
                  <p className="text-[10px] md:text-[11px] text-gray-500 uppercase tracking-[0.18em] mt-1 leading-snug">
                    {m.label}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
          {hasWildcardMetric && (
            <p className="text-[10px] md:text-xs text-gray-600 mt-3 text-center max-w-xl mx-auto leading-relaxed">
              {labels.metricDisclaimer}
            </p>
          )}
        </div>
      </section>

      {/* Livrables (texte à gauche) + image à droite */}
      <section className="py-16 md:py-28 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              {labels.deliverablesEyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
              {page.deliverablesTitle}
            </h2>
            <ul className="space-y-4">
              {page.deliverables.map((item, i) => (
                <li key={i} className="flex gap-4 text-gray-300 leading-relaxed">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2 relative aspect-[4/5] lg:aspect-auto lg:min-h-[520px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/5">
            <Image
              src={media.panel}
              alt={page.imageAltPanel}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Méthode — timeline */}
      <section className="py-16 md:py-28 px-4 bg-gradient-to-b from-dark-200/30 to-transparent">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">
            {labels.processEyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-14 text-center">
            {page.processTitle}
          </h2>
          <div className="relative mt-8">
            <div className="absolute start-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent hidden sm:block" />
            <ol className="space-y-10 sm:space-y-12">
              {page.steps.map((step, i) => (
                <li key={i} className="relative sm:ps-14">
                  <span className="hidden sm:flex absolute start-0 top-1 w-8 h-8 rounded-full bg-primary/20 border border-primary/40 items-center justify-center text-sm font-semibold text-primary">
                    {i + 1}
                  </span>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-sm">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Expertise + image accent */}
      <section className="py-16 md:py-28 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              {labels.deepDiveEyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">{page.deepDiveTitle}</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{page.deepDive}</p>
            {service.points && service.points.length > 0 && (
              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {service.points.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {media.accent && (
            <div className="lg:col-span-2 order-1 lg:order-2 relative aspect-square max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden border border-white/10">
              <Image
                src={media.accent}
                alt={page.imageAltAccent}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 40vw"
                unoptimized
              />
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">
            {labels.faqEyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-10 text-center">{page.faqTitle}</h2>
          <div className="space-y-3">
            {page.faq.map((item, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
              >
                <summary className="cursor-pointer list-none px-5 py-4 md:px-6 md:py-5 flex items-center justify-between gap-4 text-white font-medium hover:bg-white/[0.04] transition-colors">
                  <span>{item.q}</span>
                  <span className="text-primary text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                  <p className="pt-4">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-dark to-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(119,55,233,0.15),transparent_55%)]" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">{labels.ctaHeadline}</h2>
          <p className="text-gray-300 mb-10 leading-relaxed">{labels.ctaSub}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-white text-dark font-semibold hover:bg-gray-100 transition-colors shadow-lg shadow-black/30"
          >
            {t.nav.getQuote}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
