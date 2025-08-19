'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Language, translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.fr;
  dir: 'ltr' | 'rtl';
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Fonction pour détecter la langue initiale côté serveur/client
function getInitialLanguage(): Language {
  // Côté serveur, on utilise français par défaut
  if (typeof window === 'undefined') {
    return 'fr';
  }
  
  // Côté client, on récupère depuis localStorage ou navigateur
  try {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['fr', 'en', 'he'].includes(savedLang)) {
      return savedLang;
    }
    
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'he') return 'he';
    if (browserLang === 'en') return 'en';
    return 'fr';
  } catch {
    return 'fr';
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Hydratation côté client
  useEffect(() => {
    setIsClient(true);
    
    // Récupérer la vraie langue côté client
    const clientLanguage = getInitialLanguage();
    
    // Si la langue côté client est différente, on fait une transition fluide
    if (clientLanguage !== language) {
      // Petite transition pour éviter le flash
      setTimeout(() => {
        setLanguage(clientLanguage);
        setIsLoading(false);
      }, 50);
    } else {
      setIsLoading(false);
    }

    // Configuration initiale de la direction
    document.documentElement.dir = clientLanguage === 'he' ? 'rtl' : 'ltr';
    document.documentElement.style.transition = 'all 0.3s ease-in-out';
  }, []);

  const handleSetLanguage = (lang: Language) => {
    // Transition fluide avec flou pour le changement de langue
    document.documentElement.style.filter = 'blur(2px)';
    document.documentElement.style.opacity = '0.9';
    document.documentElement.style.transform = 'scale(0.99)';
    
    setTimeout(() => {
      setLanguage(lang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
        document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
      }
      
      // Restaurer progressivement l'état normal
      setTimeout(() => {
        document.documentElement.style.filter = 'blur(0px)';
        document.documentElement.style.opacity = '1';
        document.documentElement.style.transform = 'scale(1)';
      }, 200);
    }, 150);
  };

  // Mise à jour de la direction quand la langue change
  useEffect(() => {
    if (isClient && typeof document !== 'undefined') {
      document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    }
  }, [language, isClient]);

  // Mémorisation des valeurs pour éviter les re-renders inutiles
  const value: LanguageContextType = useMemo(() => ({
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
    dir: language === 'he' ? 'rtl' as const : 'ltr' as const,
    isLoading,
  }), [language, isLoading]);

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
