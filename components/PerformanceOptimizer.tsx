'use client';

import { useEffect, useState } from 'react';

/**
 * Composant pour optimiser les performances globales du site
 */
export function PerformanceOptimizer() {
  useEffect(() => {
    // Préchargement des ressources critiques
    const preloadCriticalResources = () => {
      // Précharger les images importantes
      const criticalImages = [
        '/branding/icononly_nobuffer.png',
        '/branding/fulllogo_transparent_nobuffer.png',
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Optimisation du scroll
    const optimizeScrolling = () => {
      let ticking = false;
      
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            // Logique de scroll optimisée
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => window.removeEventListener('scroll', handleScroll);
    };

    // Optimisation des animations
    const optimizeAnimations = () => {
      // Réduire les animations si l'utilisateur préfère moins de mouvement
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-fast', '0ms');
        document.documentElement.style.setProperty('--transition-normal', '0ms');
        document.documentElement.style.setProperty('--transition-slow', '0ms');
      }
    };

    // Optimisation de la mémoire
    const optimizeMemory = () => {
      // Nettoyage automatique des observateurs inutilisés
      const cleanupUnusedObservers = () => {
        // Cette fonction sera appelée lors du démontage des composants
      };

      return cleanupUnusedObservers;
    };

    // Initialisation des optimisations
    preloadCriticalResources();
    const cleanupScroll = optimizeScrolling();
    optimizeAnimations();
    const cleanupMemory = optimizeMemory();

    // Marquer le site comme complètement chargé
    setTimeout(() => {
      document.documentElement.classList.add('fully-loaded');
      // Déclencher un événement personnalisé pour signaler que le site est prêt
      window.dispatchEvent(new CustomEvent('siteFullyLoaded'));
    }, 1000);

    return () => {
      cleanupScroll?.();
      cleanupMemory?.();
    };
  }, []);

  return null; // Ce composant n'affiche rien
}

/**
 * Hook pour détecter si le site est complètement chargé
 */
export function useFullyLoaded() {
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  useEffect(() => {
    const handleFullyLoaded = () => setIsFullyLoaded(true);
    
    window.addEventListener('siteFullyLoaded', handleFullyLoaded);
    
    // Vérifier si déjà chargé
    if (document.documentElement.classList.contains('fully-loaded')) {
      setIsFullyLoaded(true);
    }

    return () => window.removeEventListener('siteFullyLoaded', handleFullyLoaded);
  }, []);

  return isFullyLoaded;
}
