import { MetadataRoute } from 'next'
import { PROJECTS } from '@/lib/projects'
import { BLOG_ARTICLES } from '@/lib/blog-articles'
import { SERVICE_SLUGS } from '@/lib/services'

export const dynamic = 'force-static'

const baseUrl = 'https://www.yapio.io'

/**
 * Génère lastModified à partir de l'année du projet (31 décembre de l'année)
 * pour aider les moteurs à estimer la fraîcheur du contenu.
 */
function lastModifiedFromYear(year: string): Date {
  const y = parseInt(year, 10)
  return Number.isNaN(y) ? new Date() : new Date(y, 11, 31)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    /** Pages services : même source que generateStaticParams — une URL par slug. */
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${baseUrl}/services/${slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.82 as const,
    })),
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service/`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}/`,
    lastModified: lastModifiedFromYear(p.year),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogRoutes: MetadataRoute.Sitemap = BLOG_ARTICLES.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}/`,
    lastModified: new Date(a.published + 'T12:00:00.000Z'),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
