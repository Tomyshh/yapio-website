'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('fr-FR'));
  }, []);

  return (
    <div className="min-h-screen bg-dark-200">
      <Navigation />
      
      <main className="pt-20">
        <div className="max-w-4xl mx-auto section-padding py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 font-overcame-bold">
              {t.privacyPolicy.title}
            </h1>
            <p className="text-gray-400 text-lg">
              {t.privacyPolicy.lastUpdated}: {currentDate || new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.privacyPolicy.sections.introduction.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t.privacyPolicy.sections.introduction.content}
              </p>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.privacyPolicy.sections.dataCollection.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t.privacyPolicy.sections.dataCollection.content}
              </p>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.privacyPolicy.sections.dataCollection.types.title}
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {t.privacyPolicy.sections.dataCollection.types.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.privacyPolicy.sections.dataUsage.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t.privacyPolicy.sections.dataUsage.content}
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {t.privacyPolicy.sections.dataUsage.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.privacyPolicy.sections.dataProtection.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t.privacyPolicy.sections.dataProtection.content}
              </p>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.privacyPolicy.sections.dataSharing.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t.privacyPolicy.sections.dataSharing.content}
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {t.privacyPolicy.sections.dataSharing.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.privacyPolicy.sections.cookies.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t.privacyPolicy.sections.cookies.content}
              </p>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 mb-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.privacyPolicy.sections.rights.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t.privacyPolicy.sections.rights.content}
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {t.privacyPolicy.sections.rights.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-100 rounded-xl p-8 border border-dark-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t.privacyPolicy.sections.contact.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t.privacyPolicy.sections.contact.content}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
