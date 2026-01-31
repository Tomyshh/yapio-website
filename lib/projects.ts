export type ProjectCategoryId = 'web' | 'mobile' | 'ia';

export type ProjectImages = {
  desktop: string[];
  mobile: string[];
};

export type ProjectConfig = {
  /** Utilisé dans les routes: /projects/[slug] */
  slug: string;
  /** Nom affiché */
  name: string;
  /** Chemin logo (public/) */
  logo: string;
  /** Alt du logo */
  alt: string;

  /** UI */
  color: string;
  bgColor: string;
  borderColor: string;
  /** Optionnel pour certains composants */
  shadowColor?: string;

  /** Méta */
  category: ProjectCategoryId;
  year: string;
  /** Lien externe du projet (site, app, stream, store, etc.) */
  externalUrl?: string;

  /** Traduction (t.clients.projects[descriptionKey]) */
  descriptionKey: string;
  fallbackDescription: string;

  /** Images */
  images: ProjectImages;

  /** Détails */
  technologies?: string[];
  categoryLabel?: string;
  displayOrder?: number;
};

/**
 * Source unique de vérité pour TOUTES les pages.
 * Modifier ici => synchronisé sur Home (Portfolio), /projects et /projects/[slug].
 */
export const PROJECTS: ProjectConfig[] = [
  {
    slug: 'chabbataim',
    name: 'Chabbataim',
    logo: '/projects/Chabbataim/logo.png',
    alt: 'Logo Chabbataim',
    color: 'from-green-400 to-teal-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-400/20',
    shadowColor: 'shadow-green-500/20',
    category: 'mobile',
    year: '2024',
    externalUrl: 'https://onelink.to/chabbataim',
    descriptionKey: 'chabbataim',
    fallbackDescription: 'Applications web et mobile pour un restaurant en ligne',
    images: {
      desktop: [],
      mobile: ['/projects/Chabbataim/chimage1_mobile.png', '/projects/Chabbataim/chimage2-mobile.png'],
    },
    technologies: ['React', 'Node.js', 'Firebase'],
    categoryLabel: 'Application Mobile',
    displayOrder: 0,
  },
  {
    slug: 'olim-service',
    name: 'Olim Service',
    logo: '/projects/Olim Service/logo.png',
    alt: 'Logo Olim Service',
    color: 'from-[#0E78FE] to-[#3B8FFF]',
    bgColor: 'bg-[#0E78FE]/10',
    borderColor: 'border-[#0E78FE]/20',
    shadowColor: 'shadow-[#0E78FE]/20',
    category: 'web',
    year: '2024',
    externalUrl: 'https://onelink.to/olimservice',
    descriptionKey: 'olimService',
    fallbackDescription: "Services d'accompagnement et conciergerie administrative",
    images: {
      desktop: ['/projects/Olim Service/image1_desktop.png', '/projects/Olim Service/image2_desktop.png'],
      mobile: ['/projects/Olim Service/olimapp_mobile.png'],
    },
    technologies: ['Next.js', 'React', 'Supabase'],
    categoryLabel: 'Site Web & Application',
    displayOrder: 1,
  },
  {
    slug: 'aerilux',
    name: 'Aerilux',
    logo: '/projects/Aerilux/logo.png',
    alt: 'Logo Aerilux',
    color: 'from-white to-gray-200',
    bgColor: 'bg-white/10',
    borderColor: 'border-white/20',
    shadowColor: 'shadow-white/10',
    category: 'web',
    year: '2023',
    externalUrl: 'https://aerilux.io',
    descriptionKey: 'aerilux',
    fallbackDescription: "Solutions d'éloignement de pigeons",
    images: {
      desktop: ['/projects/Aerilux/image1-desktop.png'],
      mobile: [],
    },
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    categoryLabel: 'Site Web',
    displayOrder: 2,
  },
  {
    slug: 'dtai',
    name: 'DTAI',
    logo: '/projects/DTAI/logo.png',
    alt: 'Logo DTAI',
    color: 'from-red-400 to-pink-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-400/20',
    shadowColor: 'shadow-red-500/20',
    category: 'ia',
    year: '2024',
    externalUrl: 'https://dtai.app',
    descriptionKey: 'dtai',
    fallbackDescription: 'Expertise en intelligence artificielle dans la transcription et traduction',
    images: {
      desktop: ['/projects/DTAI/dtai-desktop1.png', '/projects/DTAI/dtai-desktop2.png'],
      mobile: [],
    },
    technologies: ['React', 'Node.js', 'Express'],
    categoryLabel: 'Intelligence Artificielle',
    displayOrder: 3,
  },
  {
    slug: 'havrouta',
    name: 'Havrouta',
    logo: '/projects/Havrouta/logo.png',
    alt: 'Logo Havrouta',
    color: 'from-[#C2A765] to-[#D4B876]',
    bgColor: 'bg-[#C2A765]/10',
    borderColor: 'border-[#C2A765]/20',
    shadowColor: 'shadow-[#C2A765]/20',
    category: 'mobile',
    year: '2024',
    descriptionKey: 'havrouta',
    fallbackDescription: 'Plateforme éducative moderne et interactive',
    images: {
      desktop: [],
      mobile: ['/projects/Havrouta/happ-mobile.png'],
    },
    technologies: ['Flutter', 'Firebase', 'Node.js'],
    categoryLabel: 'Application Mobile',
    displayOrder: 4,
  },
  {
    slug: 'security-bear',
    name: 'Security Bear',
    logo: '/projects/Security Bear/logo.png',
    alt: 'Logo Security Bear',
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-400/20',
    shadowColor: 'shadow-orange-500/20',
    category: 'web',
    year: '2023',
    externalUrl: 'https://www.securitybear.me/',
    descriptionKey: 'securityBear',
    fallbackDescription: 'Solutions de surveillance et caméras de sécurité',
    images: {
      desktop: ['/projects/Security Bear/image1-desktop.png'],
      mobile: ['/projects/Security Bear/app-mobile.png'],
    },
    technologies: ['React', 'Node.js', 'Firebase'],
    categoryLabel: 'Application Web & Mobile',
    displayOrder: 5,
  },
  {
    slug: 'kolot',
    name: 'Kolot',
    logo: '/projects/Kolot/logo.png',
    alt: 'Logo Kolot',
    color: 'from-purple-400 to-indigo-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-400/20',
    shadowColor: 'shadow-purple-500/20',
    category: 'web',
    year: '2024',
    externalUrl: 'https://kolot-kodesh.com/',
    descriptionKey: 'kolot',
    fallbackDescription: "Site de recherche intelligente d'enregistrement vocaux",
    images: {
      desktop: ['/projects/Kolot/image1-desktop.png'],
      mobile: [],
    },
    technologies: ['Laravel', 'PostgreSQL'],
    categoryLabel: 'Plateforme Web',
    displayOrder: 6,
  },
  {
    slug: 'oz-leisrael',
    name: 'Oz Leisrael',
    logo: '/projects/Oz Leisrael/logo.png',
    alt: 'Logo Oz Leisrael',
    color: 'from-blue-400 to-cyan-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-400/20',
    shadowColor: 'shadow-blue-500/20',
    category: 'web',
    year: '2023',
    externalUrl: 'https://oz-leisrael.com/fr',
    descriptionKey: 'ozLeisrael',
    fallbackDescription: 'Site de présentation du programme Oz Leisrael',
    images: {
      desktop: ['/projects/Oz Leisrael/image1_desktop.png'],
      mobile: [],
    },
    technologies: ['React', 'Express', 'PostgreSQL'],
    categoryLabel: 'Application Web',
    displayOrder: 7,
  },
  {
    slug: 'i24-tv-channel',
    name: 'i24 TV channel',
    logo: '/projects/i24 TV channel/logo.png',
    alt: 'Logo i24 TV channel',
    color: 'from-red-500 to-blue-600',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    shadowColor: 'shadow-red-500/20',
    category: 'ia',
    year: '2024',
    externalUrl: 'https://video.i24news.tv/live/brightcove/en',
    descriptionKey: 'i24TvChannel',
    fallbackDescription: 'Solution de transcription et traduction en temps réel',
    images: {
      desktop: [
        '/projects/i24 TV channel/chaine-desktop.png',
        '/projects/i24 TV channel/chaine2-desktop.png',
        '/projects/i24 TV channel/chaine3-desktop.png',
      ],
      mobile: [],
    },
    technologies: ['React', 'Node.js', 'Express'],
    categoryLabel: 'Plateforme Streaming',
    displayOrder: 8,
  },
];

export type LocalizedProject = ProjectConfig & { description: string };

type TranslationsLike = {
  clients?: {
    projects?: Record<string, string>;
  };
};

export function getLocalizedProjects(t: unknown): LocalizedProject[] {
  const projectsTranslations = (t as TranslationsLike | null | undefined)?.clients?.projects;
  return PROJECTS.map((p) => ({
    ...p,
    description: (projectsTranslations && projectsTranslations[p.descriptionKey]) || p.fallbackDescription,
  }));
}

