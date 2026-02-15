import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const baseUrl = 'https://yapio.io'

/**
 * robots.txt optimisé pour le référencement :
 * - Autorise tous les crawlers sur le contenu public
 * - Bloque les chemins techniques et privés
 * - Restreint les crawlers IA (GPTBot, CCBot, etc.) pour protéger le contenu
 * - Référence le sitemap et le host pour une indexation efficace
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
      // Google : autoriser explicitement pour clarté
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
      // Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
      // Crawlers IA : ne pas indexer le site (éviter entraînement / scraping)
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
