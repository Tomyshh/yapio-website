'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.fr;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    // Récupérer la langue sauvegardée ou utiliser la langue du navigateur
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['fr', 'en', 'he'].includes(savedLang)) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'he') setLanguage('he');
      else if (browserLang === 'en') setLanguage('en');
      else setLanguage('fr');
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
    dir: language === 'he' ? 'rtl' : 'ltr',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
