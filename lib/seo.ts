import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  noIndex?: boolean
  structuredData?: any
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

export function generateStructuredData(type: 'Organization' | 'WebSite' | 'WebPage' | 'Article', data: any) {
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
          telephone: '+33-XXX-XXX-XXX', // Remplacez par votre numéro
          contactType: 'customer service',
          availableLanguage: ['French', 'English', 'Hebrew'],
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'FR',
          addressLocality: 'Ville', // Remplacez par votre ville
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

    case 'WebPage':
      return {
        ...baseStructuredData,
        name: data.title,
        description: data.description,
        url: data.url || baseUrl,
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
        headline: data.title,
        description: data.description,
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
        datePublished: data.datePublished || new Date().toISOString(),
        dateModified: data.dateModified || new Date().toISOString(),
        ...data,
      }

    default:
      return baseStructuredData
  }
}

export const defaultSEO: SEOConfig = {
  title: 'YAPIO - Services Numériques Sur Mesure | Applications, IA & Logiciels',
  description: 'YAPIO - Services numériques innovants : développement d\'applications mobiles et web, intégration d\'intelligence artificielle et création de logiciels sur mesure. Solutions personnalisées pour votre entreprise.',
  keywords: [
    'services numériques',
    'développement application mobile',
    'application web',
    'intégration IA',
    'intelligence artificielle',
    'logiciel sur mesure',
    'chatbot',
    'machine learning',
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
