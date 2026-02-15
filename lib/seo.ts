import { Metadata } from 'next'
import { YAPIO_PHONE_E164, YAPIO_WHATSAPP_PHONE } from './contact'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  noIndex?: boolean
  structuredData?: unknown
}

const baseUrl = 'https://yapio.io'
const siteName = 'YAPIO'
const defaultImage = '/branding/fulllogo_nobuffer.png'

export function generateMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = defaultImage,
  ogType = 'website',
  noIndex = false,
}: SEOConfig): Metadata {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  const canonicalUrl = canonical || baseUrl

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    authors: [{ name: 'YAPIO', url: baseUrl }],
    creator: 'YAPIO',
    publisher: 'YAPIO',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'fr': canonicalUrl,
        'en': `${canonicalUrl}?lang=en`,
        'he': `${canonicalUrl}?lang=he`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'fr_FR',
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@yapio_dev', // Remplacez par votre handle Twitter
    },
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    verification: {
      google: '', // Ajoutez votre code de vérification Google
      yandex: '', // Ajoutez votre code de vérification Yandex si nécessaire
      yahoo: '', // Ajoutez votre code de vérification Yahoo si nécessaire
    },
  }

  return metadata
}

type StructuredDataInput = Record<string, unknown> & {
  title?: string
  description?: string
  url?: string
  datePublished?: string
  dateModified?: string
}

export function generateStructuredData(
  type: 'Organization' | 'WebSite' | 'WebPage' | 'Article' | 'ProfessionalService',
  data: StructuredDataInput
) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  switch (type) {
    case 'Organization':
      return {
        ...baseStructuredData,
        name: 'YAPIO',
        description: 'Services numériques sur mesure : applications mobiles et web, intégration d\'intelligence artificielle et développement de logiciels personnalisés.',
        url: baseUrl,
        logo: `${baseUrl}/branding/fulllogo_nobuffer.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: YAPIO_PHONE_E164,
          contactType: 'sales',
          areaServed: 'FR',
          availableLanguage: ['French', 'English', 'Hebrew'],
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'FR',
        },
        sameAs: [
          'https://www.linkedin.com/company/yapio', // Remplacez par vos réseaux sociaux
          'https://twitter.com/yapio_dev',
          'https://github.com/yapio',
        ],
        ...data,
      }

    case 'WebSite':
      return {
        ...baseStructuredData,
        name: 'YAPIO',
        url: baseUrl,
        description: 'Services numériques : applications mobiles et web, IA, logiciels sur mesure',
        publisher: {
          '@type': 'Organization',
          name: 'YAPIO',
          logo: `${baseUrl}/branding/fulllogo_nobuffer.png`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
        ...data,
      }

    case 'ProfessionalService':
      return {
        ...baseStructuredData,
        name: 'YAPIO',
        url: baseUrl,
        description:
          'Développement d’applications mobiles, CRM et logiciels sur mesure, solutions IA et intégrations (API, webhooks). Contact direct par téléphone.',
        image: `${baseUrl}${defaultImage}`,
        telephone: YAPIO_PHONE_E164,
        email: 'tom@yapio.io',
        serviceType: [
          'Développement d’applications mobiles',
          'Développement CRM',
          'Logiciel sur mesure',
          'Solutions IA (chatbots, automatisations)',
          'Intégrations API & webhooks',
        ],
        areaServed: [
          {
            '@type': 'Country',
            name: 'France',
          },
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'FR',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            telephone: YAPIO_PHONE_E164,
            availableLanguage: ['French', 'English', 'Hebrew'],
          },
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: YAPIO_PHONE_E164,
            availableLanguage: ['French', 'English', 'Hebrew'],
          },
        ],
        sameAs: [
          'https://www.linkedin.com/company/yapio',
          'https://twitter.com/yapio_dev',
          'https://github.com/yapio',
          `https://wa.me/${YAPIO_WHATSAPP_PHONE}`,
        ],
        ...data,
      }

    case 'WebPage':
      return {
        ...baseStructuredData,
        name: data.title ?? '',
        description: data.description ?? '',
        url: data.url ?? baseUrl,
        isPartOf: {
          '@type': 'WebSite',
          name: 'YAPIO',
          url: baseUrl,
        },
        about: {
          '@type': 'Organization',
          name: 'YAPIO',
        },
        ...data,
      }

    case 'Article':
      return {
        ...baseStructuredData,
        headline: data.title ?? '',
        description: data.description ?? '',
        author: {
          '@type': 'Organization',
          name: 'YAPIO',
          url: baseUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'YAPIO',
          logo: `${baseUrl}/branding/fulllogo_nobuffer.png`,
        },
        datePublished: data.datePublished ?? new Date().toISOString(),
        dateModified: data.dateModified ?? new Date().toISOString(),
        ...data,
      }

    default:
      return baseStructuredData
  }
}

export const defaultSEO: SEOConfig = {
  title: 'YAPIO - Applications mobiles, CRM, IA, intégrations & logiciels sur mesure',
  description:
    'YAPIO conçoit et développe des applications mobiles, des CRM et logiciels sur mesure, des solutions IA (chatbots, automatisations) et des intégrations (API, webhooks) pour votre entreprise.',
  keywords: [
    'services numériques',
    'développement application mobile',
    'création application mobile',
    'développement CRM',
    'CRM sur mesure',
    'application web',
    'logiciel',
    'intégration IA',
    'intelligence artificielle',
    'solution IA',
    'logiciel sur mesure',
    'développement logiciel',
    'intégrations',
    'intégration API',
    'webhooks',
    'automatisation',
    'chatbot',
    'machine learning',
    'LLM',
    'React Native',
    'Flutter',
    'Next.js',
    'développeur',
    'YAPIO',
    'France',
    'Israël',
    'transformation digitale',
    'startup',
    'entreprise',
    'solution digitale',
  ],
}

export const pageSEO = {
  home: {
    ...defaultSEO,
    structuredData: [
      generateStructuredData('Organization', {}),
      generateStructuredData('WebSite', {}),
      generateStructuredData('ProfessionalService', {}),
    ],
  },
  projects: {
    title: 'Projets - YAPIO | Portfolio de réalisations',
    description:
      'Explorez nos projets : sites web, applications mobiles, intégrations IA et logiciels sur mesure. Découvrez nos réalisations et contactez-nous pour votre projet.',
    keywords: [
      'portfolio',
      'projets',
      'réalisations',
      'site web',
      'application mobile',
      'IA',
      'logiciel sur mesure',
      'développement',
      'YAPIO',
      'France',
    ],
    canonical: `${baseUrl}/projects/`,
    structuredData: [
      generateStructuredData('WebPage', {
        title: 'Projets',
        description: 'Portfolio de réalisations YAPIO',
        url: `${baseUrl}/projects/`,
      }),
    ],
  },
  contact: {
    title: 'Contact - YAPIO | Devis & appel',
    description:
      `Appelez-nous au ${YAPIO_PHONE_E164} ou envoyez-nous un message pour discuter de votre projet (web, mobile, IA, logiciel sur mesure).`,
    keywords: [
      'contact',
      'devis',
      'appel',
      'téléphone',
      'développement web',
      'application mobile',
      'IA',
      'logiciel sur mesure',
      'France',
      'YAPIO',
    ],
    canonical: `${baseUrl}/contact/`,
    structuredData: [
      generateStructuredData('WebPage', {
        title: 'Contact',
        description: 'Contactez YAPIO pour discuter de votre projet',
        url: `${baseUrl}/contact/`,
      }),
      generateStructuredData('ProfessionalService', {}),
    ],
  },
  about: {
    title: 'À propos de YAPIO - Notre équipe et notre expertise',
    description: 'Découvrez l\'équipe YAPIO, notre expertise en développement d\'applications mobiles et web, intégration d\'IA et logiciels sur mesure. Notre mission, nos valeurs et notre approche innovante.',
    keywords: [
      'équipe YAPIO',
      'expertise développement',
      'à propos',
      'mission',
      'valeurs',
      'développeurs expérimentés',
      'intelligence artificielle',
      'France',
      'Israël',
    ],
    canonical: `${baseUrl}/about/`,
    structuredData: [
      generateStructuredData('WebPage', {
        title: 'À propos de YAPIO',
        description: 'Découvrez l\'équipe YAPIO et notre expertise en développement d\'applications',
        url: `${baseUrl}/about/`,
      }),
    ],
  },
  privacy: {
    title: 'Politique de confidentialité - YAPIO',
    description: 'Politique de confidentialité de YAPIO. Comment nous collectons, utilisons et protégeons vos données personnelles.',
    keywords: [
      'politique de confidentialité',
      'protection des données',
      'RGPD',
      'vie privée',
      'données personnelles',
    ],
    canonical: `${baseUrl}/privacy-policy/`,
    noIndex: true,
    structuredData: [
      generateStructuredData('WebPage', {
        title: 'Politique de confidentialité',
        description: 'Politique de confidentialité et protection des données',
        url: `${baseUrl}/privacy-policy/`,
      }),
    ],
  },
  terms: {
    title: 'Conditions d\'utilisation - YAPIO',
    description: 'Conditions d\'utilisation des services YAPIO. Droits, obligations et conditions générales.',
    keywords: [
      'conditions d\'utilisation',
      'conditions générales',
      'CGU',
      'droits',
      'obligations',
    ],
    canonical: `${baseUrl}/terms-of-service/`,
    noIndex: true,
    structuredData: [
      generateStructuredData('WebPage', {
        title: 'Conditions d\'utilisation',
        description: 'Conditions d\'utilisation des services YAPIO',
        url: `${baseUrl}/terms-of-service/`,
      }),
    ],
  },
}
