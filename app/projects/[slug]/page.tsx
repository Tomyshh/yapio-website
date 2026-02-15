import { Metadata } from 'next';
import ProjectDetailPage from './ProjectDetailPage';
import { PROJECTS } from '@/lib/projects';
import {
  generateMetadata as generateSEOMetadata,
  generateStructuredData,
  generateBreadcrumbList,
} from '@/lib/seo';

const baseUrl = 'https://yapio.io';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Générer les métadonnées pour le SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  const projectName =
    project?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const description =
    project?.fallbackDescription ||
    `Découvrez notre projet ${projectName} : développement web, applications mobiles et solutions sur mesure.`;

  const ogImage =
    project?.images.desktop?.[0] ||
    project?.images.mobile?.[0] ||
    project?.logo ||
    '/branding/fulllogo_nobuffer.png';

  return generateSEOMetadata({
    title: `${projectName} - Projet`,
    description,
    canonical: `${baseUrl}/projects/${slug}/`,
    ogImage,
    ogType: 'article',
    keywords: [
      'projet',
      'portfolio',
      projectName,
      'développement web',
      'application mobile',
      'IA',
      'logiciel sur mesure',
      'YAPIO',
    ],
  });
}

// Générer les routes statiques pour tous les projets
export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  const projectName =
    project?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const pageUrl = `${baseUrl}/projects/${slug}/`;

  const breadcrumb = generateBreadcrumbList([
    { name: 'Accueil', url: baseUrl },
    { name: 'Projets', url: `${baseUrl}/projects/` },
    { name: projectName, url: pageUrl },
  ]);

  const webPageStructuredData = generateStructuredData('WebPage', {
    title: `${projectName} - Projet`,
    description:
      project?.fallbackDescription ||
      `Découvrez notre projet ${projectName} : développement web, applications mobiles et solutions sur mesure.`,
    url: pageUrl,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageStructuredData) }}
      />
      <ProjectDetailPage slug={slug} />
    </>
  );
}

