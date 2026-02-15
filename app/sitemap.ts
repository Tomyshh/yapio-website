import { MetadataRoute } from 'next'
import { PROJECTS } from '@/lib/projects'

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

  return [...staticRoutes, ...projectRoutes]
}
