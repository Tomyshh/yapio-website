'use client';

// Configuration des outils d'analytics et SEO
export const analyticsConfig = {
  googleAnalytics: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', // Remplacez par votre ID GA4
  },
  googleTagManager: {
    containerId: process.env.NEXT_PUBLIC_GTM_ID || '', // Remplacez par votre ID GTM
  },
  googleSearchConsole: {
    verificationCode: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '', // Code de vérification GSC
  },
  microsoftClarity: {
    projectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '', // ID Clarity
  },
  hotjar: {
    siteId: process.env.NEXT_PUBLIC_HOTJAR_SITE_ID || '', // ID Hotjar
  },
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Initialiser Google Analytics 4
export const initGA = () => {
  if (typeof window === 'undefined' || !analyticsConfig.googleAnalytics.measurementId) {
    return;
  }

  // Charger gtag
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAnalytics.measurementId}`;
  document.head.appendChild(script1);

  // Initialiser gtag
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${analyticsConfig.googleAnalytics.measurementId}', {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true,
      cookie_flags: 'SameSite=None;Secure',
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  `;
  document.head.appendChild(script2);

  // Rendre gtag disponible globalement
  window.gtag =
    window.gtag ||
    ((...args: unknown[]) => {
      (window.dataLayer = window.dataLayer || []).push(args);
    });
};

// Initialiser Google Tag Manager
export const initGTM = () => {
  if (typeof window === 'undefined' || !analyticsConfig.googleTagManager.containerId) {
    return;
  }

  // GTM Script
  const script = document.createElement('script');
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${analyticsConfig.googleTagManager.containerId}');
  `;
  document.head.appendChild(script);

  // GTM NoScript
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=${analyticsConfig.googleTagManager.containerId}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
  `;
  document.body.appendChild(noscript);
};

// Initialiser Microsoft Clarity
export const initClarity = () => {
  if (typeof window === 'undefined' || !analyticsConfig.microsoftClarity.projectId) {
    return;
  }

  const script = document.createElement('script');
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${analyticsConfig.microsoftClarity.projectId}");
  `;
  document.head.appendChild(script);
};

// Initialiser Hotjar
export const initHotjar = () => {
  if (typeof window === 'undefined' || !analyticsConfig.hotjar.siteId) {
    return;
  }

  const script = document.createElement('script');
  script.innerHTML = `
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${analyticsConfig.hotjar.siteId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `;
  document.head.appendChild(script);
};

// Événements personnalisés pour le tracking
export const trackEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters);
  }

  // Google Tag Manager
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
  }
};

// Tracking des Core Web Vitals
export type WebVitalsMetric = {
  name: string;
  value: number;
  id?: string;
  delta?: number;
};

export const trackWebVitals = (metric: WebVitalsMetric) => {
  trackEvent(metric.name, {
    event_category: 'Web Vitals',
    value: Math.round(metric.value),
    metric_id: metric.id,
    metric_delta: metric.delta,
    non_interaction: true,
  });
};

// Tracking des erreurs
export const trackError = (error: Error, errorInfo?: unknown) => {
  trackEvent('exception', {
    description: error.message,
    fatal: false,
    error_info: errorInfo ? JSON.stringify(errorInfo) : undefined,
  });
};

// Tracking de la performance de navigation
export const trackNavigation = (from: string, to: string, duration?: number) => {
  trackEvent('page_navigation', {
    from_page: from,
    to_page: to,
    navigation_duration: duration,
  });
};

// Tracking des interactions utilisateur
export const trackUserInteraction = (element: string, action: string, value?: string) => {
  trackEvent('user_interaction', {
    element_type: element,
    action_type: action,
    element_value: value,
  });
};

// Initialisation complète des outils d'analytics
export const initAllAnalytics = () => {
  if (typeof window === 'undefined') return;

  // Attendre le consentement des cookies si nécessaire
  const hasConsent = localStorage.getItem('cookie-consent') === 'accepted';
  
  if (hasConsent || process.env.NODE_ENV === 'development') {
    initGA();
    initGTM();
    initClarity();
    initHotjar();

    // Tracking automatique des erreurs
    window.addEventListener('error', (event) => {
      trackError(new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    // Tracking automatique des erreurs de promesses
    window.addEventListener('unhandledrejection', (event) => {
      trackError(new Error('Unhandled Promise Rejection'), {
        reason: event.reason,
      });
    });
  }
};

// Hook pour les composants React
export const useAnalytics = () => {
  return {
    trackEvent,
    trackWebVitals,
    trackError,
    trackNavigation,
    trackUserInteraction,
  };
};
