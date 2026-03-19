/**
 * Slugs utilisés dans les URLs /services/[slug]
 * et mapping vers les clés de traduction services.*
 */
export const SERVICE_SLUGS = [
  'mobile',
  'web-apps',
  'ai-integration',
  'custom-software',
  'website',
  'process-automation',
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

const slugToKey: Record<ServiceSlug, string> = {
  'mobile': 'mobile',
  'web-apps': 'desktop',
  'ai-integration': 'web',
  'custom-software': 'consulting',
  'website': 'website',
  'process-automation': 'automation',
};

export function getServiceKeyFromSlug(slug: string): string | null {
  if (SERVICE_SLUGS.includes(slug as ServiceSlug)) {
    return slugToKey[slug as ServiceSlug];
  }
  return null;
}

export function getServiceSlugFromKey(key: string): ServiceSlug | null {
  const entry = Object.entries(slugToKey).find(([, k]) => k === key);
  return entry ? (entry[0] as ServiceSlug) : null;
}

/** Métadonnées SEO pour les pages service (titre / description). */
const serviceMetaFr: Record<string, { title: string; description: string }> = {
  mobile: {
    title: 'Applications Mobiles',
    description: 'Création d’applications iOS/Android (native ou cross‑platform) : performance, UX, store, maintenance et évolution.',
  },
  desktop: {
    title: 'Applications Web',
    description: 'Sites et applications web modernes (SaaS), sécurisés et performants, avec intégrations API, paiements, emails et automatisations.',
  },
  web: {
    title: 'Intégration IA',
    description: 'Solutions IA utiles et mesurables : chatbots, assistants, automatisations, extraction/tri de documents, analyse et workflows.',
  },
  consulting: {
    title: 'Logiciels Sur Mesure',
    description: 'Logiciels métiers & CRM sur mesure : gestion commerciale, pipeline, back‑office, dashboards, intégrations et reporting.',
  },
  website: {
    title: 'Site Internet',
    description: 'Sites vitrines et e‑commerce sur mesure : design moderne, SEO, performance et hébergement sécurisé.',
  },
  automation: {
    title: 'Automatisation de Processus',
    description: 'Automatisation de vos workflows : intégrations API, scripts, connecteurs et gains de temps mesurables.',
  },
};

export function getServiceMeta(slug: string): { title: string; description: string } | null {
  const key = getServiceKeyFromSlug(slug);
  if (!key) return null;
  return serviceMetaFr[key] ?? null;
}
