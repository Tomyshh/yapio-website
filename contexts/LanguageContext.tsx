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

function getLangFromUrlParam(): Language | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');
    if (lang === 'fr' || lang === 'en' || lang === 'he') return lang;
    return null;
  } catch {
    return null;
  }
}

function getSavedLanguage(): Language | null {
  if (typeof window === 'undefined') return null;
  try {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['fr', 'en', 'he'].includes(savedLang)) return savedLang;
    return null;
  } catch {
    return null;
  }
}

function detectLanguageFromClientSignals(): Language {
  // Timezone (bon proxy pour FR/IL sans IP)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === 'Asia/Jerusalem') return 'he';
    if (tz === 'Europe/Paris') return 'fr';
  } catch {
    // ignore
  }

  // Langue navigateur (fallback)
  try {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'he') return 'he';
    if (browserLang === 'fr') return 'fr';
  } catch {
    // ignore
  }

  return 'en';
}

async function detectCountryLanguageViaIp(): Promise<Language | null> {
  // Static export: on ne peut pas lire l'IP côté serveur. On fait un best-effort côté client.
  if (typeof window === 'undefined') return null;
  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 1200);

    const res = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    }).catch(() => null);

    window.clearTimeout(timeout);
    if (!res || !res.ok) return null;

    const data = (await res.json()) as { country_code?: string } | null;
    const cc = data?.country_code;
    if (cc === 'FR') return 'fr';
    if (cc === 'IL') return 'he';
    return 'en';
  } catch {
    return null;
  }
}

// Fonction pour détecter la langue initiale côté serveur/client
function getInitialLanguage(): Language {
  // Côté serveur, on utilise français par défaut
  if (typeof window === 'undefined') {
    return 'fr';
  }
  
  // Priorité 1: paramètre URL (?lang=fr|en|he)
  const urlLang = getLangFromUrlParam();
  if (urlLang) return urlLang;

  // Priorité 2: choix utilisateur sauvegardé
  const savedLang = getSavedLanguage();
  if (savedLang) return savedLang;

  // Sinon: détection (timezone + navigateur)
  return detectLanguageFromClientSignals();
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Utiliser français par défaut pour éviter l'hydratation mismatch
  const [language, setLanguage] = useState<Language>('fr');
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [hasUserChosenLanguage, setHasUserChosenLanguage] = useState(false);

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

  // Best-effort IP geoloc: uniquement si aucun choix utilisateur ni paramètre d'URL
  useEffect(() => {
    if (!isClient) return;
    if (hasUserChosenLanguage) return;
    if (getLangFromUrlParam()) return;
    if (getSavedLanguage()) return;

    // Ne pas relancer en boucle pendant une même session
    try {
      const key = 'geoLangResolved';
      if (sessionStorage.getItem(key) === '1') return;
      sessionStorage.setItem(key, '1');
    } catch {
      // ignore
    }

    void (async () => {
      const geoLang = await detectCountryLanguageViaIp();
      if (!geoLang) return;
      // Ne pas écraser si l'utilisateur a choisi entre-temps (ref vérifié au moment de l'apply)
      if (hasUserChosenLanguage) return;
      setLanguage(geoLang);
    })();
  }, [isClient, hasUserChosenLanguage]);

  const handleSetLanguage = (lang: Language) => {
    // Transition simplifiée et plus rapide
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    }
    setHasUserChosenLanguage(true);
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
