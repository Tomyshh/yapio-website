'use client';

// Interface pour les métriques SEO
interface SEOMetrics {
  pageTitle: string;
  metaDescription: string;
  h1Count: number;
  h2Count: number;
  imagesMissingAlt: number;
  internalLinks: number;
  externalLinks: number;
  wordCount: number;
  loadTime: number;
  coreWebVitals: {
    lcp?: number;
    fid?: number;
    cls?: number;
    fcp?: number;
    ttfb?: number;
  };
}

class SEOAnalytics {
  private metrics: SEOMetrics = {
    pageTitle: '',
    metaDescription: '',
    h1Count: 0,
    h2Count: 0,
    imagesMissingAlt: 0,
    internalLinks: 0,
    externalLinks: 0,
    wordCount: 0,
    loadTime: 0,
    coreWebVitals: {},
  };

  // Analyser la page courante
  analyzePage(): SEOMetrics {
    if (typeof window === 'undefined') {
      return this.metrics;
    }

    // Titre et meta description
    this.metrics.pageTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    this.metrics.metaDescription = metaDesc?.getAttribute('content') || '';

    // Comptage des headings
    this.metrics.h1Count = document.querySelectorAll('h1').length;
    this.metrics.h2Count = document.querySelectorAll('h2').length;

    // Images sans attribut alt
    const images = document.querySelectorAll('img');
    this.metrics.imagesMissingAlt = Array.from(images).filter(
      img => !img.hasAttribute('alt') || img.getAttribute('alt') === ''
    ).length;

    // Liens internes et externes
    const links = document.querySelectorAll('a[href]');
    let internalLinks = 0;
    let externalLinks = 0;

    links.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('/') || href.includes(window.location.hostname)) {
        internalLinks++;
      } else if (href.startsWith('http')) {
        externalLinks++;
      }
    });

    this.metrics.internalLinks = internalLinks;
    this.metrics.externalLinks = externalLinks;

    // Comptage des mots
    const textContent = document.body.textContent || '';
    this.metrics.wordCount = textContent.trim().split(/\s+/).filter(word => word.length > 0).length;

    // Temps de chargement
    if (performance.timing) {
      this.metrics.loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    }

    return this.metrics;
  }

  // Collecter les Core Web Vitals
  async collectWebVitals(): Promise<void> {
    try {
      const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');

      onCLS((metric) => {
        this.metrics.coreWebVitals.cls = metric.value;
        this.sendMetrics('CLS', metric.value);
      });

      onINP((metric) => {
        this.metrics.coreWebVitals.fid = metric.value;
        this.sendMetrics('INP', metric.value);
      });

      onFCP((metric) => {
        this.metrics.coreWebVitals.fcp = metric.value;
        this.sendMetrics('FCP', metric.value);
      });

      onLCP((metric) => {
        this.metrics.coreWebVitals.lcp = metric.value;
        this.sendMetrics('LCP', metric.value);
      });

      onTTFB((metric) => {
        this.metrics.coreWebVitals.ttfb = metric.value;
        this.sendMetrics('TTFB', metric.value);
      });
    } catch (error) {
      console.warn('Web Vitals not available:', error);
    }
  }

  // Envoyer les métriques (remplacez par votre service d'analytics)
  private sendMetrics(metricName: string, value: number): void {
    // Exemple d'envoi vers Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', metricName, {
        event_category: 'Web Vitals',
        value: Math.round(value),
        non_interaction: true,
      });
    }

    // Exemple d'envoi vers votre propre API
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     metric: metricName,
    //     value,
    //     url: window.location.href,
    //     timestamp: Date.now(),
    //   }),
    // }).catch(console.error);

    // Pour le développement, afficher dans la console
    console.log(`SEO Metric - ${metricName}:`, value);
  }

  // Générer un rapport SEO
  generateSEOReport(): {
    score: number;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Vérifier le titre
    if (!this.metrics.pageTitle) {
      issues.push('Titre de page manquant');
      score -= 20;
    } else if (this.metrics.pageTitle.length > 60) {
      issues.push('Titre de page trop long (> 60 caractères)');
      score -= 10;
      recommendations.push('Raccourcir le titre de page');
    }

    // Vérifier la meta description
    if (!this.metrics.metaDescription) {
      issues.push('Meta description manquante');
      score -= 15;
      recommendations.push('Ajouter une meta description');
    } else if (this.metrics.metaDescription.length > 160) {
      issues.push('Meta description trop longue (> 160 caractères)');
      score -= 5;
      recommendations.push('Raccourcir la meta description');
    }

    // Vérifier les H1
    if (this.metrics.h1Count === 0) {
      issues.push('Aucun H1 trouvé');
      score -= 15;
      recommendations.push('Ajouter un titre H1');
    } else if (this.metrics.h1Count > 1) {
      issues.push('Plusieurs H1 trouvés');
      score -= 10;
      recommendations.push('Utiliser un seul H1 par page');
    }

    // Vérifier les images
    if (this.metrics.imagesMissingAlt > 0) {
      issues.push(`${this.metrics.imagesMissingAlt} image(s) sans attribut alt`);
      score -= this.metrics.imagesMissingAlt * 2;
      recommendations.push('Ajouter des attributs alt à toutes les images');
    }

    // Vérifier le contenu
    if (this.metrics.wordCount < 300) {
      issues.push('Contenu trop court (< 300 mots)');
      score -= 10;
      recommendations.push('Enrichir le contenu avec plus de texte pertinent');
    }

    // Vérifier les Core Web Vitals
    if (this.metrics.coreWebVitals.lcp && this.metrics.coreWebVitals.lcp > 2500) {
      issues.push('LCP trop élevé (> 2.5s)');
      score -= 15;
      recommendations.push('Optimiser les images et le temps de chargement');
    }

    if (this.metrics.coreWebVitals.cls && this.metrics.coreWebVitals.cls > 0.1) {
      issues.push('CLS trop élevé (> 0.1)');
      score -= 10;
      recommendations.push('Stabiliser la mise en page lors du chargement');
    }

    if (this.metrics.coreWebVitals.fid && this.metrics.coreWebVitals.fid > 100) {
      issues.push('FID trop élevé (> 100ms)');
      score -= 10;
      recommendations.push('Optimiser l\'interactivité de la page');
    }

    return {
      score: Math.max(0, score),
      issues,
      recommendations,
    };
  }

  // Surveiller les changements de page (pour SPA)
  monitorPageChanges(): void {
    if (typeof window === 'undefined') return;

    let currentUrl = window.location.href;

    // Observer les changements d'URL
    const observer = new MutationObserver(() => {
      if (window.location.href !== currentUrl) {
        currentUrl = window.location.href;
        setTimeout(() => {
          this.analyzePage();
          this.collectWebVitals();
        }, 1000);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Écouter les événements de navigation
    window.addEventListener('popstate', () => {
      setTimeout(() => {
        this.analyzePage();
        this.collectWebVitals();
      }, 1000);
    });
  }
}

// Instance globale
export const seoAnalytics = new SEOAnalytics();

// Hook React pour utiliser les analytics SEO
export function useSEOAnalytics() {
  if (typeof window !== 'undefined') {
    return seoAnalytics;
  }
  return null;
}

// Initialisation automatique
if (typeof window !== 'undefined') {
  // Attendre que la page soit complètement chargée
  window.addEventListener('load', () => {
    setTimeout(() => {
      seoAnalytics.analyzePage();
      seoAnalytics.collectWebVitals();
      seoAnalytics.monitorPageChanges();
    }, 1000);
  });
}
