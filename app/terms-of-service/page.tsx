'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function TermsOfServicePage() {
  const { t } = useLanguage();
  const currentDate = new Date().toLocaleDateString('fr-FR');

  return (
    <div className="min-h-screen bg-dark-200">
      <Navigation />
      
      <main className="pt-20">
        <div className="max-w-4xl mx-auto section-padding py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              {t.termsOfService.title}
            </h1>
            <p className="text-gray-400 text-lg">
              {t.termsOfService.lastUpdated}: {currentDate}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.termsOfService.sections.acceptance.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t.termsOfService.sections.acceptance.content}
              </p>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.termsOfService.sections.services.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t.termsOfService.sections.services.content}
              </p>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.termsOfService.sections.intellectualProperty.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t.termsOfService.sections.intellectualProperty.content}
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {t.termsOfService.sections.intellectualProperty.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.termsOfService.sections.userResponsibilities.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t.termsOfService.sections.userResponsibilities.content}
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {t.termsOfService.sections.userResponsibilities.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.termsOfService.sections.projectTerms.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t.termsOfService.sections.projectTerms.content}
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {t.termsOfService.sections.projectTerms.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.termsOfService.sections.liability.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t.termsOfService.sections.liability.content}
              </p>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.termsOfService.sections.privacy.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t.termsOfService.sections.privacy.content}
              </p>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.termsOfService.sections.modifications.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t.termsOfService.sections.modifications.content}
              </p>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.termsOfService.sections.termination.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t.termsOfService.sections.termination.content}
              </p>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.termsOfService.sections.governing.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t.termsOfService.sections.governing.content}
              </p>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.termsOfService.sections.contact.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t.termsOfService.sections.contact.content}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
