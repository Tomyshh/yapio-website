'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Feature } from '@/components/ui/feature-shader-cards';

const FeatureShaderCards = dynamic(() => import('@/components/ui/feature-shader-cards'), {
  ssr: true,
});

export default function Services() {
  const { t, isLoading } = useLanguage();

  if (isLoading || !t?.services) {
    return (
      <section id="services" className="py-20 relative overflow-hidden cv-auto min-h-screen">
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded w-64 mx-auto mb-4" />
              <div className="h-6 bg-gray-700 rounded w-96 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const features: Feature[] = [
    {
      title: t.services.mobile.title,
      description: t.services.mobile.description,
      href: '/services/mobile',
      icon: (
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM7 4V3h10v1H7zM7 18V6h10v12H7z" />
        </svg>
      ),
    },
    {
      title: t.services.desktop.title,
      description: t.services.desktop.description,
      href: '/services/web-apps',
      icon: (
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
        </svg>
      ),
    },
    {
      title: t.services.web.title,
      description: t.services.web.description,
      href: '/services/ai-integration',
      icon: (
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      title: t.services.consulting.title,
      description: t.services.consulting.description,
      href: '/services/custom-software',
      icon: (
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
        </svg>
      ),
    },
    {
      title: t.services.website.title,
      description: t.services.website.description,
      href: '/services/website',
      icon: (
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
    },
    {
      title: t.services.automation.title,
      description: t.services.automation.description,
      href: '/services/process-automation',
      icon: (
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
    },
  ];

  return (
    <FeatureShaderCards
      id="services"
      sectionTitle={t.services.title}
      sectionSubtitle={t.services.subtitle}
      badge={t.services.badge}
      features={features}
      learnMoreLabel={t.services.learnMore}
    />
  );
}
