'use client';

import { useEffect } from 'react';
import { getFirebaseAnalytics, isFirebaseConfigured } from '@/lib/firebase';

/**
 * Composant pour initialiser Firebase Analytics
 * Suit les best practices Next.js :
 * - Initialisation uniquement côté client
 * - Chargement asynchrone pour ne pas bloquer le rendu
 * - Gestion d'erreur silencieuse en production
 */
export default function FirebaseAnalytics() {
  useEffect(() => {
    // Vérifier que Firebase est configuré
    if (!isFirebaseConfigured()) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Firebase Analytics] Configuration Firebase manquante. Vérifiez vos variables d\'environnement.');
      }
      return;
    }

    // Initialiser Firebase Analytics de manière asynchrone
    const initAnalytics = async () => {
      try {
        await getFirebaseAnalytics();
        if (process.env.NODE_ENV === 'development') {
          console.log('[Firebase Analytics] Initialisé avec succès');
        }
      } catch (error) {
        // Erreur silencieuse en production, log en développement
        if (process.env.NODE_ENV === 'development') {
          console.error('[Firebase Analytics] Erreur lors de l\'initialisation:', error);
        }
      }
    };

    // Attendre que le DOM soit prêt
    if (document.readyState === 'complete') {
      initAnalytics();
    } else {
      window.addEventListener('load', initAnalytics);
      return () => {
        window.removeEventListener('load', initAnalytics);
      };
    }
  }, []);

  // Ce composant ne rend rien
  return null;
}
