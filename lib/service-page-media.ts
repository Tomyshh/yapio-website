import type { ServiceSlug } from './services';

/** URLs publiques Unsplash (stables) — hero + panneau latéral par service. */
export const SERVICE_PAGE_IMAGES: Record<
  ServiceSlug,
  { hero: string; panel: string; accent?: string }
> = {
  mobile: {
    hero: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=2400&q=85',
    panel: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=85',
    accent: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85',
  },
  'web-apps': {
    hero: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2400&q=85',
    panel: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85',
    accent: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=85',
  },
  'ai-integration': {
    hero: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2400&q=85',
    panel: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=85',
    accent: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85',
  },
  'custom-software': {
    hero: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2400&q=85',
    panel: 'https://images.unsplash.com/photo-1553877522-432693d613ea?auto=format&fit=crop&w=1600&q=85',
    accent: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85',
  },
  website: {
    hero: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=2400&q=85',
    panel: 'https://images.unsplash.com/photo-1547658719-da7b6915632e?auto=format&fit=crop&w=1600&q=85',
    accent: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=85',
  },
  'process-automation': {
    hero: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=85',
    panel: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=85',
    accent: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=85',
  },
};
