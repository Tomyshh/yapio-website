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
  // Utiliser français par défaut pour éviter l'hydratation mismatch
  const [language, setLanguage] = useState<Language>('fr');
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Hydratation côté client
  useEffect(() => {
    setIsClient(true);
    
    // Récupérer la vraie langue côté client
    const clientLanguage = getInitialLanguage();
    
    // Toujours faire une transition, même si c'est la même langue
    // Cela évite les problèmes d'hydratation
    setTimeout(() => {
      setLanguage(clientLanguage);
      setIsLoading(false);
      
      // Configuration de la direction après le changement de langue
      if (typeof document !== 'undefined') {
        document.documentElement.dir = clientLanguage === 'he' ? 'rtl' : 'ltr';
        document.documentElement.style.transition = 'all 0.3s ease-in-out';
      }
    }, 100); // Délai légèrement plus long pour assurer une hydratation propre
  }, []);

  const handleSetLanguage = (lang: Language) => {
    // Transition simplifiée et plus rapide
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    }
  };

  // Mise à jour de la direction quand la langue change
  useEffect(() => {
    if (isClient && typeof document !== 'undefined') {
      document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    }
  }, [language, isClient]);

  // Mémorisation des valeurs pour éviter les re-renders inutiles
  // Utiliser toujours les traductions françaises côté serveur pour éviter l'hydratation mismatch
  const value: LanguageContextType = useMemo(() => ({
    language,
    setLanguage: handleSetLanguage,
    t: isClient ? translations[language] : translations['fr'],
    dir: language === 'he' ? 'rtl' as const : 'ltr' as const,
    isLoading,
  }), [language, isLoading, isClient]);

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
