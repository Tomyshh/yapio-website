'use client';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Configuration Firebase depuis les variables d'environnement
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Singleton pour l'application Firebase
let app: FirebaseApp | undefined;
let analytics: Analytics | null = null;

/**
 * Initialise Firebase App (singleton pattern)
 * @returns L'instance Firebase App ou undefined si la configuration est incomplète
 */
export const getFirebaseApp = (): FirebaseApp | undefined => {
  // Vérifier si Firebase est déjà initialisé
  if (app) {
    return app;
  }

  // Vérifier si la configuration est complète
  if (
    !firebaseConfig.apiKey ||
    !firebaseConfig.authDomain ||
    !firebaseConfig.projectId
  ) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Firebase] Configuration incomplète. Firebase Analytics ne sera pas initialisé.');
    }
    return undefined;
  }

  // Vérifier si une app existe déjà (évite les doubles initialisations)
  const existingApps = getApps();
  if (existingApps.length > 0) {
    app = existingApps[0];
    return app;
  }

  // Initialiser Firebase
  try {
    app = initializeApp(firebaseConfig);
    return app;
  } catch (error) {
    console.error('[Firebase] Erreur lors de l\'initialisation:', error);
    return undefined;
  }
};

/**
 * Initialise Firebase Analytics (uniquement côté client)
 * @returns L'instance Analytics ou null si non supporté/indisponible
 */
export const getFirebaseAnalytics = async (): Promise<Analytics | null> => {
  // Ne fonctionne que côté client
  if (typeof window === 'undefined') {
    return null;
  }

  // Si déjà initialisé, retourner l'instance existante
  if (analytics) {
    return analytics;
  }

  // Vérifier si Analytics est supporté par le navigateur
  const supported = await isSupported();
  if (!supported) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Firebase Analytics] Non supporté par ce navigateur.');
    }
    return null;
  }

  // Initialiser l'app Firebase si nécessaire
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) {
    return null;
  }

  // Initialiser Analytics
  try {
    analytics = getAnalytics(firebaseApp);
    return analytics;
  } catch (error) {
    console.error('[Firebase Analytics] Erreur lors de l\'initialisation:', error);
    return null;
  }
};

/**
 * Vérifie si Firebase est configuré et prêt
 */
export const isFirebaseConfigured = (): boolean => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId
  );
};

/**
 * Log un événement personnalisé dans Firebase Analytics
 */
export const logEvent = async (
  eventName: string,
  eventParams?: Record<string, unknown>
): Promise<void> => {
  if (typeof window === 'undefined') return;

  try {
    const analyticsInstance = await getFirebaseAnalytics();
    if (!analyticsInstance) return;

    // Utiliser le SDK Firebase Analytics
    const { logEvent: firebaseLogEvent } = await import('firebase/analytics');
    firebaseLogEvent(analyticsInstance, eventName, eventParams);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Firebase Analytics] Erreur lors du log d\'événement:', error);
    }
  }
};

/**
 * Définit les propriétés utilisateur personnalisées
 */
export const setUserProperties = async (
  properties: Record<string, string>
): Promise<void> => {
  if (typeof window === 'undefined') return;

  try {
    const analyticsInstance = await getFirebaseAnalytics();
    if (!analyticsInstance) return;

    const { setUserProperties: firebaseSetUserProperties } = await import('firebase/analytics');
    firebaseSetUserProperties(analyticsInstance, properties);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Firebase Analytics] Erreur lors de la définition des propriétés utilisateur:', error);
    }
  }
};

/**
 * Définit l'ID utilisateur
 */
export const setUserId = async (userId: string | null): Promise<void> => {
  if (typeof window === 'undefined') return;

  try {
    const analyticsInstance = await getFirebaseAnalytics();
    if (!analyticsInstance) return;

    const { setUserId: firebaseSetUserId } = await import('firebase/analytics');
    firebaseSetUserId(analyticsInstance, userId);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Firebase Analytics] Erreur lors de la définition de l\'ID utilisateur:', error);
    }
  }
};
